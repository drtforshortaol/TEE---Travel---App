"use strict";

const PUBLIC_EXPENSE_KEY = "teeCostsPublicExpensesV1";
const SHARED_TOMBSTONE_KEY = "teeCostsSharedExpenseTombstonesV1";
const BEACON_URL_KEY = "teeCostsSharedBeaconUrlV1";
const LAST_IMPORTED_PACKAGE_KEY = "teeCostsLastImportedSharedPackageV1";
const EXCHANGE_SCHEMA = "tee-shared-expense-exchange-v1";
const BEACON_SCHEMA = "tee-shared-expense-beacon-v1";
const DEFAULT_BEACON_URL = "../../shared-expense-beacon.json";
const MAX_PDF_BYTES = 700 * 1024;
const MAX_IMAGE_DIMENSION = 1400;
const JPEG_QUALITY = 0.72;
let pendingAttachment = null;
let protectedViewUnlocked = false;
let editingRecord = null;

const $ = id => document.getElementById(id);
const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));

function loadStoredVaultIntoMemory() {
  const saved = loadVault();
  if (saved?.id) restoreVault(saved);
  else resetVaultState();
}
loadStoredVaultIntoMemory();

function loadPublicExpenses() {
  try { const parsed = JSON.parse(localStorage.getItem(PUBLIC_EXPENSE_KEY) || "[]"); return Array.isArray(parsed) ? parsed : []; }
  catch { return []; }
}
function savePublicExpenses(items) { localStorage.setItem(PUBLIC_EXPENSE_KEY, JSON.stringify(items)); }
function setStatus(id, text, kind="") { const el=$(id); if(!el)return; el.textContent=text; el.className=`status-text ${kind}`.trim(); }
function selectedAccess() { return document.querySelector('input[name="expenseAccess"]:checked')?.value || "shared"; }
function updateAuthVisibility() {
  const protectedSave = selectedAccess() !== "public";
  const alreadyUnlocked = protectedViewUnlocked && getVaultState() === "unlocked";
  $("saveAuthArea").hidden = !protectedSave || alreadyUnlocked;
}
document.querySelectorAll('input[name="expenseAccess"]').forEach(r=>r.addEventListener('change',updateAuthVisibility));
updateAuthVisibility();

function todayIso(){ return new Date().toISOString().slice(0,10); }
$("expenseDate").value=todayIso();

function fileToDataUrl(file){ return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);}); }
function imageFromFile(file){ return new Promise((resolve,reject)=>{const url=URL.createObjectURL(file);const img=new Image();img.onload=()=>{URL.revokeObjectURL(url);resolve(img);};img.onerror=e=>{URL.revokeObjectURL(url);reject(e);};img.src=url;}); }
async function prepareAttachment(file){
  if(!file)return null;
  if(file.type.startsWith("image/")){
    const img=await imageFromFile(file); let w=img.naturalWidth,h=img.naturalHeight;
    const scale=Math.min(1,MAX_IMAGE_DIMENSION/Math.max(w,h)); w=Math.max(1,Math.round(w*scale)); h=Math.max(1,Math.round(h*scale));
    const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;canvas.getContext("2d").drawImage(img,0,0,w,h);
    const dataUrl=canvas.toDataURL("image/jpeg",JPEG_QUALITY);
    return {name:file.name||"receipt.jpg",type:"image/jpeg",dataUrl,sizeApprox:Math.round(dataUrl.length*0.75),width:w,height:h};
  }
  if(file.type==="application/pdf"){
    if(file.size>MAX_PDF_BYTES)throw new Error("PDF is larger than 700 KB. Save a smaller PDF or photograph the receipt instead.");
    return {name:file.name||"receipt.pdf",type:file.type,dataUrl:await fileToDataUrl(file),sizeApprox:file.size};
  }
  throw new Error("Choose a photo or PDF.");
}
function renderSourcePreview(){
  const host=$("sourcePreview");
  if(!pendingAttachment){host.hidden=true;host.innerHTML="";return;}
  host.hidden=false;
  const preview=pendingAttachment.type.startsWith("image/")?`<img src="${pendingAttachment.dataUrl}" alt="Receipt preview" />`:`<div class="pdf-chip">📄 ${esc(pendingAttachment.name)}</div>`;
  host.innerHTML=`${preview}<div><strong>${esc(pendingAttachment.name)}</strong><br><small>Stored locally with this expense · approx. ${Math.max(1,Math.round(pendingAttachment.sizeApprox/1024))} KB</small><br><button id="removeAttachmentBtn" type="button" class="link-btn">Remove attachment</button></div>`;
  $("removeAttachmentBtn").addEventListener("click",()=>{pendingAttachment=null;renderSourcePreview();});
}
async function handleFile(file){
  setStatus("saveStatus","Preparing receipt…");
  try{pendingAttachment=await prepareAttachment(file);renderSourcePreview();setStatus("saveStatus","Receipt ready.","success");}
  catch(e){pendingAttachment=null;renderSourcePreview();setStatus("saveStatus",e.message||"Unable to prepare file.","error");}
}
$("cameraBtn").addEventListener("click",()=>$("cameraInput").click());
$("fileBtn").addEventListener("click",()=>$("fileInput").click());
$("cameraInput").addEventListener("change",e=>handleFile(e.target.files?.[0]));
$("fileInput").addEventListener("change",e=>handleFile(e.target.files?.[0]));

$("toggleCaptureBtn").addEventListener("click",()=>{const b=$("captureBody");b.hidden=!b.hidden;$("toggleCaptureBtn").textContent=b.hidden?"Open Capture":"Close Capture";});
$("typeBtn").addEventListener("click",()=>{$("rawNote").focus();});
$("pasteBtn").addEventListener("click",async()=>{
  $("rawNote").focus();
  try{if(navigator.clipboard?.readText){const text=await navigator.clipboard.readText();if(text){$("rawNote").value=text;parseRawNote();setStatus("saveStatus","Pasted from clipboard and prefilled what TEE could recognize.","success");return;}}}
  catch{}
  setStatus("saveStatus","Paste your copied Apple Notes text into the note box, then tap Use Note to Prefill.");
});

