# PRD — CipherCheck
## Cybersecurity Tools Comparison & Affiliate Platform

---

## Problem
Most people have no idea which cybersecurity tools they need. The existing comparison sites are either full of technical jargon or transparently biased toward whichever product pays the highest commission. There is no honest, jargon-free, transparent-scoring comparison site in the cybersecurity tools niche that also personalises its recommendations.

## Solution
CipherCheck is a clean, honest comparison site in the cybersecurity tools niche — VPNs, password managers, antivirus, and 2FA apps — that makes money through affiliate commissions. The primary entry point is a five-question AI quiz that identifies the visitor's single biggest security risk and routes them to the most relevant product category. Every comparison uses transparent, documented scoring criteria. The business model is explained openly on the site.

## Target user
Someone who has just heard about a data breach, or is setting up a new laptop, or has been told by a more tech-savvy friend that they need a VPN. They are not technical. They do not know the difference between AES-256 and ChaCha20. They want a trustworthy answer to "what should I actually use?"

## Business model
Revenue through affiliate commissions:
- NordVPN Partners: ~40-100% of first payment (~€60-80 per 2-year plan referral)
- Surfshark Affiliates: ~40% of first payment
- 1Password Affiliate Program: commission on referred subscriptions
- Bitwarden referral program
- Malwarebytes affiliate via Impact.com

Primary acquisition: organic search (SEO)
Secondary acquisition: Reddit communities (r/privacy, r/cybersecurity, r/digitalnomad)

## Success metrics
- Visitors per week (tracked via Vercel Analytics)
- Quiz completion rate
- Affiliate link click-through rate per category page
- Google Search Console: impressions and clicks for target keywords
- Organic ranking position for primary keywords

---

## Pages

### Homepage `/`
**Purpose:** Orient the visitor and route them to the quiz or a category page.

**Content:**
- Headline: "Find the right cybersecurity tool — without the jargon or the bias."
- Subheadline: "We score every tool on the criteria that actually matter. See our methodology."
- Quiz CTA: large, above the fold. "Find out your biggest security risk →" links to `/quiz`
- Four category cards: VPNs, Password Managers, Antivirus, 2FA Apps
- Featured pick this month: one highlighted product with a score badge and CTA
- Three latest comparison articles
- Brief methodology explanation (2-3 sentences with link to scoring criteria)
- Affiliate disclosure notice in footer

**SEO:**
- Title: `CipherCheck — Honest Cybersecurity Tool Comparisons`
- Description: `Find the right VPN, password manager, or antivirus without the jargon. Transparent scoring, real comparisons, no hidden bias. Start with our free 30-second security quiz.`

---

### Quiz `/quiz`
**Purpose:** Personalise the recommendation and route the visitor to the most relevant category page.

**Flow:**
1. Question 1: "Do you reuse the same password on multiple sites?" — Yes / No / Sometimes
2. Question 2: "Do you currently use a password manager?" — Yes / No / I've heard of them
3. Question 3: "Does your main email account have two-factor authentication?" — Yes / No / I don't know
4. Question 4: "Do you connect to public WiFi without a VPN?" — Yes, often / Sometimes / No, I use a VPN
5. Question 5: "Have you checked whether your email has appeared in a data breach?" — Yes / No

**UX rules:**
- One question per screen, not all five at once
- Large tap targets — works perfectly on mobile
- Progress indicator: "Question 2 of 5"
- Loading state after question 5: "Analysing your security profile..."
- No email capture before showing the result

**API route `/quiz/api`:**
- Receives the five answers as JSON
- Makes one Groq API call using llama-3.3-70b-versatile
- Returns: `{ biggestRisk: string, score: number (1-5), recommendedCategory: string, reasoning: string, urgency: "high"|"medium"|"low" }`
- If Groq fails for any reason, returns a default response — never throws

**Result screen:**
- Your biggest risk: bold, one sentence
- Score badge: 1-5 with colour coding (1-2 red, 3 amber, 4-5 green)
- Recommended category: with icon and name
- Reasoning: one sentence
- CTA button: "See the best {category} →" links to relevant category page
- Secondary link: "See all categories" links to homepage

**SEO:**
- Title: `Free Security Risk Quiz — Find Your Biggest Cybersecurity Gap | CipherCheck`
- Description: `Answer 5 questions in 30 seconds. Our AI identifies your single biggest security risk and tells you exactly which tool would protect you most. No email required.`

