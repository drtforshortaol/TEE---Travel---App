"use strict";
(function(){
  if(window.TEEHubSharedSyncShellCleanerV3501)return;
  const frame=document.getElementById('hubVaultFrame');
  if(!frame)return;

  const valueOf=(record,key)=>{
    const direct=record?.[key];
    if(direct!=null&&String(direct).trim())return String(direct).trim();
    if(Array.isArray(record?.fields)){
      const f=record.fields.find(x=>x?.key===key||x?.label?.toLowerCase()===key.toLowerCase());
      if(f?.value!=null&&String(f.value).trim())return String(f.value).trim();
    }else if(record?.fields&&typeof record.fields==='object'){
      const v=record.fields[key];
      if(v!=null&&String(v).trim())return String(v).trim();
    }
    return '';
  };
  const isEmptyEmergencyShell=record=>{
    if(record?.type!=='emergencyContact'||record?.recordStatus==='deleted')return false;
    const title=String(record?.title||record?.name||record?.label||'').trim().toLowerCase();
    if(title&&title!=='emergency contact')return false;
    const keys=['contactName','relationship','mobilePhone','alternatePhone','email','homeAddress','preferredLanguage','notes'];
    return keys.every(key=>!valueOf(record,key));
  };

  async function removeShells(){
    const w=frame.contentWindow;
    if(!w||typeof w.getVaultState!=='function'||w.getVaultState()!=='unlocked')throw new Error('Unlock the Secure Vault first.');
    if(typeof w.getActiveVaultData!=='function')throw new Error('TEE could not read the active Vault.');
    const raw=w.getActiveVaultData();
    const data=typeof w.normalizeVaultData==='function'?w.normalizeVaultData(raw).data:raw;
    if(!data||!Array.isArray(data.records))throw new Error('TEE could not read Vault records.');
    const shells=data.records.filter(isEmptyEmergencyShell);
    if(!shells.length)return 0;
    if(!confirm(`Remove ${shells.length} empty Emergency Contact shell${shells.length===1?'':'s'} from this phone? Complete named contacts will not be removed.`))return -1;
    const shellIds=new Set(shells.map(r=>r.recordId).filter(Boolean));
    data.records=data.records.filter(r=>!(isEmptyEmergencyShell(r)&&(!r.recordId||shellIds.has(r.recordId))));
    if(typeof w.persistActiveVaultData!=='function')throw new Error('TEE cannot save the repair.');
    await w.persistActiveVaultData();
    if(typeof w.publishAuthorizedSession==='function')w.publishAuthorizedSession();
    if(typeof w.renderRecords==='function')w.renderRecords();
    return shells.length;
  }

  function attach(){
    const dialog=document.getElementById('hubSharedSyncDialogV3500')||document.getElementById('hubSharedSyncDialogV3496');
    if(!dialog||dialog.querySelector('[data-remove-empty-emergency-shells]'))return false;
    const receive=dialog.querySelector('[data-import]')?.closest('section');
    if(!receive)return false;
    const box=document.createElement('div');
    box.style.cssText='margin-top:12px;padding:12px;border:1px solid #e0c7a0;border-radius:10px;background:#fff8ec';
    box.innerHTML='<strong>Receiver repair</strong><p style="margin:5px 0 10px">Use only when this phone shows generic Emergency Contact shells with no names or details.</p><button type="button" data-remove-empty-emergency-shells style="width:100%;padding:11px;border:1px solid #b98b55;border-radius:9px;background:#fff;font-weight:800">Remove empty Emergency Contact shells</button><p data-shell-status style="margin:8px 0 0"></p>';
    receive.appendChild(box);
    const status=box.querySelector('[data-shell-status]');
    box.querySelector('[data-remove-empty-emergency-shells]')?.addEventListener('click',async()=>{
      try{
        const n=await removeShells();
        if(n>0)status.textContent=`Removed ${n} empty shell${n===1?'':'s'}. Now import a fresh Shared Records package from Glenn's master phone.`;
        else if(n===0)status.textContent='No empty Emergency Contact shells were found.';
        else status.textContent='No changes made.';
      }catch(error){status.textContent=error?.message||'Unable to remove the empty shells.';}
    });
    return true;
  }

  // Shared Sync button is injected after page load, so use delegated events rather than
  // requiring it to exist when this script first runs.
  document.addEventListener('click',event=>{
    if(event.target?.closest?.('#hubSharedSyncOpen'))setTimeout(attach,100);
  });
  const observer=new MutationObserver(()=>{
    if(document.getElementById('hubSharedSyncDialogV3500')||document.getElementById('hubSharedSyncDialogV3496'))attach();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(attach,250);
  window.TEEHubSharedSyncShellCleanerV3501=Object.freeze({attach,removeShells,isEmptyEmergencyShell});
})();
