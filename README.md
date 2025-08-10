# Marc‑Aurele Besner — Portfolio (v3)

A fast, accessible personal site built with Next.js 15, React 19 RC, Tailwind CSS, and Framer Motion. It showcases About, Experience, Projects, and Contact sections with dark mode, animated sections, strong SEO, and a strict Content Security Policy.

Live: https://marcaurelebesner.com

## Tech Stack
- Next.js 15 (App Router)
- React 19 RC
- Tailwind CSS
- Framer Motion
- next-themes (dark mode)

## Quick Start
Prerequisites: Node.js 18.18+ (or 20+ recommended) and your preferred package manager.

```bash
# Install dependencies
yarn
# or: npm i

# Start dev server
yarn dev
# or: npm run dev

# Build for production
yarn build
# or: npm run build

# Start production server
yarn start
# or: npm run start
```

Open http://localhost:3000 to view the site.

## Configuration
- Environment variables
  - `NEXT_PUBLIC_SITE_URL` (optional): Public site URL used for metadata. Defaults to `https://marcaurelebesner.com`.
- Content & SEO
  - Edit `src/config/site.ts` to update name, role, description, links, and SEO keywords.
  - Edit `src/constants/projects.ts` to change the projects list.
- Theming & Fonts
  - Dark mode via `next-themes`.
  - Local Geist fonts configured in `src/app/layout.tsx`.
- Security
  - Strict CSP and security headers are defined in `next.config.ts`.

## Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Project Structure
```
src/
  app/
    layout.tsx         # Global layout, metadata, providers, UI shell
    page.tsx           # Home: About, Experience, Projects, Contact
    globals.css        # Tailwind base and design tokens
    contact/           # Contact route
  components/          # UI components (Header, Menu, Experience, etc.)
  config/site.ts       # Site metadata and social links
  constants/projects.ts# Project data
```

## Deployment
- Recommended: Vercel
  1) Create a new project in Vercel and import this repo
  2) (Optional) Add `NEXT_PUBLIC_SITE_URL`
  3) Deploy. Vercel will run `next build` automatically.

Self‑hosting: `yarn build && yarn start` (ensure Node 18.18+).

## Accessibility & Performance
- Skip link, focus styles, and semantic sections
- Prefers-reduced-motion friendly animations
- Optimized images and font loading
- Smooth scrolling and dark mode support

## License
MIT © 2024 Marc‑Aurele Besner
