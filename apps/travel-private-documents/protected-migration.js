"use strict";
(function(){
  const enc = new TextEncoder(), dec = new TextDecoder();
  const b64 = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
  async function derive(code,salt,iterations){
    const keyMaterial=await crypto.subtle.importKey('raw',enc.encode(code),'PBKDF2',false,['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(salt),iterations,hash:'SHA-256'},keyMaterial,{name:'AES-GCM',length:256},false,['decrypt']);
  }
  async function loadProtectedMigration(file,code){
    const pkg=JSON.parse(await file.text());
    if(pkg?.format!=='TEE-PROTECTED-MIGRATION-1') throw new Error('Not a TEE protected migration package.');
    const key=await derive(code,pkg.salt,pkg.iterations||310000);
    let plain;
    try { plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64(pkg.iv)},key,b64(pkg.ciphertext)); }
    catch { throw new Error('Migration code is incorrect or the package is damaged.'); }
    const payload=JSON.parse(dec.decode(plain));
    if(payload?.format!=='TEE-PROTECTED-DATA-1') throw new Error('Protected data payload is invalid.');
    setTeeProtectedImportData(payload);
    return payload;
  }
  function boot(){
    const file=document.getElementById('protectedMigrationFile');
    const code=document.getElementById('protectedMigrationCode');
    const button=document.getElementById('loadProtectedMigration');
    const msg=document.getElementById('protectedMigrationMessage');
    if(!file||!code||!button) return;
    button.addEventListener('click',async()=>{
      if(!file.files?.[0]||!code.value.trim()){msg.textContent='Choose the protected migration file and enter its matching private migration code.';return;}
      button.disabled=true; msg.textContent='Decrypting locally…';
      try{const p=await loadProtectedMigration(file.files[0],code.value.trim()); msg.textContent=`Loaded ${p.candidates?.length||0} protected records into the import wizard. Nothing has left this device.`; code.value='';}
      catch(e){msg.textContent=e.message||String(e);} finally{button.disabled=false;}
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
