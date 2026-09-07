"use strict";
(() => {
  const RAIL = {
    "Sep 30, 2026":{
      id:"rail-sep30", title:"Ljubljana → Salzburg",
      legs:[
        {stops:["Ljubljana","Ljubljana Litostroj","Kranj","Lesce-Bled","Jesenice","Villach Hbf"]},
        {stops:["Villach Hbf","Spittal-Millstätter See","Mallnitz-Obervellach","Bad Gastein","Bad Hofgastein","Dorfgastein","Schwarzach-St. Veit","St. Johann im Pongau","Bischofshofen","Golling-Abtenau","Salzburg Hbf"]}
      ],
      transfers:[{station:"Villach Hbf",minutes:70,next:"IC 796",toward:"Salzburg Hbf",depart:"10:32"}]
    },
    "Oct 2, 2026":{
      id:"rail-oct2", title:"Salzburg → Zermatt",
      legs:[
        {stops:["Salzburg Hbf","Wörgl Hbf","Jenbach","Innsbruck Hbf","Bludenz","Feldkirch","Dornbirn","St. Gallen","Winterthur","Zürich Flughafen","Zürich HB"]},
        {stops:["Zürich HB","Bern","Thun","Spiez","Visp"]},
        {stops:["Visp","Stalden-Saas","Kalpetran","St. Niklaus","Herbriggen","Randa","Täsch","Zermatt"]}
      ],
      transfers:[
        {station:"Zürich HB",minutes:34,next:"IC 820",toward:"Visp",depart:"14:02"},
        {station:"Visp",minutes:33,next:"RE 351",toward:"Zermatt",depart:"16:37"}
      ]
    },
    "Oct 4, 2026":{
      id:"rail-oct4", title:"Zermatt → Lucerne",
      legs:[
        {stops:["Zermatt","Täsch","Randa","Herbriggen","St. Niklaus","Kalpetran","Stalden-Saas","Visp"]},
        {stops:["Visp","Spiez","Thun","Bern"]},
        {stops:["Bern","Konolfingen","Langnau i.E.","Trubschachen","Escholzmatt","Schüpfheim","Wolhusen","Malters","Luzern"]}
      ],
      transfers:[
        {station:"Visp",minutes:67,next:"IC 817",toward:"Bern",depart:"10:54"},
        {station:"Bern",minutes:43,next:"RE 4371",toward:"Luzern",depart:"12:36"}
      ]
    },
    "Oct 5, 2026":{id:"rail-oct5",title:"Lucerne → Zurich",legs:[{stops:["Luzern","Zug","Zürich HB"]}],transfers:[]},
    "Oct 6, 2026":{id:"rail-oct6",title:"Zurich HB → Zurich Airport",legs:[{stops:["Zürich HB","Zürich Flughafen"]}],transfers:[]}
  };
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const urgency=m=>m>=45?"RELAXED":m>=25?"NORMAL":"MOVE DIRECTLY";
  const routeLine=stops=>stops.map((s,i)=>i===0||i===stops.length-1?`<strong>${esc(s)}</strong>`:`(${esc(s)})`).join(' <span class="tee-daily-rail-arrow">→</span> ');
  function styles(){if(document.getElementById('teeDailyRail3513Styles'))return;const s=document.createElement('style');s.id='teeDailyRail3513Styles';s.textContent=`
    .tee-daily-rail-glance{margin:12px 14px;background:#eef7fa;border:2px solid #bfd9e2;border-radius:16px;padding:13px;box-shadow:0 2px 10px rgba(0,0,0,.04)}.tee-daily-rail-glance h3{margin:0 0 4px;color:#17384f}.tee-daily-rail-kicker{display:block;font-size:.72rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#53656d}.tee-daily-rail-line{line-height:1.8;font-size:.96rem;margin:8px 0}.tee-daily-rail-line strong{font-weight:900;color:#102f41}.tee-daily-rail-arrow{color:#607078}.tee-daily-transfer{background:#fbf5e7;border-left:5px solid #8a642d;border-radius:10px;padding:9px 11px;margin:8px 0;font-size:.91rem}.tee-daily-transfer strong{font-weight:900}.tee-daily-urgency{display:inline-block;border:1px solid #d5bd91;background:#fff;border-radius:999px;padding:2px 7px;font-size:.72rem;font-weight:900}.tee-daily-rail-button{display:block;text-align:center;text-decoration:none;background:#17384f;color:#fff!important;border-radius:999px;padding:10px 13px;margin-top:11px;font-weight:900}.tee-daily-rail-help{font-size:.78rem;color:#607078;margin:7px 0 0}@media(max-width:600px){.tee-daily-rail-glance{margin:10px}.tee-daily-rail-line{font-size:.92rem}}
  `;document.head.appendChild(s);}
  function transferHtml(t){return `<div class="tee-daily-transfer"><strong>🔄 TRANSFER — ${esc(t.station)}</strong><br><strong>${t.minutes} min</strong> · <span class="tee-daily-urgency">${urgency(t.minutes)}</span> · Next: <strong>${esc(t.next)}</strong> → ${esc(t.toward)} · departs <strong>${esc(t.depart)}</strong></div>`;}
  function html(r){let body='';r.legs.forEach((leg,i)=>{if(i)body+=transferHtml(r.transfers[i-1]);body+=`<div class="tee-daily-rail-line">${routeLine(leg.stops)}</div>`;});return `<span class="tee-daily-rail-kicker">RAIL — AT A GLANCE</span><h3>${esc(r.title)}</h3>${body}<a class="tee-daily-rail-button" href="../travel-transportation/index.html#${esc(r.id)}">View Full Route &amp; Maps →</a><p class="tee-daily-rail-help">Intermediate stops are in parentheses. Bold stations are start, transfer, or destination stations.</p>`;}
  function mount(){styles();if(typeof DAYS==='undefined')return;Object.entries(RAIL).forEach(([date,r])=>{const idx=DAYS.findIndex(d=>d.date===date);if(idx<0)return;const card=document.querySelector(`.trip-day-dropdown[data-day-index="${idx}"]`);if(!card||card.querySelector('.tee-daily-rail-glance'))return;const box=document.createElement('section');box.className='tee-daily-rail-glance';box.innerHTML=html(r);const summary=card.querySelector(':scope > summary');if(summary)summary.insertAdjacentElement('afterend',box);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(mount),{once:true});else requestAnimationFrame(mount);
})();
