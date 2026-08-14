"use strict";
const MOVES=[
{title:"International arrival",dates:"Sep 15–16",route:"San Francisco → Istanbul",summary:"General route context only. Exact flight, booking, seat and transfer details are protected."},
{title:"Turkey movement",dates:"Sep 18–21",route:"Istanbul ↔ Cappadocia",summary:"General route context only. Exact flight/transfer details are protected."},
{title:"Croatia / Slovenia movement",dates:"Sep 21–30",route:"Zagreb → Plitvice → Rovinj → Ljubljana",summary:"General route context only. Exact transfer and lodging details are protected."},
{title:"Austria / Switzerland movement",dates:"Sep 30–Oct 6",route:"Ljubljana → Salzburg → Zermatt → Lucerne → Zurich",summary:"General rail route context only. Pass/reservation details are protected."},
{title:"Return",dates:"Oct 6–7",route:"Zurich → Istanbul → San Francisco",summary:"General route context only. Exact flight and airport lodging details are protected."}
];
const m=document.getElementById('mapMount')||document.querySelector('[id$="Mount"]');if(m){m.innerHTML='';MOVES.forEach(x=>{const a=document.createElement('article');a.className='map-card';a.innerHTML=`<h2>${x.title}</h2><div class="meta"><span class="pill">${x.dates}</span></div><p><strong>${x.route}</strong></p><p>${x.summary}</p><p><a href="../travel-private-documents/index.html">Open Secure Vault for protected details</a></p>`;m.appendChild(a);});}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
