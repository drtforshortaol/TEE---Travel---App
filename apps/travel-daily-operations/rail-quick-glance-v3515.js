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
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const urgency=m=>m>=45?"RELAXED":m>=25?"NORMAL":"MOVE DIRECTLY";
  const routeLine=stops=>stops.map((s,i)=>i===0||i===stops.length-1?`<strong>${esc(s)}</strong>`:`(${esc(s)})`).join(' <span class="tee-daily-rail-arrow">→</span> ');
  function styles(){if(document.getElementById('teeDailyRail3515Styles'))return;const s=document.createElement('style');s.id='teeDailyRail3515Styles';s.textContent=`
    .tee-daily-rail-glance{margin:14px 0;background:#eef7fa;border:2px solid #80adbd;border-radius:18px;padding:15px;box-shadow:0 3px 14px rgba(0,0,0,.06)}.tee-daily-rail-glance h3{margin:0 0 4px;color:#17384f;font-size:1.28rem}.tee-daily-rail-kicker{display:block;font-size:.74rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#53656d}.tee-daily-rail-line{line-height:1.85;font-size:.98rem;margin:9px 0}.tee-daily-rail-line strong{font-weight:900;color:#102f41}.tee-daily-rail-arrow{color:#607078}.tee-daily-transfer{background:#fbf5e7;border-left:6px solid #8a642d;border-radius:11px;padding:10px 12px;margin:9px 0;font-size:.93rem}.tee-daily-transfer strong{font-weight:900}.tee-daily-urgency{display:inline-block;border:1px solid #d5bd91;background:#fff;border-radius:999px;padding:2px 7px;font-size:.72rem;font-weight:900}.tee-daily-rail-button{display:block;text-align:center;text-decoration:none;background:#17384f;color:#fff!important;border-radius:999px;padding:11px 14px;margin-top:12px;font-weight:900}.tee-daily-rail-help{font-size:.79rem;color:#607078;margin:7px 0 0}.tee-daily-rail-tomorrow{margin-top:10px;padding:10px 12px;border:1px solid #d9d3a7;background:#fffdf2;border-radius:12px}.tee-daily-rail-tomorrow strong{color:#4d4b1c}.tee-daily-rail-top{margin:14px 18px 20px}@media(max-width:600px){.tee-daily-rail-top{margin:12px 16px 18px}.tee-daily-rail-line{font-size:.92rem}.tee-daily-rail-glance{padding:13px}}
  `;document.head.appendChild(s);}
  function transferHtml(t){return `<div class="tee-daily-transfer"><strong>🔄 TRANSFER — ${esc(t.station)}</strong><br><strong>${t.minutes} min</strong> · <span class="tee-daily-urgency">${urgency(t.minutes)}</span> · Next: <strong>${esc(t.next)}</strong> → ${esc(t.toward)} · departs <strong>${esc(t.depart)}</strong></div>`;}
  function fullHtml(r){let body='';r.legs.forEach((leg,i)=>{if(i)body+=transferHtml(r.transfers[i-1]);body+=`<div class="tee-daily-rail-line">${routeLine(leg.stops)}</div>`;});return `<span class="tee-daily-rail-kicker">TODAY · RAIL — AT A GLANCE</span><h3>${esc(r.title)}</h3>${body}<a class="tee-daily-rail-button" href="../travel-transportation/index.html#${esc(r.id)}">View Full Route &amp; Maps →</a><p class="tee-daily-rail-help">Intermediate stops are in parentheses. Bold stations are start, transfer, or destination stations.</p>`;}
  function tomorrowHtml(r){const transferSummary=r.transfers.length?r.transfers.map(t=>`<strong>${esc(t.station)}</strong>: ${t.minutes} min → ${esc(t.next)} toward ${esc(t.toward)}`).join(' · '):'Direct train — no transfer.';return `<div class="tee-daily-rail-tomorrow"><span class="tee-daily-rail-kicker">TOMORROW · RAIL PREVIEW</span><strong>${esc(r.title)}</strong><div>${transferSummary}</div></div>`;}
  function currentDates(){try{return {today:DAYS?.[activeIndex]?.date||'',tomorrow:DAYS?.[Math.min(activeIndex+1,DAYS.length-1)]?.date||''};}catch{return {today:'',tomorrow:''};}}
  function mountTop(){styles();const strip=document.getElementById('trip-day-context');if(!strip)return;const dates=currentDates();const todayRail=RAIL[dates.today];const tomorrowRail=RAIL[dates.tomorrow];let host=document.getElementById('teeRailTodayGlance');if(!todayRail&&!tomorrowRail){host?.remove();return;}if(!host){host=document.createElement('section');host.id='teeRailTodayGlance';host.className='tee-daily-rail-top';strip.insertAdjacentElement('afterend',host);}host.innerHTML=`${todayRail?`<div class="tee-daily-rail-glance">${fullHtml(todayRail)}</div>`:''}${tomorrowRail?tomorrowHtml(tomorrowRail):''}`;}
  let timer=0;
  function queueMount(delay=0){clearTimeout(timer);timer=setTimeout(mountTop,delay);}
  function start(){
    mountTop();
    document.getElementById('previewDateSelect')?.addEventListener('change',()=>{queueMount(25);setTimeout(mountTop,180);});
    document.getElementById('useActualDateBtn')?.addEventListener('click',()=>{queueMount(25);setTimeout(mountTop,180);});
    setTimeout(mountTop,250);
    setTimeout(mountTop,900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
