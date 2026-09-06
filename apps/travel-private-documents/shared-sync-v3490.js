"use strict";
(function(){
  if(window.TEESharedSyncV3490)return;

  const FORMAT='TEE_SHARED_SYNC';
  const VERSION=1;
  let lastFile=null;
  let lastCode='';
  let dialog=null;
  let status=null;
  let countLabel=null;
  let codeRow=null;
  let codeInput=null;
  let importInput=null;

  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const isUnlocked=()=>typeof getVaultState==='function'&&getVaultState()==='unlocked';
  const activeData=()=>typeof getActiveVaultData==='function'?getActiveVaultData():null;
  const normalize=()=>typeof normalizeVaultData==='function'?normalizeVaultData(activeData()).data:activeData();

  function sharedRecords(){
    if(!isUnlocked())return [];
    const data=normalize();
    const rows=Array.isArray(data?.records)?data.records:[];
    return rows.filter(r=>r&&r.accessScope==='shared'&&r.visibilityClass!=='private'&&r.recordStatus!=='deleted');
  }

  function setStatus(message,kind='info'){
    ensureUi();
    if(!status)return;
    status.textContent=message;
    status.dataset.kind=kind;
    status.style.background=kind==='success'?'#eaf7ee':kind==='error'?'#fff0f0':'#eef5f7';
    status.style.borderColor=kind==='success'?'#6eaa82':kind==='error'?'#c67b7b':'#b9ccd3';
    status.style.color=kind==='error'?'#7b2020':'#24444d';
  }

  function updateCount(){
    ensureUi();
    if(!countLabel)return;
    if(!isUnlocked()){
      countLabel.textContent='Unlock the Secure Vault first.';
      return;
    }
    const n=sharedRecords().length;
    countLabel.textContent=`${n} Shared record${n===1?'':'s'} available to synchronize. Private couple records are excluded.`;
  }

  function randomCode(){
    const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const bytes=new Uint8Array(16);
    crypto.getRandomValues(bytes);
    let raw='';
    for(const b of bytes)raw+=alphabet[b%alphabet.length];
    return raw.match(/.{1,4}/g).join('-');
  }
  const normalizedCode=code=>String(code||'').toUpperCase().replace(/[^A-Z0-9]/g,'');

  function cloneRecord(record){
    const copy=JSON.parse(JSON.stringify(record));
    copy.accessScope='shared';
    copy.visibilityClass=copy.visibilityClass==='public'?'public':'shared';
    return copy;
  }

  async function buildPackage(code){
    const records=sharedRecords().map(cloneRecord);
    if(!records.length)throw new Error('There are no Shared records to synchronize.');
    const payload={format:FORMAT,version:VERSION,createdAt:new Date().toISOString(),sourceVaultId:typeof getVault==='function'?(getVault()?.id||''):'',records};
    const salt=generateSalt();
    const key=await deriveEncryptionKey(normalizedCode(code),salt);
    const encrypted=await encryptData(payload,key);
    return {format:FORMAT,version:VERSION,createdAt:payload.createdAt,recordCount:records.length,salt:bytesToBase64(salt),encrypted};
  }

  function makeFile(pkg){
    const day=new Date().toISOString().slice(0,10);
    return new File([JSON.stringify(pkg,null,2)],`TEE-Shared-Records-${day}.tee-shared.json`,{type:'application/json'});
  }

  async function shareOrDownload(file){
    if(navigator.share&&navigator.canShare?.({files:[file]})){
      try{
        await navigator.share({title:'TEE Shared Records',text:'Encrypted TEE Shared Records sync file. Send the sync code separately.',files:[file]});
        return 'shared';
      }catch(error){
        if(error?.name==='AbortError')return 'cancelled';
      }
    }
    const url=URL.createObjectURL(file);
    const a=document.createElement('a');
    a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    return 'downloaded';
  }

  async function exportShared(){
    try{
      if(!isUnlocked())throw new Error('Unlock the Secure Vault first.');
      lastCode=randomCode();
      const pkg=await buildPackage(lastCode);
      lastFile=makeFile(pkg);
      codeInput.value=lastCode;
      codeRow.hidden=false;
      setStatus(`Encrypted Shared Records file created with ${pkg.recordCount} record${pkg.recordCount===1?'':'s'}. Keep the sync code separate from the file.`,'success');
      const result=await shareOrDownload(lastFile);
      if(result==='shared')setStatus(`Shared Records file sent/shared. Give the receiving traveler the sync code shown below.`,'success');
      else if(result==='downloaded')setStatus(`Shared Records file downloaded. Send that file to the receiving phone and give them the sync code below.`,'success');
      else setStatus(`Shared Records file is ready. Tap “Share file again” when ready.`,'info');
    }catch(error){setStatus(error?.message||'Unable to create Shared Records file.','error');}
  }

  async function decryptPackage(parsed,code){
    if(parsed?.format!==FORMAT||Number(parsed?.version)!==VERSION||!parsed?.salt||!parsed?.encrypted)throw new Error('This is not a valid TEE Shared Records file.');
    const key=await deriveEncryptionKey(normalizedCode(code),base64ToBytes(parsed.salt));
    const payload=await decryptData(parsed.encrypted,key);
    if(payload?.format!==FORMAT||Number(payload?.version)!==VERSION||!Array.isArray(payload?.records))throw new Error('The Shared Records package is invalid.');
    if(payload.records.some(r=>r?.accessScope!=='shared'||r?.visibilityClass==='private'))throw new Error('The package contains a non-Shared record and was rejected.');
    return payload;
  }

  function timeValue(value){const n=Date.parse(value||'');return Number.isFinite(n)?n:0;}

  async function mergeShared(payload){
    if(!isUnlocked())throw new Error('Unlock the Secure Vault first.');
    const data=normalize();
    if(!data||!Array.isArray(data.records))throw new Error('TEE could not read the active Vault records.');
    let added=0,updated=0,unchanged=0,skipped=0;
    const vaultId=typeof getVault==='function'?(getVault()?.id||''):'';
    for(const incomingRaw of payload.records){
      if(!incomingRaw?.recordId||incomingRaw.accessScope!=='shared'||incomingRaw.visibilityClass==='private'){skipped++;continue;}
      const incoming=cloneRecord(incomingRaw);
      if(vaultId)incoming.ownerVaultId=vaultId;
      const index=data.records.findIndex(r=>r?.recordId===incoming.recordId);
      if(index<0){data.records.push(incoming);added++;continue;}
      const existing=data.records[index];
      if(existing?.accessScope==='private'||existing?.visibilityClass==='private'){skipped++;continue;}
      const incomingTime=timeValue(incoming.lastModifiedAt||incoming.updatedAt||incoming.createdAt);
      const existingTime=timeValue(existing.lastModifiedAt||existing.updatedAt||existing.createdAt);
      const same=JSON.stringify(existing)===JSON.stringify(incoming);
      if(same){unchanged++;continue;}
      if(incomingTime>=existingTime){data.records[index]=incoming;updated++;}
      else unchanged++;
    }
    if(added||updated){
      if(typeof persistActiveVaultData!=='function')throw new Error('TEE Shared Records persistence is unavailable.');
      await persistActiveVaultData();
      if(typeof publishAuthorizedSession==='function')publishAuthorizedSession();
      if(typeof renderRecords==='function')renderRecords();
      if(typeof renderDocuments==='function')renderDocuments();
      document.dispatchEvent(new CustomEvent('tee-shared-sync-complete',{detail:{added,updated,unchanged,skipped}}));
    }
    return {added,updated,unchanged,skipped};
  }

  async function importFile(file){
    try{
      if(!file)return;
      if(!isUnlocked())throw new Error('Unlock the Secure Vault first.');
      const code=prompt('Enter the Shared Records sync code from the sending phone.');
      if(code===null)return;
      if(normalizedCode(code).length<8)throw new Error('The sync code is incomplete.');
      const parsed=JSON.parse(await file.text());
      const payload=await decryptPackage(parsed,code);
      const result=await mergeShared(payload);
      setStatus(`Sync complete: ${result.added} added, ${result.updated} updated, ${result.unchanged} unchanged${result.skipped?`, ${result.skipped} skipped`:''}. Private couple records were not replaced.`,'success');
      updateCount();
    }catch(error){
      const message=error instanceof SyntaxError?'The selected file is not a valid TEE Shared Records file.':(error?.message||'Shared Records sync failed.');
      setStatus(message,'error');
    }finally{if(importInput)importInput.value='';}
  }

  function ensureUi(){
    if(dialog)return;
    dialog=document.createElement('dialog');
    dialog.id='teeSharedSyncDialogV3490';
    dialog.style.cssText='width:min(92vw,720px);max-height:88vh;border:0;border-radius:18px;padding:0;box-shadow:0 20px 70px rgba(0,0,0,.3);color:#17343b';
    dialog.innerHTML=`<div style="padding:18px;background:#fff">
      <div style="display:flex;justify-content:space-between;gap:14px;align-items:flex-start"><div><small style="font-weight:800;letter-spacing:.05em;color:#557078">SHARED — BOTH COUPLES</small><h2 style="margin:4px 0 6px">Sync Shared Records</h2><p style="margin:0;color:#5b6c72">Move only Shared travel records between TEE devices. Couple-private records stay on their own devices.</p></div><button type="button" data-close style="border:0;background:#eef3f4;border-radius:10px;padding:9px 11px;font-weight:700">× Close</button></div>
      <p data-count style="margin:14px 0;padding:10px 12px;border-radius:10px;background:#f5f8f8"></p>
      <section style="border:1px solid #d9e3e4;border-radius:14px;padding:14px;margin:12px 0"><h3 style="margin:0 0 6px">Sending phone</h3><p style="margin:0 0 12px;color:#5d6e74">Create one encrypted Shared Records file, then AirDrop, text, email, or save it for the other phone.</p><button type="button" data-export style="width:100%;padding:13px;border:0;border-radius:11px;background:#1f5a67;color:#fff;font-weight:800;font-size:16px">Create / Share Shared Records</button><div data-code-row hidden style="margin-top:12px"><label style="display:block;font-weight:800">Sync code<input data-code readonly style="display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px;font:700 18px ui-monospace,monospace;border:1px solid #b9c9ce;border-radius:10px"></label><div style="display:flex;gap:8px;margin-top:8px"><button type="button" data-copy-code style="flex:1;padding:10px;border:1px solid #adc1c7;border-radius:10px;background:#fff;font-weight:700">Copy code</button><button type="button" data-share-again style="flex:1;padding:10px;border:1px solid #adc1c7;border-radius:10px;background:#fff;font-weight:700">Share file again</button></div></div></section>
      <section style="border:1px solid #d9e3e4;border-radius:14px;padding:14px;margin:12px 0"><h3 style="margin:0 0 6px">Receiving phone</h3><p style="margin:0 0 12px;color:#5d6e74">Choose the Shared Records file. TEE merges newer Shared records and leaves private records untouched.</p><button type="button" data-import style="width:100%;padding:13px;border:0;border-radius:11px;background:#2f6b4f;color:#fff;font-weight:800;font-size:16px">Choose Shared Records File</button><input data-import-file type="file" hidden></section>
      <p data-status style="margin:12px 0 0;padding:11px 12px;border:1px solid #b9ccd3;border-radius:10px;background:#eef5f7" aria-live="polite">Ready.</p>
    </div>`;
    document.body.appendChild(dialog);
    status=dialog.querySelector('[data-status]');countLabel=dialog.querySelector('[data-count]');codeRow=dialog.querySelector('[data-code-row]');codeInput=dialog.querySelector('[data-code]');importInput=dialog.querySelector('[data-import-file]');
    dialog.querySelector('[data-close]')?.addEventListener('click',close);
    dialog.querySelector('[data-export]')?.addEventListener('click',exportShared);
    dialog.querySelector('[data-import]')?.addEventListener('click',()=>importInput?.click());
    importInput?.addEventListener('change',()=>importFile(importInput.files?.[0]));
    dialog.querySelector('[data-copy-code]')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(codeInput.value);setStatus('Sync code copied. Send the code separately from the Shared Records file.','success');}catch{codeInput.select();setStatus('Select and copy the sync code shown above.','info');}});
    dialog.querySelector('[data-share-again]')?.addEventListener('click',async()=>{if(lastFile)await shareOrDownload(lastFile);});
    dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
  }

  function open(){
    ensureUi();
    updateCount();
    if(!isUnlocked()){setStatus('Unlock the Secure Vault, then open Shared Records Sync again.','error');}
    else setStatus('Ready. Choose whether this phone is sending or receiving Shared records.','info');
    if(dialog.showModal&&!dialog.open)dialog.showModal();else dialog.setAttribute('open','');
  }
  function close(){if(!dialog)return;if(dialog.close&&dialog.open)dialog.close();else dialog.removeAttribute('open');}

  window.addEventListener('message',event=>{
    if(event.origin!==location.origin)return;
    if(event.data?.type==='TEE_OPEN_SHARED_SYNC')open();
  });
  document.addEventListener('tee-vault-state-changed',()=>{updateCount();if(isUnlocked()&&new URLSearchParams(location.search).get('teeSharedSync')==='1')setTimeout(open,50);});
  setTimeout(()=>{
    try{window.parent?.postMessage({type:'TEE_SHARED_SYNC_READY'},location.origin);}catch{}
    if(new URLSearchParams(location.search).get('teeSharedSync')==='1'&&isUnlocked())open();
  },120);

  window.TEESharedSyncV3490=Object.freeze({version:'3.4.90',open,sharedRecords,mergeShared});
})();
