"use strict";

const TWO_COUPLE_ARCHITECTURE = "tee-two-couple-v1";
const ZONE_SCHEMA_VERSION = "3.6";

const vault = {
  id: "",
  state: "locked",
  created: null,
  lastOpened: null,
  timeoutMinutes: 30,
  version: "2.2",
  authentication: null,
  encryptedPayload: null,
  architecture: null,
  accessProfiles: null,
  zones: null
};

let activeEncryptionKey = null;
let activeVaultData = null;
let activeProfileId = null;
let activeZoneKeys = null;
let autoLockTimerId = null;
let autoLockDeadline = null;
let autoLockDurationMs = VAULT_LIFECYCLE_CONFIG.autoLockMinutes * 60 * 1000;
let autoLockHandler = null;

function emptyZoneData() {
  return { schemaVersion: ZONE_SCHEMA_VERSION, records: [], deletedRecords: [] };
}

function isTwoCoupleVaultData(value) {
  return Boolean(
    value?.architecture === TWO_COUPLE_ARCHITECTURE &&
    value?.accessProfiles?.coupleA?.authentication &&
    value?.accessProfiles?.coupleB?.authentication &&
    value?.zones?.shared?.encryptedPayload &&
    value?.zones?.coupleA?.encryptedPayload &&
    value?.zones?.coupleB?.encryptedPayload
  );
}

function isTwoCoupleVault() {
  return isTwoCoupleVaultData(vault);
}

async function generateVaultDataKey() {
  return getWebCrypto().subtle.generateKey(
    { name: CRYPTO_CONFIG.cipher, length: CRYPTO_CONFIG.keyLength },
    true,
    ["encrypt", "decrypt"]
  );
}

async function exportVaultDataKey(key) {
  const raw = await getWebCrypto().subtle.exportKey("raw", key);
  return bytesToBase64(new Uint8Array(raw));
}

async function importVaultDataKey(base64Value) {
  return getWebCrypto().subtle.importKey(
    "raw",
    base64ToBytes(base64Value),
    { name: CRYPTO_CONFIG.cipher },
    true, // must remain re-wrappable when an authorized couple changes its passphrase
    ["encrypt", "decrypt"]
  );
}

async function wrapVaultDataKey(dataKey, profileKey) {
  return encryptData({ rawKey: await exportVaultDataKey(dataKey) }, profileKey);
}

async function unwrapVaultDataKey(wrappedKey, profileKey) {
  const value = await decryptData(wrappedKey, profileKey);
  if (!value?.rawKey) throw new Error("Wrapped vault key is invalid.");
  return importVaultDataKey(value.rawKey);
}

async function createAccessProfile(label, passphrase, sharedKey, privateKey) {
  const authentication = await createAuthenticationData(passphrase);
  const profileKey = await authenticatePassphrase(passphrase, authentication);
  if (!profileKey) throw new Error(`Unable to create ${label} access.`);
  return {
    label,
    authentication,
    credentialsTemporary: false,
    wrappedKeys: {
      shared: await wrapVaultDataKey(sharedKey, profileKey),
      private: await wrapVaultDataKey(privateKey, profileKey)
    }
  };
}

