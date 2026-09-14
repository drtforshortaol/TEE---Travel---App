"use strict";
(function(){
  if(typeof DAYS==='undefined' || !Array.isArray(DAYS)) return;

  function day(date){ return DAYS.find(d=>d.date===date); }
  function replace(date, patch){ const d=day(date); if(d) Object.assign(d, patch); }

  // Official Enchanting Travels Part 1 operational corrections, Sept. 15–30, 2026.
  // Updated from the Sept. 14 pre-trip Zoom call with Puneet.
  // Keep exact booking/confirmation/contact details in Secure Vault; this overlay only corrects public-safe operational context.

  replace('Sep 16, 2026',{
    type:'Arrival / Transfer day',
    city:'Istanbul',
    transport:['Turkish Airlines arrival at Istanbul about 17:40','Private airport transfer to Istanbul hotel'],
    activities:['Clear immigration and collect luggage','Meet Enchanting Travels representative / driver at Exit Gate 14','Settle into Istanbul hotel'],
    reminders:['Exit Gate 14 is the confirmed meeting point','If you exit elsewhere, walk to Exit 14','Allow roughly 45–60 minutes for immigration and luggage','If airport exit takes more than about one hour, contact Puneet so the driver / parking can be updated','Look for the Enchanting Travels / traveler-name sign']
  });

  replace('Sep 17, 2026',{
    type:'Full tour day',
    city:'Istanbul',
    transport:['09:00 hotel pickup','Private touring as arranged'],
    activities:['Full-day Old Town tour','Bosphorus Cruise'],
    reminders:['Hotel pickup is 09:00','Tour is approximately 8 hours','Expected hotel return is around 17:00','Charge phone/camera and carry mosque-appropriate layer']
  });

  replace('Sep 18, 2026',{
    type:'Move day / Flight + Underground City',
    city:'Cappadocia',
    transport:['08:00 hotel pickup for Istanbul Airport','Turkish Airlines Istanbul → Kayseri','Private transfer from Kayseri with en-route Underground City tour'],
    activities:['Underground City tour before hotel check-in'],
    reminders:['Hotel pickup is 08:00','At Kayseri collect luggage, then meet driver in the arrival hall','Virginia / Vicki is the lead traveler for the group; look for her name and/or Enchanting Travels sign','Underground City touring is approximately 4 hours','Luggage remains with the vehicle during touring','Meals are not included; driver can stop for lunch/snacks if needed','Prepare for very early balloon pickup tomorrow']
  });

  replace('Sep 19, 2026',{
    type:'Early start / Full activity day',
    activities:['Group Sunrise Hot Air Balloon Tour','Private Highlights of Cappadocia Tour'],
    transport:['Very early balloon pickup as arranged','09:00 private Cappadocia highlights tour'],
    reminders:['Balloon pickup time will be confirmed the night before and may be around 04:00–06:00','Carry original passports for the balloon activity; original passport is the safer choice','Return to hotel after balloon activity','Private highlights tour begins at 09:00 and is expected to finish around 17:00','Prepare warm sunrise layer and walking shoes','Balloon activity is weather-dependent']
  });

  replace('Sep 20, 2026',{
    type:'Free day / Evening ceremony',
    activities:['Evening ceremony'],
    transport:['17:45 hotel pickup for ceremony','Private return transfer after ceremony'],
    reminders:['Hotel pickup is 17:45','Ceremony begins about 18:30','Phones must be silent','No photographs or videos during the ceremony','Keep daytime flexible','Pack most luggage before the evening ceremony','Review tomorrow move to Zagreb']
  });

  replace('Sep 21, 2026',{
    type:'Move day / Two-flight connection',
    city:'Zagreb',
    transport:['Approximately 12:15 pickup for Kayseri airport','TK2017 Kayseri → Istanbul','Change aircraft in Istanbul','TK1055 Istanbul → Zagreb','Private transfer Zagreb airport to hotel'],
    activities:['Arrival and settle in Zagreb'],
    reminders:['Airport pickup is approximately 12:15','TK2017 and TK1055 are two different flights / aircraft; change planes in Istanbul','Istanbul layover is approximately 1 hour 45 minutes','Checked baggage should be through-checked to Zagreb; no retrieval/recheck planned in Istanbul','Zagreb arrival is approximately 19:40','After customs and baggage claim meet the driver / representative in the arrival hall','Driver/contact information is in the itinerary/app']
  });

  replace('Sep 22, 2026',{
    type:'Private day trip',
    city:'Zagreb',
    transport:['09:00 pickup for private day trip'],
    activities:['Private day trip'],
    reminders:['Pickup is 09:00','Tour is approximately 6 hours','Meals are not included','There will be opportunities for a meal/snack break','Guide/driver information is in the itinerary']
  });

  replace('Sep 23, 2026',{
    type:'Move + park day',
    city:'Plitvice Lakes',
    transport:['Approximately 09:00 departure from Zagreb','Private drive to Plitvice Lakes area'],
    activities:['Meet guide at Entrance 1 around 11:30','Private Plitvice Lakes National Park visit'],
    reminders:['Depart Zagreb at approximately 09:00','Meet guide at Entrance 1 at approximately 11:30','Guide and driver information are in the itinerary','Pack rain layer and grip walking shoes']
  });

  replace('Sep 24, 2026',{
    type:'Move day',
    city:'Rovinj / Istria',
    transport:['Approximately 11:00 pickup','Private transfer to Rovinj / Istria area'],
    activities:['Transfer and hotel arrival'],
    reminders:['Pickup is approximately 11:00','Drive is approximately 3 hours','No scheduled sightseeing stop en route']
  });

  replace('Sep 25, 2026',{
    type:'Tour day',
    city:'Rovinj / Istria',
    transport:['09:30 pickup for hilltop-town tour','Private local touring'],
    activities:['Istria hilltop-town tour','Wine tasting around 13:30'],
    reminders:['Pickup is 09:30','Wine tasting is approximately 13:30','Driver and guide contacts are in the itinerary','Evening is at leisure after the tour']
  });

  replace('Sep 26, 2026',{
    type:'Half-day excursion',
    city:'Pula / Rovinj',
    transport:['Private Pula excursion','Approximately 40 minutes transfer each way'],
    activities:['Pula excursion','Pula amphitheater'],
    reminders:['Half-day excursion','Allow approximately 40 minutes transfer each way','Meals are not included','Pula amphitheater admission is included','Pack for Ljubljana tomorrow']
  });

  replace('Sep 27, 2026',{
    type:'Move + cave tour day',
    city:'Ljubljana',
    transport:['Approximately 11:00 pickup','Private transfer with en-route cave tour','Continue to Ljubljana hotel after sightseeing'],
    activities:['En-route cave tour'],
    reminders:['Pickup is approximately 11:00','Allow approximately 2.5 hours transfer time in addition to sightseeing','Check into hotel after the cave visit','No additional planned activity that evening','Beginning of a 3-night stay']
  });

  replace('Sep 28, 2026',{
    type:'Group trip day / Off-site meeting point',
    city:'Ljubljana / Bled / Bohinj',
    transport:['Walk approximately 10 minutes from hotel to the meeting point','Group trip transportation from meeting point'],
    activities:['08:00 tour / activity start','Group trip to Lake Bled & Bohinj Valley'],
    reminders:['This is a meeting-point start, not hotel pickup','Meeting point is by the fountain in front of / near the hotel; map link is in the travel app','Plan to arrive 10–15 minutes before 08:00','Guide contact number is in the itinerary']
  });

  replace('Sep 29, 2026',{
    type:'City tour / Pack night',
    city:'Ljubljana',
    transport:['09:00 private walking tour start','Local walking'],
    activities:['Private Walking Tour of Ljubljana','Independent central-area / market exploration afterward'],
    reminders:['Walking tour begins at 09:00','Guided portion is approximately 2 hours','Tour does not necessarily end back at the hotel','You may remain in the market / central area afterward','Pack for rail extension','Review Eurail / Rail Europe setup']
  });

  replace('Sep 30, 2026',{
    type:'Move day / Rail extension begins',
    city:'Salzburg',
    hotel:'H+ Hotel Salzburg',
    transport:['07:10 hotel pickup / transfer to Ljubljana train station','Ljubljana 07:42 → Villach Hbf 09:22, INT 318','Villach Hbf 10:32 → Salzburg Hbf 12:53, IC 796, 1st class'],
    activities:['Enchanting Travels Part 1 concludes at the station transfer','Independent rail extension begins','Arrive Salzburg'],
    reminders:['Hotel pickup is 07:10','Active Eurail trip shows seat reservations optional for both listed journeys','Allow margin for the 70-minute Villach connection','Keep the separately issued Villach→Salzburg rail document accessible','Show the live Eurail ticket in the Rail Planner app during inspection; a screenshot is not a valid travel ticket','Confirm hotel check-in and next-day Salzburg plan']
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
    reminders:['Show the live Eurail ticket in Rail Planner during inspection','Confirm Fred Hotel self check-in instructions in Secure Vault','Review tomorrow Zürich HB 10:02 → Zürich Flughafen 10:11','Prepare for Turkish Airlines TK 1208 to Istanbul']
  });

  replace('Oct 6, 2026',{
    type:'Flight positioning day',
    city:'Istanbul Airport',
    hotel:'YOTELAIR Istanbul Airport Airside',
    transport:['Zürich HB 10:02 → Zürich Flughafen 10:11, IC 513','Turkish Airlines TK 1208: ZRH 13:35 → IST 17:35'],
    activities:['Airport positioning','Airside overnight at Istanbul Airport'],
    reminders:['Eurail shows seat reservations optional for the airport train','Use the live Eurail ticket in Rail Planner; screenshots are not valid travel tickets','At Zurich check-in ask whether bags can be tagged through to SFO','Verify the baggage tag destination yourself','Keep overnight essentials in carry-on','Confirm YOTELAIR airside access requirements before leaving Zurich']
  });

  replace('Oct 7, 2026',{
    type:'Return flight day',
    city:'Istanbul → San Francisco',
    hotel:'In transit',
    transport:['Turkish Airlines TK 79: IST 13:15 → SFO 16:40'],
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
