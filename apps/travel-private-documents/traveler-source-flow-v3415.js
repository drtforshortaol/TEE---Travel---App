"use strict";
(function(){
  const stem="traveler-source-flow-v3415", count=8, build="3.4.19";
  window.__TEE_PARTS__=window.__TEE_PARTS__||{};
  window.__TEE_PARTS__[stem]=[];
  let i=1;

  function fail(message){
    const detail={stem,part:i,message:String(message||"Traveler Source Documents runtime failed to load")};
    console.error("TEE runtime load failed",detail);
    document.dispatchEvent(new CustomEvent("tee-runtime-error",{detail}));
  }

  function next(){
    if(i>count){
      try{
        (0,eval)(window.__TEE_PARTS__[stem].join(""));
        document.dispatchEvent(new CustomEvent("tee-runtime-ready",{detail:{stem,build}}));
      }catch(e){
        fail(e?.message||e);
      }
      return;
    }
    const part=i;
    const sc=document.createElement("script");
    sc.src=stem+".part"+String(part).padStart(2,"0")+".js?v="+build;
    sc.dataset.teeTravelerRuntimePart=String(part);
    sc.onload=()=>{i++;next();};
    sc.onerror=()=>fail("Traveler runtime part "+part+" could not be loaded.");
    document.head.appendChild(sc);
  }

  next();
})();
