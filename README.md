# Waco Data Center Community Action Website

A Hugo-based static website for community information and action regarding the proposed data center development in rural Texas.

## Design comparison

The site supports 1a Homestead, 1b Public Record, and 1c Next Door through `params.theme` in `hugo.toml`. The new site-wide handoffs are extracted in `design/handoff_1a_1c/`; Public Record is supplied in `design/`. See [CONTRIBUTING.md](CONTRIBUTING.md) for local theme previews and the contribution workflow. The earlier homepage explorations remain in `design_handoff_homepage_redesign/`. Production uses first-party Hugo templates, plain CSS, and browser JavaScript. There is no Bootstrap, icon font, npm dependency, or separate frontend build.

Use **Hugo Extended 0.121.1**, matching `netlify.toml`. Run `TZ=America/Chicago hugo server -D` for local development. Using a newer system Hugo is not equivalent to checking the deployed version.

Shared header, footer, wordmark, dialogs, forms, and article structure live in `layouts/partials/`. Shared structure and responsive rules live in `static/css/base.css`, with each visual system in `static/css/theme-*.css`. All form names, field values, consent, and existing success paths are preserved.

Content maintenance:

- Posts remain Markdown in `content/posts/`. Optional `image_alt`, `image_caption`, and `timeline` keys support article presentation. Both `featured_image` and `image` are supported. `unlisted: true` excludes a post from public lists and RSS, while keeping its direct URL available.
- `data/metrics.yaml` stores counters and their actual verification date. A rebuild does not update that date.
- `data/timeline.yaml` stores dated records and their source links. Post `timeline` entries reference its stable `key` values.
- `data/documents.yaml` and `data/templates.yaml` list existing files under `static/`. The resource guide uses the shared `templates` shortcode.
- `data/officials.yaml` stores the existing directory information, with its December 2025 verification note retained in the guide. The `officials` shortcode renders it. Verify details before updating them.
- Meetings remain in `content/events.md`; see `EVENTS.md`. Browser exports use America/Chicago time, let visitors choose multiple sessions, and label estimated end times or TBD reminders.

Validation:

```bash
TZ=America/Chicago hugo
python3 scripts/check-site.py public
python3 scripts/test-hugo.py hugo
node scripts/test-calendar.cjs
```

Node is used only for the optional calendar regression checks. It is not required to build or deploy the site. To compare preserved URLs and form contracts, pass an older generated site directory as the second argument to `check-site.py`.

### Daily calendar refresh

`.github/workflows/refresh-calendar.yml` calls a Netlify build hook at 05:10 and 06:10 UTC to cover Chicago midnight in both daylight and standard time. GitHub scheduled jobs can be delayed. Set the repository's `NETLIFY_BUILD_HOOK` Actions secret to a Netlify build hook targeting `main`; do not commit its value. The workflow runs from the default branch after merge and intentionally fails with a setup message if the secret is missing. It can also be run manually.

Netlify Forms must be checked in the deploy preview after the three forms are detected. Local validation proves markup and field contracts, not hosted submission processing.

## Project Structure

```
wacodatacenter/
├── content/
│   ├── posts/              # Blog posts (news, updates, analysis)
│   └── resources/          # Resource library (studies, templates, documents)
├── layouts/
│   ├── _default/           # Page templates
│   ├── index.html          # Homepage
│   └── partials/           # Reusable components
├── static/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript
│   └── img/                # Images
└── hugo.toml               # Site configuration

```

## Getting Started

### Prerequisites
- Hugo Extended 0.121.1 (matching Netlify)
- Git
- A GitHub account
- A Netlify account (free tier works great)

### Local Development

