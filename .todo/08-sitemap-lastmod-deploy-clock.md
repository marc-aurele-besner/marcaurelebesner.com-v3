---
title: "[P8] Sitemap lastmod on the five hub URLs is the deploy clock"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "seo"
  - "impact:medium"
  - "effort:low"
---

## Evidence
`src/app/sitemap.ts` lines 25, 32, 38, 46, and 51 set `lastModified: new Date()` for `/`, `/projects`, `/experience`, `/advisory`, and `/contact`.

https://marcaurelebesner.com/sitemap.xml, fetched during this audit, stamps all five with `2026-11-03T14:02:02.534Z`. That is the build time. `/projects` also sets `changeFrequency: "weekly"` (line 33). The newest project `updatedAt` in `src/config/projects.ts` is `"2025-09"` (VibeInProd, line 44). The current role `updatedAt` is `"2026-08"` (`src/config/experience.ts` line 32), so `/experience/antler-labs` says 1 Aug 2026 while `/experience` says it changed at 14:02 today.

Detail URLs use `parseMonth(updatedAt)`, which is what the comment in `src/config/projects.ts` lines 14-18 describes. The five hubs never got that treatment. `robots.txt` allows `/` and disallows `/secret` only. `/secret` also sends `noindex, nofollow` (`src/app/secret/page.tsx` lines 5-7). Its canonical still inherits `/` from the root layout (`alternates.canonical: "/"` in `src/app/layout.tsx` line 42), so a noindex URL declares the homepage as its canonical.

## Why it matters
Google discounts a sitemap whose `lastmod` moves on every build. A weekly changefreq on a hub whose newest case study is September 2025 trains the crawler to ignore `lastmod`, including the 22 detail dates that are actually tied to content.

## Fix
Stop calling `new Date()` for the hubs. Set each hub `lastModified` from a stored date, or from the latest `updatedAt` of the entries that hub lists. Change `/projects` `changeFrequency` to `monthly` until the dataset changes weekly. On `src/app/secret/page.tsx`, set `alternates.canonical` to `/secret` or omit the canonical, so the noindex page stops nominating the homepage.

## Done when
Two production deploys that do not edit content leave the five hub `<lastmod>` values byte-identical. `/projects` `lastmod` is not later than the newest project `updatedAt` unless the hub copy changed. View source on `/secret` does not canonicalize to `https://marcaurelebesner.com`.

---
Impact: Medium · Effort: Low · Found by automated audit on 2026-11-03
