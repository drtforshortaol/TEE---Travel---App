# TEE v3.4.27 — Stable Source Documents Workflow

Stable baseline established September 2, 2026.

## Verified workflow

- Windows installed/GitHub app updated successfully to v3.4.27.
- Passport: Add → authorize destination → ChatGPT extraction → Paste Results → Save → Review & Verify → Mark Verified & Finish → archived.
- Global Entry with two source images: Add → authorize destination → ChatGPT extraction/manual JSON path → Save → side-by-side retained originals and saved fields → Mark Verified & Finish → archived.
- Document Library shows retained local sources for completed records.

## Stable behavior

- Windows/desktop uses **Open ChatGPT + Copy Request** and does not invoke the unsupported Windows Share sheet.
- iPhone/iPad retain the native Share workflow.
- Paste Results and Manual Paste accept only valid `tee-chatgpt-extract-v1` JSON; the analysis request itself, prose, malformed JSON, and non-TEE JSON are rejected.
- Valid JSON is applied directly to matching review fields after validation.
- Multi-image source bundles count as visible retained originals during verification.
- Global Entry completeness requires Name, PASSID, and Expiration date; it does not inherit passport-only requirements.
- Protected destination authorization and local encrypted Vault behavior remain unchanged.

## Consolidation

`chatgpt-handoff-v3427.js` is the authoritative ChatGPT handoff/guidance runtime. The older `chatgpt-guidance-v3423.js` file is retained in the repository/cache for compatibility/history but is no longer loaded by the streamlined Source Documents runtime.

## Next development area

Improve Source Document Manager / Document Library organization and duplicate handling without changing the verified extraction/save/verification flow.
