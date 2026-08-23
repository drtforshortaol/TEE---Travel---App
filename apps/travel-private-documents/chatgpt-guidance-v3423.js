"use strict";
(function(){
  const BUILD='3.4.23';
  const CHAT_URL='https://chatgpt.com/';

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function fieldKeys(type){
    if(type==='Passport')return ['Name','Passport number','Expiration date','Date of birth','Nationality'];
    if(type==='Global Entry')return ['Name','PASSID','Expiration date'];
    if(type==='Insurance')return ['Covered traveler','Member ID','Plan / policy number','Important note'];
    if(type==='Flight')return ['Travelers','Airline','Confirmation / PNR','Flight / date'];
    if(type==='Rail')return ['Travelers','Rail provider','Reservation / pass reference','Travel date'];
    if(type==='Hotel')return ['Travelers','Hotel','Confirmation number','Stay dates'];
    if(type==='Receipt')return ['Merchant / provider','Amount','Date','Purpose / note'];
    return ['Important note'];
  }

  function normalizeName(value){
    return String(value||'').trim().replace(/\s+/g,' ');
  }

  function promptText(){
    const type=document.getElementById('teeV3404Type')?.value||'Other';
    const owner=normalizeName(document.getElementById('teeV3404Owner')?.value||'');
    const files=Array.from(document.getElementById('teeV3404File')?.files||[]).map(f=>f.name);
    const fields=fieldKeys(type);
    const schemaFields=fields.map(k=>`"${k}":""`).join(',');
    return `Analyze the attached travel document for TEE. Return ONLY valid JSON, no markdown or explanation.\n\nSchema: {"schema":"tee-chatgpt-extract-v1","documentType":"${type}","traveler":"${owner}","fields":{${schemaFields}}}\n\nRules:\n- Read the attached source carefully, including every image/page.\n- Preserve exact operational values; do not guess.\n- If uncertain, use an empty string.\n- For dates, prefer YYYY-MM-DD when clear.\n- For passport/identity documents, copy the holder name exactly as printed and verify passport number, birth date, expiration date, and nationality against the document.\n- Do not include source image bytes.\n- Return only the JSON object.\n\nSource file(s): ${files.join(', ')||'selected document'}`;
  }

  function setChatStatus(kind,title,message){
    const el=document.getElementById('teeV3415ChatStatus');
    if(!el)return;
    el.className=`tee-v3409-ocr-status ${kind}`;
    const icon=kind==='green'?'🟢':kind==='red'?'🔴':'🟡';
    el.textContent=`${icon} ${title}${message?` — ${message}`:''}`;
  }

  function install(){
    const panel=document.getElementById('teeV3415ChatPanel');
    if(!panel || panel.dataset.teeV3423==='1')return false;
    panel.dataset.teeV3423='1';

    const intro=panel.querySelector('h4 + p');
    if(intro)intro.innerHTML='TEE copies the prepared analysis request, then opens <strong>ChatGPT</strong>. In ChatGPT, attach the same document, paste the request, send it, then copy the JSON result and return to TEE.';

    const help=panel.querySelector('details.tee-v3404-help');
    if(help){
      help.open=true;
      help.innerHTML='<summary>How do I do this?</summary><ol><li>Tap <strong>Analyze with ChatGPT</strong>.</li><li>TEE copies the analysis request and opens ChatGPT.</li><li>In ChatGPT, attach the <strong>same document</strong> you selected in TEE.</li><li>Tap the ChatGPT message box, then tap <strong>Paste</strong>.</li><li>Send the message.</li><li>Wait for ChatGPT to return the JSON result.</li><li>Tap <strong>Copy</strong> on the ChatGPT result.</li><li>Return to TEE.</li><li>Tap <strong>Paste Results</strong>.</li><li>Compare every filled field with the original document.</li><li>If correct, continue with <strong>Save to TEE Vault</strong>.</li></ol><p><strong>If ChatGPT does not open automatically:</strong> open ChatGPT manually, attach the same document, paste the copied request, and continue with Step 5.</p><p><strong>Next step:</strong> tap <strong>Analyze with ChatGPT</strong>.</p>';
    }

    const oldButton=document.getElementById('teeV3415OpenChat');
    if(oldButton){
      const button=oldButton.cloneNode(true);
      button.textContent='Analyze with ChatGPT';
      oldButton.replaceWith(button);
      button.addEventListener('click',()=>{
        const prompt=promptText();
        try{
          const write=navigator.clipboard?.writeText?.(prompt);
          if(write?.catch)write.catch(()=>{});
        }catch{}
        setChatStatus('green','Analysis request copied','ChatGPT is opening. Attach the same document, paste the request, send it, then tap Copy on the JSON result. Return to TEE and tap Paste Results.');
        const opened=window.open(CHAT_URL,'_blank','noopener');
        if(!opened){
          setChatStatus('yellow','Open ChatGPT manually','The analysis request is copied. Open ChatGPT, attach the same document, paste the request, send it, then copy the JSON result and return to tap Paste Results.');
        }
      });
    }

    setChatStatus(navigator.onLine===false?'yellow':'green',navigator.onLine===false?'OFFLINE — Local scan available':'READY — ChatGPT analysis available',navigator.onLine===false?'Use the Offline option below.':'Tap Analyze with ChatGPT. TEE will copy the analysis request and open ChatGPT.');
    return true;
  }

  document.addEventListener('tee-runtime-ready',()=>{install();setTimeout(install,120);});
  if(!install()){
    const observer=new MutationObserver(()=>{if(install())observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),15000);
  }

  const buildLabel=document.querySelector('header.hero .subtitle strong');
  if(buildLabel)buildLabel.textContent=`TEE v${BUILD}`;
})();
