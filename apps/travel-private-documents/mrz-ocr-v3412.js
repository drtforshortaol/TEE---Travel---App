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

  // Full-PDF preview bridge for iPhone/iPad. The normal review runtime uses a
  // large data: URL in a target=_blank link, which iOS Safari can open as a
  // blank page. Load the dedicated handler on every Source Documents visit.
  if(!document.querySelector('script[data-tee-ios-pdf-preview]')){
    const pdfFix=document.createElement('script');
    pdfFix.src='ios-pdf-preview-v3441.js?v=3.4.41';
    pdfFix.dataset.teeIosPdfPreview='3.4.41';
    document.head.appendChild(pdfFix);
  }
})();