async function createTwoCoupleVault(coupleAPassphrase, coupleBPassphrase) {
  if (!coupleAPassphrase || !coupleBPassphrase) {
    throw new Error("Both couple passphrases are required.");
  }
  if (coupleAPassphrase === coupleBPassphrase) {
    throw new Error("The two couples must use different passphrases.");
  }

  const sharedKey = await generateVaultDataKey();
  const coupleAKey = await generateVaultDataKey();
  const coupleBKey = await generateVaultDataKey();
  const [coupleA, coupleB] = await Promise.all([
    createAccessProfile("Couple A", coupleAPassphrase, sharedKey, coupleAKey),
    createAccessProfile("Couple B", coupleBPassphrase, sharedKey, coupleBKey)
  ]);
  coupleA.credentialsTemporary = false;
  coupleB.credentialsTemporary = true;

  const now = new Date().toISOString();
  vault.id = generateUUID();
  vault.state = "locked";
  vault.created = now;
  vault.lastOpened = null;
  vault.timeoutMinutes = 30;
  vault.version = "3.4";
  vault.authentication = null;
  vault.encryptedPayload = null;
  vault.architecture = TWO_COUPLE_ARCHITECTURE;
  vault.accessProfiles = { coupleA, coupleB };
  vault.zones = {
    shared: { encryptedPayload: await encryptData(emptyZoneData(), sharedKey) },
    coupleA: { encryptedPayload: await encryptData(emptyZoneData(), coupleAKey) },
    coupleB: { encryptedPayload: await encryptData(emptyZoneData(), coupleBKey) }
  };

  activeEncryptionKey = null;
  activeVaultData = null;
  activeProfileId = null;
  activeZoneKeys = null;
  return vault;
}

// Legacy creator retained only for compatibility with older test helpers.
async function createVault(passphrase, initialData) {
  if (!passphrase) throw new Error("A passphrase is required to create a vault.");
  if (!initialData || typeof initialData !== "object") throw new Error("Sample vault data is required.");
  const authentication = await createAuthenticationData(passphrase);
  const salt = base64ToBytes(authentication.salt);
  const key = await deriveEncryptionKey(passphrase, salt);
  const encryptedPayload = await encryptData(initialData, key);
  vault.id = generateUUID();
  vault.state = "locked";
  vault.created = new Date().toISOString();
  vault.lastOpened = null;
  vault.timeoutMinutes = 30;
  vault.version = "2.1";
  vault.authentication = authentication;
  vault.encryptedPayload = encryptedPayload;
  vault.architecture = null;
  vault.accessProfiles = null;
  vault.zones = null;
  activeEncryptionKey = null;
  activeVaultData = null;
  activeProfileId = null;
  activeZoneKeys = null;
  return vault;
}

function restoreVault(savedVault) {
  if (!savedVault?.id) return false;
  vault.id = savedVault.id;
  vault.state = "locked";
  vault.created = savedVault.created ?? null;
  vault.lastOpened = savedVault.lastOpened ?? null;
  vault.timeoutMinutes = savedVault.timeoutMinutes ?? 30;
  vault.version = savedVault.version ?? "2.1";
  vault.authentication = savedVault.authentication ?? null;
  vault.encryptedPayload = savedVault.encryptedPayload ?? null;
  vault.architecture = savedVault.architecture ?? null;
  vault.accessProfiles = savedVault.accessProfiles ?? null;
  vault.zones = savedVault.zones ?? null;
  activeEncryptionKey = null;
  activeVaultData = null;
  activeProfileId = null;
  activeZoneKeys = null;
  return true;
}

function resetVaultState() {
  vault.id = "";
  vault.state = "locked";
  vault.created = null;
  vault.lastOpened = null;
  vault.timeoutMinutes = 30;
  vault.version = "2.2";
  vault.authentication = null;
  vault.encryptedPayload = null;
  vault.architecture = null;
  vault.accessProfiles = null;
  vault.zones = null;
  activeEncryptionKey = null;
  activeVaultData = null;
  activeProfileId = null;
  activeZoneKeys = null;
  if (typeof clearAutoLockTimer === "function") clearAutoLockTimer();
  return true;
}

function getVault() { return vault; }
function getVaultState() { return vault.state; }
function vaultExists() { return Boolean(vault.id); }
function getActiveEncryptionKey() { return activeEncryptionKey; }
function getActiveVaultData() { return activeVaultData; }
function getActiveProfileId() { return activeProfileId; }
function getActiveProfileLabel() {
  if (activeProfileId === "coupleA") return vault.accessProfiles?.coupleA?.label || "Couple A";
  if (activeProfileId === "coupleB") return vault.accessProfiles?.coupleB?.label || "Couple B";
  return activeProfileId === "legacy" ? "Legacy vault" : "";
}
function getActiveZoneKeys() { return activeZoneKeys; }
function getActiveAccessProfile() {
  return activeProfileId === "coupleA" || activeProfileId === "coupleB"
    ? vault.accessProfiles?.[activeProfileId] || null
    : null;
}
function activeProfileUsesTemporaryPassphrase() {
  return Boolean(getActiveAccessProfile()?.credentialsTemporary);
}

