/* Showcase page — renders one project from projects.json. */
(() => {
  "use strict";

  const root = document.documentElement;
  const STORE_KEY = "profile-theme";

  /* ---------- theme (same contract as the index page) ---------- */
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored === "light" || stored === "dark") root.dataset.theme = stored;
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      root.dataset.theme = "light";
    }
  } catch { /* storage blocked */ }

  const syncThemeColor = () => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", root.dataset.theme === "light" ? "#f6f5f2" : "#0a0a0b");
    }
  };
  syncThemeColor();

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem(STORE_KEY, next); } catch { /* ignore */ }
    syncThemeColor();
  });

  /* ---------- sticky nav ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav?.classList.toggle("is-stuck", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const slug = new URLSearchParams(window.location.search).get("p");

  const fail = (msg) => {
    const note = $("showcase-note");
    if (!note) return;
    if (msg) note.insertBefore(document.createTextNode(msg + " "), note.firstChild);
    note.hidden = false;
  };

  /* ---------- load ---------- */
  fetch("projects.json", { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((data) => {
      const list = Array.isArray(data.projects) ? data.projects : [];
      const index = list.findIndex((p) => p.slug === slug);

      if (!slug) {
        window.location.replace("index.html#work");
        return;
      }
      if (index === -1) {
        document.title = "Not found — Muhammad Akash";
        fail("");
        return;
      }

      render(list[index], index, list);
    })
    .catch(() => {
      document.title = "Showcase unavailable — Muhammad Akash";
      fail("Couldn't load the project list.");
    });

  /* ---------- render ---------- */
  function render(project, index, list) {
    const pad = (n) => String(n).padStart(3, "0");

    document.title = project.name + " — Muhammad Akash";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", project.summary || project.name);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", project.name + " — Muhammad Akash");
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", project.summary || "");
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", window.location.href);

    $("p-index").textContent = pad(index + 1);
    $("p-platform").textContent = project.platform || "Project";
    $("p-year").textContent = project.year || "";
    $("p-title").textContent = project.name;
    $("p-summary").textContent = project.summary || "";

    $("p-platform2").textContent = project.platform || "—";
    $("p-year2").textContent = project.year || "—";
    $("p-status").textContent = project.status || "—";

    const tags = $("p-tags");
    (project.tags || []).forEach((t) => tags.appendChild(el("li", null, t)));

    const stack = $("p-stack");
    (project.stack || project.tags || []).forEach((t) => stack.appendChild(el("li", null, t)));

    /* cover — real screenshot if provided, otherwise a generated tile */
    const cover = $("p-cover");
    if (project.cover) {
      const img = el("img");
      img.src = project.cover;
      img.alt = project.name + " screenshot";
      img.loading = "eager";
      cover.appendChild(img);
    } else {
      const initials = (project.name || "?")
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

      const tile = el("div", "cover-tile");
      const grid = el("div", "cover-grid");
      const mark = el("span", "cover-mark", initials);
      const label = el("span", "cover-label mono", "Screenshots coming");
      tile.append(grid, mark, label);
      cover.appendChild(tile);
    }

    /* body */
    const body = $("p-body");
    (project.body || []).forEach((section) => {
      const block = el("section", "showcase-section");
      if (section.h) block.appendChild(el("h2", null, section.h));
      (Array.isArray(section.p) ? section.p : [section.p])
        .filter(Boolean)
        .forEach((para) => block.appendChild(el("p", null, para)));
      body.appendChild(block);
    });

    /* links */
    const links = project.links || {};
    const rows = Object.entries(links).filter(([, v]) => v);
    if (rows.length) {
      const wrap = $("p-links-wrap");
      const ul = $("p-links");
      rows.forEach(([k, v]) => {
        const li = el("li");
        const a = el("a", null, k === "repo" ? "Repository" : k === "demo" ? "Live demo" : k);
        a.href = v;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        ul.appendChild(li);
      });
      wrap.hidden = false;
    }

    /* gallery */
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];
    if (gallery.length) {
      const wrap = $("p-gallery");
      gallery.forEach((item) => {
        const fig = el("figure", "shot");
        const img = el("img");
        img.src = typeof item === "string" ? item : item.src;
        img.alt = (typeof item === "object" && item.alt) || project.name;
        img.loading = "lazy";
        fig.appendChild(img);
        if (typeof item === "object" && item.caption) {
          fig.appendChild(el("figcaption", "mono", item.caption));
        }
        wrap.appendChild(fig);
      });
      wrap.hidden = false;
    }

    /* pager */
    const pager = $("pager");
    const prev = list[(index - 1 + list.length) % list.length];
    const next = list[(index + 1) % list.length];

    if (list.length > 1) {
      const setPager = (node, target, titleId) => {
        node.href = "project.html?p=" + encodeURIComponent(target.slug);
        $(titleId).textContent = target.name;
      };
      setPager($("pager-prev"), prev, "pager-prev-title");
      setPager($("pager-next"), next, "pager-next-title");
      pager.hidden = false;
    }

    $("showcase-body").hidden = false;
    window.scrollTo(0, 0);
  }
})();
