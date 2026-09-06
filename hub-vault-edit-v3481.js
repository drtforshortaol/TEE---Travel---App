"use strict";

(function(){
  // iPhone/Safari can repeatedly reload an iframe when it is moved between DOM parents.
  // The editor therefore uses its own dedicated, stationary iframe and never reparents
  // the Hub's normal Vault iframe.
  let dialog=null;
  let editFrame=null;
  let guard=null;
  let pendingRecordId=null;
  let pendingTitle='Record';
  let editorPrepared=false;

  function ensureDialog(){
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.id='hubVaultEditDialog';
    dialog.className='install-tee-dialog';
    dialog.innerHTML=`<div class="install-tee-card" style="width:min(980px,96vw);max-height:94vh;overflow:hidden;display:flex;flex-direction:column;padding:0">
      <div class="install-tee-head" style="padding:14px 16px"><div><span class="stream-kicker">VAULT RECORD</span><h2 id="hubVaultEditTitle" style="margin:2px 0">Edit Record</h2><p id="hubVaultEditHint" style="margin:4px 0 0">Opening the encrypted editor…</p></div><button id="hubVaultEditClose" class="install-close" type="button">× Close</button></div>
      <div id="hubVaultEditFrameHost" style="min-height:65vh;overflow:hidden;background:#f7f9fa"></div>
      <div class="install-tee-footer" style="padding:12px 16px"><button id="hubVaultEditDone" class="hub-primary-action" type="button">Done</button></div>
    </div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('#hubVaultEditClose')?.addEventListener('click',closeEditor);
    dialog.querySelector('#hubVaultEditDone')?.addEventListener('click',closeEditor);
    dialog.addEventListener('click',event=>{if(event.target===dialog)closeEditor();});
    return dialog;
  }

  function ensureEditFrame(){
    const dlg=ensureDialog();
    if(editFrame)return editFrame;
    const host=dlg.querySelector('#hubVaultEditFrameHost');
    editFrame=document.createElement('iframe');
    editFrame.id='hubVaultDedicatedEditFrame';
    editFrame.title='Secure Vault record editor';
    editFrame.src='apps/travel-private-documents/index.html?teeView=vault&teeEnter=1&teeEmbed=1&teeEdit=1';
    editFrame.style.width='100%';
    editFrame.style.height='70vh';
    editFrame.style.border='0';
    editFrame.style.background='#f7f9fa';
    editFrame.addEventListener('load',()=>{
      editorPrepared=false;
      if(dialog?.open)prepareEditor();
    });
    host.appendChild(editFrame);
    return editFrame;
  }

  function frameWindow(){return editFrame?.contentWindow||null;}
  function frameDocument(){try{return editFrame?.contentDocument||null;}catch{return null;}}
  function frameReady(){
    const w=frameWindow();
    return Boolean(w&&typeof w.openRecordForm==='function'&&typeof w.getVaultState==='function'&&typeof w.getActiveVaultData==='function'&&typeof w.normalizeVaultData==='function');
  }
  function liveVaultUnlocked(){
    try{return frameWindow()?.getVaultState?.()==='unlocked';}catch{return false;}
  }
  function updateHint(text){const node=dialog?.querySelector('#hubVaultEditHint');if(node)node.textContent=text;}

  function activeRecord(recordId){
    const w=frameWindow();
    if(!w||typeof w.getActiveVaultData!=='function'||typeof w.normalizeVaultData!=='function')return null;
    try{
      const data=w.normalizeVaultData(w.getActiveVaultData()).data;
      return (data?.records||[]).find(record=>record.recordId===recordId)||null;
    }catch{return null;}
  }

  function simplifyFrame(doc,form){
    if(!doc||!form)return;
    const keep=new Set([form]);
    const workspace=form.parentElement;
    if(workspace){
      [...workspace.children].forEach(child=>{child.style.display=keep.has(child)?'':'none';});
    }
    const header=doc.querySelector('header');
    const footer=doc.querySelector('footer');
    if(header)header.style.display='none';
    if(footer)footer.style.display='none';
    ['secureVaultDashboard','secureQuickActions','secureExpirationDashboard','secureFavorites','secureRecycleBin','secureActivityCenter','secureVaultStatistics','secureVaultHealth','secureTeeImport','secureTripWorkspace','secureEmergencyMode'].forEach(id=>{
      const el=doc.getElementById(id);if(el)el.style.display='none';
    });
    try{doc.documentElement.style.scrollBehavior='auto';doc.body.style.margin='0';}catch{}
  }

  function prepareEditor(){
    if(editorPrepared||!pendingRecordId||!frameReady())return false;
    if(!liveVaultUnlocked()){
      updateHint('Confirm the Couple passphrase once below. TEE will open this record automatically.');
      return false;
    }
    const w=frameWindow();
    const doc=frameDocument();
    const record=activeRecord(pendingRecordId);
    if(!record){
      updateHint('Vault is open. Waiting for this record to become available…');
      return false;
    }
    try{
      w.clearSecureSearch?.();
      w.expandSecureRecordsWorkspace?.({scroll:false});
      w.openRecordForm(record.type,record);
      const form=w.secureVaultUi?.recordForm||doc?.getElementById('secureRecordForm');
      if(!form)return false;
      simplifyFrame(doc,form);
      editorPrepared=true;
      updateHint('Make the change and tap Save Record.');
      setTimeout(()=>{try{form.scrollIntoView({behavior:'auto',block:'start'});}catch{}},50);
      return true;
    }catch(error){
      console.error(error);
      updateHint('TEE could not prepare the editor. Close this window and try Edit once more.');
      return false;
    }
  }

  function startGuard(){
    stopGuard();
    guard=setInterval(()=>{
      if(!dialog?.open)return;
      prepareEditor();
    },500);
  }
  function stopGuard(){if(guard!==null){clearInterval(guard);guard=null;}}

  function closeEditor(){
    stopGuard();
    if(dialog?.close)dialog.close();else dialog?.removeAttribute('open');
    pendingRecordId=null;
    pendingTitle='Record';
    editorPrepared=false;
    // Destroy the dedicated editor frame after use so decrypted Vault state is not
    // retained longer than needed. A fresh stationary iframe is created next time.
    if(editFrame){try{editFrame.remove();}catch{}editFrame=null;}
  }

  function openEditor(recordId,title='Record'){
    if(!window.TEEVaultSession?.isOpen?.()){
      alert('Unlock the Vault first, then tap Edit again.');
      return;
    }
    pendingRecordId=recordId;
    pendingTitle=title;
    editorPrepared=false;
    const dlg=ensureDialog();
    const titleNode=dlg.querySelector('#hubVaultEditTitle');
    if(titleNode)titleNode.textContent=`Edit ${title}`;
    updateHint('Opening the encrypted editor…');
    ensureEditFrame();
    if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
    startGuard();
    prepareEditor();
  }

  window.addEventListener('tee-vault-edit-record',event=>{
    const detail=event.detail||{};
    if(detail.recordId)openEditor(detail.recordId,detail.title||'Record');
  });
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{
    if(!window.TEEVaultSession?.isOpen?.()&&dialog?.open)closeEditor();
  });
})();
