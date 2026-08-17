"use strict";
const DAYS=[{"date":"Sep 15, 2026","type":"International flight day","city":"San Francisco → Istanbul","hotel":"In transit","transport":["Turkish Airlines SFO to Istanbul"],"activities":["International departure"],"weather":"Travel-day layers for airport and overnight flight.","gear":["Passport","Boarding pass / airline confirmation","Medications","Chargers","Travel layer"],"reminders":["Confirm current airline departure time and seats in Secure Vault","Confirm checked baggage allowance","Keep passport, phone and medications in carry-on","Prepare for Istanbul arrival and private transfer tomorrow"],"links":["travel-transportation","travel-essentials","travel-packing"]},{"date":"Sep 16, 2026","type":"Arrival / Today template","city":"Istanbul","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Arrive Istanbul from SFO","Private airport transfer to Istanbul hotel"],"activities":["Settle in","Light neighborhood orientation only if energy allows"],"weather":"Warm Istanbul conditions; light clothes plus travel layer.","gear":["Passport","Hotel confirmation","Phone/data ready","Light jacket for evening"],"reminders":["Confirm next-day Old Town/Bosphorus pickup time","Put passport and essentials in same location","Photo reminder: first hotel / arrival marker"],"links":["travel-itinerary","travel-hotels","travel-transportation","travel-weather-clothing"]},{"date":"Sep 17, 2026","type":"Tour day","city":"Istanbul","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Local/private touring as arranged"],"activities":["Private Istanbul Old Town tour","Bosphorus Cruise"],"weather":"Warm, possible breeze near Bosphorus.","gear":["Comfortable walking shoes","Modest mosque-ready layer","Small umbrella/rain layer","Water"],"reminders":["Check dress requirements for mosques","Charge phone/camera","Carry small cash for tips"],"links":["travel-itinerary","travel-local-knowledge","travel-packing"]},{"date":"Sep 18, 2026","type":"Move day","city":"Cappadocia","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Private transfer Istanbul hotel to airport","Flight Istanbul to Cappadocia","Private transfer to Cappadocia with Underground City tour"],"activities":["Private Cappadocia Underground City Tour"],"weather":"Warmer daytime but cooler/drier than Istanbul.","gear":["Flight documents","Layer for underground/cave areas","Comfortable shoes","Small daypack"],"reminders":["Confirm domestic baggage rules","Keep passport/ID accessible","Prepare for early balloon morning tomorrow"],"links":["travel-transportation","travel-hotels","travel-weather-clothing","travel-packing"]},{"date":"Sep 19, 2026","type":"Early start / Activity day","city":"Cappadocia","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Tour pickup as arranged"],"activities":["Group Sunrise Hot Air Balloon Tour","Private Whirling Dervish Ceremony"],"weather":"Chilly before sunrise; warm daytime.","gear":["Warm layer/fleece","Hat or beanie if needed","Sunglasses","Camera/phone fully charged"],"reminders":["Set alarm and backup alarm","Lay out balloon clothing the night before","Carry tip cash for balloon crew if appropriate"],"links":["travel-weather-clothing","travel-local-knowledge","travel-packing"]},{"date":"Sep 20, 2026","type":"Tour day","city":"Cappadocia","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Private local touring"],"activities":["Private Highlights of Cappadocia Tour"],"weather":"Dry with large day/night temperature swing.","gear":["Layers","Walking shoes","Sunscreen","Water"],"reminders":["Review tomorrow flight plan to Zagreb","Pack most luggage tonight","Confirm airport transfer time"],"links":["travel-itinerary","travel-transportation","travel-hotels"]},{"date":"Sep 21, 2026","type":"Move day","city":"Zagreb","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Transfer to Cappadocia airport","Flight Cappadocia to Zagreb via Istanbul","Private transfer Zagreb airport to hotel"],"activities":["Arrival and settle in Zagreb"],"weather":"Cooler and more autumn-like than Türkiye.","gear":["Passport","Flight confirmations","Light jacket","Rain layer accessible"],"reminders":["Check Croatia arrival requirements","Confirm hotel check-in details","Prepare for Varazdin / Zagreb day tomorrow"],"links":["travel-transportation","travel-hotels","travel-local-knowledge"]},{"date":"Sep 22, 2026","type":"Tour / Leisure day","city":"Zagreb","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Local/private touring"],"activities":["Private Day Trip to Varazdin","Explore Zagreb on your own"],"weather":"Comfortable walking weather, possible showers.","gear":["Comfortable shoes","Light waterproof jacket","Euro cash/card"],"reminders":["Carry small coins for cafe/toilets if needed","Photo reminder: Zagreb/Varazdin details","Confirm Plitvice drive time"],"links":["travel-local-knowledge","travel-weather-clothing","travel-maps-movement"]},{"date":"Sep 23, 2026","type":"Move + park day","city":"Plitvice Lakes","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Private drive Zagreb to Plitvice Lakes"],"activities":["Private Tour of Plitvice Lakes National Park"],"weather":"Cool forest, damp possible, slippery boardwalks possible.","gear":["Grip walking shoes","Rain jacket","Small backpack","Water"],"reminders":["Pack rain layer on top of luggage","Charge camera","Confirm next-day Rovinj drive time"],"links":["travel-weather-clothing","travel-packing","travel-hotels"]},{"date":"Sep 24, 2026","type":"Move day","city":"Rovinj","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Private drive Plitvice Lakes to Rovinj"],"activities":["Arrival in Rovinj","Old town orientation if time allows"],"weather":"Milder Adriatic coastal weather.","gear":["Comfortable shoes for stone streets","Light sweater for waterfront evening","Euro cash/card"],"reminders":["Check parking/luggage transfer logistics","Plan seafood/Istrian dinner","Prepare for hilltop towns tour"],"links":["travel-hotels","travel-maps-movement","travel-local-knowledge"]},{"date":"Sep 25, 2026","type":"Tour day","city":"Rovinj / Istria","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Private local touring"],"activities":["Private Tour of Istria’s Hilltop Towns"],"weather":"Pleasant coastal/Istrian weather; showers possible.","gear":["Walking shoes","Light layer","Small umbrella/rain shell","Camera"],"reminders":["Bring small cash for cafes/markets","Photo reminder: hilltop town views","Check next Pula day plan"],"links":["travel-local-knowledge","travel-weather-clothing"]},{"date":"Sep 26, 2026","type":"Day trip","city":"Pula / Rovinj","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Private day trip to Pula"],"activities":["Private Day Trip to Pula","Pula Arena / Istrian coast focus"],"weather":"Late-summer Adriatic feel; swimming may still be possible.","gear":["Light clothes","Walking shoes or sandals","Swimwear optional","Light jacket evening"],"reminders":["Confirm tickets/entry needs for Pula Arena","Pack for Ljubljana tomorrow","Confirm cross-border pickup time"],"links":["travel-itinerary","travel-packing","travel-weather-clothing"]},{"date":"Sep 27, 2026","type":"Move + activity day","city":"Ljubljana","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Private drive Rovinj to Ljubljana with en-route activity"],"activities":["Private Visit to Postojna Cave"],"weather":"Cooler than coast; cave layer useful.","gear":["Passport for cross-border movement","Cave layer/fleece","Comfortable shoes","Rain layer"],"reminders":["Keep passports handy","Confirm Ljubljana hotel address","Prepare for Bled/Bohinj group trip"],"links":["travel-transportation","travel-hotels","travel-weather-clothing"]},{"date":"Sep 28, 2026","type":"Group trip day","city":"Ljubljana / Bled / Bohinj","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Group trip transportation"],"activities":["Group Trip to Lake Bled & Bohinj Valley"],"weather":"Early autumn; cool mornings and possible rain.","gear":["Layers","Rain jacket","Comfortable walking shoes","Water"],"reminders":["Expect group pickup timing flexibility","Carry snacks if needed","Photo reminder: lake views"],"links":["travel-weather-clothing","travel-packing","travel-maps-movement"]},{"date":"Sep 29, 2026","type":"City tour / Pack night","city":"Ljubljana","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Local walking"],"activities":["Private Walking Tour of Ljubljana"],"weather":"Crisp and walkable; cool evening near river.","gear":["Walking shoes","Light jacket","Umbrella/rain layer"],"reminders":["Pack for rail extension","Confirm Ljubljana to Salzburg plan","Review Eurail/Rail Europe setup"],"links":["travel-transportation","travel-packing","travel-itinerary"]},{"date":"Sep 30, 2026","type":"Move day","city":"Salzburg","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Transfer/rail movement Ljubljana to Salzburg"],"activities":["Rail extension begins","Arrive Salzburg"],"weather":"Cooler alpine/autumn weather.","gear":["Rail pass/app","Luggage strategy","Waterproof jacket","Sweater/fleece"],"reminders":["Activate/check rail pass and reservations","Arrive early at station","Confirm Salzburg hotel location near station"],"links":["travel-transportation","travel-hotels","travel-weather-clothing"]},{"date":"Oct 1, 2026","type":"Free / Local day","city":"Salzburg","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Local walking/transit as needed"],"activities":["Salzburg exploration / optional day trip"],"weather":"Cool mornings/evenings; rain possible.","gear":["Layers","Waterproof jacket","Comfortable shoes","Compact umbrella"],"reminders":["Decide local plan based on weather","Check next rail to Zermatt","Charge all devices"],"links":["travel-weather-clothing","travel-packing","travel-local-knowledge"]},{"date":"Oct 2, 2026","type":"Long rail move","city":"Zermatt","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Train Salzburg to Zermatt"],"activities":["Arrival in car-free Zermatt"],"weather":"True alpine autumn; chilly town and colder mountains.","gear":["Rail pass/reservations","Warm jacket accessible","Luggage strategy","Gloves/hat available"],"reminders":["Plan electric taxi/e-bus if needed","Confirm Airbnb address and check-in","Check mountain weather for tomorrow"],"links":["travel-transportation","travel-hotels","travel-weather-clothing"]},{"date":"Oct 3, 2026","type":"Mountain day","city":"Zermatt / Matterhorn","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Walking / mountain railway / cable car as selected"],"activities":["Gornergrat / Matterhorn Glacier Paradise / Sunnegga options"],"weather":"Cold at elevation; possible snow/ice and strong UV.","gear":["Warm jacket","Gloves/hat","Sunglasses","Waterproof layer","Good shoes"],"reminders":["Choose mountain excursion based on visibility","Start early if weather is clear","Photo reminder: Matterhorn views"],"links":["travel-weather-clothing","travel-maps-movement","travel-packing"]},{"date":"Oct 4, 2026","type":"Move day","city":"Lucerne","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Train Zermatt to Lucerne"],"activities":["Arrive Lucerne","Old town/lake walk if time allows"],"weather":"Cool autumn lake weather; rain/fog possible.","gear":["Rail pass","Light waterproof jacket","Comfortable shoes","Sweater"],"reminders":["Confirm Lucerne hotel confirmation split","Review Zurich move tomorrow","Keep CHF/card accessible"],"links":["travel-hotels","travel-transportation","travel-local-knowledge"]},{"date":"Oct 5, 2026","type":"Short move day","city":"Zurich","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Train Lucerne to Zurich"],"activities":["Zurich arrival","Old Town / Lake Zurich / chocolate/cafes as time allows"],"weather":"Cool/crisp early autumn.","gear":["Layers","Comfortable shoes","Light rain jacket","CHF/card"],"reminders":["Confirm Fred Hotel confirmations","Review Zurich HB to airport plan","Prepare for Zurich to Istanbul flight"],"links":["travel-transportation","travel-hotels","travel-local-knowledge"]},{"date":"Oct 6, 2026","type":"Flight positioning day","city":"Istanbul Airport","hotel":"Protected lodging record — exact hotel details are in Secure Vault","transport":["Zurich HB to Zurich Airport train","Zurich to Istanbul flight"],"activities":["Airport positioning / Yotel stay"],"weather":"Zurich cool; Istanbul Airport warmer but indoor airport can be cool.","gear":["Passport","Flight confirmation","Yotel confirmation","Travel layer"],"reminders":["Confirm baggage through-check rules","Use Zürich Flughafen train","Keep essentials in carry-on"],"links":["travel-transportation","travel-essentials","travel-hotels"]},{"date":"Oct 7, 2026","type":"Return flight day","city":"Istanbul → SFO","hotel":"In transit","transport":["Istanbul to San Francisco flight"],"activities":["Return home"],"weather":"Travel-day layers for plane and airport.","gear":["Passport","Boarding pass","Medications","Chargers","Snacks"],"reminders":["Final passport/boarding pass check","Confirm checked baggage status","Archive notes and lessons learned after arrival"],"links":["travel-essentials","travel-archive","travel-packing"]}];
const TEE_DAILY_CARRY_TODAY_KEY='tee-daily-carry-today-v1';
const TEE_DAILY_CARRY_TOMORROW_KEY='tee-daily-carry-tomorrow-v1';
const PREVIEW_KEY='tee-daily-operations-preview-v374';
const baseTasks=['Review Today and Tomorrow','Review the actionable details shown in this day card','Check weather and clothing layer','Charge phone/watch/battery','Keep needed tickets/ID accessible','Add changes or follow-up to Adaptive Checklist'];
const DAILY_LOCAL_KNOWLEDGE=[
  {country:'Turkey', place:'Istanbul', topic:'Etiquette / Safety / Transit', title:'Istanbul practical behavior', etiquette:['Modern international city, but modest clothing is useful for mosque visits such as Blue Mosque and Hagia Sophia.','Be respectful with photography in religious spaces and follow posted rules.','Bottled water is commonly used by travelers.'], dining:['Breakfast and hotel meals are straightforward; Turkish cuisine and food walks are trip highlights.','Grand Bazaar and Spice Bazaar shopping may involve negotiation.','Coffee, tea, casual meals, and nice dinners vary widely in cost because inflation can change prices quickly.'], transport:['Use Istanbulkart for trams, metro, ferries, and buses.','BiTaksi and Uber/local taxi integration can help, but traffic can be intense.','Ferries are useful and inexpensive for the city experience.'], safety:['Tourist areas are generally safe, but watch for pickpocketing.','Watch for taxi overcharging and aggressive tourist scams in busy areas.','Keep current hotel address and travel coordinator contact accessible.'], checklist:['Dress modestly for mosque days','Carry Istanbulkart plan','Keep small TRY cash','Watch taxi pricing']},
  {country:'Turkey', place:'Cappadocia', topic:'Terrain / Balloon / Local Tips', title:'Cappadocia field notes', etiquette:['Tourist areas are accustomed to international travelers.','Local shopping may involve ceramics, carpets, lamps, wine, and negotiation in some shops.'], dining:['Cards work at hotels, balloon companies, most restaurants, and tourist shops.','Cash is helpful for smaller cafes, tips, drivers, and local shops.'], transport:['Expect private transfers and tour vehicles rather than independent public transit for major activities.','Terrain can be uneven, dusty, hilly, and gravelly.'], safety:['Hot-air balloon flights can be canceled because of wind/weather.','Schedule balloon activity early in the stay when possible.','Cave hotels may involve stairs, uneven stone floors, and cooler interiors.'], checklist:['Warm layer for sunrise','Good walking shoes','Cash for guide/driver tips','Weather backup mindset']},
  {country:'Croatia', place:'Zagreb', topic:'City / Cafe / Safety', title:'Zagreb local rhythm', etiquette:['Zagreb is relaxed and walkable with a strong cafe culture.','People often linger over coffee and conversation.'], dining:['Euro is used; cards are widely accepted.','Carry small cash for markets, bakeries, small cafes, public toilets, and tips.'], transport:['Trams are excellent and inexpensive.','The city center is very walkable around Ban Jelačić Square and Upper Town.'], safety:['Generally very safe and relaxed.','Layer clothing because evenings are cooler than Türkiye.'], checklist:['Carry small euro coins','Plan tram option','Layer for evening','Leave cafe time']},
  {country:'Croatia', place:'Plitvice Lakes', topic:'National Park / Walking / Weather', title:'Plitvice park practicals', etiquette:['Stay on marked paths and boardwalks.','Respect park flow, crowds, and natural areas.'], dining:['Dining inside/near the park is more limited and can be more expensive.','Carry snacks or plan meals ahead if needed.'], transport:['Private drive from Zagreb to Plitvice and onward to Rovinj is part of the trip flow.','Walking distances can be several miles/km depending on route.'], safety:['Boardwalks can be slippery when wet.','Cool mornings, rain, and damp forest conditions are possible.','Good walking shoes with grip are important.'], checklist:['Rain jacket ready','Grip shoes','Water/snacks','Go early if possible']},
  {country:'Croatia', place:'Rovinj / Pula', topic:'Coastal / Dining / Walking', title:'Istria coastal practicals', etiquette:['Rovinj is relaxed, coastal, and romantic; people linger at waterfront cafes and sunset bars.','Pula feels more historic and urban than Rovinj.'], dining:['Seafood, truffles, olive oil, seafood pasta, grilled fish, and local wine are highlights.','Reservations may be useful for popular waterfront dining.'], transport:['Rovinj old town streets are steep in places, and polished stone can be slippery.','Pula historic center is walkable and easier terrain than Rovinj.','Parking in old centers can be limited if a car is involved.'], safety:['Late September can still be warm but evenings by the water are cooler.','Swimming may still be possible, but conditions vary.'], checklist:['Comfortable shoes','Light sweater for harbor evenings','Dinner reservation if needed','Small euro cash']},
  {country:'Slovenia', place:'Ljubljana / Bled / Postojna', topic:'Walkable City / Day Trips', title:'Ljubljana and Slovenia practicals', etiquette:['Ljubljana is clean, relaxed, safe, and very walkable.','The city center is largely pedestrian-only.'], dining:['Riverside cafes, Slovenian wine, pastries, and bakery culture are popular experiences.','Cards are widely accepted, but small cash helps for markets and tiny cafes.'], transport:['Most visitors can explore the center on foot.','Useful base for Lake Bled, Lake Bohinj, and Postojna Cave.'], safety:['Very safe and easygoing overall.','Late September can bring cool evenings and rain.'], checklist:['Walking shoes','Rain layer','Small euro cash','Plan day-trip layers']},
  {country:'Austria', place:'Salzburg', topic:'Formal / Alpine / Old Town', title:'Salzburg practicals', etiquette:['Salzburg feels elegant, musical, alpine, and more formal than Croatia.','Old town is very walkable.'], dining:['Typical foods include schnitzel, strudel, sausages, and hearty alpine cuisine.','In Austria, tipping can be done by stating the rounded total amount.'], transport:['Train arrival from Ljubljana and onward travel planning are important.','Nearby excursions may include Hallstatt, Berchtesgaden, and alpine lake regions.'], safety:['Alpine weather can change quickly.','Rain and chilly evenings are likely by early October.'], checklist:['Waterproof jacket','Sweater/fleece','Small euros','Practice rounded-total tipping']},
  {country:'Switzerland', place:'Zermatt', topic:'Alpine / Car-Free / High Cost', title:'Zermatt mountain practicals', etiquette:['Zermatt is car-free; expect walking, electric taxis, and hotel shuttles.','Mountain areas require slower pacing and weather respect.'], dining:['Switzerland is expensive, especially Zermatt.','Use CHF/card rather than euros when possible.'], transport:['Main access is by train.','Gornergrat and Matterhorn Glacier Paradise are major mountain excursions.'], safety:['Altitude may cause quicker fatigue or mild shortness of breath.','Higher elevations can be below freezing with wind, snow, ice, and strong sun glare.'], checklist:['Warm jacket','Gloves/hat for elevation','Sunglasses','Budget for mountain costs']},
  {country:'Switzerland', place:'Lucerne / Zurich', topic:'Transit / Lake Cities / Costs', title:'Lucerne and Zurich practicals', etiquette:['Swiss cities feel clean, efficient, polished, and easy to navigate.','Tap water is excellent and safe.'], dining:['Costs are high overall.','Tipping is modest because service is included; rounding up is usually enough.'], transport:['Swiss trains and boats are efficient and punctual.','Zurich public transit is excellent; Zurich HB to Zurich Flughafen is direct and quick.'], safety:['Early October can be cool, rainy, or foggy.','Keep layers and rain jacket ready.'], checklist:['Small CHF','Use card for most purchases','Plan Zurich airport train','Rain layer']}
];
const DAILY_MONEY_CONTEXT=[
  {country:'Turkey', city:'Istanbul', currency:'TRY ₺', title:'Istanbul money basics', pay:['Credit cards widely accepted at hotels, restaurants, malls, larger shops, ride apps/taxis.','Carry cash for small cafes, markets/bazaars, public toilets, street food, and smaller taxis.','Use bank ATMs when possible and decline dynamic currency conversion; pay in TRY, not USD.'], tips:['Coffee/quick service: about ₺20–50.','Casual restaurant: about ₺50–150 depending on bill size.','Restaurants: typical 5–10%; upscale can be 10%+.','Bellhop or luggage help: about ₺50–100.','Housekeeping: about ₺50–100 per day.','Taxi: round up modestly.'], local:['Istanbulkart is useful for trams, metro, ferries, and buses.','Traffic can be intense; BiTaksi and Uber/local taxis may be useful.','Watch for pickpocketing, taxi overcharging, and aggressive tourist scams.'], checklist:['Carry small TRY cash','Set cards to pay in TRY','Have Istanbulkart plan','Keep small bills for tips'], links:['travel-transportation','travel-itinerary']},
  {country:'Turkey', city:'Cappadocia', currency:'TRY ₺', title:'Cappadocia tipping and cash', pay:['Cards are accepted at hotels, balloon companies, most restaurants, and tourist shops.','Cash is useful for tips, local shops, taxis, and smaller cafes.'], tips:['Hot-air balloon crew: tip more generously if service is good.','Tour guides/drivers: common to tip for full-day tours.','Restaurants: usually 5–10%; cash tips preferred.','Housekeeping and luggage help: small daily/local cash tips.'], local:['Balloon flights may be canceled due to weather, so schedule early when possible.','Terrain can be dusty, hilly, and uneven.','Negotiating is common in some shops.'], checklist:['Small TRY cash for balloon/tour tips','Cash for driver/guide tips','Tip housekeeping if desired','Keep weather contingency in mind'], links:['travel-weather-clothing','travel-itinerary']},
  {country:'Croatia', city:'Zagreb', currency:'EUR €', title:'Zagreb euro and tipping', pay:['Croatia uses the euro.','Cards are widely accepted in restaurants, hotels, cafes, transit kiosks, and shops.','Carry small cash for markets, bakeries, small cafes, and public toilets.'], tips:['Coffee/cafe: €0.50–2.','Casual meal: €2–5.','Nice dinner: €5–10+ or close to 10%.','Taxi: round up or add €1–3.','Housekeeping: €2–5/day.'], local:['City center is very walkable.','Trams are useful and inexpensive.','Cafe culture is strong; lingering over coffee is normal.'], checklist:['Carry small euro coins','Use card for most meals/hotels','Round up taxis','Keep coins for bathrooms/cafes'], links:['travel-transportation','travel-hotels']},
  {country:'Croatia', city:'Plitvice Lakes', currency:'EUR €', title:'Plitvice cash and park practicals', pay:['Cards are accepted at park entrances, most hotels, restaurants, and souvenir shops.','Cash is useful for smaller cafes, snacks, and tips.'], tips:['Restaurants: 5–10% or round up.','Cafe/coffee: €0.50–2.','Hotel housekeeping: €2–5/day.','Drivers/tour guides: €5–15+ depending on service.'], local:['Dining near/inside the park can be more limited and more expensive.','Go early if possible.','Boardwalks can be slippery when wet.'], checklist:['Cash for snacks/cafe','Small tips for driver/guide','Rain layer ready','Comfortable grip shoes'], links:['travel-weather-clothing','travel-packing']},
  {country:'Croatia', city:'Rovinj / Pula', currency:'EUR €', title:'Istria coastal money notes', pay:['Cards are accepted almost everywhere in tourist areas.','Cash is useful for small bakeries, markets, tips, kiosks, and smaller cafes.'], tips:['Coffee/cafe: €0.50–2.','Casual meal: €2–5.','Nice dinner: 5–10%.','Hotel housekeeping: €2–5/day.','Taxi: round up modestly.','Boat tours/guides: optional small extra for good service.'], local:['Seafood, truffles, olive oil, and local wine are highlights.','Old town stone streets can be steep and slippery.','Parking in old centers can be limited if renting a car.'], checklist:['Carry small euros for markets','Reserve dinner if needed','Tip boat/tour guide if good','Keep card as main payment'], links:['travel-hotels','travel-itinerary']},
  {country:'Slovenia', city:'Ljubljana', currency:'EUR €', title:'Ljubljana money and cafe culture', pay:['Cards are accepted almost everywhere: restaurants, hotels, cafes, transit, and shops.','Carry small cash for markets, tiny cafes, and tips.'], tips:['Coffee/cafe: €0.50–2.','Casual restaurant: €2–5.','Nice dinner: about 5–10%.','Taxi: round up slightly.','Hotel housekeeping: €2–5/day.','Tour guides: small extra for good service.'], local:['City center is largely pedestrian-only and best explored on foot.','Good base for Lake Bled, Lake Bohinj, and Postojna Cave.','Very safe and easygoing overall.'], checklist:['Small euro cash','Check if market/cafe is cash-friendly','Tip guide if helpful','Plan walking shoes'], links:['travel-weather-clothing','travel-itinerary']},
  {country:'Austria', city:'Salzburg', currency:'EUR €', title:'Salzburg tipping style', pay:['Cards are widely accepted at hotels, restaurants, museums, cafes, and shops.','Cash is still useful for small bakeries, market stalls, traditional smaller businesses, and tips.'], tips:['Coffee/cafe: round up or €1–2.','Casual meal: 5–10%.','Nice dinner: around 10%.','Taxi: round up modestly.','Hotel housekeeping: €2–5/day.','Tour guides: €5–15+ depending on tour length.','In Austria, people often state the final amount they want charged; for example, a €47 bill becomes “50.”'], local:['Weather can be cool and rainy by late September/early October.','Old town is walkable.','Nearby excursions include Hallstatt, Berchtesgaden, and alpine lakes.'], checklist:['Carry small euros','Practice “make it 50” tipping style','Pack rain layer','Keep cash for bakeries/markets'], links:['travel-weather-clothing','travel-transportation']},
  {country:'Switzerland', city:'Zermatt', currency:'CHF', title:'Zermatt Swiss franc strategy', pay:['Credit card is easiest almost everywhere.','Carry a little CHF for small purchases, tips, mountain huts, or smaller vendors.','Some places may accept euros, but rates are usually poor and change is often in CHF.'], tips:['Service is already included, so tipping is modest.','Coffee/cafe: round up a little.','Restaurant: round up or 5–10% for excellent service.','Housekeeping: CHF 2–5/day.','Mountain guides/private tours: more if service is exceptional.','Example: CHF 47 bill → CHF 50; CHF 96 dinner → CHF 100–105 is generous.'], local:['Zermatt is car-free; expect walking, electric taxis, and hotel shuttles.','Mountain railways, lifts, food, and drinks are expensive.','Higher elevations can be cold, snowy, and windy.'], checklist:['Carry small CHF','Use card for most purchases','Budget high for lifts/mountain meals','Tip modestly, not US-style'], links:['travel-weather-clothing','travel-transportation']},
  {country:'Switzerland', city:'Lucerne', currency:'CHF', title:'Lucerne lake-city money notes', pay:['Credit cards are accepted almost everywhere: hotels, restaurants, trains/boats, cafes, and shops.','Some places may take euros, but CHF is better.','Carry small CHF for kiosks, tips, and small purchases.'], tips:['Cafe/coffee: round up slightly.','Casual restaurant: small rounding up.','Nice dinner: about 5–10% for especially good service.','Taxi: round up modestly.','Housekeeping: CHF 2–5/day.','Example: CHF 18 snack → CHF 20; CHF 92 dinner → CHF 100 is generous.'], local:['Swiss trains and boats are efficient and punctual.','Tap water is excellent.','Costs are high but usually less extreme than Zermatt.'], checklist:['Small CHF for kiosks','Use card for trains/boats/meals','Round up modestly','Carry rain layer'], links:['travel-transportation','travel-hotels']},
  {country:'Switzerland', city:'Zurich', currency:'CHF', title:'Zurich polished-city money notes', pay:['Cards are accepted almost everywhere: hotels, restaurants, transit, shops, cafes, and museums.','You can travel with little cash, but small CHF is convenient for kiosks, tips, and small purchases.','CHF is preferred even if euros are sometimes accepted.'], tips:['Coffee/snack: round up slightly.','Restaurant: round up or 5–10% for especially good service.','Taxi: small rounding up.','Hotel housekeeping: CHF 2–5/day.','Tour guides/private drivers: optional extra for excellent service.','Example: CHF 46 bill → CHF 50; CHF 97 dinner → CHF 100–105 is generous.'], local:['Zurich is clean, efficient, upscale, and expensive.','Public transit is excellent and easy without a car.','Tap water is excellent.'], checklist:['Small CHF for convenience','Use card for most expenses','Expect high dining/drink prices','Plan Zurich HB to airport train'], links:['travel-transportation','travel-itinerary']}
];
const DAILY_WEATHER_CACHE_KEY='tee-weather-live-cache-v1';
const countryOrder=['Travel / Türkiye','Türkiye','Croatia','Slovenia','Austria','Switzerland','Return Home'];
const relatedNames={'travel-transportation':'Transportation','travel-essentials':'Quick Reference','travel-packing':'Packing','travel-itinerary':'Master Itinerary','travel-hotels':'Hotels','travel-weather-clothing':'Weather + Clothing','travel-local-knowledge':'Local Knowledge','travel-maps-movement':'Maps & Routes','travel-archive':'Trip Archive'};
const relatedPath=id=>({'travel-transportation':'../travel-transportation/index.html','travel-essentials':'../travel-essentials/index.html','travel-packing':'../travel-packing/index.html','travel-itinerary':'../travel-itinerary/index.html','travel-hotels':'../travel-hotels/index.html','travel-weather-clothing':'../travel-weather-clothing/index.html','travel-local-knowledge':'../travel-local-knowledge/index.html','travel-maps-movement':'../travel-maps-movement/index.html','travel-archive':'../travel-archive/index.html'}[id]||'../../index.html');

