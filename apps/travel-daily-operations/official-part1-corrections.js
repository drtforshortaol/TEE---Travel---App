"use strict";
(function(){
  if(typeof DAYS==='undefined' || !Array.isArray(DAYS)) return;

  function day(date){ return DAYS.find(d=>d.date===date); }
  function replace(date, patch){ const d=day(date); if(d) Object.assign(d, patch); }

  // Official Enchanting Travels Part 1 itinerary, Sept. 15–30, 2026.
  // Keep exact booking/confirmation/contact details in Secure Vault; this overlay only corrects public-safe operational context.
  replace('Sep 19, 2026',{
    type:'Early start / Full activity day',
    activities:['Group Sunrise Hot Air Balloon Tour','Private Highlights of Cappadocia Tour'],
    transport:['Early balloon pickup as arranged','Private touring as arranged'],
    reminders:['Confirm balloon pickup time the night before','Prepare warm sunrise layer and walking shoes','Balloon activity is weather-dependent','Prepare for Whirling Dervish Ceremony tomorrow']
  });

  replace('Sep 20, 2026',{
    type:'Free day / Evening ceremony',
    activities:['Private Whirling Dervish Ceremony'],
    transport:['Private ceremony transfer as arranged'],
    reminders:['Keep daytime flexible','Review tomorrow move to Zagreb','Pack most luggage before the evening ceremony','Confirm airport transfer timing in Secure Vault']
  });

  const select=document.getElementById('previewDateSelect');
  if(select){
    try{ select.dispatchEvent(new Event('change',{bubbles:true})); }catch{}
  }

  document.addEventListener('click',event=>{
    const link=event.target.closest?.('[data-tee-jump="tomorrow"]');
    if(!link)return;
    setTimeout(()=>{
      try{
        const targetIndex=Math.min(activeIndex+1,DAYS.length-1);
        const target=document.querySelector(`.trip-day-dropdown[data-day-index="${targetIndex}"]`);
        if(!target)return;
        target.hidden=false;
        delete target.dataset.teeItineraryHidden;
        const country=target.closest('.country-dropdown');
        if(country)country.open=true;
        target.open=true;
        const status=target.querySelector('.day-status');
        if(status)status.textContent='COLLAPSE';
      }catch{}
    },0);
  });

  function fixOct6Order(){
    const oct6Index=DAYS.findIndex(d=>d.date==='Oct 6, 2026');
    const oct7Index=DAYS.findIndex(d=>d.date==='Oct 7, 2026');
    if(oct6Index<0||oct7Index<0)return;
    const oct6=document.querySelector(`.trip-day-dropdown[data-day-index="${oct6Index}"]`);
    const oct7=document.querySelector(`.trip-day-dropdown[data-day-index="${oct7Index}"]`);
    if(!oct6||!oct7)return;
    const returnDays=oct7.parentElement;
    if(!returnDays)return;
    if(oct6.parentElement!==returnDays || oct6.nextElementSibling!==oct7){
      returnDays.insertBefore(oct6,oct7);
    }
  }

  function compactRange(indices){
    if(!indices.length)return '';
    const groups=[];let start=indices[0],prev=indices[0];
    for(let i=1;i<indices.length;i++){
      const idx=indices[i];
      if(idx===prev+1){prev=idx;continue;}
      groups.push([start,prev]);start=prev=idx;
    }
    groups.push([start,prev]);
    const parts=groups.map(([a,b])=>{
      const da=DAYS[a]?.date||'';const db=DAYS[b]?.date||'';
      if(a===b)return da;
      const ma=da.match(/^([A-Za-z]+) (\d+), (\d{4})$/);const mb=db.match(/^([A-Za-z]+) (\d+), (\d{4})$/);
      if(ma&&mb&&ma[1]===mb[1]&&ma[3]===mb[3])return `${ma[1]} ${ma[2]}–${mb[2]}, ${ma[3]}`;
      return `${da} → ${db}`;
    });
    return parts.join(' · ');
  }

  function fixCountryDateLabels(){
    document.querySelectorAll('.country-dropdown').forEach(wrap=>{
      const small=wrap.querySelector(':scope > summary small');
      if(!small)return;
      const indices=[...wrap.querySelectorAll(':scope > .country-days > .trip-day-dropdown[data-day-index]')]
        .map(card=>Number(card.dataset.dayIndex)).filter(Number.isFinite);
      const label=compactRange(indices);
      if(label&&small.textContent!==label)small.textContent=label;
    });
  }

  const mount=document.getElementById('countryMount');
  if(mount){
    fixOct6Order();fixCountryDateLabels();
    let queued=false;
    const observer=new MutationObserver(()=>{
      if(queued)return;queued=true;
      requestAnimationFrame(()=>{queued=false;fixOct6Order();fixCountryDateLabels();});
    });
    observer.observe(mount,{childList:true,subtree:true});
  }

  if(!document.querySelector('script[data-tee-today-documents]')){
    const script=document.createElement('script');
    script.src='today-documents-v3451.js?v=3.4.53';
    script.dataset.teeTodayDocuments='3.4.53';
    document.head.appendChild(script);
  }

  // v3.4.57 — checklist uses a trash-can delete control for custom items.
  if(!document.querySelector('script[data-tee-checklist-quick-access]')){
    const script=document.createElement('script');
    script.src='checklist-quick-access-v3454.js?v=3.4.57';
    script.dataset.teeChecklistQuickAccess='3.4.57';
    document.head.appendChild(script);
  }
})();
