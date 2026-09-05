"use strict";
(function(){
  const quickbar=[...document.querySelectorAll('.travel-day-quickbar a')];
  const documentsLink=quickbar.find(a=>/travel-private-documents/.test(a.getAttribute('href')||'') || a.dataset.teeDocuments==='1');
  if(!documentsLink)return;
  documentsLink.dataset.teeDocuments='1';

  const style=document.createElement('style');
  style.textContent=`
    #today-documents-quickview{scroll-margin-top:108px;margin:14px 0 18px;border:2px solid #456b80;border-radius:16px;background:#f8fbfd;box-shadow:0 5px 18px rgba(34,75,96,.08)}
    #today-documents-quickview>summary{cursor:pointer;display:flex;justify-content:space-between;gap:12px;align-items:center;padding:14px 16px;font-weight:800;color:#244d63}
    #today-documents-quickview .today-documents-body{padding:0 16px 16px}
    #today-documents-quickview .today-documents-date{margin:0 0 8px;color:#48616f}
    #today-documents-quickview .today-documents-summary{margin:0 0 12px;padding:10px 12px;border-radius:12px;background:#eef5f8;color:#244d63;font-weight:700}
    #today-documents-quickview .today-documents-empty{padding:12px;border-radius:12px;background:#fff;border:1px solid #d7e2e8}
    #today-documents-quickview .today-documents-group{margin:12px 0;padding:12px;border-radius:14px;background:#fff;border:1px solid #d7e2e8}
    #today-documents-quickview .today-documents-group h4{margin:0 0 9px;color:#244d63}
    #today-documents-quickview .today-documents-group .authorized-record{margin-top:9px}
    #today-documents-quickview .today-documents-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    #today-documents-quickview .today-documents-actions a{display:inline-block;padding:10px 12px;border-radius:11px;background:#244d63;color:#fff;text-decoration:none;font-weight:700}
    #today-documents-quickview .today-documents-actions a.secondary{background:#fff;color:#244d63;border:1px solid #9eb3bf}
  `;
  document.head.appendChild(style);

  let panel=document.getElementById('today-documents-quickview');
  if(!panel){
    panel=document.createElement('details');
    panel.id='today-documents-quickview';
    panel.innerHTML=`<summary><span>Today’s Documents</span><span class="today-documents-state">Open</span></summary><div class="today-documents-body"></div>`;
    const anchor=document.getElementById('dailyVaultStatus');
    if(anchor?.parentNode)anchor.parentNode.insertBefore(panel,anchor.nextSibling);
    else document.querySelector('main')?.prepend(panel);
  }

  const state=panel.querySelector('.today-documents-state');
  const body=panel.querySelector('.today-documents-body');

  function dedupe(records){
    const seen=new Set();
    return (records||[]).filter(r=>{
      const key=r?.id||`${r?.type||''}|${r?.title||r?.typeLabel||''}|${JSON.stringify(r?.fields||[])}`;
      if(seen.has(key))return false;
      seen.add(key);return true;
    });
  }
  function groupHtml(title,records){
    records=dedupe(records);
    if(!records.length)return '';
    return `<section class="today-documents-group"><h4>${esc(title)} · ${records.length}</h4>${records.map(secureRecordHtml).join('')}</section>`;
  }
  function allRecordsOf(types){
    try{return dedupe(recordsOf(types));}catch{return [];}
  }

  function render(){
    let d=null;
    try{d=DAYS[activeIndex];}catch{}
    if(!d){body.innerHTML='<p class="today-documents-empty">Today is not available.</p>';return;}

    let session=null;
    try{session=secureSession();}catch{}
    if(!session){
      body.innerHTML=`<p class="today-documents-date"><strong>${esc(d.date)}</strong> · ${esc(d.city||'')}</p><div class="today-documents-empty"><strong>Secure Vault is locked.</strong><p>Unlock the Vault to show only the records relevant to this travel day.</p></div><div class="today-documents-actions"><a href="../travel-private-documents/index.html?teeView=vault&teeReturn=daily-documents">Open Secure Vault</a></div>`;
      return;
    }

    let matched=[];
    try{matched=dedupe(daySecureRecords(d));}catch{}

    const transportTypes=new Set(['flight','rail','railPass','transportation','rentalCar']);
    const lodgingTypes=new Set(['hotel']);
    const activityTypes=new Set(['activity']);
    const sourceTypes=new Set(['structuredDocument']);
    const transport=matched.filter(r=>transportTypes.has(r.type));
    const lodging=matched.filter(r=>lodgingTypes.has(r.type));
    const activities=matched.filter(r=>activityTypes.has(r.type));
    const sources=matched.filter(r=>sourceTypes.has(r.type));

    let identity=[];
    let support=[];
    try{if(needsIdentity(d,activeIndex))identity=allRecordsOf(DAILY_IDENTITY_TYPES);}catch{}
    try{if(needsSupport(d,activeIndex))support=allRecordsOf(DAILY_SUPPORT_TYPES);}catch{}

    const shown=dedupe([...transport,...lodging,...activities,...identity,...support,...sources]);
    const groups=[
      groupHtml('Transportation',transport),
      groupHtml('Lodging',lodging),
      groupHtml('Activities / reservations',activities),
      groupHtml('Identity / entry',identity),
      groupHtml('Travel support',support),
      groupHtml('Additional source details',sources)
    ].filter(Boolean).join('');

    const coverage=[];
    if(transport.length)coverage.push('transport');
    if(lodging.length)coverage.push('lodging');
    if(identity.length)coverage.push('identity');
    if(activities.length)coverage.push('activities');
    if(support.length)coverage.push('support');

    body.innerHTML=`<p class="today-documents-date"><strong>${esc(d.date)}</strong> · ${esc(d.city||'')}</p><p class="today-documents-summary">${shown.length?`${shown.length} relevant protected record${shown.length===1?'':'s'} shown${coverage.length?` · ${coverage.join(' · ')}`:''}.`:'No day-specific protected records are mapped for this date yet.'}</p>${groups||'<div class="today-documents-empty"><strong>No matching records for today.</strong><p>Use the full Source Documents library if you need something that has not yet been mapped to this date.</p></div>'}<div class="today-documents-actions"><a href="../travel-private-documents/index.html?teeView=vault&teeReturn=daily-documents">Open Secure Vault</a><a class="secondary" href="../travel-private-documents/index.html">Open Full Source Documents</a></div>`;
  }

  panel.addEventListener('toggle',()=>{state.textContent=panel.open?'Collapse':'Open';if(panel.open)render();});

  documentsLink.href='#today-documents-quickview';
  documentsLink.querySelector('span')?.replaceChildren(document.createTextNode('Today’s records'));
  documentsLink.addEventListener('click',event=>{
    event.preventDefault();
    render();
    panel.open=true;
    requestAnimationFrame(()=>window.scrollTo({top:Math.max(0,panel.getBoundingClientRect().top+window.scrollY-96),behavior:'smooth'}));
  });

  document.getElementById('previewDateSelect')?.addEventListener('change',()=>{if(panel.open)setTimeout(render,0);});
  document.getElementById('useActualDateBtn')?.addEventListener('click',()=>{if(panel.open)setTimeout(render,0);});
})();