---

### VPN category page `/vpn`
**Purpose:** Convert visitors searching "best VPN 2025" into affiliate clicks.

**Content structure:**
1. H1: "Best VPNs of 2025 — Tested and Ranked"
2. Intro paragraph: why someone needs a VPN, what to look for (2-3 sentences)
3. Affiliate disclosure notice
4. Scoring criteria explanation with weights (table or visual)
5. ComparisonTable component with all five VPNs
6. Individual write-ups per product (H2 per product, 150-200 words each)
   - What it is
   - Who it's for
   - What it gets wrong
   - AffiliateCTA button
7. Verdict section: Winner / Runner-up / Budget pick
8. FAQ section: 3-5 questions with answers (good for featured snippets)
9. Internal links to review pages and comparison pages

**Scoring criteria for VPNs (weights must add to 100):**
- Logging policy: 30% (does the privacy policy actually guarantee no logs?)
- Jurisdiction: 20% (outside 14 Eyes? Warrant canary present?)
- Price: 20% (cost per month on longest plan)
- Speed: 15% (based on independent speed tests — cite source)
- Device limit: 10% (simultaneous connections)
- Streaming support: 5% (works with Netflix, BBC iPlayer, etc.)

**Products to include:** NordVPN, ExpressVPN, Surfshark, Mullvad, ProtonVPN

**SEO:**
- Title: `Best VPNs of 2025 — Honest Comparison & Rankings | CipherCheck`
- Description: `We compared 5 top VPNs on logging policy, jurisdiction, price, and speed. Our transparent scoring shows exactly why we ranked them this way. Updated for 2025.`
- Internal links to: `/reviews/nordvpn`, `/reviews/nordvpn-vs-expressvpn`, `/reviews/best-vpn-lithuania`

---

### Password managers category page `/password-managers`
**Purpose:** Convert visitors searching "best password manager 2025."

**Scoring criteria:**
- Security architecture: 30% (zero-knowledge, end-to-end encryption)
- Open source: 20% (auditable code)
- Price: 20% (free tier availability, premium cost)
- Platform coverage: 15% (Windows, Mac, iOS, Android, browser extensions)
- Breach history: 10% (has the company been breached? how did they respond?)
- 2FA support: 5% (supports hardware keys, TOTP)

**Products:** Bitwarden, 1Password, Dashlane, NordPass, Keeper

**SEO:**
- Title: `Best Password Managers of 2025 — Ranked by Security | CipherCheck`
- Description: `Bitwarden, 1Password, Dashlane compared honestly. We score on zero-knowledge architecture, price, and real security track record — not just features lists.`

---

### Antivirus category page `/antivirus`
**Scoring criteria:**
- Detection rate: 35% (AV-TEST scores — always cite the source)
- Performance impact: 25% (system slowdown from independent tests)
- Price: 20%
- Privacy: 15% (does the antivirus itself send data home?)
- False positive rate: 5%

**Products:** Malwarebytes, Bitdefender, Norton, ESET, Windows Defender (included as baseline)

**SEO:**
- Title: `Best Antivirus Software 2025 — What Actually Works | CipherCheck`
- Description: `We compared antivirus software using AV-TEST detection scores, not marketing claims. Includes system performance impact and privacy analysis for each product.`

---

### 2FA apps category page `/2fa-apps`
**Scoring criteria:**
- Backup and recovery: 35% (what happens if you lose your phone?)
- Open source: 25%
- Cloud sync: 20% (encrypted sync vs local only — explain tradeoff)
- Platform: 15%
- Ease of use: 5%

**Products:** Aegis (Android), Raivo (iOS), Authy, Google Authenticator, Microsoft Authenticator

**SEO:**
- Title: `Best 2FA Apps 2025 — Securing Your Accounts | CipherCheck`
- Description: `Two-factor authentication app comparison — Aegis, Authy, Raivo, Google Authenticator. We prioritise backup options and open source code over brand recognition.`

---

### Review pages

#### `/reviews/nordvpn`
- H1: "NordVPN Review 2025 — Is It Still Worth It?"
- 600+ words
- Cover: pricing, logging policy (read the actual policy), jurisdiction (Panama), independent audit results, what it's bad at (price on monthly plan, past breach in 2018 and how they handled it), verdict
- ScoreBreakdown component showing NordVPN's score across all criteria
- AffiliateCTA

