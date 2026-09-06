"use strict";

(function(){
  const openButton=document.getElementById('hubVaultRecordsOpen');
  const dialog=document.getElementById('hubVaultRecordsDialog');
  const closeButton=document.getElementById('hubVaultRecordsClose');
  const doneButton=document.getElementById('hubVaultRecordsDone');
  const search=document.getElementById('hubVaultRecordsSearch');
  const list=document.getElementById('hubVaultRecordsList');
  const count=document.getElementById('hubVaultRecordsCount');
  if(!openButton||!dialog||!list)return;

  // Load the lightweight one-tap editor bridge only when this viewer exists.
  if(!document.querySelector('script[data-tee-vault-edit-bridge]')){
    const script=document.createElement('script');
    script.src='hub-vault-edit-v3481.js';
    script.dataset.teeVaultEditBridge='1';
    document.head.appendChild(script);
  }

  const LABELS={
    emergencyContact:'Emergency Contact',passport:'Passport',globalEntry:'Global Entry / KTN',flight:'Flight',hotel:'Hotel',rail:'Rail',railPass:'Rail Pass',travelInsurance:'Travel Insurance',medical:'Medical',creditCard:'Credit Card',websiteLogin:'Website Login',rentalCar:'Rental Car',visa:'Visa',tripFolder:'Trip Folder'
  };
  const OMIT=new Set(['id','history','deletedAt','archivedAt','createdAt','updatedAt','access','privacy','visibility','zone','ownerProfileId','ownerProfile','favorite','tags','relationships']);

  function esc(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[ch]));}
  function human(key){return String(key||'').replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]+/g,' ').replace(/^./,c=>c.toUpperCase());}
  function titleFor(record){
    return record.contactName||record.hotelName||record.airline||record.fullName||record.name||record.title||record.label||record.destination||record.typeLabel||record.type||'Protected record';
  }
  function primitiveRows(record){
    const rows=[];
    for(const [key,value] of Object.entries(record||{})){
      if(OMIT.has(key)||value==null||value===''||key==='type'||key==='recordId'||key==='fields')continue;
      if(typeof value==='string'||typeof value==='number'||typeof value==='boolean')rows.push([human(key),String(value)]);
      else if(Array.isArray(value)&&value.length&&value.every(v=>['string','number','boolean'].includes(typeof v)))rows.push([human(key),value.join(', ')]);
    }
    if(Array.isArray(record?.fields)){
      record.fields.forEach(field=>{
        const value=field?.value;
        if(value==null||String(value).trim()==='')return;
        rows.push([field.label||human(field.key),String(value)]);
      });
    }
    return rows;
  }
  function searchableText(record){
    try{return JSON.stringify(record).toLowerCase();}catch{return String(titleFor(record)).toLowerCase();}
  }
  function requestEdit(record){
    if(!record?.recordId)return;
    close();
    window.dispatchEvent(new CustomEvent('tee-vault-edit-record',{detail:{recordId:record.recordId,title:titleFor(record)}}));
  }
  function render(){
    const session=window.TEEVaultSession?.get?.();
    const records=session?.records||[];
    const q=(search?.value||'').trim().toLowerCase();
    const shown=q?records.filter(r=>searchableText(r).includes(q)):records;
    list.innerHTML='';
    if(count)count.textContent=`Showing ${shown.length} of ${records.length} authorized record${records.length===1?'':'s'}.`;
    if(!shown.length){list.innerHTML='<section class="install-device-card"><strong>No matching authorized records.</strong></section>';return;}
    shown.forEach(record=>{
      const card=document.createElement('section');
      card.className='install-device-card';
      const rows=primitiveRows(record);
      const table=rows.map(([k,v])=>`<div style="display:grid;grid-template-columns:minmax(110px,35%) 1fr;gap:10px;padding:7px 0;border-top:1px solid #e2e8ec"><span style="color:#5b6b72">${esc(k)}</span><strong style="overflow-wrap:anywhere">${esc(v)}</strong></div>`).join('');
      card.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div><small style="font-weight:800;text-transform:uppercase;color:#50676d">${esc(LABELS[record.type]||record.typeLabel||human(record.type||'Record'))}</small><h3 style="margin:4px 0 8px">${esc(titleFor(record))}</h3></div><small style="font-weight:800">${esc(record.accessScope||record.privacy||record.visibility||record.zone||'authorized')}</small></div>${table||'<p>Authorized record available.</p>'}`;
      if(record.recordId){
        const edit=document.createElement('button');
        edit.type='button';
        edit.className='hub-primary-action';
        edit.textContent='Edit';
        edit.style.marginTop='12px';
        edit.addEventListener('click',()=>requestEdit(record));
        card.appendChild(edit);
      }
      list.appendChild(card);
    });
  }
  function open(){
    if(!window.TEEVaultSession?.isOpen?.())return;
    if(search)search.value='';
    render();
    if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
    setTimeout(()=>search?.focus(),50);
  }
  function close(){if(dialog.close)dialog.close();else dialog.removeAttribute('open');}

  openButton.addEventListener('click',open);
  closeButton?.addEventListener('click',close);
  doneButton?.addEventListener('click',close);
  search?.addEventListener('input',render);
  dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
  window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>{
    if(!window.TEEVaultSession?.isOpen?.() && dialog.open)close();
  });
})();

// v3.4.85 — complete tool directory under "Find any TEE tool".
(function(){
  const finder=[...document.querySelectorAll('details.streamline-secondary-tools')].find(node=>node.querySelector('summary')?.textContent?.trim()==='Find any TEE tool');
  if(!finder||finder.querySelector('[data-tee-complete-tool-lists]'))return;

  const wrap=document.createElement('div');
  wrap.dataset.teeCompleteToolLists='1';
  wrap.style.marginTop='16px';

  const nonVault=[
    ['Daily Operations','apps/travel-daily-operations/index.html','Today, tomorrow, reminders and Adaptive Checklist.'],
    ['Quick Reference','apps/travel-essentials/index.html','Emergency, contacts, identity, insurance and problem solving.'],
    ['Master Itinerary','apps/travel-itinerary/index.html','Full trip schedule and destination sequence.'],
    ['Transportation','apps/travel-transportation/index.html','Flights, trains, transfers, tickets, seats and baggage.'],
    ['Hotels','apps/travel-hotels/index.html','Lodging, addresses, check-in and hotel notes.'],
    ['Maps & Routes','apps/travel-maps-movement/index.html','Trip route, city movement and destination connections.'],
    ['Weather + Clothing','apps/travel-weather-clothing/index.html','Weather guidance, layers and clothing planning.'],
    ['Packing','apps/travel-packing/index.html','Packing lists, carry-on and trip gear.'],
    ['Local Knowledge','apps/travel-local-knowledge/index.html','Etiquette, safety, dining, transportation culture and practical guidance.'],
    ['Language','apps/travel-language/index.html','Travel phrases and country language help.'],
    ['Money + Tipping','apps/travel-money-tipping/index.html','Currency, cash/card strategy and tipping guidance.'],
    ['Expenses','apps/travel-costs/index.html','Record and review trip spending.'],
    ['Insurance','apps/travel-insurance/index.html','Travel insurance reference and claim preparation.'],
    ['Photos','apps/travel-photos/index.html','Photo reminders, shot ideas and archive support.'],
    ['Source Documents','apps/travel-private-documents/index.html','Add, review and process incoming travel documents.'],
    ['Document Library','apps/travel-private-documents/index.html?teeView=library','Original source documents and processing history.'],
    ['Trip Archive','apps/travel-archive/index.html','Post-trip journal, reviews and lessons learned.']
  ];

  const makeLink=([name,url,description])=>`<a class="stream-app-card" href="${url}" style="margin:0"><span class="stream-card-copy"><strong>${name}</strong><small>${description}</small></span><span class="stream-card-arrow">›</span></a>`;

  wrap.innerHTML=`
    <section style="margin-top:14px">
      <h3 style="margin:0 0 6px">1. Non-Vault Tools</h3>
      <p style="margin:0 0 10px;color:#5c6c73">These tools open without unlocking the Vault. Protected fields inside supported tools remain hidden until authorized.</p>
      <div class="stream-card-grid compact-grid">${nonVault.map(makeLink).join('')}</div>
    </section>
    <section style="margin-top:20px">
      <h3 style="margin:0 0 6px">2. Vault Tools 🔒</h3>
      <p style="margin:0 0 10px;color:#5c6c73">Use these for protected records, editing, backup/restore and advanced secure administration.</p>
      <div class="stream-card-grid compact-grid" data-tee-vault-tools>
        <button type="button" class="stream-app-card" data-vault-action="unlock" style="text-align:left"><span class="stream-card-copy"><strong>Secure Vault — Unlock / Lock</strong><small>Authorize protected details throughout TEE for 30 minutes.</small></span><span class="stream-card-arrow">›</span></button>
        <button type="button" class="stream-app-card" data-vault-action="records" style="text-align:left"><span class="stream-card-copy"><strong>Vault Records</strong><small>Search all records authorized for the current session.</small></span><span class="stream-card-arrow">›</span></button>
        <button type="button" class="stream-app-card" data-vault-action="records" style="text-align:left"><span class="stream-card-copy"><strong>Edit Protected Record</strong><small>Find a protected record, tap Edit, change it and save.</small></span><span class="stream-card-arrow">›</span></button>
        <a class="stream-app-card" href="apps/travel-private-documents/index.html?teeView=vault&teeEnter=1" style="margin:0"><span class="stream-card-copy"><strong>Secure Records / Vault Manager</strong><small>Full encrypted-record and Vault management workspace.</small></span><span class="stream-card-arrow">›</span></a>
        <a class="stream-app-card" href="apps/travel-private-documents/index.html?teeAction=restore&teeReturn=hub" style="margin:0"><span class="stream-card-copy"><strong>Encrypted Backup / Restore</strong><small>Restore the encrypted Vault on a new or replacement device.</small></span><span class="stream-card-arrow">›</span></a>
        <a class="stream-app-card" href="apps/tee-maintenance/index.html" style="margin:0"><span class="stream-card-copy"><strong>Maintenance 🔒</strong><small>Advanced backup, repair, diagnostics and system administration.</small></span><span class="stream-card-arrow">›</span></a>
      </div>
    </section>`;

  finder.appendChild(wrap);

  wrap.querySelector('[data-vault-action="unlock"]')?.addEventListener('click',()=>{
    finder.open=false;
    document.getElementById('hubVaultToggle')?.click();
  });
  wrap.querySelectorAll('[data-vault-action="records"]').forEach(button=>button.addEventListener('click',()=>{
    if(window.TEEVaultSession?.isOpen?.()){
      document.getElementById('hubVaultRecordsOpen')?.click();
    }else{
      finder.open=false;
      document.getElementById('hubVaultToggle')?.click();
    }
  }));
})();
