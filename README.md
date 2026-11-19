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

イベントは次の3段階で公開します。開催日が決まったら、`YYYY-MM-DD` を実際の日付に置き換えて進めてください。

### Step 1: Coming soonページを作成

```bash
./new_event.sh YYYY-MM-DD
```

`src/content/events/YYYY-MM-DD.md` が作成されます。開始時刻は19:45、終了時刻は22:00で、会場と通常の進行（19:45受付、20:00乾杯、20:15開演）が入ります。出力されたコマンドでComing soonページを公開します。

Coming soonページの既定画像は `public/happy-flight-jazz-orchestra-2026.jpg` です。記事の `image` には公開URL `/happy-flight-jazz-orchestra-2026.jpg` が設定されます。

```bash
./commit_push.sh "Prepare event page" src/content/events/YYYY-MM-DD.md
```

### Step 2: チケット販売

Stripeでチケットを作成・販売開始し、イベント記事の `tickets` に券種・価格・決済URL（`paymentUrl`）を追加します。更新した記事を公開します。

```bash
./commit_push.sh "Add event tickets" src/content/events/YYYY-MM-DD.md
```

### Step 3: 本番画像・説明文に更新

イベント画像を `public/` に置き、記事の `image` と `description` を本番用に更新します。

```bash
./commit_push.sh "Publish event details" \
	src/content/events/YYYY-MM-DD.md \
	public/YYYYMMDD.jpg
```

`commit_push.sh` は指定したファイルをステージし、差分の概要を表示して確認を求めます。内容を確認して `y` を入力すると commit と push を実行します。これらのスクリプトはローカル専用で、`.git/info/exclude` によりGitHubには含まれません。

## 技術スタック

- [Astro](https://astro.build/) — 静的サイトジェネレータ
- [Stripe Payment Links](https://stripe.com/docs/payment-links) — チケット決済
- GitHub Pages — ホスティング
- GitHub Actions — CI/CD

## 受付運用（サーバなし）

- Stripe購入データをGoogleスプレッドシートへ定期同期する手順:
	[docs/stripe-google-sheets-sync.md](docs/stripe-google-sheets-sync.md)
