(function () {
  var SERIF = "'New Spirit', Newsreader, serif";
  var SANS = "Inter, sans-serif";
  var ROUTES = window.TEST_ROUTES || [];
  // Deploys live in a subfolder (…/fr/), so route links resolve against this
  // page's directory rather than the domain root.
  var DIR = location.pathname.replace(/[^/]*$/, '');

  // A route stub jumps straight into its config: skip the spinner for that one
  // load only (normal navigation and URLs keep the loader).
  try {
    if (sessionStorage.getItem('usertest-nospin') === '1') {
      sessionStorage.removeItem('usertest-nospin');
      var sk = document.createElement('style');
      sk.textContent = '[data-om-boot]{display:none !important}';
      (document.head || document.documentElement).appendChild(sk);
    }
  } catch (e) {}
  var copy = window.usertestCopy ? window.usertestCopy() : { t2: "Time’s up – please return to your scenario to continue…", b2: '' };

  function modal(title, body) {
    var wrap = document.createElement('div');
    wrap.setAttribute('data-usertest-modal', '');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:#000;display:flex;align-items:center;justify-content:center;padding:clamp(12px,4vw,24px);box-sizing:border-box;';
    var card = document.createElement('div');
    card.style.cssText = 'width:100%;max-width:min(320px,100%);background:#fff;border-radius:24px;padding:clamp(24px,7vw,36px) clamp(18px,5.5vw,28px);box-sizing:border-box;display:flex;flex-direction:column;gap:16px;align-items:center;text-align:center;';
    var h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-family:' + SERIF + ';font-weight:500;font-size:26px;line-height:1.15;letter-spacing:-.022em;color:rgb(13,13,13);text-wrap:pretty;';
    var p = document.createElement('div');
    p.textContent = body;
    p.style.cssText = 'font-family:' + SANS + ';font-weight:500;font-size:14px;line-height:20px;color:rgb(60,54,52);text-wrap:pretty;';
    card.appendChild(h);
    if (body) card.appendChild(p);
    wrap.appendChild(card);
    document.body.appendChild(wrap);
  }

  // The 15-second window starts only once the hero is actually on screen.
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
      setTimeout(function () { modal(copy.t2, copy.b2); }, 20000);
    })();
  }

  function links() {
    var out = [];
    ROUTES.forEach(function (r) {
      (r.links || []).forEach(function (l, i) {
        out.push({
          name: l.name, bold: l.bold, divider: i === 0 && r.group > 1,
          url: location.origin + DIR + r.path + (l.mode === 'test' ? '?test=true' : '')
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

  function makeSection() {
    var box = document.createElement('div');
    box.setAttribute('data-usertest-urls', '');
    box.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
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
      var op = document.createElement('a');
      op.href = l.url; op.target = '_blank'; op.rel = 'noopener'; op.title = 'Open in new tab';
      op.style.cssText = 'flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;width:26px;height:24px;border:1px solid rgb(228,224,222);border-radius:999px;cursor:pointer;color:rgb(13,13,13);';
      op.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
      op.addEventListener('click', function (e) { e.stopPropagation(); });
      row.appendChild(a); row.appendChild(cp); row.appendChild(op);
      box.appendChild(row);
    });
    return box;
  }

  // The menu mounts and unmounts with the hamburger, so the list is (re)filled
  // into the template's anchor whenever it reappears.
  setInterval(function () {
    var anchor = document.querySelector('[data-usertest-anchor]');
    if (!anchor || anchor.querySelector('[data-usertest-urls]')) return;
    if (!ROUTES.length) return;
    ensureLabelCss();
    anchor.appendChild(makeSection());
  }, 400);
})();
