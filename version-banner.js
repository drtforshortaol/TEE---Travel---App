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
  paint(fallback);
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
