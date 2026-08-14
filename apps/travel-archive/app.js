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


const ARCHIVE_PROTOCOLS = [
  {id:'end-trip-capture', title:'End-of-Trip Capture Checklist', details:['Before the trip memory fades, capture the final story: what changed, what worked, what failed, and what should be repeated.','This is the bridge from active trip app to final preserved archive.'], checklist:['Save final itinerary notes','Save major trip changes','Save favorite memories','Save major problems','Mark unresolved follow-ups','Decide what belongs in final PDF binder']},
  {id:'photo-sorting', title:'Photo Sorting Plan', details:['Photos are collected during travel and sorted after travel. Keep sorting simple: by date, city, favorite, and practical reference.','Use the Photos app for capture planning and Trip Archive for final curation.'], checklist:['Create date/city folders','Pick top favorites','Add captions for favorites','Separate receipt/document photos','Save hotel/transportation reference photos','Back up final selected set']},
  {id:'receipt-expense', title:'Receipt / Expense Archive', details:['Preserve receipts and expense notes only as needed. Final costs should link back to Costs and Money + Tipping.','Private payment details should stay private and should not be included in any public version.'], checklist:['Archive important receipts','Record final prepaid costs','Record cash/card lessons','Record tips and local fees','Record unexpected costs','Move sensitive payment notes to Private Documents']},
  {id:'lessons-learned', title:'Lessons Learned', details:['This section makes the whole hub reusable. Capture what should change before the next trip.','Focus on practical lessons: packing, timing, lodging, transportation, weather, money, and app usability.'], checklist:['Record packing lessons','Record transportation timing lessons','Record hotel/lodging lessons','Record language/local knowledge lessons','Record money/tipping lessons','Record app workflow lessons']},
  {id:'reviews', title:'Hotel / Transportation Review Notes', details:['Save operational reviews that will help future travel planning: sleep quality, location, access, check-in, luggage handling, transfers, trains, airports, and walking distances.'], checklist:['Review each hotel','Review each major transfer','Review rail pass/train experience','Review airport timing','Record would-stay-again notes','Record would-do-differently notes']},
  {id:'favorites', title:'Best Restaurants / Places', details:['Keep a memory list and a practical future-reference list. Favorites should be easy to find later.'], checklist:['Save favorite restaurants','Save favorite sights','Save favorite hotel/location','Save best photo spots','Save best local discovery','Save one-line summary by country']},
  {id:'problems', title:'Problems to Remember', details:['Problems are valuable data. Record them while the details are still fresh so future trips can avoid repeating them.'], checklist:['Record missed connections/delays','Record confusing stations/airports','Record hotel or room issues','Record weather/clothing problems','Record money/payment problems','Record medical/insurance issues if any']},
  {id:'reuse-notes', title:'Future Trip Reuse Notes', details:['The final archive should improve the next travel hub. This is where the Turkey/Eastern Europe trip becomes a reusable model.'], checklist:['Identify reusable app structure','Identify fields to add next time','Identify fields to remove','Identify PDF binder improvements','Identify confidential quick-reference improvements','Identify future public-template changes']},
  {id:'pdf-final', title:'PDF Binder / Final Archive Plan', details:['Later, create a fully clickable private iPhone PDF and a separate confidential quick-reference PDF.','The public version, if made later, should use realistic anonymous replacement data, not just stripped-empty content.'], checklist:['Create full private clickable PDF binder','Create confidential quick-reference PDF','Keep sensitive PDF off public repo','Archive final private app ZIP','Archive final source documents privately','Plan anonymized public template later']}
];
function el(tag, cls, html){const e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e;}
function renderMission(){const mount=document.getElementById('archiveMission'); if(!mount) return; mount.innerHTML=`<h2>Trip Archive Mission Control</h2><p>The archive app is the post-trip control center: preserve what actually happened, sort photos and receipts, capture lessons learned, and prepare the final private iPhone PDFs.</p><div class="mission-grid"><div><strong>During trip</strong><span>Capture quick notes and save important clues.</span></div><div><strong>After trip</strong><span>Sort, summarize, review, and preserve.</span></div><div><strong>Future use</strong><span>Feed the next travel hub and future public template.</span></div></div>`;}
function renderFastTools(){const mount=document.getElementById('archiveFastTools'); if(!mount) return; const buttons=[['end-trip-capture','End-of-trip capture'],['photo-sorting','Photo sorting'],['receipt-expense','Receipts / expenses'],['lessons-learned','Lessons learned'],['reviews','Reviews'],['favorites','Best places'],['problems','Problems'],['reuse-notes','Future reuse'],['pdf-final','PDF final plan']]; mount.innerHTML='<h2>Archive Fast Tools</h2><p>Direct jump buttons for the final archive workflow.</p><div class="tool-row">'+buttons.map(([id,label])=>`<button type="button" data-jump="${id}">${label}</button>`).join('')+'</div>'; mount.querySelectorAll('button[data-jump]').forEach(btn=>btn.addEventListener('click',()=>jumpToProtocol(btn.dataset.jump)));}
function renderProtocols(){const mount=document.getElementById('archiveProtocols'); if(!mount) return; mount.innerHTML='<h2>Trip Archive Protocols</h2><div class="protocol-grid">'+ARCHIVE_PROTOCOLS.map(p=>`<article class="protocol-card" id="protocol-${p.id}"><h3>${p.title}</h3><ul>${p.details.map(x=>`<li>${x}</li>`).join('')}</ul><div class="mini-checklist">${p.checklist.map((x,i)=>`<label><input type="checkbox" data-key="archive-protocol-${p.id}-${i}"><span>${x}</span></label>`).join('')}</div></article>`).join('')+'</div>';}
function jumpToProtocol(id){const target=document.getElementById('protocol-'+id); if(!target) return; target.scrollIntoView({behavior:'smooth', block:'start'}); target.classList.add('pulse'); setTimeout(()=>target.classList.remove('pulse'),1200);}

