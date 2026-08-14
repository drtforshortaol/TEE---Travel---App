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

const MONEY = [
  {country:'Turkey', city:'Istanbul', currency:'TRY ₺', title:'Istanbul money basics', pay:['Credit cards widely accepted at hotels, restaurants, malls, larger shops, ride apps/taxis.','Carry cash for small cafes, markets/bazaars, public toilets, street food, and smaller taxis.','Use bank ATMs when possible and decline dynamic currency conversion; pay in TRY, not USD.'], tips:['Coffee/quick service: about ₺20–50.','Casual restaurant: about ₺50–150 depending on bill size.','Restaurants: typical 5–10%; upscale can be 10%+.','Bellhop or luggage help: about ₺50–100.','Housekeeping: about ₺50–100 per day.','Taxi: round up modestly.'], local:['Istanbulkart is useful for trams, metro, ferries, and buses.','Traffic can be intense; BiTaksi and Uber/local taxis may be useful.','Watch for pickpocketing, taxi overcharging, and aggressive tourist scams.'], checklist:['Carry small TRY cash','Set cards to pay in TRY','Have Istanbulkart plan','Keep small bills for tips'], links:['travel-transportation','travel-itinerary']},
  {country:'Turkey', city:'Cappadocia', currency:'TRY ₺', title:'Cappadocia tipping and cash', pay:['Cards are accepted at hotels, balloon companies, most restaurants, and tourist shops.','Cash is useful for tips, local shops, taxis, and smaller cafes.'], tips:['Hot-air balloon crew: tip more generously if service is good.','Tour guides/drivers: common to tip for full-day tours.','Restaurants: usually 5–10%; cash tips preferred.','Housekeeping and luggage help: small daily/local cash tips.'], local:['Balloon flights may be canceled due to weather, so schedule early when possible.','Terrain can be dusty, hilly, and uneven.','Negotiating is common in some shops.'], checklist:['Small TRY cash for balloon/tour tips','Cash for driver/guide tips','Tip housekeeping if desired','Keep weather contingency in mind'], links:['travel-weather-clothing','travel-itinerary']},
  {country:'Croatia', city:'Zagreb', currency:'EUR €', title:'Zagreb euro and tipping', pay:['Croatia uses the euro.','Cards are widely accepted in restaurants, hotels, cafes, transit kiosks, and shops.','Carry small cash for markets, bakeries, small cafes, and public toilets.'], tips:['Coffee/cafe: €0.50–2.','Casual meal: €2–5.','Nice dinner: €5–10+ or close to 10%.','Taxi: round up or add €1–3.','Housekeeping: €2–5/day.'], local:['City center is very walkable.','Trams are useful and inexpensive.','Cafe culture is strong; lingering over coffee is normal.'], checklist:['Carry small euro coins','Use card for most meals/hotels','Round up taxis','Keep coins for bathrooms/cafes'], links:['travel-transportation','travel-hotels']},
  {country:'Croatia', city:'Plitvice Lakes', currency:'EUR €', title:'Plitvice cash and park practicals', pay:['Cards are accepted at park entrances, most hotels, restaurants, and souvenir shops.','Cash is useful for smaller cafes, snacks, and tips.'], tips:['Restaurants: 5–10% or round up.','Cafe/coffee: €0.50–2.','Hotel housekeeping: €2–5/day.','Drivers/tour guides: €5–15+ depending on service.'], local:['Dining near/inside the park can be more limited and more expensive.','Go early if possible.','Boardwalks can be slippery when wet.'], checklist:['Cash for snacks/cafe','Small tips for driver/guide','Rain layer ready','Comfortable grip shoes'], links:['travel-weather-clothing','travel-packing']},
  {country:'Croatia', city:'Rovinj / Pula', currency:'EUR €', title:'Istria coastal money notes', pay:['Cards are accepted almost everywhere in tourist areas.','Cash is useful for small bakeries, markets, tips, kiosks, and smaller cafes.'], tips:['Coffee/cafe: €0.50–2.','Casual meal: €2–5.','Nice dinner: 5–10%.','Hotel housekeeping: €2–5/day.','Taxi: round up modestly.','Boat tours/guides: optional small extra for good service.'], local:['Seafood, truffles, olive oil, and local wine are highlights.','Old town stone streets can be steep and slippery.','Parking in old centers can be limited if renting a car.'], checklist:['Carry small euros for markets','Reserve dinner if needed','Tip boat/tour guide if good','Keep card as main payment'], links:['travel-hotels','travel-itinerary']},
  {country:'Slovenia', city:'Ljubljana', currency:'EUR €', title:'Ljubljana money and cafe culture', pay:['Cards are accepted almost everywhere: restaurants, hotels, cafes, transit, and shops.','Carry small cash for markets, tiny cafes, and tips.'], tips:['Coffee/cafe: €0.50–2.','Casual restaurant: €2–5.','Nice dinner: about 5–10%.','Taxi: round up slightly.','Hotel housekeeping: €2–5/day.','Tour guides: small extra for good service.'], local:['City center is largely pedestrian-only and best explored on foot.','Good base for Lake Bled, Lake Bohinj, and Postojna Cave.','Very safe and easygoing overall.'], checklist:['Small euro cash','Check if market/cafe is cash-friendly','Tip guide if helpful','Plan walking shoes'], links:['travel-weather-clothing','travel-itinerary']},
  {country:'Austria', city:'Salzburg', currency:'EUR €', title:'Salzburg tipping style', pay:['Cards are widely accepted at hotels, restaurants, museums, cafes, and shops.','Cash is still useful for small bakeries, market stalls, traditional smaller businesses, and tips.'], tips:['Coffee/cafe: round up or €1–2.','Casual meal: 5–10%.','Nice dinner: around 10%.','Taxi: round up modestly.','Hotel housekeeping: €2–5/day.','Tour guides: €5–15+ depending on tour length.','In Austria, people often state the final amount they want charged; for example, a €47 bill becomes “50.”'], local:['Weather can be cool and rainy by late September/early October.','Old town is walkable.','Nearby excursions include Hallstatt, Berchtesgaden, and alpine lakes.'], checklist:['Carry small euros','Practice “make it 50” tipping style','Pack rain layer','Keep cash for bakeries/markets'], links:['travel-weather-clothing','travel-transportation']},
  {country:'Switzerland', city:'Zermatt', currency:'CHF', title:'Zermatt Swiss franc strategy', pay:['Credit card is easiest almost everywhere.','Carry a little CHF for small purchases, tips, mountain huts, or smaller vendors.','Some places may accept euros, but rates are usually poor and change is often in CHF.'], tips:['Service is already included, so tipping is modest.','Coffee/cafe: round up a little.','Restaurant: round up or 5–10% for excellent service.','Housekeeping: CHF 2–5/day.','Mountain guides/private tours: more if service is exceptional.','Example: CHF 47 bill → CHF 50; CHF 96 dinner → CHF 100–105 is generous.'], local:['Zermatt is car-free; expect walking, electric taxis, and hotel shuttles.','Mountain railways, lifts, food, and drinks are expensive.','Higher elevations can be cold, snowy, and windy.'], checklist:['Carry small CHF','Use card for most purchases','Budget high for lifts/mountain meals','Tip modestly, not US-style'], links:['travel-weather-clothing','travel-transportation']},
  {country:'Switzerland', city:'Lucerne', currency:'CHF', title:'Lucerne lake-city money notes', pay:['Credit cards are accepted almost everywhere: hotels, restaurants, trains/boats, cafes, and shops.','Some places may take euros, but CHF is better.','Carry small CHF for kiosks, tips, and small purchases.'], tips:['Cafe/coffee: round up slightly.','Casual restaurant: small rounding up.','Nice dinner: about 5–10% for especially good service.','Taxi: round up modestly.','Housekeeping: CHF 2–5/day.','Example: CHF 18 snack → CHF 20; CHF 92 dinner → CHF 100 is generous.'], local:['Swiss trains and boats are efficient and punctual.','Tap water is excellent.','Costs are high but usually less extreme than Zermatt.'], checklist:['Small CHF for kiosks','Use card for trains/boats/meals','Round up modestly','Carry rain layer'], links:['travel-transportation','travel-hotels']},
  {country:'Switzerland', city:'Zurich', currency:'CHF', title:'Zurich polished-city money notes', pay:['Cards are accepted almost everywhere: hotels, restaurants, transit, shops, cafes, and museums.','You can travel with little cash, but small CHF is convenient for kiosks, tips, and small purchases.','CHF is preferred even if euros are sometimes accepted.'], tips:['Coffee/snack: round up slightly.','Restaurant: round up or 5–10% for especially good service.','Taxi: small rounding up.','Hotel housekeeping: CHF 2–5/day.','Tour guides/private drivers: optional extra for excellent service.','Example: CHF 46 bill → CHF 50; CHF 97 dinner → CHF 100–105 is generous.'], local:['Zurich is clean, efficient, upscale, and expensive.','Public transit is excellent and easy without a car.','Tap water is excellent.'], checklist:['Small CHF for convenience','Use card for most expenses','Expect high dining/drink prices','Plan Zurich HB to airport train'], links:['travel-transportation','travel-itinerary']}
];
const searchInput=document.getElementById('searchInput');
const countryFilter=document.getElementById('countryFilter');
const currencyFilter=document.getElementById('currencyFilter');
const resetBtn=document.getElementById('resetBtn');
const mount=document.getElementById('moneyMount');
const summaryMount=document.getElementById('summaryMount');
function unique(a){return [...new Set(a)].sort();}
function optionize(sel, vals){vals.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o);});}
optionize(countryFilter,unique(MONEY.map(m=>m.country)));
optionize(currencyFilter,unique(MONEY.map(m=>m.currency)));
function matches(m){const q=searchInput.value.trim().toLowerCase(); const blob=[m.country,m.city,m.currency,m.title,...m.pay,...m.tips,...m.local,...m.checklist].join(' ').toLowerCase(); return (!q||blob.includes(q))&&(countryFilter.value==='all'||m.country===countryFilter.value)&&(currencyFilter.value==='all'||m.currency===currencyFilter.value);}
function summary(){summaryMount.innerHTML='';[['5','countries','Turkey, Croatia, Slovenia, Austria, Switzerland'],['3','currencies','TRY, EUR, CHF'],['10','city cards','Practical cash/card/tip rules'],['Private','safe design','No card or bank credentials']].forEach(([n,l,d])=>{const e=document.createElement('article');e.className='summary-card';e.innerHTML=`<div class="num">${n}</div><div class="label">${l}</div><p>${d}</p>`;summaryMount.appendChild(e);});}
function card(m, idx){const el=document.createElement('article');el.className='money-card';el.innerHTML=`<h2>${m.title}</h2><div class="meta"><span class="pill country">${m.country}</span><span class="pill">${m.city}</span><span class="pill currency">${m.currency}</span></div><div class="grid"><div><p class="section-title">Paying</p><ul>${m.pay.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><p class="section-title">Tipping</p><ul>${m.tips.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><p class="section-title">Local tips</p><ul>${m.local.map(x=>`<li>${x}</li>`).join('')}</ul></div></div><p class="section-title">Travel-day checklist</p><div class="checklist">${m.checklist.map((it,i)=>`<label class="check"><input type="checkbox" data-key="money-${idx}-${i}"><span>${it}</span></label>`).join('')}</div><p class="section-title">Related apps</p><div class="links">${m.links.map(id=>`<a href="${relatedAppHref(id)}">${id.replace('travel-','')}</a>`).join('')}</div>`;return el;}
function restoreChecks(){document.querySelectorAll('input[type="checkbox"][data-key]').forEach(cb=>{const key=cb.dataset.key;cb.checked=localStorage.getItem(key)==='1';cb.addEventListener('change',()=>localStorage.setItem(key,cb.checked?'1':'0'));});}
function render(){const list=MONEY.filter(matches);mount.innerHTML='';list.forEach((m,i)=>mount.appendChild(card(m,i)));if(!list.length)mount.innerHTML='<p class="empty">No money/tipping cards match the current filters.</p>';restoreChecks();}
resetBtn.addEventListener('click',()=>{searchInput.value='';countryFilter.value='all';currencyFilter.value='all';render();});
[searchInput,countryFilter,currencyFilter].forEach(el=>el.addEventListener('input',render));
summary();render();
setupMoneyFastTools();

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
    [/Rovinj|Pula|Istria/i,['Croatia','Rovinj / Pula']], [/Ljubljana|Bled|Bohinj|Postojna/i,['Slovenia','Ljubljana']],
    [/Salzburg/i,['Austria','Salzburg']], [/Zermatt|Matterhorn/i,['Switzerland','Zermatt']],
    [/Lucerne/i,['Switzerland','Lucerne']], [/Zurich/i,['Switzerland','Zurich']]
  ];
  const found=map.find(([re])=>re.test(city));
  if(!found) return;
  const [,target]=found; const [country,place]=target;
  panel.hidden=false;
  title.textContent=`Today: ${city}`;
  text.textContent=`Open the ${country} / ${place} money and tipping card for the selected Daily Operations day.`;
  btn.addEventListener('click',()=>{
    countryFilter.value=country;
    currencyFilter.value='all';
    searchInput.value=place;
    render();
    document.getElementById('moneyMount')?.scrollIntoView({behavior:'smooth',block:'start'});
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


function setupMoneyFastTools(){
  document.querySelectorAll('[data-jump-target]').forEach((btn)=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('[data-jump-target]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target=document.getElementById(btn.dataset.jumpTarget);
      if(target){
        target.classList.add('pulse');
        target.scrollIntoView({behavior:'smooth', block:'start'});
        window.setTimeout(()=>target.classList.remove('pulse'), 1200);
      }
    });
  });
}


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
