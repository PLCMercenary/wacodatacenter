# Design: 1c Next Door (site-wide)

Dark and focused on scale. Near-black, bone text, amber accent, Barlow Condensed display over Barlow. This package covers every page on wacodatacenter.com in the 1c visual system.

**Page structure, content, data bindings, form fields, responsive rules and behavior are identical to 1b.** `../1b-public-record/README.md` sections 3 to 8 are the canonical spec. Wherever it names a 1b token or font, swap in the matching value from the mapping table below. This README only covers what differs.

## Files

| File | Contents | Frame ids |
|---|---|---|
| `Next Door Home.dc.html` | Homepage (direction 1c as approved, with the nav updated) | 4a |
| `Next Door Content Pages.dc.html` | Updates index, article, press, resources index, resource page, privacy | 4b to 4g |
| `Next Door Meetings.dc.html` | Events calendar (category chips work) | 4h |
| `Next Door Forms.dc.html` | Contact, yard signs, thank you, email modal, Change.org modal, 404 | 4i to 4n |
| `Next Door System.dc.html` | Tokens, type, components, mobile | 4p to 4r |
| `NDHeader.dc.html`, `NDFooter.dc.html` | Shared chrome | |

## Tokens

```css
:root{
  --night:#0f1311; --panel:#171c19; --bone:#ece6d8; --on-amber:#111;
  --amber:#e89a2c; --amber-hover:#d4881f;
  --bone-2:#cfc8b8; --compare-muted:#bfb8a9; --muted:#8f897c; --disabled:#6f6a5f;
  --hairline:rgba(236,230,216,.18); --hairline-head:rgba(236,230,216,.32);
  --hairline-strong:rgba(236,230,216,.5); --hairline-band:rgba(236,230,216,.15);
  --field:#151a17; --hover:#1c221f; --error-tint:#2a1f10;
  --f-display:'Barlow Condensed',sans-serif; /* 500, 600, 700, 800 */
  --f-ui:'Barlow',sans-serif;                /* 400, 500, 600, italic 400 */
  --r-btn:3px; --r-tag:2px; --r-card:6px;
}
```

## Mapping from 1b

| 1b | 1c |
|---|---|
| paper `#f3f1ec` | `--night` `#0f1311` |
| ink text `#141414` | `--bone` `#ece6d8` |
| ink bands and panels | `--panel` `#171c19` |
| ink buttons, active chips, checked boxes | bone fill with `#111` text |
| red `#c8361c` (CTA, meeting band, kickers) | `--amber` `#e89a2c`. Text on amber is always `#111`. |
| white elements on the red band | `#111` (borders) and `#111` fill with bone text (buttons) |
| 1px ink rules | `--hairline` |
| 4px heavy rules | 1px `--hairline-head` |
| 2px ink outline buttons | 2px `--hairline-strong` |
| Archivo 900 uppercase | Barlow Condensed 800 uppercase, 1.1× size |
| Archivo Narrow titles and labels | Barlow Condensed 700 uppercase, 1.1× size |
| Archivo Narrow buttons under 21px | Barlow 600, sentence case, 0.9× size |
| Source Serif 4 body | Barlow 400 |
| Plex Mono uppercase labels | Barlow Condensed 600, 0.14em, 2px larger |
| Plex Mono dates and meta | Barlow 500, `tabular-nums` |
| radius 0 | buttons and inputs 3px, chips and tags 2px, boxed areas 6px |

## Chrome
- **Header** (`NDHeader`): night background, padding 26×56, hairline below. Wordmark in Barlow Condensed 800 26 0.04em: "WACO DC" bone plus "COMMUNITY ACTION" amber. Nav in Barlow 15/500, gap 30: The Site (`/#compare`), Updates, Press, Meetings, Resources, then an amber "Sign the petition" button. Active item: amber with a 2px underline offset 8.
- **Footer** (`NDFooter`): a hairline grid (`gap:1px` on a `--hairline-band` background, night cells) with columns `1.4fr 1fr 1fr 1fr`. Column labels in Barlow Condensed 15/700 0.16em amber. Links in Barlow 16/500. A muted 14px line below.
- **Nav names:** Updates and Resources, same as 1a.

## Notes per page
- **Home (4a):** unchanged from `design_handoff_homepage_redesign/README.md` Direction 1c, except Press is added to the nav and the footer is replaced by `NDFooter`. Give the comparison section `id="compare"`.
- **Meeting band (4h):** an amber band with `#111` text and a `#111`-bordered date block. "Add to calendar" is a `#111` button with bone text. It is the loudest element on the site by design; keep it to one per page.
- **Images:** keep the 1b `grayscale(.15) contrast(1.05)` filter. On dark backgrounds, darken the hero and article lead images with a bottom gradient (`rgba(15,19,17,0) 40% → .92`) where text overlaps them.
- **Forms:** inputs on `--field` with a `rgba(236,230,216,.3)` border. Focus: amber border plus a 1px amber ring. Error: amber border on `--error-tint` with an amber message. Native checkboxes use `accent-color: var(--amber)`.
- **Contrast:** `--muted` on night is 5.6:1. Keep anything below 14px at `--bone-2` or brighter.
- **Placeholder stripes:** `#1a1f1c` / `#141916`.

## Build notes
This package was produced by mapping the 1b page layouts onto the 1c system. Expect small touch-ups during the build: paired buttons need a 12px gap, and very long uppercase titles may want `text-wrap:balance`.
