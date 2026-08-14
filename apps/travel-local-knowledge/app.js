const KNOWLEDGE = [
  {country:'Turkey', place:'Istanbul', topic:'Etiquette / Safety / Transit', title:'Istanbul practical behavior', etiquette:['Modern international city, but modest clothing is useful for mosque visits such as Blue Mosque and Hagia Sophia.','Be respectful with photography in religious spaces and follow posted rules.','Bottled water is commonly used by travelers.'], dining:['Breakfast and hotel meals are straightforward; Turkish cuisine and food walks are trip highlights.','Grand Bazaar and Spice Bazaar shopping may involve negotiation.','Coffee, tea, casual meals, and nice dinners vary widely in cost because inflation can change prices quickly.'], transport:['Use Istanbulkart for trams, metro, ferries, and buses.','BiTaksi and Uber/local taxi integration can help, but traffic can be intense.','Ferries are useful and inexpensive for the city experience.'], safety:['Tourist areas are generally safe, but watch for pickpocketing.','Watch for taxi overcharging and aggressive tourist scams in busy areas.','Keep current hotel address and travel coordinator contact accessible.'], checklist:['Dress modestly for mosque days','Carry Istanbulkart plan','Keep small TRY cash','Watch taxi pricing']},
  {country:'Turkey', place:'Cappadocia', topic:'Terrain / Balloon / Local Tips', title:'Cappadocia field notes', etiquette:['Tourist areas are accustomed to international travelers.','Local shopping may involve ceramics, carpets, lamps, wine, and negotiation in some shops.'], dining:['Cards work at hotels, balloon companies, most restaurants, and tourist shops.','Cash is helpful for smaller cafes, tips, drivers, and local shops.'], transport:['Expect private transfers and tour vehicles rather than independent public transit for major activities.','Terrain can be uneven, dusty, hilly, and gravelly.'], safety:['Hot-air balloon flights can be canceled because of wind/weather.','Schedule balloon activity early in the stay when possible.','Cave hotels may involve stairs, uneven stone floors, and cooler interiors.'], checklist:['Warm layer for sunrise','Good walking shoes','Cash for guide/driver tips','Weather backup mindset']},
  {country:'Croatia', place:'Zagreb', topic:'City / Cafe / Safety', title:'Zagreb local rhythm', etiquette:['Zagreb is relaxed and walkable with a strong cafe culture.','People often linger over coffee and conversation.'], dining:['Euro is used; cards are widely accepted.','Carry small cash for markets, bakeries, small cafes, public toilets, and tips.'], transport:['Trams are excellent and inexpensive.','The city center is very walkable around Ban Jelačić Square and Upper Town.'], safety:['Generally very safe and relaxed.','Layer clothing because evenings are cooler than Türkiye.'], checklist:['Carry small euro coins','Plan tram option','Layer for evening','Leave cafe time']},
  {country:'Croatia', place:'Plitvice Lakes', topic:'National Park / Walking / Weather', title:'Plitvice park practicals', etiquette:['Stay on marked paths and boardwalks.','Respect park flow, crowds, and natural areas.'], dining:['Dining inside/near the park is more limited and can be more expensive.','Carry snacks or plan meals ahead if needed.'], transport:['Private drive from Zagreb to Plitvice and onward to Rovinj is part of the trip flow.','Walking distances can be several miles/km depending on route.'], safety:['Boardwalks can be slippery when wet.','Cool mornings, rain, and damp forest conditions are possible.','Good walking shoes with grip are important.'], checklist:['Rain jacket ready','Grip shoes','Water/snacks','Go early if possible']},
  {country:'Croatia', place:'Rovinj / Pula', topic:'Coastal / Dining / Walking', title:'Istria coastal practicals', etiquette:['Rovinj is relaxed, coastal, and romantic; people linger at waterfront cafes and sunset bars.','Pula feels more historic and urban than Rovinj.'], dining:['Seafood, truffles, olive oil, seafood pasta, grilled fish, and local wine are highlights.','Reservations may be useful for popular waterfront dining.'], transport:['Rovinj old town streets are steep in places, and polished stone can be slippery.','Pula historic center is walkable and easier terrain than Rovinj.','Parking in old centers can be limited if a car is involved.'], safety:['Late September can still be warm but evenings by the water are cooler.','Swimming may still be possible, but conditions vary.'], checklist:['Comfortable shoes','Light sweater for harbor evenings','Dinner reservation if needed','Small euro cash']},
  {country:'Slovenia', place:'Ljubljana / Bled / Postojna', topic:'Walkable City / Day Trips', title:'Ljubljana and Slovenia practicals', etiquette:['Ljubljana is clean, relaxed, safe, and very walkable.','The city center is largely pedestrian-only.'], dining:['Riverside cafes, Slovenian wine, pastries, and bakery culture are popular experiences.','Cards are widely accepted, but small cash helps for markets and tiny cafes.'], transport:['Most visitors can explore the center on foot.','Useful base for Lake Bled, Lake Bohinj, and Postojna Cave.'], safety:['Very safe and easygoing overall.','Late September can bring cool evenings and rain.'], checklist:['Walking shoes','Rain layer','Small euro cash','Plan day-trip layers']},
  {country:'Austria', place:'Salzburg', topic:'Formal / Alpine / Old Town', title:'Salzburg practicals', etiquette:['Salzburg feels elegant, musical, alpine, and more formal than Croatia.','Old town is very walkable.'], dining:['Typical foods include schnitzel, strudel, sausages, and hearty alpine cuisine.','In Austria, tipping can be done by stating the rounded total amount.'], transport:['Train arrival from Ljubljana and onward travel planning are important.','Nearby excursions may include Hallstatt, Berchtesgaden, and alpine lake regions.'], safety:['Alpine weather can change quickly.','Rain and chilly evenings are likely by early October.'], checklist:['Waterproof jacket','Sweater/fleece','Small euros','Practice rounded-total tipping']},
  {country:'Switzerland', place:'Zermatt', topic:'Alpine / Car-Free / High Cost', title:'Zermatt mountain practicals', etiquette:['Zermatt is car-free; expect walking, electric taxis, and hotel shuttles.','Mountain areas require slower pacing and weather respect.'], dining:['Switzerland is expensive, especially Zermatt.','Use CHF/card rather than euros when possible.'], transport:['Main access is by train.','Gornergrat and Matterhorn Glacier Paradise are major mountain excursions.'], safety:['Altitude may cause quicker fatigue or mild shortness of breath.','Higher elevations can be below freezing with wind, snow, ice, and strong sun glare.'], checklist:['Warm jacket','Gloves/hat for elevation','Sunglasses','Budget for mountain costs']},
  {country:'Switzerland', place:'Lucerne / Zurich', topic:'Transit / Lake Cities / Costs', title:'Lucerne and Zurich practicals', etiquette:['Swiss cities feel clean, efficient, polished, and easy to navigate.','Tap water is excellent and safe.'], dining:['Costs are high overall.','Tipping is modest because service is included; rounding up is usually enough.'], transport:['Swiss trains and boats are efficient and punctual.','Zurich public transit is excellent; Zurich HB to Zurich Flughafen is direct and quick.'], safety:['Early October can be cool, rainy, or foggy.','Keep layers and rain jacket ready.'], checklist:['Small CHF','Use card for most purchases','Plan Zurich airport train','Rain layer']}
];

