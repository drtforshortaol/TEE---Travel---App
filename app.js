const registry = window.HUB_REGISTRY || [];
const categoryMount = document.getElementById('categoryMount');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const cacheBtn = document.getElementById('cacheBtn');
const expandHubCardsBtn = document.getElementById('expandHubCardsBtn');
const collapseHubCardsBtn = document.getElementById('collapseHubCardsBtn');
const installBtn = document.getElementById('installBtn');
const backupTeeBtn=document.getElementById('backupTeeBtn');
const restoreTeeBtn=document.getElementById('restoreTeeBtn');
const updateTeeBtn=document.getElementById('updateTeeBtn');
const fixTeeBtn=document.getElementById('fixTeeBtn');
const quickReferenceBtn=document.getElementById('quickReferenceBtn');
const backupStatusText=document.getElementById('backupStatusText');
const backupStatusBadge=document.getElementById('backupStatusBadge');
const firstRunDialog=document.getElementById('firstRunDialog');
const firstRunRestore=document.getElementById('firstRunRestore');
const firstRunCreate=document.getElementById('firstRunCreate');
const firstRunLater=document.getElementById('firstRunLater');

const TEE_BUILD_VERSION = '3.3.68';
const TEE_EXPECTED_CACHE = 'tee-v3-3-55-all-apps-default-expanded';
const UPDATE_CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;

function unique(values){return [...new Set(values)].filter(Boolean).sort();}
function optionize(select, values){values.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;select.appendChild(o);});}
optionize(categoryFilter, unique(registry.map(a=>a.category)));
optionize(statusFilter, unique(registry.map(a=>a.status)));

function isBuilt(app){ return app.status === 'built' || app.status === 'active'; }
function matches(app){
  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  const status = statusFilter.value;
  const blob = [app.id, app.name, app.category, app.description, app.status, ...(app.tags||[]), ...(app.sourceFiles||[])].join(' ').toLowerCase();
  return (!q || blob.includes(q)) && (cat==='all' || app.category===cat) && (status==='all' || app.status===status);
}
function appPill(app){
  const a=document.createElement('a');
  a.className = isBuilt(app) ? 'app-pill' : 'app-pill disabled';
  a.href = isBuilt(app) ? app.url : '#';
  a.textContent = app.name;
  a.dataset.appId = app.id;
  a.dataset.category = app.category;
  a.title = `${app.name}: ${app.description || ''}`;
  if (!isBuilt(app)) {
    a.setAttribute('aria-disabled','true');
    a.addEventListener('click', e => e.preventDefault());
  }
  return a;
}
function render(){
  const filtered = registry.filter(matches);
  const groups = {};
  filtered.forEach(app=>{(groups[app.category] ||= []).push(app);});
  categoryMount.innerHTML='';
  Object.entries(groups).forEach(([cat, apps])=>{
    const section=document.createElement('section');
    section.className='category inline-category';
    section.dataset.category = cat;
    const head=document.createElement('div');
    head.className='category-inline-header';
    const title=document.createElement('div');
    title.className='category-inline-title';
    title.innerHTML=`<span class="category-name">${cat}</span><span class="category-count">${apps.length} app${apps.length===1?'':'s'}</span>`;
    const pills=document.createElement('div');
    pills.className='category-app-pills';
    apps.forEach(a=>pills.appendChild(appPill(a)));
    head.append(title, pills);
    section.appendChild(head);
    categoryMount.appendChild(section);
  });
  if(!filtered.length){categoryMount.innerHTML='<p class="notice">No apps match the current filters.</p>';}
}
[searchInput, categoryFilter, statusFilter].forEach(el=>el.addEventListener('input', render));
render();

expandHubCardsBtn?.addEventListener('click', () => alert('Hub cards are direct clickable boxes. No dropdown expansion is needed.'));
collapseHubCardsBtn?.addEventListener('click', () => alert('Hub cards are direct clickable boxes. No dropdown collapse is needed.'));

// ---- Service worker / offline readiness ----
const prepareOfflineBtn = document.getElementById('prepareOfflineBtn');
const diagnosticsBtn = document.getElementById('diagnosticsBtn');
const offlineBadge = document.getElementById('offlineBadge');
const offlineStatus = document.getElementById('offlineStatus');
const offlineProgress = document.getElementById('offlineProgress');
const offlineProgressBar = document.getElementById('offlineProgressBar');
const diagnosticsPanel = document.getElementById('diagnosticsPanel');
const diagnosticsOutput = document.getElementById('diagnosticsOutput');

