# NTT — Neuro Tech Titans · Phase 2 PoC

Frontend-only PoC for core team review. No backend, no env vars needed.

## Stack
- Next.js 14 · TypeScript · Tailwind CSS v3
- Framer Motion (opening animation, page transitions, nav indicator)
- Zustand (theme persistence)

## Deploy to Vercel in 3 steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "NTT Phase 2 PoC"
git remote add origin https://github.com/YOUR_USERNAME/ntt-poc.git
git push -u origin main
```

### 2. Import on Vercel
- Go to https://vercel.com/new
- Click "Import Git Repository"
- Select `ntt-poc`
- Framework: **Next.js** (auto-detected)
- No environment variables needed
- Click **Deploy**

### 3. Done
Vercel gives you a live URL in ~60 seconds.

## What's in Phase 2
- Neural particle canvas + Framer Motion opening animation (plays once per session)
- Liquid glass card UI (dark + light theme)
- Theme toggle (persisted to localStorage)
- Animated bottom navigation with sliding indicator
- Sticky glass top bar
- Page transitions on all navigation
- Home: hero card, stats, announcements preview, event cards with animated capacity bars
- Events: 3 mock event cards with registration CTA
- Announcements: 4 mock items with category filter
- Gallery: gradient poster grid
- Profile: soft gate slide-up sheet demo (tap "Sign in to NTT")

## Phases
- ✅ Phase 2 — Core UI (this build)
- Phase 3 — Events + Registration (Supabase + Auth)
- Phase 4 — Announcements, Gallery, Profile
- Phase 5 — Notifications (Web Push + Email + Telegram)
- Phase 6 — Admin panel
