# Srijan Speaks — Personal Brand & Educational Platform

A modern, fully responsive Next.js 15 web application showcasing AI innovation, manufacturing expertise, and educational content. Features adaptive dark/light mode, mobile-first design, and cloud-native deployment.

## 🎯 Features

### Design & UX
- ✨ **Adaptive Dark/Light Mode** — Auto-switches based on OS preference using CSS custom properties
- 📱 **Mobile-First Responsive** — Hamburger nav, fluid typography with `clamp()`, safe viewport areas
- 🎨 **Design Token System** — Centralized CSS variables for colors, spacing, typography, and shadows
- ✅ **Accessibility** — Semantic HTML, ARIA labels, focus management

### Pages
- **Home** — Hero with animated counters, three-pillar impact section, teaching moments gallery
- **About** — Mission, background, expertise areas, personal story
- **Speaking** — Speaking engagements, topics, past events, booking CTA
- **Courses** — 4 online courses, FAQ accordion, teaching philosophy, stats banner
- **Contact** — Contact form (POST to `/api/contact`), social links, response time commitment
- **Blog** — Live search, category filters, 6 sample posts, newsletter subscription

### Technical
- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS v3** for utility styling
- **CSS Custom Properties** for themeable design tokens
- **Responsive Utilities** — `clamp()` for fluid sizing, `repeat(auto-fit, minmax())` for grids
- **Animations** — Scroll-triggered reveal, fade-up, slide-down, pulse effects
- **Performance** — SSR-ready, optimized images, minimal dependencies

## 🚀 Deployment

**Live URL:** https://srijanspeaks-ql3stysgna-el.a.run.app

- **Platform:** Google Cloud Run (Mumbai region — asia-south1)
- **Cost:** ₹0/month (free tier: 2M requests/month, 360K vCPU-seconds/month)
- **Auto-scaling:** 0 to 3 instances, pay-per-request
- **Dockerfile:** Multi-stage build with Node.js 20 Alpine

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| **Runtime** | Node.js 20 |
| **Framework** | Next.js 15.5.14 |
| **Language** | TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4 + CSS Variables |
| **Fonts** | Inter, IBM Plex Mono (Google Fonts) |
| **Infrastructure** | Google Cloud Run |
| **CI/CD** | Cloud Build + Docker |
| **Repository** | GitHub (anmolmalviya0/new) |

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📂 Project Structure

```
app/
├── page.tsx                 # Home page with animations & metrics
├── layout.tsx               # Root layout with fonts & metadata
├── globals.css              # Design token system (dark/light modes)
├── about/page.tsx           # About page
├── speaking/page.tsx        # Speaking engagements & events
├── courses/page.tsx         # Online courses & FAQ
├── contact/page.tsx         # Contact form & social links
├── blog/page.tsx            # Blog with search & filters
├── api/
│   └── contact/route.ts     # POST endpoint for contact form
└── components/
    ├── Header.tsx           # Sticky nav with mobile hamburger (JS-based)
    ├── Footer.tsx           # Footer with links & logo
    └── Logo.tsx             # Custom HTML+CSS logo (speech bubble + mic)
```

## 🎨 Design System

### Colors (CSS Variables)
**Light Mode:**
- `--bg: #ffffff` — Main background
- `--fg: #0f1b2d` — Foreground text (navy)
- `--accent: #e8541e` — Orange (CTAs, highlights)
- `--cyan: #0ea5e9` — Cyan (secondary highlights)

**Dark Mode:** Automatically inverted via `@media (prefers-color-scheme: dark)`
- `--bg: #080e1f` — Deep navy
- `--fg: #eef2f8` — Light text
- `--accent: #ff6b35` — Bright orange
- `--cyan: #00d9ff` — Bright cyan

### Typography
- **Headings:** `clamp(1.2rem, 2.5vw, 3rem)` — Scales fluently
- **Body:** Inter 400–700 weights
- **Mono:** IBM Plex Mono for code, labels, stats

## 🔄 Git Commits

Latest commits document incremental improvements:
- `d5b10b5` — Mobile nav fix (hamburger) + overflow fix
- `fa34d93` — Docker setup for Cloud Run
- `0b7be28` — All pages CSS variables (dark/light mode)
- `29ef9ea` — Viewport/themeColor fix
- `ff26bb4` — Design overhaul: logo, tokens, responsiveness
- `595ef08` — Animations, counters, active nav
- `84e3b88` — Initial page builds

## 📝 Environment Variables

None required for local dev. For contact form to work:
- Create `.env.local` if needed (currently mocked)
- `API_ENDPOINT` — Backend contact handler

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'feat: describe change'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is proprietary. All rights reserved.

---

**Author:** Srijan Tiwari  
**Repository:** [github.com/anmolmalviya0/new](https://github.com/anmolmalviya0/new)  
**Last Updated:** April 10, 2026
