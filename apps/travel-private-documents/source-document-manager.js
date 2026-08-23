"use strict";

(function(){
  const ui={
    root:document.getElementById("teeSourceDocumentManager"),
    list:document.getElementById("sourceManagerList"),
    summary:document.getElementById("sourceManagerSummary"),
    needs:document.getElementById("sourceManagerNeeds"),
    structured:document.getElementById("sourceManagerStructured"),
    archived:document.getElementById("sourceManagerArchived"),
    all:document.getElementById("sourceManagerAll")
  };
  if(!ui.root||!ui.list) return;
  window.TEESourceDocumentManagerActive=true;
  let view="needs";
  let busy=false;

  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dateLabel=v=>{ if(!v)return "—"; const d=new Date(v); return Number.isNaN(d.getTime())?"—":d.toLocaleString(); };
  const classLabel=(v,targetProfile)=>v==="public"?"Public":v==="shared"?"Shared · both couples":targetProfile==="coupleB"?"Private · Couple B only":targetProfile==="coupleA"?"Private · Couple A only":"Private · owning couple";
  const syncTarget=r=>r.originalClassification==="shared"?"shared":r.targetProfile||window.TEEStructuredDocumentVault?.getActiveProfileId?.()||"coupleA";
  const destinationLabel=category=>{
    const c=String(category||"").toLowerCase();
    if(/flight|air|transport/.test(c)) return "Transportation / Flights";
    if(/rail|train/.test(c)) return "Transportation / Rail";
    if(/hotel|lodg/.test(c)) return "Hotels";
    if(/identity|passport|global/.test(c)) return "Essentials / Identity";
    if(/insurance/.test(c)) return "Insurance";
    if(/cost|expense|money/.test(c)) return "Costs / Money";
    if(/phone|data/.test(c)) return "Essentials / Phone & Data";
    if(/emergency|contact|people/.test(c)) return "Essentials / Emergency";
    return category||"Structured Documents";
  };

  function api(){ return window.TEEStructuredDocumentsAPI||null; }
  function setView(next){ view=next; render(); }
  function buttonState(){
    [[ui.needs,"needs"],[ui.structured,"structured"],[ui.archived,"archived"],[ui.all,"all"]].forEach(([b,k])=>{ if(!b)return; b.classList.toggle("active",view===k); b.setAttribute("aria-pressed",view===k?"true":"false"); });
  }
  function owningCoupleLabel(r){ return r.requiredProfile==="coupleB"?"Couple B":r.requiredProfile==="coupleA"?"Couple A":"the owning couple"; }
  function countsText(r){
    if(r.protectedCountsLocked) return `🔒 Protected saved information — authorize ${owningCoupleLabel(r)} to review`;
    const fields=Number(r.visibleFieldCount||0), images=Number(r.visibleImageCount||0);
    const parts=[];
    if(fields)parts.push(`${fields} saved field${fields===1?"":"s"}`);
    if(images)parts.push(`${images} saved image${images===1?"":"s"}`);
    return parts.length?parts.join(" · "):"No saved details yet — verification cannot finish";
  }
  function sourceStatus(r){
    if(r.sourceAccessLocked){
      if(r.sourceStorageState==="protected-embedded") return `🔒 Protected original retained locally${r.sourceStorageBytes?` · ${Math.max(1,Math.round(r.sourceStorageBytes/1024))} KB`:""} — authorize ${owningCoupleLabel(r)} to view`;
      if(r.sourceStorageState==="reference") return `🔒 Protected original is reference-only — authorize ${owningCoupleLabel(r)} to review`;
      return `🔒 Protected original status hidden while ${owningCoupleLabel(r)} is locked — authorize to confirm retention`;
    }
    if(r.sourceEmbedded) return `Retained original embedded locally${r.sourceBytes?` · ${Math.max(1,Math.round(r.sourceBytes/1024))} KB`:""}`;
    if(r.sourceReferenced) return "Original retained by reference; no embedded preview in this local copy";
    return "🔴 Original document unavailable — needs attention";
  }
  function processingStatus(r){
    if(r.lifecycleStatus==="archived") return r.verifiedAt?"Verified · Finished":r.archiveDisposition==="incomplete"?"Archived · Incomplete":"Archived";
    if(!r.verifiedAt) return "Verification Required";
    if(r.needsAttention) return "Needs Attention";
    return "Saved";
  }

  async function act(fn){
    if(busy)return; busy=true;
    try{ await fn(); await render(); }
    catch(err){ ui.summary.textContent=err?.message||String(err); }
    finally{ busy=false; }
  }

  async function render(){
    const a=api();
    if(!a?.sourceManagerRecords){ ui.list.innerHTML='<p class="structured-empty">Source manager is waiting for the Structured Documents engine. Reload TEE if this remains visible.</p>'; return; }
    buttonState();
    let records=[];
    try{ records=await a.sourceManagerRecords(); }catch(err){ ui.summary.textContent=err?.message||String(err); return; }
    const counts={needs:records.filter(r=>r.needsAttention&&r.lifecycleStatus!=="archived").length,structured:records.filter(r=>!r.needsAttention&&r.lifecycleStatus==="processed").length,archived:records.filter(r=>r.lifecycleStatus==="archived").length,all:records.length};
    if(ui.needs) ui.needs.textContent=`Needs Attention (${counts.needs})`;
    if(ui.structured) ui.structured.textContent=`Saved Documents (${counts.structured})`;
    if(ui.archived) ui.archived.textContent=`Archived (${counts.archived})`;
    if(ui.all) ui.all.textContent=`All Sources (${counts.all})`;
    let shown=records;
    if(view==="needs") shown=records.filter(r=>r.needsAttention&&r.lifecycleStatus!=="archived");
    else if(view==="structured") shown=records.filter(r=>!r.needsAttention&&r.lifecycleStatus==="processed");
    else if(view==="archived") shown=records.filter(r=>r.lifecycleStatus==="archived");
    ui.list.replaceChildren();
    if(!shown.length){
      const msg=view==="needs"?"Nothing needs attention.":view==="structured"?"No saved documents are waiting for final review.":view==="archived"?"No source documents are archived.":"No source documents have been saved yet. Use Add Document to add one.";
      ui.list.innerHTML=`<p class="structured-empty">${msg}</p>`;
    }
    shown.forEach(r=>{
      const card=document.createElement("article"); card.className=`source-manager-card source-manager-${r.lifecycleStatus}`; card.dataset.documentId=r.documentId;
      const reviewAction=r.sourceReferenced||r.sourceEmbedded?`<button type="button" data-action="verify">Review &amp; Verify</button>`:`<button type="button" class="secondary" data-action="structured">View Saved Information</button>`;
      const lifecycleAction=r.lifecycleStatus==="archived"?`<button type="button" class="secondary" data-action="restore">Restore</button>`:(r.verifiedAt?`<button type="button" class="secondary" data-action="archive">Archive</button>`:`<button type="button" class="secondary" data-action="archive-incomplete">Archive Incomplete</button>`);
      card.innerHTML=`
        <div class="source-manager-card-head">
          <div><h3>${esc(r.title)}</h3><p>${esc(r.category)} · ${esc(classLabel(r.originalClassification,r.targetProfile))}</p></div>
          <span class="source-manager-status ${r.needsAttention?"attention":r.lifecycleStatus}">${esc(processingStatus(r))}</span>
        </div>
        <div class="source-manager-facts">
          <div><span>Original</span><strong>${esc(r.sourceName||r.originalReference||"No source reference")}</strong></div>
          <div><span>Date added</span><strong>${esc(dateLabel(r.createdAt))}</strong></div>
          <div><span>Last reviewed / changed</span><strong>${esc(dateLabel(r.lastModifiedAt))}</strong></div>
          <div><span>Saved information</span><strong>${esc(countsText(r))}</strong></div>
          <div><span>TEE section</span><strong>${esc(destinationLabel(r.category))}</strong></div>
          <div><span>Original document</span><strong>${esc(sourceStatus(r))}</strong></div>
        </div>
        <div class="source-manager-linkage"><strong>Source → Structured linkage</strong><span>${esc(r.sourceName||r.originalReference||"Original source")} → ${esc(r.title)} → ${esc(destinationLabel(r.category))}</span></div>
        <div class="source-manager-actions">
          ${reviewAction}
          <button type="button" class="secondary" data-action="edit">Edit Document</button>
          ${lifecycleAction}
        </div>`;
      card.querySelector('[data-action="verify"]')?.addEventListener("click",()=>{
        if(window.TEETravelerReviewDocumentV3410)return window.TEETravelerReviewDocumentV3410(r.documentId);
        if(window.TEETravelerReviewDocumentV3409)return window.TEETravelerReviewDocumentV3409(r.documentId);
        if(window.TEETravelerReviewDocumentV3407)return window.TEETravelerReviewDocumentV3407(r.documentId);
        if(window.TEETravelerReviewDocumentV3406)return window.TEETravelerReviewDocumentV3406(r.documentId);
        return act(()=>a.focusDocument(r.documentId,true));
      });
      card.querySelector('[data-action="structured"]')?.addEventListener("click",()=>{
        if(window.TEETravelerReviewDocumentV3410)return window.TEETravelerReviewDocumentV3410(r.documentId);
        if(window.TEETravelerReviewDocumentV3409)return window.TEETravelerReviewDocumentV3409(r.documentId);
        if(window.TEETravelerReviewDocumentV3407)return window.TEETravelerReviewDocumentV3407(r.documentId);
        if(window.TEETravelerReviewDocumentV3406)return window.TEETravelerReviewDocumentV3406(r.documentId);
        return act(()=>a.focusDocument(r.documentId,false));
      });
      card.querySelector('[data-action="edit"]')?.addEventListener("click",()=>{
        if(window.TEETravelerEditDocumentV3410)return window.TEETravelerEditDocumentV3410(r.documentId);
        if(window.TEETravelerEditDocumentV3409)return window.TEETravelerEditDocumentV3409(r.documentId);
        if(window.TEETravelerEditDocumentV3407)return window.TEETravelerEditDocumentV3407(r.documentId);
        return act(()=>a.editById(r.documentId));
      });
      card.querySelector('[data-action="archive"]')?.addEventListener("click",()=>act(async()=>{await a.setLifecycleById(r.documentId,"archived");window.TEESyncFoundationV3404?.recordLocalChange?.({action:"archive",documentId:r.documentId,target:syncTarget(r),category:r.category});}));
      card.querySelector('[data-action="archive-incomplete"]')?.addEventListener("click",()=>act(async()=>{
        const ok=window.confirm(`Archive this unfinished test/abandoned document?\n\n${r.title}\n\nIt will remain recoverable and will NOT be marked Verified or Finished.`);
        if(!ok)return;
        await a.archiveIncompleteById(r.documentId);
      }));
      card.querySelector('[data-action="restore"]')?.addEventListener("click",()=>act(async()=>{await a.setLifecycleById(r.documentId,"processed");window.TEESyncFoundationV3404?.recordLocalChange?.({action:"restore",documentId:r.documentId,target:syncTarget(r),category:r.category});}));
      ui.list.appendChild(card);
    });
    const names={needs:"Needs Attention",structured:"Saved Documents",archived:"Archived",all:"All Sources"};
    ui.summary.textContent=`${names[view]}: ${shown.length} shown · ${counts.needs} need attention · ${counts.structured} saved · ${counts.archived} archived · ${counts.all} total sources`;
  }

  ui.needs?.addEventListener("click",()=>setView("needs"));
  ui.structured?.addEventListener("click",()=>setView("structured"));
  ui.archived?.addEventListener("click",()=>setView("archived"));
  ui.all?.addEventListener("click",()=>setView("all"));
  window.addEventListener("tee-vault-state-changed",render);
  window.addEventListener("tee-structured-documents-changed",render);
  render();
})();
