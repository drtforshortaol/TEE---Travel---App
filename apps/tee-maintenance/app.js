"use strict";
const $=id=>document.getElementById(id);
const pass=$('maintenancePassphrase'), unlockBtn=$('unlockMaintenance'), lockBtn=$('lockMaintenance');
const authPanel=$('authPanel'), workspace=$('maintenanceWorkspace'), authMessage=$('authMessage'), report=$('maintenanceReport');
const maintenanceRestorePanel=$('maintenanceRestorePanel');
let maintenanceAuthorized=false;
const MAINT_AUTH_KEY="teeMaintenanceAuthorizedUntilV1";
const MAINT_AUTH_MS=15*60*1000;

function savedVault(){ return loadVault(); }
function configureMaintenanceEntry(){
  const hasVault=Boolean(savedVault()?.id);
  if(maintenanceRestorePanel)maintenanceRestorePanel.hidden=hasVault;
  if(authPanel)authPanel.hidden=!hasVault;
  if(workspace)workspace.hidden=true;
  if(!hasVault && authMessage)authMessage.textContent='';
  return hasVault;
}
async function verifyCoupleA(passphrase){
  const saved=savedVault();
  if(!saved?.id) throw new Error('No TEE vault exists on this browser origin. Open the correct TEE installation or restore the vault first.');
  const auth=saved?.accessProfiles?.coupleA?.authentication || saved?.authentication;
  if(!auth) throw new Error('Couple A authentication data is not available in this vault.');
  const key=await authenticatePassphrase(passphrase,auth);
  return Boolean(key);
}
function setAuthorized(yes){
  maintenanceAuthorized=yes;
  authPanel.hidden=yes;
  workspace.hidden=!yes;
  pass.value='';
  if(!yes) authMessage.textContent='';
}
unlockBtn?.addEventListener('click',async()=>{
  authMessage.textContent='Checking Couple A passphrase…';
  unlockBtn.disabled=true;
  try{
    const ok=await verifyCoupleA(pass.value);
    if(!ok){authMessage.textContent='That passphrase did not authenticate Couple A.';return;}
    sessionStorage.setItem(MAINT_AUTH_KEY,String(Date.now()+MAINT_AUTH_MS));
    setAuthorized(true);
    report.textContent='Maintenance unlocked for 15 minutes on this browser session. No passphrase was stored.';
  }catch(e){authMessage.textContent=e.message||'Unable to authenticate Maintenance.';}
  finally{unlockBtn.disabled=false;}
});
pass?.addEventListener('keydown',e=>{if(e.key==='Enter')unlockBtn?.click();});
lockBtn?.addEventListener('click',()=>{sessionStorage.removeItem(MAINT_AUTH_KEY);setAuthorized(false);authPanel.hidden=false;authMessage.textContent='Maintenance locked.';pass.focus();});

async function activeWorker(){
  if(!('serviceWorker' in navigator)) throw new Error('Service workers are unavailable in this browser.');
  let reg=await navigator.serviceWorker.getRegistration('../../');
  if(!reg) reg=await navigator.serviceWorker.register('../../sw.js',{scope:'../../'});
  try{await reg.update();}catch{}
  const ready=await navigator.serviceWorker.ready;
  return ready.active||reg.active||reg.waiting||reg.installing;
}
function swMessage(worker,payload,timeout=120000){return new Promise((resolve,reject)=>{const channel=new MessageChannel();const timer=setTimeout(()=>reject(new Error('Service-worker request timed out.')),timeout);channel.port1.onmessage=e=>{clearTimeout(timer);resolve(e.data||{});};worker.postMessage(payload,[channel.port2]);});}

$('prepareOfflineBtn')?.addEventListener('click',async()=>{
  if(!maintenanceAuthorized)return;
  report.textContent='Preparing TEE for offline use…';
  try{const worker=await activeWorker();const r=await swMessage(worker,{type:'TEE_PREPARE_OFFLINE'},180000);report.textContent=`Offline preparation complete.\nBuild: ${r.version||'unknown'}\nCached: ${r.cached||0}/${r.expected||0}\nFailures: ${(r.failed||[]).length}`;}catch(e){report.textContent='Offline preparation failed: '+e.message;}
});
$('checkVersionBtn')?.addEventListener('click',async()=>{
  if(!maintenanceAuthorized)return;
  try{const res=await fetch('../../version.json',{cache:'no-store'});const v=await res.json();report.textContent=`Local published version: ${v.version||'unknown'}\nName: ${v.name||''}\nNotes: ${v.notes||''}`;}catch(e){report.textContent='Version check failed: '+e.message;}
});
$('diagnosticsBtn')?.addEventListener('click',async()=>{
  if(!maintenanceAuthorized)return;
  const lines=[];const saved=savedVault();
  lines.push(`Origin: ${location.origin}`);
  lines.push(`Secure context: ${window.isSecureContext?'Yes':'No'}`);
  lines.push(`Vault present: ${saved?.id?'Yes':'No'}`);
  lines.push(`Vault architecture: ${saved?.architecture||'legacy / unknown'}`);
  lines.push(`Couple A auth present: ${Boolean(saved?.accessProfiles?.coupleA?.authentication||saved?.authentication)}`);
  lines.push(`Service worker supported: ${'serviceWorker' in navigator}`);
  lines.push(`LocalStorage keys: ${localStorage.length}`);
  try{const reg=await navigator.serviceWorker.getRegistration('../../');lines.push(`Service worker registered: ${Boolean(reg)}`);}catch{}
  report.textContent=lines.join('\n');
});
$('clearCacheBtn')?.addEventListener('click',async()=>{
  if(!maintenanceAuthorized)return;
  if(!confirm('Clear TEE APP-SHELL caches only?\n\nThis does not intentionally clear localStorage, encrypted vault records, expenses, notes or passphrases.'))return;
  try{const keys=await caches.keys();const targets=keys.filter(k=>k.startsWith('tee-'));await Promise.all(targets.map(k=>caches.delete(k)));report.textContent=`Cleared ${targets.length} TEE app cache${targets.length===1?'':'s'}. Local vault/data were not intentionally touched.`;}catch(e){report.textContent='Unable to clear app cache: '+e.message;}
});

setAuthorized(false);

configureMaintenanceEntry();
