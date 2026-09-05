"use strict";

// Retired by the clean Vault refactor.
// Authorization now uses exactly one contract:
// Secure Vault -> same-origin postMessage with TEE_VAULT_SESSION_OPEN + full session
// -> vault-session.js stores the temporary 30-minute session in the current tab.
// This file intentionally does nothing and remains only for cache/backward compatibility.
