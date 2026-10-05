# Public Record redesign review

Implemented on `redesign/public-record`, using the site-wide handoff in `design/` and Direction 1b from `design_handoff_homepage_redesign/`.

## Preview artifacts

- [Homepage, desktop](homepage-desktop.png)
- [Homepage, mobile](homepage-mobile.png)
- [Next meeting, mobile](meetings-mobile.png)
- [Contact, desktop](contact-desktop.png)
- [Resource guide, desktop](resource-guide-desktop.png)
- [Article print output](article-print.pdf)

The screenshots show real repository content and the metrics' actual July 5, 2026 update date. Meeting information comes from the existing calendar. This redesign does not independently verify or regenerate event schedules or officials' contact information.

## What changed

All page families now use the Public Record paper/ink/red palette, typography, square controls, masthead, record rows, and shared footer. Bootstrap, Font Awesome, old fonts, inline legacy styles, and shrinking navigation have been removed. Forms and petition warnings are shared across the site. Existing calendar exports, public-comment preparation, and month printing remain available. New structured data feeds the timeline, document downloads, templates, and official directory.

The site stays on Hugo Extended 0.121.1 and Netlify. There is no new application framework or frontend build pipeline. The final logo uses the supplied typographic wordmark; the yard-sign image uses the handoff's placeholder.

## Verification

- Production build passes with the exact Hugo version pinned in Netlify.
- Generated pages preserve every baseline route and static download; all local page/download/asset links resolve.
- Form checks confirm existing names, field names/types, required flags, option values, honeypots, consent, and success paths. Confirmation URLs now include explicit form variants.
- No duplicate element IDs or browser JavaScript errors in the checked pages.
- Chrome checks cover home, The Record, two articles, Press, Documents, the templates guide, meetings, contact, yard signs, privacy, thank-you pages, and 404 at 320, 390, 768, 900, 1024, and 1280px. There is no document overflow at those widths.
- Browser interaction checks pass for category/priority filters, ICS download, public-comment dialog, month printing, mobile menu, dialog focus and Escape, required-form validation, thank-you variants, and article print output. With JavaScript disabled, the calendar still shows its rows.
- Hugo fixture builds verify today/past/completed meeting selection, unlisted-post exclusion from lists and RSS, preserved direct access, and two-page pagination.
- Calendar checks cover summer/winter and daylight-saving boundaries, multiple sessions, midnight/year-end rollover, TBD reminders, stable ICS UIDs, escaping, and UTF-8 line folding.

Run the checked-in validation scripts using the commands in README.md. Browser screenshots and interactions were checked with temporary Playwright tooling against installed Chrome; that tooling is not a site dependency.

## Hosted checks and setup remaining

Netlify must detect `email-signup`, `contact`, and `yard-signs` in the deploy preview. Hosted form submissions have not been sent; local tests do not prove Netlify processing.

The daily-refresh GitHub workflow is included, but the repository currently has no `NETLIFY_BUILD_HOOK` secret. Create a Netlify build hook targeting `main` and save its URL as that Actions secret. The schedule takes effect from the default branch after merge. Secrets and Netlify credentials are not included in the repository.

Review the deploy preview before merging. Keep the previous Netlify production deploy available for rollback, and check the homepage, petition warning, all forms, downloads, and next meeting after publication.
