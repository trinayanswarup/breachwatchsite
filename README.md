# CipherCheck

A cybersecurity tool comparison site that ranks products by documented privacy criteria — not commission size.

## Live Demo

[https://ciphercheck.vercel.app](https://ciphercheck.vercel.app)

## Screenshots

[Homepage screenshot] [Quiz screenshot] [Category page screenshot]

## What This Is

CipherCheck is a commercial cybersecurity affiliate site, not a portfolio demo. It earns revenue through affiliate commissions on VPN, password manager, antivirus, and 2FA app referrals. The trust hypothesis: most comparison sites rank NordVPN first because NordVPN pays the highest commissions — CipherCheck ranks by published scoring criteria with documented weights, which is verifiable. The cybersecurity affiliate market is substantial and almost entirely captured by sites that bury their methodology. Transparent scoring is the differentiator.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript (strict), Tailwind CSS v4 |
| API routes | Next.js App Router API handlers |
| AI | Groq API (llama-3.3-70b-versatile) — security quiz |
| Analytics | PostHog (session recording + funnels) + Vercel Analytics |
| Data | Static JSON + ISR — no database at MVP stage |
| Deployment | Vercel |
| CI | GitHub Actions — lint, typecheck, build on every push |
| Testing | Vitest — 32 tests across 5 files |

## Features

- **AI security quiz** (Groq) — entry point for the acquisition funnel; asks 5 questions and routes users to the most relevant product category
- **Live breach checker** — uses HIBP k-anonymity API; only the first 5 characters of the SHA-1 hash leave the browser, never the password
- **Inline security tools** — DNS leak test (api.ipleak.net), password strength checker (local, no API call), breach lookup — all without an account
- **Real-time security news** — aggregates Hacker News + r/netsec + r/privacy + r/cybersecurity, deduplicated, filtered for security relevance
- **Recent breach tracker** — HIBP public API, ISR revalidation every 24 hours
- **Transparent scoring** — every product scored from JSON data with published criteria and weights; methodology at `/how-we-test`
- **Affiliate disclosure** — visible on every page with affiliate links, `rel="sponsored"` on tracked links
- **Sitemap** — `/sitemap.xml` generated post-build via next-sitemap

## Affiliate Architecture

Affiliate links are managed centrally in `src/lib/affiliate.ts`. Every outbound product link routes through this file — swapping in a real affiliate ID across the entire site requires editing one object, not hunting through 20 pages.

Current status: placeholder URLs in place. Affiliate programme approvals (NordVPN Partners, Bitwarden, Proton, Malwarebytes) require a custom domain — not a .vercel.app subdomain. Custom domain is pending until the site has enough traffic to justify the cost. Once live on a real domain, affiliate links activate by updating `src/lib/affiliate.ts` only.

The scoring methodology is intentionally decoupled from affiliate relationships — products are ranked before affiliate links are assigned, not after.

## Architecture Decisions

**Static JSON over a database:** ISR delivers sub-100ms page loads for category and comparison pages. Product data (VPNs, password managers, antivirus, 2FA apps) changes infrequently — pricing and features quarterly at most. At current traffic, a database adds operational cost and latency with no benefit. Supabase is the obvious next step if traffic validates the model.

**Groq over OpenAI:** Free tier, no credit card required, and llama-3.3-70b is fast enough for a 5-question quiz. At MVP stage, zero AI inference cost matters. The quiz makes exactly one API call per submission with a safe fallback if Groq errors — no unhandled exceptions, no broken user flow.

**PostHog over Vercel Analytics alone:** Vercel Analytics gives page views. PostHog gives funnels, session recordings, and feature flags. The key funnel — Homepage → Quiz → Category → Affiliate click — needs drop-off analysis to be actionable. Session recording identifies UX friction that aggregate data misses.

**k-anonymity for the breach checker:** CipherCheck's brand is that it doesn't compromise user privacy for commercial convenience. Sending plaintext passwords to an API would be a direct contradiction of that. The HIBP k-anonymity model (SHA-1 hash prefix only) is the only acceptable implementation.

## Growth & Analytics Setup

PostHog funnel tracking the full acquisition path:

```
Homepage → Quiz start → Quiz complete → Category page → Affiliate CTA click
```

Session recording is enabled with input masking on sensitive fields. ISR revalidation is tuned per content type:

| Content | Revalidation |
|---|---|
| Security news | 2 hours |
| Recent breaches | 24 hours |
| Category / comparison pages | 1 year (data changes trigger a rebuild) |
| Static pages (about, disclosure) | 1 year |

## AI-Native Development Workflow

Built using Claude (Anthropic) for architecture scaffolding, UI iteration, scoring algorithm generation, and TypeScript type design. All AI-generated code was reviewed, tested against the Vitest suite, and adapted to project constraints — not copy-pasted. The workflow compressed an estimated 3–4 week build into significantly less time while maintaining TypeScript strict mode throughout and zero `any` types in the codebase.

## Running Locally

```bash
git clone https://github.com/trinayanswarup/ciphercheck
cd ciphercheck
npm install
cp .env.example .env.local
```

Edit `.env.local` and set:

```
GROQ_API_KEY=          # console.groq.com — free, no credit card
NEXT_PUBLIC_POSTHOG_KEY=  # app.posthog.com → Project Settings → API Key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm run test
```

32 tests across 5 files covering scoring logic, k-anonymity hash utilities, API route behaviour, and affiliate URL construction.

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit (strict mode, zero any)
npm run build      # production build + sitemap generation
```

## Roadmap

If affiliate revenue validates the model:

- Migrate data layer to Supabase — product data as rows, scores computed server-side, admin UI for editorial updates
- User accounts — saved comparisons, personalised quiz results, email breach alerts
- Expand to 50+ products per category with automated data freshness checks
- A/B test quiz question ordering using PostHog feature flags to optimise category routing
- Expand to adjacent categories: identity theft protection, browser extensions, secure email
