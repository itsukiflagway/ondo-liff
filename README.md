# ondo-liff

ONDO Agent の LINE 内ページ（LIFF）を置くリポジトリ。GitHub Pages で公開する。

## 構成
- `column/index.html` … コラム表示ページ（LIFF）。`?id=記事ID` で記事、ID なしで一覧
- `column/config.js` … LIFF ID と Google Apps Script の URL
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

## 記事 ID の付け方
`職種-大分類-連番`（例：`hoiku-B-01`）。大分類と意思レベルは ONDO のコラム設計（06）に準拠。

## 計測
ページを開いたとき（column_open）、離れたとき（column_read：表示秒数・最大スクロール率）、
導線ボタンを押したとき（column_cta）に、Google Apps Script へ送信する。
