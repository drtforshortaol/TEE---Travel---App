"use strict";

// TEE v3.4.64 — Quick Reference emergency-contact Vault actions + tab-safe instructions.

function openQuickReferenceSection(id, shouldScroll = true) {
  if (!id) return;
  const target = document.getElementById(id);
  if (!(target instanceof HTMLDetailsElement)) return;
  target.open = true;
  if (shouldScroll) {
    requestAnimationFrame(() => target.scrollIntoView({behavior:'smooth', block:'start'}));
  }
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

function enhanceEmergencyContactCards(){
  const groups=[...document.querySelectorAll('.emergency-contact-group')];
  groups.forEach(group=>{
    if(group.querySelector('[data-tee-contact-vault]')) return;
    const text=(group.innerText||group.textContent||'').toLowerCase();
    let contact='';
    if(text.includes('emilio')) contact='Emilio';
    else if(text.includes('robert')) contact='Robert';
    if(!contact) return;

    const privacy=group.querySelector('.privacy-note');
    if(privacy) privacy.textContent='(protected Shared details in Vault)';

    const actions=document.createElement('div');
    actions.className='related-links tee-contact-vault-actions';
    actions.innerHTML=`<a class="quick-reference-action-button secondary" data-tee-contact-vault data-tee-vault-return="identity-travelers" href="../travel-private-documents/index.html?teeView=vault&teeEnter=1&teeRecordType=emergencyContact&teeContact=${encodeURIComponent(contact)}">Unlock / View ${contact} 🔒</a>`;
    group.appendChild(actions);
  });

  const section=groups[0]?.closest('.quick-reference-action-card');
  if(section && !section.querySelector('.tee-vault-tab-note')){
    const note=document.createElement('p');
    note.className='emergency-source-note tee-vault-tab-note';
    note.innerHTML='<strong>Vault status is tab-specific.</strong> If the Vault is open in another browser tab, this page can still show “locked.” Use the button beside the contact to open/unlock the Vault in this same tab, then return here.';
    section.appendChild(note);
  }
}

function loadProtectedContext(){
  if(document.querySelector('script[data-tee-protected-context]')) return;
  const script=document.createElement('script');
  script.src='../../protected-context.js';
  script.dataset.teeProtectedContext='1';
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
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  });
}
