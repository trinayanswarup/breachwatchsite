# CipherCheck Case Study

## Problem

Most cybersecurity comparison sites blur three things together: editorial advice, affiliate incentives, and vague scoring. CipherCheck was built as a trust-first portfolio project that helps a non-expert choose a practical next security step without pretending every user needs the same product.

## Scoring Model

Each product category has its own weighted criteria in `src/data/scoring-criteria.json`. Products store raw criterion scores in JSON, and all displayed overall scores are calculated through `src/lib/scoring.ts`. That keeps category tables, review pages, homepage top picks, and schema markup aligned with the same model.

## Evidence Trail

The evidence ledger in `src/data/evidence.ts` maps categories and products to the sources used to justify scores: official product pages, security audits, privacy policies, pricing pages, AV-TEST results, incident reports, and open-source repositories. Category and review pages show an "Evidence checked" panel so a reviewer can trace claims back to source material.

## Non-Affiliate, Affiliate-Ready

The live site is intentionally non-affiliate. Product rankings are editorial/scoring driven, and live CTAs use direct official links or internal fallback pages. The architecture is still commercial-ready because all product CTA destinations flow through `src/lib/affiliate.ts`. Approved affiliate links could be enabled later without changing page components or scoring logic.

## Analytics Funnel

The private metrics surface is Vercel Analytics, not a public `/stats` page. The app tracks aggregate events for quiz start, quiz complete, recommended-category click, product CTA click, category view, and comparison view. Quiz answers are not stored.

## Failure Handling

The quiz falls back to a deterministic password-manager recommendation if Groq fails or returns malformed JSON. Breach and news feeds fail closed into useful fallback UI instead of breaking the page. The password checker uses the Have I Been Pwned k-anonymity model, so the raw password never leaves the browser.

## Verification

The project has unit tests for quiz parsing, breach logic, news logic, affiliate URL behavior, and data integrity. Integrity tests fail if criteria weights stop summing to 100, products miss required scores, homepage top picks drift from computed winners, evidence coverage is missing, stale score literals return, mojibake appears, or ProductCTA usage bypasses the centralized link helper.

## What I Would Improve Next

The next layer is UI/UX polish: tighter mobile layouts, screenshot-based smoke verification, clearer visual hierarchy on long review pages, and more source annotations near individual score rows. After that, real production analytics can guide which tools and comparison pages deserve deeper work.
