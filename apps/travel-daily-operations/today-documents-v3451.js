"use strict";
(function(){
  const quickbar=[...document.querySelectorAll('.travel-day-quickbar a')];
  const documentsLink=quickbar.find(a=>/travel-private-documents/.test(a.getAttribute('href')||''));
  if(!documentsLink)return;

  const style=document.createElement('style');
  style.textContent=`
    #today-documents-quickview{scroll-margin-top:108px;margin:14px 0 18px;border:2px solid #456b80;border-radius:16px;background:#f8fbfd;box-shadow:0 5px 18px rgba(34,75,96,.08)}
    #today-documents-quickview>summary{cursor:pointer;display:flex;justify-content:space-between;gap:12px;align-items:center;padding:14px 16px;font-weight:800;color:#244d63}
    #today-documents-quickview .today-documents-body{padding:0 16px 16px}
    #today-documents-quickview .today-documents-date{margin:0 0 12px;color:#48616f}
    #today-documents-quickview .today-documents-empty{padding:12px;border-radius:12px;background:#fff;border:1px solid #d7e2e8}
    #today-documents-quickview .today-documents-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    #today-documents-quickview .today-documents-actions a{display:inline-block;padding:10px 12px;border-radius:11px;background:#244d63;color:#fff;text-decoration:none;font-weight:700}
  `;
  document.head.appendChild(style);

  const panel=document.createElement('details');
  panel.id='today-documents-quickview';
  panel.innerHTML=`<summary><span>Today’s Documents</span><span class="today-documents-state">Open</span></summary><div class="today-documents-body"></div>`;
  const anchor=document.getElementById('dailyVaultStatus');
  if(anchor?.parentNode)anchor.parentNode.insertBefore(panel,anchor.nextSibling);
  else document.querySelector('main')?.prepend(panel);

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

  function render(){
    let d=null;
    try{d=DAYS[activeIndex];}catch{}
    if(!d){body.innerHTML='<p class="today-documents-empty">Today is not available.</p>';return;}

    let session=null;
    try{session=secureSession();}catch{}
    if(!session){
      body.innerHTML=`<p class="today-documents-date"><strong>${esc(d.date)}</strong> · ${esc(d.city||'')}</p><div class="today-documents-empty"><strong>Secure Vault is locked.</strong><p>Unlock the Vault to show the documents and protected records relevant to this travel day.</p></div><div class="today-documents-actions"><a href="../travel-private-documents/index.html?teeView=vault">Open Secure Vault</a></div>`;
      return;
    }

    let records=[];
    try{records=daySecureRecords(d);}catch{}
    try{
      if(needsIdentity(d,activeIndex))records=records.concat(recordsOf(DAILY_IDENTITY_TYPES));
    }catch{}
    records=dedupe(records);

    body.innerHTML=`<p class="today-documents-date"><strong>${esc(d.date)}</strong> · ${esc(d.city||'')}</p>${records.length?records.map(secureRecordHtml).join(''):'<div class="today-documents-empty"><strong>No day-specific protected records are mapped yet.</strong><p>The full Source Documents library is still available below.</p></div>'}<div class="today-documents-actions"><a href="../travel-private-documents/index.html">Open Full Source Documents</a></div>`;
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
