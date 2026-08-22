"use strict";

const registry = window.HUB_REGISTRY || [];
const byId = id => registry.find(app => app.id === id);

const HUB_LAYOUT = {
  traveler: [
    {id:'travel-daily-operations', label:'Daily Operations', purpose:'See what matters today: timeline, reminders, gear, notes and immediate next actions.'},
    {id:'travel-essentials', label:'Quick Reference', purpose:'Emergency, identity/traveler, phone/data, insurance/medical and problem-solving reference.'},
    {id:'travel-itinerary', label:'Master Itinerary', purpose:'See the full trip schedule and how today fits into the overall journey.'},
    {id:'travel-transportation', label:'Transportation', purpose:'Flights, trains, transfers, tickets, seats, baggage and routing.'},
    {id:'travel-hotels', label:'Hotels', purpose:'Lodging, check-in details, addresses, confirmations and hotel notes.'},
    {id:'travel-maps-movement', label:'Maps & Routes', purpose:'See where you are going and how destinations connect.'},
    {id:'travel-language', label:'Language', purpose:'Use practical phrases and country language help when you need it.'},
    {id:'travel-costs', label:'Expenses', purpose:'Record and review trip spending. A friendlier redesign is intentionally tabled for later.'},
    {id:'travel-photos', label:'Photos', purpose:'Current photo tools remain available while storage and workflow are brainstormed later.'}
  ],
  preparation: [
    {id:'travel-source-documents', label:'Source Documents', purpose:'Turn incoming PDFs/images into usable TEE information: Add → Review → Save → Verify → Done.'},
    {id:'travel-weather-clothing', label:'Weather + Clothing', purpose:'Prepare for upcoming conditions, clothing and weather-dependent gear.'},
    {id:'travel-packing', label:'Packing', purpose:'Prepare what to pack, carry tomorrow and avoid forgetting.'},
    {id:'travel-local-knowledge', label:'Local Knowledge', purpose:'Prepare for local etiquette, safety, dining, transportation culture, money and tipping.'}
  ],
  library: [
    {id:'document-library', label:'Document Library', purpose:'Find original source documents and processing history when you need supporting evidence.', url:'apps/travel-private-documents/index.html?teeView=library'},
    {id:'travel-archive', label:'Trip Archive', purpose:'Post-trip journal, reviews, lessons learned, photos and future-trip reference.'}
  ]
};

function cardFor(item, index){
  const app = byId(item.id);
  const url = item.url || app?.url || '#';
  const a = document.createElement('a');
  a.className = 'stream-app-card';
  a.href = url;
  a.innerHTML = `<span class="stream-card-order">${index+1}</span><span class="stream-card-copy"><strong>${item.label}</strong><small>${item.purpose}</small></span><span class="stream-card-arrow">›</span>`;
  return a;
}

function renderGroup(id, items){
  const host = document.getElementById(id);
  if(!host) return;
  host.innerHTML = '';
  items.forEach((item,index)=>host.appendChild(cardFor(item,index)));
}

renderGroup('travelerGrid', HUB_LAYOUT.traveler);
renderGroup('preparationGrid', HUB_LAYOUT.preparation);
renderGroup('libraryGrid', HUB_LAYOUT.library);

const maintenanceToggle = document.getElementById('maintenanceHubToggle');
const maintenanceContent = document.getElementById('maintenanceHubContent');
const maintenanceState = document.getElementById('maintenanceHubState');
function setMaintenanceOpen(open){
  if(!maintenanceContent || !maintenanceToggle) return;
  maintenanceContent.hidden = !open;
  maintenanceToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if(maintenanceState) maintenanceState.textContent = open ? 'Collapse' : 'Expand';
}
maintenanceToggle?.addEventListener('click',()=>setMaintenanceOpen(maintenanceToggle.getAttribute('aria-expanded') !== 'true'));
setMaintenanceOpen(false);

const searchable = [...HUB_LAYOUT.traveler, ...HUB_LAYOUT.preparation, ...HUB_LAYOUT.library];
const hubSearch = document.getElementById('hubSearch');
const searchResults = document.getElementById('searchResults');
function renderSearch(){
  const q = (hubSearch?.value || '').trim().toLowerCase();
  if(!searchResults) return;
  searchResults.innerHTML = '';
  if(!q){ searchResults.innerHTML = '<p class="stream-search-empty">Type a word to find a visible TEE app.</p>'; return; }
  const matches = searchable.filter(item => `${item.label} ${item.purpose}`.toLowerCase().includes(q));
  matches.forEach((item,index)=>searchResults.appendChild(cardFor(item,index)));
  if(!matches.length) searchResults.innerHTML = '<p class="stream-search-empty">No visible TEE app matches that search.</p>';
}
hubSearch?.addEventListener('input',renderSearch);
renderSearch();

