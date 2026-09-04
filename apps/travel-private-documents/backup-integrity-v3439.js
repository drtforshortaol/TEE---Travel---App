"use strict";
(function(){
  const BUILD="3.4.40";
  const STRUCTURED_KEY="teeStructuredDocumentsPublicV1";
  const INTEGRITY_ID="teeSourceBackupIntegrityV3439";

  function readDocs(){
    try{
      const rows=JSON.parse(localStorage.getItem(STRUCTURED_KEY)||"[]");
      return Array.isArray(rows)?rows:[];
    }catch{return [];}
  }
  function vaultOpen(){return typeof getVaultState==="function"&&getVaultState()==="unlocked";}
  function activeProfile(){return window.TEEStructuredDocumentVault?.getActiveProfileId?.()||null;}
  function normalize(value){return String(value||"").trim();}
  function isItinerary(doc){return /^itinerary\b/i.test(normalize(doc?.title))||normalize(doc?.category).toLowerCase()==="itinerary";}
  function expectedLayer(doc){
    if(doc?.originalClassification==="shared")return "shared";
    if(doc?.originalClassification==="private")return "private";
    return null;
  }
  function checkable(doc){
    if(!doc?.hasProtected)return false;
    if(doc.originalClassification!=="private")return true;
    return !doc.targetProfile||doc.targetProfile===activeProfile();
  }

  async function inspect(){
    const docs=readDocs();
    const protectedDocs=docs.filter(doc=>doc?.hasProtected);
    if(!vaultOpen())return {ok:false,locked:true,docs,protectedDocs,checked:[],issues:[]};
    let overlays=[];
    try{overlays=await window.TEEStructuredDocumentVault?.listOverlays?.()||[];}catch{}
    const checked=protectedDocs.filter(checkable);
    const issues=[];
    checked.forEach(doc=>{
      const rows=overlays.filter(row=>normalize(row?.documentId)===normalize(doc?.documentId));
      const layer=expectedLayer(doc);
      const relevant=layer?rows.filter(row=>row?.layer===layer):rows;
      if(!relevant.length){
        issues.push({kind:"missing-overlay",doc,message:"protected saved-information record is missing"});
        return;
      }
      if(doc.sourceStorage==="encrypted-large-local"&&doc.sourceLocalId){
        const linked=relevant.some(row=>normalize(row?.payload?.sourceFile?.sourceId)===normalize(doc.sourceLocalId));
        if(!linked)issues.push({kind:"missing-source-link",doc,message:"encrypted original is not linked from the protected saved-information record"});
      }
      if(isItinerary(doc)){
        const fields=relevant.flatMap(row=>Array.isArray(row?.payload?.fields)?row.payload.fields:[]).filter(field=>normalize(field?.value));
        if(!fields.length)issues.push({kind:"missing-itinerary-details",doc,message:"itinerary has an original but no protected saved details"});
      }
    });
    return {ok:issues.length===0,locked:false,docs,protectedDocs,checked,issues,overlays};
  }

  function issueSummary(result){
    if(result.locked)return "Unlock the Secure Vault to verify protected Source Documents before making a backup.";
    if(result.ok)return `PASS — ${result.checked.length} protected Source Document${result.checked.length===1?"":"s"} checked; protected saved-information linkage is present.`;
    return `BLOCKED — ${result.issues.length} protected Source Document backup-integrity issue${result.issues.length===1?"":"s"}: `+result.issues.map(x=>`${x.doc?.title||"Untitled"}: ${x.message}`).join(" · ");
  }
  function show(result){
    const text=issueSummary(result);
    let box=document.getElementById(INTEGRITY_ID);
    if(!box){
      box=document.createElement("div");
      box.id=INTEGRITY_ID;
      box.style.cssText="margin:12px 0;padding:12px 14px;border-radius:10px;font-weight:700;line-height:1.45";
      const anchor=document.querySelector(".secure-backup-tools")||document.getElementById("secureVaultPanel")||document.querySelector("main");
      anchor?.prepend(box);
    }
    if(box){
      box.textContent=`Source Documents backup integrity: ${text}`;
      box.style.background=result.ok?"#e9f7ee":result.locked?"#fff6d9":"#fff0f0";
      box.style.border=`2px solid ${result.ok?"#23834a":result.locked?"#b98514":"#b42318"}`;
      box.style.color=result.ok?"#14532d":result.locked?"#704b00":"#8a1515";
    }
    return text;
  }

  async function runAndShow(){const result=await inspect();show(result);return result;}

  async function guardedExport(event){
    const target=event.target instanceof Element?event.target.closest("#secureExportButton,#travelerActionPrimary"):null;
    if(!target)return;
    const action=new URLSearchParams(location.search).get("teeAction");
    if(target.id==="travelerActionPrimary"&&action!=="backup")return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const result=await runAndShow();
    if(result.locked){
      if(typeof setSecureMessage==="function")setSecureMessage("Unlock the Secure Vault before exporting. TEE must verify that protected Source Documents are actually present in the encrypted vault.","error");
      return;
    }
    if(!result.ok){
      if(typeof setSecureMessage==="function")setSecureMessage("Backup blocked: Source Documents backup integrity did not pass. Nothing was exported.","error");
      return;
    }
    try{
      if(typeof persistActiveVaultData==="function")await persistActiveVaultData();
      if(typeof publishAuthorizedSession==="function")publishAuthorizedSession();
      if(typeof handleEncryptedExport!=="function")throw new Error("TEE backup exporter is unavailable.");
      handleEncryptedExport();
      if(typeof setSecureMessage==="function")setSecureMessage("Encrypted backup exported after Source Documents integrity passed.","success");
    }catch(error){
      if(typeof setSecureMessage==="function")setSecureMessage(error?.message||"Unable to export the encrypted backup.","error");
    }
  }

  document.addEventListener("click",guardedExport,true);
  document.addEventListener("tee-vault-state-changed",()=>setTimeout(runAndShow,60));
  document.addEventListener("tee-structured-documents-changed",()=>setTimeout(runAndShow,60));
  window.TEEBackupIntegrityV3439=Object.freeze({build:BUILD,inspect,runAndShow});
  setTimeout(runAndShow,250);
})();

(function loadDuplicateGuardV3440(){
  if(window.TEEDuplicateRecordGuardV3440Loaded) return;
  window.TEEDuplicateRecordGuardV3440Loaded=true;
  const script=document.createElement("script");
  script.src="duplicate-record-guard-v3440.js?v=3440";
  script.async=false;
  document.head.appendChild(script);
})();
