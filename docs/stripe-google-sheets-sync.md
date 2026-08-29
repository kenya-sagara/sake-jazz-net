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
  [tools/stripe_sync.gs](tools/stripe_sync.gs)
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

## 3.5 イベント切り替え時の実行（Sheetクリア + 日付設定）

イベントが変わるたびに、まず前回分データを消して期間を設定します。

Apps Script の「実行」ボタンからは引数を渡せないため、通常はこちらを実行:

```javascript
run0_syncCurrentEvent()
```

イベント期間は `stripe_sync.gs` 先頭の次の2定数で設定します:

- `CURRENT_EVENT_START_YMD` 例: `2026-07-19`
- `CURRENT_EVENT_END_YMD` 例: `2026-09-16`

2ヶ月後のイベントでは、この2定数の日付だけ更新します。

コードから引数を直接渡すこともできます:

```javascript
run2_syncEventRange("2026-07-19", "2026-09-16")
```

実行時エラー（とくにタイムアウト）が出る場合は2段階で実行:

```javascript
run1_prepareEventRange()
```

```javascript
syncStripeCheckoutSessions()
```

- 形式は `YYYY-MM-DD`
- 上記の関数は「Sheetデータ行クリア + 同期カーソル初期化 + JST期間設定 + 即時同期」を1回で実行します
- 任意期間版を使う場合は `run2_syncEventRange(start, end)` か、`run1_prepareEventRange(start, end)` 実行後に `syncStripeCheckoutSessions` を実行してください

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
