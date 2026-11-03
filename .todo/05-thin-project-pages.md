---
title: "[P5] Project pages are blurbs, and the index claims they are case studies"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "content"
  - "impact:high"
  - "effort:high"
---

## Evidence
https://marcaurelebesner.com/sitemap.xml lists 27 URLs: 5 hubs, 8 experience pages, 14 project pages (`src/app/sitemap.ts`). There is no comparison template, guide template, category template, tool template, or i18n config. The homepage has no `hreflang`. `src/app/layout.tsx` line 91 sets `lang="en"` only.

`src/app/projects/page.tsx` lines 89-92:

"A cross-section of recent Web3, AI, and developer-tooling work. Each project page includes the problem, stack, and what shipped."

`src/app/projects/[slug]/page.tsx` lines 171-205 render `description`, an h2 "Key Features", the highlight bullets, an h2 "Technologies", and badges. No problem section. No outcome section. All 14 project pages and all 8 experience pages share that skeleton. At 27 URLs this is a portfolio, not a doorway farm. The thin URLs are still indexed: the name SERP on 2026-11-03 listed `/experience/autonomys`, `/projects`, and `/projects/eternal-mint` under the homepage.

Description-plus-highlights word counts from `src/config/projects.ts`:

- mymultisig 23 (lines 258-263). The description is "A simple web app that allows you to create and manage multisig wallets."
- collage-of-myself 28
- golf-alpine 31
- plantswap-finance 33
- astral-block-explorer 35
- oamo 38
- autonomys-auto-sdk 41
- ai3-info 46

Rendered pages, navigation included: https://marcaurelebesner.com/projects/mymultisig about 72 words, `/projects/golf-alpine` about 77, `/projects/astral-block-explorer` about 89, `/projects/vibeinprod` about 102.

Astral (lines 165-183) is called a "Production block explorer" and has `repoLink` only. The live page has a Repository link and no Website link.

`src/components/Projects.tsx` lines 34-36 say "A few things I shipped recently." Four of the ten `featured: true` entries are dated 2024 in `updatedAt`: eternal-mint 2024-09, ai3-info 2024-09, fileonchain 2024-05, oamo 2024-03. The newest featured `updatedAt` is vibeinprod, 2025-09.

The dataset is 14 projects and 8 roles. That is the ceiling. More generated URLs would be empty pages. The missing mass is outcomes on the URLs that already exist.

## Why it matters
Google already ranks these blurbs for the branded query, directly under the homepage. A 23-word page and a "production" explorer with no live URL are what a buyer finds after the name search. The hub sentence is false today.

## Fix
- Rewrite the lede in `src/app/projects/page.tsx` so it describes the pages as they are, until the pages change.
- For each featured project, add the problem, your role, and what shipped (a number or a repo path) in `src/config/projects.ts`, and render those fields in `src/app/projects/[slug]/page.tsx`. Remove `featured` from any project you cannot write that for.
- Add a working `link` for Astral, or stop calling it a production explorer on the page.
- Drop mymultisig, collage-of-myself, plantswap-finance, and golf-alpine from the sitemap until each description-plus-highlights count is over 40 words and the page says what shipped. `noindex` them in `generateMetadata` or delete the routes.
- Do not add programmatic URLs on top of this dataset.

## Done when
The sentence "Each project page includes the problem, stack, and what shipped." is either gone or true. Every featured project page shows a problem, a role, and a result that does not repeat the summary. The four pages under 40 body words are absent from `sitemap.xml`. The sitemap URL count is 27 or lower.

---
Impact: High · Effort: High · Found by automated audit on 2026-11-03
