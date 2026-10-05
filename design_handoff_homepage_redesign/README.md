# Handoff: wacodatacenter.com Homepage Redesign (3 directions)

## Overview
Three alternative homepage designs for wacodatacenter.com, the community site opposing the L2D2 / Infrakey hyperscale data center in Elm Mott, TX. They replace the current Bootstrap-Agency-style homepage in `layouts/index.html`.

- **1a Homestead**: light, agricultural, neighborly. Warm cream, forest green, terracotta, serif headlines.
- **1b Public Record**: civic newsprint. Off-white paper, black rules, safety red, heavy grotesk + monospace. Built around receipts and the timeline.
- **1c Next Door**: dark and focused on scale. Near-black, bone text, amber accent, condensed type. Leads with "1.2 gigawatts. Next door." and a comparison table showing how a well-sited project differs from L2D2.

All three share the same messaging. Lead with siting, not water. The four core facts are: 1.2 GW scale, 520 acres with homes on every side, two two-lane county roads, ERCOT has no grid headroom. This follows `CLAUDE.md` (not anti-data-center, anti-this-siting) and `TONE.md` (no em-dashes, no ellipses, no emojis).

**The owner has not picked a direction yet.** Don't implement all three. Ask which one to build, or build the chosen one on a branch. Each is fully specified below so any of them can be built from this README alone.

## About the Design Files
`Homepage Directions.dc.html` is a **design reference created in HTML**. It shows the intended look and isn't production code to copy. The job is to recreate the chosen design inside the existing Hugo site:

- Hugo templates in `layouts/` (no theme; first-party layouts)
- Static CSS in `static/css/style.css`
- **No build pipeline.** No npm, Tailwind or bundler (see CLAUDE.md). Plain CSS with custom properties.
- Bootstrap 5.3 is currently loaded in `layouts/_default/baseof.html`. These designs don't need Bootstrap's components. Recommended: keep the Bootstrap grid only if other pages still depend on it, and write the new homepage with plain CSS grid/flex. Font Awesome isn't used by any of the three designs.

To view the reference, open `Homepage Directions.dc.html` in a browser with `support.js` and `assets/` next to it. The three designs sit side by side on a pan/zoom canvas.

## Fidelity
**High fidelity** for desktop at 1280px wide: final colors, type, spacing and copy. Mobile layouts weren't drawn. Responsive rules are specified under Interactions & Behavior.

---

## Shared content & data bindings (all three directions)

| Element | Source in repo | Notes |
|---|---|---|
| Petition signatures `3,698` | `.Site.Data.metrics.petition.signatures` | Format with thousands separator (`lang.FormatNumber 0`). |
| Local % `72%` | `.Site.Data.metrics.petition.local_supporters` | |
| Petition milestone copy | `.Site.Data.metrics.petition.milestone` | "More signatures than half of Lacy Lakeview's population (2020 Census)" |
| Facebook members `8,491` | `.Site.Data.metrics.facebook.members` | |
| Facebook milestone | `.Site.Data.metrics.facebook.milestone` | Strip the 🎉 the current template adds (no emojis). |
| "Updated July 5, 2026" (1b) | `.Site.Data.metrics.updated` | Parse and format "January 2, 2006". |
| Next meeting card | Reuse the logic in `layouts/partials/next-meeting.html` (next `highlight: true`, not `completed`, date >= today from `content/events.md`) | **The Oct 13 / Lacy Lakeview City Council / 6:00 PM content in the mocks is a placeholder.** Hide the block when there's no event. Show the Agenda link only if `agenda_url` is set. |
| Latest posts (3) | `first 3 (where (where .Site.RegularPages "Section" "posts") ".Params.unlisted" "!=" true)` | Same query as today. Mocks show these titles: "Not a Partnership, a Takeover Plan", "Twisting Texas Law to Wreck Our Way of Life", "Misinformation, Hawaii Boondoggles, and a 50-Year Giveaway". The category label (Open letter / Analysis) should come from the first item in `.Params.categories`. Image from `.Params.image` or `.Params.featured_image`, falling back to a landscape asset. |
| Timeline (1b) | Currently hard-coded in `index.html` | Keep it hard-coded or move it to `data/timeline.yaml`. Show the 4 most recent entries. |
| Petition URL | `https://www.change.org/p/stop-infrakey-data-center-from-building-in-lacy-lakeview` | **Keep the existing Change.org warning modal** (`#changeOrgModal`) in front of every "Sign the petition" button. Restyle it to the chosen direction. |
| Legal fund URL | `https://www.gofundme.com/f/protect-our-water-fund` | |
| Yard signs | `/yard-signs/` | |
| Email signup | Netlify form `email-signup` (fields: name, email, zip optional, consent checkbox, honeypot `bot-field`, action `/thank-you/`) | 1a shows an inline email field. Clicking Sign up can open the existing modal, or the full form can go inline. Keep every field and the consent text. |
| Facebook group | `https://www.facebook.com/share/g/17cFKqY3q8/?mibextid=wwXIfr` | |

