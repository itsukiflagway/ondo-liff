/* GAS（サーバー）との通信（コラム以外の LIFF ページで共通）
 * 1) まず POST で送る
 * 2) 応答が JSON でない／「GET に変わって届いた」と返ってきたら、同じ内容を GET（?api=…）で送り直す
 *    ブラウザの状態（PC の Chrome で複数の Google アカウントにログイン中など）によって、
 *    GAS の転送の途中で POST が GET に変わり、内容が届かないことがあるため
 */
(function () {
  const b64url = s => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_');
  async function readJson(res) {
    const t = await res.text();
    try { return JSON.parse(t); } catch (e) { return null; }
  }
  // LINE の ID トークン（本番はサーバーがこれで本人確認する。デモは無くても通る）
  function idToken() { try { return window.liff && liff.isLoggedIn && liff.isLoggedIn() && liff.getIDToken ? (liff.getIDToken() || '') : ''; } catch (e) { return ''; } }
  window.ondoIdToken = idToken;
  function relogin() {
    // トークンの期限切れなどで本人確認に失敗 → LINE にログインし直す（1 回だけ。無限ループを避ける）
    try { if (window.liff && !sessionStorage.getItem('ondo_relogin')) { sessionStorage.setItem('ondo_relogin', '1'); liff.logout(); liff.login({ redirectUri: location.href }); return true; } } catch (e) { /* 続行 */ }
    return false;
  }
  window.ondoApi = async function (url, body) {
    if (!url) throw new Error('サーバーの設定がありません');
    if (body && typeof body === 'object' && !body.key && !body.idToken) { const t = idToken(); if (t) body = Object.assign({ idToken: t }, body); }
    const json = JSON.stringify(body);
    let j = null;
    try {
      j = await readJson(await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: json }));
    } catch (e) { /* 通信エラー → GET で再試行 */ }
    if (j && !j.retryGet) { if (j.relogin && relogin()) return new Promise(() => {}); return j; }
    const q = b64url(json);
    if (q.length > 7000) throw new Error('サーバーに送れませんでした。シークレットウィンドウか、別のブラウザでお試しください');
    j = await readJson(await fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + 'api=' + encodeURIComponent(q)));
    if (!j) throw new Error('サーバーから正しい応答がありませんでした。時間をおいて「更新」してください');
    if (j && j.relogin && relogin()) return new Promise(() => {}); // ログイン画面へ移動するので、この呼び出しは戻らない
    return j;
  };
})();
