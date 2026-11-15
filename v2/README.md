# My Profile — v2 (design pass)

A redesign of the portfolio, modelled on the layout language of
**ojailbreaks.com**: condensed display type, deep navy, glass panels, a
searchable board in the hero, and numbered sections underneath.

This folder is a **draft**. It is not deployed. It sits inside the site repo as
`v2\`, next to the original design at the repo root and `v3\`.

## Preview

```powershell
cd "C:\Users\0akud\Desktop\My Profile\v2"
python -m http.server 8100
```

Then open <http://localhost:8100>.

Add `?nointro` to skip the loading animation (useful for screenshots).

## Files

```
index.html      home: hero + searchable work board, about, stack, contact
project.html    showcase template (one page per project, ?p=<slug>)
project.js      renders a project from projects.json
projects.json   the project data — the source of truth
styles.css      all styling (tokens at the top)
script.js       preloader, scroll progress, reveal, rotator, search + filter
og.png          social preview card
```

## What changed from v1

- **Type**: Big Shoulders Display at 800/900, uppercase, `.84` leading. Geist
  for body, Geist Mono for labels. Loaded from Google Fonts.
- **Colour**: near-black navy (`#04060b`) with blue radial glows and a
  `#2f6bff` accent. Dark only — the light theme was dropped.
- **Hero**: the work grid moved into a glass board with search, platform
  filters and a live result count. It scrolls inside the panel.
- **Sections**: About became a three-step story with a sticky "scene" panel
  that changes as you scroll. Stack and Contact kept their content.
- **Motion**: intro counter, character-by-character title reveal, rotating
  last word, scroll progress bar, magnetic buttons. All respect
  `prefers-reduced-motion`.
- **Project pages** were rebuilt to match — same type, same panels.

To change the accent, edit `--blue` / `--blue-2` / `--ice` in `:root` at the
top of `styles.css`.

## Projects added in this pass

Four recent projects were added from source folders on the Desktop. The
entries were written from the code, not invented.

| Project | Slug | Source |
|---|---|---|
| Family Safety | `family-safe` | `Desktop\Parental Control` |
| Bloomly | `bloomly` | `Desktop\Bloomly` |
| ITN VPN | `itn-vpn` | `Desktop\VPN` |
| Meherpur Sheba | `meherpur-sheba` | `Desktop\My completed projects\Client Job 2 Sheba` |

They sit at the top of the list, so they are cards 001–004. Everything else
shifted down; there are now **21** projects, and the copy says so.

## Known gaps

- Every project still shows the generated initials tile instead of a cover
  image. `cover` is `""` in all 21 entries.
- `og.png` is the old card — it still says the old headline.
- The "Shipped" vs "In development" statuses on the new entries are a
  judgement call from reading each project; adjust if any are wrong.

## Deploying

The v2 files are drop-in replacements. To ship, copy them over the repo:

```powershell
cd "C:\Users\0akud\Desktop\My Profile"
git checkout -b redesign
Copy-Item "v2\*" . -Force
git add -A
git commit -m "redesign: condensed display type, work board in the hero"
git push -u origin redesign
```
