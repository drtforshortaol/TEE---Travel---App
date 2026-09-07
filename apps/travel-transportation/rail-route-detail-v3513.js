"use strict";
(() => {
  const DAYS = [
    {
      id:"rail-sep30", date:"Sep 30", title:"Ljubljana → Salzburg",
      legs:[
        {train:"INT / RG 318", depart:"07:42", arrive:"09:22", from:"Ljubljana", to:"Villach Hbf", stops:["Ljubljana","Ljubljana Litostroj","Kranj","Lesce-Bled","Jesenice","Villach Hbf"]},
        {train:"IC 796", depart:"10:32", arrive:"12:53", from:"Villach Hbf", to:"Salzburg Hbf", stops:["Villach Hbf","Spittal-Millstätter See","Mallnitz-Obervellach","Bad Gastein","Bad Hofgastein","Dorfgastein","Schwarzach-St. Veit","St. Johann im Pongau","Bischofshofen","Golling-Abtenau","Salzburg Hbf"]}
      ],
      transfers:[{station:"Villach Hbf", arrive:"09:22", depart:"10:32", minutes:70, nextTrain:"IC 796", toward:"Salzburg Hbf", map:"https://bahnhof.oebb.at/en/kaernten/villach-hauptbahnhof"}],
      note:"Seat reservations are optional in the active Eurail trip. Keep the separately issued Villach → Salzburg paper reservation/ticket accessible."
    },
    {
      id:"rail-oct2", date:"Oct 2", title:"Salzburg → Zermatt",
      legs:[
        {train:"RJ 13478", depart:"06:56", arrive:"13:28", from:"Salzburg Hbf", to:"Zürich HB", stops:["Salzburg Hbf","Wörgl Hbf","Jenbach","Innsbruck Hbf","Bludenz","Feldkirch","Dornbirn","St. Gallen","Winterthur","Zürich Flughafen","Zürich HB"]},
        {train:"IC 820", depart:"14:02", arrive:"16:04", from:"Zürich HB", to:"Visp", stops:["Zürich HB","Bern","Thun","Spiez","Visp"]},
        {train:"RE 351", depart:"16:37", arrive:"17:50", from:"Visp", to:"Zermatt", stops:["Visp","Stalden-Saas","Kalpetran","St. Niklaus","Herbriggen","Randa","Täsch","Zermatt"]}
      ],
      transfers:[
        {station:"Zürich HB", arrive:"13:28", depart:"14:02", minutes:34, nextTrain:"IC 820", toward:"Visp", map:"https://www.sbb.ch/en/travel-information/stations/find-station/zuerich-hb-station.html"},
        {station:"Visp", arrive:"16:04", depart:"16:37", minutes:33, nextTrain:"RE 351", toward:"Zermatt", map:"https://www.sbb.ch/en/travel-information/stations/find-station/visp-station.html"}
      ],
      note:"Eurail shows seat reservations recommended on Salzburg → Zürich and optional on Zürich → Visp."
    },
    {
      id:"rail-oct4", date:"Oct 4", title:"Zermatt → Lucerne",
      legs:[
        {train:"RE 226", depart:"08:37", arrive:"09:47", from:"Zermatt", to:"Visp", stops:["Zermatt","Täsch","Randa","Herbriggen","St. Niklaus","Kalpetran","Stalden-Saas","Visp"]},
        {train:"IC 817", depart:"10:54", arrive:"11:53", from:"Visp", to:"Bern", stops:["Visp","Spiez","Thun","Bern"]},
        {train:"RE 4371", depart:"12:36", arrive:"14:03", from:"Bern", to:"Luzern", stops:["Bern","Konolfingen","Langnau i.E.","Trubschachen","Escholzmatt","Schüpfheim","Wolhusen","Malters","Luzern"]}
      ],
      transfers:[
        {station:"Visp", arrive:"09:47", depart:"10:54", minutes:67, nextTrain:"IC 817", toward:"Bern", map:"https://www.sbb.ch/en/travel-information/stations/find-station/visp-station.html"},
        {station:"Bern", arrive:"11:53", depart:"12:36", minutes:43, nextTrain:"RE 4371", toward:"Luzern", map:"https://www.sbb.ch/en/travel-information/stations/find-station/bern-station.html"}
      ],
      note:"Eurail shows seat reservations optional on the Visp → Bern segment."
    },
    {
      id:"rail-oct5", date:"Oct 5", title:"Lucerne → Zurich",
      legs:[
        {train:"TRN / IR70 2616", depart:"09:09", arrive:"09:51", from:"Luzern", to:"Zürich HB", stops:["Luzern","Zug","Zürich HB"]}
      ], transfers:[], note:"Direct train; no transfer."
    },
    {
      id:"rail-oct6", date:"Oct 6", title:"Zurich HB → Zurich Airport",
      legs:[
        {train:"IC 513", depart:"10:02", arrive:"10:11", from:"Zürich HB", to:"Zürich Flughafen", stops:["Zürich HB","Zürich Flughafen"]}
      ], transfers:[], note:"Direct airport train; Eurail shows seat reservations optional."
    }
  ];

  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const urgency=m=>m>=45?"RELAXED":m>=25?"NORMAL":"MOVE DIRECTLY";
  const routeLine=stops=>stops.map((s,i)=>i===0||i===stops.length-1?`<strong>${esc(s)}</strong>`:`(${esc(s)})`).join(' <span class="tee-rail-arrow">→</span> ');
  const injectStyles=()=>{
    if(document.getElementById('teeRail3513Styles'))return;
    const s=document.createElement('style');s.id='teeRail3513Styles';s.textContent=`
      #teeRailReference{margin:0 0 24px}.tee-rail-reference-head{background:#fff;border:1px solid #d8e9ef;border-radius:18px;padding:16px;margin-bottom:14px;box-shadow:0 2px 12px rgba(0,0,0,.06)}
      .tee-rail-day{background:#fff;border:1px solid #d8e9ef;border-radius:18px;padding:16px;margin:0 0 16px;box-shadow:0 3px 16px rgba(0,0,0,.07);scroll-margin-top:18px}.tee-rail-day h3{margin:0;color:#17384f;font-size:1.35rem}.tee-rail-date{font-weight:850;color:#53656d;text-transform:uppercase;letter-spacing:.06em;font-size:.78rem}.tee-rail-glance{background:#eef7fa;border:1px solid #cfe1e8;border-radius:14px;padding:13px;margin:12px 0}.tee-rail-glance h4,.tee-rail-map h4{margin:0 0 8px;color:#17384f}.tee-rail-line{font-size:1rem;line-height:1.8}.tee-rail-line strong{font-weight:900;color:#102f41}.tee-rail-arrow{color:#607078;padding:0 2px}.tee-transfer{border-left:6px solid #8a642d;background:#fbf5e7;border-radius:12px;padding:12px 13px;margin:10px 0}.tee-transfer-title{font-weight:900;color:#6d4d1f}.tee-transfer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 14px;margin-top:7px}.tee-transfer-urgency{display:inline-block;border-radius:999px;padding:4px 8px;background:#fff;border:1px solid #d7c39e;font-size:.76rem;font-weight:900}.tee-rail-leg{border-top:1px solid #e3ecef;padding-top:13px;margin-top:13px}.tee-rail-leg-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.tee-rail-leg-head strong{color:#17384f}.tee-rail-actions{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.tee-rail-actions a{display:inline-block;text-decoration:none;border-radius:999px;padding:9px 11px;font-weight:850;background:#17384f;color:#fff}.tee-rail-actions a.secondary{background:#eef7fa;color:#17384f;border:1px solid #bdd6df}.tee-rail-map{margin:14px 0;padding:13px;background:#f8fafb;border:1px solid #dfe8ec;border-radius:14px}.tee-map-track{display:flex;gap:0;overflow-x:auto;padding:8px 3px 14px}.tee-map-stop{min-width:112px;position:relative;padding-top:25px;text-align:center;font-size:.79rem}.tee-map-stop:before{content:'';position:absolute;top:6px;left:50%;width:12px;height:12px;border:3px solid #30677a;background:#fff;border-radius:50%;transform:translateX(-50%);z-index:2}.tee-map-stop:after{content:'';position:absolute;top:11px;left:50%;width:100%;height:3px;background:#a9c7d2;z-index:1}.tee-map-stop:last-child:after{display:none}.tee-map-stop.major{font-weight:900;color:#17384f}.tee-map-stop.major:before{width:16px;height:16px;top:4px;background:#17384f}.tee-map-note{font-size:.78rem;color:#63717b;margin:0}.tee-rail-back{display:inline-block;margin-top:8px;text-decoration:none;font-weight:850;color:#17384f}.tee-rail-note{font-size:.9rem;color:#52636a;background:#f7f9fa;border-radius:12px;padding:10px 12px}.tee-rail-live{font-size:.82rem;color:#68777d;margin-top:9px}
      @media(max-width:650px){.tee-transfer-grid{grid-template-columns:1fr}.tee-rail-day{padding:13px}.tee-rail-line{font-size:.94rem}.tee-map-stop{min-width:100px}}
    `;document.head.appendChild(s);
  };
  const transferHtml=t=>`<div class="tee-transfer"><div class="tee-transfer-title">🔄 TRANSFER — ${esc(t.station)}</div><div class="tee-transfer-grid"><span>Arrive: <strong>${esc(t.arrive)}</strong></span><span>Layover: <strong>${t.minutes} min</strong> <span class="tee-transfer-urgency">${urgency(t.minutes)}</span></span><span>Next train: <strong>${esc(t.nextTrain)}</strong></span><span>Look for: <strong>${esc(t.toward)}</strong> · departs ${esc(t.depart)}</span></div><div class="tee-rail-actions"><a class="secondary" href="${esc(t.map)}" target="_blank" rel="noopener">Open ${esc(t.station)} Station Map</a></div></div>`;
  const overallStops=d=>{const out=[];d.legs.forEach((leg,li)=>leg.stops.forEach((s,si)=>{if(li&&si===0)return;out.push(s);}));return out;};
  const mapHtml=d=>{const majors=new Set([d.legs[0].from,d.legs[d.legs.length-1].to,...d.transfers.map(t=>t.station)]);return `<div class="tee-rail-map"><h4>Route Map</h4><div class="tee-map-track">${overallStops(d).map(s=>`<div class="tee-map-stop ${majors.has(s)?'major':''}">${esc(s)}</div>`).join('')}</div><p class="tee-map-note">Schematic route map — not to scale. Bold/larger nodes are start, transfer, and destination stations.</p></div>`;};
  const glanceHtml=d=>{let out='';d.legs.forEach((leg,i)=>{if(i){const t=d.transfers[i-1];out+=transferHtml(t);}out+=`<div class="tee-rail-line">${routeLine(leg.stops)}</div>`;});return `<div class="tee-rail-glance"><h4>At a Glance</h4>${out}</div>`;};
  const detailHtml=d=>d.legs.map((leg,i)=>`${i?transferHtml(d.transfers[i-1]):''}<div class="tee-rail-leg"><div class="tee-rail-leg-head"><strong>${esc(leg.train)} · ${esc(leg.from)} → ${esc(leg.to)}</strong><span>${esc(leg.depart)} → ${esc(leg.arrive)}</span></div><p class="tee-rail-line">${routeLine(leg.stops)}</p></div>`).join('');
  function render(){
    injectStyles();
    const transport=document.getElementById('transportMount');if(!transport)return;
    const section=document.createElement('section');section.id='teeRailReference';
    section.innerHTML=`<div class="tee-rail-reference-head"><span class="tee-rail-date">PART 2 RAIL</span><h2 style="margin:.2rem 0 .45rem">Rail Routes, Transfers & Maps</h2><p style="margin:0">Use the At-a-Glance line while riding. Open the full details before or during a transfer for the next train, layover time, and station map.</p></div>${DAYS.map(d=>`<article id="${d.id}" class="tee-rail-day"><span class="tee-rail-date">${esc(d.date)}</span><h3>${esc(d.title)}</h3>${glanceHtml(d)}${mapHtml(d)}<div class="tee-rail-details"><h4 style="margin:14px 0 6px">Full Details</h4>${detailHtml(d)}</div><p class="tee-rail-note">${esc(d.note)}</p><p class="tee-rail-live">Day-of rule: confirm the live departure board / Rail Planner before each transfer; platforms can change.</p><a class="tee-rail-back" href="../travel-daily-operations/index.html#daily-context">← Back to Today Quick Glance</a></article>`).join('')}`;
    transport.parentNode.insertBefore(section,transport);
    const hash=location.hash;if(hash&&/^#rail-/.test(hash)){requestAnimationFrame(()=>document.querySelector(hash)?.scrollIntoView({behavior:'smooth',block:'start'}));}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
