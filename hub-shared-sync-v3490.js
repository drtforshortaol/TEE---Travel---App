"use strict";
(function(){
  if(window.TEEHubSharedSyncV3490)return;
  const recordsButton=document.getElementById('hubVaultRecordsOpen');
  const sessionSummary=document.getElementById('hubVaultSessionSummary');
  const vaultToggle=document.getElementById('hubVaultToggle');
  const vaultFrame=document.getElementById('hubVaultFrame');
  if(!sessionSummary||!vaultFrame)return;

  const FORMAT='TEE_SHARED_SYNC';
  const FORMAT_VERSION=1;
  const SYNC_ALWAYS_SHARED_TYPES=new Set(['emergencyContact']);
  let button=document.getElementById('hubSharedSyncOpen');
  if(!button){
    button=document.createElement('button');
    button.id='hubSharedSyncOpen';
    button.type='button';
    button.className='hub-primary-action';
    button.textContent='Sync Shared Records';
    if(recordsButton?.parentElement)recordsButton.parentElement.insertBefore(button,recordsButton.nextSibling);
    else sessionSummary.appendChild(button);
  }

  let dialog=null,status=null,countLabel=null,codeRow=null,codeInput=null,importInput=null,lastFile=null;
  const enc=new TextEncoder();
  const toB64=bytes=>{let s='';for(let i=0;i<bytes.length;i+=0x8000)s+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(s);};
  const normalizeCode=code=>String(code||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  function randomBytes(n){const b=new Uint8Array(n);crypto.getRandomValues(b);return b;}
  function randomCode(){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',b=randomBytes(16);let s='';for(const x of b)s+=chars[x%chars.length];return s.match(/.{1,4}/g).join('-');}
  async function deriveKey(code,salt){
    const material=await crypto.subtle.importKey('raw',enc.encode(normalizeCode(code)),'PBKDF2',false,['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:310000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt']);
  }
  async function encryptJson(value,key){const iv=randomBytes(12);const cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,enc.encode(JSON.stringify(value)));return {iv:toB64(iv),ciphertext:toB64(new Uint8Array(cipher))};}
  function sessionSharedRecords(){
    const session=window.TEEVaultSession?.get?.();
    const records=Array.isArray(session?.records)?session.records:[];
    return records.filter(r=>{
      if(!r||r.recordStatus==='deleted')return false;
      if(SYNC_ALWAYS_SHARED_TYPES.has(r.type))return true;
      return r.accessScope==='shared'&&r.visibilityClass!=='private';
    }).map(r=>{
      const copy=JSON.parse(JSON.stringify(r));
      if(SYNC_ALWAYS_SHARED_TYPES.has(copy.type)){
        copy.accessScope='shared';
        copy.visibilityClass='shared';
      }
      return copy;
    });
  }
  function setStatus(message,kind='info'){
    if(!status)return;status.textContent=message;
    status.style.background=kind==='success'?'#eaf7ee':kind==='error'?'#fff0f0':'#eef5f7';
    status.style.borderColor=kind==='success'?'#6eaa82':kind==='error'?'#c67b7b':'#b9ccd3';
    status.style.color=kind==='error'?'#7b2020':'#24444d';
  }
  function updateCount(){
    const session=window.TEEVaultSession?.get?.();
    const all=Array.isArray(session?.records)?session.records:[];
    const outgoing=sessionSharedRecords();
    const emergency=outgoing.filter(r=>r.type==='emergencyContact').length;
    if(countLabel)countLabel.textContent=`${outgoing.length} record${outgoing.length===1?'':'s'} ready to synchronize${emergency?` including ${emergency} emergency contact${emergency===1?'':'s'}`:''}. Couple-private records other than trip emergency contacts are excluded.`;
  }
  async function buildPackage(code){
    const records=sessionSharedRecords();
    if(!records.length)throw new Error('There are no Shared records to synchronize.');
    const payload={format:FORMAT,version:FORMAT_VERSION,createdAt:new Date().toISOString(),records};
    const salt=randomBytes(16),key=await deriveKey(code,salt),encrypted=await encryptJson(payload,key);
    return {format:FORMAT,version:FORMAT_VERSION,createdAt:payload.createdAt,recordCount:records.length,salt:toB64(salt),encrypted};
  }
  function makeFile(pkg){const day=new Date().toISOString().slice(0,10);return new File([JSON.stringify(pkg,null,2)],`TEE-Shared-Records-${day}.tee-shared.json`,{type:'application/json'});}
  async function shareFile(file){
    if(navigator.share&&navigator.canShare?.({files:[file]})){
      try{await navigator.share({title:'TEE Shared Records',text:'Encrypted TEE Shared Records sync file. Send the sync code separately.',files:[file]});return 'shared';}catch(error){if(error?.name==='AbortError')return 'cancelled';}
    }
    const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);return 'downloaded';
  }
  async function exportShared(){
    try{
      if(!window.TEEVaultSession?.isOpen?.())throw new Error('Unlock the Secure Vault once from the Hub first.');
      const code=randomCode(),pkg=await buildPackage(code);lastFile=makeFile(pkg);codeInput.value=code;codeRow.hidden=false;
      setStatus(`Encrypted Shared file created with ${pkg.recordCount} record${pkg.recordCount===1?'':'s'}, including trip emergency contacts. No second Vault passphrase is needed.`,'success');
      const result=await shareFile(lastFile);
      if(result==='shared')setStatus('Shared file sent. Give the receiving traveler the sync code shown below.','success');
      else if(result==='downloaded')setStatus('Shared file saved/downloaded. Send it to the receiving phone and give them the sync code separately.','success');
      else setStatus('Shared file is ready. Tap Share file again when ready.');
    }catch(error){setStatus(error?.message||'Unable to create Shared Records file.','error');}
  }
  async function requestVaultImport(parsed,code){
    const w=vaultFrame.contentWindow;
    if(!w)throw new Error('TEE could not reach the active Vault.');
    if(typeof w.getVaultState!=='function'||w.getVaultState()!=='unlocked')throw new Error('The Vault session inside TEE is no longer unlocked. Close Sync, unlock once from the Hub, and try again.');
    if(typeof w.deriveEncryptionKey!=='function'||typeof w.base64ToBytes!=='function'||typeof w.decryptData!=='function'||!w.TEESharedSyncV3490?.mergeShared)throw new Error('Shared Sync is not ready in the active Vault. Close Sync, tap Refresh / Update, then try again.');
    const key=await w.deriveEncryptionKey(normalizeCode(code),w.base64ToBytes(parsed.salt));
    const payload=await w.decryptData(parsed.encrypted,key);
    if(payload?.format!==FORMAT||Number(payload?.version)!==FORMAT_VERSION||!Array.isArray(payload?.records))throw new Error('The Shared Records package is invalid or the sync code is incorrect.');
    if(payload.records.some(r=>r?.accessScope!=='shared'||r?.visibilityClass==='private'))throw new Error('The package contains a non-Shared record and was rejected.');
    return w.TEESharedSyncV3490.mergeShared(payload);
  }
  async function receiveFile(file){
    try{
      if(!file)return;
      if(!window.TEEVaultSession?.isOpen?.())throw new Error('Unlock the Secure Vault once from the Hub first.');
      const code=prompt('Enter the Shared Records sync code from Glenn’s master iPhone.');if(code===null)return;
      if(normalizeCode(code).length<8)throw new Error('The sync code is incomplete.');
      const parsed=JSON.parse(await file.text());
      if(parsed?.format!==FORMAT||Number(parsed?.version)!==FORMAT_VERSION)throw new Error('This is not a valid TEE Shared Records file.');
      setStatus('Importing into the already-unlocked Vault…');
      const result=await requestVaultImport(parsed,code);
      setStatus(`Sync complete: ${result.added||0} added, ${result.updated||0} updated, ${result.unchanged||0} unchanged${result.skipped?`, ${result.skipped} skipped`:''}. Private records were untouched.`,'success');
      updateCount();
    }catch(error){setStatus(error instanceof SyntaxError?'The selected file is not a valid TEE Shared Records file.':(error?.message||'Shared Records sync failed.'),'error');}
    finally{if(importInput)importInput.value='';}
  }
  function ensureDialog(){
    if(dialog)return;
    dialog=document.createElement('dialog');dialog.id='hubSharedSyncDialogV3496';
    dialog.style.cssText='width:min(96vw,760px);max-height:92vh;padding:0;border:0;border-radius:18px;overflow:auto;box-shadow:0 22px 70px rgba(0,0,0,.35);background:#fff;color:#17343b';
    dialog.innerHTML=`<div style="padding:18px;background:#fff"><div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h2 style="margin:0 0 4px">Sync Shared Records</h2><p style="margin:0;color:#607178">Glenn's iPhone is the master Shared source.</p></div><button type="button" data-close style="border:0;background:#edf2f3;border-radius:10px;padding:10px 12px;font-weight:800">× Close</button></div>
    <details open style="margin:16px 0;border:1px solid #ddcfaa;border-radius:14px;padding:13px;background:#fffaf0"><summary style="font-weight:900;font-size:1.05rem">How to sync in the field — SEND / RECEIVE</summary><div style="line-height:1.45"><p><strong>Glenn's master iPhone — SEND</strong></p><ol><li>Unlock the Secure Vault once from the Hub.</li><li>Tap Sync Shared Records.</li><li>Tap Create / Share Shared Records below.</li><li>Choose AirDrop and select the receiving iPhone.</li><li>Give the sync code separately.</li></ol><p><strong>Other traveler iPhone — RECEIVE</strong></p><ol><li>Accept the AirDrop and save the file in Files if asked.</li><li>Open TEE Hub and unlock the Secure Vault once.</li><li>Tap Sync Shared Records.</li><li>Tap Choose Shared Records File below.</li><li>Select the AirDropped file from Files.</li><li>Enter Glenn's sync code.</li><li>Confirm Sync complete, then verify the Shared information.</li></ol><p><strong>Trip emergency contacts are included in Shared Sync even if an older device still labels them Private.</strong></p><p><strong>Important:</strong> Do not upload the Shared file to GitHub.</p></div></details>
    <p data-count style="padding:10px 12px;border-radius:10px;background:#f4f8f8"></p>
    <section style="border:1px solid #d9e3e4;border-radius:14px;padding:14px;margin:12px 0"><h3 style="margin:0 0 6px">Glenn's master phone — SEND</h3><button type="button" data-export class="hub-primary-action" style="width:100%;padding:13px">Create / Share Shared Records</button><div data-code-row hidden style="margin-top:12px"><label><strong>Sync code</strong><input data-code readonly style="display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px;border:1px solid #b7c7cc;border-radius:10px;font:700 18px ui-monospace,monospace"></label><div style="display:flex;gap:8px;margin-top:8px"><button type="button" data-copy style="flex:1;padding:10px">Copy code</button><button type="button" data-share-again style="flex:1;padding:10px">Share file again</button></div></div></section>
    <section style="border:1px solid #d9e3e4;border-radius:14px;padding:14px;margin:12px 0"><h3 style="margin:0 0 6px">Other traveler phone — RECEIVE</h3><button type="button" data-import class="hub-primary-action" style="width:100%;padding:13px">Choose Shared Records File</button><input data-import-file type="file" hidden></section>
    <p data-status style="padding:11px 12px;border:1px solid #b9ccd3;border-radius:10px;background:#eef5f7" aria-live="polite">Ready. Your existing Vault authorization will be reused.</p></div>`;
    document.body.appendChild(dialog);status=dialog.querySelector('[data-status]');countLabel=dialog.querySelector('[data-count]');codeRow=dialog.querySelector('[data-code-row]');codeInput=dialog.querySelector('[data-code]');importInput=dialog.querySelector('[data-import-file]');
    dialog.querySelector('[data-close]')?.addEventListener('click',close);dialog.querySelector('[data-export]')?.addEventListener('click',exportShared);dialog.querySelector('[data-import]')?.addEventListener('click',()=>importInput?.click());importInput?.addEventListener('change',()=>receiveFile(importInput.files?.[0]));
    dialog.querySelector('[data-copy]')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(codeInput.value);setStatus('Sync code copied. Send it separately from the file.','success');}catch{codeInput.select();setStatus('Select and copy the sync code shown above.');}});
    dialog.querySelector('[data-share-again]')?.addEventListener('click',async()=>{if(lastFile)await shareFile(lastFile);});dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
  }
  function open(){if(!window.TEEVaultSession?.isOpen?.()){vaultToggle?.click();return;}ensureDialog();updateCount();setStatus('Ready. The Vault is already authorized; Sync should not ask for the passphrase again.');if(dialog.showModal&&!dialog.open)dialog.showModal();else dialog.setAttribute('open','');}
  function close(){if(!dialog)return;if(dialog.close&&dialog.open)dialog.close();else dialog.removeAttribute('open');}
  button.addEventListener('click',open);
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{const opened=window.TEEVaultSession?.isOpen?.();button.hidden=!opened;if(!opened&&dialog?.open)close();});
  button.hidden=!window.TEEVaultSession?.isOpen?.();
  window.TEEHubSharedSyncV3490=Object.freeze({open,close});
})();
