# Designs in this repo

Three takes on the same portfolio. The root is the live site; the other two are
kept for reference.

| Path | Design | Status |
|---|---|---|
| `/` | **Editorial** — cream paper, Fraunces serif, illustrated cards, light/dark toggle | **Live** |
| `/v1/` | **Original** — dark, lime accent, numbered sections | Archived |
| `/v2/` | **Condensed** — near-black navy, Big Shoulders display type, searchable work board | Archived |

Each folder is self-contained — its own HTML, CSS, JS and `projects.json` — so
none depends on another.

## Preview

```powershell
cd "C:\Users\0akud\Desktop\My Profile"
python -m http.server 8000
```

- <http://localhost:8000/> — editorial (live)
- <http://localhost:8000/v1/> — original
- <http://localhost:8000/v2/> — condensed

## How the promotion was done

The editorial design was built at `v3/`, then copied over the root. The old
root files were moved into `v1/` first, so nothing was overwritten, and `v3/`
was removed because it became a byte-identical duplicate of the root.

Git still has the full history of the original if you ever need it back:

```powershell
git log --oneline -- index.html
```

## Project data

Each design has its own copy of `projects.json`. **Editing a project means
editing the one you care about** — if you only ship the root, you only need to
edit the root's copy. `v1/` and `v2/` are frozen snapshots.

The 21 projects are identical across all three.

## Image assets

All 21 projects currently use a generated initials tile instead of a cover
image. See `MOCKUP-PROMPTS.md` for briefs and prompts to produce real screens,
and for how to wire them into `projects.json`.
