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
  // TEE v3.3.38: the GitHub-safe application no longer embeds the live trip source-document inventory.
  // Source documents are retained off-repository and reconstructed through the Structured Documents workspace.
];

const SOURCE_DOC_STATE_KEY = 'teeSourceDocumentManagerV1';
const SOURCE_STATUS_LABELS = {
  private: 'Private', shared: 'Shared', public: 'Public', reference: 'Reference', archive: 'Archive', remove: 'Remove from TEE'
};
function sourceDocKey(doc){ return doc.file; }
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
const expandAll = document.getElementById('expandAll');
const collapseAll = document.getElementById('collapseAll');

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
optionize(categoryFilter, unique(documents.map(d => d.category)));

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

function linkedDocButtons(names) {
  const links = (names || [])
    .map(name => documents.find(d => d.title === name))
    .filter(Boolean)
    .map(doc => `<a class="mini-link" href="${doc.file}" target="_blank" rel="noopener">${doc.title}</a>`)
    .join('');
  return links || '<span class="muted">No source document linked yet.</span>';
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

function renderSectionIndex(sections) {
  sectionIndex.innerHTML = sections.map(s => `<button type="button" data-section="${s.id}">${s.title}</button>`).join('');
  sectionIndex.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => openSection(btn.dataset.section)));
}

function sectionCard(section) {
  const details = document.createElement('details');
  details.className = 'private-section';
  details.id = section.id;
  if (section.id === 'quick-reference') details.open = true;

  const summary = document.createElement('summary');
  summary.innerHTML = `<span>${section.title}</span><span class="summary-meta">${section.priority}</span>`;

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
      <div class="mini-links">${linkedDocButtons(section.linkedDocs)}</div>
    </div>
  `;
  details.append(summary, body);
  return details;
}

function docCard(doc){
  const state=sourceDocState(doc), removed=state.status==='remove', privateOwner=state.status==='private'?sourceOwnerLabel(state.owner):'', canOpen=sourceDocCanOpen(doc,state);
  const article=document.createElement('article'); article.className=`doc-card source-${state.status}`;
  const statusButtons=['private','shared','public','reference','archive','remove'].map(status=>`<button type="button" class="source-status-btn ${state.status===status?'active':''} ${status==='remove'?'danger':''}" data-source-status="${status}">${SOURCE_STATUS_LABELS[status]}</button>`).join('');
  let accessMessage='';
  if(removed) accessMessage='<strong class="purge-note">PURGE REQUESTED · source links disabled until next package rebuild</strong>';
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
  const filtered = documents.filter(docMatches);
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
  const details = document.getElementById(id);
  if (!details) return;
  details.open = true;
  details.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function render() {
  renderSections();
  renderDocuments();
}

[searchInput, categoryFilter].forEach(el => el.addEventListener('input', render));
expandAll.addEventListener('click', () => document.querySelectorAll('details').forEach(d => d.open = true));
collapseAll.addEventListener('click', () => document.querySelectorAll('details').forEach(d => d.open = false));
renderQuickGrid();
render();


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
