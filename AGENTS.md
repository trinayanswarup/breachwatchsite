# AGENTS.md — BreachWatch

## How Claude Code should approach this project

BreachWatch is built in seven sequential sessions. Each session has a clear input, a clear output, and a definition of done. Never start a session until the previous session's output passes `npm run build` and `npm run lint`.

---

## Agent responsibilities

### Foundation agent (Session 1)
**Owns:** Project scaffolding, all data files, utility libraries
**Input:** CLAUDE.md, PRD.md, this file
**Output:** 
- Working Next.js 14 project with correct tsconfig (strict mode)
- All four data JSON files with real researched data
- `src/lib/affiliate.ts` with placeholder URLs
- `src/lib/analytics.ts` wrapping Vercel Analytics
- `src/lib/quiz.ts` with Groq integration
- `.env.example` with `GROQ_API_KEY`
- `next-sitemap.config.js`
- `package.json` with all required dependencies
**Done when:** `npm run build` passes on an empty app/page.tsx

**Critical data rules:**
- VPN scores must come from real sources. Logging policy scores: read the actual privacy policy. Speed scores: cite AV-Comparatives or independent tests. Do not invent numbers.
- Each product must have `affiliateUrl` set to `'PLACEHOLDER'` — replaced in Session 6 with real IDs.
- All weights within a category must sum to exactly 100.

---

### Component agent (Session 2)
**Owns:** All reusable components in `src/components/`
**Input:** PRD.md component specs, data types from Session 1
**Output:** All eight components fully typed and functional
**Done when:** A test page renders all components without TypeScript errors

**Component rules:**
- Props interfaces defined above each component, exported
- No hardcoded strings — all text comes from props or data files
- AffiliateCTA: UTM params built in `buildAffiliateUrl(href, product, category, pagetype)` from `lib/affiliate.ts`. Track event fires `onClick` before navigation.
- ComparisonTable: mobile-responsive. Horizontally scrollable on small screens. Sticky first column (criterion names). Winning product column has a highlighted border.
- QuizWidget: manages all state internally. Parent only receives the completed answers via `onComplete`. No external state management needed.

---

### Homepage and quiz agent (Session 3)
**Owns:** `app/page.tsx`, `app/quiz/page.tsx`, `app/quiz/api/route.ts`
**Input:** Components from Session 2, quiz.ts from Session 1
**Output:** Working homepage and end-to-end quiz flow
**Done when:** Quiz completes and renders a result with a working CTA link

**Quiz API rules:**
```typescript
// The exact Groq prompt — do not deviate from this structure
const systemPrompt = `You are a cybersecurity advisor giving personalised recommendations. 
Always respond with valid JSON only. No markdown, no explanation, just the JSON object.`

const userPrompt = `A user answered these security questions:
- Reuses passwords across sites: ${answers.reusePasswords}
- Uses a password manager: ${answers.usesPasswordManager}  
- Email has 2FA enabled: ${answers.hasTwoFA}
- Uses VPN on public WiFi: ${answers.usesVPNOnPublicWifi}
- Has checked for data breaches: ${answers.checkedBreaches}

Return this exact JSON structure:
{
  "biggestRisk": "one sentence describing their single biggest security vulnerability",
  "score": <integer 1-5 where 1 is least secure>,
  "recommendedCategory": <one of: "vpn", "password-manager", "antivirus", "2fa-apps">,
  "reasoning": "one sentence explaining why this category helps them most right now",
  "urgency": <one of: "high", "medium", "low">
}`

// Fallback if Groq fails — never let the quiz break
const defaultResult: QuizResult = {
  biggestRisk: "Using the same password across multiple sites is your biggest risk.",
  score: 2,
  recommendedCategory: "password-manager",
  reasoning: "A password manager eliminates password reuse by generating unique passwords for every site.",
  urgency: "high"
}
```

---

### Category pages agent (Session 4)
**Owns:** All four category pages
**Input:** All components, all data files
**Output:** `/vpn`, `/password-managers`, `/antivirus`, `/2fa-apps` — fully built
**Done when:** All four pages render correctly with real data, correct metadata, and working affiliate CTAs

