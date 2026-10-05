# Waco Data Center website redesign plan

Prepared October 5, 2026, from the repository and both supplied design packages. This is an implementation plan; the site has not been changed or deployed.

## Recommendation

Keep Hugo and Netlify for this redesign. Replace the Bootstrap/Agency-style presentation with the supplied **Public Record** design system, first-party templates, plain CSS, and small JavaScript modules for interactions.

The new design does not require a framework migration. Hugo already separates Markdown content, YAML data, layouts, and static assets. Its templates can produce the new page structures. The interactive requirements are menus, dialogs, filtering, sharing, and calendar tools, which can remain browser-side JavaScript. This also preserves the volunteer editing workflow described in `CLAUDE.md`.

| Option | Fit for this handoff | Recommendation |
|---|---|---|
| Hugo with custom templates and CSS | Reuses content, URLs, forms, hosting, and editor workflow. Supports the entire supplied design. | Use for this release. |
| Astro with static output | A reasonable alternative if component authoring becomes a priority. Requires porting layouts, content queries, taxonomies, feeds, and build configuration. | Reconsider if the first representative pages reveal a concrete maintenance problem with Hugo. |
| React/Next.js application | Introduces an application stack without a corresponding requirement for accounts, server state, or live application features. | No current reason to choose it. |

Do not change engines solely to achieve the visual refresh. If a later requirement adds a browser-based editorial system, evaluate that requirement separately; a CMS does not automatically require replacing Hugo.

## Which design governs

The two packages are successive handoffs, rather than two competing site designs:

1. `design_handoff_homepage_redesign/` contains three homepage explorations: 1a Front Porch, 1b Public Record, and 1c Next Door.
2. `Waco Data Center Opposition redesign.zip` contains a `design/` folder with the site-wide Public Record handoff. Its README explicitly selects 1b, supersedes 1a and 1c, and asks for implementation in the existing Hugo site.

Use the newer package for shared chrome, components, content pages, forms, meetings, and responsive behavior. Use the earlier README's Direction 1b for the homepage where the newer handoff refers back to it. Site-wide navigation and footer overrides come from the newer package. Do not blend the green Front Porch or dark Next Door styling into this release.

The `.dc.html` files and `support.js` are reference canvases, not production templates. Extract the ZIP into `design/` during implementation so its references and assets can be opened together. Retain both handoffs for traceability; do not ship their runtime with the site.

The visual contract is:

- Paper `#f3f1ec`, ink `#141414`, and red `#c8361c`, with the separate accessible red variant for text on dark surfaces.
- Archivo for large display type, Archivo Narrow for navigation and item titles, Source Serif 4 for body copy, IBM Plex Mono for dates and metadata.
- Square buttons and fields, thin ink dividers, heavy masthead and section rules, and no decorative shadows or icon font.
- A centered 1280px layout, 48px desktop gutters, 20px mobile gutters, stacked record rows on mobile, and a persistent petition action.
- A larger homepage wordmark and compact interior-page wordmark. Use the typographic mark until a final logo is supplied.

## Existing site and constraints

The repository has 7 posts, 24 media entries, 2 resource guides, and 317 calendar entries. As of this review, 75 calendar entries are dated October 5, 2026 or later, with entries extending through December 26. These counts describe the files, not independent verification of meeting schedules.

The presentation lives in custom `layouts/`, `static/css/style.css`, inline template styles/scripts, and `static/js/scripts.js`. Bootstrap, Font Awesome, Montserrat, and Roboto Slab load from `layouts/_default/baseof.html`. There is no active third-party Hugo theme or npm pipeline to replace.

Preserve these contracts while changing presentation:

- Existing page and post URLs, explicit slugs, document downloads, RSS, and social-sharing metadata. Renaming Blog to The Record does not change `/posts/`.
- Netlify form names `email-signup`, `contact`, and `yard-signs`; field names and option values; honeypots; required consent; and existing success routes.
- Every petition CTA opens the Change.org warning before continuing to the existing petition URL.
- Event categories, `highlight`, `completed`, agenda/info links, and outcomes. Retain Google/Outlook calendar links, ICS downloads, printing, and public-comment tools already present in the events template, adapting their controls to the new style.
- `unlisted` posts remain available by direct URL but excluded from public discovery lists.
- The current short cache policy. Apply the same 24-hour image policy to `/images/*`, which is used by the design assets but is not covered by the existing `/img/*` rule.
- Public copy follows `TONE.md`: this project's siting is the concern; claims need sources; new copy avoids emojis, em dashes, and ellipses.

## Implementation sequence

