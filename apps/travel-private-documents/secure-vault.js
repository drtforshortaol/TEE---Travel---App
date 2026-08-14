"use strict";

const secureVaultUi = {
  panel: document.getElementById("secureVaultPanel"),
  status: document.getElementById("secureVaultStatus"),
  message: document.getElementById("secureVaultMessage"),
  manager: document.getElementById("secureVaultManager"),
  managerSummary: document.getElementById("secureVaultManagerSummary"),
  managerBadge: document.getElementById("secureVaultManagerBadge"),
  managerHint: document.getElementById("secureVaultManagerHint"),
  managerUnlock: document.getElementById("secureManagerUnlock"),
  managerCreate: document.getElementById("secureManagerCreate"),
  managerRestore: document.getElementById("secureManagerRestore"),
  managerReset: document.getElementById("secureManagerReset"),
  managerDiagnostics: document.getElementById("secureManagerDiagnostics"),
  storageDiagnostics: document.getElementById("secureStorageDiagnostics"),
  createFields: document.getElementById("secureCreateFields"),
  unlockFields: document.getElementById("secureUnlockFields"),
  contents: document.getElementById("secureVaultContents"),
  dashboard: document.getElementById("secureVaultDashboard"),
  dashboardGrid: document.getElementById("secureDashboardGrid"),
  passportMigration: document.getElementById("securePassportMigration"),
  passportMigrationSummary: document.getElementById("securePassportMigrationSummary"),
  passportMigrationButton: document.getElementById("securePassportMigrationButton"),
  globalEntryMigration: document.getElementById("secureGlobalEntryMigration"),
  globalEntryMigrationSummary: document.getElementById("secureGlobalEntryMigrationSummary"),
  globalEntryMigrationButton: document.getElementById("secureGlobalEntryMigrationButton"),
  dashboardShowAll: document.getElementById("secureDashboardShowAll"),
  health: document.getElementById("secureVaultHealth"),
  healthGrid: document.getElementById("secureVaultHealthGrid"),
  healthStatus: document.getElementById("secureVaultHealthStatus"),
  statistics: document.getElementById("secureVaultStatistics"),
  statisticsGrid: document.getElementById("secureVaultStatisticsGrid"),
  statisticsSummary: document.getElementById("secureVaultStatisticsSummary"),
  expirationDashboard: document.getElementById("secureExpirationDashboard"),
  expirationWindow: document.getElementById("secureExpirationWindow"),
  expirationSummary: document.getElementById("secureExpirationSummary"),
  expirationList: document.getElementById("secureExpirationList"),
  activityCenter: document.getElementById("secureActivityCenter"),
  activityLimit: document.getElementById("secureActivityLimit"),
  activitySummary: document.getElementById("secureActivitySummary"),
  activityList: document.getElementById("secureActivityList"),
  favorites: document.getElementById("secureFavorites"),
  favoritesList: document.getElementById("secureFavoritesList"),
  favoritesSummary: document.getElementById("secureFavoritesSummary"),
  tagExplorer: document.getElementById("secureTagExplorer"),
  tagList: document.getElementById("secureTagList"),
  tagSummary: document.getElementById("secureTagSummary"),
  selectedTagList: document.getElementById("secureSelectedTagList"),
  clearTagsButton: document.getElementById("secureClearTagsButton"),
  recycleBin: document.getElementById("secureRecycleBin"),
  recycleBinList: document.getElementById("secureRecycleBinList"),
  recycleBinSummary: document.getElementById("secureRecycleBinSummary"),
  emptyRecycleBinButton: document.getElementById("secureEmptyRecycleBinButton"),
  createPassphrase: document.getElementById("secureCreatePassphrase"),
  confirmPassphrase: document.getElementById("secureConfirmPassphrase"),
  createPassphraseB: document.getElementById("secureCreatePassphraseB"),
  confirmPassphraseB: document.getElementById("secureConfirmPassphraseB"),
  setupProgress: document.getElementById("secureSetupProgress"),
  setupStepA: document.getElementById("secureSetupStepA"),
  setupStepB: document.getElementById("secureSetupStepB"),
  setupStepReview: document.getElementById("secureSetupStepReview"),
  setupNextA: document.getElementById("secureSetupNextA"),
  setupBackB: document.getElementById("secureSetupBackB"),
  setupNextB: document.getElementById("secureSetupNextB"),
  setupBackReview: document.getElementById("secureSetupBackReview"),
  unlockPassphrase: document.getElementById("secureUnlockPassphrase"),
  accessArchitecture: document.getElementById("secureAccessArchitecture"),
  accessStatus: document.getElementById("secureAccessStatus"),
  accessDescription: document.getElementById("secureAccessDescription"),
  legacyUpgradeFields: document.getElementById("secureLegacyUpgradeFields"),
  upgradePassphraseB: document.getElementById("secureUpgradePassphraseB"),
  upgradeConfirmPassphraseB: document.getElementById("secureUpgradeConfirmPassphraseB"),
  upgradeArchitectureButton: document.getElementById("secureUpgradeArchitectureButton"),
  passphraseManagement: document.getElementById("securePassphraseManagement"),
  passphraseStatus: document.getElementById("securePassphraseStatus"),
  showChangePassphrase: document.getElementById("secureShowChangePassphrase"),
  changePassphraseFields: document.getElementById("secureChangePassphraseFields"),
  currentPassphrase: document.getElementById("secureCurrentPassphrase"),
  newPassphrase: document.getElementById("secureNewPassphrase"),
  confirmNewPassphrase: document.getElementById("secureConfirmNewPassphrase"),
  cancelPassphraseChange: document.getElementById("secureCancelPassphraseChange"),
  savePassphraseChange: document.getElementById("secureSavePassphraseChange"),
  recordType: document.getElementById("secureRecordType"),
  recordTemplate: document.getElementById("secureRecordTemplate"),
  recordSearch: document.getElementById("secureRecordSearch"),
  recordFilter: document.getElementById("secureRecordFilter"),
  runSearchButton: document.getElementById("secureRunSearchButton"),
  clearSearchButton: document.getElementById("secureClearSearchButton"),
  searchSummary: document.getElementById("secureSearchSummary"),
  addRecordButton: document.getElementById("secureAddRecordButton"),
  recordForm: document.getElementById("secureRecordForm"),
  recordFormTitle: document.getElementById("secureRecordFormTitle"),
  recordFields: document.getElementById("secureRecordFields"),
  cancelRecordButton: document.getElementById("secureCancelRecordButton"),
  recordList: document.getElementById("secureRecordList"),
  historyDialog: document.getElementById("secureHistoryDialog"),
  historyTitle: document.getElementById("secureHistoryTitle"),
  historyList: document.getElementById("secureHistoryList"),
  closeHistoryButton: document.getElementById("secureCloseHistoryButton"),
  relationshipsDialog: document.getElementById("secureRelationshipsDialog"),
  relationshipsTitle: document.getElementById("secureRelationshipsTitle"),
  relationshipsList: document.getElementById("secureRelationshipsList"),
  saveRelationshipsButton: document.getElementById("secureSaveRelationshipsButton"),
  closeRelationshipsButton: document.getElementById("secureCloseRelationshipsButton"),
  tagsDialog: document.getElementById("secureTagsDialog"),
  tagsTitle: document.getElementById("secureTagsTitle"),
  tagsInput: document.getElementById("secureTagsInput"),
  tagSuggestions: document.getElementById("secureTagSuggestions"),
  suggestedTags: document.getElementById("secureSuggestedTags"),
  saveTagsButton: document.getElementById("secureSaveTagsButton"),
  closeTagsButton: document.getElementById("secureCloseTagsButton"),
  exportButton: document.getElementById("secureExportButton"),
  verifyButton: document.getElementById("secureVerifyButton"),
  backupInfoButton: document.getElementById("secureBackupInfoButton"),
  importButton: document.getElementById("secureImportButton"),
  importFile: document.getElementById("secureImportFile"),
  backupReport: document.getElementById("secureBackupReport"),
  quickActions: document.getElementById("secureQuickActions"),
  quickNewRecord: document.getElementById("secureQuickNewRecord"),
  quickSearch: document.getElementById("secureQuickSearch"),
  quickFavorites: document.getElementById("secureQuickFavorites"),
  quickExpirations: document.getElementById("secureQuickExpirations"),
  quickRecycleBin: document.getElementById("secureQuickRecycleBin"),
  quickBackup: document.getElementById("secureQuickBackup"),
  quickTeeImport: document.getElementById("secureQuickTeeImport"),
  teeImport: document.getElementById("secureTeeImport"),
  teeImportClose: document.getElementById("secureTeeImportClose"),
  teeImportSummary: document.getElementById("secureTeeImportSummary"),
  teeImportList: document.getElementById("secureTeeImportList"),
  teeImportUnmapped: document.getElementById("secureTeeImportUnmapped"),
  teeImportSelectReady: document.getElementById("secureTeeImportSelectReady"),
  teeImportClear: document.getElementById("secureTeeImportClear"),
  teeImportRun: document.getElementById("secureTeeImportRun"),
  quickEmergency: document.getElementById("secureQuickEmergency"),
  emergencyMode: document.getElementById("secureEmergencyMode"),
  emergencySummary: document.getElementById("secureEmergencySummary"),
  emergencyList: document.getElementById("secureEmergencyList"),
  emergencyExit: document.getElementById("secureEmergencyExit"),
  emergencyLock: document.getElementById("secureEmergencyLock"),
  tripWorkspace: document.getElementById("secureTripWorkspace"),
  tripWorkspaceTitle: document.getElementById("secureTripWorkspaceTitle"),
  tripWorkspaceSummary: document.getElementById("secureTripWorkspaceSummary"),
  tripWorkspaceSearch: document.getElementById("secureTripWorkspaceSearch"),
  tripWorkspaceSections: document.getElementById("secureTripWorkspaceSections"),
  tripWorkspaceEmergency: document.getElementById("secureTripWorkspaceEmergency"),
  tripWorkspaceExit: document.getElementById("secureTripWorkspaceExit")
};

let editingRecordId = null;
let pendingBackupAction = "import";
let relationshipRecordId = null;
let tagEditingRecordId = null;
const activeTagFilters = new Set();
const DEFAULT_SUGGESTED_TAGS = ["Business", "Vacation", "Family", "Medical", "Financial", "Priority", "Important", "Personal", "Work"];
const RECYCLE_BIN_RETENTION_DAYS = 30;
let emergencyModeActive = false;
let activeTripWorkspaceId = null;
const EMERGENCY_RECORD_TYPES = new Set([
  "tripFolder", "passport", "globalEntry", "visa", "flight", "hotel", "rail", "railPass", "rentalCar",
  "travelInsurance", "medical", "emergencyContact", "websiteLogin", "creditCard"
]);
const EMERGENCY_TYPE_ORDER = [
  "tripFolder", "passport", "globalEntry", "visa", "flight", "hotel", "rail", "railPass", "rentalCar",
  "travelInsurance", "medical", "emergencyContact", "websiteLogin", "creditCard"
];


const SECURE_RECORD_TEMPLATES = Object.freeze({
  passport: [
    { value: "renewal", label: "Passport renewal planning", fields: { notes: "Renew at least six months before travel. Verify entry-validity requirements for every destination." } },
    { value: "secondary", label: "Second passport", fields: { notes: "Secondary passport record. Confirm which trips and visas are associated with this document." } }
  ],
  flight: [
    { value: "international", label: "International flight", fields: { notes: "Confirm passport name match, baggage allowance, meal preference, check-in window, and terminal." } },
    { value: "domestic", label: "Domestic flight", fields: { notes: "Confirm check-in window, baggage allowance, terminal, and ground transportation." } },
    { value: "multiCity", label: "Multi-city segment", fields: { notes: "One segment of a multi-city itinerary. Link this record to its Trip Folder and neighboring flight or rail records." } },
    { value: "charter", label: "Charter / special flight", fields: { notes: "Confirm operator instructions, meeting point, baggage restrictions, and emergency contact details." } }
  ],
  hotel: [
    { value: "standard", label: "Standard hotel stay", fields: { notes: "Confirm check-in time, cancellation terms, breakfast, taxes, and local transportation." } },
    { value: "business", label: "Business hotel", fields: { roomType: "Business room", notes: "Confirm quiet-room request, workspace, Wi-Fi, breakfast hours, and receipt requirements." } },
    { value: "resort", label: "Resort stay", fields: { roomType: "Resort room", notes: "Confirm resort fees, transfers, meal plan, included activities, and late checkout." } },
    { value: "vacationRental", label: "Vacation rental", fields: { roomType: "Vacation rental", notes: "Confirm host contact, entry instructions, access code, cleaning rules, and checkout requirements." } }
  ],
  rail: [
    { value: "intercity", label: "Intercity train", fields: { notes: "Confirm station, platform, coach, seat, luggage rules, and boarding time." } },
    { value: "nightTrain", label: "Night train", fields: { notes: "Confirm sleeper type, berth, linen, passport checks, boarding time, and arrival procedures." } },
    { value: "railPass", label: "Rail pass reservation", fields: { notes: "Confirm whether a separate seat reservation is required and keep the rail pass available for inspection." } }
  ],
  visa: [
    { value: "singleEntry", label: "Single-entry visa", fields: { numberOfEntries: "Single", notes: "Confirm permitted entry date, maximum stay, and passport linkage." } },
    { value: "multipleEntry", label: "Multiple-entry visa", fields: { numberOfEntries: "Multiple", notes: "Confirm validity window, maximum stay per visit, and passport linkage." } },
    { value: "electronic", label: "Electronic visa / authorization", fields: { visaType: "Electronic visa / authorization", notes: "Keep the approval reference and verify whether a printed copy is recommended." } }
  ],
  rentalCar: [
    { value: "airport", label: "Airport rental", fields: { pickupLocation: "Airport", returnLocation: "Airport", fuelPolicy: "Confirm at pickup", notes: "Confirm terminal shuttle, counter hours, driver requirements, toll policy, insurance, and fuel policy." } },
    { value: "city", label: "City rental", fields: { fuelPolicy: "Confirm at pickup", notes: "Confirm office hours, parking, restricted driving zones, toll policy, insurance, and return instructions." } },
    { value: "oneWay", label: "One-way rental", fields: { fuelPolicy: "Confirm at pickup", notes: "Confirm one-way fee, permitted countries/regions, return location, insurance, and fuel policy." } }
  ],
  medical: [
    { value: "travelerProfile", label: "Traveler medical profile", fields: { notes: "Review before departure. Keep medications in original packaging and carry essential doses in hand luggage." } },
    { value: "emergencySummary", label: "Emergency medical summary", fields: { notes: "Concise emergency summary for use by a companion or medical professional while traveling." } }
  ],
  travelInsurance: [
    { value: "singleTrip", label: "Single-trip policy", fields: { coverageNotes: "Confirm trip dates, medical coverage, evacuation, cancellation, delay, baggage, and exclusions.", notes: "Store the claims procedure and emergency assistance instructions." } },
    { value: "annual", label: "Annual travel policy", fields: { coverageNotes: "Confirm maximum trip length, covered regions, medical coverage, evacuation, cancellation, and exclusions.", notes: "Verify this trip falls within the annual policy limits." } }
  ],
  emergencyContact: [
    { value: "family", label: "Family contact", fields: { relationship: "Family", notes: "Primary family contact for urgent travel matters." } },
    { value: "local", label: "Local destination contact", fields: { relationship: "Local contact", notes: "Local contact who can assist with language, logistics, or emergencies." } },
    { value: "professional", label: "Professional / service contact", fields: { relationship: "Professional contact", notes: "Professional contact such as travel adviser, attorney, physician, or assistance provider." } }
  ],
  creditCard: [
    { value: "travel", label: "Primary travel card", fields: { notes: "Confirm foreign transaction fees, travel protections, international support number, and card-lock procedure." } },
    { value: "backup", label: "Backup payment card", fields: { notes: "Store separately from the primary card and confirm the international support number." } }
  ],
  loyaltyProgram: [
    { value: "airline", label: "Airline loyalty program", fields: { programCategory: "Airline", notes: "Verify the membership number is attached to relevant flight reservations." } },
    { value: "hotel", label: "Hotel loyalty program", fields: { programCategory: "Hotel", notes: "Verify the membership number is attached to relevant hotel reservations." } },
    { value: "rail", label: "Rail loyalty program", fields: { programCategory: "Rail", notes: "Verify the membership number is attached to relevant rail reservations." } },
    { value: "rentalCar", label: "Rental-car loyalty program", fields: { programCategory: "Rental car", notes: "Verify the membership number is attached to relevant rental reservations." } }
  ],
  bankingCurrency: [
    { value: "travelChecking", label: "Travel checking account", fields: { notes: "Confirm international ATM fees, withdrawal limits, fraud hotline, and travel-notice requirements." } },
    { value: "multiCurrency", label: "Multi-currency account", fields: { notes: "Confirm supported currencies, conversion fees, transfer limits, and emergency support." } }
  ],
  websiteLogin: [
    { value: "travelAccount", label: "Travel website account", fields: { notes: "Travel-related online account. Confirm recovery details and two-factor authentication before departure." } },
    { value: "governmentPortal", label: "Government travel portal", fields: { twoFactorMethod: "Confirm current method", notes: "Government or border-services account. Store backup codes securely and verify recovery access." } },
    { value: "financialPortal", label: "Financial or payment portal", fields: { twoFactorMethod: "Confirm current method", notes: "Financial login. Verify fraud support details and never reuse this password on another service." } }
  ],
  tripFolder: [
    { value: "internationalTrip", label: "International trip folder", fields: { notes: "Link passports, visas, flights, hotels, rail, insurance, medical details, emergency contacts, and payment records." } },
    { value: "cityStay", label: "Single-city stay", fields: { notes: "Link arrival, lodging, local transportation, emergency contacts, and departure records." } },
    { value: "multiCountry", label: "Multi-country itinerary", fields: { notes: "Link records by country and travel segment. Add tags for each destination and year." } }
  ]
});

function listRecordTemplates(type) {
  return Array.isArray(SECURE_RECORD_TEMPLATES[type]) ? SECURE_RECORD_TEMPLATES[type] : [];
}

function getRecordTemplate(type, value) {
  return listRecordTemplates(type).find(template => template.value === value) || null;
}

function setSecureMessage(text, type = "info") {
  secureVaultUi.message.textContent = text;
  secureVaultUi.message.dataset.type = type;
}

function maskValue(value) {
  if (!value) return "Not entered";
  const text = String(value);
  const visible = text.length > 4 ? text.slice(-4) : "";
  return visible ? `••••••${visible}` : "••••••••";
}

function createHistoryEntry(action, summary, timestamp = new Date().toISOString(), changes = []) {
  return {
    historyId: generateUUID(),
    timestamp,
    action,
    summary,
    changes: Array.isArray(changes) ? changes : []
  };
}

function normalizeHistoryChange(change = {}) {
  return {
    fieldKey: change.fieldKey || "",
    label: change.label || change.fieldKey || "Field",
    sensitivity: change.sensitivity === "secret" ? "secret" : (change.sensitivity === "hidden" ? "hidden" : "private"),
    oldValue: change.oldValue == null ? "" : String(change.oldValue),
    newValue: change.newValue == null ? "" : String(change.newValue)
  };
}

function collectFieldChanges(definition, previousFields = {}, nextFields = {}) {
  return definition.fields.reduce((changes, field) => {
    const oldValue = String(previousFields[field.key] || "").trim();
    const newValue = String(nextFields[field.key] || "").trim();

    if (oldValue !== newValue) {
      changes.push(normalizeHistoryChange({
        fieldKey: field.key,
        label: field.label,
        sensitivity: field.sensitivity,
        oldValue,
        newValue
      }));
    }

    return changes;
  }, []);
}

function formatHistoryValue(value, sensitivity) {
  if (!value) return "Not entered";
  if (sensitivity === "secret") return "Protected value";
  return sensitivity === "hidden" ? maskValue(value) : String(value);
}

function normalizeHistory(record, label) {
  if (Array.isArray(record.history) && record.history.length) {
    return record.history.map(entry => ({
      historyId: entry.historyId || generateUUID(),
      timestamp: entry.timestamp || record.lastModifiedAt || record.createdAt || new Date().toISOString(),
      action: entry.action || "Edited",
      summary: entry.summary || `${label} record updated`,
      changes: Array.isArray(entry.changes) ? entry.changes.map(normalizeHistoryChange) : []
    }));
  }

  return [createHistoryEntry(
    "Created",
    `${label} record created`,
    record.createdAt || record.created || new Date().toISOString()
  )];
}

function formatHistoryTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function showRecordHistory(record, definition) {
  noteVaultActivity();
  secureVaultUi.historyTitle.textContent = `${definition.label}: ${getRecordTitle(record)}`;
  secureVaultUi.historyList.replaceChildren();

  const history = Array.isArray(record.history) ? [...record.history].reverse() : [];
  if (!history.length) {
    const empty = document.createElement("p");
    empty.textContent = "No history is available for this record.";
    secureVaultUi.historyList.appendChild(empty);
  } else {
    history.forEach(entry => {
      const item = document.createElement("article");
      item.className = "secure-history-entry";

      const heading = document.createElement("div");
      const action = document.createElement("strong");
      action.textContent = entry.action;
      const time = document.createElement("time");
      time.dateTime = entry.timestamp;
      time.textContent = formatHistoryTimestamp(entry.timestamp);
      heading.append(action, time);

      const summary = document.createElement("p");
      summary.textContent = entry.summary;
      item.append(heading, summary);

      if (Array.isArray(entry.changes) && entry.changes.length) {
        const changesList = document.createElement("dl");
        changesList.className = "secure-history-changes";

        entry.changes.forEach(change => {
          const term = document.createElement("dt");
          term.textContent = change.label || change.fieldKey || "Field";

          const detail = document.createElement("dd");
          const oldValue = document.createElement("span");
          oldValue.textContent = formatHistoryValue(change.oldValue, change.sensitivity);
          const arrow = document.createElement("span");
          arrow.className = "secure-history-arrow";
          arrow.textContent = "→";
          const newValue = document.createElement("span");
          newValue.textContent = formatHistoryValue(change.newValue, change.sensitivity);
          detail.append(oldValue, arrow, newValue);
          changesList.append(term, detail);
        });

        item.appendChild(changesList);
      }

      secureVaultUi.historyList.appendChild(item);
    });
  }

  if (typeof secureVaultUi.historyDialog.showModal === "function") {
    secureVaultUi.historyDialog.showModal();
  } else {
    secureVaultUi.historyDialog.setAttribute("open", "");
  }
}

function createRecordMetadata(existing = {}) {
  const now = new Date().toISOString();
  return {
    recordId: existing.recordId || existing.id || generateUUID(),
    createdAt: existing.createdAt || existing.created || now,
    lastModifiedAt: existing.lastModifiedAt || existing.updated || existing.created || now,
    recordVersion: Number(existing.recordVersion) || 1,
    ownerVaultId: existing.ownerVaultId || getVault().id || ""
  };
}

