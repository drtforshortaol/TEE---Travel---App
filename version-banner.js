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
  function loadHubScript(path,attribute,value){
    if(!isHub()||document.querySelector(`script[${attribute}]`))return;
    const s=document.createElement('script');
    const base=script?.src ? new URL('.',script.src) : new URL('.',location.href);
    s.src=new URL(path,base).toString();
    s.setAttribute(attribute,value||'1');
    document.head.appendChild(s);
  }
  function loadHubCompletion(){loadHubScript('hub-completion-v3489.js','data-tee-hub-completion','1');}
  function loadEmergencySyncFix(){loadHubScript('hub-shared-sync-emergency-fix-v3499.js?v=3.4.99','data-tee-shared-sync-emergency-fix','3.4.99');}
  function loadShellCleaner(){loadHubScript('hub-shared-sync-shell-cleaner-v3501.js?v=3.5.04','data-tee-shared-sync-shell-cleaner','3.5.04');}
  paint(fallback);
  loadHubCompletion();
  loadEmergencySyncFix();
  loadShellCleaner();
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
