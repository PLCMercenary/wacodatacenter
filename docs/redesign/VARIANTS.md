# Design comparison: 1a and 1c

The new `Waco Data Center Opposition redesign1a-1a.zip` was extracted and its homepage, content, meetings, and system references opened in a browser. The source handoffs are retained in `design/handoff_1a_1c/`. Its 1a design is named **Homestead**; this supersedes the earlier Front Porch name.

- **1a Homestead**: Newsreader and Public Sans; cream, forest, and terracotta; a landscape hero, overlapping meeting card, fact grid, image-backed participation section, and three recent stories.
- **1c Next Door**: Barlow Condensed and Barlow; night, bone, and amber; a full-bleed landscape hero, meeting panel, accessible comparison table, participation counters, and an asymmetric story grid.

Both include themed interior pages, mobile navigation, dialogs, forms, calendars, and print styles. Actual articles and upcoming meetings come from the existing content. Missing agendas are omitted. Counters keep their verification date. The email-alert CTA opens the full existing signup form, including required name and consent, rather than replacing it with the mockup's email-only field. Grid concerns link to the existing analysis rather than introducing a new categorical power-supply claim. The existing timeline remains available in a disclosure below the design's homepage sections.

## Framework decision

Keep Hugo for this redesign. Both handoffs explicitly describe shared Hugo layouts and theme files. These designs require no application server or client-side component framework. The implementation preserves Markdown/YAML editing, existing URLs, Netlify Forms, calendar exports, and the pinned Netlify build. Contributors can edit content without installing Node; automated validation builds all three themes.

Astro could be a useful later choice if contributors prefer TypeScript/component tooling or if the site gains substantial interactive application features. A migration now would add work to port templates, content schemas, URLs, forms, and calendar behavior without a design requirement that needs it. Revisit that decision around a concrete contributor or feature need.

## Review

Review the homepage, an article, Updates, Press, Resources, Meetings, Contact, and Yard Signs. Check at mobile and desktop widths. Check menu, petition, and email dialogs; calendar filters and exports; and links to primary sources. Compare visual direction first, then review content changes separately. Source content and participation behavior are the same across the variants.

Each design has its own draft PR and Netlify Deploy Preview. Production changes only after merging the chosen PR. Preview links update automatically with further commits to their PR branches.

Local browser captures: [Homestead desktop](variants/homestead-desktop.png), [Homestead mobile](variants/homestead-mobile.png), [Next Door desktop](variants/next-door-desktop.png), [Next Door mobile](variants/next-door-mobile.png).
