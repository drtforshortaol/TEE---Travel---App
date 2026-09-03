"use strict";
(function(){
  const STORE='teeStructuredDocumentsPublicV1';
  const summary=document.getElementById('auditSummary');
  const results=document.getElementById('auditResults');
  const refresh=document.getElementById('refreshAudit');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=v=>String(v||'').trim().toLowerCase().replace(/\s+(?:copy|duplicate)\s*\d*$/,'').replace(/\s+\(\d+\)$/,'').replace(/\s+/g,' ');
  const lifecycle=d=>['review','processed','archived'].includes(d?.lifecycleStatus)?d.lifecycleStatus:'processed';
  const statusLabel=d=>lifecycle(d)==='archived'?(d.verifiedAt?'Verified · Archived':'Archived'):lifecycle(d)==='review'?'Needs Review':'Saved';
  const dateLabel=v=>{if(!v)return '—';const d=new Date(v);return Number.isNaN(d.getTime())?'—':d.toLocaleString();};
  function read(){try{const x=JSON.parse(localStorage.getItem(STORE)||'[]');return Array.isArray(x)?x:[];}catch{return [];}}
  function key(d){return `${normalize(d?.title)}|${normalize(d?.category)}`;}
  function groups(records){const map=new Map();records.forEach(d=>{const k=key(d);if(!normalize(d?.title))return;const arr=map.get(k)||[];arr.push(d);map.set(k,arr);});return [...map.values()].filter(arr=>arr.length>1).sort((a,b)=>String(a[0]?.title||'').localeCompare(String(b[0]?.title||'')));}
  function render(){
    const records=read();
    const related=groups(records);
    const relatedCount=related.reduce((n,g)=>n+g.length,0);
    if(!records.length){summary.innerHTML='<strong>No structured-document index was found in this browser.</strong><br>Open TEE on the browser/device that contains your saved Source Documents, then return to this audit page.';results.innerHTML='';return;}
    summary.innerHTML=related.length
      ? `<strong>${related.length} possible related-record group${related.length===1?'':'s'} found.</strong><br>${relatedCount} of ${records.length} indexed records share the same normalized title and category. Nothing has been changed.`
      : `<strong>No likely duplicate groups detected.</strong><br>${records.length} indexed record${records.length===1?'':'s'} checked. Nothing has been changed.`;
    if(!related.length){results.innerHTML='<section class="empty"><span class="badge ok">No duplicate groups</span><p>TEE did not find two records with the same normalized document title and category.</p></section>';return;}
    results.replaceChildren();
    related.forEach(group=>{
      const section=document.createElement('section');section.className='group';
      const title=group[0]?.title||'Related documents';const category=group[0]?.category||'Other';
      section.innerHTML=`<h2>${esc(title)}</h2><div class="meta"><span class="badge warn">${group.length} possible related records</span> · ${esc(category)}</div>`;
      group.slice().sort((a,b)=>String(b.lastModifiedAt||b.createdAt||'').localeCompare(String(a.lastModifiedAt||a.createdAt||''))).forEach(d=>{
        const row=document.createElement('div');row.className='record';
        row.innerHTML=`<div><div class="label">Record</div><div class="value">${esc(d.title||'Untitled')}</div><div>${esc(d.originalReference||d.publicOriginalFile?.name||'No source reference')}</div></div><div><div class="label">Status</div><div class="value">${esc(statusLabel(d))}</div><div>${esc(d.documentId||'')}</div></div><div><div class="label">Last changed</div><div class="value">${esc(dateLabel(d.lastModifiedAt||d.createdAt))}</div><div>Created ${esc(dateLabel(d.createdAt))}</div></div>`;
        section.appendChild(row);
      });
      results.appendChild(section);
    });
  }
  refresh?.addEventListener('click',render);
  render();
})();