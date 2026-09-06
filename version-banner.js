"use strict";
(function(){
  const script=document.currentScript;
  const fallback="3.4.15";
  function paint(version){
    const v=String(version||fallback).replace(/^v/i,"");
    const label=`TEE v${v}`;
    window.TEE_BUILD_VERSION=v;
    document.querySelectorAll('[data-tee-version]').forEach(el=>{el.textContent=label;});
    const walker=document.createTreeWalker(document.body||document.documentElement,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{if(/TEE\s+v3\.\d+(?:\.\d+)?/i.test(node.nodeValue||''))node.nodeValue=node.nodeValue.replace(/TEE\s+v3\.\d+(?:\.\d+)?/ig,label);});
  }
  function isHub(){
    const p=location.pathname.replace(/\/+$/,'');
    return /\/TEE---Travel---App(?:\/index\.html)?$/.test(p);
  }
  function loadHubScript(path,dataKey,value){
    if(!isHub()||document.querySelector(`script[${dataKey}]`))return;
    const s=document.createElement('script');
    const base=script?.src ? new URL('.',script.src) : new URL('.',location.href);
    s.src=new URL(path,base).toString();
    s.setAttribute(dataKey,value||'1');
    document.head.appendChild(s);
  }
  function loadHubCompletion(){loadHubScript('hub-completion-v3489.js','data-tee-hub-completion','1');}
  function loadSharedSyncVerifier(){loadHubScript('hub-shared-sync-verifier-v3497.js?v=3.4.97','data-tee-shared-sync-verifier','3.4.97');}
  paint(fallback);
  loadHubCompletion();
  loadSharedSyncVerifier();
  async function apply(){
    try{
      const base=script?.src ? new URL('.',script.src) : new URL('.',location.href);
      const url=new URL('version.json',base);
      const r=await fetch(url,{cache:'no-store'});
      if(!r.ok)return;
      const v=await r.json();
      paint(v.version||fallback);
    }catch{}
  }
  apply();
})();
