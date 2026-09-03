"use strict";
(function(){
  const BUILD='3.4.28';
  const normalizeTitle=v=>String(v||'').trim().toLowerCase().replace(/\s+\(\d+\)$/,'').replace(/\s+/g,' ');
  const groupKey=r=>[normalizeTitle(r?.title),r?.originalClassification||'private',r?.targetProfile||''].join('|');
  let latest=[];
  let timer=0;

  function groups(records){
    const map=new Map();
    (records||[]).forEach(r=>{
      const key=groupKey(r);
      if(!normalizeTitle(r?.title))return;
      const list=map.get(key)||[];
      list.push(r);
      map.set(key,list);
    });
    return map;
  }

  function removeOld(){
    document.querySelectorAll('[data-tee-related-v3428]').forEach(el=>el.remove());
  }

  function decorate(){
    timer=0;
    removeOld();
    const map=groups(latest);
    let duplicateGroups=0;
    map.forEach(list=>{if(list.length>1)duplicateGroups++;});

    map.forEach(list=>{
      if(list.length<2)return;
      list.forEach(r=>{
        const card=document.querySelector(`.source-manager-card[data-document-id="${CSS.escape(String(r.documentId||''))}"]`);
        if(card){
          const note=document.createElement('div');
          note.dataset.teeRelatedV3428='1';
          note.className='source-manager-linkage';
          note.style.borderLeft='4px solid #b7791f';
          note.innerHTML=`<strong>Related records detected</strong><span>TEE found ${list.length} records with the same document/traveler title and destination. Review the existing records before adding another copy. Nothing is merged or deleted automatically.</span>`;
          const linkage=card.querySelector('.source-manager-linkage');
          if(linkage)card.insertBefore(note,linkage);else card.appendChild(note);
        }
        const lib=document.querySelector(`.tee-local-source-library-card[data-document-id="${CSS.escape(String(r.documentId||''))}"] .meta`);
        if(lib){
          const chip=document.createElement('span');
          chip.dataset.teeRelatedV3428='1';
          chip.className='chip';
          chip.textContent=`Related records: ${list.length}`;
          lib.appendChild(chip);
        }
      });
    });

    const summary=document.getElementById('sourceManagerSummary');
    if(summary){
      const marker=document.createElement('span');
      marker.dataset.teeRelatedV3428='1';
      marker.textContent=duplicateGroups?` · ${duplicateGroups} related-record group${duplicateGroups===1?'':'s'} detected`:' · Related-record check: no duplicates detected';
      summary.appendChild(marker);
    }
    const buildLabel=document.querySelector('header.hero .subtitle strong');
    if(buildLabel)buildLabel.textContent=`TEE v${BUILD}`;
  }

  function schedule(){
    if(timer)clearTimeout(timer);
    timer=setTimeout(decorate,90);
  }

  window.addEventListener('tee-local-source-inventory-changed',e=>{
    latest=Array.isArray(e.detail?.records)?e.detail.records:[];
    schedule();
  });
  document.addEventListener('click',e=>{
    const t=e.target instanceof Element?e.target:null;
    if(t?.closest('#sourceManagerNeeds,#sourceManagerStructured,#sourceManagerArchived,#sourceManagerAll,#streamDocumentLibrary'))schedule();
  },true);
  if(Array.isArray(window.TEELocalSourceInventoryV3426)){latest=window.TEELocalSourceInventoryV3426;schedule();}
})();