### 1. Prepare references and establish a baseline

Deliverable: an isolated redesign branch, accessible reference files, a route inventory, and a reproducible baseline build.

- Extract the newer handoff into `design/` without overwriting the older handoff or changing the supplied ZIP.
- Open the desktop and mobile reference frames; record page-level acceptance screenshots for comparison during implementation.
- Inventory current routes, form contracts, file downloads, and event interactions before replacing templates.
- Resolve the Hugo version mismatch: Netlify pins 0.121.1, while local Hugo is 0.161.1. First establish the production baseline with the pinned version. If upgrading, make version alignment and template compatibility a separate change before the visual work. Current Hugo documentation describes a template-system overhaul in 0.146.0, so do not assume newer layout examples work unchanged with the production pin.
- Capture the current homepage, article, meetings, and form pages at desktop and mobile widths. Record existing build issues separately from redesign regressions.

### 2. Build the shared design system and first representative pages

Deliverable: a Public Record homepage and one real article that prove the design and the Hugo approach at desktop and mobile sizes.

- Extract `header.html`, `footer.html`, `logo.html`, shared dialogs, and reusable section/row components into `layouts/partials/`.
- Introduce the handoff's color, typography, spacing, rule, button, field, tag, and filter styles. Keep temporary legacy styles scoped while remaining pages are ported.
- Update `hugo.toml` navigation to The Record, Press, Meetings, Documents. Move Contact, Yard signs, and Legal fund into the top strip and mobile menu.
- Replace shrinking fixed navigation with the handoff's masthead and mobile menu. Add active-section treatment, a skip link, and keyboard controls.
- Render the petition and email dialogs globally so footer actions work from every page. Replace Bootstrap modal behavior with native `<dialog>`, including accessible labels and focus return. Reconcile the current `emailSignupModal` ID with the handoff's `emailModal` in one coordinated change.
- Build the homepage: split hero and council photo, next-meeting band, four facts, timeline beside latest posts, metrics band, and shared footer. Keep `#timeline` and preserve an appropriate `#action` target for existing inbound links.
- Build one long article with an image, headings, source links, and related actions. Check actual title wrapping and body legibility, rather than using only mock text.

Decision point: continue with Hugo if these pages match the references and components remain understandable. Reconsider Astro only if a specific template limitation or maintenance burden emerges. The expected outcome is to continue with Hugo.

### 3. Organize content data and port reading pages

Deliverable: The Record, articles, Press, Documents, both resource guides, and taxonomy pages in the new design.

- Add `layouts/posts/list.html`: newest listed lead story, record rows, category links, and pagination at 20 posts per page. Use one listed-post query for displayed counts, pagination, home, related posts, and taxonomy pages so `unlisted` handling stays consistent.
- Implement article breadcrumbs, byline, reading time, optional lead image/caption, table of contents, numbered heading treatment, tags, related timeline entries, Act on this, and related posts. Add print, copy-link, and native-share with a copy fallback.
- Support `featured_image` as well as `image` consistently in article images, list images, and social metadata. Provide descriptive alt text and optional `image_caption`; omit missing article lead images instead of inserting invented photos.
- Add `data/timeline.yaml` with stable keys, dates, titles, summaries, and source links. Populate it from existing sourced material, not frozen mockup text. Use optional post `timeline` keys for the margin records. Keep scheduled events in `content/events.md`.
- Restyle `layouts/media/list.html` with the oldest `featured: true` investigation as the lead and month-grouped coverage below. Include other featured entries in the regular list instead of silently dropping them. Press filters are optional for the first release.
- Add `layouts/resources/list.html` and `layouts/resources/single.html`. Create `data/documents.yaml`, `data/templates.yaml`, and `data/officials.yaml` from existing files and guide content. The actual repository has two guides; include both even where the handoff's example count differs.
- Use shared template-download and directory components, native `<details>` for secondary directories, and shortcodes for templates, callouts, and pull quotes where needed. Preserve meaningful list and table semantics while styling them to the reference.
- Normalize category labels/slugs and add the missing categories identified by the handoff after reviewing the articles. Preserve or redirect any affected existing category URLs.
- Style privacy, category/tag indexes, and generic pages so none retain the old appearance.

### 4. Port meetings and participation flows

Deliverable: working meetings, contact, yard-sign ordering, email signup, thank-you variants, and 404.

