// SINGLE SOURCE OF TRUTH for the test routes.
(function () {
  var ROUTES = [
    { path: 'igraal-new-en',    theme: 'orange', lang: 'en', query: '',      group: 1,
      links: [{ mode: 'base', name: 'iGraal & Shoop Master in English' }] },
    { path: 'igraal-new-fr',    theme: 'orange', lang: 'fr', query: '',      group: 2,
      links: [{ mode: 'test', name: 'iGraal FR Homepage 2.0 + ', bold: '1 minute test' },
              { mode: 'base', name: 'iGraal FR Homepage 2.0' }] },
    { path: 'igraal-legacy-fr', theme: 'orange', lang: 'fr', query: '?v=sq', group: 3,
      links: [{ mode: 'test', name: 'iGraal FR Legacy + ', bold: '1 minute test' },
              { mode: 'base', name: 'iGraal FR Legacy' }] },
    { path: 'shoop-new-de',     theme: 'blue',   lang: 'de', query: '',      group: 4,
      links: [{ mode: 'test', name: 'Shoop Homepage 2.0 + ', bold: '1 minute test' },
              { mode: 'base', name: 'Shoop Homepage 2.0' }] },
    { path: 'shoop-legacy-de',  theme: 'blue',   lang: 'de', query: '?v=sl', group: 5,
      links: [{ mode: 'base', name: 'Shoop Legacy' },
              { mode: 'test', name: 'Shoop Legacy + ', bold: '1 minute test' }] },
    // Standalone comparison pages: their own page, not a config of the prototype.
    { path: 'compare-igraal',   theme: 'orange', lang: 'fr', query: '',      group: 6,
      links: [{ mode: 'base', name: 'iGraal Comparison Page 1 vs Page 2' }] },
    { path: 'compare-shoop',    theme: 'blue',   lang: 'de', query: '',      group: 7,
      links: [{ mode: 'base', name: 'Shoop Comparison Page 1 vs Page 2' }] }
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = ROUTES;
  else window.TEST_ROUTES = ROUTES;
})();