function setOfflineState(kind,label,text){
  if(offlineBadge){offlineBadge.className='offline-badge '+(kind||'');offlineBadge.textContent=label;}
  if(offlineStatus && text) offlineStatus.innerHTML=text;
}
function setOfflineProgress(pct){
  if(!offlineProgress||!offlineProgressBar)return;
  offlineProgress.hidden=false;
  offlineProgressBar.style.width=Math.max(0,Math.min(100,pct))+'%';
}
function swMessage(worker,payload,timeout=120000){
  return new Promise((resolve,reject)=>{
    if(!worker)return reject(new Error('No active TEE service worker.'));
    const channel=new MessageChannel();
    const timer=setTimeout(()=>reject(new Error('TEE service-worker request timed out.')),timeout);
    channel.port1.onmessage=e=>{clearTimeout(timer);resolve(e.data||{});};
    worker.postMessage(payload,[channel.port2]);
  });
}
async function activeTeeWorker(){
  if(!('serviceWorker' in navigator)) throw new Error('Service workers are not available in this browser.');
  let reg=await navigator.serviceWorker.getRegistration('./');
  if(!reg) reg=await navigator.serviceWorker.register('./sw.js');
  try{await reg.update();}catch{}
  const ready=await navigator.serviceWorker.ready;
  return ready.active || reg.active || reg.waiting || reg.installing;
}
async function getOfflineStatus(){
  const worker=await activeTeeWorker();
  return swMessage(worker,{type:'TEE_OFFLINE_STATUS'},30000);
}
async function prepareOffline(){
  if(!window.isSecureContext) throw new Error('TEE is not in a secure browser context. Use the HTTPS server or published HTTPS address.');
  setOfflineState('warn','Preparing…','Stay online while TEE refreshes the complete offline app shell.');
  setOfflineProgress(12);
  const worker=await activeTeeWorker();
  setOfflineProgress(30);
  const result=await swMessage(worker,{type:'TEE_PREPARE_OFFLINE'},180000);
  setOfflineProgress(90);
  const status=await swMessage(worker,{type:'TEE_OFFLINE_STATUS'},30000);
  const missing=status.missing||[];
  if((result.failed||[]).length || missing.length){
    const names=[...(result.failed||[]).map(x=>x.asset),...missing].filter((x,i,a)=>a.indexOf(x)===i);
    setOfflineState('error','Not ready',`TEE could not cache ${names.length} required file${names.length===1?'':'s'}. Stay online and open Diagnostics for details.`);
    setOfflineProgress(100);
    return {result,status};
  }
  localStorage.setItem('tee-offline-ready-build',TEE_BUILD_VERSION);
  localStorage.setItem('tee-offline-ready-at',new Date().toISOString());
  setOfflineProgress(100);
  setOfflineState('ready','Ready for offline use','<strong>Ready for offline use.</strong> TEE may now be used without the network. Do not clear Safari website data, because website-data clearing can remove local TEE records.');
  return {result,status};
}
prepareOfflineBtn?.addEventListener('click',async()=>{
  prepareOfflineBtn.disabled=true;
  try{await prepareOffline();await diagnostics();}
  catch(e){setOfflineState('error','Not ready',`Offline preparation failed: ${e.message}`);await diagnostics().catch(()=>{});}
  finally{prepareOfflineBtn.disabled=false;}
});

// ---- v3.3.68 update status / daily check ----
const updateBadge = document.getElementById('updateBadge');
const currentVersionText = document.getElementById('currentVersionText');
const latestVersionText = document.getElementById('latestVersionText');
const lastUpdateCheckText = document.getElementById('lastUpdateCheckText');
const updateStatusText = document.getElementById('updateStatusText');
const updateRestartBtn = document.getElementById('updateRestartBtn');

