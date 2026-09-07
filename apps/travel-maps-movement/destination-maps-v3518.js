"use strict";
(() => {
  const host = document.getElementById('destinationMapLibrary');
  if (!host) return;

  const svgShell = (title, subtitle, body) => `
    <div class="tee-map-frame" role="img" aria-label="${title}">
      <svg viewBox="0 0 800 960" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="800" height="960" rx="28" fill="#eef6f8"/>
        <path d="M0 650 C160 600 240 690 390 620 S670 570 800 600 V960 H0Z" fill="#e7f0e4"/>
        <path d="M150 0 L245 105 L305 48 L390 148 L458 85 L570 195" fill="none" stroke="#b89448" stroke-width="8" opacity=".8"/>
        <text x="40" y="72" font-size="34" font-weight="800" fill="#15364c">${title}</text>
        <text x="40" y="112" font-size="19" font-weight="650" fill="#54666e">${subtitle}</text>
        ${body}
        <text x="40" y="925" font-size="15" fill="#66777e">Schematic traveler map — use live local maps for turn-by-turn navigation.</text>
      </svg>
    </div>`;

  const essentials = svgShell('Zermatt Essentials Map','Bahnhof → Haus Juliana → Matterhorn Glacier Paradise valley station',`
    <path d="M135 795 C225 700 280 600 335 500 S470 390 565 345 S650 285 690 235" fill="none" stroke="#1f5d88" stroke-width="14" stroke-linecap="round" stroke-dasharray="18 13"/>
    <path d="M575 350 C620 330 655 300 690 235" fill="none" stroke="#3d9664" stroke-width="11" stroke-linecap="round" stroke-dasharray="10 10"/>
    <path d="M270 170 C240 310 250 460 215 620 S180 800 150 880" fill="none" stroke="#8fd3ec" stroke-width="55" opacity=".85"/>
    <text x="185" y="520" font-size="18" fill="#2e84a8" transform="rotate(-78 185 520)">Vispa</text>
    <g fill="#15364c"><circle cx="135" cy="795" r="22"/><circle cx="575" cy="350" r="22"/><circle cx="690" cy="235" r="22"/></g>
    <rect x="40" y="720" width="250" height="90" rx="18" fill="#fff7e7" stroke="#b89448" stroke-width="3"/><text x="62" y="758" font-size="25" font-weight="800" fill="#15364c">Zermatt Bahnhof</text><text x="62" y="790" font-size="18" fill="#54666e">Rail arrival / e-bus start</text>
    <rect x="445" y="305" width="250" height="90" rx="18" fill="#fff7e7" stroke="#b89448" stroke-width="3"/><text x="465" y="343" font-size="25" font-weight="800" fill="#15364c">Haus Juliana</text><text x="465" y="375" font-size="18" fill="#54666e">Very close to valley station</text>
    <rect x="465" y="155" width="300" height="96" rx="18" fill="#fff7e7" stroke="#b89448" stroke-width="3"/><text x="485" y="193" font-size="23" font-weight="800" fill="#15364c">Matterhorn Glacier Paradise</text><text x="485" y="224" font-size="18" fill="#54666e">Valley station</text>
    <rect x="56" y="155" width="280" height="165" rx="18" fill="#ffffff" stroke="#cbd9dd" stroke-width="2"/><text x="78" y="192" font-size="21" font-weight="800" fill="#15364c">Quick orientation</text><text x="78" y="230" font-size="18" fill="#34464e">Station → Haus Juliana</text><text x="78" y="258" font-size="18" font-weight="800" fill="#15364c">about 15 min walk</text><text x="78" y="292" font-size="18" fill="#34464e">Haus → valley station</text><text x="78" y="318" font-size="18" font-weight="800" fill="#15364c">about 1–3 min walk</text>
  `);

  const dinner = svgShell('Zermatt Dinner Map','Haus Juliana → central Zermatt dinner zone',`
    <path d="M275 210 C255 350 260 510 230 705" fill="none" stroke="#8fd3ec" stroke-width="55" opacity=".85"/>
    <path d="M575 720 C520 650 465 600 420 550 S370 470 410 410" fill="none" stroke="#a07725" stroke-width="13" stroke-dasharray="12 10"/>
    <circle cx="575" cy="720" r="22" fill="#8c6a24"/><rect x="450" y="675" width="300" height="92" rx="18" fill="#fff7e7" stroke="#b89448" stroke-width="3"/><text x="470" y="712" font-size="25" font-weight="800" fill="#15364c">Haus Juliana</text><text x="470" y="744" font-size="18" fill="#54666e">Walk toward village center</text>
    <rect x="55" y="145" width="320" height="120" rx="18" fill="#f2f7e9" stroke="#c7d8b0" stroke-width="2"/><text x="80" y="190" font-size="24" font-weight="800" fill="#15364c">Dinner zone</text><text x="80" y="226" font-size="19" fill="#34464e">Most choices are an easy</text><text x="80" y="253" font-size="19" fill="#34464e">walk into central Zermatt.</text>
    <g font-size="18" fill="#15364c"><circle cx="420" cy="535" r="22" fill="#b89448"/><text x="414" y="542" font-weight="800" fill="white">1</text><text x="452" y="542" font-weight="800">Brown Cow Pub · Bahnhofstrasse 41</text><circle cx="430" cy="470" r="22" fill="#b89448"/><text x="424" y="477" font-weight="800" fill="white">2</text><text x="462" y="477" font-weight="800">saycheese! · Bahnhofstrasse 55</text><circle cx="440" cy="405" r="22" fill="#b89448"/><text x="434" y="412" font-weight="800" fill="white">3</text><text x="472" y="412" font-weight="800">Whymper Stube · Bahnhofstrasse 84</text><circle cx="505" cy="590" r="22" fill="#b89448"/><text x="499" y="597" font-weight="800" fill="white">4</text><text x="537" y="597" font-weight="800">CESI · Kirchstrasse 17</text></g>
    <rect x="70" y="600" width="270" height="165" rx="18" fill="#ffffff" stroke="#cbd9dd" stroke-width="2"/><text x="92" y="640" font-size="21" font-weight="800" fill="#15364c">Good dinner zone</text><text x="92" y="678" font-size="18" fill="#34464e">Bahnhofstrasse /</text><text x="92" y="705" font-size="18" fill="#34464e">old village core</text><text x="92" y="742" font-size="18" font-weight="800" fill="#15364c">~8–15 min from Haus Juliana</text>
  `);

  const ebus = svgShell('Zermatt Free E-Bus Route Map','Bahnhof → Haus Juliana → Matterhorn Glacier Paradise',`
    <rect x="520" y="135" width="230" height="60" rx="24" fill="#278b4f"/><text x="550" y="173" font-size="23" font-weight="800" fill="white">FREE e-bus · no ticket</text>
    <path d="M125 800 C190 715 245 635 285 555 S380 445 455 390 S560 325 660 245" fill="none" stroke="#c53b31" stroke-width="15" stroke-linecap="round"/>
    <g fill="#c53b31">${[[125,800],[185,718],[240,635],[285,555],[345,485],[410,430],[475,380],[535,335],[600,290],[660,245]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="13"/>`).join('')}</g>
    <text x="105" y="842" font-size="20" font-weight="800" fill="#15364c">Bahnhof</text><text x="165" y="705" font-size="18" fill="#15364c">Spiss</text><text x="220" y="623" font-size="18" fill="#15364c">Vispa</text><text x="260" y="543" font-size="18" fill="#15364c">Kirchbrücke</text><text x="325" y="473" font-size="18" fill="#15364c">Luchre</text><text x="390" y="418" font-size="18" fill="#15364c">Wiestiboden</text><text x="455" y="368" font-size="18" fill="#15364c">Kapelle</text><text x="535" y="323" font-size="18" fill="#15364c">Wichje</text><text x="585" y="278" font-size="18" fill="#15364c">Schluematta</text>
    <rect x="430" y="650" width="320" height="150" rx="18" fill="#fff7e7" stroke="#b89448" stroke-width="3"/><text x="452" y="690" font-size="22" font-weight="800" fill="#15364c">Best stop for Haus Juliana</text><text x="452" y="726" font-size="20" font-weight="800" fill="#278b4f">Matterhorn Glacier Paradise</text><text x="452" y="760" font-size="18" fill="#34464e">about 1–3 min walk to lodging</text>
    <rect x="45" y="145" width="350" height="140" rx="18" fill="#ffffff" stroke="#cbd9dd" stroke-width="2"/><text x="68" y="184" font-size="21" font-weight="800" fill="#15364c">Return toward Bahnhof</text><text x="68" y="220" font-size="17" fill="#34464e">Matterhorn Glacier Paradise → Kirchbrücke →</text><text x="68" y="247" font-size="17" fill="#34464e">Brücke zum Steg → Getwing/Sunnegga → Bahnhof</text><text x="68" y="273" font-size="16" fill="#66777e">Use Matterhorn app / e-bus.ch for live departures.</text>
  `);

  const zermatt = `
    <details class="tee-destination-map-group" id="zermatt" open>
      <summary><span><strong>Zermatt</strong><small>3 traveler maps ready</small></span><span class="tee-map-state">Open</span></summary>
      <div class="tee-destination-map-body">
        <div class="tee-map-nav"><a href="#zermatt-essentials">Essential Route</a><a href="#zermatt-dinner">Dinner</a><a href="#zermatt-ebus">E-Bus</a><a href="../travel-daily-operations/index.html#teeRailTodayGlance">← Back to Today</a></div>
        <article class="tee-destination-map-card" id="zermatt-essentials"><div class="tee-map-card-head"><div><h3>Essential Route Map</h3><p>Railway station → Haus Juliana → Matterhorn Glacier Paradise valley station.</p></div><a href="#zermatt">Back to Zermatt maps</a></div>${essentials}</article>
        <article class="tee-destination-map-card" id="zermatt-dinner"><div class="tee-map-card-head"><div><h3>Dinner Map</h3><p>Haus Juliana to the central Zermatt dinner zone and four easy-reference choices.</p></div><a href="#zermatt">Back to Zermatt maps</a></div>${dinner}</article>
        <article class="tee-destination-map-card" id="zermatt-ebus"><div class="tee-map-card-head"><div><h3>Free E-Bus Route Map</h3><p>Bahnhof to the Matterhorn Glacier Paradise stop, then the short walk to Haus Juliana.</p></div><a href="#zermatt">Back to Zermatt maps</a></div>${ebus}</article>
      </div>
    </details>`;

  const placeholders = ['Istanbul','Cappadocia','Zagreb','Plitvice Lakes','Rovinj','Ljubljana','Salzburg','Lucerne','Zurich'].map(name => `
    <details class="tee-destination-map-group tee-map-placeholder">
      <summary><span><strong>${name}</strong><small>Destination map set planned</small></span><span class="tee-map-state">Later</span></summary>
      <div class="tee-destination-map-body"><p>Reserved for city orientation, lodging/transport arrival, dining, and local-transit maps as they are built.</p></div>
    </details>`).join('');

  host.innerHTML = `<div class="tee-map-library-head"><span class="eyebrow-mini">DESTINATION MAP LIBRARY</span><h2>Maps by destination</h2><p>Open only the destination you need. Zermatt is complete; the same structure is ready for the remaining trip cities.</p></div>${zermatt}${placeholders}`;

  host.querySelectorAll('.tee-destination-map-group').forEach(d => d.addEventListener('toggle', () => {
    const state = d.querySelector('.tee-map-state');
    if (state && !d.classList.contains('tee-map-placeholder')) state.textContent = d.open ? 'Collapse' : 'Open';
  }));
})();
