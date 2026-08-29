# Local Backups Index

このフォルダは復元ポイント置き場です。通常運用では編集しません。

## Active Source (edit here)

- `tools/reception_portal.gs`
- `tools/stripe_sync.gs`

## Backup Folders

- `working-reception-portal-2026-07-08/`
  - 16列 `orders` 版の安定復元ポイント
- `ticket-slots-reception-portal-2026-07-08/`
  - `checkin_slots` を含む17列版の復元ポイント

## Restore Rule

復元するときだけ、必要なファイルを `tools/` にコピーして使います。

