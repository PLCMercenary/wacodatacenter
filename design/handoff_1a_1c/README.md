# wacodatacenter.com redesign: design packages

Three complete, site-wide directions. Each folder is self-contained (`support.js` and `assets/` included). Open any `.dc.html` in a browser to view it, or start at `Design Index.dc.html`.

| Folder | Direction | Spec |
|---|---|---|
| `1a-homestead/` | Light, agricultural, neighborly. Cream, forest, terracotta. Newsreader + Public Sans. | `1a-homestead/README.md` |
| `1b-public-record/` | Civic newsprint. Paper, ink rules, safety red. Archivo + Source Serif + Plex Mono. | `1b-public-record/README.md` (**canonical page spec**) |
| `1c-next-door/` | Dark, focused on scale. Night, bone, amber. Barlow Condensed + Barlow. | `1c-next-door/README.md` |

Every package covers: home, posts index, article, press, documents/resources index, resource page, privacy and other plain pages, events calendar, contact, yard signs, thank-you pages, the email signup and Change.org modals, 404, plus tokens, components and mobile at 390px.

## Building all three to preview

Subpages share one structure across directions; only the visual system changes. Build it once and theme it three ways:

1. **Shared layouts.** Write the subpage templates once, following `1b-public-record/README.md` sections 3 to 8: `posts/list.html`, `_default/single.html`, `media/list.html`, `resources/list.html`, `resources/single.html`, `_default/events.html`, `contact.html`, `yard-signs.html`, `thank-you.html`, `404.html`, and the header, footer, logo and modal partials. Use semantic class names (`.page-head`, `.section-head`, `.record-row`, `.btn-primary`, `.chip`, `.tag`, `.field`, and so on) and no inline styles.
2. **Three stylesheets.** `static/css/theme-1a.css`, `theme-1b.css` and `theme-1c.css`. Each defines the tokens from its README and styles the shared classes. Put the common structure (grids, spacing, responsive rules) in `static/css/base.css`.
3. **Three homepages.** The homepages differ in structure, so keep them as `partials/home-1a.html`, `home-1b.html` and `home-1c.html`, and have `layouts/index.html` pick one.
4. **Switching.** Add `params.theme = "1b"` to `hugo.toml`. `baseof.html` loads `base.css` plus `theme-{{ .Site.Params.theme }}.css`, loads the matching Google Fonts URL, and `index.html` includes the matching homepage partial.
5. **Previewing all three at once.** Use Netlify branch deploys: create `preview-1a`, `preview-1b` and `preview-1c` branches that differ only in `params.theme`, and each gets its own preview URL. Locally, run `hugo server --environment 1a` with a `config/1a/hugo.toml` override for each.

Header and footer markup differ slightly by direction (1a has the announcement bar and logo mark; 1b has the top strip and two-line masthead; 1c is a single row). Keep all three variants in `partials/header.html` behind the same theme switch.

## Shared decisions (all directions)
- Nav: posts, press, meetings, resources, plus a petition CTA. 1b labels them The Record / Press / Meetings / Documents; 1a and 1c use Updates / Press / Meetings / Resources.
- Netlify form names, field names, values, honeypots and actions are unchanged.
- Every "Sign the petition" opens the Change.org warning modal.
- `TONE.md` applies: no em dashes, no spaced hyphens, no ellipses, no emojis.
- Data files to add: `data/timeline.yaml`, `data/documents.yaml`, `data/templates.yaml`, `data/officials.yaml`.
