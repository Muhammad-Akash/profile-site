/* Profile site — vanilla, no dependencies. */
(() => {
  "use strict";

  const root = document.documentElement;
  const STORE_KEY = "profile-theme";

  /* ---------- theme ---------- */
  const stored = (() => {
    try { return localStorage.getItem(STORE_KEY); } catch { return null; }
  })();

  if (stored === "light" || stored === "dark") {
    root.dataset.theme = stored;
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.dataset.theme = "light";
  }

  const syncThemeColor = () => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute(
      "content",
      root.dataset.theme === "light" ? "#f6f5f2" : "#0a0a0b"
    );
  };
  syncThemeColor();

  const themeBtn = document.getElementById("theme-toggle");
  themeBtn?.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem(STORE_KEY, next); } catch { /* private mode */ }
    syncThemeColor();
  });

  /* ---------- sticky nav ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav?.classList.toggle("is-stuck", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  const closeMenu = () => {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  };

  menuBtn?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });

  mobileMenu?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", closeMenu)
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ---------- reveal on scroll ---------- */
  const revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- active nav link ---------- */
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];

  if ("IntersectionObserver" in window && sections.length && links.length) {
    const byId = new Map(links.map((l) => [l.getAttribute("href")?.slice(1), l]));

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((l) => l.classList.remove("is-active"));
          byId.get(entry.target.id)?.classList.add("is-active");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
