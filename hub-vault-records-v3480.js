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

  function esc(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
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
