# CLOUSRY'S SPACE

Personal portfolio site.

This repository contains a bilingual, theme-aware personal portfolio built with Next.js for motion, post-production, visual design, and video showcase work.

## Overview

The project is built around a minimal layout, soft glass surfaces, responsive sections, and a showreel-focused presentation. It can be used directly or adapted as a starting point for another portfolio.

## Features

- Turkish / English language support
- System-aware light / dark theme with manual toggle
- Responsive portfolio landing page
- Social links and direct contact section
- Project brief form UI
- Motion-enhanced interface details

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in the browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## GitHub Pages Deployment

This project is prepared for GitHub Pages deployment.

- `next.config.ts` uses static export output
- `.github/workflows/deploy-pages.yml` deploys automatically on every push to `main`
- `public/CNAME` is included for the `clousry.space` custom domain

GitHub setup steps:

1. Open `Settings` > `Pages` in the repository
2. Set `Source` to `GitHub Actions`
3. Point your domain DNS records to GitHub Pages
4. Enable `Enforce HTTPS` after the first successful deployment

## Project Structure

```txt
src/
  app/
  components/
    ui/
  lib/
public/
  social/
```

Key files:

- `src/components/site-page.tsx`: page composition
- `src/components/navbar.tsx`: top navigation and controls
- `src/components/showreel-placeholder.tsx`: showreel area
- `src/components/capabilities-grid.tsx`: capability cards
- `src/components/footer-cta.tsx`: contact and footer section
- `src/lib/site-copy.ts`: bilingual site copy
- `src/app/globals.css`: global theme and surface styling

## Customization

- Update all copy from `src/lib/site-copy.ts`
- Replace social icons inside `public/social/`
- Swap the showreel area with a real embed in `src/components/showreel-placeholder.tsx`
- Adjust theme variables in `src/app/globals.css`

## License Note

This repository is shared as an open personal portfolio reference and can be adapted for your own work.
