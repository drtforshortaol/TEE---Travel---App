"use strict";
(function(){
  if(typeof PUBLIC_CONTEXT==='undefined' || !Array.isArray(PUBLIC_CONTEXT)) return;
  const find=title=>PUBLIC_CONTEXT.find(item=>item.title===title);

  const arrival=find('Istanbul arrival transfer');
  if(arrival){
    arrival.summary='Arrive IST about 17:40. After immigration and luggage, meet the Enchanting Travels representative / driver at Exit Gate 14. Allow roughly 45–60 minutes to clear the airport; if exit takes more than about one hour, contact Puneet so the driver / parking can be updated.';
  }

  const cappadocia=find('Istanbul → Cappadocia');
  if(cappadocia){
    cappadocia.summary='08:00 hotel pickup for Istanbul Airport, Turkish Airlines flight to Kayseri, then meet the driver in the arrival hall. Virginia / Vicki is the lead traveler name. Continue with an approximately 4-hour Underground City tour before hotel check-in; luggage stays with the vehicle and meals are not included.';
  }

  const zagreb=find('Cappadocia → Zagreb');
  if(zagreb){
    zagreb.summary='Approximately 12:15 pickup for Kayseri airport. TK2017 Kayseri → Istanbul, then change aircraft for TK1055 Istanbul → Zagreb. Layover is about 1 hr 45 min. Checked baggage should be through-checked to Zagreb, with no retrieval/recheck planned in Istanbul. Zagreb arrival is about 19:40, followed by private hotel transfer.';
  }

  const salzburg=find('Ljubljana → Salzburg');
  if(salzburg){
    salzburg.summary='07:10 hotel pickup / transfer to Ljubljana train station. Ljubljana 07:42 → Villach Hbf 09:22, INT 318; Villach Hbf 10:32 → Salzburg Hbf 12:53, IC 796. Keep the separately issued Villach→Salzburg paper reservation/ticket accessible.';
  }

  try{ if(typeof renderProtectedContext==='function') renderProtectedContext(); }catch{}
})();
