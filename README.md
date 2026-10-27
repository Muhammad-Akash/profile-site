# profile-site

Single-page personal profile site. No build step, no dependencies, no framework.
Open `index.html` and it works.

```
index.html       home page
project.html     showcase template (one page per project)
projects.json    the project data — the source of truth
styles.css       all styling (CSS custom properties, light/dark)
script.js        home page behaviour
project.js       showcase renderer
og.png           1200x630 social preview card
```

## Live

https://muhammad-akash.github.io/profile-site/

Deployed from `main` via GitHub Pages (Settings → Pages → Deploy from a branch).

## Showcase

Every project has its own page at `project.html?p=<slug>`. Nothing is generated
at build time — `project.html` is one template, and `project.js` fills it from
`projects.json` based on the `?p=` parameter. Add an entry to the JSON and the
page exists.

### Adding a project

Append to `projects` in `projects.json`:

```json
{
  "slug": "my-project",
  "name": "My Project",
  "platform": "Android",
  "year": "2026",
  "status": "Shipped",
  "summary": "One line — what it is, not how.",
  "tags": ["Kotlin", "Android"],
  "stack": ["Kotlin", "Android", "Room"],
  "cover": "img/my-project/cover.png",
  "gallery": [
    { "src": "img/my-project/1.png", "alt": "Home screen", "caption": "Home" }
  ],
  "body": [
    { "h": "What it does", "p": "A paragraph." },
    { "h": "Why it's interesting", "p": ["Paragraph one.", "Paragraph two."] }
  ],
  "links": { "repo": "https://github.com/…", "demo": null }
}
```

Field notes:

- `slug` — lowercase, hyphenated, unique. That's the URL.
- `cover` — leave `""` and the page renders a generated placeholder tile with
  the project's initials. Drop a real screenshot in and it takes over.
- `gallery` — empty array hides the gallery entirely.
- `body` — a list of `{ h, p }` blocks. `p` is a string or an array of strings.
- `links` — anything truthy renders; `null` hides it.

### The cards on the home page

The work grid in `index.html` is a static copy of the same data — one `<a>`
per project pointing at `project.html?p=<slug>`. Adding a project means adding
an entry to `projects.json` **and** a matching card in `index.html`.

### Screenshots

Put images in `img/<slug>/` and reference them with a relative path
(`img/chorus/1.png`). Nothing else needs to change.

## Contact

Email and WhatsApp are live in the Contact section. Both appear twice — once as
the big link and once in the socials row — so a change means editing both.

## Colors

Top of `styles.css`, under `:root` (dark) and `[data-theme="light"]`.
Change `--accent` and the whole site follows.

### Still placeholder

- `og.png` — regenerate if the name or headline changes
- Project pages have no screenshots yet, only the generated tiles

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