function normalizeVaultData(data) {
  let migrated = data?.schemaVersion !== "3.7";
  let records = [];

  if (["3.7", "3.6", "3.5", "3.4", "3.3", "3.2", "3.1", "3.0"].includes(data?.schemaVersion) && Array.isArray(data.records)) {
    records = data.records;
  } else if (data?.schemaVersion === "2.0" && Array.isArray(data.records)) {
    migrated = true;
    records = data.records;
  } else {
    migrated = true;

    if (data && (data.travelerName || data.passportNumber)) {
      records.push({
        type: "passport",
        fields: {
          holderName: data.travelerName || "",
          passportNumber: data.passportNumber || ""
        }
      });
    }

    if (data?.confirmationCode) {
      records.push({
        type: "flight",
        fields: {
          travelerName: data.travelerName || "",
          confirmationCode: data.confirmationCode
        }
      });
    }
  }

  const sourceDeletedRecords = Array.isArray(data?.deletedRecords) ? data.deletedRecords : [];

  const normalizedRecords = records.map(record => {
    const metadata = createRecordMetadata(record);
    const definition = getSecureRecordDefinition(record.type);
    const label = definition?.label || "Secure";
    const history = normalizeHistory({ ...record, ...metadata }, label);
    const normalized = {
      ...metadata,
      type: record.type,
      fields: record.fields && typeof record.fields === "object" ? record.fields : {},
      relationships: Array.isArray(record.relationships) ? [...new Set(record.relationships.filter(Boolean))] : [],
      favorite: record.favorite === true,
      tags: normalizeTags(record.tags || []),
      accessScope: record.accessScope === "private" ? "private" : "shared",
      visibilityClass: normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope),
      recordStatus: ["active", "reference", "archive"].includes(record.recordStatus) ? record.recordStatus : "active",
      classificationLocked: record.classificationLocked === true,
      privacyReview: record.privacyReview === "owner-required" ? "owner-required" : "",
      history
    };

    if (
      record.id || record.created || record.updated ||
      !record.recordId || !record.createdAt || !record.lastModifiedAt ||
      !record.recordVersion || !record.ownerVaultId || !Array.isArray(record.history) || !Array.isArray(record.relationships) || typeof record.favorite !== "boolean" || !Array.isArray(record.tags) || !["shared", "private"].includes(record.accessScope) || !["private", "shared", "public"].includes(record.visibilityClass) || !["active", "reference", "archive"].includes(record.recordStatus)
    ) {
      migrated = true;
    }

    return normalized;
  });

  const normalizedDeletedRecords = sourceDeletedRecords.map(record => {
    const metadata = createRecordMetadata(record);
    const definition = getSecureRecordDefinition(record.type);
    const label = definition?.label || "Secure";
    return {
      ...metadata,
      type: record.type,
      fields: record.fields && typeof record.fields === "object" ? record.fields : {},
      relationships: Array.isArray(record.relationships) ? [...new Set(record.relationships.filter(Boolean))] : [],
      favorite: record.favorite === true,
      tags: normalizeTags(record.tags || []),
      accessScope: record.accessScope === "private" ? "private" : "shared",
      visibilityClass: normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope),
      recordStatus: ["active", "reference", "archive"].includes(record.recordStatus) ? record.recordStatus : "active",
      classificationLocked: record.classificationLocked === true,
      privacyReview: record.privacyReview === "owner-required" ? "owner-required" : "",
      history: normalizeHistory({ ...record, ...metadata }, label),
      deletedAt: record.deletedAt || record.lastModifiedAt || new Date().toISOString()
    };
  }).filter(record => {
    const deletedAt = new Date(record.deletedAt);
    if (Number.isNaN(deletedAt.getTime())) return true;
    return Date.now() - deletedAt.getTime() < RECYCLE_BIN_RETENTION_DAYS * 86400000;
  });

  if (!Array.isArray(data?.deletedRecords) || normalizedDeletedRecords.length !== sourceDeletedRecords.length) migrated = true;

  const normalized = { schemaVersion: "3.7", records: normalizedRecords, deletedRecords: normalizedDeletedRecords };

  if (data && typeof data === "object") {
    Object.keys(data).forEach(key => delete data[key]);
    Object.assign(data, normalized);
    return { migrated, data };
  }

  return { migrated: true, data: normalized };
}

function getRecordTitle(record) {
  const definition = getSecureRecordDefinition(record.type);

  for (const key of definition?.titleKeys || []) {
    if (record.fields?.[key]) return String(record.fields[key]);
  }

  return definition?.label || "Secure record";
}


function getRecordById(records, recordId) {
  return records.find(record => record.recordId === recordId) || null;
}

function focusSecureRecord(recordId) {
  const data = normalizeVaultData(getActiveVaultData()).data;
  const record = getRecordById(data.records, recordId);
  if (!record) return;

  // Direct navigation must not be blocked by an existing search or Smart Tag filter.
  if (secureVaultUi.recordSearch) secureVaultUi.recordSearch.value = "";
  if (secureVaultUi.recordFilter) secureVaultUi.recordFilter.value = record.type;
  activeTagFilters.clear();

  // Favorite/direct record navigation must also override a dashboard layout that hides Secure Records.
  const recordsWorkspace = document.getElementById("secureRecordsWorkspace");
  if (recordsWorkspace) recordsWorkspace.hidden = false;
  expandSecureRecordsWorkspace({ scroll: false });
  renderRecords();

  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-record-id="${CSS.escape(recordId)}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
    card?.classList.add("secure-record-highlight");
    window.setTimeout(() => card?.classList.remove("secure-record-highlight"), 1800);
  });
}

function renderRelatedRecords(record, records) {
  const wrap = document.createElement("section");
  wrap.className = "secure-related-records";
  const heading = document.createElement("h4");
  heading.textContent = "Related records";
  wrap.appendChild(heading);

  const related = (record.relationships || [])
    .map(id => getRecordById(records, id))
    .filter(Boolean);

  if (!related.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No related records yet.";
    wrap.appendChild(empty);
    return wrap;
  }

  const list = document.createElement("div");
  list.className = "secure-related-list";
  related.forEach(item => {
    const definition = getSecureRecordDefinition(item.type);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary secure-related-link";
    button.textContent = `${definition?.label || "Record"}: ${getRecordTitle(item)}`;
    button.addEventListener("click", () => {
      noteVaultActivity();
      // Relationship navigation should always reveal the record list before focusing the target.
      const recordsWorkspace = document.getElementById("secureRecordsWorkspace");
      if (recordsWorkspace) recordsWorkspace.hidden = false;
      expandSecureRecordsWorkspace({ scroll: false });
      focusSecureRecord(item.recordId);
    });
    list.appendChild(button);
  });
  wrap.appendChild(list);
  return wrap;
}

function openRelationshipsDialog(record) {
  noteVaultActivity();
  relationshipRecordId = record.recordId;
  const data = normalizeVaultData(getActiveVaultData()).data;
  const definition = getSecureRecordDefinition(record.type);
  secureVaultUi.relationshipsTitle.textContent = `Related Records: ${definition?.label || "Record"} — ${getRecordTitle(record)}`;
  secureVaultUi.relationshipsList.replaceChildren();

  const candidates = data.records.filter(item => item.recordId !== record.recordId);
  if (!candidates.length) {
    const empty = document.createElement("p");
    empty.textContent = "Add another secure record before creating a relationship.";
    secureVaultUi.relationshipsList.appendChild(empty);
  } else {
    candidates
      .sort((a, b) => getRecordTitle(a).localeCompare(getRecordTitle(b)))
      .forEach(item => {
        const itemDefinition = getSecureRecordDefinition(item.type);
        const label = document.createElement("label");
        label.className = "secure-relationship-option";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = item.recordId;
        checkbox.checked = (record.relationships || []).includes(item.recordId);
        const text = document.createElement("span");
        text.textContent = `${itemDefinition?.label || "Record"}: ${getRecordTitle(item)}`;
        label.append(checkbox, text);
        secureVaultUi.relationshipsList.appendChild(label);
      });
  }

  if (typeof secureVaultUi.relationshipsDialog.showModal === "function") {
    secureVaultUi.relationshipsDialog.showModal();
  } else {
    secureVaultUi.relationshipsDialog.setAttribute("open", "");
  }
}

async function saveRelationships() {
  noteVaultActivity();
  const data = normalizeVaultData(getActiveVaultData()).data;
  const record = getRecordById(data.records, relationshipRecordId);
  if (!record) return;

  const previousIds = new Set(record.relationships || []);
  const selectedIds = new Set(
    [...secureVaultUi.relationshipsList.querySelectorAll('input[type="checkbox"]:checked')]
      .map(input => input.value)
  );

  const previousTitles = [...previousIds].map(id => getRecordById(data.records, id)).filter(Boolean).map(getRecordTitle).sort();
  const selectedTitles = [...selectedIds].map(id => getRecordById(data.records, id)).filter(Boolean).map(getRecordTitle).sort();
  if (JSON.stringify(previousTitles) === JSON.stringify(selectedTitles)) {
    secureVaultUi.relationshipsDialog.close();
    setSecureMessage("No relationship changes were detected.", "info");
    return;
  }

  const now = new Date().toISOString();
  data.records.forEach(item => {
    item.relationships = Array.isArray(item.relationships) ? item.relationships.filter(Boolean) : [];
    const set = new Set(item.relationships);
    if (item.recordId === record.recordId) {
      item.relationships = [...selectedIds];
      return;
    }
    if (selectedIds.has(item.recordId)) set.add(record.recordId);
    else set.delete(record.recordId);
    item.relationships = [...set];
  });

  record.lastModifiedAt = now;
  record.recordVersion = (Number(record.recordVersion) || 1) + 1;
  record.history = Array.isArray(record.history) ? record.history : [];
  record.history.push(createHistoryEntry("Edited", "Related records changed", now, [{
    fieldKey: "relationships",
    label: "Related records",
    sensitivity: "private",
    oldValue: previousTitles.join(", "),
    newValue: selectedTitles.join(", ")
  }]));

  try {
    await persistActiveVaultData();
    secureVaultUi.relationshipsDialog.close();
    relationshipRecordId = null;
    renderRecords();
    setSecureMessage("Record relationships encrypted and saved.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to save relationships.", "error");
  }
}


function renderFavorites(records) {
  if (!secureVaultUi.favorites || !secureVaultUi.favoritesList) return;

  const favorites = records
    .filter(record => record.favorite === true)
    .sort((a, b) => getRecordTitle(a).localeCompare(getRecordTitle(b)));

  secureVaultUi.favoritesList.replaceChildren();
  if (secureVaultUi.favoritesSummary) {
    secureVaultUi.favoritesSummary.textContent = favorites.length
      ? `${favorites.length} favorite record${favorites.length === 1 ? "" : "s"}.`
      : "No favorite records yet.";
  }

  if (!favorites.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Use the Favorite button on any record to pin it here.";
    secureVaultUi.favoritesList.appendChild(empty);
    return;
  }

  favorites.forEach(record => {
    const definition = getSecureRecordDefinition(record.type);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary secure-favorite-link";
    button.textContent = `★ ${definition?.label || "Record"}: ${getRecordTitle(record)}`;
    button.addEventListener("click", () => {
      noteVaultActivity();
      focusSecureRecord(record.recordId);
    });
    secureVaultUi.favoritesList.appendChild(button);
  });
}

async function toggleFavorite(recordId) {
  noteVaultActivity();
  const data = normalizeVaultData(getActiveVaultData()).data;
  const record = getRecordById(data.records, recordId);
  if (!record) return;

  const definition = getSecureRecordDefinition(record.type);
  const now = new Date().toISOString();
  const nextValue = record.favorite !== true;
  record.favorite = nextValue;
  record.lastModifiedAt = now;
  record.recordVersion = (Number(record.recordVersion) || 1) + 1;
  record.history = Array.isArray(record.history) ? record.history : [];
  record.history.push(createHistoryEntry(
    "Edited",
    nextValue ? "Added to favorites" : "Removed from favorites",
    now,
    [{
      fieldKey: "favorite",
      label: "Favorite",
      sensitivity: "private",
      oldValue: nextValue ? "No" : "Yes",
      newValue: nextValue ? "Yes" : "No"
    }]
  ));

  try {
    await persistActiveVaultData();
    renderRecords();
    setSecureMessage(
      `${definition?.label || "Record"} ${nextValue ? "added to" : "removed from"} favorites.`,
      "success"
    );
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to update favorites.", "error");
  }
}

function normalizeTagName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeTags(values) {
  const result = [];
  const seen = new Set();
  (Array.isArray(values) ? values : String(values || "").split(",")).forEach(value => {
    const tag = normalizeTagName(value);
    const key = tag.toLocaleLowerCase();
    if (tag && !seen.has(key)) {
      seen.add(key);
      result.push(tag);
    }
  });
  return result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function getAllTags(records = []) {
  return normalizeTags(records.flatMap(record => record.tags || []));
}

function renderRecordTags(record) {
  const section = document.createElement("section");
  section.className = "secure-record-tags";
  const heading = document.createElement("h4");
  heading.textContent = "Tags";
  section.appendChild(heading);
  const list = document.createElement("div");
  list.className = "secure-record-tag-list";
  const tags = normalizeTags(record.tags || []);
  if (!tags.length) {
    const empty = document.createElement("span");
    empty.className = "muted";
    empty.textContent = "No tags.";
    list.appendChild(empty);
  } else {
    tags.forEach(tag => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = activeTagFilters.has(tag.toLocaleLowerCase()) ? "secure-tag-chip active" : "secure-tag-chip";
      button.textContent = tag;
      button.addEventListener("click", () => {
        noteVaultActivity();
        const key = tag.toLocaleLowerCase();
        if (activeTagFilters.has(key)) activeTagFilters.delete(key); else activeTagFilters.add(key);
        const recordsWorkspace = document.getElementById("secureRecordsWorkspace");
        if (recordsWorkspace) recordsWorkspace.hidden = false;
        renderRecords();
        expandSecureRecordsWorkspace();
      });
      list.appendChild(button);
    });
  }
  section.appendChild(list);
  return section;
}

function renderTagExplorer(records) {
  if (!secureVaultUi.tagExplorer || !secureVaultUi.tagList) return;
  const counts = new Map();
  records.forEach(record => normalizeTags(record.tags || []).forEach(tag => {
    const key = tag.toLocaleLowerCase();
    const current = counts.get(key) || { tag, count: 0 };
    current.count += 1;
    counts.set(key, current);
  }));

  const entries = [...counts.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  const selectedEntries = entries.filter(entry => activeTagFilters.has(entry.tag.toLocaleLowerCase()));
  const visibleCount = getVisibleRecords(records).length;

  secureVaultUi.tagList.replaceChildren();
  secureVaultUi.selectedTagList?.replaceChildren();

  if (secureVaultUi.selectedTagList) {
    if (!selectedEntries.length) {
      const none = document.createElement("span");
      none.className = "secure-selected-tag-empty";
      none.textContent = "None — all records are shown.";
      secureVaultUi.selectedTagList.appendChild(none);
    } else {
      selectedEntries.forEach(({ tag }) => {
        const key = tag.toLocaleLowerCase();
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "secure-selected-tag-chip";
        chip.setAttribute("aria-label", `Remove ${tag} filter`);
        chip.textContent = `${tag} ×`;
        chip.addEventListener("click", () => {
          noteVaultActivity();
          activeTagFilters.delete(key);
          const recordsWorkspace = document.getElementById("secureRecordsWorkspace");
          if (recordsWorkspace) recordsWorkspace.hidden = false;
          renderRecords();
          expandSecureRecordsWorkspace();
        });
        secureVaultUi.selectedTagList.appendChild(chip);
      });
    }
  }

  if (secureVaultUi.tagSummary) {
    secureVaultUi.tagSummary.textContent = activeTagFilters.size
      ? `Showing ${visibleCount} of ${records.length} records. Records must contain all ${activeTagFilters.size} selected tag${activeTagFilters.size === 1 ? "" : "s"}.`
      : `Showing all ${records.length} record${records.length === 1 ? "" : "s"}.`;
  }

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Use the Tags button on a record to add your first tag.";
    secureVaultUi.tagList.appendChild(empty);
    return;
  }

  entries.forEach(({ tag, count }) => {
    const key = tag.toLocaleLowerCase();
    const selected = activeTagFilters.has(key);
    const button = document.createElement("button");
    button.type = "button";
    button.className = selected ? "secure-tag-filter active" : "secure-tag-filter";
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = `${selected ? "✓ " : ""}${tag} (${count})`;
    button.addEventListener("click", () => {
      noteVaultActivity();
      if (activeTagFilters.has(key)) activeTagFilters.delete(key); else activeTagFilters.add(key);
      const recordsWorkspace = document.getElementById("secureRecordsWorkspace");
      if (recordsWorkspace) recordsWorkspace.hidden = false;
      renderRecords();
      expandSecureRecordsWorkspace();
    });
    secureVaultUi.tagList.appendChild(button);
  });
}

function openTagsDialog(record) {
  noteVaultActivity();
  tagEditingRecordId = record.recordId;
  const definition = getSecureRecordDefinition(record.type);
  secureVaultUi.tagsTitle.textContent = `Tags: ${definition?.label || "Record"} — ${getRecordTitle(record)}`;
  secureVaultUi.tagsInput.value = normalizeTags(record.tags || []).join(", ");
  const records = normalizeVaultData(getActiveVaultData()).data.records;
  const allTags = getAllTags(records);
  secureVaultUi.tagSuggestions.replaceChildren();
  allTags.forEach(tag => {
    const option = document.createElement("option");
    option.value = tag;
    secureVaultUi.tagSuggestions.appendChild(option);
  });
  secureVaultUi.suggestedTags.replaceChildren();
  normalizeTags([...DEFAULT_SUGGESTED_TAGS, ...allTags]).forEach(tag => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary secure-suggested-tag";
    button.textContent = tag;
    button.addEventListener("click", () => {
      const current = normalizeTags(secureVaultUi.tagsInput.value);
      if (!current.some(item => item.toLocaleLowerCase() === tag.toLocaleLowerCase())) current.push(tag);
      secureVaultUi.tagsInput.value = normalizeTags(current).join(", ");
    });
    secureVaultUi.suggestedTags.appendChild(button);
  });
  if (typeof secureVaultUi.tagsDialog.showModal === "function") secureVaultUi.tagsDialog.showModal();
  else secureVaultUi.tagsDialog.setAttribute("open", "");
  secureVaultUi.tagsInput.focus();
}

async function saveRecordTags() {
  if (!tagEditingRecordId) return;
  const data = normalizeVaultData(getActiveVaultData()).data;
  const record = data.records.find(item => item.recordId === tagEditingRecordId);
  if (!record) return;
  const previous = normalizeTags(record.tags || []);
  const next = normalizeTags(secureVaultUi.tagsInput.value);
  if (JSON.stringify(previous) === JSON.stringify(next)) {
    setSecureMessage("No tag changes were detected.", "info");
    secureVaultUi.tagsDialog.close();
    tagEditingRecordId = null;
    return;
  }
  const now = new Date().toISOString();
  record.tags = next;
  record.lastModifiedAt = now;
  record.recordVersion = (Number(record.recordVersion) || 1) + 1;
  record.history = Array.isArray(record.history) ? record.history : [];
  record.history.push(createHistoryEntry("Edited", "Tags updated", now, [{
    fieldKey: "tags", label: "Tags", sensitivity: "private",
    oldValue: previous.join(", "), newValue: next.join(", ")
  }]));
  try {
    await persistActiveVaultData();
    secureVaultUi.tagsDialog.close();
    tagEditingRecordId = null;
    renderRecords();
    setSecureMessage("Record tags encrypted and saved.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to save tags.", "error");
  }
}

async function persistActiveVaultData() {
  const data = getActiveVaultData();
  const key = getActiveEncryptionKey();

  if (getVaultState() !== "unlocked" || !data || !key) {
    throw new Error("Unlock the vault before saving records.");
  }

  if (isTwoCoupleVault()) {
    const persisted = await persistTwoCoupleActiveData();
    if (!persisted) throw new Error("The shared/private vault zones could not be encrypted.");
  } else {
    getVault().encryptedPayload = await encryptData(data, key);
  }

  const storedVault = { ...getVault(), state: "locked" };
  if (!saveVault(storedVault)) {
    throw new Error("The browser could not save the encrypted vault.");
  }
}


function normalizeSearchText(value) {
  return String(value || "").toLocaleLowerCase().trim();
}

function recordMatchesSearch(record, query, typeFilter) {
  if (typeFilter !== "all" && record.type !== typeFilter) return false;
  if (!query) return true;

  const definition = getSecureRecordDefinition(record.type);
  const searchableFieldValues = (definition?.fields || [])
    .filter(field => field.searchable !== false && field.sensitivity !== "secret")
    .map(field => record.fields?.[field.key] || "");
  const searchableValues = [
    definition?.label || "",
    definition?.description || "",
    ...searchableFieldValues,
    ...normalizeTags(record.tags || []),
    ...(record.relationships || []).map(id => {
      const related = getRecordById(normalizeVaultData(getActiveVaultData()).data.records, id);
      return related ? getRecordTitle(related) : "";
    })
  ];

  return searchableValues.some(value => normalizeSearchText(value).includes(query));
}

function getVisibleRecords(records) {
  const query = normalizeSearchText(secureVaultUi.recordSearch?.value);
  const typeFilter = secureVaultUi.recordFilter?.value || "all";
  return records.filter(record => {
    if (!recordMatchesDashboardSection(record)) return false;
    if (!recordMatchesSearch(record, query, typeFilter)) return false;
    if (!activeTagFilters.size) return true;
    const tags = new Set(normalizeTags(record.tags || []).map(tag => tag.toLocaleLowerCase()));
    return [...activeTagFilters].every(tag => tags.has(tag));
  });
}

