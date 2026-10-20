/* ONDO の LINE 内ページ共通の設定（会社ごとの対応表）
 *
 * LIFF アプリは会社（プロバイダー）ごとに作るため、ページ側は「どの会社のアカウントから開かれたか」で設定を切り替える。
 * 会社 ID の決め方（上から順に見る）：
 *   1) URL の ?c=<会社ID>（LIFF のエンドポイント URL に ?c=acme のように付ける。LIFF 経由では liff.state の中に入って届くので両方を見る）
 *   2) パスが /clients/<会社ID>/… のとき（1 が実機で通らない場合の予備：ページ一式を clients/<会社ID>/ にコピーして使う）
 *   3) どちらも無ければ demo
 * 各項目：
 *   liffId : その会社の LIFF アプリの ID
 *   oaId   : 公式アカウントのベーシック ID（@から始まる）。トークへの送信の予備手段に使う
 *   gasUrl : その会社の GAS ウェブアプリの URL（…/exec）
 *   friendlyBrand : 求職者向けに表示するサービス名
 *   colors : 任意。求職者向けデザインの色を会社ごとに変えるとき（theme.js が CSS 変数に流し込む）
 * 秘密情報（トークン・合言葉）はここに書かない（このファイルは公開される）
 */
window.ONDO_CLIENTS = {
  demo: {
    liffId: '2011959892-pj9lk5AH',
    oaId: '@857kyobz',
    gasUrl: 'https://script.google.com/macros/s/AKfycbwKtjp_YTM3ZyMcWDC33-BmdM57c1JW_4cbJrrZlavfVtF7N8pKx-b4OBgARNhOvnN2Ng/exec',
    friendlyBrand: 'ほいくのみらい相談室'
  }
  // 例：
  // acme: { liffId: '20xxxxxxxx-xxxxxxxx', oaId: '@xxxxxxx', gasUrl: 'https://script.google.com/macros/s/…/exec', friendlyBrand: '〇〇保育士サポート', colors: { accent: '#2F7BBF', accentSoft: '#E3EEF8' } }
};
(function () {
  var s = location.search;
  var m = /[?&]c=([A-Za-z0-9_-]{1,32})/.exec(s);
  if (!m) { var st = /[?&]liff\.state=([^&]+)/.exec(s); if (st) { try { m = /[?&]c=([A-Za-z0-9_-]{1,32})/.exec(decodeURIComponent(st[1])); } catch (e) { m = null; } } }
  if (!m) { var pm = /\/clients\/([A-Za-z0-9_-]{1,32})\//.exec(location.pathname); if (pm) m = pm; }
  var id = m && window.ONDO_CLIENTS[m[1]] ? m[1] : 'demo';
  var c = window.ONDO_CLIENTS[id] || window.ONDO_CLIENTS.demo || {};
  window.ONDO_CLIENT = id;
  window.ONDO_CLIENT_QS = id === 'demo' ? '' : '&c=' + encodeURIComponent(id);
  window.ONDO_CONFIG = { client: id, liffId: c.liffId || '', oaId: c.oaId || '', gasUrl: c.gasUrl || '', friendlyBrand: c.friendlyBrand || '', colors: c.colors || null };
})();
