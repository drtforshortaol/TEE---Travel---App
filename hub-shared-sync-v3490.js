"use strict";
(function(){
  if(window.TEEHubSharedSyncV3490)return;
  const recordsButton=document.getElementById('hubVaultRecordsOpen');
  const sessionSummary=document.getElementById('hubVaultSessionSummary');
  const vaultFrame=document.getElementById('hubVaultFrame');
  const vaultPanel=document.getElementById('hubVaultPanel');
  const vaultToggle=document.getElementById('hubVaultToggle');
  if(!sessionSummary||!vaultFrame)return;

  let button=document.getElementById('hubSharedSyncOpen');
  if(!button){
    button=document.createElement('button');
    button.id='hubSharedSyncOpen';
    button.type='button';
    button.className='hub-primary-action';
    button.textContent='Sync Shared Records';
    if(recordsButton?.parentElement)recordsButton.parentElement.insertBefore(button,recordsButton.nextSibling);
    else sessionSummary.appendChild(button);
  }

  let ready=false;
  let attempts=0;
  let timer=null;
  function sendOpen(){
    try{vaultFrame.contentWindow?.postMessage({type:'TEE_OPEN_SHARED_SYNC'},location.origin);}catch{}
  }
  function stop(){if(timer){clearInterval(timer);timer=null;}attempts=0;}
  function startSending(){
    stop();sendOpen();
    timer=setInterval(()=>{attempts++;sendOpen();if(ready||attempts>24)stop();},250);
  }
  function open(){
    if(!window.TEEVaultSession?.isOpen?.()){
      vaultToggle?.click();
      return;
    }
    if(!vaultFrame.getAttribute('src'))vaultFrame.src=vaultFrame.dataset.src;
    if(vaultPanel)vaultPanel.hidden=false;
    vaultToggle?.setAttribute('aria-expanded','true');
    vaultFrame.hidden=false;
    ready=false;
    startSending();
    requestAnimationFrame(()=>vaultPanel?.scrollIntoView({behavior:'smooth',block:'start'}));
  }
  button.addEventListener('click',open);
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin)return;
    if(event.data?.type==='TEE_SHARED_SYNC_READY'){
      ready=true;
      if(vaultPanel?.hidden===false&&vaultFrame.hidden===false)sendOpen();
      stop();
    }
  });
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{
    button.hidden=!window.TEEVaultSession?.isOpen?.();
  });
  button.hidden=!window.TEEVaultSession?.isOpen?.();
  window.TEEHubSharedSyncV3490=Object.freeze({open});
})();