function hasPassportMigrationRecord(records,markerTag){return records.some(r=>r.type==="passport"&&normalizeTags(r.tags||[]).some(t=>t.toLocaleLowerCase()===markerTag.toLocaleLowerCase()));}
function renderPassportMigrationPanel(records){
  if(!secureVaultUi.passportMigration)return;
  const a=getVaultState()==="unlocked"&&getActiveProfileId()==="coupleA";
  const done=hasPassportMigrationRecord(records,"tee-identity-passport-couple-a-1")&&hasPassportMigrationRecord(records,"tee-identity-passport-couple-a-2");
  secureVaultUi.passportMigration.hidden=!a||done;
}
async function decryptPassportMigrationPayload(migrationCode){
  if(typeof TEE_PASSPORT_MIGRATION==="undefined")throw new Error("Passport migration payload is unavailable.");
  const p=TEE_PASSPORT_MIGRATION, salt=base64ToBytes(p.salt), iv=base64ToBytes(p.iv), ciphertext=base64ToBytes(p.ciphertext), c=getWebCrypto();
  const material=await c.subtle.importKey("raw",textEncoder.encode(migrationCode),"PBKDF2",false,["deriveKey"]);
  const key=await c.subtle.deriveKey({name:"PBKDF2",salt,iterations:p.iterations||310000,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["decrypt"]);
  const plaintext=await c.subtle.decrypt({name:"AES-GCM",iv},key,ciphertext);
  return JSON.parse(textDecoder.decode(plaintext));
}
async function importCoupleAPassportMigration(){
  noteVaultActivity();
  if(getVaultState()!=="unlocked"||getActiveProfileId()!=="coupleA"){setSecureMessage("Unlock as Couple A before importing their passport records.","error");return;}
  const code=prompt("Enter the one-time Couple A passport migration code supplied with v3.3.16."); if(code===null)return;
  let payload; try{payload=await decryptPassportMigrationPayload(code.trim());}catch(e){setSecureMessage("The passport migration code is incorrect, or the migration package is damaged.","error");return;}
  if(payload?.targetProfile!=="coupleA"||!Array.isArray(payload?.records)){setSecureMessage("Passport migration package is invalid.","error");return;}
  const data=normalizeVaultData(getActiveVaultData()).data, now=new Date().toISOString(); let added=0;
  payload.records.forEach(seed=>{
    const tags=normalizeTags(seed.tags||[]), marker=tags.find(t=>t.startsWith("tee-identity-passport-"));
    if(marker&&hasPassportMigrationRecord(data.records,marker))return;
    data.records.push({recordId:generateUUID(),type:"passport",createdAt:now,lastModifiedAt:now,recordVersion:1,ownerVaultId:getVault().id,fields:{...(seed.fields||{})},relationships:[],favorite:false,tags,accessScope:"private",visibilityClass:"private",recordStatus:"active",history:[createHistoryEntry("Imported","Passport created from existing TEE Passports source; Couple A Private",now)]}); added++;
  });
  if(!added){setSecureMessage("Both Couple A passport records are already present.","info");renderRecords();return;}
  try{await persistActiveVaultData();renderRecords();if(typeof renderDocuments==="function")renderDocuments();setSecureMessage(`${added} passport record${added===1?"":"s"} encrypted into Couple A Private.`,"success");}
  catch(e){console.error(e);setSecureMessage(e.message||"Unable to save the passport records.","error");}
}

function hasGlobalEntryMigrationRecord(records,markerTag){return records.some(r=>r.type==="globalEntry"&&normalizeTags(r.tags||[]).some(t=>t.toLocaleLowerCase()===markerTag.toLocaleLowerCase()));}
function renderGlobalEntryMigrationPanel(records){
  if(!secureVaultUi.globalEntryMigration)return;
  const a=getVaultState()==="unlocked"&&getActiveProfileId()==="coupleA";
  const done=hasGlobalEntryMigrationRecord(records,"tee-identity-global-entry-couple-a-1")&&hasGlobalEntryMigrationRecord(records,"tee-identity-global-entry-couple-a-2");
  secureVaultUi.globalEntryMigration.hidden=!a||done;
}
async function decryptGlobalEntryMigrationPayload(migrationCode){
  if(typeof TEE_GLOBAL_ENTRY_MIGRATION==="undefined")throw new Error("Global Entry migration payload is unavailable.");
  const p=TEE_GLOBAL_ENTRY_MIGRATION, salt=base64ToBytes(p.salt), iv=base64ToBytes(p.iv), ciphertext=base64ToBytes(p.ciphertext), c=getWebCrypto();
  const material=await c.subtle.importKey("raw",textEncoder.encode(migrationCode),"PBKDF2",false,["deriveKey"]);
  const key=await c.subtle.deriveKey({name:"PBKDF2",salt,iterations:p.iterations||310000,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["decrypt"]);
  const plaintext=await c.subtle.decrypt({name:"AES-GCM",iv},key,ciphertext);
  return JSON.parse(textDecoder.decode(plaintext));
}
async function importCoupleAGlobalEntryMigration(){
  noteVaultActivity();
  if(getVaultState()!=="unlocked"||getActiveProfileId()!=="coupleA"){setSecureMessage("Unlock as Couple A before importing their Global Entry records.","error");return;}
  const code=prompt("Enter the one-time Couple A Global Entry migration code supplied with v3.3.32."); if(code===null)return;
  let payload; try{payload=await decryptGlobalEntryMigrationPayload(code.trim());}catch(e){setSecureMessage("The Global Entry migration code is incorrect, or the migration package is damaged.","error");return;}
  if(payload?.targetProfile!=="coupleA"||!Array.isArray(payload?.records)){setSecureMessage("Global Entry migration package is invalid.","error");return;}
  const data=normalizeVaultData(getActiveVaultData()).data, now=new Date().toISOString(); let added=0;
  payload.records.forEach(seed=>{
    const tags=normalizeTags(seed.tags||[]), marker=tags.find(t=>t.startsWith("tee-identity-global-entry-"));
    if(marker&&hasGlobalEntryMigrationRecord(data.records,marker))return;
    data.records.push({recordId:generateUUID(),type:"globalEntry",createdAt:now,lastModifiedAt:now,recordVersion:1,ownerVaultId:getVault().id,fields:{...(seed.fields||{})},relationships:[],favorite:false,tags,accessScope:"private",visibilityClass:"private",recordStatus:"active",history:[createHistoryEntry("Imported","Global Entry record created from existing TEE Passports source; Couple A Private",now)]}); added++;
  });
  if(!added){setSecureMessage("Both Couple A Global Entry records are already present.","info");renderRecords();return;}
  try{await persistActiveVaultData();renderRecords();if(typeof renderDocuments==="function")renderDocuments();setSecureMessage(`${added} Global Entry record${added===1?"":"s"} encrypted into Couple A Private.`,"success");}
  catch(e){console.error(e);setSecureMessage(e.message||"Unable to save the Global Entry records.","error");}
}

const VAULT_DASHBOARD_SECTIONS = Object.freeze([
  { key: "identity", label: "Identity", types: ["passport", "globalEntry", "visa"] },
  { key: "flight", label: "Flights", types: ["flight"] },
  { key: "rail", label: "Rail / Train", types: ["rail", "railPass"] },
  { key: "hotel", label: "Hotels / Lodging", types: ["hotel"] },
  { key: "transportation", label: "Transportation / Transfers", types: ["transportation", "rentalCar"] },
  { key: "activities", label: "Activities / Daily Ops", types: ["activity"] },
  { key: "emergency", label: "Emergency Contacts", types: ["emergencyContact"] },
  { key: "phone", label: "Phone & Data", types: ["phoneData"] },
  { key: "insurance", label: "Insurance", types: ["travelInsurance"] },
  { key: "money", label: "Money / Trip Costs", types: ["creditCard", "bankingCurrency"] },
  { key: "entry", label: "Travel / Entry Documents", types: ["passport", "globalEntry", "visa", "entryDocument"] },
  { key: "reference", label: "Reference", status: "reference" },
  { key: "archive", label: "Archive", status: "archive" }
]);

let activeDashboardSection = null;

function recordMatchesDashboardSection(record) {
  if (!activeDashboardSection) return true;
  const section = VAULT_DASHBOARD_SECTIONS.find(item => item.key === activeDashboardSection);
  if (!section) return true;
  if (section.status) return (record.recordStatus || "active") === section.status;
  return section.types.includes(record.type);
}

function renderVaultDashboard(records) {
  if (!secureVaultUi.dashboardGrid) return;

  secureVaultUi.dashboardGrid.replaceChildren();

  VAULT_DASHBOARD_SECTIONS.forEach(section => {
    const count = records.filter(record => {
      if (section.status) return (record.recordStatus || "active") === section.status;
      return section.types.includes(record.type);
    }).length;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secure-dashboard-card";
    button.dataset.dashboardSection = section.key;
    button.setAttribute("aria-label", `${section.label}: ${count} record${count === 1 ? "" : "s"}`);

    const label = document.createElement("span");
    label.className = "secure-dashboard-label";
    label.textContent = section.label;
    const number = document.createElement("strong");
    number.className = "secure-dashboard-count";
    number.textContent = String(count);
    const hint = document.createElement("small");
    hint.textContent = count === 1 ? "record" : "records";
    button.append(label, number, hint);

    button.addEventListener("click", () => {
      noteVaultActivity();
      activeDashboardSection = section.key;
      if (secureVaultUi.recordFilter) secureVaultUi.recordFilter.value = "all";
      if (secureVaultUi.recordSearch) secureVaultUi.recordSearch.value = "";
      activeTagFilters.clear();
      const recordsWorkspace = document.getElementById("secureRecordsWorkspace");
      if (recordsWorkspace) recordsWorkspace.hidden = false;
      expandSecureRecordsWorkspace({ scroll: false });
      renderRecords();
      requestAnimationFrame(() => secureVaultUi.recordList?.scrollIntoView({ behavior: "smooth", block: "start" }));
    });
    secureVaultUi.dashboardGrid.appendChild(button);
  });

  const sourceSection = document.getElementById("teeSourceDocumentManager");
  if (sourceSection) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secure-dashboard-card";
    button.innerHTML = '<span class="secure-dashboard-label">Source Documents</span><strong class="secure-dashboard-count">12</strong><small>managed sources</small>';
    button.addEventListener("click", () => sourceSection.scrollIntoView({ behavior: "smooth", block: "start" }));
    secureVaultUi.dashboardGrid.appendChild(button);
  }
}



const VAULT_HEALTH_STORAGE_KEY = "teeSecureVaultHealthMetadata";

function loadVaultHealthMetadata() {
  try {
    const raw = localStorage.getItem(VAULT_HEALTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn("Unable to read vault health metadata.", error);
    return {};
  }
}

function saveVaultHealthMetadata(updates = {}) {
  try {
    const current = loadVaultHealthMetadata();
    localStorage.setItem(VAULT_HEALTH_STORAGE_KEY, JSON.stringify({ ...current, ...updates }));
  } catch (error) {
    console.warn("Unable to save vault health metadata.", error);
  }
}

function formatHealthDate(value, fallback = "Never") {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function countHistoryEntries(records) {
  return records.reduce((total, record) => {
    return total + (Array.isArray(record.history) ? record.history.length : 0);
  }, 0);
}

function createHealthMetric(label, value, note = "") {
  const item = document.createElement("article");
  item.className = "secure-health-metric";

  const term = document.createElement("span");
  term.textContent = label;

  const result = document.createElement("strong");
  result.textContent = value;

  item.append(term, result);

  if (note) {
    const detail = document.createElement("small");
    detail.textContent = note;
    item.appendChild(detail);
  }

  return item;
}

function getVaultHealthAssessment(records, metadata) {
  const issues = [];
  if (!records.length) issues.push("No secure records yet");
  if (!metadata.lastBackupAt) issues.push("No backup recorded");

  if (metadata.lastBackupAt) {
    const ageDays = (Date.now() - new Date(metadata.lastBackupAt).getTime()) / 86400000;
    if (Number.isFinite(ageDays) && ageDays > 30) issues.push("Backup is over 30 days old");
  }

  return issues.length
    ? { label: "Attention", className: "attention", note: issues.join(" · ") }
    : { label: "Healthy ✓", className: "healthy", note: "Encryption, records, and backup status look good." };
}

function renderVaultHealth(records) {
  if (!secureVaultUi.healthGrid || getVaultState() !== "unlocked") return;

  const vault = getVault();
  const metadata = loadVaultHealthMetadata();
  const categories = new Set(records.map(record => record.type)).size;
  const historyEntries = countHistoryEntries(records);
  const assessment = getVaultHealthAssessment(records, metadata);

  secureVaultUi.healthGrid.replaceChildren(
    createHealthMetric("Records", String(records.length)),
    createHealthMetric("Categories in use", String(categories)),
    createHealthMetric("History entries", String(historyEntries)),
    createHealthMetric("Last backup", formatHealthDate(metadata.lastBackupAt)),
    createHealthMetric("Last restore", formatHealthDate(metadata.lastRestoreAt)),
    createHealthMetric("Last opened", formatHealthDate(vault.lastOpened)),
    createHealthMetric("Encryption", "AES-GCM", isTwoCoupleVault() ? "Separate Shared + private data keys; PBKDF2 access profiles" : "Legacy PBKDF2 single-zone encryption"),
    createHealthMetric("Backup version", String(SECURE_BACKUP_VERSION)),
    createHealthMetric("Vault version", String(vault.version || "1.5")),
    createHealthMetric("Auto-lock", `${Number(vault.timeoutMinutes) || 30} minutes`)
  );

  secureVaultUi.healthStatus.textContent = assessment.label;
  secureVaultUi.healthStatus.className = `secure-health-status ${assessment.className}`;
  secureVaultUi.healthStatus.title = assessment.note;
}



function countUniqueRelationships(records) {
  const activeIds = new Set(records.map(record => record.recordId));
  const links = new Set();

  records.forEach(record => {
    (Array.isArray(record.relationships) ? record.relationships : []).forEach(relatedId => {
      if (!activeIds.has(relatedId) || relatedId === record.recordId) return;
      links.add([record.recordId, relatedId].sort().join("::"));
    });
  });

  return links.size;
}

function getRecordDateRange(records) {
  const timestamps = records
    .flatMap(record => [record.createdAt, record.lastModifiedAt])
    .map(value => new Date(value).getTime())
    .filter(Number.isFinite);

  if (!timestamps.length) return { oldest: null, newest: null };
  return {
    oldest: new Date(Math.min(...timestamps)).toISOString(),
    newest: new Date(Math.max(...timestamps)).toISOString()
  };
}

function estimateEncryptedVaultSize() {
  try {
    const saved = loadVault();
    if (!saved) return 0;
    return new Blob([JSON.stringify(saved)]).size;
  } catch (error) {
    console.warn("Unable to estimate encrypted vault size.", error);
    return 0;
  }
}

function formatByteSize(bytes) {
  const value = Number(bytes) || 0;
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function getMostUsedCategory(records) {
  if (!records.length) return "None";
  const counts = records.reduce((map, record) => {
    map.set(record.type, (map.get(record.type) || 0) + 1);
    return map;
  }, new Map());
  const [type, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const label = getSecureRecordDefinition(type)?.label || type;
  return `${label} (${count})`;
}

function renderVaultStatistics(records, deletedRecords = []) {
  if (!secureVaultUi.statisticsGrid || getVaultState() !== "unlocked") return;

  const metadata = loadVaultHealthMetadata();
  const activeCategories = new Set(records.map(record => record.type)).size;
  const favorites = records.filter(record => record.favorite === true).length;
  const historyEntries = countHistoryEntries(records) + countHistoryEntries(deletedRecords);
  const relationshipLinks = countUniqueRelationships(records);
  const range = getRecordDateRange(records);
  const encryptedSize = estimateEncryptedVaultSize();

  secureVaultUi.statisticsGrid.replaceChildren(
    createHealthMetric("Active records", String(records.length)),
    createHealthMetric("Recycle Bin", String(deletedRecords.length), "Encrypted deleted records"),
    createHealthMetric("Categories in use", String(activeCategories)),
    createHealthMetric("Favorites", String(favorites)),
    createHealthMetric("Relationships", String(relationshipLinks), "Unique record links"),
    createHealthMetric("History entries", String(historyEntries), "Active and deleted records"),
    createHealthMetric("Most-used category", getMostUsedCategory(records)),
    createHealthMetric("Encrypted vault size", formatByteSize(encryptedSize), "Approximate browser storage size"),
    createHealthMetric("Oldest record", formatHealthDate(range.oldest, "None")),
    createHealthMetric("Newest activity", formatHealthDate(range.newest, "None")),
    createHealthMetric("Last backup", formatHealthDate(metadata.lastBackupAt)),
    createHealthMetric("Last restore", formatHealthDate(metadata.lastRestoreAt))
  );

  if (secureVaultUi.statisticsSummary) {
    const total = records.length + deletedRecords.length;
    secureVaultUi.statisticsSummary.textContent = `${total} total encrypted record${total === 1 ? "" : "s"}`;
  }
}


function getActivityEvents(records) {
  return records.flatMap(record => {
    const definition = getSecureRecordDefinition(record.type);
    const recordTitle = getRecordTitle(record);
    return (Array.isArray(record.history) ? record.history : []).map(entry => ({
      ...entry,
      recordId: record.recordId,
      recordType: record.type,
      recordLabel: definition?.label || record.type || "Record",
      recordTitle
    }));
  }).sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime() || 0;
    const bTime = new Date(b.timestamp).getTime() || 0;
    return bTime - aTime;
  });
}

function formatActivityDay(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const key = item => `${item.getFullYear()}-${item.getMonth()}-${item.getDate()}`;
  if (key(date) === key(today)) return "Today";
  if (key(date) === key(yesterday)) return "Yesterday";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(date);
}

function createActivityChangeList(changes) {
  const list = document.createElement("dl");
  list.className = "secure-activity-changes";
  changes.forEach(change => {
    const term = document.createElement("dt");
    term.textContent = change.label || change.fieldKey || "Field";
    const detail = document.createElement("dd");
    const oldValue = document.createElement("span");
    oldValue.textContent = formatHistoryValue(change.oldValue, change.sensitivity);
    const arrow = document.createElement("span");
    arrow.className = "secure-history-arrow";
    arrow.textContent = "→";
    const newValue = document.createElement("span");
    newValue.textContent = formatHistoryValue(change.newValue, change.sensitivity);
    detail.append(oldValue, arrow, newValue);
    list.append(term, detail);
  });
  return list;
}

function jumpToActivityRecord(event) {
  noteVaultActivity();
  // Activity Center navigation should use the same validated direct-record
  // navigation path as Favorites and Relationships. This guarantees that
  // Secure Records is revealed/expanded, conflicting filters are cleared,
  // and the requested record is scrolled into view and highlighted.
  focusSecureRecord(event.recordId);
}

function renderActivityCenter(records) {
  if (!secureVaultUi.activityList || getVaultState() !== "unlocked") return;
  const allEvents = getActivityEvents(records);
  const setting = secureVaultUi.activityLimit?.value || "1";
  const limit = setting === "all"
    ? allEvents.length
    : setting === "none"
      ? 0
      : Number(setting) || 1;
  const events = allEvents.slice(0, limit);

  secureVaultUi.activityList.replaceChildren();

  if (setting === "none") {
    secureVaultUi.activitySummary.textContent = "Activity is hidden.";
    return;
  }

  secureVaultUi.activitySummary.textContent = allEvents.length
    ? `Showing ${events.length} of ${allEvents.length} encrypted history event${allEvents.length === 1 ? "" : "s"}.`
    : "No record activity is available yet.";

  if (!events.length) return;

  let currentDay = "";
  events.forEach(event => {
    const day = formatActivityDay(event.timestamp);
    if (day !== currentDay) {
      currentDay = day;
      const heading = document.createElement("h4");
      heading.className = "secure-activity-day";
      heading.textContent = day;
      secureVaultUi.activityList.appendChild(heading);
    }

    const item = document.createElement("article");
    item.className = "secure-activity-entry";

    const top = document.createElement("div");
    top.className = "secure-activity-entry-head";
    const title = document.createElement("strong");
    title.textContent = `${event.action || "Updated"} ${event.recordLabel}`;
    const time = document.createElement("time");
    time.dateTime = event.timestamp;
    time.textContent = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(new Date(event.timestamp));
    top.append(title, time);

    const recordName = document.createElement("p");
    recordName.className = "secure-activity-record-name";
    recordName.textContent = event.recordTitle || event.recordLabel;
    item.append(top, recordName);

    if (event.summary) {
      const summary = document.createElement("p");
      summary.textContent = event.summary;
      item.appendChild(summary);
    }

    if (Array.isArray(event.changes) && event.changes.length) {
      item.appendChild(createActivityChangeList(event.changes));
    }

    const open = document.createElement("button");
    open.type = "button";
    open.className = "secondary secure-activity-open";
    open.textContent = "Open Record";
    open.addEventListener("click", () => jumpToActivityRecord(event));
    item.appendChild(open);
    secureVaultUi.activityList.appendChild(item);
  });
}

const EXPIRATION_FIELDS = Object.freeze({
  passport: ["expirationDate"],
  globalEntry: ["expirationDate"],
  visa: ["expirationDate"],
  travelInsurance: ["coverageEndDate"],
  creditCard: ["expirationDate"]
});

function parseExpirationDate(value) {
  const text = String(value || "").trim();
  if (!text) return null;

  // Native date fields use YYYY-MM-DD.
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const date = new Date(`${text}T23:59:59`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  // Credit cards are often entered as MM/YY or MM/YYYY and expire at month-end.
  const monthYear = text.match(/^(0?[1-9]|1[0-2])\s*[\/-]\s*(\d{2}|\d{4})$/);
  if (monthYear) {
    const month = Number(monthYear[1]);
    let year = Number(monthYear[2]);
    if (year < 100) year += 2000;
    return new Date(year, month, 0, 23, 59, 59);
  }

  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getDaysUntil(date) {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.ceil((target - start) / 86400000);
}

function getExpirationStatus(days) {
  if (days < 0) return { key: "expired", label: "Expired", className: "expired" };
  if (days <= 30) return { key: "urgent", label: days === 0 ? "Expires today" : `Expires in ${days} day${days === 1 ? "" : "s"}`, className: "urgent" };
  if (days <= 90) return { key: "soon", label: `Expires in ${days} days`, className: "soon" };
  return { key: "current", label: `Expires in ${days} days`, className: "current" };
}

function collectExpirationItems(records) {
  const items = [];
  records.forEach(record => {
    const definition = getSecureRecordDefinition(record.type);
    const keys = EXPIRATION_FIELDS[record.type] || [];
    keys.forEach(key => {
      const value = record.fields?.[key];
      const date = parseExpirationDate(value);
      if (!date || !definition) return;
      const field = definition.fields.find(item => item.key === key);
      const days = getDaysUntil(date);
      items.push({
        record,
        definition,
        fieldLabel: field?.label || "Expiration date",
        date,
        days,
        status: getExpirationStatus(days)
      });
    });
  });
  return items.sort((a, b) => a.date - b.date);
}

function formatExpirationDate(date) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function focusExpirationRecord(item) {
  noteVaultActivity();
  focusSecureRecord(item.record.recordId);
}

function renderExpirationDashboard(records) {
  if (!secureVaultUi.expirationDashboard || getVaultState() !== "unlocked") return;

  const windowValue = secureVaultUi.expirationWindow?.value || "90";
  const maxDays = windowValue === "all" ? Infinity : Number(windowValue);
  const allItems = collectExpirationItems(records);
  const visibleItems = allItems.filter(item => item.days < 0 || item.days <= maxDays);

  secureVaultUi.expirationList.replaceChildren();
  const counts = visibleItems.reduce((result, item) => {
    result[item.status.key] = (result[item.status.key] || 0) + 1;
    return result;
  }, {});

  secureVaultUi.expirationSummary.textContent = visibleItems.length
    ? `${counts.expired || 0} expired · ${counts.urgent || 0} within 30 days · ${counts.soon || 0} within 90 days · ${counts.current || 0} later`
    : "No expiration dates fall within this window.";

  if (!visibleItems.length) {
    const empty = document.createElement("p");
    empty.className = "secure-expiration-empty";
    empty.textContent = allItems.length
      ? "No items expire within the selected window."
      : "Add expiration dates to Passport, Visa, Travel Insurance, or Credit Card records.";
    secureVaultUi.expirationList.appendChild(empty);
    return;
  }

  visibleItems.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `secure-expiration-item ${item.status.className}`;
    button.addEventListener("click", () => focusExpirationRecord(item));

    const main = document.createElement("span");
    main.className = "secure-expiration-main";
    const title = document.createElement("strong");
    title.textContent = `${item.definition.label}: ${getRecordTitle(item.record)}`;
    const detail = document.createElement("span");
    detail.textContent = `${item.fieldLabel}: ${formatExpirationDate(item.date)}`;
    main.append(title, detail);

    const badge = document.createElement("span");
    badge.className = "secure-expiration-badge";
    badge.textContent = item.status.label;
    button.append(main, badge);
    secureVaultUi.expirationList.appendChild(button);
  });
}

function updateSearchSummary(visibleCount, totalCount) {
  if (!secureVaultUi.searchSummary) return;
  const query = normalizeSearchText(secureVaultUi.recordSearch?.value);
  const filtered = query || (secureVaultUi.recordFilter?.value || "all") !== "all";
  secureVaultUi.searchSummary.textContent = filtered
    ? `Showing ${visibleCount} of ${totalCount} encrypted records.`
    : `${totalCount} encrypted record${totalCount === 1 ? "" : "s"}.`;
}

function clearSecureSearch() {
  activeDashboardSection = null;
  if (secureVaultUi.recordSearch) secureVaultUi.recordSearch.value = "";
  if (secureVaultUi.recordFilter) secureVaultUi.recordFilter.value = "all";
  if (secureVaultUi.searchSummary) secureVaultUi.searchSummary.textContent = "";
  activeTagFilters.clear();
}


function populateRecordTemplates(type = secureVaultUi.recordType?.value) {
  if (!secureVaultUi.recordTemplate) return;
  const previous = secureVaultUi.recordTemplate.value;
  secureVaultUi.recordTemplate.replaceChildren();

  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = "Blank record";
  secureVaultUi.recordTemplate.appendChild(blank);

  listRecordTemplates(type).forEach(template => {
    const option = document.createElement("option");
    option.value = template.value;
    option.textContent = template.label;
    secureVaultUi.recordTemplate.appendChild(option);
  });

  const stillAvailable = Array.from(secureVaultUi.recordTemplate.options)
    .some(option => option.value === previous);
  secureVaultUi.recordTemplate.value = stillAvailable ? previous : "";
}

function getSelectedRecordTemplate(type) {
  return getRecordTemplate(type, secureVaultUi.recordTemplate?.value || "");
}

const TEE_SHARED_TRAVEL_RECORD_TYPES = new Set(["flight", "rail", "railPass", "hotel", "rentalCar", "transportation", "activity", "phoneData", "trip", "emergencyContact"]);
const TEE_PRIVATE_COUPLE_RECORD_TYPES = new Set(["passport", "globalEntry", "visa", "medical", "travelInsurance", "websiteLogin", "creditCard", "loyaltyProgram", "bankingCurrency"]);
const TEE_PUBLIC_SAFE_RECORD_TYPES = new Set(["publicReference"]);

function getEnforcedVisibilityClassForType(type) {
  if (TEE_PUBLIC_SAFE_RECORD_TYPES.has(type)) return "public";
  if (TEE_SHARED_TRAVEL_RECORD_TYPES.has(type)) return "shared";
  if (TEE_PRIVATE_COUPLE_RECORD_TYPES.has(type)) return "private";
  return null;
}

function normalizeVisibilityClass(value, type, accessScope) {
  if (["private", "shared", "public"].includes(value)) return value;
  return getEnforcedVisibilityClassForType(type) || (accessScope === "private" ? "private" : "shared");
}

function getEnforcedAccessScopeForType(type) {
  const visibility = getEnforcedVisibilityClassForType(type);
  if (visibility === "private") return "private";
  if (visibility === "shared" || visibility === "public") return "shared";
  return null;
}

function getVisibilityLabel(record) {
  const visibility = normalizeVisibilityClass(record?.visibilityClass, record?.type, record?.accessScope);
  if (visibility === "public") return "Public-safe · encrypted in Shared zone";
  if (visibility === "private") return `Private · ${getActiveProfileLabel()}`;
  return "Shared · both couples";
}

function getRecordLifecycleLabel(record) {
  if (record?.recordStatus === "reference") return "Reference";
  if (record?.recordStatus === "archive") return "Archive";
  return "Active";
}

async function setRecordCardStatus(recordId, status) {
  noteVaultActivity();
  const allowed = new Set(["private", "shared", "public", "reference", "archive"]);
  if (!allowed.has(status)) return;
  const data = normalizeVaultData(getActiveVaultData()).data;
  const record = data.records.find(item => item.recordId === recordId);
  if (!record) return;
  const now = new Date().toISOString();
  const oldClass = normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope);
  const oldLifecycle = record.recordStatus || "active";
  const changes = [];

  if (["private", "shared", "public"].includes(status)) {
    const newScope = status === "private" ? "private" : "shared";
    if (oldClass !== status) changes.push({ fieldKey: "visibilityClass", label: "Classification", sensitivity: "private", oldValue: oldClass, newValue: status });
    if ((record.accessScope || "shared") !== newScope) changes.push({ fieldKey: "accessScope", label: "Encrypted access zone", sensitivity: "private", oldValue: record.accessScope || "shared", newValue: newScope });
    if (oldLifecycle !== "active") changes.push({ fieldKey: "recordStatus", label: "Document status", sensitivity: "private", oldValue: oldLifecycle, newValue: "active" });
    record.visibilityClass = status;
    record.accessScope = newScope;
    record.recordStatus = "active";
    record.classificationLocked = true;
    if (newScope === "private") delete record.privacyReview;
  } else {
    if (oldLifecycle !== status) changes.push({ fieldKey: "recordStatus", label: "Document status", sensitivity: "private", oldValue: oldLifecycle, newValue: status });
    record.recordStatus = status;
    record.classificationLocked = true;
  }

  if (!changes.length) {
    setSecureMessage(`This record is already marked ${status}.`, "info");
    return;
  }
  record.lastModifiedAt = now;
  record.recordVersion = (Number(record.recordVersion) || 1) + 1;
  record.history = Array.isArray(record.history) ? record.history : [];
  record.history.push(createHistoryEntry("Status changed", `Record marked ${status} by user`, now, changes));
  try {
    await persistActiveVaultData();
    renderRecords();
    setSecureMessage(`Record status changed to ${status}.`, "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to change record status.", "error");
  }
}

async function moveRecordToRecycleBin(recordId) {
  noteVaultActivity();
  const data = normalizeVaultData(getActiveVaultData()).data;
  const deletedRecord = data.records.find(item => item.recordId === recordId);
  if (!deletedRecord) return;
  const definition = getSecureRecordDefinition(deletedRecord.type);
  if (!window.confirm(`Move this ${definition?.label || "record"} to the encrypted Recycle Bin?`)) return;
  const now = new Date().toISOString();
  deletedRecord.deletedAt = now;
  deletedRecord.lastModifiedAt = now;
  deletedRecord.recordVersion = (Number(deletedRecord.recordVersion) || 1) + 1;
  deletedRecord.history = Array.isArray(deletedRecord.history) ? deletedRecord.history : [];
  deletedRecord.history.push(createHistoryEntry("Deleted", `${definition?.label || "Record"} moved to Recycle Bin`, now));
  data.records = data.records.filter(item => item.recordId !== recordId);
  data.deletedRecords = Array.isArray(data.deletedRecords) ? data.deletedRecords : [];
  data.deletedRecords.push(deletedRecord);
  data.records.forEach(item => { item.relationships = (item.relationships || []).filter(id => id !== recordId); });
  try {
    await persistActiveVaultData();
    renderRecords();
    setSecureMessage(`${definition?.label || "Record"} moved to the encrypted Recycle Bin.`, "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to delete the record.", "error");
  }
}

function applyRecordAccessPolicyCorrections(data) {
  if (!isTwoCoupleVault() || !data || !Array.isArray(data.records)) return 0;
  let changed = 0;
  const now = new Date().toISOString();
  data.records.forEach(record => {
    if (record.classificationLocked === true) return;
    const enforcedVisibility = getEnforcedVisibilityClassForType(record.type);
    if (!enforcedVisibility) return;
    const enforcedScope = enforcedVisibility === "private" ? "private" : "shared";
    const oldVisibility = normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope);
    const oldScope = record.accessScope === "private" ? "private" : "shared";

    // Shared/Public classifications can safely move into the Shared encrypted zone.
    // Private records are never pulled out of Shared automatically because ownership between
    // the two couples must be explicit. They are flagged for privacy review instead.
    if (enforcedVisibility === "private" && oldScope !== "private") {
      if (record.visibilityClass !== "private" || record.privacyReview !== "owner-required") {
        record.visibilityClass = "private";
        record.privacyReview = "owner-required";
        record.lastModifiedAt = now;
        record.recordVersion = (Number(record.recordVersion) || 1) + 1;
        record.history = Array.isArray(record.history) ? record.history : [];
        record.history.push(createHistoryEntry("Policy review", "Private classification confirmed; owning couple must be assigned before moving this record out of Shared", now));
        changed += 1;
      }
      return;
    }

    let recordChanged = false;
    const changes = [];
    if (record.visibilityClass !== enforcedVisibility) {
      record.visibilityClass = enforcedVisibility;
      changes.push({ fieldKey: "visibilityClass", label: "Classification", sensitivity: "private", oldValue: oldVisibility, newValue: enforcedVisibility });
      recordChanged = true;
    }
    if (record.accessScope !== enforcedScope) {
      record.accessScope = enforcedScope;
      changes.push({ fieldKey: "accessScope", label: "Encrypted access zone", sensitivity: "private", oldValue: oldScope, newValue: enforcedScope });
      recordChanged = true;
    }
    if (record.privacyReview) {
      delete record.privacyReview;
      recordChanged = true;
    }
    if (!recordChanged) return;
    record.lastModifiedAt = now;
    record.recordVersion = (Number(record.recordVersion) || 1) + 1;
    record.history = Array.isArray(record.history) ? record.history : [];
    record.history.push(createHistoryEntry("Edited", `TEE classification policy applied: ${enforcedVisibility}`, now, changes));
    changed += 1;
  });
  return changed;
}

function teeImportTag(candidateId) {
  return `tee-import:${candidateId}`;
}


function normalizeTeeImportMatchValue(value) {
  return String(value ?? "").trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

function teeCandidateMatchesRecord(candidate, record) {
  if (!candidate || !record || candidate.type !== record.type) return false;
  const candidateFields = candidate.fields || {};
  const recordFields = record.fields || {};
  const strongKeysByType = {
    flight: ["confirmationCode", "ticketNumber", "flightNumber", "departureDate", "departureAirport", "arrivalAirport"],
    hotel: ["confirmationNumber", "hotelName", "checkInDate", "checkOutDate"],
    emergencyContact: ["name", "organization", "phone", "email"]
  };
  const keys = strongKeysByType[candidate.type] || Object.keys(candidateFields);
  let comparable = 0;
  let matches = 0;
  let exactIdentifierMatch = false;
  keys.forEach(key => {
    const expected = normalizeTeeImportMatchValue(candidateFields[key]);
    const actual = normalizeTeeImportMatchValue(recordFields[key]);
    if (!expected || !actual) return;
    comparable += 1;
    if (expected === actual) {
      matches += 1;
      if (["confirmationCode", "ticketNumber", "confirmationNumber", "phone", "email"].includes(key)) exactIdentifierMatch = true;
    }
  });
  if (exactIdentifierMatch) return true;
  if (candidate.type === "flight") return comparable >= 4 && matches >= 4;
  if (candidate.type === "hotel") return comparable >= 3 && matches >= 3;
  if (candidate.type === "emergencyContact") return comparable >= 2 && matches >= 2;
  return comparable >= 2 && matches === comparable;
}

function restoreMissingTeeImportTags(data) {
  if (!data || !Array.isArray(data.records) || !Array.isArray(TEE_IMPORT_CANDIDATES)) return 0;
  const records = data.records;
  let changed = 0;
  const now = new Date().toISOString();

  TEE_IMPORT_CANDIDATES.forEach(candidate => {
    const importTag = teeImportTag(candidate.id);
    const taggedMatches = records.filter(record => normalizeTags(record.tags || []).includes(importTag));
    const matches = taggedMatches.length ? taggedMatches : records.filter(record => teeCandidateMatchesRecord(candidate, record));
    if (matches.length !== 1) return;

    const record = matches[0];
    const existing = normalizeTags(record.tags || []);
    const restored = normalizeTags([...existing, "TEE Import", importTag]);
    if (restored.length === existing.length && restored.every((tag, index) => tag === existing[index])) return;

    record.tags = restored;
    record.lastModifiedAt = now;
    record.recordVersion = (Number(record.recordVersion) || 1) + 1;
    record.history = Array.isArray(record.history) ? record.history : [];
    record.history.push(createHistoryEntry("Tag restored", `Original TEE import identity tag restored: ${importTag}`, now, [
      { fieldKey: "tags", label: "Tags", sensitivity: "private", oldValue: existing.join(", "), newValue: restored.join(", ") }
    ]));
    changed += 1;
  });

  return changed;
}

function getTeeImportCandidateState(candidate) {
  const card = secureVaultUi.teeImportList?.querySelector(`[data-tee-import-id="${CSS.escape(candidate.id)}"]`);
  if (!card) return null;
  const definition = getSecureRecordDefinition(candidate.type);
  const fields = {};
  (definition?.fields || []).forEach(field => {
    const input = card.querySelector(`[data-tee-field="${CSS.escape(field.key)}"]`);
    fields[field.key] = String(input?.value || "").trim();
  });
  const enforcedScope = getEnforcedAccessScopeForType(candidate.type);
  return {
    selected: Boolean(card.querySelector('[data-tee-select]')?.checked),
    accessScope: enforcedScope || (card.querySelector('[data-tee-scope]')?.value === "private" ? "private" : "shared"),
    visibilityClass: getEnforcedVisibilityClassForType(candidate.type) || candidate.classification || candidate.scope || "shared",
    fields
  };
}

function teeCandidateAlreadyImported(candidate, records) {
  const tag = teeImportTag(candidate.id);
  return records.some(record => normalizeTags(record.tags || []).includes(tag));
}

function updateTeeImportSummary() {
  if (!secureVaultUi.teeImportSummary || !secureVaultUi.teeImportList) return;
  const cards = [...secureVaultUi.teeImportList.querySelectorAll('[data-tee-import-id]')];
  const selected = cards.filter(card => card.querySelector('[data-tee-select]')?.checked).length;
  const imported = cards.filter(card => card.dataset.imported === "true").length;
  const blocked = cards.filter(card => card.dataset.blocked === "true").length;
  secureVaultUi.teeImportSummary.textContent = `${selected} selected · ${imported} already imported · ${blocked} unavailable under this login · ${TEE_IMPORT_UNMAPPED.length} source items waiting for schema/verification.`;
}

function renderTeeImportUnmapped() {
  if (!secureVaultUi.teeImportUnmapped) return;
  secureVaultUi.teeImportUnmapped.replaceChildren();
  TEE_IMPORT_UNMAPPED.forEach(item => {
    const article = document.createElement("article");
    article.className = "secure-tee-unmapped-card";
    const heading = document.createElement("h4");
    heading.textContent = item.title;
    const meta = document.createElement("p");
    meta.className = "muted";
    meta.textContent = `${item.scope} · Source: ${item.source}`;
    const reason = document.createElement("p");
    reason.textContent = item.reason;
    const details = document.createElement("p");
    details.className = "secure-tee-source";
    details.textContent = item.details;
    article.append(heading, meta, reason, details);
    secureVaultUi.teeImportUnmapped.appendChild(article);
  });
}

function renderTeeImportWizard() {
  if (!secureVaultUi.teeImportList) return;
  const data = normalizeVaultData(getActiveVaultData()).data;
  const records = data.records || [];
  const activeProfile = getActiveProfileId();
  secureVaultUi.teeImportList.replaceChildren();

  TEE_IMPORT_CANDIDATES.forEach(candidate => {
    const definition = getSecureRecordDefinition(candidate.type);
    if (!definition) return;
    const imported = teeCandidateAlreadyImported(candidate, records);
    const enforcedScope = getEnforcedAccessScopeForType(candidate.type);
    const effectiveCandidateScope = enforcedScope || candidate.scope;
    const blocked = effectiveCandidateScope === "private" && candidate.targetProfile && candidate.targetProfile !== activeProfile;

    const article = document.createElement("article");
    article.className = "secure-tee-import-card";
    article.dataset.teeImportId = candidate.id;
    article.dataset.imported = imported ? "true" : "false";
    article.dataset.blocked = blocked ? "true" : "false";

    const head = document.createElement("div");
    head.className = "secure-tee-import-card-head";
    const selectLabel = document.createElement("label");
    selectLabel.className = "secure-tee-import-select";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.teeSelect = "";
    checkbox.checked = Boolean(candidate.selected && !imported && !blocked && candidate.status === "ready");
    checkbox.disabled = imported || blocked;
    const title = document.createElement("strong");
    title.textContent = candidate.title;
    selectLabel.append(checkbox, title);

    const badge = document.createElement("span");
    badge.className = `secure-tee-import-badge ${imported ? "imported" : blocked ? "blocked" : candidate.status}`;
    badge.textContent = imported ? "Imported" : blocked ? "Different couple login required" : candidate.status === "review" ? "Review required" : "Ready";
    head.append(selectLabel, badge);

    const meta = document.createElement("div");
    meta.className = "secure-tee-import-meta";
    const type = document.createElement("span");
    type.textContent = definition.label;
    const scopeLabel = document.createElement("label");
    scopeLabel.textContent = "Access ";
    const scope = document.createElement("select");
    scope.dataset.teeScope = "";
    const shared = document.createElement("option");
    shared.value = "shared";
    shared.textContent = "Shared — both couples";
    const priv = document.createElement("option");
    priv.value = "private";
    priv.textContent = `Private — ${getActiveProfileLabel()} only`;
    scope.append(shared, priv);
    scope.value = effectiveCandidateScope;
    if (enforcedScope) {
      scope.replaceChildren(enforcedScope === "shared" ? shared : priv);
      scope.value = enforcedScope;
      scope.title = enforcedScope === "shared"
        ? "TEE policy: flights, rail/train, and hotels are Shared between both couples."
        : "TEE policy: passport/visa identity records are Private to the owning couple.";
    }
    scope.disabled = imported || blocked;
    scopeLabel.append(scope);
    meta.append(type, scopeLabel);

    const source = document.createElement("p");
    source.className = "secure-tee-source";
    source.textContent = `TEE source: ${candidate.source}`;

    const details = document.createElement("details");
    details.className = "secure-tee-import-review";
    if (candidate.status === "review") details.open = true;
    const summary = document.createElement("summary");
    summary.textContent = "Review / edit extracted fields";
    const grid = document.createElement("div");
    grid.className = "secure-tee-import-fields";
    definition.fields.forEach(field => {
      const label = document.createElement("label");
      if (field.type === "textarea") label.classList.add("full");
      const span = document.createElement("span");
      span.textContent = field.label + (field.required ? " *" : "");
      const input = field.type === "textarea" ? document.createElement("textarea") : document.createElement("input");
      if (field.type !== "textarea") input.type = field.type || "text";
      input.dataset.teeField = field.key;
      input.value = candidate.fields?.[field.key] ?? "";
      input.disabled = imported || blocked;
      label.append(span, input);
      grid.appendChild(label);
    });
    details.append(summary, grid);
    article.append(head, meta, source, details);
    secureVaultUi.teeImportList.appendChild(article);
    checkbox.addEventListener("change", updateTeeImportSummary);
  });
  renderTeeImportUnmapped();
  updateTeeImportSummary();
}

function openTeeImportWizard() {
  noteVaultActivity();
  if (getVaultState() !== "unlocked") {
    setSecureMessage("Unlock the vault before reviewing TEE imports.", "error");
    return;
  }
  renderTeeImportWizard();
  secureVaultUi.teeImport.hidden = false;
  secureVaultUi.teeImport.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeTeeImportWizard() {
  if (secureVaultUi.teeImport) secureVaultUi.teeImport.hidden = true;
}

function setTeeImportSelection(mode) {
  const cards = [...(secureVaultUi.teeImportList?.querySelectorAll('[data-tee-import-id]') || [])];
  cards.forEach(card => {
    const box = card.querySelector('[data-tee-select]');
    if (!box || box.disabled) return;
    const candidate = TEE_IMPORT_CANDIDATES.find(item => item.id === card.dataset.teeImportId);
    box.checked = mode === "ready" ? candidate?.status === "ready" : false;
  });
  updateTeeImportSummary();
}

async function importSelectedTeeRecords() {
  noteVaultActivity();
  if (getVaultState() !== "unlocked") {
    setSecureMessage("Unlock the vault before importing TEE records.", "error");
    return;
  }
  const normalized = normalizeVaultData(getActiveVaultData());
  const data = normalized.data;
  const activeProfile = getActiveProfileId();
  const selected = [];
  const errors = [];

  TEE_IMPORT_CANDIDATES.forEach(candidate => {
    const state = getTeeImportCandidateState(candidate);
    if (!state?.selected) return;
    if (teeCandidateAlreadyImported(candidate, data.records)) return;
    const enforcedScope = getEnforcedAccessScopeForType(candidate.type);
    const effectiveCandidateScope = enforcedScope || candidate.scope;
    if (effectiveCandidateScope === "private" && candidate.targetProfile && candidate.targetProfile !== activeProfile) {
      errors.push(`${candidate.title}: unlock as the intended couple first.`);
      return;
    }
    const definition = getSecureRecordDefinition(candidate.type);
    const missing = (definition?.fields || []).filter(field => field.required && !String(state.fields[field.key] || "").trim());
    if (missing.length) {
      errors.push(`${candidate.title}: complete ${missing.map(field => field.label).join(", ")}.`);
      return;
    }
    selected.push({ candidate, state, definition });
  });

  if (errors.length) {
    setSecureMessage(`TEE import needs review: ${errors.join(" ")}`, "error");
    return;
  }
  if (!selected.length) {
    setSecureMessage("Select at least one not-yet-imported TEE record.", "info");
    return;
  }

  const sharedCount = selected.filter(item => item.state.accessScope === "shared").length;
  const privateCount = selected.length - sharedCount;
  const approved = window.confirm(`Import ${selected.length} reviewed TEE record${selected.length === 1 ? "" : "s"}? ${sharedCount} Shared; ${privateCount} ${getActiveProfileLabel()} Private. Records will be encrypted immediately.`);
  if (!approved) return;

  const now = new Date().toISOString();
  selected.forEach(({ candidate, state, definition }) => {
    data.records.push({
      recordId: generateUUID(),
      type: candidate.type,
      createdAt: now,
      lastModifiedAt: now,
      recordVersion: 1,
      ownerVaultId: getVault().id,
      fields: state.fields,
      relationships: [],
      favorite: false,
      tags: ["TEE Import", teeImportTag(candidate.id)],
      accessScope: state.accessScope,
      visibilityClass: state.visibilityClass,
      history: [createHistoryEntry("Imported", `${definition.label} imported from existing TEE travel source`, now)]
    });
  });

  try {
    await persistActiveVaultData();
    renderRecords();
    renderTeeImportWizard();
    setSecureMessage(`${selected.length} TEE record${selected.length === 1 ? "" : "s"} reviewed, encrypted, and imported.`, "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "TEE records could not be encrypted and saved.", "error");
  }
}

function populateRecordTypes() {
  secureVaultUi.recordType.replaceChildren();
  if (secureVaultUi.recordFilter) {
    secureVaultUi.recordFilter.replaceChildren();
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All record types";
    secureVaultUi.recordFilter.appendChild(allOption);
  }

  listSecureRecordTypes().forEach(type => {
    const option = document.createElement("option");
    option.value = type.value;
    option.textContent = type.label;
    secureVaultUi.recordType.appendChild(option);

    if (secureVaultUi.recordFilter) {
      const filterOption = document.createElement("option");
      filterOption.value = type.value;
      filterOption.textContent = type.label;
      secureVaultUi.recordFilter.appendChild(filterOption);
    }
  });

  populateRecordTemplates(secureVaultUi.recordType.value);
}

function closeRecordForm() {
  editingRecordId = null;
  secureVaultUi.recordForm.hidden = true;
  secureVaultUi.recordFields.replaceChildren();
  secureVaultUi.recordForm.reset();
}

function openRecordForm(type, record = null, template = null) {
  const definition = getSecureRecordDefinition(type);
  if (!definition) return;

  editingRecordId = record?.recordId || null;
  secureVaultUi.recordFormTitle.textContent = record
    ? `Edit ${definition.label}`
    : template
      ? `Add ${definition.label} · ${template.label}`
      : `Add ${definition.label}`;
  secureVaultUi.recordFields.replaceChildren();

  const scopeLabel = document.createElement("label");
  scopeLabel.classList.add("full", "secure-access-scope-field");
  const scopeText = document.createElement("span");
  scopeText.textContent = "TEE classification / access";
  const scopeHelp = document.createElement("small");
  scopeHelp.className = "secure-sensitivity";
  const enforcedScope = getEnforcedAccessScopeForType(type);
  const enforcedVisibility = getEnforcedVisibilityClassForType(type);
  scopeHelp.textContent = isTwoCoupleVault()
    ? enforcedVisibility === "public"
      ? "TEE policy: Public-safe means suitable for a sanitized public export. It remains encrypted in the Shared zone inside this vault."
      : enforcedVisibility === "shared"
        ? "TEE policy: operational trip records are Shared so both couples have the same travel information."
        : enforcedVisibility === "private"
          ? `TEE policy: identity, credentials, medical, and personal financial/insurance identifiers are Private to the owning couple.`
          : `Shared is visible to both couples. Private is visible only to ${getActiveProfileLabel()}.`
    : "Legacy single-zone vault. Upgrade to Shared + Private access before real-world use.";
  const scopeSelect = document.createElement("select");
  scopeSelect.name = "accessScope";
  const sharedOption = document.createElement("option");
  sharedOption.value = "shared";
  sharedOption.textContent = "Shared — both couples";
  scopeSelect.appendChild(sharedOption);
  if (isTwoCoupleVault()) {
    const privateOption = document.createElement("option");
    privateOption.value = "private";
    privateOption.textContent = `Private — ${getActiveProfileLabel()} only`;
    scopeSelect.appendChild(privateOption);
  }
  scopeSelect.value = record?.accessScope === "private" && isTwoCoupleVault()
    ? "private"
    : (record ? "shared" : (enforcedScope || "shared"));
  if (record?.visibilityClass === "public" && scopeSelect.value === "shared") {
    sharedOption.textContent = "Shared encrypted zone — currently Public-safe";
  }
  scopeLabel.append(scopeText, scopeHelp, scopeSelect);
  secureVaultUi.recordFields.appendChild(scopeLabel);

  definition.fields.forEach(field => {
    const label = document.createElement("label");
    if (field.type === "textarea") label.classList.add("full");

    const labelText = document.createElement("span");
    labelText.textContent = field.label + (field.required ? " *" : "");
    label.appendChild(labelText);

    const sensitivity = document.createElement("small");
    sensitivity.className = "secure-sensitivity";
    sensitivity.textContent = field.sensitivity === "secret"
      ? "Protected secret — hidden until you tap Reveal"
      : field.sensitivity === "hidden"
        ? "Hidden until you tap Reveal"
        : "Visible after vault unlock";
    label.appendChild(sensitivity);

    const input = field.type === "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

    if (field.type !== "textarea") input.type = field.type || "text";
    input.name = field.key;
    input.autocomplete = field.autocomplete || "off";
    input.required = Boolean(field.required);
    input.value = record?.fields?.[field.key] ?? template?.fields?.[field.key] ?? "";
    label.appendChild(input);
    secureVaultUi.recordFields.appendChild(label);
  });

  secureVaultUi.recordForm.dataset.recordType = type;
  secureVaultUi.recordForm.dataset.template = record ? "" : (template?.value || "");
  secureVaultUi.recordForm.hidden = false;
  if (template && !record) {
    setSecureMessage(`${template.label} template applied. Review and edit every field before saving.`, "info");
  }
  secureVaultUi.recordForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderSecureNotes(record) {
  const noteValue = String(record?.fields?.notes || "").trim();
  if (!noteValue) return null;

  const section = document.createElement("section");
  section.className = "secure-notes-preview";

  const heading = document.createElement("div");
  heading.className = "secure-notes-preview-head";

  const title = document.createElement("h4");
  title.textContent = "Secure Notes";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "secondary";
  toggle.textContent = "Show Note";
  toggle.setAttribute("aria-expanded", "false");

  heading.append(title, toggle);

  const full = document.createElement("div");
  full.className = "secure-notes-full";
  full.hidden = true;
  full.textContent = noteValue;

  toggle.addEventListener("click", () => {
    noteVaultActivity();
    const willOpen = full.hidden;
    full.hidden = !willOpen;
    toggle.textContent = willOpen ? "Hide Note" : "Show Note";
    toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });

  section.append(heading, full);
  return section;
}

function fullSecretMask() {
  return "••••••••••••";
}

async function copyProtectedValue(value, label, button) {
  noteVaultActivity();
  if (!navigator.clipboard?.writeText) {
    setSecureMessage(`Clipboard access is unavailable. Reveal ${label.toLowerCase()} and copy it manually.`, "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(String(value));
    const original = button.textContent;
    button.textContent = "Copied";
    setSecureMessage(`${label} copied. TEE will attempt to clear it from the clipboard in 30 seconds.`, "success");
    window.setTimeout(() => { button.textContent = original; }, 1800);
    window.setTimeout(async () => {
      try {
        if (navigator.clipboard.readText && await navigator.clipboard.readText() === String(value)) {
          await navigator.clipboard.writeText("");
        }
      } catch (_) {
        // Browsers may block clipboard reads or delayed writes; copying still succeeded.
      }
    }, 30000);
  } catch (error) {
    console.error(error);
    setSecureMessage(`Unable to copy ${label.toLowerCase()}.`, "error");
  }
}

function createFieldRow(field, value) {
  const row = document.createElement("div");
  row.className = "secure-record-field";

  const label = document.createElement("span");
  label.textContent = field.label;
  row.appendChild(label);

  const displayed = document.createElement("strong");
  const protectedField = field.sensitivity === "hidden" || field.sensitivity === "secret";
  const maskedValue = field.sensitivity === "secret" ? fullSecretMask() : maskValue(value);

  if (field.type === "url" && !protectedField && value) {
    const link = document.createElement("a");
    link.href = value;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = value;
    displayed.appendChild(link);
  } else {
    displayed.textContent = protectedField ? maskedValue : (value || "Not entered");
  }
  row.appendChild(displayed);

  const controls = document.createElement("div");
  controls.className = "secure-field-controls";

  if (protectedField && value) {
    const reveal = document.createElement("button");
    reveal.type = "button";
    reveal.className = "secondary";
    reveal.textContent = "Reveal";
    reveal.addEventListener("click", () => {
      noteVaultActivity();
      const isRevealed = reveal.dataset.revealed === "true";
      reveal.dataset.revealed = isRevealed ? "false" : "true";
      reveal.textContent = isRevealed ? "Reveal" : "Hide";
      displayed.textContent = isRevealed ? maskedValue : value;
    });
    controls.appendChild(reveal);
  }

  if (field.type === "url" && value) {
    const openWebsite = document.createElement("button");
    openWebsite.type = "button";
    openWebsite.className = "secondary";
    openWebsite.textContent = field.key === "websiteUrl" ? "Open Website" : "Open Link";
    openWebsite.addEventListener("click", () => {
      noteVaultActivity();
      window.open(value, "_blank", "noopener,noreferrer");
    });
    controls.appendChild(openWebsite);
  }

  if (field.copy === true && value) {
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "secondary";
    const copyLabels = {
      username: "Copy Username",
      password: "Copy Password",
      recoveryEmail: "Copy Recovery Email",
      recoveryPhone: "Copy Recovery Phone",
      backupCodes: "Copy Backup Codes"
    };
    copy.textContent = copyLabels[field.key] || `Copy ${field.label}`;
    copy.addEventListener("click", () => copyProtectedValue(value, field.label, copy));
    controls.appendChild(copy);
  }

  row.appendChild(controls);
  return row;
}

function daysUntilPermanentDeletion(deletedAt) {
  const date = new Date(deletedAt);
  if (Number.isNaN(date.getTime())) return RECYCLE_BIN_RETENTION_DAYS;
  const elapsed = Math.floor((Date.now() - date.getTime()) / 86400000);
  return Math.max(0, RECYCLE_BIN_RETENTION_DAYS - elapsed);
}

async function restoreDeletedRecord(recordId) {
  noteVaultActivity();
  const data = normalizeVaultData(getActiveVaultData()).data;
  const index = data.deletedRecords.findIndex(item => item.recordId === recordId);
  if (index < 0) return;
  const record = data.deletedRecords[index];
  const now = new Date().toISOString();
  delete record.deletedAt;
  record.lastModifiedAt = now;
  record.recordVersion = (Number(record.recordVersion) || 1) + 1;
  record.history = Array.isArray(record.history) ? record.history : [];
  record.history.push(createHistoryEntry("Restored", `${getSecureRecordDefinition(record.type)?.label || "Record"} restored from Recycle Bin`, now));
  data.deletedRecords.splice(index, 1);
  data.records.push(record);
  const activeIds = new Set(data.records.map(item => item.recordId));
  record.relationships = (record.relationships || []).filter(id => activeIds.has(id));
  data.records.forEach(item => {
    if (record.relationships.includes(item.recordId)) {
      item.relationships = [...new Set([...(item.relationships || []), record.recordId])];
    }
  });
  try {
    await persistActiveVaultData();
    renderRecords();
    setSecureMessage("Record restored from the encrypted Recycle Bin.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to restore the record.", "error");
  }
}

async function permanentlyDeleteRecord(recordId) {
  noteVaultActivity();
  const data = normalizeVaultData(getActiveVaultData()).data;
  const record = data.deletedRecords.find(item => item.recordId === recordId);
  if (!record) return;
  const definition = getSecureRecordDefinition(record.type);
  if (!window.confirm(`Permanently delete this ${definition?.label || "record"}? This cannot be undone.`)) return;
  data.deletedRecords = data.deletedRecords.filter(item => item.recordId !== recordId);
  try {
    await persistActiveVaultData();
    renderRecords();
    setSecureMessage("Record permanently deleted.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to permanently delete the record.", "error");
  }
}

async function emptyRecycleBin() {
  noteVaultActivity();
  const data = normalizeVaultData(getActiveVaultData()).data;
  if (!data.deletedRecords.length) {
    setSecureMessage("The Recycle Bin is already empty.", "info");
    return;
  }
  if (!window.confirm(`Permanently delete all ${data.deletedRecords.length} records in the Recycle Bin? This cannot be undone.`)) return;
  data.deletedRecords = [];
  try {
    await persistActiveVaultData();
    renderRecords();
    setSecureMessage("Recycle Bin emptied permanently.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to empty the Recycle Bin.", "error");
  }
}

function renderRecycleBin(deletedRecords) {
  if (!secureVaultUi.recycleBin || !secureVaultUi.recycleBinList) return;
  secureVaultUi.recycleBinList.replaceChildren();
  const count = deletedRecords.length;
  if (secureVaultUi.recycleBinSummary) {
    secureVaultUi.recycleBinSummary.textContent = `${count} item${count === 1 ? "" : "s"}`;
  }
  if (secureVaultUi.emptyRecycleBinButton) secureVaultUi.emptyRecycleBinButton.disabled = count === 0;
  if (!count) {
    const empty = document.createElement("p");
    empty.className = "secure-recycle-bin-empty";
    empty.textContent = "No deleted records.";
    secureVaultUi.recycleBinList.appendChild(empty);
    return;
  }
  [...deletedRecords].sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt)).forEach(record => {
    const definition = getSecureRecordDefinition(record.type);
    const item = document.createElement("article");
    item.className = "secure-recycle-bin-item";
    const text = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = `${definition?.label || "Record"}: ${getRecordTitle(record)}`;
    const detail = document.createElement("p");
    const days = daysUntilPermanentDeletion(record.deletedAt);
    detail.textContent = `Deleted ${formatHistoryTimestamp(record.deletedAt)} · ${days} day${days === 1 ? "" : "s"} until permanent deletion`;
    text.append(title, detail);
    const buttons = document.createElement("div");
    buttons.className = "secure-recycle-bin-buttons";
    const restore = document.createElement("button");
    restore.type = "button";
    restore.className = "secondary";
    restore.textContent = "Restore";
    restore.addEventListener("click", () => restoreDeletedRecord(record.recordId));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "secondary";
    remove.textContent = "Delete Permanently";
    remove.addEventListener("click", () => permanentlyDeleteRecord(record.recordId));
    buttons.append(restore, remove);
    item.append(text, buttons);
    secureVaultUi.recycleBinList.appendChild(item);
  });
}


function createEmergencyRecordCard(record) {
  const definition = getSecureRecordDefinition(record.type);
  if (!definition) return null;

  const card = document.createElement("article");
  card.className = "secure-record-card secure-emergency-record-card";
  card.dataset.recordId = record.recordId;

  const header = document.createElement("div");
  header.className = "secure-record-card-head";
  const heading = document.createElement("div");
  const title = document.createElement("h4");
  title.textContent = `${definition.label}: ${getRecordTitle(record)}`;
  const description = document.createElement("p");
  description.textContent = definition.description;
  heading.append(title, description);
  header.appendChild(heading);
  card.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "secure-record-grid";
  definition.fields.forEach(field => {
    if (field.key === "notes") return;
    const value = record.fields?.[field.key];
    if (value) grid.appendChild(createFieldRow(field, value));
  });
  card.appendChild(grid);

  const notes = renderSecureNotes(record);
  if (notes) card.appendChild(notes);

  const related = renderRelatedRecords(record, normalizeVaultData(getActiveVaultData()).data.records);
  if (related) card.appendChild(related);
  return card;
}

function renderEmergencyMode() {
  if (!secureVaultUi.emergencyList || !secureVaultUi.emergencySummary) return;
  secureVaultUi.emergencyList.replaceChildren();
  if (!emergencyModeActive || getVaultState() !== "unlocked") return;

  const allRecords = normalizeVaultData(getActiveVaultData()).data.records;
  const tripScopeIds = activeTripWorkspaceId
    ? new Set([activeTripWorkspaceId, ...(getRecordById(allRecords, activeTripWorkspaceId)?.relationships || [])])
    : null;
  const records = allRecords
    .filter(record => EMERGENCY_RECORD_TYPES.has(record.type))
    .filter(record => !tripScopeIds || tripScopeIds.has(record.recordId))
    .sort((a, b) => {
      const typeDifference = EMERGENCY_TYPE_ORDER.indexOf(a.type) - EMERGENCY_TYPE_ORDER.indexOf(b.type);
      if (typeDifference) return typeDifference;
      if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
      return getRecordTitle(a).localeCompare(getRecordTitle(b));
    });

  secureVaultUi.emergencySummary.textContent = records.length
    ? `${records.length} essential record${records.length === 1 ? "" : "s"}. Sensitive fields remain masked until Reveal.`
    : "No emergency-relevant records are stored yet.";

  if (!records.length) {
    const empty = document.createElement("div");
    empty.className = "secure-empty";
    empty.textContent = "Add a passport, flight, hotel, insurance, medical, emergency-contact, or other essential record first.";
    secureVaultUi.emergencyList.appendChild(empty);
    return;
  }

  let currentType = "";
  let group = null;
  records.forEach(record => {
    if (record.type !== currentType) {
      currentType = record.type;
      const definition = getSecureRecordDefinition(record.type);
      const section = document.createElement("section");
      section.className = "secure-emergency-group";
      const heading = document.createElement("h4");
      heading.textContent = definition?.label || "Essential Records";
      group = document.createElement("div");
      group.className = "secure-emergency-group-list";
      section.append(heading, group);
      secureVaultUi.emergencyList.appendChild(section);
    }
    const card = createEmergencyRecordCard(record);
    if (card) group.appendChild(card);
  });
}

function enterEmergencyMode() {
  if (getVaultState() !== "unlocked") return;
  noteVaultActivity();
  emergencyModeActive = true;
  secureVaultUi.contents?.classList.add("emergency-mode-active");
  if (secureVaultUi.emergencyMode) secureVaultUi.emergencyMode.hidden = false;
  renderEmergencyMode();
  secureVaultUi.emergencyMode?.scrollIntoView({ behavior: "smooth", block: "start" });
  setSecureMessage("Emergency Mode is active. Records are read-only.", "info");
}

function exitEmergencyMode({ scroll = true } = {}) {
  emergencyModeActive = false;
  secureVaultUi.contents?.classList.remove("emergency-mode-active");
  if (secureVaultUi.emergencyMode) secureVaultUi.emergencyMode.hidden = true;
  secureVaultUi.emergencyList?.replaceChildren();
  if (scroll) secureVaultUi.quickActions?.scrollIntoView({ behavior: "smooth", block: "start" });
}


const TRIP_WORKSPACE_GROUPS = [
  { label: "Documents", types: ["passport", "globalEntry", "visa"] },
  { label: "Transportation", types: ["flight", "rail", "rentalCar"] },
  { label: "Accommodation", types: ["hotel"] },
  { label: "Website Logins", types: ["websiteLogin"] },
  { label: "Financial", types: ["creditCard", "bankingCurrency", "loyaltyProgram"] },
  { label: "Insurance", types: ["travelInsurance"] },
  { label: "Medical", types: ["medical"] },
  { label: "Emergency Contacts", types: ["emergencyContact"] }
];

function getTripWorkspaceData() {
  const data = normalizeVaultData(getActiveVaultData()).data;
  const trip = getRecordById(data.records, activeTripWorkspaceId);
  if (!trip || trip.type !== "trip") return { data, trip: null, records: [] };
  const ids = new Set(trip.relationships || []);
  const records = data.records.filter(record => ids.has(record.recordId));
  return { data, trip, records };
}

function createTripWorkspaceRecordCard(record) {
  const definition = getSecureRecordDefinition(record.type);
  const card = document.createElement("article");
  card.className = "secure-trip-workspace-card";
  const heading = document.createElement("div");
  const title = document.createElement("h4");
  title.textContent = `${definition?.label || "Record"}: ${getRecordTitle(record)}`;
  const meta = document.createElement("p");
  meta.textContent = record.favorite ? "★ Favorite" : definition?.description || "Related secure record";
  heading.append(title, meta);
  const open = document.createElement("button");
  open.type = "button";
  open.className = "secondary";
  open.textContent = "Open Record";
  open.addEventListener("click", () => {
    exitTripWorkspace({ scroll: false });
    focusSecureRecord(record.recordId);
  });
  card.append(heading, open);
  return card;
}

function renderTripWorkspace() {
  if (!secureVaultUi.tripWorkspaceSections || !activeTripWorkspaceId) return;
  const { trip, records } = getTripWorkspaceData();
  if (!trip) {
    exitTripWorkspace({ scroll: false });
    return;
  }
  const query = String(secureVaultUi.tripWorkspaceSearch?.value || "").trim().toLowerCase();
  const filtered = records.filter(record => {
    if (!query) return true;
    const definition = getSecureRecordDefinition(record.type);
    const searchableFields = (definition?.fields || []).filter(field => field.searchable !== false);
    const haystack = [getRecordTitle(record), definition?.label, ...(record.tags || []), ...searchableFields.map(field => record.fields?.[field.key] || "")]
      .join(" ").toLowerCase();
    return haystack.includes(query);
  });

  secureVaultUi.tripWorkspaceTitle.textContent = getRecordTitle(trip);
  const start = trip.fields?.startDate || "Date not set";
  const end = trip.fields?.endDate || "Date not set";
  const counts = {
    total: records.length,
    flights: records.filter(r => r.type === "flight").length,
    hotels: records.filter(r => r.type === "hotel").length,
    logins: records.filter(r => r.type === "websiteLogin").length,
    favorites: records.filter(r => r.favorite).length
  };
  secureVaultUi.tripWorkspaceSummary.textContent = `${trip.fields?.destination || "Destination not set"} · ${start} – ${end} · ${counts.total} related records · ${counts.flights} flights · ${counts.hotels} hotels · ${counts.logins} website logins · ${counts.favorites} favorites`;
  secureVaultUi.tripWorkspaceSections.replaceChildren();

  TRIP_WORKSPACE_GROUPS.forEach(group => {
    const items = filtered.filter(record => group.types.includes(record.type));
    if (!items.length) return;
    const section = document.createElement("section");
    section.className = "secure-trip-workspace-group";
    const title = document.createElement("h3");
    title.textContent = `${group.label} (${items.length})`;
    const list = document.createElement("div");
    list.className = "secure-trip-workspace-list";
    items.sort((a,b) => getRecordTitle(a).localeCompare(getRecordTitle(b))).forEach(record => list.appendChild(createTripWorkspaceRecordCard(record)));
    section.append(title, list);
    secureVaultUi.tripWorkspaceSections.appendChild(section);
  });

  const notes = String(trip.fields?.notes || "").trim();
  if (notes) {
    const section = document.createElement("section");
    section.className = "secure-trip-workspace-group";
    section.innerHTML = `<h3>Trip Notes</h3><div class="secure-trip-workspace-notes"></div>`;
    section.querySelector("div").textContent = notes;
    secureVaultUi.tripWorkspaceSections.appendChild(section);
  }
  if (!secureVaultUi.tripWorkspaceSections.children.length) {
    const empty = document.createElement("div");
    empty.className = "secure-empty";
    empty.textContent = query ? "No related trip records match this search." : "This Trip Folder has no related records yet. Use Relationships to link records.";
    secureVaultUi.tripWorkspaceSections.appendChild(empty);
  }
}

function openTripWorkspace(tripId) {
  const data = normalizeVaultData(getActiveVaultData()).data;
  const trip = getRecordById(data.records, tripId);
  if (!trip || trip.type !== "trip") return;
  noteVaultActivity();
  activeTripWorkspaceId = tripId;
  if (secureVaultUi.tripWorkspaceSearch) secureVaultUi.tripWorkspaceSearch.value = "";
  secureVaultUi.contents?.classList.add("trip-workspace-active");
  if (secureVaultUi.tripWorkspace) secureVaultUi.tripWorkspace.hidden = false;
  renderTripWorkspace();
  secureVaultUi.tripWorkspace?.scrollIntoView({ behavior: "smooth", block: "start" });
  setSecureMessage(`Trip Workspace opened for ${getRecordTitle(trip)}.`, "success");
}

function exitTripWorkspace({ scroll = true } = {}) {
  activeTripWorkspaceId = null;
  secureVaultUi.contents?.classList.remove("trip-workspace-active");
  if (secureVaultUi.tripWorkspace) secureVaultUi.tripWorkspace.hidden = true;
  if (secureVaultUi.tripWorkspaceSearch) secureVaultUi.tripWorkspaceSearch.value = "";
  secureVaultUi.tripWorkspaceSections?.replaceChildren();
  if (scroll) secureVaultUi.quickActions?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRecords() {
  secureVaultUi.recordList.replaceChildren();

  if (getVaultState() !== "unlocked") return;
  if (emergencyModeActive) renderEmergencyMode();

  const normalized = normalizeVaultData(getActiveVaultData());
  const records = normalized.data.records;
  const deletedRecords = normalized.data.deletedRecords || [];
  const visibleRecords = getVisibleRecords(records);
  renderVaultDashboard(records);
  renderPassportMigrationPanel(records);
  renderGlobalEntryMigrationPanel(records);
  renderVaultHealth(records);
  renderVaultStatistics(records, deletedRecords);
  renderActivityCenter(records);
  renderFavorites(records);
  renderTagExplorer(records);
  renderRecycleBin(deletedRecords);
  renderExpirationDashboard(records);
  updateSearchSummary(visibleRecords.length, records.length);

  if (!records.length) {
    const empty = document.createElement("div");
    empty.className = "secure-empty";
    empty.textContent = "No secure records yet. Choose a record type and tap Add Record.";
    secureVaultUi.recordList.appendChild(empty);
    return;
  }

  if (!visibleRecords.length) {
    const empty = document.createElement("div");
    empty.className = "secure-empty";
    empty.textContent = "No unlocked records match this search or filter.";
    secureVaultUi.recordList.appendChild(empty);
    return;
  }

  visibleRecords.forEach(record => {
    const definition = getSecureRecordDefinition(record.type);
    if (!definition) return;

    const card = document.createElement("article");
    card.className = `secure-record-card secure-status-${record.recordStatus || "active"}`;
    card.dataset.recordId = record.recordId;

    const header = document.createElement("div");
    header.className = "secure-record-card-head";

    const heading = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = `${definition.label}: ${getRecordTitle(record)}`;
    const description = document.createElement("p");
    description.textContent = definition.description;
    const scopeBadge = document.createElement("span");
    const visibilityClass = normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope);
    scopeBadge.className = `secure-scope-badge ${visibilityClass}`;
    scopeBadge.textContent = getVisibilityLabel(record);
    if (record.privacyReview === "owner-required") scopeBadge.textContent += " · OWNER REVIEW REQUIRED";
    const lifecycleBadge = document.createElement("span");
    lifecycleBadge.className = `secure-lifecycle-badge ${record.recordStatus || "active"}`;
    lifecycleBadge.textContent = getRecordLifecycleLabel(record);
    heading.append(title, description, scopeBadge, lifecycleBadge);

    const actions = document.createElement("div");
    actions.className = "secure-record-actions";

    const favorite = document.createElement("button");
    favorite.type = "button";
    favorite.className = record.favorite === true ? "secondary secure-favorite-toggle active" : "secondary secure-favorite-toggle";
    favorite.textContent = record.favorite === true ? "Unfavorite" : "Favorite";
    favorite.setAttribute("aria-pressed", record.favorite === true ? "true" : "false");
    favorite.addEventListener("click", () => toggleFavorite(record.recordId));

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "secondary";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => {
      noteVaultActivity();
      openRecordForm(record.type, record);
    });

    const history = document.createElement("button");
    history.type = "button";
    history.className = "secondary";
    history.textContent = "History";
    history.addEventListener("click", () => showRecordHistory(record, definition));

    const tagsButton = document.createElement("button");
    tagsButton.type = "button";
    tagsButton.className = "secondary";
    tagsButton.textContent = "Tags";
    tagsButton.addEventListener("click", () => openTagsDialog(record));

    const relationships = document.createElement("button");
    relationships.type = "button";
    relationships.className = "secondary";
    relationships.textContent = "Relationships";
    relationships.addEventListener("click", () => openRelationshipsDialog(record));

    let workspaceButton = null;
    if (record.type === "trip") {
      workspaceButton = document.createElement("button");
      workspaceButton.type = "button";
      workspaceButton.className = "secure-trip-workspace-open";
      workspaceButton.textContent = "Open Workspace";
      workspaceButton.addEventListener("click", () => openTripWorkspace(record.recordId));
    }

    const statusControls = document.createElement("div");
    statusControls.className = "secure-record-status-controls";
    statusControls.setAttribute("aria-label", "Document classification and status");
    [
      ["private", "Private"],
      ["shared", "Shared"],
      ["public", "Public"],
      ["reference", "Reference"],
      ["archive", "Archive"]
    ].forEach(([value, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "secondary secure-status-button";
      button.textContent = label;
      const currentClass = normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope);
      const currentLifecycle = record.recordStatus || "active";
      const isCurrent = ["private", "shared", "public"].includes(value)
        ? currentLifecycle === "active" && currentClass === value
        : currentLifecycle === value;
      if (isCurrent) {
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
      } else {
        button.setAttribute("aria-pressed", "false");
      }
      button.addEventListener("click", () => setRecordCardStatus(record.recordId, value));
      statusControls.appendChild(button);
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "secondary secure-status-delete";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => moveRecordToRecycleBin(record.recordId));

    actions.append(favorite, edit, history, tagsButton, relationships);
    if (workspaceButton) actions.appendChild(workspaceButton);
    actions.append(statusControls, remove);
    header.append(heading, actions);
    card.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "secure-record-grid";
    definition.fields.forEach(field => {
      if (field.key === "notes") return;
      const value = record.fields?.[field.key];
      if (value) grid.appendChild(createFieldRow(field, value));
    });

    const notesPreview = renderSecureNotes(record);
    if (notesPreview) card.appendChild(notesPreview);
    card.append(grid, renderRecordTags(record), renderRelatedRecords(record, records));
    secureVaultUi.recordList.appendChild(card);
  });
}

function setSecureSetupStep(step) {
  const n = Math.max(1, Math.min(3, Number(step) || 1));
  if (secureVaultUi.setupStepA) secureVaultUi.setupStepA.hidden = n !== 1;
  if (secureVaultUi.setupStepB) secureVaultUi.setupStepB.hidden = n !== 2;
  if (secureVaultUi.setupStepReview) secureVaultUi.setupStepReview.hidden = n !== 3;
  if (secureVaultUi.setupProgress) {
    secureVaultUi.setupProgress.textContent = n === 1
      ? "Step 1 of 3 · Create Couple A access"
      : n === 2
        ? "Step 2 of 3 · Set Couple B temporary access"
        : "Step 3 of 3 · Review and create";
  }
}

function validateSetupCoupleA() {
  const a = secureVaultUi.createPassphrase?.value || "";
  const c = secureVaultUi.confirmPassphrase?.value || "";
  if (a.length < 8) { setSecureMessage("Couple A passphrase must be at least 8 characters.", "error"); return false; }
  if (a !== c) { setSecureMessage("Couple A passphrase confirmation does not match.", "error"); return false; }
  return true;
}

function validateSetupCoupleB() {
  const a = secureVaultUi.createPassphrase?.value || "";
  const b = secureVaultUi.createPassphraseB?.value || "";
  const c = secureVaultUi.confirmPassphraseB?.value || "";
  if (b.length < 8) { setSecureMessage("Temporary Couple B passphrase must be at least 8 characters.", "error"); return false; }
  if (b !== c) { setSecureMessage("Couple B passphrase confirmation does not match.", "error"); return false; }
  if (a === b) { setSecureMessage("The two couples must use different passphrases.", "error"); return false; }
  return true;
}

async function handleActivePassphraseChange() {
  const current = secureVaultUi.currentPassphrase?.value || "";
  const next = secureVaultUi.newPassphrase?.value || "";
  const confirm = secureVaultUi.confirmNewPassphrase?.value || "";
  if (next.length < 8) { setSecureMessage("The new passphrase must be at least 8 characters.", "error"); return; }
  if (next !== confirm) { setSecureMessage("The new passphrase confirmation does not match.", "error"); return; }
  try {
    await changeActiveProfilePassphrase(current, next);
    saveVault(getVault());
    if (secureVaultUi.currentPassphrase) secureVaultUi.currentPassphrase.value = "";
    if (secureVaultUi.newPassphrase) secureVaultUi.newPassphrase.value = "";
    if (secureVaultUi.confirmNewPassphrase) secureVaultUi.confirmNewPassphrase.value = "";
    if (secureVaultUi.changePassphraseFields) secureVaultUi.changePassphraseFields.hidden = true;
    setSecureMessage("Your passphrase was changed successfully. Shared and private records did not need to be re-encrypted.", "success");
    updateSecureVaultUi();
  } catch (error) {
    setSecureMessage(error?.message || "Unable to change the passphrase.", "error");
  }
}

function updateSecureVaultUi() {
  // Treat browser storage as the source of truth. The in-memory vault can be
  // temporarily empty during startup, while an encrypted local vault still exists.
  const savedVault = loadVault();
  const exists = Boolean(savedVault?.id || vaultExists());
  const unlocked = getVaultState() === "unlocked";
  const twoCouple = Boolean(savedVault?.architecture || isTwoCoupleVault());

  secureVaultUi.status.textContent = unlocked ? "Vault open" : "Vault closed";
  secureVaultUi.contents.hidden = !unlocked;

  if (secureVaultUi.manager) secureVaultUi.manager.hidden = unlocked;
  if (!unlocked && exists) {
    secureVaultUi.createFields.hidden = true;
    secureVaultUi.unlockFields.hidden = false;
    if (secureVaultUi.managerSummary) secureVaultUi.managerSummary.textContent = twoCouple
      ? "An existing Shared + Private vault is stored on this device. Unlock it with either authorized couple passphrase."
      : "An existing legacy vault is stored on this device. Unlock it with the original passphrase; the two-couple upgrade is offered only after your existing records are open.";
    if (secureVaultUi.managerBadge) secureVaultUi.managerBadge.textContent = twoCouple ? "Existing two-couple vault" : "Existing legacy vault";
    if (secureVaultUi.managerHint) secureVaultUi.managerHint.textContent = "Creating another vault is disabled while this vault exists. You can export, verify, or restore an encrypted backup without exposing decrypted records.";
    if (secureVaultUi.managerUnlock) secureVaultUi.managerUnlock.hidden = false;
    if (secureVaultUi.managerCreate) secureVaultUi.managerCreate.hidden = true;
    if (secureVaultUi.managerReset) secureVaultUi.managerReset.hidden = false;
  } else if (!unlocked) {
    secureVaultUi.createFields.hidden = true;
    secureVaultUi.unlockFields.hidden = true;
    if (secureVaultUi.managerSummary) secureVaultUi.managerSummary.textContent = "No local encrypted vault was found. Set up a new two-couple vault, or restore an encrypted backup.";
    if (secureVaultUi.managerBadge) secureVaultUi.managerBadge.textContent = "No vault found";
    if (secureVaultUi.managerHint) secureVaultUi.managerHint.textContent = "New setup creates one Shared zone plus one private encrypted zone for each couple.";
    if (secureVaultUi.managerUnlock) secureVaultUi.managerUnlock.hidden = true;
    if (secureVaultUi.managerCreate) secureVaultUi.managerCreate.hidden = false;
    if (secureVaultUi.managerReset) secureVaultUi.managerReset.hidden = true;
  } else {
    secureVaultUi.createFields.hidden = true;
    secureVaultUi.unlockFields.hidden = true;
  }
  if (!unlocked) {
    exitEmergencyMode({ scroll: false });
    exitTripWorkspace({ scroll: false });
  }
  if (secureVaultUi.emergencyMode) secureVaultUi.emergencyMode.hidden = !unlocked || !emergencyModeActive;

  // The Vault Health panel sits outside the main contents container,
  // so it must be hidden explicitly whenever the vault locks.
  if (secureVaultUi.health) {
    secureVaultUi.health.hidden = !unlocked;
  }
  if (secureVaultUi.statistics) {
    secureVaultUi.statistics.hidden = !unlocked;
  }
  if (secureVaultUi.expirationDashboard) {
    secureVaultUi.expirationDashboard.hidden = !unlocked;
  }
  if (secureVaultUi.activityCenter) {
    secureVaultUi.activityCenter.hidden = !unlocked;
  }
  if (secureVaultUi.favorites) {
    secureVaultUi.favorites.hidden = !unlocked;
  }
  if (secureVaultUi.tagExplorer) {
    secureVaultUi.tagExplorer.hidden = !unlocked;
  }
  if (secureVaultUi.recycleBin) {
    secureVaultUi.recycleBin.hidden = !unlocked;
  }

  if (unlocked) {
    if (secureVaultUi.accessArchitecture) secureVaultUi.accessArchitecture.hidden = false;
    if (secureVaultUi.accessStatus) {
      secureVaultUi.accessStatus.textContent = isTwoCoupleVault()
        ? `Unlocked as ${getActiveProfileLabel()}`
        : "Legacy single-zone vault";
    }
    if (secureVaultUi.accessDescription) {
      secureVaultUi.accessDescription.textContent = isTwoCoupleVault()
        ? `You can decrypt the Shared zone and ${getActiveProfileLabel()} Private zone. The other couple's private zone is not decrypted.`
        : "Upgrade is required before real-world use so each couple has a separate private encryption zone.";
    }
    if (secureVaultUi.legacyUpgradeFields) secureVaultUi.legacyUpgradeFields.hidden = isTwoCoupleVault();
    if (secureVaultUi.passphraseManagement) secureVaultUi.passphraseManagement.hidden = !isTwoCoupleVault();
    if (secureVaultUi.passphraseStatus && isTwoCoupleVault()) {
      secureVaultUi.passphraseStatus.textContent = activeProfileUsesTemporaryPassphrase()
        ? `${getActiveProfileLabel()} is using a temporary passphrase. Change it before real-world use.`
        : `${getActiveProfileLabel()} passphrase is user-managed. You can change it here without re-encrypting vault records.`;
    }
    renderRecords();
    if(typeof renderDocuments==="function") renderDocuments();
    applyDashboardCustomization();
  } else {
    if (secureVaultUi.accessArchitecture) secureVaultUi.accessArchitecture.hidden = true;
    closeRecordForm();
    clearSecureSearch();
    secureVaultUi.recordList.replaceChildren();
    secureVaultUi.healthGrid?.replaceChildren();
    secureVaultUi.statisticsGrid?.replaceChildren();
    if (secureVaultUi.statisticsSummary) secureVaultUi.statisticsSummary.textContent = "";
    secureVaultUi.favoritesList?.replaceChildren();
    secureVaultUi.tagList?.replaceChildren();
    activeTagFilters.clear();
    secureVaultUi.recycleBinList?.replaceChildren();
    if (secureVaultUi.recycleBinSummary) secureVaultUi.recycleBinSummary.textContent = "";
    if (secureVaultUi.favoritesSummary) secureVaultUi.favoritesSummary.textContent = "";
    secureVaultUi.expirationList?.replaceChildren();
    if (secureVaultUi.expirationSummary) secureVaultUi.expirationSummary.textContent = "";
    if(secureVaultUi.passportMigration) secureVaultUi.passportMigration.hidden=true;
    if(secureVaultUi.globalEntryMigration) secureVaultUi.globalEntryMigration.hidden=true;
    if(typeof renderDocuments==="function") renderDocuments();
  }
}

const TEE_VAULT_LOCAL_STORAGE_PREFIXES = Object.freeze([
  "teeSecureVault"
]);
const TEE_VAULT_LOCAL_STORAGE_EXACT_KEYS = Object.freeze([
  "teeSecureVaultV1",
  "teeSecureVaultLegacySafetySnapshotV1",
  "teeSecureVaultHealthMetadata",
  "teeSecureVaultWorkspacePanelsV1",
  "teeSecureVaultDashboardCustomizationV1"
]);
const TEE_STORAGE_NAME_PATTERN = /(teeSecureVault|travel-private-documents|secure[-_ ]?vault)/i;

function listStorageKeys(storage) {
  const keys = [];
  try {
    for (let i = 0; i < storage.length; i += 1) {
      const key = storage.key(i);
      if (key) keys.push(key);
    }
  } catch (error) {
    console.warn("Unable to enumerate browser storage:", error);
  }
  return keys;
}

function isTeeVaultStorageKey(key) {
  return TEE_VAULT_LOCAL_STORAGE_EXACT_KEYS.includes(key) ||
    TEE_VAULT_LOCAL_STORAGE_PREFIXES.some(prefix => key.startsWith(prefix));
}

async function discoverTeeStorage() {
  const localKeys = listStorageKeys(localStorage).filter(isTeeVaultStorageKey);
  const sessionKeys = listStorageKeys(sessionStorage).filter(isTeeVaultStorageKey);

  let indexedDbNames = [];
  try {
    if (globalThis.indexedDB?.databases) {
      const databases = await indexedDB.databases();
      indexedDbNames = databases.map(db => db?.name).filter(name => name && TEE_STORAGE_NAME_PATTERN.test(name));
    }
  } catch (error) {
    console.warn("IndexedDB discovery unavailable:", error);
  }

  let cacheNames = [];
  try {
    if (globalThis.caches?.keys) {
      cacheNames = (await caches.keys()).filter(name => TEE_STORAGE_NAME_PATTERN.test(name));
    }
  } catch (error) {
    console.warn("Cache discovery unavailable:", error);
  }

  let serviceWorkerScopes = [];
  try {
    if (navigator.serviceWorker?.getRegistrations) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      serviceWorkerScopes = registrations
        .filter(registration => {
          const scope = registration.scope || "";
          const scriptUrl = registration.active?.scriptURL || registration.waiting?.scriptURL || registration.installing?.scriptURL || "";
          return TEE_STORAGE_NAME_PATTERN.test(scope) || TEE_STORAGE_NAME_PATTERN.test(scriptUrl) || scope.includes("/apps/travel-private-documents/");
        })
        .map(registration => registration.scope || "TEE-related registration");
    }
  } catch (error) {
    console.warn("Service Worker discovery unavailable:", error);
  }

  return {
    localKeys,
    sessionKeys,
    indexedDbNames,
    cacheNames,
    serviceWorkerScopes,
    vaultKeyPresent: localStorage.getItem("teeSecureVaultV1") !== null,
    legacySnapshotPresent: localStorage.getItem("teeSecureVaultLegacySafetySnapshotV1") !== null
  };
}

function formatStorageDiagnostics(discovery) {
  const line = (label, values, none = "None") => `${label}: ${values.length ? values.join(", ") : none}`;
  return [
    `Vault source key: ${discovery.vaultKeyPresent ? "PRESENT" : "not present"}`,
    `Legacy safety snapshot: ${discovery.legacySnapshotPresent ? "PRESENT" : "not present"}`,
    line("TEE localStorage keys", discovery.localKeys),
    line("TEE sessionStorage keys", discovery.sessionKeys),
    line("TEE IndexedDB databases", discovery.indexedDbNames),
    line("TEE Cache Storage entries", discovery.cacheNames),
    line("TEE Service Worker scopes", discovery.serviceWorkerScopes)
  ].join("\n");
}

async function showStorageDiagnostics() {
  const discovery = await discoverTeeStorage();
  if (!secureVaultUi.storageDiagnostics) return;
  secureVaultUi.storageDiagnostics.hidden = false;
  secureVaultUi.storageDiagnostics.dataset.status = discovery.vaultKeyPresent ? "warning" : "success";
  secureVaultUi.storageDiagnostics.textContent = formatStorageDiagnostics(discovery);
}

function deleteIndexedDbDatabase(name) {
  return new Promise(resolve => {
    try {
      const request = indexedDB.deleteDatabase(name);
      request.onsuccess = () => resolve({ name, ok: true });
      request.onerror = () => resolve({ name, ok: false, error: request.error?.message || "delete failed" });
      request.onblocked = () => resolve({ name, ok: false, error: "delete blocked by another open tab/window" });
    } catch (error) {
      resolve({ name, ok: false, error: error?.message || String(error) });
    }
  });
}

async function performVerifiedDeveloperReset() {
  const before = await discoverTeeStorage();
  const report = [];

  // Delete every currently-known TEE vault key plus any future teeSecureVault* keys.
  const localKeysToDelete = new Set([...before.localKeys, ...TEE_VAULT_LOCAL_STORAGE_EXACT_KEYS]);
  for (const key of localKeysToDelete) {
    try {
      localStorage.removeItem(key);
      report.push(`localStorage ${key}: removed`);
    } catch (error) {
      report.push(`localStorage ${key}: FAILED (${error?.message || error})`);
    }
  }
  for (const key of before.sessionKeys) {
    try {
      sessionStorage.removeItem(key);
      report.push(`sessionStorage ${key}: removed`);
    } catch (error) {
      report.push(`sessionStorage ${key}: FAILED (${error?.message || error})`);
    }
  }

  if (globalThis.indexedDB && before.indexedDbNames.length) {
    const dbResults = await Promise.all(before.indexedDbNames.map(deleteIndexedDbDatabase));
    dbResults.forEach(result => report.push(`IndexedDB ${result.name}: ${result.ok ? "removed" : `FAILED (${result.error})`}`));
  }

  if (globalThis.caches?.delete) {
    for (const name of before.cacheNames) {
      try {
        const removed = await caches.delete(name);
        report.push(`Cache ${name}: ${removed ? "removed" : "not found"}`);
      } catch (error) {
        report.push(`Cache ${name}: FAILED (${error?.message || error})`);
      }
    }
  }

  if (navigator.serviceWorker?.getRegistrations && before.serviceWorkerScopes.length) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        const scope = registration.scope || "";
        const scriptUrl = registration.active?.scriptURL || registration.waiting?.scriptURL || registration.installing?.scriptURL || "";
        if (TEE_STORAGE_NAME_PATTERN.test(scope) || TEE_STORAGE_NAME_PATTERN.test(scriptUrl) || scope.includes("/apps/travel-private-documents/")) {
          const removed = await registration.unregister();
          report.push(`Service Worker ${scope}: ${removed ? "unregistered" : "not changed"}`);
        }
      }
    } catch (error) {
      report.push(`Service Worker cleanup: FAILED (${error?.message || error})`);
    }
  }

  resetVaultState();
  editingRecordId = null;
  relationshipRecordId = null;
  tagEditingRecordId = null;
  activeTagFilters.clear();
  setSecureSetupStep(1);

  const after = await discoverTeeStorage();
  const verified = !after.vaultKeyPresent &&
    !after.legacySnapshotPresent &&
    after.localKeys.length === 0 &&
    after.sessionKeys.length === 0 &&
    after.indexedDbNames.length === 0 &&
    after.cacheNames.length === 0 &&
    after.serviceWorkerScopes.length === 0 &&
    !loadVault()?.id;

  return { before, after, report, verified };
}

