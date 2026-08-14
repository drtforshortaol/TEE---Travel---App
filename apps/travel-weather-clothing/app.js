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

const WEATHER = [
  {city:"Istanbul", country:"Turkey", dates:"Sep 16-18", sort:"2026-09-16", condition:"warm", high:"77-82°F / 25-28°C", low:"64-68°F / 18-20°C", rain:"Possible brief showers, often dry", feel:"Warm, comfortable, moderately humid with Bosphorus/airport breezes", packing:["light clothes","comfortable walking shoes","light jacket/sweater","small umbrella","thin flight layer"], notes:["Good walking, ferry, and outdoor dining weather without peak summer heat.","Airport areas may feel cool indoors and walking distances can be long."], links:["travel-itinerary","travel-hotels","travel-transportation"]},
  {city:"Cappadocia", country:"Turkey", dates:"Sep 18-21", sort:"2026-09-18", condition:"cool mornings", high:"72-79°F / 22-26°C", low:"48-55°F / 9-13°C", rain:"Uncommon but possible", feel:"Dry, big day/night temperature swing, chilly before sunrise", packing:["layers","light jacket/fleece","warmer sunrise layer","hiking shoes","sunglasses","sunscreen"], notes:["Hot-air balloon mornings can feel quite cold before sunrise.","September is prime timing for comfortable temperatures and often favorable balloon weather."], links:["travel-itinerary","travel-transportation","travel-packing"]},
  {city:"Zagreb", country:"Croatia", dates:"Sep 21-23", sort:"2026-09-21", condition:"autumn", high:"68-75°F / 20-24°C", low:"50-57°F / 10-14°C", rain:"Occasional showers fairly common", feel:"Crisp, comfortable, more autumn-like than Türkiye", packing:["layers","light waterproof jacket","jeans/pants","comfortable walking shoes"], notes:["Cooler evenings than Istanbul and Cappadocia.","Good walking weather for old town, cafes, and parks."], links:["travel-itinerary","travel-hotels"]},
  {city:"Plitvice Lakes", country:"Croatia", dates:"Sep 23-24", sort:"2026-09-23", condition:"damp forest", high:"60-70°F / 16-21°C", low:"45-52°F / 7-11°C", rain:"Fairly possible; forest can be damp", feel:"Fresh autumn air, cool mornings, fog possible, shaded waterfall paths", packing:["waterproof jacket","good walking/hiking shoes","fleece/layers","small backpack","water"], notes:["Boardwalks and paths can get slippery when wet.","Morning can be quieter and more beautiful in the park."], links:["travel-itinerary","travel-transportation","travel-packing"]},
  {city:"Rovinj", country:"Croatia", dates:"Sep 24-27", sort:"2026-09-24", condition:"coastal mild", high:"70-76°F / 21-24°C", low:"58-64°F / 14-18°C", rain:"Occasional showers possible", feel:"Mediterranean, warm in sun, cooler at waterfront nights", packing:["light layers","walking shoes for stone streets","evening sweater","swimwear","light rain layer"], notes:["Sea may still be swimmable in late September.","Old Town stones can be steep and slippery."], links:["travel-itinerary","travel-hotels","travel-maps-movement"]},
  {city:"Pula", country:"Croatia", dates:"Sep 25 day trip", sort:"2026-09-25", condition:"coastal mild", high:"72-77°F / 22-25°C", low:"58-63°F / 14-17°C", rain:"Brief showers possible; many sunny days", feel:"Late-summer Adriatic, warm afternoons, mild harbor evenings", packing:["light daytime clothes","evening layer","comfortable shoes/sandals","swimwear","small rain layer"], notes:["Excellent timing for Pula Arena and coastal activities without peak summer crowds."], links:["travel-itinerary","travel-transportation"]},
  {city:"Ljubljana", country:"Slovenia", dates:"Sep 27-30", sort:"2026-09-27", condition:"autumn", high:"66-73°F / 19-23°C", low:"48-55°F / 9-13°C", rain:"Moderate chance of showers", feel:"Crisp, walkable, cool evenings near the river", packing:["layers","light waterproof jacket","comfortable walking shoes","sweater/light fleece"], notes:["Cooler than coastal Croatia and very good for day trips to lakes/caves.","Late September can bring early fall color."], links:["travel-itinerary","travel-hotels","travel-packing"]},
  {city:"Salzburg", country:"Austria", dates:"Sep 30-Oct 2", sort:"2026-09-30", condition:"cool/rain", high:"58-67°F / 14-19°C", low:"43-50°F / 6-10°C", rain:"Moderate chance; alpine weather changes quickly", feel:"Crisp autumn, cool mornings and evenings", packing:["layers","waterproof jacket","comfortable walking shoes","sweater/fleece","compact umbrella","light scarf"], notes:["Alpine day trips can be significantly colder at elevation."], links:["travel-itinerary","travel-hotels","travel-transportation"]},
  {city:"Zermatt / Matterhorn", country:"Switzerland", dates:"Oct 2-4", sort:"2026-10-02", condition:"alpine cold", high:"45-58°F / 7-14°C", low:"32-41°F / 0-5°C", rain:"Rapid weather changes; snow possible at elevation", feel:"True alpine autumn; town chilly mornings/evenings, mountain below freezing", packing:["warm layers","insulated/medium jacket","hat/gloves","waterproof layer","light hikers","sunglasses"], notes:["Coldest and most dramatic weather contrast of the trip.","Gornergrat and Matterhorn Glacier Paradise can feel much colder because of wind and elevation."], links:["travel-itinerary","travel-hotels","travel-packing"]},
  {city:"Lucerne", country:"Switzerland", dates:"Oct 4-5", sort:"2026-10-04", condition:"cool/rain", high:"55-64°F / 13-18°C", low:"43-50°F / 6-10°C", rain:"Fairly possible; fog/clouds possible", feel:"Cool lake autumn, milder than Zermatt", packing:["layers","light waterproof jacket","comfortable walking shoes","sweater/fleece","compact umbrella"], notes:["Good for lakefront walking, old town, and mountain trips if weather allows."], links:["travel-itinerary","travel-hotels"]},
  {city:"Zurich", country:"Switzerland", dates:"Oct 5-6", sort:"2026-10-05", condition:"cool/rain", high:"55-63°F / 13-17°C", low:"43-50°F / 6-10°C", rain:"Intermittent showers possible", feel:"Clean, crisp, urban early-autumn weather", packing:["layers","light waterproof jacket","comfortable walking shoes","sweater/light fleece","compact umbrella"], notes:["Good for Old Town, Lake Zurich walks, cafes, chocolate shops, and museums if rainy."], links:["travel-itinerary","travel-hotels","travel-transportation"]}
];
const searchInput = document.getElementById('searchInput');
const countryFilter = document.getElementById('countryFilter');
const climateFilter = document.getElementById('climateFilter');
const resetBtn = document.getElementById('resetBtn');
const weatherMount = document.getElementById('weatherMount');
const summaryMount = document.getElementById('summaryMount');
const weatherToolStatus = document.getElementById('weatherToolStatus');
let weatherToolMode = '';
const weatherToolLabels = {
  rain: 'Rain / waterproof',
  cold: 'Cold / alpine',
  walking: 'Walking shoes',
  travel: 'Travel day layers',
  daybag: 'Day bag items'
};
const weatherToolTargets = {
  rain: 'weather-protocol-rain',
  cold: 'weather-protocol-cold',
  walking: 'weather-protocol-walking',
  travel: 'weather-protocol-travel',
  daybag: 'weather-protocol-daybag'
};
function unique(values){return [...new Set(values)].filter(Boolean).sort();}
function optionize(select, values){values.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;select.appendChild(o);});}
optionize(countryFilter, unique(WEATHER.map(w=>w.country)));
optionize(climateFilter, unique(WEATHER.map(w=>w.condition)));
function classFor(condition){ if(condition.includes('cold')) return 'cold'; if(condition.includes('cool')) return 'cool'; if(condition.includes('rain')||condition.includes('damp')) return 'rain'; if(condition.includes('warm')||condition.includes('coastal')) return 'warm'; return ''; }
function matches(w){
  const q = searchInput.value.trim().toLowerCase();
  const blob = [w.city,w.country,w.dates,w.condition,w.high,w.low,w.rain,w.feel,...w.packing,...w.notes].join(' ').toLowerCase();
  return (!q || blob.includes(q)) && (countryFilter.value==='all'||w.country===countryFilter.value) && (climateFilter.value==='all'||w.condition===climateFilter.value);
}
function summary(){
  summaryMount.innerHTML='';
  const items = [
    ['11','weather stops','Istanbul through Zurich'],
    ['5','countries','Turkey, Croatia, Slovenia, Austria, Switzerland'],
    ['Zermatt','coldest stop','Warm layer, gloves, waterproof shell'],
    ['Plitvice','slippery risk','Rain jacket and grippy shoes']
  ];
  items.forEach(([n,l,d])=>{const card=document.createElement('article');card.className='summary-card';card.innerHTML=`<div class="num">${n}</div><div class="label">${l}</div><p>${d}</p>`;summaryMount.appendChild(card);});
}
function card(w){
  const el=document.createElement('article'); el.className='weather-card';
  const pc = classFor(w.condition);
  el.innerHTML = `<div class="weather-head"><div><h2>${w.city}</h2><p>${w.country} · ${w.dates}</p><div class="pill-row"><span class="pill ${pc}">${w.condition}</span><span class="pill">High ${w.high}</span><span class="pill">Low ${w.low}</span></div></div></div>
  <div class="weather-body"><div><p class="section-title">Expected Conditions</p><div class="info-grid"><div class="key">Rain / Weather</div><div class="value">${w.rain}</div><div class="key">Feels Like</div><div class="value">${w.feel}</div></div><div class="links"><strong>Related apps:</strong> ${w.links.map(id=>`<a href="${relatedAppHref(id)}">${id.replace('travel-','')}</a>`).join('')}</div></div><div><p class="section-title">Pack / Wear</p><div class="packing">${w.packing.map(i=>`<span>${i}</span>`).join('')}</div><p class="section-title" style="margin-top:14px">Notes</p><ul class="notes">${w.notes.map(n=>`<li>${n}</li>`).join('')}</ul></div></div>`;
  return el;
}
function render(){
  const list = WEATHER.filter(matches).sort((a,b)=>a.sort.localeCompare(b.sort));
  weatherMount.innerHTML='';
  list.forEach(w=>weatherMount.appendChild(card(w)));
  if(!list.length) weatherMount.innerHTML='<p class="notice">No weather stops match the current filters.</p>';
  if(weatherToolStatus){
    if(weatherToolMode){
      weatherToolStatus.textContent = `${weatherToolLabels[weatherToolMode]} opened below. Weather cards are unchanged; use search/country/condition filters to narrow destinations.`;
      weatherToolStatus.hidden = false;
    } else {
      weatherToolStatus.textContent = 'Fast tools are direct jump buttons. Tap one to jump to the exact clothing protocol below.';
      weatherToolStatus.hidden = false;
    }
  }
}

