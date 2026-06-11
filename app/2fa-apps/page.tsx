import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import ProductCard from '@/components/ProductCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import AffiliateCTA from '@/components/AffiliateCTA';
import JsonLd from '@/components/JsonLd';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import type { Product, ScoringCriteria } from '@/lib/types';
import productsRaw from '@/data/2fa-apps.json';
import criteriaRaw from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: 'Best 2FA Apps of 2026 — Ranked on Backup, Recovery & Open Source',
  description:
    'We compared 5 two-factor authentication apps on what actually matters: what happens when you lose your phone. The results will surprise you.',
};

const products = productsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria)['2fa-apps'];

function weightedScore(p: Product): number {
  return criteria.reduce((sum, c) => sum + ((p.scores[c.id] ?? 0) * c.weight) / 100, 0);
}

const ranked = [...products].sort((a, b) => weightedScore(b) - weightedScore(a));
const topPick = ranked[0];

function productCta(p: Product): string {
  const raw = affiliateLinks[p.id] ?? p.affiliateUrl;
  return buildAffiliateUrl(
    raw === 'PLACEHOLDER' ? p.website : raw,
    p.id,
    '2fa-apps',
    'category'
  );
}

const enteAuthPick = ranked.find(p => p.id === 'ente_auth') ?? ranked[1];
const googleAuthPick = ranked.find(p => p.id === 'google_authenticator') ?? ranked[2];
const msAuthPick = ranked.find(p => p.id === 'microsoft_authenticator') ?? ranked[3];
const authyPick = ranked.find(p => p.id === 'authy') ?? ranked[4];

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best 2FA Apps 2026 — Ranked by Backup, Recovery and Open Source',
  url: `${SITE}/2fa-apps`,
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

