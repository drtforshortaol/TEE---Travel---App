"use strict";

(() => {
  const params = new URLSearchParams(location.search);
  const contact = (params.get("teeContact") || "").trim();
  const type = (params.get("teeRecordType") || "").trim();
  if (!contact || type !== "emergencyContact") return;

  let completed = false;
  let pollTimer = null;
  let pollCount = 0;
  const MAX_POLLS = 40;

  function normalize(value){
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function vaultUnlocked(){
    try {
      return typeof getVaultState === "function" && getVaultState() === "unlocked";
    } catch {
      return false;
    }
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
    const match = [...list.children].find(card => normalize(card.innerText || card.textContent).includes(wanted));
    if (!match) return false;

    completed = true;
    if (pollTimer) clearTimeout(pollTimer);
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

  function boundedPoll(){
    if (completed || pollCount >= MAX_POLLS) return;
    pollCount += 1;
    if (focusContact()) return;
    pollTimer = setTimeout(boundedPoll, 300);
  }

  function startPoll(){
    if (completed) return;
    pollCount = 0;
    if (pollTimer) clearTimeout(pollTimer);
    pollTimer = setTimeout(boundedPoll, 250);
  }

  window.addEventListener("pageshow", startPoll, {once:true});
  window.addEventListener("DOMContentLoaded", startPoll, {once:true});

  document.addEventListener("click", event => {
    if (event.target?.closest?.("#secureUnlockButton,#secureManagerUnlock")) {
      setTimeout(startPoll, 700);
    }
  });
})();
