# BreachWatch

Cybersecurity tools comparison and affiliate site. Earns revenue through affiliate commissions. Targets organic search traffic via SEO-optimised comparison content. The entry point is an AI-powered security quiz.

**Stack:** Next.js 16 App Router · TypeScript strict · Tailwind CSS v4 · Groq (llama-3.3-70b-versatile) · Vercel Analytics · next-sitemap

---

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in your GROQ_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Required | Where to get it |
|---|---|---|
| `GROQ_API_KEY` | Yes (for quiz) | [console.groq.com](https://console.groq.com) — free, no credit card |
| `VERCEL_ACCESS_TOKEN` | No | Vercel dashboard → Settings → Tokens |
| `VERCEL_PROJECT_ID` | No | Vercel project settings |

The quiz falls back to a sensible default recommendation if `GROQ_API_KEY` is missing or Groq returns an error — it never throws.

The `/stats` page shows placeholder copy if Vercel credentials are absent. They are optional and only needed for the live traffic dashboard.

---

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build (runs next-sitemap as postbuild)
npm run lint     # ESLint
npm run test     # Vitest unit tests
npm start        # Serve production build
```

---

## Project structure

```
app/                        # All served pages (App Router)
├── page.tsx                # Homepage
├── quiz/
│   ├── page.tsx            # Quiz UI
│   └── api/route.ts        # Quiz API — calls Groq, never throws
├── vpn/page.tsx
├── password-managers/page.tsx
├── antivirus/page.tsx
├── 2fa-apps/page.tsx
├── reviews/
│   ├── nordvpn/
│   ├── bitwarden/
│   ├── nordvpn-vs-expressvpn/
│   ├── bitwarden-vs-1password/
│   └── best-vpn-lithuania/
├── about/page.tsx
├── privacy/page.tsx
├── disclosure/page.tsx
└── stats/page.tsx

src/
├── components/             # Shared React components
├── data/                   # All product data as JSON (no database)
│   ├── vpns.json
│   ├── password-managers.json
│   ├── antivirus.json
│   ├── 2fa-apps.json
│   └── scoring-criteria.json
└── lib/
    ├── affiliate.ts        # All affiliate URLs — single source of truth
    ├── analytics.ts        # Vercel Analytics helpers
    ├── quiz.ts             # Groq quiz logic + parseQuizResult
    └── types.ts            # Shared TypeScript types
```

---

## How scoring works

Every product is scored from JSON data in `src/data/` — never hardcoded in components. Criteria are per-category with weights summing to 100. The methodology is published at `/about`.

To update a score: edit the product's `scores` object in the relevant JSON file.
To change criteria weights: edit `src/data/scoring-criteria.json`.

The UI recalculates automatically on the next build.

---

## Affiliate setup — what needs to be done before launch

All affiliate URLs live in `src/lib/affiliate.ts`. Replace each `PLACEHOLDER` with your real tracking link before going live.

| Product | Affiliate programme | Where to sign up | Status |
|---|---|---|---|
| NordVPN | NordVPN Partners | affiliates.nordvpn.com | **PLACEHOLDER** |
| ExpressVPN | ExpressVPN Affiliates | expressvpn.com/affiliates | **PLACEHOLDER** |
| Surfshark | Surfshark Affiliates | surfshark.com/affiliates | **PLACEHOLDER** |
| Mullvad | None — link directly | — | direct (no programme) |
| ProtonVPN | Proton Affiliate Program | proton.me/about/affiliates | **PLACEHOLDER** |
| 1Password | 1Password Affiliate | 1password.com/affiliate | **PLACEHOLDER** |
| Dashlane | Dashlane Affiliates | dashlane.com/affiliates | **PLACEHOLDER** |
| NordPass | NordPass Partners | nordpass.com/affiliates | **PLACEHOLDER** |
| Keeper | Keeper Affiliates | keepersecurity.com/affiliates | **PLACEHOLDER** |
| Malwarebytes | Impact.com | impact.com (search Malwarebytes) | **PLACEHOLDER** |
| Bitdefender | Bitdefender Affiliates | bitdefender.com/affiliates | **PLACEHOLDER** |
| Norton | CJ Affiliate | cj.com (search Norton) | **PLACEHOLDER** |
| ESET | ESET Affiliates | eset.com/affiliates | **PLACEHOLDER** |
| Bitwarden | Referral only | bitwarden.com dashboard | direct (no standard programme) |

**Mullvad and Bitwarden** have no standard affiliate programmes. They are linked directly — this is intentional and builds editorial credibility.

Once you have a real URL, replace `PLACEHOLDER` in `src/lib/affiliate.ts`:

```typescript
// Before
nordvpn: 'PLACEHOLDER',

// After
nordvpn: 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOUR_ID',
```

UTM params (`utm_source=breachwatchsite`, `utm_medium=affiliate`, `utm_campaign={category}-{pagetype}`) are appended automatically by `buildAffiliateUrl`.

---

## Deployment

1. Push to GitHub
2. Import project at vercel.com
3. Set `GROQ_API_KEY` in Vercel → Settings → Environment Variables
4. Deploy

The `postbuild` script runs `next-sitemap` automatically after each Vercel build, generating `public/sitemap.xml` and `public/robots.txt`.

---

## Pre-launch checklist

- [ ] All `PLACEHOLDER` values in `src/lib/affiliate.ts` replaced with real links
- [ ] `GROQ_API_KEY` set in Vercel environment variables
- [ ] Google Search Console: domain verified
- [ ] Sitemap submitted to Search Console: `https://breachwatchsite.com/sitemap.xml`
- [ ] Quiz tested end-to-end on mobile viewport (real device or DevTools)
- [ ] Affiliate disclosure note confirmed visible on every category page and review page
- [ ] No `console.error` in browser DevTools on any page
- [ ] `npm run build` passes clean
- [ ] `npm run lint` passes clean
- [ ] `npm run test` passes clean

---

## CI

GitHub Actions runs lint → test → build on every push and PR to `main`.

Add `GROQ_API_KEY` as a GitHub Actions secret if needed. It is only used at runtime by the quiz API route — the build succeeds without it.
