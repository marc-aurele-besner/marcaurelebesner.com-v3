---
title: "[P2] JSON-LD prices VibeInProd and PayXor at $0 and lists former employers as current"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "seo"
  - "impact:high"
  - "effort:low"
  - "quick-win"
---

## Evidence
View source on https://marcaurelebesner.com/projects/vibeinprod. The JSON-LD `SoftwareApplication` describes "A service that helps AI startups stabilize their codebases in 10 days" and then offers `"@type":"Offer","price":"0","priceCurrency":"USD"`.

https://vibeinprod.com/services lists an Audit Sprint at $1,500 to $3,000 and a Stabilization Week typically at $5k to $15k.

https://marcaurelebesner.com/projects/payxor puts both of these in the same object: description "Charges 1% platform fee." and `"price":"0"`.

`src/utils/jsonld.tsx` lines 183-187 attach that Offer to every project. `src/app/projects/page.tsx` line 67 maps `softwareApplicationJsonLd` over all 14 projects, so `/projects` publishes 14 free offers, and each `/projects/[slug]` page publishes another. 15 URLs.

Homepage JSON-LD (`src/utils/jsonld.tsx` lines 50-54) sets `worksFor` to `experiences.slice(0, 3)`: Antler Labs, Autonomys Network, Oamo. Autonomys ended Jun 2025 and Oamo ended Apr 2024 (`src/config/experience.ts` lines 61 and 97). `worksFor` means current employment. The same helpers also embed a second `@context` on every node inside `@graph`, and the current role is serialized as `"endDate":null` because `toIsoOrNull("Present")` returns null (lines 94-97 and 126-132).

## Why it matters
A rich result that says the stabilization service costs $0 undercuts the only priced offer attached to your name. PayXor's fee and its offer contradict each other in one script block. `worksFor` telling Google you currently work at Autonomys and Oamo fights the timeline on the page and on LinkedIn.

## Fix
In `src/utils/jsonld.tsx`:
- Remove the default Offer. Emit `offers` only for a project that is actually free. Omit it for VibeInProd, or point it at the real price. Omit price 0 on PayXor while the description states a 1% fee.
- Set `worksFor` to entries whose `endDate` is "Present". Today that is Antler Labs only.
- Put `@context` on the root object only. Strip it from nodes placed inside `@graph`.
- Omit `endDate` when the role is current, instead of emitting null.

## Done when
View source on `/projects/vibeinprod`, `/projects/payxor`, and `/projects` contains no `"price":"0"` for those two products. Homepage JSON-LD `worksFor` lists only Antler Labs. Google's Rich Results test on those three URLs reports no invalid offer and no current-employer mismatch.

---
Impact: High · Effort: Low · Found by automated audit on 2026-11-03