function setActiveWeatherTool(key){
  document.querySelectorAll('[data-weather-tool]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.weatherTool === key && key !== 'reset');
  });
}
document.querySelectorAll('[data-weather-tool]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.weatherTool;
    if(key === 'reset'){
      weatherToolMode = '';
      searchInput.value = '';
      countryFilter.value = 'all';
      climateFilter.value = 'all';
      setActiveWeatherTool('reset');
    } else {
      weatherToolMode = key;
      setActiveWeatherTool(key);
    }
    render();
    if(key === 'reset'){
      document.getElementById('weatherMount')?.scrollIntoView({behavior:'smooth', block:'start'});
    } else {
      jumpToWeatherProtocol(key);
    }
  });
});

function jumpToWeatherProtocol(key){
  const targetId = weatherToolTargets[key];
  const target = targetId ? document.getElementById(targetId) : null;
  document.querySelectorAll('.protocol-target').forEach(el => el.classList.remove('protocol-highlight'));
  if(target){
    target.classList.add('protocol-highlight');
    target.scrollIntoView({behavior:'smooth', block:'center'});
  }
}

resetBtn.addEventListener('click',()=>{searchInput.value=''; countryFilter.value='all'; climateFilter.value='all'; weatherToolMode=''; setActiveWeatherTool('reset'); render();});
[searchInput,countryFilter,climateFilter].forEach(el=>el.addEventListener('input',render));
summary(); render();
if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(console.warn)); }


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