const ARCHIVE_CARDS = [
  {phase:'Before departure', type:'Archive setup', title:'Create the final archive container', priority:'High', details:['Create a single final archive location for the trip before departure so notes, photos, expenses, and lessons have a home.','This app is the index; the actual files can remain in folders/cloud storage until final cleanup.'], checklist:['Create final trip archive folder','Decide naming pattern for daily notes/photos','Confirm where final PDFs will be stored','Keep sensitive documents private','Do not publish public copy yet'], notePrompt:'Archive setup notes:', links:['travel-essentials','travel-photos']},
  {phase:'During trip', type:'Daily journal', title:'Preserve daily notes from Yesterday / Today / Tomorrow', priority:'High', details:['Daily Operations is the working dashboard. After each day, important notes should be preserved here as the final record.','Capture what changed, what worked, delays, special memories, and practical advice for future trips.'], checklist:['Save where we stayed','Save what we actually did','Save transportation issues','Save favorite food/place notes','Save photo reminders','Move important notes from Daily Operations into archive later'], notePrompt:'Daily journal archive notes:', links:['travel-daily-operations','travel-itinerary']},
  {phase:'After trip', type:'Locked itinerary', title:'Lock the final itinerary', priority:'High', details:['The pre-trip itinerary and the actual trip often diverge. The final archive should preserve what actually happened.','Keep the agency itinerary as a reference and create a final personal itinerary as the trip record.'], checklist:['Mark final itinerary complete','Record changed dates/times','Record missed or substituted activities','Record final hotel sequence','Record final transportation sequence'], notePrompt:'Final itinerary notes:', links:['travel-itinerary','travel-transportation','travel-hotels']},
  {phase:'After trip', type:'Photo archive', title:'Preserve favorite photos and captions', priority:'Medium', details:['Photos app is the working capture planner. This archive card is for the final curated set: favorites, captions, city highlights, and review-support photos.','Use your own properly cropped photos later; avoid relying on PDF screenshots for final visuals.'], checklist:['Sort photos by city/date','Choose top favorites','Add captions for favorites','Save hotel/building/entrance photos','Save transportation experience photos','Create final photo favorites folder'], notePrompt:'Favorite photo list and captions:', links:['travel-photos','travel-hotels','travel-maps-movement']},
  {phase:'After trip', type:'Hotel reviews', title:'Hotel review archive', priority:'Medium', details:['Preserve what mattered operationally: check-in ease, room comfort, breakfast, location, noise, laundry, staff help, walking access, train/airport access.','This becomes a future travel planning reference.'], checklist:['Review each hotel','Record best/worst hotel','Record location convenience','Record breakfast notes','Record room/accessibility notes','Record whether you would stay again'], notePrompt:'Hotel reviews:', links:['travel-hotels','travel-daily-operations']},
  {phase:'After trip', type:'Transportation lessons', title:'Transportation experience archive', priority:'Medium', details:['Record what worked and what was stressful: airport timing, train platforms, Rail Europe pass, luggage, transfers, taxi apps, walking distances, and connection buffers.'], checklist:['Record flight/airport lessons','Record train/pass lessons','Record private transfer quality','Record luggage problems','Record best connection buffer','Record local transit lessons'], notePrompt:'Transportation lessons:', links:['travel-transportation','travel-maps-movement']},
  {phase:'After trip', type:'Costs and expenses', title:'Final expense summary', priority:'Medium', details:['Costs app is the working tracker. This archive card is the final summary: known prepaid costs, daily spending, currency lessons, tips, and unexpected expenses.'], checklist:['Archive prepaid cost summary','Archive hotel/rail/flight cost notes','Archive daily spending summary if tracked','Record cash/card lessons','Record tipping lessons','Record unexpected costs'], notePrompt:'Final cost summary:', links:['travel-costs','travel-money-tipping']},
  {phase:'After trip', type:'Packing lessons', title:'Packing lessons learned', priority:'High', details:['This is especially important because your travel system uses a master packing list filtered for each trip. The final lessons should update the master travel packing library later.','Compare what was packed, used, missed, and excessive.'], checklist:['Record items used often','Record items not used','Record items missed','Record clothing strategy accuracy','Record electronics/cable lessons','Update master travel list later'], notePrompt:'Packing lessons learned:', links:['travel-packing','travel-weather-clothing']},
  {phase:'After trip', type:'Local knowledge', title:'Local knowledge updates', priority:'Medium', details:['Capture what local advice turned out to be useful or wrong: tipping, transit, scams, business hours, dining reservations, walking terrain, and language phrases.'], checklist:['Record useful phrases','Record tipping reality','Record safety/scam notes','Record dining/business-hour lessons','Record transportation app/taxi notes','Record country-specific surprises'], notePrompt:'Local knowledge archive:', links:['travel-local-knowledge','travel-language','travel-money-tipping']},
  {phase:'After trip', type:'Future improvements', title:'Future travel hub improvements', priority:'Medium', details:['This hub is meant to become reusable. After the trip, preserve what features worked, what was missing, and what should become standard for the next travel hub.'], checklist:['Record best app features','Record confusing app areas','Record missing fields','Record checklist improvements','Record photo/header improvement plan','Record next-trip template changes'], notePrompt:'Future hub improvements:', links:['travel-archive','travel-daily-operations']}
];
const searchInput=document.getElementById('searchInput');const phaseFilter=document.getElementById('phaseFilter');const typeFilter=document.getElementById('typeFilter');const resetBtn=document.getElementById('resetBtn');const mount=document.getElementById('archiveMount');const summaryMount=document.getElementById('summaryMount');
function unique(a){return [...new Set(a)].sort();}
function optionize(sel, vals){vals.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o);});}
optionize(phaseFilter, unique(ARCHIVE_CARDS.map(c=>c.phase))); optionize(typeFilter, unique(ARCHIVE_CARDS.map(c=>c.type)));
function matches(c){const q=searchInput.value.trim().toLowerCase();const blob=[c.phase,c.type,c.title,c.priority,...c.details,...c.checklist,c.notePrompt].join(' ').toLowerCase();return(!q||blob.includes(q))&&(phaseFilter.value==='all'||c.phase===phaseFilter.value)&&(typeFilter.value==='all'||c.type===typeFilter.value);}
function summary(){summaryMount.innerHTML='';[['Private','visibility','Archive keeps sensitive trip records private.'],['10','archive cards','Journal, photos, reviews, costs, lessons, improvements.'],['After trip','main use','Finalize what actually happened.'],['Reusable','framework','Feeds the next travel hub template.']].forEach(([n,l,d])=>{const e=document.createElement('article');e.className='summary-card';e.innerHTML=`<div class="num">${n}</div><div class="label">${l}</div><p>${d}</p>`;summaryMount.appendChild(e);});}
function priorityClass(p){return p==='High'?'high':(p==='Medium'?'medium':'low');}
function card(c, idx){const el=document.createElement('article');el.className='archive-card';el.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill phase">${c.phase}</span><span class="pill">${c.type}</span><span class="pill ${priorityClass(c.priority)}">${c.priority}</span></div><div class="grid"><div><p class="section-title">Archive guidance</p><ul>${c.details.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><p class="section-title">Checklist</p><div class="checklist">${c.checklist.map((it,i)=>`<label class="check"><input type="checkbox" data-key="archive-${idx}-${i}"><span>${it}</span></label>`).join('')}</div></div></div><div class="notes"><p class="section-title">Notes</p><textarea data-note="archive-note-${idx}" placeholder="${c.notePrompt}"></textarea><button class="save-note" data-save="archive-note-${idx}" type="button">Save note</button></div><p class="section-title">Related apps</p><div class="links">${c.links.map(id=>`<a href="${relatedAppHref(id)}">${id.replace('travel-','')}</a>`).join('')}</div>`;return el;}
function restore(){document.querySelectorAll('input[type="checkbox"][data-key]').forEach(cb=>{const key=cb.dataset.key;cb.checked=localStorage.getItem(key)==='1';cb.addEventListener('change',()=>localStorage.setItem(key,cb.checked?'1':'0'));});document.querySelectorAll('textarea[data-note]').forEach(t=>{const k=t.dataset.note;t.value=localStorage.getItem(k)||'';});document.querySelectorAll('button[data-save]').forEach(b=>{b.addEventListener('click',()=>{const k=b.dataset.save;const t=document.querySelector(`textarea[data-note="${k}"]`);if(t){localStorage.setItem(k,t.value);b.textContent='Saved';setTimeout(()=>b.textContent='Save note',900);}});});}
function render(){const list=ARCHIVE_CARDS.filter(matches);mount.innerHTML='';list.forEach((c,i)=>mount.appendChild(card(c,i)));if(!list.length)mount.innerHTML='<p class="empty">No archive cards match the current filters.</p>';restore();}
resetBtn.addEventListener('click',()=>{searchInput.value='';phaseFilter.value='all';typeFilter.value='all';render();});[searchInput,phaseFilter,typeFilter].forEach(el=>el.addEventListener('input',render));renderMission();renderFastTools();renderProtocols();summary();render();

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

// Universal card accordion behavior: individual cards collapse/open.
(function(){
  const CARD_CLASSES = ['archive-card'];
  function isTargetCard(article){if(!article || article.dataset.accordionReady === '1') return false;if(article.classList.contains('summary-card')) return false;return CARD_CLASSES.some(cls => article.classList.contains(cls));}
  function getTitle(article){const h = article.querySelector('h2, h3, .card-title');let text = h ? h.textContent.trim() : 'Open card';text = text.replace(/\s+/g,' ');if(text.length > 95) text = text.slice(0,92) + '...';return text || 'Open card';}
  function initCard(article){if(!isTargetCard(article)) return;const title = getTitle(article);const content = document.createElement('div');content.className = 'travel-accordion-content';while(article.firstChild) content.appendChild(article.firstChild);const btn = document.createElement('button');btn.type = 'button';btn.className = 'travel-accordion-toggle';btn.setAttribute('aria-expanded','false');btn.innerHTML = `<span><span class="toggle-title">${title}</span><span class="toggle-hint">Tap to open / collapse</span></span>`;btn.addEventListener('click', () => {const open = article.classList.toggle('open');btn.setAttribute('aria-expanded', open ? 'true' : 'false');});article.classList.add('travel-accordion-ready');article.dataset.accordionReady = '1';article.appendChild(btn);article.appendChild(content);}
  function initAll(){document.querySelectorAll('article').forEach(initCard);}function setAll(open){document.querySelectorAll('article.travel-accordion-ready').forEach(article => {article.classList.toggle('open', open);const btn = article.querySelector(':scope > .travel-accordion-toggle');if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');});}
  function addControls(){if(document.getElementById('cardControls')) return;const header = document.querySelector('header.hero') || document.querySelector('header');if(!header) return;const controls = document.createElement('div');controls.id = 'cardControls';controls.className = 'card-controls';controls.innerHTML = '<button type="button" id="expandCardsBtn">Expand all cards</button><button type="button" id="collapseCardsBtn">Collapse all cards</button>';header.appendChild(controls);controls.querySelector('#expandCardsBtn').addEventListener('click',()=>setAll(true));controls.querySelector('#collapseCardsBtn').addEventListener('click',()=>setAll(false));}
  function boot(){addControls();initAll();const main = document.querySelector('main') || document.body;const obs = new MutationObserver(() => initAll());obs.observe(main, {childList:true, subtree:true});}
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
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


// ---- v3.3.48 Expense Archive Snapshot ----
(function renderExpenseArchiveSnapshot(){
  const host=document.getElementById('expenseArchiveStatus'); if(!host)return;
  const key='teeTripExpenseArchiveSnapshotsV1'; let list=[];
  try{const v=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(v))list=v;}catch{}
  if(!list.length)return;
  const s=list[list.length-1], totals=Object.entries(s.totals||{}).map(([c,v])=>`${c} ${Number(v||0).toFixed(2)}`).join(' · ');
  host.innerHTML=`<strong>Expense archive snapshot:</strong> ${s.count||0} expense${s.count===1?'':'s'}, ${s.receiptCount||0} receipt/file${s.receiptCount===1?'':'s'}${totals?` · ${totals}`:''}. Saved ${new Date(s.createdAt).toLocaleString()} from ${s.authorizedProfile||'authorized view'}. <a href="../travel-costs/index.html">Open Costs reports</a>.`;
})();
