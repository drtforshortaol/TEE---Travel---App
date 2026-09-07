"use strict";
const PUBLIC_CONTEXT=[
  {title:"Outbound international travel",dates:"Sep 15–16",city:"San Francisco → Istanbul",summary:"Confirmed in Turkish Airlines Manage Reservation: TK 80 departs SFO Sep. 15 at 18:45 and arrives IST Sep. 16 at 17:40. Traveler PNRs, ticket numbers and identity details remain protected in Secure Vault."},
  {title:"Istanbul arrival transfer",dates:"Sep 16",city:"Istanbul Airport → Istanbul",summary:"Private airport-to-hotel transfer is included in Part 1. Exact pickup instructions and contacts remain protected."},
  {title:"Istanbul → Cappadocia",dates:"Sep 18",city:"Istanbul → Kayseri / Cappadocia",summary:"Private hotel-to-airport transfer, domestic flight to Kayseri, then private onward transfer with an en-route Underground City visit."},
  {title:"Cappadocia → Zagreb",dates:"Sep 21",city:"Cappadocia → Kayseri → Istanbul → Zagreb",summary:"Private transfer to Kayseri airport, connecting flights via Istanbul, then private Zagreb airport transfer."},
  {title:"Zagreb → Plitvice Lakes",dates:"Sep 23",city:"Zagreb → Plitvice Lakes",summary:"Private road transfer to Plitvice Lakes, coordinated with the same-day national park visit."},
  {title:"Plitvice Lakes → Rovinj",dates:"Sep 24",city:"Plitvice Lakes → Rovinj",summary:"Private road transfer to Rovinj."},
  {title:"Rovinj → Ljubljana",dates:"Sep 27",city:"Rovinj → Postojna → Ljubljana",summary:"Private cross-border transfer with an en-route Postojna Cave visit."},
  {title:"Ljubljana → Salzburg",dates:"Sep 30",city:"Ljubljana → Villach → Salzburg",summary:"Confirmed in the active Eurail trip: Ljubljana 07:42 → Villach Hbf 09:22, INT 318; then Villach Hbf 10:32 → Salzburg Hbf 12:53, IC 796. Eurail shows seat reservations optional for both listed journeys. The Villach→Salzburg separately issued reservation/ticket details remain protected in Secure Vault."},
  {title:"Salzburg → Zermatt",dates:"Oct 2",city:"Salzburg → Zurich → Visp → Zermatt",summary:"Confirmed in the active Eurail trip: Salzburg Hbf 06:56 → Zürich HB 13:28, RJ 13478; Zürich HB 14:02 → Visp 16:04, IC 820; Visp 16:37 → Zermatt 17:50, RE 351. Eurail shows seat reservations recommended on Salzburg→Zürich and optional on Zürich→Visp. Exact traveler reservations and ticket references remain protected."},
  {title:"Zermatt → Lucerne",dates:"Oct 4",city:"Zermatt → Visp → Bern → Lucerne",summary:"Confirmed in the active Eurail trip: Zermatt 08:37 → Visp 09:47, RE 226; Visp 10:54 → Bern 11:53, IC 817; Bern 12:36 → Luzern 14:03, RE 4371. Eurail shows seat reservations optional on the Visp→Bern segment."},
  {title:"Lucerne → Zurich",dates:"Oct 5",city:"Lucerne → Zurich",summary:"Confirmed in the active Eurail trip: Luzern 09:09 → Zürich HB 09:51, TRN 2616."},
  {title:"Zurich HB → Zurich Airport",dates:"Oct 6",city:"Zürich HB → Zürich Flughafen",summary:"Confirmed in the active Eurail trip: Zürich HB 10:02 → Zürich Flughafen 10:11, IC 513. Eurail shows seat reservations optional."},
  {title:"Zurich → Istanbul Airport",dates:"Oct 6",city:"Zurich → Istanbul",summary:"Confirmed in Turkish Airlines Manage Reservation: TK 1208, ZRH 13:35 → IST 17:35 on Oct. 6, operated by Turkish Airlines. The booking shows two passengers on this reservation. Traveler PNRs, ticket numbers and identity details remain protected. At Zurich check-in, ask whether checked baggage can be tagged through to San Francisco and verify the printed bag tag."},
  {title:"Istanbul → San Francisco",dates:"Oct 7",city:"Istanbul → San Francisco",summary:"Confirmed in Turkish Airlines flight information: TK 79 departs IST at 13:15 and arrives SFO at 16:40 on Oct. 7. Traveler booking and ticket records remain protected in Secure Vault."}
];
function renderProtectedContext(){
  const host=document.getElementById('transportMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  const help=document.createElement('article');
  help.className='transport-card';
  help.innerHTML='<h2>Eurail rules / pass help</h2><p>Travel-day activation, live mobile tickets, seat reservations, paper/e-ticket handling and what to do when plans change.</p><p><a href="../travel-essentials/eurail-pass-help.html" style="font-weight:800">Open Eurail Pass Rules &amp; What To Do →</a></p>';
  host.appendChild(help);
  PUBLIC_CONTEXT.forEach(c=>{const a=document.createElement('article');a.className='transport-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p class="protected-location-note"><strong>Need seats, ticket/booking references or traveler-specific details?</strong> Unlock Secure Vault once, then use Vault Records.</p>`;host.appendChild(a);});
}
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
