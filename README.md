# profile-site

Single-page personal profile site. No build step, no dependencies, no framework.
Open `index.html` and it works.

```
index.html    structure + content
styles.css    all styling (CSS custom properties, light/dark)
script.js     theme toggle, sticky nav, mobile menu, scroll reveals
og.png        1200x630 social preview card
```

## Live

https://muhammad-akash.github.io/profile-site/

Deployed from `main` via GitHub Pages (Settings → Pages → Deploy from a branch).

## Editing

### Add or change a project

Find `.projects` in `index.html`. Each card is one block:

```html
<article class="project reveal">
  <div class="project-top">
    <span class="project-index mono">018</span>
    <span class="project-platform mono">Android</span>
  </div>
  <h3 class="project-title">Project Name</h3>
  <p class="project-desc">One line. What it does, not how.</p>
  <ul class="tags"><li>Kotlin</li><li>Android</li></ul>
</article>
```

Cards flow into a responsive grid: three columns on wide screens, one on phones.
The `project-platform` label is free text — `Android`, `Web`, `Desktop`, `Game`,
`AI`, `Browser`, `Tools`.

To make a project clickable, wrap the title:

```html
<h3 class="project-title"><a href="https://…">Project Name</a></h3>
```

### Contact

Email and WhatsApp are live in the Contact section. Both appear twice — once as
the big link and once in the socials row — so a change means editing both.

### Colors

Top of `styles.css`, under `:root` (dark) and `[data-theme="light"]`.
Change `--accent` and the whole site follows.

### Still placeholder

- `og.png` — regenerate if the name or headline changes
- Project cards have no links yet

## Local preview

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Deploy

```bash
git add -A
git commit -m "update"
git push
```

Pages rebuilds in about 40 seconds. Custom domain later: add a `CNAME` file with
the bare domain and point a `CNAME` DNS record at `muhammad-akash.github.io`.
