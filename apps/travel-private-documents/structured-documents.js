"use strict";

(function(){
  const STORAGE_KEY = "teeStructuredDocumentsPublicV1";
  const MAX_IMAGE_BYTES = 700 * 1024;
  const MAX_SOURCE_BYTES = 2.25 * 1024 * 1024;
  const root = document.getElementById("structuredDocumentsWorkspace");
  if (!root) return;

  const $ = id => document.getElementById(id);
  const ui = {
    list: $("structuredDocumentList"), summary: $("structuredDocumentSummary"), newButton: $("structuredDocumentNew"),
    refreshButton: $("structuredDocumentRefresh"), dialog: $("structuredDocumentDialog"), form: $("structuredDocumentForm"),
    title: $("structuredDocumentTitle"), category: $("structuredDocumentCategory"), originalClass: $("structuredOriginalClass"),
    originalRef: $("structuredOriginalRef"), originalFile: $("structuredOriginalFile"), originalFileStatus: $("structuredOriginalFileStatus"), originalFileRemove: $("structuredOriginalFileRemove"), fields: $("structuredFieldRows"), images: $("structuredImageRows"),
    addField: $("structuredAddField"), addImage: $("structuredAddImage"), close: $("structuredDocumentClose"),
    message: $("structuredDocumentMessage"), dialogHeading: $("structuredDocumentDialogHeading"),
    viewReview: $("structuredViewReview"), viewRecent: $("structuredViewRecent"), viewAll: $("structuredViewAll"), viewArchived: $("structuredViewArchived"),
    workspaceToggle: $("structuredDocumentsToggle"), workspaceContent: $("structuredDocumentsContent"), workspaceCollapse: $("structuredDocumentsCollapse")
  };

  let editingId = null;
  let pendingOriginalFile = null;
  let currentView = "review";
  let lastActionMessage = "";
  const expandedSources = new Set();


  function setWorkspaceExpanded(expanded){
    if(!ui.workspaceContent || !ui.workspaceToggle) return;
    ui.workspaceContent.hidden=!expanded;
    root.classList.toggle("structured-documents-collapsed",!expanded);
    ui.workspaceToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    ui.workspaceToggle.textContent=expanded ? "Collapse Structured Documents" : "Structured Documents";
    if(expanded) render();
  }

  function uid(){ return crypto.randomUUID ? crypto.randomUUID() : `doc-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
  function readStore(){ try { const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"); return Array.isArray(x)?x:[]; } catch { return []; } }
  function writeStore(records){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent("tee-structured-documents-changed"));
  }
  function esc(v){ return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function accessLabel(v){ return v==="private"?"Private · owning couple":v==="shared"?"Shared · both couples":"Public · open"; }
  function lifecycleStatus(doc){ return ["review","processed","archived"].includes(doc?.lifecycleStatus)?doc.lifecycleStatus:"processed"; }
  function lifecycleLabel(doc){ const status=lifecycleStatus(doc); return status==="review"?"Needs review":status==="archived"?"Archived":"Structured & filed"; }
  function bridge(){ return window.TEEStructuredDocumentVault || null; }
  function vaultOpen(){ return bridge()?.getState?.()==="unlocked"; }

  function fieldRow(seed={}){
    const row=document.createElement("div"); row.className="structured-editor-row structured-field-row";
    row.innerHTML=`<input data-role="label" type="text" placeholder="Field label" value="${esc(seed.label||"")}"><textarea data-role="value" rows="2" placeholder="Value or extracted text">${esc(seed.value||"")}</textarea><select data-role="access"><option value="public">Public</option><option value="shared">Shared</option><option value="private">Private</option></select><button type="button" class="secondary" data-role="remove">Remove</button>`;
    row.querySelector('[data-role="access"]').value=seed.access||"public";
    row.querySelector('[data-role="remove"]').addEventListener("click",()=>row.remove());
    ui.fields.appendChild(row);
  }

  function imageRow(seed={}){
    const row=document.createElement("div"); row.className="structured-editor-row structured-image-row";
    row.dataset.dataUrl=seed.dataUrl||""; row.dataset.mime=seed.mime||"";
    row.innerHTML=`<input data-role="caption" type="text" placeholder="Image caption" value="${esc(seed.caption||"")}"><input data-role="file" type="file" accept="image/*"><select data-role="access"><option value="public">Public</option><option value="shared">Shared</option><option value="private">Private</option></select><span data-role="status">${seed.dataUrl?"Image loaded":"Choose image"}</span><button type="button" class="secondary" data-role="remove">Remove</button>`;
    row.querySelector('[data-role="access"]').value=seed.access||"public";
    row.querySelector('[data-role="remove"]').addEventListener("click",()=>row.remove());
    row.querySelector('[data-role="file"]').addEventListener("change", async e=>{
      const file=e.target.files?.[0]; if(!file) return;
      const status=row.querySelector('[data-role="status"]'); status.textContent="Preparing…";
      try { const prepared=await prepareImage(file); row.dataset.dataUrl=prepared.dataUrl; row.dataset.mime=prepared.mime; status.textContent=`Integrated · ${Math.round(prepared.bytes/1024)} KB`; }
      catch(err){ row.dataset.dataUrl=""; status.textContent=err.message||"Image failed"; }
    });
    ui.images.appendChild(row);
  }

  async function prepareImage(file){
    if(!file.type.startsWith("image/")) throw new Error("Image files only.");
    const raw=await file.arrayBuffer();
    if(raw.byteLength<=MAX_IMAGE_BYTES) return {dataUrl:await fileToDataUrl(file),mime:file.type,bytes:raw.byteLength};
    const bitmap=await createImageBitmap(file); const max=1280; const scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height));
    const canvas=document.createElement("canvas"); canvas.width=Math.max(1,Math.round(bitmap.width*scale)); canvas.height=Math.max(1,Math.round(bitmap.height*scale));
    canvas.getContext("2d").drawImage(bitmap,0,0,canvas.width,canvas.height); bitmap.close?.();
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/jpeg",0.78));
    if(!blob) throw new Error("Unable to prepare image.");
    if(blob.size>MAX_IMAGE_BYTES) throw new Error("Image remains too large for encrypted local storage. Keep the original separately and use a smaller reference image.");
    return {dataUrl:await fileToDataUrl(blob),mime:"image/jpeg",bytes:blob.size};
  }
  function fileToDataUrl(file){ return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=()=>reject(r.error); r.readAsDataURL(file); }); }

  function sourceLabel(source){
    if(!source) return "No uploaded original.";
    const kb=Math.max(1,Math.round((source.bytes||0)/1024));
    return `${source.name||"Original document"} · ${kb} KB · ${source.type||"file"}`;
  }

  async function prepareSourceFile(file){
    const allowed=new Set(["application/pdf","image/jpeg","image/png","image/webp"]);
    if(!allowed.has(file.type)) throw new Error("Choose a PDF, JPEG, PNG, or WebP file.");
    if(file.size>MAX_SOURCE_BYTES) throw new Error(`This original is ${Math.round(file.size/1024)} KB. v3.3.41 stores originals up to ${Math.round(MAX_SOURCE_BYTES/1024)} KB inside the local protected record. Keep larger originals in the secure source archive for now.`);
    return {name:file.name,type:file.type,bytes:file.size,dataUrl:await fileToDataUrl(file),addedAt:new Date().toISOString()};
  }

  function updateSourceStatus(){
    ui.originalFileStatus.textContent=sourceLabel(pendingOriginalFile);
    ui.originalFileRemove.disabled=!pendingOriginalFile;
  }

  function sourceView(source){
    if(!source?.dataUrl) return "";
    if(String(source.type).startsWith("image/")) return `<figure class="structured-original-preview"><img src="${esc(source.dataUrl)}" alt="${esc(source.name||"Original document")}"><figcaption>${esc(source.name||"Original image")}</figcaption></figure>`;
    return `<a class="structured-source-open" href="${esc(source.dataUrl)}" target="_blank" rel="noopener">Open protected original PDF</a>`;
  }

  function openEditor(doc=null){
    editingId=doc?.documentId||null; ui.form.reset(); ui.fields.replaceChildren(); ui.images.replaceChildren();
    pendingOriginalFile=doc?.draftOriginalFile||doc?.publicOriginalFile||null; updateSourceStatus();
    ui.dialogHeading.textContent=doc?"Edit structured document":"New structured document";
    ui.title.value=doc?.title||""; ui.category.value=doc?.category||""; ui.originalClass.value=doc?.originalClassification||"private"; ui.originalRef.value=doc?.originalReference||"";
    (doc?.draftFields||[{label:"",value:"",access:"public"}]).forEach(fieldRow);
    (doc?.draftImages||[]).forEach(imageRow);
    ui.message.textContent=""; ui.dialog.showModal?.(); if(!ui.dialog.open) ui.dialog.setAttribute("open","");
  }

  async function collectEditor(){
    const fields=[...ui.fields.querySelectorAll('.structured-field-row')].map(row=>({label:row.querySelector('[data-role="label"]').value.trim(),value:row.querySelector('[data-role="value"]').value.trim(),access:row.querySelector('[data-role="access"]').value})).filter(x=>x.label||x.value);
    const images=[...ui.images.querySelectorAll('.structured-image-row')].map(row=>({caption:row.querySelector('[data-role="caption"]').value.trim(),dataUrl:row.dataset.dataUrl||"",mime:row.dataset.mime||"",access:row.querySelector('[data-role="access"]').value})).filter(x=>x.dataUrl);
    return {fields,images};
  }

  async function saveDocument(event){
    event.preventDefault();
    const title=ui.title.value.trim(); if(!title){ui.message.textContent="Enter a document title.";return;}
    const content=await collectEditor();
    const protectedItems=[...content.fields,...content.images].filter(x=>x.access!=="public");
    if(protectedItems.length && !vaultOpen()){ui.message.textContent="Unlock the Secure Vault before saving Shared or Private fields/images.";return;}
    const documentId=editingId||uid(); const now=new Date().toISOString();
    const publicFields=content.fields.filter(x=>x.access==="public"); const publicImages=content.images.filter(x=>x.access==="public");
    const sharedFields=content.fields.filter(x=>x.access==="shared"); const sharedImages=content.images.filter(x=>x.access==="shared");
    const privateFields=content.fields.filter(x=>x.access==="private"); const privateImages=content.images.filter(x=>x.access==="private");
    const store=readStore(); const previous=store.find(x=>x.documentId===documentId);
    const originalClass=ui.originalClass.value;
    const publicOriginalFile=originalClass==="public"?pendingOriginalFile:null;
    const sharedOriginalFile=originalClass==="shared"?pendingOriginalFile:null;
    const privateOriginalFile=originalClass==="private"?pendingOriginalFile:null;
    const priorStatus=previous?lifecycleStatus(previous):"processed";
    const base={documentId,title,category:ui.category.value.trim(),originalClassification:originalClass,originalReference:ui.originalRef.value.trim()||pendingOriginalFile?.name||"",publicFields,publicImages,publicOriginalFile,hasProtected:(sharedFields.length+sharedImages.length+privateFields.length+privateImages.length)>0||originalClass!=="public",createdAt:previous?.createdAt||now,lastModifiedAt:now,lifecycleStatus:priorStatus,processedAt:previous?.processedAt||now,archivedAt:previous?.archivedAt||null,sourceArchived:true};
    const next=store.filter(x=>x.documentId!==documentId); next.push(base); writeStore(next);
    try{
      if(vaultOpen()){
        await bridge().saveOverlay({documentId,title,category:base.category,layer:"shared",payload:{fields:sharedFields,images:sharedImages,sourceFile:sharedOriginalFile},originalReference:originalClass==="shared"?(ui.originalRef.value.trim()||pendingOriginalFile?.name||""):""});
        await bridge().saveOverlay({documentId,title,category:base.category,layer:"private",payload:{fields:privateFields,images:privateImages,sourceFile:privateOriginalFile},originalReference:originalClass==="private"?(ui.originalRef.value.trim()||pendingOriginalFile?.name||""):""});
      }
      ui.dialog.close?.(); editingId=null; lastActionMessage=`✓ “${title}” structured and filed. It is now out of the default Needs Review view; use Recently Structured or All Structured to call it back up.`; await render();
    }catch(err){ ui.message.textContent=err.message||String(err); }
  }

  async function deleteDocument(doc){
    const warning = doc.hasProtected
      ? `Delete “${doc.title}” from Structured Documents? This removes its saved public projection and the protected Shared/Private layers available in the currently unlocked vault. This cannot be undone.`
      : `Delete “${doc.title}” from Structured Documents? This cannot be undone.`;
    if(!window.confirm(warning)) return;
    try{
      if(doc.hasProtected){
        if(!vaultOpen()) throw new Error("Unlock the Secure Vault before deleting a document that has Shared or Private content.");
        await bridge()?.deleteOverlays?.(doc.documentId);
      }
      const next=readStore().filter(x=>x.documentId!==doc.documentId);
      writeStore(next);
      await render();
      ui.summary.textContent=`✓ Deleted “${doc.title}”. ${next.length} structured document${next.length===1?"":"s"} remain.`;
    }catch(err){ui.summary.textContent=err.message||String(err);}
  }

  function updateLifecycle(documentId,status){
    const now=new Date().toISOString();
    const records=readStore().map(doc=>{
      if(doc.documentId!==documentId) return doc;
      return {...doc,lifecycleStatus:status,lastModifiedAt:now,processedAt:status==="processed"?(doc.processedAt||now):doc.processedAt||null,archivedAt:status==="archived"?now:null};
    });
    writeStore(records);
    expandedSources.delete(documentId);
    lastActionMessage=status==="archived"?"✓ Structured document archived. Its record and protected source remain retained and can be recalled from Archived.":status==="review"?"Moved to Needs Review.":"✓ Review complete. Structured document filed for normal use.";
    render();
  }

  function setView(view){
    currentView=view;
    lastActionMessage="";
    render();
  }

  function renderLayerItems(fields=[],images=[],className=""){
    const parts=[];
    fields.forEach(f=>parts.push(`<div class="structured-value ${className}"><span>${esc(f.label||"Field")}</span><strong>${esc(f.value||"")}</strong></div>`));
    images.forEach(img=>parts.push(`<figure class="structured-image ${className}"><img src="${esc(img.dataUrl)}" alt="${esc(img.caption||"TEE document image")}"><figcaption>${esc(img.caption||"Image")}</figcaption></figure>`));
    return parts.join("");
  }

  async function render(){
    const allDocs=readStore().sort((a,b)=>String(a.title).localeCompare(String(b.title)));
    const b=bridge(); let overlays=[];
    if(vaultOpen()) { try { overlays=await b.listOverlays(); } catch { overlays=[]; } }

    const now=Date.now(), recentCutoff=now-(7*24*60*60*1000);
    const counts={
      review:allDocs.filter(d=>lifecycleStatus(d)==="review").length,
      processed:allDocs.filter(d=>lifecycleStatus(d)==="processed").length,
      archived:allDocs.filter(d=>lifecycleStatus(d)==="archived").length
    };
    let docs=[];
    if(currentView==="review") docs=allDocs.filter(d=>lifecycleStatus(d)==="review");
    else if(currentView==="recent") docs=allDocs.filter(d=>lifecycleStatus(d)!=="archived" && new Date(d.processedAt||d.lastModifiedAt||d.createdAt||0).getTime()>=recentCutoff);
    else if(currentView==="archived") docs=allDocs.filter(d=>lifecycleStatus(d)==="archived");
    else docs=allDocs.filter(d=>lifecycleStatus(d)!=="archived");

    const viewButtons=[[ui.viewReview,"review"],[ui.viewRecent,"recent"],[ui.viewAll,"all"],[ui.viewArchived,"archived"]];
    viewButtons.forEach(([btn,key])=>{ if(!btn)return; btn.classList.toggle("active",currentView===key); btn.setAttribute("aria-pressed",currentView===key?"true":"false"); });
    if(ui.viewReview) ui.viewReview.textContent=`Needs Review (${counts.review})`;
    if(ui.viewArchived) ui.viewArchived.textContent=`Archived (${counts.archived})`;

    ui.list.replaceChildren();
    if(!allDocs.length){
      ui.list.innerHTML='<p class="structured-empty">No structured documents yet. Add one when you are ready to dissect a source document into TEE.</p>';
      ui.summary.textContent="0 structured documents";
      return;
    }
    if(!docs.length){
      const empty=currentView==="review"?"Nothing needs review. Approved structured documents are filed out of this default view.":currentView==="recent"?"No structured documents were processed in the last 7 days.":currentView==="archived"?"No structured documents are archived.":"No structured documents in this view.";
      ui.list.innerHTML=`<p class="structured-empty">${empty}</p>`;
    }

    docs.forEach(doc=>{
      const shared=overlays.find(x=>x.documentId===doc.documentId&&x.layer==="shared")?.payload||{fields:[],images:[]};
      const priv=overlays.find(x=>x.documentId===doc.documentId&&x.layer==="private")?.payload||{fields:[],images:[]};
      const card=document.createElement("article"); card.className="structured-document-card"; card.dataset.documentId=doc.documentId;
      const protectedLocked=!vaultOpen()&&doc.hasProtected===true;
      const sourceExpanded=expandedSources.has(doc.documentId);
      const sourceFile=doc.originalClassification==="public"?doc.publicOriginalFile:doc.originalClassification==="shared"?shared.sourceFile:priv.sourceFile;
      const canRevealSource=doc.originalClassification==="public"||vaultOpen();
      const hasSource=!!(sourceFile?.dataUrl||doc.originalReference);
      let lifecycleActions="";
      const status=lifecycleStatus(doc);
      if(status==="review") lifecycleActions=`<button type="button" class="secondary" data-file="${esc(doc.documentId)}">Mark Reviewed</button><button type="button" class="secondary" data-archive="${esc(doc.documentId)}">Archive</button>`;
      else if(status==="archived") lifecycleActions=`<button type="button" class="secondary" data-restore="${esc(doc.documentId)}">Restore</button>`;
      else lifecycleActions=`<button type="button" class="secondary" data-review="${esc(doc.documentId)}">Needs Review</button><button type="button" class="secondary" data-archive="${esc(doc.documentId)}">Archive</button>`;
      const sourceDetails=sourceExpanded&&canRevealSource?`<div class="structured-source-details"><p><strong>Source reference:</strong> ${esc(doc.originalReference||sourceFile?.name||"Retained original")}</p>${sourceView(sourceFile)||'<p>The original is retained by reference; no embedded preview is available.</p>'}</div>`:"";
      const sourceControl=hasSource?(!canRevealSource?'<span class="structured-source-locked">🔒 Unlock the vault to view the retained original.</span>':`<button type="button" class="secondary structured-source-toggle" data-source="${esc(doc.documentId)}">${sourceExpanded?"Hide Source":"View Source"}</button>`):'<span>No original file embedded.</span>';
      card.innerHTML=`<div class="structured-card-head"><div><h3>${esc(doc.title)}</h3><p>${esc(doc.category||"Uncategorized")} · Original: ${esc(accessLabel(doc.originalClassification))}</p><p class="structured-saved-status">${status==="review"?"● Needs review":status==="archived"?"▣ Archived":"✓ Structured & filed"} · ${esc(new Date(doc.lastModifiedAt||doc.createdAt||Date.now()).toLocaleString())}</p></div><div class="structured-card-actions"><button type="button" class="secondary" data-edit="${esc(doc.documentId)}">Edit</button>${lifecycleActions}<button type="button" class="danger" data-delete="${esc(doc.documentId)}">Delete</button></div></div><div class="structured-layer public"><h4>Public</h4>${renderLayerItems(doc.publicFields,doc.publicImages,"public")||'<p>No public fields.</p>'}</div>${vaultOpen()?`<div class="structured-layer shared"><h4>Shared · both couples</h4>${renderLayerItems(shared.fields,shared.images,"shared")||'<p>No Shared fields.</p>'}</div><div class="structured-layer private"><h4>Private · ${esc(b.getActiveProfileLabel?.()||"owning couple")}</h4>${renderLayerItems(priv.fields,priv.images,"private")||'<p>No Private fields for this couple.</p>'}</div>`:(protectedLocked?`<div class="structured-locked">🔒 Protected Shared/Private content exists. Unlock the vault to reveal only the layers authorized for this couple.</div>`:"")}<div class="structured-original"><div><strong>Supporting source:</strong> retained at ${esc(accessLabel(doc.originalClassification))}; hidden during normal use.</div><div class="structured-source-controls">${sourceControl}</div>${sourceDetails}</div>`;

      card.querySelector('[data-edit]').addEventListener('click',async()=>{
        const ov=vaultOpen()?await b.listOverlays(doc.documentId):[];
        const sf=ov.find(x=>x.layer==="shared")?.payload?.fields||[], si=ov.find(x=>x.layer==="shared")?.payload?.images||[];
        const pf=ov.find(x=>x.layer==="private")?.payload?.fields||[], pi=ov.find(x=>x.layer==="private")?.payload?.images||[];
        const sharedSource=ov.find(x=>x.layer==="shared")?.payload?.sourceFile||null, privateSource=ov.find(x=>x.layer==="private")?.payload?.sourceFile||null;
        const draftOriginalFile=doc.originalClassification==="public"?doc.publicOriginalFile:(doc.originalClassification==="shared"?sharedSource:privateSource);
        openEditor({...doc,draftOriginalFile,draftFields:[...(doc.publicFields||[]),...sf,...pf],draftImages:[...(doc.publicImages||[]),...si,...pi]});
      });
      card.querySelector('[data-delete]').addEventListener('click',()=>deleteDocument(doc));
      card.querySelector('[data-file]')?.addEventListener('click',()=>updateLifecycle(doc.documentId,"processed"));
      card.querySelector('[data-review]')?.addEventListener('click',()=>updateLifecycle(doc.documentId,"review"));
      card.querySelector('[data-archive]')?.addEventListener('click',()=>updateLifecycle(doc.documentId,"archived"));
      card.querySelector('[data-restore]')?.addEventListener('click',()=>updateLifecycle(doc.documentId,"processed"));
      card.querySelector('[data-source]')?.addEventListener('click',()=>{ if(expandedSources.has(doc.documentId))expandedSources.delete(doc.documentId); else expandedSources.add(doc.documentId); render(); });
      ui.list.appendChild(card);
    });

    const viewName=currentView==="review"?"Needs Review":currentView==="recent"?"Recently Structured":currentView==="archived"?"Archived":"All Structured";
    const baseSummary=`${viewName}: ${docs.length} shown · ${counts.review} need review · ${counts.processed} filed · ${counts.archived} archived`;
    ui.summary.textContent=lastActionMessage?`${lastActionMessage}  ${baseSummary}`:baseSummary;
    lastActionMessage="";
    window.dispatchEvent(new CustomEvent("tee-structured-documents-changed"));
  }


  async function commitSmartIntake(input){
    const title=String(input?.title||"").trim(); if(!title) throw new Error("Document title is required.");
    const fields=Array.isArray(input?.fields)?input.fields.filter(x=>x&&(x.label||x.value)):[];
    const images=Array.isArray(input?.images)?input.images.filter(x=>x?.dataUrl):[];
    const originalClass=["public","shared","private"].includes(input?.originalClassification)?input.originalClassification:"private";
    const needsVault=originalClass!=="public"||fields.some(x=>x.access!=="public")||images.some(x=>x.access!=="public");
    if(needsVault&&!vaultOpen()) throw new Error("Unlock the Secure Vault before committing Shared or Private content.");
    const documentId=uid(), now=new Date().toISOString();
    const publicFields=fields.filter(x=>x.access==="public"), publicImages=images.filter(x=>x.access==="public");
    const sharedFields=fields.filter(x=>x.access==="shared"), sharedImages=images.filter(x=>x.access==="shared");
    const privateFields=fields.filter(x=>x.access==="private"), privateImages=images.filter(x=>x.access==="private");
    const source=input?.sourceFile||null;
    const base={documentId,title,category:String(input?.category||"").trim(),originalClassification:originalClass,originalReference:String(input?.originalReference||source?.name||"").trim(),publicFields,publicImages,publicOriginalFile:originalClass==="public"?source:null,hasProtected:needsVault,createdAt:now,lastModifiedAt:now,lifecycleStatus:"processed",processedAt:now,archivedAt:null,sourceArchived:true};
    const store=readStore(); store.push(base); writeStore(store);
    if(vaultOpen()){
      await bridge().saveOverlay({documentId,title,category:base.category,layer:"shared",payload:{fields:sharedFields,images:sharedImages,sourceFile:originalClass==="shared"?source:null},originalReference:originalClass==="shared"?base.originalReference:""});
      await bridge().saveOverlay({documentId,title,category:base.category,layer:"private",payload:{fields:privateFields,images:privateImages,sourceFile:originalClass==="private"?source:null},originalReference:originalClass==="private"?base.originalReference:""});
    }
    lastActionMessage=`✓ “${title}” approved, structured, and filed. Use Recently Structured or All Structured to view it.`;
    await render();
    return documentId;
  }

  async function sourceManagerRecords(){
    const docs=readStore().sort((a,b)=>String(a.title||"").localeCompare(String(b.title||"")));
    let overlays=[];
    if(vaultOpen()) { try { overlays=await bridge()?.listOverlays?.()||[]; } catch { overlays=[]; } }
    return docs.map(doc=>{
      const shared=overlays.find(x=>x.documentId===doc.documentId&&x.layer==="shared")?.payload||{};
      const priv=overlays.find(x=>x.documentId===doc.documentId&&x.layer==="private")?.payload||{};
      const sourceFile=doc.originalClassification==="public"?doc.publicOriginalFile:doc.originalClassification==="shared"?shared.sourceFile:priv.sourceFile;
      const publicCount=(doc.publicFields||[]).length+(doc.publicImages||[]).length;
      const sharedCount=(shared.fields||[]).length+(shared.images||[]).length;
      const privateCount=(priv.fields||[]).length+(priv.images||[]).length;
      const sourceEmbedded=!!sourceFile?.dataUrl;
      const sourceReferenced=!!doc.originalReference;
      const status=lifecycleStatus(doc);
      const needsAttention=status==="review"||(!sourceEmbedded&&!sourceReferenced);
      return {
        documentId:doc.documentId,
        title:doc.title||"Untitled source",
        category:doc.category||"Uncategorized",
        originalClassification:doc.originalClassification||"private",
        originalReference:doc.originalReference||"",
        lifecycleStatus:status,
        lifecycleLabel:lifecycleLabel(doc),
        createdAt:doc.createdAt||null,
        lastModifiedAt:doc.lastModifiedAt||null,
        processedAt:doc.processedAt||null,
        archivedAt:doc.archivedAt||null,
        sourceEmbedded,
        sourceReferenced,
        sourceName:sourceFile?.name||doc.originalReference||"",
        sourceType:sourceFile?.type||"",
        sourceBytes:sourceFile?.bytes||0,
        canRevealSource:doc.originalClassification==="public"||vaultOpen(),
        hasProtected:!!doc.hasProtected,
        publicItemCount:publicCount,
        sharedItemCount:vaultOpen()?sharedCount:null,
        privateItemCount:vaultOpen()?privateCount:null,
        protectedCountsLocked:!vaultOpen()&&!!doc.hasProtected,
        needsAttention
      };
    });
  }

  async function focusDocument(documentId, revealSource=false){
    const doc=readStore().find(x=>x.documentId===documentId);
    if(!doc) throw new Error("Structured document not found.");
    if(revealSource && doc.originalClassification!=="public" && !vaultOpen()) throw new Error("Unlock the Secure Vault before viewing this protected original.");
    currentView=lifecycleStatus(doc)==="archived"?"archived":"all";
    if(revealSource) expandedSources.add(documentId); else expandedSources.delete(documentId);
    setWorkspaceExpanded(true);
    await render();
    requestAnimationFrame(()=>document.querySelector(`.structured-document-card[data-document-id="${CSS.escape(documentId)}"]`)?.scrollIntoView({behavior:"smooth",block:"start"}));
  }

  async function editById(documentId){
    const doc=readStore().find(x=>x.documentId===documentId);
    if(!doc) throw new Error("Structured document not found.");
    const b=bridge();
    let ov=[];
    if(doc.hasProtected){
      if(!vaultOpen()) throw new Error("Unlock the Secure Vault before editing a document with Shared or Private content.");
      ov=await b.listOverlays(documentId);
    }
    const sf=ov.find(x=>x.layer==="shared")?.payload?.fields||[], si=ov.find(x=>x.layer==="shared")?.payload?.images||[];
    const pf=ov.find(x=>x.layer==="private")?.payload?.fields||[], pi=ov.find(x=>x.layer==="private")?.payload?.images||[];
    const sharedSource=ov.find(x=>x.layer==="shared")?.payload?.sourceFile||null, privateSource=ov.find(x=>x.layer==="private")?.payload?.sourceFile||null;
    const draftOriginalFile=doc.originalClassification==="public"?doc.publicOriginalFile:(doc.originalClassification==="shared"?sharedSource:privateSource);
    setWorkspaceExpanded(true);
    openEditor({...doc,draftOriginalFile,draftFields:[...(doc.publicFields||[]),...sf,...pf],draftImages:[...(doc.publicImages||[]),...si,...pi]});
  }

  async function deleteById(documentId){
    const doc=readStore().find(x=>x.documentId===documentId);
    if(!doc) throw new Error("Structured document not found.");
    await deleteDocument(doc);
  }

  async function setLifecycleById(documentId,status){
    if(!["review","processed","archived"].includes(status)) throw new Error("Unknown lifecycle status.");
    updateLifecycle(documentId,status);
  }

  window.TEEStructuredDocumentsAPI=Object.freeze({commitSmartIntake,refresh:render,sourceManagerRecords,focusDocument,editById,deleteById,setLifecycleById});

  ui.newButton.addEventListener("click",()=>openEditor()); ui.refreshButton.addEventListener("click",render); ui.addField.addEventListener("click",()=>fieldRow()); ui.addImage.addEventListener("click",()=>imageRow()); ui.close.addEventListener("click",()=>ui.dialog.close()); ui.form.addEventListener("submit",saveDocument);
  ui.workspaceToggle?.addEventListener("click",()=>setWorkspaceExpanded(ui.workspaceContent?.hidden!==false));
  ui.workspaceCollapse?.addEventListener("click",()=>{ setWorkspaceExpanded(false); ui.workspaceToggle?.scrollIntoView({behavior:"smooth",block:"nearest"}); });
  ui.viewReview?.addEventListener("click",()=>setView("review")); ui.viewRecent?.addEventListener("click",()=>setView("recent")); ui.viewAll?.addEventListener("click",()=>setView("all")); ui.viewArchived?.addEventListener("click",()=>setView("archived"));
  ui.originalFile.addEventListener("change",async e=>{ const file=e.target.files?.[0]; if(!file)return; ui.originalFileStatus.textContent="Preparing original…"; try{pendingOriginalFile=await prepareSourceFile(file); if(!ui.originalRef.value.trim())ui.originalRef.value=file.name; updateSourceStatus();}catch(err){pendingOriginalFile=null; updateSourceStatus(); ui.message.textContent=err.message||String(err);} });
  ui.originalFileRemove.addEventListener("click",()=>{pendingOriginalFile=null; ui.originalFile.value=""; updateSourceStatus();});
  window.addEventListener("tee-vault-state-changed",render);
  setWorkspaceExpanded(false);
  render();
})();
