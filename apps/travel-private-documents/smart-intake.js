"use strict";

(function(){
  const root=document.getElementById("smartDocumentIntake");
  if(!root)return;
  const $=id=>document.getElementById(id);
  const ui={
    source:$("smartIntakeSource"), sourceStatus:$("smartIntakeSourceStatus"), sourceClass:$("smartIntakeSourceClass"),
    text:$("smartIntakeText"), local:$("smartIntakeLocalAnalyze"), copy:$("smartIntakeCopyPrompt"),
    analysisFile:$("smartIntakeAnalysisFile"), load:$("smartIntakeLoadAnalysis"), message:$("smartIntakeMessage"),
    review:$("smartIntakeReview"), title:$("smartIntakeTitleField"), category:$("smartIntakeCategory"), originalClass:$("smartIntakeOriginalClass"),
    rows:$("smartIntakeRows"), add:$("smartIntakeAddField"), commit:$("smartIntakeCommit"), clear:$("smartIntakeClear"),
    selectAll:$("smartIntakeSelectAll"), selectNone:$("smartIntakeSelectNone"), selectedCount:$("smartIntakeSelectedCount"),
    bulkPublic:$("smartIntakeBulkPublic"), bulkShared:$("smartIntakeBulkShared"), bulkPrivate:$("smartIntakeBulkPrivate")
  };
  let sourceFile=null;
  let proposal=null;
  const MAX_SOURCE_BYTES=2.25*1024*1024;
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fileToDataUrl=file=>new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(file);});
  function accessLabel(v){return v==="private"?"Private — owning couple only":v==="shared"?"Shared — both couples only":"Public — open to all";}
  async function prepareSource(file){
    const allowed=new Set(["application/pdf","image/jpeg","image/png","image/webp"]);
    if(!allowed.has(file.type))throw new Error("Choose a PDF, JPEG, PNG, or WebP source document.");
    if(file.size>MAX_SOURCE_BYTES)throw new Error(`Source is ${Math.round(file.size/1024)} KB. This build can embed originals up to ${Math.round(MAX_SOURCE_BYTES/1024)} KB. Keep larger originals in the secure source archive and analyze them with ChatGPT.`);
    return {name:file.name,type:file.type,bytes:file.size,dataUrl:await fileToDataUrl(file),addedAt:new Date().toISOString()};
  }
  function setMessage(t){ui.message.textContent=t||"";}
  function blankProposal(){return {schema:"tee-smart-intake-v1",title:sourceFile?.name?.replace(/\.[^.]+$/,'')||"",category:"",originalClassification:ui.sourceClass.value,fields:[],images:[]};}
  function classify(label,value){
    const s=`${label} ${value}`.toLowerCase();
    if(/passport|global entry|card number|credit card|medical|health|dob|date of birth|home address|personal address|private|payment method/.test(s))return "private";
    if(/confirmation|booking|pnr|ticket number|reservation|seat|room|flight|train|rail|hotel|stay date|check[- ]?in|check[- ]?out|transfer|pickup|dropoff|phone|email/.test(s))return "shared";
    return "public";
  }
  function localAnalyze(){
    const text=ui.text.value.trim(); if(!text){setMessage("Paste extracted text first, or use a ChatGPT analysis package for a PDF/image.");return;}
    const p=blankProposal();
    const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    p.fields=lines.slice(0,80).map((line,i)=>{
      let label=`Line ${i+1}`,value=line; const m=line.match(/^([^:]{2,45}):\s*(.+)$/); if(m){label=m[1].trim();value=m[2].trim();}
      return {label,value,access:classify(label,value),reason:"Local keyword draft — review required"};
    });
    proposal=p; renderReview(); setMessage("Local draft created. Review every classification before committing.");
  }
  function updateSelectedCount(){
    const all=[...ui.rows.querySelectorAll('.smart-intake-row')];
    const selected=all.filter(el=>el.querySelector('[data-role="selected"]')?.checked);
    if(ui.selectedCount)ui.selectedCount.textContent=`${selected.length} selected`;
  }
  function selectedRows(){return [...ui.rows.querySelectorAll('.smart-intake-row')].filter(el=>el.querySelector('[data-role="selected"]')?.checked);}
  function setSelectedAccess(access){
    const rows=selectedRows();
    if(!rows.length){setMessage("Select one or more details first.");return;}
    rows.forEach(el=>{el.querySelector('[data-role="access"]').value=access;});
    setMessage(`${rows.length} selected detail${rows.length===1?"":"s"} set to ${accessLabel(access)}.`);
  }
  function row(seed={}){
    const el=document.createElement("div"); el.className="smart-intake-row";
    el.innerHTML=`<label class="smart-intake-check" title="Select for group classification"><input data-role="selected" type="checkbox"><span>Select</span></label><input data-role="label" type="text" value="${esc(seed.label||"")}" placeholder="Field label"><textarea data-role="value" rows="2" placeholder="Extracted value">${esc(seed.value||"")}</textarea><select data-role="access"><option value="public">Public</option><option value="shared">Shared</option><option value="private">Private</option></select><small data-role="reason">${esc(seed.reason||"Review classification")}</small><button type="button" class="secondary" data-role="remove">Remove</button>`;
    el.querySelector('[data-role="access"]').value=seed.access||"public";
    el.querySelector('[data-role="selected"]').addEventListener("change",updateSelectedCount);
    el.querySelector('[data-role="remove"]').addEventListener("click",()=>{el.remove();updateSelectedCount();});
    ui.rows.appendChild(el);
    updateSelectedCount();
  }
  function renderReview(){
    if(!proposal)return;
    ui.review.hidden=false; ui.title.value=proposal.title||sourceFile?.name?.replace(/\.[^.]+$/,'')||""; ui.category.value=proposal.category||"";
    ui.originalClass.value=proposal.originalClassification||ui.sourceClass.value||"private"; ui.rows.replaceChildren();
    (proposal.fields||[]).forEach(row); if(!(proposal.fields||[]).length)row();
  }
  function collect(){
    return [...ui.rows.querySelectorAll('.smart-intake-row')].map(el=>({
      label:el.querySelector('[data-role="label"]').value.trim(), value:el.querySelector('[data-role="value"]').value.trim(), access:el.querySelector('[data-role="access"]').value
    })).filter(x=>x.label||x.value);
  }
  function promptText(){
    const name=sourceFile?.name||"the document";
    return `Analyze the attached travel document for TEE Smart Document Intake. Return a downloadable JSON file using schema tee-smart-intake-v1.\n\nRules:\n- Preserve useful operational information.\n- Classify each extracted field as exactly public, shared, or private.\n- public = open to everyone.\n- shared = accessible to both traveling couples only; it is protected and must not be public.\n- private = accessible only to the individual owning couple.\n- If the original contains any private information, originalClassification should be private; otherwise if it contains shared information, use shared; otherwise public.\n- Do not silently discard useful information.\n- Include a short reason for each classification.\n- Suggested schema: {"schema":"tee-smart-intake-v1","title":"...","category":"Hotels|Transportation|Identity|Insurance|Other","originalClassification":"private|shared|public","fields":[{"label":"...","value":"...","access":"public|shared|private","reason":"..."}],"images":[{"caption":"...","access":"public|shared|private","reason":"..."}]}.\n- Do not embed the source file bytes in JSON.\n\nSource filename: ${name}`;
  }
  async function copyPrompt(){
    try{await navigator.clipboard.writeText(promptText());setMessage("ChatGPT analysis instructions copied. Upload this source document to ChatGPT, paste the instructions, then import the returned .tee40.json file here.");}
    catch{setMessage("Clipboard was unavailable. Use the displayed ChatGPT workflow instructions below.");}
  }
  async function loadAnalysis(){
    const file=ui.analysisFile.files?.[0]; if(!file){setMessage("Choose the .tee40.json analysis file first.");return;}
    try{
      const obj=JSON.parse(await file.text()); if(obj.schema!=="tee-smart-intake-v1")throw new Error("This is not a TEE Smart Intake v1 analysis package.");
      if(!Array.isArray(obj.fields))throw new Error("Analysis package has no fields array.");
      for(const f of obj.fields){if(!["public","shared","private"].includes(f.access))f.access="private";}
      proposal=obj; renderReview(); setMessage(`Loaded ${obj.fields.length} proposed fields. Review classifications before committing.`);
    }catch(err){setMessage(err.message||String(err));}
  }
  async function commit(){
    const api=window.TEEStructuredDocumentsAPI; if(!api?.commitSmartIntake){setMessage("Structured Document engine is not ready. Reload TEE and try again.");return;}
    const fields=collect(); if(!ui.title.value.trim()){setMessage("Enter a document title.");return;}
    if(!sourceFile){setMessage("Choose the original source document before committing so TEE can retain the protected original.");return;}
    try{
      const documentId=await api.commitSmartIntake({title:ui.title.value.trim(),category:ui.category.value.trim(),originalClassification:ui.originalClass.value,originalReference:sourceFile.name,sourceFile,fields,images:[]});
      setMessage(`✓ Saved in TEE Structured Documents: ${ui.title.value.trim()}. Document ID ${documentId}. Scroll to Structured Documents below to view it.`);
      clear(false, true);
    }catch(err){setMessage(err.message||String(err));}
  }
  function clear(clearMessage=true, preserveMessage=false){proposal=null;sourceFile=null;ui.source.value="";ui.analysisFile.value="";ui.text.value="";ui.review.hidden=true;ui.rows.replaceChildren();ui.sourceStatus.textContent="No source selected.";updateSelectedCount();if(clearMessage&&!preserveMessage)setMessage("");}

  ui.source.addEventListener("change",async e=>{const f=e.target.files?.[0];if(!f)return;ui.sourceStatus.textContent="Preparing…";try{sourceFile=await prepareSource(f);ui.sourceStatus.textContent=`${f.name} · ${Math.max(1,Math.round(f.size/1024))} KB · original proposed ${accessLabel(ui.sourceClass.value)}`;setMessage("Source selected. For full analysis, use ChatGPT analysis; for pasted text, use Local Draft.");}catch(err){sourceFile=null;ui.sourceStatus.textContent="No source selected.";setMessage(err.message||String(err));}});
  ui.sourceClass.addEventListener("change",()=>{if(sourceFile)ui.sourceStatus.textContent=`${sourceFile.name} · ${Math.max(1,Math.round(sourceFile.bytes/1024))} KB · original proposed ${accessLabel(ui.sourceClass.value)}`;});
  ui.local.addEventListener("click",localAnalyze); ui.copy.addEventListener("click",copyPrompt); ui.load.addEventListener("click",loadAnalysis); ui.add.addEventListener("click",()=>row()); ui.commit.addEventListener("click",commit); ui.clear.addEventListener("click",()=>clear(true));
  ui.selectAll?.addEventListener("click",()=>{[...ui.rows.querySelectorAll('[data-role="selected"]')].forEach(x=>x.checked=true);updateSelectedCount();});
  ui.selectNone?.addEventListener("click",()=>{[...ui.rows.querySelectorAll('[data-role="selected"]')].forEach(x=>x.checked=false);updateSelectedCount();});
  ui.bulkPublic?.addEventListener("click",()=>setSelectedAccess("public"));
  ui.bulkShared?.addEventListener("click",()=>setSelectedAccess("shared"));
  ui.bulkPrivate?.addEventListener("click",()=>setSelectedAccess("private"));
})();
