# Design: 1b Public Record (site-wide)

This folder documents direction **1b Public Record** for every page on wacodatacenter.com: home, The Record (posts), articles, press, documents, resource pages, meetings, contact, yard signs, thank-you pages, modals, 404 and plain pages. It extends `design_handoff_homepage_redesign/` (which covers the homepage only) and supersedes the 1a and 1c directions.

The `.dc.html` files are **design references**, not production code. Rebuild them in the existing Hugo site with first-party layouts and plain CSS (`static/css/style.css`). No build step, no npm, no Tailwind (see `CLAUDE.md`). Bootstrap and Font Awesome can be removed once every layout below is ported.

## Files

| File | Contents | Frame ids |
|---|---|---|
| `Public Record Home.dc.html` | Homepage | 2a |
| `Public Record Content Pages.dc.html` | The Record index, article, press, documents, resource page, privacy | 2b to 2g |
| `Public Record Meetings.dc.html` | Events calendar (category chips work) | 2h |
| `Public Record Forms.dc.html` | Contact, yard signs, thank you (4 variants), email modal, Change.org modal, 404 | 2i to 2n |
| `Public Record System.dc.html` | Tokens, type scale, components and states, mobile at 390px | 2p to 2r |
| `PRHeader.dc.html`, `PRFooter.dc.html` | Shared header and footer used by every page above | |
| `support.js` | Runtime that lets the reference files open in a browser | |
| `assets/` | `council-meeting.webp`, `land1.jpeg`, `land2.webp` (all already in `static/images/`) | |

Open any `.dc.html` in a browser with `support.js` and `assets/` beside it. Each file is a pan and zoom canvas. Desktop frames are 1280px wide and high fidelity. Mobile is drawn for four pages in 2r; the rules under **Responsive** cover the rest.

---

## 1. Tokens

Put these in `:root` in `static/css/style.css`.

```css
:root{
  --paper:#f3f1ec;      /* page background */
  --ink:#141414;        /* text, every rule, ink bands, ink buttons */
  --red:#c8361c;        /* primary CTA, meeting band, kickers, focus ring on ink */
  --red-hover:#b02f18;
  --red-on-ink:#e2573c; /* red type on the ink footer only */
  --body-2:#3c3a35;     /* deks, secondary body */
  --muted:#6b665c;      /* mono indexes and column heads, 12px and up only */
  --meta:#4b4840;       /* footer line, fine print */
  --on-ink-2:#b9b5ab;   /* secondary text on ink */
  --rule-on-ink:#3a3a3a;
  --field:#fbfaf7;      /* input background */
  --error-tint:#fbeee9;
  --hover-row:#e9e6df;  /* table row and outline button hover */

  --f-display:'Archivo',sans-serif;          /* 800, 900 */
  --f-narrow:'Archivo Narrow',sans-serif;    /* 500, 600, 700 */
  --f-serif:'Source Serif 4',serif;          /* 400, 600, italic 400 */
  --f-mono:'IBM Plex Mono',monospace;        /* 400, 500, 600 */

  --rule:1px solid var(--ink);
  --rule-heavy:4px solid var(--ink);
  --gutter:48px;        /* 20px below 768px */
  --max:1280px;
}
```

Google Fonts URL (replace Montserrat and Roboto Slab in `baseof.html`):
`https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=Archivo+Narrow:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap`

**Radius is 0 everywhere. No shadows. No icons.** Structure comes from 1px ink rules, with a 4px rule under the masthead and under every section head. Arrows (`↗`, `▾`, `+`, `✕`, `✓`) are plain text glyphs in Plex Mono.

## 2. Type scale