### Shared fact copy (verbatim, all three)
1. **1.2 GW**: Hyperscale. 925 MW planned, up to 1.2 GW at full build-out. Phase I alone targets 300 MW.
2. **520 ac**: Homes and generational homesteads on every side, in unincorporated McLennan County.
3. **2 lanes / 2 roads**: Two two-lane county roads in and out, both through the neighborhoods.
4. **ERCOT**: The Dakotas have surplus wind and hydro and site these away from people. Texas doesn't have that headroom.

Exact wording differs a little per direction. Use the strings in the sections below.

---

## Direction 1a: Homestead

### Tokens
| Token | Value | Use |
|---|---|---|
| `--paper` | `#f6f2ea` | Page background |
| `--ink` | `#1f2a1f` | Body text |
| `--forest` | `#24452f` | Primary: announcement bar, metrics panel, secondary buttons, stat numerals |
| `--terracotta` | `#b8552e` | Primary CTA (petition), eyebrow on the meeting card, text links in the action strip |
| `--muted` | `#566052` | Secondary body text |
| `--sage-label` | `#5d6b5a` | Eyebrow labels |
| `--rule` | `#d8d0bf` | Fact grid dividers |
| `--sand` | `#ece5d6` | Action strip background |
| `--date-chip` | `#f3e6d8` bg / `#8a3b1c` text | Meeting date block |
| Panel text on forest | `#f6f2ea`, secondary `#d7e0cc`, eyebrow `#c9d6b8` | |
| Hero overlay | `linear-gradient(90deg, rgba(20,28,18,.72) 0%, rgba(20,28,18,.35) 50%, rgba(20,28,18,0) 75%)` | |

Fonts (Google): **Newsreader** (opsz 6..72; 400, 500, 600, italic 400/500) for display. **Public Sans** 400/500/600/700 for UI and body.
Radii: hero and panels 20px, cards 14–16px, date chip 12px, all buttons pill (999px).
Shadow: meeting card `0 10px 30px rgba(31,42,31,.12)`.

### Layout (top to bottom, 1280 desktop)
1. **Announcement bar.** `--forest` bg, `--paper` text, 14px, centered, padding 10px 24px, gap 16px. Copy: **"Yard signs are back in stock."** (600) · "$5 each, every dollar goes to legal and advocacy." (85% opacity) · underlined link "Order a sign" → /yard-signs/.
2. **Header.** Padding 22px 56px, space-between.
   - Logo: a 40px circle in `--forest` with the bottom 16px filled terracotta and a 12px `--paper` dot at (14,11) as a sun. This is a stand-in for whatever logo gets chosen. Wordmark "Waco Data Center" in Newsreader 23/600, line-height 1. Below it "COMMUNITY ACTION" in Public Sans 11px, letter-spacing .2em, `--sage-label`.
   - Nav: gap 32px, 15/500: The Project · Updates · Meetings · Resources · Yard Signs. Then a pill CTA "Sign the petition" (terracotta bg, white, padding 11×20, 600).
