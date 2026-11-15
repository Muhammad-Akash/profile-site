# Mockup prompts — app screens for the portfolio

Design briefs and image-generation prompts for the four recent apps, written
from each project's source code (screens, features and palette are real, not
invented).

Use them two ways:

- **As a brief** — hand to a designer or work through in Figma.
- **As an image prompt** — paste into Midjourney, Ideogram, Flux, or a UI
  generator. Text inside generated images is usually garbled, so treat output
  as art direction, not final UI.

> **Status — these are no longer needed for the four apps below.** Real
> screenshots were captured from the devices and are already wired into
> `projects.json` (`img/family-safe/`, `img/bloomly/`, `img/itn-vpn/`,
> `img/meherpur-sheba/`). Keep this file as the written spec of what each app
> actually contains, or reuse the art direction for the 17 projects that still
> have no imagery.

---

## Art direction (shared)

Every mockup should feel like it belongs to the same portfolio. Keep this
constant across all four apps; only the app's own accent colour changes.

> Soft studio product shot of an Android phone, three-quarter front view,
> floating slightly above a warm cream backdrop (#f6f5f1) with a subtle
> radial gradient and a long soft shadow. Muted, editorial, calm. No device
> branding, no notch, thin bezels, dark status bar. Shallow depth of field,
> crisp screen, matte finish, generous negative space. Premium app-store
> photography, not a stock photo.

**Aspect ratios the site expects**

| Use | Ratio | Size |
|---|---|---|
| Project cover (`cover`) | 16 : 6.5 | 1600 × 650 |
| Gallery screens (`gallery`) | 9 : 19.5 | 1080 × 2340 |
| Card art (home grid) | 1 : 1 | 800 × 800 |

**Universal negative prompt**

> no laptops, no hands, no faces, no floating UI shards, no neon, no 3D
> blobs, no generic dashboard clutter, no stock-photo people, no watermark,
> no logo, no lorem ipsum paragraphs, no heavy drop shadows, no glassmorphism
> overload

---

## 1 · Family Safety

**What it actually is:** one Android app with two roles — parent and child.
Parent sees a live location trail, screen capture, and call/message/notification
activity. Custom OpenStreetMap tile map (no map SDK), supervised browser,
QR pairing, usage charts.

**Palette:** trust blue `#2f6bff` primary, white surfaces, warm grey text,
amber for warnings, green for "protected".

### Cover — 16:6.5

> Wide banner: a single Android phone on the right third, screen showing a
> parent dashboard with a live map, a location trail line and two child
> profile cards. Left two-thirds is clean warm cream space for a headline.
> Soft blue glow behind the device. Calm, protective, trustworthy.

### Screen prompts — 9:19.5

**Parent home**
> Android app screen, parent dashboard. Header "Family", two child cards each
> with avatar circle, name, battery and online dot. Below: three quick tiles —
> Location, Screen time, App limits — as rounded cards with thin line icons.
> Bottom navigation with five items. Light theme, blue accent, generous
> spacing, 8pt grid, Material 3.

**Location**
> Android map screen. Full-bleed street map in muted greys and pale greens,
> a soft blue polyline showing a walked route, a circular avatar marker at the
> end, a translucent accuracy ring around it. Floating card at the bottom:
> "Arrived 4 min ago" plus a time strip. Back arrow top left. Light theme.

**Screen time report**
> Android analytics screen. Seven vertical bars for the week, tall blue bars
> with rounded tops, y-axis labels, one bar highlighted. Above the chart a
> large number "3h 42m today". Below, a list of three apps with small icons
> and horizontal usage bars. Light theme, blue accent.

---

## 2 · Bloomly

**What it actually is:** a parenting companion that adapts to a stage —
preparing, expecting, or newborn. Fifteen screens: 90-day calendar, offline
Learn shelf, feeding and growth logs, CDC milestone checklists, and an Ask
screen that answers with real citations.

**Palette:** soft sage `#7d9b84`, blush `#e8b4a8`, warm cream `#fbf7f0`, ink
`#3b3a36`. Rounded, gentle, unhurried.

### Cover — 16:6.5

> Wide banner: two Android phones overlapping at a slight angle on a warm
> cream backdrop with soft blush and sage gradient blobs. Front phone shows a
> calm home screen with a pregnancy week ring and a timeline strip. Back phone
> shows a chat answer with a citation chip. Gentle, human, editorial.

### Screen prompts — 9:19.5

**Stage picker (first run)**
> Android onboarding screen. Large heading "Where are you on the timeline?".
> Three tall rounded cards stacked: "Preparing", "Expecting", "Newborn", each
> with a simple line illustration — a sprout, a crescent bump, a small sleeping
> face. Sage and blush tints, cream background, soft shadows.

**Home — newborn**
> Android home screen. Top: a soft sage hero card with the baby's age in days
> and a circular week ring. Below: a horizontal timeline strip of seven day
> pills, one filled. Then a "This week" card and a two-column tool grid —
> Feeding, Growth, Milestones, Medicine — each a rounded tile with a thin
> line icon. Warm cream background.

**Ask — cited answer**
> Android chat screen. One user question bubble right-aligned in blush, one
> long answer block left-aligned in white with comfortable line height. Under
> the answer, a small citation chip reading "NHS · Feeding" with a leaf icon.
> A text field pinned at the bottom with a camera icon. Calm, readable,
> no chat-app clutter.

**Feeding log**
> Android logging screen. Big centred timer, three large segmented buttons —
> Left, Right, Bottle — with the left one active in sage. Below: "Last feed
> 2h 14m ago", a 24-hour sparkline of feed times, and an undo link. Warm cream,
> generous spacing.

---

## 3 · ITN VPN

**What it actually is:** a single-screen VPN client. Pick a server,
connect, watch the tunnel state. Servers ship as a local JSON list.

**Palette:** deep navy `#0d1420`, electric blue `#3d7dff`, mint `#47e6a1`
for connected, grey `#8b95a7`.

### Cover — 16:6.5

> Wide banner, dark. A single Android phone centred-left on a deep navy
> backdrop with a soft blue radial glow. Screen shows a large circular connect
> button glowing mint, "Connected" label and a session timer. Right side is
> empty navy space for a headline. Cinematic, secure, minimal.

### Screen prompts — 9:19.5

**Disconnected**
> Dark Android VPN screen. Large circular power button in the centre, outlined
> blue, "Tap to connect" beneath. Top: app name and a small shield glyph.
> Bottom sheet listing three servers — "Singapore · 24 ms", "Frankfurt · 41 ms",
> "New York · 88 ms" — each a row with a flag dot and latency in grey. Deep
> navy background.

**Connected**
> Dark Android VPN screen. The same circular button now filled mint with a
> check glyph, a session timer "00:14:32" beneath it, and two small stat rows
> — "IP 10.8.0.2" and "↓ 12.4 MB ↑ 3.1 MB". Subtle mint glow around the button.
> Deep navy.

---

## 4 · Meherpur Sheba

**What it actually is:** a district services directory for Meherpur —
nine sections from emergency to leisure. Public app plus a separate admin app.
Every listing has hours, phone, area and rating; one tap dials.

**Palette:** civic green `#1f7a4d`, light green tint `#e8f3ec`, warm white,
ink `#1f2a24`.

### Cover — 16:6.5

> Wide banner: two Android phones side by side on a soft warm-white backdrop
> with a pale green gradient. Left phone shows a directory home with category
> tiles in a grid; right phone shows a detail sheet with a large green call
> button. Clean, civic, trustworthy, flat and bright.

### Screen prompts — 9:19.5

**Home**
> Android directory home. Top: a search bar and a green notice ticker strip
> with a scrolling line of text. Below: a banner card, then a helpline card in
> solid green with a phone icon, then section rows — "Emergency & Safety",
> "Health", "Education" — each a horizontal row of rounded category tiles.
> Bottom navigation, five items. Light theme, green accent.

**Category list**
> Android category screen. Header with a back arrow and a search field, a thin
> green notice strip beneath it, then "142 listings · updated today" in small
> grey text. A ranked list of cards: name, area, opening hours, star rating,
> and a circular green call button on the right of each row.

**Detail sheet**
> Android bottom sheet over a dimmed map. Sheet content: service name in large
> type, a rating row, address, opening hours in a small table, then four
> equal action buttons — Call, Map, Share, Save — the first filled green.

**Admin**
> Android admin app screen. A list of pending listings with edit and approve
> buttons, a top bar with "12 pending", and a floating add button. Same green
> system, slightly denser layout, more utilitarian than the public app.

---

## Wiring them into the site

Drop files into `img/<slug>/` and point `projects.json` at them:

```json
{
  "slug": "bloomly",
  "cover": "img/bloomly/cover.png",
  "gallery": [
    { "src": "img/bloomly/home.png",  "alt": "Home",  "caption": "Home — newborn" },
    { "src": "img/bloomly/ask.png",   "alt": "Ask",   "caption": "Ask — cited answer" },
    { "src": "img/bloomly/feed.png",  "alt": "Feeding","caption": "Feeding log" }
  ]
}
```

The project page picks both up automatically — `cover` replaces the initials
tile, `gallery` renders below the body. Empty array hides the gallery.

**One caveat:** the home page cards in the current design use a generated
initials tile, not `cover`. If you want the real screenshots on the cards too,
that's a small change to `index.html` + `styles.css` — ask and I'll wire it.

## Order I'd do them in

1. **Bloomly** — most screens, most visually distinctive, best showcase.
2. **Meherpur Sheba** — client work, proves you ship for other people.
3. **Family Safety** — the map and the two-role idea are the hook.
4. **ITN VPN** — you already have Play listing screenshots in `play/`; reuse
   those before generating new ones.
