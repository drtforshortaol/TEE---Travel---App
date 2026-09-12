"use strict";
(function(){
  if(window.TEESharedFlightRepairV3533)return;
  window.TEESharedFlightRepairV3533=true;

  const TARGETS=[
    {
      flightNumber:"TK2014", departureDate:"2026-09-18",
      fields:{
        travelerName:"Glenn / Virginia / Susan / Michael",
        airline:"Turkish Airlines",
        flightNumber:"TK2014",
        departureDate:"2026-09-18",
        departureTime:"11:00",
        departureAirport:"Istanbul (IST)",
        arrivalAirport:"Kayseri (ASR)",
        confirmationCode:"UZ6IQD",
        recordState:"Confirmed",
        sourceAuthority:"Turkish Airlines electronic tickets",
        sourceReference:"Flight ticket (Istanbul - Kayseri) Glenn/Virginia/Susan/Michael PDFs",
        notes:"Arrival 12:30. Checked baggage 25 kg. Individual tickets: Glenn 2352250822358; Virginia 2352250822357; Susan 2352250822359; Michael 2352250822360."
      }
    },
    {
      flightNumber:"TK2017", departureDate:"2026-09-21",
      fields:{
        travelerName:"Glenn / Virginia / Susan / Michael",
        airline:"Turkish Airlines",
        flightNumber:"TK2017",
        departureDate:"2026-09-21",
        departureTime:"15:10",
        departureAirport:"Kayseri (ASR)",
        arrivalAirport:"Istanbul (IST)",
        confirmationCode:"SYXPI4",
        recordState:"Confirmed",
        sourceAuthority:"Enchanting Travels / Turkish Airlines",
        sourceReference:"Flight ticket (Kayseri - Zagreb).pdf",
        notes:"Arrival 16:45. Economy. Checked baggage 23 kg. Connection in Istanbul approximately 1 hr 45 min. Agency booking code XC5YVK. Segment tickets: Virginia 235-5589487732; Glenn 235-5589487731; Susan 235-5589487730; Michael 235-5589487729."
      }
    },
    {
      flightNumber:"TK1055", departureDate:"2026-09-21",
      fields:{
        travelerName:"Glenn / Virginia / Susan / Michael",
        airline:"Turkish Airlines",
        flightNumber:"TK1055",
        departureDate:"2026-09-21",
        departureTime:"18:30",
        departureAirport:"Istanbul (IST)",
        arrivalAirport:"Zagreb (ZAG)",
        confirmationCode:"SYXPI4",
        recordState:"Confirmed",
        sourceAuthority:"Enchanting Travels / Turkish Airlines",
        sourceReference:"Flight ticket (Kayseri - Zagreb).pdf",
        notes:"Arrival 19:40. Economy. Checked baggage 23 kg. Agency booking code XC5YVK. Segment tickets: Virginia 235-5587857901; Glenn 235-5587857898; Susan 235-5587857899; Michael 235-5587857900."
      }
    }
  ];

  let running=false;
  const text=v=>String(v??"").trim();
  const uuid=()=>{try{return crypto.randomUUID();}catch{return `tee-flight-${Date.now()}-${Math.random().toString(16).slice(2)}`;}};

  function findRecord(records,target){
    return records.find(r=>{
      if(r?.type!=="flight")return false;
      const f=r.fields||{};
      const number=text(f.flightNumber).toUpperCase();
      const date=text(f.departureDate);
      if(number===target.flightNumber&&date===target.departureDate)return true;
      if(number===target.flightNumber&&!date)return true;
      return false;
    })||null;
  }

  function mergeNotes(current,expected){
    const c=text(current), e=text(expected);
    if(!c)return e;
    const markers=e.split(". ").filter(Boolean).slice(0,3);
    if(markers.every(marker=>c.includes(marker)))return c;
    return `${c}\n${e}`;
  }

  async function repair(){
    if(running)return;
    if(typeof getVaultState!=="function"||getVaultState()!=="unlocked")return;
    if(typeof getActiveVaultData!=="function"||typeof persistActiveVaultData!=="function")return;
    running=true;
    try{
      const data=typeof normalizeVaultData==="function"?normalizeVaultData(getActiveVaultData()).data:getActiveVaultData();
      if(!data||!Array.isArray(data.records))return;
      let changed=0,added=0,patched=0;
      const now=new Date().toISOString();
      for(const target of TARGETS){
        let record=findRecord(data.records,target);
        if(!record){
          record={
            recordId:uuid(), type:"flight", createdAt:now, lastModifiedAt:now, recordVersion:1,
            ownerVaultId:typeof getVault==="function"?(getVault()?.id||""):"",
            fields:{...target.fields}, relationships:[], favorite:false,
            tags:["TEE Shared Flight","2026 Europe"], accessScope:"shared", visibilityClass:"shared",
            recordStatus:"active", classificationLocked:true,
            history:typeof createHistoryEntry==="function"?[createHistoryEntry("Recovered","Shared flight record restored from confirmed ticket source",now)]:[]
          };
          data.records.push(record);added++;changed++;continue;
        }
        let recordChanged=false;
        record.fields=record.fields&&typeof record.fields==="object"?record.fields:{};
        for(const [key,value] of Object.entries(target.fields)){
          if(key==="notes"){
            const merged=mergeNotes(record.fields.notes,value);
            if(merged!==record.fields.notes){record.fields.notes=merged;recordChanged=true;}
          }else if(!text(record.fields[key])){
            record.fields[key]=value;recordChanged=true;
          }
        }
        if(record.accessScope!=="shared"){record.accessScope="shared";recordChanged=true;}
        if(record.visibilityClass!=="shared"){record.visibilityClass="shared";recordChanged=true;}
        if(record.recordStatus==="deleted"){record.recordStatus="active";recordChanged=true;}
        record.classificationLocked=true;
        if(recordChanged){
          record.lastModifiedAt=now;
          record.recordVersion=(Number(record.recordVersion)||1)+1;
          record.history=Array.isArray(record.history)?record.history:[];
          if(typeof createHistoryEntry==="function")record.history.push(createHistoryEntry("Recovered","Missing Shared flight details restored from confirmed ticket source",now));
          patched++;changed++;
        }
      }
      if(!changed)return;
      await persistActiveVaultData();
      try{if(typeof publishAuthorizedSession==="function")publishAuthorizedSession({preserveExpiry:true});}catch{}
      try{if(typeof renderRecords==="function")renderRecords();}catch{}
      try{if(typeof renderDocuments==="function")renderDocuments();}catch{}
      try{if(typeof setSecureMessage==="function")setSecureMessage(`Shared flight recovery completed: ${added} restored, ${patched} repaired.`,"success");}catch{}
      document.dispatchEvent(new CustomEvent("tee-shared-flight-repair-complete",{detail:{added,patched}}));
    }catch(error){
      console.error("TEE Shared flight repair failed",error);
      try{if(typeof setSecureMessage==="function")setSecureMessage("TEE could not complete the Shared flight recovery. Your existing Vault was left in place.","error");}catch{}
    }finally{running=false;}
  }

  function schedule(){setTimeout(repair,80);setTimeout(repair,400);}
  window.addEventListener("tee-vault-session-changed",schedule);
  window.addEventListener("pageshow",schedule);
  document.addEventListener("tee-runtime-ready",schedule);
  schedule();
})();
