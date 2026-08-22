"use strict";
(function(){
  const params=new URLSearchParams(location.search);
  if(params.get('teeMode')==='maintenance'||params.get('teeView')==='vault')return;

  const nav=window.TEETravelerSourceNavV3401||{};
  const root=document.getElementById('smartDocumentIntake');
  const home=document.getElementById('streamlinedSourceHome');
  const manager=document.getElementById('teeSourceDocumentManager');
  const structured=document.getElementById('structuredDocumentsWorkspace');
  if(!root)return;

  const MAX_SOURCE_BYTES=2.25*1024*1024;
  let preparedSource=null;
  let savedDocumentId=null;
  let phase='add';

  const style=document.createElement('style');
  style.textContent=`
    #smartDocumentIntake.tee-v3401-simple > :not(#teeTravelerSimpleAddV3401){display:none!important}
    .tee-v3401-shell{display:grid;gap:16px}
    .tee-v3401-head h2{margin:.15rem 0 .35rem}
    .tee-v3401-head p{margin:.25rem 0;color:var(--muted,#52606d)}
    .tee-v3401-progress{display:flex;gap:6px;flex-wrap:wrap;font-size:.82rem}
    .tee-v3401-progress span{padding:5px 9px;border-radius:999px;background:#eef2f5;font-weight:700}
    .tee-v3401-progress span.active{outline:2px solid currentColor;background:white}
    .tee-v3401-status{border:2px solid;border-radius:14px;padding:14px 15px;display:grid;gap:7px}
    .tee-v3401-status strong{font-size:1.03rem}
    .tee-v3401-status.green{border-color:#238636;background:#effaf1}
    .tee-v3401-status.green strong{color:#166b26}
    .tee-v3401-status.yellow{border-color:#b7791f;background:#fff8df}
    .tee-v3401-status.yellow strong{color:#83550d}
    .tee-v3401-status.red{border-color:#c53030;background:#fff1f1}
    .tee-v3401-status.red strong{color:#9b2c2c}
    .tee-v3401-next{font-weight:700}
    .tee-v3401-card{border:1px solid #ccd5dd;border-radius:14px;padding:15px;background:#fff;display:grid;gap:13px}
    .tee-v3401-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
    .tee-v3401-card label{display:grid;gap:6px;font-weight:700}
    .tee-v3401-card input,.tee-v3401-card select,.tee-v3401-card textarea{font:inherit;padding:10px;border:1px solid #aeb9c4;border-radius:10px;background:white;min-width:0}
    .tee-v3401-actions{display:flex;gap:10px;flex-wrap:wrap}
    .tee-v3401-actions button{min-height:44px}
    .tee-v3401-help{border:1px solid #c8d1da;border-radius:12px;padding:10px 12px;background:#f8fafc}
    .tee-v3401-help summary{font-weight:800;cursor:pointer}
    .tee-v3401-help ol{padding-left:1.3rem}
    .tee-v3401-help li{margin:.45rem 0}
    .tee-v3401-preview{border:1px solid #d5dde5;border-radius:12px;padding:10px;background:#f8fafc}
    .tee-v3401-preview img{display:block;max-width:100%;max-height:48vh;margin:auto;border-radius:8px}
    .tee-v3401-private-note{font-size:.9rem;color:#52606d}
    .tee-v3401-record-nav{border:2px solid #238636;background:#effaf1;border-radius:14px;padding:12px 14px;margin:0 0 14px;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}
    .tee-v3401-record-nav strong{color:#166b26}
    .tee-v3401-manager-guide{margin-bottom:14px}
    body.source-streamlined-mode .source-manager-linkage{display:none!important}
    @media(max-width:600px){.tee-v3401-actions{display:grid}.tee-v3401-actions button{width:100%}}
  `;
  document.head.appendChild(style);

  const shell=document.createElement('div');
  shell.id='teeTravelerSimpleAddV3401';
  shell.className='tee-v3401-shell';
  shell.innerHTML=`
    <div class="tee-v3401-head">
      <p class="secure-trip-workspace-kicker">SOURCE DOCUMENTS · SIMPLE TRAVELER WORKFLOW</p>
      <h2>Add Document</h2>
      <p>TEE will create a new record from this document. It will not reuse another traveler's document record.</p>
      <div class="tee-v3401-progress" aria-label="Document workflow"><span data-step="add" class="active">1 Add</span><span data-step="review">2 Review</span><span data-step="save">3 Save</span><span data-step="verify">4 Verify</span></div>
    </div>
    <div id="teeV3401Status" class="tee-v3401-status yellow" role="status" aria-live="polite"></div>
    <section id="teeV3401AddPane" class="tee-v3401-card">
      <div class="tee-v3401-grid">
        <label>Traveler / owner<input id="teeV3401Owner" type="text" autocomplete="off" placeholder="Enter the traveler name"></label>
        <label>Document type<select id="teeV3401Type"><option value="Passport">Passport</option><option value="Global Entry">Global Entry</option><option value="Insurance">Insurance card / policy</option><option value="Flight">Airline / ticket</option><option value="Rail">Rail / train</option><option value="Hotel">Hotel</option><option value="Receipt">Receipt</option><option value="Other">Other</option></select></label>
        <label>Who may see this?<select id="teeV3401Access"><option value="private">Private — owning couple only</option><option value="shared">Shared — both couples only</option></select></label>
        <label>Choose Source Document<input id="teeV3401File" type="file" accept="application/pdf,image/jpeg,image/png,image/webp"></label>
      </div>
      <p id="teeV3401FileInfo" class="tee-v3401-private-note">No source document selected.</p>
      <details class="tee-v3401-help" open><summary>How to use this — Add Document</summary><ol><li>Enter the <strong>Traveler / owner</strong>.</li><li>Choose the <strong>Document type</strong>.</li><li>Confirm <strong>Who may see this?</strong></li><li>Tap <strong>Choose Source Document</strong> and select the photo or PDF.</li></ol><p><strong>Next step:</strong> tap <strong>Continue to Review</strong>.</p><p><strong>You are finished with this step when:</strong> TEE says <strong>Ready for the next step</strong>.</p></details>
      <div class="tee-v3401-actions"><button id="teeV3401Continue" type="button">Continue to Review</button><button id="teeV3401Cancel" type="button" class="secondary">Cancel</button></div>
    </section>
    <section id="teeV3401ReviewPane" class="tee-v3401-card" hidden>
      <h3>Review Document</h3>
      <div id="teeV3401Preview" class="tee-v3401-preview"></div>
      <div id="teeV3401ReviewSummary"></div>
      <div id="teeV3401DetailFields" class="tee-v3401-grid"></div>
      <p class="tee-v3401-private-note">The key-detail fields are optional. Leave any field blank rather than guessing. TEE does not copy data from another traveler's record.</p>
      <details class="tee-v3401-help" open><summary>How to use this — Review Document</summary><ol><li>Confirm the displayed original is the correct traveler's document.</li><li>Confirm <strong>Traveler / owner</strong>, <strong>Document type</strong>, and access level.</li><li>Add only key details you can verify from the document. Leave uncertain fields blank.</li></ol><p><strong>Next step:</strong> tap <strong>Save to TEE Vault</strong>.</p><p><strong>You are finished with this step when:</strong> the image and information on this screen match the source document.</p></details>
      <div class="tee-v3401-actions"><button id="teeV3401Save" type="button">Save to TEE Vault</button><button id="teeV3401Back" type="button" class="secondary">Back to Add Document</button></div>
    </section>
    <section id="teeV3401SavedPane" class="tee-v3401-card" hidden>
      <h3>Document Saved</h3>
      <p>The document has been saved. Verify both the saved information and the retained original before you are finished.</p>
      <details class="tee-v3401-help" open><summary>How to use this — Verify Saved Document</summary><ol><li>Tap <strong>View Saved Information</strong> and confirm the stored details.</li><li>Tap <strong>Back to Saved Documents</strong>.</li><li>Tap <strong>View Original Document</strong> and confirm the actual photo/PDF opens.</li><li>Tap <strong>Back to Saved Documents</strong>.</li></ol><p><strong>Next step:</strong> tap <strong>Done</strong> only after both checks are correct.</p><p><strong>You are finished when:</strong> the saved information and original document both match.</p></details>
      <div class="tee-v3401-actions"><button id="teeV3401ViewInfo" type="button">View Saved Information</button><button id="teeV3401ViewOriginal" type="button" class="secondary">View Original Document</button><button id="teeV3401Done" type="button" class="secondary">Done</button></div>
    </section>`;
  root.prepend(shell);

  const $=id=>document.getElementById(id);
  const ui={
    status:$('teeV3401Status'),add:$('teeV3401AddPane'),review:$('teeV3401ReviewPane'),saved:$('teeV3401SavedPane'),
    owner:$('teeV3401Owner'),type:$('teeV3401Type'),access:$('teeV3401Access'),file:$('teeV3401File'),fileInfo:$('teeV3401FileInfo'),
    continue:$('teeV3401Continue'),cancel:$('teeV3401Cancel'),preview:$('teeV3401Preview'),summary:$('teeV3401ReviewSummary'),details:$('teeV3401DetailFields'),
    save:$('teeV3401Save'),back:$('teeV3401Back'),viewInfo:$('teeV3401ViewInfo'),viewOriginal:$('teeV3401ViewOriginal'),done:$('teeV3401Done')
  };

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fileToDataUrl=file=>new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(file);});

  function setStatus(kind,title,message,next){
    ui.status.className=`tee-v3401-status ${kind}`;
    const label=kind==='green'?'● READY':kind==='yellow'?'● NEEDS ATTENTION':'● CANNOT CONTINUE';
    ui.status.innerHTML=`<strong>${label} — ${esc(title)}</strong><span>${esc(message)}</span>${next?`<span class="tee-v3401-next">Next step: ${esc(next)}</span>`:''}`;
  }
  function setPhase(next){
    phase=next;
    ui.add.hidden=next!=='add'; ui.review.hidden=next!=='review'; ui.saved.hidden=next!=='saved';
    shell.querySelectorAll('[data-step]').forEach(x=>x.classList.toggle('active',x.dataset.step===(next==='saved'?'verify':next)));
  }
  function suggestedAccess(){
    return ['Flight','Rail','Hotel'].includes(ui.type.value)?'shared':'private';
  }
  function refreshReadyStatus(){
    const owner=ui.owner.value.trim();
    if(!owner&&!preparedSource){setStatus('yellow','Start with the document','Enter the Traveler / owner and choose the source document.','Enter Traveler / owner, then tap Choose Source Document.');return;}
    if(!owner){setStatus('yellow','Traveler / owner is missing','The document is selected, but TEE does not know whose document it is.','Enter the Traveler / owner.');return;}
    if(!preparedSource){setStatus('yellow','Source document is missing','TEE knows the traveler, but no photo or PDF is attached yet.','Tap Choose Source Document.');return;}
    setStatus('green','Ready for the next step',`${owner}'s ${ui.type.value} source is attached and ready to review.`,'Tap Continue to Review.');
  }

  async function compressImage(file){
    const url=URL.createObjectURL(file);
    try{
      const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('Unable to read this image.'));i.src=url;});
      const attempts=[{max:2200,q:.9},{max:1900,q:.84},{max:1600,q:.78}];
      for(const a of attempts){
        const scale=Math.min(1,a.max/Math.max(img.naturalWidth,img.naturalHeight));
        const canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round(img.naturalWidth*scale)); canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',a.q));
        if(blob&&blob.size<=MAX_SOURCE_BYTES)return blob;
      }
      throw new Error('The image is still too large after TEE prepared a smaller copy. Crop the photo to the document and try again.');
    } finally {URL.revokeObjectURL(url);}
  }

  async function prepareSource(file){
    const allowed=new Set(['application/pdf','image/jpeg','image/png','image/webp']);
    if(!allowed.has(file.type))throw new Error('Choose a PDF, JPEG, PNG, or WebP document.');
    let working=file, name=file.name, type=file.type;
    if(file.size>MAX_SOURCE_BYTES){
      if(!file.type.startsWith('image/'))throw new Error('This PDF is too large for the local TEE Vault. Save or scan a smaller PDF and try again.');
      working=await compressImage(file); name=file.name.replace(/\.[^.]+$/,'')+'-TEE.jpg'; type='image/jpeg';
    }
    return {name,type,bytes:working.size,dataUrl:await fileToDataUrl(working),addedAt:new Date().toISOString()};
  }

  function previewSource(){
    if(!preparedSource){ui.preview.innerHTML='<p>No source document loaded.</p>';return;}
    if(preparedSource.type.startsWith('image/'))ui.preview.innerHTML=`<img src="${esc(preparedSource.dataUrl)}" alt="Selected source document preview">`;
    else ui.preview.innerHTML=`<p><strong>PDF selected:</strong> ${esc(preparedSource.name)}</p><p>The PDF will be retained in the TEE Vault and can be opened after saving.</p>`;
  }

  function detailDefinition(type){
    if(type==='Passport')return [['Name as shown on passport','Name'],['Passport number','Passport number'],['Expiration date','Expiration date'],['Date of birth','Date of birth'],['Nationality','Nationality']];
    if(type==='Global Entry')return [['Name as shown on card','Name'],['PASSID / Known Traveler Number','PASSID'],['Expiration date','Expiration date']];
    if(type==='Insurance')return [['Covered traveler','Covered traveler'],['Member ID','Member ID'],['Plan / policy number','Plan / policy number'],['Important note','Important note']];
    if(type==='Flight')return [['Traveler / passengers','Travelers'],['Airline','Airline'],['Confirmation / PNR','Confirmation / PNR'],['Flight / date','Flight / date']];
    if(type==='Rail')return [['Traveler / passengers','Travelers'],['Rail provider','Rail provider'],['Reservation / pass reference','Reservation / pass reference'],['Travel date','Travel date']];
    if(type==='Hotel')return [['Traveler / guests','Travelers'],['Hotel','Hotel'],['Confirmation number','Confirmation number'],['Stay dates','Stay dates']];
    if(type==='Receipt')return [['Merchant / provider','Merchant / provider'],['Amount','Amount'],['Date','Date'],['Purpose / note','Purpose / note']];
    return [['Important note','Important note']];
  }

  function buildDetailFields(){
    ui.details.replaceChildren();
    detailDefinition(ui.type.value).forEach(([label,key])=>{
      const el=document.createElement('label');
      el.textContent=label;
      const input=document.createElement('input'); input.type='text'; input.dataset.fieldLabel=key; input.autocomplete='off';
      el.appendChild(input); ui.details.appendChild(el);
    });
  }

  async function uniqueTitle(){
    const base=`${ui.type.value} — ${ui.access.value==='private'?'Private':'Shared'} Copy`;
    try{
      const records=await window.TEEStructuredDocumentsAPI?.sourceManagerRecords?.()||[];
      const count=records.filter(r=>String(r.title||'').startsWith(base)).length;
      return count?`${base} ${count+1}`:`${base} 1`;
    }catch{return `${base} ${Date.now().toString().slice(-4)}`;}
  }

  function collectFields(){
    const access=ui.access.value;
    const fields=[{label:'Traveler / owner',value:ui.owner.value.trim(),access}];
    ui.details.querySelectorAll('input[data-field-label]').forEach(input=>{
      const value=input.value.trim(); if(value)fields.push({label:input.dataset.fieldLabel,value,access});
    });
    return fields;
  }

  function categoryFor(type){
    if(['Passport','Global Entry'].includes(type))return 'Identity';
    if(type==='Insurance')return 'Insurance';
    if(['Flight','Rail'].includes(type))return 'Transportation';
    if(type==='Hotel')return 'Hotels';
    if(type==='Receipt')return 'Expenses';
    return 'Other';
  }

  async function continueToReview(){
    const owner=ui.owner.value.trim();
    if(!owner){setStatus('yellow','Traveler / owner is missing','TEE will not save a document until you identify its owner.','Enter the Traveler / owner.');ui.owner.focus();return;}
    if(!preparedSource){setStatus('yellow','Source document is missing','No photo or PDF has been attached.','Tap Choose Source Document.');return;}
    buildDetailFields(); previewSource();
    ui.summary.innerHTML=`<p><strong>Traveler / owner:</strong> ${esc(owner)}</p><p><strong>Document type:</strong> ${esc(ui.type.value)}</p><p><strong>Access:</strong> ${esc(ui.access.options[ui.access.selectedIndex].text)}</p>`;
    setPhase('review');
    setStatus('green','Ready to review','The source document and owner are together on one screen. Check them before saving.','Confirm the document, then tap Save to TEE Vault.');
    root.scrollIntoView({behavior:'smooth',block:'start'});
  }

  async function saveToVault(){
    const api=window.TEEStructuredDocumentsAPI;
    if(!api?.commitSmartIntake){setStatus('red','TEE save engine is not ready','The Structured Documents engine did not load.','Return to Hub, tap Refresh / Update, then try Add Document again.');return;}
    ui.save.disabled=true;
    try{
      const title=await uniqueTitle();
      savedDocumentId=await api.commitSmartIntake({
        title,
        category:categoryFor(ui.type.value),
        originalClassification:ui.access.value,
        originalReference:preparedSource.name,
        sourceFile:preparedSource,
        fields:collectFields(),
        images:[]
      });
      setPhase('saved');
      setStatus('green','Document saved','TEE created a new protected document record from this source.','Tap View Saved Information, then View Original Document.');
      root.scrollIntoView({behavior:'smooth',block:'start'});
    }catch(err){
      const msg=err?.message||String(err);
      if(/Unlock the Secure Vault/i.test(msg))setStatus('red','Secure Vault is locked','Protected documents can only be saved while the correct couple Vault is unlocked.','Return to Hub → Secure Vault, unlock it, then return to Source Documents → Add Document.');
      else setStatus('red','Document was not saved',msg,'Correct the problem shown above and tap Save to TEE Vault again.');
    }finally{ui.save.disabled=false;}
  }

  function addRecordNav(){
    if(!structured)return;
    let bar=document.getElementById('teeV3401RecordNav');
    if(!bar){
      bar=document.createElement('div'); bar.id='teeV3401RecordNav'; bar.className='tee-v3401-record-nav';
      bar.innerHTML='<strong>● READY — Review the saved record below.</strong><button type="button" id="teeV3401BackSaved">Back to Saved Documents</button>';
      structured.prepend(bar);
      bar.querySelector('#teeV3401BackSaved').addEventListener('click',()=>showSavedDocuments());
    }
  }

  async function showSavedRecord(revealSource){
    if(!savedDocumentId)return;
    nav.showOnly?.(structured,revealSource?'View Original Document: confirm the retained photo/PDF matches.':'View Saved Information: confirm the stored details match.');
    addRecordNav();
    await window.TEEStructuredDocumentsAPI?.focusDocument?.(savedDocumentId,revealSource);
    structured?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function resetFlow(){
    preparedSource=null; savedDocumentId=null; ui.owner.value=''; ui.type.value='Passport'; ui.access.value='private'; ui.file.value=''; ui.fileInfo.textContent='No source document selected.'; ui.preview.replaceChildren(); ui.details.replaceChildren();
    setPhase('add'); refreshReadyStatus();
  }
  function leaveToHome(){
    root.classList.remove('tee-v3401-simple');
    root.hidden=true; structured&&(structured.hidden=true); manager&&(manager.hidden=true); if(home)home.hidden=false;
    resetFlow(); home?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function installManagerGuide(mode='saved'){
    if(!manager)return;
    let guide=document.getElementById('teeV3401ManagerGuide');
    if(!guide){guide=document.createElement('details');guide.id='teeV3401ManagerGuide';guide.className='tee-v3401-help tee-v3401-manager-guide';manager.prepend(guide);}
    guide.open=true;
    guide.innerHTML=mode==='needs'
      ? '<summary>How to use this — Needs Attention</summary><p>These documents still need a correction or verification.</p><p><strong>Next step:</strong> tap <strong>Edit Document</strong> on the item that needs work. Correct it, save it, then return here.</p><p><strong>You are finished when:</strong> the item moves to <strong>Saved Documents</strong>.</p>'
      : '<summary>How to use this — Saved Documents</summary><ol><li>Tap <strong>View Saved Information</strong> and confirm the stored details.</li><li>Tap <strong>Back to Saved Documents</strong>.</li><li>Tap <strong>View Original Document</strong> and confirm the actual source opens.</li></ol><p><strong>Next step:</strong> if both are correct, no more document work is required. If something is wrong, tap <strong>Edit Document</strong>.</p><p><strong>You are finished when:</strong> the saved information and original both match.</p>';
  }

  function renameManagerButtons(){
    if(!manager)return;
    manager.querySelectorAll('[data-action="source"]').forEach(b=>b.textContent='View Original Document');
    manager.querySelectorAll('[data-action="structured"]').forEach(b=>b.textContent='View Saved Information');
    manager.querySelectorAll('[data-action="edit"]').forEach(b=>b.textContent='Edit Document');
    manager.querySelectorAll('.source-manager-status').forEach(s=>{if(s.textContent.trim()==='Structured')s.textContent='Saved';});
    manager.querySelectorAll('.source-manager-facts span').forEach(s=>{
      if(s.textContent.trim()==='TEE created')s.textContent='Saved information';
      if(s.textContent.trim()==='Linked destination')s.textContent='TEE section';
      if(s.textContent.trim()==='Original source status')s.textContent='Original document';
    });
    const structuredTab=document.getElementById('sourceManagerStructured');
    if(structuredTab&&/^Structured/.test(structuredTab.textContent))structuredTab.textContent=structuredTab.textContent.replace(/^Structured/,'Saved Documents');
  }

  function showSavedDocuments(){
    document.getElementById('teeV3401RecordNav')?.remove();
    nav.showManager?.('structured');
    setTimeout(()=>{installManagerGuide('saved');renameManagerButtons();manager?.scrollIntoView({behavior:'smooth',block:'start'});},80);
  }

  function activateSimpleAdd(){
    root.classList.add('tee-v3401-simple');
    resetFlow();
    root.scrollIntoView({behavior:'smooth',block:'start'});
  }

  ui.owner.addEventListener('input',refreshReadyStatus);
  ui.type.addEventListener('change',()=>{ui.access.value=suggestedAccess();refreshReadyStatus();});
  ui.access.addEventListener('change',refreshReadyStatus);
  ui.file.addEventListener('change',async()=>{
    const file=ui.file.files?.[0]; if(!file){preparedSource=null;ui.fileInfo.textContent='No source document selected.';refreshReadyStatus();return;}
    ui.fileInfo.textContent='Preparing document…';
    setStatus('yellow','Preparing document','TEE is preparing a protected local copy.','Wait for TEE to finish preparing the document.');
    try{
      preparedSource=await prepareSource(file);
      const changed=preparedSource.name!==file.name;
      ui.fileInfo.textContent=`${preparedSource.name} · ${Math.max(1,Math.round(preparedSource.bytes/1024))} KB${changed?' · TEE prepared a smaller local copy':''}`;
      refreshReadyStatus();
    }catch(err){preparedSource=null;ui.file.value='';ui.fileInfo.textContent='No source document selected.';setStatus('red','Document could not be prepared',err?.message||String(err),'Choose a supported source document and try again.');}
  });
  ui.continue.addEventListener('click',continueToReview);
  ui.back.addEventListener('click',()=>{setPhase('add');refreshReadyStatus();root.scrollIntoView({behavior:'smooth',block:'start'});});
  ui.save.addEventListener('click',saveToVault);
  ui.viewInfo.addEventListener('click',()=>showSavedRecord(false));
  ui.viewOriginal.addEventListener('click',()=>showSavedRecord(true));
  ui.done.addEventListener('click',leaveToHome);
  ui.cancel.addEventListener('click',leaveToHome);

  document.getElementById('streamAddDocument')?.addEventListener('click',()=>setTimeout(activateSimpleAdd,0));
  document.getElementById('streamCompleted')?.addEventListener('click',()=>setTimeout(()=>{installManagerGuide('saved');renameManagerButtons();},80));
  document.getElementById('streamNeedsAttention')?.addEventListener('click',()=>setTimeout(()=>{installManagerGuide('needs');renameManagerButtons();},80));

  // Existing manager buttons still call the underlying record engine. This layer reveals the result screen and supplies an exact return button.
  manager?.addEventListener('click',e=>{
    const button=e.target.closest('button[data-action]'); if(!button)return;
    if(button.dataset.action==='structured'||button.dataset.action==='source'){
      setTimeout(()=>{
        nav.showOnly?.(structured,button.dataset.action==='source'?'View Original Document: confirm the retained source matches.':'View Saved Information: confirm the stored details match.');
        addRecordNav();
        structured?.scrollIntoView({behavior:'smooth',block:'start'});
      },80);
    }
  });

  const observer=new MutationObserver(()=>renameManagerButtons());
  if(manager)observer.observe(manager,{childList:true,subtree:true});
  renameManagerButtons();
  refreshReadyStatus();
})();
