"use strict";
(function(){
  const panel=document.getElementById('adaptive-checklist');
  const input=document.getElementById('newTaskInput');
  const add=document.getElementById('addTaskBtn');
  const link=[...document.querySelectorAll('.travel-day-quickbar a')].find(a=>(a.getAttribute('href')||'')==='#adaptive-checklist');
  if(!panel||!link)return;

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
    position();
    if(focus)setTimeout(()=>input?.focus({preventScroll:true}),350);
  }

  link.addEventListener('click',event=>{
    event.preventDefault();
    openChecklist(true);
  });

  panel.addEventListener('toggle',setState);

  if(add){
    add.addEventListener('click',()=>{
      panel.open=true;
      setState();
      setTimeout(()=>input?.focus({preventScroll:true}),0);
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

  setState();
})();
