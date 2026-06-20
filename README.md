# CipherCheck

Cybersecurity tool comparison site that ranks products by published scoring criteria, not commission size.

## Live Demo

[https://ciphercheck.vercel.app](https://ciphercheck.vercel.app)

![Homepage](docs/screenshots/homepage.png)
![Quiz](docs/screenshots/quiz.png)
![Category page](docs/screenshots/category.png)

## The Problem

Most cybersecurity affiliate sites rank NordVPN first because NordVPN pays the highest commissions. Users have no way to tell. CipherCheck publishes its full scoring methodology — criteria, weights, and sources — so rankings can be verified independently of which products have affiliate programmes.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript (strict), Tailwind CSS v4 |
| AI | Groq (llama-3.3-70b) — security quiz and recommendations |
| Analytics | PostHog (funnels, session recording) + Vercel Analytics |
| APIs | HIBP (breach checker, k-anonymity), Hacker News, Reddit |
| CI/CD | GitHub Actions — lint, typecheck, build on every push |
| Deployment | Vercel |

## Features

- **AI security quiz** — five questions, routes users to the most relevant category based on threat profile
- **Breach checker** — HIBP k-anonymity; only the first 5 chars of the SHA-1 hash leave the browser, password never sent in plaintext
- **DNS leak test** — verifies VPN is actually routing traffic
- **Password strength checker** — scored locally, nothing sent anywhere
- **Live security news** — Hacker News + r/netsec + r/privacy, ISR revalidates every 2 hours
- **Recent breaches tracker** — HIBP public API, ISR revalidates every 24 hours
- **Transparent scoring** — weighted criteria published at `/how-we-test`, scores computed from JSON data
- **Sitemap + robots.txt** — generated post-build via next-sitemap

## Affiliate Architecture

All affiliate links are centralised in `src/lib/affiliate.ts`. One file edit activates real tracking links across the entire site. Affiliate programme approvals (NordVPN Partners, Proton, Bitwarden) require a custom domain — pending until post-launch. Scoring and rankings are determined before affiliate links are assigned, not after.

## Architecture Decisions

- **Static JSON over a database** — ISR delivers sub-100ms loads for category pages. Product data changes quarterly at most. Migration path to Supabase is straightforward when traffic justifies it.
- **Groq over OpenAI** — free tier is sufficient for the quiz use case. Zero AI inference cost at MVP stage.
- **PostHog over Vercel Analytics alone** — Vercel Analytics has no funnel support. PostHog tracks the full acquisition path: homepage → quiz → category page → affiliate click, with session recordings to identify drop-off.
- **k-anonymity for the breach checker** — sending passwords to an API on a privacy-focused site would directly contradict the product's premise.
- **ISR revalidation tuned per content type** — news: 2h, breaches: 24h, static category pages: 1 year.

## Running Locally

```bash
git clone https://github.com/trinayanswarup/ciphercheck
cd ciphercheck
npm install
cp .env.example .env.local
# Add GROQ_API_KEY and NEXT_PUBLIC_POSTHOG_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests

```bash
npm run test
```

32 tests across 5 files — scoring logic, k-anonymity hash utilities, API route behaviour, affiliate URL construction, and data integrity checks.

## Development Notes

CLAUDE.md and AGENTS.md are excluded from the public repository. They contain session-specific AI coding instructions, internal build quirks, and workflow notes that are only useful during active development. Shipping them publicly would be the equivalent of committing your scratch pad — they add noise without adding signal to anyone reading the codebase.

## Roadmap

- Activate affiliate links once custom domain is live
- Migrate product data to Supabase when traffic validates the model
- A/B test quiz question ordering using PostHog feature flags
- Expand to 50+ products per category