async function changeActiveProfilePassphrase(currentPassphrase, newPassphrase) {
  if (!isTwoCoupleVault() || vault.state !== "unlocked" || !activeZoneKeys || !activeProfileId) {
    throw new Error("Unlock a two-couple vault first.");
  }
  if (!currentPassphrase || !newPassphrase || newPassphrase.length < 8) {
    throw new Error("The new passphrase must be at least 8 characters.");
  }
  const profile = vault.accessProfiles?.[activeProfileId];
  const currentKey = await authenticatePassphrase(currentPassphrase, profile?.authentication);
  if (!currentKey) throw new Error("The current passphrase is incorrect.");
  const otherProfileId = activeProfileId === "coupleA" ? "coupleB" : "coupleA";
  const otherMatch = await authenticatePassphrase(newPassphrase, vault.accessProfiles?.[otherProfileId]?.authentication);
  if (otherMatch) throw new Error("Each couple must use a different passphrase.");
  const newAuthentication = await createAuthenticationData(newPassphrase);
  const newProfileKey = await authenticatePassphrase(newPassphrase, newAuthentication);
  if (!newProfileKey) throw new Error("Unable to create the new passphrase credential.");
  profile.authentication = newAuthentication;
  profile.wrappedKeys = {
    shared: await wrapVaultDataKey(activeZoneKeys.shared, newProfileKey),
    private: await wrapVaultDataKey(activeZoneKeys.private, newProfileKey)
  };
  profile.credentialsTemporary = false;
  activeEncryptionKey = newProfileKey;
  return true;
}

function vaultUsesWebCrypto() {
  if (isTwoCoupleVault()) {
    const profileValid = profile => Boolean(
      profile?.authentication?.salt &&
      profile?.authentication?.verifier?.iv &&
      profile?.authentication?.verifier?.ciphertext &&
      profile?.wrappedKeys?.shared?.iv && profile?.wrappedKeys?.shared?.ciphertext &&
      profile?.wrappedKeys?.private?.iv && profile?.wrappedKeys?.private?.ciphertext
    );
    const zoneValid = zone => Boolean(zone?.encryptedPayload?.iv && zone?.encryptedPayload?.ciphertext);
    return profileValid(vault.accessProfiles.coupleA) && profileValid(vault.accessProfiles.coupleB) &&
      zoneValid(vault.zones.shared) && zoneValid(vault.zones.coupleA) && zoneValid(vault.zones.coupleB);
  }
  return Boolean(
    vault.authentication?.salt && vault.authentication?.verifier?.iv && vault.authentication?.verifier?.ciphertext &&
    vault.encryptedPayload?.iv && vault.encryptedPayload?.ciphertext
  );
}

function combineZoneData(sharedData, privateData) {
  const shared = sharedData && typeof sharedData === "object" ? sharedData : emptyZoneData();
  const priv = privateData && typeof privateData === "object" ? privateData : emptyZoneData();
  return {
    schemaVersion: ZONE_SCHEMA_VERSION,
    records: [
      ...(Array.isArray(shared.records) ? shared.records.map(r => ({ ...r, accessScope: "shared" })) : []),
      ...(Array.isArray(priv.records) ? priv.records.map(r => ({ ...r, accessScope: "private" })) : [])
    ],
    deletedRecords: [
      ...(Array.isArray(shared.deletedRecords) ? shared.deletedRecords.map(r => ({ ...r, accessScope: "shared" })) : []),
      ...(Array.isArray(priv.deletedRecords) ? priv.deletedRecords.map(r => ({ ...r, accessScope: "private" })) : [])
    ]
  };
}

