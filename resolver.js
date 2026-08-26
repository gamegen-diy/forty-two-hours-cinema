// GameGen 三層 fallback 資產載入器（vanilla JS 移植版，機制對齊 noskin-starter/src/assets/assetResolver.ts）
// 順序：?style=<皮膚URL> → config/generalConfiguration.json 的 commonPath(isLocal:false 才生效) → common/ → 根目錄
// 因本專案無 build 步驟、引擎是同步呼叫（new Audio()/img.src 直接賦值），採「開機時預先解析一輪、之後同步查表」的做法，
// 而非逐次呼叫都 await——維持與 noskin-starter 相同的「單檔獨立探測、單檔失敗不拖垮整包」語意。
(function () {
  const BASE = (function () {
    const p = location.pathname;
    return p.slice(0, p.lastIndexOf('/') + 1);
  })();

  function withSlash(u) { return u.endsWith('/') ? u : u + '/'; }

  function styleRootFromUrl() {
    const v = new URLSearchParams(location.search).get('style');
    return v ? withSlash(v) : null;
  }

  async function loadGeneralConfiguration() {
    try {
      const res = await fetch(BASE + 'config/generalConfiguration.json', { cache: 'no-store' });
      if (!res.ok) return null;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('text/html')) return null;
      return await res.json();
    } catch (e) { return null; }
  }

  async function candidateRoots() {
    const roots = [];
    const style = styleRootFromUrl();
    if (style) roots.push(style);
    const cfg = await loadGeneralConfiguration();
    if (cfg && cfg.commonPath && cfg.isLocal === false) roots.push(withSlash(cfg.commonPath));
    roots.push(BASE + 'common/', BASE);
    return roots;
  }

  async function probe(url) {
    try {
      let res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
      if (res.status === 405 || res.status === 403) res = await fetch(url, { method: 'GET', cache: 'no-store' });
      if (!res.ok) return false;
      const ct = res.headers.get('content-type') || '';
      return !ct.includes('text/html');
    } catch (e) { return false; }
  }

  async function resolveOne(relativePath) {
    const roots = await candidateRoots();
    for (const root of roots) {
      const url = root + relativePath;
      if (await probe(url)) return url;
    }
    return BASE + 'common/' + relativePath; // 全落空兜底：回本地路徑,讓載入端(img.onerror/audio.onerror)自然接手,不整包崩潰
  }

  window.GG_MUTED = (new URLSearchParams(location.search).get('muted') === '1') || (navigator.webdriver === true);
  window.GG_RESOLVED = {};

  // 開機時預先解析一輪已知相對路徑清單(見 asset_manifest.js),之後 assetUrl() 同步查表。
  // 單檔探測獨立進行(Promise.all 各自 try/catch 過),某檔全落空只影響它自己,不擋其他檔。
  window.GG_warmAssets = async function (relativePaths) {
    const uniq = [...new Set(relativePaths)];
    const pairs = await Promise.all(uniq.map(async (p) => {
      try { return [p, await resolveOne(p)]; }
      catch (e) { return [p, BASE + 'common/' + p]; }
    }));
    pairs.forEach(([p, url]) => { window.GG_RESOLVED[p] = url; });
  };

  window.assetUrl = function (relativePath) {
    return window.GG_RESOLVED[relativePath] || (BASE + 'common/' + relativePath);
  };
})();