async function handleDeveloperResetTestVault() {
  if (getVaultState() === "unlocked") {
    setSecureMessage("Lock the vault before using Developer Reset.", "error");
    return;
  }

  const discovery = await discoverTeeStorage();
  if (!discovery.vaultKeyPresent && discovery.localKeys.length === 0 && !vaultExists()) {
    setSecureMessage("No local TEE test vault exists to reset.", "info");
    await showStorageDiagnostics();
    updateSecureVaultUi();
    return;
  }

  const confirmation = window.prompt(
    "DEVELOPMENT ONLY: This permanently deletes the local encrypted TEST vault and TEE vault preferences on this browser origin. Exported backup files are not touched. Type RESET TEST VAULT to continue."
  );
  if ((confirmation || "").trim().toUpperCase() !== "RESET TEST VAULT") {
    setSecureMessage("Developer Reset cancelled. The local vault was not changed.", "info");
    return;
  }

  const report = [];
  const showResetReport = (status = "working") => {
    if (!secureVaultUi.storageDiagnostics) return;
    secureVaultUi.storageDiagnostics.hidden = false;
    secureVaultUi.storageDiagnostics.dataset.status = status;
    secureVaultUi.storageDiagnostics.textContent = [
      status === "success" ? "VERIFIED RESET PASSED" : status === "error" ? "VERIFIED RESET FAILED" : "RESET IN PROGRESS",
      "",
      ...report
    ].join("\n");
  };

  try {
    // Critical path: remove the actual vault source-of-truth FIRST.  Do not let
    // optional browser APIs (IndexedDB, Cache Storage, service workers) block it.
    report.push("Starting exact-key reset...");
    showResetReport();

    const exactKeys = [
      "teeSecureVaultV1",
      "teeSecureVaultLegacySafetySnapshotV1",
      "teeSecureVaultHealthMetadata",
      "teeSecureVaultWorkspacePanelsV1",
      "teeSecureVaultDashboardCustomizationV1"
    ];
    const dynamicLocalKeys = listStorageKeys(localStorage).filter(isTeeVaultStorageKey);
    const localKeys = [...new Set([...exactKeys, ...dynamicLocalKeys])];

    for (const key of localKeys) {
      localStorage.removeItem(key);
      const gone = localStorage.getItem(key) === null;
      report.push(`localStorage ${key}: ${gone ? "removed" : "FAILED - still present"}`);
      showResetReport(gone ? "working" : "error");
      if (!gone) throw new Error(`Unable to remove localStorage key ${key}.`);
    }

    // Clear any TEE session-only state as part of the same synchronous core reset.
    for (const key of listStorageKeys(sessionStorage).filter(isTeeVaultStorageKey)) {
      sessionStorage.removeItem(key);
      const gone = sessionStorage.getItem(key) === null;
      report.push(`sessionStorage ${key}: ${gone ? "removed" : "FAILED - still present"}`);
      if (!gone) throw new Error(`Unable to remove sessionStorage key ${key}.`);
    }

    // Reset the in-memory vault only AFTER the persistent source has been removed.
    lockVault();
    resetVaultState();
    editingRecordId = null;
    relationshipRecordId = null;
    tagEditingRecordId = null;
    activeTagFilters.clear();
    setSecureSetupStep(1);

    const sourceGoneImmediately = localStorage.getItem("teeSecureVaultV1") === null && !loadVault()?.id;
    report.push(`Immediate source-of-truth verification: ${sourceGoneImmediately ? "PASSED" : "FAILED"}`);
    if (!sourceGoneImmediately) throw new Error("The vault source key still exists immediately after deletion.");
    showResetReport();

    // Optional cleanup is best-effort and cannot abort the successful core reset.
    try {
      const optional = await discoverTeeStorage();
      if (globalThis.indexedDB && optional.indexedDbNames.length) {
        const dbResults = await Promise.all(optional.indexedDbNames.map(deleteIndexedDbDatabase));
        dbResults.forEach(result => report.push(`IndexedDB ${result.name}: ${result.ok ? "removed" : `warning (${result.error})`}`));
      }
      if (globalThis.caches?.delete) {
        for (const name of optional.cacheNames) {
          try {
            const removed = await caches.delete(name);
            report.push(`Cache ${name}: ${removed ? "removed" : "not found"}`);
          } catch (error) {
            report.push(`Cache ${name}: warning (${error?.message || error})`);
          }
        }
      }
      if (navigator.serviceWorker?.getRegistrations) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            const scope = registration.scope || "";
            const scriptUrl = registration.active?.scriptURL || registration.waiting?.scriptURL || registration.installing?.scriptURL || "";
            if (TEE_STORAGE_NAME_PATTERN.test(scope) || TEE_STORAGE_NAME_PATTERN.test(scriptUrl) || scope.includes("/apps/travel-private-documents/")) {
              const removed = await registration.unregister();
              report.push(`Service Worker ${scope}: ${removed ? "unregistered" : "not changed"}`);
            }
          }
        } catch (error) {
          report.push(`Service Worker cleanup: warning (${error?.message || error})`);
        }
      }
    } catch (error) {
      report.push(`Optional browser-storage cleanup: warning (${error?.message || error})`);
    }

    const after = await discoverTeeStorage();
    const coreVerified = !after.vaultKeyPresent && localStorage.getItem("teeSecureVaultV1") === null && !loadVault()?.id;
    const teeLocalVerified = after.localKeys.length === 0;
    const teeSessionVerified = after.sessionKeys.length === 0;
    report.push(`Final vault-key verification: ${coreVerified ? "PASSED" : "FAILED"}`);
    report.push(`TEE localStorage verification: ${teeLocalVerified ? "PASSED" : `WARNING (${after.localKeys.join(", ")})`}`);
    report.push(`TEE sessionStorage verification: ${teeSessionVerified ? "PASSED" : `WARNING (${after.sessionKeys.join(", ")})`}`);

    if (!coreVerified) {
      showResetReport("error");
      setSecureMessage("Verified Reset FAILED. The vault source key still exists. Do not create a new vault.", "error");
      return;
    }

    updateSecureVaultUi();

    // Detect code that recreates the key during a UI refresh before reloading.
    const recreated = localStorage.getItem("teeSecureVaultV1") !== null || Boolean(loadVault()?.id);
    if (recreated) {
      report.push("Post-UI verification: FAILED - teeSecureVaultV1 was recreated.");
      showResetReport("error");
      setSecureMessage("Reset deleted the vault, but application code recreated it during UI refresh. Do not create a new vault.", "error");
      return;
    }

    report.push("Post-UI verification: PASSED");
    report.push("Reloading into first-run setup...");
    showResetReport("success");
    setSecureMessage("VERIFIED RESET PASSED. Reloading into first-run setup...", "success");

    window.setTimeout(() => {
      window.location.reload();
    }, 900);
  } catch (error) {
    console.error("Developer Reset failed:", error);
    report.push(`ERROR: ${error?.message || error}`);
    showResetReport("error");
    setSecureMessage(`Verified Reset could not complete: ${error?.message || error}`, "error");
  }
}

