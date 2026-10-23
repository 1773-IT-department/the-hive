// Hides the brand splash as soon as the page has rendered.
(function () {
  var done = function () { document.documentElement.classList.add('dc-ready'); };
  var t0 = Date.now();
  (function check() {
    var root = document.getElementById('dc-root');
    if (root && root.childElementCount > 0) return requestAnimationFrame(done);
    if (Date.now() - t0 > 6000) return done();
    setTimeout(check, 30);
  })();
  // Manager Dashboard drawer: close it after a section is picked on a phone.
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.closest && t.closest('[data-dash-side] button, [data-dash-side] a')) {
      var box = document.getElementById('dash-nav');
      if (box) box.checked = false;
    }
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if ((e.key === 'Enter' || e.key === ' ') && t && t.matches && t.matches('[data-dash-burger]')) {
      e.preventDefault();
      var box = document.getElementById('dash-nav');
      if (box) box.checked = !box.checked;
    }
  });
})();
