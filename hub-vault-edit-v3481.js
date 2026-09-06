"use strict";

(function(){
  const frame=document.getElementById('hubVaultFrame');
  if(!frame)return;

  let dialog=null;
  let frameHome=null;
  let frameNextSibling=null;
  let visibilityGuard=null;
  let restoring=[];

  function ensureDialog(){
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.id='hubVaultEditDialog';
    dialog.className='install-tee-dialog';
    dialog.innerHTML=`<div class="install-tee-card" style="width:min(980px,96vw);max-height:94vh;overflow:hidden;display:flex;flex-direction:column;padding:0">
      <div class="install-tee-head" style="padding:14px 16px"><div><span class="stream-kicker">VAULT RECORD</span><h2 id="hubVaultEditTitle" style="margin:2px 0">Edit Record</h2><p style="margin:4px 0 0">Make the change and tap Save Record. No Maintenance or separate search is needed.</p></div><button id="hubVaultEditClose" class="install-close" type="button">× Close</button></div>
      <div id="hubVaultEditFrameHost" style="min-height:65vh;overflow:hidden;background:#f7f9fa"></div>
      <div class="install-tee-footer" style="padding:12px 16px"><button id="hubVaultEditDone" class="hub-primary-action" type="button">Done</button></div>
    </div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('#hubVaultEditClose')?.addEventListener('click',closeEditor);
    dialog.querySelector('#hubVaultEditDone')?.addEventListener('click',closeEditor);
    dialog.addEventListener('click',event=>{if(event.target===dialog)closeEditor();});
    return dialog;
  }

  function rememberAndHide(el){
    if(!el)return;
    restoring.push([el,el.style.display]);
    el.style.display='none';
  }

  function simplifyFrame(doc,form){
    restoring=[];
    rememberAndHide(doc.querySelector('header'));
    rememberAndHide(doc.querySelector('footer'));
    // Inside the Secure Records workspace, keep only the edit form visible.
    const parent=form?.parentElement;
    if(parent){
      [...parent.children].forEach(child=>{if(child!==form)rememberAndHide(child);});
    }
    // Hide known surrounding sections so the phone sees the editor, not Vault administration.
    ['secureVaultDashboard','secureQuickActions','secureExpirationDashboard','secureFavorites','secureRecycleBin','secureActivityCenter','secureVaultStatistics','secureVaultHealth','secureTeeImport','secureTripWorkspace','secureEmergencyMode'].forEach(id=>rememberAndHide(doc.getElementById(id)));
    if(doc.body){
      restoring.push([doc.body,doc.body.style.margin]);
      doc.body.style.margin='0';
    }
  }

  function restoreFrameStyles(){
    restoring.reverse().forEach(([el,value])=>{try{el.style.display=value;}catch{try{el.style.margin=value;}catch{}}});
    restoring=[];
  }

  function keepFrameVisible(){
    if(visibilityGuard!==null)clearInterval(visibilityGuard);
    visibilityGuard=setInterval(()=>{
      if(!dialog?.open)return;
      frame.hidden=false;
    },120);
  }

  function stopGuard(){
    if(visibilityGuard!==null)clearInterval(visibilityGuard);
    visibilityGuard=null;
  }

  function closeEditor(){
    stopGuard();
    try{restoreFrameStyles();}catch{}
    if(frameHome){
      if(frameNextSibling&&frameNextSibling.parentNode===frameHome)frameHome.insertBefore(frame,frameNextSibling);
      else frameHome.appendChild(frame);
    }
    frame.hidden=true;
    frame.style.width='';
    frame.style.height='';
    frame.style.border='';
    if(dialog?.close)dialog.close();else dialog?.removeAttribute('open');
    frameHome=null;
    frameNextSibling=null;
  }

  function activeRecord(recordId){
    const w=frame.contentWindow;
    if(!w||typeof w.getActiveVaultData!=='function'||typeof w.normalizeVaultData!=='function')return null;
    const data=w.normalizeVaultData(w.getActiveVaultData()).data;
    return (data?.records||[]).find(record=>record.recordId===recordId)||null;
  }

  function openEditor(recordId,title='Record'){
    if(!window.TEEVaultSession?.isOpen?.()){
      alert('Unlock the Vault before editing a protected record.');
      return;
    }
    const w=frame.contentWindow;
    const doc=frame.contentDocument;
    if(!w||!doc||typeof w.openRecordForm!=='function'){
      alert('TEE could not open the editor. Close and reopen the Vault once, then try again.');
      return;
    }
    const record=activeRecord(recordId);
    if(!record){
      alert('This record is not available in the currently unlocked Vault.');
      return;
    }

    const dlg=ensureDialog();
    const host=dlg.querySelector('#hubVaultEditFrameHost');
    const titleNode=dlg.querySelector('#hubVaultEditTitle');
    if(titleNode)titleNode.textContent=`Edit ${title}`;

    frameHome=frame.parentElement;
    frameNextSibling=frame.nextSibling;
    host.appendChild(frame);
    frame.hidden=false;
    frame.style.width='100%';
    frame.style.height='68vh';
    frame.style.border='0';

    try{
      w.clearSecureSearch?.();
      w.expandSecureRecordsWorkspace?.({scroll:false});
      w.openRecordForm(record.type,record);
      const form=w.secureVaultUi?.recordForm||doc.getElementById('secureRecordForm');
      simplifyFrame(doc,form);
      requestAnimationFrame(()=>form?.scrollIntoView({behavior:'auto',block:'start'}));
    }catch(error){
      console.error(error);
      closeEditor();
      alert('TEE could not prepare this record for editing.');
      return;
    }

    if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
    keepFrameVisible();
  }

  window.addEventListener('tee-vault-edit-record',event=>{
    const detail=event.detail||{};
    if(detail.recordId)openEditor(detail.recordId,detail.title||'Record');
  });

  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{
    if(!window.TEEVaultSession?.isOpen?.()&&dialog?.open)closeEditor();
  });
})();