const PROTOCOLS = [
  {
    id: 'protocol-country-guide',
    title: 'Country Quick Guide',
    summary: 'Use this when you first arrive in a new country or city.',
    items: ['Confirm currency and small-cash needs.', 'Check dining rhythm: early dinner, late dinner, cafe culture, or tourist-zone hours.', 'Review transport habits before using taxis, trams, trains, ferries, or walking zones.', 'Keep the hotel name/address and next movement plan ready.']
  },
  {
    id: 'protocol-food',
    title: 'Food / Restaurant Customs',
    summary: 'Use this before meals, cafes, snacks, and reservations.',
    items: ['Check whether tipping is rounding-up, modest percent, or service-included.', 'Carry small cash for cafes, bakeries, markets, and small vendors.', 'Use the Language app for ordering, allergies, water, bill, and thank-you phrases.', 'Expect pace and meal style to vary by country: cafe lingering, quick bakery stop, formal dinner, or tourist restaurant.']
  },
  {
    id: 'protocol-bathroom',
    title: 'Bathroom / Public Toilet Notes',
    summary: 'Use this for daily walking days, parks, rail stations, and old towns.',
    items: ['Carry coins/small cash when public toilets may require payment.', 'Use museum, cafe, hotel, restaurant, or station restrooms when available.', 'Plan bathroom stops before long transfers, park walks, boat/train segments, or guided tours.', 'Use Language app bathroom/directions phrases when needed.']
  },
  {
    id: 'protocol-shopping',
    title: 'Shopping / Merchant Etiquette',
    summary: 'Use this for bazaars, markets, souvenir shops, and small merchants.',
    items: ['Ask price before committing when pricing is unclear.', 'Use card in established shops; keep cash for markets and small purchases.', 'Negotiation may be normal in some Turkish market settings but not in most European stores.', 'Keep receipts for larger purchases and check currency before tapping card.']
  },
  {
    id: 'protocol-safety',
    title: 'Safety / Scam Awareness',
    summary: 'Use this in crowded tourist areas, transit hubs, taxis, and unfamiliar streets.',
    items: ['Watch bags in crowds, stations, markets, and scenic bottlenecks.', 'Use official taxis, hotel-arranged transport, known apps, or clearly marked transit.', 'Avoid rushed decisions around money, taxi pricing, unsolicited help, or street distractions.', 'If something feels off, step into a hotel, museum, restaurant, pharmacy, or official station area.']
  },
  {
    id: 'protocol-transport-behavior',
    title: 'Transportation Behavior Notes',
    summary: 'Use this before boarding trains, trams, ferries, taxis, shuttles, and transfers.',
    items: ['Validate or activate tickets/passes before boarding when required.', 'Keep bags manageable on cobblestones, platforms, stairs, and hotel transfers.', 'Build extra time for old-town walking, luggage storage, bathrooms, and platform changes.', 'Use Transportation and Maps + Movement apps before each movement day.']
  },
  {
    id: 'protocol-cultural-sites',
    title: 'Religious / Cultural Site Etiquette',
    summary: 'Use this before mosques, churches, museums, historic sites, and memorial spaces.',
    items: ['Dress modestly where appropriate and follow posted rules.', 'Lower voice, respect photography restrictions, and avoid blocking worshippers or ceremonies.', 'Carry a light scarf/layer if visiting religious sites where coverage may be expected.', 'Use Local Knowledge cards for country-specific behavior notes.']
  },
  {
    id: 'protocol-hours',
    title: 'Opening Hours / Sunday / Holiday Notes',
    summary: 'Use this before assuming restaurants, shops, museums, pharmacies, or transit offices are open.',
    items: ['Check hours for Sundays, Mondays, holidays, and shoulder-season closures.', 'Plan meals before late arrivals or remote hotel stays.', 'Keep a backup snack and water plan on move days.', 'Use Daily Operations to check tomorrow’s closures the night before.']
  },
  {
    id: 'protocol-surprises',
    title: 'Practical “What Surprised Me” Notes',
    summary: 'Use this as a trip-learning capture area for future days and future trips.',
    items: ['Record unexpected bathroom/payment/transport rules.', 'Record shoes, clothing, or weather surprises.', 'Record restaurant timing or reservation lessons.', 'Record what should be added to Packing or Daily Operations later.']
  }
];

