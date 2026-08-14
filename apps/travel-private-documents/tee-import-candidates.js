"use strict";
let TEE_IMPORT_CANDIDATES = [];
let TEE_IMPORT_UNMAPPED = [];
window.TEE_IMPORT_CANDIDATES = TEE_IMPORT_CANDIDATES;
window.TEE_IMPORT_UNMAPPED = TEE_IMPORT_UNMAPPED;
function setTeeProtectedImportData(payload){
  TEE_IMPORT_CANDIDATES = Array.isArray(payload?.candidates) ? payload.candidates : [];
  TEE_IMPORT_UNMAPPED = Array.isArray(payload?.unmapped) ? payload.unmapped : [];
  window.TEE_IMPORT_CANDIDATES = TEE_IMPORT_CANDIDATES;
  window.TEE_IMPORT_UNMAPPED = TEE_IMPORT_UNMAPPED;
  if(typeof renderTeeImportWizard === 'function') renderTeeImportWizard();
}
