# Ticket-Slot Reception Portal Backup - 2026-07-08

This folder is a local restore point for the implementation where one purchaser remains one card, and the card renders one reception button per purchased ticket.

Saved files:
- `reception_portal.gs`: one card per order row, with `quantity` ticket buttons and per-ticket check-in state in `checkin_slots`.
- `stripe_sync.gs`: Stripe sync using the 17-column `orders` sheet, including `checkin_slots`.

The previous stable row-based restore point remains at:
- `tools/local-backups/working-reception-portal-2026-07-08/`

To restore this version locally, copy these files back to:
- `tools/reception_portal.gs`
- `tools/stripe_sync.gs`

Then paste/deploy them in the Apps Script project if needed.
