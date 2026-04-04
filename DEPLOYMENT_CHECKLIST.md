# Deployment Checklist for SrijanSpeaks.com

## 📋 Pre-Deployment Checklist

### 1. Development Setup ✅
- [ ] Clone/download repository
- [ ] Run `npm install`
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Run `npm run dev` and test all pages
- [ ] Verify no TypeScript errors: `npm run lint`

### 2. Sanity CMS Setup ✅
- [ ] Create Sanity account at https://sanity.io
- [ ] Create new project
- [ ] Get Project ID and API Token
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID=<id>
  SANITY_API_TOKEN=<token>
  ```
- [ ] Create 8 schemas:
  - [ ] `homepage` (heroHeadline, heroImage, ctas, socialProofLogos)
  - [ ] `about` (timeline, achievements, testimonials)
  - [ ] `speaking` (topics, upcomingEvents)
  - [ ] `courses` (courses, faq)
  - [ ] `blog` (title, slug, body, publishedAt, category, image)
  - [ ] `blogCategory` (name, slug)
  - [ ] `testimonials` (quote, author, role, starRating, image)
  - [ ] `contact` (teamEmail, businessEmail, faqSections)
- [ ] Populate initial content (3-5 blog posts, 4 courses minimum)
- [ ] Test GROQ queries in Sanity studio

### 3. Email Configuration ✅
**Option A: Gmail (Recommended)**
- [ ] Enable 2-factor authentication: https://myaccount.google.com/security
- [ ] Generate app password: https://myaccount.google.com/apppasswords
- [ ] Add to `.env.local`:
  ```
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=your-email@gmail.com
  SMTP_PASSWORD=<app-specific-password>
  SMTP_FROM=noreply@srijanspeaks.com
  CONTACT_EMAIL=contact@srijanspeaks.com
  ```

**Option B: SendGrid**
- [ ] Create SendGrid account
- [ ] Generate API key
- [ ] Update `.env.local`:
  ```
  SMTP_HOST=smtp.sendgrid.net
  SMTP_PORT=587
  SMTP_USER=apikey
  SMTP_PASSWORD=<sendgrid-api-key>
  ```

**Option C: Other SMTP**
- [ ] Update SMTP credentials in `.env.local`

- [ ] Test contact form locally
- [ ] Verify email received in inbox

### 4. Content Preparation ✅
- [ ] Hero headline finalized
- [ ] Hero image (16:9 recommended)
- [ ] Social proof logos (5+ brands)
- [ ] About section content
- [ ] Speaking topics (4 topics)
- [ ] Upcoming events (3-5 events)
- [ ] Courses (4+ courses with descriptions & pricing)
- [ ] Blog posts (5+ articles)
- [ ] Testimonials (3+ testimonials with photos)
- [ ] Contact info & social links

### 5. Testing ✅
- [ ] All pages load without errors
- [ ] Links navigate correctly
- [ ] Contact form submits successfully
- [ ] images load correctly
- [ ] Mobile responsiveness verified (375px, 768px, 1024px)
- [ ] Form validation works
- [ ] No 404 errors in console
- [ ] TypeScript strict mode passes

### 6. Build & Performance ✅
- [ ] Run production build: `npm run build`
- [ ] No build errors
- [ ] Build size reasonable (<1MB)
- [ ] Test production build locally: `npm run start`
- [ ] Google Lighthouse score >90
- [ ] Pagespeed Insights >90

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - 2 minutes)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel
# Follow prompts (link GitHub, select project)

# 3. Set environment variables in Vercel dashboard
# Go to https://vercel.com/dashboard → Project Settings → Environment Variables
# Add all variables from .env.local

# 4. Redeploy to apply env vars
vercel --prod
```

### Option 2: Netlify (2 minutes)

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Connect to Netlify
netlify init
# Follow prompts

# 3. Set environment variables in Netlify UI
# Site settings → Build & deploy → Environment → Environment variables
# Add all variables from .env.local

# 4. Deploy
netlify deploy --prod
```

### Option 3: AWS Amplify (3 minutes)

```bash
# 1. Install Amplify CLI
npm i -g @aws-amplify/cli