#### `/reviews/bitwarden`
- H1: "Bitwarden Review 2025 — The Best Free Password Manager?"
- Emphasise: open source, independently audited, free tier is genuinely complete, self-hosting option
- Cover the 2023 minor security issue and how it was handled

#### `/reviews/nordvpn-vs-expressvpn`
- H1: "NordVPN vs ExpressVPN 2025 — Which Is Actually Better?"
- ComparisonTable with just these two products
- Side-by-side on every criterion
- Clear verdict with reasoning
- Who should choose which

#### `/reviews/bitwarden-vs-1password`
- H1: "Bitwarden vs 1Password 2025 — Free vs Premium, Which Wins?"
- The honest answer: Bitwarden for most people, 1Password for teams and families

#### `/reviews/best-vpn-lithuania`
- H1: "Best VPN for Lithuania 2025 — What You Need to Know"
- Cover: Lithuanian data retention laws, whether VPNs are legal (they are), which VPNs work best from Lithuania, speed from Lithuanian servers
- This page targets low-competition local keyword with real search intent

---

### Stats page `/stats`
**Purpose:** Demonstrate commercial transparency. Give you a real number to quote in interviews.

**Content:**
- Visitors this week
- Visitors last week
- Week-over-week growth percentage
- Top 5 pages by traffic
- Top 3 traffic sources
- Top 3 countries

**Implementation:** Vercel Analytics API. If API returns no data yet, show the structure with zeros — the page existing is still useful.

---

### Legal pages

#### `/about`
Who built this. Why. The methodology. Commitment to honest reviews. 300 words. Written in first person.

#### `/privacy`
Standard privacy policy covering: Vercel Analytics (anonymous, no cookies), no email collection, affiliate tracking disclosure.

#### `/disclosure`
Affiliate disclosure. Clear, honest, prominently linked from every category page. Explains that commissions are earned on referred purchases, that this does not affect scores (scores are calculated from the JSON data using documented criteria), and that the methodology is fully documented.

---

## Components

### `ComparisonTable.tsx`
Props:
```typescript
interface ComparisonTableProps {
  products: Product[]
  criteria: Criterion[]
  category: string
}
```
Renders a scored comparison table. Columns are products, rows are criteria. Each cell shows the raw score for that criterion. Final row shows the weighted total score. Highest score column is highlighted. Mobile: horizontally scrollable table, sticky first column (criterion names).

### `QuizWidget.tsx`
Props:
```typescript
interface QuizWidgetProps {
  onComplete: (answers: QuizAnswers) => void
}
```
Manages question state internally. One question visible at a time. Progress bar. Smooth transition between questions. Calls `onComplete` with all answers when question 5 is answered.

### `QuizResult.tsx`
Props:
```typescript
interface QuizResultProps {
  result: QuizResult
}
```
Renders the personalised recommendation. Score badge with colour. Risk statement. Category recommendation with CTA button.

### `AffiliateCTA.tsx`
Props:
```typescript
interface AffiliateCTAProps {
  product: string
  href: string
  label: string
  variant?: 'primary' | 'secondary'
}
```
Adds UTM params to href. Fires Vercel Analytics track event on click. Renders as a styled button. Includes a small "affiliate link" disclosure tooltip on hover.

### `ProductCard.tsx`
Props:
```typescript
interface ProductCardProps {
  product: Product
  category: string
  featured?: boolean
}
```
Name, score badge, one-line verdict, category tag, CTA button.

### `ScoreBreakdown.tsx`
Props:
```typescript
interface ScoreBreakdownProps {
  product: Product
  criteria: Criterion[]
}
```
Visual breakdown of how the total score was calculated. Each criterion shown as a row with: name, weight, raw score, weighted contribution.

### `Nav.tsx`
Logo. Links to VPN, Password Managers, Antivirus, 2FA. Quiz CTA button (highlighted). Mobile: hamburger menu. Sticky.

### `Footer.tsx`
Links: About, Privacy Policy, Affiliate Disclosure. Brief affiliate disclosure statement. Copyright.

---

## Data schemas

### Product (all categories share this base)
```typescript
interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  website: string
  affiliateUrl: string        // set in affiliate.ts, not here
  scores: Record<string, number>  // criterionId -> raw score 0-10
  pricing: {
    monthly: number
    annual: number
    currency: string
  }
  highlights: string[]        // 3 bullet points for ProductCard
  verdict: string             // one sentence
  bestFor: string             // "best for privacy-focused users"
}
```

