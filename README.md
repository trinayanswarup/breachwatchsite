# BreachWatch

Honest cybersecurity tool comparisons. No jargon. No hidden bias.

**Live site:** [breachwatchsite.com](https://breachwatchsite.com)

BreachWatch helps everyday people find the right cybersecurity tool — VPN, password manager, antivirus, or 2FA app — through transparent scoring, genuine editorial content, and an AI-powered security quiz that identifies your single biggest risk in 30 seconds.

---

## How the scoring works

Every product is scored across a set of criteria specific to its category. Criteria have documented weights that sum to 100. Scores are calculated from the JSON data files in `src/data/` — they are never hardcoded in components. The full methodology is published at `/disclosure`.

Example — VPN scoring:
| Criterion | Weight | Why |
|-----------|--------|-----|
| Logging policy | 30% | The most important privacy factor |
| Jurisdiction | 20% | Legal environment for data requests |
| Price | 20% | Real cost to the user |
| Speed | 15% | Based on independent test results |
| Device limit | 10% | Practical usability |
| Streaming support | 5% | Common use case |

---

## Setup

```bash
git clone https://github.com/yourusername/breachwatchsite
cd breachwatchsite
npm install
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local
npm run dev
```

Get a free Groq API key at [console.groq.com](https://console.groq.com) — no credit card required.

---

## Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Groq API (llama-3.3-70b-versatile) for the security quiz
- Vercel Analytics for traffic tracking
- next-sitemap for automatic sitemap generation
- No database — all product data in JSON files

---

## Affiliate programmes

| Programme | Status | Notes |
|-----------|--------|-------|
| NordVPN Partners | Applied | Instant approval |
| Surfshark Affiliates | Applied | Instant approval |
| ExpressVPN | Applied | Via Commission Junction |
| 1Password | Applied | Via partners portal |
| Malwarebytes | Applied | Via Impact.com |
| Bitdefender | Applied | Via affiliates portal |
| Mullvad | N/A | No affiliate programme — linked directly |
| Bitwarden | N/A | No standard programme — referral only |

---

## Project structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── data/             # Product data and scoring criteria (JSON)
└── lib/              # Utilities: affiliate links, analytics, quiz
```

---

## Content principles

1. Read the actual privacy policy before scoring it — not the marketing page
2. Cite independent test sources (AV-TEST, AV-Comparatives, Cure53 audits)
3. Mention what each product gets wrong — this is what builds reader trust
4. Mullvad has no affiliate programme and is recommended anyway when it's the right answer
5. The affiliate model is disclosed transparently on every page with affiliate links

---

## CI

GitHub Actions runs on every push to main:
- TypeScript type check (`tsc --noEmit`)
- ESLint (`npm run lint`)
- Next.js build (`npm run build`)
