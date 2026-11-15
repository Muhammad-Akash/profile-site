/* ============================================================
   Muhammad Akash — portfolio behaviour
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- preloader ---------- */
  (function preloader() {
    var el = doc.getElementById('preloader');
    if (!el) return;
    var num = doc.getElementById('pl-num');
    var ring = el.querySelector('.pl-fill');

    function finish() {
      el.classList.add('is-done');
      root.classList.add('is-ready');
      try { sessionStorage.setItem('ma-intro', '1'); } catch (e) {}
    }

    var bypass = root.classList.contains('skip-intro') || /(?:^|[?&])nointro\b/.test(location.search);
    if (bypass) { finish(); return; }

    var t0 = performance.now();
    var DUR = 900;

    /* the overlay must never be able to trap the page */
    var guard = setTimeout(finish, 2200);

    function tick(now) {
      var p = Math.min(1, (now - t0) / DUR);
      var eased = 1 - Math.pow(1 - p, 3);
      var n = Math.round(eased * 100);
      if (num) num.textContent = String(n).padStart(3, '0');
      if (ring) ring.style.strokeDashoffset = String(100 - eased * 100);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        clearTimeout(guard);
        finish();
      }
    }
    requestAnimationFrame(tick);
  })();

  /* safety: never leave content hidden */
  setTimeout(function () { root.classList.add('is-ready'); }, 2500);

  /* ---------- year ---------- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- hero title: split chars ---------- */
  (function splitTitle() {
    var targets = doc.querySelectorAll('[data-chars]');
    if (!targets.length || reduce) return;
    var i = 0;
    targets.forEach(function (el) {
      var text = el.textContent;
      el.textContent = '';
      var frag = doc.createDocumentFragment();
      for (var c = 0; c < text.length; c++) {
        var ch = text[c];
        var span = doc.createElement('span');
        span.className = 'ch';
        if (ch === ' ') {
          span.innerHTML = '&nbsp;';
          span.style.width = '.26em';
        } else {
          span.textContent = ch;
        }
        span.style.setProperty('--i', String(i++));
        frag.appendChild(span);
      }
      el.appendChild(frag);
    });
  })();

  /* ---------- rotating word ---------- */
  (function rotator() {
    var el = doc.getElementById('rotator');
    if (!el || reduce) return;
    var words = (el.dataset.words || '').split(',').filter(Boolean);
    if (words.length < 2) return;
    var idx = 0;
    var current = el.textContent;

    setInterval(function () {
      idx = (idx + 1) % words.length;
      var next = words[idx];
      if (!el.animate) { el.textContent = next; return; }

      el.animate(
        [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-.55em)', opacity: 0 }],
        { duration: 280, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' }
      ).onfinish = function () {
        el.textContent = next;
        el.animate(
          [{ transform: 'translateY(.55em)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
          { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }
        );
      };
    }, 2600);

    el.textContent = current;
  })();

  /* ---------- scroll progress + header ---------- */
  (function scrollUI() {
    var bar = doc.querySelector('.scroll-progress span');
    var header = doc.getElementById('header');
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

      if (header) {
        header.classList.toggle('is-scrolled', y > 12);
        var menu = doc.getElementById('mobile-menu');
        var menuOpen = menu && !menu.hidden;
        if (y > lastY && y > 260 && !menuOpen) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* ---------- mobile menu ---------- */
  (function mobileMenu() {
    var btn = doc.getElementById('menu-toggle');
    var menu = doc.getElementById('mobile-menu');
    if (!btn || !menu) return;

    function setOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
      doc.body.style.overflow = open ? 'hidden' : '';
    }

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });

    matchMedia('(min-width: 1181px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  })();

  /* ---------- reveal on scroll ---------- */
  (function reveal() {
    var items = doc.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      items.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
      });
    }, 1600);
  })();

  /* ---------- story steps -> scene ---------- */
  (function story() {
    var scene = doc.getElementById('scene');
    var steps = Array.prototype.slice.call(doc.querySelectorAll('.story-step'));
    var rail = doc.querySelector('.story-rail span');
    if (!scene || !steps.length) return;

    var labels = ['notice', 'build', 'keep'];

    function activate(i) {
      steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      scene.dataset.step = String(i + 1);
      var label = doc.getElementById('scene-label');
      var num = doc.getElementById('scene-num');
      if (label) label.textContent = labels[i] || '';
      if (num) num.textContent = '0' + (i + 1);
      if (rail) rail.style.height = ((i + 1) / steps.length) * 100 + '%';
    }

    steps.forEach(function (step, i) {
      step.addEventListener('mouseenter', function () { activate(i); });
      step.addEventListener('focusin', function () { activate(i); });
    });

    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(steps.indexOf(entry.target));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    steps.forEach(function (s) { io.observe(s); });
    activate(0);
  })();

  /* ---------- work board: search + filter ---------- */
  (function board() {
    var grid = doc.getElementById('pack-grid');
    if (!grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
    var input = doc.getElementById('search');
    var clearBtn = doc.getElementById('search-clear');
    var segment = doc.getElementById('segment');
    var ind = segment ? segment.querySelector('.segment-ind') : null;
    var countEl = doc.getElementById('result-count');
    var empty = doc.getElementById('empty-state');
    var reset = doc.getElementById('reset-search');
    var total = cards.length;

    var state = { q: '', filter: 'all' };

    function moveIndicator(btn) {
      if (!ind || !btn) return;
      ind.style.width = btn.offsetWidth + 'px';
      ind.style.height = btn.offsetHeight + 'px';
      ind.style.transform = 'translate(' + btn.offsetLeft + 'px,' + btn.offsetTop + 'px)';
    }

    function apply() {
      var q = state.q.trim().toLowerCase();
      var shown = 0;

      cards.forEach(function (card) {
        var hay = (card.dataset.name || '') + ' ' + card.textContent;
        var okText = !q || hay.toLowerCase().indexOf(q) !== -1;
        var okFilter = state.filter === 'all' || card.dataset.platform === state.filter;
        var show = okText && okFilter;
        card.hidden = !show;
        if (show) shown++;
      });

      if (countEl) {
        countEl.textContent = (q || state.filter !== 'all')
          ? shown + ' of ' + total + ' projects'
          : total + ' projects';
      }
      if (empty) empty.hidden = shown !== 0;
      if (clearBtn) clearBtn.hidden = !state.q;

      var active = segment ? segment.querySelector('button.is-active') : null;
      moveIndicator(active);
    }

    if (input) {
      input.addEventListener('input', function () {
        state.q = input.value;
        apply();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          input.value = ''; state.q = ''; apply(); input.blur();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (input) { input.value = ''; input.focus(); }
        state.q = '';
        apply();
      });
    }

    if (segment) {
      segment.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-filter]');
        if (!btn) return;
        segment.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        state.filter = btn.dataset.filter;
        apply();
      });
    }

    if (reset) {
      reset.addEventListener('click', function () {
        if (input) input.value = '';
        state.q = '';
        state.filter = 'all';
        if (segment) {
          segment.querySelectorAll('button').forEach(function (b) {
            b.classList.toggle('is-active', b.dataset.filter === 'all');
          });
        }
        apply();
      });
    }

    doc.addEventListener('keydown', function (e) {
      if (e.key === '/' && doc.activeElement !== input && !/^(INPUT|TEXTAREA)$/.test(doc.activeElement.tagName)) {
        e.preventDefault();
        if (input) input.focus();
      }
    });

    window.addEventListener('resize', function () {
      var active = segment ? segment.querySelector('button.is-active') : null;
      moveIndicator(active);
    });

    apply();
  })();

  /* ---------- magnetic buttons ---------- */
  (function magnetic() {
    if (reduce || !matchMedia('(hover: hover)').matches) return;
    doc.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.transform = 'translate(' + (x * 5).toFixed(2) + 'px,' + (y * 4).toFixed(2) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  })();

})();
