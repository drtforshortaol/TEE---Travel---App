"use strict";
(function(){
  const stem="mrz-ocr-v3412", count=4;
  window.__TEE_PARTS__=window.__TEE_PARTS__||{}; window.__TEE_PARTS__[stem]=[];
  let i=1;
  function next(){
    if(i>count){
      try{ (0,eval)(window.__TEE_PARTS__[stem].join('')); document.dispatchEvent(new CustomEvent('tee-runtime-ready',{detail:{stem}})); }
      catch(e){ console.error('TEE runtime load failed',stem,e); }
      return;
    }
    const sc=document.createElement('script'); sc.src=stem+'.part'+String(i).padStart(2,'0')+'.js?v=3.4.15';
    sc.onload=()=>{i++;next();}; sc.onerror=()=>console.error('TEE runtime chunk missing',sc.src); document.head.appendChild(sc);
  }
  next();
})();