| Token | Spec | Used for |
|---|---|---|
| `display-xl` | Archivo 900, 120/0.85, -0.04em, uppercase | Index page titles: THE RECORD, IN THE PRESS, MEETINGS, CONTACT. Single long words (DOCUMENTS, YARD SIGNS & FLYERS) drop to 104 so they fit the minmax(0,1fr) track beside the 440px description |
| `h1-home` | Archivo 900, 92/0.88, -0.035em | Homepage hero |
| `h1-article` | Archivo 900, 80/0.9 (72 on resource pages), -0.035em, `text-wrap:balance` | Article and resource titles |
| `lead-title` | Archivo 900, 46-54/0.95, -0.03em | Lead story, featured press item, next meeting title |
| `numeral` | Archivo 900, 52-64/1, -0.03em | Fact row, metrics, $5, step numbers |
| `section-head` | Archivo 900, 28-36, uppercase, 14px padding then 4px rule | Every section heading |
| `h2-article` | Archivo Narrow 700, 32/1.05, uppercase, 20px padding above a 1px rule, red mono section number in a 44px column | `##` in markdown |
| `item-title` | Archivo Narrow 700, 22-27/1.05 (uppercase in calendar and directory rows, sentence case in post lists) | List rows, cards |
| `nav / button` | Archivo Narrow 600-700, 17-19, uppercase, 0.02em | Nav, buttons, field labels (16) |
| `body-article` | Source Serif 4, 20/1.65, max 700px | Article body |
| `body-ui` | Source Serif 4, 15-19/1.5 | Deks, descriptions, help text |
| `mono-label` | Plex Mono 600, 12-13, 0.06em, uppercase | Kickers (red), column heads (muted), tags |
| `mono-meta` | Plex Mono 400-600, 12-14 | Dates, times, file paths, captions, breadcrumbs |

Minimum text size is 11px (mono tags only). Body copy never drops below 15px.

## 3. Shared chrome

### Header (`partials/header.html`, see `PRHeader.dc.html`)
1. **Top strip.** Padding 12×48, 1px rule below, Plex Mono 13 0.04em. Left: `McLennan County, Texas · Updated {metrics.updated | "January 2, 2006"}`. Right, gap 24: Yard signs $5 → `/yard-signs/`, Legal fund → GoFundMe, Contact → `/contact/`.
2. **Masthead.** Padding 22 48 16, 4px rule below. Wordmark Archivo 900 34/0.9, two lines: WACO DATA CENTER (ink) / COMMUNITY ACTION (red). The homepage uses the larger 58px masthead from the homepage handoff; every other page uses this compact 34px version. Build the wordmark as `partials/logo.html` so a final logo can drop in.
3. **Nav.** Archivo Narrow 19/600 uppercase, gap 28: The Record → `/posts/`, Press → `/media/`, Meetings → `/events/`, Documents → `/resources/`, then a red "Sign the petition" button (padding 12×18) that opens `#changeOrgModal`. Active section: red text with a 3px underline offset 8px. Set the active item by comparing `.Section` (posts, media, resources) or `.Layout` (events).

**`hugo.toml` menu change:** replace Home / Blog / Media / Resources / Events / Take Action / Contact with The Record, Press, Meetings, Documents. Contact and Yard signs move to the top strip. Timeline is a homepage anchor (`/#timeline`) linked from the footer.

### Footer (`partials/footer.html`, see `PRFooter.dc.html`)
Ink band, grid `1.4fr 1fr 1fr 1fr`, 1px `--rule-on-ink` dividers and a 1px top line, cells padded 44×32 (first cell 44×48).
- Col 1: wordmark at 26px (second line in `--red-on-ink`), one line of serif 15 `--on-ink-2`: "Neighbors of the L2D2 site in Elm Mott, Ross and Lacy Lakeview. We oppose this siting, not data centers.", then a red Sign the petition button.
- Col 2 READ: The Record, Timeline, Press, Documents.
- Col 3 SHOW UP: Meetings, Yard signs, Legal fund, Email alerts (opens the email modal).
- Col 4 REACH US: Contact, Facebook group, GitHub, Privacy.
- Column labels in Plex Mono 12 `--on-ink-2`, links in Archivo Narrow 18/600 uppercase, gap 12.
- Below the band, on paper: Plex Mono 12 `--meta`, padding 22×48: "Waco Data Center Community Action · Elm Mott, TX" / "Code MIT licensed. Fork it for your county."

### Page header pattern (all index pages)
Grid `minmax(0,1fr) 440px`, gap 48, aligned to the bottom, padding 48 48 36. Left: `display-xl` title. Right: serif 19/1.5 description plus an optional mono 13 `--muted` meta line (counts, updated date, RSS). A 1px rule follows, usually as the top edge of a filter bar.

