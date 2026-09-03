"use strict";
(function(){
  const STORE='teeStructuredDocumentsPublicV1';
  const summary=document.getElementById('auditSummary');
  const results=document.getElementById('auditResults');
  const refresh=document.getElementById('refreshAudit');
  const demo=document.getElementById('demoAudit');
  const selfCheck=document.getElementById('auditSelfCheck');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=v=>String(v||'').trim().toLowerCase().replace(/\s+(?:copy|duplicate)\s*\d*$/,'').replace(/\s+\(\d+\)$/,'').replace(/\s+/g,' ');
  const normalizeSource=v=>String(v||'').trim().toLowerCase().replace(/^.*[\\/]/,'').replace(/\s+/g,' ');
  const lifecycle=d=>['review','processed','archived'].includes(d?.lifecycleStatus)?d.lifecycleStatus:'processed';
  const statusLabel=d=>lifecycle(d)==='archived'?(d.verifiedAt?'Verified · Archived':'Archived'):lifecycle(d)==='review'?'Needs Review':'Saved';
  const dateLabel=v=>{if(!v)return '—';const d=new Date(v);return Number.isNaN(d.getTime())?'—':d.toLocaleString();};
  const timeValue=v=>{const n=Date.parse(v||'');return Number.isFinite(n)?n:0;};
  function read(){try{const x=JSON.parse(localStorage.getItem(STORE)||'[]');return Array.isArray(x)?x:[];}catch{return [];}}
  function sourceRef(d){return d?.originalReference||d?.publicOriginalFile?.name||'';}
  function identityKey(d){return `${normalize(d?.title)}|${normalize(d?.category)}`;}
  function groups(records){const map=new Map();records.forEach(d=>{const k=identityKey(d);if(!normalize(d?.title))return;const arr=map.get(k)||[];arr.push(d);map.set(k,arr);});return [...map.values()].filter(arr=>arr.length>1).sort((a,b)=>String(a[0]?.title||'').localeCompare(String(b[0]?.title||'')));}
  function classify(group){
    const refs=group.map(d=>normalizeSource(sourceRef(d))).filter(Boolean);
    const uniqueRefs=new Set(refs);
    const allHaveRef=refs.length===group.length;
    const sameRef=allHaveRef&&uniqueRefs.size===1;
    const bytes=group.map(d=>Number(d?.publicOriginalFile?.bytes||0)).filter(n=>n>0);
    const sameBytes=bytes.length===group.length&&new Set(bytes).size===1;
    const created=group.map(d=>timeValue(d?.createdAt)).filter(Boolean).sort((a,b)=>a-b);
    const closeTiming=created.length===group.length&&created.length>1&&(created[created.length-1]-created[0])<=10*60*1000;
    if(sameRef && (sameBytes || bytes.length===0)) return {level:'exact',label:'Exact duplicate candidate',explain:'Same normalized title/category and the same retained source reference. Review before keeping more than one copy.'};
    if(sameRef || closeTiming) return {level:'repeat',label:'Likely repeated import',explain:sameRef?'Same document identity and source reference, but the available index is not strong enough to call it exact.':'Same document identity and records were created within 10 minutes of each other.'};
    if(allHaveRef && uniqueRefs.size>1) return {level:'version',label:'Possible newer version',explain:'Same normalized title/category but different source references. This may be a legitimate replacement or updated document rather than a duplicate.'};
    return {level:'review',label:'Related records — review',explain:'Same normalized title/category, but the index does not contain enough source evidence to classify the relationship more precisely.'};
  }
  function runSelfCheck(){
    const base={title:'Passport — Test Traveler',category:'Identity',createdAt:'2026-09-02T20:00:00Z'};
    const exact=classify([{...base,originalReference:'passport.jpg'},{...base,originalReference:'passport.jpg'}]).level==='exact';
    const repeat=classify([{...base,originalReference:'',createdAt:'2026-09-02T20:00:00Z'},{...base,originalReference:'',createdAt:'2026-09-02T20:05:00Z'}]).level==='repeat';
    const version=classify([{...base,originalReference:'passport-old.jpg'},{...base,originalReference:'passport-new.jpg',createdAt:'2026-09-05T20:00:00Z'}]).level==='version';
    const pass=exact&&repeat&&version;
    if(selfCheck){selfCheck.textContent=pass?'Audit engine self-check passed':'Audit engine self-check failed';selfCheck.className=`badge ${pass?'ok':'error'}`;}
    return pass;
  }
  function renderGroup(group,{demoMode=false}={}){
    const section=document.createElement('section');section.className='group';
    const title=group[0]?.title||'Related documents';const category=group[0]?.category||'Other';const verdict=classify(group);
    const badgeClass=verdict.level==='exact'||verdict.level==='repeat'?'warn':verdict.level==='version'?'ok':'warn';
    section.innerHTML=`<h2>${esc(title)}</h2><div class="meta"><span class="badge ${badgeClass}">${esc(verdict.label)}</span> · ${esc(category)}</div><p><strong>Why:</strong> ${esc(verdict.explain)}</p>${demoMode?'<p class="demo-note">Sample records only — no TEE data was used or changed.</p>':''}`;
    group.slice().sort((a,b)=>String(b.lastModifiedAt||b.createdAt||'').localeCompare(String(a.lastModifiedAt||a.createdAt||''))).forEach((d,index)=>{
      const row=document.createElement('div');row.className='record';
      const source=sourceRef(d)||'No source reference';
      row.innerHTML=`<div><div class="label">${index===0?'Newest / most recently changed':'Related record'}</div><div class="value">${esc(d.title||'Untitled')}</div><div>${esc(source)}</div></div><div><div class="label">Status</div><div class="value">${esc(statusLabel(d))}</div><div>${esc(d.documentId||'')}</div></div><div><div class="label">Last changed</div><div class="value">${esc(dateLabel(d.lastModifiedAt||d.createdAt))}</div><div>Created ${esc(dateLabel(d.createdAt))}</div></div>`;
      section.appendChild(row);
    });
    results.appendChild(section);
  }
  function render(){
    runSelfCheck();
    const records=read();
    const related=groups(records);
    const relatedCount=related.reduce((n,g)=>n+g.length,0);
    if(!records.length){summary.innerHTML='<strong>No structured-document index was found in this browser.</strong><br>Open TEE on the browser/device that contains your saved Source Documents, then return to this audit page.';results.innerHTML='';return;}
    summary.innerHTML=related.length
      ? `<strong>${related.length} related-record group${related.length===1?'':'s'} found for review.</strong><br>${relatedCount} of ${records.length} indexed records share the same normalized title and category. The audit classifies them only; nothing has been changed.`
      : `<strong>No likely duplicate groups detected.</strong><br>${records.length} indexed record${records.length===1?'':'s'} checked. Nothing has been changed.`;
    if(!related.length){results.innerHTML='<section class="empty"><span class="badge ok">No duplicate groups</span><p>TEE did not find two records with the same normalized document title and category.</p></section>';return;}
    results.replaceChildren();
    related.forEach(group=>renderGroup(group));
  }
  function renderDemo(){
    runSelfCheck();
    const base={category:'Identity',lifecycleStatus:'archived',verifiedAt:'2026-09-01T18:00:00Z'};
    const sampleGroups=[
      [
        {...base,title:'Passport — Sample Exact',documentId:'demo-exact-1',originalReference:'passport.jpg',createdAt:'2026-09-01T18:00:00Z',lastModifiedAt:'2026-09-01T18:05:00Z'},
        {...base,title:'Passport — Sample Exact',documentId:'demo-exact-2',originalReference:'passport.jpg',createdAt:'2026-09-01T18:01:00Z',lastModifiedAt:'2026-09-01T18:06:00Z'}
      ],
      [
        {...base,title:'Global Entry — Sample Repeat',documentId:'demo-repeat-1',originalReference:'',createdAt:'2026-09-01T19:00:00Z',lastModifiedAt:'2026-09-01T19:03:00Z'},
        {...base,title:'Global Entry — Sample Repeat',documentId:'demo-repeat-2',originalReference:'',createdAt:'2026-09-01T19:06:00Z',lastModifiedAt:'2026-09-01T19:08:00Z'}
      ],
      [
        {...base,title:'Passport — Sample Version',documentId:'demo-version-1',originalReference:'passport-2024.jpg',createdAt:'2026-08-01T18:00:00Z',lastModifiedAt:'2026-08-01T18:05:00Z'},
        {...base,title:'Passport — Sample Version',documentId:'demo-version-2',originalReference:'passport-2034.jpg',createdAt:'2026-09-01T20:00:00Z',lastModifiedAt:'2026-09-01T20:05:00Z'}
      ]
    ];
    summary.innerHTML='<strong>Sample classification demo.</strong><br>These are synthetic records only. Your real TEE records are untouched. Use Refresh Audit to return to your real data.';
    results.replaceChildren();
    sampleGroups.forEach(group=>renderGroup(group,{demoMode:true}));
  }
  refresh?.addEventListener('click',render);
  demo?.addEventListener('click',renderDemo);
  render();
})();