3. **Hero.** Inset 24px from the page edges, height 620px, radius 20, background `homes-pasture-sunset` (u7.png) cover/center with the overlay above. Content sits absolute at left 56px, bottom 64px, max-width 640px, gap 22px:
   - Eyebrow "ELM MOTT · ROSS · LACY LAKEVIEW": 13px, .18em, 600, `#f1dcb5`.
   - H1 "Good data centers exist. This one's in the wrong place.": Newsreader 76/0.98, 500, -0.02em, `text-wrap: balance`, white.
   - Lede: 19/1.5, max 540px, `#f3efe6`: "L2D2 is a 1.2 GW hyperscale campus planned on 520 acres of farmland, with homes on every side. We're the neighbors who read the minutes."
   - Buttons (gap 12): "Sign the petition" (terracotta pill, 16×26 padding, 16/600). "Why this site fails" (ghost pill: `rgba(255,255,255,.14)` bg, 1px `rgba(255,255,255,.5)` border) anchors to the facts section.
4. **Next meeting card.** White, radius 16, overlaps the hero bottom by 44px (`margin:-44px 80px 0`), padding 26×32. Grid `auto 1fr auto`, gap 32.
   - Date chip 84×84: month "OCT" 13/700 .12em, day "13" in Newsreader 38/600.
   - Eyebrow "NEXT MEETING THAT MATTERS" 12/700 .16em terracotta. Title Newsreader 27/500. Meta line 15px `--muted`: "Tuesday, 6:00 PM · Lacy Lakeview City Hall · Public comment open" (from `notes`).
   - Buttons: "Agenda" (1.5px forest outline pill) and "All meetings" (forest pill) → /events/.
5. **Facts.** Padding 110 80 90. Grid `400px 1fr`, gap 72.
   - Left: eyebrow "THE SHORT VERSION". H2 "We're not against data centers. We're against this siting." in Newsreader 46/1.05, 500. Body 17/1.6 `--muted`: "Done right, a data center pays its way, hires locally and sits on land that fits the use. L2D2 fails on four counts you can check yourself."
   - Right: a 2×2 grid with a top border and 1px `--rule` lines between cells (cells padded 28px). Each cell has a numeral in Newsreader 56/1, 500, forest, then a title at 17/600 and body at 15/1.55 `--muted`:
     - 1.2 GW / Hyperscale, not a neighborhood server farm / 925 MW planned, up to 1.2 GW at full build-out. Phase I alone targets 300 MW.
     - 520 ac / Homes on every side / Farmland in the middle of generational homesteads in unincorporated McLennan County.
     - 2 lanes / Two county roads in and out / Both run straight through the neighborhoods. Construction traffic goes where the school buses go.
     - ERCOT / No spare grid to lean on / The Dakotas have surplus wind and hydro and site these away from people. Texas has neither advantage here.
6. **Metrics panel.** Inset 24px, radius 20, forest bg, 2 equal columns, overflow hidden.
   - Left (padding 64×56, gap 28): eyebrow "NEIGHBORS SPEAKING UP". Numeral `3,698` in Newsreader 92/1. Below it 18px "petition signatures, 72% from local ZIP codes". Milestone line 16/1.55 `#d7e0cc`, max 440px, plus the Facebook count. Buttons: "Add your name" (paper pill with forest text, 700) and "Join the Facebook group" (outline pill).
   - Right: `bluebonnets-pond` (u6.png) cover, min-height 420.
