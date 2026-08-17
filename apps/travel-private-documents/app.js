const privateSections = [
  {
    id: 'quick-reference',
    title: 'Quick Reference Summary',
    priority: 'Critical',
    use: 'Use first when standing in an airport, train station, hotel lobby, or with a guide/driver.',
    items: [
      'Today / tomorrow movement summary',
      'Emergency contact pathway',
      'Flight, hotel, and rail reference pointers',
      'Insurance and phone/data support pointers',
      'Where the private documents are stored on the phone'
    ],
    actions: [
      'Keep this section short enough for a separate home-screen PDF later.',
      'Add exact final confirmations only when the itinerary is closer to locked.',
      'For now, use the document vault links below for the protected local/vault records.'
    ],
    linkedDocs: ['Airport and Train Stuff', 'Hotel', 'People', 'Phone Data']
  },
  {
    id: 'flight-airline-confirmations',
    title: 'Flight / Airline Confirmations',
    priority: 'Critical',
    use: 'Use for check-in, seat/baggage questions, delays, rebooking, or airport support.',
    items: [
      'Airline confirmation / PNR',
      'Ticket number',
      'Seat / baggage notes',
      'International flight timing and airport notes',
      'Airline support pathway'
    ],
    actions: [
      'Keep exact PNR and ticket numbers private.',
      'Add a short “what to show the agent” note later.',
      'Cross-check with Transportation app before final PDF export.'
    ],
    linkedDocs: ['Airport and Train Stuff', 'Trip Planning']
  },
  {
    id: 'train-rail-pass-information',
    title: 'Train / Rail Pass Information',
    priority: 'Critical',
    use: 'Use for rail pass activation, station questions, seat reservations, and transfer days.',
    items: [
      'Rail pass number / mobile pass reference',
      'Seat reservation references',
      'Station-to-hotel movement notes',
      'Backup proof-of-purchase notes'
    ],
    actions: [
      'Keep rail pass and ticket references private.',
      'Add exact station names and platform notes later if needed.',
      'Confirm whether screenshots are needed for offline phone use.'
    ],
    linkedDocs: ['Airport and Train Stuff', 'Maps']
  },
  {
    id: 'hotel-booking-references',
    title: 'Hotel Booking References',
    priority: 'Critical',
    use: 'Use at check-in, when calling hotels, or when confirming payment/reservation details.',
    items: [
      'Hotel confirmation numbers',
      'Check-in / check-out notes',
      'Hotel phone/email if needed',
      'Private lodging access notes',
      'Who paid / payment status when relevant'
    ],
    actions: [
      'Move exact booking references here or keep them linked in the Hotel source packet.',
      'Add a one-line check-in script later if needed.',
      'Cross-check with Hotels app before final PDF export.'
    ],
    linkedDocs: ['Hotel', 'Miscellaneous']
  },
  {
    id: 'insurance-information',
    title: 'Insurance Information',
    priority: 'Critical',
    use: 'Use for medical, trip interruption, lost baggage, or urgent claims support.',
    items: [
      'Policy / plan reference',
      'Insurance phone number / website',
      'Claim instructions',
      'Medical emergency notes',
      'Documents needed for claim support'
    ],
    actions: [
      'Add policy number only to the private version.',
      'Add “call first / submit later” instructions when available.',
      'Create a short insurance block for the confidential quick-reference PDF.'
    ],
    linkedDocs: ['Trip Planning', 'People']
  },
  {
    id: 'phone-data-support',
    title: 'Phone / Data Support',
    priority: 'High',
    use: 'Use when phone data, roaming, eSIM, hotspot, charging, or connectivity fails.',
    items: [
      'Phone plan / international data notes',
      'Support contact pathway',
      'Wi-Fi / roaming reminders',
      'Offline map / offline PDF reminder',
      'Backup communication plan'
    ],
    actions: [
      'Keep account-specific details private.',
      'Add screenshots or setup notes later if needed.',
      'Make sure the confidential PDF is saved offline before travel.'
    ],
    linkedDocs: ['Phone Data']
  },
  {
    id: 'emergency-contacts',
    title: 'Emergency Contacts',
    priority: 'Critical',
    use: 'Use for medical events, lost passport, travel disruption, or group separation.',
    items: [
      'Traveler contact chain',
      'Travel coordinator / agency contact',
      'Hotel front desk contact pathway',
      'Embassy / consulate placeholder',
      'Emergency instructions for group separation'
    ],
    actions: [
      'Add final traveler phone numbers only in the private version.',
      'Add country-specific emergency numbers later.',
      'Keep a short version in the confidential quick-reference PDF.'
    ],
    linkedDocs: ['People', 'Trip Planning']
  },
  {
    id: 'passport-global-entry-reminders',
    title: 'Passport / Global Entry Reminders',
    priority: 'Critical',
    use: 'Use as a reminder of what identity documents exist and where private copies are stored.',
    items: [
      'Passport copy location reminder',
      'Global Entry / trusted traveler reminder if applicable',
      'Lost passport action pathway',
      'Private document storage reminder'
    ],
    actions: [
      'Do not publish passport images or numbers.',
      'Do not include passport images in any public repo.',
      'Decide later whether the phone PDF should include images or only reminders.'
    ],
    linkedDocs: ['Passports', 'People']
  },
  {
    id: 'payment-cost-references',
    title: 'Payment / Cost References',
    priority: 'High',
    use: 'Use for paid/unpaid tracking, split payments, receipts, reimbursements, and cash planning.',
    items: [
      'Paid-by notes',
      'Remaining balance reminders',
      'Cash/tipping estimate',
      'Receipts / proof of payment pointers',
      'Emergency reserve reminder'
    ],
    actions: [
      'Keep detailed payment splits private.',
      'Cross-check with Costs and Money + Tipping apps.',
      'Add final cash/tip plan closer to departure.'
    ],
    linkedDocs: ['Money + Tipping', 'Miscellaneous']
  },
  {
    id: 'lost-item-problem-instructions',
    title: 'Lost Item / Problem Instructions',
    priority: 'High',
    use: 'Use when something goes wrong and you need a simple action pathway.',
    items: [
      'Lost passport',
      'Lost phone',
      'Lost luggage',
      'Missed train / flight delay',
      'Hotel problem / booking mismatch',
      'Medical / pharmacy issue'
    ],
    actions: [
      'Build short “do this first” scripts later.',
      'Link to Language app emergency phrases if needed.',
      'Add screenshots or contact links only in the private version.'
    ],
    linkedDocs: ['People', 'Phone Data', 'Airport and Train Stuff', 'Hotel']
  }
];

