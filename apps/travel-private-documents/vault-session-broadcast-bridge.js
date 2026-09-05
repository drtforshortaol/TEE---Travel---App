"use strict";

(() => {
  const KEY = "teeAuthorizedVaultSessionV1";
  const CHANNEL_NAME = "tee-vault-session-sync-v1";
  let channel = null;
  let lastSignature = "";

  function parseSession(raw){
    try{
      const value = JSON.parse(raw || "null");
      if(!value || typeof value !== "object") return null;
      if(Number(value.version) !== 2) return null;
      if(!Number.isFinite(Number(value.expiresAt)) || Number(value.expiresAt) <= Date.now()) return null;
      if(!Array.isArray(value.records)) value.records = [];
      return value;
    }catch{
      return null;
    }
  }

  function currentSession(){
    return parseSession(sessionStorage.getItem(KEY));
  }

  function signature(session){
    if(!session) return "";
    return `${session.profileId || ""}|${session.expiresAt || ""}|${session.unlockedAt || ""}|${(session.records || []).length}`;
  }

  function broadcastCurrent(force = false){
    const session = currentSession();
    if(!session) return;
    const sig = signature(session);
    if(!force && sig === lastSignature) return;
    lastSignature = sig;
    try{ channel?.postMessage({type:"session", session}); }catch{}
  }

  if("BroadcastChannel" in window){
    try{
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.addEventListener("message", event => {
        const message = event.data || {};
        if(message.type === "request") broadcastCurrent(true);
      });
    }catch{
      channel = null;
    }
  }

  // The existing vault code owns unlock/decrypt. This bridge only notices when
  // its temporary authorized session appears in sessionStorage and shares it
  // with other currently open TEE tabs. It never writes decrypted data to
  // persistent localStorage.
  setInterval(() => {
    const session = currentSession();
    if(session){
      broadcastCurrent();
    }else{
      lastSignature = "";
    }
  }, 300);

  window.addEventListener("pageshow", () => broadcastCurrent(true));
  document.addEventListener("visibilitychange", () => {
    if(!document.hidden) broadcastCurrent(true);
  });
})();
