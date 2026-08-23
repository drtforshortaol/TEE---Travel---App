"use strict";
(function(){
  const OUTBOX_KEY='teeSyncOutboxMetaV1';
  const DEVICE_KEY='teeSyncDeviceIdV1';
  const MAX_META=250;
  function uid(){return crypto.randomUUID?crypto.randomUUID():`sync-${Date.now()}-${Math.random().toString(16).slice(2)}`;}
  function deviceId(){
    let id=localStorage.getItem(DEVICE_KEY);
    if(!id){id=uid();localStorage.setItem(DEVICE_KEY,id);}
    return id;
  }
  function read(){
    try{const v=JSON.parse(localStorage.getItem(OUTBOX_KEY)||'[]');return Array.isArray(v)?v:[];}catch{return [];}
  }
  function write(items){localStorage.setItem(OUTBOX_KEY,JSON.stringify(items.slice(-MAX_META)));}
  function recordLocalChange(input={}){
    const action=['upsert','archive','restore'].includes(input.action)?input.action:'upsert';
    const item={
      changeId:uid(),
      deviceId:deviceId(),
      action,
      documentId:String(input.documentId||''),
      target:['coupleA','coupleB','shared'].includes(input.target)?input.target:'shared',
      category:String(input.category||''),
      changedAt:new Date().toISOString(),
      transportState:'local-only'
    };
    const next=read();next.push(item);write(next);
    window.dispatchEvent(new CustomEvent('tee-sync-foundation-changed',{detail:{pending:next.length}}));
    return item;
  }
  function status(){
    const pending=read().length;
    return {version:'3.4.04',deviceId:deviceId(),mode:'local-only',transportConfigured:false,pendingMetadata:pending};
  }
  function clearMetadataAfterSuccessfulFutureSync(changeIds=[]){
    const ids=new Set(changeIds.map(String));
    if(!ids.size)return;
    write(read().filter(x=>!ids.has(String(x.changeId))));
  }
  window.TEESyncFoundationV3404=Object.freeze({recordLocalChange,status,clearMetadataAfterSuccessfulFutureSync});
})();
