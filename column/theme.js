/* 表示テーマの切り替え（コラム・書類作成ページ共通）
 *  URL に theme=friendly が付いていたら「求職者向けデザイン」にする。
 *  LIFF 経由では最初に liff.state（エンコード済み）に入って届くため、両方を確認する。
 *  ページ内のリンクには theme を付け直すこと（window.ONDO_THEME_QS）。
 */
(function () {
  var s = location.search;
  var friendly = /theme(=|%3D|%253D)friendly/.test(s);
  var cfg = window.ONDO_CONFIG || {};
  window.ONDO_THEME = friendly ? 'friendly' : 'ondo';
  window.ONDO_THEME_QS = friendly ? '&theme=friendly' : '';
  window.ONDO_BRAND = friendly ? (cfg.friendlyBrand || 'ほいくのみらい相談室') : 'ONDO';
  if (!friendly) return;
  document.documentElement.classList.add('t-friendly');
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700&display=swap';
  document.head.appendChild(l);
})();
