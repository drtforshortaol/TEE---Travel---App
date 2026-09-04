"use strict";

(function(){
  const STORAGE_KEY="teeStructuredDocumentsPublicV1";
  let started=false;

  function start(){
    if(started) return;
    const api=window.TEEStructuredDocumentsAPI;
    if(!api?.sourceManagerRecords){ setTimeout(start,150); return; }
    started=true;

    const norm=v=>String(v||"").trim().toLowerCase().replace(/\s+/g," ");
    const keyFor=r=>[norm(r.title),norm(r.category),norm(r.originalReference||r.sourceName)].join("||");
    const savedCount=r=>Number(r.publicItemCount||0)+Number(r.sharedItemCount||0)+Number(r.privateItemCount||0);
    const sameMoment=(a,b)=>String(a||"")===String(b||"");
    const vaultOpen=()=>window.TEEStructuredDocumentVault?.getState?.()==="unlocked";

    function classify(records){
      const groups=new Map();
      (records||[]).forEach(r=>{
        const key=keyFor(r);
        if(!groups.has(key)) groups.set(key,[]);
        groups.get(key).push(r);
      });
      for(const members of groups.values()){
        if(members.length<2) continue;
        const authorities=members
          .filter(r=>r.lifecycleStatus==="archived" && (!!r.verifiedAt || savedCount(r)>0))
          .sort((a,b)=>String(b.lastModifiedAt||b.archivedAt||"").localeCompare(String(a.lastModifiedAt||a.archivedAt||"")));
        if(authorities.length!==1) continue;
        const authority=authorities[0];
        authority.duplicateRole="authoritative";
        authority.relatedDuplicateCount=members.length-1;
        for(const r of members){
          if(r.documentId===authority.documentId) continue;
          const publicEmpty=savedCount(r)===0;
          const untouched=sameMoment(r.createdAt,r.lastModifiedAt);
          const safe=r.lifecycleStatus!=="archived" && !!r.needsAttention && !r.verifiedAt && publicEmpty && untouched && !!r.sourceReferenced;
          r.duplicateRole=safe?"safe-incomplete-duplicate":"related-duplicate";
          r.authoritativeDocumentId=authority.documentId;
        }
      }
      return records;
    }

    async function getClassified(){
      return classify(await api.sourceManagerRecords());
    }

    async function retireDuplicateById(documentId){
      const records=await getClassified();
      const target=records.find(r=>r.documentId===documentId);
      if(!target || target.duplicateRole!=="safe-incomplete-duplicate" || !target.authoritativeDocumentId){
        throw new Error("TEE did not confirm this record as a safe incomplete duplicate. Nothing was removed.");
      }
      const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
      const doc=Array.isArray(raw)?raw.find(x=>x.documentId===documentId):null;
      if(!doc) throw new Error("Duplicate record was not found in local storage.");
      const rawPublicCount=(Array.isArray(doc.publicFields)?doc.publicFields.length:0)+(Array.isArray(doc.publicImages)?doc.publicImages.length:0);
      const untouched=sameMoment(doc.createdAt,doc.lastModifiedAt);
      if(rawPublicCount!==0 || doc.verifiedAt || !untouched || doc.lifecycleStatus==="archived"){
        throw new Error("TEE found activity on this record, so it will not remove it automatically.");
      }
      if(vaultOpen()){
        try{ await window.TEEStructuredDocumentVault?.deleteOverlays?.(documentId); }
        catch(err){ throw new Error(`TEE could not remove the duplicate's protected overlay: ${err?.message||err}`); }
      }
      localStorage.setItem(STORAGE_KEY,JSON.stringify(raw.filter(x=>x.documentId!==documentId)));
      window.dispatchEvent(new CustomEvent("tee-structured-documents-changed"));
      return {removed:documentId,authority:target.authoritativeDocumentId};
    }

    let decorating=false;
    async function decorateOnce(){
      if(decorating) return;
      const list=document.getElementById("sourceManagerList");
      if(!list) return;
      decorating=true;
      try{
        const records=await getClassified();
        const byId=new Map(records.map(r=>[r.documentId,r]));
        for(const card of list.querySelectorAll(".source-manager-card[data-document-id]")){
          const r=byId.get(card.dataset.documentId);
          const actions=card.querySelector(".source-manager-actions");
          if(!r||!actions) continue;
          card.querySelectorAll("[data-tee-duplicate-action]").forEach(x=>x.remove());
          if(r.duplicateRole==="authoritative"){
            const badge=document.createElement("span");
            badge.dataset.teeDuplicateAction="authority";
            badge.className="source-manager-duplicate-note";
            badge.textContent=`Authoritative record · ${r.relatedDuplicateCount||0} related duplicate${r.relatedDuplicateCount===1?"":"s"}`;
            actions.prepend(badge);
          } else if(r.duplicateRole==="safe-incomplete-duplicate"){
            const btn=document.createElement("button");
            btn.type="button";
            btn.className="secondary";
            btn.dataset.teeDuplicateAction="remove";
            btn.textContent="Remove Duplicate";
            btn.addEventListener("click",async()=>{
              if(!window.confirm(`Remove this incomplete duplicate?\n\n${r.title}\n\nThe verified archived authoritative record and retained original will not be changed.`)) return;
              btn.disabled=true;
              try{
                await retireDuplicateById(r.documentId);
                setTimeout(()=>location.reload(),50);
              }catch(err){
                window.alert(err?.message||String(err));
                btn.disabled=false;
              }
            });
            actions.appendChild(btn);
          }
        }
      } finally { decorating=false; }
    }

    // Intentionally no MutationObserver: the previous observer could retrigger
    // itself while Source Document Manager was rebuilding the list and freeze Chrome.
    document.addEventListener("click",event=>{
      const target=event.target?.closest?.("button");
      if(!target) return;
      const id=target.id||"";
      if(["sourceManagerNeedsAttention","sourceManagerSaved","sourceManagerArchived","streamNeedsAttention","streamCompleted","streamDocumentLibrary"].includes(id)){
        setTimeout(decorateOnce,180);
      }
    },true);
    window.addEventListener("tee-structured-documents-changed",()=>setTimeout(decorateOnce,180));
    setTimeout(decorateOnce,300);
  }

  start();
})();

