"use strict";

(function(){
  const KEY = "teeAuthorizedVaultSessionV1";
  const REQUIRED_VERSION = 2;
  const EVENT = "tee-vault-session-changed";
  const CHANNEL_NAME = "tee-vault-session-sync-v1";
  let expiryTimer = null;
  let channel = null;
  let lastAnnouncedSignature = "";

  function parse(raw){
    try{
      const value = typeof raw === "string" ? JSON.parse(raw || "null") : raw;
      if(!value || typeof value !== "object") return null;
      if(Number(value.version) !== REQUIRED_VERSION) return null;
      if(!Number.isFinite(Number(value.expiresAt))) return null;
      if(Number(value.expiresAt) <= Date.now()) return null;
      if(!Array.isArray(value.records)) value.records = [];
      return value;
    }catch{
      return null;
    }
  }

  function rawSession(){
    const raw = sessionStorage.getItem(KEY);
    const value = parse(raw);
    if(!value && raw){
      sessionStorage.removeItem(KEY);
    }
    return value;
  }

  function emit(reason){
    window.dispatchEvent(new CustomEvent(EVENT, {detail:{reason, session:rawSession()}}));
  }

  function post(message){
    try{ channel?.postMessage(message); }catch{}
  }

  function signature(session){
    if(!session) return "";
    return `${session.profileId || ""}|${session.expiresAt || ""}|${session.unlockedAt || ""}|${(session.records || []).length}`;
  }

  function announce(session){
    const valid = parse(session);
    if(!valid) return;
    const sig = signature(valid);
    if(sig === lastAnnouncedSignature) return;
    lastAnnouncedSignature = sig;
    post({type:"session", session:valid});
  }

  function schedule(){
    if(expiryTimer !== null) clearTimeout(expiryTimer);
    expiryTimer = null;
    const session = rawSession();
    if(!session) return;
    const delay = Math.max(0, Number(session.expiresAt) - Date.now());
    expiryTimer = setTimeout(()=>{
      sessionStorage.removeItem(KEY);
      expiryTimer = null;
      lastAnnouncedSignature = "";
      post({type:"clear", reason:"expired"});
      emit("expired");
    }, delay + 25);
  }

  function acceptSyncedSession(candidate){
    const incoming = parse(candidate);
    if(!incoming) return false;
    const current = rawSession();
    if(current && Number(current.expiresAt) >= Number(incoming.expiresAt)) return false;
    sessionStorage.setItem(KEY, JSON.stringify(incoming));
    lastAnnouncedSignature = signature(incoming);
    schedule();
    emit("synced");
    return true;
  }

  function get(){
    const session = rawSession();
    if(!session){
      schedule();
      return null;
    }
    announce(session);
    return session;
  }

  function isOpen(){ return Boolean(get()); }
  function remainingMs(){
    const session = get();
    return session ? Math.max(0, Number(session.expiresAt) - Date.now()) : 0;
  }

  function clear(reason="manual"){
    sessionStorage.removeItem(KEY);
    if(expiryTimer !== null) clearTimeout(expiryTimer);
    expiryTimer = null;
    lastAnnouncedSignature = "";
    post({type:"clear", reason});
    emit(reason);
  }

  function records(types){
    const session = get();
    if(!session) return [];
    const list = Array.isArray(session.records) ? session.records : [];
    if(!types) return list;
    const wanted = new Set(Array.isArray(types) ? types : [types]);
    return list.filter(record => wanted.has(record.type));
  }

  function formatRemaining(){
    const ms = remainingMs();
    if(!ms) return "Locked";
    const total = Math.ceil(ms / 1000);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${min}:${String(sec).padStart(2,"0")}`;
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

  if("BroadcastChannel" in window){
    try{
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.addEventListener("message", event => {
        const message = event.data || {};
        if(message.type === "request"){
          const session = rawSession();
          if(session) post({type:"session", session});
          return;
        }
        if(message.type === "session"){
          acceptSyncedSession(message.session);
          return;
        }
        if(message.type === "clear"){
          if(sessionStorage.getItem(KEY)){
            sessionStorage.removeItem(KEY);
            if(expiryTimer !== null) clearTimeout(expiryTimer);
            expiryTimer = null;
            lastAnnouncedSignature = "";
            emit(message.reason || "remote-clear");
          }
        }
      });
    }catch{ channel = null; }
  }

  window.TEEVaultSession = Object.freeze({
    key:KEY,
    eventName:EVENT,
    get,
    isOpen,
    remainingMs,
    formatRemaining,
    describe,
    records,
    clear
  });

  schedule();
  if(rawSession()) announce(rawSession());
  else post({type:"request"});

  window.addEventListener("pageshow", ()=>{
    schedule();
    const session = rawSession();
    if(session) announce(session);
    else post({type:"request"});
  });
  document.addEventListener("visibilitychange", ()=>{
    if(!document.hidden){
      const before = sessionStorage.getItem(KEY);
      const current = rawSession();
      if(before && !current) emit("expired");
      schedule();
      if(current) announce(current);
      else post({type:"request"});
    }
  });
})();
