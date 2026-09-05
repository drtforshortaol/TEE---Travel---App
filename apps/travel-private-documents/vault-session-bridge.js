"use strict";

// TEE v3.4.73 — robust volatile authorization bridge.
// Copies only the temporary 30-minute authorized session into the top-level
// TEE browsing context so navigation to another TEE app can reuse it.
// No decrypted session data is written to localStorage.
(() => {
  const KEY = "teeAuthorizedVaultSessionV1";
  const PREFIX = "TEE_VAULT_SESSION_V2:";
  const CHANNEL = "tee-vault-session-sync-v1";

  function readSession(){
    try{
      const raw = sessionStorage.getItem(KEY);
      const session = JSON.parse(raw || "null");
      if(!session || Number(session.version) !== 2) return null;
      if(!Number.isFinite(Number(session.expiresAt)) || Number(session.expiresAt) <= Date.now()) return null;
      if(!Array.isArray(session.records)) session.records = [];
      return session;
    }catch{return null;}
  }

  function setWindowName(win, session){
    try{ win.name = PREFIX + JSON.stringify(session); }catch{}
  }

  function clearWindowName(win){
    try{
      if(String(win.name || "").startsWith(PREFIX)) win.name = "";
    }catch{}
  }

  function broadcastSession(session){
    if(!session) return;

    // Preserve same-tab navigation even when Secure Vault is the full page.
    setWindowName(window, session);

    // When Vault is running inside the Hub iframe, copy the volatile session
    // into the top-level same-origin browsing context before the iframe closes.
    try{
      if(window.parent && window.parent !== window && window.parent.location.origin === location.origin){
        window.parent.sessionStorage.setItem(KEY, JSON.stringify(session));
        setWindowName(window.parent, session);
      }
    }catch{}

    try{
      if(window.parent && window.parent !== window){
        window.parent.postMessage({type:"TEE_VAULT_SESSION_PAYLOAD", session}, location.origin);
      }
    }catch{}

    try{
      const channel = new BroadcastChannel(CHANNEL);
      channel.postMessage({type:"session", session});
      channel.close();
    }catch{}
  }

  function broadcastClear(){
    clearWindowName(window);
    try{
      if(window.parent && window.parent !== window && window.parent.location.origin === location.origin){
        window.parent.sessionStorage.removeItem(KEY);
        clearWindowName(window.parent);
      }
    }catch{}
    try{
      if(window.parent && window.parent !== window){
        window.parent.postMessage({type:"TEE_VAULT_SESSION_CLEARED"}, location.origin);
      }
    }catch{}
    try{
      const channel = new BroadcastChannel(CHANNEL);
      channel.postMessage({type:"clear", reason:"vault-closed"});
      channel.close();
    }catch{}
  }

  function syncNow(){
    const session = readSession();
    if(session) broadcastSession(session);
  }

  window.addEventListener("tee-vault-session-changed", event => {
    const type = event.detail?.type || "";
    if(type === "TEE_VAULT_SESSION_CLOSED") broadcastClear();
    else syncNow();
  });

  window.addEventListener("pageshow", syncNow);
  document.addEventListener("visibilitychange", () => { if(!document.hidden) syncNow(); });

  // Covers cases where the Vault unlock code updates sessionStorage without
  // dispatching the custom event expected by older builds.
  let last = "";
  setInterval(() => {
    let raw = "";
    try{ raw = sessionStorage.getItem(KEY) || ""; }catch{}
    if(raw === last) return;
    last = raw;
    const session = readSession();
    if(session) broadcastSession(session);
    else if(!raw) broadcastClear();
  }, 250);

  syncNow();
})();