const documents = [
  { title: 'Passports', category: 'Identity', status: 'private', owner: 'coupleA', packaged: false, reviewed: true, file: 'docs/passports.pdf', type: 'PDF', priority: 'Critical', notes: 'Glenn and Virginia identity source. Structured passport records are migrated into Couple A Private; the raw passport PDF is intentionally omitted from this package.', tags: ['passport', 'identity', 'critical', 'private'] },
  { title: 'People', category: 'Contacts', status: 'private', reviewed: false, file: 'docs/people.pdf', type: 'PDF', priority: 'Critical', notes: 'Traveler and contact reference information.', tags: ['people', 'contacts', 'travelers', 'private'] },
  { title: 'Phone Data', category: 'Phone / Data', status: 'shared', reviewed: false, file: 'docs/phone-data.pdf', type: 'PDF', priority: 'Critical', notes: 'Phone plan, connectivity, and access notes.', tags: ['phone', 'data', 'connectivity'] },
  { title: 'Hotel', category: 'Lodging', status: 'shared', reviewed: true, file: 'docs/hotel.pdf', type: 'PDF', priority: 'High', notes: 'Hotel and lodging reference packet.', tags: ['hotel', 'lodging', 'reservation'] },
  { title: 'Airport and Train Stuff', category: 'Transportation', status: 'shared', reviewed: true, file: 'docs/airport-train.pdf', type: 'PDF', priority: 'High', notes: 'Airport, flight, train, pass, transfer, and transportation documents.', tags: ['airport', 'train', 'flight', 'transportation', 'tickets'] },
  { title: 'Maps', category: 'Movement', status: 'reference', reviewed: false, file: 'docs/maps.pdf', type: 'PDF', priority: 'High', notes: 'Map and movement reference pages.', tags: ['maps', 'movement', 'route', 'walking'] },
  { title: 'Money + Tipping', category: 'Money', status: 'shared', reviewed: false, file: 'docs/money-tipping.pdf', type: 'PDF', priority: 'High', notes: 'Money, tipping, payment, currency, and spending notes.', tags: ['money', 'tips', 'cash', 'currency'] },
  { title: 'Trip Planning', category: 'Planning', status: 'shared', reviewed: true, file: 'docs/trip-planning.pdf', type: 'PDF', priority: 'High', notes: 'Trip planning packet and route planning reference.', tags: ['planning', 'itinerary', 'route', 'schedule'] },
  { title: 'Weather', category: 'Weather', status: 'public', reviewed: false, file: 'docs/weather.pdf', type: 'PDF', priority: 'Medium', notes: 'Weather and clothing planning reference.', tags: ['weather', 'clothing', 'packing'] },
  { title: 'Travel List', category: 'Packing', status: 'reference', reviewed: false, file: 'docs/travel-list.pdf', type: 'PDF', priority: 'Medium', notes: 'Travel list PDF reference.', tags: ['packing', 'checklist', 'travel-list'] },
  { title: 'Travel List 20180903', category: 'Packing', status: 'archive', reviewed: true, file: 'docs/travel-list-20180903.docx', type: 'DOCX', priority: 'Medium', notes: 'Original Word travel list reference. Opens/downloads depending on browser.', tags: ['packing', 'checklist', 'docx', 'archive'] },
  { title: 'Miscellaneous', category: 'Reference', status: 'reference', reviewed: false, file: 'docs/miscellaneous.pdf', type: 'PDF', priority: 'Low', notes: 'Miscellaneous private reference document.', tags: ['misc', 'reference'] },
  { title: 'ChatGPT Ideas', category: 'Planning', status: 'reference', reviewed: true, file: 'docs/chatgpt-ideas.pdf', type: 'PDF', priority: 'Low', notes: 'Idea/reference document from ChatGPT planning notes.', tags: ['ideas', 'planning', 'chatgpt'] },
  { title: 'Handwritten Rail Schedule — Sep 30 to Oct 6, 2026', category: 'Transportation', status: 'shared', reviewed: true, file: 'docs/handwritten-rail-schedule-2026.jpeg', type: 'JPEG', priority: 'High', notes: 'Current handwritten rail schedule used to update TEE transportation records.', tags: ['rail','train','schedule','2026','shared'] },
  { title: 'Handwritten Trip To-Do + Rail Plan — 2026', category: 'Planning', status: 'shared', reviewed: true, file: 'docs/handwritten-trip-todo-rail-plan-2026.jpeg', type: 'JPEG', priority: 'High', notes: 'Trip planning and rail timing source; includes visa/ETIAS reminders.', tags: ['planning','rail','visa','etias','shared'] },
  { title: 'Handwritten Turkish Airlines Flights — 2026', category: 'Transportation', status: 'shared', reviewed: true, file: 'docs/handwritten-turkish-airlines-flights-2026.jpeg', type: 'JPEG', priority: 'High', notes: 'Turkish Airlines flight and seat source for Michael and Susan plus Zurich-Istanbul booking.', tags: ['flight','turkish-airlines','seat','pnr','shared'] },
  { title: 'Handwritten YOTEL Istanbul Airport — 2026', category: 'Lodging', status: 'shared', reviewed: true, file: 'docs/handwritten-yotel-istanbul-2026.jpeg', type: 'JPEG', priority: 'High', notes: 'YOTEL Istanbul Airport airside stay notes for Oct 6-7, 2026.', tags: ['hotel','istanbul','yotel','shared'] },
  { title: 'Handwritten Hotels — Salzburg, Lucerne, Zurich — 2026', category: 'Lodging', status: 'shared', reviewed: true, file: 'docs/handwritten-hotels-salzburg-lucerne-zurich-2026.jpeg', type: 'JPEG', priority: 'High', notes: 'Hotel booking notes used to update Salzburg, Lucerne, and Zurich records.', tags: ['hotel','salzburg','lucerne','zurich','shared'] },
  { title: 'Handwritten Rail Passes — 2026', category: 'Transportation', status: 'shared', reviewed: true, file: 'docs/handwritten-rail-passes-2026.jpeg', type: 'JPEG', priority: 'High', notes: 'Rail pass and PNR source for Michael and Susan plus extension rail timing notes.', tags: ['rail','pass','pnr','shared'] }
];

