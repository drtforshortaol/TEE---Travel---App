"use strict";
const PUBLIC_CONTEXT=[
  {"title":"International departure","dates":"Sep 15–16","city":"San Francisco → Istanbul","summary":"Part 1 begins with overnight international travel to Istanbul. Exact airline, seat, ticket and traveler records remain protected."},
  {"title":"Istanbul","dates":"Sep 16–18","city":"Istanbul","summary":"Arrival and two-night Istanbul stay. Sept. 17 is the private Old Town tour with Bosphorus cruise; Sept. 18 is the move to Cappadocia."},
  {"title":"Cappadocia","dates":"Sep 18–21","city":"Cappadocia","summary":"Three-night Cappadocia stay. Sept. 18 includes an en-route Underground City visit; Sept. 19 includes the sunrise balloon and Highlights of Cappadocia; Sept. 20 includes the Whirling Dervish Ceremony."},
  {"title":"Zagreb","dates":"Sep 21–23","city":"Zagreb","summary":"Arrive Zagreb Sept. 21. Sept. 22 includes the private day trip to Varaždin with time for Zagreb self-exploration."},
  {"title":"Plitvice Lakes","dates":"Sep 23–24","city":"Plitvice Lakes","summary":"Private transfer from Zagreb and private Plitvice Lakes National Park tour on Sept. 23, followed by one night near the park."},
  {"title":"Rovinj / Istria","dates":"Sep 24–27","city":"Rovinj","summary":"Three-night Rovinj stay. Sept. 25 is the private Istrian hilltop towns tour; Sept. 26 is the private day trip to Pula."},
  {"title":"Ljubljana / Slovenia","dates":"Sep 27–30","city":"Ljubljana","summary":"Transfer from Rovinj with an en-route Postojna Cave visit on Sept. 27. Sept. 28 is the Lake Bled & Bohinj group trip; Sept. 29 is the private Ljubljana walking tour. Laundry is planned in Ljubljana before the Austria/Switzerland extension."},
  {"title":"Salzburg","dates":"Sep 30–Oct 2","city":"Salzburg","summary":"Part 2 begins with rail travel from Ljubljana to Salzburg on Sept. 30. The Villach-to-Salzburg reserved segment is confirmed; the Ljubljana-to-Villach details still need final confirmation. Oct. 1 remains the Salzburg local/free day."},
  {"title":"Zermatt","dates":"Oct 2–4","city":"Zermatt","summary":"Long rail move from Salzburg to Zermatt on Oct. 2 via Zurich and Visp. Major reserved rail segments are confirmed. Oct. 3 is the mountain day, with final excursion choice to be based on weather and visibility."},
  {"title":"Lucerne","dates":"Oct 4–5","city":"Lucerne","summary":"Rail move from Zermatt to Lucerne on Oct. 4, followed by one night. Exact train details remain to be finalized."},
  {"title":"Zurich","dates":"Oct 5–6","city":"Zurich","summary":"Short rail move from Lucerne to Zurich on Oct. 5, followed by one night near the main station. Exact train details and final city plan remain to be finalized."},
  {"title":"Return via Istanbul","dates":"Oct 6–7","city":"Zurich → Istanbul → San Francisco","summary":"Travel from Zurich to Istanbul on Oct. 6, overnight airside at Istanbul Airport, then return to San Francisco Oct. 7. Final through-checked baggage handling from Zurich to San Francisco remains an action item to confirm with the airline."}
];
const mount=document.querySelector('[id$="Mount"], main .hotel-mount, main .transport-mount, main .cost-mount, main .day-mount')||document.querySelector('main');
function renderProtectedContext(){
  const host=document.getElementById('timelineMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  PUBLIC_CONTEXT.forEach(c=>{const a=document.createElement('article');a.className='timeline-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p><strong>Protected details:</strong> traveler names, exact booking/confirmation data, addresses, contacts, payment notes, tickets, seats, and other Shared/Private fields are stored in Secure Vault and are not embedded in GitHub source.</p><p class="protected-location-note">Protected details are available from the single Secure Vault button at the top of the Hub.</p>`;host.appendChild(a);});
}
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