async function handleSecureCreate() {
  const passphraseA = secureVaultUi.createPassphrase.value;
  const confirmationA = secureVaultUi.confirmPassphrase.value;
  const passphraseB = secureVaultUi.createPassphraseB.value;
  const confirmationB = secureVaultUi.confirmPassphraseB.value;

  if (loadVault()?.id || vaultExists()) {
    setSecureMessage("A local vault already exists. Creating another vault here is blocked to prevent accidental replacement. Export or deliberately replace it through Backup Manager instead.", "error");
    updateSecureVaultUi();
    return;
  }
  if (passphraseA.length < 8 || passphraseB.length < 8) {
    setSecureMessage("Both couple passphrases must be at least 8 characters.", "error");
    return;
  }
  if (passphraseA !== confirmationA || passphraseB !== confirmationB) {
    setSecureMessage("One or both passphrase confirmations do not match.", "error");
    return;
  }
  if (passphraseA === passphraseB) {
    setSecureMessage("The two couples must use different passphrases.", "error");
    return;
  }

  try {
    const newVault = await createTwoCoupleVault(passphraseA, passphraseB);
    if (!saveVault({ ...newVault, state: "locked" })) {
      throw new Error("The browser could not save the vault.");
    }
    secureVaultUi.createPassphrase.value = "";
    secureVaultUi.confirmPassphrase.value = "";
    secureVaultUi.createPassphraseB.value = "";
    secureVaultUi.confirmPassphraseB.value = "";
    setSecureMessage("Shared + private encrypted vault created. Couple B are using a temporary passphrase and can change it after unlocking.", "success");
    updateSecureVaultUi();
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to create the encrypted vault.", "error");
  }
}

