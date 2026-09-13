"use strict";
(function(){
  if(window.TEEHubSharedSyncEmergencyFixV3499)return;
  const frame=document.getElementById('hubVaultFrame');
  if(!frame)return;

  function install(){
    try{
      const w=frame.contentWindow;
      if(!w||!w.TEESharedSyncV3490)return false;
      if(w.TEESharedSyncV3490.version==='3.5.36')return true;
      const base=w.TEESharedSyncV3490;
      const isUnlocked=()=>typeof w.getVaultState==='function'&&w.getVaultState()==='unlocked';
      const activeData=()=>typeof w.getActiveVaultData==='function'?w.getActiveVaultData():null;
      const normalize=()=>typeof w.normalizeVaultData==='function'?w.normalizeVaultData(activeData()).data:activeData();
      const timeValue=value=>{const n=Date.parse(value||'');return Number.isFinite(n)?n:0;};
      const text=value=>String(value??'').trim();
      const compact=value=>text(value).toUpperCase().replace(/[^A-Z0-9]/g,'');
      const dateOnly=value=>text(value).slice(0,10);
      const recordFields=record=>record?.fields&&typeof record.fields==='object'&&!Array.isArray(record.fields)?record.fields:{};
      const cloneRecord=record=>{
        const copy=JSON.parse(JSON.stringify(record));
        copy.accessScope='shared';
        copy.visibilityClass=copy.visibilityClass==='public'?'public':'shared';
        return copy;
      };

      function airportKey(value){
        const raw=text(value).toUpperCase();
        const paren=raw.match(/\(([A-Z]{3})\)/);
        if(paren)return paren[1];
        if(/^[A-Z]{3}$/.test(raw))return raw;
        const code=raw.match(/\b([A-Z]{3})\b/);
        return code?code[1]:compact(raw);
      }

      function travelerKey(value){
        const raw=text(value).toLowerCase();
        if(!raw)return '';
        const multi=raw.split(/\s*(?:\/|&|\band\b)\s*/i).map(part=>part.trim()).filter(Boolean);
        if(multi.length>1){
          return 'group:'+multi.map(part=>{
            const words=part.replace(/[^a-z0-9\s'-]/g,' ').split(/\s+/).filter(Boolean);
            if(!words.length)return '';
            const first=words[0].replace(/[^a-z0-9]/g,'').slice(0,5);
            const last=(words.length>1?words[words.length-1]:'').replace(/[^a-z0-9]/g,'');
            return `${first}|${last}`;
          }).filter(Boolean).sort().join('+');
        }
        const words=raw.replace(/[^a-z0-9\s'-]/g,' ').split(/\s+/).filter(Boolean);
        if(!words.length)return '';
        const first=words[0].replace(/[^a-z0-9]/g,'').slice(0,5);
        const last=(words.length>1?words[words.length-1]:'').replace(/[^a-z0-9]/g,'');
        return `person:${first}|${last}`;
      }

      function flightIdentity(record){
        if(record?.type!=='flight'||record?.recordStatus==='deleted')return null;
        const f=recordFields(record);
        const flight=compact(f.flightNumber);
        const date=dateOnly(f.departureDate);
        if(!flight||!date)return null;
        return {
          flight,
          date,
          pnr:compact(f.confirmationCode),
          traveler:travelerKey(f.travelerName),
          from:airportKey(f.departureAirport),
          to:airportKey(f.arrivalAirport)
        };
      }

      function sameOperationalFlight(a,b){
        const x=flightIdentity(a),y=flightIdentity(b);
        if(!x||!y||x.flight!==y.flight||x.date!==y.date)return false;
        if(x.pnr&&y.pnr&&x.pnr!==y.pnr)return false;
        if(x.from&&y.from&&x.from!==y.from)return false;
        if(x.to&&y.to&&x.to!==y.to)return false;
        if(x.traveler&&y.traveler&&x.traveler!==y.traveler)return false;
        if((!x.traveler||!y.traveler)&&!(x.pnr&&y.pnr&&x.from&&x.to&&y.from&&y.to))return false;
        return true;
      }

      function equivalentFlightIndex(records,incoming){
        if(incoming?.type!=='flight')return -1;
        const matches=[];
        for(let i=0;i<records.length;i++){
          const candidate=records[i];
          if(candidate?.accessScope==='private'||candidate?.visibilityClass==='private')continue;
          if(sameOperationalFlight(candidate,incoming))matches.push(i);
        }
        if(matches.length===1)return matches[0];
        const exact=matches.find(i=>records[i]?.recordId===incoming.recordId);
        return exact===undefined?-1:exact;
      }

      async function mergeShared(payload){
        if(!isUnlocked())throw new Error('Unlock the Secure Vault first.');
        const data=normalize();
        if(!data||!Array.isArray(data.records))throw new Error('TEE could not read the active Vault records.');
        let added=0,updated=0,unchanged=0,skipped=0,emergencyRepaired=0,reconciled=0;
        const vaultId=typeof w.getVault==='function'?(w.getVault()?.id||''):'';
        for(const incomingRaw of payload?.records||[]){
          if(!incomingRaw?.recordId||incomingRaw.accessScope!=='shared'||incomingRaw.visibilityClass==='private'){skipped++;continue;}
          const incoming=cloneRecord(incomingRaw);
          if(vaultId)incoming.ownerVaultId=vaultId;
          let index=data.records.findIndex(r=>r?.recordId===incoming.recordId);
          let matchedOperationally=false;
          if(index<0&&incoming.type==='flight'){
            index=equivalentFlightIndex(data.records,incoming);
            matchedOperationally=index>=0;
          }
          if(index<0){data.records.push(incoming);added++;if(incoming.type==='emergencyContact')emergencyRepaired++;continue;}
          const existing=data.records[index];
          const sameTypeEmergency=incoming.type==='emergencyContact'&&existing?.type==='emergencyContact';
          if((existing?.accessScope==='private'||existing?.visibilityClass==='private')&&!sameTypeEmergency){skipped++;continue;}
          const same=JSON.stringify(existing)===JSON.stringify(incoming);
          if(same){unchanged++;continue;}

          if(matchedOperationally){
            data.records[index]=incoming;
            updated++;
            reconciled++;
            continue;
          }

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
          try{w.document.dispatchEvent(new w.CustomEvent('tee-shared-sync-complete',{detail:{added,updated,unchanged,skipped,emergencyRepaired,reconciled}}));}catch{}
        }
        return {added,updated,unchanged,skipped,emergencyRepaired,reconciled};
      }

      w.TEESharedSyncV3490=Object.freeze({...base,version:'3.5.36',mergeShared,sameOperationalFlight});
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