7. **Latest posts.** Header row padding 96 80 40: "From the porch" in Newsreader 46/500, with an underlined "All updates" link on the right. Then 3 equal columns with gap 36 and 96px bottom padding. Each card has a 4:3 image (radius 14), category label 13/600 .08em uppercase `#7a6f5c`, and the title in Newsreader 27/1.15, 500.
8. **Action strip.** `--sand` bg, padding 72×80, 3 columns, gap 40. Each has a heading in Newsreader 28/500, body 15/1.55, and a terracotta 700 link:
   - "Put up a sign" / "$5 yard signs and free flyers. Proceeds fund legal counsel." / Order signs
   - "Chip in for counsel" / "Legal review, records requests and research cost real money." / Donate to the legal fund
   - "Get meeting alerts" / an inline email field (white, 1px `#d1c7b2`, pill) and a "Sign up" forest pill button
9. **Footer.** Padding 28×80, 14px `#6b6656`: "Waco Data Center Community Action · Elm Mott, Texas" on the left, "Privacy · Contact · Media" on the right.

---

## Direction 1b: Public Record

### Tokens
| Token | Value | Use |
|---|---|---|
| `--paper` | `#f3f1ec` | Background |
| `--ink` | `#141414` | Text, all rules, the black footer band |
| `--red` | `#c8361c` | Primary CTA, the next-meeting band, category labels, second wordmark line |
| `--muted` | `#6b665c` | Mono item numbers |
| `--body-2` | `#3c3a35` | Timeline body |
| On-black secondary | `#b9b5ab`; footer line `#4b4840`; band dividers `#3a3a3a` | |

Fonts (Google): **Archivo** 800/900 for the masthead, H1, big numerals and section heads. **Archivo Narrow** 500/600/700 for nav, buttons, item titles (uppercase). **Source Serif 4** 400/600 for body. **IBM Plex Mono** 400/500/600 for dates, labels and captions.
Radii: **0 everywhere.** Square buttons, no shadows. Structure comes from 1px `--ink` rules, with 4px rules under the masthead and section heads.

### Layout
1. **Top strip.** Padding 12×48, bottom border 1px ink, Plex Mono 13 .04em. Left: "McLennan County, Texas · Updated {metrics.updated}". Right (gap 24): Yard signs $5 · Legal fund · Contact.
2. **Masthead.** Padding 28 48 20, **4px ink bottom border**, space-between, aligned to the bottom.
   - Wordmark in two lines, Archivo 900 58/0.9, -0.025em, uppercase: "WACO DATA CENTER" in ink, then "COMMUNITY ACTION" in red.
   - Nav in Archivo Narrow 19/600 uppercase, gap 28: The Record · Timeline · Meetings · Documents. Then a red square button "Sign the petition" (padding 12×18).
3. **Hero.** 2 equal columns, 1px rule below, 1px rule between the columns.
   - Left (padding 48 48 52, gap 24): mono eyebrow "RE: L2D2 · INFRAKEY DC PARKS LLC" (13/600 .08em red). H1 "WRONG PROJECT. WRONG PLACE." in Archivo 900 92/0.88, -0.035em. Lede Source Serif 21/1.5, max 520: "A 1.2 GW hyperscale campus on 520 acres of Elm Mott farmland, reached by two county roads and surrounded by homes. Every claim on this site links to the minutes, the MOU, or the resolution number." Buttons sit flush with no gap: "READ THE RECORD" (ink bg, white) and "SIGN THE PETITION" (2px ink outline), both Archivo Narrow 18/700, padding 16×24.
   - Right: photo `council-meeting.webp`, min-height 420, `filter: grayscale(.15) contrast(1.05)`. Caption bar below with a 1px top rule, Plex Mono 12, padding 12×20: "Residents outside a packed Lacy Lakeview City Hall, December 9, 2025. Council approved the MOU 6-1."