const searchInput=document.getElementById('searchInput');
const countryFilter=document.getElementById('countryFilter');
const topicFilter=document.getElementById('topicFilter');
const resetBtn=document.getElementById('resetBtn');
const mount=document.getElementById('knowledgeMount');
const summaryMount=document.getElementById('summaryMount');
const protocolMount=document.getElementById('protocolMount');
function unique(a){return [...new Set(a)].sort();}
function optionize(sel, vals){vals.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o);});}
optionize(countryFilter, unique(KNOWLEDGE.map(k=>k.country)));
optionize(topicFilter, unique(KNOWLEDGE.map(k=>k.topic)));
function matches(k){const q=searchInput.value.trim().toLowerCase(); const blob=[k.country,k.place,k.topic,k.title,...k.etiquette,...k.dining,...k.transport,...k.safety,...k.checklist].join(' ').toLowerCase(); return (!q||blob.includes(q))&&(countryFilter.value==='all'||k.country===countryFilter.value)&&(topicFilter.value==='all'||k.topic===topicFilter.value);}

function renderProtocols(){
  if(!protocolMount) return;
  protocolMount.innerHTML = PROTOCOLS.map(p => `
    <article class="protocol-card" id="${p.id}">
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <ul>${p.items.map(item => `<li>${item}</li>`).join('')}</ul>
    </article>
  `).join('');
}
function setupFastTools(){
  document.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.jump);
      if(!target) return;
      document.querySelectorAll('[data-jump]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      target.classList.add('pulse-target');
      target.scrollIntoView({behavior:'smooth', block:'start'});
      setTimeout(() => target.classList.remove('pulse-target'), 900);
    });
  });
}

