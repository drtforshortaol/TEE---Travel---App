"use strict";
(function(){
  if(window.TEEHubSharedSyncV3490)return;
  const recordsButton=document.getElementById('hubVaultRecordsOpen');
  const sessionSummary=document.getElementById('hubVaultSessionSummary');
  const vaultToggle=document.getElementById('hubVaultToggle');
  if(!sessionSummary)return;

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

  let dialog=null;
  let frame=null;

  function ensureDialog(){
    if(dialog)return;
    dialog=document.createElement('dialog');
    dialog.id='hubSharedSyncDialogV3491';
    dialog.style.cssText='width:min(96vw,900px);height:min(90vh,900px);padding:0;border:0;border-radius:18px;overflow:hidden;box-shadow:0 22px 70px rgba(0,0,0,.35);background:#fff';
    dialog.innerHTML=`<div style="display:flex;flex-direction:column;height:100%;min-height:0;background:#fff">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 14px;border-bottom:1px solid #dbe4e7;background:#f7faf9">
        <div><strong style="display:block">Sync Shared Records</strong><small style="color:#5a6b72">Shared records only. Private couple records stay untouched.</small></div>
        <button type="button" data-close style="border:0;background:#e9eff1;border-radius:10px;padding:9px 12px;font-weight:800">× Close</button>
      </div>
      <iframe title="TEE Shared Records Sync" data-sync-frame style="flex:1;min-height:0;width:100%;border:0;background:#fff"></iframe>
    </div>`;
    document.body.appendChild(dialog);
    frame=dialog.querySelector('[data-sync-frame]');
    dialog.querySelector('[data-close]')?.addEventListener('click',close);
    dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
  }

  function open(){
    if(!window.TEEVaultSession?.isOpen?.()){
      vaultToggle?.click();
      return;
    }
    ensureDialog();
    if(!frame.getAttribute('src')){
      frame.src='apps/travel-private-documents/index.html?teeView=vault&teeEnter=1&teeEmbed=1&teeSharedSync=1';
    }
    if(dialog.showModal&&!dialog.open)dialog.showModal();
    else dialog.setAttribute('open','');
  }

  function close(){
    if(!dialog)return;
    if(dialog.close&&dialog.open)dialog.close();else dialog.removeAttribute('open');
    if(frame){frame.src='about:blank';frame.removeAttribute('src');}
  }

  button.addEventListener('click',open);
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{
    const openSession=window.TEEVaultSession?.isOpen?.();
    button.hidden=!openSession;
    if(!openSession&&dialog?.open)close();
  });
  button.hidden=!window.TEEVaultSession?.isOpen?.();
  window.TEEHubSharedSyncV3490=Object.freeze({open,close});
})();
