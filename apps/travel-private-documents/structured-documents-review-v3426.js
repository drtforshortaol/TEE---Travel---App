"use strict";
(function(){
  const STORAGE_KEY='teeStructuredDocumentsPublicV1';
  const base=window.TEEStructuredDocumentsAPI;
  if(!base)return;

  const vault=()=>window.TEEStructuredDocumentVault||null;
  const vaultOpen=()=>vault()?.getState?.()==='unlocked';
  const activeProfile=()=>vault()?.getActiveProfileId?.()||null;
  const readStore=()=>{try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(x)?x:[];}catch{return [];}};
  const writeStore=records=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(records));window.dispatchEvent(new CustomEvent('tee-structured-documents-changed'));};
  const findField=(fields,label)=>{const key=String(label||'').trim().toLowerCase();return (fields||[]).find(f=>String(f?.label||'').trim().toLowerCase()===key);};
  const passportRequired=['Name','Passport number','Expiration date','Date of birth','Nationality'];

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
    const id=await base.commitSmartIntake(input);
    const now=new Date().toISOString();
    persistMetadata(id,{targetProfile:input?.targetProfile||null,lifecycleStatus:'review',verifiedAt:null,lastModifiedAt:now,archivedAt:null});
    return id;
  }

  async function getReviewDataById(documentId){
    let doc=readStore().find(x=>x.documentId===documentId);
    if(!doc)throw new Error('Saved document could not be found.');
    const protection=await loadProtected(documentId);
    const currentProfile=activeProfile();

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
        locked:true,fields:[],images:[],sourceFile:null,sourceEmbedded:false,completeness:{complete:false,missing:passportRequired.slice()}
      };
    }

    const shared=protection.shared||{};
    const priv=protection.priv||{};
    const fields=[...(doc.publicFields||[]),...(shared.fields||[]),...(priv.fields||[])];
    const images=[...(doc.publicImages||[]),...(shared.images||[]),...(priv.images||[])];
    const sourceFile=doc.originalClassification==='public'?doc.publicOriginalFile:doc.originalClassification==='shared'?shared.sourceFile:priv.sourceFile;
    const isPassport=/^passport\b/i.test(doc.title||'')||String(doc.category||'').toLowerCase()==='identity';
    const missing=isPassport?passportRequired.filter(label=>!String(findField(fields,label)?.value||'').trim()):[];

    return {
      documentId:doc.documentId,title:doc.title||'Document',category:doc.category||'',originalClassification:doc.originalClassification||'private',
      targetProfile:doc.targetProfile||null,requiredProfile,lifecycleStatus:doc.lifecycleStatus||'review',verifiedAt:doc.verifiedAt||null,
      locked:false,fields,images,sourceFile,sourceEmbedded:!!sourceFile?.dataUrl,
      completeness:{complete:isPassport?missing.length===0:true,missing}
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
      return {...row,targetProfile:doc.targetProfile||null,verifiedAt,lifecycleStatus,needsAttention:lifecycleStatus!=='archived'&&!verifiedAt};
    });
  }

  window.TEEStructuredDocumentsAPI=Object.freeze({
    ...base,
    commitSmartIntake,
    getReviewDataById,
    updateReviewFieldsById,
    verifyAndFinishById,
    sourceManagerRecords
  });
})();
