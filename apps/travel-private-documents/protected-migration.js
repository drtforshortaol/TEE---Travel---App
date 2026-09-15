"use strict";
(function(){
  const enc = new TextEncoder(), dec = new TextDecoder();
  const b64 = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
  async function derive(code,salt,iterations){
    const keyMaterial=await crypto.subtle.importKey('raw',enc.encode(code),'PBKDF2',false,['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(salt),iterations,hash:'SHA-256'},keyMaterial,{name:'AES-GCM',length:256},false,['decrypt']);
  }
  async function loadProtectedMigration(file,code){
    const pkg=JSON.parse(await file.text());
    if(pkg?.format!=='TEE-PROTECTED-MIGRATION-1') throw new Error('Not a TEE protected migration package.');
    const key=await derive(code,pkg.salt,pkg.iterations||310000);
    let plain;
    try { plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64(pkg.iv)},key,b64(pkg.ciphertext)); }
    catch { throw new Error('Migration code is incorrect or the package is damaged.'); }
    const payload=JSON.parse(dec.decode(plain));
    if(payload?.format!=='TEE-PROTECTED-DATA-1') throw new Error('Protected data payload is invalid.');
    setTeeProtectedImportData(payload);
    return payload;
  }
  function boot(){
    const file=document.getElementById('protectedMigrationFile');
    const code=document.getElementById('protectedMigrationCode');
    const button=document.getElementById('loadProtectedMigration');
    const msg=document.getElementById('protectedMigrationMessage');
    if(!file||!code||!button) return;
    button.addEventListener('click',async()=>{
      if(!file.files?.[0]||!code.value.trim()){msg.textContent='Choose the protected migration file and enter its matching private migration code.';return;}
      button.disabled=true; msg.textContent='Decrypting locally…';
      try{const p=await loadProtectedMigration(file.files[0],code.value.trim()); msg.textContent=`Loaded ${p.candidates?.length||0} protected records into the import wizard. Nothing has left this device.`; code.value='';}
      catch(e){msg.textContent=e.message||String(e);} finally{button.disabled=false;}
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();

  // Operational correction: TK1208 on 2026-10-06 now operates ZRH 15:00 → IST 18:55.
  // This repair intentionally changes only the schedule fields/notes and preserves each
  // traveler's PNR, ticket number, seat and other booking-specific details.
  let tk1208RepairRunning=false;
  let tk1208RepairComplete=false;
  const clean=v=>String(v??'').trim();
  async function repairTk1208(){
    if(tk1208RepairRunning||tk1208RepairComplete)return;
    if(typeof getVaultState!=='function'||getVaultState()!=='unlocked')return;
    if(typeof getActiveVaultData!=='function'||typeof persistActiveVaultData!=='function')return;
    tk1208RepairRunning=true;
    try{
      const raw=getActiveVaultData();
      const data=typeof normalizeVaultData==='function'?normalizeVaultData(raw).data:raw;
      if(!data||!Array.isArray(data.records))return;
      let matched=0, changed=0;
      const now=new Date().toISOString();
      for(const record of data.records){
        if(record?.type!=='flight')continue;
        const fields=record.fields&&typeof record.fields==='object'?record.fields:(record.fields={});
        if(clean(fields.flightNumber).replace(/\s+/g,'').toUpperCase()!=='TK1208')continue;
        if(clean(fields.departureDate)!=='2026-10-06')continue;
        matched++;
        let recordChanged=false;
        if(clean(fields.departureTime)!=='15:00'){fields.departureTime='15:00';recordChanged=true;}
        const originalNotes=clean(fields.notes);
        let notes=originalNotes
          .replace(/Arrives Istanbul at 17:35 local time\.?/gi,'Arrives Istanbul at 18:55 local time.')
          .replace(/Arrival 17:35\.?/gi,'Arrival 18:55.')
          .replace(/13:35\s*(?:→|->|to)\s*17:35/gi,'15:00 → 18:55');
        if(!/18:55/.test(notes))notes=`${notes}${notes?'\n':''}Current operational schedule: ZRH 15:00 → IST 18:55 on Oct 6, 2026. This supersedes the earlier 13:35 → 17:35 schedule.`;
        if(notes!==originalNotes){fields.notes=notes;recordChanged=true;}
        if(recordChanged){
          record.lastModifiedAt=now;
          record.recordVersion=(Number(record.recordVersion)||1)+1;
          record.history=Array.isArray(record.history)?record.history:[];
          if(typeof createHistoryEntry==='function')record.history.push(createHistoryEntry('Schedule corrected','TK1208 corrected to ZRH 15:00 → IST 18:55; booking identifiers preserved.',now));
          changed++;
        }
      }
      if(changed){
        await persistActiveVaultData();
        try{if(typeof publishAuthorizedSession==='function')publishAuthorizedSession({preserveExpiry:true});}catch{}
        try{if(typeof renderRecords==='function')renderRecords();}catch{}
        try{if(typeof renderDocuments==='function')renderDocuments();}catch{}
        try{if(typeof setSecureMessage==='function')setSecureMessage(`TK1208 schedule corrected in ${changed} traveler record${changed===1?'':'s'} to 15:00 → 18:55.`, 'success');}catch{}
      }
      if(matched>0)tk1208RepairComplete=true;
    }catch(error){
      console.error('TEE TK1208 schedule repair failed',error);
    }finally{tk1208RepairRunning=false;}
  }
  function scheduleTk1208Repair(){setTimeout(repairTk1208,120);setTimeout(repairTk1208,700);setTimeout(repairTk1208,1800);}
  window.addEventListener('tee-vault-session-changed',scheduleTk1208Repair);
  window.addEventListener('pageshow',scheduleTk1208Repair);
  document.addEventListener('tee-runtime-ready',scheduleTk1208Repair);
  document.addEventListener('DOMContentLoaded',scheduleTk1208Repair);
  // Unlock does not reliably emit the parent-session event inside the Vault iframe.
  // Poll briefly until the local encrypted vault actually becomes unlocked, then repair once.
  const tk1208UnlockWatcher=setInterval(()=>{
    if(tk1208RepairComplete){clearInterval(tk1208UnlockWatcher);return;}
    repairTk1208();
  },750);
  setTimeout(()=>{if(!tk1208RepairComplete)repairTk1208();},5000);
  scheduleTk1208Repair();
})();
