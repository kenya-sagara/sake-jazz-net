# SAKE-JAZZ

ビッグバンドジャズと日本酒が出会うライブイベントサイト。  
Astro + GitHub Pages で運用する静的サイトです。

## セットアップ

```bash
npm install
cp .env.example .env   # 実際のキーを記入
npm run dev             # http://localhost:4321
```

## デプロイ

`main` ブランチにプッシュすると GitHub Actions で自動ビルド・デプロイされます。

```bash
git push origin main
```

## イベントの追加

`src/content/events/` に Markdown ファイルを作成します（例: `2026-07-15.md`）。  
フロントマターの書式は既存ファイルを参考にしてください。

## 技術スタック

- [Astro](https://astro.build/) — 静的サイトジェネレータ
- [Stripe Payment Links](https://stripe.com/docs/payment-links) — チケット決済
- GitHub Pages — ホスティング
- GitHub Actions — CI/CD

## 受付運用（サーバなし）

- Stripe購入データをGoogleスプレッドシートへ定期同期する手順:
	[docs/stripe-google-sheets-sync.md](docs/stripe-google-sheets-sync.md)