function parseTripDate(d){const x=new Date(d.date+' 12:00:00');return Number.isNaN(x.getTime())?null:x;}
function ymd(x){return x?`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`:'';}
function countryFor(d){const c=d.city||'';if(/San Francisco → Istanbul/.test(c))return 'Travel / Türkiye';if(/Istanbul → SFO/.test(c))return 'Return Home';if(/Istanbul|Cappadocia/.test(c))return 'Türkiye';if(/Zagreb|Plitvice|Rovinj|Pula|Istria/.test(c))return 'Croatia';if(/Ljubljana|Bled|Bohinj|Postojna/.test(c))return 'Slovenia';if(/Salzburg/.test(c))return 'Austria';if(/Zermatt|Lucerne|Zurich/.test(c))return 'Switzerland';return 'Travel / Türkiye';}
function list(items){return `<ul>${(items||[]).map(x=>`<li>${x}</li>`).join('')}</ul>`;}
function dayKey(d,suffix){return `tee-daily-v372-${ymd(parseTripDate(d))||d.date}-${suffix}`;}
function isInTransitLodging(d){
  return String(d.hotel||'').trim().toLowerCase()==='in transit';
}
function transitLodgingText(d){
  const movement=(d.transport||[]).join(' ');
  if(/San Francisco|SFO/i.test(movement) && /Istanbul/i.test(movement)){
    return 'No hotel stay tonight. Overnight travel from San Francisco to Istanbul.';
  }
  if(/Istanbul/i.test(movement) && /San Francisco|SFO/i.test(movement)){
    return 'No hotel stay tonight. Overnight return travel from Istanbul to San Francisco.';
  }
  return 'No hotel stay tonight. This is an in-transit / overnight travel date.';
}
function matchedHotelRecords(d){
  return groupRecords(daySecureRecords(d),['hotel']);
}
function lodgingSummaryLabel(d){
  if(isInTransitLodging(d))return 'In transit / overnight flight';
  const hotels=matchedHotelRecords(d);
  if(hotels.length===1){
    return hotels[0].title || val(hotels[0],'hotelName') || 'Hotel stay';
  }
  if(hotels.length>1){
    return `${hotels.length} hotel records — review`;
  }
  if(secureSession())return 'Hotel stay — no matched secure record';
  return 'Protected hotel stay';
}
function lodgingBodyHtml(d){
  if(isInTransitLodging(d)){
    return `<p class="transit-lodging"><strong>In transit / overnight flight.</strong> ${esc(transitLodgingText(d))}</p>`;
  }
  return `<p>${esc(d.hotel||'Hotel stay')}</p>${lodgingSecureHtml(d)}`;
}
function safeLodging(d){
  return isInTransitLodging(d) ? transitLodgingText(d) : d.hotel;
}
const DAILY_OPERATIONAL_TYPES=new Set(['flight','hotel','rail','railPass','activity','transportation','rentalCar','structuredDocument']);
const DAILY_IDENTITY_TYPES=new Set(['passport','globalEntry','visa','entryDocument']);
const DAILY_SUPPORT_TYPES=new Set(['travelInsurance','emergencyContact','phoneData','medical']);
const dailyVaultStatus=document.getElementById('dailyVaultStatus');

