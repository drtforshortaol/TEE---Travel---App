"use strict";

(() => {
  const params = new URLSearchParams(location.search);
  const contact = (params.get("teeContact") || "").trim();
  const type = (params.get("teeRecordType") || "").trim();
  if (!contact || type !== "emergencyContact") return;

  let completed = false;
  let timer = null;

  function normalize(value){
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function vaultUnlocked(){
    try {
      if (typeof getVaultState === "function" && getVaultState() === "unlocked") return true;
    } catch {}
    const status = document.getElementById("secureVaultStatus");
    return /unlocked|open/i.test(status?.textContent || "");
  }

  function focusContact(){
    if (completed || !vaultUnlocked()) return false;

    const search = document.getElementById("secureRecordSearch");
    const filter = document.getElementById("secureRecordFilter");
    const run = document.getElementById("secureRunSearchButton");
    const list = document.getElementById("secureRecordList");
    if (!search || !filter || !run || !list) return false;

    search.value = contact;
    if ([...filter.options].some(option => option.value === "emergencyContact")) {
      filter.value = "emergencyContact";
    }
    run.click();

    const wanted = normalize(contact);
    const cards = [...list.children];
    const match = cards.find(card => normalize(card.innerText || card.textContent).includes(wanted));
    if (!match) return false;

    completed = true;
    match.dataset.teeDirectContact = "1";
    match.scrollIntoView({behavior:"smooth", block:"center"});
    const previousOutline = match.style.outline;
    const previousOffset = match.style.outlineOffset;
    match.style.outline = "3px solid #b7791f";
    match.style.outlineOffset = "4px";
    setTimeout(() => {
      match.style.outline = previousOutline;
      match.style.outlineOffset = previousOffset;
    }, 3500);

    const message = document.getElementById("secureVaultMessage");
    if (message) message.textContent = `Showing Shared Emergency Contact: ${contact}.`;
    return true;
  }

  function retry(){
    if (completed) return;
    if (focusContact()) return;
    clearTimeout(timer);
    timer = setTimeout(retry, 250);
  }

  window.addEventListener("pageshow", retry);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) retry(); });
  document.addEventListener("click", event => {
    if (event.target?.closest?.("#secureUnlockButton,#secureManagerUnlock")) setTimeout(retry, 350);
  });

  const observer = new MutationObserver(() => retry());
  window.addEventListener("DOMContentLoaded", () => {
    const panel = document.getElementById("secureVaultPanel") || document.body;
    observer.observe(panel, {childList:true, subtree:true, attributes:true, attributeFilter:["hidden"]});
    retry();
  });
})();
