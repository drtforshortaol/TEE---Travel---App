"use strict";
(function(){
  if(window.TEEHubSharedSyncVerifierV3497)return;
  const vaultFrame=document.getElementById('hubVaultFrame');
  const syncButton=document.getElementById('hubSharedSyncOpen');
  if(!vaultFrame||!syncButton)return;

  function titleOf(record){
    const f=record?.fields&&typeof record.fields==='object'?record.fields:{};
    return String(f.contactName||record.contactName||record.title||record.name||'Emergency contact').trim();
  }
  function contactRecords(list){return (Array.isArray(list)?list:[]).filter(r=>r?.type==='emergencyContact'&&r?.recordStatus!=='deleted');}
  function sessionContacts(){return contactRecords(window.TEEVaultSession?.get?.()?.records||[]);}
  function vaultContacts(){
    try{
      const w=vaultFrame.contentWindow;
      if(!w||typeof w.getVaultState!=='function'||w.getVaultState()!=='unlocked'||typeof w.getActiveVaultData!=='function')return [];
      const raw=w.getActiveVaultData();
      const data=typeof w.normalizeVaultData==='function'?w.normalizeVaultData(raw).data:raw;
      return contactRecords(data?.records||[]);
    }catch{return [];}
  }
  function refreshAuthorizedSession(){
    try{
      const w=vaultFrame.contentWindow;
      if(w&&typeof w.publishAuthorizedSession==='function'&&typeof w.getVaultState==='function'&&w.getVaultState()==='unlocked'){
        w.publishAuthorizedSession();
        return true;
      }
    }catch{}
    return false;
  }
  function ensurePanel(){
    const dialog=document.getElementById('hubSharedSyncDialogV3496')||document.getElementById('hubSharedSyncDialogV3495');
    if(!dialog)return null;
    let panel=dialog.querySelector('[data-tee-sync-verifier]');
    if(panel)return panel;
    panel=document.createElement('section');
    panel.dataset.teeSyncVerifier='1';
    panel.style.cssText='margin:12px 18px;padding:12px 14px;border:1px solid #b8cbd0;border-radius:12px;background:#f5f9fa;color:#17343b';
    const host=dialog.querySelector('details')?.parentElement||dialog.firstElementChild||dialog;
    const details=dialog.querySelector('details');
    if(details?.nextSibling)host.insertBefore(panel,details.nextSibling);else host.appendChild(panel);
    return panel;
  }
  function render(){
    const panel=ensurePanel();if(!panel)return;
    const s=sessionContacts(),v=vaultContacts();
    const sNames=s.map(titleOf).filter(Boolean),vNames=v.map(titleOf).filter(Boolean);
    panel.innerHTML=`<strong>Shared-contact check</strong><div style="margin-top:6px">Vault: ${v.length} emergency contact${v.length===1?'':'s'} · Hub session: ${s.length}</div><div style="margin-top:6px;overflow-wrap:anywhere"><strong>Authorized contact names:</strong> ${sNames.length?sNames.map(x=>x.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))).join(' · '):'None shown'}</div><button type="button" data-refresh-contacts style="margin-top:10px;padding:9px 12px;border-radius:9px;border:1px solid #9fb7bd;background:#fff;font-weight:800">Refresh authorized contacts from Vault</button>`;
    panel.querySelector('[data-refresh-contacts]')?.addEventListener('click',()=>{refreshAuthorizedSession();setTimeout(render,180);});
  }
  function onOpen(){setTimeout(()=>{refreshAuthorizedSession();setTimeout(render,180);},120);}
  syncButton.addEventListener('click',onOpen);
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>setTimeout(render,100));
  const observer=new MutationObserver(()=>{if(document.querySelector('#hubSharedSyncDialogV3496[open],#hubSharedSyncDialogV3495[open]'))render();});
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
  window.TEEHubSharedSyncVerifierV3497=Object.freeze({render,sessionContacts,vaultContacts,refreshAuthorizedSession});
})();
