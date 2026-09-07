"use strict";
(() => {
  const TARGET='Oct 2, 2026';
  function styles(){if(document.getElementById('teePaper3521Styles'))return;const s=document.createElement('style');s.id='teePaper3521Styles';s.textContent=`.tee-paper-warning{margin:14px 18px 20px;background:#fff8e8;border:3px solid #b78128;border-radius:18px;padding:15px;box-shadow:0 3px 14px rgba(0,0,0,.07)}.tee-paper-warning h3{margin:.15rem 0 .7rem;color:#674818;font-size:1.28rem}.tee-paper-kicker{font-size:.74rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#79591f}.tee-paper-step{background:#fff;border:1px solid #e6cf9e;border-radius:13px;padding:11px 12px;margin:9px 0}.tee-paper-critical{background:#fff1e8;border:2px solid #c96d42;border-radius:13px;padding:11px 12px;margin:9px 0}.tee-paper-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:11px}.tee-paper-actions a{display:inline-block;text-decoration:none;border-radius:999px;padding:9px 12px;font-weight:850;background:#174d5a;color:#fff}.tee-paper-small{font-size:.8rem;color:#6d624e;margin:.7rem 0 0}@media(max-width:600px){.tee-paper-warning{margin:12px 16px 18px;padding:13px}}`;document.head.appendChild(s);}
  function dates(){try{return {today:DAYS?.[activeIndex]?.date||'',tomorrow:DAYS?.[Math.min(activeIndex+1,DAYS.length-1)]?.date||''};}catch{return {today:'',tomorrow:''};}}
  function today(){return `<span class="tee-paper-kicker">OCT. 2 · REQUIRED PAPER RESERVATION</span><h3>Salzburg → Zürich: carry the original paper reservations</h3><div class="tee-paper-critical"><strong>Before leaving H+ Salzburg:</strong> physically confirm that all <strong>4 original paper seat-reservation tickets</strong> for Salzburg Hbf → Zürich HB are in the travel document packet.</div><div class="tee-paper-step"><strong>On the train:</strong> keep the paper reservations together with the active Eurail Pass/day ticket in the Rail Planner app. The reservation-confirmation email by itself is not enough.</div><div class="tee-paper-step"><strong>Do not substitute a screenshot.</strong> These were issued by Eurail as <strong>4x PaperTicket</strong> reservations and mailed as physical reservation tickets.</div><div class="tee-paper-step"><strong>Zürich → Visp is different:</strong> that reservation was issued electronically. Keep the electronic reservation accessible, but the paper warning applies specifically to the Salzburg → Zürich leg.</div><div class="tee-paper-actions"><a href="../travel-transportation/index.html#rail-oct2">Open Full Oct. 2 Rail Details</a><a href="../travel-essentials/eurail-pass-help.html">Open Eurail Help</a></div><p class="tee-paper-small">Protected reservation identifiers are intentionally omitted here.</p>`;}
  function tomorrow(){return `<span class="tee-paper-kicker">TOMORROW · PAPER DOCUMENT CHECK</span><h3>Locate the Salzburg → Zürich paper reservations tonight</h3><div class="tee-paper-critical"><strong>Pack all 4 original paper seat-reservation tickets in the travel document packet tonight.</strong> Tomorrow's 06:56 Salzburg departure is too early to discover they are missing at the station.</div>`;}
  function mount(){styles();const d=dates();let host=document.getElementById('teePaperReservation3521');const relevant=d.today===TARGET||d.tomorrow===TARGET;if(!relevant){host?.remove();return;}if(!host){host=document.createElement('section');host.id='teePaperReservation3521';host.className='tee-paper-warning';const anchor=document.getElementById('teeRailTodayGlance')||document.getElementById('trip-day-context');anchor?.insertAdjacentElement('afterend',host);}host.innerHTML=d.today===TARGET?today():tomorrow();}
  function start(){mount();document.getElementById('previewDateSelect')?.addEventListener('change',()=>setTimeout(mount,20));document.getElementById('useActualDateBtn')?.addEventListener('click',()=>setTimeout(mount,20));setTimeout(mount,300);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();

// iPhone/PWA scroll-stability guard. During a downward finger gesture, reject only large
// spontaneous upward jumps; normal upward scrolling and deliberate navigation still work.
(() => {
  let lastY=window.scrollY||0, floorY=lastY, fingerY=null, downUntil=0, restoring=false;
  const clock=()=>performance.now();
  const markDown=()=>{downUntil=clock()+1000;};
  addEventListener('touchstart',e=>{fingerY=e.touches?.[0]?.clientY??null;floorY=Math.max(floorY,window.scrollY||0);},{passive:true});
  addEventListener('touchmove',e=>{const y=e.touches?.[0]?.clientY??null;if(fingerY!=null&&y!=null){if(y<fingerY-2)markDown();else if(y>fingerY+6)downUntil=0;fingerY=y;}},{passive:true});
  addEventListener('touchend',()=>{fingerY=null;},{passive:true});
  addEventListener('wheel',e=>{if(e.deltaY>0)markDown();else if(e.deltaY<0)downUntil=0;},{passive:true});
  addEventListener('scroll',()=>{
    if(restoring)return;
    const y=window.scrollY||0;
    if(y>=lastY)floorY=Math.max(floorY,y);
    if(clock()<downUntil&&floorY>500&&y<floorY-140){
      restoring=true;
      requestAnimationFrame(()=>{window.scrollTo(0,floorY);lastY=floorY;restoring=false;});
      return;
    }
    if(clock()>=downUntil&&y<lastY-20)floorY=y;
    lastY=y;
  },{passive:true});
  addEventListener('pageshow',()=>{lastY=window.scrollY||0;floorY=lastY;downUntil=0;});
})();
