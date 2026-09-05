"use strict";

(function(){
  const KEY = "teeAuthorizedVaultSessionV1";
  const REQUIRED_VERSION = 2;
  const EVENT = "tee-vault-session-changed";
  const OPEN_MESSAGE = "TEE_VAULT_SESSION_OPEN";
  const LOCK_MESSAGE = "TEE_VAULT_SESSION_LOCK";
  const CLOSED_MESSAGE = "TEE_VAULT_SESSION_CLOSED";
  let expiryTimer = null;

  function parse(candidate){
    try{
      const value = typeof candidate === "string" ? JSON.parse(candidate || "null") : candidate;
      if(!value || typeof value !== "object") return null;
      if(Number(value.version) !== REQUIRED_VERSION) return null;
      if(!Number.isFinite(Number(value.expiresAt)) || Number(value.expiresAt) <= Date.now()) return null;
      if(!Array.isArray(value.records)) return null;
      return value;
    }catch{
      return null;
    }
  }

  function read(){
    try{
      const raw = sessionStorage.getItem(KEY);
      const session = parse(raw);
      if(!session && raw) sessionStorage.removeItem(KEY);
      return session;
    }catch{
      return null;
    }
  }

  function emit(reason, session = read()){
    try{
      window.dispatchEvent(new CustomEvent(EVENT, {detail:{reason, session}}));
    }catch{}
  }

  function schedule(session = read()){
    if(expiryTimer !== null) clearTimeout(expiryTimer);
    expiryTimer = null;
    if(!session) return;
    const delay = Math.max(0, Number(session.expiresAt) - Date.now());
    expiryTimer = setTimeout(()=>clear("expired", false), delay + 25);
  }

  function accept(candidate, reason = "vault-open"){
    const session = parse(candidate);
    if(!session) return false;
    try{
      sessionStorage.setItem(KEY, JSON.stringify(session));
    }catch{
      return false;
    }
    schedule(session);
    emit(reason, session);
    return true;
  }

  function get(){
    const session = read();
    schedule(session);
    return session;
  }

  function isOpen(){ return Boolean(get()); }

  function remainingMs(){
    const session = get();
    return session ? Math.max(0, Number(session.expiresAt) - Date.now()) : 0;
  }

  function formatRemaining(){
    const ms = remainingMs();
    if(!ms) return "Locked";
    const total = Math.ceil(ms / 1000);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${min}:${String(sec).padStart(2,"0")}`;
  }

  function records(types){
    const session = get();
    if(!session) return [];
    const list = session.records || [];
    if(!types) return list;
    const wanted = new Set(Array.isArray(types) ? types : [types]);
    return list.filter(record => wanted.has(record.type));
  }

  function describe(){
    const session = get();
    if(!session) return {open:false, label:"Vault locked", remaining:"Locked"};
    return {
      open:true,
      label:session.profileLabel || session.profileId || "Authorized traveler",
      remaining:formatRemaining(),
      unlockedAt:session.unlockedAt,
      expiresAt:session.expiresAt
    };
  }

  function notifyVaultFrames(message){
    document.querySelectorAll('iframe[src*="travel-private-documents"]').forEach(frame=>{
      try{ frame.contentWindow?.postMessage(message, location.origin); }catch{}
    });
  }

  function clear(reason = "manual", notifyVault = true){
    try{ sessionStorage.removeItem(KEY); }catch{}
    if(expiryTimer !== null) clearTimeout(expiryTimer);
    expiryTimer = null;
    if(notifyVault) notifyVaultFrames({type:LOCK_MESSAGE, reason});
    emit(reason, null);
  }

  window.addEventListener("message", event => {
    if(event.origin !== location.origin) return;
    const message = event.data || {};
    if(message.type === OPEN_MESSAGE){
      accept(message.session, "vault-open");
      return;
    }
    if(message.type === CLOSED_MESSAGE){
      clear("vault-closed", false);
    }
  });

  window.TEEVaultSession = Object.freeze({
    key: KEY,
    eventName: EVENT,
    get,
    isOpen,
    remainingMs,
    formatRemaining,
    describe,
    records,
    clear,
    accept
  });

  schedule(read());
  window.addEventListener("pageshow", ()=>{
    const session = read();
    schedule(session);
    emit("pageshow", session);
  });
  document.addEventListener("visibilitychange", ()=>{
    if(document.hidden) return;
    const session = read();
    schedule(session);
    emit("visible", session);
  });
})();
