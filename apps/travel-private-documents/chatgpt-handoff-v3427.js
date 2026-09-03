"use strict";
(function(){
  const BUILD='3.4.28';
  const CHAT_URL='https://chatgpt.com/';

  function setBuild(){const el=document.querySelector('header.hero .subtitle strong');const text=`TEE v${BUILD}`;if(el&&el.textContent!==text)el.textContent=text;}
  function owner(){return String(document.getElementById('teeV3404Owner')?.value||'').trim().replace(/\s+/g,' ');}
  function type(){return document.getElementById('teeV3404Type')?.value||'Other';}
  function isWindows(){const ua=String(navigator.userAgent||''),platform=String(navigator.platform||''),uaPlatform=String(navigator.userAgentData?.platform||'');return /Windows/i.test(ua)||/^Win/i.test(platform)||/Windows/i.test(uaPlatform);}
  function isAppleMobile(){if(isWindows())return false;const ua=String(navigator.userAgent||'');return /iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);}
  function fieldKeys(t){if(t==='Passport')return ['Name','Passport number','Expiration date','Date of birth','Nationality'];if(t==='Global Entry')return ['Name','PASSID','Expiration date'];if(t==='Insurance')return ['Covered traveler','Member ID','Plan / policy number','Important note'];if(t==='Flight')return ['Travelers','Airline','Confirmation / PNR','Flight / date'];if(t==='Rail')return ['Travelers','Rail provider','Reservation / pass reference','Travel date'];if(t==='Hotel')return ['Travelers','Hotel','Confirmation number','Stay dates'];if(t==='Receipt')return ['Merchant / provider','Amount','Date','Purpose / note'];return ['Important note'];}
  function requestText(){const t=type(),o=owner(),files=Array.from(document.getElementById('teeV3404File')?.files||[]).map(f=>f.name);const fields=fieldKeys(t).map(k=>`\"${k}\":\"\"`).join(',');return `TEE EXTRACTION REQUEST — JSON ONLY\n\nAnalyze ALL attached images/pages together as ONE ${t} document for ${o}.\n\nRETURN EXACTLY ONE VALID JSON OBJECT. NO prose. NO bullets. NO markdown fences. NO explanation before or after JSON.\n\nRequired schema: {\"schema\":\"tee-chatgpt-extract-v1\",\"documentType\":\"${t}\",\"traveler\":\"${o}\",\"fields\":{${fields}}}\n\nRules:\n- Read every attached image/page before answering.\n- Preserve exact values; do not guess.\n- If uncertain or absent, use an empty string.\n- Dates: YYYY-MM-DD when clear.\n- Identity documents: copy the holder name exactly as printed.\n- Do not include image bytes.\n- Entire response must parse with JSON.parse().\n- First character must be { and last character must be }.\n\nSource file(s): ${files.join(', ')||'selected document'}`;}
  function strip(raw){return String(raw||'').trim().replace(/^```(?:json)?\s*/i,'').replace(/```\s*$/,'').trim();}
  function parse(raw){const d=JSON.parse(strip(raw));if(!(d&&d.schema==='tee-chatgpt-extract-v1'&&d.fields&&typeof d.fields==='object'))throw new Error('Not TEE JSON');return d;}
  function valid(raw){try{parse(raw);return true;}catch{return false;}}
  function requestLike(raw){return /TEE EXTRACTION REQUEST|Analyze the attached travel document|Required schema:|Source file\(s\):/i.test(String(raw||''));}
  function status(kind,title,msg){const el=document.getElementById('teeV3415ChatStatus');if(!el)return;const next=`${kind==='green'?'🟢':kind==='red'?'🔴':'🟡'} ${title}${msg?` — ${msg}`:''}`;const cls=`tee-v3409-ocr-status ${kind}`;if(el.className!==cls)el.className=cls;if(el.textContent!==next)el.textContent=next;}
  function emptyManual(msg,kind='yellow'){const details=document.getElementById('teeV3415ManualPaste'),box=document.getElementById('teeV3415ChatResult');if(details&&!details.open)details.open=true;if(box){if(box.value)box.value='';box.placeholder='Paste ONLY ChatGPT’s tee-chatgpt-extract-v1 JSON result here.';box.scrollIntoView({behavior:'smooth',block:'center'});}status(kind,kind==='red'?'Cannot apply result':'JSON result needed',msg);}
  function applyValidated(raw){let data;try{data=parse(raw);}catch{return 0;}let applied=0;document.querySelectorAll('#teeV3404Details input[data-field-label], input[data-field-label]').forEach(input=>{const key=input.dataset.fieldLabel;const value=String(data.fields[key]??'').trim();if(value){if(input.value!==value)input.value=value;input.classList.add('tee-v3409-ocr-proposed');input.dataset.chatProposed='1';input.dispatchEvent(new Event('input',{bubbles:true}));applied++;}});if(applied)status('green',`${applied} field${applied===1?'':'s'} proposed by ChatGPT`,'Compare every value with the original. Correct anything wrong before saving.');else status('yellow','No usable fields were returned','The JSON was valid, but none of its field names matched this document type.');return applied;}

  function setHtmlIfChanged(el,html){if(el&&el.innerHTML!==html)el.innerHTML=html;}
  function configurePanel(){
    setBuild();
    const panel=document.getElementById('teeV3415ChatPanel');if(!panel)return false;
    const mobile=isAppleMobile();
    if(panel.dataset.teeChatgptOwner!=='v3428')panel.dataset.teeChatgptOwner='v3428';
    const intro=panel.querySelector('h4 + p');
    const introHtml=mobile
      ?'TEE sends the selected source image(s) and a strict machine-readable extraction request to <strong>ChatGPT</strong>. ChatGPT should return JSON only. Copy that JSON result, return to TEE, then tap <strong>Paste Results</strong>.'
      :'On this computer, TEE copies a strict machine-readable extraction request and opens <strong>ChatGPT</strong>. Attach the same source document in ChatGPT, paste the request, and send it. Then copy the JSON result, return to TEE, and click <strong>Paste Results</strong>.';
    setHtmlIfChanged(intro,introHtml);
    const help=panel.querySelector('details.tee-v3404-help');
    if(help&&help.dataset.teeChatgptOwner!=='v3428'){
      help.dataset.teeChatgptOwner='v3428';help.open=true;
      const helpHtml=mobile
        ?'<summary>How do I do this?</summary><ol><li>Tap <strong>Analyze with ChatGPT</strong>.</li><li>In the Share sheet, choose <strong>ChatGPT</strong>.</li><li>TEE shares the selected source image(s) and the strict JSON extraction request together.</li><li>Send the request if ChatGPT shows it ready to send.</li><li>Wait for a response that is <strong>JSON only</strong>.</li><li>Tap <strong>Copy</strong> under that JSON response.</li><li>Return to TEE and tap <strong>Paste Results</strong>.</li><li>TEE rejects prose, the analysis request itself, malformed JSON, or non-TEE JSON.</li><li>Compare every filled field with every original image/page.</li><li>If correct, continue with <strong>Save to TEE Vault</strong>.</li></ol>'
        :'<summary>How do I do this on this computer?</summary><ol><li>Click <strong>Open ChatGPT + Copy Request</strong>.</li><li>TEE copies the strict JSON extraction request and opens ChatGPT in a new tab/window.</li><li>In ChatGPT, attach the <strong>same source document</strong> selected in TEE.</li><li>Paste the copied request and send it.</li><li>Wait for a response that is <strong>JSON only</strong>.</li><li>Click <strong>Copy</strong> under that JSON response.</li><li>Return to TEE and click <strong>Paste Results</strong>.</li><li>TEE rejects prose, the analysis request itself, malformed JSON, or non-TEE JSON.</li><li>Compare every filled field with the original document.</li><li>If correct, continue with <strong>Save to TEE Vault</strong>.</li></ol><p><strong>Why no Windows Share sheet?</strong> ChatGPT is not normally available as a Windows Share target, so TEE uses the more reliable copy-and-open workflow on computers.</p>';
      setHtmlIfChanged(help,helpHtml);
    }
    const analyze=document.getElementById('teeV3415OpenChat');const analyzeText=mobile?'Analyze with ChatGPT':'Open ChatGPT + Copy Request';if(analyze&&analyze.textContent!==analyzeText)analyze.textContent=analyzeText;
    const paste=document.getElementById('teeV3415PasteResults');if(paste&&paste.textContent!=='Paste Results')paste.textContent='Paste Results';
    const current=document.getElementById('teeV3415ChatStatus');
    if(current&&navigator.onLine!==false&&/Share sheet|Tap Analyze with ChatGPT/i.test(current.textContent||''))status('green','READY — ChatGPT analysis available',mobile?'Tap Analyze with ChatGPT. TEE will share the selected source image(s) plus a strict JSON-only extraction request.':'Click Open ChatGPT + Copy Request. Then attach the same source document in ChatGPT, paste the request, and send it.');
    return true;
  }

  document.addEventListener('click',async e=>{
    const target=e.target instanceof Element?e.target:null;if(!target)return;
    if(target.closest('#streamAddDocument,#teeV3404Continue,#teeV3404BackToAdd'))setTimeout(configurePanel,120);
    const analyze=target.closest('#teeV3415OpenChat');
    if(analyze){e.preventDefault();e.stopImmediatePropagation();configurePanel();const prompt=requestText(),input=document.getElementById('teeV3404File'),files=Array.from(input?.files||[]);let copied=false;try{await navigator.clipboard?.writeText?.(prompt);copied=true;}catch{}
      if(!isAppleMobile()){status('yellow','PC handoff',copied?'Analysis request copied. ChatGPT is opening. Attach the same source document, paste the request, send it, then copy the JSON result.':'ChatGPT is opening. Use Copy Analysis Request, attach the same source document, paste the request, and send it.');const opened=window.open(CHAT_URL,'_blank','noopener');if(!opened)status('yellow','Open ChatGPT manually',copied?'The analysis request is copied. Open ChatGPT, attach the same source document, paste, and send.':'Open ChatGPT manually, then use Copy Analysis Request before attaching the document.');return;}
      const share={title:'TEE Document Analysis',text:prompt,files};if(files.length&&navigator.share&&(!navigator.canShare||navigator.canShare(share))){try{status('green','Share to ChatGPT','Choose ChatGPT. TEE is sharing the source image(s) and the JSON-only request together.');await navigator.share(share);status('yellow','Waiting for JSON result','In ChatGPT, send if needed. Copy the JSON response, return to TEE, then tap Paste Results.');return;}catch(err){if(err?.name==='AbortError'){status('yellow','Share cancelled','Tap Analyze with ChatGPT when ready.');return;}}}
      status('yellow','Fallback handoff','The JSON-only request is copied. Open ChatGPT, attach the same source image(s), paste the request, and send it.');window.open(CHAT_URL,'_blank','noopener');return;
    }
    const paste=target.closest('#teeV3415PasteResults');
    if(paste){e.preventDefault();e.stopImmediatePropagation();try{const text=await navigator.clipboard.readText();if(!valid(text)){emptyManual(requestLike(text)?'The clipboard still contains the analysis request, not ChatGPT’s JSON result. Return to ChatGPT and tap Copy under the JSON response.':'The clipboard does not contain valid TEE JSON. Copy the JSON response from ChatGPT first.','red');return;}const box=document.getElementById('teeV3415ChatResult');if(box)box.value=strip(text);applyValidated(text);}catch{emptyManual('Automatic clipboard reading was blocked. Paste ONLY the copied JSON response into the empty box.');}return;}
    const apply=target.closest('#teeV3415ApplyManual');
    if(apply){e.preventDefault();e.stopImmediatePropagation();const box=document.getElementById('teeV3415ChatResult');const raw=box?.value||'';if(!valid(raw)){emptyManual(requestLike(raw)?'That is the analysis request, not the JSON answer. Copy the JSON response from ChatGPT.':'TEE accepts only valid tee-chatgpt-extract-v1 JSON.','red');return;}applyValidated(raw);}
  },true);

  document.addEventListener('tee-runtime-ready',()=>{configurePanel();setTimeout(configurePanel,120);});
  configurePanel();

  if(!document.querySelector('script[data-tee-related-records="3.4.28"]')){
    const related=document.createElement('script');related.src='related-records-v3428.js?v=3.4.28';related.dataset.teeRelatedRecords='3.4.28';document.head.appendChild(related);
  }
})();