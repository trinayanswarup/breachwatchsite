# CipherCheck

A cybersecurity tool comparison and affiliate site. Ranks VPNs, password managers, antivirus, and 2FA apps by documented scoring criteria.

## Tech Stack

- Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4
- Groq API (llama-3.3-70b-versatile) for the AI security quiz
- PostHog (session recording, funnel analysis) + Vercel Analytics
- Vitest for testing
- next-sitemap for sitemap generation
- No database — product data in JSON files in `/src/data/`

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```
GROQ_API_KEY=              # console.groq.com — free, no credit card
NEXT_PUBLIC_POSTHOG_KEY=   # app.posthog.com → Project Settings → API Key
```

Copy `.env.example` to `.env.local` and fill in both values.

## Tests

```bash
npm run test
```