function versionParts(v){return String(v||'0').replace(/^v/i,'').split('.').map(x=>Number.parseInt(x,10)||0);}
function compareVersions(a,b){
  const aa=versionParts(a), bb=versionParts(b), n=Math.max(aa.length,bb.length);
  for(let i=0;i<n;i++){const x=aa[i]||0,y=bb[i]||0;if(x>y)return 1;if(x<y)return -1;}
  return 0;
}
function formatDateTime(value){
  if(!value)return 'Never';
  const d=new Date(value);
  if(Number.isNaN(d.getTime()))return String(value);
  return d.toLocaleString([], {dateStyle:'medium',timeStyle:'short'});
}
function setUpdateBadge(kind,text){if(updateBadge){updateBadge.className='offline-badge '+(kind||'');updateBadge.textContent=text;}}
function refreshSavedUpdateStatus(){
  if(currentVersionText) currentVersionText.textContent='v'+TEE_BUILD_VERSION;
  const last=localStorage.getItem('tee-last-update-check-at');
  const latest=localStorage.getItem('tee-latest-published-version');
  if(lastUpdateCheckText) lastUpdateCheckText.textContent=formatDateTime(last);
  if(latestVersionText) latestVersionText.textContent=latest?'v'+latest:'Not checked';
}
async function fetchPublishedVersion(){
  if(!navigator.onLine) throw new Error('TEE is offline. Reconnect to check for updates.');
  const u=new URL('./version.json',location.href);
  u.searchParams.set('_',Date.now());
  const r=await fetch(u,{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
  if(!r.ok) throw new Error(`Version check returned HTTP ${r.status}.`);
  const data=await r.json();
  if(!data.version) throw new Error('Published version file does not contain a version number.');
  return data;
}
async function checkForPublishedUpdate({manual=false}={}){
  setUpdateBadge('warn','Checking…');
  if(updateStatusText) updateStatusText.textContent='Checking the published TEE build…';
  try{
    const data=await fetchPublishedVersion();
    const now=new Date().toISOString();
    localStorage.setItem('tee-last-update-check-at',now);
    localStorage.setItem('tee-latest-published-version',data.version);
    if(lastUpdateCheckText) lastUpdateCheckText.textContent=formatDateTime(now);
    if(latestVersionText) latestVersionText.textContent='v'+data.version;
    const cmp=compareVersions(data.version,TEE_BUILD_VERSION);
    if(cmp>0){
      setUpdateBadge('warn','Update available');
      if(updateStatusText) updateStatusText.innerHTML=`Published TEE <strong>v${data.version}</strong> is newer than this device's v${TEE_BUILD_VERSION}. Tap <strong>Update &amp; Restart</strong>.`;
      if(updateRestartBtn) updateRestartBtn.hidden=false;
    }else if(cmp===0){
      setUpdateBadge('ready','Up to date');
      if(updateStatusText) updateStatusText.textContent=`TEE v${TEE_BUILD_VERSION} is the latest published build at this address.`;
      if(updateRestartBtn) updateRestartBtn.hidden=true;
    }else{
      setUpdateBadge('ready','Development build');
      if(updateStatusText) updateStatusText.textContent=`This device is running v${TEE_BUILD_VERSION}, newer than the currently published v${data.version}.`;
      if(updateRestartBtn) updateRestartBtn.hidden=true;
    }
    return data;
  }catch(e){
    setUpdateBadge('error','Check failed');
    if(updateStatusText) updateStatusText.textContent='Update check failed: '+e.message;
    if(manual) alert('TEE update check failed: '+e.message);
    throw e;
  }
}
async function updateAndRestart(){
  if(!navigator.onLine){alert('Reconnect to the internet or PC HTTPS server before updating.');return;}
  try{
    updateRestartBtn && (updateRestartBtn.disabled=true);
    if('serviceWorker' in navigator){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.update().catch(()=>{})));
      await new Promise(r=>setTimeout(r,700));
    }
    const u=new URL(location.href);
    u.searchParams.set('tee_update',Date.now());
    location.replace(u.toString());
  }catch(e){alert('TEE could not restart for update: '+e.message);if(updateRestartBtn)updateRestartBtn.disabled=false;}
}
cacheBtn?.addEventListener('click',async()=>{
  cacheBtn.disabled=true;
  try{
    const data=await checkForPublishedUpdate({manual:true});
    if(compareVersions(data.version,TEE_BUILD_VERSION)>0){
      if(confirm(`TEE v${data.version} is available. Update and restart now?`)) await updateAndRestart();
    }else if('serviceWorker' in navigator){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.update().catch(()=>{})));
      const worker=await activeTeeWorker();
      const refreshed=await swMessage(worker,{type:'TEE_PREPARE_OFFLINE'},180000);
      if((refreshed.failed||[]).length===0){
        localStorage.setItem('tee-offline-ready-build',TEE_BUILD_VERSION);
        localStorage.setItem('tee-offline-ready-at',new Date().toISOString());
        setOfflineState('ready','Cache refreshed',`TEE v${TEE_BUILD_VERSION} app-shell cache was refreshed successfully.`);
        if(updateStatusText) updateStatusText.textContent=`TEE v${TEE_BUILD_VERSION} is current and the app-shell cache was refreshed.`;
      }
    }
  }catch{}
  finally{cacheBtn.disabled=false;}
});
updateRestartBtn?.addEventListener('click',updateAndRestart);
function dailyUpdateCheckIfDue(){
  const last=Date.parse(localStorage.getItem('tee-last-update-check-at')||'');
  if(!navigator.onLine)return;
  if(!Number.isFinite(last) || Date.now()-last>=UPDATE_CHECK_INTERVAL_MS){checkForPublishedUpdate().catch(()=>{});}
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')dailyUpdateCheckIfDue();});
window.addEventListener('online',()=>{setOfflineState('warn','Online','Connected. Prepare this build for offline use after a checkpoint you want available offline.');dailyUpdateCheckIfDue();});
window.addEventListener('offline',()=>{
  const ready=localStorage.getItem('tee-offline-ready-build')===TEE_BUILD_VERSION;
  setOfflineState(ready?'ready':'warn',ready?'Offline ready':'Offline',ready?'TEE is offline and this build was previously prepared for offline use.':'TEE is offline, but this build was not confirmed ready. Reconnect before relying on it.');
});

// ---- Install, cache clearing, maintenance help ----
let deferredPrompt=null;
const maintenanceDialog=document.getElementById('maintenanceDialog');
const maintenanceDialogClose=document.getElementById('maintenanceDialogClose');
const maintenanceDialogBody=document.getElementById('maintenanceDialogBody');
const maintenanceHelpBtn=document.getElementById('maintenanceHelpBtn');
const nativeInstallBtn=document.getElementById('nativeInstallBtn');
const clearCacheBtn=document.getElementById('clearCacheBtn');
const runIntegrityBtn=document.getElementById('runIntegrityBtn');

const MAINT_HELP={
  install:`<h3>Install TEE on iPhone</h3><ol><li>Open the TEE HTTPS address in <strong>Safari</strong>.</li><li>Confirm the correct TEE version appears.</li><li>Tap <strong>Prepare for Offline Use</strong> and wait for Ready.</li><li>Tap Safari's <strong>Share</strong> button → <strong>Add to Home Screen</strong> → Add.</li><li>Open TEE from the new Home Screen icon and verify the vault before traveling offline.</li><li>If TEE asks to create a new two-couple vault but you already have one, do <strong>not</strong> create a replacement. Restore your verified encrypted TEE backup instead.</li></ol><h3>Install / use TEE on PC</h3><ol><li>Development testing: start the TEE HTTPS server and open the exact server address used for that vault.</li><li>Published milestone: open the GitHub Pages HTTPS address in Chrome or Edge.</li><li>If the browser offers an install icon/menu, you may install TEE as an app; otherwise a normal browser tab/bookmark works.</li></ol><p class="maintenance-warning"><strong>Origin safety:</strong> <code>https://127.0.0.1:8443</code> and <code>https://10.x.x.x:8443</code> are different browser storage origins. A vault stored under one address does not automatically appear under the other.</p>`,
  refresh:`<h3>Refresh the Hub</h3><p>Use <strong>Check for Update</strong> first. It checks <code>version.json</code> and asks the service worker to update. If a newer published build is found, use <strong>Update &amp; Restart</strong>.</p><h3>PC refresh</h3><ol><li>Confirm the HTTPS server is serving the intended ACTIVE/APP folder.</li><li>Open the same HTTPS origin that contains your expected local vault.</li><li>Use Check for Update, then reload the page.</li><li>If the old build persists, use Clear App Cache, then reload online and Prepare for Offline Use again.</li></ol><h3>iPhone refresh</h3><ol><li>Open TEE while online.</li><li>Tap Check for Update.</li><li>If offered, tap Update &amp; Restart.</li><li>If the Home Screen app still shows an old build, close it fully and reopen.</li><li>If necessary, open the TEE address once in Safari, verify the current build, then reopen the Home Screen app.</li></ol><h3>Broken app/Home Screen link</h3><p>First confirm the underlying HTTPS address still opens in Safari. A local-PC address only works while the phone can reach that PC/network. A published GitHub Pages address is the intended remote distribution address.</p><h3>Service worker appears to block an update</h3><p>Run Repair Diagnostics. Then use Clear App Cache → Check for Update → Prepare for Offline Use. Do <strong>not</strong> clear Safari website data merely to fix an app-shell update; website-data clearing can remove local vault data.</p>`,
  safety:`<h3>Tags</h3><p>Tags support search/filtering and relationships. Rename or remove tags only when you have checked where they are referenced. A spelling-only change can make an expected filter appear empty.</p><h3>Cross-links</h3><p>Cross-links should point to stable app IDs/URLs. Repair Diagnostics checks registry related-app IDs and attempts to verify built app links while online. Do not replace a working relative link with a device-specific absolute path.</p><h3>References</h3><p>A reference may point to supporting material without being the authoritative protected record. Do not delete a referenced source merely because the structured record exists unless the source-retention decision is intentional.</p><h3>Notes</h3><p>Keep notes attached to their owning record/app unless intentionally promoted to a reusable reference. Changing labels or navigation should not silently detach note data.</p><h3>Hub Registry safety</h3><p><code>hub-registry.js</code> controls Hub app names, IDs, URLs, categories, tags and related-app links. Avoid casual manual edits. Keep IDs unique, preserve stable IDs once other apps reference them, and run Repair Diagnostics after registry changes.</p><p class="maintenance-warning"><strong>Clear App Cache is safe for app-shell repair only.</strong> It does not intentionally clear vault records, passphrases, expenses, notes, IndexedDB or localStorage. Never substitute “clear all website data” for this button.</p>`,
  reference:`<h3>TEE Quick Reference</h3><div class="reference-key"><p><strong>Update TEE</strong> → Get the newest app software.</p><p><strong>Backup TEE</strong> → Create a fresh encrypted copy of trip data.</p><p><strong>Restore TEE</strong> → Load trip data from an encrypted backup.</p><p><strong>Prepare Offline</strong> → Cache TEE so it can open without internet.</p><p><strong>Lock TEE</strong> → Protect Shared/Private information.</p><p><strong>Unlock TEE</strong> → Enter your couple passphrase.</p><p><strong>Public</strong> → Safe for anyone to see.</p><p><strong>Shared</strong> → Available to both traveling couples after authorization.</p><p><strong>Private</strong> → Available only to the owning couple.</p></div><h3>iCloud backup</h3><p>Save the newest encrypted backup to <strong>iCloud Drive → TEE Backups → Current</strong>. Older backups can go in Archive.</p><h3>If something looks wrong</h3><p><strong>Old version:</strong> Update TEE. <strong>Broken link:</strong> Fix TEE. <strong>Won’t work offline:</strong> Prepare for Offline Use again. <strong>Changed phones or records missing:</strong> Restore TEE — do not create a replacement vault.</p><p class="maintenance-warning"><strong>Remember:</strong> Update TEE changes the software. Backup/Restore TEE handles your encrypted trip information.</p>`
};
function showMaintenance(tab='install'){
  if(!maintenanceDialog||!maintenanceDialogBody)return;
  maintenanceDialogBody.innerHTML=MAINT_HELP[tab]||MAINT_HELP.install;
  document.querySelectorAll('[data-maint-tab]').forEach(b=>b.classList.toggle('active',b.dataset.maintTab===tab));
  if(!maintenanceDialog.open){if(typeof maintenanceDialog.showModal==='function')maintenanceDialog.showModal();else maintenanceDialog.setAttribute('open','');}
}

function openTravelerVaultAction(action){
  const url=new URL('apps/travel-private-documents/index.html',location.href);
  url.searchParams.set('teeAction',action);
  location.href=url.toString();
}
function refreshBackupStatus(){
  let meta={};
  try{meta=JSON.parse(localStorage.getItem('teeSecureVaultHealthMetadata')||'{}')||{};}catch{}
  const last=meta.lastBackupAt;
  if(last){
    const d=new Date(last);
    backupStatusText.textContent=`Last encrypted backup on this device: ${d.toLocaleString()}. Save the newest copy to iCloud Drive → TEE Backups → Current.`;
    backupStatusBadge.textContent='Backup available';
    backupStatusBadge.className='offline-badge ready';
  }else{
    backupStatusText.textContent='No recent backup is recorded on this device. Use Backup TEE after important trip changes.';
    backupStatusBadge.textContent='Backup recommended';
    backupStatusBadge.className='offline-badge warn';
  }
}
function maybeShowFirstRun(){
  const hasVault=localStorage.getItem('teeSecureVaultV1');
  const dismissed=sessionStorage.getItem('tee-first-run-dismissed');
  if(!hasVault && !dismissed && firstRunDialog && !firstRunDialog.open){
    setTimeout(()=>firstRunDialog.showModal(),350);
  }
}
backupTeeBtn?.addEventListener('click',()=>openTravelerVaultAction('backup'));
restoreTeeBtn?.addEventListener('click',()=>openTravelerVaultAction('restore'));
updateTeeBtn?.addEventListener('click',()=>cacheBtn?.click());
fixTeeBtn?.addEventListener('click',()=>showMaintenance('refresh'));
quickReferenceBtn?.addEventListener('click',()=>showMaintenance('reference'));
firstRunRestore?.addEventListener('click',()=>openTravelerVaultAction('restore'));
firstRunCreate?.addEventListener('click',()=>openTravelerVaultAction('create'));
firstRunLater?.addEventListener('click',()=>{sessionStorage.setItem('tee-first-run-dismissed','1');firstRunDialog?.close();});

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;if(nativeInstallBtn)nativeInstallBtn.hidden=false;});
installBtn?.addEventListener('click',()=>showMaintenance('install'));
maintenanceHelpBtn?.addEventListener('click',()=>showMaintenance('refresh'));
maintenanceDialogClose?.addEventListener('click',()=>maintenanceDialog.close());
document.querySelectorAll('[data-maint-tab]').forEach(b=>b.addEventListener('click',()=>showMaintenance(b.dataset.maintTab)));
nativeInstallBtn?.addEventListener('click',async()=>{if(!deferredPrompt){alert('This browser is not currently offering a native install prompt. Follow the install instructions shown.');return;}deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;nativeInstallBtn.hidden=true;});
clearCacheBtn?.addEventListener('click',async()=>{
  const ok=confirm('Clear the TEE APP CACHE only?\n\nThis is intended to remove cached app-shell files. It does NOT intentionally delete your encrypted vault, records, expenses, notes, passphrases, localStorage, or IndexedDB.\n\nAfter clearing, stay online and use Check for Update, then Prepare for Offline Use.');
  if(!ok)return;
  clearCacheBtn.disabled=true;
  try{
    let deleted=[];
    if('caches' in window){
      const keys=await caches.keys();
      const targets=keys.filter(k=>k.startsWith('tee-'));
      for(const k of targets){if(await caches.delete(k))deleted.push(k);}
    }
    localStorage.removeItem('tee-offline-ready-build');
    localStorage.removeItem('tee-offline-ready-at');
    setOfflineState('warn','Cache cleared','TEE app-shell cache was cleared. Your local vault/data were not intentionally touched. While online, use Check for Update and then Prepare for Offline Use.');
    alert(`TEE app cache cleared (${deleted.length} cache${deleted.length===1?'':'s'}). Vault/user data were not intentionally cleared.`);
  }catch(e){alert('TEE could not clear the app cache: '+e.message);}
  finally{clearCacheBtn.disabled=false;}
});

