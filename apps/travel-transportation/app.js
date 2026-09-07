"use strict";
const PUBLIC_CONTEXT=[
  {title:"Outbound international travel",dates:"Sep 15–16",days:["Sep 15","Sep 16"],city:"San Francisco → Istanbul",types:["Flight"],summary:"Confirmed in Turkish Airlines Manage Reservation: TK 80 departs SFO Sep. 15 at 18:45 and arrives IST Sep. 16 at 17:40. Traveler PNRs, ticket numbers and identity details remain protected in Secure Vault."},
  {title:"Istanbul arrival transfer",dates:"Sep 16",days:["Sep 16"],city:"Istanbul Airport → Istanbul",types:["Private transfer"],summary:"Private airport-to-hotel transfer is included in Part 1. Exact pickup instructions and contacts remain protected."},
  {title:"Istanbul → Cappadocia",dates:"Sep 18",days:["Sep 18"],city:"Istanbul → Kayseri / Cappadocia",types:["Flight","Private transfer"],summary:"Private hotel-to-airport transfer, domestic flight to Kayseri, then private onward transfer with an en-route Underground City visit."},
  {title:"Cappadocia → Zagreb",dates:"Sep 21",days:["Sep 21"],city:"Cappadocia → Kayseri → Istanbul → Zagreb",types:["Flight","Private transfer"],summary:"Private transfer to Kayseri airport, connecting flights via Istanbul, then private Zagreb airport transfer."},
  {title:"Zagreb → Plitvice Lakes",dates:"Sep 23",days:["Sep 23"],city:"Zagreb → Plitvice Lakes",types:["Private transfer"],summary:"Private road transfer to Plitvice Lakes, coordinated with the same-day national park visit."},
  {title:"Plitvice Lakes → Rovinj",dates:"Sep 24",days:["Sep 24"],city:"Plitvice Lakes → Rovinj",types:["Private transfer"],summary:"Private road transfer to Rovinj."},
  {title:"Rovinj → Ljubljana",dates:"Sep 27",days:["Sep 27"],city:"Rovinj → Postojna → Ljubljana",types:["Private transfer"],summary:"Private cross-border transfer with an en-route Postojna Cave visit."},
  {title:"Ljubljana → Salzburg",dates:"Sep 30",days:["Sep 30"],city:"Ljubljana → Villach → Salzburg",types:["Train"],summary:"Confirmed in the active Eurail trip: Ljubljana 07:42 → Villach Hbf 09:22, INT 318; then Villach Hbf 10:32 → Salzburg Hbf 12:53, IC 796. Eurail shows seat reservations optional for both listed journeys. The Villach→Salzburg separately issued reservation/ticket details remain protected in Secure Vault."},
  {title:"Salzburg → Zermatt",dates:"Oct 2",days:["Oct 2"],city:"Salzburg → Zurich → Visp → Zermatt",types:["Train"],summary:"Confirmed in the active Eurail trip: Salzburg Hbf 06:56 → Zürich HB 13:28, RJ 13478; Zürich HB 14:02 → Visp 16:04, IC 820; Visp 16:37 → Zermatt 17:50, RE 351. Eurail shows seat reservations recommended on Salzburg→Zürich and optional on Zürich→Visp. Exact traveler reservations and ticket references remain protected."},
  {title:"Zermatt → Lucerne",dates:"Oct 4",days:["Oct 4"],city:"Zermatt → Visp → Bern → Lucerne",types:["Train"],summary:"Confirmed in the active Eurail trip: Zermatt 08:37 → Visp 09:47, RE 226; Visp 10:54 → Bern 11:53, IC 817; Bern 12:36 → Luzern 14:03, RE 4371. Eurail shows seat reservations optional on the Visp→Bern segment."},
  {title:"Lucerne → Zurich",dates:"Oct 5",days:["Oct 5"],city:"Lucerne → Zurich",types:["Train"],summary:"Confirmed in the active Eurail trip: Luzern 09:09 → Zürich HB 09:51, TRN 2616."},
  {title:"Zurich HB → Zurich Airport",dates:"Oct 6",days:["Oct 6"],city:"Zürich HB → Zürich Flughafen",types:["Train"],summary:"Confirmed in the active Eurail trip: Zürich HB 10:02 → Zürich Flughafen 10:11, IC 513. Eurail shows seat reservations optional."},
  {title:"Zurich → Istanbul Airport",dates:"Oct 6",days:["Oct 6"],city:"Zurich → Istanbul",types:["Flight"],summary:"Confirmed in Turkish Airlines Manage Reservation: TK 1208, ZRH 13:35 → IST 17:35 on Oct. 6, operated by Turkish Airlines. The booking shows two passengers on this reservation. Traveler PNRs, ticket numbers and identity details remain protected. At Zurich check-in, ask whether checked baggage can be tagged through to San Francisco and verify the printed bag tag."},
  {title:"Istanbul → San Francisco",dates:"Oct 7",days:["Oct 7"],city:"Istanbul → San Francisco",types:["Flight"],summary:"Confirmed in Turkish Airlines flight information: TK 79 departs IST at 13:15 and arrives SFO at 16:40 on Oct. 7. Traveler booking and ticket records remain protected in Secure Vault."}
];
const searchInput=document.getElementById('searchInput');
const typeFilter=document.getElementById('typeFilter');
const dateFilter=document.getElementById('dateFilter');
const resetBtn=document.getElementById('resetBtn');
const unique=v=>[...new Set(v)].filter(Boolean);
function addOptions(select, values){if(!select)return;values.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v+' · 2026';select.appendChild(o);});}
function movementDays(){
  const order=["Sep 15","Sep 16","Sep 18","Sep 21","Sep 23","Sep 24","Sep 27","Sep 30","Oct 2","Oct 4","Oct 5","Oct 6","Oct 7"];
  return order.filter(day=>PUBLIC_CONTEXT.some(c=>(c.days||[]).includes(day)));
}
addOptions(typeFilter, unique(PUBLIC_CONTEXT.flatMap(c=>c.types||[])));
addOptions(dateFilter, movementDays());
if(dateFilter?.options?.[0]) dateFilter.options[0].textContent='Choose a date / All transportation';
function visible(c){
  const q=(searchInput?.value||'').trim().toLowerCase();
  const type=typeFilter?.value||'all';
  const date=dateFilter?.value||'all';
  const blob=[c.title,c.dates,c.city,c.summary,...(c.types||[])].join(' ').toLowerCase();
  return (!q||blob.includes(q))&&(type==='all'||(c.types||[]).includes(type))&&(date==='all'||(c.days||[]).includes(date));
}
function ensureGlanceMount(){
  let host=document.getElementById('transportDayGlance');
  if(host)return host;
  host=document.createElement('section');
  host.id='transportDayGlance';
  host.className='transport-day-glance';
  const main=document.querySelector('main');
  const notice=main?.querySelector('.notice');
  if(notice) notice.insertAdjacentElement('afterend',host); else main?.prepend(host);
  if(!document.getElementById('transportDayGlanceStyles')){
    const s=document.createElement('style');s.id='transportDayGlanceStyles';s.textContent=`
      .transport-day-glance{margin:0 0 18px}.transport-day-glance[hidden]{display:none}.day-glance-shell{background:#eef7fa;border:2px solid #8db8c8;border-radius:18px;padding:15px;box-shadow:0 3px 14px rgba(0,0,0,.06)}
      .day-glance-kicker{font-size:.75rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#526d78}.day-glance-shell h2{margin:.2rem 0 .35rem;color:#17384f}.day-glance-sub{margin:0 0 12px;color:#51656e}
      .day-glance-item{background:#fff;border:1px solid #cfe1e8;border-radius:14px;padding:12px;margin:9px 0}.day-glance-item h3{margin:0 0 4px;color:#17384f;font-size:1.05rem}.day-glance-route{font-weight:800;margin:0 0 6px}.day-glance-item p:last-child{margin-bottom:0}.day-glance-types{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.day-glance-types span{background:#dce9ef;color:#17384f;border-radius:999px;padding:4px 8px;font-size:.76rem;font-weight:800}.day-glance-empty{background:#fff;border:1px dashed #b8cbd2;border-radius:14px;padding:12px;color:#53656d}
      @media(max-width:760px){.day-glance-shell{padding:13px}}
    `;document.head.appendChild(s);
  }
  return host;
}
function renderDayGlance(){
  const host=ensureGlanceMount();
  const date=dateFilter?.value||'all';
  if(date==='all'){host.hidden=true;host.innerHTML='';return;}
  const rows=PUBLIC_CONTEXT.filter(c=>(c.days||[]).includes(date));
  host.hidden=false;
  host.innerHTML=`<div class="day-glance-shell"><span class="day-glance-kicker">${date}, 2026 · TRANSPORTATION AT A GLANCE</span><h2>${rows.length?`${rows.length} movement${rows.length===1?'':'s'} scheduled`:'No scheduled transportation'}</h2><p class="day-glance-sub">Choosing a date automatically gathers every transportation item in the TEE transportation register for that day.</p>${rows.length?rows.map(c=>`<article class="day-glance-item"><h3>${c.title}</h3><p class="day-glance-route">${c.city}</p><p>${c.summary}</p><div class="day-glance-types">${(c.types||[]).map(t=>`<span>${t}</span>`).join('')}</div></article>`).join(''):`<div class="day-glance-empty">No transportation is currently registered for this date.</div>`}</div>`;
}
function renderProtectedContext(){
  const host=document.getElementById('transportMount')||document.querySelector('[id$="Mount"]'); if(!host)return; host.innerHTML='';
  const help=document.createElement('article');help.className='transport-card';help.innerHTML='<h2>Eurail rules / pass help</h2><p>Travel-day activation, live mobile tickets, seat reservations, paper/e-ticket handling and what to do when plans change.</p><p><a href="../travel-essentials/eurail-pass-help.html" style="font-weight:800">Open Eurail Pass Rules &amp; What To Do →</a></p>';host.appendChild(help);
  const rows=PUBLIC_CONTEXT.filter(visible);
  rows.forEach(c=>{const a=document.createElement('article');a.className='transport-card';a.innerHTML=`<h2>${c.title}</h2><div class="meta"><span class="pill">${c.dates||''}</span><span class="pill">${c.city||''}</span>${(c.types||[]).map(t=>`<span class="pill">${t}</span>`).join('')}</div><p>${c.summary}</p><p class="protected-location-note"><strong>Need seats, ticket/booking references or traveler-specific details?</strong> Unlock Secure Vault once, then use Vault Records.</p>`;host.appendChild(a);});
  if(!rows.length){const p=document.createElement('p');p.className='notice';p.textContent='No transportation matches the current filters.';host.appendChild(p);}
  renderDayGlance();
}
searchInput?.addEventListener('input',renderProtectedContext);
typeFilter?.addEventListener('input',renderProtectedContext);
dateFilter?.addEventListener('change',()=>{
  if(searchInput)searchInput.value='';
  if(typeFilter)typeFilter.value='all';
  renderProtectedContext();
});
resetBtn?.addEventListener('click',()=>{if(searchInput)searchInput.value='';if(typeFilter)typeFilter.value='all';if(dateFilter)dateFilter.value='all';renderProtectedContext();});
renderProtectedContext();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