1. **Install Hugo**
   - macOS: `brew install hugo`
   - Windows: Download from [gohugo.io](https://gohugo.io/installation/)
   - Linux: `sudo apt install hugo` or download binary

2. **Clone and Run**
   ```bash
   git clone https://github.com/PLCMercenary/wacodatacenter.git
   cd wacodatacenter
   hugo server -D
   ```

3. **View Locally**
   - Open http://localhost:1313 in your browser
   - Changes auto-reload

## Adding Content

### Creating a New Blog Post

Create a new markdown file in `content/posts/`:

```bash
hugo new posts/my-new-post.md
```

Or manually create a file with this frontmatter:

```markdown
---
title: "Your Post Title"
date: 2024-12-18
author: "Your Name"
description: "A brief description for SEO and social sharing"
slug: "url-friendly-slug"
image: "/img/post-image.jpg"  # optional
---

Your content goes here in markdown format...
```

**Markdown Tips:**
- `# Heading` for main sections
- `## Subheading` for subsections
- `**bold**` for emphasis
- `[link text](url)` for links
- Lists work naturally with `-` or `1.`

### Creating a Resource Page

Same as blog posts, but in `content/resources/`:

```bash
hugo new resources/my-resource.md
```

### Adding Images

1. Place images in `static/img/`
2. Reference in markdown: `![Alt text](/img/your-image.jpg)`
3. Or in frontmatter: `image: "/img/your-image.jpg"`

## Customization

### Update Site Settings

Edit `hugo.toml`:
- Change social media links
- Update contact email
- Modify menu items

### Update Homepage Content

Edit `layouts/index.html`:
- Fact row
- Timeline data in `data/timeline.yaml`
- Action cards with donation/petition links

### Styling

Edit `static/css/style.css` to customize:
- Colors (see `:root` variables)
- Fonts
- Spacing
- Component styles

## Deployment to Netlify

### First-Time Setup

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize
   - Select your `wacodatacenter` repository

3. **Configure Build Settings**
   - Build command: `hugo`
   - Publish directory: `public`
   - Hugo version: Add environment variable
     - Key: `HUGO_VERSION`
     - Value: `0.121.1`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and host your site
   - You'll get a random URL like `random-name-123.netlify.app`

### Connect Your Custom Domain

1. In Netlify, go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `wacodatacenter.com`)
4. Follow Netlify's instructions to update your domain's DNS settings
5. Netlify automatically provides free HTTPS

### Automatic Deployments

Every time you push to GitHub, Netlify automatically rebuilds and deploys your site. The workflow:

```bash
# Make changes locally
hugo new posts/latest-update.md
# Edit the post
hugo server -D  # Preview locally

# Commit and push
git add .
git commit -m "Add latest update post"
git push

# Netlify automatically deploys in ~30 seconds
```

## Email Signup Forms

The homepage includes a Netlify Forms integration for email signups. After deployment:

1. Go to Netlify dashboard → Forms
2. View submissions
3. Export to CSV or integrate with Mailchimp/ConvertKit

Free tier: 100 submissions/month

## Maintenance

### Regular Updates
- Add blog posts about meetings, developments
- Update events timeline
- Post new resources and documents
- Keep Fast Facts current

### Content Review
- Check links monthly
- Update outdated information
- Archive old event listings

## Troubleshooting

**Site won't build?**
- Check Hugo version matches
- Validate markdown frontmatter (YAML syntax)
- Look for unmatched quotes or brackets

**Changes not showing?**
- Clear browser cache
- Check git push succeeded
- View Netlify deploy log for errors

**Forms not working?**
- Ensure form has `data-netlify="true"`
- Check Netlify Forms dashboard

## Support

- Hugo Documentation: https://gohugo.io/documentation/
- Netlify Documentation: https://docs.netlify.com/


## Contributing

To add content:
1. Fork the repository
2. Add your post/resource
3. Submit a pull request

Or contact: [contact@wacodatacenter.com](mailto:contact@wacodatacenter.com)

## License

Content is © 2024 Waco Data Center Community Action Group
Site template and code: MIT License
## License

### Code & Templates
The website code, templates, and technical infrastructure are released under the MIT License. See [LICENSE](LICENSE) file.

**This means other communities can:**
- Copy and modify this entire website
- Use our templates and resources
- Adapt it for their own causes
- No permission needed (just attribution appreciated)

### Content
Original research articles and community-specific content are © 2024 Waco Data Center Community Action Group.

**You may:**
- Share and link to our articles
- Quote with attribution
- Adapt for similar community efforts

**Commercial use or media:** Contact contact@wacodatacenter.com

## Privacy & Data

We respect your privacy. See our [Privacy Policy](/privacy/) for details.

## Replicating This Site

Other communities fighting data centers (or similar development):
1. Fork this repository
2. Update content in `content/` folder
3. Customize contact info in `hugo.toml`
4. Deploy to Netlify (free)

Full instructions in [QUICKSTART.md](QUICKSTART.md)