async function handleSecureUnlock() {
  const passphrase = secureVaultUi.unlockPassphrase.value;
  if (!passphrase) {
    setSecureMessage("Enter the vault passphrase.", "error");
    return;
  }

  setSecureMessage("Opening encrypted vault…", "info");
  const success = await unlockVault(passphrase);
  secureVaultUi.unlockPassphrase.value = "";

  if (!success) {
    setSecureMessage("The passphrase is incorrect or the encrypted vault is damaged.", "error");
    updateSecureVaultUi();
    return;
  }

  const normalized = normalizeVaultData(getActiveVaultData());
  const accessPolicyCorrections = applyRecordAccessPolicyCorrections(normalized.data);
  const importTagRepairs = restoreMissingTeeImportTags(normalized.data);
  if (normalized.migrated || accessPolicyCorrections > 0 || importTagRepairs > 0) {
    try {
      await persistActiveVaultData();
      setSecureMessage(
        isTwoCoupleVault()
          ? `Vault opened for ${getActiveProfileLabel()}. Shared/Public-safe + your private records are available.`
          : "Legacy vault opened. Upgrade it to Shared + Private access before real-world use.",
        "success"
      );
    } catch (error) {
      console.error(error);
      setSecureMessage("Vault opened, but migrated data could not be resaved.", "error");
    }
  } else {
    setSecureMessage(
      isTwoCoupleVault()
        ? `Vault opened for ${getActiveProfileLabel()}. Shared/Public-safe + your private records are available.`
        : "Legacy vault opened. Upgrade it to Shared + Private access before real-world use.",
      "success"
    );
  }

  startAutoLock(() => lockSecureVault("The vault locked automatically."));
  updateSecureVaultUi();
  window.dispatchEvent(new CustomEvent("tee-vault-state-changed"));
}

