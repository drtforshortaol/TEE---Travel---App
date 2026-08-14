"use strict";

const CRYPTO_CONFIG = Object.freeze({
  version: "1.0",
  keyDerivation: "PBKDF2",
  hash: "SHA-256",
  cipher: "AES-GCM",
  keyLength: 256,
  saltLength: 16,
  ivLength: 12,
  iterations: 310000
});

const VAULT_LIFECYCLE_CONFIG = Object.freeze({
  autoLockMinutes: 30,
  autoLockTestSeconds: 10
});