// Keep the redesigned Hub available offline without exposing maintenance internals.
if('serviceWorker' in navigator && window.isSecureContext){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}



// v3.3.81 — first-run tester onboarding.
const hubFirstRunRestore=document.getElementById('hubFirstRunRestore');
const hubFirstRunRestoreButton=document.getElementById('hubFirstRunRestoreButton');
const hubPostRestoreNotice=document.getElementById('hubPostRestoreNotice');
const hubPostRestoreUnlock=document.getElementById('hubPostRestoreUnlock');

function hubHasSavedVault(){
  try{
    const raw=localStorage.getItem('teeSecureVaultV1');
    if(!raw)return false;
    const parsed=JSON.parse(raw);
    return Boolean(parsed?.id);
  }catch{
    return Boolean(localStorage.getItem('teeSecureVaultV1'));
  }
}
function hubRestoreUrl(){
  const url=new URL('apps/travel-private-documents/index.html',location.href);
  url.searchParams.set('teeAction','restore');
  url.searchParams.set('teeReturn','hub');
  return url.toString();
}
function updateHubFirstRunState(){
  const hasVault=hubHasSavedVault();
  if(hubFirstRunRestore)hubFirstRunRestore.hidden=hasVault;
  document.body.classList.toggle('hub-needs-restore',!hasVault);
  return hasVault;
}
hubFirstRunRestoreButton?.addEventListener('click',event=>{
  event.preventDefault();
  location.href=hubRestoreUrl();
});

// v3.3.73 — one unlock creates a 30-minute TEE authorization session.
const hubVaultToggle=document.getElementById('hubVaultToggle');

// v3.3.84 — TEE Hub Install / Refresh-Update / Help.
const installTeeButton=document.getElementById('installTeeButton');
const installTeeDialog=document.getElementById('installTeeDialog');
const installTeeClose=document.getElementById('installTeeClose');
const installTeeDone=document.getElementById('installTeeDone');
const installTeeStatus=document.getElementById('installTeeStatus');
const installNativeButton=document.getElementById('installNativeButton');
const refreshTeeButton=document.getElementById('refreshTeeButton');
const helpTeeButton=document.getElementById('helpTeeButton');
const helpTeeDialog=document.getElementById('helpTeeDialog');
const helpTeeClose=document.getElementById('helpTeeClose');
const helpTeeDone=document.getElementById('helpTeeDone');
const installShareText=document.getElementById('installShareText');
const copyInstallInstructions=document.getElementById('copyInstallInstructions');
const copyInstallStatus=document.getElementById('copyInstallStatus');

let teeDeferredInstallPrompt=null;

function teeIsStandalone(){
  return window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone === true;
}
const TEE_PUBLIC_INSTALL_URL='https://drtforshortaol.github.io/TEE---Travel---App/';
function teePublicLink(){
  return TEE_PUBLIC_INSTALL_URL;
}
function teeInstallMessage(){
  return `TEE Hub — Turkey / Eastern Europe Trip

Open this link on your phone:
${teePublicLink()}

iPhone / iPad
1. Open the link in Safari.
2. Tap the Share button.
3. Scroll down and tap Add to Home Screen.
4. Name it TEE Hub.
5. Tap Add.
6. Open TEE Hub from the Home Screen.

On a new device, use Restore Existing TEE with the authorized encrypted backup. Do not create a replacement vault.

Tap Help inside TEE if you need installation, updating, or troubleshooting instructions.`;
}
function fillInstallShare(){
  if(installShareText) installShareText.value=teeInstallMessage();
}
function updateNativeInstallUi(){
  if(installNativeButton) installNativeButton.hidden=!teeDeferredInstallPrompt;
  if(installTeeStatus){
    if(teeIsStandalone()){
      installTeeStatus.hidden=false;
      installTeeStatus.textContent='TEE is already running from the Home Screen on this device. You can still copy these instructions to install TEE on another device.';
    }else{
      installTeeStatus.hidden=true;
      installTeeStatus.textContent='';
    }
  }
}
function openInstallTee(){
  fillInstallShare();
  updateNativeInstallUi();
  if(installTeeDialog?.showModal) installTeeDialog.showModal();
  else installTeeDialog?.setAttribute('open','');
}
function closeInstallTee(){
  if(installTeeDialog?.close) installTeeDialog.close();
  else installTeeDialog?.removeAttribute('open');
}
function openHelpTee(){
  if(helpTeeDialog?.showModal) helpTeeDialog.showModal();
  else helpTeeDialog?.setAttribute('open','');
}
function closeHelpTee(){
  if(helpTeeDialog?.close) helpTeeDialog.close();
  else helpTeeDialog?.removeAttribute('open');
}