function splitActiveDataByScope(data) {
  const source = data && typeof data === "object" ? data : emptyZoneData();
  const records = Array.isArray(source.records) ? source.records : [];
  const deletedRecords = Array.isArray(source.deletedRecords) ? source.deletedRecords : [];
  const stripScope = record => {
    const copy = { ...record };
    delete copy.accessScope;
    return copy;
  };
  return {
    shared: {
      schemaVersion: ZONE_SCHEMA_VERSION,
      records: records.filter(r => r.accessScope !== "private").map(stripScope),
      deletedRecords: deletedRecords.filter(r => r.accessScope !== "private").map(stripScope)
    },
    private: {
      schemaVersion: ZONE_SCHEMA_VERSION,
      records: records.filter(r => r.accessScope === "private").map(stripScope),
      deletedRecords: deletedRecords.filter(r => r.accessScope === "private").map(stripScope)
    }
  };
}

async function persistTwoCoupleActiveData() {
  if (!isTwoCoupleVault() || vault.state !== "unlocked" || !activeVaultData || !activeProfileId || !activeZoneKeys) {
    return false;
  }
  const split = splitActiveDataByScope(activeVaultData);
  vault.zones.shared.encryptedPayload = await encryptData(split.shared, activeZoneKeys.shared);
  vault.zones[activeProfileId].encryptedPayload = await encryptData(split.private, activeZoneKeys.private);
  return true;
}

async function unlockTwoCoupleVault(passphrase) {
  for (const profileId of ["coupleA", "coupleB"]) {
    const profile = vault.accessProfiles?.[profileId];
    const profileKey = await authenticatePassphrase(passphrase, profile?.authentication);
    if (!profileKey) continue;
    try {
      const sharedKey = await unwrapVaultDataKey(profile.wrappedKeys.shared, profileKey);
      const privateKey = await unwrapVaultDataKey(profile.wrappedKeys.private, profileKey);
      const [sharedData, privateData] = await Promise.all([
        decryptData(vault.zones.shared.encryptedPayload, sharedKey),
        decryptData(vault.zones[profileId].encryptedPayload, privateKey)
      ]);
      activeEncryptionKey = profileKey;
      activeZoneKeys = { shared: sharedKey, private: privateKey };
      activeProfileId = profileId;
      activeVaultData = combineZoneData(sharedData, privateData);
      vault.state = "unlocked";
      vault.lastOpened = new Date().toISOString();
      return true;
    } catch (error) {
      if (error?.name !== "OperationError") console.error("Two-couple vault decryption failed:", error);
      return false;
    }
  }
  return false;
}

async function unlockVault(passphrase) {
  if (!vaultExists() || !vaultUsesWebCrypto()) return false;
  if (isTwoCoupleVault()) return unlockTwoCoupleVault(passphrase);

  const key = await authenticatePassphrase(passphrase, vault.authentication);
  if (!key) return false;
  try {
    activeVaultData = await decryptData(vault.encryptedPayload, key);
    activeEncryptionKey = key;
    activeZoneKeys = null;
    activeProfileId = "legacy";
    vault.state = "unlocked";
    vault.lastOpened = new Date().toISOString();
    return true;
  } catch (error) {
    activeEncryptionKey = null;
    activeVaultData = null;
    activeProfileId = null;
    activeZoneKeys = null;
    vault.state = "locked";
    if (error?.name !== "OperationError") console.error("Vault payload decryption failed:", error);
    return false;
  }
}