async function handleLegacyArchitectureUpgrade() {
  if (isTwoCoupleVault()) {
    setSecureMessage("This vault already uses Shared + Private two-couple access.", "info");
    return;
  }
  const passphraseB = secureVaultUi.upgradePassphraseB?.value || "";
  const confirmB = secureVaultUi.upgradeConfirmPassphraseB?.value || "";
  if (passphraseB.length < 8) {
    setSecureMessage("Couple B passphrase must be at least 8 characters.", "error");
    return;
  }
  if (passphraseB !== confirmB) {
    setSecureMessage("Couple B passphrase confirmation does not match.", "error");
    return;
  }
  const approved = window.confirm(
    "Upgrade this existing legacy vault to two-couple Shared + Private encryption? Your current encrypted vault will first be preserved as a local safety snapshot. All existing records will remain intact and initially become Couple A Private until you explicitly mark selected records Shared."
  );
  if (!approved) return;
  const legacyBeforeUpgrade = loadVault();
  if (!legacyBeforeUpgrade?.id || isTwoCoupleVaultData(legacyBeforeUpgrade)) {
    setSecureMessage("The original legacy vault could not be located. Upgrade cancelled without changing the vault.", "error");
    return;
  }
  if (!saveLegacyVaultSafetySnapshot(legacyBeforeUpgrade)) {
    setSecureMessage("TEE could not create the encrypted legacy safety snapshot. Upgrade cancelled without changing the vault.", "error");
    return;
  }
  try {
    await upgradeLegacyVaultToTwoCouple(passphraseB);
    if (!saveVault({ ...getVault(), state: "locked" })) {
      saveVault(legacyBeforeUpgrade);
      restoreVault(legacyBeforeUpgrade);
      throw new Error("The upgraded vault could not be saved. The original encrypted vault was restored.");
    }
    if (secureVaultUi.upgradePassphraseB) secureVaultUi.upgradePassphraseB.value = "";
    if (secureVaultUi.upgradeConfirmPassphraseB) secureVaultUi.upgradeConfirmPassphraseB.value = "";
    renderRecords();
    updateSecureVaultUi();
    setSecureMessage("Upgrade complete. All existing records were preserved as Couple A Private. Couple B now have temporary access and can choose a new passphrase after unlocking.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to upgrade the vault architecture.", "error");
  }
}

function lockSecureVault(message = "Vault locked.") {
  lockVault();
  updateSecureVaultUi();
  setSecureMessage(message, "info");
  window.dispatchEvent(new CustomEvent("tee-vault-state-changed"));
}

async function handleRecordSubmit(event) {
  event.preventDefault();
  noteVaultActivity();

  const type = secureVaultUi.recordForm.dataset.recordType;
  const definition = getSecureRecordDefinition(type);
  if (!definition) return;

  const formData = new FormData(secureVaultUi.recordForm);
  const fields = {};
  definition.fields.forEach(field => {
    fields[field.key] = String(formData.get(field.key) || "").trim();
  });
  const data = normalizeVaultData(getActiveVaultData()).data;
  const existingRecord = editingRecordId ? data.records.find(item => item.recordId === editingRecordId) : null;
  const enforcedScope = getEnforcedAccessScopeForType(type);
  const requestedScope = formData.get("accessScope") === "private" ? "private" : "shared";
  const accessScope = isTwoCoupleVault()
    ? (existingRecord?.classificationLocked === true ? requestedScope : (enforcedScope || requestedScope))
    : "shared";
  let visibilityClass;
  if (existingRecord?.classificationLocked === true) {
    const oldScope = existingRecord.accessScope === "private" ? "private" : "shared";
    visibilityClass = requestedScope !== oldScope
      ? (requestedScope === "private" ? "private" : "shared")
      : normalizeVisibilityClass(existingRecord.visibilityClass, existingRecord.type, existingRecord.accessScope);
  } else {
    visibilityClass = getEnforcedVisibilityClassForType(type) || (accessScope === "private" ? "private" : "shared");
  }

  const now = new Date().toISOString();

  if (editingRecordId) {
    const record = data.records.find(item => item.recordId === editingRecordId);
    if (!record) return;

    const changes = collectFieldChanges(definition, record.fields, fields);
    if ((record.accessScope || "shared") !== accessScope) {
      changes.push({
        fieldKey: "accessScope",
        label: "Access scope",
        sensitivity: "private",
        oldValue: record.accessScope === "private" ? "Private" : "Shared",
        newValue: accessScope === "private" ? `Private — ${getActiveProfileLabel()}` : "Shared"
      });
    }
    if (normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope) !== visibilityClass) {
      changes.push({
        fieldKey: "visibilityClass",
        label: "Classification",
        sensitivity: "private",
        oldValue: normalizeVisibilityClass(record.visibilityClass, record.type, record.accessScope),
        newValue: visibilityClass
      });
    }
    if (!changes.length) {
      setSecureMessage("No changes were detected. The record was not resaved.", "info");
      closeRecordForm();
      return;
    }

    record.type = type;
    record.fields = fields;
    record.accessScope = accessScope;
    record.visibilityClass = visibilityClass;
    record.recordStatus = record.recordStatus || "active";
    if (existingRecord?.classificationLocked === true || requestedScope !== (existingRecord?.accessScope === "private" ? "private" : "shared")) record.classificationLocked = true;
    if (accessScope === "private") delete record.privacyReview;
    record.lastModifiedAt = now;
    record.recordVersion = (Number(record.recordVersion) || 1) + 1;
    record.ownerVaultId = record.ownerVaultId || getVault().id;
    record.history = Array.isArray(record.history) ? record.history : [];
    record.history.push(createHistoryEntry(
      "Edited",
      `${changes.length} field${changes.length === 1 ? "" : "s"} changed`,
      now,
      changes
    ));
  } else {
    data.records.push({
      recordId: generateUUID(),
      type,
      createdAt: now,
      lastModifiedAt: now,
      recordVersion: 1,
      ownerVaultId: getVault().id,
      fields,
      relationships: [],
      favorite: false,
      tags: [],
      accessScope,
      visibilityClass,
      recordStatus: "active",
      classificationLocked: false,
      history: [createHistoryEntry("Created", `${definition.label} record created`, now)]
    });
  }

  try {
    await persistActiveVaultData();
    closeRecordForm();
    renderRecords();
    setSecureMessage(`${definition.label} record encrypted and saved.`, "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to save the record.", "error");
  }
}



function formatBackupDate(value) {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
}

function createBackupReportRow(label, value) {
  const row = document.createElement("div");
  row.className = "secure-backup-report-row";
  const name = document.createElement("span");
  name.textContent = label;
  const result = document.createElement("strong");
  result.textContent = value;
  row.append(name, result);
  return row;
}

function showBackupReport(title, status, details = []) {
  if (!secureVaultUi.backupReport) return;
  secureVaultUi.backupReport.replaceChildren();
  secureVaultUi.backupReport.hidden = false;
  secureVaultUi.backupReport.dataset.status = status;

  const heading = document.createElement("div");
  heading.className = "secure-backup-report-head";
  const h4 = document.createElement("h4");
  h4.textContent = title;
  const badge = document.createElement("strong");
  badge.textContent = status === "healthy" ? "Verified" : "Attention";
  heading.append(h4, badge);
  secureVaultUi.backupReport.appendChild(heading);

  details.forEach(([label, value]) => {
    secureVaultUi.backupReport.appendChild(createBackupReportRow(label, value));
  });
}

function inspectBackupEnvelope(parsed) {
  const checks = [];
  const isEnvelope = parsed?.format === SECURE_BACKUP_FORMAT;
  const vaultData = isEnvelope ? parsed.vault : parsed;

  checks.push(["Valid JSON", "Yes"]);
  checks.push(["Backup format", isEnvelope ? parsed.format : "Legacy encrypted vault"]);
  checks.push(["Backup version", isEnvelope ? String(parsed.backupVersion ?? "Missing") : "Legacy"]);
  checks.push(["Vault ID", vaultData?.id ? String(vaultData.id) : "Missing"]);
  checks.push(["Exported", isEnvelope ? formatBackupDate(parsed.exportedAt) : "Not available"]);
  checks.push(["Vault version", vaultData?.version ? String(vaultData.version) : "Missing"]);
  checks.push(["Auto-lock", vaultData?.timeoutMinutes ? `${vaultData.timeoutMinutes} minutes` : "Missing"]);
  if (isTwoCoupleVaultData(vaultData)) {
    checks.push(["Vault architecture", "Shared + Couple A Private + Couple B Private"]);
    checks.push(["Access profiles", "2 independent passphrases"]);
    checks.push(["Shared encrypted zone", vaultData?.zones?.shared?.encryptedPayload?.ciphertext ? "Present" : "Missing"]);
    checks.push(["Couple A private zone", vaultData?.zones?.coupleA?.encryptedPayload?.ciphertext ? "Present" : "Missing"]);
    checks.push(["Couple B private zone", vaultData?.zones?.coupleB?.encryptedPayload?.ciphertext ? "Present" : "Missing"]);
    checks.push(["Shared key access wrappers", vaultData?.accessProfiles?.coupleA?.wrappedKeys?.shared?.ciphertext && vaultData?.accessProfiles?.coupleB?.wrappedKeys?.shared?.ciphertext ? "Present for both couples" : "Missing"]);
  } else {
    checks.push(["Encryption version", vaultData?.authentication?.cryptoVersion || "Missing"]);
    checks.push(["Salt", vaultData?.authentication?.salt ? "Present" : "Missing"]);
    checks.push(["Verifier IV", vaultData?.authentication?.verifier?.iv ? "Present" : "Missing"]);
    checks.push(["Verifier ciphertext", vaultData?.authentication?.verifier?.ciphertext ? "Present" : "Missing"]);
    checks.push(["Payload IV", vaultData?.encryptedPayload?.iv ? "Present" : "Missing"]);
    checks.push(["Payload ciphertext", vaultData?.encryptedPayload?.ciphertext ? "Present" : "Missing"]);
  }

  if (isEnvelope && ![1, SECURE_BACKUP_VERSION].includes(parsed.backupVersion)) {
    throw new Error("This backup version is not supported by this TEE build.");
  }
  if (!validateImportedVault(vaultData)) {
    throw new Error("This file is incomplete or is not a valid encrypted TEE vault backup.");
  }

  return { parsed, vaultData: { ...vaultData, state: "locked" }, checks, isEnvelope };
}

async function readAndInspectBackup(file) {
  let parsed;
  try {
    parsed = JSON.parse(await file.text());
  } catch {
    throw new Error("The selected file is not valid JSON.");
  }
  return inspectBackupEnvelope(parsed);
}

async function handleBackupVerification(file, showFullInfo = false) {
  if (!file) return;
  try {
    const inspected = await readAndInspectBackup(file);
    const details = showFullInfo ? inspected.checks : [
      ["Backup format", inspected.isEnvelope ? `Version ${inspected.parsed.backupVersion}` : "Legacy encrypted vault"],
      ["Vault version", inspected.vaultData.version || "Not available"],
      ["Exported", inspected.isEnvelope ? formatBackupDate(inspected.parsed.exportedAt) : "Not available"],
      ["Encryption", isTwoCoupleVaultData(inspected.vaultData) ? "AES-GCM · 3 encrypted zones" : "AES-GCM encrypted payload"],
      ["Vault ID", inspected.vaultData.id]
    ];
    showBackupReport(showFullInfo ? "Backup Information" : "Backup Verification", "healthy", details);
    setSecureMessage(showFullInfo ? "Backup metadata displayed. No records were decrypted." : "Backup verified successfully. No records were decrypted.", "success");
  } catch (error) {
    console.error(error);
    showBackupReport("Backup Verification", "attention", [["Result", error.message || "Verification failed"]]);
    setSecureMessage(error.message || "Unable to verify the backup.", "error");
  } finally {
    secureVaultUi.importFile.value = "";
  }
}

const SECURE_BACKUP_FORMAT = "TEE_SECURE_VAULT_BACKUP";
const SECURE_BACKUP_VERSION = 2;

function buildEncryptedBackup() {
  const savedVault = loadVault();

  if (!savedVault?.id) {
    throw new Error("Create a vault before exporting a backup.");
  }

  return {
    format: SECURE_BACKUP_FORMAT,
    backupVersion: SECURE_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    vault: {
      ...savedVault,
      state: "locked"
    }
  };
}

function makeBackupFilename(vaultId) {
  const date = new Date().toISOString().slice(0, 10);
  const shortId = String(vaultId || "vault").slice(0, 8);
  return `TEE-encrypted-vault-${date}-${shortId}.json`;
}

function downloadJsonFile(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function handleEncryptedExport() {
  try {
    const backup = buildEncryptedBackup();
    downloadJsonFile(backup, makeBackupFilename(backup.vault.id));
    saveVaultHealthMetadata({ lastBackupAt: backup.exportedAt });
    if (getVaultState() === "unlocked") renderVaultHealth(normalizeVaultData(getActiveVaultData()).data.records);
    setSecureMessage("Encrypted backup exported. Keep the file and passphrase in separate safe places.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to export the encrypted backup.", "error");
  }
}

function validateImportedVault(vaultData) {
  if (!vaultData || typeof vaultData !== "object" || !vaultData.id) return false;
  if (isTwoCoupleVaultData(vaultData)) {
    const authOk = profile => Boolean(
      profile?.authentication?.salt &&
      profile?.authentication?.verifier?.iv && profile?.authentication?.verifier?.ciphertext &&
      profile?.wrappedKeys?.shared?.iv && profile?.wrappedKeys?.shared?.ciphertext &&
      profile?.wrappedKeys?.private?.iv && profile?.wrappedKeys?.private?.ciphertext
    );
    const zoneOk = zone => Boolean(zone?.encryptedPayload?.iv && zone?.encryptedPayload?.ciphertext);
    return authOk(vaultData.accessProfiles.coupleA) && authOk(vaultData.accessProfiles.coupleB) &&
      zoneOk(vaultData.zones.shared) && zoneOk(vaultData.zones.coupleA) && zoneOk(vaultData.zones.coupleB);
  }
  return Boolean(
    vaultData.authentication?.salt &&
    vaultData.authentication?.verifier?.iv && vaultData.authentication?.verifier?.ciphertext &&
    vaultData.encryptedPayload?.iv && vaultData.encryptedPayload?.ciphertext
  );
}

function parseEncryptedBackup(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("The selected file is not valid JSON.");
  }
  return inspectBackupEnvelope(parsed).vaultData;
}

async function handleEncryptedImport(file) {
  if (!file) return;

  try {
    const rawText = await file.text();
    const parsed = JSON.parse(rawText);
    const inspected = inspectBackupEnvelope(parsed);
    const importedVault = inspected.vaultData;
    showBackupReport("Backup Ready to Import", "healthy", [
      ["Vault ID", importedVault.id],
      ["Vault version", importedVault.version || "Not available"],
      ["Exported", inspected.isEnvelope ? formatBackupDate(inspected.parsed.exportedAt) : "Not available"],
      ["Encryption", isTwoCoupleVaultData(importedVault) ? "AES-GCM · 3 encrypted zones" : "AES-GCM encrypted payload"]
    ]);
    const existingVault = loadVault();

    if (existingVault?.id) {
      const approved = window.confirm(
        `Verified backup for vault ${importedVault.id}. Importing it will replace the encrypted vault currently stored in this browser. Continue?`
      );
      if (!approved) {
        setSecureMessage("Import cancelled. The current vault was not changed.", "info");
        return;
      }
    }

    lockVault();

    if (!saveVault(importedVault) || !restoreVault(importedVault)) {
      throw new Error("The imported vault could not be saved.");
    }

    saveVaultHealthMetadata({ lastRestoreAt: new Date().toISOString() });
    updateSecureVaultUi();
    setSecureMessage("Encrypted backup imported. Enter its passphrase to unlock and verify it.", "success");
  } catch (error) {
    console.error(error);
    setSecureMessage(error.message || "Unable to import the encrypted backup.", "error");
  } finally {
    secureVaultUi.importFile.value = "";
  }
}

function restoreSecureVault() {
  const saved = loadVault();
  if (saved) restoreVault(saved);
  updateSecureVaultUi();
  setSecureMessage(
    saved
      ? (isTwoCoupleVaultData(saved)
          ? "Existing Shared + Private vault detected. Use Vault Manager to unlock it with either authorized couple passphrase."
          : "Existing legacy vault detected. Unlock with the original passphrase first; your records remain unchanged until you deliberately upgrade.")
      : "No encrypted vault is stored on this device. You can create a new two-couple vault or restore a backup.",
    "info"
  );
}


// Assignment 13F: collapsible workspace preferences are local UI settings only.
const COLLAPSIBLE_WORKSPACE_STORAGE_KEY = "teeSecureVaultWorkspacePanelsV1";

function loadWorkspacePanelPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(COLLAPSIBLE_WORKSPACE_STORAGE_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch (error) {
    console.warn("Unable to load workspace panel preferences.", error);
    return {};
  }
}