### Criterion
```typescript
interface Criterion {
  id: string
  name: string
  weight: number              // 0-100, all weights in a category sum to 100
  description: string         // shown in scoring methodology section
  higherIsBetter: boolean
}
```

### QuizAnswers
```typescript
interface QuizAnswers {
  reusePasswords: 'yes' | 'no' | 'sometimes'
  usesPasswordManager: 'yes' | 'no' | 'heard_of'
  hasTwoFA: 'yes' | 'no' | 'unknown'
  usesVPNOnPublicWifi: 'yes' | 'sometimes' | 'no'
  checkedBreaches: 'yes' | 'no'
}
```

### QuizResult
```typescript
interface QuizResult {
  biggestRisk: string
  score: number               // 1-5
  recommendedCategory: 'vpn' | 'password-manager' | 'antivirus' | '2fa-apps'
  reasoning: string
  urgency: 'high' | 'medium' | 'low'
}
```

---

## Affiliate link management (`lib/affiliate.ts`)
All affiliate URLs live here and nowhere else. Each URL gets UTM params appended:
- `utm_source=ciphercheck`
- `utm_medium=affiliate`
- `utm_campaign={category}-{pagetype}` e.g. `vpn-comparison`, `vpn-review`

```typescript
export const affiliateLinks: Record<string, string> = {
  nordvpn: 'https://go.nordvpn.net/YOUR_ID',
  expressvpn: 'https://www.expressvpn.com/YOUR_ID',
  surfshark: 'https://get.surfshark.net/YOUR_ID',
  mullvad: 'https://mullvad.net',       // no affiliate programme — link directly, builds trust
  protonvpn: 'https://protonvpn.com/YOUR_ID',
  bitwarden: 'https://bitwarden.com',   // no standard affiliate — use referral if available
  onepassword: 'https://1password.com/YOUR_ID',
  dashlane: 'https://www.dashlane.com/YOUR_ID',
  malwarebytes: 'https://www.malwarebytes.com/YOUR_ID',
  bitdefender: 'https://www.bitdefender.com/YOUR_ID',
}
```

Note: Mullvad has no affiliate programme. Link to them anyway. This builds editorial credibility — you're not just recommending products that pay you.

---

## SEO implementation

### next-sitemap config
```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://ciphercheck.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
}
```

