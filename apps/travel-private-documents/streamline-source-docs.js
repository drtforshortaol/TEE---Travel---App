"use strict";
(function(){
  const BUILD='3.4.32';
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
  const setBuild=()=>{if(buildLabel&&buildLabel.textContent!==`TEE v${BUILD}`)buildLabel.textContent=`TEE v${BUILD}`;};
  setBuild();
  const workflowParagraph=document.querySelector('#streamlinedSourceHome .streamlined-source-head p');
  if(workflowParagraph)workflowParagraph.innerHTML='Use one simple workflow: <strong>Add → Review → Save → Verify → Done.</strong> TEE proposes privacy; change it only when the suggestion is wrong.';

  if(!maintenanceMode && requestedView!=='vault'){
    const guard=document.createElement('style');
    guard.id='teeTravelerLegacyIntakeGuardV3429';
    guard.textContent='body.source-streamlined-mode #smartDocumentIntake > :not(#teeTravelerSimpleAddV3404){display:none!important} body.source-streamlined-mode #smartDocumentIntake[hidden]{display:none!important}';
    document.head.appendChild(guard);
  }

  const normalTargets=[document.getElementById('smartDocumentIntake'),document.getElementById('structuredDocumentsWorkspace'),document.getElementById('teeSourceDocumentManager'),document.getElementById('sourceInventoryWorkspace')].filter(Boolean);
  const technicalSelectors=['#secureVaultPanel','.quick-panel','.tools','.section-index','#sectionMountLegacy'];
  function setSectionVisible(section,visible){if(!section)return;section.classList.toggle('streamline-selected',visible);section.hidden=!visible;}
  function openWrapped(section){if(!section)return;section.hidden=false;const btn=section.querySelector(':scope > .source-app-section-master');if(btn&&btn.getAttribute('aria-expanded')!=='true')btn.click();}
  function showOnly(section,label){normalTargets.forEach(x=>setSectionVisible(x,x===section));openWrapped(section);if(status)status.textContent=label;section?.scrollIntoView({behavior:'smooth',block:'start'});}
  function showAdd(){
    const section=document.getElementById('smartDocumentIntake');
    showOnly(section,'Add a document, review it, save it to the TEE Vault, then verify the saved information and original.');
    enforceSimpleTravelerIntake();
    if(!document.getElementById('teeTravelerSimpleAddV3404') && status)status.textContent='Loading Add Document…';
    setTimeout(enforceSimpleTravelerIntake,0);setTimeout(enforceSimpleTravelerIntake,120);setTimeout(enforceSimpleTravelerIntake,350);
  }
  function showManager(view){const section=document.getElementById('teeSourceDocumentManager');showOnly(section,view==='structured'?'Saved Documents: tap Review & Verify to compare the original and saved information together.':'Needs Attention: finish the items that still require work.');setTimeout(()=>{const id=view==='structured'?'sourceManagerStructured':'sourceManagerNeeds';document.getElementById(id)?.click();},50);}
  function showLibrary(){const section=document.getElementById('sourceInventoryWorkspace');showOnly(section,'Document Library: supporting originals and source history.');const toggle=document.getElementById('sourceInventoryToggle');if(toggle&&toggle.getAttribute('aria-expanded')!=='true')toggle.click();setTimeout(()=>window.TEERenderLocalSourceLibraryV3426?.(),80);}

  window.TEETravelerSourceNavV3432={showOnly,showAdd,showManager,showLibrary,normalTargets};
  window.TEETravelerSourceNavV3431=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3429=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3427=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3426=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3424=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3423=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3421=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3419=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3418=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3417=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3416=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3415=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3414=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3412=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3411=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3410=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3409=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3408=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3407=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3406=window.TEETravelerSourceNavV3432;
  window.TEETravelerSourceNavV3404=window.TEETravelerSourceNavV3432;

  function enforceSimpleTravelerIntake(){
    if(maintenanceMode||requestedView==='vault')return;
    const root=document.getElementById('smartDocumentIntake');if(!root)return;
    const shell=document.getElementById('teeTravelerSimpleAddV3404');
    Array.from(root.children).forEach(child=>{child.hidden=!shell || child!==shell;});
    if(shell)shell.hidden=false;
  }

  if(maintenanceMode){document.body.classList.add('source-maintenance-mode');home?.setAttribute('hidden','');technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=false));normalTargets.forEach(el=>el.hidden=false);setBuild();return;}

  if(requestedView==='vault'){
    document.body.classList.add('source-streamlined-mode','source-vault-view');
    if(home)home.hidden=true;normalTargets.forEach(el=>el.hidden=true);technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=true));
    const headerTitle=document.querySelector('header.hero h1');const subtitles=document.querySelectorAll('header.hero .subtitle');if(headerTitle)headerTitle.textContent='Secure Vault';if(subtitles[0])subtitles[0].innerHTML='<strong>Protected Traveler Records</strong>';if(subtitles[1])subtitles[1].textContent='Enter your authorized Couple A or Couple B passphrase.';
    document.querySelectorAll('main > section.warning').forEach(el=>{if(el.id!=='travelerActionPanel')el.hidden=true;});
    const panel=document.getElementById('secureVaultPanel'),manager=document.getElementById('secureVaultManager'),backup=document.querySelector('.secure-backup-tools'),createFields=document.getElementById('secureCreateFields'),unlockFields=document.getElementById('secureUnlockFields'),unlockInput=document.getElementById('secureUnlockPassphrase');
    if(panel){panel.hidden=false;openWrapped(panel);}if(backup)backup.hidden=true;if(createFields)createFields.hidden=true;
    const showDirectEntry=()=>{const saved=localStorage.getItem('teeSecureVaultV1');const unlocked=typeof getVaultState==='function'&&getVaultState()==='unlocked';if(unlocked){if(manager)manager.hidden=true;if(unlockFields)unlockFields.hidden=true;document.getElementById('secureVaultContents')?.scrollIntoView({behavior:'smooth',block:'start'});return;}if(saved){if(manager)manager.hidden=true;if(unlockFields){unlockFields.hidden=false;const h=unlockFields.querySelector('h3');if(h)h.textContent='Enter Secure Vault';const label=unlockFields.querySelector('label');if(label)label.firstChild.textContent='Couple passphrase ';}const message=document.getElementById('secureVaultMessage');if(message)message.textContent='Enter the Couple A or Couple B passphrase to open protected traveler records.';requestAnimationFrame(()=>{unlockInput?.focus();unlockFields?.scrollIntoView({behavior:'smooth',block:'center'});});}else{if(manager)manager.hidden=true;if(unlockFields)unlockFields.hidden=true;const message=document.getElementById('secureVaultMessage');if(message)message.innerHTML='No encrypted vault is stored on this browser origin. <a target="_top" href="index.html?teeAction=restore&teeReturn=hub"><strong>Restore Existing TEE</strong></a> before trying to unlock protected records.';}};
    showDirectEntry();setTimeout(showDirectEntry,120);if(requestedVaultSection)sessionStorage.setItem('teeVaultRequestedSectionV1',requestedVaultSection);panel?.scrollIntoView({behavior:'smooth',block:'start'});setBuild();return;
  }

  document.body.classList.add('source-streamlined-mode');technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=true));normalTargets.forEach(el=>el.hidden=true);if(home)home.hidden=false;
  enforceSimpleTravelerIntake();
  const completedButton=document.getElementById('streamCompleted');if(completedButton){completedButton.querySelector('strong')?.replaceChildren(document.createTextNode('Saved Documents'));const small=completedButton.querySelector('small');if(small)small.textContent='View information and original documents already saved to TEE.';}

  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target:null;if(!target)return;
    if(target.closest('#streamAddDocument')){event.preventDefault();showAdd();return;}
    if(target.closest('#streamNeedsAttention')){event.preventDefault();showManager('needs');return;}
    if(target.closest('#streamCompleted')){event.preventDefault();showManager('structured');return;}
    if(target.closest('#streamDocumentLibrary')){event.preventDefault();showLibrary();}
  },true);
  if(requestedView==='library')setTimeout(showLibrary,80);

  const intakeObserver=new MutationObserver(()=>enforceSimpleTravelerIntake());const intakeRoot=document.getElementById('smartDocumentIntake');if(intakeRoot)intakeObserver.observe(intakeRoot,{childList:true,subtree:true});

  const handoff=document.createElement('script');handoff.src='chatgpt-handoff-v3427.js?v=3.4.32';handoff.dataset.teeChatgptHandoff='3.4.32';handoff.addEventListener('load',setBuild);document.head.appendChild(handoff);
  const itineraryType=document.createElement('script');itineraryType.src='itinerary-simple-type-v3431.js?v=3.4.32';itineraryType.dataset.teeItinerarySimpleType='3.4.32';document.head.appendChild(itineraryType);
  const localLibrary=document.createElement('script');localLibrary.src='local-source-library-v3426.js?v=3.4.32';localLibrary.dataset.teeLocalSourceLibrary='3.4.32';localLibrary.addEventListener('load',()=>setTimeout(()=>window.TEERenderLocalSourceLibraryV3426?.(),0));document.head.appendChild(localLibrary);
  const mrz=document.createElement('script');mrz.src='mrz-ocr-v3412.js?v=3.4.32';mrz.dataset.teePassportMrz='3.4.32';
  const loadUx=()=>{
    if(document.querySelector('script[data-tee-traveler-source-ux="3.4.32"]'))return;
    const ux=document.createElement('script');ux.src='traveler-source-flow-v3415.js?v=3.4.32';ux.dataset.teeTravelerSourceUx='3.4.32';
    ux.addEventListener('load',()=>{setBuild();setTimeout(setBuild,200);setTimeout(enforceSimpleTravelerIntake,0);setTimeout(enforceSimpleTravelerIntake,180);if(requestedView==='add')setTimeout(showAdd,0);});
    document.head.appendChild(ux);
  };

  const reviewBridge=document.createElement('script');reviewBridge.src='structured-documents-review-v3426.js?v=3.4.32';reviewBridge.dataset.teeStructuredReview='3.4.32';reviewBridge.addEventListener('load',loadUx);reviewBridge.addEventListener('error',loadUx);document.head.appendChild(reviewBridge);
  document.head.appendChild(mrz);
  setTimeout(setBuild,500);
})();
