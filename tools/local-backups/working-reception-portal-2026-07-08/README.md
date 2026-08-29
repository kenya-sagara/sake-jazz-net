# Working Reception Portal Backup - 2026-07-08

This folder is a local restore point for the Apps Script files after the reception portal was confirmed working again.

Saved files:
- `reception_portal.gs`: row-based reception portal using the 16-column `orders` sheet.
- `stripe_sync.gs`: Stripe sync using the 16-column `orders` sheet.

Not included in this restore point:
- The local mockup HTML.
- Any Script Properties or Google Sheets data.
- Any Apps Script deployment/version metadata.

To restore locally, copy these files back to:
- `tools/reception_portal.gs`
- `tools/stripe_sync.gs`

Then paste/deploy them in the Apps Script project if needed.
