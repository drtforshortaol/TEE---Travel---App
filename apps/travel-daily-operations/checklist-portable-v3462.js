"use strict";
(function(){
  const KEY='daily-custom-tasks';
  const META_KEY='daily-custom-tasks-portable-meta-v1';
  const panel=document.getElementById('adaptive-checklist');
  const mount=document.getElementById('customTaskMount');
  if(!panel||!mount)return;

  const body=panel.querySelector('.top-dropdown-body');
  if(!body)return;

  const note=body.querySelector(':scope > p');
  if(note) note.textContent='This is one cumulative trip checklist. It is stored in this browser. Use Share / Copy and Import below to keep another TEE device matched.';

  const wrap=document.createElement('div');
  wrap.className='checklist-portable-tools';
  wrap.innerHTML=`
    <div style="margin-top:14px;padding:12px;border:1px solid #cfd9d5;border-radius:12px;background:#f8fbfa">
      <strong style="display:block;margin-bottom:6px">Keep checklist matched between devices</strong>
      <p style="margin:0 0 10px">TEE does not automatically cloud-sync browser storage. Transfer this small checklist safely between your iPhone and PC when needed.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button type="button" id="shareChecklistBtn">Share / Copy Checklist</button>
        <button type="button" id="importChecklistBtn">Import Checklist</button>
      </div>
      <p id="checklistPortableStatus" style="margin:8px 0 0;font-size:.92rem"></p>
    </div>`;
  body.appendChild(wrap);

  const shareBtn=wrap.querySelector('#shareChecklistBtn');
  const importBtn=wrap.querySelector('#importChecklistBtn');
  const status=wrap.querySelector('#checklistPortableStatus');

  function read(){
    try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[];}catch{return [];}
  }
  function write(tasks){
    localStorage.setItem(KEY,JSON.stringify(tasks));
    localStorage.setItem(META_KEY,JSON.stringify({updatedAt:new Date().toISOString(),count:tasks.length}));
    window.dispatchEvent(new CustomEvent('tee-adaptive-checklist-imported'));
  }
  function payload(){return {schema:'tee-adaptive-checklist-v1',exportedAt:new Date().toISOString(),tasks:read()};}
  function encode(obj){return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));}
  function decode(text){return JSON.parse(decodeURIComponent(escape(atob(text.trim()))));}
  function validTask(t){return t&&typeof t.text==='string'&&t.text.trim();}
  function mergeTasks(current,incoming){
    const map=new Map();
    [...current,...incoming].filter(validTask).forEach(t=>{
      const k=t.text.trim().toLowerCase();
      const prior=map.get(k);
      map.set(k,{text:(prior?.text||t.text).trim(),done:Boolean(prior?.done||t.done)});
    });
    return [...map.values()];
  }
  function rerender(){
    if(typeof renderCustom==='function')renderCustom();
    else location.reload();
  }

  shareBtn?.addEventListener('click',async()=>{
    const tasks=read();
    const code=encode(payload());
    const text=`TEE Adaptive Checklist\n\n${code}`;
    try{
      if(navigator.share){await navigator.share({title:'TEE Adaptive Checklist',text});status.textContent=`Shared ${tasks.length} checklist item${tasks.length===1?'':'s'}.`;return;}
      await navigator.clipboard.writeText(code);status.textContent=`Copied ${tasks.length} checklist item${tasks.length===1?'':'s'} to the clipboard.`;
    }catch(err){
      try{await navigator.clipboard.writeText(code);status.textContent='Checklist transfer code copied to the clipboard.';}
      catch{prompt('Copy this checklist transfer code:',code);}
    }
  });

  importBtn?.addEventListener('click',()=>{
    const raw=prompt('Paste the TEE Adaptive Checklist transfer code from the other device:');
    if(raw===null)return;
    try{
      const code=raw.includes('TEE Adaptive Checklist')?raw.split(/\n+/).pop():raw.trim();
      const p=decode(code);
      if(p?.schema!=='tee-adaptive-checklist-v1'||!Array.isArray(p.tasks))throw new Error('Not a valid TEE checklist transfer code.');
      const incoming=p.tasks.filter(validTask).map(t=>({text:t.text.trim(),done:Boolean(t.done)}));
      const current=read();
      const merged=mergeTasks(current,incoming);
      write(merged);
      rerender();
      status.textContent=`Imported and merged checklist. ${merged.length} total item${merged.length===1?'':'s'}. Existing items were not deleted.`;
    }catch(err){status.textContent=`Import failed: ${err?.message||String(err)}`;}
  });

  const observer=new MutationObserver(()=>{
    try{localStorage.setItem(META_KEY,JSON.stringify({updatedAt:new Date().toISOString(),count:read().length}));}catch{}
  });
  observer.observe(mount,{childList:true,subtree:true});
})();
