"use strict";

// TEE v3.3.90 — Quick Reference emergency actions + return-aware Vault navigation.

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
  });
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

prepareVaultReturnLinks();

if (location.hash) {
  const id = decodeURIComponent(location.hash.slice(1));
  openQuickReferenceSection(id, false);
}

window.addEventListener('pageshow', () => {
  // Browser back from Secure Vault normally restores the exact scroll/open state.
  // This is a fallback for browsers that reload the page instead of restoring it.
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    openQuickReferenceSection(id, false);
  }
  prepareVaultReturnLinks();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  });
}
