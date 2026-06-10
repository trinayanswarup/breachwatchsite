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
import productsRaw from '@/data/2fa-apps.json';
import criteriaRaw from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: 'Best 2FA App 2025 — Ranked by Backup, Recovery & Open Source',
  description:
    'We scored 5 two-factor authentication apps on backup recovery, open source code, and cross-platform sync. Raivo tops iOS; Aegis tops Android. See the full comparison.',
};

const products = productsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria)['2fa-apps'];

function weightedScore(p: Product): number {
  return criteria.reduce((sum, c) => sum + ((p.scores[c.id] ?? 0) * c.weight) / 100, 0);
}

const ranked = [...products].sort((a, b) => weightedScore(b) - weightedScore(a));
const topPick = ranked[0];

export default function TwoFAPage() {
  const topPickHref = buildAffiliateUrl(
    affiliateLinks[topPick.id] ?? topPick.affiliateUrl,
    topPick.id,
    '2fa-apps',
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
              <span className="text-gray-900">2FA Apps</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              The Best Two-Factor Authentication Apps in 2025 — Ranked by Backup &amp; Recovery
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Two-factor authentication is the single most effective step most people
              can take to protect their accounts. But a 2FA app with no backup is a
              liability — lose your phone and you lose access to every account it
              protects. Backup and recovery carries 35% of our total score. Our top
              picks are <strong className="text-gray-900">Raivo</strong> for iOS and{' '}
              <strong className="text-gray-900">Aegis</strong> for Android — both
              open source, both free.
            </p>
            <p className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> All 2FA apps in this comparison are free.
              Some links are affiliate-adjacent (linking to official sites). No
              commissions are earned on free products.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">
                Full disclosure policy.
              </Link>
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            2FA app comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-gray-500">
            Closed-source apps score 0 on open source, which carries 25% of the total
            weight. This reflects the trust you&apos;re placing in the app that guards
            every account you own.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="2fa-apps" />
        </section>

        {/* Criteria explanation */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              How we score 2FA apps
            </h2>
            <p className="mb-8 text-gray-500">
              Backup and recovery has the highest weight because the consequences of
              getting it wrong are severe — you can lose access to accounts
              permanently if you lose your phone with no recovery path.
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
            Detailed breakdown — each 2FA app reviewed
          </h2>
          <p className="mb-4 text-gray-500">
            Cards are sorted by overall score. Note that Aegis (Android-only) and Raivo
            (iOS-only) score low on Platform coverage — factor this into your choice
            based on your device.
          </p>
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <strong>Platform note:</strong> Raivo tops the rankings but is iOS-only.
            Android users should use Aegis. If you need desktop access or switch phones
            frequently, Authy is the most practical option.
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                category="2fa-apps"
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
              <strong className="text-gray-900">Raivo OTP</strong> scores highest
              overall at <strong>7.8/10</strong> for iOS users. It is open source,
              native to Apple design conventions, syncs via iCloud Keychain, and even
              has an Apple Watch app. If you&apos;re on Android,{' '}
              <strong className="text-gray-900">Aegis</strong> (7.5/10) is the
              equivalent pick — fully open source, encrypted local backups, and
              available on F-Droid. For users who need desktop access or frequently
              switch phones, <strong className="text-gray-900">Authy</strong> (7.45/10)
              is the pragmatic choice, though it is closed source and controlled by
              Twilio.
            </p>
            <div className="mb-6">
              <ScoreBreakdown product={topPick} criteria={criteria} />
            </div>
            <AffiliateCTA
              product={topPick.id}
              href={topPickHref}
              label={`Get ${topPick.name}`}
              variant="primary"
            />
          </div>
        </section>

        {/* Internal links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Build a complete security setup
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            2FA is one layer of a complete security posture. Pair it with a password
            manager and, if you&apos;re frequently on public WiFi, a VPN.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/password-managers"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best password managers →
            </Link>
            <Link
              href="/vpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best VPNs →
            </Link>
            <Link
              href="/antivirus"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best antivirus software →
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
