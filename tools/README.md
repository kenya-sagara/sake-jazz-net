# Tools Guide

目的: どのファイルが現行運用で、どれがバックアップかをすぐ判別するための案内です。

## いま編集する場所（現行）

- `tools/reception_portal.gs`
- `tools/stripe_sync.gs`

この2ファイルが本番運用のソースです。

## バックアップ（退避版）

- `tools/local-backups/`

`local-backups` 配下は復元用のスナップショットで、通常編集対象ではありません。

## 補助ファイル

- `tools/mockup-reception-portal.html` は UI モック確認用です。

