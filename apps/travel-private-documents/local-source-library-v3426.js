"use strict";
(function(){
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const ownerLabel=r=>r.originalClassification==="shared"?"Shared · both couples":r.originalClassification==="public"?"Public":r.targetProfile==="coupleB"?"Private · Couple B":r.targetProfile==="coupleA"?"Private · Couple A":"Private";
  const statusLabel=r=>r.lifecycleStatus==="archived"?(r.verifiedAt?"✓ Verified · Archived":"Archived"):r.needsAttention?"⚠ Needs Attention":r.verifiedAt?"✓ Verified":"Saved";

  function openExisting(documentId){
    const fn=window.TEETravelerReviewDocumentV3410||window.TEETravelerReviewDocumentV3409||window.TEETravelerReviewDocumentV3407||window.TEETravelerReviewDocumentV3406;
    if(fn){ fn(documentId); return; }
    const nav=window.TEETravelerSourceNavV3426||window.TEETravelerSourceNavV3424;
    nav?.showManager?.('structured');
  }

  function render(records=window.TEELocalSourceInventoryV3426||[]){
    const mount=document.getElementById('docMount');
    if(!mount)return;
    mount.querySelectorAll('.tee-local-source-library-card').forEach(el=>el.remove());
    mount.querySelectorAll('details.category[data-tee-local-only="1"]').forEach(el=>el.remove());

    const retained=(records||[]).filter(r=>r.sourceEmbedded||r.sourceReferenced);
    retained.forEach(r=>{
      let details=[...mount.querySelectorAll('details.category')].find(d=>d.querySelector('summary span')?.textContent.trim()===String(r.category||'Other').trim());
      if(!details){
        details=document.createElement('details');
        details.className='category';
        details.dataset.teeLocalOnly='1';
        const summary=document.createElement('summary');
        summary.innerHTML=`<span>${esc(r.category||'Other')}</span><span>0 files</span>`;
        const body=document.createElement('div');body.className='category-body';
        details.append(summary,body);mount.appendChild(details);
      }
      const body=details.querySelector('.category-body')||details;
      const article=document.createElement('article');
      article.className='doc-card source-private tee-local-source-library-card';
      article.dataset.documentId=r.documentId||'';
      article.innerHTML=`
        <div class="source-doc-title-row"><h3>${esc(r.title||'Saved document')}</h3><span class="source-status-badge private">${esc(ownerLabel(r))}</span></div>
        <div class="meta"><span class="chip">${esc(statusLabel(r))}</span><span class="chip">Local retained source</span></div>
        <p><strong>Original:</strong> ${esc(r.sourceName||'Retained local source')}</p>
        <p class="source-private-note">LOCAL TEE SOURCE · This is the existing retained source linked to the saved document. Opening it does not create a duplicate.</p>
        <div class="source-status-actions"><button type="button" data-open-existing>Open existing record</button></div>`;
      article.querySelector('[data-open-existing]')?.addEventListener('click',()=>openExisting(r.documentId));
      body.appendChild(article);
    });

    mount.querySelectorAll('details.category').forEach(details=>{
      const count=details.querySelectorAll('.category-body > .doc-card').length;
      const spans=details.querySelectorAll(':scope > summary span');
      if(spans[1])spans[1].textContent=`${count} file${count===1?'':'s'}`;
    });
    window.TEESourceInventoryRuntimeCountV3426=mount.querySelectorAll('.category-body > .doc-card').length;
  }

  window.TEERenderLocalSourceLibraryV3426=render;
  window.addEventListener('tee-local-source-inventory-changed',e=>render(e.detail?.records||[]));
  window.addEventListener('tee-structured-documents-changed',()=>setTimeout(()=>render(),0));
  document.addEventListener('click',e=>{if(e.target instanceof Element&&e.target.closest('#streamDocumentLibrary'))setTimeout(()=>render(),80);},true);
  setTimeout(()=>render(),0);
})();
