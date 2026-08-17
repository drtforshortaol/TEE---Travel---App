"use strict";

(function(){
  const KEY = "teeAuthorizedVaultSessionV1";
  const REQUIRED_VERSION = 2;
  const EVENT = "tee-vault-session-changed";
  let expiryTimer = null;

  function parse(raw){
    try{
      const value = JSON.parse(raw || "null");
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

  function schedule(){
    if(expiryTimer !== null) clearTimeout(expiryTimer);
    expiryTimer = null;
    const session = rawSession();
    if(!session) return;
    const delay = Math.max(0, Number(session.expiresAt) - Date.now());
    expiryTimer = setTimeout(()=>{
      sessionStorage.removeItem(KEY);
      expiryTimer = null;
      emit("expired");
    }, delay + 25);
  }

  function get(){
    const session = rawSession();
    if(!session){
      schedule();
      return null;
    }
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
  window.addEventListener("pageshow", schedule);
  document.addEventListener("visibilitychange", ()=>{
    if(!document.hidden){
      const before = sessionStorage.getItem(KEY);
      const current = rawSession();
      if(before && !current) emit("expired");
      schedule();
    }
  });
})();
