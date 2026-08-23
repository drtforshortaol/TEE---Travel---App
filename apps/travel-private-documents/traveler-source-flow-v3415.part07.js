window.__TEE_PARTS__=window.__TEE_PARTS__||{};window.__TEE_PARTS__["traveler-source-flow-v3415"]=window.__TEE_PARTS__["traveler-source-flow-v3415"]||[];window.__TEE_PARTS__["traveler-source-flow-v3415"].push(", then try again.'));
  window.TEETravelerEditDocumentV3409=window.TEETravelerEditDocumentV3410;
  window.TEETravelerEditDocumentV3407=window.TEETravelerEditDocumentV3410;

  function resetFlow(){
    preparedSource=null; savedDocumentId=null; currentReviewId=null; currentReviewMeta=null; duplicateMatches=[]; duplicateAcknowledged=true; lastOcrResult=null; lastChatApplied=0;
    ui.owner.value=''; ui.type.value='Passport'; ui.target.value=''; ui.file.value=''; ui.fileInfo.textContent='No source document selected.';
    ui.preview.replaceChildren(); ui.details.replaceChildren(); ui.verifyCompare.replaceChildren();
    if(ui.chatPanel){ui.chatPanel.hidden=false;if(ui.chatResult)ui.chatResult.value='';}if(ui.ocrPanel)ui.ocrPanel.hidden=true;if(ui.ocrRun){ui.ocrRun.disabled=false;ui.ocrRun.textContent='Scan Passport';}if(ui.ocrStatus)setOcrStatus('yellow','Ready to scan the passport locally','');if(ui.ocrFieldStatus)ui.ocrFieldStatus.replaceChildren();
    if(ui.authorizationPassphrase)ui.authorizationPassphrase.value=''; if(ui.authorization)ui.authorization.hidden=true; if(ui.duplicateNotice){ui.duplicateNotice.hidden=true;ui.duplicateNotice.replaceChildren();}
    if(ui.verifyAuthorizationPassphrase)ui.verifyAuthorizationPassphrase.value=''; if(ui.verifyAuthorization)ui.verifyAuthorization.hidden=true;
    ui.finishVerify.hidden=true; ui.editFromVerify.hidden=false;
    setPhase('add'); refreshReadyStatus();
  }
  function leaveToHome(){
    root.classList.remove('tee-v3404-simple');
    root.hidden=true; root.style.display='none'; structured&&(structured.hidden=true); manager&&(manager.hidden=true); if(home)home.hidden=false;
    resetFlow(); home?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function installManagerGuide(mode='saved'){
    if(!manager)return;
    let banner=document.getElementById('teeV3404ManagerStatus');
    if(!banner){
      banner=document.createElement('div');
      banner.id='teeV3404ManagerStatus';
      manager.prepend(banner);
    }
    banner.className='tee-v3404-status '+(mode==='needs'?'yellow':'green');
    if(mode==='needs'){
      banner.innerHTML='<strong>🟡 NEEDS ATTENTION — One or more saved documents are not finished yet.</strong><span>Nothing is lost. Unverified documents remain retained and cannot be archived as finished.</span><span class="tee-v3404-next">Next step: tap <strong>Review &amp; Verify</strong>.</span>';
    }else if(mode==='archived'){
      banner.innerHTML='<strong>🟢 ARCHIVED — These documents are retained safely.</strong><span>Verified items show <strong>Verified · Finished</strong>. Abandoned/test items show <strong>Archived · Incomplete</strong>. A 🔒 protected-original message means the owning couple is not currently authorized; it does <strong>not</strong> mean the document was deleted.</span><span class="tee-v3404-next">Next step: no action is required. Tap <strong>Review &amp; Verify</strong> to authorize the owning couple and inspect a protected original, or <strong>Restore</strong> only if you need to work with the document again.</span>';
    }else{
      banner.innerHTML='<strong>🟢 READY — Saved documents are ready for final verification.</strong><span>Review the retained original and saved information together before finishing.</span><span class="tee-v3404-next">Next step: tap <strong>Review &amp; Verify</strong> on a document.</span>';
    }
    let guide=document.getElementById('teeV3404ManagerGuide');
    if(!guide){guide=document.createElement('details');guide.id='teeV3404ManagerGuide';guide.className='tee-v3404-help tee-v3404-manager-guide';banner.after(guide);}
    guide.open=true;
    guide.innerHTML=mode==='needs'
      ? '<summary>How to use this — Needs Attention</summary><p>These documents are saved but not finished.</p><p><strong>Next step:</strong> tap <strong>Review &amp; Verify</strong>. TEE will show the original and saved information together. If details are missing, use <strong>Edit Saved Information</strong>.</p><p>If an unfinished item is only a test or is no longer needed, tap <strong>Archive Incomplete</strong>. It remains recoverable and is not marked Verified.</p><p><strong>You are finished when:</strong> TEE confirms the document is verified and moves it safely to <strong>Archived</strong>, or it is intentionally archived incomplete.</p>'
      : mode==='archived'
      ? '<summary>How to use this — Archived</summary><p>These documents are retained for recovery. A record may be <strong>Verified · Finished</strong> or <strong>Archived · Incomplete</strong>.</p><p>If a private original shows a 🔒 protected-original message, the owning couple is simply not authorized in the current session. That is different from a missing original.</p><p><strong>Next step:</strong> no action is required. Use <strong>Review &amp; Verify</strong> to authorize the owning couple and inspect the protected original, or <strong>Restore</strong> only if you need to work with the document again.</p><p><strong>You are finished when:</strong> the document remains safely archived.</p>'
      : '<summary>How to use this — Saved Documents</summary><p>These records are saved and available. Any item still awaiting final verification appears under <strong>Needs Attention</strong>.</p><p><strong>Next step:</strong> open a document only when you need to review or change it.</p>';
  }

  function renameManagerButtons(){
    if(!manager)return;
    manager.querySelectorAll('[data-action="source"]').forEach(b=>{if(b.textContent!=='View Original Document')b.textContent='View Original Document';});
    manager.querySelectorAll('[data-action="structured"]').forEach(b=>{if(b.textContent!=='View Saved Information')b.textContent='View Saved Information';});
    manager.querySelectorAll('[data-action="verify"]').forEach(b=>{if(b.textContent!=='Review & Verify')b.textContent='Review & Verify';});
    manager.querySelectorAll('[data-action="edit"]').forEach(b=>{if(b.textContent!=='Edit Document')b.textContent='Edit Document';});
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
    const unverified=currentReviewMeta && !currentReviewMeta.verifiedAt && currentReviewMeta.lifecycleStatus!=='archived';
    const mode=unverified?'needs':'structured';
    nav.showManager?.(mode);
    setTimeout(()=>{installManagerGuide(mode==='needs'?'needs':'saved');renameManagerButtons();manager?.scrollIntoView({behavior:'smooth',block:'start'});},80);
  }

  function activateSimpleAdd(){
    root.style.display=''; root.hidden=false; root.classList.add('tee-v3404-simple');
    resetFlow();
    root.scrollIntoView({behavior:'smooth',block:'start'});
  }

  ui.owner.addEventListener('input',refreshReadyStatus);
  ui.owner.addEventListener('blur',()=>{const normalized=normalizePersonName(ui.owner.value);if(normalized)ui.owner.value=normalized;refreshReadyStatus();});
  ui.type.addEventListener('change',()=>{ui.target.value=suggestedTarget();refreshReadyStatus();});
  ui.target.addEventListener('change',()=>{if(phase==='review')updateAuthorizationBox();refreshReadyStatus();});
  ui.file.addEventListener('change',async()=>{
    const files=Array.from(ui.file.files||[]);
    if(!files.length){preparedSource=null;ui.fileInfo.textContent='No source document selected.';refreshReadyStatus();return;}
    ui.fileInfo.textContent=files.length>1?`Preparing ${files.length} images…`:'Preparing document…';
    setStatus('yellow','Preparing document',files.length>1?`TEE is preparing ${files.length} protected source images as one document.`:'TEE is preparing a protected local copy.','Wait for TEE to finish preparing all selected source material.');
    try{
      preparedSource=await prepareSourceSelection(files);
      if(preparedSource.kind==='tee-source-bundle-v1'){
        ui.fileInfo.textContent=`${preparedSource.files.length} images · ${Math.max(1,Math.round(preparedSource.bytes/1024))} KB total · retained together as one TEE document`;
      }else if(preparedSource.type==='application/pdf'){
        ui.fileInfo.textContent=`${preparedSource.name} · ${Math.max(1,Math.round(preparedSource.bytes/1024))} KB · complete PDF retained (all pages)`;
      }else{
        const changed=preparedSource.name!==files[0].name;
        ui.fileInfo.textContent=`${preparedSource.name} · ${Math.max(1,Math.round(preparedSource.bytes/1024))} KB${changed?' · TEE prepared a smaller local copy':''}`;
      }
      refreshReadyStatus();
    }catch(err){preparedSource=null;ui.file.value='';ui.fileInfo.textContent='No source document selected.';setStatus('red','Document could not be prepared',err?.message||String(err),'Tap Choose Source Document(s) and try again.');}
  });
  ui.continue.addEventListener('click',continueToReview);
  ui.openChat?.addEventListener('click',openChatGPT);
  ui.copyChatPrompt?.addEventListener('click',copyChatRequest);
  ui.applyChat?.addEventListener('click',applyChatResults);
  ui.pasteResults?.addEventListener('click',pasteChatResults);
  ui.ocrRun?.addEventListener('click',runPassportScan);
  ui.back.addEventListener('click',()=>{setPhase('add');refreshReadyStatus();root.scrollIntoView({behavior:'smooth',block:'start'});});
  ui.discardDraft?.addEventListener('click',()=>{if(confirm('Discard this unsaved draft? Nothing will be saved or archived.'))leaveToHome();});
  ui.authorize?.addEventListener('click',authorizeSelectedVault);
  ui.save.addEventListener('click',saveToVault);
  ui.reviewVerify.addEventListener('click',()=>showSavedRecord(savedDocumentId));
  ui.backSavedAfterSave?.addEventListener('click',()=>{currentReviewMeta={verifiedAt:null,lifecycleStatus:'review'};showSavedDocuments();});
  ui.verifyAuthorize?.addEventListener('click',authorizeReviewVault);
  ui.backSaved?.addEventListener('click',showSavedDocuments);
  ui.editFromVerify?.addEventListener('click',async()=>{
    if(!currentReviewId)return;
    await openSimpleDocumentEditor(currentReviewId).catch(err=>verifyStatus('red','Saved information could not be edited',err?.message||String(err),'Authorize the owning couple if required, then try again.'));
  });
  ui.finishVerify?.addEventListener('click',async()=>{
    if(!currentReviewId)return;
    ui.finishVerify.disabled=true;
    try{
      await window.TEEStructuredDocumentsAPI?.verifyAndFinishById?.(currentReviewId);
      const rows=await window.TEEStructuredDocumentsAPI?.sourceManagerRecords?.()||[];
      const row=rows.find(x=>x.documentId===currentReviewId);
      const syncTarget=row?.originalClassification==='shared'?'shared':row?.targetProfile||activeProfile()||'coupleA';
      window.TEESyncFoundationV3404?.recordLocalChange?.({action:'archive',documentId:currentReviewId,target:syncTarget,category:row?.category||''});
      currentReviewMeta={...(currentReviewMeta||{}),verifiedAt:new Date().toISOString(),lifecycleStatus:'archived'};
      verifyStatus('green','Verified & finished','TEE archived the source safely. It remains recoverable; no permanent deletion occurred.','Add another document or return to Documents.');
      ui.finishVerify.hidden=true; ui.editFromVerify.hidden=true;
      let add=document.getElementById('teeV3406AddAfterFinish');
      if(!add){add=document.createElement('button');add.id='teeV3406AddAfterFinish';add.type='button';add.textContent='Add Another Document';ui.backSaved.before(add);add.addEventListener('click',()=");
