"use strict";
const PUBLIC_CONTEXT=[
  {title:"The Galata Istanbul Hotel MGallery",dates:"Sep 16–18",city:"Istanbul",summary:"Part 1 lodging. Exact address, contacts, confirmation, payment and traveler-specific details remain in Secure Vault."},
  {title:"Taskonaklar",dates:"Sep 18–21",city:"Cappadocia",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"Amadria Park Hotel Capital",dates:"Sep 21–23",city:"Zagreb",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"Hotel Fenomen",dates:"Sep 23–24",city:"Plitvice Lakes",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"The Melegran",dates:"Sep 24–27",city:"Rovinj",summary:"Part 1 lodging. Exact protected booking details remain in Secure Vault."},
  {title:"Hotel CUBO",dates:"Sep 27–30",city:"Ljubljana",summary:"Ljubljana lodging before the Austria/Switzerland extension. Laundry is planned during the Ljubljana stay. Exact protected booking details remain in Secure Vault."},
  {title:"H+ Hotel Salzburg",dates:"Sep 30–Oct 2",city:"Salzburg",summary:"Part 2 lodging near Salzburg Hbf. Exact address, confirmation, payment and traveler-specific details remain in Secure Vault."},
  {title:"Haus Juliana Airbnb",dates:"Oct 2–4",city:"Zermatt",summary:"Current property information says access is code-based after booking, the building has an elevator, and Haus Juliana is immediately beside the Matterhorn Glacier Express valley-station area. Zermatt's official green E-Bus line links Bahnhof with the Matterhorn glacier paradise stop. Before leaving Salzburg, confirm the current entry code and booking-specific instructions are saved in Secure Vault. Exact address, code, host contact and booking details remain protected."},
  {title:"AMERON Luzern Hotel Flora",dates:"Oct 4–5",city:"Lucerne",summary:"Part 2 Lucerne lodging for one night. Exact confirmation and payment details remain in Secure Vault."},
  {title:"Fred Hotel Hauptbahnhof | Self Check-in",dates:"Oct 5–6",city:"Zurich",summary:"Confirmed from the saved hotel booking record as Fred Hotel Hauptbahnhof | Self Check-in. Part 2 Zurich lodging near Zürich HB. Exact address, self-check-in instructions, confirmation and payment details remain in Secure Vault."},
  {title:"YOTELAIR Istanbul Airport Airside",dates:"Oct 6–7",city:"Istanbul Airport",summary:"Airside overnight before the Oct. 7 return flight. Exact reservation and access details remain in Secure Vault."}
];
function renderProtectedContext(){
  const host=document.getElementById('hotelMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  PUBLIC_CONTEXT.forEach(c=>{const a=document.createElement('article');a.className='hotel-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span></div><p>${c.summary}</p><p class="protected-location-note"><strong>Need the exact address, confirmation, contact or payment detail?</strong> Unlock Secure Vault once, then use Vault Records.</p>`;host.appendChild(a);});
}
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