### Schema markup
Add JSON-LD to category pages:
```typescript
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best VPNs 2025",
  "description": "Ranked and scored VPN comparison",
  "itemListElement": products.map((p, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": p.name,
    "url": `https://ciphercheck.com/reviews/${p.slug}`
  }))
}
```

Add to page `<head>` via:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

---

## Analytics events to track
Every event fired via `track()` from `@vercel/analytics/react`:

| Event | When fired | Properties |
|-------|-----------|------------|
| `quiz_start` | User sees question 1 | — |
| `quiz_complete` | User sees result | `{ score, recommendedCategory, urgency }` |
| `affiliate_click` | AffiliateCTA clicked | `{ product, category, page }` |
| `category_view` | Category page loaded | `{ category }` |
| `comparison_view` | Review page loaded | `{ slug }` |

---

## Live Features

These features extend the core comparison site with live data and interactive tools.

---

### Breach Checker `/breach-checker`
**Purpose:** Let users check if a password has appeared in a known data breach, without ever sending the password to a server.

**Content:**
- H1: "Check If Your Password Has Been Exposed in a Data Breach"
- Password input form — no account required, password never stored or sent in plain text
- Results show: whether the password appears in any known breach, and how many times it has been seen
- If not found: green confirmation with a note that a strong unique password per site is still essential
- If found: red alert with specific next-step recommendations (switch to a password manager)
- Affiliate CTAs to Bitwarden appropriate to the result

**Implementation:**
- `BreachChecker.tsx` — client-side component; browser hashes the password with SHA-1 using Web Crypto API; only the first 5 characters of the hash are sent to the server; password never leaves the browser in plain text
- `BreachResult.tsx` — displays breach results or clean result; accepts count of matches
- `/api/breach-checker/route.ts` — server-side proxy to HIBP Passwords API (`api.pwnedpasswords.com/range/{first5chars}`); checks if full hash suffix appears in the response; password never logged or stored; no API key required

**Rules:**
- Passwords must never be logged or stored
- Password hash checking must use k-anonymity — only the first 5 characters of the SHA-1 hash are ever sent to the HIBP API
- Results cached per hash prefix, not per password

**SEO:**
- Title: `Has My Password Been Hacked? Check for Data Breaches | CipherCheck`
- Description: `Check if your password has appeared in a data breach. Uses Have I Been Pwned. Your password never leaves your browser — only an anonymous hash fragment is sent.`
- Internal links: password managers page, 2FA apps page

---

### Shareable Score Page `/score/[score]`
**Purpose:** Allow users to share their quiz score on social media, driving referral traffic back to the quiz. A score of 1 shared on Reddit is a better acquisition channel than a score of 5.

**Content:**
- Dynamic route `/score/1` through `/score/5`
- Large score badge matching quiz result colour coding (1–2 red, 3 amber, 4–5 green)
- Score headline: e.g. "My security score: 2/5 — I need to fix this" (copy varies by score)
- Social sharing: copy-to-clipboard link, Twitter/X share button with pre-filled text
- Primary CTA: "Take the quiz yourself →" links to `/quiz`
- Secondary CTA: links to the most relevant category for that score band

**Implementation:**
- `app/score/[score]/page.tsx` — statically generated for scores 1–5; `generateStaticParams` returns the five valid values; invalid score values return 404
- `ShareScore.tsx` — share button component with clipboard copy, native share API fallback, and Twitter/X intent URL
- Open Graph metadata generated per score for social preview cards

**SEO:**
- Each score page has a unique title and description generated from the score value
- `noindex` — these pages are for sharing, not for ranking; internal links via the quiz result screen

---

### Recent Breaches Feed `/api/recent-breaches`
**Purpose:** Show the most recent data breaches on the homepage and breach checker page, demonstrating that the threat is ongoing and building urgency.

**Content:**
- Returns a list of the most recent breaches from HIBP: breach name, domain, breach date, number of accounts, data classes exposed
- Displayed via `RecentBreaches.tsx` on the homepage and breach checker landing area
- Shows up to 5 most recent breaches

**Implementation:**
- `/api/recent-breaches/route.ts` — fetches from HIBP `/breaches` endpoint; filters to recent entries; uses Next.js `fetch` with `revalidate: 3600` (1-hour cache)
- `RecentBreaches.tsx` — renders breach cards with: name, date, affected account count, data types exposed; severity indicator based on account count

**Caching:**
- `revalidate: 3600` — breach data changes infrequently; 1-hour cache is appropriate
- On HIBP API failure: return cached data if available; return empty array with error flag if not

---

### Security News Feed `/api/security-news`
**Purpose:** Provide a live security news section on the homepage to increase return visits, demonstrate editorial awareness, and give users a reason to bookmark the site.

**Content:**
- Aggregates security news headlines from multiple RSS/API sources (minimum 3 sources)
- Displayed via `SecurityNews.tsx`: headline, source name, published date, link to original article
- Shows up to 9 items (3 per source)

**Implementation:**
- `/api/security-news/route.ts` — fetches from multiple sources in parallel using `Promise.allSettled`; merges and sorts by date; uses Next.js `fetch` with `revalidate: 900` (15-minute cache)
- `src/lib/news.ts` — news fetching and normalisation logic per source; each source has its own fetch function that returns a consistent `NewsItem` type
- `SecurityNews.tsx` — renders news cards; skeleton loading state; source badge per item

**Failure handling:**
- Each news source is fetched independently — `Promise.allSettled` not `Promise.all`
- If one source fails, its items are omitted and the others display normally
- If all sources fail, an empty array is returned — the component renders nothing rather than an error
- Minimum viable result: at least one source returning items; no hard failures propagated to the page

**Caching:**
- `revalidate: 900` — news freshness matters more than breach data; 15-minute cache
- Stale-while-revalidate behaviour provided by Next.js fetch caching

---

## Launch checklist
Before going live:
- [ ] All affiliate links replaced with real IDs from affiliate dashboards
- [ ] `GROQ_API_KEY` set in Vercel environment variables
- [ ] Google Search Console account created, domain verified
- [ ] Sitemap submitted to Search Console
- [ ] `/stats` page loads without errors
- [ ] Quiz works end to end on mobile
- [ ] All metadata exports present on every page
- [ ] Affiliate disclosure visible on every category page
- [ ] `npm run build` passes clean
- [ ] `npm run lint` passes clean
- [ ] No console errors in browser
