/* Market movers panels for the Screener page.
   Added alongside screener.js (not inside it) so the original
   file is untouched. Reads the same KT / KTUI globals that
   data.js and app.js already set up. */
   (function () {
    var STOCKS = KT.STOCKS;
    var money = KT.money, big = KT.big, pct = KT.pct, cls = KT.cls;
    var esc = KTUI.esc, avatar = KTUI.avatar;
  
    var mount = document.getElementById('movers');
    if (!mount || !window.KT) return;
  
    var href = function (s) { return 'asset.html?s=' + encodeURIComponent(s.sym); };
  
    function row(s, valueHtml) {
      return '<a class="mv-row" href="' + href(s) + '">' + avatar(s, 28) +
        '<span class="mv-name"><b>' + esc(s.sym) + '</b><small>' + esc(s.name) + '</small></span>' +
        '<span class="mv-val">' + valueHtml + '</span></a>';
    }
  
    function panel(title, list, valueFn) {
      var body = list.length
        ? list.map(function (s) { return row(s, valueFn(s)); }).join('')
        : '<p class="mv-empty">No data.</p>';
      return '<article class="mv-panel">' +
        '<h3>' + esc(title) + '</h3>' +
        '<div class="mv-list">' + body + '</div>' +
        '</article>';
    }
  
    var byChangeDesc = STOCKS.slice().sort(function (a, b) { return b.chg - a.chg; });
    var gainers = byChangeDesc.slice(0, 5);
    var decliners = byChangeDesc.slice(-5).reverse();
    var byValue = STOCKS.slice().sort(function (a, b) { return b.volUsd - a.volUsd; }).slice(0, 5);
    var byVolume = STOCKS.slice().sort(function (a, b) { return b.vol - a.vol; }).slice(0, 5);
  
    mount.innerHTML =
      panel('Top gainers', gainers, function (s) {
        return '<span class="' + cls(s.chg) + '">' + pct(s.chg) + '</span>';
      }) +
      panel('Top decliners', decliners, function (s) {
        return '<span class="' + cls(s.chg) + '">' + pct(s.chg) + '</span>';
      }) +
      panel('Most active by value', byValue, function (s) {
        return '<span>$' + big(s.volUsd) + '</span>';
      }) +
      panel('Most active by volume', byVolume, function (s) {
        return '<span>' + big(s.vol) + ' shares</span>';
      });
  })();