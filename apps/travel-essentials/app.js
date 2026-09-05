"use strict";

// TEE v3.4.74 — Direct emergency-contact retrieval + in-place Vault unlock.

function openQuickReferenceSection(id, shouldScroll = true) {
  if (!id) return;
  const target = document.getElementById(id);
  if (!(target instanceof HTMLDetailsElement)) return;
  target.open = true;
  if (shouldScroll) {
    requestAnimationFrame(() => target.scrollIntoView({behavior:'smooth', block:'start'}));
  }
}

function getVaultSession(){
  try{
    const raw=sessionStorage.getItem('teeAuthorizedVaultSessionV1');
    const session=JSON.parse(raw||'null');
    if(!session || Number(session.version)!==2) return null;
    if(!Number.isFinite(Number(session.expiresAt)) || Number(session.expiresAt)<=Date.now()) return null;
    return session;
  }catch{return null;}
}

function prepareVaultReturnLinks() {
  document.querySelectorAll('[data-tee-vault-return]').forEach(link => {
    const sectionId = link.dataset.teeVaultReturn || '';
    const returnUrl = new URL(location.href);
    if (sectionId) returnUrl.hash = sectionId;

    const vaultUrl = new URL(link.getAttribute('href'), location.href);
    vaultUrl.searchParams.set('teeReturnTo', returnUrl.href);
    link.href = vaultUrl.href;
    link.removeAttribute('target');
  });
}

function findProtectedContactRecord(contact){
  const wanted=String(contact||'').toLowerCase();
  const records=[...document.querySelectorAll('.tee-protected-record')];
  return records.find(record => (record.innerText||record.textContent||'').toLowerCase().includes(wanted)) || null;
}

function focusProtectedContact(contact){
  const record=findProtectedContactRecord(contact);
  if(!record) return false;
  record.setAttribute('tabindex','-1');
  record.scrollIntoView({behavior:'smooth',block:'center'});
  record.focus({preventScroll:true});
  record.animate?.([
    {outline:'3px solid rgba(18,63,70,.9)'},
    {outline:'3px solid rgba(18,63,70,0)'}
  ],{duration:1400,easing:'ease-out'});
  return true;
}

function updateEmergencyContactButtonStates(){
  const open=Boolean(getVaultSession());
  document.querySelectorAll('[data-tee-contact-vault]').forEach(link=>{
    const contact=link.dataset.teeContact||'';
    link.textContent=open ? `Show ${contact} details` : `Unlock / View ${contact} 🔒`;
    link.setAttribute('aria-label',open ? `Show protected details for ${contact}` : `Unlock Secure Vault to view ${contact}`);
  });
}

function enhanceEmergencyContactCards(){
  const groups=[...document.querySelectorAll('.emergency-contact-group')];
  groups.forEach(group=>{
    const text=(group.innerText||group.textContent||'').toLowerCase();
    let contact='';
    if(text.includes('emilio')) contact='Emilio';
    else if(text.includes('robert')) contact='Robert';
    if(!contact) return;

    const privacy=group.querySelector('.privacy-note');
    if(privacy) privacy.textContent='(protected Shared details in Vault)';

    if(!group.querySelector('[data-tee-contact-vault]')){
      const actions=document.createElement('div');
      actions.className='related-links tee-contact-vault-actions';
      actions.innerHTML=`<a class="quick-reference-action-button secondary" data-tee-contact-vault data-tee-contact="${contact}" data-tee-vault-return="identity-travelers" href="../travel-private-documents/index.html?teeView=vault&teeEnter=1&teeRecordType=emergencyContact&teeContact=${encodeURIComponent(contact)}">Unlock / View ${contact} 🔒</a>`;
      group.appendChild(actions);
    }
  });

  const section=groups[0]?.closest('.quick-reference-action-card');
  if(section && !section.querySelector('.tee-vault-tab-note')){
    const note=document.createElement('p');
    note.className='emergency-source-note tee-vault-tab-note';
    note.innerHTML='<strong>Vault behavior:</strong> unlock once on this page and protected Shared details appear here immediately. No separate Vault search is required.';
    section.appendChild(note);
  }
  updateEmergencyContactButtonStates();
}

