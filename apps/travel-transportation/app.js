"use strict";
const PUBLIC_CONTEXT=[
  {title:"Outbound international travel",dates:"Sep 15–16",city:"San Francisco → Istanbul",summary:"Current corrected outbound: Turkish Airlines TK0080 departs SFO Sep. 15 at 18:45 and arrives IST Sep. 16 at 17:40. Traveler PNRs, seats and ticket data remain protected in Secure Vault."},
  {title:"Istanbul arrival transfer",dates:"Sep 16",city:"Istanbul Airport → Istanbul",summary:"Private airport-to-hotel transfer is included in Part 1. Exact pickup instructions and contacts remain protected."},
  {title:"Istanbul → Cappadocia",dates:"Sep 18",city:"Istanbul → Kayseri / Cappadocia",summary:"Private hotel-to-airport transfer, domestic flight to Kayseri, then private onward transfer with an en-route Underground City visit."},
  {title:"Cappadocia → Zagreb",dates:"Sep 21",city:"Cappadocia → Kayseri → Istanbul → Zagreb",summary:"Private transfer to Kayseri airport, connecting flights via Istanbul, then private Zagreb airport transfer."},
  {title:"Zagreb → Plitvice Lakes",dates:"Sep 23",city:"Zagreb → Plitvice Lakes",summary:"Private road transfer to Plitvice Lakes, coordinated with the same-day national park visit."},
  {title:"Plitvice Lakes → Rovinj",dates:"Sep 24",city:"Plitvice Lakes → Rovinj",summary:"Private road transfer to Rovinj."},
  {title:"Rovinj → Ljubljana",dates:"Sep 27",city:"Rovinj → Postojna → Ljubljana",summary:"Private cross-border transfer with an en-route Postojna Cave visit."},
  {title:"Ljubljana → Salzburg",dates:"Sep 30",city:"Ljubljana → Villach → Salzburg",summary:"Ljubljana→Villach remains pending exact timetable confirmation. Confirmed reserved segment: Villach Hbf 10:32 → Salzburg Hbf 12:53, IC796, 1st class. Exact seats, ticket number and booking references remain protected."},
  {title:"Salzburg → Zermatt",dates:"Oct 2",city:"Salzburg → Zurich → Visp → Zermatt",summary:"Confirmed: Salzburg Hbf 06:56 → Zürich HB 13:28, 1st class. Confirmed: Zürich HB 14:02 → Visp 16:04, train 820, 1st class. Visp→Zermatt still needs final timetable documentation. Exact seats and ticket references remain protected."},
  {title:"Zermatt → Lucerne",dates:"Oct 4",city:"Zermatt → Lucerne",summary:"Route is confirmed as part of the trip, but exact train numbers, connection times and reservation status still need final confirmation."},
  {title:"Lucerne → Zurich",dates:"Oct 5",city:"Lucerne → Zurich",summary:"Short rail move is confirmed as part of the trip. Exact departure/arrival time and train number still need final confirmation."},
  {title:"Zurich HB → Zurich Airport",dates:"Oct 6",city:"Zürich HB → Zürich Flughafen",summary:"Use a direct train from Zürich HB to Zürich Flughafen. Trains run frequently and the airport station is directly below the terminal; no shuttle is needed. Final same-day departure choice can be made in the SBB app or station boards."},
  {title:"Zurich → Istanbul Airport",dates:"Oct 6",city:"Zurich → Istanbul",summary:"Fly Zurich to Istanbul for the airside overnight. Final corrected flight number/time should be verified from the latest Turkish Airlines confirmation before departure. At Zurich check-in, ask whether checked baggage can be tagged through to San Francisco and verify the bag tag."},
  {title:"Istanbul → San Francisco",dates:"Oct 7",city:"Istanbul → San Francisco",summary:"Current corrected return departs IST at 13:15 and arrives SFO at 16:40. Exact traveler booking records remain protected in Secure Vault."}
];
function renderProtectedContext(){
  const host=document.getElementById('transportMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  PUBLIC_CONTEXT.forEach(c=>{const a=document.createElement('article');a.className='transport-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p class="protected-location-note"><strong>Need seats, ticket/booking references or traveler-specific details?</strong> Unlock Secure Vault once, then use Vault Records.</p>`;host.appendChild(a);});
}
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
