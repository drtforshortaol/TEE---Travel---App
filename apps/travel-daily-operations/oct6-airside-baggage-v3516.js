"use strict";
(() => {
  const TARGET_DATE = "Oct 6, 2026";
  const PREVIEW_DATE = "Oct 5, 2026";
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function styles(){
    if(document.getElementById('teeOct6Airside3516Styles'))return;
    const s=document.createElement('style');
    s.id='teeOct6Airside3516Styles';
    s.textContent=`
      .tee-oct6-decision{margin:14px 18px 20px;background:#fff8e8;border:3px solid #b47a1f;border-radius:18px;padding:15px;box-shadow:0 3px 14px rgba(0,0,0,.07)}
      .tee-oct6-decision h3{margin:2px 0 8px;color:#5f4218;font-size:1.28rem}.tee-oct6-kicker{display:block;font-size:.75rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#775925}.tee-oct6-question{font-size:1.08rem;font-weight:900;color:#2e3437;margin:10px 0}.tee-oct6-step{background:#fff;border:1px solid #e2c98f;border-radius:13px;padding:11px 12px;margin:9px 0}.tee-oct6-step strong{color:#17384f}.tee-oct6-branch{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:10px 0}.tee-oct6-go,.tee-oct6-stop{border-radius:13px;padding:11px 12px}.tee-oct6-go{background:#edf7ef;border:2px solid #6f9a79}.tee-oct6-stop{background:#fff0ed;border:2px solid #b46052}.tee-oct6-go strong,.tee-oct6-stop strong{display:block;margin-bottom:4px}.tee-oct6-airside{background:#eef7fa;border:1px solid #bfd9e2;border-radius:13px;padding:11px 12px;margin-top:10px}.tee-oct6-airside ul{margin:7px 0 0;padding-left:20px}.tee-oct6-airside li{margin:5px 0}.tee-oct6-source{font-size:.78rem;color:#6b7376;margin:9px 0 0}.tee-oct6-source a{font-weight:800;color:#174d5a}.tee-oct6-preview{margin:10px 18px 16px;padding:11px 12px;border:2px solid #d4b36d;background:#fffaf0;border-radius:14px}.tee-oct6-preview strong{color:#674817}.tee-oct6-pin{display:inline-block;background:#8a642d;color:white;border-radius:999px;padding:3px 8px;font-size:.72rem;font-weight:900;margin-bottom:5px}
      @media(max-width:600px){.tee-oct6-decision,.tee-oct6-preview{margin-left:16px;margin-right:16px}.tee-oct6-branch{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }
  function activeDate(){
    try{return DAYS?.[activeIndex]?.date||'';}catch{return '';}
  }
  function fullHtml(){
    return `<span class="tee-oct6-kicker">OCT. 6 · IMPORTANT AIRPORT DECISION</span>
      <h3>Zurich baggage check → YOTELAIR Airside</h3>
      <div class="tee-oct6-question">At ZRH check-in ask: “Are our checked bags tagged through to SFO for tomorrow?”</div>
      <div class="tee-oct6-step"><strong>1 · Do not rely only on the answer.</strong><br>Look at the printed baggage tag yourself and confirm the final destination printed on it.</div>
      <div class="tee-oct6-branch">
        <div class="tee-oct6-go"><strong>✅ BAG TAG SAYS SFO</strong>Proceed with the planned YOTELAIR Airside overnight. On arrival at IST, stay in the international transit zone.</div>
        <div class="tee-oct6-stop"><strong>⚠️ BAG TAG SAYS IST</strong>Stop and resolve this with Turkish Airlines at ZRH. Do not assume the airside-hotel plan will work if you must collect checked luggage in Istanbul.</div>
      </div>
      <div class="tee-oct6-airside"><strong>YOTELAIR Airside — after arriving from Zurich</strong><ul>
        <li><strong>Do not leave the international transit zone.</strong></li>
        <li><strong>Do not go through passport control</strong> to the Arrivals hall if continuing with the airside plan.</li>
        <li>Have your <strong>passport and valid boarding pass for the Oct. 7 international flight</strong> available.</li>
        <li>YOTELAIR is in the international Duty Free / transit area; YOTEL says to follow the Gates A and B direction.</li>
        <li>If you need to collect checked luggage, the airside route is not the correct path; get airline assistance before proceeding.</li>
      </ul></div>
      <p class="tee-oct6-source">Operational rule based on current official YOTEL/YOTELAIR Istanbul guidance. Day-of airline baggage handling remains subject to Turkish Airlines confirmation at ZRH.</p>`;
  }
  function previewHtml(){return `<span class="tee-oct6-pin">TOMORROW · IMPORTANT</span><div><strong>At ZRH check-in tomorrow:</strong> ask whether bags are tagged through to SFO, then verify the printed bag tag yourself. SFO tag → airside plan. IST tag → stop and resolve with Turkish Airlines before departure.</div>`;}
  function mount(){
    styles();
    const date=activeDate();
    document.getElementById('teeOct6Decision')?.remove();
    document.getElementById('teeOct6Preview')?.remove();
    const strip=document.getElementById('trip-day-context');if(!strip)return;
    if(date===TARGET_DATE){
      const box=document.createElement('section');box.id='teeOct6Decision';box.className='tee-oct6-decision';box.innerHTML=fullHtml();
      const rail=document.getElementById('teeRailTodayGlance');(rail||strip).insertAdjacentElement('afterend',box);
    }else if(date===PREVIEW_DATE){
      const box=document.createElement('section');box.id='teeOct6Preview';box.className='tee-oct6-preview';box.innerHTML=previewHtml();
      strip.insertAdjacentElement('afterend',box);
    }
  }
  function start(){
    mount();
    document.getElementById('previewDateSelect')?.addEventListener('change',()=>setTimeout(mount,0));
    document.getElementById('useActualDateBtn')?.addEventListener('click',()=>setTimeout(mount,0));
    setTimeout(mount,300);
    setTimeout(mount,900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
