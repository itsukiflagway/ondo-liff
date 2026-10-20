# ondo-liff

ONDO Agent の LINE 内ページ（LIFF）を置くリポジトリ。GitHub Pages で公開する。

## 構成
- `column/index.html` … コラム表示ページ（LIFF）。`?id=記事ID` で記事、ID なしで一覧
- `column/config.js` … **会社ごとの設定の対応表**（`ONDO_CLIENTS`：会社 ID → LIFF ID・公式アカウント ID・GAS の URL・サービス名・色）。デモは `demo`
- `column/theme.js` … 表示テーマ（求職者向け／営業向け）と会社ごとの色
- `column/api.js` … GAS との通信（POST → GET 再試行、LINE の ID トークンを自動で付ける、本人確認に失敗したら 1 回だけ再ログイン）
- `column/resume/` `column/booking/` `column/ca/` `column/link/` … 書類づくり・面談予約・CA画面・紐付けページ

## 会社ごとの切り替え
LIFF は会社（プロバイダー）ごとに作るため、ページは「どの会社のアカウントから開かれたか」で設定を切り替える。
1. `column/config.js` の `ONDO_CLIENTS` に会社 ID を追加
2. その会社の LIFF のエンドポイント URL を `https://itsukiflagway.github.io/ondo-liff/column/?c=<会社ID>` にする（LIFF 経由では `?c=` は `liff.state` の中に入って届くので、config.js は両方を見る）
3. ページ内のリンクは `window.ONDO_THEME_QS`（テーマ＋会社 ID）を付け直して会社 ID を引き継ぐ
エンドポイントの `?c=` が実機で通らない場合の予備：`clients/<会社ID>/` にページ一式をコピーし、そこをエンドポイントにする（パスの `/clients/<会社ID>/` でも判別する）。秘密情報はこのリポジトリに置かない（公開される）。
- `columns/index.json` … 記事の一覧（職種・分類・意思レベル・タイトルなど）
- `columns/<記事ID>.md` … 記事本文（簡易 Markdown：`##` `###` `-` `1.` `>` `**強調**` `[リンク](https://…)`）
- `columns/images/` … 記事内の画像。本文に `![説明](images/ファイル名.jpg)` と書く

### グラフの書き方
```
:::chart グラフのタイトル|単位
項目名|数値
項目名|数値
出典：出典名
:::
```

- `column/resume/` … 履歴書・職務経歴書の作成フォーム（LIFF：https://liff.line.me/{LIFF ID}/resume/ で開く）

## 記事 ID の付け方
`職種-大分類-連番`（例：`hoiku-B-01`）。大分類と意思レベルは ONDO のコラム設計（06）に準拠。

## 計測
ページを開いたとき（column_open）、離れたとき（column_read：表示秒数・最大スクロール率）、
導線ボタンを押したとき（column_cta）に、Google Apps Script へ送信する。
