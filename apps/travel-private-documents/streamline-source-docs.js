"use strict";
(function(){
  const params=new URLSearchParams(location.search);
  const maintenanceRequested=params.get('teeMode')==='maintenance';
  const maintUntil=Number(sessionStorage.getItem('teeMaintenanceAuthorizedUntilV1')||0);
  const maintenanceMode=maintenanceRequested && maintUntil>Date.now();
  if(maintenanceRequested && !maintenanceMode){location.replace('../tee-maintenance/index.html');return;}
  const requestedView=params.get('teeView');
  const embeddedVault=params.get('teeEmbed')==='1';
  if(embeddedVault)document.body.classList.add('source-vault-embed');
  const requestedVaultSection=params.get('teeVaultSection')||'';
  const home=document.getElementById('streamlinedSourceHome');
  const status=document.getElementById('streamlinedSourceStatus');
  const buildLabel=document.querySelector('header.hero .subtitle strong');
  if(buildLabel)buildLabel.textContent='TEE v3.4.16';

  const normalTargets=[document.getElementById('smartDocumentIntake'),document.getElementById('structuredDocumentsWorkspace'),document.getElementById('teeSourceDocumentManager'),document.getElementById('sourceInventoryWorkspace')].filter(Boolean);
  const technicalSelectors=['#secureVaultPanel','.quick-panel','.tools','.section-index','#sectionMountLegacy'];

  function setSectionVisible(section,visible){if(!section)return;section.classList.toggle('streamline-selected',visible);section.hidden=!visible;}
  function openWrapped(section){if(!section)return;section.hidden=false;const btn=section.querySelector(':scope > .source-app-section-master');if(btn&&btn.getAttribute('aria-expanded')!=='true')btn.click();}
  function showOnly(section,label){normalTargets.forEach(x=>setSectionVisible(x,x===section));openWrapped(section);if(status)status.textContent=label;section?.scrollIntoView({behavior:'smooth',block:'start'});}
  function showAdd(){const section=document.getElementById('smartDocumentIntake');showOnly(section,'Add a document, review it, save it to the TEE Vault, then verify the saved information and original.');setTimeout(enforceSimpleTravelerIntake,0);setTimeout(enforceSimpleTravelerIntake,120);}
  function showManager(view){const section=document.getElementById('teeSourceDocumentManager');showOnly(section,view==='structured'?'Saved Documents: tap Review & Verify to compare the original and saved information together.':'Needs Attention: finish the items that still require work.');setTimeout(()=>{const id=view==='structured'?'sourceManagerStructured':'sourceManagerNeeds';document.getElementById(id)?.click();},50);}
  function showLibrary(){const section=document.getElementById('sourceInventoryWorkspace');showOnly(section,'Document Library: supporting originals and source history.');const toggle=document.getElementById('sourceInventoryToggle');if(toggle&&toggle.getAttribute('aria-expanded')!=='true')toggle.click();}

  window.TEETravelerSourceNavV3416={showOnly,showAdd,showManager,showLibrary,normalTargets};
  window.TEETravelerSourceNavV3415=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3414=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3412=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3411=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3410=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3409=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3408=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3407=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3406=window.TEETravelerSourceNavV3416;
  window.TEETravelerSourceNavV3404=window.TEETravelerSourceNavV3416;

  function enforceSimpleTravelerIntake(){
    if(maintenanceMode||requestedView==='vault')return;
    const root=document.getElementById('smartDocumentIntake');
    const shell=document.getElementById('teeTravelerSimpleAddV3404');
    if(!root||!shell)return;
    let keeper=shell;
    while(keeper.parentElement&&keeper.parentElement!==root)keeper=keeper.parentElement;
    if(keeper.parentElement===root){
      Array.from(root.children).forEach(child=>{child.hidden=child!==keeper;});
      keeper.hidden=false;
    }
    root.querySelectorAll('.structured-workspace-head,.smart-intake-grid,.smart-intake-methods,#smartIntakeMessage,#smartIntakeReview').forEach(el=>{if(!shell.contains(el))el.hidden=true;});
    root.querySelectorAll('.source-app-section-master').forEach(el=>{if(!shell.contains(el)&&/Smart Document Intake/i.test(el.textContent||''))el.hidden=true;});
  }

  if(maintenanceMode){document.body.classList.add('source-maintenance-mode');home?.setAttribute('hidden','');technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=false));normalTargets.forEach(el=>el.hidden=false);return;}

  if(requestedView==='vault'){
    document.body.classList.add('source-streamlined-mode','source-vault-view');
    if(home)home.hidden=true;normalTargets.forEach(el=>el.hidden=true);technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=true));
    const headerTitle=document.querySelector('header.hero h1');const subtitles=document.querySelectorAll('header.hero .subtitle');if(headerTitle)headerTitle.textContent='Secure Vault';if(subtitles[0])subtitles[0].innerHTML='<strong>Protected Traveler Records</strong>';if(subtitles[1])subtitles[1].textContent='Enter your authorized Couple A or Couple B passphrase.';
    document.querySelectorAll('main > section.warning').forEach(el=>{if(el.id!=='travelerActionPanel')el.hidden=true;});
    const panel=document.getElementById('secureVaultPanel'),manager=document.getElementById('secureVaultManager'),backup=document.querySelector('.secure-backup-tools'),createFields=document.getElementById('secureCreateFields'),unlockFields=document.getElementById('secureUnlockFields'),unlockInput=document.getElementById('secureUnlockPassphrase');
    if(panel){panel.hidden=false;openWrapped(panel);}if(backup)backup.hidden=true;if(createFields)createFields.hidden=true;
    const showDirectEntry=()=>{const saved=localStorage.getItem('teeSecureVaultV1');const unlocked=typeof getVaultState==='function'&&getVaultState()==='unlocked';if(unlocked){if(manager)manager.hidden=true;if(unlockFields)unlockFields.hidden=true;document.getElementById('secureVaultContents')?.scrollIntoView({behavior:'smooth',block:'start'});return;}if(saved){if(manager)manager.hidden=true;if(unlockFields){unlockFields.hidden=false;const h=unlockFields.querySelector('h3');if(h)h.textContent='Enter Secure Vault';const label=unlockFields.querySelector('label');if(label)label.firstChild.textContent='Couple passphrase ';}const message=document.getElementById('secureVaultMessage');if(message)message.textContent='Enter the Couple A or Couple B passphrase to open protected traveler records.';requestAnimationFrame(()=>{unlockInput?.focus();unlockFields?.scrollIntoView({behavior:'smooth',block:'center'});});}else{if(manager)manager.hidden=true;if(unlockFields)unlockFields.hidden=true;const message=document.getElementById('secureVaultMessage');if(message)message.innerHTML='No encrypted vault is stored on this browser origin. <a target="_top" href="index.html?teeAction=restore&teeReturn=hub"><strong>Restore Existing TEE</strong></a> before trying to unlock protected records.';}};
    showDirectEntry();setTimeout(showDirectEntry,120);if(requestedVaultSection)sessionStorage.setItem('teeVaultRequestedSectionV1',requestedVaultSection);panel?.scrollIntoView({behavior:'smooth',block:'start'});return;
  }

  document.body.classList.add('source-streamlined-mode');technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=true));normalTargets.forEach(el=>el.hidden=true);if(home)home.hidden=false;
  const completedButton=document.getElementById('streamCompleted');if(completedButton){completedButton.querySelector('strong')?.replaceChildren(document.createTextNode('Saved Documents'));const small=completedButton.querySelector('small');if(small)small.textContent='View information and original documents already saved to TEE.';}
  document.getElementById('streamAddDocument')?.addEventListener('click',showAdd);document.getElementById('streamNeedsAttention')?.addEventListener('click',()=>showManager('needs'));completedButton?.addEventListener('click',()=>showManager('structured'));document.getElementById('streamDocumentLibrary')?.addEventListener('click',showLibrary);if(requestedView==='library')setTimeout(showLibrary,80);

  const intakeObserver=new MutationObserver(()=>enforceSimpleTravelerIntake());
  const intakeRoot=document.getElementById('smartDocumentIntake');
  if(intakeRoot)intakeObserver.observe(intakeRoot,{childList:true,subtree:true});

  const mrz=document.createElement('script');mrz.src='mrz-ocr-v3412.js?v=3.4.16';mrz.dataset.teePassportMrz='3.4.16';
  const loadUx=()=>{if(document.querySelector('script[data-tee-traveler-source-ux="3.4.16"]'))return;const ux=document.createElement('script');ux.src='traveler-source-flow-v3415.js?v=3.4.16';ux.dataset.teeTravelerSourceUx='3.4.16';ux.addEventListener('load',()=>{setTimeout(enforceSimpleTravelerIntake,0);setTimeout(enforceSimpleTravelerIntake,180);});document.head.appendChild(ux);};
  mrz.addEventListener('load',loadUx);mrz.addEventListener('error',loadUx);document.head.appendChild(mrz);
})();
