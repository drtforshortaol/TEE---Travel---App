"use strict";
(function(){
  function isPdfPreviewLink(anchor){
    if(!(anchor instanceof HTMLAnchorElement))return false;
    const text=String(anchor.textContent||"").trim().toLowerCase();
    return text==="open pdf preview";
  }

  function dataUrlToBlobUrl(dataUrl){
    const match=String(dataUrl||"").match(/^data:([^;,]+)?(;base64)?,(.*)$/s);
    if(!match)throw new Error("TEE could not read the retained PDF data.");
    const mime=match[1]||"application/pdf";
    const isBase64=!!match[2];
    const payload=match[3]||"";
    let bytes;
    if(isBase64){
      const binary=atob(payload);
      bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    }else{
      const text=decodeURIComponent(payload);
      bytes=new TextEncoder().encode(text);
    }
    return URL.createObjectURL(new Blob([bytes],{type:mime}));
  }

  document.addEventListener("click",event=>{
    const target=event.target instanceof Element?event.target:null;
    const anchor=target?.closest("a");
    if(!isPdfPreviewLink(anchor))return;
    const href=anchor.getAttribute("href")||"";
    if(!href.startsWith("data:application/pdf"))return;

    event.preventDefault();
    event.stopPropagation();

    try{
      const blobUrl=dataUrlToBlobUrl(href);
      // iOS/Safari is unreliable when very large PDF data URLs are opened in a new tab.
      // Navigating to a Blob URL from the user's tap reliably hands the PDF to the native viewer.
      window.location.assign(blobUrl);
      setTimeout(()=>URL.revokeObjectURL(blobUrl),120000);
    }catch(error){
      console.error("TEE PDF preview:",error);
      alert("TEE could not open the PDF preview on this device. Return to TEE and try again after Refresh / Update.");
    }
  },true);
})();