### Breadcrumb bar (single pages)
Padding 14×48, 1px rule below, Plex Mono 13. Left: underlined parent section link then ` / {category}`. Right: `Filed {date}` or `Last updated {date}`.

---

## 4. Pages

### 2a Home: `layouts/index.html`
As specified in `design_handoff_homepage_redesign/README.md` under Direction 1b, with two changes: the nav uses the site-wide items above, and the footer is the shared footer. Keep `id="timeline"` on the timeline block.

### 2b The Record: `layouts/posts/list.html` (new; the current `_default/list.html` can stay for taxonomies)
1. Page header: THE RECORD. Description: "Analysis, open letters and research from neighbors of the L2D2 site. Every claim links to the minutes, the MOU, or the resolution number." Meta: `{{ len .Pages }} entries · RSS`.
2. **Filter bar.** Padding 14×48, rules above and below. Square mono chips (13/500 uppercase, padding 7×12, 1px ink border, gap 8). Active chip is ink with paper text. Chips are links to `/categories/{slug}/`, so filtering needs no JavaScript: All, Analysis, Open letters, Opposition research, Data center impact, Community. Right side: "Sort: Newest first" (static text).
3. **Lead story** = newest listed post. Grid 1fr 1fr, 1px rule below and between. Left: `featured_image` (or `image`, falling back to `land1`), min-height 420, `filter:grayscale(.15) contrast(1.05)`. Right, padding 44×48, gap 18: kicker row (red mono categories on the left, date on the right), title `lead-title` 52, `description` serif 19, then a row with "By {author}" and an ink "Read the piece" button.
4. **Table** of the remaining posts. Column heads in mono 12 `--muted`: Date / Filed under / Title / By. Grid `140px 220px 1fr 200px`, gap 24, rows padded 22px 0 with a 1px rule. Date mono 14/600, categories red mono 12/600 uppercase joined with ` · `, title Archivo Narrow 26/700 with the `description` below in serif 16 `--body-2` (omit when empty), author mono 13. Whole row is the link. Row hover: `--hover-row` background.
5. Pagination: mono 13, "Page 1 of N" left, Newer / Older right (muted when unavailable). Use Hugo's paginator at 20 per page.
6. Keep the `unlisted` filter from the current homepage query.

### 2c Article: `layouts/_default/single.html` (posts)
1. Breadcrumb: The Record / {first category}. Right: "Filed {date}".
2. **Head.** Grid `240px 1fr`, gap 48, padding 56 48 40. Left: red mono categories, one per line. Right: `h1-article` title (max 960) and `description` as a serif 24/1.4 dek in `--body-2`, max 760.
3. **Byline bar.** Same grid plus an `auto` column, padding 16×48, rules above and below. "Byline" mono label / "By {author}" Archivo Narrow 21 uppercase plus `{date} · {.ReadingTime} min read` mono 13 / Print, Copy link, Share (mono 13, underlined). Print calls `window.print()`. Share uses `navigator.share` with copy-link as the fallback.
4. **Lead image.** Full-bleed 1280 × 560 cover, then a caption bar (mono 12, padding 12×48, rule below). Caption comes from a new optional `image_caption` front matter field, falling back to the image's alt text. Hide the whole block if the post has no image.
5. **Body grid.** `240px minmax(0,700px) 1fr`, gap 48, padding 56 48 72.
   - Left rail, `position:sticky; top:24px`: "In this piece" (mono 12 with a 4px rule), built from `.TableOfContents` or by ranging over `##` headings. Each row: two-digit mono index (12, muted) plus heading in Archivo Narrow 16/600, 1px rule between. The current section is red (IntersectionObserver; optional). Below that: Tags as square mono 12 chips linking to `/tags/{tag}/`.
   - Body: serif 20/1.65, paragraph gap 24.
     - A bold first line (`**An Open Letter…**`) renders as Archivo Narrow 20/700 uppercase. Use a render hook or style `p:first-child > strong:only-child`.
     - `##` becomes `h2-article`, numbered by CSS counter.
     - `figure` shortcode: 1px ink border, image, then the caption in mono 12 on a 1px top rule.
     - Lists: no bullets. Rows with a 44px mono index column (13, muted), 1px rule between rows and a 4px rule on top. Ordered and unordered lists look the same.
     - Pull quote: `blockquote` with a 4px rule above and below, padding 28px 0, quote in Archivo 900 56/0.95 uppercase, attribution in mono 13. Add a `{{< pullquote cite="" >}}` shortcode.
     - Links: underlined ink, red on hover.
   - Right margin: "On the record". Related timeline entries (mono date, Archivo Narrow 19 title, serif 14 summary) with 1px rules and a "Full timeline" link. Source it from a new `timeline:` front matter list of keys that match `data/timeline.yaml`. Hide the column when the list is empty.
