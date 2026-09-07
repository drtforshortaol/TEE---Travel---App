"use strict";
(function(){
  if(window.TEEHubSharedSyncEmergencyFixV3499)return;
  const frame=document.getElementById('hubVaultFrame');
  if(!frame)return;

  function install(){
    try{
      const w=frame.contentWindow;
      if(!w||!w.TEESharedSyncV3490)return false;
      if(w.TEESharedSyncV3490.version==='3.4.99')return true;
      const base=w.TEESharedSyncV3490;
      const isUnlocked=()=>typeof w.getVaultState==='function'&&w.getVaultState()==='unlocked';
      const activeData=()=>typeof w.getActiveVaultData==='function'?w.getActiveVaultData():null;
      const normalize=()=>typeof w.normalizeVaultData==='function'?w.normalizeVaultData(activeData()).data:activeData();
      const timeValue=value=>{const n=Date.parse(value||'');return Number.isFinite(n)?n:0;};
      const cloneRecord=record=>{
        const copy=JSON.parse(JSON.stringify(record));
        copy.accessScope='shared';
        copy.visibilityClass=copy.visibilityClass==='public'?'public':'shared';
        return copy;
      };

      async function mergeShared(payload){
        if(!isUnlocked())throw new Error('Unlock the Secure Vault first.');
        const data=normalize();
        if(!data||!Array.isArray(data.records))throw new Error('TEE could not read the active Vault records.');
        let added=0,updated=0,unchanged=0,skipped=0,emergencyRepaired=0;
        const vaultId=typeof w.getVault==='function'?(w.getVault()?.id||''):'';
        for(const incomingRaw of payload?.records||[]){
          if(!incomingRaw?.recordId||incomingRaw.accessScope!=='shared'||incomingRaw.visibilityClass==='private'){skipped++;continue;}
          const incoming=cloneRecord(incomingRaw);
          if(vaultId)incoming.ownerVaultId=vaultId;
          const index=data.records.findIndex(r=>r?.recordId===incoming.recordId);
          if(index<0){data.records.push(incoming);added++;if(incoming.type==='emergencyContact')emergencyRepaired++;continue;}
          const existing=data.records[index];
          const sameTypeEmergency=incoming.type==='emergencyContact'&&existing?.type==='emergencyContact';
          if((existing?.accessScope==='private'||existing?.visibilityClass==='private')&&!sameTypeEmergency){skipped++;continue;}
          const same=JSON.stringify(existing)===JSON.stringify(incoming);
          if(same){unchanged++;continue;}

          // Glenn's iPhone is the designated master for trip emergency contacts.
          // For the same emergency-contact recordId, replace generic/older receiver shells
          // regardless of receiver timestamp or legacy Private labeling. Other record types
          // retain the original newer-record merge rule.
          if(sameTypeEmergency){
            data.records[index]=incoming;
            updated++;
            emergencyRepaired++;
            continue;
          }

          const incomingTime=timeValue(incoming.lastModifiedAt||incoming.updatedAt||incoming.createdAt);
          const existingTime=timeValue(existing?.lastModifiedAt||existing?.updatedAt||existing?.createdAt);
          if(incomingTime>=existingTime){data.records[index]=incoming;updated++;}
          else unchanged++;
        }
        if(added||updated){
          if(typeof w.persistActiveVaultData!=='function')throw new Error('TEE Shared Records persistence is unavailable.');
          await w.persistActiveVaultData();
          if(typeof w.publishAuthorizedSession==='function')w.publishAuthorizedSession();
          if(typeof w.renderRecords==='function')w.renderRecords();
          if(typeof w.renderDocuments==='function')w.renderDocuments();
          try{w.document.dispatchEvent(new w.CustomEvent('tee-shared-sync-complete',{detail:{added,updated,unchanged,skipped,emergencyRepaired}}));}catch{}
        }
        return {added,updated,unchanged,skipped,emergencyRepaired};
      }

      w.TEESharedSyncV3490=Object.freeze({...base,version:'3.4.99',mergeShared});
      return true;
    }catch{return false;}
  }

  function installSoon(){
    if(install())return;
    [150,400,900,1600].forEach(ms=>setTimeout(install,ms));
  }
  frame.addEventListener('load',installSoon);
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',installSoon);
  installSoon();
  window.TEEHubSharedSyncEmergencyFixV3499=Object.freeze({install});
})();