const SOURCE_DOC_STATE_KEY = 'teeSourceDocumentManagerV1';
const SOURCE_STATUS_LABELS = {
  private: 'Private', shared: 'Shared', public: 'Public', reference: 'Reference', archive: 'Archive', remove: 'Remove from TEE'
};
function sourceDocKey(doc){ return doc.file; }
function sourceInventoryRecord(doc){
  return {
    ...doc,
    packaged:false,
    sourceInventoryOnly:true
  };
}
const sourceInventory = documents.map(sourceInventoryRecord);
window.TEESourceInventoryCount = sourceInventory.length;
function loadSourceDocumentState(){
  try { const parsed = JSON.parse(localStorage.getItem(SOURCE_DOC_STATE_KEY) || '{}'); return parsed && typeof parsed === 'object' ? parsed : {}; }
  catch(e){ return {}; }
}
let sourceDocumentState = loadSourceDocumentState();
function sourceDocState(doc){
  return sourceDocumentState[sourceDocKey(doc)] || {status:doc.status||'reference',owner:doc.owner||null,reviewed:!!doc.reviewed};
}
function saveSourceDocumentState(){ localStorage.setItem(SOURCE_DOC_STATE_KEY, JSON.stringify(sourceDocumentState)); }
function sourceOwnerLabel(owner){
  if(owner==='coupleA') return 'Couple A';
  if(owner==='coupleB') return 'Couple B';
  if(owner==='split') return 'Split required';
  return 'Owner not assigned';
}
function choosePrivateSourceOwner(doc,current){
  const existing=current?.owner||doc.owner||'';
  const answer=prompt(`Who owns the PRIVATE source "${doc.title}"?\n\nType A for Couple A\nType B for Couple B\nType SPLIT if this source contains private data for both couples and must be split before either couple can open it.`,existing==='coupleA'?'A':existing==='coupleB'?'B':existing==='split'?'SPLIT':'');
  if(answer===null) return null;
  const n=answer.trim().toUpperCase();
  if(n==='A') return 'coupleA';
  if(n==='B') return 'coupleB';
  if(n==='SPLIT') return 'split';
  alert('Private source not changed. Enter A, B, or SPLIT.'); return null;
}
function sourceDocCanOpen(doc,state){
  if(state.status==='remove'||doc.packaged===false) return false;
  if(state.status==='public') return true;
  const unlocked=typeof getVaultState==='function'&&getVaultState()==='unlocked';
  if(!unlocked) return false;
  if(state.status!=='private') return true;
  if(state.owner!=='coupleA'&&state.owner!=='coupleB') return false;
  return typeof getActiveProfileId==='function'&&getActiveProfileId()===state.owner;
}
function setSourceDocStatus(doc,status){
  const current=sourceDocState(doc); let owner=current.owner||doc.owner||null;
  if(status==='private'){ owner=choosePrivateSourceOwner(doc,current); if(!owner) return; }
  if(status==='public'&&current.status!=='public'){
    if(!confirm(`Mark ${doc.title} PUBLIC-SAFE?\n\nUse Public only after reviewing the entire source document and confirming it contains no identity data, credentials, PNRs, confirmation numbers, private contacts, or other sensitive trip data.`)) return;
    owner=null;
  }
  if(status==='remove'){
    if(!confirm(`Remove ${doc.title} from active TEE?\n\nThis marks the source PURGE REQUESTED and disables its Open/Download links. Structured vault records already extracted from it are retained.\n\nThe packaged source file cannot be physically erased by the browser; it must be omitted from the next rebuilt TEE package.`)) return;
    owner=null;
  }
  if(status!=='private') owner=null;
  sourceDocumentState[sourceDocKey(doc)]={...current,status,owner,reviewed:true,changedAt:new Date().toISOString()};
  saveSourceDocumentState(); render();
}
function toggleSourceReviewed(doc){
  const current = sourceDocState(doc);
  sourceDocumentState[sourceDocKey(doc)] = {...current, reviewed: !current.reviewed, changedAt: new Date().toISOString()};
  saveSourceDocumentState(); render();
}
const sectionMount = document.getElementById('sectionMount');
const sectionIndex = document.getElementById('sectionIndex');
const quickGrid = document.getElementById('quickGrid');
const docMount = document.getElementById('docMount');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function unique(values) { return [...new Set(values)].filter(Boolean).sort(); }
function safeId(value) { return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

function optionize(select, values) {
  values.forEach(v => {
    const o = document.createElement('option');
    o.value = v;
    o.textContent = v;
    select.appendChild(o);
  });
}
optionize(categoryFilter, unique(sourceInventory.map(d => d.category)));

function searchBlobForSection(section) {
  return [section.title, section.priority, section.use, ...(section.items || []), ...(section.actions || []), ...(section.linkedDocs || [])].join(' ').toLowerCase();
}

function searchBlobForDoc(doc) {
  return [doc.title, doc.category, doc.file, doc.type, doc.priority, doc.notes, ...(doc.tags || [])].join(' ').toLowerCase();
}

function currentQuery() { return searchInput.value.trim().toLowerCase(); }

function sectionMatches(section) {
  const q = currentQuery();
  return !q || searchBlobForSection(section).includes(q);
}

function docMatches(doc) {
  const q = currentQuery();
  const cat = categoryFilter.value;
  return (!q || searchBlobForDoc(doc).includes(q)) && (cat === 'all' || doc.category === cat);
}



const SOURCE_SECTION_RELATIONSHIPS = {
  'quick-reference': [
    'Airport and Train Stuff','Hotel','People','Phone Data','Money + Tipping',
    'Trip Planning','Handwritten Turkish Airlines Flights — 2026',
    'Handwritten Rail Schedule — Sep 30 to Oct 6, 2026',
    'Handwritten Hotels — Salzburg, Lucerne, Zurich — 2026',
    'Handwritten YOTEL Istanbul Airport — 2026'
  ],
  'flight-airline-confirmations': [
    'Airport and Train Stuff','Trip Planning',
    'Handwritten Turkish Airlines Flights — 2026',
    'Handwritten Trip To-Do + Rail Plan — 2026'
  ],
  'train-rail-pass-information': [
    'Airport and Train Stuff','Maps',
    'Handwritten Rail Schedule — Sep 30 to Oct 6, 2026',
    'Handwritten Rail Passes — 2026',
    'Handwritten Trip To-Do + Rail Plan — 2026'
  ],
  'hotel-booking-references': [
    'Hotel','Miscellaneous',
    'Handwritten YOTEL Istanbul Airport — 2026',
    'Handwritten Hotels — Salzburg, Lucerne, Zurich — 2026'
  ],
  'insurance-information': [
    'Trip Planning','People'
  ],
  'phone-data-support': [
    'Phone Data','Trip Planning'
  ],
  'emergency-contacts': [
    'People','Trip Planning','Phone Data','Hotel'
  ],
  'passport-global-entry-reminders': [
    'Passports','Trip Planning',
    'Handwritten Trip To-Do + Rail Plan — 2026'
  ],
  'payment-cost-references': [
    'Money + Tipping','Hotel','Airport and Train Stuff','Trip Planning'
  ],
  'lost-item-problem-instructions': [
    'People','Phone Data','Airport and Train Stuff','Hotel','Trip Planning'
  ]
};

function sourceByTitle(title){
  return sourceInventory.find(doc => doc.title === title) || null;
}

function uniqueSourceRecords(records){
  const seen = new Set();
  return records.filter(doc => {
    if(!doc) return false;
    const key = doc.file || doc.title;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function linkedSourceRecords(sectionId){
  return uniqueSourceRecords(
    (SOURCE_SECTION_RELATIONSHIPS[sectionId] || []).map(sourceByTitle)
  );
}

function sourceAvailability(doc){
  // A matching Structured Document may carry an embedded/referenced source at runtime.
  try{
    const rows = JSON.parse(localStorage.getItem('teeStructuredDocumentsPublicV1') || '[]');
    if(Array.isArray(rows)){
      const normalizedTitle = String(doc.title || '').toLowerCase();
      const match = rows.find(row => {
        const title = String(row.title || '').toLowerCase();
        const ref = String(row.originalReference || '').toLowerCase();
        const file = String(doc.file || '').split('/').pop().toLowerCase();
        return title === normalizedTitle ||
               ref.includes(file) ||
               normalizedTitle.includes(title) ||
               title.includes(normalizedTitle);
      });
      if(match) return {kind:'structured', documentId:match.documentId};
    }
  }catch{}
  return {kind:'inventory'};
}

function openSourceManagerFor(doc){
  const section = document.getElementById('teeSourceDocumentManager');
  const master = section?.querySelector(':scope > .source-app-section-master');
  if(master && master.getAttribute('aria-expanded') !== 'true') master.click();

  // Request the Source Document Manager to show/highlight this inventory source.
  window.dispatchEvent(new CustomEvent('tee-source-manager-focus', {
    detail:{ title:doc.title, file:doc.file }
  }));

  requestAnimationFrame(() => {
    section?.scrollIntoView({behavior:'smooth', block:'start'});
  });
}

async function openLinkedSourceInventory(doc){
  const available = sourceAvailability(doc);

  if(available.kind === 'structured' && window.TEEStructuredDocumentsAPI?.focusDocument){
    try{
      await window.TEEStructuredDocumentsAPI.focusDocument(available.documentId, true);
      return;
    }catch{
      // If protected/locked, fall through to Source Manager where status is explicit.
    }
  }

  openSourceManagerFor(doc);
}

function linkedSourceButtons(sectionId){
  const records = linkedSourceRecords(sectionId);
  if(!records.length){
    return '<span class="muted">No source documents assigned to this section.</span>';
  }

  return records.map(doc => `
    <button type="button"
            class="mini-link linked-source-document"
            data-source-file="${doc.file}"
            title="Go to this source document in Source Document Manager.">
      ${doc.title}
    </button>`).join('');
}


function renderQuickGrid() {
  const quickItems = [
    ['Flight / Airline', 'PNR, ticket, baggage, support'],
    ['Train / Rail', 'Rail pass, reservations, station help'],
    ['Hotels', 'Booking refs, check-in notes'],
    ['Insurance', 'Policy, claim pathway, support'],
    ['Phone / Data', 'Connectivity and support notes'],
    ['Emergency', 'Contacts and problem pathway'],
    ['Identity', 'Passport / Global Entry reminders'],
    ['Money', 'Payment and cost references']
  ];
  quickGrid.innerHTML = quickItems.map(([title, desc]) => `
    <button class="quick-tile" type="button" data-target="${safeId(title)}">
      <strong>${title}</strong>
      <span>${desc}</span>
    </button>
  `).join('');

  quickGrid.querySelectorAll('.quick-tile').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.querySelector('strong').textContent.toLowerCase();
      const hit = privateSections.find(s => s.title.toLowerCase().includes(label.split(' / ')[0].toLowerCase()) || searchBlobForSection(s).includes(label));
      if (hit) openSection(hit.id);
    });
  });
}