export default function TwoFAPage() {
  const topPickHref = productCta(topPick);

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
              <span className="text-gray-900">2FA Apps</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Best 2FA Apps of 2026 — The One Question That Changes Everything
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Two-factor authentication is only as good as your recovery plan. Every 2FA
              app works fine — until you lose your phone, factory reset it, or switch to
              a new device. That&apos;s the moment most people discover their app&apos;s
              fatal flaw. We ranked these five apps primarily on backup and recovery
              options, because that&apos;s what separates a security tool from a
              security trap.{' '}
              <strong className="text-gray-900">Aegis</strong> scores{' '}
              <strong>{weightedScore(topPick).toFixed(1)}/10</strong> (Android).{' '}
              <strong className="text-gray-900">Ente Auth</strong> scores{' '}
              <strong>{weightedScore(enteAuthPick).toFixed(1)}/10</strong> on all
              platforms including iOS.
            </p>

            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-800">
              <strong>Note:</strong> These apps are free — there are no affiliate links
              on this page. Our recommendations are purely editorial.{' '}
              <Link href="/disclosure" className="underline hover:text-green-900">
                Full disclosure policy.
              </Link>
            </div>
          </div>
        </section>

        {/* Privacy Guides callout */}
        <section className="border-b border-blue-100 bg-blue-50 px-4 py-5">
          <div className="mx-auto max-w-3xl flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-blue-500 text-lg" aria-hidden="true">ℹ</span>
            <p className="text-sm text-blue-900">
              <strong>Independent validation:</strong>{' '}
              <a
                href="https://www.privacyguides.org/en/multi-factor-authentication/"
                className="underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Guides
              </a>{' '}
              recommends only two 2FA apps:{' '}
              <strong>Aegis Authenticator</strong> and{' '}
              <strong>Ente Auth</strong>. Google Authenticator, Microsoft Authenticator,
              and Authy do not appear on their list. Our rankings align with this
              consensus.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            2FA app comparison: all 5 apps scored
          </h2>
          <p className="mb-6 text-gray-500">
            Closed-source apps score 0 on open source (25% weight), and apps with
            no export capability score low on the export criterion (20% weight).
            These two criteria eliminate half the field.
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
              getting it wrong are severe — you can lose access to accounts permanently
              if you lose your phone with no recovery path.
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
        <section className="mx-auto max-w-3xl px-4 py-12 space-y-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Detailed breakdown — every 2FA app reviewed
          </h2>

          {/* Aegis */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">
                1. Aegis Authenticator — {weightedScore(topPick).toFixed(1)}/10
              </h3>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Winner (Android)
              </span>
            </div>
            <p className="mt-3 text-gray-700">
              Aegis is the gold standard for Android 2FA. Everything is stored locally
              — no cloud account required, no third party has access to your tokens.
              You back up your encrypted vault to a file and store it wherever you
              control: your own cloud storage, a USB drive, a second device. The backup
              uses a separate password from your vault password, so even if someone gets
              the backup file, they cannot read it without the backup password.
            </p>
            <p className="mt-3 text-gray-700">
              The defining feature is the export capability. You can export all your
              tokens at any time, in a standard format, and import them into any other
              app. There is no lock-in. This is the opposite of Authy&apos;s approach
              and it&apos;s how 2FA apps should work.
            </p>
            <p className="mt-3 text-gray-700">
              Critical caveat: if you forget your vault master password and have no
              backup, your tokens are gone. The developer states this explicitly by
              design. This is correct security practice, but it means you must take
              backups seriously before you need them.
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              4.6 stars / 6,040+ Play Store reviews ·{' '}
              <a href="https://getaegis.app" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">Android only</a>
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="aegis"
                href={topPickHref}
                label="Get Aegis (Android)"
                variant="primary"
              />
            </div>
          </article>

          {/* Ente Auth */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">
                2. Ente Auth — {weightedScore(enteAuthPick).toFixed(1)}/10
              </h3>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                Runner-up (all platforms)
              </span>
            </div>
            <p className="mt-3 text-gray-700">
              Ente Auth is the best option if you want cloud sync with genuine privacy.
              Your tokens are end-to-end encrypted before they leave your device — Ente
              cannot read them. The sync works across Android, iOS, Windows, macOS,
              Linux, and a web app. This makes it the right choice for iOS users (where
              Aegis has no app) and anyone who wants desktop access to their codes.
            </p>
            <p className="mt-3 text-gray-700">
              Two notable features from user reviews: the app shows you the next TOTP
              code before it generates, meaning you never have to wait for a refresh
              mid-login. And like Aegis, you can export your tokens at any time in a
              standard format — no lock-in.
            </p>
            <p className="mt-3 text-gray-700">
              The main friction: cloud sync requires creating an Ente account. Some
              users find this unnecessary for a 2FA app. You can use it without cloud
              backup (just like Aegis), but this isn&apos;t obvious on first launch.
              Occasional reports of the QR scanner crashing and minor UX rough edges.
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              4.7 stars / 2,290+ Play Store reviews ·{' '}
              <a href="https://ente.io/auth" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">Android, iOS, desktop, web</a>
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="ente_auth"
                href={productCta(enteAuthPick)}
                label="Get Ente Auth"
                variant="secondary"
              />
            </div>
          </article>

          {/* Google Authenticator */}
          <article>
            <h3 className="text-xl font-bold text-gray-900">
              3. Google Authenticator — {weightedScore(googleAuthPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-gray-700">
              Google Authenticator is the most widely supported 2FA app — virtually
              every website that supports TOTP will show a Google Authenticator setup
              QR code. Google added cloud sync in 2023, which addressed the most common
              complaint about losing all tokens when changing phones.
            </p>
            <p className="mt-3 text-gray-700">
              The problem is that cloud sync doesn&apos;t always work correctly.
              Multiple recent reviews describe tokens disappearing after sync, tokens
              not transferring to new devices despite backup supposedly being enabled,
              and the export screen having a catastrophic UX flaw: a pre-checked
              &ldquo;Delete all&rdquo; button in the same position as &ldquo;Next&rdquo;,
              which has resulted in users losing all their codes with a single
              misplaced tap.
            </p>
            <p className="mt-3 text-gray-700">
              The export capability is also limited to QR-code scanning one at a time —
              there is no file export that would let you migrate to another app easily.
              Not recommended if you ever plan to switch apps.
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              4.4 stars / 663K+ Play Store reviews · Not recommended by Privacy Guides
            </p>
          </article>

          {/* Microsoft Authenticator */}
          <article>
            <h3 className="text-xl font-bold text-gray-900">
              4. Microsoft Authenticator — {weightedScore(msAuthPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-gray-700">
              Microsoft Authenticator is required if you want passwordless sign-in to
              Microsoft accounts — that&apos;s its genuine differentiator. Push
              notification approval for Microsoft logins is convenient and consistently
              praised by reviewers using it for work accounts.
            </p>
            <p className="mt-3 text-gray-700">
              Outside the Microsoft ecosystem, the picture is poor. The most common
              complaint — with reviews getting hundreds of helpful votes — is a circular
              dependency problem when setting up on a new device: the app asks you to
              authenticate with the app you&apos;re trying to set up. This problem has
              been reported consistently and not fully resolved.
            </p>
            <p className="mt-3 text-gray-700">
              Backup reliability issues have been documented — extended periods where
              the backup function simply doesn&apos;t work, with no recovery path for
              the affected accounts. Not suitable as a primary 2FA app for non-Microsoft
              accounts.
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              4.7 stars / 2.68M+ Play Store reviews (primarily Microsoft account users) · Not recommended by Privacy Guides
            </p>
          </article>

          {/* Authy */}
          <article>
            <h3 className="text-xl font-bold text-gray-900">
              5. Authy — {weightedScore(authyPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-gray-700">
              Authy pioneered multi-device sync for 2FA and was the best option for
              years. For users who set it up and haven&apos;t needed to change devices,
              it still works.
            </p>
            <p className="mt-3 text-gray-700">
              The problem is intentional lock-in. Authy deliberately prevents token
              export — there is no way to move your tokens to another app without
              manually going to every website and resetting 2FA from scratch. The
              developer cites security as the reason, but this explanation is
              undermined by the fact that Twilio (Authy&apos;s parent company) suffered a
              data breach in 2022 that exposed Authy user phone numbers. Authy also
              blocks GrapheneOS, a more privacy-focused Android variant.
            </p>
            <p className="mt-3 text-gray-700">
              If you are already using Authy and haven&apos;t hit problems, the
              migration cost is real. But new users should start with Aegis (Android)
              or Ente Auth (cross-platform) — you will not regret having full control
              of your tokens.
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              4.0 stars / 95.5K+ Play Store reviews · Not recommended by Privacy Guides
            </p>
          </article>
        </section>

        {/* Critical backup warning */}
        <section className="border-t border-orange-100 bg-orange-50 px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-xl font-bold text-orange-900">
              The backup step most people skip
            </h2>
            <p className="mb-4 text-sm text-orange-800">
              Before you set up 2FA on any account, decide how you will recover access
              if your phone is lost, stolen, or broken. The Play Store is full of
              people who lost access to their accounts permanently because they
              didn&apos;t take this step.
            </p>
            <div className="space-y-3 text-sm text-orange-800">
              <div className="rounded border border-orange-200 bg-white px-4 py-3">
                <strong>With Aegis:</strong> Export an encrypted backup file to a
                separate location you control. Test that the backup restores before
                you rely on it.
              </div>
              <div className="rounded border border-orange-200 bg-white px-4 py-3">
                <strong>With Ente Auth:</strong> Your tokens sync with E2EE. Save
                your recovery key somewhere physical, separate from your phone.
              </div>
              <div className="rounded border border-orange-200 bg-white px-4 py-3">
                <strong>With any app:</strong> Save the backup codes every website
                gives you when you set up 2FA. Store them somewhere separate from
                your phone. This is your last resort if everything else fails.
              </div>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Our verdict</h2>

            <div className="space-y-4 mb-8">
              <div className="rounded-lg border border-green-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">Winner: Aegis (Android)</span>
                  <span className="text-sm font-semibold text-green-700">
                    {weightedScore(topPick).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Full control of your tokens, encrypted file backups, open source, no
                  cloud dependency. The right answer for Android users who take security
                  seriously. Requires backup discipline.
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">Runner-up: Ente Auth (all platforms)</span>
                  <span className="text-sm font-semibold text-blue-700">
                    {weightedScore(enteAuthPick).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  The only Privacy Guides-recommended app with genuine cross-platform
                  support including iOS and desktop. End-to-end encrypted cloud sync.
                  Export your tokens any time. Best choice for iOS users.
                </p>
              </div>

              <div className="rounded-lg border border-red-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">
                    Skip: Google Auth, Microsoft Auth, Authy
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {weightedScore(googleAuthPick).toFixed(1)} and below
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  All three are closed source. All three have significant token loss
                  stories in recent reviews. Authy actively prevents you from leaving.
                  None appear on Privacy Guides.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <ScoreBreakdown product={topPick} criteria={criteria} />
            </div>
            <div className="flex flex-wrap gap-3">
              <AffiliateCTA
                product="aegis"
                href={topPickHref}
                label="Get Aegis (Android)"
                variant="primary"
              />
              <AffiliateCTA
                product="ente_auth"
                href={productCta(enteAuthPick)}
                label="Get Ente Auth (all platforms)"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* ProductCard grid */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Quick reference — all 5 apps
          </h2>
          <p className="mb-6 text-gray-500">
            Sorted by overall score. Aegis and Ente Auth lead by a wide margin.
          </p>
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

        {/* FAQ */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">2FA app FAQ</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'What is 2FA and do I actually need it?',
                  a: "Two-factor authentication means a login requires something you know (password) plus something you have (your phone). Even if someone steals your password, they can't log in without your physical device. For email, banking, and any account with financial or personal data: yes, you need it. Pair 2FA with a good password manager for the strongest protection.",
                },
                {
                  q: 'Is SMS 2FA good enough?',
                  a: "SMS codes are better than nothing but are vulnerable to SIM-swapping attacks, where someone convinces your carrier to transfer your number to their SIM. App-based TOTP (what all five apps here use) is meaningfully more secure because it doesn't depend on your phone number and cannot be intercepted over the cellular network.",
                },
                {
                  q: 'What happens if I lose my phone?',
                  a: "With Aegis: if you have a backup file, restore it on a new device. If you don't, contact each website individually to reset 2FA using their backup codes. With Ente Auth: log in on a new device with your Ente account credentials and recovery key. With Authy: you need your backup password and phone number — if you don't have both, you may be permanently locked out.",
                },
                {
                  q: 'Can I use multiple 2FA apps simultaneously?',
                  a: "Yes. Any TOTP account can be added to any app. Some people keep Aegis for personal accounts and Microsoft Authenticator for work accounts that require it. The 6-digit codes generated by all TOTP apps are identical for the same account — they use a shared algorithm (RFC 6238), not a proprietary format.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                  <h3 className="font-semibold text-gray-900">{q}</h3>
                  <p className="mt-2 text-sm text-gray-600">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Build a complete security setup
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            2FA is one layer. Pair it with a{' '}
            <Link href="/password-managers" className="text-blue-600 underline hover:text-blue-800">
              password manager
            </Link>{' '}
            for the biggest security improvement most people can make.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/password-managers"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best password managers →
            </Link>
            <Link
              href="/reviews/bitwarden"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Bitwarden review — includes TOTP integration →
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
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Not sure where to start?{' '}
            <Link href="/quiz" className="text-blue-600 underline hover:text-blue-800">
              Take the 30-second security quiz →
            </Link>
          </p>
        </section>

      </main>
      <Footer />
    </div>
  );
}
