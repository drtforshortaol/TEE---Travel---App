"use strict";
(function(){
  const stem="traveler-source-flow-v3415", count=8, build="3.4.20";
  const buildLabel=document.querySelector('header.hero .subtitle strong');
  if(buildLabel)buildLabel.textContent='TEE v3.4.20';

  function statusNode(){ return document.getElementById("streamlinedSourceStatus"); }
  function showRetry(message){
    const status=statusNode();
    if(!status)return;
    const safe=String(message||'Unknown loader error').replace(/[&<>\"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[ch]||ch));
    status.innerHTML="<div style=\"border:3px solid #b42318;background:#fff1f0;color:#7a271a;border-radius:14px;padding:14px;font-weight:700\">🔴 CANNOT CONTINUE — Add Document did not load.<br><span style=\"font-weight:600\">Next step: tap Retry Add Document.</span><br><button id=\"teeRetryAddDocumentV3420\" type=\"button\" style=\"margin-top:10px;padding:10px 14px;font-weight:700\">Retry Add Document</button><details style=\"margin-top:10px;font-weight:500\"><summary>Technical detail</summary><div style=\"margin-top:6px;overflow-wrap:anywhere\">"+safe+"</div></details></div>";
    document.getElementById("teeRetryAddDocumentV3420")?.addEventListener("click",()=>boot(),{once:true});
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
    const response=await fetch(url,{cache:'no-store',credentials:'same-origin'});
    if(!response.ok)throw new Error('Runtime part '+index+' returned HTTP '+response.status+'.');
    return extractChunk(await response.text(),index);
  }
  async function boot(){
    try{
      const chunks=[];
      for(let i=1;i<=count;i++)chunks.push(await loadPart(i));
      const source=chunks.join('');
      const script=document.createElement('script');
      script.type='text/javascript';
      script.dataset.teeTravelerRuntime='direct';
      script.textContent=source+'\n//# sourceURL=traveler-source-flow-v3415-runtime.js';
      document.head.appendChild(script);
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      if(!document.getElementById('teeTravelerSimpleAddV3404'))throw new Error('Traveler Add Document UI did not initialize after runtime execution.');
      document.dispatchEvent(new CustomEvent('tee-runtime-ready',{detail:{stem,build,loader:'sequential-no-eval'}}));
    }catch(error){showRetry(error?.message||String(error));}
  }
  boot();
})();
