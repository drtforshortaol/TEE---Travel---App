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

  replace('Sep 30, 2026',{
    type:'Move day / Rail extension begins',
    city:'Salzburg',
    hotel:'H+ Hotel Salzburg',
    transport:['Ljubljana 07:42 → Villach Hbf 09:22, INT 318','Villach Hbf 10:32 → Salzburg Hbf 12:53, IC 796, 1st class'],
    activities:['Rail extension begins','Arrive Salzburg'],
    reminders:['Active Eurail trip shows seat reservations optional for both listed journeys','Allow margin for the 70-minute Villach connection','Keep the separately issued Villach→Salzburg rail document accessible','Show the live Eurail ticket in the Rail Planner app during inspection; a screenshot is not a valid travel ticket','Confirm hotel check-in and next-day Salzburg plan']
  });

  replace('Oct 1, 2026',{
    type:'Free / Local day',
    city:'Salzburg',
    hotel:'H+ Hotel Salzburg',
    transport:['Local walking/transit as needed'],
    activities:['Salzburg exploration / optional local plan'],
    reminders:['Choose activities based on weather','Prepare for early departure tomorrow','Confirm Salzburg Hbf departure at 06:56','Keep paper rail ticket/reservation accessible']
  });

  replace('Oct 2, 2026',{
    type:'Long rail move',
    city:'Zermatt',
    hotel:'Haus Juliana Airbnb',
    transport:['Salzburg Hbf 06:56 → Zürich HB 13:28, RJ 13478','Zürich HB 14:02 → Visp 16:04, IC 820','Visp 16:37 → Zermatt 17:50, RE 351'],
    activities:['Long rail transfer','Arrival in car-free Zermatt'],
    reminders:['Leave H+ Hotel early enough for the 06:56 train','Eurail shows seat reservations recommended on Salzburg→Zürich','Eurail shows seat reservations optional on Zürich→Visp','Keep the paper Salzburg→Zürich ticket/reservation accessible','Allow 33 minutes at Visp for the 16:37 Zermatt connection','Show the live Eurail ticket in Rail Planner during inspection','Check mountain visibility for tomorrow']
  });

  replace('Oct 3, 2026',{
    type:'Mountain day',
    city:'Zermatt / Matterhorn',
    hotel:'Haus Juliana Airbnb',
    transport:['Walking / mountain railway / cable car as selected'],
    activities:['Choose Gornergrat / Matterhorn Glacier Paradise / Sunnegga based on weather and visibility'],
    reminders:['Check mountain webcams and weather before committing','Start early if visibility is good','Keep a lower-elevation fallback plan if clouds or wind are poor']
  });

  replace('Oct 4, 2026',{
    type:'Move day',
    city:'Lucerne',
    hotel:'AMERON Luzern Hotel Flora',
    transport:['Zermatt 08:37 → Visp 09:47, RE 226','Visp 10:54 → Bern 11:53, IC 817','Bern 12:36 → Luzern 14:03, RE 4371'],
    activities:['Rail transfer','Arrive Lucerne','Old Town / lake walk if time allows'],
    reminders:['Allow 67 minutes at Visp and 43 minutes at Bern','Eurail shows seat reservations optional on Visp→Bern','Show the live Eurail ticket in Rail Planner during inspection','Confirm Lucerne hotel check-in','Review tomorrow 09:09 Lucerne→Zurich move']
  });

  replace('Oct 5, 2026',{
    type:'Short move day',
    city:'Zurich',
    hotel:'Fred Hotel Hauptbahnhof / Self Check-in',
    transport:['Luzern 09:09 → Zürich HB 09:51, TRN 2616'],
    activities:['Zurich arrival','Old Town / lake / cafes as time allows'],
    reminders:['Show the live Eurail ticket in Rail Planner during inspection','Confirm Fred Hotel self check-in instructions in Secure Vault','Review tomorrow Zürich HB 10:02 → Zürich Flughafen 10:11','Prepare for Zurich→Istanbul flight']
  });

  replace('Oct 6, 2026',{
    type:'Flight positioning day',
    city:'Istanbul Airport',
    hotel:'YOTELAIR Istanbul Airport Airside',
    transport:['Zürich HB 10:02 → Zürich Flughafen 10:11, IC 513','Zurich → Istanbul flight approximately 13:35 → 17:35; exact flight number still needs latest-confirmation verification'],
    activities:['Airport positioning','Airside overnight at Istanbul Airport'],
    reminders:['Eurail shows seat reservations optional for the airport train','Use the live Eurail ticket in Rail Planner; screenshots are not valid travel tickets','At Zurich check-in ask whether bags can be tagged through to SFO','Verify the baggage tag destination yourself','Keep overnight essentials in carry-on','Confirm YOTELAIR airside access requirements before leaving Zurich']
  });

  replace('Oct 7, 2026',{
    type:'Return flight day',
    city:'Istanbul → San Francisco',
    hotel:'In transit',
    transport:['Turkish Airlines return: IST 13:15 → SFO 16:40'],
    activities:['Return home'],
    reminders:['Confirm boarding gate and checked-baggage status','Keep passport, medications and chargers in carry-on','Do a final room/airport-seat check before departure','Save final trip notes after arrival']
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

  if(!document.querySelector('script[data-tee-checklist-quick-access]')){
    const script=document.createElement('script');
    script.src='checklist-quick-access-v3454.js?v=3.4.58';
    script.dataset.teeChecklistQuickAccess='3.4.58';
    document.head.appendChild(script);
  }
})();
