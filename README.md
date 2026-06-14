# BreachWatch

BreachWatch is a non-affiliate cybersecurity utility and comparison site. It combines free security tools, breach awareness, curated security links, and transparent product comparisons. The live project currently uses direct product links or internal review links, not affiliate tracking links.

The codebase is still affiliate-ready: monetization can be enabled later by replacing the placeholder link map and updating the public disclosure copy before launch.

**Stack:** Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, Groq quiz API, Vercel Analytics, next-sitemap.

---

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `GROQ_API_KEY` | Yes for live quiz AI | The quiz falls back safely if missing or if Groq errors. |
| `VERCEL_ACCESS_TOKEN` | No | Optional for future analytics/admin work. |
| `VERCEL_PROJECT_ID` | No | Optional for future analytics/admin work. |

---

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run smoke
npm start
```

---

## Project Structure

```text
app/                         App Router pages
app/news/                    Curated security links
app/breaches/                Public breach records and response advice
app/tools/                   Free browser-safe tools
app/comparisons/[slug]/      Short comparison pages
app/reviews/                 Review and comparison articles
app/disclosure/              Funding and independence page

src/components/              Shared React components
src/data/                    Product data and scoring criteria
src/lib/                     Link helpers, analytics, quiz logic, types
```

---

## Current Monetization Status

The live site is intentionally non-affiliate right now.

- Product buttons use official product links where available.
- Placeholder products fall back to internal review pages.
- The public disclosure page says the site is currently non-affiliate.
- CTAs do not use `rel="sponsored"`.
- Product links do not append affiliate UTM parameters.
- Rankings are not paid placements.

This avoids claiming affiliate relationships before they exist and keeps the project compatible with a free deployment path.

Interview framing:

> BreachWatch is live as a trust-first, non-affiliate portfolio project. Product rankings come from editorial scoring criteria, not commercial placement. All product CTA URLs still flow through one helper, `src/lib/affiliate.ts`, so approved affiliate links could be enabled later without rewriting category pages, review pages, or product card components. Monetization is intentionally isolated from the scoring system.

---

## Affiliate-Ready Architecture

The affiliate-ready architecture is intentionally left easy to enable later, because the project may need to demonstrate commercial readiness without changing the live site's current non-affiliate stance.

The switch point is `src/lib/affiliate.ts`.

Every category page, review page, and shared product CTA component should resolve commercial product links through `buildAffiliateUrl(href, product, category, pageType)`. Direct informational links, such as source articles or security-news links, can stay as normal external links.

To enable affiliate links later:

1. Replace each `PLACEHOLDER` with an approved tracking URL.
2. Change `buildAffiliateUrl` to append the required tracking parameters.
3. Restore `rel="sponsored"` on paid links.
4. Update `/disclosure`, `/privacy`, footer copy, and product pages before deploying.
5. Confirm the deployment plan allows affiliate/commercial usage.

Potential programs to apply for later:

| Product | Program |
|---|---|
| NordVPN | NordVPN Partners |
| ExpressVPN | ExpressVPN Affiliates / CJ |
| Surfshark | Surfshark Affiliates |
| Proton VPN | Proton affiliate program |
| 1Password | 1Password affiliate / partner program |
| Dashlane | Dashlane affiliates |
| NordPass | NordPass partners |
| Keeper | Keeper affiliates |
| Malwarebytes | Impact.com |
| Bitdefender | Bitdefender affiliates |
| Norton | CJ Affiliate |
| ESET | ESET affiliates |

Brutal note: do not enable those links on a free deployment if the host terms require a paid/commercial plan.

---

## Private Analytics

BreachWatch does not expose a public `/stats` page. Builder metrics live in the private Vercel Analytics dashboard.

The app uses Vercel Analytics for anonymous page-view data and custom events for key product behavior:

- `quiz_start`
- `quiz_complete`
- `recommended_product_click`
- `product_link_click`
- `category_view`
- `comparison_view`

The intended funnel is: category or review visit -> quiz start -> quiz complete -> recommended category click -> product CTA click. Quiz answers are not stored; only aggregate event metadata is sent to analytics.

---

## Scoring

Every product is scored from JSON data in `src/data/`. Criteria are category-specific and weights sum to 100. The methodology is published at `/how-we-test`.

To update a product score, edit the product `scores` object in the relevant JSON file.

To change criteria weights, edit `src/data/scoring-criteria.json`.

For interview context, see `CASE_STUDY.md`. It explains the scoring model, evidence trail, non-affiliate architecture, analytics funnel, fallback behavior, and verification strategy.

---

## Pre-Launch Checklist

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] `GROQ_API_KEY` is configured for production
- [ ] `/sitemap.xml` renders after build
- [ ] `/robots.txt` renders after build
- [ ] Footer legal links work
- [ ] No public `/stats` route is exposed
- [ ] Public pages match the current non-affiliate status
- [ ] If affiliate links are enabled later, disclosure/privacy copy is updated first

---

## CI

GitHub Actions runs lint, tests, and build on every push and pull request to `main`.
