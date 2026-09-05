"use strict";

(() => {
  const APP_RULES = {
    "travel-itinerary": ["flight","hotel","rail","railPass","transportation","activity","travelInsurance","emergencyContact"],
    "travel-transportation": ["flight","rail","railPass","transportation"],
    "travel-hotels": ["hotel"],
    "travel-daily-operations": ["flight","hotel","rail","railPass","transportation","activity","travelInsurance","emergencyContact"],
    "travel-essentials": ["passport","globalEntry","visa","travelInsurance","medical","emergencyContact","flight","hotel","rail","railPass","transportation"],
    "travel-insurance": ["travelInsurance","medical","emergencyContact"],
    "travel-maps-movement": ["hotel","rail","transportation"],
    "travel-money-tipping": ["creditCard"]
  };

  const FIELD_HINTS = {
    hotel: ["hotelName","address","checkInDate","checkOutDate"],
    flight: ["departureDate","departureAirport","arrivalAirport","flightNumber","travelerName"],
    rail: ["departureDate","departureStation","arrivalStation","trainNumber","travelerName"],
    railPass: ["travelerName","passType","provider"],
    transportation: ["route","provider","date","departureDate","travelerName"],
    activity: ["activityName","city","date","travelerName"],
    travelInsurance: ["provider","policyName","travelerName"],
    medical: ["travelerName","name"],
    emergencyContact: ["contactName","relationship","mobilePhone"],
    passport: ["holderName"],
    globalEntry: ["holderName"],
    visa: ["holderName","country"],
    creditCard: ["cardholderName","issuer","cardName"]
  };

  /* Small/specific containers come first so protected values land beside the
     sentence/card that promises them, not in a generic block farther down. */
  const CARD_SELECTORS = [
    ".emergency-contact-group",
    ".identity-vault-entry",
    ".phone-data-card",
    ".quick-reference-action-card",
    ".problem-action-body",
    ".problem-action",
    ".timeline-card",
    ".transport-card",
    ".hotel-card",
    ".trip-day-dropdown",
    ".day-card",
    ".operation-card",
    ".destination-card",
    ".essential-card",
    ".insurance-card",
    ".mission-control",
    ".record-card",
    "article[data-date]",
    "article[data-city]",
    "section[id]",
    "details[id]",
    "article"
  ];

  const scriptUrl = document.currentScript?.src || location.href;
  const vaultSessionUrl = new URL("./vault-session.js", scriptUrl).href;
  const vaultUrl = new URL("./apps/travel-private-documents/index.html", scriptUrl).href;
  let rendering = false;

  function appId(){
    const m = location.pathname.match(/\/apps\/([^/]+)\//);
    return m ? m[1] : "hub";
  }
  function escapeHtml(value){
    return String(value ?? "").replace(/[&<>\"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  }
  function normalize(value){
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }
  function fieldMap(record){
    const out = {};
    (record.fields || []).forEach(f => { out[f.key] = String(f.value ?? "").trim(); });
    return out;
  }
  function usefulTokens(record){
    const fields = fieldMap(record);
    const hints = FIELD_HINTS[record.type] || [];
    const raw = [record.title, ...hints.map(k => fields[k])].filter(Boolean);
    const tokens = new Set();
    raw.forEach(value => normalize(value).split(" ").forEach(t => {
      if(t.length >= 4 && !/^(hotel|train|flight|travel|shared|private|record|details|2026)$/.test(t)) tokens.add(t);
    }));
    return [...tokens];
  }
  function dateTokens(record){
    const fields = fieldMap(record);
    const raw = [fields.date, fields.departureDate, fields.arrivalDate, fields.checkInDate, fields.checkOutDate].filter(Boolean);
    const out = [];
    raw.forEach(v => {
      const d = new Date(v + (v.length === 10 ? "T12:00:00" : ""));
      if(!Number.isNaN(d.getTime())){
        out.push(normalize(d.toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric"})));
        out.push(normalize(d.toLocaleDateString("en-US", {month:"short", day:"numeric"})));
      }
      out.push(normalize(v));
    });
    return [...new Set(out.filter(Boolean))];
  }
  function headingText(el){
    return normalize(el?.querySelector?.("h1,h2,h3,h4,summary,strong")?.textContent || el?.textContent || "");
  }
  function firstMatching(selector, predicate){
    return [...document.querySelectorAll(selector)].find(predicate) || null;
  }

  /* Explicit semantic placement for pages that literally say the protected
     value is in the Vault. This is checked before generic scoring. */
  function explicitTarget(record){
    const id = appId();
    const fields = fieldMap(record);
    if(id === "travel-essentials"){
      if(record.type === "emergencyContact"){
        const name = normalize(fields.contactName || record.title);
        if(name){
          const exact = firstMatching(".emergency-contact-group", el => normalize(el.textContent).includes(name));
          if(exact) return exact;
        }
        return firstMatching(".quick-reference-action-card", el => /emergency contacts?/.test(headingText(el)));
      }
      if(record.type === "passport")
        return firstMatching(".quick-reference-action-card", el => /passport|identity/.test(headingText(el)));
      if(record.type === "globalEntry")
        return firstMatching(".quick-reference-action-card", el => /trusted traveler|global entry/.test(headingText(el)));
      if(record.type === "visa")
        return firstMatching(".quick-reference-action-card", el => /passport|identity|visa/.test(headingText(el)));
      if(record.type === "medical")
        return firstMatching(".quick-reference-action-card", el => /medical|policy/.test(headingText(el)));
      if(record.type === "travelInsurance"){
        const provider = normalize(fields.provider || fields.policyName || record.title);
        const providerCard = provider && firstMatching(".quick-reference-action-card", el => normalize(el.textContent).includes(provider));
        return providerCard || firstMatching(".quick-reference-action-card", el => /insurance|policy/.test(headingText(el)));
      }
      if(["flight","hotel","rail","railPass","transportation"].includes(record.type)){
        const problem = firstMatching(".problem-action", el => /transport|hotel|driver|luggage|flight|train|passport/.test(normalize(el.textContent)));
        if(problem) return problem;
      }
    }
    if(id === "travel-insurance" && ["travelInsurance","medical","emergencyContact"].includes(record.type)){
      const provider = normalize(fields.provider || fields.policyName || fields.travelerName || fields.contactName || record.title);
      if(provider){
        const exact = firstMatching(".mission-control,.protocol-card,.insurance-card", el => normalize(el.textContent).includes(provider));
        if(exact) return exact;
      }
      if(record.type === "medical") return document.getElementById("medical-pharmacy") || null;
      if(record.type === "emergencyContact") return document.getElementById("who-contact") || null;
      return document.getElementById("policy-checklist") || null;
    }
    return null;
  }

  function scoreCard(record, card){
    const text = normalize(card.innerText || card.textContent || "");
    if(!text) return 0;
    let score = 0;
    usefulTokens(record).forEach(t => { if(text.includes(t)) score += t.length >= 7 ? 3 : 2; });
    dateTokens(record).forEach(t => { if(t && text.includes(t)) score += 5; });
    const fields = fieldMap(record);
    if(fields.hotelName && text.includes(normalize(fields.hotelName))) score += 12;
    if(fields.contactName && text.includes(normalize(fields.contactName))) score += 14;
    if(fields.holderName && text.includes(normalize(fields.holderName))) score += 8;
    if(fields.flightNumber && text.includes(normalize(fields.flightNumber))) score += 10;
    if(fields.trainNumber && text.includes(normalize(fields.trainNumber))) score += 9;
    if(/vault|private documents|protected details|protected information|full private details/.test(text)) score += 2;
    return score;
  }
  function allCards(){
    const seen = new Set();
    const result = [];
    CARD_SELECTORS.forEach(sel => document.querySelectorAll(sel).forEach(el => {
      if(seen.has(el) || el.closest(".tee-protected-panel")) return;
      seen.add(el); result.push(el);
    }));
    return result;
  }
  function renderRecord(record){
    const rows = (record.fields || []).filter(f => String(f.value ?? "").trim() !== "").map(field =>
      `<div class="tee-protected-row"><span>${escapeHtml(field.label || field.key || "Detail")}</span><strong>${escapeHtml(field.value)}</strong></div>`
    ).join("");
    return `<section class="tee-protected-record" data-record-id="${escapeHtml(record.recordId)}">
      <div class="tee-protected-record-head"><strong>${escapeHtml(record.typeLabel || record.type || "Protected record")}</strong><span>${escapeHtml(record.accessScope || "protected")}</span></div>
      <h4>${escapeHtml(record.title || record.typeLabel || "Protected details")}</h4>
      ${rows || '<p class="tee-protected-empty">No display fields in this authorized record.</p>'}
    </section>`;
  }
  function style(){
    if(document.getElementById("teeProtectedContextStyle")) return;
    const s = document.createElement("style");
    s.id = "teeProtectedContextStyle";
    s.textContent = `
      .tee-vault-state{position:sticky;top:0;z-index:1000;display:flex;gap:10px;align-items:center;justify-content:space-between;padding:10px 14px;margin:0;background:#f4f7f7;border-bottom:1px solid #b8c9cc;font:600 15px/1.35 system-ui,-apple-system,Segoe UI,sans-serif}
      .tee-vault-state.open{background:#e8f4ee;border-bottom-color:#8fb9a3}.tee-vault-state.locked{background:#fff6df;border-bottom-color:#e4c675}
      .tee-vault-state .tee-vault-actions{display:flex;gap:8px;flex-wrap:wrap}.tee-vault-state a,.tee-vault-state button{border:0;border-radius:9px;padding:8px 12px;font-weight:800;cursor:pointer;background:#123f46;color:white;text-decoration:none}
      .tee-protected-panel{margin:12px 0;padding:13px;border:2px solid #2e6870;border-radius:14px;background:#f5fbfa;box-shadow:0 2px 8px rgba(0,0,0,.05)}
      .tee-protected-panel>h3{margin:0 0 6px}.tee-protected-panel>.tee-protected-note{margin:0 0 10px;color:#36565b}
      .tee-protected-record{margin:9px 0;padding:11px;border:1px solid #b8d0d3;border-radius:12px;background:white}.tee-protected-record h4{margin:6px 0 9px}
      .tee-protected-record-head{display:flex;justify-content:space-between;gap:8px;font-size:.85rem;color:#46656a}.tee-protected-record-head span{font-weight:700}
      .tee-protected-row{display:grid;grid-template-columns:minmax(120px,34%) 1fr;gap:10px;padding:6px 0;border-top:1px solid #edf1f1}.tee-protected-row span{color:#52696d}.tee-protected-row strong{overflow-wrap:anywhere}
      .tee-protected-unmatched{margin:22px 0}.tee-protected-empty{color:#667}
      @media(max-width:650px){.tee-protected-row{grid-template-columns:1fr}.tee-vault-state{align-items:flex-start;flex-direction:column}}
      @media print{.tee-vault-state{position:static}.tee-vault-state button,.tee-vault-state a{display:none}}
    `;
    document.head.appendChild(s);
  }
  function clearInjected(){
    document.querySelectorAll(".tee-protected-panel,.tee-vault-state").forEach(el => el.remove());
  }
  function addStateBar(session){
    const bar = document.createElement("div");
    bar.className = `tee-vault-state ${session ? "open" : "locked"}`;
    if(session){
      const mins = Math.max(1, Math.ceil((Number(session.expiresAt) - Date.now()) / 60000));
      bar.innerHTML = `<div>🔓 <strong>Secure Vault open</strong> — protected details are visible for ${escapeHtml(session.profileLabel || "authorized traveler")} · about ${mins} min remaining.</div><div class="tee-vault-actions"><button type="button" data-tee-lock>Lock Vault</button></div>`;
      bar.querySelector("[data-tee-lock]")?.addEventListener("click", () => window.TEEVaultSession?.clear("manual"));
    } else {
      bar.innerHTML = `<div>🔒 <strong>Secure Vault locked</strong> — protected details are hidden.</div><div class="tee-vault-actions"><a href="${escapeHtml(vaultUrl)}">Unlock Vault</a></div>`;
    }
    document.body.prepend(bar);
  }
  function addRecordTo(target, record){
    let panel = target.querySelector(":scope > .tee-protected-panel");
    if(!panel){
      panel = document.createElement("section");
      panel.className = "tee-protected-panel";
      panel.innerHTML = `<h3>🔓 Protected details</h3><p class="tee-protected-note">Visible only while the Secure Vault authorization is open.</p><div class="tee-protected-records"></div>`;
      target.appendChild(panel);
    }
    panel.querySelector(".tee-protected-records")?.insertAdjacentHTML("beforeend", renderRecord(record));
  }

  function render(){
    if(rendering) return;
    rendering = true;
    try{
      clearInjected(); style();
      const session = window.TEEVaultSession?.get?.() || null;
      addStateBar(session);
      if(!session) return;
      const allowed = new Set(APP_RULES[appId()] || []);
      if(!allowed.size) return;
      const records = (session.records || []).filter(r => allowed.has(r.type));
      if(!records.length) return;
      const cards = allCards();
      const matched = new Set();
      records.forEach(record => {
        const explicit = explicitTarget(record);
        if(explicit){ addRecordTo(explicit, record); matched.add(record.recordId); return; }
        let best = null, bestScore = 0;
        cards.forEach(card => {
          const score = scoreCard(record, card);
          if(score > bestScore){ bestScore = score; best = card; }
        });
        const threshold = ["passport","globalEntry","visa","travelInsurance","medical","emergencyContact","railPass","creditCard"].includes(record.type) ? 3 : 5;
        if(best && bestScore >= threshold){ addRecordTo(best, record); matched.add(record.recordId); }
      });
      const remaining = records.filter(r => !matched.has(r.recordId));
      if(remaining.length){
        const host = document.querySelector("main") || document.body;
        const panel = document.createElement("section");
        panel.className = "tee-protected-panel tee-protected-unmatched";
        panel.innerHTML = `<h3>🔓 Other protected details for this section</h3><p class="tee-protected-note">These authorized records belong to this app but could not be matched safely to a single visible card.</p><div class="tee-protected-records">${remaining.map(renderRecord).join("")}</div>`;
        host.appendChild(panel);
      }
    } finally { rendering = false; }
  }
  function ensureSessionApi(){
    if(window.TEEVaultSession){ render(); return; }
    const script = document.createElement("script");
    script.src = vaultSessionUrl;
    script.onload = render;
    script.onerror = () => { clearInjected(); style(); addStateBar(null); };
    document.head.appendChild(script);
  }
  const rerenderSoon = (() => {
    let timer = null;
    return () => { clearTimeout(timer); timer = setTimeout(render, 180); };
  })();
  window.addEventListener("tee-vault-session-changed", rerenderSoon);
  window.addEventListener("pageshow", rerenderSoon);
  document.addEventListener("visibilitychange", () => { if(!document.hidden) rerenderSoon(); });
  const observer = new MutationObserver(mutations => {
    if(rendering) return;
    const externalChange = mutations.some(m => [...m.addedNodes].some(n => {
      if(n.nodeType !== 1) return false;
      const el = n;
      return !el.matches?.(".tee-protected-panel,.tee-vault-state,.tee-protected-panel *") && !el.closest?.(".tee-protected-panel,.tee-vault-state");
    }));
    if(externalChange) rerenderSoon();
  });
  window.addEventListener("DOMContentLoaded", () => {
    ensureSessionApi();
    observer.observe(document.body, {childList:true, subtree:true});
  });
})();