async function registryIntegrityDiagnostics(lines){
  const ids=registry.map(x=>x.id).filter(Boolean);
  const idSet=new Set(ids);
  const duplicateIds=ids.filter((x,i)=>ids.indexOf(x)!==i);
  const built=registry.filter(isBuilt);
  const urls=built.map(x=>x.url).filter(Boolean);
  const duplicateUrls=urls.filter((x,i)=>urls.indexOf(x)!==i);
  const missingRelated=[];
  registry.forEach(app=>(app.relatedApps||[]).forEach(id=>{if(!idSet.has(id))missingRelated.push(`${app.id} -> ${id}`);}));
  const emptyTags=registry.filter(app=>!Array.isArray(app.tags)||app.tags.length===0).map(app=>app.id);
  lines.push(`Hub registry entries: ${registry.length}`);
  lines.push(`Built/active registry entries: ${built.length}`);
  lines.push(`Duplicate app IDs: ${duplicateIds.length}${duplicateIds.length?' ('+[...new Set(duplicateIds)].join(', ')+')':''}`);
  lines.push(`Duplicate built URLs: ${duplicateUrls.length}${duplicateUrls.length?' ('+[...new Set(duplicateUrls)].join(', ')+')':''}`);
  lines.push(`Broken related-app references: ${missingRelated.length}`);
  missingRelated.slice(0,20).forEach(x=>lines.push('  BROKEN '+x));
  lines.push(`Registry entries without tags: ${emptyTags.length}`);
  if(navigator.onLine){
    let broken=0;
    for(const app of built){
      try{
        const u=new URL(app.url,location.href);u.searchParams.set('_diag',Date.now());
        const r=await fetch(u,{cache:'no-store'});
        if(!r.ok){broken++;lines.push(`  LINK HTTP ${r.status}: ${app.id} -> ${app.url}`);}
      }catch(e){broken++;lines.push(`  LINK ERROR: ${app.id} -> ${app.url} (${e.message})`);}
    }
    lines.push(`Built app link failures while online: ${broken}`);
  }else lines.push('Built app link check: skipped (offline)');
}
async function diagnostics(){
  const lines=[];
  lines.push(`TEE build: v${TEE_BUILD_VERSION}`);
  lines.push(`URL: ${location.href}`);
  lines.push(`Origin: ${location.origin}`);
  lines.push(`Online now: ${navigator.onLine?'YES':'NO'}`);
  lines.push(`Secure context: ${window.isSecureContext?'YES':'NO'}`);
  lines.push(`Service worker supported: ${'serviceWorker' in navigator?'YES':'NO'}`);
  lines.push(`Display mode standalone: ${matchMedia('(display-mode: standalone)').matches?'YES':'NO'}`);
  lines.push(`Expected TEE cache: ${TEE_EXPECTED_CACHE}`);
  lines.push(`Saved offline-ready build: ${localStorage.getItem('tee-offline-ready-build')||'none'}`);
  lines.push(`Saved offline-ready time: ${localStorage.getItem('tee-offline-ready-at')||'none'}`);
  lines.push(`Last published-update check: ${localStorage.getItem('tee-last-update-check-at')||'none'}`);
  lines.push(`Last published version seen: ${localStorage.getItem('tee-latest-published-version')||'none'}`);
  try{
    const data=await fetchPublishedVersion();
    lines.push(`Network version.json: v${data.version}`);
    lines.push(`Build/version.json agree: ${data.version===TEE_BUILD_VERSION?'YES':'NO'}`);
  }catch(e){lines.push(`Network version.json: unavailable (${e.message})`);}
  try{
    const regs=await navigator.serviceWorker.getRegistrations();
    lines.push(`Service worker registrations: ${regs.length}`);
    regs.forEach((r,i)=>lines.push(`  ${i+1}. ${r.scope} | active=${!!r.active} waiting=${!!r.waiting} installing=${!!r.installing}`));
    const worker=await activeTeeWorker();
    const v=await swMessage(worker,{type:'TEE_VERSION_STATUS'},10000);
    lines.push(`Active TEE service worker version: v${v.version||'unknown'}`);
    lines.push(`Active TEE service worker cache: ${v.cache||'unknown'}`);
    lines.push(`Build/service-worker agree: ${v.version===TEE_BUILD_VERSION?'YES':'NO'}`);
  }catch(e){lines.push(`Service worker diagnostics: ERROR ${e.message}`);}
  try{
    const names=await caches.keys();
    lines.push(`Cache Storage entries: ${names.length}`);
    names.forEach(n=>lines.push(`  - ${n}`));
  }catch(e){lines.push(`Cache Storage: ERROR ${e.message}`);}
  try{
    const st=await getOfflineStatus();
    lines.push(`TEE offline cache expected files: ${st.expected??'?'}`);
    lines.push(`TEE offline cache missing files: ${(st.missing||[]).length}`);
    (st.missing||[]).slice(0,25).forEach(x=>lines.push(`  MISSING ${x}`));
  }catch(e){lines.push(`Offline cache status: ERROR ${e.message}`);}
  try{
    localStorage.setItem('tee-diagnostics-write-test','ok');
    const ok=localStorage.getItem('tee-diagnostics-write-test')==='ok';
    localStorage.removeItem('tee-diagnostics-write-test');
    lines.push(`Local storage writable: ${ok?'YES':'NO'}`);
  }catch(e){lines.push(`Local storage writable: NO (${e.message})`);}
  await registryIntegrityDiagnostics(lines);
  if(diagnosticsOutput)diagnosticsOutput.textContent=lines.join('\n');
  if(diagnosticsPanel)diagnosticsPanel.open=true;
  return lines;
}
diagnosticsBtn?.addEventListener('click',()=>diagnostics().catch(e=>{if(diagnosticsOutput)diagnosticsOutput.textContent='Diagnostics failed: '+e.message;if(diagnosticsPanel)diagnosticsPanel.open=true;}));
runIntegrityBtn?.addEventListener('click',async()=>{maintenanceDialog?.close();await diagnostics().catch(e=>alert('Repair Diagnostics failed: '+e.message));diagnosticsPanel?.scrollIntoView({behavior:'smooth',block:'center'});});

