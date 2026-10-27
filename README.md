# profile-site

A single-page personal profile site. No build step, no dependencies, no framework.
Open `index.html` and it works.

```
index.html    structure + content
styles.css    all styling (CSS custom properties, light/dark)
script.js     theme toggle, sticky nav, mobile menu, scroll reveals
```

## Make it yours

Everything you need to change lives in `index.html`. Search and replace:

| Placeholder | Replace with |
|---|---|
| `Your Name` | your name |
| `yourname` (brand) | short handle |
| `Y` (brand mark) | your initial |
| `Your City` | your city |
| `you@example.com` | your email |
| `yourhandle` | your GitHub / LinkedIn / X handles |
| `Software Engineer` (in `<title>`) | your role |
| `Project One/Two/Three` + descriptions | your real projects |
| Stack lists | your real stack |
| Stats under About | real numbers, or delete the block |

Colors live at the top of `styles.css` under `:root` and `[data-theme="light"]`.
Change `--accent` and the whole site follows.

## Local preview

Any static server works:

```bash
python -m http.server 8080
# or
npx serve .
```

Then open http://localhost:8080.

## Deploy — GitHub Pages

Already wired if you cloned this repo from the template:

1. Push to `main`.
2. Repo → Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.
3. Site lands at `https://<user>.github.io/<repo>/` in about a minute.

Custom domain: add a `CNAME` file containing the bare domain, then point a
`CNAME` DNS record at `<user>.github.io`.

## Alternative free hosts

- **Cloudflare Pages** — drag the folder in, unlimited bandwidth.
- **Netlify** — drag the folder onto app.netlify.com/drop.
- **Vercel** — `vercel --prod` in this directory.

All three serve this folder as-is with zero configuration.
