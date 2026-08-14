const RELATED_APP_PATHS = {
  'travel-archive':'../travel-archive/index.html',
  'travel-costs':'../travel-costs/index.html',
  'travel-daily-operations':'../travel-daily-operations/index.html',
  'travel-essentials':'../travel-essentials/index.html',
  'travel-hotels':'../travel-hotels/index.html',
  'travel-insurance':'../travel-insurance/index.html',
  'travel-itinerary':'../travel-itinerary/index.html',
  'travel-language':'../travel-language/index.html',
  'travel-local-knowledge':'../travel-local-knowledge/index.html',
  'travel-maps-movement':'../travel-maps-movement/index.html',
  'travel-money-tipping':'../travel-money-tipping/index.html',
  'travel-packing':'../travel-packing/index.html',
  'travel-photos':'../travel-photos/index.html',
  'travel-private-documents':'../travel-private-documents/index.html',
  'travel-transportation':'../travel-transportation/index.html',
  'travel-weather-clothing':'../travel-weather-clothing/index.html'
};
function relatedAppHref(id){return RELATED_APP_PATHS[id] || '../../index.html#' + id;}

const PACKING = [
  {cat:'Carry-on / Personal Bag', need:'Essential', source:'lessons-learned', title:'Personal carry bag core', why:'The prior-trip lessons emphasized a personal bag attachment, lighter waterproof bag, and practical small items.', items:['Personal bag','Passport/ID access pouch','Pen — only two needed','Eye drops','Lip balm','Hand sanitizer','Lotion','Cough drops','Eye glass cloth','Ear plugs','Eye mask','Protein bar','Drink mix'], notes:['Keep this light and reachable on plane/train days.','Avoid duplicate pens and extra small clutter.'], links:['travel-transportation','travel-daily-operations']},
  {cat:'Documents / Confirmations', need:'Essential', source:'hub-essential', title:'Travel document checklist', why:'Private hub uses checklist/status, not exposed passport images.', items:['Passport for each traveler','Driver license','Travel insurance card when added','Flight confirmations','Train/Eurail pass access','Hotel confirmations','Emergency contacts'], notes:['Do not place passport images in a public version.','Keep offline copies secure.'], links:['travel-essentials','travel-transportation','travel-hotels']},
  {cat:'Electronics', need:'Essential', source:'master-list', title:'Lean electronics kit', why:'Master list includes chargers, wires, iPad/laptop, batteries, converters; Argentina notes say rethink electronics and simplify.', items:['iPhone charger','USB-A to USB-C cable for plane charging','Watch charger USB-A','Earphones plus one charger/cable','Portable battery — one, or two only if using heated vest','International adapter/converter','Light with electronic lighter if needed','Phone clip holder or selfie stick if using'], notes:['Rethink based on hotel/road/plane needs.','Avoid bringing every cable twice unless needed.'], links:['travel-transportation','travel-hotels']},
  {cat:'Medicine / Health', need:'Essential', source:'master-list + lessons', title:'Travel health pouch', why:'Lessons learned added cough/throat items, tea/honey, eye drops, allergy/cough meds.', items:['Essential meds','Allergy medicine','Cough medicine','Throat spray','Cough drops','Vicks VapoRub','Tea bags','Honey packs','Eye drops','Vitamins','Pepto/Imodium/Lactaid as needed','Band-Aids','Bug spray if needed'], notes:['Build a smaller daily med pouch plus backup supply in suitcase.','Keep prescriptions and essentials in carry-on.'], links:['travel-weather-clothing','travel-daily-operations']},
  {cat:'Weather Layers', need:'Essential', source:'weather', title:'Layer system for warm cities to cold Alps', why:'Trip ranges from warm Istanbul/Rovinj to cold Zermatt/Matterhorn and damp Plitvice/Switzerland.', items:['Light daytime shirts','Long sleeve shirt','Sweater or fleece','Rain coat or waterproof shell','Frogg Toggs poncho/top','Warm jacket/down coat','Wool socks','Scarf','Hat/beanie','Gloves — consider second pair','Sunglasses with case'], notes:['Zermatt/Matterhorn requires warm jacket, hat/gloves, waterproof layer.','Plitvice needs grip shoes and rain layer.'], links:['travel-weather-clothing','travel-itinerary']},
  {cat:'Footwear', need:'Essential', source:'weather + master-list', title:'Walking and wet-path footwear', why:'Old towns, train stations, Plitvice boardwalks, and Zermatt walking require comfort and grip.', items:['Comfortable walking shoes','Good walking/hiking shoes with grip','Optional sandals/Crocs/slippers for hotel','Wool or travel socks'], notes:['Rovinj stone streets can be slippery.','Plitvice boardwalks can be slippery when wet.'], links:['travel-weather-clothing','travel-hotels']},
  {cat:'Rain / Outdoor Gear', need:'High', source:'weather + lessons', title:'Compact rain and outdoor kit', why:'Zagreb, Plitvice, Ljubljana, Salzburg, Lucerne, and Zurich all have rain possibilities.', items:['Compact umbrella','Waterproof jacket','Frogg Toggs poncho/top','Mesh backpack or daypack','Ziplock bags — bring more','Water bottle','Water bottle holder','Carabiner with hook','Extra carabiner','Small backpack for Plitvice/Zermatt'], notes:['Use ziplocks for wet/dirty items and electronics protection.'], links:['travel-weather-clothing','travel-transportation']},
  {cat:'Activity Specific', need:'High', source:'itinerary + lessons', title:'Tours, balloon, cave, lakes, and mountains', why:'Activities include hot air balloon, underground city/caves, Plitvice, Lake Bled/Bohinj, and mountain viewpoints.', items:['Warmer sunrise layer for balloon morning','Sunglasses and sunscreen','Good walking shoes','Light hikers for Zermatt if desired','Massage ball','Optional hiking pole','Camera/phone practice plan','Selfie stick or phone holder if useful'], notes:['Practice camera/watch timer/remote before trip if photos matter.','Balloon mornings can feel colder than expected.'], links:['travel-itinerary','travel-weather-clothing']},
  {cat:'Toiletry', need:'Standard', source:'master-list', title:'Basic toiletry kit', why:'Use the master list but keep it simple for hotels and moving between stops.', items:['Toothbrush','Toothpaste','Razor','Comb','Shampoo/body wash only if needed','Scissors if allowed/packed correctly','Basic toiletry bag','Sunscreen'], notes:['Make a smaller toiletry list for this hotel-heavy trip rather than camping/fishing scenarios.'], links:['travel-hotels']},
  {cat:'Clothing', need:'Standard', source:'master-list', title:'Filtered simple-travel clothing', why:'Use master clothes categories but filter out camping/fishing/biking unless needed.', items:['Underwear','Travel socks','Pants/jeans','Light shirts','Long sleeve shirt','Pajamas','Swim shorts if spa/swimming likely','Dress/casual dinner outfit if desired','Rain layer','Warm layer'], notes:['Do not bring fishing/camping/biking gear for this trip.','Laundry planning can reduce quantity.'], links:['travel-weather-clothing','travel-hotels']},
  {cat:'Food / Comfort', need:'Optional', source:'master-list + lessons', title:'Small comfort food and drinks', why:'Master list and lessons include breakfast bars, drink mixes, nuts, tea, honey, and hot water maker.', items:['Tea bags','Honey packs','Breakfast/protein bars','Drink mixes','Nuts','Gum/candy if useful','Hot water maker only if truly needed'], notes:['Hotels usually have breakfast, so keep food minimal.'], links:['travel-hotels','travel-daily-operations']},
  {cat:'Do Not Overpack', need:'Reminder', source:'lessons-learned', title:'Items to limit or question', why:'Prior trip notes specifically identified items that may have been too much or need simplification.', items:['Only two pens','One earphone set','One main battery unless heated vest needs two','Avoid extra duplicate cables','Avoid scenario gear not used on this trip','Question hot water maker and chair hammock'], notes:['This is a city/hotel/train/private-transfer trip, not a camping/fishing trip.'], links:['travel-packing','travel-weather-clothing']}
];
const searchInput=document.getElementById('searchInput');
const categoryFilter=document.getElementById('categoryFilter');
const needFilter=document.getElementById('needFilter');
const resetBtn=document.getElementById('resetBtn');
const mount=document.getElementById('packingMount');
const summaryMount=document.getElementById('summaryMount');
const packToolStatus=document.getElementById('packToolStatus');
let packToolMode='';
const packToolLabels={
  departure:'Before Departure',
  daybag:'Day Bag',
  repack:'Travel-Day Repack',
  weather:'Weather Layers',
  electronics:'Electronics',
  health:'Meds / Health',
  sweep:'Hotel Room Sweep'
};
const packToolTargets={
  departure:'packing-protocol-departure',
  daybag:'packing-protocol-daybag',
  repack:'packing-protocol-repack',
  weather:'packing-protocol-weather',
  electronics:'packing-protocol-electronics',
  health:'packing-protocol-health',
  sweep:'packing-protocol-sweep'
};
function unique(a){return [...new Set(a)].sort();}
function optionize(sel, vals){vals.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o);});}
optionize(categoryFilter,unique(PACKING.map(p=>p.cat)));
optionize(needFilter,unique(PACKING.map(p=>p.need)));
function badge(n){const x=n.toLowerCase();return x.includes('essential')?'essential':x.includes('high')?'weather':x.includes('reminder')?'lesson':'';}
function matches(p){const q=searchInput.value.trim().toLowerCase(); const blob=[p.cat,p.need,p.source,p.title,p.why,...p.items,...p.notes].join(' ').toLowerCase(); return (!q||blob.includes(q))&&(categoryFilter.value==='all'||p.cat===categoryFilter.value)&&(needFilter.value==='all'||p.need===needFilter.value);}
function summary(){summaryMount.innerHTML='';[['12','packing cards','Filtered from master + lessons'],['5','countries','Warm cities to cold Alps'],['3','priority layers','Essential, high, standard'],['Private','safe design','No passport images exposed']].forEach(([n,l,d])=>{const e=document.createElement('article');e.className='summary-card';e.innerHTML=`<div class="num">${n}</div><div class="label">${l}</div><p>${d}</p>`;summaryMount.appendChild(e);});}
function card(p, idx){const el=document.createElement('article');el.className='pack-card';el.innerHTML=`<h2>${p.title}</h2><div class="meta"><span class="pill">${p.cat}</span><span class="pill ${badge(p.need)}">${p.need}</span><span class="pill ${p.source.includes('lesson')?'lesson':''}">${p.source}</span></div><p>${p.why}</p><div class="grid"><div><p class="section-title">Checklist</p><div class="checklist">${p.items.map((it,i)=>`<label class="check"><input type="checkbox" data-key="pack-${idx}-${i}"><span>${it}</span></label>`).join('')}</div></div><div><p class="section-title">Notes</p><ul>${p.notes.map(n=>`<li>${n}</li>`).join('')}</ul><p class="section-title">Related apps</p><div class="links">${p.links.map(id=>`<a href="${relatedAppHref(id)}">${id.replace('travel-','')}</a>`).join('')}</div></div></div>`;return el;}
function restoreChecks(){document.querySelectorAll('input[type="checkbox"][data-key]').forEach(cb=>{const key=cb.dataset.key;cb.checked=localStorage.getItem(key)==='1';cb.addEventListener('change',()=>localStorage.setItem(key,cb.checked?'1':'0'));});}
function render(){
  const list=PACKING.filter(matches);
  mount.innerHTML='';
  list.forEach((p,i)=>mount.appendChild(card(p,i)));
  if(!list.length)mount.innerHTML='<p class="empty">No packing items match the current filters.</p>';
  if(packToolStatus){
    if(packToolMode){
      packToolStatus.textContent=`${packToolLabels[packToolMode]} opened below. Packing cards are unchanged; use search/category/priority filters to narrow checklist cards.`;
    } else {
      packToolStatus.textContent='Fast tools are direct jump buttons. Tap one to jump to the exact packing protocol below.';
    }
  }
  restoreChecks();
}
function setActivePackTool(key){
  document.querySelectorAll('[data-pack-tool]').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.packTool===key && key!=='reset');
  });
}
function jumpToPackProtocol(key){
  const targetId=packToolTargets[key];
  const target=targetId?document.getElementById(targetId):null;
  document.querySelectorAll('.protocol-target').forEach(el=>el.classList.remove('protocol-highlight'));
  if(target){
    target.classList.add('protocol-highlight');
    target.scrollIntoView({behavior:'smooth', block:'center'});
  }
}
document.querySelectorAll('[data-pack-tool]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const key=btn.dataset.packTool;
    if(key==='reset'){
      packToolMode='';
      searchInput.value='';
      categoryFilter.value='all';
      needFilter.value='all';
      setActivePackTool('reset');
      render();
      mount.scrollIntoView({behavior:'smooth', block:'start'});
    } else {
      packToolMode=key;
      setActivePackTool(key);
      render();
      jumpToPackProtocol(key);
    }
  });
});
resetBtn.addEventListener('click',()=>{searchInput.value='';categoryFilter.value='all';needFilter.value='all';packToolMode='';setActivePackTool('reset');render();});
[searchInput,categoryFilter,needFilter].forEach(el=>el.addEventListener('input',()=>{packToolMode='';setActivePackTool('reset');render();}));
// v3.3.35 Packing & Daily Carry Integration.
const TEE_DAILY_CARRY_TODAY_KEY='tee-daily-carry-today-v1';
const TEE_DAILY_CARRY_TOMORROW_KEY='tee-daily-carry-tomorrow-v1';
const TEE_WEATHER_CACHE_KEY='tee-weather-live-cache-v1';
const dailyCarryUi={
  panel:document.getElementById('dailyCarryPanel'),
  context:document.getElementById('dailyCarryContext'),
  weather:document.getElementById('dailyCarryWeather'),
  mount:document.getElementById('dailyCarryMount'),
  todayBtn:document.getElementById('carryTodayBtn'),
  tomorrowBtn:document.getElementById('carryTomorrowBtn'),
  resetBtn:document.getElementById('dailyCarryResetBtn')
};
let dailyCarryMode='today';
function readJsonStorage(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
function dailyCarryContextFor(mode){return readJsonStorage(mode==='tomorrow'?TEE_DAILY_CARRY_TOMORROW_KEY:TEE_DAILY_CARRY_TODAY_KEY);}
function weatherLocationForCity(city){
  if(/Istanbul/.test(city))return /Airport/.test(city)?'Istanbul Airport':'Istanbul';
  if(/Cappadocia/.test(city))return 'Cappadocia'; if(/Zagreb/.test(city))return 'Zagreb'; if(/Plitvice/.test(city))return 'Plitvice Lakes';
  if(/Pula/.test(city))return 'Pula'; if(/Rovinj/.test(city))return 'Rovinj'; if(/Ljubljana|Bled|Bohinj|Postojna/.test(city))return 'Ljubljana';
  if(/Salzburg/.test(city))return 'Salzburg'; if(/Zermatt|Matterhorn/.test(city))return 'Zermatt / Matterhorn'; if(/Lucerne/.test(city))return 'Lucerne'; if(/Zurich/.test(city))return 'Zurich';
  return null;
}
function cachedWeatherDay(ctx){
  if(!ctx||!ctx.ymd)return null; const loc=weatherLocationForCity(ctx.city||''); if(!loc)return null;
  const cache=readJsonStorage(TEE_WEATHER_CACHE_KEY)||{}; const rec=cache[loc]; if(!rec||!rec.daily)return null;
  const i=(rec.daily.time||[]).indexOf(ctx.ymd); if(i<0)return {location:loc,record:rec,day:null};
  const day={}; Object.keys(rec.daily).forEach(k=>day[k]=Array.isArray(rec.daily[k])?rec.daily[k][i]:rec.daily[k]);
  return {location:loc,record:rec,day};
}
function pushUnique(list,item,reason,group){if(!item)return; if(!list.some(x=>x.item.toLowerCase()===item.toLowerCase()))list.push({item,reason,group});}
function dailyCarryItems(ctx,weatherResult,mode){
  const items=[];
  ['Phone','Wallet / small cash','Water bottle','Portable battery','Essential daily medications','Sunglasses','Tissue / hand sanitizer'].forEach(x=>pushUnique(items,x,'Daily carry core','Core'));
  const move=!!ctx?.move;
  if(move){pushUnique(items,'Passport / required ID','Movement day','Documents');pushUnique(items,'Required tickets / rail or flight access','Movement day','Documents');pushUnique(items,'Phone charging cable','Long movement day','Electronics');}
  (ctx?.gear||[]).forEach(x=>pushUnique(items,x,'Trip-specific day plan','Trip-specific'));
  const d=weatherResult?.day;
  if(d){
    const lo=Number(d.temperature_2m_min), rain=Number(d.precipitation_probability_max||0), wind=Number(d.wind_speed_10m_max||0);
    if(rain>=40){pushUnique(items,'Waterproof rain layer','Cached weather: rain risk','Weather');pushUnique(items,'Compact umbrella','Cached weather: rain risk','Weather');pushUnique(items,'Ziplock / electronics rain protection','Cached weather: rain risk','Weather');}
    if(lo<=5){pushUnique(items,'Warm jacket','Cached weather: cold low','Weather');pushUnique(items,'Hat / beanie','Cached weather: cold low','Weather');pushUnique(items,'Gloves','Cached weather: cold low','Weather');}
    else if(lo<=11){pushUnique(items,'Fleece / warm layer','Cached weather: cool low','Weather');}
    else if(lo<=17){pushUnique(items,'Light jacket / sweater','Cached weather: mild low','Weather');}
    if(wind>=30)pushUnique(items,'Wind-resistant outer layer','Cached weather: wind','Weather');
    if(rain>=30)pushUnique(items,'Grippy walking shoes','Cached weather: wet surfaces','Footwear');
  } else {
    if(/rain|damp|shower|fog/i.test(ctx?.weather||'')){pushUnique(items,'Waterproof rain layer','Planning weather guidance','Weather');pushUnique(items,'Compact umbrella','Planning weather guidance','Weather');}
    if(/cold|chilly|alpine|cool/i.test(ctx?.weather||''))pushUnique(items,'Warm / light layer','Planning weather guidance','Weather');
  }
  if(mode==='tomorrow'){
    if(move){pushUnique(items,'Stage luggage and room-sweep items','Tomorrow move prep','Prep');pushUnique(items,'Set aside travel-day clothes','Tomorrow move prep','Prep');}
    pushUnique(items,'Charge phone / watch / battery','Tomorrow prep','Prep');
    pushUnique(items,'Refill water / snacks as needed','Tomorrow prep','Prep');
  }
  return items;
}
function carryStateKey(ctx,mode,item){
  const day=ctx?.ymd||ctx?.date||'unknown';
  const slug=item.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,64);
  return `tee-daily-carry-v1-${mode}-${day}-${slug}`;
}
function renderDailyCarry(){
  if(!dailyCarryUi.panel)return;
  const ctx=dailyCarryContextFor(dailyCarryMode);
  dailyCarryUi.todayBtn?.classList.toggle('active',dailyCarryMode==='today');
  dailyCarryUi.tomorrowBtn?.classList.toggle('active',dailyCarryMode==='tomorrow');
  if(!ctx){
    dailyCarryUi.context.textContent=`No ${dailyCarryMode} day context has been published yet. Open Daily Operations once and choose the working trip day.`;
    dailyCarryUi.weather.innerHTML='<strong>Weather:</strong> Daily Operations has not supplied a day yet.';
    dailyCarryUi.mount.innerHTML='<p class="daily-carry-empty">Open Daily Operations, choose Today or Tomorrow, then return here. The selection is shared locally on this device.</p>';
    return;
  }
  const wr=cachedWeatherDay(ctx);
  dailyCarryUi.context.textContent=`${dailyCarryMode==='today'?'Today carry':'Tomorrow pack / prep'} · ${ctx.date} · ${ctx.city} · ${ctx.type}`;
  if(wr?.day){
    const d=wr.day; const fetched=wr.record?.fetchedAt?new Date(wr.record.fetchedAt).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'cached';
    dailyCarryUi.weather.innerHTML=`<span class="carry-weather-badge">LIVE-CACHED</span><strong>${Math.round(d.temperature_2m_max)}°F / ${Math.round(d.temperature_2m_min)}°F</strong><span>Rain ${Math.round(d.precipitation_probability_max||0)}% · Wind ${Math.round(d.wind_speed_10m_max||0)} mph · Updated ${fetched}</span>`;
  } else {
    dailyCarryUi.weather.innerHTML=`<span class="carry-weather-badge fallback">PLANNING</span><strong>${ctx.weather||'Use trip planning guidance.'}</strong><span>Cached live forecast is not available for this selected trip date yet.</span>`;
  }
  const items=dailyCarryItems(ctx,wr,dailyCarryMode);
  dailyCarryUi.mount.innerHTML=items.map(({item,reason,group})=>{
    const key=carryStateKey(ctx,dailyCarryMode,item); const checked=localStorage.getItem(key)==='1';
    return `<label class="daily-carry-item"><input type="checkbox" data-carry-key="${key}" ${checked?'checked':''}><span><strong>${item}</strong><small>${group} · ${reason}</small></span></label>`;
  }).join('');
  dailyCarryUi.mount.querySelectorAll('[data-carry-key]').forEach(cb=>cb.addEventListener('change',()=>localStorage.setItem(cb.dataset.carryKey,cb.checked?'1':'0')));
}
function initDailyCarry(){
  if(!dailyCarryUi.panel)return;
  dailyCarryUi.todayBtn?.addEventListener('click',()=>{dailyCarryMode='today';renderDailyCarry();});
  dailyCarryUi.tomorrowBtn?.addEventListener('click',()=>{dailyCarryMode='tomorrow';renderDailyCarry();});
  dailyCarryUi.resetBtn?.addEventListener('click',()=>{
    const ctx=dailyCarryContextFor(dailyCarryMode); if(!ctx)return;
    dailyCarryUi.mount.querySelectorAll('[data-carry-key]').forEach(cb=>localStorage.removeItem(cb.dataset.carryKey)); renderDailyCarry();
  });
  if(location.hash==='#tomorrow-prep')dailyCarryMode='tomorrow';
  renderDailyCarry();
}

summary();render();initDailyCarry();

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


function initGlobalRelatedAppLinks(){
  document.addEventListener('click', function(event){
    const el = event.target.closest('a[href*="travel-"], button[data-open-app], a[data-open-app]');
    if(!el) return;
    let target = el.getAttribute('data-open-app') || el.getAttribute('href');
    if(!target) return;
    if(target.includes('index.html#travel-')){
      const id = target.split('#').pop();
      target = relatedAppHref(id);
    }
    if(target.match(/travel-[A-Za-z0-9_-]+\/index\.html$/)){
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.location.href = target;
    }
  }, true);
}
initGlobalRelatedAppLinks();