window.addEventListener('load',async()=>{
  refreshSavedUpdateStatus();
  refreshBackupStatus();
  maybeShowFirstRun();
  dailyUpdateCheckIfDue();
  try{
    const st=await getOfflineStatus();
    const ready=(st.missing||[]).length===0;
    if(ready){
      localStorage.setItem('tee-offline-ready-build',TEE_BUILD_VERSION);
      setOfflineState('ready','Offline shell cached',`TEE v${TEE_BUILD_VERSION} required app-shell files are cached. Run Diagnostics or Prepare for Offline Use to refresh them before an offline test.`);
    }
  }catch{}
});


// ---- TEE v3.3.68 Clean Hub Interface ----
const travelerHome = document.getElementById('travelerHome');
const travelerQuickGrid = document.getElementById('travelerQuickGrid');
const uiModeBtn = document.getElementById('uiModeBtn');
const showTravelerToolsBtn = document.getElementById('showTravelerToolsBtn');
const showAllAppsBtn = document.getElementById('showAllAppsBtn');
const travelerHelpBtn = document.getElementById('travelerHelpBtn');
const travelerTools = document.getElementById('travelerTools');
const collapseTravelerToolsBtn = document.getElementById('collapseTravelerToolsBtn');
const showTripWindowBtn = document.getElementById('showTripWindowBtn');
const showUhdfBtn = document.getElementById('showUhdfBtn');
const showBuildModeBtn = document.getElementById('showBuildModeBtn');
const showIphoneTestBtn = document.getElementById('showIphoneTestBtn');
const showAppMaintenanceBtn = document.getElementById('showAppMaintenanceBtn');
const tripWindowPanel = document.getElementById('tripWindowPanel');
const uhdfPanel = document.getElementById('uhdfPanel');
const buildModePanel = document.getElementById('buildModePanel');
const appMaintenancePanel = document.getElementById('appMaintenancePanel');
const collapseTripWindowBtn = document.getElementById('collapseTripWindowBtn');
const collapseUhdfBtn = document.getElementById('collapseUhdfBtn');
const collapseBuildModeBtn = document.getElementById('collapseBuildModeBtn');
const collapseIphoneTestBtn = document.getElementById('collapseIphoneTestBtn');
const collapseAppMaintenanceBtn = document.getElementById('collapseAppMaintenanceBtn');

