"use strict";
const PUBLIC_CONTEXT=[
  {"title":"Outbound international travel","dates":"Sep 15–16","city":"San Francisco → Istanbul","summary":"Overnight international movement to Istanbul. Exact airline record, PNR, seats, ticket data and detailed timing remain protected in Secure Vault."},
  {"title":"Istanbul arrival transfer","dates":"Sep 16","city":"Istanbul Airport → Istanbul","summary":"Private airport-to-hotel transfer is included in Part 1. Exact pickup instructions and contacts remain protected."},
  {"title":"Istanbul → Cappadocia","dates":"Sep 18","city":"Istanbul → Kayseri / Cappadocia","summary":"Private hotel-to-airport transfer, domestic flight to Kayseri, then private onward transfer with an en-route Underground City visit."},
  {"title":"Cappadocia → Zagreb","dates":"Sep 21","city":"Cappadocia → Kayseri → Istanbul → Zagreb","summary":"Private transfer to Kayseri airport, connecting flights via Istanbul, then private Zagreb airport transfer."},
  {"title":"Zagreb → Plitvice Lakes","dates":"Sep 23","city":"Zagreb → Plitvice Lakes","summary":"Private road transfer to Plitvice Lakes, coordinated with the same-day national park visit."},
  {"title":"Plitvice Lakes → Rovinj","dates":"Sep 24","city":"Plitvice Lakes → Rovinj","summary":"Private road transfer to Rovinj."},
  {"title":"Rovinj → Ljubljana","dates":"Sep 27","city":"Rovinj → Postojna → Ljubljana","summary":"Private cross-border transfer with an en-route Postojna Cave visit."},
  {"title":"Ljubljana departure","dates":"Sep 30","city":"Ljubljana","summary":"Part 1 includes an early private transfer from the Ljubljana hotel to the train station. The onward Austria/Switzerland rail plan belongs to Part 2 and remains unchanged pending its official source."},
  {"title":"Austria / Switzerland rail movement","dates":"Sep 30–Oct 6","city":"Austria / Switzerland","summary":"Part 2 movement remains in TEE but is not revised from this Part 1 PDF. Rail pass, reservation and exact train details remain protected."},
  {"title":"Return international travel","dates":"Oct 6–7","city":"Zurich → Istanbul → San Francisco","summary":"Return movement remains unchanged pending the official Part 2 itinerary. Exact flight, airport positioning, booking and seat details remain protected."}
];
const mount=document.querySelector('[id$="Mount"], main .hotel-mount, main .transport-mount, main .cost-mount, main .day-mount')||document.querySelector('main');
function renderProtectedContext(){
  const host=document.getElementById('transportMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  PUBLIC_CONTEXT.forEach(c=>{const a=document.createElement('article');a.className='transport-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p><strong>Protected details:</strong> traveler names, exact booking/confirmation data, addresses, contacts, payment notes, tickets, seats, and other Shared/Private fields are stored in Secure Vault and are not embedded in GitHub source.</p><p class="protected-location-note">Protected details are available from the single Secure Vault button at the top of the Hub.</p>`;host.appendChild(a);});
}
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
