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
    #customTaskMount .custom-task button{min-width:42px;min-height:42px;padding:6px;border-radius:10px;font-size:1.15rem;font-weight:800;white-space:nowrap;line-height:1}
  `;
  document.head.appendChild(style);

  const instructions=panel.querySelector('.top-dropdown-body > p');
  if(instructions)instructions.textContent='This is one cumulative trip checklist. Add items as they come up, check them off when done, and tap the trash can to permanently remove items you no longer need. Items stay on this device until removed.';

  function makeDeleteObvious(){
    mount?.querySelectorAll('.custom-task button').forEach(button=>{
      if(button.textContent!=='🗑️')button.textContent='🗑️';
      if(button.getAttribute('aria-label')!=='Delete checklist item')button.setAttribute('aria-label','Delete checklist item');
      if(button.title!=='Delete this checklist item')button.title='Delete this checklist item';
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
    makeDeleteObvious();
    position();
    if(focus)setTimeout(()=>input?.focus({preventScroll:true}),350);
  }

  link.addEventListener('click',event=>{
    event.preventDefault();
    openChecklist(true);
  });

  panel.addEventListener('toggle',()=>{setState();makeDeleteObvious();});

  if(add){
    add.addEventListener('click',()=>{
      panel.open=true;
      setState();
      setTimeout(()=>{makeDeleteObvious();input?.focus({preventScroll:true});},0);
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
    const observer=new MutationObserver(()=>makeDeleteObvious());
    observer.observe(mount,{childList:true,subtree:true});
  }

  setState();
  makeDeleteObvious();
})();
