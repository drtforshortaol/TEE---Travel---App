"use strict";

// Clean Vault bridge: the encrypted Vault remains the authority. After a
// successful unlock it sends one complete, temporary authorized-session payload
// to its same-origin parent. No polling, BroadcastChannel, window.name, or
// direct parent storage writes are used.
(() => {
  const OPEN_MESSAGE = "TEE_VAULT_SESSION_OPEN";
  const CLOSED_MESSAGE = "TEE_VAULT_SESSION_CLOSED";
  const LOCK_MESSAGE = "TEE_VAULT_SESSION_LOCK";

  function fullSession(){
    try{
      if(typeof currentAuthorizedSessionPayload === "function"){
        const payload = currentAuthorizedSessionPayload();
        if(payload && Number(payload.version) === 2 && Array.isArray(payload.records)) return payload;
      }
    }catch{}
    return null;
  }

  function sendOpen(){
    const session = fullSession();
    if(!session) return false;
    try{
      if(window.parent && window.parent !== window){
        window.parent.postMessage({type:OPEN_MESSAGE, session}, location.origin);
      }
    }catch{}
    return true;
  }

  function sendClosed(){
    try{
      if(window.parent && window.parent !== window){
        window.parent.postMessage({type:CLOSED_MESSAGE}, location.origin);
      }
    }catch{}
  }

  window.addEventListener("tee-vault-session-changed", event => {
    const type = event.detail?.type || "";
    if(type === "TEE_VAULT_SESSION_CLOSED") sendClosed();
    else if(type === "TEE_VAULT_SESSION_OPEN") queueMicrotask(sendOpen);
  });

  window.addEventListener("message", event => {
    if(event.origin !== location.origin) return;
    const message = event.data || {};
    if(message.type === LOCK_MESSAGE){
      try{
        if(typeof lockSecureVault === "function") lockSecureVault("Vault locked from TEE.");
      }catch{}
    }
  });

  // If the Vault page/frame was already unlocked before this script initialized,
  // publish its current temporary session once.
  window.addEventListener("pageshow", sendOpen);
})();
