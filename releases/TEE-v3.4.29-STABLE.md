# TEE v3.4.29 — Stable Source Documents Recovery

Status: Stable

Verified on Windows after the v3.4.28 Source Documents regression.

## Verified behavior
- Source Documents opens normally.
- Needs Attention opens without a Page Unresponsive loop.
- Saved Documents opens without a Page Unresponsive loop.
- Existing archived passport and Global Entry records remain intact.

## Recovery changes
- Removes the v3.4.28 related-record experiment from runtime.
- Removes the broad ChatGPT-panel MutationObserver feedback loop.
- Uses a fresh v3.4.29 service-worker cache to avoid mixed cached scripts.
- Performs no document migrations, merges, or deletions.

This release is the rollback/stability baseline before any further Source Document Manager enhancements.
