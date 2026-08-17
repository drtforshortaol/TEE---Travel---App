(() => {
  const TOPICS = {
    hub: {
      title:'TEE Help Center', subtitle:'Fast help for travelers using the trip hub.',
      quick:`<p><strong>Start here when you are not sure where something lives.</strong></p><div class="tee-user-help-actions"><a href="apps/travel-daily-operations/index.html"><strong>Today</strong><span>What matters now and tomorrow.</span></a><a href="apps/travel-hotels/index.html"><strong>Hotel</strong><span>Current/next lodging details.</span></a><a href="apps/travel-transportation/index.html"><strong>Transportation</strong><span>Flights, rail, transfers, movement.</span></a><a href="apps/travel-weather-clothing/index.html"><strong>Weather</strong><span>Conditions and clothing guidance.</span></a><div class="tee-user-help-static"><strong>Secure Vault</strong><span>Use the single Secure Vault button at the top of the Hub.</span></div><a href="apps/travel-essentials/index.html"><strong>Quick Reference</strong><span>Critical readiness and emergency access.</span></a></div>`,
      details:`<p>The Hub is the front door to TEE. Use the category cards to open the app that matches what you are trying to do. Search is useful when you know a word but not which app contains it.</p><p><strong>Normal travel pattern:</strong> check Daily Operations first, then follow its links to Hotel, Transportation, Weather, Packing, Money, or Local Knowledge.</p>`,
      security:`<p><strong>Public</strong> is open to everyone. <strong>Shared</strong> is protected and available to both traveling couples only. <strong>Private</strong> is available only to the owning couple.</p><p>TEE may ask for a passphrase when you open protected details. This is expected.</p>`,
      next:'For normal day-to-day use, open Daily Operations.'
    },
    essentials:{title:'Quick Reference',subtitle:'Critical travel readiness and fast fallback information.',quick:`<ol><li>Use this as your do-not-miss checklist.</li><li>Before leaving a hotel, confirm passport/ID, phone, medications, money/cards, and required tickets.</li><li>Use the Secure Vault when you need protected identity, confirmation, or contact details.</li><li>Use linked Hotel and Transportation apps for the current movement.</li></ol>`,details:`<p>Essentials is a reminder layer, not the storage location for every sensitive value. It helps you know what you need and where to find it quickly.</p>`,security:`<p>Do not leave passport numbers, private contacts, payment details, or confirmation credentials openly visible. Those belong in protected TEE records.</p>`,next:'If you are traveling today, confirm the items you physically need before leaving.'},
    'daily-operations':{title:'Daily Operations',subtitle:'Your main travel-day command center.',quick:`<ol><li>Open <strong>Today</strong> each morning.</li><li>Review movement/timing, hotel base, tickets, weather, and carry items.</li><li>Use the checklist as you prepare to leave.</li><li>Before bed, switch to <strong>Tomorrow</strong> and prepare the next move.</li><li>Add short notes when plans change.</li></ol>`,details:`<p>Yesterday is for close-out and lessons; Today is for execution; Tomorrow is for preparation. The preview selector lets you look ahead without changing the trip itself.</p>`,security:`<p>Daily notes may contain protected information. Avoid copying booking credentials into open notes when a protected record already exists.</p>`,next:'If it is a travel day, check movement/timing and the Today checklist first.'},
    hotels:{title:'Hotels',subtitle:'Find the current or next lodging and what you need for check-in.',quick:`<ol><li>Find the city/current stay.</li><li>Confirm dates and check-in/check-out timing.</li><li>Use the address/directions for arrival.</li><li>Unlock protected details only when you need confirmations or private notes.</li><li>Before departure, check the next hotel and transportation move.</li></ol>`,details:`<p>Use filters when the list is long. Hotel cards should give you operational information first; protected booking details are revealed only when authorized.</p>`,security:`<p>Confirmation numbers, payment details, and traveler-specific information are protected even when the hotel name/address is not.</p>`,next:'If you are arriving today, verify the hotel address and check-in details.'},
    transportation:{title:'Transportation',subtitle:'Flights, trains, transfers, tickets, and movement between places.',quick:`<ol><li>Find today’s flight/train/transfer.</li><li>Confirm departure place and time.</li><li>Check how early you should leave.</li><li>Open protected ticket/booking details only when needed.</li><li>Check the arrival transfer and destination hotel.</li></ol>`,details:`<p>Transportation is the operational record for moving between destinations. Use Daily Operations for the day view and Transportation for the detailed segment.</p>`,security:`<p>PNRs, ticket numbers, passenger-specific seats, and booking-management credentials are protected.</p>`,next:'For today’s move, confirm departure time, station/airport, and required ticket.'},
    'weather-clothing':{title:'Weather + Clothing',subtitle:'Use forecast information to decide what to wear and carry.',quick:`<ol><li>Choose the current or next destination.</li><li>Review temperature, rain, wind, and conditions.</li><li>Follow the clothing/layer recommendation.</li><li>Check Packing/Daily Carry for gear such as rain layer, warm layer, or footwear.</li></ol>`,details:`<p>Weather is most useful the night before and again in the morning. Cached information may be used offline during the day.</p>`,security:`<p>Weather itself is normally non-sensitive, but your exact itinerary context can be protected trip information.</p>`,next:'Check tomorrow’s conditions before packing the day bag tonight.'},
    packing:{title:'Packing & Daily Carry',subtitle:'Know what belongs in luggage, carry-on, and today’s day bag.',quick:`<ol><li>Use the master list for overall trip packing.</li><li>Use Today Carry for items needed during the current day.</li><li>Use Tomorrow Pack/Prep before bed.</li><li>Pay attention to weather-triggered gear reminders.</li><li>Mark items as complete as you pack.</li></ol>`,details:`<p>Packing should reduce forgetting without duplicating the master list. Daily Carry is the small operational subset for what you need right now.</p>`,security:`<p>Medication or identity-related packing notes can be sensitive; use protected records for detailed personal information.</p>`,next:'If leaving soon, check Today Carry; if preparing tonight, check Tomorrow Pack/Prep.'},
    'money-tipping':{title:'Money + Tipping',subtitle:'Practical payment, cash, currency, and tipping guidance.',quick:`<ol><li>Select today’s country/city.</li><li>Review currency and common payment practices.</li><li>Check tipping guidance before restaurants, guides, taxis, or hotels.</li><li>Use Local Knowledge for etiquette/context.</li></ol>`,details:`<p>This section is practical guidance, not your private payment-account record. Keep card/account credentials in protected storage.</p>`,security:`<p>General tipping guidance can be public; your actual card numbers, payment credentials, and personal spending records are protected.</p>`,next:'Before paying, check the destination’s tipping and cash/card guidance.'},
    'local-knowledge':{title:'Local Knowledge',subtitle:'Street-level guidance for etiquette, dining, transit, safety, and practical behavior.',quick:`<ol><li>Use today’s destination or choose a country/city.</li><li>Search the situation you need: dining, taxi, pharmacy, safety, business hours, etc.</li><li>Follow links to Language or Money + Tipping when useful.</li></ol>`,details:`<p>Local Knowledge is a quick reference. It is designed to reduce friction on the ground rather than replace official emergency, legal, or medical information.</p>`,security:`<p>General local guidance is usually non-sensitive. Private notes about travelers should remain protected.</p>`,next:'Use the search box for the situation you are dealing with right now.'},
    language:{title:'Language',subtitle:'Fast phrases for real travel situations.',quick:`<ol><li>Tap the country/language you need.</li><li>Choose a phrase group or search a word.</li><li>Show or read the phrase when needed.</li><li>Use Local Knowledge for etiquette around the situation.</li></ol>`,details:`<p>Country Quick Buttons narrow the phrase list. Reset returns the full list.</p>`,security:`<p>Language phrases are normally public-safe. Personal notes or traveler details should not be added to open phrase fields.</p>`,next:'Choose the country, then search the phrase you need.'},
    insurance:{title:'Insurance',subtitle:'What to do during medical, delay, cancellation, baggage, or claim situations.',quick:`<ol><li>Handle immediate health/safety needs first.</li><li>Use the appropriate protocol for medical, delay/cancellation, or baggage problems.</li><li>Save receipts, reports, photos, names, and case numbers.</li><li>Open protected policy/assistance information when needed.</li></ol>`,details:`<p>This app gives workflow reminders. Exact policy numbers and protected assistance details should be kept in the Secure Vault.</p>`,security:`<p>Insurance policy numbers, medical notes, personal identifiers, and claim details are protected.</p>`,next:'If there is an active problem, use the matching protocol and document everything.'},
    costs:{title:'Costs',subtitle:'Capture, manage, share, report, and archive trip expenses from your iPhone.',quick:`<ol><li>Tap <strong>Open Capture</strong> to add an expense by photo, PDF, Apple Notes paste, or typing.</li><li>Choose Public, Shared, or Private and save.</li><li>Use <strong>Edit</strong>, <strong>Delete</strong>, and the Test filter to manage entries.</li><li>Use <strong>Shared Expense Exchange</strong> to combine Shared expenses between the two phones.</li><li>At the end of the trip, open <strong>Expense Reports &amp; Trip Archive</strong> to export a ledger, PDF/print report, receipt report, or encrypted archive.</li></ol>`,details:`<p><strong>Phone-to-phone:</strong> Shared expenses are exported as an encrypted package and merged on the receiving phone by record ID/version, so unchanged records are not duplicated.</p><p><strong>Reporting:</strong> reports use only the expenses currently visible to the authorized user. Import the latest Shared package before making a final combined Shared report.</p>`,security:`<p>Public expenses are visible without a passphrase on this device. Shared expenses are encrypted and available to both couples. Private expenses are encrypted and available only to the owning couple. A downloaded CSV, PDF, HTML receipt report, or other export should be stored according to the most sensitive record it contains.</p><p>The <code>.tee49</code> archive is encrypted with the currently authorized couple's existing TEE passphrase and can include stored receipt attachments. There is no separate archive password.</p>`,next:'During the trip, capture expenses as they happen. For end-of-trip retrieval, open Expense Reports & Trip Archive.'},
    'expense-reports':{title:'Expense Reports & Trip Archive',subtitle:'Retrieve, summarize, and preserve the expense records you are authorized to see.',quick:`<ol><li>Before the final report, import the latest Shared Expense package from the other phone.</li><li>Unlock Protected Expenses if you want Shared and this couple's Private records included.</li><li>Choose date/access filters and tap <strong>Refresh Report</strong>.</li><li>Use <strong>Export CSV Ledger</strong> for spreadsheet analysis.</li><li>Use <strong>Print / Save PDF</strong> for a readable permanent report.</li><li>Use <strong>Download Receipt Report</strong> when you want the visible receipt images/files included.</li><li>For long-term protected preservation, confirm the currently authorized couple's TEE passphrase and download the encrypted <code>.tee49</code> archive.</li></ol>`,details:`<p><strong>What is combined:</strong> Public records are always available. Shared records are included after the Shared vault is unlocked and should first be synchronized between the two phones. Private records are included only for the currently authorized owning couple.</p><p><strong>CSV:</strong> useful for Excel or other spreadsheet analysis; it does not embed receipt bytes.</p><p><strong>Print / Save PDF:</strong> opens a clean report that can be printed or saved as PDF through the iPhone share/print workflow.</p><p><strong>Receipt Report:</strong> downloads a self-contained HTML report that includes stored receipt images and links to stored PDF receipts.</p><p><strong>Encrypted .tee49:</strong> preserves the authorized expense records, attachments, and Shared deletion markers in an encrypted archive. It uses the currently authorized couple's existing TEE passphrase.</p>`,security:`<p>Exports are created locally on the device; TEE does not upload them to GitHub.</p><p>A CSV, PDF, or receipt report may contain Shared or Private information and is not automatically encrypted. Store those exports accordingly.</p><p>The <code>.tee49</code> archive is encrypted with the currently authorized couple's existing TEE passphrase. No additional archive password is created.</p><p>One couple's passphrase never exposes the other couple's Private expenses. Each couple should create its own Private-inclusive final archive if both want their personal expense histories preserved.</p>`,next:'For a final trip report: sync Shared expenses first, unlock your couple, refresh the report, then export CSV/PDF and create the encrypted .tee49 archive.'},
    'expense-exchange':{title:'Shared Expense Exchange',subtitle:'Safely move Shared expenses between the two couples’ iPhones.',quick:`<ol><li><strong>Sender:</strong> unlock protected expenses and tap <strong>Export Encrypted Shared Package</strong>.</li><li>TEE downloads a <code>.tee46</code> package and shows a transfer code.</li><li>Send the <code>.tee46</code> file directly to the other iPhone by AirDrop, Messages, Files, or another direct file-sharing method.</li><li>Send the transfer code separately when practical.</li><li><strong>Receiver:</strong> choose the received <code>.tee46</code> file, enter the transfer code, and tap <strong>Import &amp; Merge Shared Expenses</strong>.</li><li>Use <strong>Check for Update</strong> when you only want to know whether a newer Shared-expense package is available.</li></ol>`,details:`<p><strong>What gets exchanged:</strong> only expenses classified Shared. Private expenses stay with the owning couple. Test expenses are excluded unless the sender chooses to include them.</p><p><strong>How merging works:</strong> TEE compares record IDs and versions so unchanged records are not duplicated. Newer records can update older copies. Deletions made in v3.3.46 or later are carried as deletion markers so a deleted Shared expense can also disappear on the other phone after the next exchange.</p><p><strong>GitHub update beacon:</strong> after an export, TEE can download <code>shared-expense-beacon.json</code>. That tiny file may be placed on GitHub Pages so the other phone can check whether a newer package exists. The beacon is only a notification; it does not contain the expenses and it does not transfer the package.</p><p><strong>Typical pattern:</strong> Couple A enters Shared expenses → exports a package → sends it to Couple B → Couple B imports/merges. Later Couple B can do the same in the opposite direction.</p>`,security:`<p><strong>Shared means both traveling couples only.</strong> It is protected and is not public.</p><p>The <code>.tee46</code> package is encrypted. The transfer code is required to open it and is not stored inside the package. Keep the code private.</p><p><strong>GitHub receives no expense contents.</strong> The optional beacon contains only non-sensitive update metadata. No receipts, amounts, merchants, notes, passphrases, or transfer code are placed in the beacon.</p><p>Private expenses are never included in Shared Expense Exchange. If an expense should belong only to one couple, classify it Private instead of Shared before exporting.</p>`,next:'Sending? Export the encrypted Shared package. Receiving? Choose the .tee46 file and import it. Only checking for something new? Use Check for Update.'},
    itinerary:{title:'Master Itinerary',subtitle:'The overall sequence of the trip.',quick:`<ol><li>Use this for the big-picture route and dates.</li><li>Open the relevant Hotel or Transportation record for details.</li><li>Use Daily Operations for what matters today.</li></ol>`,details:`<p>The itinerary is the backbone connecting destinations, lodging, and transportation segments.</p>`,security:`<p>Exact live trip dates and movements can be protected information even when destination names are harmless.</p>`,next:'For immediate needs, switch from the itinerary to Daily Operations.'},
    'maps-movement':{title:'Maps & Routes',subtitle:'Navigation and movement reference between travel points.',quick:`<ol><li>Choose the destination or movement you need.</li><li>Confirm the start and end points.</li><li>Use the saved map/movement notes as an offline fallback.</li><li>Cross-check Transportation for timing.</li></ol>`,details:`<p>Maps & Routes supports route understanding and offline fallback. Live navigation may still depend on your phone’s mapping app and connectivity.</p>`,security:`<p>General maps may be public-safe; a map tied to private lodging or traveler-specific movement may be protected.</p>`,next:'Confirm where you are starting and where you need to end up.'},
    photos:{title:'Photos',subtitle:'Trip photo reminders and memory capture.',quick:`<ol><li>Use this area for photo reminders or trip-photo organization.</li><li>Add notes while the memory is fresh.</li><li>Move lasting notes/lessons into the Trip Archive later.</li></ol>`,details:`<p>Photos can be part of the trip record and later archive. Not every image needs to be protected.</p>`,security:`<p>Images containing passports, tickets, QR codes, private people information, or booking credentials must be protected.</p>`,next:'Capture the photo or note now; organize it later.'},
    archive:{title:'Trip Archive',subtitle:'Keep completed trip records, lessons, favorites, and memories.',quick:`<ol><li>Use this mainly during or after the trip.</li><li>Save useful lessons, favorite places, reviews, and completed notes.</li><li>Keep protected records protected even after they are archived.</li></ol>`,details:`<p>The archive preserves what is worth keeping after active travel operations are finished.</p>`,security:`<p>Archive status does not make protected information public. Public/Shared/Private rules still apply.</p>`,next:'During the trip, capture useful lessons; do the full cleanup after travel.'}
  };

  const slug = (()=>{
    const p=location.pathname;
    if(/travel-essentials/.test(p))return'essentials'; if(/travel-daily-operations/.test(p))return'daily-operations'; if(/travel-hotels/.test(p))return'hotels'; if(/travel-transportation/.test(p))return'transportation'; if(/travel-weather-clothing/.test(p))return'weather-clothing'; if(/travel-packing/.test(p))return'packing'; if(/travel-money-tipping/.test(p))return'money-tipping'; if(/travel-local-knowledge/.test(p))return'local-knowledge'; if(/travel-language/.test(p))return'language'; if(/travel-insurance/.test(p))return'insurance'; if(/travel-costs/.test(p))return'costs'; if(/travel-itinerary/.test(p))return'itinerary'; if(/travel-maps-movement/.test(p))return'maps-movement'; if(/travel-photos/.test(p))return'photos'; if(/travel-archive/.test(p))return'archive'; return'hub';
  })();
  if(/travel-private-documents/.test(location.pathname)) return; // this app has richer v3.3.42 contextual help already
  let currentTopic = slug;
  let h = TOPICS[currentTopic] || TOPICS.hub;
  const dialog=document.createElement('dialog'); dialog.className='tee-user-help-dialog';
  dialog.innerHTML=`<div class="tee-user-help-head"><div><p class="tee-user-help-kicker">TEE v3.3.71 · Traveler Help</p><h2></h2><p class="tee-user-help-subtitle"></p></div><button class="tee-user-help-close" type="button">Close</button></div><div class="tee-user-help-tabs"><button class="tee-user-help-tab active" data-tab="quick">Quick Start</button><button class="tee-user-help-tab" data-tab="details">More Details</button><button class="tee-user-help-tab" data-tab="security">Security / Access</button></div><div class="tee-user-help-body"></div><div class="tee-user-help-next"><strong>What do I do next?</strong> <span></span></div>`;
  document.body.appendChild(dialog);
  let tab='quick'; const body=dialog.querySelector('.tee-user-help-body');
  const render=()=>{
    h=TOPICS[currentTopic]||TOPICS[slug]||TOPICS.hub;
    dialog.querySelector('h2').textContent=h.title;
    dialog.querySelector('.tee-user-help-subtitle').textContent=h.subtitle;
    body.innerHTML=h[tab];
    dialog.querySelector('.tee-user-help-next span').innerHTML=h.next;
    dialog.querySelectorAll('.tee-user-help-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  }; render();
  dialog.addEventListener('click',e=>{const t=e.target.closest('[data-tab]'); if(t){tab=t.dataset.tab;render();} if(e.target===dialog)dialog.close();}); dialog.querySelector('.tee-user-help-close').onclick=()=>dialog.close();
  const open=(topic=slug)=>{currentTopic=TOPICS[topic]?topic:slug;tab='quick';render();typeof dialog.showModal==='function'?dialog.showModal():dialog.setAttribute('open','');};
  document.addEventListener('click',e=>{const b=e.target.closest('[data-tee-help-section]');if(!b)return;e.preventDefault();open(b.dataset.teeHelpSection||slug);});
  if(slug==='hub'){
    const b=document.createElement('button'); b.className='tee-help-center-launch';b.type='button';b.textContent='? TEE Help';b.onclick=()=>open('hub');document.body.appendChild(b);
  } else {
    const hero=document.querySelector('header.hero')||document.querySelector('header')||document.body;
    const b=document.createElement('button');b.className='tee-user-help-launch';b.type='button';b.textContent='? How to use this';b.onclick=()=>open(slug);hero.appendChild(b);
  }
})();


// TEE v3.3.70 — shared traveler section controls.
// Major guidance/protocol sections start collapsed and use one header button to open/close.
(function initTravelerMajorSections(){
  function setup(){
    // Nested protocol cards are content, not separate accordions.
    document.querySelectorAll('article.destination-section').forEach(card=>{
      card.classList.remove('destination-section');
      card.querySelectorAll('.collapse-section-row').forEach(row=>row.remove());
    });

    const sections=[...document.querySelectorAll('section.destination-section')];
    const setOpen=(section,open,scroll=false)=>{
      const content=section.querySelector(':scope > .traveler-destination-content');
      const button=section.querySelector(':scope > .destination-toggle');
      if(!content||!button)return;
      section.classList.toggle('open',open);
      content.hidden=!open;
      button.setAttribute('aria-expanded',open?'true':'false');
      const state=button.querySelector('.destination-state');
      if(state)state.textContent=open?'Collapse':'Expand';
      if(open&&scroll)section.scrollIntoView({behavior:'smooth',block:'start'});
    };

    sections.forEach(section=>{
      if(section.dataset.travelerMajorReady==='1')return;
      section.dataset.travelerMajorReady='1';
      const heading=section.querySelector(':scope > h2, :scope > h3');
      const title=(heading?.textContent||section.getAttribute('aria-label')||'Section').trim();
      if(heading)heading.remove();
      section.querySelectorAll(':scope > .collapse-section-row').forEach(row=>row.remove());

      const content=document.createElement('div');
      content.className='destination-content traveler-destination-content';
      while(section.firstChild)content.appendChild(section.firstChild);

      const button=document.createElement('button');
      button.type='button';
      button.className='destination-toggle';
      button.setAttribute('aria-expanded','false');
      button.innerHTML=`<span><span class="destination-title">${title}</span><span class="destination-hint">Open this section when you need it.</span></span><span class="destination-state">Expand</span>`;
      button.addEventListener('click',()=>setOpen(section,button.getAttribute('aria-expanded')!=='true'));
      section.append(button,content);
      setOpen(section,false);
    });

    function revealHashTarget(){
      if(!location.hash)return;
      let target=null;
      try{target=document.querySelector(location.hash);}catch{}
      if(!target)return;
      const section=target.closest('section.destination-section');
      if(section)setOpen(section,true,false);
      requestAnimationFrame(()=>target.scrollIntoView({behavior:'smooth',block:'center'}));
    }
    document.addEventListener('click',event=>{
      const a=event.target.closest('a[href^="#"]');
      if(!a)return;
      const id=a.getAttribute('href');
      if(!id||id==='#')return;
      let target=null;
      try{target=document.querySelector(id);}catch{}
      const section=target?.closest('section.destination-section');
      if(section)setOpen(section,true,false);
    });
    window.addEventListener('hashchange',revealHashTarget);
    revealHashTarget();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true}); else setup();
})();