**Category page structure (every page follows this exactly):**
```
1. metadata export (title + description written for CTR)
2. JSON-LD schema script in <head>
3. H1 (primary keyword)
4. Affiliate disclosure notice (component or inline)
5. Intro paragraph (why this category matters, 2-3 sentences)
6. Scoring criteria section (ScoreBreakdown or criteria table)
7. ComparisonTable with all products
8. Individual product sections (H2 per product)
   - What it is (1 sentence)
   - Who it's for (1 sentence)  
   - What it gets wrong (1 sentence — this is what builds trust)
   - AffiliateCTA button
9. Verdict section: Winner / Runner-up / Budget pick
10. FAQ (3-5 questions with answers)
11. Internal links to related review pages
```

---

### Review pages agent (Session 5)
**Owns:** All five review/comparison pages in `app/reviews/`
**Input:** All components, all data files
**Output:** Five complete editorial pages
**Done when:** All five pages render correctly with 600+ words each, correct metadata, working CTAs

**Content rules for review pages:**
- NordVPN: mention the 2018 server breach and how they handled it. This builds credibility.
- Bitwarden: mention the independent security audit (Cure53, 2022). Mention self-hosting option.
- NordVPN vs ExpressVPN: ExpressVPN's parent company (Kape Technologies, formerly Crossrider — adware company) is relevant context for privacy-conscious readers.
- Bitwarden vs 1Password: Be honest that 1Password's UX is better. Bitwarden wins on price and open source.
- Best VPN Lithuania: Lithuanian data retention law is the Law on Electronic Communications. VPNs are legal. Lithuania is not in 5/9/14 Eyes. This is a positive signal for privacy.

---

### Stats and legal agent (Session 6)
**Owns:** `/stats`, `/about`, `/privacy`, `/disclosure`, sitemap, schema markup, real affiliate URLs
**Input:** Vercel Analytics API docs, all existing pages
**Output:** All legal pages, stats page, complete schema markup on all category pages, real affiliate URLs throughout

**Stats page implementation:**
```typescript
// Vercel Analytics API — use the Data API
// https://vercel.com/docs/analytics/api
// GET /v1/web/events with Authorization: Bearer {VERCEL_TOKEN}
// If the API returns no data (site just launched), render the page structure with zeros
// Never error — always render something
```

**Affiliate URL replacement:**
Replace every `'PLACEHOLDER'` in `lib/affiliate.ts` with real affiliate URLs from:
- NordVPN: partners.nordvpn.com (instant approval)
- Surfshark: surfshark.com/affiliates (instant approval)
- ExpressVPN: expressvpn.com (apply via Commission Junction)
- 1Password: 1password.com/partners
- Malwarebytes: impact.com (search Malwarebytes)
- Bitdefender: bitdefender.com/affiliates

Note in affiliate.ts which programmes have been applied for vs approved vs live.

---

### QA and launch agent (Session 7)
**Owns:** Full quality audit, CI setup, README, launch readiness
**Input:** Complete codebase
**Output:** Production-ready site, clean CI, complete README

**QA checklist — check every item:**
- [ ] `npm run build` passes with zero errors
- [ ] `npx tsc --noEmit` passes with zero errors  
- [ ] `npm run lint` passes with zero warnings
- [ ] Quiz works end to end on 375px mobile viewport
- [ ] All affiliate links open in new tab and have correct UTM params
- [ ] Vercel Analytics events fire on affiliate clicks (check browser network tab)
- [ ] `/sitemap.xml` renders correctly with all pages
- [ ] `/robots.txt` is present
- [ ] Every page has a unique title and description
- [ ] No page has the default Next.js title
- [ ] Affiliate disclosure visible on every category page
- [ ] Footer links to /about, /privacy, /disclosure all work
- [ ] No console errors in browser on any page
- [ ] All images have alt attributes
- [ ] Internal links: every page links to at least two other pages

**README.md must include:**
- One paragraph describing what BreachWatch is
- Setup instructions (clone, install, add GROQ_API_KEY, run dev)
- Affiliate programme status (which are applied for, which are live)
- How the scoring system works
- Link to live site

**CI setup:**
Copy `ci.yml` from the docs folder to `.github/workflows/ci.yml`
Add `GROQ_API_KEY` as a repository secret in GitHub settings

---

## What never changes between agents
- TypeScript strict mode
- No `any` types
- Affiliate links only through `lib/affiliate.ts`
- Analytics events on every affiliate click
- Quiz answers never stored
- `npm run build` passes at the end of every session
