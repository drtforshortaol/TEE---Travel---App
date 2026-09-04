"use strict";
(function(){
  const MAINT_AUTH_KEY="teeMaintenanceAuthorizedUntilV1";
  const DB_NAME="teeProtectedLargeSourcesV1";
  const STORE_NAME="sources";
  const BACKUP_SCHEMA="tee-protected-large-sources-backup-v1";
  const STRUCTURED_KEY="teeStructuredDocumentsPublicV1";
  const $=id=>document.getElementById(id);
  const localSummary=$("localSummary"), sourceList=$("sourceList"), status=$("status"), validationResult=$("validationResult");
  const previewRestoreBtn=$("previewRestore"), importSourcesBtn=$("importSources"), restorePlan=$("restorePlan");
  let validatedPayload=null,currentPlan=null;

  if(Number(sessionStorage.getItem(MAINT_AUTH_KEY)||0)<=Date.now()){
    location.replace("index.html");
    return;
  }

  function openDb(){return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,1);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE_NAME))req.result.createObjectStore(STORE_NAME,{keyPath:"sourceId"});};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||new Error("Unable to open protected-source store."));
  });}
  async function readAll(){const db=await openDb();try{return await new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE_NAME,"readonly"),req=tx.objectStore(STORE_NAME).getAll();
    req.onsuccess=()=>resolve(Array.isArray(req.result)?req.result:[]);
    req.onerror=()=>reject(req.error||new Error("Unable to read protected sources."));
  });}finally{db.close();}}
  async function writeRecords(records){if(!records.length)return 0;const db=await openDb();try{
    await new Promise((resolve,reject)=>{const tx=db.transaction(STORE_NAME,"readwrite"),store=tx.objectStore(STORE_NAME);records.forEach(r=>store.add(r));tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error("Protected-source restore failed."));tx.onabort=()=>reject(tx.error||new Error("Protected-source restore was aborted."));});
    return records.length;
  }finally{db.close();}}

  function structuredDocs(){try{const rows=JSON.parse(localStorage.getItem(STRUCTURED_KEY)||"[]");return Array.isArray(rows)?rows:[];}catch{return [];}}
  function writeStructuredDocs(rows){localStorage.setItem(STRUCTURED_KEY,JSON.stringify(rows));window.dispatchEvent(new CustomEvent("tee-structured-documents-changed"));}
  function validEncryptedRecord(row){return !!(row&&typeof row.sourceId==="string"&&row.sourceId&&row.encrypted&&typeof row.encrypted.iv==="string"&&row.encrypted.iv&&typeof row.encrypted.ciphertext==="string"&&row.encrypted.ciphertext);}
  function bytesLabel(value){const n=Number(value)||0;if(n>=1024*1024)return `${(n/(1024*1024)).toFixed(2)} MB`;if(n>=1024)return `${Math.round(n/1024)} KB`;return `${n} bytes`;}
  function sourceIdForDoc(doc){return String(doc?.sourceLocalId||doc?.protectedSourceId||"");}
  function refsFor(row){const id=String(row?.sourceId||"");return structuredDocs().filter(doc=>sourceIdForDoc(doc)===id);}
  function stableRecordSignature(row){return JSON.stringify({sourceId:row?.sourceId||null,originalClass:row?.originalClass||null,name:row?.name||null,type:row?.type||null,bytes:Number(row?.bytes)||0,addedAt:row?.addedAt||null,encrypted:row?.encrypted||null,storedAt:row?.storedAt||null});}
  function stableIndexSignature(doc){return JSON.stringify(doc||null);}
  function indexRecordsForSources(records){const ids=new Set(records.map(r=>String(r.sourceId||"")));return structuredDocs().filter(doc=>ids.has(sourceIdForDoc(doc)));}

  async function refresh(){try{
    status.textContent="Checking encrypted protected-source store…";
    const rows=await readAll(),valid=rows.filter(validEncryptedRecord),totalBytes=valid.reduce((s,r)=>s+(Number(r.bytes)||0),0),docs=structuredDocs();
    localSummary.innerHTML=`<p class="${valid.length?"ok":"warn"}">${valid.length} encrypted protected source${valid.length===1?"":"s"} found.</p><p>${bytesLabel(totalBytes)} of original source data represented. ${docs.length} structured document record${docs.length===1?"":"s"} indexed locally.</p>`;
    sourceList.replaceChildren();
    if(!valid.length)sourceList.innerHTML='<div class="source-row"><strong>No encrypted large originals are stored on this browser.</strong><span>Small inline documents are not part of this supplemental store.</span></div>';
    valid.forEach((row,index)=>{const div=document.createElement("div");div.className="source-row";const refs=refsFor(row),name=String(row.name||row.fileName||`Protected source ${index+1}`);div.innerHTML=`<strong>${name.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}</strong><span>${bytesLabel(row.bytes)} · encrypted record valid · ${refs.length} structured reference${refs.length===1?"":"s"}</span>`;sourceList.appendChild(div);});
    status.textContent=valid.length===rows.length?`Protected-source check passed. ${valid.length} encrypted record${valid.length===1?"":"s"} ready for backup.`:`Warning: ${rows.length-valid.length} malformed record(s) were found and will not be exported.`;
    return valid;
  }catch(err){status.textContent=`Protected-source check failed: ${err?.message||String(err)}`;localSummary.textContent="Unable to read the local protected-source store.";return [];}}

  async function exportBackup(){
    const records=await refresh();if(!records.length){status.textContent="Nothing to export: no valid encrypted large-source records were found.";return;}
    const indexRecords=indexRecordsForSources(records);
    const payload={schema:BACKUP_SCHEMA,backupRevision:2,exportedAt:new Date().toISOString(),recordCount:records.length,indexRecordCount:indexRecords.length,records,indexRecords};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=`TEE-protected-sources-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
    status.textContent=`Protected-source backup exported: ${records.length} encrypted source${records.length===1?"":"s"} and ${indexRecords.length} matching Source Documents index record${indexRecords.length===1?"":"s"}. No PDF was decrypted.`;
  }

  function validatePayload(payload){
    if(!payload||payload.schema!==BACKUP_SCHEMA)throw new Error("This is not a TEE protected-source backup file.");
    if(!Array.isArray(payload.records))throw new Error("Backup records are missing.");
    const invalid=payload.records.filter(r=>!validEncryptedRecord(r));if(invalid.length)throw new Error(`${invalid.length} encrypted record${invalid.length===1?" is":"s are"} malformed.`);
    const ids=payload.records.map(r=>r.sourceId);if(new Set(ids).size!==ids.length)throw new Error("Backup contains duplicate source IDs.");
    const indexRecords=Array.isArray(payload.indexRecords)?payload.indexRecords:[];
    const docIds=indexRecords.map(d=>String(d?.documentId||"")).filter(Boolean);if(new Set(docIds).size!==docIds.length)throw new Error("Backup contains duplicate Source Documents IDs.");
    return {records:payload.records,indexRecords,revision:Number(payload.backupRevision)||1};
  }

  async function validateFile(file){validatedPayload=null;currentPlan=null;previewRestoreBtn.disabled=true;importSourcesBtn.disabled=true;restorePlan.textContent="Validate a backup file first.";try{
    validationResult.textContent="Validating backup file…";const payload=JSON.parse(await file.text()),validated=validatePayload(payload),bytes=validated.records.reduce((s,r)=>s+(Number(r.bytes)||0),0);validatedPayload=payload;previewRestoreBtn.disabled=false;
    const indexLine=validated.revision>=2?`Source Documents index records: ${validated.indexRecords.length}`:"Source Documents index records: not included (older source-only backup)";
    validationResult.textContent=`VALID TEE PROTECTED-SOURCE BACKUP\nEncrypted source records: ${validated.records.length}\n${indexLine}\nOriginal source size represented: ${bytesLabel(bytes)}\nExported: ${payload.exportedAt||"not recorded"}\n\nValidation passed. Nothing has been imported or changed.`;
  }catch(err){validationResult.textContent=`INVALID BACKUP\n${err?.message||String(err)}\n\nNothing was imported or changed.`;}}

  async function buildRestorePlan(){
    if(!validatedPayload)throw new Error("Validate a backup file first.");
    const validated=validatePayload(validatedPayload),existingSources=await readAll(),sourceById=new Map(existingSources.map(r=>[String(r.sourceId||""),r]));
    const sourceAdd=[],sourceIdentical=[],sourceConflicts=[];
    for(const row of validated.records){const current=sourceById.get(String(row.sourceId));if(!current)sourceAdd.push(row);else if(stableRecordSignature(current)===stableRecordSignature(row))sourceIdentical.push(row);else sourceConflicts.push({incoming:row,current});}
    const existingDocs=structuredDocs(),docById=new Map(existingDocs.map(d=>[String(d?.documentId||""),d]));
    const indexAdd=[],indexIdentical=[],indexConflicts=[];
    for(const doc of validated.indexRecords){const id=String(doc?.documentId||"");if(!id){indexConflicts.push({incoming:doc,current:null,reason:"Missing documentId"});continue;}const current=docById.get(id);if(!current)indexAdd.push(doc);else if(stableIndexSignature(current)===stableIndexSignature(doc))indexIdentical.push(doc);else indexConflicts.push({incoming:doc,current});}
    return {revision:validated.revision,sourceAdd,sourceIdentical,sourceConflicts,indexAdd,indexIdentical,indexConflicts,sourceTotal:validated.records.length,indexTotal:validated.indexRecords.length};
  }

  function renderPlan(plan){
    const conflicts=plan.sourceConflicts.length+plan.indexConflicts.length,adds=plan.sourceAdd.length+plan.indexAdd.length;
    const lines=["PROTECTED-SOURCE RESTORE PLAN",`Encrypted source records: ${plan.sourceTotal}`,`  New to add: ${plan.sourceAdd.length}`,`  Already present / identical: ${plan.sourceIdentical.length}`,`  Conflicts: ${plan.sourceConflicts.length}`,`Source Documents index records: ${plan.indexTotal}`,`  New to add: ${plan.indexAdd.length}`,`  Already present / identical: ${plan.indexIdentical.length}`,`  Conflicts: ${plan.indexConflicts.length}`,""];
    if(plan.revision<2)lines.push("OLDER SOURCE-ONLY BACKUP — this file does not contain Source Documents index records.","It can restore encrypted file bytes, but not reconstruct the document entry by itself.","");
    if(conflicts)lines.push("RESTORE BLOCKED — an existing same-ID record differs from the backup.","TEE will not overwrite either encrypted sources or Source Documents index records.");
    else if(adds)lines.push("SAFE TO IMPORT — only missing encrypted sources and missing index records will be added.","No PDF will be decrypted during import. Existing records will not be overwritten.");
    else lines.push("NOTHING TO IMPORT — every included backup record is already present and identical.");
    restorePlan.textContent=lines.join("\n");
  }

  async function previewRestore(){try{currentPlan=await buildRestorePlan();renderPlan(currentPlan);const conflicts=currentPlan.sourceConflicts.length+currentPlan.indexConflicts.length,adds=currentPlan.sourceAdd.length+currentPlan.indexAdd.length;importSourcesBtn.disabled=!!conflicts||!adds;status.textContent=conflicts?"Restore preview found a conflict. Import is blocked.":adds?"Restore preview passed. Review the plan, then import if correct.":"Restore preview passed. Nothing needs to be imported.";}catch(err){restorePlan.textContent=`RESTORE PREVIEW FAILED\n${err?.message||String(err)}`;importSourcesBtn.disabled=true;}}

  async function importSources(){try{
    if(!currentPlan)throw new Error("Preview the restore first.");
    const conflicts=currentPlan.sourceConflicts.length+currentPlan.indexConflicts.length;if(conflicts)throw new Error("Import is blocked because the restore plan contains conflicts.");
    const adds=currentPlan.sourceAdd.length+currentPlan.indexAdd.length;if(!adds){status.textContent="Nothing to import.";return;}
    importSourcesBtn.disabled=true;status.textContent="Importing missing encrypted sources and Source Documents references…";
    const sourceCount=await writeRecords(currentPlan.sourceAdd);
    if(currentPlan.indexAdd.length){const existing=structuredDocs();writeStructuredDocs([...existing,...currentPlan.indexAdd]);}
    status.textContent=`Restore complete. ${sourceCount} encrypted source record${sourceCount===1?"":"s"} and ${currentPlan.indexAdd.length} Source Documents index record${currentPlan.indexAdd.length===1?"":"s"} added. No PDF was decrypted and nothing existing was overwritten.`;
    await refresh();currentPlan=await buildRestorePlan();renderPlan(currentPlan);importSourcesBtn.disabled=true;
  }catch(err){status.textContent=`Restore failed safely: ${err?.message||String(err)}`;}}

  $("refreshSources")?.addEventListener("click",refresh);
  $("exportSources")?.addEventListener("click",exportBackup);
  $("backupFile")?.addEventListener("change",e=>{const file=e.target.files?.[0];if(file)validateFile(file);});
  previewRestoreBtn?.addEventListener("click",previewRestore);
  importSourcesBtn?.addEventListener("click",importSources);
  refresh();
})();
