"use strict";
(function(){
  const stem="traveler-source-flow-v3415";
  const count=8;
  const build="3.4.22";
  const buildLabel=document.querySelector('header.hero .subtitle strong');
  if(buildLabel)buildLabel.textContent='TEE v3.4.22';

  function statusNode(){return document.getElementById('streamlinedSourceStatus');}
  function esc(value){return String(value||'').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));}
  function showRetry(message){
    const status=statusNode();
    if(!status)return;
    status.innerHTML='<div style="border:3px solid #b42318;background:#fff1f0;color:#7a271a;border-radius:14px;padding:14px;font-weight:700">🔴 CANNOT CONTINUE — Add Document did not load.<br><span style="font-weight:600">Next step: tap Retry Add Document.</span><br><button id="teeRetryAddDocumentV3422" type="button" style="margin-top:10px;padding:10px 14px;font-weight:700">Retry Add Document</button><details style="margin-top:10px;font-weight:500"><summary>Technical detail</summary><div style="margin-top:6px;overflow-wrap:anywhere">'+esc(message||'Unknown loader error')+'</div></details></div>';
    document.getElementById('teeRetryAddDocumentV3422')?.addEventListener('click',()=>boot(),{once:true});
    console.error('TEE traveler loader:',message);
  }

  function decodeQuotedString(literal){
    if(!literal || literal[0] !== '"' || literal[literal.length-1] !== '"')throw new Error('Runtime chunk wrapper is incomplete.');
    let out='';
    for(let i=1;i<literal.length-1;i++){
      const ch=literal[i];
      if(ch!=='\\'){out+=ch;continue;}
      i++;
      if(i>=literal.length-1)throw new Error('Runtime chunk ended after an escape character.');
      const e=literal[i];
      if(e==='n')out+='\n';
      else if(e==='r')out+='\r';
      else if(e==='t')out+='\t';
      else if(e==='b')out+='\b';
      else if(e==='f')out+='\f';
      else if(e==='v')out+='\v';
      else if(e==='0')out+='\0';
      else if(e==='"')out+='"';
      else if(e==="'")out+="'";
      else if(e==='\\')out+='\\';
      else if(e==='u'){
        const hex=literal.slice(i+1,i+5);
        if(!/^[0-9a-fA-F]{4}$/.test(hex))throw new Error('Invalid Unicode escape in runtime chunk.');
        out+=String.fromCharCode(parseInt(hex,16));i+=4;
      }else if(e==='x'){
        const hex=literal.slice(i+1,i+3);
        if(!/^[0-9a-fA-F]{2}$/.test(hex))throw new Error('Invalid hex escape in runtime chunk.');
        out+=String.fromCharCode(parseInt(hex,16));i+=2;
      }else if(e==='\n'){
        // JavaScript line continuation.
      }else if(e==='\r'){
        if(literal[i+1]==='\n')i++;
      }else{
        // Preserve unknown escapes the way a normal JS string would for these generated chunks.
        out+=e;
      }
    }
    return out;
  }

  function extractChunk(text,index){
    const marker='.push(';
    const start=text.indexOf(marker);
    const end=text.lastIndexOf(');');
    if(start<0 || end<=start)throw new Error('Runtime part '+index+' wrapper could not be read.');
    const literal=text.slice(start+marker.length,end).trim();
    try{return JSON.parse(literal);}catch(jsonError){
      try{return decodeQuotedString(literal);}catch(decodeError){
        throw new Error('Runtime part '+index+' could not be decoded: '+decodeError.message);
      }
    }
  }

  async function fetchChunk(index){
    const name=stem+'.part'+String(index).padStart(2,'0')+'.js';
    const url=name+'?v='+encodeURIComponent(build)+'&t='+Date.now()+'-'+index;
    const response=await fetch(url,{cache:'no-store',credentials:'same-origin'});
    if(!response.ok)throw new Error('Runtime part '+index+' could not be downloaded (HTTP '+response.status+').');
    const text=await response.text();
    const chunk=extractChunk(text,index);
    if(typeof chunk!=='string' || chunk.length===0)throw new Error('Runtime part '+index+' was empty.');
    return chunk;
  }

  async function boot(){
    try{
      const chunks=[];
      for(let i=1;i<=count;i++)chunks.push(await fetchChunk(i));
      if(chunks.length!==count)throw new Error('Traveler runtime assembled '+chunks.length+' of '+count+' required parts.');
      const source=chunks.join('');
      if(!source.trim())throw new Error('Traveler runtime was empty after assembly.');

      document.querySelectorAll('script[data-tee-traveler-runtime="direct"]').forEach(node=>node.remove());
      const script=document.createElement('script');
      script.type='text/javascript';
      script.dataset.teeTravelerRuntime='direct';
      script.textContent=source+'\n//# sourceURL=traveler-source-flow-v3415-runtime.js';
      document.head.appendChild(script);

      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      if(!document.getElementById('teeTravelerSimpleAddV3404'))throw new Error('Traveler Add Document UI did not initialize after runtime execution.');
      document.dispatchEvent(new CustomEvent('tee-runtime-ready',{detail:{stem,build,loader:'fetch-decode-assemble',parts:count}}));
    }catch(error){showRetry(error?.message||String(error));}
  }

  boot();
})();
