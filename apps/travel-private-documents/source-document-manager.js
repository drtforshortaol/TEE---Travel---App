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
  const classLabel=v=>v==="public"?"Public":v==="shared"?"Shared · both couples":"Private · owning couple";
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
  function countsText(r){
    const parts=[];
    if(r.publicItemCount) parts.push(`${r.publicItemCount} Public`);
    if(r.protectedCountsLocked) parts.push("Protected items available after unlock");
    else {
      if(r.sharedItemCount) parts.push(`${r.sharedItemCount} Shared`);
      if(r.privateItemCount) parts.push(`${r.privateItemCount} Private`);
    }
    return parts.length?parts.join(" · "):"No extracted fields/images counted";
  }
  function sourceStatus(r){
    if(r.sourceEmbedded) return `Retained original embedded locally${r.sourceBytes?` · ${Math.max(1,Math.round(r.sourceBytes/1024))} KB`:""}`;
    if(r.sourceReferenced) return "Original retained by reference; no embedded preview in this local copy";
    return "Original source missing — needs attention";
  }
  function processingStatus(r){
    if(r.lifecycleStatus==="archived") return "Archived";
    if(r.needsAttention) return "Needs Review";
    return "Structured";
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
    if(ui.structured) ui.structured.textContent=`Structured (${counts.structured})`;
    if(ui.archived) ui.archived.textContent=`Archived (${counts.archived})`;
    if(ui.all) ui.all.textContent=`All Sources (${counts.all})`;
    let shown=records;
    if(view==="needs") shown=records.filter(r=>r.needsAttention&&r.lifecycleStatus!=="archived");
    else if(view==="structured") shown=records.filter(r=>!r.needsAttention&&r.lifecycleStatus==="processed");
    else if(view==="archived") shown=records.filter(r=>r.lifecycleStatus==="archived");
    ui.list.replaceChildren();
    if(!shown.length){
      const msg=view==="needs"?"Nothing needs attention. Successfully structured sources are filed out of this default work queue.":view==="structured"?"No filed structured sources are available yet.":view==="archived"?"No source documents are archived.":"No source documents have been committed yet. Use Smart Document Intake to add one.";
      ui.list.innerHTML=`<p class="structured-empty">${msg}</p>`;
    }
    shown.forEach(r=>{
      const card=document.createElement("article"); card.className=`source-manager-card source-manager-${r.lifecycleStatus}`;
      const sourceAction=r.sourceReferenced||r.sourceEmbedded?`<button type="button" class="secondary" data-action="source">View Source</button>`:"";
      const lifecycleAction=r.lifecycleStatus==="archived"?`<button type="button" class="secondary" data-action="restore">Restore</button>`:`<button type="button" class="secondary" data-action="review">${r.needsAttention?"Mark Reviewed":"Needs Review"}</button><button type="button" class="secondary" data-action="archive">Archive</button>`;
      card.innerHTML=`
        <div class="source-manager-card-head">
          <div><h3>${esc(r.title)}</h3><p>${esc(r.category)} · ${esc(classLabel(r.originalClassification))}</p></div>
          <span class="source-manager-status ${r.needsAttention?"attention":r.lifecycleStatus}">${esc(processingStatus(r))}</span>
        </div>
        <div class="source-manager-facts">
          <div><span>Original</span><strong>${esc(r.sourceName||r.originalReference||"No source reference")}</strong></div>
          <div><span>Date added</span><strong>${esc(dateLabel(r.createdAt))}</strong></div>
          <div><span>Last reviewed / changed</span><strong>${esc(dateLabel(r.lastModifiedAt))}</strong></div>
          <div><span>TEE created</span><strong>1 structured document · ${esc(countsText(r))}</strong></div>
          <div><span>Linked destination</span><strong>${esc(destinationLabel(r.category))}</strong></div>
          <div><span>Original source status</span><strong>${esc(sourceStatus(r))}</strong></div>
        </div>
        <div class="source-manager-linkage"><strong>Source → Structured linkage</strong><span>${esc(r.sourceName||r.originalReference||"Original source")} → ${esc(r.title)} → ${esc(destinationLabel(r.category))}</span></div>
        <div class="source-manager-actions">
          ${sourceAction}
          <button type="button" class="secondary" data-action="structured">View Structured Record</button>
          <button type="button" class="secondary" data-action="edit">Review / Re-Structure</button>
          ${lifecycleAction}
          <button type="button" class="danger" data-action="delete">Delete</button>
        </div>`;
      card.querySelector('[data-action="source"]')?.addEventListener("click",()=>act(()=>a.focusDocument(r.documentId,true)));
      card.querySelector('[data-action="structured"]')?.addEventListener("click",()=>act(()=>a.focusDocument(r.documentId,false)));
      card.querySelector('[data-action="edit"]')?.addEventListener("click",()=>act(()=>a.editById(r.documentId)));
      card.querySelector('[data-action="archive"]')?.addEventListener("click",()=>act(()=>a.setLifecycleById(r.documentId,"archived")));
      card.querySelector('[data-action="restore"]')?.addEventListener("click",()=>act(()=>a.setLifecycleById(r.documentId,"processed")));
      card.querySelector('[data-action="review"]')?.addEventListener("click",()=>act(()=>a.setLifecycleById(r.documentId,r.needsAttention?"processed":"review")));
      card.querySelector('[data-action="delete"]')?.addEventListener("click",()=>act(()=>a.deleteById(r.documentId)));
      ui.list.appendChild(card);
    });
    const names={needs:"Needs Attention",structured:"Structured",archived:"Archived",all:"All Sources"};
    ui.summary.textContent=`${names[view]}: ${shown.length} shown · ${counts.needs} need attention · ${counts.structured} structured · ${counts.archived} archived · ${counts.all} total sources`;
  }

  ui.needs?.addEventListener("click",()=>setView("needs"));
  ui.structured?.addEventListener("click",()=>setView("structured"));
  ui.archived?.addEventListener("click",()=>setView("archived"));
  ui.all?.addEventListener("click",()=>setView("all"));
  window.addEventListener("tee-vault-state-changed",render);
  window.addEventListener("tee-structured-documents-changed",render);
  render();
})();