6. **Act on this** ink band: grid `240px repeat(3,1fr)` with `--rule-on-ink` dividers. Cells: the label "Act on this" (Archivo 900 30), Next meeting (reuse `partials/next-meeting.html`), "Download the 2-minute testimony template" (→ `/templates/public-testimony-template.pdf`), and a red Sign the petition button.
7. **More from the record**: section head plus 3 columns (next 3 posts excluding this one), each with a red mono `CATEGORY · DATE` kicker and an Archivo Narrow 26 title, 1px rules between columns. Below, mono 12 `--meta`: "Spotted an error? Send a correction. Corrections are noted at the end of the piece with the date." Link that to `/contact/`.

### 2d Press: `layouts/media/list.html`
1. Page header: IN THE PRESS. Keep the current description sentence. Meta: `{{ len }} articles · Updated {now}`.
2. **Featured row.** Grid 1fr 1fr, rules above and below. Left is an ink panel (padding 44×48, gap 18): a bordered mono tag "Original investigation", `{outlet} · {date}` in mono `--on-ink-2`, title in Archivo 900 46, the existing editor's note in serif 16 (with "Editor's note." in 600 paper), and a red "Read at {domain} ↗" button. Right: `.Params.image` cover, or the striped placeholder. Show the oldest `featured: true` item (The Waco Bridge, Nov 21, 2025). Other featured items appear in the list as normal rows.
3. **Filter bar** by type with counts: All, Print, Online, TV, Statewide. Type comes from tags the same way the current badge logic works (`tv`, `print`, `statewide`, else Online). Filtering is a small JS toggle on `data-type`, or skip it.
4. **List grouped by month** (`.GroupByDate "January 2006"`). Month head: Archivo 900 28 uppercase with a 4px rule. Rows: grid `110px 230px 90px 1fr 24px`, gap 24, padding 16px 0, 1px rule. Columns: date mono 14/600 ("May 13"), outlet Archivo Narrow 18/700 uppercase, type tag (mono 11 bordered), headline serif 19/600, `↗`. The row links to `external_url` with `target="_blank" rel="noopener"`.
5. Footnote, mono 12: "Reporters: for interviews or documents, contact leadership. Every link opens the original outlet in a new tab."

### 2e Documents: `layouts/resources/list.html` (new)
1. Page header: DOCUMENTS. "Primary sources, research, and the templates you need to write to officials or request public records."
2. **Guides row.** One cell per resource page (currently 2), 1px rules. Each has a red mono kicker (`Guide` or `Research` · date), title in Archivo 900 44, description in serif 17, and an underlined mono "Open" link.
3. **Primary sources.** Section head, then a file table: Type (bordered mono tag) / Document (Archivo Narrow 22) / File (mono 12 path, `--meta`) / ink Download button. Source it from a new `data/documents.yaml` (`title`, `type`, `path`, `date`) so files in `static/documents/` and `static/agenda/` get listed without editing templates. Current entries: Elm Mott Water Board minutes (Jul 2025 to Jan 2026, PDF), Elm Mott Water agenda Feb 2, 2026 (JPEG), Agenda Feb 1, 2026 (DOCX), Agenda Jan 11, 2026 (PDF).
4. **Templates.** A 4-column grid of the 8 templates. Each cell: name in Archivo Narrow 21 uppercase, a one-line description, then PDF and DOCX as underlined mono links. Source: `data/templates.yaml` (shared with 2f).
5. Footnote: "Have a document that belongs here? Submit it to the research coordinator."

