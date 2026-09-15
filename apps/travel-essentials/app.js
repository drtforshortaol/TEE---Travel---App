"use strict";

let teeVaultOverlay = null;
let teeVaultOverlayTimer = null;

function openQuickReferenceSection(id, shouldScroll = true){
  if(!id) return;
  const target = document.getElementById(id);
  if(!(target instanceof HTMLDetailsElement)) return;
  target.open = true;
  if(shouldScroll) requestAnimationFrame(()=>target.scrollIntoView({behavior:"smooth", block:"start"}));
}

function loadScript(src, marker){
  return new Promise((resolve,reject)=>{
    const existing = document.querySelector(`script[${marker}]`);
    if(existing){if(existing.dataset.loaded === "1") resolve();else existing.addEventListener("load", resolve, {once:true});return;}
    const script = document.createElement("script");script.src = src;script.setAttribute(marker, "1");
    script.addEventListener("load", ()=>{ script.dataset.loaded = "1"; resolve(); }, {once:true});script.addEventListener("error", reject, {once:true});document.head.appendChild(script);
  });
}

async function ensureVaultInfrastructure(){if(!window.TEEVaultSession) await loadScript("../../vault-session.js", "data-tee-vault-session");if(!document.querySelector("script[data-tee-protected-context]")) await loadScript("../../protected-context.js", "data-tee-protected-context");}
function stopVaultOverlayWatch(){if(teeVaultOverlayTimer!==null){clearInterval(teeVaultOverlayTimer);teeVaultOverlayTimer=null;}}
function closeVaultOverlay(){stopVaultOverlayWatch();teeVaultOverlay?.remove();teeVaultOverlay=null;}
function startVaultOverlayWatch(){stopVaultOverlayWatch();teeVaultOverlayTimer=setInterval(()=>{if(!teeVaultOverlay){stopVaultOverlayWatch();return;}if(window.TEEVaultSession?.isOpen?.())closeVaultOverlay();},200);}

function cleanVaultFrame(frame){try{const doc=frame.contentDocument;if(!doc)return false;doc.documentElement.style.background="#fff";doc.body.style.margin="0";doc.body.style.background="#fff";doc.querySelector("header.hero")?.setAttribute("hidden","");doc.querySelector("footer")?.setAttribute("hidden","");doc.querySelectorAll("main > section").forEach(section=>{if(section.id!=="secureVaultPanel")section.setAttribute("hidden","");});const panel=doc.getElementById("secureVaultPanel");if(panel){panel.hidden=false;panel.style.margin="0";panel.style.border="0";panel.style.boxShadow="none";panel.style.borderRadius="0";panel.querySelectorAll('a[href*="../../index.html"],a[href*="teeReturn"],.top-actions,.secure-backup-tools').forEach(el=>el.setAttribute("hidden",""));}doc.querySelectorAll(".source-app-section-master").forEach(button=>button.setAttribute("hidden",""));const unlock=doc.getElementById("secureUnlockFields");if(unlock)unlock.hidden=false;doc.getElementById("secureUnlockPassphrase")?.focus();return Boolean(panel);}catch{return false;}}

