"use strict";

// TEE v3.4.65 — Direct emergency-contact retrieval when Vault is already open.

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
    note.innerHTML='<strong>When the Vault is open in this tab,</strong> the Emilio and Robert buttons jump directly to that person’s protected details. If the Vault is locked, the same button opens the Vault first.';
    section.appendChild(note);
  }
  updateEmergencyContactButtonStates();
}

function handleEmergencyContactClick(event){
  const link=event.target.closest?.('[data-tee-contact-vault]');
  if(!link) return;
  const contact=link.dataset.teeContact||'';
  if(!getVaultSession()) return; // normal navigation opens the Vault

  event.preventDefault();
  openQuickReferenceSection('identity-travelers',false);

  // Protected-context rendering can finish just after page return, so retry briefly.
  if(focusProtectedContact(contact)) return;
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    if(focusProtectedContact(contact) || attempts>=8){
      clearInterval(timer);
      if(attempts>=8 && !findProtectedContactRecord(contact)){
        // If the record is authorized but not rendered here, fall back to the Vault deep link.
        location.href=link.href;
      }
    }
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
