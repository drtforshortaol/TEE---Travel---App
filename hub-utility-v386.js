"use strict";

// TEE v3.3.86 — Hub utility controls.
// Kept separate from the stable Hub logic so Install / Refresh / Help can be revised safely.

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
const TEE_PUBLIC_INSTALL_URL='https://drtforshortaol.github.io/TEE---Travel---App/';

function teeIsStandalone(){
  return window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone === true;
}
function teeInstallMessage(){
  return `TEE Hub — Turkey / Eastern Europe Trip

Open this link on your phone:
${TEE_PUBLIC_INSTALL_URL}

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
  if(!installTeeStatus) return;
  if(teeIsStandalone()){
    installTeeStatus.hidden=false;
    installTeeStatus.textContent='TEE is already running from the Home Screen on this device. You can still copy these instructions to install TEE on another device.';
  }else{
    installTeeStatus.hidden=true;
    installTeeStatus.textContent='';
  }
}
function openDialog(dialog){
  if(dialog?.showModal) dialog.showModal();
  else dialog?.setAttribute('open','');
}
function closeDialog(dialog){
  if(dialog?.close) dialog.close();
  else dialog?.removeAttribute('open');
}
function openInstallTee(){
  fillInstallShare();
  updateNativeInstallUi();
  openDialog(installTeeDialog);
}

installTeeButton?.addEventListener('click',openInstallTee);
installTeeClose?.addEventListener('click',()=>closeDialog(installTeeDialog));
installTeeDone?.addEventListener('click',()=>closeDialog(installTeeDialog));
installTeeDialog?.addEventListener('click',event=>{
  if(event.target===installTeeDialog) closeDialog(installTeeDialog);
});

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

helpTeeButton?.addEventListener('click',()=>openDialog(helpTeeDialog));
helpTeeClose?.addEventListener('click',()=>closeDialog(helpTeeDialog));
helpTeeDone?.addEventListener('click',()=>closeDialog(helpTeeDialog));
helpTeeDialog?.addEventListener('click',event=>{
  if(event.target===helpTeeDialog) closeDialog(helpTeeDialog);
});

refreshTeeButton?.addEventListener('click',async()=>{
  const original=refreshTeeButton.textContent;
  refreshTeeButton.disabled=true;
  refreshTeeButton.textContent='Updating…';
  try{
    if('caches' in window){
      const names=await caches.keys();
      await Promise.all(names.filter(name=>name.startsWith('tee-')).map(name=>caches.delete(name)));
    }
    const registrations=await navigator.serviceWorker?.getRegistrations?.() || [];
    await Promise.all(registrations.map(reg=>reg.update().catch(()=>{})));
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
  if(!teeDeferredInstallPrompt) return;
  teeDeferredInstallPrompt.prompt();
  try{ await teeDeferredInstallPrompt.userChoice; }catch{}
  teeDeferredInstallPrompt=null;
  updateNativeInstallUi();
});
window.addEventListener('appinstalled',()=>{
  teeDeferredInstallPrompt=null;
  updateNativeInstallUi();
});

updateNativeInstallUi();
