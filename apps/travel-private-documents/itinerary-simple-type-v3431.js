"use strict";
(function(){
  function ensureItineraryType(){
    const select=document.getElementById('teeV3404Type');
    if(!select)return false;
    if(!Array.from(select.options).some(option=>option.value==='Itinerary')){
      const option=document.createElement('option');
      option.value='Itinerary';
      option.textContent='Official itinerary / trip schedule';
      const other=Array.from(select.options).find(item=>item.value==='Other');
      select.insertBefore(option,other||null);
    }
    return true;
  }
  function explainIfItinerary(){
    const select=document.getElementById('teeV3404Type');
    if(!select||select.value!=='Itinerary')return;
    const note=document.getElementById('teeV3409DetailNote');
    if(note)note.innerHTML='<strong>Official itinerary source.</strong> TEE retains the complete PDF as the supporting original. Use the Important note field for a short verified summary; detailed operational days belong in Master Itinerary and Daily Operations.';
  }

  const STRUCTURED_KEY='teeStructuredDocumentsPublicV1';
  const LARGE_SOURCE_DB='teeProtectedLargeSourcesV1';
  const LARGE_SOURCE_STORE='sources';
  const LARGE_SOURCE_KIND='tee-encrypted-large-source-v1';

  function readStructuredIndex(){
    try{const rows=JSON.parse(localStorage.getItem(STRUCTURED_KEY)||'[]');return Array.isArray(rows)?rows:[];}catch{return [];}
  }
  function openLargeSourceDb(){
    return new Promise((resolve,reject)=>{
      if(!globalThis.indexedDB){reject(new Error('IndexedDB is unavailable.'));return;}
      const req=indexedDB.open(LARGE_SOURCE_DB,1);
      req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(LARGE_SOURCE_STORE))req.result.createObjectStore(LARGE_SOURCE_STORE,{keyPath:'sourceId'});};
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error||new Error('Protected-source storage could not be opened.'));
    });
  }
  async function idbGet(sourceId){
    if(!sourceId)return null;
    const db=await openLargeSourceDb();
    try{return await new Promise((resolve,reject)=>{
      const tx=db.transaction(LARGE_SOURCE_STORE,'readonly');
      const req=tx.objectStore(LARGE_SOURCE_STORE).get(sourceId);
      req.onsuccess=()=>resolve(req.result||null);
      req.onerror=()=>reject(req.error||new Error('Protected source could not be read.'));
    });}finally{db.close();}
  }
  function activeKeyFor(originalClass){
    if(typeof getActiveZoneKeys!=='function')return null;
    const keys=getActiveZoneKeys();
    return originalClass==='shared'?keys?.shared:keys?.private;
  }
  async function loadRestoredLargeSource(sourceId,originalClass){
    if(!sourceId||typeof decryptData!=='function')return null;
    const stored=await idbGet(sourceId);
    const key=activeKeyFor(originalClass);
    if(!stored?.encrypted||!key)return null;
    try{const source=await decryptData(stored.encrypted,key);return source&&typeof source==='object'?source:null;}catch{return null;}
  }
  function uniqueOverlayMatch(overlays,doc){
    const rows=Array.isArray(overlays)?overlays:[];
    const exact=rows.filter(row=>String(row?.documentId||'')===String(doc?.documentId||''));
    if(exact.length)return exact;

    const sourceId=String(doc?.sourceLocalId||doc?.protectedSourceId||'').trim();
    if(sourceId){
      const bySource=rows.filter(row=>String(row?.payload?.sourceFile?.sourceId||'').trim()===sourceId);
      const sourceDocIds=new Set(bySource.map(row=>String(row?.documentId||'')));
      if(bySource.length&&sourceDocIds.size<=1)return bySource;
    }

    const title=String(doc?.title||'').trim().toLowerCase();
    const category=String(doc?.category||'').trim().toLowerCase();
    const ref=String(doc?.originalReference||'').trim().toLowerCase();
    const candidates=rows.filter(row=>{
      const sameTitle=title&&String(row?.documentTitle||'').trim().toLowerCase()===title;
      const sameCategory=!category||String(row?.category||'').trim().toLowerCase()===category;
      const sameRef=ref&&String(row?.originalReference||'').trim().toLowerCase()===ref;
      return (sameTitle&&sameCategory)||sameRef;
    });
    const docIds=new Set(candidates.map(row=>String(row?.documentId||'')));
    return docIds.size<=1?candidates:[];
  }
  function mergeFields(primary=[],extra=[]){
    const out=[...(Array.isArray(primary)?primary:[])];
    const seen=new Set(out.map(f=>String(f?.label||'').trim().toLowerCase()));
    (Array.isArray(extra)?extra:[]).forEach(field=>{
      const key=String(field?.label||'').trim().toLowerCase();
      if(!key||seen.has(key))return;
      seen.add(key);out.push(field);
    });
    return out;
  }

  function installRestoreLinkageBridge(){
    const api=window.TEEStructuredDocumentsAPI;
    if(!api?.getReviewDataById||api.__teeRestoreLinkageV3437)return false;
    const originalGet=api.getReviewDataById.bind(api);
    const patched=async documentId=>{
      const review=await originalGet(documentId);
      if(review?.locked)return review;
      const doc=readStructuredIndex().find(row=>String(row?.documentId||'')===String(documentId||''));
      if(!doc)return review;

      let fields=Array.isArray(review?.fields)?review.fields:[];
      let images=Array.isArray(review?.images)?review.images:[];
      let sourceFile=review?.sourceFile||null;

      try{
        const vault=window.TEEStructuredDocumentVault;
        const all=await vault?.listOverlays?.()||[];
        const matches=uniqueOverlayMatch(all,doc);
        const layer=doc.originalClassification==='private'?'private':'shared';
        const preferred=matches.find(row=>row?.layer===layer)||matches[0]||null;
        if(preferred?.payload){
          fields=mergeFields(fields,preferred.payload.fields||[]);
          if(!images.length&&Array.isArray(preferred.payload.images))images=preferred.payload.images;
          if(!sourceFile&&preferred.payload.sourceFile)sourceFile=preferred.payload.sourceFile;
        }
      }catch{}

      const restoredSourceId=String(doc.sourceLocalId||doc.protectedSourceId||sourceFile?.sourceId||'').trim();
      if((!sourceFile||sourceFile?.kind===LARGE_SOURCE_KIND)&&restoredSourceId){
        const restored=await loadRestoredLargeSource(restoredSourceId,doc.originalClassification||review?.originalClassification||'shared');
        if(restored)sourceFile=restored;
      }

      const sourceEmbedded=!!(sourceFile&&String(sourceFile.dataUrl||'').trim());
      return {...review,fields,images,sourceFile,sourceEmbedded};
    };
    window.TEEStructuredDocumentsAPI=Object.freeze({...api,getReviewDataById:patched,__teeRestoreLinkageV3437:true});
    return true;
  }
  function scheduleRestoreBridge(){
    if(installRestoreLinkageBridge())return;
    let tries=0;
    const timer=setInterval(()=>{tries+=1;if(installRestoreLinkageBridge()||tries>80)clearInterval(timer);},100);
  }

  document.addEventListener('tee-runtime-ready',()=>{ensureItineraryType();setTimeout(ensureItineraryType,80);scheduleRestoreBridge();});
  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target:null;
    if(!target)return;
    if(target.closest('#streamAddDocument,#teeV3404BackToAdd'))setTimeout(ensureItineraryType,80);
    if(target.closest('#teeV3404Continue'))setTimeout(explainIfItinerary,80);
  },true);
  document.addEventListener('change',event=>{
    if(event.target?.id==='teeV3404Type')setTimeout(explainIfItinerary,0);
  });
  ensureItineraryType();
  scheduleRestoreBridge();
})();