4. **Next meeting band.** Red bg, white text, grid `auto 1fr auto`, gap 28, padding 20×48. Mono tag "NEXT MEETING" with a 1.5px white border. Then one line in Archivo Narrow 26/700 uppercase: "{title} · {Day Mon D} · {time} · {location}". Then an underlined "AGENDA" link.
5. **Fact row.** 4 equal columns, 1px rules between them and below. Each cell (padding 32×28, gap 10) has a mono index ("01 / Scale", "02 / Siting", "03 / Access", "04 / Grid"; 12px `--muted`), a numeral in Archivo 900 52/1 (1.2 GW, 520 ac, 2 roads, ERCOT), and body in Source Serif 16/1.5:
   - Hyperscale. Phase I alone is 300 MW.
   - Homes and generational homesteads on every side.
   - Both two-lane, both through our neighborhoods.
   - No surplus wind or hydro headroom like the Upper Midwest.
6. **Timeline + Latest.** Grid `1fr 420px`, 1px rule between.
   - Timeline (padding 48): header row "THE TIMELINE" in Archivo 900 40 uppercase with a 4px rule below, and an underlined mono "Full record" link on the right. Rows use a grid `200px 1fr`, gap 24, padding 22px 0, 1px rule between rows. Date in Plex Mono 14/600. Title in Archivo Narrow 24/700 uppercase. Body in Source Serif 16/1.5 `--body-2`. Entries:
     - Jan 16–20, 2026 / L2D2 announced in Honolulu / Infrakey and Lacy Lakeview unveil the data district at PTC 2026. 925 MW, up to 1.2 GW, over $2 billion at build-out.
     - Jan 13, 2026 / Measure 2026-01 passes / No planned annexations. City borders and ETJ stay the same, though landowner-requested annexations can still be approved.
     - Dec 9, 2025 / Council approves MOU, 6-1 / Non-binding MOU on prospective annexation and water/sewer service. The chamber was packed.
     - June 2025 / 520 acres purchased / Council authorizes the City Manager to negotiate with Infrakey on June 10 and June 24.
   - Latest (padding 48×36, gap 28): "LATEST" in Archivo 900 28 with a 4px rule. Then 3 items, each with a mono category label (12/600 red, uppercase) and a title in Archivo Narrow 27/700, line-height 1.05. 1px rules between items. No images.
7. **Metrics band.** Ink bg, paper text, 3 columns with `#3a3a3a` dividers, padding 44×48.
   - `3,698` (Archivo 900 64) / "PETITION SIGNATURES" (mono 13 .06em) / "More than half of Lacy Lakeview's 2020 population." (15, `#b9b5ab`)
   - `8,491` / "FACEBOOK MEMBERS" / "About 1,000 more than Lacy Lakeview has citizens."
   - Two full-width stacked buttons: "SIGN THE PETITION" (red) and "ORDER A YARD SIGN · $5" (2px paper outline), both Archivo Narrow 19/700.
8. **Footer.** Paper bg, Plex Mono 12 `#4b4840`, padding 22×48: "Waco Data Center Community Action · Elm Mott, TX" on the left, "Code MIT licensed. Fork it for your county." on the right.

---

## Direction 1c: Next Door

### Tokens
| Token | Value | Use |
|---|---|---|
| `--night` | `#0f1311` | Page background |
| `--bone` | `#ece6d8` | Primary text, light button |
| `--amber` | `#e89a2c` | Accent: eyebrows, numerals, primary CTA (with `#111` text) |
| `--bone-2` | `#d9d3c5` / `#cfc8b8` | Hero lede / meeting meta |
| `--muted` | `#8f897c` | Labels, footer |
| `--compare-muted` | `#bfb8a9` | "Well-sited" column text |
| Hairline | `rgba(236,230,216,.18)` (tables and cards), `.15` for the footer rule, `.2` for comparison rows | |
| Hero overlay | `linear-gradient(180deg, rgba(15,19,17,.55) 0%, rgba(15,19,17,.25) 35%, rgba(15,19,17,.92) 88%, #0f1311 100%)` | |

Fonts (Google): **Barlow Condensed** 500/600/700/800 for display, uppercase. **Barlow** 400/500/600 for body and UI.
Radii: 3px buttons, 6px cards and panels. No shadows.