# 2. Initialize
amplify init

# 3. Add hosting
amplify add hosting
# Choose Hosting with Amplify Console

# 4. Set environment variables in AWS Console
# Amplify Dashboard → App settings → Environment variables

# 5. Deploy
amplify publish
```

### Option 4: Docker + VPS (Advanced)

```bash
# 1. Create Dockerfile (already in repo)
# 2. Build image
docker build -t srijanspeaks .

# 3. Push to registry (Docker Hub, ECR, etc)
docker tag srijanspeaks:latest your-registry/srijanspeaks:latest
docker push your-registry/srijanspeaks:latest

# 4. Run on VPS
docker run -p 3000:80 your-registry/srijanspeaks:latest

# 5. Set up reverse proxy (Nginx)
# Point domain to VPS IP
# Configure SSL certificate (Let's Encrypt)
```

---

## 🔗 Domain Configuration

### 1. Buy Domain
- [ ] Godaddy, Namecheap, Google Domains, etc.
- [ ] Recommended: `srijanspeaks.com`

### 2. Connect to Vercel
- [ ] Vercel Dashboard → Project → Settings → Domains
- [ ] Add domain: `srijanspeaks.com`
- [ ] Add subdomain: `www.srijanspeaks.com`
- [ ] Follow Vercel's DNS instructions
- [ ] Update nameservers at registrar

### 3. SSL Certificate
- [ ] Vercel auto-generates HTTPS certificate (free)
- [ ] Wait 24h for DNS to propagate
- [ ] Verify SSL at https://srijanspeaks.com

---

## 📊 Post-Deployment Verification

- [ ] Website loads at https://srijanspeaks.com
- [ ] All pages accessible without 404s
- [ ] Images display correctly
- [ ] Contact form works
- [ ] Responsive on mobile (375px)
- [ ] Google Lighthouse score >90
- [ ] No console errors
- [ ] Analytics working (if configured)
- [ ] Email notifications working

---

## 🔐 Security Checklist

- [ ] `.env` never committed to git
- [ ] `.env.local` added to `.gitignore`
- [ ] No API keys in code or markdown
- [ ] CORS properly configured (if needed)
- [ ] Rate limiting on email API (prevent spam)
- [ ] Input validation on forms
- [ ] HTTPS enabled
- [ ] Security headers configured (Helmet.js optional but recommended)

---

## 📈 Monitoring & Maintenance

### Ongoing (Post-Launch)
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Enable analytics (Google Analytics, Vercel Analytics)
- [ ] Monitor email deliverability
- [ ] Check Lighthouse scores monthly
- [ ] Review contact form submissions
- [ ] Update blog regularly (1-2 posts/month)

### Monthly Tasks
- [ ] Review analytics dashboard
- [ ] Check for broken links
- [ ] Update content if needed
- [ ] Monitor server performance
- [ ] Review email reports

### Quarterly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Performance optimization review
- [ ] Content refresh

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Build fails** | Check TypeScript errors: `npm run lint` |
| **Vercel deployment fails** | Ensure `.env` variables set in Vercel dashboard |
| **Images not loading** | Check Sanity project permissions, enable CORS |
| **Email not sending** | Verify SMTP credentials, check Gmail app password |
| **Slow page load** | Check Lighthouse report, optimize images |
| **404 on pages** | Verify page routes match Next.js app router |

---

## ✅ Launch Checklist

- [ ] All content populated in Sanity
- [ ] All environment variables set
- [ ] Production build succeeds
- [ ] All pages tested
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking active
- [ ] Email notifications working
- [ ] Error tracking enabled
- [ ] Team members notified
- [ ] Social media links updated
- [ ] Email signature updated

---

## 🎉 Congratulations!

Your SrijanSpeaks.com website is now live! 🚀

**Next Steps:**
1. Share with network
2. Send announcement email
3. Update LinkedIn, Twitter
4. Optimize based on analytics
5. Plan content calendar

---

**Questions?** Refer to README.md or check Next.js documentation: https://nextjs.org/docs
