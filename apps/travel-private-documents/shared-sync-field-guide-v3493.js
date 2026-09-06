"use strict";
(function(){
  if(window.TEESharedSyncFieldGuideV3493)return;
  const GUIDE_ID='teeSharedSyncFieldGuideV3493';
  function install(){
    const dialog=document.getElementById('teeSharedSyncDialogV3490');
    if(!dialog||dialog.querySelector('#'+GUIDE_ID))return false;
    const host=dialog.querySelector('div');
    if(!host)return false;
    const guide=document.createElement('details');
    guide.id=GUIDE_ID;
    guide.open=true;
    guide.style.cssText='border:2px solid #b7c9cf;border-radius:14px;padding:12px 14px;margin:12px 0;background:#fbfcfc';
    guide.innerHTML=`<summary style="font-weight:900;font-size:17px;cursor:pointer">How to sync in the field — SEND / RECEIVE</summary><div style="margin-top:10px;line-height:1.5"><div style="margin:0 0 12px;padding:10px 12px;border-radius:10px;background:#fff7df"><strong>Trip rule: Glenn’s iPhone is the master Shared source.</strong><br><span>Normally make Shared changes on Glenn’s phone first. The other traveler phones receive.</span></div><p style="margin:0 0 6px"><strong>GLENN’S MASTER IPHONE — SEND</strong></p><ol style="margin:0 0 14px;padding-left:22px"><li>Open TEE Hub and unlock the Secure Vault.</li><li>Tap <strong>Sync Shared Records</strong>.</li><li>Tap <strong>Create / Share Shared Records</strong>.</li><li>Choose <strong>AirDrop</strong> and select the receiving iPhone.</li><li>Keep the sync code shown here and give it separately.</li></ol><p style="margin:0 0 6px"><strong>OTHER TRAVELER IPHONE — RECEIVE</strong></p><ol style="margin:0 0 14px;padding-left:22px"><li>Accept the AirDrop; save the file in <strong>Files</strong> if asked.</li><li>Open TEE Hub and unlock the Secure Vault.</li><li>Tap <strong>Sync Shared Records</strong>.</li><li>Tap <strong>Choose Shared Records File</strong>.</li><li>Select the AirDropped TEE Shared Records file from <strong>Files</strong>.</li><li>Enter the sync code from Glenn’s phone.</li><li>Confirm the sync-complete counts.</li><li>Verify the needed Shared records in Vault Records or Quick Reference.</li></ol><p style="margin:0"><strong>Important:</strong> Do not upload the Shared file to GitHub. AirDrop is preferred when together.</p></div>`;
    const count=dialog.querySelector('[data-count]');
    if(count&&count.parentElement===host)host.insertBefore(guide,count);else host.insertBefore(guide,host.children[1]||null);
    return true;
  }
  let tries=0;
  const timer=setInterval(()=>{tries++;if(install()||tries>80)clearInterval(timer);},125);
  const observer=new MutationObserver(()=>install());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('message',event=>{if(event.origin===location.origin&&event.data?.type==='TEE_OPEN_SHARED_SYNC')setTimeout(install,50);});
  window.TEESharedSyncFieldGuideV3493=Object.freeze({install});
})();
