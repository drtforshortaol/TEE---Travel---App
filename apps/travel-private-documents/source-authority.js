// TEE Record Update & Source Authority Rules — v3.3.32
// Baseline/reference documents are preserved; newer authoritative operational
// confirmations may supersede the active record without destroying history.
(function () {
  "use strict";

  const LEVELS = Object.freeze({
    baseline: 10,
    traveler_note: 20,
    agency_update: 30,
    provider_confirmation: 40,
    live_provider: 50
  });

  const LABELS = Object.freeze({
    baseline: "Baseline / proposal",
    traveler_note: "Traveler update",
    agency_update: "Updated agency confirmation",
    provider_confirmation: "Direct provider confirmation",
    live_provider: "Current provider / live booking"
  });

  function normalizeAuthority(value) {
    const key = String(value || "").trim().toLowerCase().replace(/[\s/-]+/g, "_");
    return Object.prototype.hasOwnProperty.call(LEVELS, key) ? key : "baseline";
  }

  function compareAuthority(incoming, current) {
    return LEVELS[normalizeAuthority(incoming)] - LEVELS[normalizeAuthority(current)];
  }

  function shouldSupersede(currentRecord, incomingRecord) {
    const currentAuthority = normalizeAuthority(currentRecord && currentRecord.sourceAuthority);
    const incomingAuthority = normalizeAuthority(incomingRecord && incomingRecord.sourceAuthority);
    const authorityDelta = compareAuthority(incomingAuthority, currentAuthority);
    if (authorityDelta > 0) return true;
    if (authorityDelta < 0) return false;

    const currentTime = Date.parse((currentRecord && currentRecord.sourceUpdatedAt) || "") || 0;
    const incomingTime = Date.parse((incomingRecord && incomingRecord.sourceUpdatedAt) || "") || 0;
    return incomingTime > currentTime;
  }

  function preserveBaseline(currentRecord, incomingRecord) {
    const current = currentRecord || {};
    const incoming = incomingRecord || {};
    return incoming.baselineReference ||
      current.baselineReference ||
      current.sourceReference ||
      incoming.sourceReference ||
      "";
  }

  window.TEE_SOURCE_AUTHORITY = Object.freeze({
    LEVELS, LABELS, normalizeAuthority, compareAuthority,
    shouldSupersede, preserveBaseline
  });
})();
