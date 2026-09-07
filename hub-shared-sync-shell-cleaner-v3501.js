"use strict";
(function(){
  if(window.TEEHubSharedSyncShellCleanerV3501)return;
  const frame=document.getElementById('hubVaultFrame');
  if(!frame)return;

  function genericEmergencyShell(record){
    if(record?.type!=='emergencyContact'||record?.recordStatus==='deleted'||!record?.recordId)return false;
    const directName=String(record?.contactName||'').trim();
    const fields=Array.isArray(record?.fields)?record.fields:[];
    const fieldName=String(fields.find(field=>field?.key==='contactName')?.value||'').trim();
    if(directName||fieldName)return false;
    const title=String(record?.title||record?.name||record?.label||record?.typeLabel||'').trim().toLowerCase();
    return !title||title==='emergency contact';
  }

  function sessionShellIds(){
    const session=window.TEEVaultSession?.get?.();
    const records=Array.isArray(session?.records)?session.records:[];
    return new Set(records.filter(genericEmergencyShell).map(record=>record.recordId));
  }

  async function removeShells(){
    const ids=sessionShellIds();
    if(!ids.size)return 0;
    const w=frame.contentWindow;
    if(!w||typeof w.getVaultState!=='function'||w.getVaultState()!=='unlocked')throw new Error('Unlock the Secure Vault first.');
    if(typeof w.getActiveVaultData!=='function')throw new Error('TEE could not read the active Vault.');
    const raw=w.getActiveVaultData();
    const data=typeof w.normalizeVaultData==='function'?w.normalizeVaultData(raw).data:raw;
    if(!data||!Array.isArray(data.records))throw new Error('TEE could not read Vault records.');
    const targets=data.records.filter(record=>ids.has(record?.recordId));
    if(!targets.length)throw new Error('TEE can see the generic Emergency Contact shells in Vault Records but could not match them to the active Vault. No records were changed.');
    if(!confirm(`Remove ${targets.length} generic Emergency Contact shell${targets.length===1?'':'s'} from this phone? Only the exact record IDs currently displayed as nameless Emergency Contact records will be removed.`))return -1;
    const targetIds=new Set(targets.map(record=>record.recordId));
    data.records=data.records.filter(record=>!targetIds.has(record?.recordId));
    if(typeof w.persistActiveVaultData!=='function')throw new Error('TEE cannot save the repair.');
    await w.persistActiveVaultData();
    if(typeof w.publishAuthorizedSession==='function')w.publishAuthorizedSession();
    if(typeof w.renderRecords==='function')w.renderRecords();
    return targets.length;
  }

  function attach(){
    const dialog=document.getElementById('hubSharedSyncDialogV3500')||document.getElementById('hubSharedSyncDialogV3496');
    if(!dialog||dialog.querySelector('[data-remove-empty-emergency-shells]'))return false;
    const receive=dialog.querySelector('[data-import]')?.closest('section');
    if(!receive)return false;
    const box=document.createElement('div');
    box.style.cssText='margin-top:12px;padding:12px;border:1px solid #e0c7a0;border-radius:10px;background:#fff8ec';
    box.innerHTML='<strong>Receiver repair</strong><p style="margin:5px 0 10px">Removes only Emergency Contact records that currently display no contact name and only a generic Emergency Contact title.</p><button type="button" data-remove-empty-emergency-shells style="width:100%;padding:11px;border:1px solid #b98b55;border-radius:9px;background:#fff;font-weight:800">Remove generic Emergency Contact shells</button><p data-shell-status style="margin:8px 0 0"></p>';
    receive.appendChild(box);
    const status=box.querySelector('[data-shell-status]');
    box.querySelector('[data-remove-empty-emergency-shells]')?.addEventListener('click',async()=>{
      try{
        const n=await removeShells();
        if(n>0)status.textContent=`Removed ${n} generic shell${n===1?'':'s'}. Check Vault Records before importing another Shared package.`;
        else if(n===0)status.textContent='No generic Emergency Contact shells were found in the authorized session.';
        else status.textContent='No changes made.';
      }catch(error){status.textContent=error?.message||'Unable to remove the generic Emergency Contact shells.';}
    });
    return true;
  }

  document.addEventListener('click',event=>{
    if(event.target?.closest?.('#hubSharedSyncOpen'))setTimeout(attach,100);
  });
  const observer=new MutationObserver(()=>{
    if(document.getElementById('hubSharedSyncDialogV3500')||document.getElementById('hubSharedSyncDialogV3496'))attach();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(attach,250);
  window.TEEHubSharedSyncShellCleanerV3501=Object.freeze({attach,removeShells,sessionShellIds,genericEmergencyShell});
})();
