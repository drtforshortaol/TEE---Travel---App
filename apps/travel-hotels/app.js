"use strict";
const PUBLIC_CONTEXT=[
  {title:"The Galata Istanbul Hotel MGallery",dates:"Sep 16–18",city:"Istanbul",status:"has-confirmation",summary:"Part 1 lodging. Exact address, contacts, confirmation, payment and traveler-specific details remain in Secure Vault."},
  {title:"Taskonaklar",dates:"Sep 18–21",city:"Cappadocia",status:"has-confirmation",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"Amadria Park Hotel Capital",dates:"Sep 21–23",city:"Zagreb",status:"has-confirmation",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"Hotel Fenomen",dates:"Sep 23–24",city:"Plitvice Lakes",status:"has-confirmation",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"The Melegran",dates:"Sep 24–27",city:"Rovinj",status:"has-confirmation",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"Hotel CUBO",dates:"Sep 27–30",city:"Ljubljana",status:"has-confirmation",summary:"Ljubljana lodging before the Austria/Switzerland extension. Laundry is planned during the Ljubljana stay. Exact protected booking details remain in Secure Vault."},
  {title:"H+ Hotel Salzburg",dates:"Sep 30–Oct 2",city:"Salzburg",status:"has-confirmation",summary:"The hotel is directly beside Salzburg Hbf, making the Sep. 30 station-to-hotel transfer very short. The saved trip record confirms a two-room Sep. 30–Oct. 2 booking. If rooms are not ready, go to reception first and ask about luggage holding. Exact check-in/check-out timing should be confirmed from the booking/front desk rather than assumed. Confirmation, payment and traveler-specific details remain in Secure Vault."},
  {title:"Haus Juliana Airbnb",dates:"Oct 2–4",city:"Zermatt",status:"has-confirmation",summary:"Current property information says access is code-based after booking, the building has an elevator, and Haus Juliana is immediately beside the Matterhorn Glacier Express valley-station area. Zermatt's official green E-Bus line links Bahnhof with the Matterhorn glacier paradise stop. Before leaving Salzburg, confirm the current entry code and booking-specific instructions are saved in Secure Vault. Exact address, code, host contact and booking details remain protected."},
  {title:"AMERON Luzern Hotel Flora",dates:"Oct 4–5",city:"Lucerne",status:"has-confirmation",summary:"Official hotel information says the property is less than a 5-minute walk from Luzern station, rooms are available from 3:00 PM, and checkout is at 12 noon. The planned train reaches Luzern about 14:03, so go to the front desk on arrival and ask about luggage holding if the room is not yet ready. Exact confirmation and payment details remain in Secure Vault."},
  {title:"Fred Hotel Hauptbahnhof",dates:"Oct 5–6",city:"Zurich",status:"has-confirmation",summary:"The protected booking screenshot identifies the booked property at the same location as today's Fred Hotel Hauptbahnhof, not the separate Fred Guest House Hauptbahnhof | Self Check-in. Fred's current official site describes the hotel as using easy mobile check-in with a Local Host available on site. General Fred service information lists rooms from 3:00 PM, checkout by 11:00 AM and free 24-hour luggage storage. Before leaving Lucerne, make sure the booking-specific mobile check-in/arrival information is accessible in Secure Vault. Exact address, confirmation and traveler-specific details remain protected."},
  {title:"YOTELAIR Istanbul Airport Airside",dates:"Oct 6–7",city:"Istanbul Airport",status:"has-confirmation",summary:"Airside overnight before the Oct. 7 return flight. Exact reservation and access details remain in Secure Vault."}
];
const searchInput=document.getElementById('searchInput');
const cityFilter=document.getElementById('cityFilter');
const statusFilter=document.getElementById('statusFilter');
const resetBtn=document.getElementById('resetBtn');
const unique=v=>[...new Set(v)].filter(Boolean);
function addOptions(select,values){if(!select)return;values.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;select.appendChild(o);});}
addOptions(cityFilter,unique(PUBLIC_CONTEXT.map(c=>c.city)));
function visible(c){
  const q=(searchInput?.value||'').trim().toLowerCase();
  const city=cityFilter?.value||'all';
  const status=statusFilter?.value||'all';
  const blob=[c.title,c.dates,c.city,c.summary].join(' ').toLowerCase();
  return (!q||blob.includes(q))&&(city==='all'||c.city===city)&&(status==='all'||c.status===status);
}
function renderProtectedContext(){
  const host=document.getElementById('hotelMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  const rows=PUBLIC_CONTEXT.filter(visible);
  rows.forEach(c=>{const a=document.createElement('article');a.className='hotel-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p class="protected-location-note"><strong>Need the exact address, confirmation, contact or payment detail?</strong> Unlock Secure Vault once, then use Vault Records.</p>`;host.appendChild(a);});
  if(!rows.length){const p=document.createElement('p');p.className='notice';p.textContent='No hotel stays match the current filters.';host.appendChild(p);}
}
[searchInput,cityFilter,statusFilter].forEach(el=>el?.addEventListener('input',renderProtectedContext));
resetBtn?.addEventListener('click',()=>{if(searchInput)searchInput.value='';if(cityFilter)cityFilter.value='all';if(statusFilter)statusFilter.value='all';renderProtectedContext();});
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
