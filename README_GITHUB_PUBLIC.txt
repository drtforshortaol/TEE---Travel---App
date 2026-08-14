TEE v3.3.51 — GitHub Public Milestone

PURPOSE
This folder is the GitHub-safe deployable TEE application. It contains the complete application code needed to run TEE, including the local encrypted-vault functionality, plus intentionally Public trip context.

NOT INCLUDED
- Encrypted vault backup files
- .tee37 / .tee49 migration or archive packages
- Passphrases, recovery keys, migration codes, or credentials
- Private or Shared record values
- Passport / Global Entry source files or images
- Booking confirmations, PNRs, ticket numbers, receipts, payment details, private contacts, or protected source documents
- Local HTTPS server certificates / private keys

HOW PROTECTED DATA WORKS
The published application can create or restore the TEE encrypted vault locally on each authorized device. Shared and Private data is imported/restored separately from an encrypted TEE backup. Do not commit those backup files to GitHub.

GITHUB PAGES
Publish the CONTENTS of this folder at the repository root (index.html must be at the Pages root). Keep protected backup files in your chosen secure backup location, not in the repository.

VERSION
TEE v3.3.51 — github-public-milestone
