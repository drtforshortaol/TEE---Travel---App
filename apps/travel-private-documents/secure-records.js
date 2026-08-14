"use strict";

/*
 * EDITING GUIDE:
 * See 00_ADD_SECURE_RECORDS_HERE_README.txt in this folder.
 * Always add new fields or record types ABOVE the marked placeholder comments.
 */

const SECURE_RECORD_LIBRARY = Object.freeze({
  passport: {
    label: "Passport",
    description: "Identity and passport details.",
    titleKeys: ["holderName", "passportNumber"],
    fields: [
      { key: "holderName", label: "Passport holder", type: "text", sensitivity: "private", required: true },
      { key: "passportNumber", label: "Passport number", type: "text", sensitivity: "hidden", required: true },
      { key: "nationality", label: "Nationality", type: "text", sensitivity: "private" },
      { key: "countryOfIssue", label: "Country of issue", type: "text", sensitivity: "private" },
      { key: "issueDate", label: "Issue date", type: "date", sensitivity: "private" },
      { key: "expirationDate", label: "Expiration date", type: "date", sensitivity: "private" },
      { key: "dateOfBirth", label: "Date of birth", type: "date", sensitivity: "hidden" },
      { key: "placeOfBirth", label: "Place of birth", type: "text", sensitivity: "hidden" },
      { key: "sex", label: "Sex", type: "text", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },
  globalEntry: {
    label: "Global Entry",
    description: "Trusted Traveler / Global Entry identity details.",
    titleKeys: ["holderName", "passid"],
    fields: [
      { key: "holderName", label: "Card holder", type: "text", sensitivity: "private", required: true },
      { key: "passid", label: "PASSID", type: "text", sensitivity: "hidden", required: true },
      { key: "citizenship", label: "Citizenship", type: "text", sensitivity: "private" },
      { key: "dateOfBirth", label: "Date of birth", type: "date", sensitivity: "hidden" },
      { key: "sex", label: "Sex", type: "text", sensitivity: "private" },
      { key: "issueDate", label: "Issue date", type: "date", sensitivity: "private" },
      { key: "expirationDate", label: "Expiration date", type: "date", sensitivity: "private" },
      { key: "cardReference", label: "Card reference", type: "text", sensitivity: "hidden" },
      { key: "cardCode", label: "Card code", type: "text", sensitivity: "hidden" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" }
    ]
  },
  flight: {
    label: "Flight",
    description: "Airline itinerary and booking identifiers.",
    titleKeys: ["airline", "flightNumber", "travelerName"],
    fields: [
      { key: "travelerName", label: "Traveler name", type: "text", sensitivity: "private", required: true },
      { key: "airline", label: "Airline", type: "text", sensitivity: "private", required: true },
      { key: "flightNumber", label: "Flight number", type: "text", sensitivity: "private", required: true },
      { key: "departureDate", label: "Departure date", type: "date", sensitivity: "private" },
      { key: "departureTime", label: "Departure time", type: "time", sensitivity: "private" },
      { key: "departureAirport", label: "Departure airport", type: "text", sensitivity: "private" },
      { key: "arrivalAirport", label: "Arrival airport", type: "text", sensitivity: "private" },
      { key: "confirmationCode", label: "Confirmation code / PNR", type: "text", sensitivity: "hidden" },
      { key: "ticketNumber", label: "Ticket number", type: "text", sensitivity: "hidden" },
      { key: "seatNumber", label: "Seat", type: "text", sensitivity: "private" },
      { key: "frequentFlyerNumber", label: "Frequent-flyer number", type: "text", sensitivity: "hidden" },

      { key: "recordState", label: "Record state", type: "text", sensitivity: "private" },
      { key: "sourceAuthority", label: "Current source authority", type: "text", sensitivity: "private" },
      { key: "sourceUpdatedAt", label: "Source last updated", type: "text", sensitivity: "private" },
      { key: "sourceReference", label: "Current source / reference", type: "textarea", sensitivity: "private" },
      { key: "baselineReference", label: "Baseline / original plan", type: "textarea", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },
  hotel: {
    label: "Hotel",
    description: "Lodging details and reservation identifiers.",
    titleKeys: ["hotelName", "guestName"],
    fields: [
      { key: "guestName", label: "Guest name", type: "text", sensitivity: "private", required: true },
      { key: "hotelName", label: "Hotel name", type: "text", sensitivity: "private", required: true },
      { key: "address", label: "Address", type: "textarea", sensitivity: "private" },
      { key: "checkInDate", label: "Check-in date", type: "date", sensitivity: "private" },
      { key: "checkOutDate", label: "Check-out date", type: "date", sensitivity: "private" },
      { key: "confirmationNumber", label: "Confirmation number", type: "text", sensitivity: "hidden" },
      { key: "phone", label: "Hotel phone", type: "tel", sensitivity: "private" },
      { key: "email", label: "Hotel email", type: "email", sensitivity: "private" },
      { key: "roomType", label: "Room type", type: "text", sensitivity: "private" },
      { key: "paymentStatus", label: "Payment status", type: "text", sensitivity: "private" },
      { key: "accessCode", label: "Door / access code", type: "text", sensitivity: "hidden" },

      { key: "recordState", label: "Record state", type: "text", sensitivity: "private" },
      { key: "sourceAuthority", label: "Current source authority", type: "text", sensitivity: "private" },
      { key: "sourceUpdatedAt", label: "Source last updated", type: "text", sensitivity: "private" },
      { key: "sourceReference", label: "Current source / reference", type: "textarea", sensitivity: "private" },
      { key: "baselineReference", label: "Baseline / original plan", type: "textarea", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },


  rail: {
    label: "Rail",
    description: "Train itinerary, seat details, and booking identifiers.",
    titleKeys: ["operator", "trainNumber", "travelerName"],
    fields: [
      { key: "travelerName", label: "Traveler name", type: "text", sensitivity: "private", required: true },
      { key: "operator", label: "Rail operator", type: "text", sensitivity: "private", required: true },
      { key: "trainNumber", label: "Train number", type: "text", sensitivity: "private" },
      { key: "departureDate", label: "Departure date", type: "date", sensitivity: "private" },
      { key: "departureTime", label: "Departure time", type: "time", sensitivity: "private" },
      { key: "departureStation", label: "Departure station", type: "text", sensitivity: "private", required: true },
      { key: "arrivalDate", label: "Arrival date", type: "date", sensitivity: "private" },
      { key: "arrivalTime", label: "Arrival time", type: "time", sensitivity: "private" },
      { key: "arrivalStation", label: "Arrival station", type: "text", sensitivity: "private", required: true },
      { key: "coach", label: "Coach / carriage", type: "text", sensitivity: "private" },
      { key: "seatNumber", label: "Seat", type: "text", sensitivity: "private" },
      { key: "bookingReference", label: "Booking reference", type: "text", sensitivity: "hidden" },
      { key: "ticketNumber", label: "Ticket number", type: "text", sensitivity: "hidden" },
      { key: "platform", label: "Platform", type: "text", sensitivity: "private" },

      { key: "recordState", label: "Record state", type: "text", sensitivity: "private" },
      { key: "sourceAuthority", label: "Current source authority", type: "text", sensitivity: "private" },
      { key: "sourceUpdatedAt", label: "Source last updated", type: "text", sensitivity: "private" },
      { key: "sourceReference", label: "Current source / reference", type: "textarea", sensitivity: "private" },
      { key: "baselineReference", label: "Baseline / original plan", type: "textarea", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },

  railPass: {
    label: "Rail Pass",
    description: "Eurail / Rail Europe pass credentials kept separately from individual train itinerary segments.",
    titleKeys: ["travelerName", "passType", "passNumber"],
    fields: [
      { key: "travelerName", label: "Traveler name", type: "text", sensitivity: "private", required: true },
      { key: "passType", label: "Pass type", type: "text", sensitivity: "private", required: true },
      { key: "provider", label: "Provider", type: "text", sensitivity: "private" },
      { key: "pnr", label: "PNR / booking reference", type: "text", sensitivity: "hidden" },
      { key: "passNumber", label: "Pass number", type: "text", sensitivity: "hidden", required: true },
      { key: "orderNumber", label: "Rail Europe order", type: "text", sensitivity: "hidden" },
      { key: "validity", label: "Validity / flex details", type: "text", sensitivity: "private" },
      { key: "activationNotes", label: "Activation / use notes", type: "textarea", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      { key: "recordState", label: "Record state", type: "text", sensitivity: "private" },
      { key: "sourceAuthority", label: "Current source authority", type: "text", sensitivity: "private" },
      { key: "sourceUpdatedAt", label: "Source last updated", type: "text", sensitivity: "private" },
      { key: "sourceReference", label: "Current source / reference", type: "textarea", sensitivity: "private" },
      { key: "baselineReference", label: "Baseline / original plan", type: "textarea", sensitivity: "private" },
    ]
  },

  visa: {
    label: "Visa",
    description: "Visa details, validity, and government identifiers.",
    titleKeys: ["country", "visaType", "holderName"],
    fields: [
      { key: "holderName", label: "Visa holder", type: "text", sensitivity: "private", required: true },
      { key: "country", label: "Country", type: "text", sensitivity: "private", required: true },
      { key: "visaType", label: "Visa type", type: "text", sensitivity: "private", required: true },
      { key: "visaNumber", label: "Visa number", type: "text", sensitivity: "hidden" },
      { key: "governmentReference", label: "Government reference number", type: "text", sensitivity: "hidden" },
      { key: "issueDate", label: "Issue date", type: "date", sensitivity: "private" },
      { key: "expirationDate", label: "Expiration date", type: "date", sensitivity: "private" },
      { key: "numberOfEntries", label: "Number of entries", type: "text", sensitivity: "private" },
      { key: "linkedPassport", label: "Linked passport", type: "text", sensitivity: "hidden" },
      { key: "placeOfIssue", label: "Place of issue", type: "text", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },


  activity: {
    label: "Activity / Daily Operation",
    description: "Tours, excursions, planned activities, and day-operation items.",
    titleKeys: ["activityName", "city", "date"],
    fields: [
      { key: "travelerName", label: "Traveler / party", type: "text", sensitivity: "private" },
      { key: "activityName", label: "Activity", type: "text", sensitivity: "private", required: true },
      { key: "city", label: "City / area", type: "text", sensitivity: "private" },
      { key: "date", label: "Date", type: "date", sensitivity: "private", required: true },
      { key: "activityStyle", label: "Activity style", type: "text", sensitivity: "private" },
      { key: "provider", label: "Provider / guide", type: "text", sensitivity: "private" },
      { key: "meetingTime", label: "Meeting / start time", type: "time", sensitivity: "private" },
      { key: "meetingLocation", label: "Meeting / pickup location", type: "textarea", sensitivity: "private" },
      { key: "confirmationNumber", label: "Confirmation / voucher reference", type: "text", sensitivity: "hidden" },
      { key: "recordState", label: "Record state", type: "text", sensitivity: "private" },
      { key: "sourceAuthority", label: "Current source authority", type: "text", sensitivity: "private" },
      { key: "sourceUpdatedAt", label: "Source last updated", type: "text", sensitivity: "private" },
      { key: "sourceReference", label: "Current source / reference", type: "textarea", sensitivity: "private" },
      { key: "baselineReference", label: "Baseline / original plan", type: "textarea", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" }
    ]
  },


  transportation: {
    label: "Transportation / Transfer",
    description: "Airport transfers, private drivers, taxis, shuttles, and other ground transportation.",
    titleKeys: ["provider", "route", "travelerName"],
    fields: [
      { key: "travelerName", label: "Traveler / party", type: "text", sensitivity: "private" },
      { key: "provider", label: "Provider / driver", type: "text", sensitivity: "private", required: true },
      { key: "route", label: "Route / transfer", type: "text", sensitivity: "private", required: true },
      { key: "date", label: "Date", type: "date", sensitivity: "private" },
      { key: "time", label: "Time", type: "time", sensitivity: "private" },
      { key: "confirmationNumber", label: "Confirmation / reference", type: "text", sensitivity: "hidden" },
      { key: "phone", label: "Provider phone", type: "tel", sensitivity: "private" },
      { key: "pickupInstructions", label: "Pickup instructions", type: "textarea", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      { key: "recordState", label: "Record state", type: "text", sensitivity: "private" },
      { key: "sourceAuthority", label: "Current source authority", type: "text", sensitivity: "private" },
      { key: "sourceUpdatedAt", label: "Source last updated", type: "text", sensitivity: "private" },
      { key: "sourceReference", label: "Current source / reference", type: "textarea", sensitivity: "private" },
      { key: "baselineReference", label: "Baseline / original plan", type: "textarea", sensitivity: "private" },
    ]
  },

  phoneData: {
    label: "Phone & Data",
    description: "Trip phone plans, roaming, connectivity, carrier support, and device notes.",
    titleKeys: ["carrier", "travelerName", "planName"],
    fields: [
      { key: "travelerName", label: "Traveler / party", type: "text", sensitivity: "private" },
      { key: "carrier", label: "Carrier", type: "text", sensitivity: "private", required: true },
      { key: "planName", label: "Plan / service", type: "text", sensitivity: "private" },
      { key: "countries", label: "Countries / coverage", type: "textarea", sensitivity: "private" },
      { key: "supportPhone", label: "Carrier support", type: "tel", sensitivity: "private" },
      { key: "roamingInstructions", label: "Roaming / setup instructions", type: "textarea", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" }
    ]
  },

  entryDocument: {
    label: "Travel / Entry Document",
    description: "Entry requirements, applications, approvals, and travel-document references not stored as a passport or visa.",
    titleKeys: ["documentName", "country", "travelerName"],
    fields: [
      { key: "travelerName", label: "Traveler / party", type: "text", sensitivity: "private" },
      { key: "documentName", label: "Document / requirement", type: "text", sensitivity: "private", required: true },
      { key: "country", label: "Country", type: "text", sensitivity: "private" },
      { key: "referenceNumber", label: "Reference number", type: "text", sensitivity: "hidden" },
      { key: "issueDate", label: "Issue date", type: "date", sensitivity: "private" },
      { key: "expirationDate", label: "Expiration date", type: "date", sensitivity: "private" },
      { key: "status", label: "Status", type: "text", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" }
    ]
  },

  rentalCar: {
    label: "Rental Car",
    description: "Rental company, pickup, return, vehicle, and reservation details.",
    titleKeys: ["rentalCompany", "driverName", "pickupLocation"],
    fields: [
      { key: "driverName", label: "Driver name", type: "text", sensitivity: "private", required: true },
      { key: "rentalCompany", label: "Rental company", type: "text", sensitivity: "private", required: true },
      { key: "pickupLocation", label: "Pickup location", type: "text", sensitivity: "private", required: true },
      { key: "pickupDate", label: "Pickup date", type: "date", sensitivity: "private" },
      { key: "pickupTime", label: "Pickup time", type: "time", sensitivity: "private" },
      { key: "returnLocation", label: "Return location", type: "text", sensitivity: "private" },
      { key: "returnDate", label: "Return date", type: "date", sensitivity: "private" },
      { key: "returnTime", label: "Return time", type: "time", sensitivity: "private" },
      { key: "vehicleClass", label: "Vehicle class", type: "text", sensitivity: "private" },
      { key: "fuelPolicy", label: "Fuel policy", type: "text", sensitivity: "private" },
      { key: "reservationNumber", label: "Reservation number", type: "text", sensitivity: "hidden" },
      { key: "confirmationNumber", label: "Confirmation number", type: "text", sensitivity: "hidden" },
      { key: "loyaltyNumber", label: "Loyalty number", type: "text", sensitivity: "hidden" },
      { key: "insuranceOption", label: "Insurance option", type: "text", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },


  medical: {
    label: "Medical",
    description: "Health information, medications, allergies, and emergency treatment details.",
    titleKeys: ["travelerName", "primaryPhysician", "bloodType"],
    fields: [
      { key: "travelerName", label: "Traveler name", type: "text", sensitivity: "private", required: true },
      { key: "primaryPhysician", label: "Primary physician", type: "text", sensitivity: "private" },
      { key: "physicianPhone", label: "Physician phone", type: "tel", sensitivity: "private" },
      { key: "bloodType", label: "Blood type", type: "text", sensitivity: "private" },
      { key: "allergies", label: "Allergies", type: "textarea", sensitivity: "hidden" },
      { key: "currentMedications", label: "Current medications", type: "textarea", sensitivity: "hidden" },
      { key: "medicalConditions", label: "Medical conditions", type: "textarea", sensitivity: "hidden" },
      { key: "emergencyTreatmentNotes", label: "Emergency treatment notes", type: "textarea", sensitivity: "hidden" },
      { key: "organDonorStatus", label: "Organ donor status", type: "text", sensitivity: "private" },
      { key: "insuranceMemberId", label: "Insurance member ID", type: "text", sensitivity: "hidden" },
      { key: "policyNumber", label: "Policy number", type: "text", sensitivity: "hidden" },
      { key: "medicalDocumentReference", label: "Medical document reference / filename", type: "text", sensitivity: "hidden" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },

  travelInsurance: {
    label: "Travel Insurance",
    description: "Travel coverage, assistance contacts, and claim identifiers.",
    titleKeys: ["insuranceCompany", "travelerName", "policyNumber"],
    fields: [
      { key: "travelerName", label: "Traveler name", type: "text", sensitivity: "private", required: true },
      { key: "insuranceCompany", label: "Insurance company", type: "text", sensitivity: "private", required: true },
      { key: "policyNumber", label: "Policy number", type: "text", sensitivity: "hidden" },
      { key: "memberId", label: "Member ID", type: "text", sensitivity: "hidden" },
      { key: "coverageStartDate", label: "Coverage start date", type: "date", sensitivity: "private" },
      { key: "coverageEndDate", label: "Coverage end date", type: "date", sensitivity: "private" },
      { key: "emergencyAssistancePhone", label: "Emergency assistance phone", type: "tel", sensitivity: "private" },
      { key: "claimsPhone", label: "Claims phone", type: "tel", sensitivity: "private" },
      { key: "website", label: "Website", type: "url", sensitivity: "private" },
      { key: "coverageNotes", label: "Coverage notes", type: "textarea", sensitivity: "private" },
      { key: "documentReference", label: "Policy document reference / filename", type: "text", sensitivity: "hidden" },
      { key: "claimReference", label: "Claim reference", type: "text", sensitivity: "hidden" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },

  emergencyContact: {
    label: "Emergency Contact",
    description: "Trusted contacts and preferred ways to reach them.",
    titleKeys: ["contactName", "relationship", "mobilePhone"],
    fields: [
      { key: "contactName", label: "Contact name", type: "text", sensitivity: "private", required: true },
      { key: "relationship", label: "Relationship", type: "text", sensitivity: "private" },
      { key: "mobilePhone", label: "Mobile phone", type: "tel", sensitivity: "private", required: true },
      { key: "alternatePhone", label: "Alternate phone", type: "tel", sensitivity: "private" },
      { key: "email", label: "Email", type: "email", sensitivity: "private" },
      { key: "whatsApp", label: "WhatsApp", type: "text", sensitivity: "private" },
      { key: "signal", label: "Signal", type: "text", sensitivity: "private" },
      { key: "homeAddress", label: "Home address", type: "textarea", sensitivity: "hidden" },
      { key: "preferredLanguage", label: "Preferred language", type: "text", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },


  creditCard: {
    label: "Credit Card",
    description: "Card identification, support contacts, and protected payment details.",
    titleKeys: ["cardNickname", "issuer", "lastFourDigits"],
    fields: [
      { key: "cardNickname", label: "Card nickname", type: "text", sensitivity: "private", required: true },
      { key: "issuer", label: "Issuing bank", type: "text", sensitivity: "private", required: true },
      { key: "cardType", label: "Card type", type: "text", sensitivity: "private" },
      { key: "lastFourDigits", label: "Last four digits", type: "text", sensitivity: "private" },
      { key: "cardholderName", label: "Cardholder name", type: "text", sensitivity: "private" },
      { key: "fullCardNumber", label: "Full card number", type: "text", sensitivity: "hidden" },
      { key: "expirationDate", label: "Expiration date", type: "text", sensitivity: "hidden" },
      { key: "cvv", label: "CVV / security code", type: "text", sensitivity: "hidden" },
      { key: "pinReminder", label: "PIN reminder (not the PIN)", type: "text", sensitivity: "hidden" },
      { key: "customerServicePhone", label: "Customer service phone", type: "tel", sensitivity: "private" },
      { key: "internationalPhone", label: "International assistance phone", type: "tel", sensitivity: "private" },
      { key: "website", label: "Website", type: "url", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },

  loyaltyProgram: {
    label: "Loyalty Program",
    description: "Airline, hotel, rail, and rental-car membership details.",
    titleKeys: ["programName", "provider", "statusLevel"],
    fields: [
      { key: "programName", label: "Program name", type: "text", sensitivity: "private", required: true },
      { key: "provider", label: "Airline / hotel / rail / rental provider", type: "text", sensitivity: "private" },
      { key: "programCategory", label: "Program category", type: "text", sensitivity: "private" },
      { key: "membershipNumber", label: "Membership number", type: "text", sensitivity: "hidden", required: true },
      { key: "statusLevel", label: "Status level", type: "text", sensitivity: "private" },
      { key: "username", label: "Username", type: "text", sensitivity: "hidden" },
      { key: "recoveryNumber", label: "Recovery number", type: "text", sensitivity: "hidden" },
      { key: "customerServicePhone", label: "Customer service phone", type: "tel", sensitivity: "private" },
      { key: "website", label: "Website", type: "url", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },

  bankingCurrency: {
    label: "Banking / Currency",
    description: "Banking, international support, and multi-currency account details.",
    titleKeys: ["bankName", "accountNickname", "currency"],
    fields: [
      { key: "bankName", label: "Bank name", type: "text", sensitivity: "private", required: true },
      { key: "accountNickname", label: "Account nickname", type: "text", sensitivity: "private", required: true },
      { key: "accountType", label: "Account type", type: "text", sensitivity: "private" },
      { key: "currency", label: "Currency", type: "text", sensitivity: "private" },
      { key: "lastFourDigits", label: "Last four digits", type: "text", sensitivity: "private" },
      { key: "fullAccountNumber", label: "Full account number", type: "text", sensitivity: "hidden" },
      { key: "iban", label: "IBAN", type: "text", sensitivity: "hidden" },
      { key: "swiftBic", label: "SWIFT / BIC", type: "text", sensitivity: "hidden" },
      { key: "routingNumber", label: "Routing number", type: "text", sensitivity: "hidden" },
      { key: "customerId", label: "Customer ID", type: "text", sensitivity: "hidden" },
      { key: "internationalSupportPhone", label: "International support phone", type: "tel", sensitivity: "private" },
      { key: "fraudHotline", label: "Fraud hotline", type: "tel", sensitivity: "private" },
      { key: "website", label: "Website", type: "url", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },



  trip: {
    label: "Trip Folder",
    description: "Organizes related secure records for one trip without duplicating their data.",
    titleKeys: ["tripName", "destination"],
    fields: [
      { key: "tripName", label: "Trip name", type: "text", sensitivity: "private", required: true },
      { key: "destination", label: "Destination", type: "text", sensitivity: "private" },
      { key: "startDate", label: "Start date", type: "date", sensitivity: "private" },
      { key: "endDate", label: "End date", type: "date", sensitivity: "private" },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },


  publicReference: {
    label: "Public-Safe Reference",
    description: "Sanitized generic travel guidance that is safe for public export but remains encrypted inside the vault.",
    titleKeys: ["title", "category"],
    fields: [
      { key: "title", label: "Reference title", type: "text", sensitivity: "private", required: true },
      { key: "category", label: "Category", type: "text", sensitivity: "private", required: true },
      { key: "destination", label: "Destination / region", type: "text", sensitivity: "private" },
      { key: "content", label: "Public-safe content", type: "textarea", sensitivity: "private", required: true },
      { key: "sourceNote", label: "TEE source note", type: "text", sensitivity: "private" },
      { key: "notes", label: "Internal notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },


  websiteLogin: {
    label: "Website Login",
    description: "Protected sign-in details for travel websites and online services.",
    titleKeys: ["serviceName", "websiteUrl", "username"],
    fields: [
      { key: "serviceName", label: "Website / service name", type: "text", sensitivity: "private", required: true },
      { key: "websiteUrl", label: "Website URL", type: "url", sensitivity: "private", required: true },
      { key: "username", label: "Username / email", type: "text", sensitivity: "hidden", autocomplete: "username", copy: true },
      { key: "password", label: "Password", type: "password", sensitivity: "secret", required: true, autocomplete: "new-password", copy: true, searchable: false },
      { key: "twoFactorMethod", label: "Two-factor authentication method", type: "text", sensitivity: "private" },
      { key: "recoveryEmail", label: "Recovery email", type: "email", sensitivity: "hidden", copy: true },
      { key: "recoveryPhone", label: "Recovery phone", type: "tel", sensitivity: "hidden", copy: true },
      { key: "backupCodes", label: "Backup codes", type: "textarea", sensitivity: "secret", copy: true, searchable: false },
      { key: "securityReminder", label: "Security-question reminder", type: "text", sensitivity: "secret", searchable: false },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" },

      // ===== ADD NEW FIELDS ABOVE THIS LINE =====
    ]
  },

  structuredDocument: {
    internal: true,
    label: "Structured Document Layer",
    description: "Encrypted Shared or Private layer belonging to a structured TEE source document.",
    titleKeys: ["documentTitle", "layerLabel"],
    fields: [
      { key: "documentId", label: "Structured document ID", type: "text", sensitivity: "hidden", required: true, searchable: false },
      { key: "documentTitle", label: "Document title", type: "text", sensitivity: "private", required: true },
      { key: "layerLabel", label: "Protected layer", type: "text", sensitivity: "private", required: true },
      { key: "category", label: "Category", type: "text", sensitivity: "private" },
      { key: "payloadJson", label: "Structured fields and images", type: "textarea", sensitivity: "secret", required: true, searchable: false },
      { key: "originalReference", label: "Original source reference", type: "text", sensitivity: "hidden", searchable: false },
      { key: "notes", label: "Notes", type: "textarea", sensitivity: "private" }
    ]
  },

  // ===== ADD NEW RECORD TYPES ABOVE THIS LINE =====
});

function getSecureRecordDefinition(type) {
  return SECURE_RECORD_LIBRARY[type] || null;
}

function listSecureRecordTypes() {
  return Object.entries(SECURE_RECORD_LIBRARY)
    .filter(([, definition]) => definition.internal !== true)
    .map(([value, definition]) => ({
      value,
      label: definition.label
    }));
}