installTeeButton?.addEventListener('click',openInstallTee);
installTeeClose?.addEventListener('click',closeInstallTee);
installTeeDone?.addEventListener('click',closeInstallTee);
installTeeDialog?.addEventListener('click',event=>{if(event.target===installTeeDialog) closeInstallTee();});

copyInstallInstructions?.addEventListener('click',async()=>{
  fillInstallShare();
  try{
    await navigator.clipboard.writeText(installShareText.value);
    if(copyInstallStatus) copyInstallStatus.textContent='Instructions copied. Paste them into your text message.';
  }catch{
    installShareText?.focus();
    installShareText?.select();
    if(copyInstallStatus) copyInstallStatus.textContent='Select the instructions above and tap Copy.';
  }
});

helpTeeButton?.addEventListener('click',openHelpTee);
helpTeeClose?.addEventListener('click',closeHelpTee);
helpTeeDone?.addEventListener('click',closeHelpTee);
helpTeeDialog?.addEventListener('click',event=>{if(event.target===helpTeeDialog) closeHelpTee();});

refreshTeeButton?.addEventListener('click',async()=>{
  const original=refreshTeeButton.textContent;
  refreshTeeButton.disabled=true;
  refreshTeeButton.textContent='Updating…';
  try{
    if('caches' in window){
      const names=await caches.keys();
      await Promise.all(names.filter(name=>/tee/i.test(name)).map(name=>caches.delete(name)));
    }
    const regs=await navigator.serviceWorker?.getRegistrations?.() || [];
    await Promise.all(regs.map(reg=>reg.update().catch(()=>{})));
    window.location.reload();
  }catch{
    alert('Refresh / Update could not complete. Open Help for troubleshooting.');
    refreshTeeButton.disabled=false;
    refreshTeeButton.textContent=original;
  }
});

window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  teeDeferredInstallPrompt=event;
  updateNativeInstallUi();
});
installNativeButton?.addEventListener('click',async()=>{
  if(!teeDeferredInstallPrompt)return;
  teeDeferredInstallPrompt.prompt();
  try{await teeDeferredInstallPrompt.userChoice;}catch{}
  teeDeferredInstallPrompt=null;
  updateNativeInstallUi();
});
window.addEventListener('appinstalled',()=>{
  teeDeferredInstallPrompt=null;
  updateNativeInstallUi();
});
updateNativeInstallUi();

const hubVaultPanel=document.getElementById('hubVaultPanel');
const hubVaultClose=document.getElementById('hubVaultClose');
const hubVaultFrame=document.getElementById('hubVaultFrame');
const hubVaultEntryAction=document.getElementById('hubVaultEntryAction');
const hubVaultSessionSummary=document.getElementById('hubVaultSessionSummary');
const hubVaultSessionLabel=document.getElementById('hubVaultSessionLabel');
const hubVaultSessionCountdown=document.getElementById('hubVaultSessionCountdown');
const hubVaultLockNow=document.getElementById('hubVaultLockNow');
const hubVaultPanelTitle=document.getElementById('hubVaultPanelTitle');
const hubVaultPanelSubtitle=document.getElementById('hubVaultPanelSubtitle');

let hubVaultTicker=null;

function hubSession(){
  return window.TEEVaultSession?.get?.() || null;
}