const TRAVELER_QUICK_IDS = [
  ['travel-daily-operations','Today'],
  ['travel-itinerary','Itinerary'],
  ['travel-transportation','Transportation'],
  ['travel-hotels','Hotels'],
  ['travel-essentials','Essentials'],
  ['travel-weather-clothing','Weather'],
  ['travel-costs','Costs']
];

function travelerModePreferred(){
  return window.matchMedia('(max-width: 820px)').matches ||
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true;
}
function currentUiMode(){
  const saved=localStorage.getItem('tee-ui-mode');
  return saved==='full'||saved==='traveler' ? saved : (travelerModePreferred()?'traveler':'full');
}
function setPanel(panel, button, open, openLabel, closeLabel){
  if(!panel)return;
  panel.hidden=!open;
  if(button)button.textContent=open?closeLabel:openLabel;
  if(open) panel.scrollIntoView({behavior:'smooth',block:'center'});
}
function collapseAllHubPanels(){
  setPanel(travelerTools,showTravelerToolsBtn,false,'TEE Tools','Collapse TEE Tools');
  setPanel(tripWindowPanel,showTripWindowBtn,false,'Trip Window','Collapse Trip Window');
  setPanel(uhdfPanel,showUhdfBtn,false,'UHDF Status','Collapse UHDF Status');
  setPanel(buildModePanel,showBuildModeBtn,false,'Build Mode','Collapse Build Mode');
  setPanel(offlinePanel,showIphoneTestBtn,false,'iPhone Test','Collapse iPhone Test');
  setPanel(appMaintenancePanel,showAppMaintenanceBtn,false,'App Maintenance','Collapse App Maintenance');
}
function applyUiMode(mode, persist=false){
  const traveler=mode==='traveler';
  document.body.classList.toggle('traveler-mode',traveler);
  // v3.3.68: the complete app list is visible by default in both Traveler and Full modes.
  document.body.classList.add('traveler-show-all');
  document.querySelector('.tools')?.removeAttribute('hidden');
  categoryMount?.removeAttribute('hidden');
  collapseAllHubPanels();
  if(persist)localStorage.setItem('tee-ui-mode',mode);
  if(uiModeBtn) uiModeBtn.textContent=traveler?'Full Mode':'Traveler Mode';
  if(showAllAppsBtn) showAllAppsBtn.textContent='Collapse All Apps';
  if(travelerHome) travelerHome.hidden=false;
}
function buildTravelerQuickGrid(){
  if(!travelerQuickGrid)return;
  travelerQuickGrid.innerHTML='';
  TRAVELER_QUICK_IDS.forEach(([id,label])=>{
    const app=registry.find(x=>x.id===id);
    if(!app||!isBuilt(app))return;
    const a=document.createElement('a');
    a.className='traveler-quick-card';
    a.href=app.url;
    a.dataset.appId=id;
    a.innerHTML=`<strong>${label}</strong><span>${app.name}</span>`;
    travelerQuickGrid.appendChild(a);
  });
}
buildTravelerQuickGrid();
applyUiMode(currentUiMode());

