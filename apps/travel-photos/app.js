
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
function relatedAppLabel(id){return id.replace('travel-','').replaceAll('-',' ');}

const PHOTO_CARDS = [
  {type:'Daily workflow', place:'Whole trip', title:'Daily photo routine', priority:'High', details:['Take a few establishing photos each day: hotel exterior, street sign, train station or airport, restaurant, group photo, and one favorite view.','Use Daily Operations as the trigger: photos reminder should appear each day, then selected favorites can be archived later.','Do not spend the trip managing albums; capture now, sort later.'], checklist:['Morning: check phone/camera battery','Take one location-establishing photo','Take at least one group/person photo','Take one photo of hotel or transportation clue','Evening: mark favorites or add quick note','Backup if Wi-Fi is good'], notePrompt:'Favorite photos, missing shots, or captions for today:', links:['travel-daily-operations','travel-itinerary']},
  {type:'Shot list', place:'Turkey', title:'Istanbul photo opportunities', priority:'High', details:['Good targets: Galata area, Bosphorus cruise views, Old Town architecture, mosques from respectful distance, food/cafes, ferries, street scenes, hotel area.','Remember mosque and cultural site etiquette: avoid intrusive photography and respect posted rules.'], checklist:['Galata / Beyoğlu area','Bosphorus cruise wide shots','Old Town exterior views','Food/cafe detail shot','Hotel/street orientation photo','Group photo early in trip'], notePrompt:'Istanbul captions or shots to remember:', links:['travel-itinerary','travel-local-knowledge','travel-maps-movement']},
  {type:'Shot list', place:'Turkey', title:'Cappadocia photo opportunities', priority:'High', details:['Cappadocia is one of the most photo-important areas: sunrise balloons, cave hotel, valleys, fairy chimneys, underground city context, pottery/crafts, and landscape panoramas.','Weather can affect balloon flights, so take sunrise viewpoint photos even if balloon schedule changes.'], checklist:['Sunrise balloon scene','Cave hotel exterior/interior detail','Valley panorama','Fairy chimney close detail','Local craft/ceramic photo','Group photo with landscape'], notePrompt:'Cappadocia photo notes:', links:['travel-weather-clothing','travel-itinerary']},
  {type:'Shot list', place:'Croatia', title:'Zagreb / Plitvice photo opportunities', priority:'Medium', details:['Zagreb: city squares, cafes, architecture, market/cathedral area, street details.','Plitvice: waterfalls, boardwalks, lakes, forest atmosphere, water color, and rain/fog mood shots. Cloudy days can be excellent for waterfall photography.'], checklist:['Zagreb cafe/street photo','Zagreb architecture detail','Plitvice boardwalk shot','Waterfall long/wide shot','Forest/water color shot','Protect phone/camera from rain'], notePrompt:'Zagreb or Plitvice captions:', links:['travel-weather-clothing','travel-local-knowledge']},
  {type:'Shot list', place:'Croatia', title:'Rovinj / Pula photo opportunities', priority:'High', details:['Rovinj: harbor, old town streets, stone lanes, sunset, waterfront dining, St. Euphemia area.','Pula: Roman arena, old-town street scenes, harbor, Istrian food, coastal details.'], checklist:['Rovinj harbor daytime','Rovinj sunset','Old town stone lane','St. Euphemia viewpoint','Pula Arena exterior/interior','Seafood or truffle meal photo'], notePrompt:'Rovinj/Pula photo notes:', links:['travel-maps-movement','travel-money-tipping']},
  {type:'Shot list', place:'Slovenia', title:'Ljubljana / Lake Bled / Bohinj / Postojna', priority:'High', details:['Ljubljana: riverfront, Triple Bridge, castle, cafes, market, pedestrian city center.','Day trips: Lake Bled, Bohinj Valley, Postojna Cave. Caves may be low light; avoid flash where prohibited.'], checklist:['Triple Bridge / riverfront','Ljubljana Castle view','Cafe or market scene','Lake Bled classic view','Bohinj landscape','Postojna Cave entrance/context'], notePrompt:'Slovenia captions:', links:['travel-itinerary','travel-weather-clothing']},
  {type:'Shot list', place:'Austria', title:'Salzburg photo opportunities', priority:'Medium', details:['Salzburg: old town, Hohensalzburg Fortress, Mirabell area, Getreidegasse, river views, musical/cultural details, rainy alpine atmosphere if weather changes.'], checklist:['Old town wide shot','Fortress view','Mirabell area','Street sign/detail photo','Hotel/train station orientation','Group photo in Salzburg'], notePrompt:'Salzburg captions:', links:['travel-transportation','travel-local-knowledge']},
  {type:'Shot list', place:'Switzerland', title:'Zermatt / Matterhorn photo opportunities', priority:'High', details:['Zermatt is the major alpine photo section. Prioritize Matterhorn views when skies are clear.','Good targets: Gornergrat, Matterhorn Glacier Paradise, Sunnegga, village streets, mountain railway/cable car, and early snow/autumn contrast.'], checklist:['Matterhorn clear-sky view','Gornergrat or mountain railway shot','Village street with mountain context','Cable car / train experience','Warm-layer/mountain gear photo','Evening or sunrise view if available'], notePrompt:'Zermatt/Matterhorn captions:', links:['travel-weather-clothing','travel-maps-movement']},
  {type:'Shot list', place:'Switzerland', title:'Lucerne / Zurich photo opportunities', priority:'Medium', details:['Lucerne: Chapel Bridge, lakefront, Lion Monument, old town, foggy lake atmosphere.','Zurich: Old Town, lake, Bahnhofstrasse, chocolate/cafe details, train-to-airport final travel context.'], checklist:['Lucerne Chapel Bridge','Lake Lucerne view','Old town street detail','Zurich Old Town or lake','Final hotel/airport transfer context','End-of-trip group photo'], notePrompt:'Lucerne/Zurich captions:', links:['travel-transportation','travel-hotels']},
  {type:'Backup workflow', place:'Whole trip', title:'Photo backup and organization', priority:'High', details:['Keep the workflow simple enough to actually do while traveling. A daily or every-other-day backup is better than a perfect system that never happens.','Recommended later: pick favorites by day and city, then archive into the Trip Archive app after the trip.'], checklist:['Check available phone storage before departure','Enable cloud photo backup if desired','Bring/confirm charging cable','Back up after major photo days','Avoid deleting originals during trip unless necessary','After trip: create favorites list by destination'], notePrompt:'Backup status and problems:', links:['travel-packing','travel-archive']},
  {type:'Archive planning', place:'Whole trip', title:'Post-trip photo archive plan', priority:'Medium', details:['At the end of the trip, photos should become part of the Trip Archive: favorite restaurants, favorite hotels, best transportation experiences, lessons learned, and best photo memories.','This app is the bridge between daily photo capture and the final archived travel library.'], checklist:['Create folder by trip','Sort by date/city','Mark top 10–20 favorites','Write captions for favorites','Add hotel/restaurant/transport review photos','Move final selected set to Trip Archive later'], notePrompt:'Archive ideas and favorite-photo candidates:', links:['travel-archive','travel-costs','travel-hotels']}
];
const searchInput=document.getElementById('searchInput');const typeFilter=document.getElementById('typeFilter');const placeFilter=document.getElementById('placeFilter');const resetBtn=document.getElementById('resetBtn');const mount=document.getElementById('photosMount');const summaryMount=document.getElementById('summaryMount');
function unique(a){return [...new Set(a)].sort();}
function optionize(sel, vals){vals.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o);});}
optionize(typeFilter, unique(PHOTO_CARDS.map(c=>c.type)));optionize(placeFilter, unique(PHOTO_CARDS.map(c=>c.place)));
function matches(c){const q=searchInput.value.trim().toLowerCase();const blob=[c.type,c.place,c.title,c.priority,...c.details,...c.checklist,c.notePrompt].join(' ').toLowerCase();return(!q||blob.includes(q))&&(typeFilter.value==='all'||c.type===typeFilter.value)&&(placeFilter.value==='all'||c.place===placeFilter.value);}
function summary(){summaryMount.innerHTML='';[['Private','visibility','Photo notes only; no image files embedded yet'],['11','photo cards','Daily workflow, city shot lists, backup, archive'],['Daily','reminder','Capture, quick note, backup when practical'],['Later','archive','Favorites, captions, reviews, lessons learned']].forEach(([n,l,d])=>{const e=document.createElement('article');e.className='summary-card';e.innerHTML=`<div class="num">${n}</div><div class="label">${l}</div><p>${d}</p>`;summaryMount.appendChild(e);});}
function priorityClass(p){return p==='High'?'gold':(p==='Medium'?'blue':'green');}
function card(c, idx){const el=document.createElement('article');el.className='photo-card';el.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.type}</span><span class="pill">${c.place}</span><span class="pill ${priorityClass(c.priority)}">${c.priority}</span></div><div class="grid"><div><p class="section-title">Photo guidance</p><ul>${c.details.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><p class="section-title">Checklist</p><div class="checklist">${c.checklist.map((it,i)=>`<label class="check"><input type="checkbox" data-key="photos-${idx}-${i}"><span>${it}</span></label>`).join('')}</div></div></div><div class="notes"><p class="section-title">Notes</p><textarea data-note="photo-note-${idx}" placeholder="${c.notePrompt}"></textarea><button class="save-note" data-save="photo-note-${idx}" type="button">Save note</button></div><p class="section-title">Related apps</p><div class="links">${c.links.map(id=>`<a href="${relatedAppHref(id)}">${id.replace('travel-','')}</a>`).join('')}</div>`;return el;}
function restore(){document.querySelectorAll('input[type="checkbox"][data-key]').forEach(cb=>{const key=cb.dataset.key;cb.checked=localStorage.getItem(key)==='1';cb.addEventListener('change',()=>localStorage.setItem(key,cb.checked?'1':'0'));});document.querySelectorAll('textarea[data-note]').forEach(t=>{const k=t.dataset.note;t.value=localStorage.getItem(k)||'';});document.querySelectorAll('button[data-save]').forEach(b=>{b.addEventListener('click',()=>{const k=b.dataset.save;const t=document.querySelector(`textarea[data-note="${k}"]`);if(t){localStorage.setItem(k,t.value);b.textContent='Saved';setTimeout(()=>b.textContent='Save note',900);}});});}
function render(){const list=PHOTO_CARDS.filter(matches);mount.innerHTML='';list.forEach((c,i)=>mount.appendChild(card(c,i)));if(!list.length)mount.innerHTML='<p class="empty">No photo cards match the current filters.</p>';restore();}
resetBtn.addEventListener('click',()=>{searchInput.value='';typeFilter.value='all';placeFilter.value='all';render();});[searchInput,typeFilter,placeFilter].forEach(el=>el.addEventListener('input',render));summary();render();
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));}

const DAILY_TEMPLATE_LINES = [
  'Day: ',
  'City: ',
  'Best photos: ',
  'Food photos: ',
  'Hotel / room photos: ',
  'Transportation photos: ',
  'Receipts / document photos: ',
  'People / group photos: ',
  'Caption ideas: ',
  'Problems / things to remember: '
];

function slugifyDayLabel(value){
  return (value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'untitled-day';
}

function buildDailyTemplate(dayLabel){
  const lines=[...DAILY_TEMPLATE_LINES];
  if(dayLabel && dayLabel.trim()) lines[0] = `Day: ${dayLabel.trim()}`;
  return lines.join('\n');
}

function initDailyPhotoNotes(){
  const dayInput = document.getElementById('dailyPhotoDay');
  const text = document.getElementById('dailyPhotoText');
  const status = document.getElementById('dailyPhotoStatus');
  const loadBtn = document.getElementById('loadDailyPhotoNoteBtn');
  const saveBtn = document.getElementById('saveDailyPhotoNoteBtn');
  const clearBtn = document.getElementById('clearDailyPhotoNoteBtn');
  const copyBtn = document.getElementById('copyDailyPhotoNoteBtn');
  const listMount = document.getElementById('savedDailyPhotoList');
  if(!dayInput || !text || !status || !loadBtn || !saveBtn || !clearBtn || !copyBtn || !listMount) return;

  const INDEX_KEY = 'daily-photo-notes-index';
  const keyFor = (label) => `daily-photo-note::${slugifyDayLabel(label)}`;

  function getIndex(){
    try { return JSON.parse(localStorage.getItem(INDEX_KEY) || '[]'); }
    catch(e){ return []; }
  }

  function setIndex(list){
    localStorage.setItem(INDEX_KEY, JSON.stringify(list));
  }

  function updateStatus(message){
    status.textContent = message;
  }

  function renderSavedList(){
    const items = getIndex();
    if(!items.length){
      listMount.innerHTML = '<p class="saved-day-empty">No daily photo notes saved yet.</p>';
      return;
    }
    listMount.innerHTML = '';
    items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'saved-day-btn';
      btn.textContent = item.label;
      btn.addEventListener('click', () => loadExisting(item.label));
      listMount.appendChild(btn);
    });
  }

  function upsertIndex(label){
    const clean = (label || '').trim();
    if(!clean) return;
    const id = slugifyDayLabel(clean);
    const items = getIndex().filter(item => item.id !== id);
    items.push({id, label: clean});
    items.sort((a,b) => a.label.localeCompare(b.label, undefined, {numeric:true, sensitivity:'base'}));
    setIndex(items);
  }

  function removeFromIndex(label){
    const id = slugifyDayLabel(label);
    setIndex(getIndex().filter(item => item.id !== id));
  }

  function loadExisting(label){
    const clean = (label || '').trim();
    if(!clean){
      updateStatus('Enter a day label first.');
      return;
    }
    dayInput.value = clean;
    const saved = localStorage.getItem(keyFor(clean));
    if(saved){
      text.value = saved;
      updateStatus(`Loaded saved note for ${clean}.`);
    } else {
      text.value = buildDailyTemplate(clean);
      updateStatus(`Loaded a new template for ${clean}.`);
    }
    document.getElementById('daily-photo-notes')?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  loadBtn.addEventListener('click', () => loadExisting(dayInput.value));

  saveBtn.addEventListener('click', () => {
    const clean = (dayInput.value || '').trim();
    if(!clean){
      updateStatus('Enter a day label before saving.');
      dayInput.focus();
      return;
    }
    localStorage.setItem(keyFor(clean), text.value || buildDailyTemplate(clean));
    upsertIndex(clean);
    renderSavedList();
    updateStatus(`Saved daily photo note for ${clean}.`);
  });

  clearBtn.addEventListener('click', () => {
    const clean = (dayInput.value || '').trim();
    if(!clean){
      updateStatus('Enter a day label to delete its saved entry.');
      dayInput.focus();
      return;
    }
    localStorage.removeItem(keyFor(clean));
    removeFromIndex(clean);
    text.value = buildDailyTemplate(clean);
    renderSavedList();
    updateStatus(`Deleted saved daily photo note for ${clean}.`);
  });

  copyBtn.addEventListener('click', async () => {
    const val = text.value || '';
    if(!val.trim()){
      updateStatus('Nothing to copy yet. Load or type a note first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(val);
      updateStatus('Daily photo note copied to clipboard.');
    } catch(e){
      text.select();
      document.execCommand('copy');
      updateStatus('Daily photo note copied to clipboard.');
    }
  });

  dayInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      loadExisting(dayInput.value);
    }
  });

  renderSavedList();
  if(!dayInput.value) dayInput.value = 'Day 01';
  text.value = buildDailyTemplate(dayInput.value);
}

initDailyPhotoNotes();

function initDestinationSections(){
  const sections = Array.from(document.querySelectorAll('.destination-section'));
  if(!sections.length) return;

  function getTitle(section){
    const h = section.querySelector('h2');
    return h ? h.textContent.trim() : 'Open section';
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




// Universal card accordion behavior: individual cards collapse/open.
(function(){
  const CARD_CLASSES = ['timeline-card','hotel-card','transport-card','weather-card','pack-card','money-card','map-card','essential-card','day-card','knowledge-card','phrase-card','cost-card','insurance-card','photo-card'];
  function isTargetCard(article){if(!article || article.dataset.accordionReady === '1') return false;if(article.classList.contains('summary-card')) return false;return CARD_CLASSES.some(cls => article.classList.contains(cls));}
  function getTitle(article){const h = article.querySelector('h2, h3, .card-title, .transport-head h2, .weather-head h2');let text = h ? h.textContent.trim() : 'Open card';text = text.replace(/\s+/g,' ');if(text.length > 95) text = text.slice(0,92) + '...';return text || 'Open card';}
  function initCard(article){if(!isTargetCard(article)) return;const title = getTitle(article);const content = document.createElement('div');content.className = 'travel-accordion-content';while(article.firstChild) content.appendChild(article.firstChild);const btn = document.createElement('button');btn.type = 'button';btn.className = 'travel-accordion-toggle';btn.setAttribute('aria-expanded','false');btn.innerHTML = `<span><span class="toggle-title">${title}</span><span class="toggle-hint">Tap to open / collapse</span></span>`;btn.addEventListener('click', () => {const open = article.classList.toggle('open');btn.setAttribute('aria-expanded', open ? 'true' : 'false');});article.classList.add('travel-accordion-ready');article.dataset.accordionReady = '1';article.appendChild(btn);article.appendChild(content);}
  function initAll(){document.querySelectorAll('article').forEach(initCard);}
  function setAll(open){document.querySelectorAll('article.travel-accordion-ready').forEach(article => {article.classList.toggle('open', open);const btn = article.querySelector(':scope > .travel-accordion-toggle');if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');});}
  function addControls(){if(document.getElementById('cardControls')) return;const header = document.querySelector('header.hero') || document.querySelector('header');if(!header) return;const controls = document.createElement('div');controls.id = 'cardControls';controls.className = 'card-controls';controls.innerHTML = '<button type="button" id="expandCardsBtn">Expand all cards</button><button type="button" id="collapseCardsBtn">Collapse all cards</button>';header.appendChild(controls);controls.querySelector('#expandCardsBtn').addEventListener('click',()=>setAll(true));controls.querySelector('#collapseCardsBtn').addEventListener('click',()=>setAll(false));}
  function boot(){addControls();initAll();const main = document.querySelector('main') || document.body;const obs = new MutationObserver(() => initAll());obs.observe(main, {childList:true, subtree:true});}
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();


function initRelatedAppButtons(){
  document.addEventListener('click', function(event){
    const btn = event.target.closest('[data-open-app]');
    if(!btn) return;
    const target = btn.getAttribute('data-open-app');
    if(!target) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    window.location.assign(target);
  }, true);
}
initRelatedAppButtons();


function initGeneratedRelatedAppLinks(){
  document.addEventListener('click', function(event){
    const el = event.target.closest('a[href*="travel-"], button[data-open-app], a[data-open-app]');
    if(!el) return;
    let target = el.getAttribute('data-open-app') || el.getAttribute('href');
    if(!target) return;
    if(target.includes('index.html#travel-')){
      const id = target.split('#').pop();
      target = relatedAppHref(id);
    }
    if(target.includes('travel-') && target.endsWith('/index.html')){
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.location.href = target;
    }
  }, true);
}
initGeneratedRelatedAppLinks();


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
