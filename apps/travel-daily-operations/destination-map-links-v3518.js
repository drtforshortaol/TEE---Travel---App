"use strict";
(() => {
  const ZERMATT_DATES = new Set(['Oct 2, 2026','Oct 3, 2026','Oct 4, 2026']);
  const TOMORROW_ZERMATT = new Set(['Oct 1, 2026']);
  const mapHref = '../travel-maps-movement/index.html#zermatt';
  const styles = () => {
    if (document.getElementById('teeDestinationMapLinks3518Styles')) return;
    const s = document.createElement('style');
    s.id = 'teeDestinationMapLinks3518Styles';
    s.textContent = `.tee-today-map-link{margin:10px 18px 2px}.tee-today-map-link a{display:block;text-align:center;text-decoration:none;background:#355f50;color:#fff;border-radius:999px;padding:11px 14px;font-weight:900;box-shadow:0 3px 12px rgba(0,0,0,.08)}.tee-today-map-link small{display:block;text-align:center;color:#607078;margin-top:6px}.tee-tomorrow-map-link{margin-top:8px}.tee-tomorrow-map-link a{display:inline-block;text-decoration:none;background:#6f6b2d;color:#fff;border-radius:999px;padding:8px 11px;font-weight:850}@media(max-width:600px){.tee-today-map-link{margin:10px 16px 2px}}`;
    document.head.appendChild(s);
  };
  function dates(){
    try{return {today:DAYS?.[activeIndex]?.date||'',tomorrow:DAYS?.[Math.min(activeIndex+1,DAYS.length-1)]?.date||''};}
    catch{return {today:'',tomorrow:''};}
  }
  function mount(){
    styles();
    const strip=document.getElementById('trip-day-context');
    if(!strip)return;
    const d=dates();
    let today=document.getElementById('teeTodayMapLink3518');
    if(ZERMATT_DATES.has(d.today)){
      if(!today){today=document.createElement('section');today.id='teeTodayMapLink3518';today.className='tee-today-map-link';strip.insertAdjacentElement('afterend',today);}
      today.innerHTML=`<a href="${mapHref}">Open Today’s Zermatt Maps →</a><small>Essential route · dinner · free e-bus</small>`;
    }else today?.remove();

    let tomorrow=document.getElementById('teeTomorrowMapLink3518');
    const tomorrowFocus=document.getElementById('tomorrow-focus');
    if(TOMORROW_ZERMATT.has(d.today)&&tomorrowFocus){
      if(!tomorrow){tomorrow=document.createElement('div');tomorrow.id='teeTomorrowMapLink3518';tomorrow.className='tee-tomorrow-map-link';tomorrowFocus.appendChild(tomorrow);}
      tomorrow.innerHTML=`<a href="${mapHref}">Preview Zermatt Maps →</a>`;
    }else tomorrow?.remove();
  }
  function start(){mount();document.getElementById('previewDateSelect')?.addEventListener('change',()=>setTimeout(mount,30));document.getElementById('useActualDateBtn')?.addEventListener('click',()=>setTimeout(mount,30));setTimeout(mount,300);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
