---
title: "[P6] mymultisig.app fails TLS and golfalpine.ca returns HTTP 526"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "trust"
  - "impact:medium"
  - "effort:low"
---

## Evidence
`src/config/projects.ts` line 268 sets `link: "https://mymultisig.app/"`. On 2026-11-03 that host fails TLS. The certificate is `CN=*.netlify.app`, and curl reports `subjectAltName does not match mymultisig.app`. https://marcaurelebesner.com/projects/mymultisig labels the URL "Website".

Line 332 sets `link: "https://golfalpine.ca/"`. `curl -I https://golfalpine.ca/` returns HTTP 526. https://marcaurelebesner.com/projects/golf-alpine labels it "Website".

Other `link` values checked the same day: vibeinprod.com, opendrift.app, circusconnect.com, eternalmint.xyz, fileonchain.org, oamo.io, collageofmyself.com, and plantswap.finance returned 200. payxor.xyz returned 307 to `/en`. ai3.info returned 308 to `https://www.ai3.info/`. `https://github.com/autonomys/astral` returned 200. `https://www.npmjs.com/package/@autonomys/auto-consensus` returned 403 to this client, so that package URL was not confirmed.

## Why it matters
Both broken URLs are the "Website" action on pages that are already under 80 rendered words. The click is the proof the project is real. A certificate error and a 526 say the entry was left to rot.

## Fix
In `src/config/projects.ts`, remove `link` on mymultisig and golf-alpine, or replace each with a URL that returns 200 (both already have `repoLink`). Reload the two project pages and confirm the Website control is gone or healthy.

## Done when
Every `link` in `src/config/projects.ts` returns a final HTTP 200. https://marcaurelebesner.com/projects/mymultisig and `/projects/golf-alpine` do not point at a TLS failure or an HTTP 526.

---
Impact: Medium · Effort: Low · Found by automated audit on 2026-11-03
