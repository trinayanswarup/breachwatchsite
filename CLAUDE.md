# CLAUDE.md — CipherCheck

## What this project is
CipherCheck is a real commercial product, not a portfolio demo. It is a cybersecurity tools comparison and affiliate site that earns revenue through affiliate commissions. It targets organic search traffic via SEO-optimised comparison content. The entry point is an AI-powered security quiz. Everything is built on the free tier — zero ongoing costs.

## Your job
You are building a production-quality Next.js 14 app. Every decision you make should optimise for:
1. Real users finding the site through Google search
2. Those users completing the quiz or reading a comparison page
3. Those users clicking an affiliate link and converting

This is not a demo. Ship production-quality code every session.

## Tech stack
- Next.js 14 with App Router
- TypeScript (strict mode, no `any`)
- Tailwind CSS
- Groq SDK (llama-3.3-70b-versatile) for the quiz
- Vercel Analytics for tracking
- next-sitemap for sitemap generation
- No database — all product data lives in JSON files in /src/data/

## Project structure
```
ciphercheck/
├── CLAUDE.md
├── PRD.md
├── README.md
├── .env.example
├── .env.local               ← never commit this
├── next-sitemap.config.js
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    ← homepage
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── disclosure/page.tsx
│   │   ├── stats/page.tsx
│   │   ├── quiz/
│   │   │   ├── page.tsx
│   │   │   └── api/route.ts
│   │   ├── vpn/page.tsx
│   │   ├── password-managers/page.tsx
│   │   ├── antivirus/page.tsx
│   │   ├── 2fa-apps/page.tsx
│   │   ├── reviews/
│   │   │   ├── nordvpn/page.tsx
│   │   │   ├── bitwarden/page.tsx
│   │   │   ├── nordvpn-vs-expressvpn/page.tsx
│   │   │   ├── bitwarden-vs-1password/page.tsx
│   │   │   └── best-vpn-lithuania/page.tsx
│   │   ├── breach-checker/
│   │   │   └── page.tsx
│   │   ├── score/
│   │   │   └── [score]/page.tsx
│   │   └── api/
│   │       ├── breach-checker/route.ts
│   │       ├── recent-breaches/route.ts
│   │       └── security-news/route.ts
│   ├── components/
│   │   ├── ComparisonTable.tsx
│   │   ├── QuizWidget.tsx
│   │   ├── QuizResult.tsx
│   │   ├── ProductCard.tsx
│   │   ├── AffiliateCTA.tsx
│   │   ├── StatsDisplay.tsx
│   │   ├── ScoreBreakdown.tsx
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── BreachChecker.tsx
│   │   ├── BreachResult.tsx
│   │   ├── RecentBreaches.tsx
│   │   ├── SecurityNews.tsx
│   │   └── ShareScore.tsx
│   ├── data/
│   │   ├── vpns.json
│   │   ├── password-managers.json
│   │   ├── antivirus.json
│   │   ├── 2fa-apps.json
│   │   └── scoring-criteria.json
│   └── lib/
│       ├── quiz.ts
│       ├── analytics.ts
│       ├── affiliate.ts
│       └── news.ts
```

## Environment variables
```
GROQ_API_KEY=your_key_here
```
Get `GROQ_API_KEY` free at console.groq.com — no credit card required.

## Rules you must follow

### Code quality
- TypeScript strict mode. No `any` types ever.
- Every component has explicit prop types defined as an interface above the component.
- No inline styles — use Tailwind classes only.
- Every image needs an alt attribute.
- Every page needs a metadata export with a unique title and description.

### SEO rules — these are non-negotiable
- Every page.tsx must export a `metadata` object with `title` and `description`.
- Title format: `{Page-specific title} | CipherCheck`
- Description must be written for click-through rate — it's what users read in Google before clicking. 150-160 characters. Make it compelling.
- H1: exactly one per page, contains the primary keyword.
- H2s: contain secondary keywords naturally.
- Internal links: every page links to at least two other pages on the site.

### Affiliate rules
- All affiliate CTAs go through the `AffiliateCTA` component — never hardcode affiliate URLs directly in pages.
- Every affiliate link fires a Vercel Analytics `track()` event.
- Every page with affiliate links must have a visible disclosure note.
- AffiliateCTA component adds UTM params automatically.

### Content rules
- Write as a journalist, not a marketer.
- Every product claim must be something verifiable — pricing from official sites, policy details from the actual privacy policy.
- Scores are calculated from the JSON data, never hardcoded in components.
- Comparison tables show scoring criteria with weights — the methodology is always transparent.

### Quiz rules
- The quiz API route must never throw an unhandled error. Always return a valid response even if Groq fails — use a sensible default recommendation.
- Quiz answers are never stored anywhere — no database, no logging.
- The quiz makes exactly one Groq API call per submission.

### Breach checker and live data rules
- Breach checker API route must never log or store passwords
- All external API calls must use Next.js fetch caching with appropriate revalidation times
- News feed must handle partial failures gracefully — if one source fails, show the other two
- Password hash checking must use k-anonymity — only the first 5 characters of the SHA-1 hash are ever sent to the HIBP API

## What done looks like
A session is done when:
- `npm run build` passes with zero errors and zero TypeScript errors
- `npm run lint` passes clean
- The specific feature works end-to-end in the browser
- All affiliate links have correct UTM params
- All new pages have metadata exports

## Do not
- Do not use `any` in TypeScript
- Do not hardcode affiliate URLs outside of `affiliate.ts`
- Do not store quiz answers
- Do not use a database — JSON files only
- Do not add dependencies without checking if they are needed
- Do not leave TODO comments in committed code
- Do not commit `.env.local`
