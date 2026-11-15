/* Muhammad Akash — warm editorial pass */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var toggle = document.getElementById('theme-toggle');

  function syncThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', root.dataset.theme === 'dark' ? '#1c1b18' : '#f6f5f1');
  }

  function setTheme(next) {
    root.dataset.theme = next;
    try { localStorage.setItem('ma-theme', next); } catch (e) {}
    syncThemeColor();
  }

  if (!root.dataset.theme) {
    root.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  syncThemeColor();

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      toggle.setAttribute('aria-pressed', String(next === 'dark'));
    });
  }

  /* follow the system if the visitor never chose */
  try {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem('ma-theme'); } catch (err) {}
      if (saved) return;
      root.dataset.theme = e.matches ? 'dark' : 'light';
      syncThemeColor();
    });
  } catch (e) { /* older browsers */ }

  /* ---------- year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
