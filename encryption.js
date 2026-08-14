"use strict";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function getWebCrypto() {
  if (!globalThis.crypto || !globalThis.crypto.subtle) {
    throw new Error(
      "Web Crypto is unavailable. Open this project through localhost, such as VS Code Live Server."
    );
  }

  return globalThis.crypto;
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(offset, offset + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function base64ToBytes(base64Value) {
  const binary = atob(base64Value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function generateRandomBytes(length) {
  const cryptoApi = getWebCrypto();
  const bytes = new Uint8Array(length);
  cryptoApi.getRandomValues(bytes);
  return bytes;
}

function generateUUID() {
  const cryptoApi = getWebCrypto();

  if (typeof cryptoApi.randomUUID === "function") {
    return cryptoApi.randomUUID();
  }

  const bytes = generateRandomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
}

function generateSalt() {
  return generateRandomBytes(CRYPTO_CONFIG.saltLength);
}

function generateIV() {
  return generateRandomBytes(CRYPTO_CONFIG.ivLength);
}

async function deriveEncryptionKey(passphrase, salt) {
  const cryptoApi = getWebCrypto();

  const passphraseMaterial = await cryptoApi.subtle.importKey(
    "raw",
    textEncoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return cryptoApi.subtle.deriveKey(
    {
      name: CRYPTO_CONFIG.keyDerivation,
      salt,
      iterations: CRYPTO_CONFIG.iterations,
      hash: CRYPTO_CONFIG.hash
    },
    passphraseMaterial,
    {
      name: CRYPTO_CONFIG.cipher,
      length: CRYPTO_CONFIG.keyLength
    },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptData(value, key) {
  const cryptoApi = getWebCrypto();
  const iv = generateIV();
  const plaintext = textEncoder.encode(JSON.stringify(value));

  const ciphertext = await cryptoApi.subtle.encrypt(
    {
      name: CRYPTO_CONFIG.cipher,
      iv
    },
    key,
    plaintext
  );

  return {
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(ciphertext))
  };
}

async function decryptData(encryptedValue, key) {
  const cryptoApi = getWebCrypto();
  const iv = base64ToBytes(encryptedValue.iv);
  const ciphertext = base64ToBytes(encryptedValue.ciphertext);

  const plaintext = await cryptoApi.subtle.decrypt(
    {
      name: CRYPTO_CONFIG.cipher,
      iv
    },
    key,
    ciphertext
  );

  return JSON.parse(textDecoder.decode(plaintext));
}

async function runCryptoSelfTest() {
  const testPassphrase = "sandbox-self-test-passphrase";
  const testValue = {
    message: "Hello Vault",
    test: true
  };

  const salt = generateSalt();
  const key = await deriveEncryptionKey(testPassphrase, salt);
  const encrypted = await encryptData(testValue, key);
  const decrypted = await decryptData(encrypted, key);

  return (
    decrypted?.message === testValue.message &&
    decrypted?.test === true &&
    encrypted.ciphertext !== JSON.stringify(testValue)
  );
}
