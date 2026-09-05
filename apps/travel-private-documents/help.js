(() => {
  const HELP = {
    'help-center': {
      title: 'TEE Source Documents Help', subtitle: 'Use the same button names you see on the screen.',
      quick: `<div class="tee-help-cards"><button data-open-help="smart-intake"><strong>Add Document</strong><span>Add → Review → Save → Verify.</span></button><button data-open-help="structured-documents"><strong>Saved Documents</strong><span>View saved information, originals, edit, archive, or restore.</span></button><button data-open-help="source-manager"><strong>Document Library</strong><span>Find retained originals and processing history.</span></button></div>`,
      details: `<p>TEE is designed so each step tells you what to do now, what button comes next, and when you are finished.</p><p>The normal workflow is <strong>Add Document → Continue to Review → Save to TEE Vault → Review & Verify → Mark Verified & Finish</strong>.</p>`,
      security: `<p><strong>Private — Couple A only</strong> and <strong>Private — Couple B only</strong> are separate encrypted private zones. TEE blocks a Private save if the wrong couple Vault is unlocked.</p><p><strong>Shared — both couples</strong> is protected but available to both couples after authorization.</p><p>During the trip, removal is recoverable Archive behavior. Permanent purge is disabled until end-of-trip administrator maintenance.</p>`,
      next: 'Choose Add Document if you are adding something new. Choose Saved Documents if you are checking something already saved.'
    },
    'smart-intake': {
      title: 'Add Document', subtitle: 'Add → Review → Save → Verify.',
      quick: `<ol><li>Enter <strong>Traveler / owner</strong>.</li><li>Choose <strong>Document type</strong>.</li><li>Choose <strong>Privacy / destination</strong>.</li><li>Tap <strong>Choose Source Document(s)</strong>.</li><li>When the source is prepared, tap <strong>Continue to Review</strong>. If another couple must authorize the destination, TEE will show <strong>NEEDS ATTENTION</strong> and handle that before Save.</li><li>Review the selected image(s) or every PDF page, then tap <strong>Save to TEE Vault</strong>.</li><li>Tap <strong>Review &amp; Verify</strong>. TEE shows the retained original and saved information together.</li><li>If they match, tap <strong>Mark Verified &amp; Finish</strong>. If not, tap <strong>Edit Document</strong>.</li></ol>`,
      details: `<p><strong>Green READY</strong> means no unresolved requirement blocks the current action. <strong>Yellow NEEDS ATTENTION</strong> may still allow you to continue to Review when destination authorization must occur before Save.</p><p><strong>Red CANNOT CONTINUE</strong> means TEE blocked the action to protect the document or Vault.</p>`,
      security: `<p>For a Private document, select the intended couple in <strong>Privacy / destination</strong>. If the wrong couple Vault is open, TEE will let you review the document, then require <strong>Authorize Couple A</strong> or <strong>Authorize Couple B</strong> before <strong>Save to TEE Vault</strong> is enabled.</p><p>Do not change a Private document to Shared merely to get around the ownership check.</p>`,
      next: 'After choosing the source, tap Continue to Review. If TEE requests destination authorization, authorize that couple before Save to TEE Vault.'
    },
    'structured-documents': {
      title: 'Saved Documents', subtitle: 'Check or correct documents already saved to TEE.',
      quick: `<ol><li>Find the document.</li><li>Tap <strong>Review &amp; Verify</strong>.</li><li>Compare the retained <strong>Original Document</strong> with <strong>Saved Information</strong> on the same screen.</li><li>If something is wrong, tap <strong>Edit Document</strong>.</li><li>If everything matches, tap <strong>Mark Verified &amp; Finish</strong>.</li></ol>`,
      details: `<p>Saved Documents is the normal place to verify a document after saving. You should not need technical Structured Document terminology during normal traveler use.</p>`,
      security: `<p>Protected information is shown only when the authorized Vault is unlocked. Archive does not permanently erase the record.</p>`,
      next: 'Tap Review & Verify. If the original and saved information match, tap Mark Verified & Finish.'
    },
    'source-manager': {
      title: 'Document Library', subtitle: 'Supporting originals and history.',
      quick: `<p>Use <strong>Document Library</strong> when you need the retained original or processing history. For normal checking, use <strong>Saved Documents</strong>.</p><p>If an item has been archived, use <strong>Restore</strong> to return it to normal use.</p>`,
      details: `<p>The Library is support material, not the normal starting point for adding documents.</p>`,
      security: `<p>Archived protected documents remain protected at their existing access level. A locked protected-original status means the owning couple is not authorized in the current session; it does not mean the source was deleted. Permanent purge is disabled during the trip.</p><p>TEE v3.4.15 contains the local change-journal foundation for future automatic encrypted sync. Cross-device automatic transfer is not active until a private sync transport is connected. Initial setup can now switch safely between Couple A and Couple B at save time using the selected couple passphrase. Passport intake now adds clipped-edge MRZ recovery, independent check-digit recovery for DOB/expiration, and leaves uncertain values blank rather than guessing. OCR/MRZ suggestions must still be verified against the original.</p>`,
      next: 'Return to Saved Documents for normal verification, or Add Document to add a new source.'
    }
  };

  const dialog = document.getElementById('teeHelpDialog');
  const title = document.getElementById('teeHelpTitle');
  const subtitle = document.getElementById('teeHelpSubtitle');
  const body = document.getElementById('teeHelpBody');
  const next = document.getElementById('teeHelpNext');
  let topic = 'help-center', tab = 'quick';
  function render(){ const h=HELP[topic]||HELP['help-center']; title.textContent=h.title; subtitle.textContent=h.subtitle; body.innerHTML=h[tab]; next.innerHTML=`<strong>What do I do next?</strong> ${h.next}`; document.querySelectorAll('.tee-help-tab').forEach(b=>b.classList.toggle('active',b.dataset.helpTab===tab)); }
  function open(t){ topic=t||'help-center'; tab='quick'; render(); if(typeof dialog.showModal==='function') dialog.showModal(); else dialog.setAttribute('open',''); }
  document.addEventListener('click',e=>{ const b=e.target.closest('[data-help-topic]'); if(b){open(b.dataset.helpTopic);return;} const o=e.target.closest('[data-open-help]'); if(o){topic=o.dataset.openHelp;tab='quick';render();return;} const t=e.target.closest('[data-help-tab]'); if(t){tab=t.dataset.helpTab;render();}});
  document.getElementById('teeHelpClose')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{ if(e.target===dialog) dialog.close(); });
})();

// Load the volatile Vault authorization bridge after the Secure Vault scripts.
(() => {
  if(document.querySelector('script[data-tee-vault-session-bridge]')) return;
  const script = document.createElement('script');
  script.src = './vault-session-bridge.js';
  script.dataset.teeVaultSessionBridge = '1';
  document.head.appendChild(script);
})();