// v3.3.34 Limited-online weather operations.
// Privacy rule: requests send only fixed destination coordinates and weather variables.
const TEE_WEATHER_CACHE_KEY='tee-weather-live-cache-v1';
const LIVE_LOCATIONS={
  'Istanbul':{lat:41.0082,lon:28.9784},
  'Cappadocia':{lat:38.6431,lon:34.8289},
  'Zagreb':{lat:45.8150,lon:15.9819},
  'Plitvice Lakes':{lat:44.8808,lon:15.6163},
  'Rovinj':{lat:45.0812,lon:13.6387},
  'Pula':{lat:44.8666,lon:13.8496},
  'Ljubljana':{lat:46.0569,lon:14.5058},
  'Salzburg':{lat:47.8095,lon:13.0550},
  'Zermatt / Matterhorn':{lat:46.0207,lon:7.7491},
  'Lucerne':{lat:47.0502,lon:8.3093},
  'Zurich':{lat:47.3769,lon:8.5417},
  'Istanbul Airport':{lat:41.2753,lon:28.7519}
};
function readLiveWeatherCache(){try{return JSON.parse(localStorage.getItem(TEE_WEATHER_CACHE_KEY)||'{}')}catch{return {}}}
function writeLiveWeatherCache(v){localStorage.setItem(TEE_WEATHER_CACHE_KEY,JSON.stringify(v));}
function weatherCodeText(code){
  const c=Number(code); if(c===0)return 'Clear'; if([1,2].includes(c))return 'Mostly clear / partly cloudy'; if(c===3)return 'Overcast';
  if([45,48].includes(c))return 'Fog'; if([51,53,55,56,57].includes(c))return 'Drizzle'; if([61,63,65,66,67,80,81,82].includes(c))return 'Rain / showers';
  if([71,73,75,77,85,86].includes(c))return 'Snow / snow showers'; if([95,96,99].includes(c))return 'Thunderstorms'; return 'Mixed conditions';
}
function clothingCue(day){
  if(!day)return '';
  const lo=Number(day.temperature_2m_min), hi=Number(day.temperature_2m_max), rain=Number(day.precipitation_probability_max||0), wind=Number(day.wind_speed_10m_max||0);
  const cues=[];
  if(lo<=5)cues.push('warm jacket + warm layer'); else if(lo<=11)cues.push('fleece/light jacket'); else if(lo<=17)cues.push('light layer'); else cues.push('light clothing');
  if(rain>=40)cues.push('rain shell/umbrella'); if(wind>=30)cues.push('wind layer'); cues.push('comfortable walking shoes');
  return cues.join(' • ');
}
function liveDayFromCache(location,dateYmd){
  const cache=readLiveWeatherCache(); const rec=cache[location]; if(!rec||!rec.daily)return null;
  const i=(rec.daily.time||[]).indexOf(dateYmd); if(i<0)return {record:rec,day:null};
  const d={}; Object.keys(rec.daily).forEach(k=>d[k]=Array.isArray(rec.daily[k])?rec.daily[k][i]:rec.daily[k]);
  return {record:rec,day:d};
}
async function fetchLiveWeather(location){
  const loc=LIVE_LOCATIONS[location]; if(!loc)throw new Error('No fixed weather location configured.');
  const params=new URLSearchParams({
    latitude:String(loc.lat),longitude:String(loc.lon),timezone:'auto',forecast_days:'16',temperature_unit:'fahrenheit',wind_speed_unit:'mph',precipitation_unit:'inch',
    daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max'
  });
  const res=await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`,{cache:'no-store'}); if(!res.ok)throw new Error(`Weather service returned ${res.status}`);
  const json=await res.json(); const cache=readLiveWeatherCache(); cache[location]={fetchedAt:new Date().toISOString(),timezone:json.timezone,daily:json.daily}; writeLiveWeatherCache(cache); return cache[location];
}
function formatUpdated(iso){if(!iso)return 'never'; const d=new Date(iso); return d.toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});}
function liveWeatherHtml(location,dateYmd,planningText,gear){
  const found=liveDayFromCache(location,dateYmd); const gearHtml=(gear||[]).length?`<p><strong>Trip-specific carry:</strong> ${(gear||[]).join(' • ')}</p>`:'';
  if(found&&found.day){const d=found.day;return `<div class="live-weather-card"><div class="live-weather-badges"><span>LIVE-CACHED</span><span>Updated ${formatUpdated(found.record.fetchedAt)}</span></div><strong>${weatherCodeText(d.weather_code)} — ${Math.round(d.temperature_2m_max)}°F / ${Math.round(d.temperature_2m_min)}°F</strong><p>Rain chance ${Math.round(d.precipitation_probability_max||0)}% • Wind up to ${Math.round(d.wind_speed_10m_max||0)} mph</p><p><strong>Wear/carry:</strong> ${clothingCue(d)}</p>${gearHtml}</div>`;}
  const last=found?.record?.fetchedAt?` Last refresh: ${formatUpdated(found.record.fetchedAt)}.`:'';
  return `<div class="live-weather-card fallback"><div class="live-weather-badges"><span>PLANNING FALLBACK</span></div><strong>${planningText||'Use destination planning guidance.'}</strong><p>Live forecast for this trip date is not in the cached forecast window yet.${last}</p>${gearHtml}</div>`;
}

function initLiveWeatherOps(){
  const select=document.getElementById('liveWeatherLocation'), one=document.getElementById('refreshLiveWeather'), all=document.getElementById('refreshAllLiveWeather'), status=document.getElementById('liveWeatherStatus'), preview=document.getElementById('liveWeatherPreview');
  if(!select||!one||!all)return;
  Object.keys(LIVE_LOCATIONS).filter(x=>x!=='Istanbul Airport').forEach(loc=>{const o=document.createElement('option');o.value=loc;o.textContent=loc;select.appendChild(o)});
  function previewLocation(){const loc=select.value; const rec=readLiveWeatherCache()[loc]; if(!rec){preview.innerHTML='<div class="live-weather-card fallback"><strong>No cached live forecast yet.</strong><p>Refresh on Wi-Fi. Planning cards below remain available offline.</p></div>';return;} const first=rec.daily?.time?.[0]; preview.innerHTML=liveWeatherHtml(loc,first,'Planning guidance remains available.',[]);}
  one.addEventListener('click',async()=>{one.disabled=true;status.textContent=`Refreshing ${select.value}…`;try{await fetchLiveWeather(select.value);status.textContent=`${select.value} refreshed and cached at ${formatUpdated(new Date().toISOString())}.`;previewLocation()}catch(e){status.textContent=`Refresh failed — cached/planning data remains available. ${e.message}`}finally{one.disabled=false}});
  all.addEventListener('click',async()=>{all.disabled=true;let ok=0;const locs=Object.keys(LIVE_LOCATIONS).filter(x=>x!=='Istanbul Airport');for(const loc of locs){status.textContent=`Refreshing ${loc} (${ok+1}/${locs.length})…`;try{await fetchLiveWeather(loc);ok++}catch{}}status.textContent=`Weather refresh complete: ${ok}/${locs.length} trip stops cached.`;previewLocation();all.disabled=false});
  select.addEventListener('change',previewLocation); previewLocation();
}
initLiveWeatherOps();