- Separate next-meeting selection from its visual rendering so home, meetings, and article actions share the same eligibility rules. Preserve the exclusion of completed events from upcoming priorities.
- Implement the large next-meeting band, additional highlighted events, outreach, category/priority filters, month groups, outcome records, and signup panel. Handle no upcoming events, missing agendas, and empty categories explicitly. Without JavaScript, all eligible calendar rows remain visible.
- Move existing calendar and public-comment code out of the template into page-specific JavaScript as it is restyled. Preserve existing functionality and verify print output. Do not rebuild ICS generation from scratch just because the handoff calls it optional: the current site already has it.
- Make calendar exports use the event's America/Chicago timezone, including daylight-saving transitions, regardless of the visitor's timezone. Treat ambiguous time strings, multiple sessions, and TBD times deliberately rather than inventing start times.
- Make event selection use one local-date policy across layouts. Add an automated daily rebuild so static next-meeting selections expire without a manual content edit. Choose the scheduler during implementation and keep build-hook credentials out of the repository.
- Restyle contact and yard-sign forms with all current field names, values, and consent text. Use accessible radios for segmented order controls, or styled selects as permitted by the handoff.
- Render email signup controls in the homepage/footer dialog and meetings panel with required name/email and consent. Use unique field IDs when multiple copies appear on a page, and ensure Netlify detects the complete form schema.
- Implement four thank-you message variants using text-node updates. Preserve success paths; make the form variant explicit in the success URL instead of relying only on the referrer.
- Build the specified 404 and the striped yard-sign image placeholder until an owner photo is available.

### 5. Finish, verify, and release

Deliverable: a complete deploy preview with review evidence and a rollback path.

- Remove Bootstrap, Font Awesome, the old fonts, navbar-shrink code, and remaining legacy inline presentation once every dependent page and interaction has been ported.
- Reuse the existing council photo, `land1.jpeg`, and `land2.webp` where specified. Optimize images, include dimensions, and lazy-load below the fold. The AI landscapes belong to the superseded concepts and are not required for Public Record.
- Check page-specific descriptions, canonical URLs, RSS discovery, social images, active navigation, external-link handling, and the existing Facebook URL. The current footer incorrectly prefixes an already complete Facebook URL.
- Compare desktop and mobile output against the reference frames. Test at 390, 768, 900, 1024, and 1280px, plus narrow 320px and 200% zoom for overflow and usable controls.
- Verify keyboard navigation, dialog focus/Escape/return, menu operation, labels, validation errors, contrast, tap targets, and article/resource printing. Honor reduced-motion preferences.
- Run a production build with the agreed Hugo version and a route/download link check. Add focused regression checks for event selection, listed-post filtering, calendar export edge cases, and form contracts where these behaviors are refactored.
- In the Netlify preview, confirm all three forms are detected and perform controlled submissions with designated test data; verify confirmation variants. Local rendering alone cannot prove Netlify form processing.
- Publish only after the preview meets acceptance criteria. Retain the previous production deploy for rollback, then smoke-check forms, navigation, petition warnings, downloads, and next-meeting freshness after release.
- Update README and volunteer instructions for the new data files, design system, daily rebuild, and pinned Hugo version.

## Completion criteria

The redesign is ready when every current page family uses Public Record, desktop and mobile match the supplied design direction, existing URLs and participation tools still work, no Bootstrap or Font Awesome dependency remains, forms process correctly, and date-sensitive content has a reliable refresh mechanism. A volunteer must still be able to add a post, update a metric, or edit meetings without learning a new application stack.

Suggested review milestones are: homepage plus article; all reading pages; meetings plus forms; complete deploy preview. Avoid shipping a mixed old/new site between milestones.

## Open items and defaults

These do not block starting the redesign:

- **Final logo:** use the supplied typographic wordmark in a replaceable partial.
- **Yard-sign photo:** use the specified placeholder until supplied.
- **Press screenshots:** use a supplied featured image when present; omit extra screenshots initially.
- **Categories:** propose assignments from article content before changing their public classification.
- **Live claims and counters:** retain sourced values with their actual update date. `data/metrics.yaml` currently records July 5, 2026; a redesign or daily rebuild must not make those values appear newly verified. Normalize the date representation for reliable formatting without changing its meaning.
- **Scheduler and Hugo upgrade:** settle these in the baseline/deployment work. Neither is a reason to change the site generator.

## Technical references

- [Hugo templating](https://gohugo.io/templates/introduction/): templates transform content, resources, and data; also notes the 0.146.0 template-system overhaul.
- [Astro islands architecture](https://docs.astro.build/en/concepts/islands/): static pages with selective interactive components, relevant if a future migration is justified.

The design decisions and page specifications above come from the local handoff READMEs. Framework fit is an assessment of those requirements and the current repository, not a completed implementation or measured performance result.