async function upgradeLegacyVaultToTwoCouple(coupleBPassphrase) {
  if (isTwoCoupleVault()) throw new Error("This vault already uses two-couple access.");
  if (vault.state !== "unlocked" || activeProfileId !== "legacy" || !activeEncryptionKey || !activeVaultData) {
    throw new Error("Unlock the legacy vault first.");
  }
  if (!coupleBPassphrase || coupleBPassphrase.length < 8) throw new Error("Couple B passphrase must be at least 8 characters.");
  const matchesA = await authenticatePassphrase(coupleBPassphrase, vault.authentication);
  if (matchesA) throw new Error("Couple B must use a different passphrase from Couple A.");

  const sharedKey = await generateVaultDataKey();
  const privateAKey = await generateVaultDataKey();
  const privateBKey = await generateVaultDataKey();
  const existingAuthentication = vault.authentication;
  const coupleA = {
    label: "Couple A",
    authentication: existingAuthentication,
    wrappedKeys: {
      shared: await wrapVaultDataKey(sharedKey, activeEncryptionKey),
      private: await wrapVaultDataKey(privateAKey, activeEncryptionKey)
    }
  };
  const coupleB = await createAccessProfile("Couple B", coupleBPassphrase, sharedKey, privateBKey);
  coupleA.credentialsTemporary = false;
  coupleB.credentialsTemporary = true;

  // Privacy-first migration: legacy records become Couple A Private until deliberately shared.
  const privateAData = {
    schemaVersion: ZONE_SCHEMA_VERSION,
    records: (activeVaultData.records || []).map(r => { const c = { ...r }; delete c.accessScope; return c; }),
    deletedRecords: (activeVaultData.deletedRecords || []).map(r => { const c = { ...r }; delete c.accessScope; return c; })
  };
  vault.version = "3.4";
  vault.architecture = TWO_COUPLE_ARCHITECTURE;
  vault.authentication = null;
  vault.encryptedPayload = null;
  vault.accessProfiles = { coupleA, coupleB };
  vault.zones = {
    shared: { encryptedPayload: await encryptData(emptyZoneData(), sharedKey) },
    coupleA: { encryptedPayload: await encryptData(privateAData, privateAKey) },
    coupleB: { encryptedPayload: await encryptData(emptyZoneData(), privateBKey) }
  };
  activeProfileId = "coupleA";
  activeZoneKeys = { shared: sharedKey, private: privateAKey };
  activeVaultData = combineZoneData(emptyZoneData(), privateAData);
  return true;
}

function clearAutoLockTimer() {
  if (autoLockTimerId !== null) window.clearTimeout(autoLockTimerId);
  autoLockTimerId = null;
  autoLockDeadline = null;
}
function scheduleAutoLock(durationMs = autoLockDurationMs) {
  clearAutoLockTimer();
  if (vault.state !== "unlocked" || typeof autoLockHandler !== "function") return false;
  autoLockDurationMs = durationMs;
  autoLockDeadline = Date.now() + durationMs;
  autoLockTimerId = window.setTimeout(() => {
    autoLockTimerId = null; autoLockDeadline = null; autoLockHandler();
  }, durationMs);
  return true;
}
function startAutoLock(handler) { autoLockHandler = handler; autoLockDurationMs = vault.timeoutMinutes * 60 * 1000; return scheduleAutoLock(autoLockDurationMs); }
function noteVaultActivity() { if (vault.state !== "unlocked" || autoLockTimerId === null) return false; return scheduleAutoLock(autoLockDurationMs); }
function startAutoLockTest(handler) { autoLockHandler = handler; return scheduleAutoLock(VAULT_LIFECYCLE_CONFIG.autoLockTestSeconds * 1000); }
function checkAutoLockDeadline() {
  if (vault.state === "unlocked" && autoLockDeadline !== null && Date.now() >= autoLockDeadline && typeof autoLockHandler === "function") {
    clearAutoLockTimer(); autoLockHandler(); return true;
  }
  return false;
}
function clearAuthorizedVaultSessionCache(reason = "locked") {
  try {
    sessionStorage.removeItem("teeAuthorizedVaultSessionV1");
    window.dispatchEvent(new CustomEvent("tee-vault-session-changed", { detail: { reason } }));
  } catch {}
}
function lockVault(options = {}) {
  clearAutoLockTimer();
  activeEncryptionKey = null;
  activeVaultData = null;
  activeProfileId = null;
  activeZoneKeys = null;
  vault.state = "locked";
  if (!options.preserveAuthorizedSession) clearAuthorizedVaultSessionCache(options.reason || "locked");
  return true;
}
