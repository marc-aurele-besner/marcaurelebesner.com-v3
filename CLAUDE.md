# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
yarn dev              # Start dev server at http://localhost:3000

# Build & Production
yarn build            # Build for production
yarn start            # Start production server

# Quality
yarn lint             # Run ESLint on src/
yarn type-check       # Run TypeScript type checking

# Testing
yarn test             # Run unit tests (Vitest)
yarn test:watch       # Run tests in watch mode
yarn test:coverage    # Run tests with coverage report
yarn test:storybook   # Run Storybook component tests

# Storybook
yarn storybook        # Start Storybook at http://localhost:6006
yarn build-storybook  # Build static Storybook site
```

## Architecture

This is a personal portfolio website built with Next.js 16 (App Router), React 19, and Tailwind CSS.

### Data-Driven Content

Content is centralized in config files, not hardcoded in components:
- `src/config/site.ts` - Site metadata, name, role, social links, SEO keywords
- `src/config/projects.ts` - Project data with `ProjectData` interface (slug, title, summary, badges, featured flag)
- `src/config/experience.ts` - Work experience with `ExperienceData` interface (slug, title, company, skills, isWeb3 flag)

### Page Structure

The home page (`src/app/page.tsx`) renders sections in order: About → Experience → Projects → Advisory → Contact. Each section is a standalone component that pulls from config files.

Dynamic routes:
- `/projects/[slug]` - Project detail pages generated from `projects.ts`
- `/experience/[slug]` - Experience detail pages generated from `experience.ts`

### Layout System

`src/app/layout.tsx` provides:
- Fixed sidebar navigation (desktop) via `Menu.tsx`
- Sticky header with hamburger menu (mobile) via `Header.tsx`
- Theme provider (dark/light mode via `next-themes`)
- Background effects (`Backdrop`, `Spotlight`)
- Google Analytics (conditional on `NEXT_PUBLIC_GA_ID`)

### Component Patterns

- `GlassCard` - Reusable glass-morphism container with hover effects
- `Badge` - Tech skill/technology tags with accent styling
- `SectionHeading` - Section titles with eyebrow text and gradient styling

### Analytics

All user interactions are tracked via `src/utils/analytics.ts`. Functions like `trackSocialLink()`, `trackProjectLink()`, `trackNavigation()` wrap Google Analytics events.

### Testing

Unit tests use Vitest with happy-dom. Test files are colocated with source files (`*.test.ts` or `*.test.tsx`). The setup file at `src/test/setup.ts` loads jest-dom matchers.

### Styling

- Tailwind CSS with custom theme in `tailwind.config.ts`
- CSS variables for theming defined in `src/app/globals.css`
- Dark mode colors: `darkBlue` (#0a192f), `lightCyan` (#64ffda), `grayTone` (#8892b0)

### Environment Variables

- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata (defaults to https://marcaurelebesner.com)
- `NEXT_PUBLIC_GA_ID` - Google Analytics 4 ID (optional)
