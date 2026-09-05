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

  // Refresh the current Today/Tomorrow rendering after mutating the in-memory day data.
  // Reuses the app's existing event path rather than replacing its renderer.
  const select=document.getElementById('previewDateSelect');
  if(select){
    try{ select.dispatchEvent(new Event('change',{bubbles:true})); }catch{}
  }

  // v3.4.46 — Tomorrow reopen guard.
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

  // v3.4.49 — Keep Oct 6 in chronological order.
  // Oct 6 returns through Istanbul after Switzerland, so move that rendered day
  // immediately before Oct 7 instead of leaving it back in the earlier Türkiye group.
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

  const mount=document.getElementById('countryMount');
  if(mount){
    fixOct6Order();
    const observer=new MutationObserver(()=>fixOct6Order());
    observer.observe(mount,{childList:true,subtree:true});
  }

  // v3.4.51 — turn the quickbar Documents button into a Today-specific document view.
  if(!document.querySelector('script[data-tee-today-documents]')){
    const script=document.createElement('script');
    script.src='today-documents-v3451.js?v=3.4.51';
    script.dataset.teeTodayDocuments='3.4.51';
    document.head.appendChild(script);
  }
})();