function parseRawNote(){
  const text=$("rawNote").value.trim(); if(!text)return;
  const currMatch=text.match(/\b(USD|EUR|CHF|TRY|HRK)\s*\$?\s*([0-9]+(?:[.,][0-9]{1,2})?)|\$\s*([0-9]+(?:[.,][0-9]{1,2})?)/i);
  if(currMatch){if(currMatch[1])$("expenseCurrency").value=currMatch[1].toUpperCase();$("expenseAmount").value=(currMatch[2]||currMatch[3]||"").replace(",", ".");}
  const dateMatch=text.match(/\b(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?\b/);
  if(dateMatch){let y=dateMatch[3]?Number(dateMatch[3]):new Date().getFullYear();if(y<100)y+=2000;const m=String(dateMatch[1]).padStart(2,"0"),d=String(dateMatch[2]).padStart(2,"0");$("expenseDate").value=`${y}-${m}-${d}`;}
  const lower=text.toLowerCase();
  if(/dinner|lunch|breakfast|restaurant|cafe|coffee|meal/.test(lower))$("expenseCategory").value="Meals";
  else if(/taxi|uber|train|tram|bus|metro|transport/.test(lower))$("expenseCategory").value="Transportation";
  else if(/hotel|lodging|room/.test(lower))$("expenseCategory").value="Lodging";
  else if(/tip|gratuity/.test(lower))$("expenseCategory").value="Tips";
  else if(/museum|tour|ticket|activity/.test(lower))$("expenseCategory").value="Activities";
  if(/\bshared\b|split|both couples/.test(lower))document.querySelector('input[name="expenseAccess"][value="shared"]').checked=true;
  if(/\bprivate\b/.test(lower))document.querySelector('input[name="expenseAccess"][value="private"]').checked=true;
  if(/\btest\b/.test(lower))$("expenseIsTest").checked=true;
  if(/paid by couple b/i.test(text))$("expensePaidBy").value="Couple B"; else if(/paid by couple a/i.test(text))$("expensePaidBy").value="Couple A";
  if(!$("expenseMerchant").value)$("expenseMerchant").value=text.split(/[-–—]/)[0].trim().slice(0,80);
  if(!$("expenseNotes").value)$("expenseNotes").value=text;
  updateAuthVisibility();
}
$("parseNoteBtn").addEventListener("click",parseRawNote);

function resetForm(){
  editingRecord=null;
  $("rawNote").value="";$("expenseDate").value=todayIso();$("expenseCity").value="";$("expenseCategory").value="Meals";$("expenseMerchant").value="";$("expenseAmount").value="";$("expenseCurrency").value="USD";$("expensePaidBy").value="Couple A";$("expenseSplit").value="no";$("expenseNotes").value="";$("expenseIsTest").checked=false;$("savePassphrase").value="";document.querySelector('input[name="expenseAccess"][value="shared"]').checked=true;pendingAttachment=null;renderSourcePreview();
  $("editBanner").hidden=true;$("editBannerText").textContent="";$("saveExpenseBtn").textContent="Save Expense";updateAuthVisibility();
}
$("clearFormBtn").addEventListener("click",()=>{resetForm();setStatus("saveStatus","");});
$("cancelEditBtn").addEventListener("click",()=>{resetForm();setStatus("saveStatus","Edit cancelled.");});

function expenseFromForm(access, existing=null){
  const amount=Number($("expenseAmount").value||0);
  if(!$("expenseMerchant").value.trim() && !$("rawNote").value.trim())throw new Error("Add a description or note.");
  if(!(amount>=0))throw new Error("Enter a valid amount.");
  const now=new Date().toISOString();
  const isTest=$("expenseIsTest").checked;
  const base=existing ? structuredClone(existing) : {};
  const history=Array.isArray(base.history)?base.history:[];
  history.push({timestamp:now,action:existing?"Edited":"Created",note:existing?"Edited in TEE Costs v3.3.46":"Captured in TEE Costs v3.3.46"});
  return {
    ...base,
    recordId:existing?.recordId||generateUUID(),type:"expense",createdAt:existing?.createdAt||now,lastModifiedAt:now,recordVersion:Number(existing?.recordVersion||0)+1,ownerVaultId:existing?.ownerVaultId||getVault().id||"local-public",
    accessScope:access==="private"?"private":"shared",visibilityClass:access,recordStatus:"active",favorite:Boolean(existing?.favorite),
    tags:["costs","expense",$("expenseCategory").value.toLowerCase(),...(isTest?["test"]:[])],relationships:Array.isArray(existing?.relationships)?existing.relationships:[],history,
    fields:{...(existing?.fields||{}),date:$("expenseDate").value,city:$("expenseCity").value.trim(),category:$("expenseCategory").value,merchant:$("expenseMerchant").value.trim()||$("rawNote").value.trim().slice(0,80),amount,currency:$("expenseCurrency").value,paidBy:$("expensePaidBy").value,split:$("expenseSplit").value,notes:$("expenseNotes").value.trim(),rawNote:$("rawNote").value.trim(),isTest,attachment:pendingAttachment?{...pendingAttachment}:null}
  };
}
function isTestExpense(r){return Boolean(r?.fields?.isTest || r?.tags?.includes?.("test"));}

async function unlockForProtectedWrite(passphrase){
  if(protectedViewUnlocked && getVaultState()==="unlocked")return true;
  const saved=loadVault(); if(!saved?.id)throw new Error("No Secure Vault exists on this device yet. Create/restore the vault first.");
  restoreVault(saved);
  const ok=await unlockVault(passphrase); if(!ok)throw new Error("Passphrase did not unlock either couple's vault.");
  protectedViewUnlocked=true;
  startAutoLock(()=>{protectedViewUnlocked=false;lockVault();setStatus("viewStatus","Protected expense view locked.");renderExpenses();});
  setStatus("viewStatus",`Unlocked as ${getActiveProfileLabel()} for up to 30 minutes.`,"success");
  return true;
}
async function persistActiveVault(){
  const persisted=await persistTwoCoupleActiveData(); if(!persisted)throw new Error("Unable to encrypt the expense into the vault.");
  if(!saveVault({...getVault(),state:"locked"}))throw new Error("Browser storage could not save the encrypted vault.");
}
function removePublicRecord(id){savePublicExpenses(loadPublicExpenses().filter(r=>r.recordId!==id));}
function upsertPublicRecord(record){const items=loadPublicExpenses();const i=items.findIndex(r=>r.recordId===record.recordId);if(i>=0)items[i]=record;else items.unshift(record);savePublicExpenses(items);}
function removeActiveProtectedRecord(id){const data=getActiveVaultData();if(!data?.records)return false;const i=data.records.findIndex(r=>r.recordId===id);if(i<0)return false;data.records.splice(i,1);return true;}
function upsertActiveProtectedRecord(record){const data=getActiveVaultData();if(!data?.records)throw new Error("Vault data could not be opened.");const i=data.records.findIndex(r=>r.recordId===record.recordId);if(i>=0)data.records[i]=record;else data.records.push(record);}

$("saveExpenseBtn").addEventListener("click",async()=>{
  setStatus("saveStatus",editingRecord?"Updating…":"Saving…");
  let protectedSnapshot=null;
  try{
    const newAccess=selectedAccess();
    const old=editingRecord;
    const oldAccess=old?.visibilityClass||null;
    const record=expenseFromForm(newAccess,old);
    const needsProtected = newAccess!=="public" || (old && oldAccess!=="public");
    if(needsProtected){
      const pass=$("savePassphrase").value;
      await unlockForProtectedWrite(pass);
      protectedSnapshot=structuredClone(getActiveVaultData()?.records||[]);
    }

    if(needsProtected){
      if(old && oldAccess!=="public"){
        if(oldAccess==="shared" && newAccess!=="shared") addSharedTombstone(old);
        removeActiveProtectedRecord(old.recordId);
      }
      if(newAccess!=="public"){
        record.ownerVaultId=getVault().id;
        record.accessScope=newAccess==="private"?"private":"shared";
        if(newAccess==="private")record.fields.ownerCouple=getActiveProfileLabel(); else delete record.fields.ownerCouple;
        upsertActiveProtectedRecord(record);
      }
      await persistActiveVault();
    }

    if(old && oldAccess==="public")removePublicRecord(old.recordId);
    if(newAccess==="public"){
      record.ownerVaultId="local-public"; delete record.fields.ownerCouple; upsertPublicRecord(record);
    }

    setStatus("saveStatus",editingRecord?"✓ Expense updated in TEE.":"✓ Saved in TEE on this device.","success");
    resetForm(); await renderExpenses();
  } catch(e){
    if(protectedSnapshot && getActiveVaultData()?.records){
      getActiveVaultData().records.splice(0,getActiveVaultData().records.length,...protectedSnapshot);
    }
    console.error(e);setStatus("saveStatus",e.message||"Unable to save expense.","error");
  }
});

function visibleProtectedExpenses(){
  if(!protectedViewUnlocked||getVaultState()!=="unlocked")return[];
  return (getActiveVaultData()?.records||[]).filter(r=>r.type==="expense");
}
function allVisibleExpenses(){return [...loadPublicExpenses(),...visibleProtectedExpenses()];}
function money(value,currency){try{return new Intl.NumberFormat(undefined,{style:"currency",currency:currency||"USD"}).format(Number(value||0));}catch{return`${currency||""} ${Number(value||0).toFixed(2)}`;}}
function attachmentHtml(a){if(!a)return"";if(a.type?.startsWith("image/"))return`<details class="receipt"><summary>View receipt image</summary><img src="${a.dataUrl}" alt="Receipt" /></details>`;if(a.type==="application/pdf")return`<a class="receipt-link" href="${a.dataUrl}" target="_blank" rel="noopener">📄 Open receipt PDF</a>`;return"";}

function beginEditExpense(record){
  if(record.visibilityClass!=="public" && (!protectedViewUnlocked||getVaultState()!=="unlocked")){alert("Unlock protected expenses before editing this record.");return;}
  const f=record.fields||{};editingRecord=structuredClone(record);
  $("rawNote").value=f.rawNote||"";$("expenseDate").value=f.date||todayIso();$("expenseCity").value=f.city||"";$("expenseCategory").value=f.category||"Other";$("expenseMerchant").value=f.merchant||"";$("expenseAmount").value=f.amount??"";$("expenseCurrency").value=f.currency||"USD";$("expensePaidBy").value=f.paidBy||"Couple A";$("expenseSplit").value=f.split||"no";$("expenseNotes").value=f.notes||"";$("expenseIsTest").checked=isTestExpense(record);pendingAttachment=f.attachment?structuredClone(f.attachment):null;renderSourcePreview();
  document.querySelector(`input[name="expenseAccess"][value="${record.visibilityClass||"shared"}"]`).checked=true;
  $("editBanner").hidden=false;$("editBannerText").textContent=f.merchant||"Expense";$("saveExpenseBtn").textContent="Update Expense";$("captureBody").hidden=false;$("toggleCaptureBtn").textContent="Close Capture";updateAuthVisibility();
  $("captureTitle").scrollIntoView({behavior:"smooth",block:"start"});setStatus("saveStatus","Editing saved expense. Make changes, then tap Update Expense.");
}

function loadSharedTombstones(){
  try{const v=JSON.parse(localStorage.getItem(SHARED_TOMBSTONE_KEY)||"[]");return Array.isArray(v)?v:[];}catch{return[];}
}
function saveSharedTombstones(items){localStorage.setItem(SHARED_TOMBSTONE_KEY,JSON.stringify(items));}
function addSharedTombstone(record){
  if(record?.visibilityClass!=="shared")return;
  const items=loadSharedTombstones().filter(x=>x.recordId!==record.recordId);
  items.push({recordId:record.recordId,deletedAt:new Date().toISOString(),lastKnownModifiedAt:record.lastModifiedAt||record.createdAt||null});
  saveSharedTombstones(items.slice(-500));
}

async function deleteExpense(record){
  if(record.visibilityClass==="public"){removePublicRecord(record.recordId);await renderExpenses();return;}
  if(!protectedViewUnlocked||getVaultState()!=="unlocked")throw new Error("Unlock protected expenses before deleting this record.");
  addSharedTombstone(record);
  if(!removeActiveProtectedRecord(record.recordId))return;
  await persistActiveVault();
  await renderExpenses();
}

function filteredVisibleExpenses(){
  const query=$("searchInput").value.trim().toLowerCase(),af=$("accessFilter").value,cf=$("categoryFilter").value,tf=$("testFilter").value;
  return allVisibleExpenses().filter(r=>{
    const f=r.fields||{};const hay=[f.merchant,f.city,f.notes,f.rawNote,f.category,f.paidBy].join(" ").toLowerCase();const test=isTestExpense(r);
    return(!query||hay.includes(query))&&(af==="all"||r.visibilityClass===af)&&(cf==="all"||f.category===cf)&&(tf==="all"||(tf==="test"&&test)||(tf==="real"&&!test));
  }).sort((a,b)=>String(b.fields?.date||b.createdAt).localeCompare(String(a.fields?.date||a.createdAt)));
}

async function renderExpenses(){
  const host=$("expenseMount");host.innerHTML="";
  const items=filteredVisibleExpenses();
  const categories=[...new Set(allVisibleExpenses().map(r=>r.fields?.category).filter(Boolean))].sort(); const current=$("categoryFilter").value;$("categoryFilter").innerHTML='<option value="all">All categories</option>'+categories.map(c=>`<option>${esc(c)}</option>`).join("");if(categories.includes(current))$("categoryFilter").value=current;
  renderSummary(items);
  if(!items.length){host.innerHTML='<div class="empty-card">No visible expenses match this view. Public expenses are always shown. Unlock protected expenses to see Shared and this couple\'s Private records.</div>';return;}
  items.forEach(r=>{
    const f=r.fields||{};const card=document.createElement("article");card.className="cost-card";
    card.innerHTML=`<div class="card-top"><div><h3>${esc(f.merchant||"Expense")}</h3><div class="meta"><span class="pill">${esc(f.date||"")}</span><span class="pill">${esc(f.city||"")}</span><span class="pill">${esc(f.category||"")}</span><span class="pill access-${esc(r.visibilityClass)}">${esc(r.visibilityClass||"shared")}</span>${isTestExpense(r)?'<span class="pill pill-test">TEST</span>':''}</div></div><div class="expense-amount">${money(f.amount,f.currency)}</div></div><div class="detail-grid"><div><strong>Paid by</strong><br>${esc(f.paidBy||"")}</div><div><strong>Split / reimbursement</strong><br>${esc(f.split||"no")}</div></div>${f.notes?`<p>${esc(f.notes)}</p>`:""}${attachmentHtml(f.attachment)}<div class="card-actions"><button type="button" class="edit-btn" data-edit="${r.recordId}">Edit</button><button type="button" class="delete-btn" data-delete="${r.recordId}">Delete</button></div>`;
    host.appendChild(card);
    card.querySelector('[data-edit]').addEventListener('click',()=>beginEditExpense(r));
    card.querySelector('[data-delete]').addEventListener('click',async()=>{if(!confirm(`Delete ${f.merchant||"this expense"}? This cannot be undone.`))return;try{await deleteExpense(r);}catch(e){alert(e.message||"Unable to delete expense.");}});
  });
}
function renderSummary(items){
  const host=$("summaryMount");const groups={};items.forEach(r=>{const c=r.fields?.currency||"USD";groups[c]=(groups[c]||0)+Number(r.fields?.amount||0);});
  const testCount=items.filter(isTestExpense).length;
  host.innerHTML=`<div class="summary-card"><div class="num">${items.length}</div><div class="label">Visible expenses</div></div><div class="summary-card"><div class="num">${testCount}</div><div class="label">Visible tests</div></div>`+Object.entries(groups).map(([c,v])=>`<div class="summary-card"><div class="num">${money(v,c)}</div><div class="label">${esc(c)} visible total</div></div>`).join("");
}

$("deleteVisibleTestsBtn").addEventListener("click",async()=>{
  const tests=filteredVisibleExpenses().filter(isTestExpense);
  if(!tests.length){alert("There are no visible Test expenses to delete.");return;}
  const protectedTests=tests.filter(r=>r.visibilityClass!=="public");
  const publicTests=tests.filter(r=>r.visibilityClass==="public");
  if(protectedTests.length && (!protectedViewUnlocked||getVaultState()!=="unlocked")){alert("Unlock protected expenses first so TEE can safely delete the protected Test entries.");return;}
  if(!confirm(`Delete ${tests.length} visible Test expense${tests.length===1?"":"s"}? This cannot be undone.`))return;
  let snapshot=null;
  try{
    if(protectedTests.length){
      snapshot=structuredClone(getActiveVaultData()?.records||[]);
      protectedTests.forEach(r=>{addSharedTombstone(r);removeActiveProtectedRecord(r.recordId);});
      await persistActiveVault();
    }
    publicTests.forEach(r=>removePublicRecord(r.recordId));
    await renderExpenses();
  }catch(e){
    if(snapshot && getActiveVaultData()?.records)getActiveVaultData().records.splice(0,getActiveVaultData().records.length,...snapshot);
    alert(e.message||"Unable to delete Test expenses.");
  }
});

$("unlockViewBtn").addEventListener("click",()=>{$("viewAuth").hidden=!$("viewAuth").hidden;if(!$("viewAuth").hidden)$("viewPassphrase").focus();});
$("confirmUnlockBtn").addEventListener("click",async()=>{
  setStatus("viewStatus","Unlocking…");
  try{const saved=loadVault();if(!saved?.id)throw new Error("No Secure Vault is stored on this device.");restoreVault(saved);const ok=await unlockVault($("viewPassphrase").value);if(!ok)throw new Error("Passphrase is incorrect.");protectedViewUnlocked=true;startAutoLock(()=>{protectedViewUnlocked=false;lockVault();setStatus("viewStatus","Protected expense view locked.");updateAuthVisibility();renderExpenses();});setStatus("viewStatus",`Unlocked as ${getActiveProfileLabel()} for up to 30 minutes.`,"success");$("viewPassphrase").value="";updateAuthVisibility();await renderExpenses();}catch(e){protectedViewUnlocked=false;setStatus("viewStatus",e.message||"Unable to unlock.","error");}
});
$("lockViewBtn").addEventListener("click",()=>{protectedViewUnlocked=false;lockVault();setStatus("viewStatus","Locked.");updateAuthVisibility();renderExpenses();});
["searchInput","accessFilter","categoryFilter","testFilter"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",renderExpenses));

// ---- v3.3.46 Shared Expense Exchange ----
let lastExportBundle=null;
function bytesToBase64(bytes){let s="";bytes.forEach(b=>s+=String.fromCharCode(b));return btoa(s);}
function base64ToBytes(text){const s=atob(text);const out=new Uint8Array(s.length);for(let i=0;i<s.length;i++)out[i]=s.charCodeAt(i);return out;}
function randomTransferCode(){const alphabet="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";const b=new Uint8Array(16);crypto.getRandomValues(b);let out="";for(let i=0;i<b.length;i++){if(i&&i%4===0)out+="-";out+=alphabet[b[i]%alphabet.length];}return out;}
async function deriveExchangeKey(code,salt){const material=await crypto.subtle.importKey("raw",new TextEncoder().encode(code.replace(/\s+/g,"").toUpperCase()),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:180000,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);}
async function encryptExchangePayload(payload,code){const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),key=await deriveExchangeKey(code,salt),plain=new TextEncoder().encode(JSON.stringify(payload)),cipher=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv},key,plain));return{schema:EXCHANGE_SCHEMA,encryption:{algorithm:"AES-GCM",kdf:"PBKDF2-SHA256",iterations:180000,salt:bytesToBase64(salt),iv:bytesToBase64(iv)},ciphertext:bytesToBase64(cipher)};}
async function decryptExchangePackage(wrapper,code){if(wrapper?.schema!==EXCHANGE_SCHEMA)throw new Error("This is not a TEE v3.3.46 Shared Expense package.");const salt=base64ToBytes(wrapper.encryption?.salt||""),iv=base64ToBytes(wrapper.encryption?.iv||""),cipher=base64ToBytes(wrapper.ciphertext||""),key=await deriveExchangeKey(code,salt);try{const plain=await crypto.subtle.decrypt({name:"AES-GCM",iv},key,cipher);return JSON.parse(new TextDecoder().decode(plain));}catch{throw new Error("Transfer code is incorrect or the package is damaged.");}}
function downloadJsonFile(name,obj,type="application/json"){const blob=new Blob([JSON.stringify(obj,null,2)],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function sharedExpensesForExchange(includeTests=false){if(!protectedViewUnlocked||getVaultState()!=="unlocked")throw new Error("Unlock Protected Expenses first.");return (getActiveVaultData()?.records||[]).filter(r=>r.type==="expense"&&r.visibilityClass==="shared"&&(includeTests||!isTestExpense(r))).map(r=>structuredClone(r));}
function makeBeacon(payload){return{schema:BEACON_SCHEMA,packageId:payload.packageId,generatedAt:payload.generatedAt,sourceProfile:payload.sourceProfile,recordCount:payload.records.length,tombstoneCount:payload.tombstones.length,newestModifiedAt:payload.records.map(r=>r.lastModifiedAt||r.createdAt||"").sort().at(-1)||null,note:"Metadata only. No expense contents are stored in this beacon."};}
$("exportSharedBtn").addEventListener("click",async()=>{setStatus("exportStatus","Preparing encrypted package…");try{const records=sharedExpensesForExchange($("exchangeIncludeTests").checked);const code=randomTransferCode();const payload={schema:"tee-shared-expense-payload-v1",packageId:generateUUID(),generatedAt:new Date().toISOString(),sourceProfile:(typeof getActiveProfileId==="function"?getActiveProfileId():getActiveProfileLabel()),fullSnapshot:false,records,tombstones:loadSharedTombstones()};const wrapper=await encryptExchangePayload(payload,code);lastExportBundle={payload,wrapper,beacon:makeBeacon(payload)};downloadJsonFile(`TEE_Shared_Expenses_${payload.generatedAt.slice(0,10)}.tee46`,wrapper,"application/octet-stream");$("transferCode").textContent=code;$("exportResult").hidden=false;setStatus("exportStatus",`✓ Exported ${records.length} Shared expense${records.length===1?"":"s"} in an encrypted phone-to-phone package.`,"success");}catch(e){setStatus("exportStatus",e.message||"Unable to export Shared expenses.","error");}});
$("copyTransferCodeBtn").addEventListener("click",async()=>{const t=$("transferCode").textContent;try{await navigator.clipboard.writeText(t);setStatus("exportStatus","Transfer code copied.","success");}catch{prompt("Copy this transfer code:",t);}});
$("downloadBeaconBtn").addEventListener("click",()=>{if(!lastExportBundle)return;downloadJsonFile("shared-expense-beacon.json",lastExportBundle.beacon);setStatus("exportStatus","Beacon downloaded. Only this small metadata file belongs on GitHub.","success");});

function compareIncoming(local,incoming){const lv=Number(local?.recordVersion||0),iv=Number(incoming?.recordVersion||0);if(iv!==lv)return iv-lv;return String(incoming?.lastModifiedAt||"").localeCompare(String(local?.lastModifiedAt||""));}
async function mergeSharedPayload(payload){if(payload?.schema!=="tee-shared-expense-payload-v1"||!Array.isArray(payload.records))throw new Error("Package contents are not valid TEE Shared expenses.");if(!protectedViewUnlocked||getVaultState()!=="unlocked")throw new Error("Unlock Protected Expenses before importing.");const data=getActiveVaultData();if(!data?.records)throw new Error("Shared vault data is unavailable.");let added=0,updated=0,skipped=0,deleted=0;for(const incoming of payload.records){if(incoming?.type!=="expense"||incoming.visibilityClass!=="shared"){skipped++;continue;}incoming.accessScope="shared";delete incoming.fields?.ownerCouple;const i=data.records.findIndex(r=>r.recordId===incoming.recordId);if(i<0){data.records.push(structuredClone(incoming));added++;}else if(compareIncoming(data.records[i],incoming)>0){data.records[i]=structuredClone(incoming);updated++;}else skipped++;}
for(const t of (payload.tombstones||[])){const i=data.records.findIndex(r=>r.recordId===t.recordId&&r.visibilityClass==="shared");if(i>=0){const local=data.records[i],deletedAt=String(t.deletedAt||"");if(deletedAt&&deletedAt>String(local.lastModifiedAt||local.createdAt||"")){data.records.splice(i,1);deleted++;}}}
if(Array.isArray(payload.tombstones)){const merged=new Map(loadSharedTombstones().map(t=>[t.recordId,t]));for(const t of payload.tombstones){const prev=merged.get(t.recordId);if(!prev||String(t.deletedAt||"")>String(prev.deletedAt||""))merged.set(t.recordId,t);}saveSharedTombstones([...merged.values()].slice(-500));}
await persistActiveVault();localStorage.setItem(LAST_IMPORTED_PACKAGE_KEY,JSON.stringify({packageId:payload.packageId,generatedAt:payload.generatedAt,sourceProfile:payload.sourceProfile,importedAt:new Date().toISOString()}));return{added,updated,skipped,deleted};}
$("importSharedBtn").addEventListener("click",async()=>{setStatus("importStatus","Importing…");try{const file=$("exchangeFileInput").files?.[0];if(!file)throw new Error("Choose the .tee46 package first.");const code=$("exchangeCodeInput").value.trim();if(!code)throw new Error("Enter the transfer code from the sender.");const wrapper=JSON.parse(await file.text());const payload=await decryptExchangePackage(wrapper,code);const result=await mergeSharedPayload(payload);$("exchangeCodeInput").value="";setStatus("importStatus",`✓ Merge complete: ${result.added} added, ${result.updated} updated, ${result.deleted} deleted, ${result.skipped} unchanged.`,"success");await renderExpenses();await checkBeacon(false);}catch(e){setStatus("importStatus",e.message||"Unable to import package.","error");}});

function currentBeaconUrl(){return localStorage.getItem(BEACON_URL_KEY)||DEFAULT_BEACON_URL;}
$("beaconUrl").value=currentBeaconUrl();
$("beaconUrl").addEventListener("change",()=>{const v=$("beaconUrl").value.trim()||DEFAULT_BEACON_URL;localStorage.setItem(BEACON_URL_KEY,v);$("beaconUrl").value=v;});
$("resetBeaconBtn").addEventListener("click",()=>{localStorage.removeItem(BEACON_URL_KEY);$("beaconUrl").value=DEFAULT_BEACON_URL;$("beaconStatus").textContent="Default beacon restored.";$("beaconStatus").className="beacon-status";});
async function checkBeacon(showErrors=true){const host=$("beaconStatus");host.textContent="Checking…";host.className="beacon-status";try{const url=$("beaconUrl").value.trim()||DEFAULT_BEACON_URL;localStorage.setItem(BEACON_URL_KEY,url);const res=await fetch(url,{cache:"no-store"});if(!res.ok)throw new Error(`Beacon returned ${res.status}.`);const beacon=await res.json();if(beacon?.schema!==BEACON_SCHEMA)throw new Error("Beacon file is not a TEE Shared Expense beacon.");if(!beacon.packageId||beacon.packageId==="none"||!beacon.generatedAt){host.textContent="No Shared expense update has been published yet.";host.className="beacon-status current";return beacon;}const imported=JSON.parse(localStorage.getItem(LAST_IMPORTED_PACKAGE_KEY)||"null");if(imported?.packageId===beacon.packageId){host.textContent=`Up to date. Package ${String(beacon.packageId).slice(0,8)} was already imported.`;host.className="beacon-status current";}else{host.textContent=`Shared expense update available: ${beacon.recordCount||0} record${beacon.recordCount===1?"":"s"}, published ${new Date(beacon.generatedAt).toLocaleString()}. Ask the other couple for the encrypted .tee46 package.`;host.className="beacon-status update";}return beacon;}catch(e){host.textContent=showErrors?(e.message||"Unable to check beacon."):"No GitHub beacon available yet.";host.className="beacon-status";return null;}}
$("checkBeaconBtn").addEventListener("click",()=>checkBeacon(true));

renderExpenses();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));

