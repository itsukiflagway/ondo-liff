/* ONDO コラムページの設定
 * liffId : LINE Developers で作成した LIFF アプリの ID（例：2001234567-AbCdEfGh）
 * oaId   : 公式アカウントのベーシックID（@から始まる）。トークへの送信の予備手段に使う
 * gasUrl : Google Apps Script のウェブアプリの URL（…/exec）。閲覧の計測データの送り先
 * friendlyBrand : 求職者向けデザインで表示するサービス名（本番ではクライアントのサービス名）
 * どちらも空のままでも、ブラウザで記事は表示できます（計測と LINE への送信だけ止まります）
 */
window.ONDO_CONFIG = {
  liffId: '2011959892-pj9lk5AH',
  oaId: '@857kyobz',
  gasUrl: 'https://script.google.com/macros/s/AKfycbwKtjp_YTM3ZyMcWDC33-BmdM57c1JW_4cbJrrZlavfVtF7N8pKx-b4OBgARNhOvnN2Ng/exec',
  friendlyBrand: 'ほいくのみらい相談室'
};