function saveWorkspacePanelPreferences(preferences) {
  try {
    localStorage.setItem(COLLAPSIBLE_WORKSPACE_STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn("Unable to save workspace panel preferences.", error);
  }
}

function setWorkspacePanelCollapsed(section, collapsed, button, body, preferences, preferenceKey) {
  section.classList.toggle("is-collapsed", collapsed);
  body.hidden = collapsed;
  button.setAttribute("aria-expanded", String(!collapsed));
  button.textContent = collapsed ? "Expand" : "Collapse";
  preferences[preferenceKey] = collapsed;
  saveWorkspacePanelPreferences(preferences);
}

function makeWorkspaceSectionCollapsible({ section, header, preferenceKey, defaultCollapsed = false }) {
  if (!section || !header || section.dataset.collapsibleReady === "true") return;
  section.dataset.collapsibleReady = "true";
  section.classList.add("secure-collapsible-section");

  const body = document.createElement("div");
  body.className = "secure-collapsible-body";
  const children = Array.from(section.children).filter(child => child !== header);
  children.forEach(child => body.appendChild(child));
  section.appendChild(body);

  const controls = document.createElement("div");
  controls.className = "secure-collapse-controls";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary secure-collapse-button";
  button.setAttribute("aria-controls", `${section.id || preferenceKey}-collapsible-body`);
  body.id = `${section.id || preferenceKey}-collapsible-body`;
  controls.appendChild(button);
  header.appendChild(controls);

  const preferences = loadWorkspacePanelPreferences();
  const collapsed = Object.prototype.hasOwnProperty.call(preferences, preferenceKey)
    ? Boolean(preferences[preferenceKey])
    : defaultCollapsed;
  setWorkspacePanelCollapsed(section, collapsed, button, body, preferences, preferenceKey);

  button.addEventListener("click", () => {
    noteVaultActivity();
    const nextCollapsed = !section.classList.contains("is-collapsed");
    setWorkspacePanelCollapsed(section, nextCollapsed, button, body, preferences, preferenceKey);
  });
}


function expandWorkspacePanel(section, preferenceKey, { scroll = true } = {}) {
  if (!section) return;
  const body = section.querySelector(".secure-collapsible-body");
  const button = section.querySelector(".secure-collapse-button");
  if (body && button) {
    const preferences = loadWorkspacePanelPreferences();
    setWorkspacePanelCollapsed(section, false, button, body, preferences, preferenceKey);
  }
  if (scroll) {
    window.requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function expandSecureRecordsWorkspace({ scroll = true } = {}) {
  const section = document.getElementById("secureRecordsWorkspace");
  if (!section) return;

  const body = section.querySelector(".secure-collapsible-body");
  const button = section.querySelector(".secure-collapse-button");
  if (body && button) {
    const preferences = loadWorkspacePanelPreferences();
    setWorkspacePanelCollapsed(section, false, button, body, preferences, "records");
  }

  if (scroll) {
    window.requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function createSecureRecordsWorkspaceSection() {
  const searchToolbar = document.querySelector(".secure-search-toolbar");
  if (!searchToolbar || document.getElementById("secureRecordsWorkspace")) return null;

  const section = document.createElement("section");
  section.id = "secureRecordsWorkspace";
  section.className = "secure-records-workspace";
  section.setAttribute("aria-labelledby", "secureRecordsWorkspaceTitle");

  const header = document.createElement("div");
  header.className = "secure-records-workspace-head";
  const headingGroup = document.createElement("div");
  const title = document.createElement("h3");
  title.id = "secureRecordsWorkspaceTitle";
  title.textContent = "Secure Records";
  const description = document.createElement("p");
  description.textContent = "Search, add, edit, and manage the currently unlocked records.";
  headingGroup.append(title, description);
  header.appendChild(headingGroup);
  section.appendChild(header);

  searchToolbar.parentNode.insertBefore(section, searchToolbar);
  [searchToolbar, secureVaultUi.recordForm, secureVaultUi.recordList].forEach(element => {
    if (element) section.appendChild(element);
  });
  return { section, header };
}

function setupCollapsibleWorkspace() {
  const recordsWorkspace = createSecureRecordsWorkspaceSection();
  const panels = [
    { section: secureVaultUi.favorites, header: secureVaultUi.favorites?.querySelector(".secure-favorites-head"), preferenceKey: "favorites", defaultCollapsed: false },
    { section: secureVaultUi.tagExplorer, header: secureVaultUi.tagExplorer?.querySelector(".secure-tag-explorer-head"), preferenceKey: "tags", defaultCollapsed: false },
    { section: secureVaultUi.dashboard, header: secureVaultUi.dashboard?.querySelector(".secure-dashboard-head"), preferenceKey: "dashboard", defaultCollapsed: false },
    { section: secureVaultUi.health, header: secureVaultUi.health?.querySelector(".secure-health-head"), preferenceKey: "health", defaultCollapsed: true },
    { section: secureVaultUi.statistics, header: secureVaultUi.statistics?.querySelector(".secure-statistics-head"), preferenceKey: "statistics", defaultCollapsed: true },
    { section: secureVaultUi.expirationDashboard, header: secureVaultUi.expirationDashboard?.querySelector(".secure-expiration-head"), preferenceKey: "expirations", defaultCollapsed: false },
    { section: secureVaultUi.activityCenter, header: secureVaultUi.activityCenter?.querySelector(".secure-activity-head"), preferenceKey: "activity", defaultCollapsed: true },
    { section: secureVaultUi.recycleBin, header: secureVaultUi.recycleBin?.querySelector(".secure-recycle-bin-head"), preferenceKey: "recycleBin", defaultCollapsed: true },
    { section: recordsWorkspace?.section, header: recordsWorkspace?.header, preferenceKey: "records", defaultCollapsed: false }
  ];

  panels.forEach(makeWorkspaceSectionCollapsible);
}


// Assignment 15B: local-only dashboard customization.
const DASHBOARD_CUSTOMIZATION_STORAGE_KEY = "teeSecureVaultDashboardCustomizationV1";
const DASHBOARD_PANEL_DEFINITIONS = [
  { key: "favorites", label: "Favorites", defaultCollapsed: false, getSection: () => secureVaultUi.favorites },
  { key: "tags", label: "Smart Tag Explorer", defaultCollapsed: false, getSection: () => secureVaultUi.tagExplorer },
  { key: "dashboard", label: "Vault Dashboard", defaultCollapsed: false, getSection: () => secureVaultUi.dashboard },
  { key: "health", label: "Vault Health", defaultCollapsed: true, getSection: () => secureVaultUi.health },
  { key: "statistics", label: "Vault Statistics", defaultCollapsed: true, getSection: () => secureVaultUi.statistics },
  { key: "expirations", label: "Upcoming Expirations", defaultCollapsed: false, getSection: () => secureVaultUi.expirationDashboard },
  { key: "activity", label: "Activity Center", defaultCollapsed: true, getSection: () => secureVaultUi.activityCenter },
  { key: "recycleBin", label: "Recycle Bin", defaultCollapsed: true, getSection: () => secureVaultUi.recycleBin },
  { key: "records", label: "Secure Records", defaultCollapsed: false, getSection: () => document.getElementById("secureRecordsWorkspace") }
];

let dashboardCustomizationDialog = null;
let dashboardCustomizationList = null;

function getDefaultDashboardCustomization() {
  return {
    order: DASHBOARD_PANEL_DEFINITIONS.map(item => item.key),
    panels: Object.fromEntries(DASHBOARD_PANEL_DEFINITIONS.map(item => [item.key, {
      visible: true,
      collapsed: item.defaultCollapsed
    }]))
  };
}

function loadDashboardCustomization() {
  const defaults = getDefaultDashboardCustomization();
  try {
    const saved = JSON.parse(localStorage.getItem(DASHBOARD_CUSTOMIZATION_STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object") return defaults;
    const known = new Set(DASHBOARD_PANEL_DEFINITIONS.map(item => item.key));
    const order = Array.isArray(saved.order) ? saved.order.filter(key => known.has(key)) : [];
    defaults.order.forEach(key => { if (!order.includes(key)) order.push(key); });
    const panels = { ...defaults.panels };
    Object.keys(panels).forEach(key => {
      const incoming = saved.panels?.[key];
      if (incoming && typeof incoming === "object") {
        panels[key] = {
          visible: incoming.visible !== false,
          collapsed: Boolean(incoming.collapsed)
        };
      }
    });
    return { order, panels };
  } catch (error) {
    console.warn("Unable to load dashboard customization.", error);
    return defaults;
  }
}

function saveDashboardCustomization(customization) {
  try {
    localStorage.setItem(DASHBOARD_CUSTOMIZATION_STORAGE_KEY, JSON.stringify(customization));
  } catch (error) {
    console.warn("Unable to save dashboard customization.", error);
  }
}

function ensureDashboardPanelContainer() {
  let container = document.getElementById("secureDashboardPanelContainer");
  if (container) return container;
  container = document.createElement("div");
  container.id = "secureDashboardPanelContainer";
  container.className = "secure-dashboard-panel-container";
  const emergency = secureVaultUi.emergencyMode;
  if (emergency?.parentNode) emergency.parentNode.insertBefore(container, emergency.nextSibling);
  else secureVaultUi.contents?.appendChild(container);
  return container;
}

function applyDashboardCustomization({ applyCollapsedState = false } = {}) {
  const customization = loadDashboardCustomization();
  const container = ensureDashboardPanelContainer();
  const unlocked = getVaultState() === "unlocked";
  const workspacePreferences = loadWorkspacePanelPreferences();

  customization.order.forEach(key => {
    const definition = DASHBOARD_PANEL_DEFINITIONS.find(item => item.key === key);
    const section = definition?.getSection();
    if (!section) return;
    container.appendChild(section);
    const panelSettings = customization.panels[key] || { visible: true, collapsed: definition.defaultCollapsed };
    section.hidden = !unlocked || panelSettings.visible === false;

    if (applyCollapsedState) {
      const body = section.querySelector(".secure-collapsible-body");
      const button = section.querySelector(".secure-collapse-button");
      if (body && button) {
        setWorkspacePanelCollapsed(section, Boolean(panelSettings.collapsed), button, body, workspacePreferences, key);
      }
    }
  });
}

function moveDashboardCustomizationItem(item, direction) {
  const sibling = direction < 0 ? item.previousElementSibling : item.nextElementSibling;
  if (!sibling) return;
  if (direction < 0) item.parentNode.insertBefore(item, sibling);
  else item.parentNode.insertBefore(sibling, item);
}

function renderDashboardCustomizationDialog() {
  if (!dashboardCustomizationList) return;
  const customization = loadDashboardCustomization();
  dashboardCustomizationList.replaceChildren();
  customization.order.forEach(key => {
    const definition = DASHBOARD_PANEL_DEFINITIONS.find(item => item.key === key);
    if (!definition) return;
    const settings = customization.panels[key];
    const row = document.createElement("div");
    row.className = "secure-dashboard-customization-row";
    row.dataset.panelKey = key;

    const label = document.createElement("strong");
    label.textContent = definition.label;

    const visibleLabel = document.createElement("label");
    const visible = document.createElement("input");
    visible.type = "checkbox";
    visible.checked = settings.visible !== false;
    visible.className = "secure-dashboard-visible";
    visibleLabel.append(visible, document.createTextNode(" Show panel"));

    const collapsedLabel = document.createElement("label");
    const collapsed = document.createElement("input");
    collapsed.type = "checkbox";
    collapsed.checked = Boolean(settings.collapsed);
    collapsed.className = "secure-dashboard-collapsed";
    collapsedLabel.append(collapsed, document.createTextNode(" Start collapsed"));

    const actions = document.createElement("div");
    actions.className = "secure-dashboard-order-actions";
    const up = document.createElement("button");
    up.type = "button";
    up.className = "secondary";
    up.textContent = "Move Up";
    up.addEventListener("click", () => moveDashboardCustomizationItem(row, -1));
    const down = document.createElement("button");
    down.type = "button";
    down.className = "secondary";
    down.textContent = "Move Down";
    down.addEventListener("click", () => moveDashboardCustomizationItem(row, 1));
    actions.append(up, down);
    row.append(label, visibleLabel, collapsedLabel, actions);
    dashboardCustomizationList.appendChild(row);
  });
}

function saveDashboardCustomizationFromDialog() {
  const rows = Array.from(dashboardCustomizationList?.querySelectorAll(".secure-dashboard-customization-row") || []);
  const customization = {
    order: rows.map(row => row.dataset.panelKey),
    panels: {}
  };
  rows.forEach(row => {
    customization.panels[row.dataset.panelKey] = {
      visible: row.querySelector(".secure-dashboard-visible")?.checked !== false,
      collapsed: Boolean(row.querySelector(".secure-dashboard-collapsed")?.checked)
    };
  });
  saveDashboardCustomization(customization);
  applyDashboardCustomization({ applyCollapsedState: true });
  dashboardCustomizationDialog?.close();
  setSecureMessage("Dashboard layout saved on this device.", "success");
}

function resetDashboardCustomization() {
  localStorage.removeItem(DASHBOARD_CUSTOMIZATION_STORAGE_KEY);
  renderDashboardCustomizationDialog();
  applyDashboardCustomization({ applyCollapsedState: true });
  setSecureMessage("Dashboard layout reset to defaults.", "success");
}

function setupDashboardCustomization() {
  if (!secureVaultUi.quickActions || document.getElementById("secureQuickCustomize")) return;
  const launch = document.createElement("button");
  launch.id = "secureQuickCustomize";
  launch.type = "button";
  launch.className = "secondary";
  launch.textContent = "⚙ Customize Dashboard";
  secureVaultUi.quickActions.insertBefore(launch, secureVaultUi.quickEmergency || null);

  const dialog = document.createElement("dialog");
  dialog.id = "secureDashboardCustomizationDialog";
  dialog.className = "secure-dashboard-customization-dialog";
  dialog.innerHTML = `
    <form method="dialog" class="secure-dashboard-customization-card">
      <div class="secure-dashboard-customization-head">
        <div>
          <h3>Customize Dashboard</h3>
          <p>Choose panel visibility, order, and starting collapsed state. These settings stay on this device only.</p>
        </div>
        <button type="button" class="secondary" data-dashboard-close>Close</button>
      </div>
      <div class="secure-dashboard-customization-list"></div>
      <div class="secure-dashboard-customization-actions">
        <button type="button" class="secondary" data-dashboard-reset>Reset Defaults</button>
        <button type="button" data-dashboard-save>Save Layout</button>
      </div>
    </form>`;
  document.body.appendChild(dialog);
  dashboardCustomizationDialog = dialog;
  dashboardCustomizationList = dialog.querySelector(".secure-dashboard-customization-list");

  launch.addEventListener("click", () => {
    noteVaultActivity();
    renderDashboardCustomizationDialog();
    dialog.showModal();
  });
  dialog.querySelector("[data-dashboard-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-dashboard-reset]")?.addEventListener("click", resetDashboardCustomization);
  dialog.querySelector("[data-dashboard-save]")?.addEventListener("click", saveDashboardCustomizationFromDialog);
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

  applyDashboardCustomization({ applyCollapsedState: true });
}

function bindQuickActions() {
  secureVaultUi.quickNewRecord?.addEventListener("click", () => {
    noteVaultActivity();
    expandSecureRecordsWorkspace({ scroll: false });
    openRecordForm(secureVaultUi.recordType.value, null, getSelectedRecordTemplate(secureVaultUi.recordType.value));
  });

  secureVaultUi.quickSearch?.addEventListener("click", () => {
    noteVaultActivity();
    expandSecureRecordsWorkspace();
    window.requestAnimationFrame(() => secureVaultUi.recordSearch?.focus());
  });

  secureVaultUi.quickFavorites?.addEventListener("click", () => {
    noteVaultActivity();
    expandWorkspacePanel(secureVaultUi.favorites, "favorites");
  });

  secureVaultUi.quickExpirations?.addEventListener("click", () => {
    noteVaultActivity();
    expandWorkspacePanel(secureVaultUi.expirationDashboard, "expirations");
  });

  secureVaultUi.quickRecycleBin?.addEventListener("click", () => {
    noteVaultActivity();
    expandWorkspacePanel(secureVaultUi.recycleBin, "recycleBin");
  });

  secureVaultUi.quickBackup?.addEventListener("click", () => {
    noteVaultActivity();
    document.querySelector(".secure-backup-tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  secureVaultUi.quickEmergency?.addEventListener("click", enterEmergencyMode);
  secureVaultUi.emergencyExit?.addEventListener("click", () => exitEmergencyMode());
  secureVaultUi.emergencyLock?.addEventListener("click", () => lockSecureVault("Vault locked from Emergency Mode."));
  secureVaultUi.tripWorkspaceExit?.addEventListener("click", () => exitTripWorkspace());
  secureVaultUi.tripWorkspaceEmergency?.addEventListener("click", enterEmergencyMode);
  secureVaultUi.tripWorkspaceSearch?.addEventListener("input", () => {
    noteVaultActivity();
    renderTripWorkspace();
  });
}

function bindSecureVault() {
  populateRecordTypes();
  setupCollapsibleWorkspace();
  setupDashboardCustomization();
  bindQuickActions();
  secureVaultUi.managerUnlock?.addEventListener("click", () => {
    secureVaultUi.unlockFields.hidden = false;
    secureVaultUi.unlockPassphrase?.focus();
    secureVaultUi.unlockFields.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  secureVaultUi.managerCreate?.addEventListener("click", () => {
    // This action is available only when no local vault exists. Re-check storage
    // before exposing creation controls to prevent a stale-screen overwrite.
    if (loadVault()?.id || vaultExists()) {
      setSecureMessage("An existing local vault was detected. New-vault setup remains blocked to protect it.", "error");
      updateSecureVaultUi();
      return;
    }
    secureVaultUi.createFields.hidden = false;
    setSecureSetupStep(1);
    secureVaultUi.createPassphrase?.focus();
    secureVaultUi.createFields.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  secureVaultUi.managerRestore?.addEventListener("click", () => {
    pendingBackupAction = "import";
    secureVaultUi.importFile?.click();
  });
  secureVaultUi.managerReset?.addEventListener("click", handleDeveloperResetTestVault);
  secureVaultUi.managerDiagnostics?.addEventListener("click", showStorageDiagnostics);
  secureVaultUi.setupNextA?.addEventListener("click", () => {
    if (!validateSetupCoupleA()) return;
    setSecureMessage("", "info");
    setSecureSetupStep(2);
    secureVaultUi.createPassphraseB?.focus();
  });
  secureVaultUi.setupBackB?.addEventListener("click", () => setSecureSetupStep(1));
  secureVaultUi.setupNextB?.addEventListener("click", () => {
    if (!validateSetupCoupleA() || !validateSetupCoupleB()) return;
    setSecureMessage("", "info");
    setSecureSetupStep(3);
  });
  secureVaultUi.setupBackReview?.addEventListener("click", () => setSecureSetupStep(2));
  document.getElementById("secureCreateButton").addEventListener("click", handleSecureCreate);
  document.getElementById("secureUnlockButton").addEventListener("click", handleSecureUnlock);
  document.getElementById("secureLockButton").addEventListener("click", () => lockSecureVault());
  secureVaultUi.exportButton.addEventListener("click", handleEncryptedExport);
  secureVaultUi.verifyButton?.addEventListener("click", () => {
    pendingBackupAction = "verify";
    secureVaultUi.importFile.click();
  });
  secureVaultUi.backupInfoButton?.addEventListener("click", () => {
    pendingBackupAction = "info";
    secureVaultUi.importFile.click();
  });
  secureVaultUi.importButton.addEventListener("click", () => {
    pendingBackupAction = "import";
    secureVaultUi.importFile.click();
  });
  secureVaultUi.importFile.addEventListener("change", event => {
    const file = event.target.files?.[0];
    if (pendingBackupAction === "verify") return handleBackupVerification(file, false);
    if (pendingBackupAction === "info") return handleBackupVerification(file, true);
    return handleEncryptedImport(file);
  });
  secureVaultUi.recordType.addEventListener("change", () => {
    populateRecordTemplates(secureVaultUi.recordType.value);
  });
  secureVaultUi.addRecordButton.addEventListener("click", () => {
    noteVaultActivity();
    expandSecureRecordsWorkspace({ scroll: false });
    openRecordForm(secureVaultUi.recordType.value, null, getSelectedRecordTemplate(secureVaultUi.recordType.value));
    window.requestAnimationFrame(() => {
      secureVaultUi.recordForm?.scrollIntoView({ behavior: "smooth", block: "start" });
      secureVaultUi.recordForm?.querySelector("input, textarea, select")?.focus({ preventScroll: true });
    });
  });
  secureVaultUi.cancelRecordButton.addEventListener("click", closeRecordForm);
  secureVaultUi.recordForm.addEventListener("submit", handleRecordSubmit);
  secureVaultUi.upgradeArchitectureButton?.addEventListener("click", handleLegacyArchitectureUpgrade);
  secureVaultUi.showChangePassphrase?.addEventListener("click", () => {
    secureVaultUi.changePassphraseFields.hidden = false;
    secureVaultUi.currentPassphrase?.focus();
  });
  secureVaultUi.cancelPassphraseChange?.addEventListener("click", () => {
    secureVaultUi.changePassphraseFields.hidden = true;
    if (secureVaultUi.currentPassphrase) secureVaultUi.currentPassphrase.value = "";
    if (secureVaultUi.newPassphrase) secureVaultUi.newPassphrase.value = "";
    if (secureVaultUi.confirmNewPassphrase) secureVaultUi.confirmNewPassphrase.value = "";
  });
  secureVaultUi.savePassphraseChange?.addEventListener("click", handleActivePassphraseChange);
  secureVaultUi.closeHistoryButton?.addEventListener("click", () => secureVaultUi.historyDialog.close());
  secureVaultUi.historyDialog?.addEventListener("click", event => {
    if (event.target === secureVaultUi.historyDialog) secureVaultUi.historyDialog.close();
  });
  secureVaultUi.closeRelationshipsButton?.addEventListener("click", () => {
    relationshipRecordId = null;
    secureVaultUi.relationshipsDialog.close();
  });
  secureVaultUi.saveRelationshipsButton?.addEventListener("click", saveRelationships);
  secureVaultUi.saveTagsButton?.addEventListener("click", saveRecordTags);
  secureVaultUi.closeTagsButton?.addEventListener("click", () => {
    tagEditingRecordId = null;
    secureVaultUi.tagsDialog.close();
  });
  secureVaultUi.tagsDialog?.addEventListener("click", event => {
    if (event.target === secureVaultUi.tagsDialog) {
      tagEditingRecordId = null;
      secureVaultUi.tagsDialog.close();
    }
  });
  secureVaultUi.relationshipsDialog?.addEventListener("click", event => {
    if (event.target === secureVaultUi.relationshipsDialog) {
      relationshipRecordId = null;
      secureVaultUi.relationshipsDialog.close();
    }
  });

  secureVaultUi.recordSearch.addEventListener("input", () => {
    noteVaultActivity();
    renderRecords();
  });
  secureVaultUi.runSearchButton?.addEventListener("click", () => {
    noteVaultActivity();
    renderRecords();
    expandSecureRecordsWorkspace();
  });
  secureVaultUi.recordSearch.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    noteVaultActivity();
    renderRecords();
    expandSecureRecordsWorkspace();
  });
  secureVaultUi.expirationWindow?.addEventListener("change", () => {
    noteVaultActivity();
    renderRecords();
  });
  secureVaultUi.activityLimit?.addEventListener("change", () => {
    noteVaultActivity();
    renderRecords();
  });

  secureVaultUi.recordFilter.addEventListener("change", () => {
    activeDashboardSection = null;
    noteVaultActivity();
    renderRecords();
  });
  secureVaultUi.clearSearchButton.addEventListener("click", () => {
    noteVaultActivity();
    clearSecureSearch();
    renderRecords();
    secureVaultUi.recordSearch.focus();
  });
  secureVaultUi.emptyRecycleBinButton?.addEventListener("click", emptyRecycleBin);
  secureVaultUi.clearTagsButton?.addEventListener("click", () => {
    noteVaultActivity();
    clearSecureSearch();
    renderRecords();
    expandSecureRecordsWorkspace();
  });
  secureVaultUi.dashboardShowAll?.addEventListener("click", () => {
    noteVaultActivity();
    clearSecureSearch();
    renderRecords();
    expandSecureRecordsWorkspace();
  });

  secureVaultUi.passportMigrationButton?.addEventListener("click", importCoupleAPassportMigration);
  secureVaultUi.globalEntryMigrationButton?.addEventListener("click", importCoupleAGlobalEntryMigration);
  secureVaultUi.quickTeeImport?.addEventListener("click", openTeeImportWizard);
  secureVaultUi.teeImportClose?.addEventListener("click", closeTeeImportWizard);
  secureVaultUi.teeImportSelectReady?.addEventListener("click", () => setTeeImportSelection("ready"));
  secureVaultUi.teeImportClear?.addEventListener("click", () => setTeeImportSelection("clear"));
  secureVaultUi.teeImportRun?.addEventListener("click", importSelectedTeeRecords);

  ["pointerdown", "keydown", "touchstart"].forEach(type => {
    secureVaultUi.panel.addEventListener(type, () => noteVaultActivity(), { passive: true });
  });

  window.addEventListener("pagehide", () => lockVault());
  restoreSecureVault();
}


// TEE v3.3.38 — bridge used by the Structured Document workspace.
// Public projections are intentionally kept outside this encrypted store.
// Shared layers are written to the Shared zone; Private layers are written to
// the currently authenticated couple's private zone.
function getStructuredDocumentOverlayRecords(documentId = "") {
  if (getVaultState() !== "unlocked") return [];
  const records = normalizeVaultData(getActiveVaultData()).data.records || [];
  return records.filter(record => {
    if (record.type !== "structuredDocument") return false;
    if (documentId && record.fields?.documentId !== documentId) return false;
    return true;
  }).map(record => {
    let payload = { fields: [], images: [] };
    try {
      const parsed = JSON.parse(record.fields?.payloadJson || "{}");
      payload = {
        fields: Array.isArray(parsed.fields) ? parsed.fields : [],
        images: Array.isArray(parsed.images) ? parsed.images : [],
        sourceFile: parsed.sourceFile && typeof parsed.sourceFile === "object" ? parsed.sourceFile : null
      };
    } catch {}
    return {
      recordId: record.recordId,
      documentId: record.fields?.documentId || "",
      documentTitle: record.fields?.documentTitle || "",
      layer: record.fields?.layerLabel === "private" || record.accessScope === "private" ? "private" : "shared",
      category: record.fields?.category || "",
      payload,
      originalReference: record.fields?.originalReference || ""
    };
  });
}

async function saveStructuredDocumentOverlay(input = {}) {
  if (getVaultState() !== "unlocked") throw new Error("Unlock the vault before saving protected structured-document content.");
  if (!isTwoCoupleVault()) throw new Error("Structured document protection requires the Shared + Private two-couple vault architecture.");
  const documentId = String(input.documentId || "").trim();
  const title = String(input.title || "").trim();
  const layer = input.layer === "private" ? "private" : "shared";
  if (!documentId || !title) throw new Error("Structured document ID and title are required.");
  const fields = Array.isArray(input.payload?.fields) ? input.payload.fields : [];
  const images = Array.isArray(input.payload?.images) ? input.payload.images : [];
  const sourceFile = input.payload?.sourceFile && typeof input.payload.sourceFile === "object" ? input.payload.sourceFile : null;
  const hasContent = fields.length > 0 || images.length > 0 || Boolean(sourceFile) || String(input.originalReference || "").trim();
  const data = normalizeVaultData(getActiveVaultData()).data;
  const existing = data.records.find(record => record.type === "structuredDocument" && record.fields?.documentId === documentId && (record.fields?.layerLabel || record.accessScope) === layer);
  if (!hasContent) {
    if (existing) {
      data.records = data.records.filter(record => record.recordId !== existing.recordId);
      await persistActiveVaultData();
    }
    return null;
  }
  const now = new Date().toISOString();
  const payloadJson = JSON.stringify({ fields, images, sourceFile });
  if (existing) {
    existing.fields = {
      ...existing.fields,
      documentId,
      documentTitle: title,
      layerLabel: layer,
      category: String(input.category || ""),
      payloadJson,
      originalReference: String(input.originalReference || "")
    };
    existing.accessScope = layer;
    existing.visibilityClass = layer;
    existing.classificationLocked = true;
    existing.lastModifiedAt = now;
    existing.recordVersion = (Number(existing.recordVersion) || 1) + 1;
    existing.history = Array.isArray(existing.history) ? existing.history : [];
    existing.history.push(createHistoryEntry("Edited", `Structured document ${layer} layer updated`, now));
  } else {
    data.records.push({
      recordId: generateUUID(),
      type: "structuredDocument",
      createdAt: now,
      lastModifiedAt: now,
      recordVersion: 1,
      ownerVaultId: getVault().id,
      fields: {
        documentId,
        documentTitle: title,
        layerLabel: layer,
        category: String(input.category || ""),
        payloadJson,
        originalReference: String(input.originalReference || ""),
        notes: "TEE v3.3.41 structured document layer"
      },
      relationships: [],
      favorite: false,
      tags: normalizeTags(["structured-document", layer, input.category || ""]),
      accessScope: layer,
      visibilityClass: layer,
      recordStatus: "active",
      classificationLocked: true,
      history: [createHistoryEntry("Created", `Structured document ${layer} layer created`, now)]
    });
  }
  await persistActiveVaultData();
  renderRecords();
  window.dispatchEvent(new CustomEvent("tee-vault-state-changed"));
  return true;
}


async function deleteStructuredDocumentOverlays(documentId = "") {
  if (getVaultState() !== "unlocked") throw new Error("Unlock the vault before deleting protected structured-document content.");
  const id = String(documentId || "").trim();
  if (!id) return 0;
  const data = normalizeVaultData(getActiveVaultData()).data;
  const before = data.records.length;
  data.records = data.records.filter(record => !(record.type === "structuredDocument" && record.fields?.documentId === id));
  const removed = before - data.records.length;
  if (removed) {
    await persistActiveVaultData();
    renderRecords();
    window.dispatchEvent(new CustomEvent("tee-vault-state-changed"));
  }
  return removed;
}

window.TEEStructuredDocumentVault = Object.freeze({
  getState: () => getVaultState(),
  getActiveProfileId: () => getActiveProfileId(),
  getActiveProfileLabel: () => getActiveProfileLabel(),
  listOverlays: documentId => getStructuredDocumentOverlayRecords(documentId),
  saveOverlay: input => saveStructuredDocumentOverlay(input),
  deleteOverlays: documentId => deleteStructuredDocumentOverlays(documentId)
});


bindSecureVault();
