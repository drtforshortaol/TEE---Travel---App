"use strict";
(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function install(){
    document.querySelectorAll('.tee-transfer').forEach((card,i)=>{
      if(card.querySelector('.tee-offline-transfer-guide'))return;
      const title=(card.querySelector('.tee-transfer-title')?.textContent||'Station transfer').replace(/^🔄\s*TRANSFER\s*—\s*/i,'').trim();
      const details=card.querySelector('.tee-transfer-grid')?.innerText||'';
      const wrap=document.createElement('details');
      wrap.className='tee-offline-transfer-guide';
      wrap.innerHTML=`<summary>Offline ${esc(title)} transfer map</summary><div class="tee-offline-transfer-map" role="img" aria-label="Offline schematic transfer guide for ${esc(title)}"><div class="tee-offline-node"><strong>1</strong><span>Arrive at ${esc(title)}</span></div><div class="tee-offline-arrow">→</div><div class="tee-offline-node"><strong>2</strong><span>Check station departure board</span></div><div class="tee-offline-arrow">→</div><div class="tee-offline-node"><strong>3</strong><span>Follow signs to the next platform</span></div><div class="tee-offline-arrow">→</div><div class="tee-offline-node"><strong>4</strong><span>Match train + destination before boarding</span></div></div><p class="tee-offline-transfer-copy">${esc(details)}</p><p class="tee-map-note"><strong>Works offline.</strong> This is a TEE schematic transfer guide, not a station floor plan. Platform assignments can change; when online, use the live station map/departure board as the final check.</p>`;
      card.appendChild(wrap);
    });
  }
  const css=document.createElement('style');css.textContent='.tee-offline-transfer-guide{margin-top:10px;border:1px solid #c9dce3;border-radius:12px;background:#f6fbfc;padding:9px 11px}.tee-offline-transfer-guide summary{cursor:pointer;font-weight:900;color:#17384f}.tee-offline-transfer-map{display:flex;align-items:stretch;gap:7px;overflow-x:auto;padding:12px 0}.tee-offline-node{min-width:145px;display:flex;flex-direction:column;gap:6px;align-items:center;justify-content:center;text-align:center;background:white;border:1px solid #bdd6df;border-radius:12px;padding:10px}.tee-offline-node strong{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#17384f;color:white}.tee-offline-arrow{display:flex;align-items:center;font-weight:900;color:#6d7b82}.tee-offline-transfer-copy{white-space:pre-line;font-size:.86rem;color:#44575f;background:white;border-radius:10px;padding:9px}.tee-offline-transfer-guide .tee-map-note{margin:.35rem 0 0}';document.head.appendChild(css);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0),{once:true});else setTimeout(install,0);
})();
