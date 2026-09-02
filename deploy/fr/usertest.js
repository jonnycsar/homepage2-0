(function () {
  var SERIF = "'New Spirit', Newsreader, serif";
  var SANS = "Inter, sans-serif";
  var APPLY = /^(apply|anwenden|appliquer)$/i;
  var ON = false;
  var START = (window.__usertestStart || './usertest-start.html');
  var ROUTES = window.TEST_ROUTES || [];
  // Deploys live in a subfolder (…/fr/), so route links and reloads resolve
  // against this page's directory rather than the domain root.
  var DIR = location.pathname.replace(/[^/]*$/, '');

  // "See" jumps straight into the selected config: skip the spinner for that one
  // load only (normal navigation, URLs and Apply keep the loader).
  try {
    if (sessionStorage.getItem('usertest-nospin') === '1') {
      sessionStorage.removeItem('usertest-nospin');
      var sk = document.createElement('style');
      sk.textContent = '[data-om-boot]{display:none !important}';
      (document.head || document.documentElement).appendChild(sk);
    }
  } catch (e) {}
  var copy = window.usertestCopy ? window.usertestCopy() : { t2: "Time's up!", b2: "That's all for this task. Please return to the survey to continue answering the questions." };

  function modal(title, body) {
    var wrap = document.createElement('div');
    wrap.setAttribute('data-usertest-modal', '');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:#000;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;';
    var card = document.createElement('div');
    card.style.cssText = 'width:100%;max-width:320px;background:#fff;border-radius:24px;padding:36px 28px;box-sizing:border-box;display:flex;flex-direction:column;gap:16px;align-items:center;text-align:center;';
    var h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-family:' + SERIF + ';font-weight:500;font-size:26px;line-height:1.15;letter-spacing:-.022em;color:rgb(13,13,13);text-wrap:pretty;';
    var p = document.createElement('div');
    p.textContent = body;
    p.style.cssText = 'font-family:' + SANS + ';font-weight:500;font-size:14px;line-height:20px;color:rgb(60,54,52);text-wrap:pretty;';
    card.appendChild(h); card.appendChild(p);
    wrap.appendChild(card);
    document.body.appendChild(wrap);
  }

  var running = false;
  try { running = sessionStorage.getItem('usertest') === 'running'; } catch (e) {}
  if (running) {
    try { sessionStorage.removeItem('usertest'); } catch (e) {}
    var waited = 0;
    (function waitForHero() {
      var ov = document.querySelector('[data-om-boot]');
      if (ov && getComputedStyle(ov).display === 'none') ov = null;
      var hero = document.querySelector('[data-cover]');
      var ready = !ov && hero && hero.getBoundingClientRect().height > 200;
      if (!ready && waited < 25000) { waited += 120; return setTimeout(waitForHero, 120); }
      setTimeout(function () { modal(copy.t2, copy.b2); }, 15000);
    })();
  }

  function findApply() {
    var els = document.querySelectorAll('div');
    for (var i = els.length - 1; i >= 0; i--) {
      var e = els[i];
      if (e.children.length === 0 && APPLY.test((e.textContent || '').trim())) return e;
    }
    return null;
  }

  function links() {
    var out = [];
    ROUTES.forEach(function (r) {
      (r.links || []).forEach(function (l, i) {
        out.push({
          name: l.name, bold: l.bold, divider: i === 0 && r.group > 1,
          theme: r.theme, lang: r.lang, query: r.query, test: l.mode === 'test',
          url: location.origin + DIR + r.path + (l.mode === 'test' ? '?test=true' : (r.links.length > 1 ? '?test=false' : ''))
        });
      });
    });
    return out;
  }

  // Labels are painted as CSS generated content: there are no text nodes for
  // the page's brand-masking pass to rewrite, so they render final on the first
  // paint with no flicker and no delayed patch-up.
  function labelCss() {
    var css = '';
    links().forEach(function (l, i) {
      var q = function (s) { return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'; };
      css += '[data-usertest-label="' + i + '"]::before{content:' + q(l.name) + ';}';
      if (l.bold) css += '[data-usertest-label="' + i + '"]::after{content:' + q(l.bold) + ';font-weight:700;}';
    });
    return css;
  }

  function ensureLabelCss() {
    var st = document.getElementById('usertest-label-css');
    if (!st) {
      st = document.createElement('style');
      st.id = 'usertest-label-css';
      (document.head || document.documentElement).appendChild(st);
    }
    var css = labelCss();
    if (st.textContent !== css) st.textContent = css;
  }

  // "See" navigates to the selected config so it lands in exactly the state its
  // Test URL produces; the spinner is suppressed for that load (see top), so it
  // is the fast path without re-running the app's own switcher.
  function makeSection() {
    var box = document.createElement('div');
    box.setAttribute('data-usertest-urls', '');
    box.style.cssText = 'border-top:1px solid rgb(240,236,235);margin-top:8px;padding-top:12px;display:flex;flex-direction:column;gap:6px;';
    var t = document.createElement('div');
    t.textContent = 'Test URLs';
    t.style.cssText = 'font-family:' + SANS + ';font-weight:600;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:rgba(13,13,13,.45);';
    box.appendChild(t);
    links().forEach(function (l, idx) {
      if (l.divider) {
        var hr = document.createElement('div');
        hr.style.cssText = 'height:1px;background:rgb(240,236,235);margin:4px 0;';
        box.appendChild(hr);
      }
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:2px 0;';
      var a = document.createElement('a');
      a.href = l.url;
      a.setAttribute('data-usertest-label', String(idx));
      a.style.cssText = 'font-family:' + SANS + ';font-weight:500;font-size:12px;line-height:16px;color:rgb(60,54,52);text-decoration:none;flex:1 1 auto;min-width:0;white-space:normal;overflow-wrap:break-word;text-wrap:pretty;';
      var cp = document.createElement('div');
      cp.textContent = 'Copy';
      cp.style.cssText = 'flex-shrink:0;margin-top:1px;font-family:' + SANS + ';font-weight:600;font-size:11px;color:rgb(13,13,13);border:1px solid rgb(228,224,222);border-radius:999px;padding:3px 10px;cursor:pointer;';
      cp.addEventListener('click', function (e) {
        e.stopPropagation(); e.preventDefault();
        var done = function () { cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy'; }, 1200); };
        if (navigator.clipboard) navigator.clipboard.writeText(l.url).then(done, done);
        else { var ta = document.createElement('textarea'); ta.value = l.url; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (err) {} ta.remove(); done(); }
      });
      var se = document.createElement('div');
      se.textContent = 'See';
      se.style.cssText = cp.style.cssText;
      se.addEventListener('click', function (e) {
        e.stopPropagation(); e.preventDefault();
        try {
          localStorage.setItem('igraal-theme', l.theme);
          localStorage.setItem('igraal-lang', l.lang);
        } catch (err) {}
        // The app lives at the root (or at a local .html file); the test routes
        // are redirect stubs, so reloading one would drop l.query and land on New.
        var base = /\.html?$/.test(location.pathname) ? location.pathname : DIR;
        var here = base + l.query;
        // A test link has to start from the black modal, so it navigates.
        if (l.test) {
          try { sessionStorage.setItem('usertest-nospin', '1'); } catch (err) {}
          location.replace(START + '?back=' + encodeURIComponent(here));
          return;
        }
        try { sessionStorage.removeItem('usertest'); } catch (err) {}
        try { sessionStorage.setItem('usertest-nospin', '1'); } catch (err) {}
        location.replace(here);
      });
      var op = document.createElement('a');
      op.href = l.url; op.target = '_blank'; op.rel = 'noopener'; op.title = 'Open in new tab';
      op.style.cssText = 'flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;width:26px;height:24px;border:1px solid rgb(228,224,222);border-radius:999px;cursor:pointer;color:rgb(13,13,13);';
      op.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
      op.addEventListener('click', function (e) { e.stopPropagation(); });
      row.appendChild(a); row.appendChild(se); row.appendChild(cp); row.appendChild(op);
      box.appendChild(row);
    });
    return box;
  }

  function makeRow() {
    var row = document.createElement('div');
    row.setAttribute('data-usertest-row', '');
    row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 0 4px 0;';
    var label = document.createElement('span');
    label.textContent = 'User test mode';
    label.style.cssText = 'font-family:' + SANS + ';font-weight:600;font-size:13px;color:rgb(13,13,13);';
    var sw = document.createElement('div');
    sw.style.cssText = 'width:46px;height:28px;border-radius:999px;background:rgb(228,224,222);position:relative;cursor:pointer;transition:background 180ms ease;flex-shrink:0;';
    var knob = document.createElement('div');
    knob.style.cssText = 'position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform 180ms ease;';
    sw.appendChild(knob);
    function paint() {
      sw.style.background = ON ? 'rgb(13,13,13)' : 'rgb(228,224,222)';
      knob.style.transform = ON ? 'translateX(18px)' : 'translateX(0)';
    }
    sw.addEventListener('click', function (e) { e.stopPropagation(); ON = !ON; paint(); });
    paint();
    row.appendChild(label); row.appendChild(sw);
    return row;
  }

  // The menu opens on the Test URLs list; the brand/version/language pills are
  // collapsed behind a small toggle so they don't compete with it.
  var FILTERS = /^(iGraal New|iGraal Legacy|Shoop New|Shoop Legacy|Noma New|Noma Legacy|English|Deutsch|Fran\u00e7ais)$/;
  var showFilters = false;

  function filterRows(menu) {
    var out = [], seen = [];
    var els = menu.querySelectorAll('div');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.children.length > 1 || !FILTERS.test((e.textContent || '').trim())) continue;
      var grp = e.parentNode;
      if (!grp || grp === menu || seen.indexOf(grp) > -1) continue;
      seen.push(grp); out.push(grp);
    }
    return out;
  }

  function makeFilterToggle(menu) {
    var t = document.createElement('div');
    t.setAttribute('data-usertest-filters-toggle', '');
    t.style.cssText = 'font-family:' + SANS + ';font-weight:600;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:rgba(13,13,13,.45);cursor:pointer;padding:2px 0 6px 0;';
    function paint() {
      t.textContent = (showFilters ? '\u2013' : '+') + ' Brand, version & language';
      filterRows(menu).forEach(function (g) { g.style.display = showFilters ? '' : 'none'; });
    }
    t.addEventListener('click', function (e) { e.stopPropagation(); showFilters = !showFilters; paint(); });
    paint();
    return t;
  }

  setInterval(function () {
    var btn = findApply();
    if (!btn || !btn.parentNode) return;
    var p = btn.parentNode;
    if (p.querySelector('[data-usertest-row]')) {
      var rs = filterRows(p);
      if (rs.length && !p.querySelector('[data-usertest-filters-toggle]')) rs[0].parentNode.insertBefore(makeFilterToggle(p), rs[0]);
      else if (!showFilters) rs.forEach(function (g) { g.style.display = 'none'; });
      return;
    }
    var rows = filterRows(p);
    if (rows.length) rows[0].parentNode.insertBefore(makeFilterToggle(p), rows[0]);
    p.insertBefore(makeRow(), btn);
    if (ROUTES.length) { ensureLabelCss(); p.insertBefore(makeSection(), btn); }
  }, 400);

  document.addEventListener('click', function (e) {
    if (!ON) return;
    var t = e.target;
    while (t && t !== document) {
      if (t.nodeType === 1 && t.children.length === 0 && APPLY.test((t.textContent || '').trim())) {
        location.href = START + '?back=' + encodeURIComponent(location.pathname + location.search);
        return;
      }
      t = t.parentNode;
    }
  }, true);
})();
