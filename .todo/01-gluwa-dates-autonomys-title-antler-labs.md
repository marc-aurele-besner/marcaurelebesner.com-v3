---
title: "[P1] Gluwa dates, Autonomys title, and Antler Labs contradict LinkedIn"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "trust"
  - "impact:high"
  - "effort:low"
  - "quick-win"
---

## Evidence
Live page https://marcaurelebesner.com/experience/autonomys and `src/config/experience.ts` lines 55-61 title the whole Apr 2024 to Jun 2025 Autonomys span "Lead Software Engineer".

The public LinkedIn profile (https://www.linkedin.com/in/marc-aurele-besner/) splits that span: Senior Product Engineer, Apr 2024 to Apr 2025, then Lead Product Engineer, Apr 2025 to Jun 2025 (2 months).

Gluwa on the site, `src/config/experience.ts` lines 127-131: start "Feb 2022", end "Jun 2023". LinkedIn: Feb 2022 to Jan 2023 (11 months). The site's June end date overlaps Oamo (Mar 2023 to Apr 2024, lines 93-97) by four months and Indigo (Jan 2023 to Apr 2023, lines 158-161) by four months. All three entries use `type: "remote"`. None is marked part-time or contract.

Antler Labs, lines 24-52, has no `companyUrl`. Autonomys, Oamo, and Gluwa all have one. The summary at lines 33-34 is copied into highlight 1 at line 38:

"Architect and build production software across AI, developer tooling, infrastructure, and blockchain systems."

Highlight 2 at line 39 repeats the LinkedIn bullet. https://antlerlabs.dev/ describes an independent product lab. LinkedIn's company card says Antler Labs was founded in 2025 with a 1-10 person headcount. The portfolio never says this is your studio. The name collides with Antler the venture firm.

FileOnChain, `src/config/projects.ts` line 197: "Started at the Consensus 2024 Hackathon (3rd place)." The LinkedIn project entry for the same hackathon says "2nd Place in the Polkadot track" and does not mention 3rd. The site names no track.

## Why it matters
The name query already returns this site first. The next click is LinkedIn. A 14-month "Lead" title, a Gluwa end date five months later than LinkedIn, and an unexplained Antler Labs read as inflation. Smart-contract and payments work is money-adjacent, so a title the public profile does not support is an E-E-A-T problem on the page buyers use to decide.

## Fix
In `src/config/experience.ts`:
- Match the Autonomys titles to the two LinkedIn ranges, or keep one entry and use the title held for most of the tenure, with the promotion in a highlight.
- Set Gluwa `endDate` to the month you will defend in public. Jan 2023 removes the Oamo overlap.
- Mark Indigo part-time if it ran beside another role.
- Add `companyUrl: "https://antlerlabs.dev"` and one sentence that Antler Labs is your studio.
- Delete the duplicated Antler highlight. Name products shipped.
- In `src/config/projects.ts`, state the FileOnChain result with the track, so it matches the LinkedIn project entry.

## Done when
Autonomys title and dates, the Gluwa end month, and the hackathon result on the site match https://www.linkedin.com/in/marc-aurele-besner/, or the page states the difference in one sentence. Antler Labs links to https://antlerlabs.dev/ and identifies the studio. The sentence "Architect and build production software across AI, developer tooling, infrastructure, and blockchain systems." appears once on the site.

---
Impact: High · Effort: Low · Found by automated audit on 2026-11-03