function secureSession(){return window.TEEVaultSession?.get?.()||null;}
function isoForDay(d){return ymd(parseTripDate(d));}
function val(record,key){return String(record.fields?.find(f=>f.key===key)?.value??'').trim();}
function normalizeIso(v){
  if(!v)return '';
  const m=String(v).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m?`${m[1]}-${m[2]}-${m[3]}`:'';
}
function looseIso(v){
  const raw=String(v??'').trim();
  if(!raw)return '';
  const direct=normalizeIso(raw);
  if(direct)return direct;

  const slash=raw.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/);
  if(slash){
    const year=Number(slash[3])<100?2000+Number(slash[3]):Number(slash[3]);
    return `${year}-${String(Number(slash[1])).padStart(2,'0')}-${String(Number(slash[2])).padStart(2,'0')}`;
  }

  const parsed=new Date(raw);
  if(!Number.isNaN(parsed.getTime())){
    return `${parsed.getFullYear()}-${String(parsed.getMonth()+1).padStart(2,'0')}-${String(parsed.getDate()).padStart(2,'0')}`;
  }
  return '';
}
function fieldText(record){return (record.fields||[]).map(f=>`${f.label||''} ${f.value||''}`).join(' ');}
function recordText(record){return `${record.title||''} ${record.category||''} ${record.typeLabel||''} ${fieldText(record)}`.toLowerCase();}
function dayDateVariants(d){
  const date=parseTripDate(d);
  const monthShort=date.toLocaleString('en-US',{month:'short'});
  const monthLong=date.toLocaleString('en-US',{month:'long'});
  const day=date.getDate();
  const year=date.getFullYear();
  return [
    isoForDay(d).toLowerCase(),
    `${date.getMonth()+1}/${day}/${year}`.toLowerCase(),
    `${date.getMonth()+1}/${day}/${String(year).slice(-2)}`.toLowerCase(),
    `${monthShort} ${day}, ${year}`.toLowerCase(),
    `${monthLong} ${day}, ${year}`.toLowerCase(),
    `${monthShort} ${day}`.toLowerCase(),
    `${monthLong} ${day}`.toLowerCase()
  ];
}
function cityTokensForDay(d){
  return uniqueText(String(d.city||'')
    .replace(/→/g,'/')
    .split(/[\/,()]/)
    .flatMap(part=>part.split(/\s+-\s+/))
    .map(x=>x.trim())
    .filter(x=>x.length>=4)
    .concat([countryFor(d)]))
    .map(x=>x.toLowerCase())
    .filter(x=>!['travel','return home'].includes(x));
}
function anyFieldDateMatches(record,iso){
  return (record.fields||[]).some(field=>looseIso(field.value)===iso);
}
function structuredDocumentMatchesDay(record,d){
  const text=recordText(record);
  if(!text)return false;
  const iso=isoForDay(d);
  if(anyFieldDateMatches(record,iso))return true;
  if(dayDateVariants(d).some(v=>v && text.includes(v)))return true;

  const cityTokens=cityTokensForDay(d);
  const locationHit=cityTokens.some(token=>text.includes(token));
  if(!locationHit)return false;

  // A location-only match must also look travel-operational rather than being a
  // generic reference document.
  return /flight|airline|hotel|lodg|rail|train|transfer|transport|tour|activity|reservation|booking|ticket|pickup|arrival|departure|itinerary|confirmation|voucher|passenger|seat|pnr/i.test(text);
}