// ---- v3.3.49 Couple-Passphrase Expense Archive ----
const EXPENSE_ARCHIVE_SCHEMA = "tee-expense-archive-v1";
const EXPENSE_ARCHIVE_WRAPPER_SCHEMA = "tee-expense-archive-encrypted-v1";
const EXPENSE_ARCHIVE_SNAPSHOT_KEY = "teeTripExpenseArchiveSnapshotsV1";

function reportItems(){
  const from=$("reportFrom")?.value||"",to=$("reportTo")?.value||"",access=$("reportAccess")?.value||"all",includeTests=Boolean($("reportIncludeTests")?.checked);
  return allVisibleExpenses().filter(r=>{
    const d=String(r.fields?.date||"");
    return(!from||!d||d>=from)&&(!to||!d||d<=to)&&(access==="all"||r.visibilityClass===access)&&(includeTests||!isTestExpense(r));
  }).sort((a,b)=>String(a.fields?.date||a.createdAt||"").localeCompare(String(b.fields?.date||b.createdAt||"")));
}
function reportTotals(items,key){
  const out={};items.forEach(r=>{const k=String(key(r)||"Unspecified"),c=r.fields?.currency||"USD",bucket=`${k}|||${c}`;out[bucket]=(out[bucket]||0)+Number(r.fields?.amount||0);});return out;
}
function totalsByCurrency(items){const out={};items.forEach(r=>{const c=r.fields?.currency||"USD";out[c]=(out[c]||0)+Number(r.fields?.amount||0);});return out;}
function groupedListHtml(groups){
  const entries=Object.entries(groups).sort(([a],[b])=>a.localeCompare(b));
  return entries.length?`<ul>${entries.map(([k,v])=>{const [label,currency]=k.split("|||");return`<li><strong>${esc(label)}</strong>: ${money(v,currency)}</li>`;}).join("")}</ul>`:'<p class="report-note">No items.</p>';
}
function renderExpenseReport(){
  const items=reportItems(),totals=totalsByCurrency(items),shared=items.filter(r=>r.visibilityClass==="shared").length,priv=items.filter(r=>r.visibilityClass==="private").length,pub=items.filter(r=>r.visibilityClass==="public").length,receipts=items.filter(r=>r.fields?.attachment).length;
  $("reportSummaryMount").innerHTML=`<div class="summary-card"><div class="num">${items.length}</div><div class="label">Report expenses</div></div><div class="summary-card"><div class="num">${receipts}</div><div class="label">Receipts / files</div></div><div class="summary-card"><div class="num">${shared}</div><div class="label">Shared</div></div><div class="summary-card"><div class="num">${priv}</div><div class="label">Private visible</div></div>`+Object.entries(totals).map(([c,v])=>`<div class="summary-card"><div class="num">${money(v,c)}</div><div class="label">${esc(c)} total</div></div>`).join("");
  $("reportBreakdownMount").innerHTML=items.length?`<article class="report-breakdown-card"><h3>By category</h3>${groupedListHtml(reportTotals(items,r=>r.fields?.category))}</article><article class="report-breakdown-card"><h3>By payer</h3>${groupedListHtml(reportTotals(items,r=>r.fields?.paidBy))}</article><article class="report-breakdown-card"><h3>Access included</h3><ul><li>Public: ${pub}</li><li>Shared: ${shared}</li><li>Private: ${priv}</li></ul><p class="report-note">Private means only the currently authorized couple's visible Private records.</p></article>`:'<div class="report-empty">No expenses match the report filters.</div>';
  return items;
}
function csvCell(v){const s=String(v??"");return /[",\n\r]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
function downloadTextFile(name,text,type="text/plain;charset=utf-8") {const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
function expenseCsv(items){
  const rows=[["Date","City","Category","Merchant / Description","Amount","Currency","Paid By","Split / Reimbursement","Access","Test","Notes","Receipt/File","Record ID","Last Modified"]];
  items.forEach(r=>{const f=r.fields||{};rows.push([f.date,f.city,f.category,f.merchant,Number(f.amount||0).toFixed(2),f.currency,f.paidBy,f.split,r.visibilityClass,isTestExpense(r)?"Yes":"No",f.notes,f.attachment?.name||"",r.recordId,r.lastModifiedAt||r.createdAt||""]);});
  return rows.map(row=>row.map(csvCell).join(",")).join("\r\n");
}
function reportHtml(items,{receiptMode=false}={}){
  const totals=totalsByCurrency(items),generated=new Date().toLocaleString(),profile=protectedViewUnlocked&&getVaultState()==="unlocked"?getActiveProfileLabel():"Public-only / locked view";
  const rows=items.map(r=>{const f=r.fields||{},a=f.attachment;let receipt="";if(receiptMode&&a){if(a.type?.startsWith("image/"))receipt=`<div class="receipt"><img src="${a.dataUrl}" alt="Receipt for ${esc(f.merchant||'expense')}"></div>`;else if(a.type==="application/pdf")receipt=`<p><a href="${a.dataUrl}">Open attached PDF: ${esc(a.name||'receipt.pdf')}</a></p>`;}return`<article><h2>${esc(f.merchant||"Expense")} <span>${esc(f.currency||"")} ${Number(f.amount||0).toFixed(2)}</span></h2><p class="meta">${esc(f.date||"")} · ${esc(f.city||"")} · ${esc(f.category||"")} · ${esc(r.visibilityClass||"")}</p><dl><dt>Paid by</dt><dd>${esc(f.paidBy||"")}</dd><dt>Split / reimbursement</dt><dd>${esc(f.split||"")}</dd>${f.notes?`<dt>Notes</dt><dd>${esc(f.notes)}</dd>`:""}${a?`<dt>Source</dt><dd>${esc(a.name||"Receipt attachment")}</dd>`:""}</dl>${receipt}</article>`;}).join("");
  return`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TEE Expense Report</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;max-width:900px;margin:auto;padding:24px;color:#243027}header{border-bottom:2px solid #173b3f;margin-bottom:20px}h1,h2{color:#173b3f}header p,.meta{color:#657069}.totals{display:flex;gap:10px;flex-wrap:wrap}.total{border:1px solid #ccc;border-radius:10px;padding:10px 12px}article{break-inside:avoid;border-bottom:1px solid #ddd;padding:14px 0}article h2{display:flex;justify-content:space-between;gap:12px;font-size:1.08rem}dl{display:grid;grid-template-columns:max-content 1fr;gap:4px 12px}dt{font-weight:700}.receipt img{max-width:100%;max-height:650px;object-fit:contain;border:1px solid #ddd}@media print{body{padding:0}.no-print{display:none}}</style></head><body><header><h1>TEE Trip Expense Report</h1><p>Generated ${esc(generated)} · Authorized view: ${esc(profile)} · ${items.length} expense${items.length===1?"":"s"}</p><div class="totals">${Object.entries(totals).map(([c,v])=>`<div class="total"><strong>${esc(c)}</strong> ${money(v,c)}</div>`).join("")}</div></header>${rows||"<p>No matching expenses.</p>"}<footer><p>Generated locally by TEE. Access classifications remain meaningful after export; store this report according to the most sensitive information it contains.</p></footer></body></html>`;
}
async function deriveArchiveKey(password,salt){const material=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:220000,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);}
async function encryptExpenseArchive(payload,password){const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),key=await deriveArchiveKey(password,salt),plain=new TextEncoder().encode(JSON.stringify(payload)),cipher=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv},key,plain));return{schema:EXPENSE_ARCHIVE_WRAPPER_SCHEMA,encryption:{algorithm:"AES-GCM",kdf:"PBKDF2-SHA256",iterations:220000,salt:bytesToBase64(salt),iv:bytesToBase64(iv)},ciphertext:bytesToBase64(cipher),createdAt:new Date().toISOString()};}
function reportFilterDescription(){return{from:$("reportFrom").value||null,to:$("reportTo").value||null,access:$("reportAccess").value,includeTests:Boolean($("reportIncludeTests").checked)};}