function openVaultOverlay(vaultHref){if(teeVaultOverlay)return;const overlay=document.createElement("div");overlay.id="teeVaultOverlay";overlay.setAttribute("role","dialog");overlay.setAttribute("aria-modal","true");overlay.setAttribute("aria-label","Unlock Secure Vault");Object.assign(overlay.style,{position:"fixed",inset:"0",zIndex:"5000",background:"rgba(0,0,0,.55)",padding:"12px",display:"flex",alignItems:"center",justifyContent:"center"});const shell=document.createElement("div");Object.assign(shell.style,{width:"min(620px,100%)",maxHeight:"min(690px,92vh)",background:"#fff",borderRadius:"16px",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 18px 50px rgba(0,0,0,.35)"});const bar=document.createElement("div");Object.assign(bar.style,{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"10px",padding:"12px 14px",background:"#123f46",color:"white",font:"700 17px system-ui"});bar.innerHTML='<span>Unlock Secure Vault</span><button type="button" data-close-vault style="border:0;border-radius:9px;padding:8px 12px;font-weight:800;cursor:pointer">Cancel</button>';const loading=document.createElement("div");loading.textContent="Loading secure sign-in…";Object.assign(loading.style,{padding:"28px",textAlign:"center",font:"600 16px system-ui",color:"#36565b"});const frame=document.createElement("iframe");const url=new URL(vaultHref||"../travel-private-documents/index.html?teeView=vault&teeEnter=1",location.href);url.searchParams.set("teeView","vault");url.searchParams.set("teeEnter","1");url.searchParams.set("teeEmbed","1");url.searchParams.delete("teeReturnTo");url.searchParams.delete("teeVaultSection");frame.src=url.href;frame.title="TEE Secure Vault sign-in";Object.assign(frame.style,{border:"0",width:"100%",height:"460px",background:"white",display:"none"});frame.addEventListener("load",()=>{cleanVaultFrame(frame);setTimeout(()=>cleanVaultFrame(frame),60);setTimeout(()=>cleanVaultFrame(frame),180);loading.remove();frame.style.display="block";});shell.append(bar,loading,frame);overlay.appendChild(shell);document.body.appendChild(overlay);teeVaultOverlay=overlay;bar.querySelector("[data-close-vault]")?.addEventListener("click",closeVaultOverlay);startVaultOverlayWatch();}

function handleVaultLink(event){const link=event.target.closest?.('a[href*="travel-private-documents/index.html"]');if(!link)return;if(window.TEEVaultSession?.isOpen?.())return;event.preventDefault();openVaultOverlay(link.href);}
function removeLegacyContactControls(){document.querySelectorAll("[data-tee-contact-vault],.tee-contact-vault-actions,.tee-vault-tab-note").forEach(el=>el.remove());document.querySelectorAll(".emergency-contact-group .privacy-note").forEach(note=>{note.textContent="(protected Shared details in Vault)";});}

function addEntryRequirements(){const host=document.querySelector('.quick-reference-dropdowns');if(!host||document.getElementById('entry-requirements'))return;const details=document.createElement('details');details.id='entry-requirements';details.className='quick-reference-dropdown';details.innerHTML=`<summary><strong>Entry Requirements</strong><span>Passport validity, Türkiye visa status, Schengen rules, EES and ETIAS for this trip.</span></summary><div class="quick-reference-dropdown-body"><section class="quick-reference-action-card"><h3>Final Entry Requirements — Sep/Oct 2026</h3><p>Current traveler-facing checklist for U.S. ordinary-passport holders on this itinerary.</p><a class="quick-reference-action-button" href="entry-requirements-2026.html">Open Entry Requirements</a></section></div>`;const identity=document.getElementById('identity-travelers');if(identity)host.insertBefore(details,identity);else host.prepend(details);}

function addEurailPassHelp(){const host=document.querySelector('.quick-reference-dropdowns');if(!host||document.getElementById('eurail-pass-help'))return;const details=document.createElement('details');details.id='eurail-pass-help';details.className='quick-reference-dropdown';details.innerHTML=`<summary><strong>Rail / Eurail</strong><span>Eurail pass rules, travel-day steps, seat reservations and what to do if plans change.</span></summary><div class="quick-reference-dropdown-body"><section class="quick-reference-action-card"><h3>Eurail Pass Rules &amp; What To Do</h3><p>One-page practical summary for using the mobile Global Flex Pass during the trip.</p><a class="quick-reference-action-button" href="eurail-pass-help.html">Open Eurail Pass Help</a></section></div>`;const problem=document.getElementById('problem-solver');if(problem)host.insertBefore(details,problem);else host.appendChild(details);}

function addSetGameHelp(){const host=document.querySelector('.quick-reference-dropdowns');if(!host||document.getElementById('games-set'))return;const details=document.createElement('details');details.id='games-set';details.className='quick-reference-dropdown';details.innerHTML=`<summary><strong>Games / SET</strong><span>Offline SET card-game rules, quick-check rule, play sequence and visual examples.</span></summary><div class="quick-reference-dropdown-body"><section class="quick-reference-action-card"><h3>SET — Offline Game Guide</h3><p>Fast reference for the 4 card features, how to identify a SET, how to play, easy-start rules and visual examples.</p><a class="quick-reference-action-button" href="set-card-game.html">Open SET Instructions &amp; Examples</a></section></div>`;const problem=document.getElementById('problem-solver');if(problem)host.insertBefore(details,problem);else host.appendChild(details);}

function addEnchantingTravelsReference(){const host=document.querySelector('.quick-reference-dropdowns');if(!host||document.getElementById('enchanting-travels-country-info'))return;const details=document.createElement('details');details.id='enchanting-travels-country-info';details.className='quick-reference-dropdown';details.innerHTML=`<summary><strong>Enchanting Travels — Country Information</strong><span>Source-reference suggestions for Turkey, Croatia and Slovenia: money, tipping, phone, power and practical notes.</span></summary><div class="quick-reference-dropdown-body"><section class="quick-reference-action-card"><h3>Enchanting Travels Essential Information</h3><p>This preserves the travel company’s suggestions separately from TEE guidance developed by Glenn or ChatGPT.</p><a class="quick-reference-action-button" href="enchanting-travels-country-info.html">Open Enchanting Travels Country Reference</a></section></div>`;const problem=document.getElementById('problem-solver');if(problem)host.insertBefore(details,problem);else host.appendChild(details);}

function addEmergencySupportDetails(){
  const host=document.querySelector('#emergency-insurance .quick-reference-dropdown-body');
  if(!host||document.getElementById('tee-emergency-support-details'))return;
  const section=document.createElement('section');
  section.id='tee-emergency-support-details';
  section.className='quick-reference-action-card';
  section.innerHTML=`
    <h3>U.S. Citizen &amp; Trip Support — Verified Sep. 14, 2026</h3>
    <p><strong>Immediate danger:</strong> call <a href="tel:112"><strong>112</strong></a> first. Then contact the nearest U.S. embassy/consulate or trip support if needed.</p>
    <div class="insurance-contact-list">
      <p><strong>TRIP COORDINATOR — Puneet Bhatia, Enchanting Travels:</strong> WhatsApp / phone <a href="tel:+919686679577"><strong>+91 96866 79577</strong></a> · <a href="mailto:puneet.b@enchantingtravels.com"><strong>puneet.b@enchantingtravels.com</strong></a>. <strong>Use Puneet first for urgent trip logistics.</strong></p>
      <p><strong>U.S. Department of State — from abroad:</strong> <a href="tel:+12025014444">+1-202-501-4444</a> (24/7 emergency help; also lost/stolen passport)</p>
      <p><strong>U.S./Canada State Dept:</strong> <a href="tel:18884074747">1-888-407-4747</a></p>
      <p><strong>Enchanting Travels — U.S./Canada fallback:</strong> <a href="tel:+18882632574">+1-888-263-2574</a>.</p>
    </div>
    <h4>Nearest U.S. mission by trip country</h4>
    <div class="insurance-contact-list">
      <p><strong>Türkiye — U.S. Consulate General Istanbul:</strong> <a href="tel:+902123359000">+90-212-335-9000</a> (main &amp; after-hours)</p>
      <p><strong>Türkiye — U.S. Embassy Ankara:</strong> <a href="tel:+903122940000">+90-312-294-0000</a> (main &amp; after-hours)</p>
      <p><strong>Croatia — U.S. Embassy Zagreb:</strong> <a href="tel:+38516612200">+385-1-661-2200</a> (main &amp; after-hours)</p>
      <p><strong>Slovenia — U.S. Embassy Ljubljana:</strong> <a href="tel:+38612005500">+386-1-200-5500</a> (main &amp; after-hours)</p>
      <p><strong>Austria — U.S. Embassy / Consular Section Vienna:</strong> <a href="tel:+431313390">+43-1-31339-0</a> (main / emergency routing)</p>
      <p><strong>Switzerland — U.S. Embassy Bern:</strong> <a href="tel:+41313577011">+41-31-357-7011</a> (main &amp; after-hours)</p>
    </div>
    <p><strong>Lost passport:</strong> contact the nearest U.S. embassy/consulate or State Department emergency line. Keep the physical passport separate from backup copies; protected identity details remain in the Secure Vault.</p>
    <p><strong>Medical emergency:</strong> call 112, go to the nearest hospital, then use the insurance contacts already listed below. Save itemized bills, receipts, medical documentation and proof of payment.</p>
    <p><strong>Trip disruption:</strong> contact Puneet first for local logistics; use Turkish Airlines / rail staff for carrier-specific disruptions.</p>
    <p class="emergency-source-note">Public emergency contacts verified from U.S. Department of State and Enchanting Travels official sources on Sep. 14, 2026. Puneet Bhatia contact information is included here at the traveler's request for direct offline access.</p>`;
  const grid=host.querySelector('.emergency-country-grid');
  if(grid)grid.insertAdjacentElement('afterend',section);else host.prepend(section);
}

addEntryRequirements();addEurailPassHelp();addSetGameHelp();addEnchantingTravelsReference();addEmergencySupportDetails();
document.querySelectorAll("[data-open-quick-reference]").forEach(link=>{link.addEventListener("click",event=>{const id=link.dataset.openQuickReference;if(!id)return;event.preventDefault();history.replaceState(null,"",`#${encodeURIComponent(id)}`);openQuickReferenceSection(id,true);});});
document.addEventListener("click",handleVaultLink);removeLegacyContactControls();if(location.hash)openQuickReferenceSection(decodeURIComponent(location.hash.slice(1)),false);
ensureVaultInfrastructure().then(()=>{window.addEventListener("tee-vault-session-changed",event=>{if(event.detail?.session)closeVaultOverlay();removeLegacyContactControls();});}).catch(console.error);
window.addEventListener("pageshow",()=>{addEntryRequirements();addEurailPassHelp();addSetGameHelp();addEnchantingTravelsReference();addEmergencySupportDetails();if(location.hash)openQuickReferenceSection(decodeURIComponent(location.hash.slice(1)),false);removeLegacyContactControls();});
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));}