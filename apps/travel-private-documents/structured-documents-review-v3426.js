"use strict";
(function(){
  const STORAGE_KEY='teeStructuredDocumentsPublicV1';
  const LARGE_SOURCE_DB='teeProtectedLargeSourcesV1';
  const LARGE_SOURCE_STORE='sources';
  const LARGE_SOURCE_KIND='tee-encrypted-large-source-v1';
  const LARGE_SOURCE_THRESHOLD=700*1024;
  const base=window.TEEStructuredDocumentsAPI;
  if(!base)return;

  const vault=()=>window.TEEStructuredDocumentVault||null;
  const vaultOpen=()=>vault()?.getState?.()==='unlocked';
  const activeProfile=()=>vault()?.getActiveProfileId?.()||null;
  const readStore=()=>{try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(x)?x:[];}catch{return [];}};
  const writeStore=records=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(records));window.dispatchEvent(new CustomEvent('tee-structured-documents-changed'));};
  const findField=(fields,label)=>{const key=String(label||'').trim().toLowerCase();return (fields||[]).find(f=>String(f?.label||'').trim().toLowerCase()===key);};
  const passportRequired=['Name','Passport number','Expiration date','Date of birth','Nationality'];
  const globalEntryRequired=['Name','PASSID','Expiration date'];

  function requiredFieldsForDocument(doc){
    const title=String(doc?.title||'').trim();
    if(/^passport\b/i.test(title))return passportRequired;
    if(/^global entry\b/i.test(title))return globalEntryRequired;
    return [];
  }

  function sourceIsEmbedded(sourceFile){
    if(!sourceFile)return false;
    if(String(sourceFile.dataUrl||'').trim())return true;
    if(sourceFile.kind==='tee-source-bundle-v1'&&Array.isArray(sourceFile.files)){
      return sourceFile.files.length>0&&sourceFile.files.every(file=>String(file?.dataUrl||'').trim());
    }
    return false;
  }

  function isLargeSourceMarker(sourceFile){
    return sourceFile?.kind===LARGE_SOURCE_KIND&&String(sourceFile?.sourceId||'').trim();
  }

  function shouldExternalizeSource(source,originalClass,input){
    if(!source?.dataUrl||originalClass==='public')return false;
    const bytes=Number(source.bytes||0);
    const isItinerary=String(input?.category||'').toLowerCase()==='itinerary'||/^itinerary\b/i.test(String(input?.title||''));
    return isItinerary||bytes>=LARGE_SOURCE_THRESHOLD||String(source.dataUrl).length>=LARGE_SOURCE_THRESHOLD*1.35;
  }

  function openLargeSourceDb(){
    return new Promise((resolve,reject)=>{
      if(!globalThis.indexedDB){reject(new Error('IndexedDB is unavailable in this browser.'));return;}
      const req=indexedDB.open(LARGE_SOURCE_DB,1);
      req.onupgradeneeded=()=>{
        const db=req.result;
        if(!db.objectStoreNames.contains(LARGE_SOURCE_STORE))db.createObjectStore(LARGE_SOURCE_STORE,{keyPath:'sourceId'});
      };
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error||new Error('Local protected-source storage could not be opened.'));
    });
  }

  async function idbPut(record){
    const db=await openLargeSourceDb();
    try{
      await new Promise((resolve,reject)=>{
        const tx=db.transaction(LARGE_SOURCE_STORE,'readwrite');
        tx.objectStore(LARGE_SOURCE_STORE).put(record);
        tx.oncomplete=()=>resolve();
        tx.onerror=()=>reject(tx.error||new Error('Protected original could not be stored locally.'));
        tx.onabort=()=>reject(tx.error||new Error('Protected original storage was aborted.'));
      });
    }finally{db.close();}
  }

  async function idbGet(sourceId){
    const db=await openLargeSourceDb();
    try{
      return await new Promise((resolve,reject)=>{
        const tx=db.transaction(LARGE_SOURCE_STORE,'readonly');
        const req=tx.objectStore(LARGE_SOURCE_STORE).get(sourceId);
        req.onsuccess=()=>resolve(req.result||null);
        req.onerror=()=>reject(req.error||new Error('Protected original could not be read.'));
      });
    }finally{db.close();}
  }

  async function idbDelete(sourceId){
    if(!sourceId)return;
    const db=await openLargeSourceDb();
    try{
      await new Promise((resolve,reject)=>{
        const tx=db.transaction(LARGE_SOURCE_STORE,'readwrite');
        tx.objectStore(LARGE_SOURCE_STORE).delete(sourceId);
        tx.oncomplete=()=>resolve();
        tx.onerror=()=>reject(tx.error||new Error('Protected original cleanup failed.'));
      });
    }finally{db.close();}
  }

  function activeKeyFor(originalClass){
    if(!vaultOpen())throw new Error('Authorize the Vault before opening a protected original.');
    if(typeof getActiveZoneKeys!=='function')throw new Error('TEE encryption keys are unavailable. Reload TEE and authorize the Vault again.');
    const keys=getActiveZoneKeys();
    const key=originalClass==='shared'?keys?.shared:keys?.private;
    if(!key)throw new Error(`The ${originalClass==='shared'?'Shared':'Private'} encryption key is unavailable.`);
    return key;
  }

  async function storeLargeProtectedSource(source,originalClass){
    if(typeof encryptData!=='function')throw new Error('TEE encryption engine is unavailable.');
    const sourceId=globalThis.crypto?.randomUUID?.()||`src-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const encrypted=await encryptData(source,activeKeyFor(originalClass));
    await idbPut({
      sourceId,
      originalClass,
      name:source.name||'Protected original',
      type:source.type||'application/octet-stream',
      bytes:Number(source.bytes||0),
      addedAt:source.addedAt||new Date().toISOString(),
      encrypted,
      storedAt:new Date().toISOString()
    });
    return {
      kind:LARGE_SOURCE_KIND,
      sourceId,
      name:source.name||'Protected original',
      type:source.type||'application/octet-stream',
      bytes:Number(source.bytes||0),
      addedAt:source.addedAt||new Date().toISOString(),
      encryptedLocal:true
    };
  }

  async function loadLargeProtectedSource(marker,originalClass){
    if(!isLargeSourceMarker(marker))return marker||null;
    if(typeof decryptData!=='function')throw new Error('TEE decryption engine is unavailable.');
    const stored=await idbGet(marker.sourceId);
    if(!stored?.encrypted)throw new Error('The encrypted local original is missing from this browser. Restore or reattach the original before verification.');
    try{
      const source=await decryptData(stored.encrypted,activeKeyFor(originalClass));
      return source&&typeof source==='object'?source:null;
    }catch{
      throw new Error('TEE could not decrypt the retained original with the currently authorized Vault.');
    }
  }

  async function loadProtected(documentId){
    if(!vaultOpen())return {overlays:[],shared:{fields:[],images:[]},priv:{fields:[],images:[]}};
    const overlays=await vault().listOverlays?.(documentId)||[];
    return {
      overlays,
      shared:overlays.find(x=>x.documentId===documentId&&x.layer==='shared')?.payload||{fields:[],images:[]},
      priv:overlays.find(x=>x.documentId===documentId&&x.layer==='private')?.payload||{fields:[],images:[]}
    };
  }

  function persistMetadata(documentId,patch){
    const records=readStore();
    let changed=false;
    const next=records.map(doc=>{if(doc.documentId!==documentId)return doc;changed=true;return {...doc,...patch};});
    if(changed)writeStore(next);
  }

  async function commitSmartIntake(input){
    const originalClass=['public','shared','private'].includes(input?.originalClassification)?input.originalClassification:'private';
    let marker=null;
    let nextInput=input;
    if(shouldExternalizeSource(input?.sourceFile,originalClass,input)){
      marker=await storeLargeProtectedSource(input.sourceFile,originalClass);
      nextInput={...input,sourceFile:marker};
    }
    try{
      const id=await base.commitSmartIntake(nextInput);
      const now=new Date().toISOString();
      persistMetadata(id,{
        targetProfile:input?.targetProfile||null,
        lifecycleStatus:'review',
        verifiedAt:null,
        lastModifiedAt:now,
        archivedAt:null,
        sourceStorage:marker?'encrypted-large-local':'vault-inline',
        sourceLocalId:marker?.sourceId||null,
        sourceBytes:Number(input?.sourceFile?.bytes||0)
      });
      return id;
    }catch(err){
      if(marker?.sourceId){try{await idbDelete(marker.sourceId);}catch{}}
      throw err;
    }
  }

  async function getReviewDataById(documentId){
    let doc=readStore().find(x=>x.documentId===documentId);
    if(!doc)throw new Error('Saved document could not be found.');
    const protection=await loadProtected(documentId);
    const currentProfile=activeProfile();
    const requiredFields=requiredFieldsForDocument(doc);

    if(doc.originalClassification==='private'&&!doc.targetProfile&&vaultOpen()&&protection.priv?.sourceFile){
      persistMetadata(documentId,{targetProfile:currentProfile||null});
      doc={...doc,targetProfile:currentProfile||null};
    }

    const requiredProfile=doc.originalClassification==='private'?(doc.targetProfile||null):null;
    const locked=doc.originalClassification==='public'?false:(!vaultOpen()||(requiredProfile&&currentProfile!==requiredProfile));

    if(locked){
      return {
        documentId:doc.documentId,title:doc.title||'Document',category:doc.category||'',originalClassification:doc.originalClassification||'private',
        targetProfile:doc.targetProfile||null,requiredProfile,lifecycleStatus:doc.lifecycleStatus||'review',verifiedAt:doc.verifiedAt||null,
        locked:true,fields:[],images:[],sourceFile:null,sourceEmbedded:false,completeness:{complete:false,missing:requiredFields.slice()}
      };
    }

    const shared=protection.shared||{};
    const priv=protection.priv||{};
    const fields=[...(doc.publicFields||[]),...(shared.fields||[]),...(priv.fields||[])];
    const images=[...(doc.publicImages||[]),...(shared.images||[]),...(priv.images||[])];
    const sourceMarker=doc.originalClassification==='public'?doc.publicOriginalFile:doc.originalClassification==='shared'?shared.sourceFile:priv.sourceFile;
    let sourceFile=sourceMarker;
    if(isLargeSourceMarker(sourceMarker))sourceFile=await loadLargeProtectedSource(sourceMarker,doc.originalClassification);
    const missing=requiredFields.filter(label=>!String(findField(fields,label)?.value||'').trim());

    return {
      documentId:doc.documentId,title:doc.title||'Document',category:doc.category||'',originalClassification:doc.originalClassification||'private',
      targetProfile:doc.targetProfile||null,requiredProfile,lifecycleStatus:doc.lifecycleStatus||'review',verifiedAt:doc.verifiedAt||null,
      locked:false,fields,images,sourceFile,sourceEmbedded:sourceIsEmbedded(sourceFile),
      sourceStorage:doc.sourceStorage||'vault-inline',sourceLocalId:doc.sourceLocalId||null,
      completeness:{complete:missing.length===0,missing}
    };
  }

  async function updateReviewFieldsById(documentId,updates=[]){
    const records=readStore();
    const doc=records.find(x=>x.documentId===documentId);
    if(!doc)throw new Error('Saved document could not be found.');
    if(doc.originalClassification!=='public'&&!vaultOpen())throw new Error('Authorize the owning couple before editing this protected document.');
    if(doc.targetProfile&&doc.originalClassification==='private'&&activeProfile()!==doc.targetProfile)throw new Error('The authorized Vault does not match this document destination.');

    const protection=await loadProtected(documentId);
    const publicFields=[...(doc.publicFields||[])];
    const sharedFields=[...(protection.shared?.fields||[])];
    const privateFields=[...(protection.priv?.fields||[])];
    const buckets={public:publicFields,shared:sharedFields,private:privateFields};

    for(const update of updates){
      const label=String(update?.label||'').trim();
      if(!label)continue;
      let found=false;
      for(const access of ['public','shared','private']){
        const idx=buckets[access].findIndex(f=>String(f?.label||'').trim().toLowerCase()===label.toLowerCase());
        if(idx>=0){buckets[access][idx]={...buckets[access][idx],label,value:String(update?.value||'').trim()};found=true;break;}
      }
      if(!found){
        const access=['public','shared','private'].includes(doc.originalClassification)?doc.originalClassification:'private';
        buckets[access].push({label,value:String(update?.value||'').trim(),access});
      }
    }

    const now=new Date().toISOString();
    const next=records.map(x=>x.documentId===documentId?{...x,publicFields:buckets.public,lastModifiedAt:now}:x);
    writeStore(next);

    if(vaultOpen()){
      await vault().saveOverlay({documentId,title:doc.title,category:doc.category,layer:'shared',payload:{fields:buckets.shared,images:protection.shared?.images||[],sourceFile:doc.originalClassification==='shared'?protection.shared?.sourceFile||null:null},originalReference:doc.originalClassification==='shared'?doc.originalReference||'':''});
      await vault().saveOverlay({documentId,title:doc.title,category:doc.category,layer:'private',payload:{fields:buckets.private,images:protection.priv?.images||[],sourceFile:doc.originalClassification==='private'?protection.priv?.sourceFile||null:null},originalReference:doc.originalClassification==='private'?doc.originalReference||'':''});
    }
    await base.refresh?.();
    return true;
  }

  async function verifyAndFinishById(documentId){
    const review=await getReviewDataById(documentId);
    if(review.locked)throw new Error('Authorize the owning couple before verification.');
    if(!review.sourceEmbedded)throw new Error('The retained original must be visible before verification.');
    if(!review.completeness?.complete)throw new Error(`Required information is still missing: ${(review.completeness?.missing||[]).join(', ')}`);
    const now=new Date().toISOString();
    persistMetadata(documentId,{verifiedAt:now,lifecycleStatus:'archived',archivedAt:now,lastModifiedAt:now});
    await base.refresh?.();
    return true;
  }

  async function sourceManagerRecords(){
    const rows=await base.sourceManagerRecords?.()||[];
    const docs=readStore();
    return rows.map(row=>{
      const doc=docs.find(x=>x.documentId===row.documentId)||{};
      const verifiedAt=doc.verifiedAt||null;
      const lifecycleStatus=doc.lifecycleStatus||row.lifecycleStatus;
      const protectedLarge=doc.sourceStorage==='encrypted-large-local'&&!!doc.sourceLocalId;
      return {
        ...row,
        targetProfile:doc.targetProfile||null,
        verifiedAt,
        lifecycleStatus,
        sourceEmbedded:row.sourceEmbedded||protectedLarge,
        sourceBytes:row.sourceBytes||doc.sourceBytes||0,
        needsAttention:lifecycleStatus!=='archived'&&!verifiedAt
      };
    });
  }

  async function deleteById(documentId){
    const doc=readStore().find(x=>x.documentId===documentId);
    const sourceLocalId=doc?.sourceLocalId||null;
    await base.deleteById?.(documentId);
    if(sourceLocalId){try{await idbDelete(sourceLocalId);}catch{}}
  }

  window.TEEStructuredDocumentsAPI=Object.freeze({
    ...base,
    commitSmartIntake,
    getReviewDataById,
    updateReviewFieldsById,
    verifyAndFinishById,
    sourceManagerRecords,
    deleteById
  });
})();