function initSectionIndexDropdown() {
  const toggle = document.getElementById('sectionIndexToggle');
  const content = document.getElementById('sectionIndexContent');
  if (!toggle || !content || toggle.dataset.bound === '1') return;

  toggle.dataset.bound = '1';

  const state = toggle.querySelector('.source-section-button-state');
  const setOpen = (open) => {
    content.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (state) state.textContent = open ? 'Collapse' : 'Expand';
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  setOpen(false);
}

function renderSectionIndex() {
  initSectionIndexDropdown();
}

function sectionCard(section) {
  const details = document.createElement('details');
  details.className = 'private-section';
  details.id = section.id;

  const summary = document.createElement('summary');
  summary.innerHTML = `<span class="section-button-copy"><strong>${section.title}</strong><small>${section.use}</small></span><span class="private-section-state">Expand</span>`;

  const body = document.createElement('div');
  body.className = 'section-body';
  body.innerHTML = `
    <p class="use-case"><strong>Use:</strong> ${section.use}</p>
    <div class="two-col">
      <div>
        <h4>Information to keep here</h4>
        <ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div>
        <h4>Action notes</h4>
        <ul>${section.actions.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="linked-docs">
      <h4>Linked source documents</h4>
      <div class="mini-links">${linkedSourceButtons(section.id)}</div>
    </div>
  `;

  body.querySelectorAll('[data-source-file]').forEach(btn => {
    btn.addEventListener('click', () => {
      const doc = sourceInventory.find(x => x.file === btn.dataset.sourceFile);
      if(doc) openLinkedSourceInventory(doc);
    });
  });

  details.append(summary, body);
  details.addEventListener('toggle', () => {
    const state = summary.querySelector('.private-section-state');
    if (state) state.textContent = details.open ? 'Collapse' : 'Expand';
  });
  return details;
}

function docCard(doc){
  const state=sourceDocState(doc), removed=state.status==='remove', privateOwner=state.status==='private'?sourceOwnerLabel(state.owner):'', canOpen=sourceDocCanOpen(doc,state);
  const article=document.createElement('article'); article.className=`doc-card source-${state.status}`;
  article.dataset.sourceFile=doc.file;
  article.dataset.sourceTitle=doc.title;
  const statusButtons=['private','shared','public','reference','archive','remove'].map(status=>`<button type="button" class="source-status-btn ${state.status===status?'active':''} ${status==='remove'?'danger':''}" data-source-status="${status}">${SOURCE_STATUS_LABELS[status]}</button>`).join('');
  let accessMessage='';
  if(removed) accessMessage='<strong class="purge-note">PURGE REQUESTED · source links disabled until next package rebuild</strong>';
  else if(doc.sourceInventoryOnly) accessMessage='<strong class="source-private-note">SOURCE INVENTORY ONLY · original file is not packaged in this GitHub-safe app. If a structured copy is retained locally, use Structured Documents → View Source.</strong>';
  else if(doc.packaged===false) accessMessage='<strong class="source-private-note">RAW PRIVATE SOURCE REMOVED · use the encrypted vault records instead</strong>';
  else if(state.status==='private'&&state.owner==='split') accessMessage='<strong class="source-private-note">PRIVATE SOURCE CONTAINS BOTH COUPLES · split required before either couple may open it</strong>';
  else if(state.status==='private'&&!canOpen) accessMessage=`<strong class="source-private-note">PRIVATE · available only when ${privateOwner} unlocks the vault</strong>`;
  else if(canOpen) accessMessage=`<a href="${doc.file}" target="_blank" rel="noopener">Open</a><a href="${doc.file}" download>Download</a>`;
  article.innerHTML=`
    <div class="source-doc-title-row"><h3>${doc.title}</h3><span class="source-status-badge ${state.status}">${SOURCE_STATUS_LABELS[state.status]}${privateOwner?` · ${privateOwner}`:''}</span></div>
    <div class="meta"><span class="chip">${state.reviewed?'✓ Reviewed':'⚠ Needs Review'}</span><span class="chip">${doc.priority}</span><span class="chip">${doc.type}</span></div>
    <p>${doc.notes}</p>
    ${state.status==='private'&&doc.packaged!==false?'<p class="source-security-warning">Private owner controls in-app access. For full cryptographic isolation, extract the needed records and omit the raw source from the next rebuilt package.</p>':''}
    <div class="meta">${(doc.tags||[]).map(t=>`<span class="chip">#${t}</span>`).join('')}</div>
    <div class="source-status-actions" aria-label="Classify ${doc.title}">${statusButtons}</div>
    <div class="open-row">${accessMessage}<button type="button" class="source-review-btn">${state.reviewed?'Mark Needs Review':'Mark Reviewed'}</button></div>`;
  article.querySelectorAll('[data-source-status]').forEach(btn=>btn.addEventListener('click',()=>setSourceDocStatus(doc,btn.dataset.sourceStatus)));
  article.querySelector('.source-review-btn').addEventListener('click',()=>toggleSourceReviewed(doc)); return article;
}

function renderSections() {
  const filtered = privateSections.filter(sectionMatches);
  sectionMount.innerHTML = '';
  renderSectionIndex(filtered);
  filtered.forEach(section => sectionMount.appendChild(sectionCard(section)));
  if (!filtered.length) sectionMount.innerHTML = '<p class="warning">No private sections match the current search.</p>';
}

function renderDocuments() {
  const filtered = sourceInventory.filter(docMatches);
  const groups = {};
  filtered.forEach(doc => (groups[doc.category] ||= []).push(doc));
  docMount.innerHTML = '';
  Object.entries(groups).forEach(([category, docs]) => {
    const details = document.createElement('details');
    details.className = 'category';
    details.open = false;
    const summary = document.createElement('summary');
    summary.innerHTML = `<span>${category}</span><span>${docs.length} file${docs.length === 1 ? '' : 's'}</span>`;
    const body = document.createElement('div');
    body.className = 'category-body';
    docs.forEach(d => body.appendChild(docCard(d)));
    details.append(summary, body);
    docMount.appendChild(details);
  });
  if (!filtered.length) docMount.innerHTML = '<p class="warning">No documents match the current filters.</p>';
}

function openSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const indexToggle = document.getElementById('sectionIndexToggle');
  const indexContent = document.getElementById('sectionIndexContent');
  if (indexToggle && indexContent && indexContent.hidden) {
    indexContent.hidden = false;
    indexToggle.setAttribute('aria-expanded', 'true');
    const state = indexToggle.querySelector('.source-section-button-state');
    if (state) state.textContent = 'Collapse';
  }

  const control = target.querySelector(':scope > summary') || target;
  control.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (control.classList) {
    control.classList.add('section-index-flash');
    setTimeout(() => control.classList.remove('section-index-flash'), 1400);
  }
}


window.addEventListener('storage', e => {
  if(e.key === STRUCTURED_DOC_STORAGE_KEY || e.key === SOURCE_SECTION_LINK_KEY){
    render();
  }
});

window.addEventListener('tee-structured-documents-changed', () => {
  render();
});


window.addEventListener('tee-source-manager-focus', event => {
  const file = event.detail?.file || '';
  const title = event.detail?.title || '';
  renderDocuments();

  const inventoryToggle = document.getElementById('sourceInventoryToggle');
  if(inventoryToggle && inventoryToggle.getAttribute('aria-expanded') !== 'true'){
    inventoryToggle.click();
  }

  const cards = [...document.querySelectorAll('.doc-card[data-source-file]')];
  const card = cards.find(c => c.dataset.sourceFile === file || c.dataset.sourceTitle === title);
  if(card){
    const category = card.closest('details.category');
    if(category) category.open = true;
    card.classList.add('source-manager-focus');
    card.scrollIntoView({behavior:'smooth', block:'center'});
    setTimeout(() => card.classList.remove('source-manager-focus'), 1800);
  }
});

function render() {
  renderSections();
  renderDocuments();
}

[searchInput, categoryFilter].forEach(el => el.addEventListener('input', render));
renderQuickGrid();
render();
initSectionIndexDropdown();




function initSourceInventoryToggle(){
  const toggle = document.getElementById('sourceInventoryToggle');
  const content = document.getElementById('sourceInventoryContent');
  if(!toggle || !content || toggle.dataset.bound === '1') return;

  toggle.dataset.bound = '1';
  const state = toggle.querySelector('.source-section-button-state');

  const setOpen = (open) => {
    content.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(state) state.textContent = open ? 'Collapse' : 'Expand';
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  setOpen(false);
}

function initSourceAppSectionToggles(){
  const configs = [
    {selector:'#smartDocumentIntake', id:'smartDocumentIntake', label:'Smart Document Intake', purpose:'Add a source document and prepare its structured information for review.'},
    {selector:'#structuredDocumentsWorkspace', id:'structuredDocumentsWorkspace', label:'Structured Documents', purpose:'Review, edit, verify, file, or archive information extracted from source documents.'},
    {selector:'#secureVaultPanel', id:'secureVaultPanel', label:'Secure Travel Vault', purpose:'Unlock and manage encrypted Shared and Private travel records.'},
    {selector:'#secureVaultManager', id:'secureVaultManager', label:'Vault Manager', purpose:'Set up, unlock, restore, or diagnose the two-couple vault.'},
    {selector:'.secure-backup-tools', id:'secureBackupTools', label:'Encrypted Backup', purpose:'Export, verify, inspect, or restore an encrypted vault backup.'},
    {selector:'#secureAccessArchitecture', id:'secureAccessArchitecture', label:'Access Architecture', purpose:'Review how Public, Shared, and couple-private access is separated.'},
    {selector:'#secureVaultHealth', id:'secureVaultHealth', label:'Vault Health', purpose:'Check the integrity and readiness of the encrypted vault.'},
    {selector:'#secureVaultStatistics', id:'secureVaultStatistics', label:'Vault Statistics', purpose:'See high-level counts and vault usage information.'},
    {selector:'#secureActivityCenter', id:'secureActivityCenter', label:'Activity Center', purpose:'Review recent vault activity and record changes.'},
    {selector:'#secureRecycleBin', id:'secureRecycleBin', label:'Recycle Bin', purpose:'Review or recover items removed from active use.'},
    {selector:'#secureFavorites', id:'secureFavorites', label:'Favorites', purpose:'Reach records you have marked for quick access.'},
    {selector:'#secureTagExplorer', id:'secureTagExplorer', label:'Smart Tag Explorer', purpose:'Find related encrypted records by tag.'},
    {selector:'#secureExpirationDashboard', id:'secureExpirationDashboard', label:'Upcoming Expirations', purpose:'See time-sensitive document or credential expirations.'},
    {selector:'#secureVaultDashboard', id:'secureVaultDashboard', label:'Vault Dashboard', purpose:'See the overall secure-record dashboard and categories.'},
    {selector:'.quick-panel', id:'quickPanel', label:'On-the-fly Quick Reference', purpose:'Jump quickly to common travel information categories.'},
    {selector:'.tools', id:'searchTools', label:'Search & Filter', purpose:'Search source documents and information sections or narrow by category.'},
    {selector:'#teeSourceDocumentManager', id:'teeSourceDocumentManager', label:'Source Document Manager', purpose:'Manage original documents, processing status, structured links, and archive history.'}
  ];

  configs.forEach(({selector,id,label,purpose}) => {
    const section = document.querySelector(selector);
    if(!section || section.dataset.sourceCollapsibleReady === '1') return;

    if (!section.id) section.id = id;

    // Remove prior/legacy controls so this large button is the only section control.
    section.querySelectorAll(':scope > .source-app-section-toggle, :scope > .structured-documents-toggle-row').forEach(el => el.remove());
    section.querySelectorAll('.collapse-destination-btn, .structured-documents-collapse, #structuredDocumentsCollapse').forEach(el => el.remove());

    const content = document.createElement('div');
    content.className = 'source-app-section-content';
    while(section.firstChild){
      content.appendChild(section.firstChild);
    }

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'source-app-section-toggle source-app-section-master';
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls', `${section.id}-content`);
    content.id = `${section.id}-content`;

    const renderButton = (open) => {
      toggle.innerHTML = `
        <span class="source-section-button-text">
          <strong>${label}</strong>
          <small>${purpose}</small>
        </span>
        <span class="source-section-button-state">${open ? 'Collapse' : 'Expand'}</span>`;
    };

    const setOpen = (open) => {
      content.hidden = !open;
      section.classList.toggle('source-app-section-collapsed', !open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      renderButton(open);
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

    section.appendChild(toggle);
    section.appendChild(content);
    section.dataset.sourceCollapsibleReady = '1';
    setOpen(false);
  });

  // Protected information cards use their summary as the one and only expand/collapse control.
  document.querySelectorAll('#sectionMount details.private-section').forEach(d => { d.open = false; });

  renderSectionIndex();
}

initSourceAppSectionToggles();
initSourceInventoryToggle();
