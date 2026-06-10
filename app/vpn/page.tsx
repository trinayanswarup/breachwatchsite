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
import vpnsRaw from '@/data/vpns.json';
import criteriaRaw from '@/data/scoring-criteria.json';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Best VPN 2025 — Compared on Privacy, Jurisdiction & Speed',
  description:
    'We scored 5 VPNs on logging policy, jurisdiction, price, and speed. No paid placements. ProtonVPN tops the list — see why, and which is right for your threat model.',
};

const products = vpnsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria).vpn;

function weightedScore(p: Product): number {
  return criteria.reduce((sum, c) => sum + ((p.scores[c.id] ?? 0) * c.weight) / 100, 0);
}

const ranked = [...products].sort((a, b) => weightedScore(b) - weightedScore(a));
const topPick = ranked[0];

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best VPNs 2025 — Ranked on Privacy and Speed',
  url: `${SITE}/vpn`,
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

export default function VPNPage() {
  const topPickHref = buildAffiliateUrl(
    affiliateLinks[topPick.id] ?? topPick.affiliateUrl,
    topPick.id,
    'vpn',
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
              <span className="text-gray-900">VPNs</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              The Best VPNs in 2025, Ranked — Privacy-First Analysis
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We scored five VPNs across six criteria, with logging policy and jurisdiction
              carrying the most weight. Speed matters — but a fast VPN that keeps logs
              is worse than useless. Our top pick is{' '}
              <strong className="text-gray-900">ProtonVPN</strong>: Swiss jurisdiction,
              fully open source, audited no-logs policy, and a free tier that doesn&apos;t
              compromise privacy.
            </p>
            <p className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> Some links below are affiliate links. We earn a
              commission if you purchase through them. This does not affect our scores —
              we recommend Mullvad despite having no affiliate relationship with them.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">
                Full disclosure policy.
              </Link>
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            VPN comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-gray-500">
            Scores are calculated from the criteria below. Scroll right on mobile.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="vpn" />
        </section>

        {/* Criteria explanation */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              How we score VPNs
            </h2>
            <p className="mb-8 text-gray-500">
              Every score is derived from the criteria below. Weights reflect what
              actually protects you — not what makes for a flashy spec sheet.
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
            Detailed breakdown — each VPN reviewed
          </h2>
          <p className="mb-8 text-gray-500">
            Cards are sorted by overall score. Each write-up covers the three
            things that most affect our score for that product.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((p) => (
              <ProductCard key={p.id} product={p} category="vpn" featured={p.id === topPick.id} />
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
              <strong className="text-gray-900">ProtonVPN</strong> scores highest overall
              at <strong>8.25/10</strong>. Its Swiss jurisdiction sits outside all
              intelligence-sharing alliances, its clients are fully open source and
              independently audited, and it is the only trustworthy free VPN we are
              aware of. If you need maximum anonymity and don&apos;t care about streaming,{' '}
              <strong className="text-gray-900">Mullvad</strong> scores a perfect 10
              on logging policy and accepts cash payments with no account required.
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
            Related comparisons
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/reviews/nordvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              NordVPN full review →
            </Link>
            <Link
              href="/reviews/nordvpn-vs-expressvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              NordVPN vs ExpressVPN →
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
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Not sure which tool you need first?{' '}
            <Link href="/quiz" className="text-blue-600 underline hover:text-blue-800">
              Take our 30-second security quiz →
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
