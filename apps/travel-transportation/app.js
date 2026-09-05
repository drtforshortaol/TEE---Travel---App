"use strict";
const PUBLIC_CONTEXT=[
  {"title":"Outbound international travel","dates":"Sep 15–16","city":"San Francisco → Istanbul","summary":"Overnight international movement to Istanbul. Exact airline record, PNR, seats, ticket data and detailed timing remain protected in Secure Vault."},
  {"title":"Istanbul arrival transfer","dates":"Sep 16","city":"Istanbul Airport → Istanbul","summary":"Private airport-to-hotel transfer is included in Part 1. Exact pickup instructions and contacts remain protected."},
  {"title":"Istanbul → Cappadocia","dates":"Sep 18","city":"Istanbul → Kayseri / Cappadocia","summary":"Private hotel-to-airport transfer, domestic flight to Kayseri, then private onward transfer with an en-route Underground City visit."},
  {"title":"Cappadocia → Zagreb","dates":"Sep 21","city":"Cappadocia → Kayseri → Istanbul → Zagreb","summary":"Private transfer to Kayseri airport, connecting flights via Istanbul, then private Zagreb airport transfer."},
  {"title":"Zagreb → Plitvice Lakes","dates":"Sep 23","city":"Zagreb → Plitvice Lakes","summary":"Private road transfer to Plitvice Lakes, coordinated with the same-day national park visit."},
  {"title":"Plitvice Lakes → Rovinj","dates":"Sep 24","city":"Plitvice Lakes → Rovinj","summary":"Private road transfer to Rovinj."},
  {"title":"Rovinj → Ljubljana","dates":"Sep 27","city":"Rovinj → Postojna → Ljubljana","summary":"Private cross-border transfer with an en-route Postojna Cave visit."},
  {"title":"Ljubljana → Salzburg","dates":"Sep 30","city":"Ljubljana → Villach → Salzburg","summary":"Part 2 rail extension begins. The Villach-to-Salzburg reserved segment is confirmed for all four travelers. The Ljubljana-to-Villach train details are still pending final confirmation, so do not treat any older proposed timetable as authoritative."},
  {"title":"Salzburg → Zermatt","dates":"Oct 2","city":"Salzburg → Zurich → Visp → Zermatt","summary":"Long first-class rail day. Salzburg-to-Zurich and Zurich-to-Visp reservations are confirmed; the onward Visp-to-Zermatt timetable still needs final documentation. Exact tickets, seats, coach numbers and booking references remain protected."},
  {"title":"Zermatt → Lucerne","dates":"Oct 4","city":"Zermatt → Lucerne","summary":"Rail transfer is planned and remains in the working itinerary. Exact train numbers, stops, connection times and reservation status still need final confirmation."},
  {"title":"Lucerne → Zurich","dates":"Oct 5","city":"Lucerne → Zurich","summary":"Short rail move is planned. Exact train number, stops and departure/arrival times still need final confirmation."},
  {"title":"Zurich → Istanbul Airport","dates":"Oct 6","city":"Zurich → Istanbul","summary":"Travel from the Zurich main-station area to Zurich Airport, then fly to Istanbul for an airside airport-hotel overnight. At Zurich check-in, confirm whether checked baggage can be tagged through to San Francisco and remains checked during the overnight connection."},
  {"title":"Istanbul → San Francisco","dates":"Oct 7","city":"Istanbul → San Francisco","summary":"Return international flight to San Francisco. Current corrected flight information takes precedence over older superseded booking versions; exact flight record and traveler data remain protected."}
];
const mount=document.querySelector('[id$="Mount"], main .hotel-mount, main .transport-mount, main .cost-mount, main .day-mount')||document.querySelector('main');
function renderProtectedContext(){
  const host=document.getElementById('transportMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  PUBLIC_CONTEXT.forEach(c=>{const a=document.createElement('article');a.className='transport-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p><strong>Protected details:</strong> traveler names, exact booking/confirmation data, addresses, contacts, payment notes, tickets, seats, and other Shared/Private fields are stored in Secure Vault and are not embedded in GitHub source.</p><p class="protected-location-note">Protected details are available from the single Secure Vault button at the top of the Hub.</p>`;host.appendChild(a);});
}
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