function summary(){summaryMount.innerHTML='';[['5','countries','Turkey, Croatia, Slovenia, Austria, Switzerland'],['8','local cards','City and country practical notes'],['Private','trip use','Behavior, safety, dining, transit'],['Linked','operations','Connects to money, weather, daily ops']].forEach(([n,l,d])=>{const e=document.createElement('article');e.className='summary-card';e.innerHTML=`<div class="num">${n}</div><div class="label">${l}</div><p>${d}</p>`;summaryMount.appendChild(e);});}
function card(k, idx){const el=document.createElement('article');el.className='knowledge-card';el.innerHTML=`<h2>${k.title}</h2><div class="meta"><span class="pill country">${k.country}</span><span class="pill">${k.place}</span><span class="pill topic">${k.topic}</span></div><div class="grid"><div><p class="section-title">Etiquette / local rhythm</p><ul>${k.etiquette.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><p class="section-title">Dining / money behavior</p><ul>${k.dining.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><p class="section-title">Transport / safety</p><ul>${[...k.transport,...k.safety].map(x=>`<li>${x}</li>`).join('')}</ul></div></div><p class="section-title">Quick checklist</p><div class="checklist">${k.checklist.map((it,i)=>`<label class="check"><input type="checkbox" data-key="local-${idx}-${i}"><span>${it}</span></label>`).join('')}</div><p class="section-title">Related apps</p><div class="links"><a href="../travel-money-tipping/index.html">money</a><a href="../travel-weather-clothing/index.html">weather</a><a href="../travel-daily-operations/index.html">daily ops</a><a href="../travel-transportation/index.html">transport</a></div>`;return el;}
function restoreChecks(){document.querySelectorAll('input[type="checkbox"][data-key]').forEach(cb=>{const key=cb.dataset.key;cb.checked=localStorage.getItem(key)==='1';cb.addEventListener('change',()=>localStorage.setItem(key,cb.checked?'1':'0'));});}
function render(){const list=KNOWLEDGE.filter(matches);mount.innerHTML='';list.forEach((k,i)=>mount.appendChild(card(k,i)));if(!list.length)mount.innerHTML='<p class="empty">No local knowledge cards match the current filters.</p>';restoreChecks();}
resetBtn.addEventListener('click',()=>{searchInput.value='';countryFilter.value='all';topicFilter.value='all';render();});
[searchInput,countryFilter,topicFilter].forEach(el=>el.addEventListener('input',render));
renderProtocols();setupFastTools();summary();render();

// v3.3.36 Money, Tipping & Local Knowledge Integration.
// Reads only the non-sensitive destination context published by Daily Operations.
(function initDailyDestinationContext(){
  const panel=document.getElementById('todayContextPanel');
  const title=document.getElementById('todayContextTitle');
  const text=document.getElementById('todayContextText');
  const btn=document.getElementById('useTodayContextBtn');
  if(!panel||!btn) return;
  let ctx=null;
  try{ctx=JSON.parse(localStorage.getItem('tee-daily-carry-today-v1')||'null');}catch(e){}
  if(!ctx||!ctx.city) return;
  const city=ctx.city;
  const map=[
    [/Istanbul/i,['Turkey','Istanbul']], [/Cappadocia/i,['Turkey','Cappadocia']],
    [/Zagreb/i,['Croatia','Zagreb']], [/Plitvice/i,['Croatia','Plitvice Lakes']],
    [/Rovinj|Pula|Istria/i,['Croatia','Rovinj']], [/Ljubljana|Bled|Bohinj|Postojna/i,['Slovenia','Ljubljana']],
    [/Salzburg/i,['Austria','Salzburg']], [/Zermatt|Matterhorn/i,['Switzerland','Zermatt']],
    [/Lucerne|Zurich/i,['Switzerland',/Lucerne/i.test(city)?'Lucerne':'Zurich']]
  ];
  const found=map.find(([re])=>re.test(city));
  if(!found) return;
  const [,target]=found; const [country,place]=target;
  panel.hidden=false;
  title.textContent=`Today: ${city}`;
  text.textContent=`Open the matching ${country} local-knowledge card for etiquette, dining, transport, and practical reminders.`;
  btn.addEventListener('click',()=>{
    countryFilter.value=country;
    topicFilter.value='all';
    searchInput.value=place;
    render();
    document.getElementById('knowledgeMount')?.scrollIntoView({behavior:'smooth',block:'start'});
  });
})();

