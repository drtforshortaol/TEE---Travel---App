"use strict";
(function(){
  function ensureItineraryType(){
    const select=document.getElementById('teeV3404Type');
    if(!select)return false;
    if(!Array.from(select.options).some(option=>option.value==='Itinerary')){
      const option=document.createElement('option');
      option.value='Itinerary';
      option.textContent='Official itinerary / trip schedule';
      const other=Array.from(select.options).find(item=>item.value==='Other');
      select.insertBefore(option,other||null);
    }
    return true;
  }
  function explainIfItinerary(){
    const select=document.getElementById('teeV3404Type');
    if(!select||select.value!=='Itinerary')return;
    const note=document.getElementById('teeV3409DetailNote');
    if(note)note.innerHTML='<strong>Official itinerary source.</strong> TEE retains the complete PDF as the supporting original. Use the Important note field for a short verified summary; detailed operational days belong in Master Itinerary and Daily Operations.';
  }
  document.addEventListener('tee-runtime-ready',()=>{ensureItineraryType();setTimeout(ensureItineraryType,80);});
  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target:null;
    if(!target)return;
    if(target.closest('#streamAddDocument,#teeV3404BackToAdd'))setTimeout(ensureItineraryType,80);
    if(target.closest('#teeV3404Continue'))setTimeout(explainIfItinerary,80);
  },true);
  document.addEventListener('change',event=>{
    if(event.target?.id==='teeV3404Type')setTimeout(explainIfItinerary,0);
  });
  ensureItineraryType();
})();
