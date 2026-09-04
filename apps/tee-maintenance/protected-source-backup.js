"use strict";
(function(){
  const MAINT_AUTH_KEY="teeMaintenanceAuthorizedUntilV1";
  const DB_NAME="teeProtectedLargeSourcesV1";
  const STORE_NAME="sources";
  const BACKUP_SCHEMA="tee-protected-large-sources-backup-v1";
  const STRUCTURED_KEY="teeStructuredDocumentsPublicV1";
  const $=id=>document.getElementById(id);
  const localSummary=$("localSummary"), sourceList=$("sourceList"), status=$("status"), validationResult=$("validationResult");

  if(Number(sessionStorage.getItem(MAINT_AUTH_KEY)||0)<=Date.now()){
    location.replace("index.html");
    return;
  }

  function openDb(){
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open(DB_NAME,1);
      req.onupgradeneeded=()=>{ if(!req.result.objectStoreNames.contains(STORE_NAME))req.result.createObjectStore(STORE_NAME,{keyPath:"sourceId"}); };
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error||new Error("Unable to open protected-source store."));
    });
  }
  async function readAll(){
    const db=await openDb();
    try{
      return await new Promise((resolve,reject)=>{
        const tx=db.transaction(STORE_NAME,"readonly");
        const req=tx.objectStore(STORE_NAME).getAll();
        req.onsuccess=()=>resolve(Array.isArray(req.result)?req.result:[]);
        req.onerror=()=>reject(req.error||new Error("Unable to read protected sources."));
      });
    }finally{db.close();}
  }
  function structuredDocs(){
    try{const rows=JSON.parse(localStorage.getItem(STRUCTURED_KEY)||"[]");return Array.isArray(rows)?rows:[];}catch{return [];}
  }
  function validEncryptedRecord(row){
    return !!(row&&typeof row.sourceId==="string"&&row.sourceId&&row.encrypted&&typeof row.encrypted.iv==="string"&&row.encrypted.iv&&typeof row.encrypted.ciphertext==="string"&&row.encrypted.ciphertext);
  }
  function bytesLabel(value){
    const n=Number(value)||0;
    if(n>=1024*1024)return `${(n/(1024*1024)).toFixed(2)} MB`;
    if(n>=1024)return `${Math.round(n/1024)} KB`;
    return `${n} bytes`;
  }
  function refsFor(row){
    const id=String(row?.sourceId||"");
    return structuredDocs().filter(doc=>String(doc?.sourceLocalId||doc?.protectedSourceId||"")===id);
  }
  async function refresh(){
    try{
      status.textContent="Checking encrypted protected-source store…";
      const rows=await readAll();
      const valid=rows.filter(validEncryptedRecord);
      const totalBytes=valid.reduce((sum,row)=>sum+(Number(row.bytes)||0),0);
      const docs=structuredDocs();
      localSummary.innerHTML=`<p class="${valid.length?"ok":"warn"}">${valid.length} encrypted protected source${valid.length===1?"":"s"} found.</p><p>${bytesLabel(totalBytes)} of original source data represented. ${docs.length} structured document record${docs.length===1?"":"s"} indexed locally.</p>`;
      sourceList.replaceChildren();
      if(!valid.length){sourceList.innerHTML='<div class="source-row"><strong>No encrypted large originals are stored on this browser.</strong><span>Small inline documents are not part of this supplemental store.</span></div>';}
      valid.forEach((row,index)=>{
        const div=document.createElement("div");div.className="source-row";
        const refs=refsFor(row);
        const name=String(row.name||row.fileName||`Protected source ${index+1}`);
        div.innerHTML=`<strong>${name.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}</strong><span>${bytesLabel(row.bytes)} · encrypted record valid · ${refs.length} structured reference${refs.length===1?"":"s"}</span>`;
        sourceList.appendChild(div);
      });
      status.textContent=valid.length===rows.length?`Protected-source check passed. ${valid.length} encrypted record${valid.length===1?"":"s"} ready for backup.`:`Warning: ${rows.length-valid.length} malformed record(s) were found and will not be exported.`;
      return valid;
    }catch(err){status.textContent=`Protected-source check failed: ${err?.message||String(err)}`;localSummary.textContent="Unable to read the local protected-source store.";return [];}
  }
  async function exportBackup(){
    const records=await refresh();
    if(!records.length){status.textContent="Nothing to export: no valid encrypted large-source records were found.";return;}
    const payload={schema:BACKUP_SCHEMA,exportedAt:new Date().toISOString(),recordCount:records.length,records};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`TEE-protected-sources-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
    status.textContent=`Encrypted protected-source backup exported. ${records.length} record${records.length===1?"":"s"}; no PDF was decrypted.`;
  }
  function validatePayload(payload){
    if(!payload||payload.schema!==BACKUP_SCHEMA)throw new Error("This is not a TEE protected-source backup file.");
    if(!Array.isArray(payload.records))throw new Error("Backup records are missing.");
    const invalid=payload.records.filter(row=>!validEncryptedRecord(row));
    if(invalid.length)throw new Error(`${invalid.length} encrypted record${invalid.length===1?" is":"s are"} malformed.`);
    const ids=payload.records.map(r=>r.sourceId);if(new Set(ids).size!==ids.length)throw new Error("Backup contains duplicate source IDs.");
    return payload.records;
  }
  async function validateFile(file){
    try{
      validationResult.textContent="Validating backup file…";
      const text=await file.text();
      const payload=JSON.parse(text);
      const records=validatePayload(payload);
      const bytes=records.reduce((sum,row)=>sum+(Number(row.bytes)||0),0);
      validationResult.textContent=`VALID TEE PROTECTED-SOURCE BACKUP\nRecords: ${records.length}\nOriginal source size represented: ${bytesLabel(bytes)}\nExported: ${payload.exportedAt||"not recorded"}\n\nValidation only. Nothing was imported or changed.`;
    }catch(err){validationResult.textContent=`INVALID BACKUP\n${err?.message||String(err)}\n\nNothing was imported or changed.`;}
  }

  $("refreshSources")?.addEventListener("click",refresh);
  $("exportSources")?.addEventListener("click",exportBackup);
  $("backupFile")?.addEventListener("change",e=>{const file=e.target.files?.[0];if(file)validateFile(file);});
  refresh();
})();
