"use strict";

const VAULT_STORAGE_KEY = "teeSecureVaultV1";
const LEGACY_VAULT_SAFETY_SNAPSHOT_KEY = "teeSecureVaultLegacySafetySnapshotV1";

/**
 * Saves the supplied vault object in browser storage.
 */
function saveVault(vaultData) {
  try {
    const serializedVault = JSON.stringify(vaultData);
    localStorage.setItem(VAULT_STORAGE_KEY, serializedVault);

    console.log("Vault saved.");
    return true;
  } catch (error) {
    console.error("Unable to save the vault:", error);
    return false;
  }
}

/**
 * Loads the saved vault from browser storage.
 */
function loadVault() {
  try {
    const serializedVault = localStorage.getItem(VAULT_STORAGE_KEY);

    if (!serializedVault) {
      return null;
    }

    return JSON.parse(serializedVault);
  } catch (error) {
    console.error("Unable to load the vault:", error);
    return null;
  }
}

/**
 * Returns true when a saved vault exists.
 */
function hasVault() {
  return localStorage.getItem(VAULT_STORAGE_KEY) !== null;
}

/**
 * Deletes the saved vault.
 */
function deleteVault() {
  try {
    localStorage.removeItem(VAULT_STORAGE_KEY);

    console.log("Saved vault deleted.");
    return true;
  } catch (error) {
    console.error("Unable to delete the vault:", error);
    return false;
  }
}

/** Saves an encrypted legacy-vault snapshot before an architecture migration. */
function saveLegacyVaultSafetySnapshot(vaultData) {
  try {
    if (!vaultData?.id || vaultData?.architecture) return false;
    localStorage.setItem(LEGACY_VAULT_SAFETY_SNAPSHOT_KEY, JSON.stringify({
      savedAt: new Date().toISOString(),
      vault: { ...vaultData, state: "locked" }
    }));
    return true;
  } catch (error) {
    console.error("Unable to save legacy vault safety snapshot:", error);
    return false;
  }
}

function loadLegacyVaultSafetySnapshot() {
  try {
    const raw = localStorage.getItem(LEGACY_VAULT_SAFETY_SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.vault?.id ? parsed : null;
  } catch (error) {
    console.error("Unable to load legacy vault safety snapshot:", error);
    return null;
  }
}
