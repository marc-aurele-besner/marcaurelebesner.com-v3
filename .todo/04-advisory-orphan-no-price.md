---
title: "[P4] /advisory has zero internal links, no price, and no proof"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "monetization"
  - "impact:high"
  - "effort:medium"
---

## Evidence
A search of `src/` for `href="/advisory"` hits `src/app/advisory/page.tsx` only. No component links to the URL. The live homepage HTML contains `href="#advisory"` and zero `href="/advisory"`.

`src/config/site.ts` lines 15-21 set primary nav to `#about`, `#experience`, `#projects`, `#advisory`, `#contact`. `src/components/Menu.tsx` line 30 rewrites those to `/#advisory` off the homepage, so the nav never lands on `/advisory`, `/contact`, `/projects`, or `/experience`.

The homepage advisory button (`src/components/Advisory.tsx` line 113) points at `/#contact`. About (`src/components/About.tsx` lines 66-90) renders two filled accent buttons, "Let's build something together" (`/#contact`) and "View Projects", plus a ghost Experience link.

`/advisory` is about 345 rendered words. The four services in `src/config/advisory.ts` are one sentence each. The only commercial language on the page is "Hourly · Retainer · Project-based". No rate, no client, no outcome. https://vibeinprod.com/services, the same person's product, publishes $1,500 to $3,000 and a typical $5k to $15k. The portfolio introduces that product as featured card 1 of 10.

`/contact` has no `h1`. `src/components/SectionHeading.tsx` line 12 is an `h2`, and `src/components/Contact.tsx` uses it for "Get in touch". The lede is "I'm open to collaborating on interesting projects, discussing Web3, or exploring new opportunities."

Search on 2026-11-03: the name query returns this site first (https://marcaurelebesner.com/), then LinkedIn. Buyer queries ("smart contract consultant", "solidity advisory", "hire a senior web3 engineer") are answered directly by Google with other independents who publish scope and price, including uqaabsecurity.com, kauz.gmbh, pyrite.rocks, hxxe.dev, and rocco.me. This domain is absent from those result sets.

## Why it matters
The URL built to sell the work is unreachable from the interface. The form that is reachable asks for collaborators. Head-term advisory queries already resolve as a zero-click list of priced consultants. This site's winnable query is the name, which it owns, and the next screen wastes it.

## Fix
- In `src/config/site.ts`, point Advisory at `/advisory` and Contact at `/contact`. Keep homepage hashes as in-page jumps on `/` only.
- In `src/components/About.tsx` and `src/components/Advisory.tsx`, use one filled primary button, and send it to `/advisory`.
- On `src/app/advisory/page.tsx`, print a starting price or link the VibeInProd price table with the dollar figures. Add two proof points you can name (a ship, a number, a repo) and one line on who you will not take.
- On the full contact page, render one `h1`, and rewrite the lede so a founder with a codebase recognizes paid work.
- Ignore the head terms. The page is for people who already searched the name.

## Done when
The primary nav on `/`, `/projects`, `/experience`, `/advisory`, and `/contact` includes `<a href="/advisory">`. The homepage has one filled primary button and it lands on `/advisory`. `/advisory` shows a numeric starting price or a link to the VibeInProd price table, plus two concrete proof points. `/contact` has one `h1`.

---
Impact: High · Effort: Medium · Found by automated audit on 2026-11-03
