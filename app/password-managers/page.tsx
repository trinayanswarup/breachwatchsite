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
import productsRaw from '@/data/password-managers.json';
import criteriaRaw from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: 'Best Password Manager 2025 — Compared on Security Architecture',
  description:
    'We scored 5 password managers on zero-knowledge design, open source code, price, and breach history. Bitwarden leads at 9.4/10 — see the full methodology.',
};

const products = productsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria)['password-manager'];

function weightedScore(p: Product): number {
  return criteria.reduce((sum, c) => sum + ((p.scores[c.id] ?? 0) * c.weight) / 100, 0);
}

const ranked = [...products].sort((a, b) => weightedScore(b) - weightedScore(a));
const topPick = ranked[0];

export default function PasswordManagersPage() {
  const topPickHref = buildAffiliateUrl(
    affiliateLinks[topPick.id] ?? topPick.affiliateUrl,
    topPick.id,
    'password-manager',
    'verdict'
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">BreachWatch</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gray-900">Password Managers</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              The Best Password Managers in 2025 — Ranked by Security Architecture
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Password reuse is behind the majority of account takeovers. A password
              manager fixes this by generating a unique, complex password for every
              site — you only need to remember one master password. We ranked five
              products on what matters most: zero-knowledge architecture, open source
              code, price, and breach history.{' '}
              <strong className="text-gray-900">Bitwarden</strong> tops our list at{' '}
              <strong>9.4/10</strong> — open source, independently audited, and free.
            </p>
            <p className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> Some links below are affiliate links. We earn a
              commission if you purchase through them. This does not affect our scores —
              Bitwarden tops the list because of its score, not because of affiliate
              arrangements.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">
                Full disclosure policy.
              </Link>
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Password manager comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-gray-500">
            Open source carries 20% of the total score. This is non-negotiable for
            products that hold the keys to every account you own.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="password-manager" />
        </section>

        {/* Criteria explanation */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              How we score password managers
            </h2>
            <p className="mb-8 text-gray-500">
              Security architecture has the highest weight because a password manager
              with a flawed vault design is worse than no manager at all.
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
            Detailed breakdown — each password manager reviewed
          </h2>
          <p className="mb-8 text-gray-500">
            Cards are sorted by overall score. Note that proprietary products score
            zero on open source, which has a significant effect on rankings.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                category="password-managers"
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
              <strong className="text-gray-900">Bitwarden</strong> wins decisively at{' '}
              <strong>9.4/10</strong>. It is fully open source — Cure53 completed an
              independent audit in 2022 — its free tier includes unlimited vault items,
              and a self-hosting option is available for users who want complete data
              control. The nearest competitor, 1Password, scores 7.0 and costs more,
              though its Secret Key architecture is arguably stronger and its UX is
              best-in-class for teams and families.
            </p>
            <div className="mb-6">
              <ScoreBreakdown product={topPick} criteria={criteria} />
            </div>
            <AffiliateCTA
              product={topPick.id}
              href={topPickHref}
              label={`Try ${topPick.name} free`}
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
              href="/reviews/bitwarden"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Bitwarden full review →
            </Link>
            <Link
              href="/reviews/bitwarden-vs-1password"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Bitwarden vs 1Password →
            </Link>
            <Link
              href="/2fa-apps"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best 2FA apps →
            </Link>
            <Link
              href="/vpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best VPNs →
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Not sure where to start?{' '}
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
