---
title: "[P3] www.marcaurelebesner.com fails TLS on the Netlify wildcard certificate"
assignee: marc-aurele-besner
labels:
  - "audit"
  - "technical"
  - "impact:high"
  - "effort:low"
  - "quick-win"
---

## Evidence
`curl -v https://www.marcaurelebesner.com/` aborts the handshake:

`SSL: no alternative certificate subject name matches target host name 'www.marcaurelebesner.com'`

The certificate served is `CN=*.netlify.app` (Netlify, Inc, expires Mar 19 2027). www DNS points at `marcaurele-v3.netlify.app` (IPv6 `2600:1f1c:446:4900::258` and `::259`).

The apex is fine: `https://marcaurelebesner.com/` returns 200 with canonical `https://marcaurelebesner.com`. `http://marcaurelebesner.com/` returns 301 to that apex. Trailing-slash `/projects/` returns 308 to `/projects`. Canonicals on the sampled pages match the non-www, no-trailing-slash URLs.

`next.config.ts` line 28 sends `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`. Once a browser has seen the apex, it will not fall back to HTTP for www, and www has no matching certificate. `src/app/robots.ts` line 14 and the sitemap already use the apex.

## Why it matters
Typed www, and any old www backlink, ends at a certificate error. `includeSubDomains` makes that a hard fail. Submitting this host to the HSTS preload list would make the failure permanent for every browser.

## Fix
Add `www.marcaurelebesner.com` as a domain alias on the Netlify site that already serves the apex. Wait until the certificate lists that name, then 301 every www URL to the matching apex URL in one hop. Do that before any HSTS preload submission.

## Done when
`curl -I https://www.marcaurelebesner.com/` returns 301 to `https://marcaurelebesner.com/` and the certificate subject alternative name includes `www.marcaurelebesner.com`. The same check passes for `/projects` and `/advisory`.

---
Impact: High · Effort: Low · Found by automated audit on 2026-11-03
