"use strict";

const AUTHENTICATION_MARKER = Object.freeze({
  purpose: "TEE Encryption Sandbox authentication",
  value: "vault-passphrase-valid"
});

/**
 * Creates the cryptographic material used to verify a vault passphrase.
 * The passphrase and derived key are never stored.
 */
async function createAuthenticationData(passphrase) {
  const salt = generateSalt();
  const key = await deriveEncryptionKey(passphrase, salt);
  const verifier = await encryptData(AUTHENTICATION_MARKER, key);

  return {
    salt: bytesToBase64(salt),
    verifier,
    cryptoVersion: CRYPTO_CONFIG.version
  };
}

/**
 * Derives a key from the supplied passphrase and verifies it by decrypting
 * the authentication marker. Returns the in-memory key when successful.
 */
async function authenticatePassphrase(passphrase, authenticationData) {
  if (
    !authenticationData?.salt ||
    !authenticationData?.verifier?.iv ||
    !authenticationData?.verifier?.ciphertext
  ) {
    return null;
  }

  try {
    const salt = base64ToBytes(authenticationData.salt);
    const key = await deriveEncryptionKey(passphrase, salt);
    const marker = await decryptData(authenticationData.verifier, key);

    if (
      marker?.purpose !== AUTHENTICATION_MARKER.purpose ||
      marker?.value !== AUTHENTICATION_MARKER.value
    ) {
      return null;
    }

    return key;
  } catch (error) {
    if (error?.name !== "OperationError") {
      console.error("Passphrase authentication failed:", error);
    }

    return null;
  }
}
