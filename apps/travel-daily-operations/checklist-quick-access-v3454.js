"use strict";
(function(){
  const panel=document.getElementById('adaptive-checklist');
  const input=document.getElementById('newTaskInput');
  const add=document.getElementById('addTaskBtn');
  const mount=document.getElementById('customTaskMount');
  const link=[...document.querySelectorAll('.travel-day-quickbar a')].find(a=>(a.getAttribute('href')||'')==='#adaptive-checklist');
  if(!panel||!link)return;

  const style=document.createElement('style');
  style.textContent=`
    #customTaskMount .custom-task{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center}
    #customTaskMount .custom-task button{min-height:38px;padding:7px 11px;border-radius:10px;font-weight:800;white-space:nowrap}
  `;
  document.head.appendChild(style);

  function makeRemoveObvious(){
    mount?.querySelectorAll('.custom-task button').forEach(button=>{
      button.textContent='Remove';
      button.setAttribute('aria-label','Remove checklist item');
      button.title='Remove this checklist item';
    });
  }
  function setState(){
    const state=panel.querySelector('.top-dropdown-state');
    if(state)state.textContent=panel.open?'Collapse':'Open';
  }
  function position(){
    requestAnimationFrame(()=>window.scrollTo({top:Math.max(0,panel.getBoundingClientRect().top+window.scrollY-96),behavior:'smooth'}));
  }
  function openChecklist(focus=true){
    panel.open=true;
    setState();
    makeRemoveObvious();
    position();
    if(focus)setTimeout(()=>input?.focus({preventScroll:true}),350);
  }

  link.addEventListener('click',event=>{
    event.preventDefault();
    openChecklist(true);
  });

  panel.addEventListener('toggle',()=>{setState();makeRemoveObvious();});

  if(add){
    add.addEventListener('click',()=>{
      panel.open=true;
      setState();
      setTimeout(()=>{makeRemoveObvious();input?.focus({preventScroll:true});},0);
    });
  }

  if(input){
    input.addEventListener('keydown',event=>{
      if(event.key!=='Enter'||event.isComposing)return;
      if(!input.value.trim())return;
      event.preventDefault();
      add?.click();
    });
  }

  if(mount){
    const observer=new MutationObserver(makeRemoveObvious);
    observer.observe(mount,{childList:true,subtree:true});
  }

  setState();
  makeRemoveObvious();
})();
