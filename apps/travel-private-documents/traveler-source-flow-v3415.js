"use strict";
(function(){
  const stem="traveler-source-flow-v3415", count=8, build="3.4.21";
  const buildLabel=document.querySelector('header.hero .subtitle strong');
  if(buildLabel)buildLabel.textContent='TEE v3.4.21';

  function statusNode(){ return document.getElementById("streamlinedSourceStatus"); }
  function showRetry(message){
    const status=statusNode();
    if(!status)return;
    const safe=String(message||'Unknown loader error').replace(/[&<>\"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[ch]||ch));
    status.innerHTML="<div style=\"border:3px solid #b42318;background:#fff1f0;color:#7a271a;border-radius:14px;padding:14px;font-weight:700\">🔴 CANNOT CONTINUE — Add Document did not load.<br><span style=\"font-weight:600\">Next step: tap Retry Add Document.</span><br><button id=\"teeRetryAddDocumentV3421\" type=\"button\" style=\"margin-top:10px;padding:10px 14px;font-weight:700\">Retry Add Document</button><details style=\"margin-top:10px;font-weight:500\"><summary>Technical detail</summary><div style=\"margin-top:6px;overflow-wrap:anywhere\">"+safe+"</div></details></div>";
    document.getElementById("teeRetryAddDocumentV3421")?.addEventListener("click",()=>boot(),{once:true});
    console.error("TEE traveler loader:",message);
  }

  function loadPartScript(index){
    return new Promise((resolve,reject)=>{
      const sc=document.createElement('script');
      sc.src=stem+'.part'+String(index).padStart(2,'0')+'.js?v='+encodeURIComponent(build)+'&t='+Date.now()+'-'+index;
      sc.async=false;
      sc.dataset.teeRuntimePart=String(index);
      sc.onload=()=>resolve();
      sc.onerror=()=>reject(new Error('Runtime part '+index+' could not be loaded.'));
      document.head.appendChild(sc);
    });
  }

  async function boot(){
    try{
      document.querySelectorAll('script[data-tee-runtime-part]').forEach(node=>node.remove());
      window.__TEE_PARTS__=window.__TEE_PARTS__||{};
      window.__TEE_PARTS__[stem]=[];
      for(let i=1;i<=count;i++)await loadPartScript(i);
      const chunks=window.__TEE_PARTS__[stem];
      if(!Array.isArray(chunks)||chunks.length!==count)throw new Error('Traveler runtime assembled '+(Array.isArray(chunks)?chunks.length:0)+' of '+count+' required parts.');
      const source=chunks.join('');
      if(!source.trim())throw new Error('Traveler runtime was empty after loading.');
      document.querySelectorAll('script[data-tee-traveler-runtime="direct"]').forEach(node=>node.remove());
      const script=document.createElement('script');
      script.type='text/javascript';
      script.dataset.teeTravelerRuntime='direct';
      script.textContent=source+'\n//# sourceURL=traveler-source-flow-v3415-runtime.js';
      document.head.appendChild(script);
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      if(!document.getElementById('teeTravelerSimpleAddV3404'))throw new Error('Traveler Add Document UI did not initialize after runtime execution.');
      document.dispatchEvent(new CustomEvent('tee-runtime-ready',{detail:{stem,build,loader:'sequential-script-parts'}}));
    }catch(error){showRetry(error?.message||String(error));}
  }
  boot();
})();
