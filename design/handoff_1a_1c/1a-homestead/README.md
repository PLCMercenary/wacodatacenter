# Design: 1a Homestead (site-wide)

Light, agricultural, neighborly. Warm cream, forest green, terracotta, Newsreader headlines over Public Sans. This package covers every page on wacodatacenter.com in the 1a visual system.

**Page structure, content, data bindings, form fields, responsive rules and behavior are identical to 1b.** `../1b-public-record/README.md` sections 3 to 8 are the canonical spec. Wherever it names a 1b token or font, swap in the matching value from the mapping table below. This README only covers what differs.

## Files

| File | Contents | Frame ids |
|---|---|---|
| `Homestead Home.dc.html` | Homepage (direction 1a as approved, with the nav updated) | 3a |
| `Homestead Content Pages.dc.html` | Updates index, article, press, resources index, resource page, privacy | 3b to 3g |
| `Homestead Meetings.dc.html` | Events calendar (category chips work) | 3h |
| `Homestead Forms.dc.html` | Contact, yard signs, thank you, email modal, Change.org modal, 404 | 3i to 3n |
| `Homestead System.dc.html` | Tokens, type, components, mobile | 3p to 3r |
| `HSHeader.dc.html`, `HSFooter.dc.html` | Shared chrome | |

## Tokens

```css
:root{
  --paper:#f6f2ea; --ink:#1f2a1f;
  --forest:#24452f; --forest-hover:#1b3424;
  --terracotta:#b8552e; --terracotta-hover:#9f4626;
  --muted:#566052; --sage-label:#5d6b5a; --meta:#6b6656;
  --rule:#d8d0bf; --input-rule:#cfc5b0; --sand:#ece5d6;
  --field:#fffdf8; --error-tint:#f8e7dc;
  --on-forest:#f6f2ea; --on-forest-2:#d7e0cc; --on-forest-label:#c9d6b8;
  --date-chip-bg:#f3e6d8; --date-chip-fg:#8a3b1c;
  --f-display:'Newsreader',serif;   /* opsz 6..72; 400, 500, 600, italic 400 */
  --f-ui:'Public Sans',sans-serif;  /* 400, 500, 600, 700 */
  --r-frame:20px; --r-card:16px; --r-input:10px; --r-pill:999px;
}
```

## Mapping from 1b

| 1b | 1a |
|---|---|
| paper `#f3f1ec` | `--paper` `#f6f2ea` |
| ink text `#141414` | `--ink` `#1f2a1f` |
| ink bands, ink buttons | `--forest` `#24452f` |
| red `#c8361c` (CTA, meeting band, kickers) | `--terracotta` `#b8552e` |
| 1px ink rules | 1px `--rule` `#d8d0bf` (inputs use `#cfc5b0`) |
| 4px heavy rules | 1px `--rule`. Hierarchy comes from Newsreader size, not rule weight. |
| 2px ink outline buttons | 1.5-2px `--forest` outline pill |
| Archivo 900 uppercase | Newsreader 500, sentence case, -0.02em. Sizes about 0.7× above 60px and 0.8× from 40 to 59px (120→84, 80→56, 52→42), line-height 1.04 |
| Archivo Narrow (titles, 20px and up) | Newsreader 500, sentence case |
| Archivo Narrow (nav, buttons, labels) | Public Sans 600, about 0.85× size, sentence case |
| Source Serif 4 body | Public Sans 400, 1px smaller at 19px and up |
| Plex Mono uppercase labels | Public Sans 700, 0.14em, uppercase (the 1a eyebrow) |
| Plex Mono dates and meta | Public Sans 600, `tabular-nums` |
| radius 0 | buttons, chips and tags are pills; inputs 10px (textarea 14px); boxed areas 16px; page frame 20px |
| no shadows | still none, except the floating meeting card on home: `0 10px 30px rgba(31,42,31,.12)` |

## Chrome

- **Header** (`HSHeader`): a forest announcement bar ("Yard signs are back in stock." · "$5 each…" · Order a sign), then a row padded 22×56 with a 1px `--rule` below. It holds the logo mark (40px forest circle, terracotta lower band, paper sun dot) and the Newsreader 23 wordmark over a "COMMUNITY ACTION" label. Nav in Public Sans 15/500, gap 32: The Project (`/#facts`), Updates, Press, Meetings, Resources, then a terracotta pill "Sign the petition". Active item: terracotta, 600, 2px underline offset 6.
- **Footer** (`HSFooter`): a forest panel inset 24px with radius 20, grid `1.4fr 1fr 1fr 1fr`, gap 40, padding 56. It holds the paper version of the mark, the tagline in `--on-forest-2`, and a terracotta pill CTA. Column labels: Public Sans 12/700 0.16em `--on-forest-label`. Links: 16/500. Below the panel, a 14px `--meta` line.
- **Nav names:** Blog becomes **Updates** and Resources stays **Resources** (1b calls these The Record and Documents). Page titles follow the nav.

## Notes per page
- **Home (3a):** unchanged from `design_handoff_homepage_redesign/README.md` Direction 1a, except Press is added to the nav, Yard Signs is dropped from it (the announcement bar covers it), and the footer is replaced by `HSFooter`.
- **Index headers:** the titles are Newsreader 84 in sentence case. The grid stays `minmax(0,1fr) 440px`.
- **Article (3c):** H2s in Newsreader 32 with the terracotta section number. The pull quote is Newsreader 45 between 1px rules (no 4px rules). Lists keep numbered rows.
- **Meeting band (3h):** terracotta with white text. The date block has a white 2px border and radius 16. Buttons are white and outline pills.
- **Forms (3i, 3j):** inputs have radius 10 on a `--field` background. Focus: terracotta border plus a 1px terracotta ring. Segmented controls sit in a 16px-radius container, with forest fill for the selected option.
- **Modals (3l, 3m):** radius 16. The email header bar is forest and the petition header bar is terracotta.
- **Placeholder stripes:** `#e9e2d3` / `#f1ebe0`.

## Build notes
This package was produced by mapping the 1b page layouts onto the 1a system. Expect small spacing touch-ups during the build, mostly where 1b's flush, square button pairs now sit as pills. Pills should get a 10px gap.
