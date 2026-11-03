---
title: "[P7] Content-Security-Policy blocks the Google Analytics tag the homepage preloads"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "technical"
  - "impact:medium"
  - "effort:low"
---

## Evidence
The live homepage HTML contains:

`<link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=G-06CHDL8PE9" as="script"/>`

`src/app/layout.tsx` lines 122-124 render `GoogleAnalytics` when `siteConfig.googleAnalyticsId` is set. It is set in production, because that preload is on the response.

The same response sends the policy from `next.config.ts` lines 31-32:

`script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.live`

`connect-src 'self' https://vitals.vercel-insights.com https://vercel.live`

`script-src` does not include `https://www.googletagmanager.com`. `connect-src` does not include `https://www.google-analytics.com`, `https://analytics.google.com`, or `https://region1.google-analytics.com`. A browser enforcing this header refuses the gtag script and refuses the collect call. `img-src https:` does not carry gtag hits.

## Why it matters
The tag is in the HTML, so the site looks measured. The policy drops the hits. Choices about which pages earn advisory clicks are being made on a broken stream. Search Console and the GA property were not available for this audit. This is the collection bug, not a traffic figure.

## Fix
In the `headers()` CSP in `next.config.ts`, allow the hosts this tag uses:
- `script-src`: add `https://www.googletagmanager.com`
- `connect-src`: add `https://www.google-analytics.com`, `https://analytics.google.com`, and `https://region1.google-analytics.com`

Keep the existing Vercel hosts. Load https://marcaurelebesner.com/ and confirm the console has no CSP refusal for gtag, and that a request to `/g/collect` is not blocked.

## Done when
The homepage Content-Security-Policy allows the gtag script host and the collect host, and a fresh page view issues a `g/collect` request that the browser does not block. `script-src` does not grow a blanket `https:` scheme source.

---
Impact: Medium · Effort: Low · Found by automated audit on 2026-11-03
