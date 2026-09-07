"use strict";
(function(){
  if(window.TEEHubVaultIntakeV3511)return;
  const recordsButton=document.getElementById('hubVaultRecordsOpen');
  const sessionSummary=document.getElementById('hubVaultSessionSummary');
  const vaultToggle=document.getElementById('hubVaultToggle');
  const vaultFrame=document.getElementById('hubVaultFrame');
  if(!sessionSummary||!vaultFrame)return;

  const SCHEMA='tee-vault-intake-v1';
  let button=document.getElementById('hubVaultIntakeOpen');
  if(!button){
    button=document.createElement('button');
    button.id='hubVaultIntakeOpen';
    button.type='button';
    button.className='hub-primary-action';
    button.textContent='Import Vault Intake';
    if(recordsButton?.parentElement)recordsButton.parentElement.insertBefore(button,recordsButton.nextSibling);
    else sessionSummary.appendChild(button);
  }

  let dialog=null,fileInput=null,status=null,preview=null,importButton=null,currentPayload=null,currentPlan=null;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const human=s=>String(s||'record').replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]+/g,' ').replace(/^./,c=>c.toUpperCase());
  const copy=v=>JSON.parse(JSON.stringify(v));
  const nowIso=()=>new Date().toISOString();

  function activeVault(){
    const w=vaultFrame.contentWindow;
    if(!w||typeof w.getVaultState!=='function'||w.getVaultState()!=='unlocked')throw new Error('The Secure Vault is not currently unlocked inside TEE. Close this window, unlock the Vault once, then reopen Vault Intake.');
    if(typeof w.getActiveVaultData!=='function'||typeof w.persistActiveVaultData!=='function')throw new Error('TEE Vault persistence is not ready. Tap Refresh / Update and try again.');
    const raw=w.getActiveVaultData();
    const data=typeof w.normalizeVaultData==='function'?w.normalizeVaultData(raw).data:raw;
    if(!data||!Array.isArray(data.records))throw new Error('TEE could not read the active Vault records.');
    return {w,data};
  }

  function setStatus(message,kind='info'){
    if(!status)return;
    status.textContent=message;
    status.style.background=kind==='success'?'#eaf7ee':kind==='error'?'#fff0f0':'#eef5f7';
    status.style.borderColor=kind==='success'?'#6eaa82':kind==='error'?'#c67b7b':'#b9ccd3';
    status.style.color=kind==='error'?'#7b2020':'#24444d';
  }

  function validatePayload(value){
    if(!value||value.schema!==SCHEMA)throw new Error('This is not a TEE Vault Intake file.');
    if(!Array.isArray(value.candidates)||!value.candidates.length)throw new Error('The Vault Intake file contains no records.');
    if(value.candidates.length>50)throw new Error('This intake file is too large. TEE accepts up to 50 records at a time.');
    value.candidates.forEach((candidate,index)=>{
      if(!candidate||typeof candidate!=='object'||!candidate.type||!candidate.fields||typeof candidate.fields!=='object')throw new Error(`Record ${index+1} is incomplete.`);
    });
    return value;
  }

  function fallbackMatch(candidate,record){
    if(!candidate||!record||candidate.type!==record.type)return false;
    const a=candidate.fields||{},b=record.fields||{};
    const norm=v=>String(v??'').trim().toLowerCase().replace(/\s+/g,' ');
    const identifiers=['confirmationCode','ticketNumber','confirmationNumber','bookingReference','passNumber'];
    for(const key of identifiers){if(norm(a[key])&&norm(b[key])&&norm(a[key])===norm(b[key]))return true;}
    if(candidate.type==='flight'){
      const keys=['travelerName','flightNumber','departureDate','departureAirport','arrivalAirport'];
      return keys.every(k=>norm(a[k])&&norm(a[k])===norm(b[k]));
    }
    return false;
  }

  function matchRecord(w,candidate,record){
    try{if(typeof w.teeCandidateMatchesRecord==='function')return w.teeCandidateMatchesRecord(candidate,record);}catch{}
    return fallbackMatch(candidate,record);
  }

  function buildPlan(payload){
    const {w,data}=activeVault();
    const plan=payload.candidates.map(candidate=>{
      const matches=data.records.filter(record=>matchRecord(w,candidate,record));
      return {candidate,existing:matches.length===1?matches[0]:null,ambiguous:matches.length>1};
    });
    return {w,data,plan};
  }

  function publicSummary(candidate){
    const f=candidate.fields||{};
    const main=[f.airline,f.flightNumber,f.hotelName,f.operator,f.trainNumber,f.passType].filter(Boolean).join(' · ')||human(candidate.type);
    const route=[f.departureAirport||f.departureStation,f.arrivalAirport||f.arrivalStation].filter(Boolean).join(' → ');
    const date=f.departureDate||f.checkInDate||f.date||'';
    const traveler=f.travelerName||f.guestName||'';
    const protectedIncluded=[f.confirmationCode||f.confirmationNumber||f.bookingReference?'booking reference':'',f.ticketNumber?'ticket number':'',f.passNumber?'pass number':''].filter(Boolean);
    return {main,route,date,traveler,protectedIncluded};
  }

  function renderPreview(payload,planResult){
    currentPayload=payload;currentPlan=planResult;
    const adds=planResult.plan.filter(x=>!x.existing&&!x.ambiguous).length;
    const updates=planResult.plan.filter(x=>x.existing).length;
    const ambiguous=planResult.plan.filter(x=>x.ambiguous).length;
    preview.innerHTML=`<p style="margin:0 0 10px"><strong>${payload.candidates.length} record${payload.candidates.length===1?'':'s'} ready for review.</strong> ${adds} new · ${updates} matching existing${ambiguous?` · ${ambiguous} need manual review`:''}.</p>`+
      planResult.plan.map((item,i)=>{const s=publicSummary(item.candidate);return `<article style="border-top:1px solid #dfe7e8;padding:10px 0"><div style="display:flex;justify-content:space-between;gap:10px"><strong>${i+1}. ${esc(s.main)}</strong><span style="font-weight:800;color:${item.ambiguous?'#8a4b17':item.existing?'#2f6b4f':'#365f72'}">${item.ambiguous?'Review':item.existing?'Update':'New'}</span></div>${s.traveler?`<div>${esc(s.traveler)}</div>`:''}${s.route?`<div>${esc(s.route)}</div>`:''}${s.date?`<div>${esc(s.date)}</div>`:''}${s.protectedIncluded.length?`<small style="color:#67777d">Protected fields included: ${esc(s.protectedIncluded.join(', '))}. Values remain hidden in this preview.</small>`:''}</article>`;}).join('');
    importButton.disabled=ambiguous>0;
    setStatus(ambiguous?`Import paused: ${ambiguous} record${ambiguous===1?' has':'s have'} more than one possible match. Nothing has been saved.`:'Review the list, then tap Import / Save to Vault.');
  }

  async function chooseFile(file){
    try{
      if(!file)return;
      const parsed=validatePayload(JSON.parse(await file.text()));
      renderPreview(parsed,buildPlan(parsed));
    }catch(error){currentPayload=null;currentPlan=null;preview.innerHTML='';importButton.disabled=true;setStatus(error instanceof SyntaxError?'The selected file is not valid JSON.':(error?.message||'Unable to read this Vault Intake file.'),'error');}
  }

  function makeHistory(w,action,summary,timestamp){
    try{if(typeof w.createHistoryEntry==='function')return w.createHistoryEntry(action,summary,timestamp);}catch{}
    return {action,summary,timestamp};
  }

  function mergeCandidate(w,data,item){
    const candidate=item.candidate;
    const incoming=copy(candidate.fields||{});
    const now=nowIso();
    const enforcedScope=typeof w.getEnforcedAccessScopeForType==='function'?w.getEnforcedAccessScopeForType(candidate.type):null;
    const enforcedVisibility=typeof w.getEnforcedVisibilityClassForType==='function'?w.getEnforcedVisibilityClassForType(candidate.type):null;
    const scope=enforcedScope||(candidate.scope==='private'?'private':'shared');
    const visibility=enforcedVisibility||candidate.classification||(scope==='private'?'private':'shared');
    if(item.existing){
      const record=item.existing;
      record.fields={...(record.fields||{}),...incoming};
      record.accessScope=scope;
      record.visibilityClass=visibility;
      record.recordStatus='active';
      record.lastModifiedAt=now;
      record.recordVersion=(Number(record.recordVersion)||1)+1;
      record.history=Array.isArray(record.history)?record.history:[];
      record.history.push(makeHistory(w,'Vault intake updated','Protected record updated from reviewed local Vault Intake file',now));
      return 'updated';
    }
    const vaultId=typeof w.getVault==='function'?(w.getVault()?.id||''):'';
    const record={
      recordId:(globalThis.crypto?.randomUUID?.()||`tee-${Date.now()}-${Math.random().toString(36).slice(2)}`),
      type:candidate.type,
      fields:incoming,
      accessScope:scope,
      visibilityClass:visibility,
      recordStatus:'active',
      recordVersion:1,
      createdAt:now,
      lastModifiedAt:now,
      history:[makeHistory(w,'Vault intake added','Protected record added from reviewed local Vault Intake file',now)],
      tags:['Vault Intake']
    };
    if(vaultId)record.ownerVaultId=vaultId;
    data.records.push(record);
    return 'added';
  }

  async function importCurrent(){
    try{
      if(!currentPayload||!currentPlan)throw new Error('Choose and review a Vault Intake file first.');
      const fresh=buildPlan(currentPayload);
      const ambiguous=fresh.plan.filter(x=>x.ambiguous).length;
      if(ambiguous)throw new Error('Import stopped because a record now has more than one possible Vault match. Nothing was saved.');
      const adds=fresh.plan.filter(x=>!x.existing).length,updates=fresh.plan.filter(x=>x.existing).length;
      if(!window.confirm(`Import ${fresh.plan.length} reviewed Vault record${fresh.plan.length===1?'':'s'}?\n\n${adds} new · ${updates} update${updates===1?'':'s'}\n\nProtected identifiers will be encrypted in the local Secure Vault.`))return;
      let added=0,updated=0;
      fresh.plan.forEach(item=>{const result=mergeCandidate(fresh.w,fresh.data,item);if(result==='added')added++;else updated++;});
      await fresh.w.persistActiveVaultData();
      if(typeof fresh.w.publishAuthorizedSession==='function')fresh.w.publishAuthorizedSession();
      if(typeof fresh.w.renderRecords==='function')fresh.w.renderRecords();
      setStatus(`Vault intake complete: ${added} added, ${updated} updated. Verify the records in Vault Records before deleting the intake file.`,'success');
      currentPayload=null;currentPlan=null;importButton.disabled=true;
      preview.insertAdjacentHTML('beforeend','<p style="margin-top:12px;padding:10px;border-radius:10px;background:#eaf7ee"><strong>Next:</strong> Close this window, open Vault Records, and search the imported flight/train/hotel number to verify the traveler and protected fields.</p>');
    }catch(error){setStatus(error?.message||'Vault intake failed. No records were saved.','error');}
  }

  function ensureDialog(){
    if(dialog)return;
    dialog=document.createElement('dialog');
    dialog.id='hubVaultIntakeDialogV3511';
    dialog.style.cssText='width:min(96vw,720px);max-height:92vh;padding:0;border:0;border-radius:18px;overflow:auto;box-shadow:0 22px 70px rgba(0,0,0,.35);background:#fff;color:#17343b';
    dialog.innerHTML=`<div style="padding:18px"><div style="display:flex;justify-content:space-between;gap:12px"><div><h2 style="margin:0 0 4px">Vault Intake Import</h2><p style="margin:0;color:#607178">Small local-file importer for reviewed protected records. It does not upload the intake file anywhere.</p></div><button type="button" data-close style="border:0;background:#edf2f3;border-radius:10px;padding:10px 12px;font-weight:800">× Close</button></div>
      <section style="margin:16px 0;padding:14px;border:1px solid #d9e3e4;border-radius:14px"><strong>1. Choose intake file</strong><p style="margin:6px 0 12px;color:#607178">Use only a <code>.tee-vault-intake.json</code> file you intentionally received from ChatGPT or another trusted TEE preparation source.</p><button type="button" data-choose class="hub-primary-action" style="width:100%;padding:13px">Choose Vault Intake File</button><input data-file type="file" accept=".json,.tee-vault-intake.json,application/json" hidden></section>
      <section style="margin:12px 0;padding:14px;border:1px solid #d9e3e4;border-radius:14px"><strong>2. Review</strong><div data-preview style="margin-top:8px"><p style="color:#607178">No file selected.</p></div></section>
      <section style="margin:12px 0;padding:14px;border:1px solid #d9e3e4;border-radius:14px"><strong>3. Save</strong><p style="margin:6px 0 12px;color:#607178">TEE detects likely existing records and updates them instead of deliberately creating a duplicate. A final confirmation appears before anything is saved.</p><button type="button" data-import class="hub-primary-action" style="width:100%;padding:13px" disabled>Import / Save to Vault</button></section>
      <p data-status style="padding:11px 12px;border:1px solid #b9ccd3;border-radius:10px;background:#eef5f7" aria-live="polite">Choose a Vault Intake file to begin.</p>
      <p style="font-size:.9rem;color:#68787e"><strong>Privacy:</strong> the importer reads the selected file locally in this browser and writes approved values into the already-unlocked encrypted Vault. Intake-file contents are never embedded in the public TEE source.</p></div>`;
    document.body.appendChild(dialog);
    fileInput=dialog.querySelector('[data-file]');status=dialog.querySelector('[data-status]');preview=dialog.querySelector('[data-preview]');importButton=dialog.querySelector('[data-import]');
    dialog.querySelector('[data-close]')?.addEventListener('click',close);
    dialog.querySelector('[data-choose]')?.addEventListener('click',()=>fileInput?.click());
    fileInput?.addEventListener('change',()=>chooseFile(fileInput.files?.[0]));
    importButton?.addEventListener('click',importCurrent);
    dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
  }

  function open(){
    if(!window.TEEVaultSession?.isOpen?.()){vaultToggle?.click();return;}
    try{activeVault();}catch(error){alert(error.message);return;}
    ensureDialog();currentPayload=null;currentPlan=null;if(fileInput)fileInput.value='';if(preview)preview.innerHTML='<p style="color:#607178">No file selected.</p>';if(importButton)importButton.disabled=true;setStatus('Choose a Vault Intake file to begin.');
    if(dialog.showModal&&!dialog.open)dialog.showModal();else dialog.setAttribute('open','');
  }
  function close(){if(!dialog)return;if(dialog.close&&dialog.open)dialog.close();else dialog.removeAttribute('open');}

  button.addEventListener('click',open);
  button.hidden=!window.TEEVaultSession?.isOpen?.();
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{const opened=window.TEEVaultSession?.isOpen?.();button.hidden=!opened;if(!opened&&dialog?.open)close();});
  window.TEEHubVaultIntakeV3511={open};
})();