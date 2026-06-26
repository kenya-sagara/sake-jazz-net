# Stripe -> Googleスプレッドシート 半自動連携（Apps Script）

この手順は、サーバを用意せずに Stripe の購入情報を Google スプレッドシートへ定期反映するための運用ガイドです。

## できること

- 購入者名、メール、購入チケット種別、枚数をシートへ自動反映
- 同期済みデータの重複登録を防止
- 5分ごとなどの定期実行

## 1. 事前準備

1. Google スプレッドシートを新規作成
2. メニューの「拡張機能」 -> 「Apps Script」を開く
3. このリポジトリの
   [tools/google-apps-script/stripe_sync.gs](tools/google-apps-script/stripe_sync.gs)
   を貼り付ける
4. Apps Script の「プロジェクトの設定」 -> 「スクリプト プロパティ」に以下を登録

- `STRIPE_SECRET_KEY`: `sk_live_...` もしくは `sk_test_...`
- `SHEET_NAME`: `orders`（任意。未設定時は `orders`）
- `TIMEZONE`: `Asia/Tokyo`（任意。未設定時は `Asia/Tokyo`）
- `PAYMENT_LINK_IDS`: 監視対象を絞る場合のみ。カンマ区切り
  - 例: `plink_aaa,plink_bbb`

## 2. 初回実行

1. `setupSheet` を1回実行（ヘッダー作成）
2. `syncStripeCheckoutSessions` を実行（初回同期）
3. 実行時に表示される権限許可を承認

## 3. 定期実行（トリガー）

1. Apps Script 左メニュー「トリガー」
2. 「トリガーを追加」
3. 関数: `syncStripeCheckoutSessions`
4. イベントのソース: 時間主導型
5. 実行間隔: 5分ごと（または15分ごと）

## 3.5 取得日付範囲を指定する（前回イベント分を除外）

前回イベント分を除外したい場合は、Apps Script で一度だけ次を実行します。

```javascript
setSyncDateRangeJST("2026-06-01", "2026-12-31")
```

関数プルダウンから引数つき関数を直接実行しづらい場合は、ヘルパー関数を使えます。

```javascript
setTrialRange20260517_0518()
```

- 形式は `YYYY-MM-DD`
- JST（+09:00）で範囲指定されます
- 以後の同期はこの範囲内のみを取得します

範囲指定をやめて通常運用に戻す場合:

```javascript
clearSyncDateRange()
```

過去カーソル（前回同期位置）をリセットしたい場合:

```javascript
resetSyncCursor()
```

## 4. シート列の意味

- `session_id`: Stripe Checkout Session ID（注文キー）
- `line_item_id`: 注文明細キー（同一注文で複数行あり）
- `purchased_at`: 購入時刻
- `buyer_name`: 購入者名
- `buyer_email`: 購入者メール
- `payment_link_id`: 使用した Payment Link
- `ticket_name`: チケット名
- `price_id`: Stripe Price ID
- `quantity`: 枚数
- `amount_total`: 注文合計（最小通貨単位）
- `currency`: 通貨
- `payment_status`: 支払状態
- `session_status`: セッション状態
- `checkin_status`: 受付状態（手動運用列）
- `checkin_at`: 受付時刻（手動運用列）
- `notes`: 備考（手動運用列）

## 5. 当日受付の運用ルール（最小）

1. `buyer_email` または `buyer_name` で検索
2. 対象行の `checkin_status` を `checked_in` に更新
3. 時刻を `checkin_at` に入力

## 6. 注意点

- 同伴者の個別名は Stripe 標準情報だけでは取得できません
- 返金管理まで厳密に行う場合は、後続で refund 同期処理を追加してください
- `STRIPE_SECRET_KEY` はシートやコード上に直接書かず、必ずスクリプトプロパティに保存してください