$("refreshReportBtn")?.addEventListener("click",()=>{const items=renderExpenseReport();setStatus("reportStatus",`Report refreshed with ${items.length} expense${items.length===1?"":"s"}.`,`success`);});
["reportFrom","reportTo","reportAccess","reportIncludeTests"].forEach(id=>$(id)?.addEventListener("change",renderExpenseReport));
$("exportCsvBtn")?.addEventListener("click",()=>{const items=renderExpenseReport();if(!items.length)return setStatus("reportStatus","No expenses match this report.","error");downloadTextFile(`TEE_Expense_Ledger_${todayIso()}.csv`,expenseCsv(items),"text/csv;charset=utf-8");setStatus("reportStatus",`✓ CSV exported with ${items.length} expense${items.length===1?"":"s"}.`,`success`);});
$("printReportBtn")?.addEventListener("click",()=>{const items=renderExpenseReport();if(!items.length)return setStatus("reportStatus","No expenses match this report.","error");const w=window.open("","_blank");if(!w)return setStatus("reportStatus","Your browser blocked the print window. Allow pop-ups and try again.","error");w.document.open();w.document.write(reportHtml(items,{receiptMode:false}));w.document.close();setTimeout(()=>{w.focus();w.print();},400);setStatus("reportStatus","Print view opened. On iPhone, use Print/Share to save a PDF.","success");});
$("downloadReceiptReportBtn")?.addEventListener("click",()=>{const items=renderExpenseReport();if(!items.length)return setStatus("reportStatus","No expenses match this report.","error");downloadTextFile(`TEE_Expense_Receipt_Report_${todayIso()}.html`,reportHtml(items,{receiptMode:true}),"text/html;charset=utf-8");setStatus("reportStatus","✓ Receipt report downloaded. It may contain protected information; store it privately.","success");});
$("downloadEncryptedArchiveBtn")?.addEventListener("click",async()=>{try{
  const items=renderExpenseReport();
  if(!items.length)throw new Error("No expenses match this report.");
  if(!protectedViewUnlocked||getVaultState()!=="unlocked")throw new Error("Unlock Protected Expenses as the couple creating this archive first.");
  const passphrase=$("archiveCouplePassphrase").value;
  if(!passphrase)throw new Error("Enter the same TEE couple passphrase used to unlock this couple's vault.");
  const profile=getActiveAccessProfile?.();
  if(!profile?.authentication)throw new Error("An active two-couple TEE profile is required to create the archive.");
  const verified=await authenticatePassphrase(passphrase,profile.authentication);
  if(!verified)throw new Error(`That is not the TEE passphrase for ${getActiveProfileLabel()}.`);
  const payload={schema:EXPENSE_ARCHIVE_SCHEMA,createdAt:new Date().toISOString(),authorizedProfile:getActiveProfileLabel(),filters:reportFilterDescription(),records:items.map(r=>structuredClone(r)),sharedTombstones:loadSharedTombstones()};
  setStatus("reportStatus",`Encrypting archive with ${getActiveProfileLabel()}'s TEE passphrase…`);
  const wrapper=await encryptExpenseArchive(payload,passphrase);
  wrapper.passphraseSource="tee-active-couple-passphrase";
  wrapper.authorizedProfile=getActiveProfileLabel();
  downloadJsonFile(`TEE_Expense_Archive_${todayIso()}.tee49`,wrapper,"application/octet-stream");
  $("archiveCouplePassphrase").value="";
  setStatus("reportStatus",`✓ Encrypted .tee49 archive downloaded with ${items.length} record${items.length===1?"":"s"}. It uses ${getActiveProfileLabel()}'s existing TEE passphrase.`,`success`);
}catch(e){setStatus("reportStatus",e.message||"Unable to create encrypted archive.","error");}});
$("saveArchiveSnapshotBtn")?.addEventListener("click",()=>{const items=renderExpenseReport();if(!items.length)return setStatus("reportStatus","No expenses match this report.","error");let list=[];try{list=JSON.parse(localStorage.getItem(EXPENSE_ARCHIVE_SNAPSHOT_KEY)||"[]");if(!Array.isArray(list))list=[];}catch{list=[];}const snapshot={snapshotId:generateUUID(),createdAt:new Date().toISOString(),authorizedProfile:protectedViewUnlocked&&getVaultState()==="unlocked"?getActiveProfileLabel():"public-only",count:items.length,receiptCount:items.filter(r=>r.fields?.attachment).length,totals:totalsByCurrency(items),filters:reportFilterDescription()};list.push(snapshot);localStorage.setItem(EXPENSE_ARCHIVE_SNAPSHOT_KEY,JSON.stringify(list.slice(-20)));setStatus("reportStatus","✓ Expense snapshot saved to Trip Archive on this device.","success");});
renderExpenseReport();
