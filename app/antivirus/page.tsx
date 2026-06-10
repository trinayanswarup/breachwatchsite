import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import ProductCard from '@/components/ProductCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import type { Product, ScoringCriteria } from '@/lib/types';
import productsRaw from '@/data/antivirus.json';
import criteriaRaw from '@/data/scoring-criteria.json';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Best Antivirus Software 2025 — Ranked on AV-TEST Detection Data',
  description:
    'We scored 5 antivirus products using AV-TEST detection rates, performance impact, privacy, and price. ESET NOD32 leads — but Windows Defender may be enough. See the data.',
};

const products = productsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria).antivirus;

function weightedScore(p: Product): number {
  return criteria.reduce((sum, c) => sum + ((p.scores[c.id] ?? 0) * c.weight) / 100, 0);
}

const ranked = [...products].sort((a, b) => weightedScore(b) - weightedScore(a));
const topPick = ranked[0];

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Antivirus Software 2025 — Ranked on AV-TEST Detection Data',
  url: `${SITE}/antivirus`,
  numberOfItems: ranked.length,
  itemListElement: ranked.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    item: {
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'SecurityApplication',
      url: p.website,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: weightedScore(p).toFixed(2),
        bestRating: '10',
        worstRating: '0',
        ratingCount: '1',
      },
    },
  })),
};

export default function AntivirusPage() {
  const topPickHref = buildAffiliateUrl(
    affiliateLinks[topPick.id] ?? topPick.affiliateUrl,
    topPick.id,
    'antivirus',
    'verdict'
  );

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={pageSchema} />
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">BreachWatch</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gray-900">Antivirus</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              The Best Antivirus Software in 2025 — Ranked on AV-TEST Detection Data
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              All detection scores in our comparison come from AV-TEST Institute&apos;s
              published consumer test results — not from vendor marketing claims.
              Detection rate carries the most weight (35%), followed by performance
              impact (25%). Our top pick is{' '}
              <strong className="text-gray-900">ESET NOD32</strong>, which achieves
              near-perfect detection with the lowest system impact in the industry.
              If you&apos;re on Windows and practice safe browsing, Windows Defender alone
              may be adequate — we&apos;ve included it in the comparison.
            </p>
            <p className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> Some links below are affiliate links. We earn
              a commission if you purchase through them. Detection scores are sourced
              from av-test.org and are not influenced by vendor relationships.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">
                Full disclosure policy.
              </Link>
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Antivirus comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-gray-500">
            Detection rates are sourced from AV-TEST Institute 2024 consumer tests.
            Performance impact is inverted: a higher score means less slowdown.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="antivirus" />
        </section>

        {/* Criteria explanation */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              How we score antivirus software
            </h2>
            <p className="mb-8 text-gray-500">
              We use published, third-party test data wherever possible. Vendor claims
              about detection rates are not used as scoring inputs.
            </p>
            <div className="space-y-4">
              {criteria.map((c) => (
                <div key={c.id} className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                      {c.weight}% weight
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Individual product write-ups */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Detailed breakdown — each antivirus reviewed
          </h2>
          <p className="mb-8 text-gray-500">
            Windows Defender is included as the baseline. It&apos;s free and surprisingly
            capable — the question is whether the gap justifies a paid subscription.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                category="antivirus"
                featured={p.id === topPick.id}
              />
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Our recommendation
            </h2>
            <p className="mb-6 text-gray-600">
              <strong className="text-gray-900">ESET NOD32</strong> scores highest
              overall at <strong>8.55/10</strong>. It achieves near-perfect AV-TEST
              detection scores while consistently topping the performance benchmarks —
              meaning it catches threats without slowing your machine down. Slovak
              jurisdiction and a minimal-telemetry approach give it a reasonable
              privacy score too. If you need the absolute best detection rate and
              don&apos;t mind slightly more resource usage,{' '}
              <strong className="text-gray-900">Bitdefender</strong> scores 10/10
              on detection and comes close behind at 8.35/10 overall.
            </p>
            <div className="mb-6">
              <ScoreBreakdown product={topPick} criteria={criteria} />
            </div>
            <AffiliateCTA
              product={topPick.id}
              href={topPickHref}
              label={`Try ${topPick.name}`}
              variant="primary"
            />
          </div>
        </section>

        {/* Internal links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Related categories
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/vpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best VPNs →
            </Link>
            <Link
              href="/password-managers"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best password managers →
            </Link>
            <Link
              href="/2fa-apps"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best 2FA apps →
            </Link>
            <Link
              href="/quiz"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Take the security quiz →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
