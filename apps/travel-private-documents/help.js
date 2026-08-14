(() => {
  const HELP = {
    'help-center': {
      title: 'TEE Help Center', subtitle: 'Choose the section you are working in.',
      quick: `<div class="tee-help-cards"><button data-open-help="smart-intake"><strong>Smart Document Intake</strong><span>Analyze a source document, review classifications, and commit it to TEE.</span></button><button data-open-help="structured-documents"><strong>Structured Documents</strong><span>View, edit, verify, or delete documents already committed to TEE.</span></button><button data-open-help="source-manager"><strong>Source Document Manager</strong><span>Understand how retained original source files are classified and managed.</span></button></div>`,
      details: `<p>The Help Center collects the same contextual instructions available from each section's <strong>? How to use this</strong> button.</p><p>Use the section-specific help when you are unsure what a button does or what the next step should be.</p>`,
      security: `<p><strong>TEE access model:</strong> Public is open to everyone. Shared is protected and accessible to both traveling couples only. Private is protected and accessible only to the owning couple.</p><p>Uploading or importing protected records into TEE does not publish them to GitHub.</p>`,
      next: 'Choose the section you want help with.'
    },
    'smart-intake': {
      title: 'Smart Document Intake', subtitle: 'Turn a PDF/image into a reviewed TEE structured record.',
      quick: `<ol><li><strong>Choose source document.</strong> Select the PDF/JPEG/PNG/WebP you want to process.</li><li><strong>Analyze with ChatGPT.</strong> Use “Copy ChatGPT Analysis Instructions,” upload the same source to ChatGPT, and receive a tee-smart-intake JSON file.</li><li><strong>Load ChatGPT Analysis.</strong> Select the returned JSON and load it.</li><li><strong>Review classifications.</strong> Use the checkboxes to select several details and apply Public, Shared, or Private to the group.</li><li><strong>Approve & Commit to TEE.</strong> This is the step that actually saves the structured record into TEE.</li><li><strong>Verify.</strong> Scroll to Structured Documents and confirm the card says “Saved in TEE.”</li></ol>`,
      details: `<p><strong>Source document</strong> is the original PDF/image. <strong>Analysis JSON</strong> is only a temporary proposal; loading it does not yet save the record.</p><p>You may edit the title, category, original-document sensitivity, field labels, values, and classifications before committing.</p><p>Use <strong>Select all / Clear selection</strong> and the bulk Public / Shared / Private buttons when many items have the same access level.</p><p>If ChatGPT proposes a classification you disagree with, change it before commit. TEE treats your approved classification as final.</p>`,
      security: `<p>The original document should use the <strong>highest sensitivity present anywhere in the source</strong>.</p><p>Public fields may be displayed openly. Shared fields belong to both traveling couples only. Private fields belong only to the owning couple.</p><p>Do not classify booking references, ticket numbers, identity numbers, private payment information, or couple-specific personal information as Public.</p><p>The source file and protected fields remain device-local/protected; they are not added to the GitHub app package.</p>`,
      next: 'If a source is already selected, the next normal step is to load its ChatGPT analysis JSON.'
    },
    'structured-documents': {
      title: 'Structured Documents', subtitle: 'Manage records that have already been committed to TEE.',
      quick: `<ol><li>Find the document card by title.</li><li>Look for <strong>✓ Saved in TEE</strong> to confirm persistence.</li><li>Use <strong>Edit</strong> to change fields, classifications, images, category, or source reference.</li><li>Use <strong>Refresh Protected View</strong> after unlocking/locking a vault to update what protected layers are visible.</li><li>Use <strong>Delete</strong> to remove a structured document you no longer want.</li></ol>`,
      details: `<p>A Structured Document is TEE's reconstructed operational version of a source document. It can contain Public, Shared, and Private fields/images within one coherent record.</p><p>The original source remains separate and uses the highest sensitivity needed by that source. The Structured Document can expose lower-sensitivity useful information without exposing the protected original.</p><p>Deleting a structured document removes the TEE record; it does not automatically delete a separately retained source file from your PC archive.</p>`,
      security: `<p>When the vault is locked, protected Shared/Private layers should not be readable. Unlocking the appropriate access level reveals only the information authorized for that user.</p><p>Private Couple A information must never be visible to Couple B, and vice versa. Shared is visible to both couples but is still protected from the public.</p>`,
      next: 'If you just committed a Smart Intake record, look for its card here and confirm “Saved in TEE.”'
    },
    'source-manager': {
      title: 'Source Document Manager', subtitle: 'Classify and retain original source material without confusing it with Structured Documents.',
      quick: `<ol><li>Use this area for original retained source documents.</li><li>Assign the source its correct highest-level status.</li><li>Prefer <strong>Archive</strong> when a source should be retained but is not needed in active daily use.</li><li>Use <strong>Remove from TEE</strong> only for material that should no longer be part of the TEE package/workflow.</li></ol>`,
      details: `<p>The Source Document Manager is different from Smart Intake and Structured Documents. It tracks original source material; Smart Intake analyzes it; Structured Documents hold the reconstructed TEE record.</p><p>A mixed source should generally remain at its highest sensitivity even when some information extracted from it is Public or Shared.</p>`,
      security: `<p>Never mark an original source Public until the entire file has been reviewed and contains no protected information.</p><p>Private sources require the owning couple. Shared sources are protected for both traveling couples. Public sources are open to everyone.</p>`,
      next: 'For normal new-document processing, start in Smart Document Intake rather than here.'
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
