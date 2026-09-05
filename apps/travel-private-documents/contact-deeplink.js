"use strict";

// v3.4.70 — Secure Vault session bridge.
// This file intentionally does NOT perform contact deep-linking. Its only job
// is to publish the already-authorized, in-memory/sessionStorage Vault session
// from the Secure Vault page to other open TEE tabs using BroadcastChannel.
// No decrypted session is written to localStorage or GitHub.

(() => {
  const KEY = "teeAuthorizedVaultSessionV1";
  const REQUIRED_VERSION = 2;
  const CHANNEL_NAME = "tee-vault-session-sync-v1";
  let channel = null;
  let lastSignature = "";
  let pollTimer = null;

  function parse(raw){
    try{
      const value = typeof raw === "string" ? JSON.parse(raw || "null") : raw;
      if(!value || typeof value !== "object") return null;
      if(Number(value.version) !== REQUIRED_VERSION) return null;
      if(!Number.isFinite(Number(value.expiresAt)) || Number(value.expiresAt) <= Date.now()) return null;
      if(!Array.isArray(value.records)) value.records = [];
      return value;
    }catch{
      return null;
    }
  }

  function current(){
    return parse(sessionStorage.getItem(KEY));
  }

  function signature(session){
    if(!session) return "";
    return `${session.profileId || ""}|${session.unlockedAt || ""}|${session.expiresAt || ""}|${(session.records || []).length}`;
  }

  function post(payload){
    try{ channel?.postMessage(payload); }catch{}
  }

  function announce(force=false){
    const session = current();
    if(!session) return false;
    const sig = signature(session);
    if(force || sig !== lastSignature){
      lastSignature = sig;
      post({type:"session", session});
    }
    return true;
  }

  function check(){
    const session = current();
    if(session){
      const sig = signature(session);
      if(sig !== lastSignature) announce(true);
    }else if(lastSignature){
      lastSignature = "";
      post({type:"clear", reason:"vault-closed"});
    }
  }

  if("BroadcastChannel" in window){
    try{
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.addEventListener("message", event => {
        const message = event.data || {};
        if(message.type === "request") announce(true);
      });
    }catch{ channel = null; }
  }

  // Secure Vault writes the authorized session after successful decryption.
  // Poll lightly so that write is announced even though sessionStorage itself
  // does not fire a same-document storage event.
  pollTimer = setInterval(check, 300);
  check();

  window.addEventListener("pageshow", () => { check(); announce(true); });
  document.addEventListener("visibilitychange", () => {
    if(!document.hidden){ check(); announce(true); }
  });
  window.addEventListener("beforeunload", () => {
    if(pollTimer !== null) clearInterval(pollTimer);
    try{ channel?.close(); }catch{}
  });
})();
