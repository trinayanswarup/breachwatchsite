# AGENTS.md — CipherCheck

## Read first

Read CLAUDE.md fully before writing any code.

## Rules for every change

- No any types. Use unknown + type guard or a proper discriminated union.
- npm run build must pass clean after every session.
- Server secrets never in client components.
- All affiliate URLs go through src/lib/affiliate.ts only.
- HIBP k-anonymity must be preserved — only the first 5 chars of the SHA-1 hash leave the server.

## What not to touch

- src/lib/scoring.ts — calculateWeightedScore() is tested, do not rewrite
- src/data/\*.json — product data and scores, do not modify values
- app/api/breach-checker/route.ts — k-anonymity implementation, do not simplify

## Testing

npm test
npm run build

All tests are offline — no real API calls to Groq, HIBP, HN, or Reddit. Mock everything external.

---