// iPhone/iPad full-PDF preview compatibility patch.
// The traveler review UI stores retained PDFs as large data URLs. Desktop browsers can
// open those directly in a new tab, but iOS Safari/PWA can ignore a very large data-URL
// link. Convert it to a Blob URL on the user's tap and navigate to the native PDF viewer.
(function(){
  function isPdfPreviewLink(anchor){
    if(!(anchor instanceof HTMLAnchorElement))return false;
    return String(anchor.textContent||"").trim().toLowerCase()==="open pdf preview";
  }

  function dataUrlToBlobUrl(dataUrl){
    const match=String(dataUrl||"").match(/^data:([^;,]+)?(;base64)?,(.*)$/s);
    if(!match)throw new Error("TEE could not read the retained PDF data.");
    const mime=match[1]||"application/pdf";
    const payload=match[3]||"";
    let bytes;
    if(match[2]){
      const binary=atob(payload);
      bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    }else{
      bytes=new TextEncoder().encode(decodeURIComponent(payload));
    }
    return URL.createObjectURL(new Blob([bytes],{type:mime}));
  }

  document.addEventListener("click",event=>{
    const target=event.target instanceof Element?event.target:null;
    const anchor=target?.closest("a");
    if(!isPdfPreviewLink(anchor))return;
    const href=anchor.getAttribute("href")||"";
    if(!href.startsWith("data:application/pdf"))return;

    event.preventDefault();
    event.stopImmediatePropagation();
    try{
      const blobUrl=dataUrlToBlobUrl(href);
      window.location.assign(blobUrl);
      setTimeout(()=>URL.revokeObjectURL(blobUrl),120000);
    }catch(error){
      console.error("TEE PDF preview:",error);
      window.alert("TEE could not open the full PDF on this device. Return to TEE, tap Refresh / Update, and try again.");
    }
  },true);
})();
