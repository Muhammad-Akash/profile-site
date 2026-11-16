# Muhammad Akash — portfolio

A single-page profile plus one page per project. No build step, no framework,
no dependencies. Open `index.html` and it works.

```
index.html      home: hero, work grid, toolkit, about, contact
project.html    showcase template (one page per project, ?p=<slug>)
project.js      renders a project from projects.json
projects.json   the project data — the source of truth
styles.css      all styling (tokens at the top)
script.js       light/dark theme + year
og.png          social preview card
```

## Live

https://muhammad-akash.github.io/profile-site/

Deployed from `main` via GitHub Pages (Settings → Pages → Deploy from a branch).

## Preview locally

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>.

Project pages fetch `projects.json`, so you need the server — opening
`project.html` straight off disk won't load the data. The home page itself
works from `file://`.

## Design

Warm editorial: cream paper, a large serif sentence for a hero, illustrated
cards with a soft lift on hover.

| Token | Light | Dark |
|---|---|---|
| Page | `#f6f5f1` | `#1c1b18` |
| Cards | `#fcfbf7` | `#252420` |
| Borders | `#e6e3e1` | `#3a3835` |
| Ink | `#353534` | `#c2bfba` |
| Crimson (links, hover) | `#5f023e` | `#e85aab` |
| Sea blue (accents) | `#04a5bb` | `#2bc4da` |

Type: **Fraunces** for display, **Newsreader** for body, **Lato** for sans.
All three load from Google Fonts.

The theme follows the OS on first visit, then remembers the visitor's choice in
`localStorage` under `ma-theme`.

## Adding a project

Two places, both required:

**1.** Append to `projects` in `projects.json`:

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
  "cover": "img/my-project/cover.webp",
  "gallery": [
    { "src": "img/my-project/1.webp", "alt": "Home screen", "caption": "Home" }
  ],
  "body": [
    { "h": "What it does", "p": "A paragraph." },
    { "h": "Why it's interesting", "p": ["Paragraph one.", "Paragraph two."] }
  ],
  "links": { "repo": "https://github.com/…", "demo": null }
}
```

**2.** Add a card to the `.grid` in `index.html`, copying an existing block:

```html
<a class="card-link" href="project.html?p=my-project">
  <article class="card">
    <div class="card-art" style="--tint:#2f9e8f"><span>MP</span></div>
    <h3>My Project</h3>
    <p class="card-desc">One line — what it is, not how.</p>
    <div class="meta"><span>Android</span><svg class="growth"><use href="#i-sprout"/></svg><span>2026</span></div>
  </article>
</a>
```

Field notes:

- `slug` — lowercase, hyphenated, unique. That's the URL.
- `cover` — leave `""` and the page renders a generated initials tile.
- `gallery` — empty array hides the gallery entirely.
- `body` — a list of `{ h, p }` blocks. `p` is a string or an array of strings.
- `links` — anything truthy renders; `null` hides it.
- `--tint` on the card art is a hue; the tile mixes it with the page colour, so
  it adapts to light and dark automatically.

## Images

Screenshots live in `img/<slug>/` and are referenced by relative path.

| File | Used by | Size |
|---|---|---|
| `img/<slug>/cover.webp` | Project page hero | 2400 × 975 (1.5× of 1600 × 650) |
| `img/<slug>/card.webp` | Home grid tile | 800 × 800, transparent |
| `img/<slug>/NN-*.webp` | Project page gallery | 900 wide (phone), native for desktop |

Images are WebP, not PNG — the set was 9.3 MB as PNG and is under 3 MB as WebP
with no visible difference.

Nineteen of the 21 projects have real screenshots: eleven Android apps (nine
captured from the Pixel 9a, the rest built and captured locally), three browser
games captured in headless Chrome, four desktop or web apps captured on this PC,
and one browser-extension popup. The rest still render a generated initials
tile; drop a `cover.webp` in `img/<slug>/` and add it to that project's
`"cover"` field to replace it.

Still without imagery: Automated Chatbot and ShortLoop — both headless services
with no UI to photograph.

Statuses: every finished project reads `Finished`, the three games read
`Playable`, and Automated Chatbot reads `Running` because the service is live.

`card.webp` is transparent on purpose: the tile background comes from the
`--tint` on the card, so it adapts to light and dark automatically.

### Regenerating covers and cards

`tools/art.html` is the single source for all of them — real HTML rendered in
Chrome, so they use the site's own Fraunces type and palette rather than a
lookalike font. Every project is one entry in the `DATA` array at the bottom:
accent colour, kicker, headline, subtitle, meta pills, and which screenshots
to use.

```powershell
python -m http.server 8000
# then screenshot each one, e.g.
#   http://localhost:8000/tools/art.html?type=cover&p=bloomly  -> img/bloomly/cover.webp
#   http://localhost:8000/tools/art.html?type=card&p=bloomly   -> img/bloomly/card.webp
```

Add an entry to `DATA`, re-shoot, done. Covers are laid out at 1600 × 650 CSS
px and captured at 1.5× (2400 × 975) so the phone UI stays sharp on high-DPI
screens; cards are 800 × 800 and **must** be captured with a transparent
background.

`MOCKUP-PROMPTS.md` has design briefs and generation prompts for the four most
recent apps — useful now mainly as a written spec of each screen.

## Deploy

```bash
git add -A
git commit -m "update"
git push
```

Pages rebuilds in about 40 seconds. Custom domain later: add a `CNAME` file with
the bare domain and point a `CNAME` DNS record at `muhammad-akash.github.io`.

## Other designs

`v1/` (the original dark design) and `v2/` (a condensed navy design) are kept in
this repo for reference. See `DESIGNS.md`.
