"use strict";

(function(){
  const KEY='teeAuthorizedVaultSessionV1';
  const EVENT='tee-vault-session-changed';
  const WINDOW_PREFIX='TEE_VAULT_SESSION_V2:';
  let timer=null;
  let modal=null;

  function parse(raw){
    try{
      const value=JSON.parse(raw||'null');
      if(!value||typeof value!=='object')return null;
      if(Number(value.version)!==2)return null;
      if(!Number.isFinite(Number(value.expiresAt))||Number(value.expiresAt)<=Date.now())return null;
      if(!Array.isArray(value.records))return null;
      return value;
    }catch{return null;}
  }

  function installSession(session,reason='frame-bridge'){
    if(!session)return false;
    try{sessionStorage.setItem(KEY,JSON.stringify(session));}catch{return false;}
    try{window.name=WINDOW_PREFIX+JSON.stringify(session);}catch{}
    try{window.dispatchEvent(new CustomEvent(EVENT,{detail:{reason,session}}));}catch{}
    return true;
  }

  function copyFromFrame(frame){
    if(!frame?.contentWindow)return false;
    try{
      const raw=frame.contentWindow.sessionStorage.getItem(KEY);
      const session=parse(raw);
      if(!session)return false;
      return installSession(session,'frame-copy');
    }catch{return false;}
  }

  function activeVaultFrames(){
    return [...document.querySelectorAll('iframe')].filter(frame=>{
      const src=frame.getAttribute('src')||frame.dataset?.src||'';
      return /travel-private-documents\/index\.html/i.test(src);
    });
  }

  function startPolling(){
    if(timer!==null)return;
    timer=setInterval(()=>{
      let copied=false;
      activeVaultFrames().forEach(frame=>{if(copyFromFrame(frame))copied=true;});
      if(copied&&modal){closeModal();}
    },250);
  }

  function stopPolling(){
    if(timer!==null){clearInterval(timer);timer=null;}
  }

  function closeModal(){
    if(modal){modal.remove();modal=null;}
    if(!activeVaultFrames().length)stopPolling();
  }

  function openModal(vaultHref){
    if(modal)return;
    modal=document.createElement('div');
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.style.cssText='position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;padding:18px;overflow:auto';
    const card=document.createElement('div');
    card.style.cssText='width:min(980px,100%);height:min(88vh,900px);background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.35);display:flex;flex-direction:column';
    const head=document.createElement('div');
    head.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#173f50;color:white;font:700 16px system-ui';
    head.innerHTML='<span>Secure Vault</span><button type="button" data-vault-modal-close style="border:0;border-radius:8px;padding:8px 12px;font-weight:800;cursor:pointer">Close</button>';
    const frame=document.createElement('iframe');
    frame.title='TEE Secure Vault';
    frame.src=vaultHref;
    frame.style.cssText='width:100%;height:100%;border:0;background:white';
    card.append(head,frame);modal.append(card);document.body.append(modal);
    head.querySelector('[data-vault-modal-close]')?.addEventListener('click',closeModal);
    startPolling();
  }

  document.addEventListener('click',event=>{
    const link=event.target.closest?.('.tee-vault-state a,[data-tee-inline-vault],a[href*="travel-private-documents/index.html?teeView=vault"]');
    if(!link)return;
    const href=new URL(link.getAttribute('href')||'apps/travel-private-documents/index.html?teeView=vault&teeEnter=1',location.href);
    if(href.origin!==location.origin)return;
    event.preventDefault();
    href.searchParams.set('teeEmbed','1');
    openModal(href.href);
  });

  window.addEventListener('message',event=>{
    if(event.origin!==location.origin)return;
    if(event.data?.type==='TEE_VAULT_SESSION_OPEN'){
      const sourceFrame=activeVaultFrames().find(frame=>frame.contentWindow===event.source);
      if(sourceFrame&&copyFromFrame(sourceFrame))closeModal();
    }
    if(event.data?.type==='TEE_VAULT_SESSION_CLOSED'){
      try{sessionStorage.removeItem(KEY);}catch{}
      try{if(String(window.name||'').startsWith(WINDOW_PREFIX))window.name='';}catch{}
      try{window.dispatchEvent(new CustomEvent(EVENT,{detail:{reason:'vault-closed',session:null}}));}catch{}
    }
  });

  window.addEventListener('DOMContentLoaded',()=>{
    if(activeVaultFrames().length)startPolling();
  });
})();
