"use strict";
(() => {
  function apply(){
    const card=document.getElementById('rail-oct4');
    if(!card || card.querySelector('[data-tee-oct4-sbb-seats]')) return;
    const note=document.createElement('div');
    note.dataset.teeOct4SbbSeats='1';
    note.className='tee-rail-note';
    note.style.marginTop='10px';
    note.innerHTML='<strong>Confirmed SBB seat reservations — Visp → Bern, Oct. 4:</strong> 1st class, Coach 3, Seats 23–26. Four individual SBB boarding passes are issued and can be added to Apple Wallet. The boarding passes display “RESERVATION IC 10817”; the working timetable route in TEE currently lists IC 817 for the 10:54 Visp → 11:53 Bern segment, so retain both labels until the live SBB departure board confirms the operating train display. Traveler-specific seat assignment and QR codes remain private.';
    const live=card.querySelector('.tee-rail-live');
    if(live) live.insertAdjacentElement('beforebegin',note); else card.appendChild(note);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0),{once:true});
  else setTimeout(apply,0);
})();