### 2f Resource page: `layouts/resources/single.html` (new)
Applies to `templates-contact-info` and `environmental-studies`.
1. Breadcrumb: Documents / Guide. Right: "Last updated {date}".
2. Head: same grid as articles. Red mono kicker, `h1-article` at 72, serif 22 dek.
3. Body grid `240px 1fr`. The left rail is a sticky "On this page" list built from `##` headings.
4. **Templates table** (replace the markdown tables with a `{{< templates >}}` shortcode that reads `data/templates.yaml`). Rows: grid `1fr 110px 110px`. Name in Archivo Narrow 22 uppercase over the italic serif 16 description. PDF is an outline button, DOCX is an ink button. Note below: "PDF to view and print. DOCX to edit and customize."
5. **Open records steps** as 4 columns with numerals (01, 02, 03, then a red "10" for the 10-business-day rule) and serif 16 text.
6. **Elected officials.** Two directory cards side by side (Lacy Lakeview, McLennan County). Each has a name row with the meeting schedule in mono, a two-column list of names and phone numbers (phones in mono 13 as `tel:` links), and the address in mono 12. The other bodies (Waco, State Legislature, U.S. Congress, State agencies) are `<details>` rows: Archivo Narrow 20 uppercase summary and a mono `+` that turns into `−` when open. This keeps the 330-line page scannable. Move the directory into `data/officials.yaml`.
7. For `environmental-studies`, use the same shell with markdown body styles from 2c. Each study becomes a record row: title in Archivo Narrow, source and year in mono, summary in serif, links as underlined mono.

### 2g Plain pages: privacy (and any page using `_default/single.html` without an image)
Breadcrumb omitted. Head grid: left rail shows "Last updated {date}" in mono; right shows the title at 80 and the description. Body uses the article styles. A bolded standalone sentence such as "**We do NOT use cookies or tracking pixels.**" can be shown as an ink callout through a `{{< callout >}}` shortcode: ink bg, Archivo Narrow 24 uppercase, padding 20×24.

### 2h Meetings: `layouts/_default/events.html`
Data and filtering logic stay as they are today (date string compare against today, sort ascending, `highlight` for importance).
1. Page header: MEETINGS. Keep "Upcoming meetings, events, and opportunities to engage." and add: "Public comment is where officials hear from us on the record."
2. **Next important meeting** red band, grid `200px 1fr 260px`, gap 40, padding 36×48.
   - Date block: 2px white border, `OCT · TUE` mono 15/600 above the day in Archivo 900 104.
   - Middle: bordered mono tag "Next important meeting", title in Archivo 900 54 uppercase, then `{Monday, January 2, 2006} · {time} · {location}` in Archivo Narrow 24 uppercase.
   - Right, stacked: white "Add to calendar" button (links to a generated `.ics`, see below), outline "Testimony template" button, then "Agenda ↗" if `agenda_url` is set, else mono 12 "No agenda posted yet". `info_url` adds a "More info ↗" outline button.
3. **Also important + public comment tips** row, 3 columns with 1px rules. Two cells for the next two highlighted events (red mono "Also important", mono date and time, Archivo Narrow 26 title, serif 15 location and notes). The third cell is an ink panel with three numbered tips taken from the Templates page's testimony best practices.
4. **Next outreach**: section head with "Tables, flyers and yard signs. Volunteer" (→ `/contact/`), then the next two `Public Outreach` events in two columns.
5. **Full calendar.** Section head with a live count. Category chips (All, Priority, City Council, County, Water Board, Community Meeting, Public Outreach, Action Committee, ERCOT). This is the only page that needs filter JS: toggle `hidden` on rows by `data-category` and `data-priority`, and hide month heads that end up empty. With JS off, every row shows.
   - Month heads use `.GroupByDate`-style grouping on the sorted slice.
   - Rows: grid `80px 150px 1fr 170px 110px`, gap 24, padding 18px 0, 1px rule. Columns: day of week in mono 12 over the day number in Archivo 900 36; time in mono 14/600; title in Archivo Narrow 22 uppercase, location in serif 16 and notes in italic serif 14 `--muted`; category tag, plus a red "Priority" tag when `highlight`; then `Agenda ↗` or `Info ↗`.
   - Empty state: mono 14 "Nothing scheduled in this category this month."
