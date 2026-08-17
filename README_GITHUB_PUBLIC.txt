TEE v3.3.81 — GitHub Public Outside-Tester Milestone

This is the GitHub-safe deployable TEE application for outside testers.

First-run flow:
1. Open TEE.
2. Select Restore Existing TEE if no local Vault exists.
3. Choose the authorized encrypted backup.
4. TEE verifies/restores it locally and returns to the Hub.
5. Select Unlock Vault and enter the authorized couple passphrase.
6. Use Daily Operations and other traveler apps.

Not included in GitHub:
- encrypted Vault backups
- passphrases/recovery keys/credentials
- private/shared record values
- passport or Global Entry source images
- booking confirmations, PNRs, receipts, payment details, protected source files
- local HTTPS certificates/private keys

Protected information is restored separately and remains local to the authorized
browser/device. Do not commit the encrypted backup or protected source files.

VERSION
TEE v3.3.81
