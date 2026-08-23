"use strict";
(function(){
  const stem="traveler-source-flow-v3415", count=8, build="3.4.19-hotfix2";

  function statusNode(){ return document.getElementById("streamlinedSourceStatus"); }
  function showRetry(message){
    const status=statusNode();
    if(!status)return;
    status.innerHTML="<div style=\"border:3px solid #b42318;background:#fff1f0;color:#7a271a;border-radius:14px;padding:14px;font-weight:700\">🔴 CANNOT CONTINUE — Add Document did not load.<br><span style=\"font-weight:600\">Next step: tap Retry Add Document.</span><br><button id=\"teeRetryAddDocumentV3419\" type=\"button\" style=\"margin-top:10px;padding:10px 14px;font-weight:700\">Retry Add Document</button></div>";
    document.getElementById("teeRetryAddDocumentV3419")?.addEventListener("click",()=>boot(),{once:true});
    console.error("TEE traveler loader:",message);
  }
  function extractChunk(text,index){
    const marker='.push(';
    const start=text.indexOf(marker);
    const end=text.lastIndexOf(');');
    if(start<0||end<0||end<=start+marker.length)throw new Error('Runtime part '+index+' is malformed.');
    return JSON.parse(text.slice(start+marker.length,end).trim());
  }
  async function loadPart(index){
    const url=stem+'.part'+String(index).padStart(2,'0')+'.js?v='+encodeURIComponent(build)+'&t='+Date.now();
    const response=await fetch(url,{cache:'no-store'});
    if(!response.ok)throw new Error('Runtime part '+index+' returned HTTP '+response.status+'.');
    return extractChunk(await response.text(),index);
  }
  async function boot(){
    try{
      const chunks=await Promise.all(Array.from({length:count},(_,i)=>loadPart(i+1)));
      const source=chunks.join('');
      const script=document.createElement('script');
      script.type='text/javascript';
      script.dataset.teeTravelerRuntime='direct';
      script.textContent=source+'\n//# sourceURL=traveler-source-flow-v3415-runtime.js';
      document.head.appendChild(script);
      if(!document.getElementById('teeTravelerSimpleAddV3404'))throw new Error('Traveler Add Document UI did not initialize.');
      document.dispatchEvent(new CustomEvent('tee-runtime-ready',{detail:{stem,build,loader:'no-eval'}}));
    }catch(error){showRetry(error?.message||String(error));}
  }
  boot();
})();