function handleEmergencyContactClick(event){
  const link=event.target.closest?.('[data-tee-contact-vault]');
  if(!link) return;
  const contact=link.dataset.teeContact||'';
  if(!getVaultSession()) return;

  event.preventDefault();
  openQuickReferenceSection('identity-travelers',false);
  if(focusProtectedContact(contact)) return;
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    if(focusProtectedContact(contact) || attempts>=10) clearInterval(timer);
  },150);
}

function loadProtectedContext(){
  if(document.querySelector('script[data-tee-protected-context]')) return;
  const script=document.createElement('script');
  script.src='../../protected-context.js';
  script.dataset.teeProtectedContext='1';
  script.onload=()=>setTimeout(updateEmergencyContactButtonStates,0);
  document.head.appendChild(script);
}

function closeInlineVault(){
  document.getElementById('teeInlineVaultOverlay')?.remove();
}

function openInlineVault(){
  if(document.getElementById('teeInlineVaultOverlay')) return;
  const overlay=document.createElement('div');
  overlay.id='teeInlineVaultOverlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label','Secure Vault unlock');
  Object.assign(overlay.style,{position:'fixed',inset:'0',zIndex:'5000',background:'rgba(0,0,0,.55)',display:'flex',flexDirection:'column',padding:'12px'});
  const shell=document.createElement('div');
  Object.assign(shell.style,{background:'#fff',borderRadius:'14px',overflow:'hidden',height:'100%',display:'flex',flexDirection:'column',boxShadow:'0 8px 30px rgba(0,0,0,.3)'});
  const bar=document.createElement('div');
  Object.assign(bar.style,{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px',padding:'10px 12px',background:'#123f46',color:'#fff',font:'700 16px system-ui'});
  bar.innerHTML='<span>Unlock Secure Vault</span><button type="button" data-close-inline-vault style="border:0;border-radius:8px;padding:8px 12px;font-weight:800;cursor:pointer">Close</button>';
  const frame=document.createElement('iframe');
  frame.src='../travel-private-documents/index.html?teeView=vault&teeEnter=1';
  frame.title='Secure Vault';
  Object.assign(frame.style,{border:'0',width:'100%',flex:'1',background:'#fff'});
  shell.append(bar,frame);
  overlay.appendChild(shell);
  document.body.appendChild(overlay);
  bar.querySelector('[data-close-inline-vault]')?.addEventListener('click',closeInlineVault);
}

function acceptVaultPayload(payload){
  try{
    if(!payload || Number(payload.version)!==2) return false;
    if(!Number.isFinite(Number(payload.expiresAt)) || Number(payload.expiresAt)<=Date.now()) return false;
    sessionStorage.setItem('teeAuthorizedVaultSessionV1',JSON.stringify(payload));
    try{ window.TEEVaultSession?.get?.(); }catch{}
    window.dispatchEvent(new CustomEvent('tee-vault-session-changed',{detail:{reason:'inline-unlock',session:payload}}));
    closeInlineVault();
    updateEmergencyContactButtonStates();
    return true;
  }catch{return false;}
}

// When Quick Reference is locked, unlock in place instead of navigating away.
document.addEventListener('click',event=>{
  const unlock=event.target.closest?.('.tee-vault-state.locked a');
  if(!unlock) return;
  event.preventDefault();
  openInlineVault();
});

window.addEventListener('message',event=>{
  if(event.origin!==window.location.origin) return;
  if(event.data?.type==='TEE_VAULT_SESSION_OPEN' && event.data?.payload){
    acceptVaultPayload(event.data.payload);
  }
});

document.querySelectorAll('[data-open-quick-reference]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.dataset.openQuickReference;
    if (!id) return;
    event.preventDefault();
    history.replaceState(null, '', `#${encodeURIComponent(id)}`);
    openQuickReferenceSection(id, true);
  });
});

document.addEventListener('click',handleEmergencyContactClick);
window.addEventListener('tee-vault-session-changed',()=>setTimeout(updateEmergencyContactButtonStates,0));

enhanceEmergencyContactCards();
prepareVaultReturnLinks();
loadProtectedContext();

if (location.hash) {
  const id = decodeURIComponent(location.hash.slice(1));
  openQuickReferenceSection(id, false);
}

window.addEventListener('pageshow', () => {
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    openQuickReferenceSection(id, false);
  }
  enhanceEmergencyContactCards();
  prepareVaultReturnLinks();
  setTimeout(updateEmergencyContactButtonStates,50);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  });
}
