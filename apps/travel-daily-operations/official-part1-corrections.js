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

  // v3.4.88 — Part 2 audit overlay. Keep public-safe operational facts in Daily Operations
  // and leave exact booking references, seat numbers, addresses, contacts and payment details in Secure Vault.
  replace('Sep 30, 2026',{
    type:'Move day / Rail extension begins',
    city:'Salzburg',
    hotel:'H+ Hotel Salzburg',
    transport:['Ljubljana → Villach: exact timetable still pending confirmation','Villach Hbf 10:32 → Salzburg Hbf 12:53, IC796, 1st class'],
    activities:['Rail extension begins','Arrive Salzburg'],
    reminders:['Do not rely on older proposed Ljubljana→Villach times','Allow margin for the Villach connection','Printed A4 reservation is required for the confirmed Villach→Salzburg segment','Confirm hotel check-in and next-day Salzburg plan']
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
    transport:['Salzburg Hbf 06:56 → Zürich HB 13:28, 1st class','Zürich HB 14:02 → Visp 16:04, train 820, 1st class','Visp → Zermatt: final exact timetable still pending documentation'],
    activities:['Long rail transfer','Arrival in car-free Zermatt'],
    reminders:['Leave H+ Hotel early enough for the 06:56 train','Keep paper Salzburg→Zürich ticket/reservation accessible','Use the confirmed Zürich HB 14:02 connection to Visp','Verify the final Visp→Zermatt train before travel','Check mountain visibility for tomorrow']
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
    transport:['Zermatt → Lucerne rail transfer; exact train numbers and connection times still pending final confirmation'],
    activities:['Arrive Lucerne','Old Town / lake walk if time allows'],
    reminders:['Verify exact Zermatt→Lucerne itinerary before travel','Keep rail pass/tickets accessible','Confirm Lucerne hotel check-in','Review tomorrow Lucerne→Zurich move']
  });

  replace('Oct 5, 2026',{
    type:'Short move day',
    city:'Zurich',
    hotel:'Fred Hotel Hauptbahnhof / Self Check-in',
    transport:['Lucerne → Zürich HB rail transfer; exact departure/arrival time still pending final confirmation'],
    activities:['Zurich arrival','Old Town / lake / cafes as time allows'],
    reminders:['Verify exact Lucerne→Zurich train before travel','Confirm Fred Hotel self check-in instructions in Secure Vault','Review Zürich HB → Zürich Flughafen plan for tomorrow','Prepare for Zurich→Istanbul flight']
  });

  replace('Oct 6, 2026',{
    type:'Flight positioning day',
    city:'Istanbul Airport',
    hotel:'YOTELAIR Istanbul Airport Airside',
    transport:['Zürich HB → Zürich Flughafen by frequent direct train','Zurich → Istanbul flight approximately 13:35 → 17:35; exact flight number still needs latest-confirmation verification'],
    activities:['Airport positioning','Airside overnight at Istanbul Airport'],
    reminders:['Leave Zurich with ample airport/check-in margin','At Zurich check-in ask whether bags can be tagged through to SFO','Verify the baggage tag destination yourself','Keep overnight essentials in carry-on','Confirm YOTELAIR airside access requirements before leaving Zurich']
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

  // v3.4.58 — checklist instructions clarify cumulative trip behavior and deletion.
  if(!document.querySelector('script[data-tee-checklist-quick-access]')){
    const script=document.createElement('script');
    script.src='checklist-quick-access-v3454.js?v=3.4.58';
    script.dataset.teeChecklistQuickAccess='3.4.58';
    document.head.appendChild(script);
  }
})();
