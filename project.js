/* Showcase page — renders one project from projects.json. */
(function () {
  'use strict';

  var doc = document;

  var $ = function (id) { return doc.getElementById(id); };

  var el = function (tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  var slug = new URLSearchParams(location.search).get('p');

  var fail = function (msg) {
    var note = $('project-note');
    if (!note) return;
    if (msg) note.insertBefore(doc.createTextNode(msg + ' '), note.firstChild);
    note.hidden = false;
  };

  fetch('projects.json', { cache: 'no-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      var list = Array.isArray(data.projects) ? data.projects : [];

      if (!slug) {
        location.replace('index.html#work');
        return;
      }

      var index = -1;
      for (var i = 0; i < list.length; i++) {
        if (list[i].slug === slug) { index = i; break; }
      }

      if (index === -1) {
        doc.title = 'Not found — Muhammad Akash';
        fail('');
        return;
      }

      render(list[index], index, list);
    })
    .catch(function () {
      doc.title = 'Showcase unavailable — Muhammad Akash';
      fail("Couldn't load the project list.");
    });

  function render(project, index, list) {
    var pad = function (n) { return String(n).padStart(3, '0'); };

    doc.title = project.name + ' — Muhammad Akash';

    var desc = doc.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', project.summary || project.name);
    var ogTitle = doc.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', project.name + ' — Muhammad Akash');
    var ogDesc = doc.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', project.summary || '');
    var ogUrl = doc.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', location.href);

    $('p-index').textContent = pad(index + 1);
    $('p-platform').textContent = project.platform || 'Project';
    $('p-year').textContent = project.year || '';
    $('p-title').textContent = project.name;
    $('p-summary').textContent = project.summary || '';

    $('p-platform2').textContent = project.platform || '—';
    $('p-year2').textContent = project.year || '—';
    $('p-status').textContent = project.status || '—';

    var tags = $('p-tags');
    (project.tags || []).forEach(function (t) { tags.appendChild(el('li', null, t)); });

    var stack = $('p-stack');
    (project.stack || project.tags || []).forEach(function (t) { stack.appendChild(el('li', null, t)); });

    /* cover — real screenshot if provided, otherwise a generated tile */
    var cover = $('p-cover');
    if (project.cover) {
      var img = el('img', 'cover-img');
      img.src = project.cover;
      img.alt = project.name + ' screenshot';
      img.loading = 'eager';
      cover.appendChild(img);
    } else {
      var initials = (project.name || '?')
        .split(/\s+/)
        .slice(0, 2)
        .map(function (w) { return w[0]; })
        .join('')
        .toUpperCase();

      var tile = el('div', 'cover-tile');
      tile.append(
        el('span', 'cover-initials', initials),
        el('span', 'cover-note', 'Screenshots coming')
      );
      cover.appendChild(tile);
    }

    /* body */
    var body = $('p-body');
    (project.body || []).forEach(function (section) {
      var block = el('section');
      if (section.h) block.appendChild(el('h2', null, section.h));
      (Array.isArray(section.p) ? section.p : [section.p])
        .filter(Boolean)
        .forEach(function (para) { block.appendChild(el('p', null, para)); });
      body.appendChild(block);
    });

    /* links */
    var links = project.links || {};
    var rows = Object.keys(links).filter(function (k) { return links[k]; });
    if (rows.length) {
      var wrap = $('p-links-wrap');
      var ul = $('p-links');
      rows.forEach(function (k) {
        var li = el('li');
        var a = el('a', null, k === 'repo' ? 'Repository' : k === 'demo' ? 'Live demo' : k);
        a.href = links[k];
        a.target = '_blank';
        a.rel = 'noopener';
        li.appendChild(a);
        ul.appendChild(li);
      });
      wrap.hidden = false;
    }

    /* gallery */
    var gallery = Array.isArray(project.gallery) ? project.gallery : [];
    if (gallery.length) {
      var gwrap = $('p-gallery');
      gallery.forEach(function (item) {
        var fig = el('figure');
        var gimg = el('img');
        gimg.src = typeof item === 'string' ? item : item.src;
        gimg.alt = (typeof item === 'object' && item.alt) || project.name;
        gimg.loading = 'lazy';
        fig.appendChild(gimg);
        if (typeof item === 'object' && item.caption) {
          fig.appendChild(el('figcaption', null, item.caption));
        }
        gwrap.appendChild(fig);
      });
      gwrap.hidden = false;
    }

    /* pager */
    var pager = $('pager');
    if (list.length > 1) {
      var prev = list[(index - 1 + list.length) % list.length];
      var next = list[(index + 1) % list.length];
      var setPager = function (node, target, titleId) {
        node.href = 'project.html?p=' + encodeURIComponent(target.slug);
        $(titleId).textContent = target.name;
      };
      setPager($('pager-prev'), prev, 'pager-prev-title');
      setPager($('pager-next'), next, 'pager-next-title');
      pager.hidden = false;
    }

    $('project-body').hidden = false;
    window.scrollTo(0, 0);
  }
})();