function between(iso,start,end){
  if(!iso||!start)return false;
  if(end)return iso>=start && iso<end;
  return iso===start;
}
function esc(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function uniqueText(items){return [...new Set((items||[]).filter(Boolean).map(x=>String(x).trim()).filter(Boolean))];}
function isMovementDay(d){return /move|flight|rail|return|international|positioning|arrival/i.test(`${d.type} ${(d.transport||[]).join(' ')}`);}
function isRailTravelDay(d){
  const context=`${d.type||''} ${(d.transport||[]).join(' ')}`;
  return /\btrain\b|\brail\b|railway|railjet|eurail|tgv|öbb|obb|sbb|station/i.test(context);
}
function isEarlyStartDay(d){return /early|sunrise|balloon/i.test(`${d.type} ${(d.activities||[]).join(' ')}`);}
function countryChanged(idx){
  if(idx<=0)return false;
  return countryFor(DAYS[idx])!==countryFor(DAYS[idx-1]);
}
function needsIdentity(d,idx){
  const text=`${d.type} ${(d.gear||[]).join(' ')} ${(d.reminders||[]).join(' ')}`;
  return isMovementDay(d)||countryChanged(idx)||/passport|identity|\bid\b|entry/i.test(text);
}
function needsSupport(d,idx){return isMovementDay(d)||countryChanged(idx)||/arrival|international|return/i.test(d.type);}

const OPERATIONAL_FIELDS={
  flight:['travelerName','airline','flightNumber','departureDate','departureTime','departureAirport','arrivalAirport','confirmationCode','ticketNumber','seatNumber','frequentFlyerNumber','notes'],
  hotel:['guestName','hotelName','address','checkInDate','checkOutDate','confirmationNumber','phone','email','roomType','paymentStatus','accessCode','notes'],
  rail:['travelerName','operator','trainNumber','departureDate','departureTime','departureStation','arrivalDate','arrivalTime','arrivalStation','coach','seatNumber','bookingReference','ticketNumber','platform','notes'],
  railPass:['travelerName','passType','provider','pnr','passNumber','orderNumber','validity','activationNotes','notes'],
  activity:['travelerName','activityName','city','date','activityStyle','provider','meetingTime','meetingLocation','confirmationNumber','notes'],
  transportation:['travelerName','provider','route','date','time','confirmationNumber','phone','pickupInstructions','notes'],
  rentalCar:['driverName','rentalCompany','pickupLocation','pickupDate','pickupTime','returnLocation','returnDate','returnTime','vehicleClass','fuelPolicy','reservationNumber','confirmationNumber','insuranceOption','notes'],
  passport:['holderName','passportNumber','nationality','countryOfIssue','issueDate','expirationDate','dateOfBirth','notes'],
  globalEntry:['holderName','passid','citizenship','expirationDate','notes'],
  visa:['holderName','country','visaType','visaNumber','governmentReference','issueDate','expirationDate','numberOfEntries','linkedPassport','placeOfIssue','notes'],
  entryDocument:['travelerName','documentName','country','referenceNumber','issueDate','expirationDate','status','notes'],
  travelInsurance:['travelerName','insuranceCompany','policyNumber','memberId','coverageStartDate','coverageEndDate','emergencyAssistancePhone','claimsPhone','website','coverageNotes','notes'],
  emergencyContact:['contactName','relationship','mobilePhone','alternatePhone','email','whatsApp','notes'],
  phoneData:['travelerName','carrier','planName','countries','supportPhone','roamingInstructions','notes'],
  medical:['travelerName','primaryPhysician','physicianPhone','bloodType','allergies','currentMedications','medicalConditions','emergencyTreatmentNotes','insuranceMemberId','policyNumber','notes']
};

function selectedFields(record){
  const allowed=OPERATIONAL_FIELDS[record.type];
  let fields=(record.fields||[]).filter(f=>String(f.value??'').trim()!=='');
  if(allowed){
    const order=new Map(allowed.map((key,i)=>[key,i]));
    fields=fields.filter(f=>order.has(f.key)).sort((a,b)=>order.get(a.key)-order.get(b.key));
  }
  return fields;
}
function secureRecordHtml(record){
  const fields=selectedFields(record);
  const stayDates=record.type==='hotel'
    ? [val(record,'checkInDate'),val(record,'checkOutDate')].filter(Boolean)
    : [];
  const stayBadge=stayDates.length
    ? `<span class="authorized-stay-dates">${esc(stayDates.join(' → '))}</span>`
    : '';
  return `<article class="authorized-record">
    <div class="authorized-record-head"><strong>${esc(record.typeLabel||record.type)}</strong><span>${esc(record.accessScope==='private'?'Private':'Shared')}</span></div>
    <h5>${esc(record.title||record.typeLabel||'Protected record')}</h5>
    ${stayBadge}
    ${fields.length?`<dl>${fields.map(field=>`<dt>${esc(field.label||field.key)}</dt><dd>${esc(field.value)}</dd>`).join('')}</dl>`:'<p class="empty-note">No operational fields are populated.</p>'}
  </article>`;
}
function detailsBlock(title,records,open=true,emptyText='No matching protected records for this day.'){
  if(!secureSession())return '';
  const count=records.length;
  return `<details class="authorized-context-block" ${open?'open':''}>
    <summary><span>${esc(title)}${count?` · ${count}`:''}</span><span class="authorized-state">${open?'Collapse':'Reveal'}</span></summary>
    <div class="authorized-context-body">${count?records.map(secureRecordHtml).join(''):`<p class="empty-note">${esc(emptyText)}</p>`}</div>
  </details>`;
}
function secureRecordMatchesDay(record,d){
  const iso=isoForDay(d);
  if(!iso||!DAILY_OPERATIONAL_TYPES.has(record.type))return false;
  if(record.recordStatus==='deleted')return false;

  if(record.type==='structuredDocument'){
    return structuredDocumentMatchesDay(record,d);
  }

  switch(record.type){
    case 'flight':
      return looseIso(val(record,'departureDate'))===iso ||
             anyFieldDateMatches(record,iso);
    case 'rail':
      return looseIso(val(record,'departureDate'))===iso ||
             looseIso(val(record,'arrivalDate'))===iso ||
             anyFieldDateMatches(record,iso);
    case 'activity':
    case 'transportation':
      return looseIso(val(record,'date'))===iso ||
             anyFieldDateMatches(record,iso);
    case 'hotel': {
      const checkIn=looseIso(val(record,'checkInDate'));
      const checkOut=looseIso(val(record,'checkOutDate'));

      // Hotel stay dates are authoritative.
      // Check-out is exclusive: a hotel checking out today is NOT today's lodging.
      // Do not use anyFieldDateMatches() here because matching the checkout date
      // can incorrectly display both the departing and arriving hotel.
      if(checkIn){
        return between(iso,checkIn,checkOut);
      }

      // If we have a checkout date but no check-in date, there is not enough
      // information to infer the stay safely. Avoid a city-only false match.
      if(checkOut){
        return false;
      }

      // Legacy/fallback records with no usable stay dates may match by location.
      const text=recordText(record);
      return cityTokensForDay(d).some(token=>text.includes(token));
    }
    case 'rentalCar': {
      const pickup=looseIso(val(record,'pickupDate'));
      const drop=looseIso(val(record,'returnDate'));
      return between(iso,pickup,drop)||iso===drop||anyFieldDateMatches(record,iso);
    }
    case 'railPass': {
      // A rail pass is contextual travel support, not a daily transportation item.
      // Never show it on flight-, drive-, tour-, or hotel-only days.
      if(!isRailTravelDay(d))return false;

      const text=recordText(record);
      return anyFieldDateMatches(record,iso) ||
             dayDateVariants(d).some(v=>v&&text.includes(v)) ||
             Boolean(text && /active|valid|trip|eurail|rail europe|pass/.test(text));
    }
    default:return false;
  }
}
function daySecureRecords(d){
  const session=secureSession();
  return session?(session.records||[]).filter(record=>secureRecordMatchesDay(record,d)):[];
}
function recordsOf(types){
  const session=secureSession();
  if(!session)return [];
  const wanted=types instanceof Set?types:new Set(types);
  return (session.records||[]).filter(record=>wanted.has(record.type) && record.recordStatus!=='deleted');
}
function groupRecords(records,types){const wanted=new Set(types);return records.filter(r=>wanted.has(r.type));}
function movementSecureHtml(d){
  const records=daySecureRecords(d);
  return detailsBlock('Authorized transportation details',groupRecords(records,['flight','rail','transportation','rentalCar']),true,'No matching protected transportation record is stored for this day.');
}
function lodgingSecureHtml(d){
  if(isInTransitLodging(d))return '';
  const records=groupRecords(daySecureRecords(d),['hotel']);
  return detailsBlock('Authorized lodging details',records,true,'No matching protected lodging record is stored for this day.');
}
function activitySecureHtml(d){
  const records=groupRecords(daySecureRecords(d),['activity']);
  return records.length?detailsBlock('Authorized activity / reservation details',records,true):'';
}
function railPassSecureHtml(d){
  if(!isRailTravelDay(d))return '';
  const records=groupRecords(daySecureRecords(d),['railPass']);
  return records.length?detailsBlock('Authorized rail-pass details',records,true):'';
}
function structuredSecureHtml(d){
  const records=groupRecords(daySecureRecords(d),['structuredDocument']);
  return records.length
    ? detailsBlock('Additional authorized source details',records,true,'')
    : '';
}
function secureMatchCount(d){return daySecureRecords(d).length;}
function currentTomorrowSecureSummary(){
  const today=DAYS[activeIndex];
  const tomorrow=DAYS[Math.min(activeIndex+1,DAYS.length-1)];
  return {today:secureMatchCount(today),tomorrow:secureMatchCount(tomorrow)};
}

function identitySecureHtml(d,idx){
  if(!needsIdentity(d,idx))return '';
  const records=recordsOf(DAILY_IDENTITY_TYPES);
  return detailsBlock('Authorized identity / entry documents',records,true,'No passport, Global Entry, or entry-document record is available to this authorized profile.');
}
function supportSecureHtml(d,idx,open=false){
  if(!needsSupport(d,idx))return '';
  const records=recordsOf(DAILY_SUPPORT_TYPES);
  return detailsBlock('Authorized emergency / connectivity support',records,open,'No insurance, emergency-contact, or phone/data record is available to this authorized profile.');
}

function weatherLocationForDay(d){
  const city=d.city||'';
  if(/Istanbul/.test(city))return /Airport/.test(city)?'Istanbul Airport':'Istanbul';
  if(/Cappadocia/.test(city))return 'Cappadocia';
  if(/Zagreb/.test(city))return 'Zagreb';
  if(/Plitvice/.test(city))return 'Plitvice Lakes';
  if(/Pula/.test(city))return 'Pula';
  if(/Rovinj|Istria/.test(city))return 'Rovinj';
  if(/Ljubljana|Bled|Bohinj|Postojna/.test(city))return 'Ljubljana';
  if(/Salzburg/.test(city))return 'Salzburg';
  if(/Zermatt|Matterhorn/.test(city))return 'Zermatt / Matterhorn';
  if(/Lucerne/.test(city))return 'Lucerne';
  if(/Zurich/.test(city))return 'Zurich';
  return null;
}
function readJson(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
function cachedWeatherForDay(d){
  const location=weatherLocationForDay(d); if(!location)return null;
  const cache=readJson(DAILY_WEATHER_CACHE_KEY)||{}; const rec=cache[location]; if(!rec?.daily)return null;
  const iso=isoForDay(d); const i=(rec.daily.time||[]).indexOf(iso); if(i<0)return null;
  const day={}; Object.keys(rec.daily).forEach(k=>day[k]=Array.isArray(rec.daily[k])?rec.daily[k][i]:rec.daily[k]);
  return {location,record:rec,day};
}
function weatherHtml(d){
  const wr=cachedWeatherForDay(d);
  if(!wr)return `<div class="weather-context planning"><strong>Planning weather</strong><p>${esc(d.weather)}</p></div>`;
  const day=wr.day;
  const hi=Number(day.temperature_2m_max),lo=Number(day.temperature_2m_min),rain=Number(day.precipitation_probability_max||0),wind=Number(day.wind_speed_10m_max||0);
  const updated=wr.record?.fetchedAt?new Date(wr.record.fetchedAt).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'cached';
  return `<div class="weather-context live"><strong>Cached forecast · ${esc(wr.location)}</strong><p>${Number.isFinite(hi)?Math.round(hi)+'°F':'—'} / ${Number.isFinite(lo)?Math.round(lo)+'°F':'—'} · Rain ${Math.round(rain)}% · Wind ${Math.round(wind)} mph</p><small>Updated ${esc(updated)}. Planning note: ${esc(d.weather)}</small></div>`;
}

function cityMatchScore(dayCity,contextCity){
  const a=(dayCity||'').toLowerCase(),b=(contextCity||'').toLowerCase();
  if(a.includes(b)||b.includes(a))return 10;
  return b.split(/\s*\/\s*|\s+/).filter(x=>x.length>3).reduce((n,x)=>n+(a.includes(x)?1:0),0);
}
function localContextFor(d){
  const c=countryFor(d).replace('Travel / ','').replace('Return Home','Turkey').replace('Türkiye','Turkey');
  const country=c==='Turkey'?'Turkey':c;
  const candidates=DAILY_LOCAL_KNOWLEDGE.filter(x=>x.country===country);
  return candidates.sort((a,b)=>cityMatchScore(d.city,b.place)-cityMatchScore(d.city,a.place))[0]||null;
}
function moneyContextFor(d){
  const c=countryFor(d).replace('Travel / ','').replace('Return Home','Turkey').replace('Türkiye','Turkey');
  const country=c==='Turkey'?'Turkey':c;
  const candidates=DAILY_MONEY_CONTEXT.filter(x=>x.country===country);
  return candidates.sort((a,b)=>cityMatchScore(d.city,b.city)-cityMatchScore(d.city,a.city))[0]||null;
}
function localMoneyHtml(d){
  const local=localContextFor(d),money=moneyContextFor(d);
  if(!local&&!money)return '';
  const localTips=local?uniqueText([...(local.checklist||[]),...(local.safety||[]).slice(0,2)]):[];
  const moneyTips=money?uniqueText([...(money.checklist||[]),...(money.tips||[]).slice(0,2)]):[];
  return `<div class="local-money-context">
    <div><h4>Local knowledge</h4>${local?`<strong>${esc(local.title)}</strong>${list(localTips)}`:'<p>No local note for this stop.</p>'}</div>
    <div><h4>Money / tipping</h4>${money?`<strong>${esc(money.currency)} · ${esc(money.title)}</strong>${list(moneyTips)}`:'<p>No money/tipping note for this stop.</p>'}</div>
  </div>`;
}

function todayCarryItems(d){return uniqueText(['Phone','Wallet / small cash','Water bottle','Portable battery','Essential daily medications',...(d.gear||[])]);}
function tomorrowPrepItems(d,idx){
  const items=[];
  const add=x=>{if(x&&!items.includes(x))items.push(x);};
  if(isMovementDay(d)){
    add('Stage luggage and complete a room sweep tonight.');
    add('Set out passport / required ID and tomorrow’s tickets or booking access.');
    add('Confirm departure, pickup, station / airport, and checkout timing.');
  }
  if(countryChanged(idx)){
    add('Review entry documents, phone/data readiness, local currency, and arrival logistics for the new country.');
  }
  if(isEarlyStartDay(d)){
    add('Set a primary and backup alarm.');
    add('Lay out tomorrow’s clothing and day bag before bed.');
  }
  (d.reminders||[]).forEach(add);
  add('Charge phone, watch, camera, and portable battery.');
  add(`Set out tomorrow’s key gear: ${uniqueText(d.gear||[]).join(', ')}.`);
  return items;
}
function updateDailyVaultStatus(){
  if(!dailyVaultStatus)return;
  if(!window.TEEVaultSession){
    dailyVaultStatus.className='daily-vault-status error';
    dailyVaultStatus.innerHTML='<details class="secure-status-dropdown" open><summary><strong>⚠ Secure context module did not load</strong><span>Details</span></summary><div><p>The Vault may still be authorized, but Daily Operations cannot read that authorization. Return to the Hub and reload TEE; if this remains, the app cache needs repair.</p></div></details>';
    return;
  }
  const session=secureSession();
  if(!session){
    dailyVaultStatus.className='daily-vault-status locked';
    dailyVaultStatus.innerHTML='<details class="secure-status-dropdown"><summary><strong>🔒 Secure context locked</strong><span>Open</span></summary><div><p>No Shared/Private values are displayed. Return to the Hub and unlock the Secure Vault once when you want the complete Today/Tomorrow view.</p></div></details>';
    return;
  }
  const counts=currentTomorrowSecureSummary();
  const total=(session.records||[]).filter(r=>r.recordStatus!=='deleted').length;
  dailyVaultStatus.className='daily-vault-status authorized';
  dailyVaultStatus.innerHTML=`<details class="secure-status-dropdown">
    <summary><strong>🔓 Secure context authorized</strong><span>${esc(window.TEEVaultSession.formatRemaining())} remaining</span></summary>
    <div>
      <p><strong>${esc(session.profileLabel||'Authorized traveler')}</strong> · ${total} secure record${total===1?'':'s'} available · Today matched: <b>${counts.today}</b> · Tomorrow matched: <b>${counts.tomorrow}</b>.</p>
      ${counts.today===0&&counts.tomorrow===0?'<p class="daily-secure-warning">Vault is open, but no protected record has yet been mapped to Today or Tomorrow.</p>':''}
    </div>
  </details>`;
}

function publishCarry(key,d){if(!d)return;localStorage.setItem(key,JSON.stringify({date:d.date,city:d.city,type:d.type,weather:d.weather,gear:d.gear,transport:d.transport,activities:d.activities,reminders:d.reminders}));}

const previewSelect=document.getElementById('previewDateSelect');
const actualBtn=document.getElementById('useActualDateBtn');
const explanation=document.getElementById('testModeExplanation');
const todaySummary=document.getElementById('todaySummary');
const tomorrowSummary=document.getElementById('tomorrowSummary');
const countryMount=document.getElementById('countryMount');
const newTaskInput=document.getElementById('newTaskInput');
const addTaskBtn=document.getElementById('addTaskBtn');
const customTaskMount=document.getElementById('customTaskMount');
let activeIndex=0;
let testMode=false;

function actualIndex(){const now=new Date();now.setHours(12,0,0,0);return DAYS.findIndex(d=>ymd(parseTripDate(d))===ymd(now));}
function defaultIndex(){const actual=actualIndex();if(actual>=0)return actual;const sep16=DAYS.findIndex(d=>d.date==='Sep 16, 2026');return sep16>=0?sep16:0;}
function fillPreview(){previewSelect.innerHTML='';DAYS.forEach((d,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${d.date} — ${d.city}`;previewSelect.appendChild(o);});const saved=Number(localStorage.getItem(PREVIEW_KEY));const actual=actualIndex();if(Number.isInteger(saved)&&saved>=0&&saved<DAYS.length){activeIndex=saved;testMode=true;}else{activeIndex=defaultIndex();testMode=actual<0;}previewSelect.value=String(activeIndex);}
function contextLabel(d,tag){return `${tag} · ${d.date} · ${d.city}`;}
function updateTopContext(){const today=DAYS[activeIndex];const tomorrow=DAYS[Math.min(activeIndex+1,DAYS.length-1)];const actual=actualIndex();todaySummary.textContent=contextLabel(today,'Today');tomorrowSummary.textContent=contextLabel(tomorrow,'Tomorrow');if(testMode){explanation.innerHTML=`<strong>TEST / PREVIEW MODE.</strong> TEE is treating <strong>${today.date}</strong> as Today and <strong>${tomorrow.date}</strong> as Tomorrow. Choose another date to test a different point in the trip.`;}else if(actual>=0){explanation.innerHTML=`<strong>LIVE TRIP DATE.</strong> Today is ${today.date}. Use Preview / Test Today only when you want to look ahead.`;}else{explanation.innerHTML=`Today is outside the trip window. TEE is showing <strong>${today.date}</strong> in preview mode so you can test the app now.`;}publishCarry(TEE_DAILY_CARRY_TODAY_KEY,today);publishCarry(TEE_DAILY_CARRY_TOMORROW_KEY,tomorrow);}
function checklistHtml(items,d,idx,prefix='check'){const unique=uniqueText(items);return `<div class="day-checks">${unique.map((x,i)=>`<label><input type="checkbox" data-check="${idx}-${prefix}-${i}" data-store-suffix="${prefix}-${i}" ${localStorage.getItem(dayKey(d,prefix+'-'+i))==='1'?'checked':''}><span>${esc(x)}</span></label>`).join('')}</div>`;}
function renderChecks(d,idx){return checklistHtml([...baseTasks,...d.reminders],d,idx,'today');}
function renderTomorrowPrep(d,idx){return checklistHtml(tomorrowPrepItems(d,idx),d,idx,'tomorrow');}
function relatedLinks(d){const ids=[...new Set(d.links||[])].filter(id=>id!=='travel-private-documents');if(!ids.length)return '';return `<div class="related-links">${ids.map(id=>`<a href="${relatedPath(id)}">${relatedNames[id]||id.replace('travel-','')}</a>`).join('')}</div>`;}
function opsDropdown(title,body,{open=false,kind='',badge=''}={}){
  if(body===null||body===undefined||String(body).trim()==='')return '';
  const classes=['ops-dropdown',kind].filter(Boolean).join(' ');
  return `<details class="${classes}" ${open?'open':''}>
    <summary>
      <span class="ops-dropdown-title">${esc(title)}</span>
      <span class="ops-dropdown-meta">${badge?`<b>${esc(badge)}</b>`:''}<span class="ops-dropdown-state">${open?'Collapse':'Open'}</span></span>
    </summary>
    <div class="ops-dropdown-body">${body}</div>
  </details>`;
}
function todayOperationalBody(d,idx){
  const dayRecords=daySecureRecords(d);
  const hasActivity=groupRecords(dayRecords,['activity']).length>0;
  const secureCount=dayRecords.length;
  const sourceHtml=structuredSecureHtml(d);
  const supportHtml=supportSecureHtml(d,idx,false);

  return `<div class="day-role-banner today-role">
      <strong>TODAY · Full operational view</strong>
      <span>Open only the topic you need. Authorized secure details stay inside the appropriate dropdown.</span>
    </div>
    <div class="ops-dropdown-list">
      ${opsDropdown('1 · Do first',renderChecks(d,idx),{open:true,kind:'primary',badge:'START HERE'})}
      ${opsDropdown('2 · Schedule / plan',list(d.activities))}
      ${opsDropdown('3 · Transportation',`${list(d.transport)}${movementSecureHtml(d)}${railPassSecureHtml(d)}`,{badge:secureCount?'SECURE READY':''})}
      ${opsDropdown(`4 · Lodging / base — ${lodgingSummaryLabel(d)}`,lodgingBodyHtml(d))}
      ${hasActivity?opsDropdown('5 · Reservations / activities',activitySecureHtml(d)):''}
      ${opsDropdown(`${hasActivity?'6':'5'} · Documents / entry`,identitySecureHtml(d,idx)||'<p class="context-ok">No special identity prompt for this day.</p>')}
      ${opsDropdown(`${hasActivity?'7':'6'} · Weather / clothing`,weatherHtml(d))}
      ${opsDropdown(`${hasActivity?'8':'7'} · Carry today`,list(todayCarryItems(d)))}
      ${opsDropdown(`${hasActivity?'9':'8'} · Local knowledge / money`,localMoneyHtml(d))}
      ${sourceHtml?opsDropdown(`${hasActivity?'10':'9'} · Additional authorized source details`,sourceHtml,{kind:'secure-source',badge:'SECURE'}):''}
      ${supportHtml?opsDropdown(`${hasActivity?'11':'10'} · Emergency / connectivity`,supportHtml,{kind:'support'}):''}
    </div>`;
}
function tomorrowPreparationBody(d,idx){
  const sourceHtml=structuredSecureHtml(d);
  const supportHtml=supportSecureHtml(d,idx,false);
  return `<div class="day-role-banner tomorrow-role">
      <strong>TOMORROW · Preparation view</strong>
      <span>Open only what you need to prepare tonight. Authorized booking details stay available in context.</span>
    </div>
    <div class="ops-dropdown-list">
      ${opsDropdown('1 · Prepare tonight',renderTomorrowPrep(d,idx),{open:true,kind:'primary',badge:'START HERE'})}
      ${opsDropdown('2 · Tomorrow’s schedule',list(d.activities))}
      ${opsDropdown('3 · Tomorrow’s movement',`${list(d.transport)}${movementSecureHtml(d)}${railPassSecureHtml(d)}`)}
      ${opsDropdown(`4 · Tomorrow’s lodging — ${lodgingSummaryLabel(d)}`,lodgingBodyHtml(d))}
      ${opsDropdown('5 · Documents to stage',identitySecureHtml(d,idx)||list(uniqueText((d.gear||[]).filter(x=>/passport|ticket|confirmation|pass|document|id/i.test(x)))))}
      ${opsDropdown('6 · Weather / clothing',weatherHtml(d))}
      ${opsDropdown('7 · Pack / carry',list(uniqueText(d.gear||[])))}
      ${opsDropdown('8 · Local knowledge / money',localMoneyHtml(d))}
      ${sourceHtml?opsDropdown('9 · Additional authorized source details',sourceHtml,{kind:'secure-source',badge:'SECURE'}):''}
      ${supportHtml?opsDropdown(`${sourceHtml?'10':'9'} · Arrival / emergency support`,supportHtml,{kind:'support'}):''}
    </div>`;
}
function futurePlanningBody(d){
  return `<div class="ops-dropdown-list future-dropdowns">
    ${opsDropdown('Plan',list(d.activities))}
    ${opsDropdown('Movement',list(d.transport))}
    ${opsDropdown('Weather',`<p>${esc(d.weather)}</p>`)}
    ${opsDropdown('Gear',list(d.gear))}
  </div>`;
}
function dayDetails(d,idx){
  const today=idx===activeIndex;
  const tomorrow=idx===Math.min(activeIndex+1,DAYS.length-1);
  const status=today?'TODAY':tomorrow?'TOMORROW':'';
  const details=document.createElement('details');
  details.className=`trip-day-dropdown ${today?'today-card':tomorrow?'tomorrow-card':'future-card'}`;
  details.open=today||tomorrow;
  details.dataset.dayIndex=idx;
  const body=today?todayOperationalBody(d,idx):tomorrow?tomorrowPreparationBody(d,idx):futurePlanningBody(d);
  details.innerHTML=`<summary>
    <span class="day-summary-main">
      ${status?`<span class="day-title-label ${status.toLowerCase()}">${status}</span>`:''}
      <strong>${d.date} — ${d.city}</strong>
      <small>${d.type}</small>
    </span>
    ${status?`<span class="day-status ${status.toLowerCase()}">COLLAPSE</span>`:'<span class="day-state">Expand</span>'}
  </summary>
  <div class="day-detail-body">
    ${body}
    <details class="day-notes"><summary>Notes / changes</summary><textarea data-note="${idx}" rows="4" placeholder="Delays, changes, receipts, reminders…">${localStorage.getItem(dayKey(d,'notes'))||''}</textarea></details>
    <details class="day-related"><summary>Related TEE apps</summary>${relatedLinks(d)}</details>
  </div>`;
  details.addEventListener('toggle',()=>{
    const s=details.querySelector('.day-state');
    if(s)s.textContent=details.open?'Collapse':'Expand';
    const statusState=details.querySelector('.day-status');
    if(statusState)statusState.textContent=details.open?'COLLAPSE':'OPEN';
  });
  details.querySelectorAll('.ops-dropdown').forEach(block=>block.addEventListener('toggle',()=>{
    const state=block.querySelector('.ops-dropdown-state');
    if(state)state.textContent=block.open?'Collapse':'Open';
  }));
  details.querySelectorAll('.authorized-context-block').forEach(block=>block.addEventListener('toggle',()=>{
    const state=block.querySelector('.authorized-state');
    if(state)state.textContent=block.open?'Collapse':'Reveal';
  }));
  return details;
}
function renderCountries(){updateDailyVaultStatus();countryMount.innerHTML='';const tomorrowIndex=Math.min(activeIndex+1,DAYS.length-1);const activeCountries=new Set([countryFor(DAYS[activeIndex]),countryFor(DAYS[tomorrowIndex])]);countryOrder.forEach(country=>{const indices=DAYS.map((d,i)=>[d,i]).filter(([d])=>countryFor(d)===country);if(!indices.length)return;const wrap=document.createElement('details');wrap.className='country-dropdown';wrap.open=activeCountries.has(country);const containsToday=indices.some(([,i])=>i===activeIndex);const containsTomorrow=indices.some(([,i])=>i===tomorrowIndex);const flags=[containsToday?'TODAY':'',containsTomorrow?'TOMORROW':''].filter(Boolean).join(' + ');wrap.innerHTML=`<summary><span><strong>${country}</strong><small>${indices[0][0].date} → ${indices[indices.length-1][0].date}</small></span><span class="country-state">${flags||'Expand'}</span></summary><div class="country-days"></div>`;const host=wrap.querySelector('.country-days');indices.forEach(([d,i])=>host.appendChild(dayDetails(d,i)));wrap.addEventListener('toggle',()=>{const state=wrap.querySelector('.country-state');if(!flags)state.textContent=wrap.open?'Collapse':'Expand';});countryMount.appendChild(wrap);});bindDayInputs();}
function bindDayInputs(){countryMount.querySelectorAll('[data-check]').forEach(cb=>cb.addEventListener('change',()=>{const idx=Number(cb.dataset.check.split('-')[0]);localStorage.setItem(dayKey(DAYS[idx],cb.dataset.storeSuffix),cb.checked?'1':'0');}));countryMount.querySelectorAll('textarea[data-note]').forEach(t=>t.addEventListener('input',()=>localStorage.setItem(dayKey(DAYS[Number(t.dataset.note)],'notes'),t.value)));}
function setPreview(index,preview=true){activeIndex=Math.max(0,Math.min(Number(index)||0,DAYS.length-1));testMode=preview;previewSelect.value=String(activeIndex);if(preview)localStorage.setItem(PREVIEW_KEY,String(activeIndex));else localStorage.removeItem(PREVIEW_KEY);updateTopContext();renderCountries();}
previewSelect.addEventListener('change',()=>setPreview(Number(previewSelect.value),true));
actualBtn.addEventListener('click',()=>{const actual=actualIndex();if(actual>=0)setPreview(actual,false);else{testMode=true;localStorage.removeItem(PREVIEW_KEY);activeIndex=defaultIndex();previewSelect.value=String(activeIndex);updateTopContext();renderCountries();}});

function getCustom(){try{return JSON.parse(localStorage.getItem('daily-custom-tasks')||'[]')}catch{return []}}
function setCustom(v){localStorage.setItem('daily-custom-tasks',JSON.stringify(v));}
function renderCustom(){const tasks=getCustom();customTaskMount.innerHTML=tasks.length?'':'<p class="empty-note">No adaptive tasks yet.</p>';tasks.forEach((task,i)=>{const row=document.createElement('label');row.className='custom-task';row.innerHTML=`<input type="checkbox" ${task.done?'checked':''}><span>${task.text}</span><button type="button">Delete</button>`;row.querySelector('input').addEventListener('change',e=>{const t=getCustom();t[i].done=e.target.checked;setCustom(t);});row.querySelector('button').addEventListener('click',()=>{const t=getCustom();t.splice(i,1);setCustom(t);renderCustom();});customTaskMount.appendChild(row);});}
function addTask(){const text=newTaskInput.value.trim();if(!text)return;const t=getCustom();t.push({text,done:false});setCustom(t);newTaskInput.value='';renderCustom();}
addTaskBtn.addEventListener('click',addTask);newTaskInput.addEventListener('keydown',e=>{if(e.key==='Enter')addTask();});

document.querySelectorAll('.top-dropdown').forEach(block=>{
  const state=block.querySelector('.top-dropdown-state');
  const sync=()=>{if(state)state.textContent=block.open?'Collapse':'Open';};
  block.addEventListener('toggle',sync);sync();
});
fillPreview();updateTopContext();renderCustom();renderCountries();
window.addEventListener(window.TEEVaultSession?.eventName||'tee-vault-session-changed',()=>renderCountries());
window.setInterval(()=>{if(window.TEEVaultSession?.isOpen?.())updateDailyVaultStatus();},1000);
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
