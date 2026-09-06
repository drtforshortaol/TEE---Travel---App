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
    dialog.style.cssText='width:min(96vw,900px);height:min(92vh,940px);padding:0;border:0;border-radius:18px;overflow:hidden;box-shadow:0 22px 70px rgba(0,0,0,.35);background:#fff';
    dialog.innerHTML=`<div style="display:flex;flex-direction:column;height:100%;min-height:0;background:#fff">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 14px;border-bottom:1px solid #dbe4e7;background:#f7faf9">
        <div><strong style="display:block">Sync Shared Records</strong><small style="color:#5a6b72">Glenn's iPhone is the master Shared source.</small></div>
        <button type="button" data-close style="border:0;background:#e9eff1;border-radius:10px;padding:9px 12px;font-weight:800">× Close</button>
      </div>
      <details open data-field-guide style="margin:10px 12px 8px;padding:10px 12px;border:1px solid #d9e3e4;border-radius:12px;background:#fffaf0;max-height:42vh;overflow:auto">
        <summary style="font-weight:900;cursor:pointer">How to sync in the field — SEND / RECEIVE</summary>
        <div style="margin-top:10px;line-height:1.45;font-size:15px">
          <p style="margin:0 0 6px"><strong>Glenn's master iPhone — SEND</strong></p>
          <ol style="margin:0 0 12px;padding-left:22px"><li>Open TEE Hub and unlock the Secure Vault.</li><li>Tap <strong>Sync Shared Records</strong>.</li><li>Tap <strong>Create / Share Shared Records</strong>.</li><li>Choose <strong>AirDrop</strong> and select the receiving traveler's iPhone.</li><li>Keep the sync code. Give it separately, verbally or by text.</li></ol>
          <p style="margin:0 0 6px"><strong>Other traveler's iPhone — RECEIVE</strong></p>
          <ol style="margin:0 0 12px;padding-left:22px"><li>Accept the AirDrop. If asked, save the file in <strong>Files</strong>.</li><li>Open TEE Hub and unlock the Secure Vault.</li><li>Tap <strong>Sync Shared Records</strong>.</li><li>Tap <strong>Choose Shared Records File</strong>.</li><li>Select the AirDropped TEE Shared Records file from <strong>Files</strong>.</li><li>Enter the sync code from Glenn's phone.</li><li>Confirm TEE reports the sync completed.</li><li>Verify the needed Shared information in Vault Records or Quick Reference.</li></ol>
          <p style="margin:0"><strong>Important:</strong> Do not upload the Shared file to GitHub. AirDrop is preferred when everyone is together.</p>
        </div>
      </details>
      <div style="padding:0 12px 8px;color:#5a6b72;font-size:13px"><strong>Below:</strong> use the secure sync controls to create/send or receive/import the encrypted Shared file.</div>
      <iframe title="TEE Shared Records Sync" data-sync-frame style="flex:1;min-height:260px;width:100%;border:0;border-top:1px solid #e0e7e9;background:#fff"></iframe>
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
      frame.src='apps/travel-private-documents/index.html?teeView=vault&teeEnter=1&teeEmbed=1&teeSharedSync=1&teeSyncBuild=3.4.94';
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
