"use strict";

(function(){
  const frame=document.getElementById('hubVaultFrame');
  if(!frame)return;

  let dialog=null;
  let frameHome=null;
  let frameNextSibling=null;
  let guard=null;
  let restoring=[];
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

  function hide(el){if(!el)return;restoring.push({el,display:el.style.display});el.style.display='none';}
  function simplifyFrame(doc,form){
    restoring=[];
    hide(doc.querySelector('header'));
    hide(doc.querySelector('footer'));
    const parent=form?.parentElement;
    if(parent)[...parent.children].forEach(child=>{if(child!==form)hide(child);});
    ['secureVaultDashboard','secureQuickActions','secureExpirationDashboard','secureFavorites','secureRecycleBin','secureActivityCenter','secureVaultStatistics','secureVaultHealth','secureTeeImport','secureTripWorkspace','secureEmergencyMode'].forEach(id=>hide(doc.getElementById(id)));
  }
  function restoreFrame(){
    restoring.reverse().forEach(item=>{try{item.el.style.display=item.display;}catch{}});
    restoring=[];
  }
  function activeRecord(recordId){
    const w=frame.contentWindow;
    if(!w||typeof w.getActiveVaultData!=='function'||typeof w.normalizeVaultData!=='function')return null;
    try{
      const data=w.normalizeVaultData(w.getActiveVaultData()).data;
      return (data?.records||[]).find(record=>record.recordId===recordId)||null;
    }catch{return null;}
  }
  function frameReady(){
    const w=frame.contentWindow;
    return Boolean(w&&typeof w.openRecordForm==='function'&&typeof w.getVaultState==='function');
  }
  function liveVaultUnlocked(){
    try{return frame.contentWindow?.getVaultState?.()==='unlocked';}catch{return false;}
  }
  function updateHint(text){const node=dialog?.querySelector('#hubVaultEditHint');if(node)node.textContent=text;}

  function prepareEditor(){
    if(editorPrepared||!pendingRecordId||!frameReady()||!liveVaultUnlocked())return false;
    const w=frame.contentWindow;
    const doc=frame.contentDocument;
    const record=activeRecord(pendingRecordId);
    if(!record)return false;
    try{
      w.clearSecureSearch?.();
      w.expandSecureRecordsWorkspace?.({scroll:false});
      w.openRecordForm(record.type,record);
      const form=w.secureVaultUi?.recordForm||doc.getElementById('secureRecordForm');
      if(!form)return false;
      simplifyFrame(doc,form);
      editorPrepared=true;
      updateHint('Make the change and tap Save Record.');
      requestAnimationFrame(()=>form.scrollIntoView({behavior:'auto',block:'start'}));
      return true;
    }catch(error){console.error(error);return false;}
  }

  function ensureFrameLoaded(){
    if(!frame.getAttribute('src'))frame.src=frame.dataset.src||'apps/travel-private-documents/index.html?teeView=vault&teeEnter=1&teeEmbed=1';
  }
  function startGuard(){
    if(guard!==null)clearInterval(guard);
    guard=setInterval(()=>{
      if(!dialog?.open)return;
      frame.hidden=false;
      if(prepareEditor())return;
      if(frameReady()&&!liveVaultUnlocked())updateHint('For editing, confirm the Couple passphrase once below. TEE will open this record automatically.');
      else updateHint('Opening the encrypted editor…');
    },180);
  }
  function stopGuard(){if(guard!==null)clearInterval(guard);guard=null;}

  function closeEditor(){
    stopGuard();
    try{restoreFrame();}catch{}
    if(frameHome){
      if(frameNextSibling&&frameNextSibling.parentNode===frameHome)frameHome.insertBefore(frame,frameNextSibling);
      else frameHome.appendChild(frame);
    }
    frame.hidden=true;
    frame.style.width='';frame.style.height='';frame.style.border='';
    if(dialog?.close)dialog.close();else dialog?.removeAttribute('open');
    frameHome=null;frameNextSibling=null;pendingRecordId=null;pendingTitle='Record';editorPrepared=false;
  }

  function openEditor(recordId,title='Record'){
    if(!window.TEEVaultSession?.isOpen?.()){
      alert('Unlock the Vault first, then tap Edit again.');
      return;
    }
    pendingRecordId=recordId;pendingTitle=title;editorPrepared=false;
    const dlg=ensureDialog();
    const host=dlg.querySelector('#hubVaultEditFrameHost');
    const titleNode=dlg.querySelector('#hubVaultEditTitle');
    if(titleNode)titleNode.textContent=`Edit ${title}`;
    updateHint('Opening the encrypted editor…');

    frameHome=frame.parentElement;
    frameNextSibling=frame.nextSibling;
    host.appendChild(frame);
    ensureFrameLoaded();
    frame.hidden=false;
    frame.style.width='100%';frame.style.height='68vh';frame.style.border='0';
    if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
    startGuard();
    prepareEditor();
  }

  frame.addEventListener('load',()=>{if(dialog?.open){editorPrepared=false;prepareEditor();}});
  window.addEventListener('tee-vault-edit-record',event=>{
    const detail=event.detail||{};
    if(detail.recordId)openEditor(detail.recordId,detail.title||'Record');
  });
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{
    if(!window.TEEVaultSession?.isOpen?.()&&dialog?.open)closeEditor();
  });
})();
