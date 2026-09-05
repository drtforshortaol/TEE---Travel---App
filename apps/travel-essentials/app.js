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
    if(existing){
      if(existing.dataset.loaded === "1") resolve();
      else existing.addEventListener("load", resolve, {once:true});
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.setAttribute(marker, "1");
    script.addEventListener("load", ()=>{ script.dataset.loaded = "1"; resolve(); }, {once:true});
    script.addEventListener("error", reject, {once:true});
    document.head.appendChild(script);
  });
}

async function ensureVaultInfrastructure(){
  if(!window.TEEVaultSession) await loadScript("../../vault-session.js", "data-tee-vault-session");
  if(!document.querySelector("script[data-tee-protected-context]")){
    await loadScript("../../protected-context.js", "data-tee-protected-context");
  }
}

function stopVaultOverlayWatch(){
  if(teeVaultOverlayTimer !== null){
    clearInterval(teeVaultOverlayTimer);
    teeVaultOverlayTimer = null;
  }
}

function closeVaultOverlay(){
  stopVaultOverlayWatch();
  teeVaultOverlay?.remove();
  teeVaultOverlay = null;
}

function startVaultOverlayWatch(){
  stopVaultOverlayWatch();
  teeVaultOverlayTimer = setInterval(()=>{
    if(!teeVaultOverlay){ stopVaultOverlayWatch(); return; }
    if(window.TEEVaultSession?.isOpen?.()) closeVaultOverlay();
  },200);
}

function cleanVaultFrame(frame){
  try{
    const doc = frame.contentDocument;
    if(!doc) return false;
    doc.documentElement.style.background = "#fff";
    doc.body.style.margin = "0";
    doc.body.style.background = "#fff";

    doc.querySelector("header.hero")?.setAttribute("hidden","");
    doc.querySelector("footer")?.setAttribute("hidden","");
    doc.querySelectorAll("main > section").forEach(section=>{
      if(section.id !== "secureVaultPanel") section.setAttribute("hidden","");
    });

    const panel = doc.getElementById("secureVaultPanel");
    if(panel){
      panel.hidden = false;
      panel.style.margin = "0";
      panel.style.border = "0";
      panel.style.boxShadow = "none";
      panel.style.borderRadius = "0";
      panel.querySelectorAll('a[href*="../../index.html"],a[href*="teeReturn"],.top-actions,.secure-backup-tools').forEach(el=>el.setAttribute("hidden",""));
    }

    doc.querySelectorAll(".source-app-section-master").forEach(button=>button.setAttribute("hidden",""));
    const unlock = doc.getElementById("secureUnlockFields");
    if(unlock) unlock.hidden = false;
    doc.getElementById("secureUnlockPassphrase")?.focus();
    return Boolean(panel);
  }catch{return false;}
}

function openVaultOverlay(vaultHref){
  if(teeVaultOverlay) return;
  const overlay = document.createElement("div");
  overlay.id = "teeVaultOverlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Unlock Secure Vault");
  Object.assign(overlay.style,{position:"fixed",inset:"0",zIndex:"5000",background:"rgba(0,0,0,.55)",padding:"12px",display:"flex",alignItems:"center",justifyContent:"center"});

  const shell = document.createElement("div");
  Object.assign(shell.style,{width:"min(620px,100%)",maxHeight:"min(690px,92vh)",background:"#fff",borderRadius:"16px",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 18px 50px rgba(0,0,0,.35)"});
  const bar = document.createElement("div");
  Object.assign(bar.style,{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"10px",padding:"12px 14px",background:"#123f46",color:"white",font:"700 17px system-ui"});
  bar.innerHTML = '<span>Unlock Secure Vault</span><button type="button" data-close-vault style="border:0;border-radius:9px;padding:8px 12px;font-weight:800;cursor:pointer">Cancel</button>';

  const loading = document.createElement("div");
  loading.textContent = "Loading secure sign-in…";
  Object.assign(loading.style,{padding:"28px",textAlign:"center",font:"600 16px system-ui",color:"#36565b"});

  const frame = document.createElement("iframe");
  const url = new URL(vaultHref || "../travel-private-documents/index.html?teeView=vault&teeEnter=1", location.href);
  url.searchParams.set("teeView", "vault");
  url.searchParams.set("teeEnter", "1");
  url.searchParams.set("teeEmbed", "1");
  url.searchParams.delete("teeReturnTo");
  url.searchParams.delete("teeVaultSection");
  frame.src = url.href;
  frame.title = "TEE Secure Vault sign-in";
  Object.assign(frame.style,{border:"0",width:"100%",height:"460px",background:"white",display:"none"});
  frame.addEventListener("load",()=>{
    cleanVaultFrame(frame);
    setTimeout(()=>cleanVaultFrame(frame),60);
    setTimeout(()=>cleanVaultFrame(frame),180);
    loading.remove();
    frame.style.display = "block";
  });

  shell.append(bar,loading,frame);
  overlay.appendChild(shell);
  document.body.appendChild(overlay);
  teeVaultOverlay = overlay;
  bar.querySelector("[data-close-vault]")?.addEventListener("click",closeVaultOverlay);
  startVaultOverlayWatch();
}

function handleVaultLink(event){
  const link = event.target.closest?.('a[href*="travel-private-documents/index.html"]');
  if(!link) return;
  if(window.TEEVaultSession?.isOpen?.()) return;
  event.preventDefault();
  openVaultOverlay(link.href);
}

function removeLegacyContactControls(){
  document.querySelectorAll("[data-tee-contact-vault],.tee-contact-vault-actions,.tee-vault-tab-note").forEach(el=>el.remove());
  document.querySelectorAll(".emergency-contact-group .privacy-note").forEach(note=>{
    note.textContent = "(protected Shared details in Vault)";
  });
}

document.querySelectorAll("[data-open-quick-reference]").forEach(link=>{
  link.addEventListener("click",event=>{
    const id = link.dataset.openQuickReference;
    if(!id) return;
    event.preventDefault();
    history.replaceState(null,"",`#${encodeURIComponent(id)}`);
    openQuickReferenceSection(id,true);
  });
});

document.addEventListener("click",handleVaultLink);
removeLegacyContactControls();
if(location.hash) openQuickReferenceSection(decodeURIComponent(location.hash.slice(1)),false);

ensureVaultInfrastructure().then(()=>{
  window.addEventListener("tee-vault-session-changed",event=>{
    if(event.detail?.session) closeVaultOverlay();
    removeLegacyContactControls();
  });
}).catch(console.error);

window.addEventListener("pageshow",()=>{
  if(location.hash) openQuickReferenceSection(decodeURIComponent(location.hash.slice(1)),false);
  removeLegacyContactControls();
});

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));
}