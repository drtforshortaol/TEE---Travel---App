// TEE Record Update & Source Authority Rules — v3.4.72
// Baseline/reference documents are preserved; newer authoritative operational
// confirmations may supersede the active record without destroying history.
(function () {
  "use strict";

  // v3.4.72 — Secure Vault session bridge.
  // secure-vault.js writes the temporary 30-minute authorization into
  // sessionStorage. This bridge mirrors that volatile session into window.name
  // for same-tab navigation and BroadcastChannel for other open TEE tabs.
  // Nothing is written to localStorage and the encrypted Vault remains unchanged.
  const SESSION_KEY = "teeAuthorizedVaultSessionV1";
  const SESSION_PREFIX = "TEE_VAULT_SESSION_V2:";
  const CHANNEL_NAME = "tee-vault-session-sync-v1";
  let sessionChannel = null;
  try { if ("BroadcastChannel" in window) sessionChannel = new BroadcastChannel(CHANNEL_NAME); } catch {}

  function validSession(value) {
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (!parsed || Number(parsed.version) !== 2) return null;
      if (!Number.isFinite(Number(parsed.expiresAt)) || Number(parsed.expiresAt) <= Date.now()) return null;
      if (!Array.isArray(parsed.records)) parsed.records = [];
      return parsed;
    } catch { return null; }
  }

  function publishSession(value) {
    const session = validSession(value);
    if (!session) return;
    const serialized = JSON.stringify(session);
    try { window.name = SESSION_PREFIX + serialized; } catch {}
    try { if (window.top && window.top !== window) window.top.name = SESSION_PREFIX + serialized; } catch {}
    try { sessionChannel?.postMessage({type:"session", session}); } catch {}
  }

  function clearPublishedSession(reason) {
    try { if (String(window.name || "").startsWith(SESSION_PREFIX)) window.name = ""; } catch {}
    try {
      if (window.top && String(window.top.name || "").startsWith(SESSION_PREFIX)) window.top.name = "";
    } catch {}
    try { sessionChannel?.postMessage({type:"clear", reason:reason || "vault-closed"}); } catch {}
  }

  // Intercept only the one TEE authorization key; all other Storage behavior is untouched.
  const nativeSetItem = Storage.prototype.setItem;
  const nativeRemoveItem = Storage.prototype.removeItem;
  Storage.prototype.setItem = function(key, value) {
    const result = nativeSetItem.apply(this, arguments);
    try { if (this === window.sessionStorage && key === SESSION_KEY) publishSession(value); } catch {}
    return result;
  };
  Storage.prototype.removeItem = function(key) {
    const result = nativeRemoveItem.apply(this, arguments);
    try { if (this === window.sessionStorage && key === SESSION_KEY) clearPublishedSession("vault-closed"); } catch {}
    return result;
  };

  // If the session existed before this script ran, bridge it immediately.
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) publishSession(existing);
  } catch {}

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
