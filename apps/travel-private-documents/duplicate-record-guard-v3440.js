"use strict";

(function(){
  const STORAGE_KEY="teeStructuredDocumentsPublicV1";
  let started=false;

  function start(){
    if(started) return;
    const base=window.TEEStructuredDocumentsAPI;
    if(!base?.sourceManagerRecords){ setTimeout(start,120); return; }
    started=true;

    const norm=v=>String(v||"").trim().toLowerCase().replace(/\s+/g," ");
    const keyFor=r=>[norm(r.title),norm(r.category),norm(r.originalReference||r.sourceName)].join("||");
    const savedCount=r=>Number(r.publicItemCount||0)+Number(r.sharedItemCount||0)+Number(r.privateItemCount||0);
    const vaultOpen=()=>window.TEEStructuredDocumentVault?.getState?.()==="unlocked";
    const sameMoment=(a,b)=>String(a||"")===String(b||"");

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

    async function sourceManagerRecords(){
      const records=await base.sourceManagerRecords();
      return classify(records);
    }

    async function retireDuplicateById(documentId){
      const records=classify(await base.sourceManagerRecords());
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

      const next=raw.filter(x=>x.documentId!==documentId);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("tee-structured-documents-changed"));
      return {removed:documentId,authority:target.authoritativeDocumentId,overlayCleanup:vaultOpen()?"done":"not-needed-for-index-cleanup"};
    }

    window.TEEStructuredDocumentsAPI=Object.freeze({...base,sourceManagerRecords,retireDuplicateById});

    let decorating=false;
    let observer=null;
    async function decorate(){
      if(decorating) return;
      const list=document.getElementById("sourceManagerList");
      if(!list) return;
      decorating=true;
      observer?.disconnect();
      try{
        const records=await sourceManagerRecords();
        const byId=new Map(records.map(r=>[r.documentId,r]));
        list.querySelectorAll(".source-manager-card[data-document-id]").forEach(card=>{
          const r=byId.get(card.dataset.documentId);
          card.querySelectorAll("[data-tee-duplicate-action]").forEach(x=>x.remove());
          const actions=card.querySelector(".source-manager-actions");
          if(!r||!actions) return;
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
              const ok=window.confirm(`Remove this incomplete duplicate?\n\n${r.title}\n\nTEE found a separate verified archived authoritative record for the same retained source. This duplicate has never been verified or edited. The authoritative record and retained original will not be changed.`);
              if(!ok) return;
              btn.disabled=true;
              try{ await retireDuplicateById(r.documentId); }
              catch(err){ window.alert(err?.message||String(err)); btn.disabled=false; }
            });
            actions.appendChild(btn);
          }
        });
      } finally {
        decorating=false;
        if(observer && document.getElementById("sourceManagerList")===list){
          observer.observe(list,{childList:true,subtree:true});
        }
      }
    }

    function attachDecorator(){
      const list=document.getElementById("sourceManagerList");
      if(!list){ setTimeout(attachDecorator,150); return; }
      observer=new MutationObserver(()=>{
        if(!decorating) queueMicrotask(decorate);
      });
      observer.observe(list,{childList:true,subtree:true});
      window.addEventListener("tee-structured-documents-changed",()=>queueMicrotask(decorate));
      queueMicrotask(decorate);
    }
    attachDecorator();
  }

  start();
})();
