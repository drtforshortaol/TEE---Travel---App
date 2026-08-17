"use strict";
(function(){
  const params=new URLSearchParams(location.search);
  const maintenanceRequested=params.get('teeMode')==='maintenance';
  const maintUntil=Number(sessionStorage.getItem('teeMaintenanceAuthorizedUntilV1')||0);
  const maintenanceMode=maintenanceRequested && maintUntil>Date.now();
  if(maintenanceRequested && !maintenanceMode){
    location.replace('../tee-maintenance/index.html');
    return;
  }
  const requestedView=params.get('teeView');
  const embeddedVault=params.get('teeEmbed')==='1';
  if(embeddedVault)document.body.classList.add('source-vault-embed');
  const requestedVaultSection=params.get('teeVaultSection')||'';
  const home=document.getElementById('streamlinedSourceHome');
  const status=document.getElementById('streamlinedSourceStatus');

  const normalTargets=[
    document.getElementById('smartDocumentIntake'),
    document.getElementById('structuredDocumentsWorkspace'),
    document.getElementById('teeSourceDocumentManager'),
    document.getElementById('sourceInventoryWorkspace')
  ].filter(Boolean);

  const technicalSelectors=[
    '#secureVaultPanel','.quick-panel','.tools','.section-index','#sectionMountLegacy'
  ];

  function setSectionVisible(section,visible){
    if(!section)return;
    section.classList.toggle('streamline-selected',visible);
    section.hidden=!visible;
  }
  function openWrapped(section){
    if(!section)return;
    section.hidden=false;
    const btn=section.querySelector(':scope > .source-app-section-master');
    if(btn && btn.getAttribute('aria-expanded')!=='true')btn.click();
  }
  function showOnly(section,label){
    normalTargets.forEach(x=>setSectionVisible(x,x===section));
    openWrapped(section);
    if(status)status.textContent=label;
    section?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function showAdd(){
    const section=document.getElementById('smartDocumentIntake');
    showOnly(section,'Add a source, review TEE’s proposed privacy/classification, then Approve & Commit.');
  }
  function showManager(view){
    const section=document.getElementById('teeSourceDocumentManager');
    showOnly(section,view==='structured'?'Completed documents: processed and filed into TEE.':'Needs Attention: finish the items that still require work.');
    setTimeout(()=>{
      const id=view==='structured'?'sourceManagerStructured':'sourceManagerNeeds';
      document.getElementById(id)?.click();
    },50);
  }
  function showLibrary(){
    const section=document.getElementById('sourceInventoryWorkspace');
    showOnly(section,'Document Library: supporting originals and source history.');
    const toggle=document.getElementById('sourceInventoryToggle');
    if(toggle && toggle.getAttribute('aria-expanded')!=='true')toggle.click();
  }

  if(maintenanceMode){
    document.body.classList.add('source-maintenance-mode');
    home?.setAttribute('hidden','');
    technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=false));
    normalTargets.forEach(el=>el.hidden=false);
    return;
  }

  // Traveler-facing Secure Vault entry. There is one normal entry point:
  // the Secure Vault button at the top of the Hub.
  if(requestedView==='vault'){
    document.body.classList.add('source-streamlined-mode','source-vault-view');
    if(home)home.hidden=true;
    normalTargets.forEach(el=>el.hidden=true);
    technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=true));

    const headerTitle=document.querySelector('header.hero h1');
    const subtitles=document.querySelectorAll('header.hero .subtitle');
    if(headerTitle)headerTitle.textContent='Secure Vault';
    if(subtitles[0])subtitles[0].innerHTML='<strong>Protected Traveler Records</strong>';
    if(subtitles[1])subtitles[1].textContent='Enter your authorized Couple A or Couple B passphrase.';

    document.querySelectorAll('main > section.warning').forEach(el=>{
      if(el.id!=='travelerActionPanel')el.hidden=true;
    });

    const panel=document.getElementById('secureVaultPanel');
    const manager=document.getElementById('secureVaultManager');
    const backup=document.querySelector('.secure-backup-tools');
    const createFields=document.getElementById('secureCreateFields');
    const unlockFields=document.getElementById('secureUnlockFields');
    const unlockInput=document.getElementById('secureUnlockPassphrase');

    if(panel){
      panel.hidden=false;
      openWrapped(panel);
    }

    if(backup)backup.hidden=true;
    if(createFields)createFields.hidden=true;

    const showDirectEntry=()=>{
      const saved=localStorage.getItem('teeSecureVaultV1');
      const unlocked=typeof getVaultState==='function' && getVaultState()==='unlocked';

      if(unlocked){
        if(manager)manager.hidden=true;
        if(unlockFields)unlockFields.hidden=true;
        document.getElementById('secureVaultContents')?.scrollIntoView({behavior:'smooth',block:'start'});
        return;
      }

      if(saved){
        if(manager)manager.hidden=true;
        if(unlockFields){
          unlockFields.hidden=false;
          const h=unlockFields.querySelector('h3');
          if(h)h.textContent='Enter Secure Vault';
          const label=unlockFields.querySelector('label');
          if(label)label.firstChild.textContent='Couple passphrase ';
        }
        const message=document.getElementById('secureVaultMessage');
        if(message)message.textContent='Enter the Couple A or Couple B passphrase to open protected traveler records.';
        requestAnimationFrame(()=>{
          unlockInput?.focus();
          unlockFields?.scrollIntoView({behavior:'smooth',block:'center'});
        });
      }else{
        if(manager)manager.hidden=true;
        if(unlockFields)unlockFields.hidden=true;
        const message=document.getElementById('secureVaultMessage');
        if(message)message.innerHTML='No encrypted vault is stored on this browser origin. Return to the Hub and use <strong>Maintenance 🔒</strong> to restore the existing backup.';
      }
    };

    showDirectEntry();
    setTimeout(showDirectEntry,120);

    if(requestedVaultSection)sessionStorage.setItem('teeVaultRequestedSectionV1',requestedVaultSection);
    panel?.scrollIntoView({behavior:'smooth',block:'start'});
    return;
  }

  document.body.classList.add('source-streamlined-mode');
  technicalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.hidden=true));
  normalTargets.forEach(el=>el.hidden=true);
  if(home)home.hidden=false;

  document.getElementById('streamAddDocument')?.addEventListener('click',showAdd);
  document.getElementById('streamNeedsAttention')?.addEventListener('click',()=>showManager('needs'));
  document.getElementById('streamCompleted')?.addEventListener('click',()=>showManager('structured'));
  document.getElementById('streamDocumentLibrary')?.addEventListener('click',showLibrary);

  if(requestedView==='library')setTimeout(showLibrary,80);
})();