### Layout
1. **Hero.** Full-bleed, height 760, background `hay-bales-barn-sunset` (u5.png) cover with the overlay above.
   - Header is absolute at the top, padding 26×56. Wordmark in Barlow Condensed 800 26 .04em uppercase: "WACO DC" in bone, then "COMMUNITY ACTION" in amber. Nav 15/500, gap 30: The Site · Updates · Meetings · Resources, plus an amber "Sign the petition" button (3px radius, padding 11×18).
   - Content block absolute at left/right 56 and bottom 56. Grid `1fr 360px`, gap 56, aligned to the bottom.
     - Eyebrow "PROPOSED: LACY LAKEVIEW DATA DISTRICT" in Barlow Condensed 18/600 .2em amber.
     - H1 "1.2 GIGAWATTS. / NEXT DOOR." on two lines, Barlow Condensed 800 150/0.85.
     - Lede 20/1.5 `#d9d3c5`, max 620: "A hyperscale campus on 520 acres of farmland, homes on every side, two county roads in and out. A good project in the wrong place is still the wrong project."
     - The next meeting card sits on the right: `rgba(15,19,17,.78)` bg, 1px hairline, radius 6, padding 24, gap 12. Eyebrow "NEXT MEETING" in amber. Title in Barlow Condensed 30/700 uppercase. Meta 15/1.5 on two lines (date · time / location). Bone button "Plan to attend".
2. **Comparison.** Intro padding 88 56 40: eyebrow "HOW A GOOD SITE COMPARES". H2 in Barlow Condensed 700 64/0.95 uppercase, max 900: "Data centers can work. Here's what that takes, and where L2D2 lands."
   Table with 56px side margins, grid `220px 1fr 1fr`, gap 32, hairline rows. Header row is Barlow Condensed 16/600 .14em uppercase `--muted`, with blank / "WELL-SITED PROJECT" / "L2D2" (amber). Body rows have padding 26px 0. The row label is Barlow Condensed 30/700 uppercase. The well-sited column is 18/1.5 `--compare-muted`; the L2D2 column is 18/1.5 bone.
   - NEIGHBORS / Industrial land with a buffer from homes / Homes and generational homesteads on every side of 520 acres
   - ROADS / Highway or rail access that skips residential streets / Two two-lane county roads that run through our neighborhoods
   - GRID / Surplus generation, like Upper Midwest wind and hydro / ERCOT, with no comparable headroom for 1.2 GW
   - SCALE / Footprint matched to the parcel and the town / 925 MW planned, up to 1.2 GW, over $2 billion at build-out
3. **Metrics.** 88px top margin, 56px side margins. 3 columns separated by 1px hairlines: the grid uses `gap:1px` on a hairline background with `--night` cells, plus an outer hairline border. Cells are padded 36×32.
   - `3,698` (Barlow Condensed 800 84 amber) / "petition signatures" (17) / "72% from local ZIP codes" (14 muted)
   - `8,491` / "neighbors in the Facebook group" / "More than Lacy Lakeview's population"
   - Two stacked buttons: amber "Sign the petition" and a hairline outline "Get a yard sign, $5" (17/600, padding 16).
4. **Latest.** Header padding 88 56 32: "LATEST FROM THE FIGHT" in Barlow Condensed 700 48, with an amber "All updates" link on the right. Grid `1.4fr 1fr`, gap 28, 88px bottom padding.
   - The feature card (newest post) is min-height 440, radius 6, with a cover image (council-meeting.webp in the mock) and a bottom gradient `rgba(15,19,17,0) 40% → .92`. Inside, padding 28: amber category label (Barlow Condensed 15/700 .16em) and title in Barlow Condensed 44/700, line-height 1, uppercase.
   - Two stacked text cards on the right (flex 1, hairline border, radius 6, padding 28, content aligned to the bottom). Each has a category label and a title in Barlow Condensed 32/700 uppercase.
