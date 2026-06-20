# CLAUDE.md — CipherCheck

## What this is

A cybersecurity tool comparison and affiliate site. Users browse ranked VPNs, password managers, antivirus, and 2FA apps scored by documented criteria. Entry point is an AI security quiz. Includes live breach checking, DNS leak test, and security news feed.

## Stack

- **Frontend**: Next.js 16 App Router, TypeScript (strict), Tailwind CSS v4
- **AI**: Groq llama-3.3-70b-versatile — security quiz and recommendations
- **Analytics**: PostHog (session recording, funnels) + Vercel Analytics
- **APIs**: HIBP (k-anonymity breach checker), Hacker News, Reddit
- **Data**: Static JSON with ISR — no database at MVP stage
- **Testing**: Vitest — 32 tests, all offline
- **CI**: GitHub Actions — lint, typecheck, build on every push
- **Deploy**: Vercel

## Critical rules

- npm run build must pass clean after every change
- No any types
- Server secrets (GROQ_API_KEY) never in use client files
- Only NEXT_PUBLIC_POSTHOG_KEY is safe client-side
- HIBP breach checker must use k-anonymity — never send full password or full hash to any API
- Affiliate links all go through src/lib/affiliate.ts — never hardcode URLs in page files

## ISR revalidation

- Security news: 2 hours
- Recent breaches: 24 hours
- Static category pages: 1 year

## Environment variables

GROQ_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