6. **Outcomes on the record.** Completed events that have an `outcome`, newest first, as timeline rows (`200px 1fr`). The outcome text goes in serif 17.
7. **Get meeting alerts.** A bordered box, grid `1fr 1.3fr`. The left cell has the heading and copy. The right cell has Name and Email inline plus an ink Subscribe button. This posts to the existing `email-signup` form and needs the consent checkbox under the fields; it was left out of the mock for space, so add it in the build.
8. **ICS (optional, recommended):** add an `ics` output format for the events page, or generate one `.ics` per highlighted event at build time. Each "Add to calendar" button links to it.

### 2i Contact: `layouts/_default/contact.html`
1. An ink yard-sign strip (replaces the blue gradient alert): bordered mono tag "Yard signs", Archivo Narrow 22 "Looking for yard signs ($5) or informational flyers?", underlined link "Order yard signs & flyers".
2. Page header: CONTACT. "Have questions? Want to get involved? We're here to help."
3. Grid `1fr 640px` with a 1px rule between.
   - Left, "Our team": 4 directory rows (Leadership / Administration, Social Media, Submit Information, Website / Technical). Each row has the name in Archivo Narrow 22 uppercase, the existing description, and underlined mono mailto links. Then the response-time note in mono 13.
   - Right, "Send us a message": the existing intro sentence, then the form. Fields and names stay as today: name*, email* (2 columns), phone (optional), subject* select with the same 6 options, message* (6 rows), consent* checkbox with the Privacy link. The submit button is red, full width, 60px tall: "Send message".
4. The "Join the movement" buttons at the bottom of the current page are dropped, because the footer covers them.

### 2j Yard signs: `layouts/_default/yard-signs.html`
1. Page header: YARD SIGNS & FLYERS at 104px. "Support the movement with yard signs and informational flyers".
2. Grid `440px 1fr`.
   - Left: "$5" in Archivo 900 132 red with "Per yard sign" in mono, then a 3-row pricing table (Yard signs / Flyers / Proceeds, using the existing copy), then a photo slot (owner to supply a photo of a sign in a yard; use the striped placeholder until then).
   - Right: the form in three numbered sections, each headed by a red mono number and an Archivo 900 28 title over a 4px rule.
     - **01 Your order.** "What would you like to order?*" is a 3-up segmented control (Yard signs / Flyers / Both). Build it as radio inputs named `request-type` with the same values as today (`Yard Signs Only`, `Flyers Only`, `Both`), visually hidden, with styled labels. The checked label is ink with paper text. Number of yard signs (`signs-quantity`: none, 1-5, 5-10, 10+) and Number of flyers (`flyers-quantity`: none, 20, 50, 100) use the same 4-up control in mono 14. Keep the existing help text under each.
     - **02 Your information.** name*, email* (2 columns), phone (optional, with help text), address textarea (optional, with placeholder and help text), notes textarea (optional).
     - **03 Consent.** Both required checkboxes with the existing copy.
     - Confirmation note between 1px rules, then a red "Submit order request" button.
   - If the segmented controls are too much work, a styled `<select>` from 2q is acceptable. Field names and values must not change, because Netlify submissions are already being processed.

### 2k Thank you: `layouts/_default/thank-you.html` and `contact-thank-you.html`
Grid 1fr 1fr with a 1px rule between.
- Left (padding 64×48): red mono "Received · {form}" kicker, "THANK YOU." in Archivo 900 120, the lead sentence in serif 24, the follow-up in serif 17 `--body-2`, and an ink "Return to homepage" button.
- Right: "What's next?" section head and 3 numbered rows (Read our research → /posts/, Sign the petition → modal, Follow us → Facebook). Each row has the title in Archivo Narrow 26 uppercase, the existing one-line description, and a mono link label on the right.
- Message variants (same detection script as today, now swapping text nodes instead of `innerHTML`): yard signs, email signup, contact, default. All four are shown in 2k with a switcher. `contact-thank-you` renders the contact variant directly.

