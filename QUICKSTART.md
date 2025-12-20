# Quick Start: Deploy in 10 Minutes

## Step 1: Push to GitHub (2 minutes)

```bash
cd /path/to/wacodatacenter
git init
git add .
git commit -m "Initial site setup"
git remote add origin https://github.com/PLCMercenary/wacodatacenter.git
git push -u origin main
```

## Step 2: Deploy to Netlify (5 minutes)

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select `PLCMercenary/wacodatacenter`
5. Settings should auto-detect from `netlify.toml`:
   - Build command: `hugo`
   - Publish directory: `public`
6. Click "Deploy site"
7. Wait 30-60 seconds for build to complete

You'll get a URL like: `https://brilliant-cupcake-abc123.netlify.app`

## Step 3: Connect Your Custom Domain (3 minutes)

1. In Netlify dashboard → Site settings → Domain management
2. Click "Add custom domain"
3. Enter: `wacodatacenter.com` (or your domain)
4. Netlify will give you DNS settings
5. Go to your domain registrar and update:
   - **A Record**: `75.2.60.5`
   - **CNAME Record** (www): `[your-site].netlify.app`
6. Wait 5-60 minutes for DNS propagation
7. Netlify automatically provisions free HTTPS

## Step 4: Test Everything (2 minutes)

Visit your site and check:
- [ ] Homepage loads
- [ ] Navigation menu works
- [ ] Blog posts display
- [ ] Email signup form works (test it!)
- [ ] Social share buttons work
- [ ] Mobile responsive design

## Step 5: Customize Content

### Update Social Links & Contact
Edit `hugo.toml`:
```toml
[params]
  facebook = "your-facebook-page"
  instagram = "your-instagram"
  email = "contact@wacodatacenter.com"
```

### Update Action Card Links
Edit `layouts/index.html`, find the "Take Action" section:
```html
<!-- Around line 110 -->
<a href="YOUR_DONATION_LINK" class="btn btn-primary mt-auto">Donate Now</a>
<a href="YOUR_PETITION_LINK" class="btn btn-primary mt-auto">Sign on Change.org</a>
```

### Update Events
Edit the timeline in `layouts/index.html` around line 85.

### Commit and Push
```bash
git add .
git commit -m "Update content and links"
git push
```

Netlify auto-deploys in 30 seconds!

## Daily Workflow: Adding a Blog Post

```bash
# Create new post file
hugo new posts/council-meeting-recap.md

# Edit the file in your favorite editor
code content/posts/council-meeting-recap.md

# Preview locally
hugo server -D
# Open http://localhost:1313

# When ready, commit and push
git add .
git commit -m "Add council meeting recap"
git push

# Site updates automatically in ~30 seconds
```

## Need Help?

- **Hugo not installed?** See README.md installation section
- **Build failing?** Check Netlify deploy logs in dashboard
- **Domain not working?** DNS can take up to 24hrs (usually 5-60 min)
- **Email form not working?** Check Netlify Forms dashboard

## Next Steps

1. Add your actual donation and petition links
2. Update events with real meeting dates
3. Customize Fast Facts with your research
4. Add more blog posts
5. Upload images to `static/img/`
6. Set up Google Analytics (optional)
7. Connect to Mailchimp for email list (optional)

That's it! You have a professional, modern website that you control completely.
