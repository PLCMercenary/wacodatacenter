# Contributing

Content edits need Markdown and YAML, not a JavaScript framework. Create a branch, edit a post in `content/posts/` or a meeting in `content/events.md`, and open a pull request. Netlify builds a separate live Deploy Preview for each PR. Use its URL to review the change with the team before merging.

Use Hugo Extended **0.121.1**, the version pinned in `netlify.toml`. Download that release when your package manager supplies a newer version. Node is needed only to run the calendar checks.

```sh
TZ=America/Chicago hugo server -D
```

## Three designs, one implementation

`params.theme` in `hugo.toml` selects `1a` (Homestead), `1b` (Public Record), or `1c` (Next Door). Try another design locally without editing the config:

```sh
HUGO_PARAMS_THEME=1a TZ=America/Chicago hugo server -D --port 1313
HUGO_PARAMS_THEME=1c TZ=America/Chicago hugo server -D --port 1314
```

Each theme has a homepage partial in `layouts/partials/home-*.html` and a stylesheet in `static/css/theme-*.css`. Common structure and responsive rules live in `static/css/base.css`. Headers, footers, articles, forms, and calendar behavior are shared. Fix shared behavior once; reserve theme files for visual differences. Add a theme-specific override rather than duplicating a page or its JavaScript.

The comparison branches contain the same theme foundation and select different default themes. When maintaining them during review, apply shared commits to both branches. After choosing a design, merge that PR and continue with one main branch; the other themes remain available through the config.

## Check before opening a PR

```sh
TZ=America/Chicago hugo
python3 scripts/check-site.py public
python3 scripts/test-hugo.py hugo
node scripts/test-calendar.cjs
```

The GitHub validation workflow checks every theme. Review the changed page at desktop and mobile widths, and use the Deploy Preview for final review. Check focus, navigation, dialogs, and readability when changing styles. Keep existing URLs and the Netlify form field contracts. Hosted form delivery needs a separately authorized submission test; markup validation alone does not prove delivery.

Consult `TONE.md` for public copy and `EVENTS.md` for meeting entries. Keep claims sourced and update the actual verification date when changing metrics or directory information.
