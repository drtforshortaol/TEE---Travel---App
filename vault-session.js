"use strict";

(function(){
  const KEY = "teeAuthorizedVaultSessionV1";
  const REQUIRED_VERSION = 2;
  const EVENT = "tee-vault-session-changed";
  const OPEN_MESSAGE = "TEE_VAULT_SESSION_OPEN";
  const LOCK_MESSAGE = "TEE_VAULT_SESSION_LOCK";
  const CLOSED_MESSAGE = "TEE_VAULT_SESSION_CLOSED";
  const scriptUrl = document.currentScript?.src || location.href;
  const vaultBridgeUrl = new URL("./apps/travel-private-documents/vault-session-bridge.js", scriptUrl).href;
  let expiryTimer = null;

  function normalizeOperationalCorrections(session){
    if(!session || !Array.isArray(session.records)) return session;
    let changed=false;
    for(const record of session.records){
      if(record?.type!=="flight") continue;
      const fields=record.fields&&typeof record.fields==="object"?record.fields:null;
      if(!fields) continue;
      const flightNumber=String(fields.flightNumber||"").replace(/\s+/g,"").toUpperCase();
      const departureDate=String(fields.departureDate||"").trim();
      if(flightNumber!=="TK1208" || departureDate!=="2026-10-06") continue;
      if(String(fields.departureTime||"").trim()!=="15:00"){
        fields.departureTime="15:00";
        changed=true;
      }
      const original=String(fields.notes||"");
      let notes=original
        .replace(/Arrives Istanbul at 17:35 local time\.?/gi,"Arrives Istanbul at 18:55 local time.")
        .replace(/Arrival 17:35\.?/gi,"Arrival 18:55.")
        .replace(/13:35\s*(?:→|->)\s*17:35/gi,"15:00 → 18:55");
      if(!/18:55/.test(notes)){
        notes=`${notes}${notes?"\n":""}Current operational schedule: ZRH 15:00 → IST 18:55 on Oct 6, 2026. Earlier 13:35 → 17:35 timing is superseded.`;
      }
      if(notes!==original){fields.notes=notes;changed=true;}
    }
    if(changed) session.operationalCorrection="TK1208-2026-10-06-v1";
    return session;
  }

  function parse(candidate){
    try{
      const value = typeof candidate === "string" ? JSON.parse(candidate || "null") : candidate;
      if(!value || typeof value !== "object") return null;
      if(Number(value.version) !== REQUIRED_VERSION) return null;
      if(!Number.isFinite(Number(value.expiresAt)) || Number(value.expiresAt) <= Date.now()) return null;
      if(!Array.isArray(value.records)) return null;
      return normalizeOperationalCorrections(value);
    }catch{return null;}
  }

  function read(){
    try{
      const raw = sessionStorage.getItem(KEY);
      const session = parse(raw);
      if(!session && raw) sessionStorage.removeItem(KEY);
      if(session && session.operationalCorrection && raw!==JSON.stringify(session)){
        try{sessionStorage.setItem(KEY,JSON.stringify(session));}catch{}
      }
      return session;
    }catch{return null;}
  }

  function emit(reason, session = read()){
    try{window.dispatchEvent(new CustomEvent(EVENT,{detail:{reason,session}}));}catch{}
  }

  function schedule(session = read()){
    if(expiryTimer !== null) clearTimeout(expiryTimer);
    expiryTimer = null;
    if(!session) return;
    const delay = Math.max(0, Number(session.expiresAt) - Date.now());
    expiryTimer = setTimeout(()=>clear("expired",false),delay+25);
  }

  function accept(candidate, reason = "vault-open"){
    const session = parse(candidate);
    if(!session) return false;
    try{sessionStorage.setItem(KEY,JSON.stringify(session));}catch{return false;}
    schedule(session);
    emit(reason,session);
    return true;
  }

  function get(){const session=read();schedule(session);return session;}
  function isOpen(){return Boolean(get());}
  function remainingMs(){const session=get();return session?Math.max(0,Number(session.expiresAt)-Date.now()):0;}
  function formatRemaining(){
    const ms=remainingMs();
    if(!ms)return "Locked";
    const total=Math.ceil(ms/1000), min=Math.floor(total/60), sec=total%60;
    return `${min}:${String(sec).padStart(2,"0")}`;
  }
  function records(types){
    const session=get(); if(!session)return [];
    const list=session.records||[]; if(!types)return list;
    const wanted=new Set(Array.isArray(types)?types:[types]);
    return list.filter(record=>wanted.has(record.type));
  }
  function describe(){
    const session=get();
    if(!session)return {open:false,label:"Vault locked",remaining:"Locked"};
    return {open:true,label:session.profileLabel||session.profileId||"Authorized traveler",remaining:formatRemaining(),unlockedAt:session.unlockedAt,expiresAt:session.expiresAt};
  }

  function isVaultFrame(frame){
    if(!(frame instanceof HTMLIFrameElement))return false;
    const src=frame.getAttribute("src")||frame.dataset?.src||"";
    return /travel-private-documents\/index\.html/i.test(src);
  }

  function installSenderBridge(frame){
    if(!isVaultFrame(frame)||!frame.contentWindow)return;
    try{
      const doc=frame.contentDocument;
      if(!doc||doc.querySelector('script[data-tee-clean-vault-bridge]'))return;
      const script=doc.createElement("script");
      script.src=vaultBridgeUrl;
      script.dataset.teeCleanVaultBridge="1";
      doc.head.appendChild(script);
    }catch{}
  }

  function attachVaultFrame(frame){
    if(!isVaultFrame(frame)||frame.dataset.teeSessionAttached==="1")return;
    frame.dataset.teeSessionAttached="1";
    frame.addEventListener("load",()=>installSenderBridge(frame));
    try{installSenderBridge(frame);}catch{}
  }

  function scanVaultFrames(){document.querySelectorAll("iframe").forEach(attachVaultFrame);}

  function notifyVaultFrames(message){
    document.querySelectorAll("iframe").forEach(frame=>{
      if(!isVaultFrame(frame))return;
      try{frame.contentWindow?.postMessage(message,location.origin);}catch{}
    });
  }

  function clear(reason="manual",notifyVault=true){
    try{sessionStorage.removeItem(KEY);}catch{}
    if(expiryTimer!==null)clearTimeout(expiryTimer);
    expiryTimer=null;
    if(notifyVault)notifyVaultFrames({type:LOCK_MESSAGE,reason});
    emit(reason,null);
  }

  window.addEventListener("message",event=>{
    if(event.origin!==location.origin)return;
    const message=event.data||{};
    if(message.type===OPEN_MESSAGE){accept(message.session,"vault-open");return;}
    if(message.type===CLOSED_MESSAGE)clear("vault-closed",false);
  });

  window.TEEVaultSession=Object.freeze({key:KEY,eventName:EVENT,get,isOpen,remainingMs,formatRemaining,describe,records,clear,accept});

  schedule(read());
  scanVaultFrames();
  const observer=new MutationObserver(scanVaultFrames);
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]});

  window.addEventListener("pageshow",()=>{const session=read();schedule(session);scanVaultFrames();emit("pageshow",session);});
  document.addEventListener("visibilitychange",()=>{if(document.hidden)return;const session=read();schedule(session);scanVaultFrames();emit("visible",session);});
})();
