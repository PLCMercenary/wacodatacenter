# Waco Data Center Community Action Website

A Hugo-based static website for community information and action regarding the proposed data center development in rural Texas.

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
- Hugo Extended (v0.112.0 or later)
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
- Fast Facts section
- Events timeline
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
- Bootstrap 5 Docs: https://getbootstrap.com/docs/5.3/

## Contributing

To add content:
1. Fork the repository
2. Add your post/resource
3. Submit a pull request

Or contact: [contact@wacodatacenter.com](mailto:contact@wacodatacenter.com)

## License

Content is © 2024 Waco Data Center Community Action Group
Site template and code: MIT License