5. **Footer.** Hairline top rule, padding 26×56, 14px muted: "Waco Data Center Community Action · Elm Mott, Texas" on the left, "Legal fund · Privacy · Contact" on the right.

---

## Interactions & Behavior (all directions)
- Links: underline on hover. Buttons: darken the background ~8% on hover and add a 2px focus-visible outline in the direction's accent color. 150ms transitions.
- "Sign the petition" opens the existing Change.org warning modal and never links straight out.
- Anchors: 1a "Why this site fails" → `#facts`. 1b nav "Timeline" → `#timeline`.
- No animation is specified. Keep the pages static and fast.
- **Responsive** (not drawn; please implement):
  - Content max-width 1280, centered. Side padding drops to 20px below 768px.
  - Every multi-column grid collapses to 1 column below 768px. The 1b fact row goes to 2×2 at 768–1024px.
  - Display type uses `clamp()`: 1a H1 `clamp(44px, 6vw, 76px)`, 1b H1 `clamp(52px, 7.2vw, 92px)`, 1c H1 `clamp(64px, 11.7vw, 150px)`.
  - 1a hero height becomes `min(620px, 80vh)`. The meeting card stops overlapping and stacks below the hero on mobile.
  - 1c hero switches to `min-height` with the content in normal flow on mobile. The meeting card moves below the H1.
  - Nav collapses to a menu button below 900px. The petition CTA stays visible.
  - 1c comparison table: on mobile each row becomes its label followed by two stacked lines, "Well-sited:" and "L2D2:".
  - Minimum tap target is 44px.

## State Management
None beyond what Hugo already does at build time. The next-meeting selection and post list are evaluated at build time, so Netlify needs to rebuild daily (or on content change) for the next meeting to stay current. Consider a scheduled build hook.

## Assets
| File | Description | Used in |
|---|---|---|
| `assets/u7.png` (1916×821) | Stone homes, oaks and a pasture with cattle at sunset | 1a hero, 1a post card |
| `assets/u6.png` (1916×821) | Bluebonnets and paintbrush, oak, pond, open land | 1a metrics panel |
| `assets/u5.png` (1916×821) | Round hay bales, barn and windmill at sunset | 1c hero, 1a post card |
| `assets/council-meeting.webp` (2000×1334) | Residents at Lacy Lakeview City Hall, Dec 9, 2025 (already in repo at `static/images/251209-JH-Lacy-Data-Center-06.webp`) | 1b hero, 1a/1c post cards |

The three landscapes are AI-generated images supplied by the site owner. Move them to `static/images/` under descriptive names (e.g. `homes-pasture-sunset.jpg`, `bluebonnets-pond.jpg`, `hay-bales-barn-sunset.jpg`). Convert them to WebP/JPEG at about 1920px wide and set `loading="lazy"` on everything below the fold.

**Logo:** the owner has several logo explorations but hasn't chosen one. Each direction uses a typographic wordmark as a stand-in. Build the wordmark as a partial (`partials/logo.html`) so the final mark is easy to swap in.

**Icons:** none. The designs intentionally use no icon font. Font Awesome can be dropped from the homepage.

## Copy rules (from TONE.md, enforced)
No em-dashes, no spaced hyphens used as dashes, no ellipses, no emojis anywhere. The current metrics template outputs 🎉, so remove it. Keep the framing that we oppose this siting, not data centers.

## Files in this bundle
- `Homepage Directions.dc.html`: all three directions side by side (ids `#1a`, `#1b`, `#1c`). Open it in a browser.
- `support.js`: runtime needed to open the reference file.
- `assets/`: the images listed above.
- Repo files to change: `layouts/index.html`, `layouts/partials/next-meeting.html`, `layouts/_default/baseof.html` (fonts and the Bootstrap decision), `static/css/style.css`, and optionally `data/timeline.yaml` (new).