function initDestinationSections(){
  const sections = Array.from(document.querySelectorAll('.destination-section'));
  if(!sections.length) return;

  function getTitle(section){
    const h = section.querySelector('h2, h3, .section-head h2, .kicker + h2');
    const aria = section.getAttribute('aria-label');
    return h ? h.textContent.trim() : (aria || 'Open section');
  }

  function setOpen(section, open, scroll){
    const content = section.querySelector(':scope > .destination-content');
    const btn = section.querySelector(':scope > .destination-toggle');
    section.classList.toggle('open', open);
    if(content) content.hidden = !open;
    if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(open && scroll) section.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function closeAll(except){
    sections.forEach(sec => {
      if(sec !== except) setOpen(sec, false, false);
    });
  }

  sections.forEach(section => {
    if(section.dataset.destinationReady === '1') return;
    const title = getTitle(section);
    const content = document.createElement('div');
    content.className = 'destination-content';

    while(section.firstChild){
      content.appendChild(section.firstChild);
    }

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'destination-toggle';
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML = `<span><span class="destination-title">${title}</span><span class="destination-hint">Tap to open / collapse</span></span>`;

    toggle.addEventListener('click', () => {
      const isOpen = section.classList.contains('open');
      if(isOpen){
        setOpen(section, false, false);
      } else {
        closeAll(section);
        setOpen(section, true, true);
      }
    });

    section.appendChild(toggle);
    section.appendChild(content);
    section.dataset.destinationReady = '1';
    setOpen(section, false, false);
  });

  document.querySelectorAll('.collapse-destination-btn').forEach(btn => {
    if(btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const section = btn.closest('.destination-section');
      if(section){
        setOpen(section, false, false);
        const toggle = section.querySelector(':scope > .destination-toggle');
        if(toggle) toggle.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
    });
  });
}

initDestinationSections();

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));}


// v2.3 Universal card accordion behavior: individual cards collapse/open.
(function(){
  const CARD_CLASSES = [
    'timeline-card','hotel-card','transport-card','weather-card','pack-card','money-card',
    'map-card','essential-card','day-card','knowledge-card','phrase-card'
  ];
  function isTargetCard(article){
    if(!article || article.dataset.accordionReady === '1') return false;
    if(article.classList.contains('summary-card')) return false;
    return CARD_CLASSES.some(cls => article.classList.contains(cls));
  }
  function getTitle(article){
    const h = article.querySelector('h2, h3, .card-title, .transport-head h2, .weather-head h2');
    let text = h ? h.textContent.trim() : 'Open card';
    text = text.replace(/\s+/g,' ');
    if(text.length > 95) text = text.slice(0,92) + '...';
    return text || 'Open card';
  }
  function initCard(article){
    if(!isTargetCard(article)) return;
    const title = getTitle(article);
    const content = document.createElement('div');
    content.className = 'travel-accordion-content';
    while(article.firstChild) content.appendChild(article.firstChild);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'travel-accordion-toggle';
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML = `<span><span class="toggle-title">${title}</span><span class="toggle-hint">Tap to open / collapse</span></span>`;
    btn.addEventListener('click', () => {
      const open = article.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    article.classList.add('travel-accordion-ready');
    article.dataset.accordionReady = '1';
    article.appendChild(btn);
    article.appendChild(content);
  }
  function initAll(){
    document.querySelectorAll('article').forEach(initCard);
  }
  function setAll(open){
    document.querySelectorAll('article.travel-accordion-ready').forEach(article => {
      article.classList.toggle('open', open);
      const btn = article.querySelector(':scope > .travel-accordion-toggle');
      if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function addControls(){
    if(document.getElementById('cardControls')) return;
    const header = document.querySelector('header.hero') || document.querySelector('header');
    if(!header) return;
    const controls = document.createElement('div');
    controls.id = 'cardControls';
    controls.className = 'card-controls';
    controls.innerHTML = '<button type="button" id="expandCardsBtn">Expand all cards</button><button type="button" id="collapseCardsBtn">Collapse all cards</button>';
    header.appendChild(controls);
    controls.querySelector('#expandCardsBtn').addEventListener('click',()=>setAll(true));
    controls.querySelector('#collapseCardsBtn').addEventListener('click',()=>setAll(false));
  }
  function boot(){
    addControls();
    initAll();
    const mount = document.querySelector('main') || document.body;
    const obs = new MutationObserver(() => initAll());
    obs.observe(mount, {childList:true, subtree:true});
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
