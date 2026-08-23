window.__TEE_PARTS__=window.__TEE_PARTS__||{};window.__TEE_PARTS__["traveler-source-flow-v3415"]=window.__TEE_PARTS__["traveler-source-flow-v3415"]||[];window.__TEE_PARTS__["traveler-source-flow-v3415"].push(">{nav.showAdd?.();setTimeout(activateSimpleAdd,0);});}
    }catch(err){
      verifyStatus('red','Verification was blocked',err?.message||String(err),'Correct the problem shown above before finishing.');
      ui.finishVerify.hidden=true;
    }finally{ui.finishVerify.disabled=false;}
  });
  ui.cancel.addEventListener('click',()=>{if(preparedSource||ui.owner.value.trim()){if(!confirm('Discard this unsaved draft? Nothing will be saved or archived.'))return;}leaveToHome();});

  document.getElementById('streamAddDocument')?.addEventListener('click',()=>setTimeout(activateSimpleAdd,0));
  document.getElementById('streamCompleted')?.addEventListener('click',()=>setTimeout(()=>{installManagerGuide('saved');renameManagerButtons();},80));
  document.getElementById('streamNeedsAttention')?.addEventListener('click',()=>setTimeout(()=>{installManagerGuide('needs');renameManagerButtons();},80));
  document.getElementById('sourceManagerArchived')?.addEventListener('click',()=>setTimeout(()=>{installManagerGuide('archived');renameManagerButtons();},80));
  document.getElementById('sourceManagerStructured')?.addEventListener('click',()=>setTimeout(()=>{installManagerGuide('saved');renameManagerButtons();},80));
  document.getElementById('sourceManagerNeeds')?.addEventListener('click',()=>setTimeout(()=>{installManagerGuide('needs');renameManagerButtons();},80));

  window.addEventListener('tee-structured-documents-changed',()=>{
    if(phase==='verify'&&currentReviewId)setTimeout(()=>renderSavedReview(currentReviewId),80);
  });

  const observer=new MutationObserver(()=>renameManagerButtons());
  if(manager)observer.observe(manager,{childList:true,subtree:true});
  renameManagerButtons();
  refreshReadyStatus();
})();
");
