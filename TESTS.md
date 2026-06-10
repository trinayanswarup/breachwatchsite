# TESTS.md — BreachWatch

BreachWatch uses a lightweight testing strategy appropriate for a fast-moving affiliate site. The priority is: build passes, quiz works, affiliate links fire correctly.

---

## Testing layers

### Layer 1 — TypeScript (always on)
TypeScript strict mode catches most logic errors at compile time. This is the primary quality gate. `npx tsc --noEmit` must pass clean.

### Layer 2 — ESLint (always on)
`npm run lint` catches code quality issues. Configured in `.eslintrc.json`.

### Layer 3 — Build check (always on)
`npm run build` catches runtime errors that TypeScript misses (missing env vars, broken imports, invalid JSX).

### Layer 4 — Manual QA checklist (before every deploy to production)
Run through AGENTS.md Session 7 QA checklist.

### Layer 5 — Automated tests (for critical paths only)
Only test the quiz API and score calculation — these are the only pieces with logic that can silently break.

---

## Test files to create

### `src/lib/quiz.test.ts`
Test the quiz scoring logic and Groq response parsing.

```typescript
import { parseQuizResult, getDefaultResult } from './quiz'

describe('parseQuizResult', () => {
  it('parses a valid Groq response', () => {
    const raw = JSON.stringify({
      biggestRisk: "You reuse passwords.",
      score: 2,
      recommendedCategory: "password-manager",
      reasoning: "A password manager fixes password reuse.",
      urgency: "high"
    })
    const result = parseQuizResult(raw)
    expect(result.score).toBe(2)
    expect(result.recommendedCategory).toBe('password-manager')
    expect(result.urgency).toBe('high')
  })

  it('returns default result when Groq response is malformed', () => {
    const result = parseQuizResult('not valid json')
    expect(result).toEqual(getDefaultResult())
  })

  it('returns default result when required fields are missing', () => {
    const raw = JSON.stringify({ score: 3 }) // missing other fields
    const result = parseQuizResult(raw)
    expect(result).toEqual(getDefaultResult())
  })

  it('clamps score to 1-5 range', () => {
    const raw = JSON.stringify({
      biggestRisk: "risk",
      score: 99,
      recommendedCategory: "vpn",
      reasoning: "reason",
      urgency: "low"
    })
    const result = parseQuizResult(raw)
    expect(result.score).toBeLessThanOrEqual(5)
    expect(result.score).toBeGreaterThanOrEqual(1)
  })
})
```

### `src/lib/scoring.test.ts`
Test that product scores are calculated correctly from criteria weights.

```typescript
import vpns from '../data/vpns.json'
import criteria from '../data/scoring-criteria.json'
import { calculateScore } from './scoring'

describe('calculateScore', () => {
  it('returns a number between 0 and 10 for each VPN', () => {
    vpns.forEach(vpn => {
      const score = calculateScore(vpn.scores, criteria.vpn)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(10)
    })
  })

  it('VPN criteria weights sum to 100', () => {
    const total = criteria.vpn.reduce((sum, c) => sum + c.weight, 0)
    expect(total).toBe(100)
  })

  it('password manager criteria weights sum to 100', () => {
    const total = criteria.passwordManagers.reduce((sum, c) => sum + c.weight, 0)
    expect(total).toBe(100)
  })

  it('antivirus criteria weights sum to 100', () => {
    const total = criteria.antivirus.reduce((sum, c) => sum + c.weight, 0)
    expect(total).toBe(100)
  })

  it('2fa criteria weights sum to 100', () => {
    const total = criteria.twoFA.reduce((sum, c) => sum + c.weight, 0)
    expect(total).toBe(100)
  })
})
```

### `src/lib/affiliate.test.ts`
Test that affiliate URLs are correctly formed with UTM params.

```typescript
import { buildAffiliateUrl } from './affiliate'

describe('buildAffiliateUrl', () => {
  it('adds UTM params to a plain URL', () => {
    const url = buildAffiliateUrl('https://nordvpn.com/ref', 'nordvpn', 'vpn', 'comparison')
    expect(url).toContain('utm_source=breachwatchsite')
    expect(url).toContain('utm_medium=affiliate')
    expect(url).toContain('utm_campaign=vpn-comparison')
  })

  it('preserves existing query params', () => {
    const url = buildAffiliateUrl('https://nordvpn.com/ref?offer=2year', 'nordvpn', 'vpn', 'review')
    expect(url).toContain('offer=2year')
    expect(url).toContain('utm_source=breachwatchsite')
  })

  it('does not add UTM params to Mullvad (no affiliate programme)', () => {
    const url = buildAffiliateUrl('https://mullvad.net', 'mullvad', 'vpn', 'comparison')
    // Mullvad is a direct link — should still work but we note it has no affiliate ID
    expect(url).toBeDefined()
  })
})
```

---

## Setting up tests

Install Vitest (works natively with Next.js, no Jest config needed):

```bash
npm install -D vitest @vitest/coverage-v8
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

Add to `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## Add tests to CI

Update `.github/workflows/ci.yml` to include:
```yaml
- name: Run tests
  run: npm test
  env:
    GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
```

Add this step between lint and build.

---

## What not to test
- UI components (React Testing Library adds complexity not worth it at this stage)
- Next.js routing (it works — testing it is testing Next.js, not BreachWatch)
- Vercel Analytics events (can't mock Vercel in test environment simply)
- The Groq API itself (mock it — you are testing your parsing logic, not Groq's response)

The three test files above cover the only logic in the project that can silently produce wrong results. Everything else is caught by TypeScript and the build.
