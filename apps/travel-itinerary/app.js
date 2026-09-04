"use strict";
const PUBLIC_CONTEXT=[
  {"title":"International departure","dates":"Sep 15–16","city":"San Francisco → Istanbul","summary":"Part 1 begins with overnight international travel to Istanbul. Exact airline, seat, ticket and traveler records remain protected."},
  {"title":"Istanbul","dates":"Sep 16–18","city":"Istanbul","summary":"Arrival and two-night Istanbul stay. Sept. 17 is the private Old Town tour with Bosphorus cruise; Sept. 18 is the move to Cappadocia."},
  {"title":"Cappadocia","dates":"Sep 18–21","city":"Cappadocia","summary":"Three-night Cappadocia stay. Sept. 18 includes an en-route Underground City visit; Sept. 19 includes the sunrise balloon and Highlights of Cappadocia; Sept. 20 includes the Whirling Dervish Ceremony."},
  {"title":"Zagreb","dates":"Sep 21–23","city":"Zagreb","summary":"Arrive Zagreb Sept. 21. Sept. 22 includes the private day trip to Varaždin with time for Zagreb self-exploration."},
  {"title":"Plitvice Lakes","dates":"Sep 23–24","city":"Plitvice Lakes","summary":"Private transfer from Zagreb and private Plitvice Lakes National Park tour on Sept. 23, followed by one night near the park."},
  {"title":"Rovinj / Istria","dates":"Sep 24–27","city":"Rovinj","summary":"Three-night Rovinj stay. Sept. 25 is the private Istrian hilltop towns tour; Sept. 26 is the private day trip to Pula."},
  {"title":"Ljubljana / Slovenia","dates":"Sep 27–30","city":"Ljubljana","summary":"Transfer from Rovinj with an en-route Postojna Cave visit on Sept. 27. Sept. 28 is the Lake Bled & Bohinj group trip; Sept. 29 is the private Ljubljana walking tour."},
  {"title":"Part 2 begins","dates":"Sep 30–Oct 6","city":"Austria / Switzerland","summary":"Austria and Switzerland extension remains part of TEE. It is not covered by the current official Part 1 PDF and remains unchanged until the official Part 2 source is provided."},
  {"title":"Return via Istanbul","dates":"Oct 6–7","city":"Istanbul / San Francisco","summary":"General return route remains unchanged pending the official Part 2 itinerary. Exact flight and lodging records are protected."}
];
const mount=document.querySelector('[id$="Mount"], main .hotel-mount, main .transport-mount, main .cost-mount, main .day-mount')||document.querySelector('main');
function renderProtectedContext(){
  const host=document.getElementById('timelineMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  PUBLIC_CONTEXT.forEach(c=>{const a=document.createElement('article');a.className='timeline-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p><strong>Protected details:</strong> traveler names, exact booking/confirmation data, addresses, contacts, payment notes, tickets, seats, and other Shared/Private fields are stored in Secure Vault and are not embedded in GitHub source.</p><p class="protected-location-note">Protected details are available from the single Secure Vault button at the top of the Hub.</p>`;host.appendChild(a);});
}
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
