"use strict";
(function(){
  const stem="traveler-source-flow-v3415", count=8, build="3.4.19";
  let i=1;

  function statusNode(){ return document.getElementById("streamlinedSourceStatus"); }

  function showRetry(message){
    const status=statusNode();
    if(!status)return;
    status.innerHTML="<div style=\"border:3px solid #b42318;background:#fff1f0;color:#7a271a;border-radius:14px;padding:14px;font-weight:700\">🔴 CANNOT CONTINUE — Add Document did not load.<br><span style=\"font-weight:600\">Next step: tap Retry Add Document.</span><br><button id=\"teeRetryAddDocumentV3419\" type=\"button\" style=\"margin-top:10px;padding:10px 14px;font-weight:700\">Retry Add Document</button></div>";
    document.getElementById("teeRetryAddDocumentV3419")?.addEventListener("click",()=>boot(true),{once:true});
    console.error("TEE traveler loader:",message);
  }

  function fail(message){
    const detail={stem,part:i,message:String(message||"Traveler Source Documents runtime failed to load")};
    showRetry(detail.message);
    document.dispatchEvent(new CustomEvent("tee-runtime-error",{detail}));
  }

  function next(){
    if(i>count){
      try{
        (0,eval)(window.__TEE_PARTS__[stem].join(""));
        document.dispatchEvent(new CustomEvent("tee-runtime-ready",{detail:{stem,build}}));
      }catch(e){ fail(e?.message||e); }
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

  function boot(retry){
    if(retry){
      document.querySelectorAll("script[data-tee-traveler-runtime-part]").forEach(el=>el.remove());
    }
    window.__TEE_PARTS__=window.__TEE_PARTS__||{};
    window.__TEE_PARTS__[stem]=[];
    i=1;
    next();
  }

  boot(false);
})();