function updateHubVaultAuthorization(){
  const session=hubSession();
  if(session){
    const remaining=window.TEEVaultSession.formatRemaining();
    hubVaultToggle?.classList.add('authorized');
    if(hubVaultEntryAction)hubVaultEntryAction.textContent=`Open · ${remaining}`;
    if(hubVaultSessionLabel)hubVaultSessionLabel.textContent=`Vault Open — ${session.profileLabel || 'Authorized'}`;
    if(hubVaultSessionCountdown)hubVaultSessionCountdown.textContent=`${remaining} remaining`;
    if(hubVaultPanelTitle)hubVaultPanelTitle.textContent='Vault Authorization Active';
    if(hubVaultPanelSubtitle)hubVaultPanelSubtitle.textContent='Protected information may now appear directly inside supported TEE apps.';
    if(hubVaultSessionSummary)hubVaultSessionSummary.hidden=false;
    if(hubVaultFrame)hubVaultFrame.hidden=true;
  }else{
    hubVaultToggle?.classList.remove('authorized');
    const hasVault=updateHubFirstRunState();
    if(hubVaultEntryAction)hubVaultEntryAction.textContent=hasVault?'Unlock Vault':'Restore Existing TEE';
    if(hubVaultPanelTitle)hubVaultPanelTitle.textContent=hasVault?'Secure Vault':'Restore Existing TEE';
    if(hubVaultPanelSubtitle)hubVaultPanelSubtitle.textContent=hasVault
      ?'Enter the authorized Couple A or Couple B passphrase once. Authorization lasts 30 minutes.'
      :'This browser does not have the encrypted TEE Vault yet. Restore the existing backup first.';
    if(hubVaultSessionSummary)hubVaultSessionSummary.hidden=true;
    if(hubVaultFrame && hubVaultPanel && !hubVaultPanel.hidden)hubVaultFrame.hidden=!hasVault;
  }
}

function ensureHubVaultTicker(){
  if(hubVaultTicker!==null)return;
  hubVaultTicker=setInterval(()=>{
    updateHubVaultAuthorization();
    if(!hubSession() && hubVaultTicker!==null){
      clearInterval(hubVaultTicker);
      hubVaultTicker=null;
    }
  },1000);
}

function setHubVaultOpen(open){
  if(!hubVaultPanel||!hubVaultToggle)return;
  const session=hubSession();
  if(open && !session && hubVaultFrame && !hubVaultFrame.getAttribute('src')){
    hubVaultFrame.src=hubVaultFrame.dataset.src;
  }
  hubVaultPanel.hidden=!open;
  hubVaultToggle.setAttribute('aria-expanded',open?'true':'false');
  if(open){
    updateHubVaultAuthorization();
    ensureHubVaultTicker();
    requestAnimationFrame(()=>hubVaultPanel.scrollIntoView({behavior:'smooth',block:'start'}));
  }else{
    requestAnimationFrame(()=>hubVaultToggle.scrollIntoView({behavior:'smooth',block:'center'}));
  }
}

hubVaultToggle?.addEventListener('click',()=>{
  if(!hubHasSavedVault()){
    location.href=hubRestoreUrl();
    return;
  }
  setHubVaultOpen(hubVaultPanel?.hidden!==false);
});
hubVaultClose?.addEventListener('click',()=>setHubVaultOpen(false));

hubVaultLockNow?.addEventListener('click',()=>{
  window.TEEVaultSession?.clear?.('manual');
  try{
    hubVaultFrame?.contentWindow?.postMessage({type:'TEE_VAULT_SESSION_LOCK'},window.location.origin);
  }catch{}
  updateHubVaultAuthorization();
});

window.addEventListener('message',event=>{
  if(event.origin!==window.location.origin)return;
  if(event.data?.type==='TEE_VAULT_SESSION_OPEN'){
    updateHubVaultAuthorization();
    ensureHubVaultTicker();
    // The passphrase has done its job. Return the traveler to the Hub.
    setTimeout(()=>setHubVaultOpen(false),250);
  }
  if(event.data?.type==='TEE_VAULT_SESSION_CLOSED'){
    window.TEEVaultSession?.clear?.('vault-closed');
    updateHubVaultAuthorization();
  }
});

window.addEventListener(window.TEEVaultSession?.eventName || 'tee-vault-session-changed',()=>{
  updateHubVaultAuthorization();
  if(hubSession())ensureHubVaultTicker();
});

updateHubFirstRunState();
updateHubVaultAuthorization();

const hubParams=new URLSearchParams(location.search);
if(hubParams.get('teeRestored')==='1' && hubHasSavedVault()){
  if(hubPostRestoreNotice)hubPostRestoreNotice.hidden=false;
  const cleanUrl=new URL(location.href);
  cleanUrl.searchParams.delete('teeRestored');
  history.replaceState({},'',cleanUrl.pathname+cleanUrl.search+cleanUrl.hash);
  requestAnimationFrame(()=>hubPostRestoreNotice?.scrollIntoView({behavior:'smooth',block:'center'}));
}
hubPostRestoreUnlock?.addEventListener('click',()=>{
  if(hubPostRestoreNotice)hubPostRestoreNotice.hidden=true;
  setHubVaultOpen(true);
});
if(hubSession())ensureHubVaultTicker();