### 2l Email signup modal (`#emailModal`)
- 560px wide, paper, 2px ink border, over a `rgba(20,20,20,.72)` scrim.
- Header bar: ink, "Stay informed" in Archivo Narrow 20 uppercase, "Close ✕" mono 13 as a real `<button>`.
- Body, padding 28: "GET MEETING ALERTS" in Archivo 900 36, one serif line, then the fields name, email, zip (optional, 180px wide, mono), the consent checkbox, and a full-width ink Subscribe button.
- Form name, honeypot and action are unchanged.

### 2m Change.org warning modal (`#changeOrgModal`)
- 620px wide. Red header bar: "Important information" in mono, plus Close.
- Title "YOU ARE LEAVING WACODATACENTER.COM" in Archivo 900 40.
- "Please read before signing:", then the three numbered points as rows (Archivo 900 22 numerals; the donation point's numeral is red), then the "Your signature matters!" line.
- Footer: two flush full-width buttons, Cancel (paper) and "Continue to Change.org ↗" (red, `target="_blank" rel="noopener noreferrer"`).
- Copy edits for TONE.md: the spaced hyphens in the current list became a comma and periods, and "discourage you from signing - it's" became two sentences. Wording is otherwise verbatim.

### 2n 404: `layouts/404.html`
Grid 1fr 1fr. Left: "404" in Archivo 900 300 red. Right, aligned to the bottom: "PAGE NOT FOUND" in Archivo 900 56, the existing sentence, and three flush buttons: Return home (ink), The Record, Meetings (outline).

---

## 5. Components (2q)

Suggested class names. Plain CSS, no utility framework.

- `.btn` base: Archivo Narrow 700, 17-20, uppercase, 0.02em; padding 14-16 × 22-24; min-height 44; radius 0; `transition: background-color .15s`.
  - `.btn-primary` red / white, hover `--red-hover`.
  - `.btn-ink` ink / white, hover `#000`.
  - `.btn-outline` 2px ink border, hover `--hover-row`; disabled uses `#b8b3a8` border and `#8a857b` text.
  - `.btn-outline-paper` (on ink) and `.btn-paper` (white on red).
  - Paired buttons sit flush: gap 0, and the second button drops its left border.
  - Focus: `outline:2px solid var(--ink); outline-offset:3px` on red buttons, and `var(--red)` on ink or outline buttons.
- `.field`: label in Archivo Narrow 16/700 uppercase. A required mark is a red `*`; "optional" is mono 12 `--muted` in lowercase. Input height 52, 1px ink border, `--field` bg, Source Serif 18, padding 0 14.
  - Focus: red border plus `box-shadow:0 0 0 1px var(--red)`.
  - Error: 2px red border, `--error-tint` bg, the label turns red, and a mono 12/600 red message appears below. Connect it with `aria-describedby` and `aria-invalid`.
  - Select: `appearance:none` with a mono `▾` positioned at right 14.
  - Textarea: same as input, padding 12 14, `resize:vertical`.
  - Checkbox: native, 22px, `accent-color:var(--ink)`. The label sits in a `28px 1fr` grid.
- `.chip` filter: mono 13/500 uppercase, padding 7×12, 1px ink border. `.is-active` is ink with paper text.
- `.tag`: mono 11/600 uppercase, 0.06em, 1px ink border, padding 3×6. `.tag-priority` is a red fill. `.tag-band` is the 1.5px white-bordered tag used on red and ink bands.
- `.kicker`: mono 12-13/600 uppercase red.
- `.section-head`: flex space-between, baseline aligned. Archivo 900 title, optional mono 13 underlined link on the right, padding-bottom 14, 4px rule.
- `.record-row`: grid `140-200px 1fr`, padding 16-22 0, 1px rule. Mono date, then an Archivo Narrow title over a serif summary. Used by the timeline, outcomes, the article margin and the press list.
- `.placeholder`: `repeating-linear-gradient(135deg,#e4e0d7 0 10px,#ece9e2 10px 20px)` with a centered mono 12-13 label. For missing images only.

## 6. Responsive

Drawn in 2r (home, article, meetings, contact). Rules:
- Content max-width 1280, centered. Gutters 48 → 20 below 768px.
- **Header below 900px:** the top strip is hidden (its links move into the menu). The wordmark drops to 21px. On the right sit two flush 44px buttons: "Menu" (2px ink outline) and "Sign" (red). Menu opens a full-screen paper sheet with nav items in Archivo 900 40 uppercase separated by 1px rules, then the top strip links in mono.
- Every multi-column grid becomes one column below 768px, except the homepage fact row (2×2 from 1024 down to 390), the templates grid (2 columns at 768-1024, 1 below) and the footer (2×2 at 768-1024, stacked below).
- Display sizes use clamp: `display-xl clamp(56px, 9.4vw, 120px)`, `h1-article clamp(40px, 6.25vw, 80px)`, `h1-home clamp(52px, 7.2vw, 92px)`, `lead-title clamp(32px, 4vw, 54px)`, section heads `clamp(22px, 2.8vw, 36px)`.
- Article on mobile: the rail becomes a collapsed "In this piece +" `<details>` under the caption. The margin "On the record" column moves below the body. Tags move to the end.
- Tables (Record, Press, Calendar, Files) become stacked rows. The meta line (date, category or outlet) goes on top in mono, then the title, then the description. Column heads are hidden.
- Calendar on mobile: `56px 1fr` rows, with the time, title, location and tags stacked. Chips scroll horizontally (`overflow-x:auto`, no wrap).
- The next meeting band stacks: date block and tag on one row, then the title, the meta, and a full-width button.
- Forms: one column, full-width buttons, 52px inputs, 16px+ font on inputs so iOS doesn't zoom.
- Minimum tap target is 44px.

## 7. Behavior and accessibility
- Links: underline on hover. Buttons darken about 8% on hover. 150ms transitions. No other animation.
- Every "Sign the petition" opens `#changeOrgModal`; nothing links straight to Change.org. When Bootstrap is removed, rebuild both modals on `<dialog>` with `showModal()`. That gives focus trapping and Escape for free; return focus to the trigger on close.
- Skip link "Skip to content" as the first focusable element, styled as an ink button when focused.
- Contrast: `--muted` on paper is 5.0:1 (fine at 12px+). Red on paper is 5.1:1. White on red is 5.3:1. Red type on ink fails, so the footer uses `--red-on-ink`.
- Print stylesheet for articles and the Templates page: hide the header nav, footer, rail and Act on this band; show link URLs after links in mono 10. Officials and press read these on paper.
- External links get `rel="noopener"` and a trailing `↗` (decorative, `aria-hidden`).

## 8. Content and data changes
| Change | Where |
|---|---|
| New nav items | `hugo.toml` `[menu]` |
| `data/timeline.yaml` (key, date, title, body) | home timeline, article margin, events outcomes |
| `data/documents.yaml` | 2e primary sources |
| `data/templates.yaml` | 2e, 2f |
| `data/officials.yaml` | 2f directory |
| `image_caption`, `timeline` front matter (optional) | posts |
| Categories: normalize to slugs (`analysis`, `open-letters`, `opposition-research`, `data-center-impact`, `community`). `ai-squeeze` currently uses Title Case. | posts front matter |
| Missing categories on `dec-9th-city-council`, `data-center-water-usage`, `economic-impact-jobs`. The mock assumes Community and Data center impact; confirm. | posts front matter |

## 9. Copy rules
From `TONE.md`: no em dashes, no spaced hyphens used as dashes, no ellipses, no emojis. Event titles in `events.md` use en dashes in time ranges and in "HomeGrown Sundays – The Will…". Ranges are fine. The title dash should become a colon or comma when the data is next edited. The Media page's "⭐ ORIGINAL INVESTIGATION" badge loses the star. Keep the framing: we oppose this siting, not data centers.

## 10. Open items
- Final logo (the wordmark partial is a stand-in).
- A yard sign photo for 2j.
- Whether the press list should show outlet screenshots (`static/img/media/screenshots/`). The design works without them; the featured row uses one if it exists.
- ICS generation for "Add to calendar".
