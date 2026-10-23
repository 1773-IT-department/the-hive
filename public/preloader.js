// The Hive preloader: plays the honeycomb intro on every page load and lifts once the page is ready.
// Exposes window.__hivePreloader (resolves as the overlay starts lifting) and window.__hiveAfter(fn).
(function () {
  var ov = document.getElementById('hive-pre');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var resolveLift;
  window.__hivePreloader = new Promise(function (r) { resolveLift = r; });
  window.__hiveAfter = function (fn) { window.__hivePreloader.then(function () { requestAnimationFrame(fn); }); };

  function pageReady() {
    var root = document.getElementById('dc-root');
    return !!(root && root.childElementCount > 0);
  }
  function whenReady(cb) {
    var t0 = Date.now();
    (function check() {
      if (pageReady() || Date.now() - t0 > 8000) return cb();
      setTimeout(check, 40);
    })();
  }

  if (!ov || reduced || !ov.animate) {
    whenReady(function () {
      if (ov) ov.remove();
      document.documentElement.classList.add('hive-pre-done');
      resolveLift();
    });
    return;
  }

  document.documentElement.classList.add('hive-pre-on');
  var LOGO = 'https://images.squarespace-cdn.com/content/v1/688633ab5eb7735480a9622d/6c140487-9cba-4324-9f2c-23180ca56305/The+Hive_Primary+Identity_Reverse.png?format=750w';
  var HEXP = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)';
  var E = 'cubic-bezier(.2,.7,.2,1)', fill = 'both';
  function mk(css, tag) { var e = document.createElement(tag || 'div'); e.style.cssText = css; return e; }

  var stage = mk('position:relative;width:0;height:0');
  var comb = mk('position:absolute;left:0;top:0');
  var w = Math.min(54, innerWidth / 9), hh = w * 1.155, gx = w * 1.08, gy = hh * 0.75 * 1.08;
  var cells = [];
  for (var r = -2; r <= 2; r++) for (var q = -2; q <= 2; q++) {
    if (Math.abs(q + r) > 2) continue;
    var x = gx * (q + r / 2), y = gy * r;
    var c = mk('position:absolute;left:' + (x - w / 2) + 'px;top:' + (y - hh / 2) + 'px;width:' + w + 'px;height:' + hh + 'px;clip-path:' + HEXP + ';background:rgba(245,245,245,.08);opacity:0');
    comb.appendChild(c);
    cells.push({ c: c, x: x, y: y, d: Math.hypot(q, r, q + r) });
  }
  stage.appendChild(comb);
  var logo = mk('position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);height:min(96px,16vw);width:auto;max-width:none;opacity:0', 'img');
  logo.src = LOGO; logo.alt = '';
  var tag = mk('position:absolute;left:50%;top:calc(50% + min(78px,13vw));transform:translateX(-50%);white-space:nowrap;font-family:Epilogue,sans-serif;font-weight:700;font-size:clamp(16px,2.4vw,22px);letter-spacing:-.01em;color:#F5F5F5;opacity:0');
  tag.textContent = 'Work Better. Together.';
  stage.appendChild(logo); stage.appendChild(tag); ov.appendChild(stage);

  cells.forEach(function (o) { o.c.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 500, delay: o.d * 90, easing: E, fill: fill }); });
  var order = cells.map(function (o, i) { return i; }).sort(function () { return Math.random() - 0.5; });
  order.forEach(function (i, k) {
    var o = cells[i], delay = 350 + k * 60;
    var a = Math.random() * Math.PI * 2, R = Math.max(innerWidth, innerHeight) * 0.7;
    var dot = mk('position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;background:#D49516;box-shadow:0 0 14px rgba(212,149,22,.8)');
    stage.appendChild(dot);
    dot.animate([
      { transform: 'translate(' + Math.cos(a) * R + 'px,' + Math.sin(a) * R + 'px) scale(.6)', opacity: 0 },
      { opacity: 1, offset: 0.3 },
      { transform: 'translate(' + o.x + 'px,' + o.y + 'px) scale(1)', opacity: 1 },
      { transform: 'translate(' + o.x + 'px,' + o.y + 'px) scale(2.4)', opacity: 0 }
    ], { duration: 900, delay: delay, easing: 'cubic-bezier(.5,0,.2,1)', fill: fill });
    o.c.animate([{ background: 'rgba(245,245,245,.08)' }, { background: '#D49516' }], { duration: 260, delay: delay + 700, easing: 'ease-out', fill: fill });
  });
  var tLogo = 350 + cells.length * 60 + 900;
  comb.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.82)', opacity: 0.14 }], { duration: 700, delay: tLogo, easing: E, fill: fill });
  logo.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(.92)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 700, delay: tLogo + 100, easing: E, fill: fill });
  tag.animate([{ opacity: 0, transform: 'translate(-50%,10px)' }, { opacity: 1, transform: 'translate(-50%,0)' }], { duration: 600, delay: tLogo + 350, easing: E, fill: fill });

  // Lift only after the full animation has played AND the page underneath has rendered.
  var animDone = false, ready = false, lifted = false;
  function lift() {
    if (lifted || !animDone || !ready) return;
    lifted = true;
    var an = ov.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: 850, easing: 'cubic-bezier(.7,0,.2,1)', fill: fill });
    setTimeout(function () {
      document.documentElement.classList.remove('hive-pre-on');
      document.documentElement.classList.add('hive-pre-done');
      resolveLift();
    }, 300);
    an.onfinish = function () { ov.remove(); };
  }
  setTimeout(function () { animDone = true; lift(); }, tLogo + 1500);
  whenReady(function () { ready = true; lift(); });

  // Coming back with the browser's back button can restore a frozen page: replay cleanly instead.
  window.addEventListener('pageshow', function (e) { if (e.persisted) location.reload(); });
})();
