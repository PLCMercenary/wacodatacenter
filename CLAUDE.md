# CLAUDE.md

Guidance for Claude when working in this repo.

## What this is

Community-information website for **wacodatacenter.com** — a grassroots effort organized by Sean Terrell (Elm Mott, TX) opposing the **L2D2 / Infrakey** data center development. The site hosts research posts, meeting recaps, open letters, resources, an events timeline, and call-to-action links (petition, donations, email signup).

## Editorial positioning (read before writing anything public-facing)

We are **not anti-data-center**. Done responsibly, with the right siting and the right community partner, data centers can be excellent assets to a community.

We are against **this** project, on **this** site, with **these** specifics:

- A **1.2 GW hyperscale campus** on **500 acres**.
- **Surrounded on all sides** by neighborhoods and homes.
- The site is accessed only by **two 2-lane county roads** that run through those neighborhoods.
- The surrounding community is **agricultural** with **generational homesteads**.
- It sits on the **ERCOT** grid. ERCOT is not MISO and it is not the Upper Midwest. The Dakotas and Montana have surplus wind and hydro generation and tend to site hyperscale facilities away from people. **Texas does not have that grid headroom**, and this site is not away from people.

Every critique should make the implicit comparison: here's what good siting looks like, and here's why this specific project isn't it. That framing keeps the door open for readers (including local leadership) who think data centers are fine in general but can see this one is in the wrong place.

**Tone of voice is documented in [TONE.md](TONE.md).** Read it before drafting or editing posts, open letters, or any public copy.

### Audience

Two audiences in one room:
1. **Local residents** in McLennan County (Elm Mott, Ross, Lacy Lakeview, Waco). Many are generational landowners. Plain language. Tell them what to do next.
2. **Local leadership and press**. They read for receipts: names, dates, dollar amounts, meeting minutes, resolution numbers. Anchor every claim.

Blog posts have historically generated good response from local leadership. The harder goal is reaching residents in the affected area, so prioritize legibility and shareability.

## Stack

- **Hugo** static site generator (extended). Pinned to `HUGO_VERSION = 0.121.1` in `netlify.toml`.
- **No theme.** All templates live in `layouts/` — custom from scratch.
- **Bootstrap 5.3** + **Font Awesome 6.4** + Google Fonts (Montserrat, Roboto Slab) loaded from CDN in `layouts/_default/baseof.html`. No npm/build pipeline.
- **Netlify** deploys from GitHub on push to `main`. Build = `hugo`, publish = `public/`. Deploy previews and branch deploys use `-F -b $DEPLOY_PRIME_URL`.
- **Netlify Forms** for email signup (free tier: 100 submissions/month).
- **GitHub remote:** `https://github.com/PLCMercenary/wacodatacenter.git`.

## Repo layout

```
content/
  posts/        — blog posts (research, meeting recaps, open letters)
  resources/    — resource pages (studies, templates, documents)
  media/        — media coverage section
  events.md     — events page (large file, hand-edited timeline)
  contact.md, privacy.md, yard-signs.md, thank-you.md, contact-thank-you.md
data/
  metrics.yaml  — live petition/FB/email counters surfaced on the homepage
layouts/
  _default/     — baseof, list, single, plus page-specific templates
                  (events.html, contact.html, yard-signs.html, thank-you.html)
  _default/_markup/render-link.html  — custom link rendering
  media/list.html                    — media section list template
  partials/next-meeting.html         — homepage "next meeting" widget
  index.html                         — homepage (large, hand-edited)
  404.html
static/
  css/style.css — all custom styles (theme colors in `:root`)
  js/scripts.js
  img/, images/, agenda/, documents/, templates/ — static assets
hugo.toml       — site config (menu, params, permalinks)
netlify.toml    — build, headers, cache-control, redirects
TONE.md         — voice guide for all public-facing writing
.archive/       — gitignored local archive of old working docs
```

## How to work in this repo

### Local dev
```bash
hugo server -D    # http://localhost:1313, live reload, includes drafts
hugo              # one-off production build into public/
```

### Adding content
- Blog post: new markdown file in `content/posts/`. Required frontmatter: `title`, `date`, `author`, `description`, `slug`. Optional: `image`, `tags`, `categories`, `featured_image`, `lastmod`, `unlisted`.
- Resource: same, in `content/resources/`.
- Events timeline lives in `content/events.md` and is hand-edited (no per-event files).
- **Before drafting, read TONE.md.** Match it.

### Updating live counters
Edit `data/metrics.yaml`. Fields: `petition.signatures/comments/local_supporters/media_mentions/milestone`, `facebook.members/milestone`, `email.subscribers`, and a single `updated` date. Templates read from here.

### Deployment
Push to `main` and Netlify auto-deploys in ~30 seconds. Sean has authorized Claude to commit and push directly. No manual deploy step.

## Things to know

- **Cache-control is intentionally short.** Mobile users and Brave-browser users were not picking up content updates on long caches, so CSS/JS are capped at 1 hour and images at 24 hours. Traffic is low enough that page-load cost doesn't matter. Don't "fix" this by extending the max-age.
- **The `agency` theme is commented out** in `hugo.toml`. Layouts are Bootstrap-Agency-inspired but first-party.
- **`hugo.toml` `instagram` param is a placeholder** (`"your-instagram"`). Footer/social blocks may need to guard for that.
- **Contact email of record is `plcmercenary@tuta.io`** (per `hugo.toml`). The README mentions `contact@wacodatacenter.com` but the toml is the source of truth.
- **`.DS_Store` files have been committed** in a few places. `.gitignore` covers them for new commits but existing ones remain.

## Conventions

- Content frontmatter is YAML (not TOML).
- Slugs are URL-friendly kebab-case and explicitly set per post.
- Site title and description come from `hugo.toml` params; templates use `.Site.Params.*`.
- Open Graph and Twitter Card meta are set in `baseof.html` and fall back to `/img/og-image.jpg`.

## Don't

- Don't write public copy without reading TONE.md first. Em-dashes, ellipses, and emojis are banned.
- Don't introduce a build pipeline (webpack, npm, Tailwind, etc.) unless asked. The value proposition is "no build, easy to hand off to a volunteer."
- Don't add a theme — layouts are intentionally first-party.
- Don't extend cache-control max-age values in `netlify.toml`. See the note in that file.
- Don't commit secrets, API keys, or anything from `.env*`.
- Don't frame the position as anti-data-center or anti-development. The site's credibility depends on the distinction between good siting and this specific bad siting.
