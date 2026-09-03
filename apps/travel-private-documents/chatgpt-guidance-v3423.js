"use strict";
(function(){
  const BUILD='3.4.27';
  const CHAT_URL='https://chatgpt.com/';

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

  function normalizeName(value){return String(value||'').trim().replace(/\s+/g,' ');}
  function isAppleMobile(){
    const ua=navigator.userAgent||'';
    return /iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  }

  function promptText(){
    const type=document.getElementById('teeV3404Type')?.value||'Other';
    const owner=normalizeName(document.getElementById('teeV3404Owner')?.value||'');
    const files=Array.from(document.getElementById('teeV3404File')?.files||[]).map(f=>f.name);
    const fields=fieldKeys(type);
    const schemaFields=fields.map(k=>`"${k}":""`).join(',');
    return `TEE EXTRACTION REQUEST — MACHINE-READABLE RESPONSE REQUIRED.\n\nAnalyze ALL attached source images/pages as ONE ${type} document for traveler ${owner}.\n\nRETURN EXACTLY ONE JSON OBJECT AND NOTHING ELSE. Do not use markdown fences. Do not add an introduction, bullets, explanation, commentary, or text before/after the JSON.\n\nRequired schema: {"schema":"tee-chatgpt-extract-v1","documentType":"${type}","traveler":"${owner}","fields":{${schemaFields}}}\n\nRules:\n- Read every attached image/page before answering.\n- Preserve exact operational values from the document; do not guess.\n- If uncertain or not present, use an empty string.\n- For dates, use YYYY-MM-DD when clear.\n- For identity documents, copy the holder name exactly as printed.\n- Do not include source image bytes.\n- Your entire response must parse with JSON.parse().\n- First character of your response must be { and last character must be }.\n\nSource file(s): ${files.join(', ')||'selected document'}`;
  }

  function stripFences(raw){return String(raw||'').trim().replace(/^```(?:json)?\s*/i,'').replace(/```\s*$/,'').trim();}
  function parseTEEJson(raw){
    const cleaned=stripFences(raw);
    const data=JSON.parse(cleaned);
    if(!(data&&data.schema==='tee-chatgpt-extract-v1'&&data.fields&&typeof data.fields==='object'))throw new Error('Not a TEE JSON result.');
    return {cleaned,data};
  }
  function validTEEJson(raw){try{parseTEEJson(raw);return true;}catch{return false;}}
  function looksLikeRequest(raw){const s=String(raw||'');return /TEE EXTRACTION REQUEST|Analyze the attached travel document|Required schema:|Source file\(s\):/i.test(s);}

  function setChatStatus(kind,title,message){
    const el=document.getElementById('teeV3415ChatStatus');if(!el)return;
    el.className=`tee-v3409-ocr-status ${kind}`;
    const icon=kind==='green'?'🟢':kind==='red'?'🔴':'🟡';
    el.textContent=`${icon} ${title}${message?` — ${message}`:''}`;
  }

  function openManualPaste(reason){
    const manual=document.getElementById('teeV3415ManualPaste');
    const box=document.getElementById('teeV3415ChatResult');
    if(manual)manual.open=true;
    if(box){box.value='';box.placeholder='Paste ONLY the JSON result from ChatGPT here.';setTimeout(()=>{box.scrollIntoView({behavior:'smooth',block:'center'});box.focus();},40);}
    setChatStatus('yellow','JSON result needed',reason||'Copy the JSON response from ChatGPT, paste it into the empty box, then tap Apply Manual Result.');
  }

  function installPasteButton(){
    const oldButton=document.getElementById('teeV3415PasteResults');
    if(!oldButton||oldButton.dataset.teeV3427==='1')return;
    const button=oldButton.cloneNode(true);button.dataset.teeV3427='1';button.textContent='Paste Results';oldButton.replaceWith(button);
    button.addEventListener('click',async()=>{
      const box=document.getElementById('teeV3415ChatResult');const apply=document.getElementById('teeV3415ApplyManual');
      try{
        const text=await navigator.clipboard.readText();
        if(validTEEJson(text)){
          if(box)box.value=stripFences(text);
          setChatStatus('green','ChatGPT JSON received','TEE recognized the result. Compare every proposed value with the original before saving.');
          apply?.click();return;
        }
        if(looksLikeRequest(text)){
          openManualPaste('The clipboard still contains the TEE analysis request, not ChatGPT’s JSON result. Return to ChatGPT and tap Copy under the JSON response.');return;
        }
        openManualPaste('The clipboard does not contain valid TEE JSON. Return to ChatGPT, copy the JSON response, then come back and tap Paste Results.');
      }catch{openManualPaste('Automatic clipboard reading was blocked. Paste ONLY the copied JSON result into the empty box.');}
    });
  }

  function installManualGuard(){
    const apply=document.getElementById('teeV3415ApplyManual');const box=document.getElementById('teeV3415ChatResult');
    if(!apply||!box||apply.dataset.teeV3427==='1')return;
    const replacement=apply.cloneNode(true);replacement.dataset.teeV3427='1';apply.replaceWith(replacement);
    replacement.addEventListener('click',()=>{
      const raw=box.value||'';
      if(!validTEEJson(raw)){
        box.value='';
        setChatStatus('red','Cannot apply result',looksLikeRequest(raw)?'That was the analysis request, not the JSON answer. Copy the JSON result from ChatGPT.':'TEE accepts only a valid tee-chatgpt-extract-v1 JSON result.');
        return;
      }
      const original=document.getElementById('teeV3415ApplyManualOriginal');
      if(original)original.click();
      else window.dispatchEvent(new CustomEvent('tee-chatgpt-valid-json',{detail:{json:stripFences(raw)}}));
    });
  }

  async function copyRequestAndOpenChatGPT(){
    const prompt=promptText();
    let copied=false;
    try{await navigator.clipboard?.writeText?.(prompt);copied=true;}catch{}
    setChatStatus('yellow','PC handoff',copied?'Analysis request copied. ChatGPT is opening. Attach the same source document, paste the request, send it, then copy the JSON result.':'ChatGPT is opening. Use Copy Analysis Request, attach the same source document, paste the request, and send it.');
    const opened=window.open(CHAT_URL,'_blank','noopener');
    if(!opened)setChatStatus('yellow','Open ChatGPT manually',copied?'The analysis request is copied. Open ChatGPT, attach the same source document, paste, and send.':'Open ChatGPT manually, then use Copy Analysis Request before attaching the document.');
  }

  async function shareToChatGPT(){
    const prompt=promptText();
    const input=document.getElementById('teeV3404File');
    const files=Array.from(input?.files||[]);

    if(!isAppleMobile()){
      await copyRequestAndOpenChatGPT();
      return;
    }

    try{await navigator.clipboard?.writeText?.(prompt);}catch{}
    if(files.length&&navigator.share){
      const shareData={title:'TEE Document Analysis',text:prompt,files};
      try{
        if(!navigator.canShare||navigator.canShare(shareData)){
          setChatStatus('green','Share to ChatGPT','Choose ChatGPT in the Share sheet. TEE is sharing the source image(s) AND the exact JSON extraction request together.');
          await navigator.share(shareData);
          setChatStatus('yellow','Waiting for JSON result','In ChatGPT, send the shared request if needed. When the JSON response appears, tap Copy, return to TEE, then tap Paste Results.');
          return;
        }
      }catch(err){if(err?.name==='AbortError'){setChatStatus('yellow','Share cancelled','Tap Analyze with ChatGPT when ready.');return;}}
    }

    setChatStatus('yellow','Fallback handoff','TEE copied the exact JSON request. ChatGPT is opening; attach the same source image(s), paste the request, and send it.');
    const opened=window.open(CHAT_URL,'_blank','noopener');
    if(!opened)setChatStatus('yellow','Open ChatGPT manually','The exact JSON request is copied. Open ChatGPT, attach the same source document(s), paste, and send.');
  }

  function install(){
    const panel=document.getElementById('teeV3415ChatPanel');if(!panel)return false;
    const mobile=isAppleMobile();
    if(panel.dataset.teeV3427!=='1'){
      panel.dataset.teeV3427='1';
      const intro=panel.querySelector('h4 + p');
      if(intro)intro.innerHTML=mobile
        ?'TEE sends the selected source image(s) and a strict machine-readable extraction request to <strong>ChatGPT</strong>. ChatGPT should return JSON only. Copy that JSON result, return to TEE, then tap <strong>Paste Results</strong>.'
        :'On this computer, TEE copies a strict machine-readable extraction request and opens <strong>ChatGPT</strong>. Attach the same source document in ChatGPT, paste the request, and send it. Then copy the JSON result, return to TEE, and tap <strong>Paste Results</strong>.';
      const help=panel.querySelector('details.tee-v3404-help');
      if(help){
        help.open=true;
        help.innerHTML=mobile
          ?'<summary>How do I do this?</summary><ol><li>Tap <strong>Analyze with ChatGPT</strong>.</li><li>In the Share sheet, choose <strong>ChatGPT</strong>.</li><li>TEE shares the selected source image(s) and the strict JSON extraction request together.</li><li>If ChatGPT shows the request ready to send, send it.</li><li>Wait for a response that is <strong>JSON only</strong>.</li><li>Tap <strong>Copy</strong> under that JSON response.</li><li>Return to TEE.</li><li>Tap <strong>Paste Results</strong>.</li><li>TEE will reject prose, the analysis request itself, or malformed JSON.</li><li>Compare every filled field with every original image/page.</li><li>If correct, continue with <strong>Save to TEE Vault</strong>.</li></ol><p><strong>Fallback:</strong> if the Share sheet cannot send the request text with the images, TEE also copies the request to the clipboard. Open ChatGPT, attach the same source image(s), paste the request, and send it.</p>'
          :'<summary>How do I do this on this computer?</summary><ol><li>Click <strong>Open ChatGPT + Copy Request</strong>.</li><li>TEE copies the strict JSON extraction request and opens ChatGPT in a new tab/window.</li><li>In ChatGPT, attach the <strong>same source document</strong> selected in TEE.</li><li>Paste the copied request into the ChatGPT message box.</li><li>Send it.</li><li>Wait for a response that is <strong>JSON only</strong>.</li><li>Click <strong>Copy</strong> under that JSON response.</li><li>Return to TEE.</li><li>Click <strong>Paste Results</strong>.</li><li>TEE will reject prose, the analysis request itself, or malformed JSON.</li><li>Compare every filled field with the original document.</li><li>If correct, continue with <strong>Save to TEE Vault</strong>.</li></ol><p><strong>Why no Windows Share sheet?</strong> ChatGPT is not normally available as a Windows Share target, so TEE uses the more reliable copy-and-open workflow on computers.</p>';
      }
      const oldButton=document.getElementById('teeV3415OpenChat');
      if(oldButton){const button=oldButton.cloneNode(true);button.textContent=mobile?'Analyze with ChatGPT':'Open ChatGPT + Copy Request';oldButton.replaceWith(button);button.addEventListener('click',shareToChatGPT);}
    }
    installPasteButton();
    installManualGuard();
    setChatStatus(navigator.onLine===false?'yellow':'green',navigator.onLine===false?'OFFLINE — Local scan available':'READY — ChatGPT analysis available',navigator.onLine===false?'Use the Offline option below.':mobile?'Tap Analyze with ChatGPT. TEE will share the selected source image(s) plus a strict JSON-only extraction request.':'Click Open ChatGPT + Copy Request. Then attach the same source document in ChatGPT, paste the request, and send it.');
    return true;
  }

  document.addEventListener('tee-runtime-ready',()=>{install();setTimeout(install,120);});
  if(!install()){const observer=new MutationObserver(()=>{if(install())observer.disconnect();});observer.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>observer.disconnect(),15000);}
  const buildLabel=document.querySelector('header.hero .subtitle strong');if(buildLabel)buildLabel.textContent=`TEE v${BUILD}`;
})();
