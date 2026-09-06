"use strict";
(function(){
  function isHub(){
    const p=location.pathname.replace(/\/+$/,'');
    return /\/TEE---Travel---App(?:\/index\.html)?$/.test(p);
  }
  if(!isHub())return;

  const nonVault=[
    ['Daily Operations','apps/travel-daily-operations/index.html'],
    ['Quick Reference','apps/travel-essentials/index.html'],
    ['Master Itinerary','apps/travel-itinerary/index.html'],
    ['Transportation','apps/travel-transportation/index.html'],
    ['Hotels','apps/travel-hotels/index.html'],
    ['Maps & Routes','apps/travel-maps-movement/index.html'],
    ['Weather + Clothing','apps/travel-weather-clothing/index.html'],
    ['Packing','apps/travel-packing/index.html'],
    ['Local Knowledge','apps/travel-local-knowledge/index.html'],
    ['Language','apps/travel-language/index.html'],
    ['Money + Tipping','apps/travel-money-tipping/index.html'],
    ['Expenses','apps/travel-costs/index.html'],
    ['Insurance','apps/travel-insurance/index.html'],
    ['Photos','apps/travel-photos/index.html'],
    ['Finish TEE','apps/travel-completion/index.html'],
    ['Source Documents','apps/travel-private-documents/index.html'],
    ['Document Library','apps/travel-private-documents/index.html?teeView=library'],
    ['Trip Archive','apps/travel-archive/index.html']
  ];
  const vault=[
    ['Secure Vault — Unlock / Lock','#tee-vault'],
    ['Vault Records','#tee-vault-records'],
    ['Edit Protected Record','#tee-vault-records'],
    ['Secure Records / Vault Manager','apps/travel-private-documents/index.html?teeView=vault&teeEnter=1'],
    ['Encrypted Backup / Restore','apps/travel-private-documents/index.html?teeAction=restore&teeReturn=hub'],
    ['Maintenance','apps/tee-maintenance/index.html']
  ];

  function toolCard(name,url,vaultTool){
    const a=document.createElement('a');
    a.className='stream-app-card';
    a.href=url;
    a.innerHTML=`<span class="stream-card-copy"><strong>${name}${vaultTool?' 🔒':''}</strong><small>${vaultTool?'Protected / authorized tool':'Normal traveler tool'}</small></span><span class="stream-card-arrow">›</span>`;
    if(url==='#tee-vault')a.addEventListener('click',e=>{e.preventDefault();document.getElementById('hubVaultToggle')?.click();});
    if(url==='#tee-vault-records')a.addEventListener('click',e=>{e.preventDefault();if(window.TEEVaultSession?.isOpen?.())document.getElementById('hubVaultRecordsOpen')?.click();else document.getElementById('hubVaultToggle')?.click();});
    return a;
  }

  function install(){
    const prep=document.getElementById('preparationGrid');
    if(prep && !prep.querySelector('[data-tee-completion-card]')){
      const a=document.createElement('a');
      a.className='stream-app-card';a.href='apps/travel-completion/index.html';a.dataset.teeCompletionCard='1';
      a.innerHTML='<span class="stream-card-order">1</span><span class="stream-card-copy"><strong>Finish TEE</strong><small>See exactly what still needs to be collected, verified, produced and tested before departure.</small></span><span class="stream-card-arrow">›</span>';
      prep.prepend(a);
      [...prep.querySelectorAll(':scope > .stream-app-card .stream-card-order')].forEach((n,i)=>n.textContent=String(i+1));
    }

    const details=[...document.querySelectorAll('details.streamline-secondary-tools')].find(d=>/Find any TEE tool/i.test(d.querySelector('summary')?.textContent||''));
    if(details && !details.querySelector('[data-tee-complete-directory]')){
      const wrap=document.createElement('div');wrap.dataset.teeCompleteDirectory='1';wrap.style.marginTop='16px';
      const make=(title,items,vaultTool)=>{
        const section=document.createElement('section');section.style.marginTop='16px';
        const h=document.createElement('h3');h.textContent=title;section.appendChild(h);
        const grid=document.createElement('div');grid.className='stream-card-grid compact-grid';
        items.forEach(([n,u])=>grid.appendChild(toolCard(n,u,vaultTool)));section.appendChild(grid);return section;
      };
      wrap.appendChild(make('1. Non-Vault Tools',nonVault,false));
      wrap.appendChild(make('2. Vault Tools',vault,true));
      details.appendChild(wrap);
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0));else setTimeout(install,0);
  const mo=new MutationObserver(()=>install());
  mo.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>mo.disconnect(),5000);
})();
