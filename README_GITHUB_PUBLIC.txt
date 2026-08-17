TEE v3.3.80 — GitHub Public Tester Milestone

PURPOSE
This repository is the GitHub-safe deployable TEE application for tester distribution.
It contains the application code needed to run TEE, including local encrypted-Vault
functionality, plus intentionally Public trip context.

MILESTONE
v3.3.80 — Rail Pass Context Filter / Daily Operations Tester Milestone

CURRENT TEST FOCUS
- Hub usability
- Secure Vault unlock and 30-minute authorized session
- Daily Operations Today/Tomorrow workflow
- Contextual display of authorized secure records after the tester restores their
  encrypted Vault backup locally
- Compact dropdown navigation
- Hotel/date and rail-pass relevance filtering

NOT INCLUDED IN GITHUB
- Encrypted Vault backup files
- Passphrases, recovery keys, migration codes, or credentials
- Private or Shared record values
- Passport / Global Entry source files or images
- Booking confirmations, PNRs, ticket numbers, receipts, payment details,
  private contacts, or protected source-document files
- Local HTTPS server certificates / private keys

HOW PROTECTED DATA WORKS
The published application stores/restores the encrypted Vault locally on each
authorized tester device. Protected trip data is restored separately from the user's
encrypted TEE backup. Do not commit encrypted backup files or protected source files
to this repository.

GITHUB PAGES
The repository root is the deployable app root (index.html is at the Pages root).

VERSION
TEE v3.3.80