uiModeBtn?.addEventListener('click',()=>{
  const next=document.body.classList.contains('traveler-mode')?'full':'traveler';
  applyUiMode(next,true);
  window.scrollTo({top:0,behavior:'smooth'});
});
showAllAppsBtn?.addEventListener('click',()=>{
  const open=document.body.classList.toggle('traveler-show-all');
  showAllAppsBtn.textContent=open?'Collapse All Apps':'All Apps';
  if(open){
    document.querySelector('.tools')?.removeAttribute('hidden');
    categoryMount?.removeAttribute('hidden');
    categoryMount?.scrollIntoView({behavior:'smooth',block:'start'});
  }else{
    document.querySelector('.tools')?.setAttribute('hidden','');
    categoryMount?.setAttribute('hidden','');
  }
});
function togglePanel(panel,button,openLabel,closeLabel){
  const open=panel?.hidden!==false;
  setPanel(panel,button,open,openLabel,closeLabel);
}
showTravelerToolsBtn?.addEventListener('click',()=>togglePanel(travelerTools,showTravelerToolsBtn,'TEE Tools','Collapse TEE Tools'));
collapseTravelerToolsBtn?.addEventListener('click',()=>setPanel(travelerTools,showTravelerToolsBtn,false,'TEE Tools','Collapse TEE Tools'));
showTripWindowBtn?.addEventListener('click',()=>togglePanel(tripWindowPanel,showTripWindowBtn,'Trip Window','Collapse Trip Window'));
collapseTripWindowBtn?.addEventListener('click',()=>setPanel(tripWindowPanel,showTripWindowBtn,false,'Trip Window','Collapse Trip Window'));
showUhdfBtn?.addEventListener('click',()=>togglePanel(uhdfPanel,showUhdfBtn,'UHDF Status','Collapse UHDF Status'));
collapseUhdfBtn?.addEventListener('click',()=>setPanel(uhdfPanel,showUhdfBtn,false,'UHDF Status','Collapse UHDF Status'));
showBuildModeBtn?.addEventListener('click',()=>togglePanel(buildModePanel,showBuildModeBtn,'Build Mode','Collapse Build Mode'));
collapseBuildModeBtn?.addEventListener('click',()=>setPanel(buildModePanel,showBuildModeBtn,false,'Build Mode','Collapse Build Mode'));
showIphoneTestBtn?.addEventListener('click',()=>togglePanel(offlinePanel,showIphoneTestBtn,'iPhone Test','Collapse iPhone Test'));
collapseIphoneTestBtn?.addEventListener('click',()=>setPanel(offlinePanel,showIphoneTestBtn,false,'iPhone Test','Collapse iPhone Test'));
showAppMaintenanceBtn?.addEventListener('click',()=>togglePanel(appMaintenancePanel,showAppMaintenanceBtn,'App Maintenance','Collapse App Maintenance'));
collapseAppMaintenanceBtn?.addEventListener('click',()=>setPanel(appMaintenancePanel,showAppMaintenanceBtn,false,'App Maintenance','Collapse App Maintenance'));
travelerHelpBtn?.addEventListener('click',()=>quickReferenceBtn?.click());

// The detailed app list/search is intentionally collapsed on a clean Hub start.
