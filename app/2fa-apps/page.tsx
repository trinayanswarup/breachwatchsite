import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import RankedCard from '@/components/RankedCard';
import AffiliateCTA from '@/components/AffiliateCTA';
import CategoryShortlist from '@/components/CategoryShortlist';
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

const shortlist = [
  { name: 'Aegis', label: 'best 2FA app for Android', href: '#aegis' },
  { name: 'Ente Auth', label: 'best cross-platform 2FA app', href: '#ente-auth' },
  { name: 'Google Authenticator', label: 'familiar but limited recovery', href: '#google-authenticator' },
  { name: 'Microsoft Authenticator', label: 'best only for Microsoft accounts', href: '#microsoft-authenticator' },
  { name: 'Authy', label: 'avoid for new users because of export lock-in', href: '#authy' },
];

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

const FA_BULLETS: Record<string, { pros: string[]; cons: string[] }> = {
  aegis: {
    pros: [
      'Export tokens to an encrypted file at any time — complete, portable, no lock-in',
      'Fully open source, available on F-Droid — no Google Play account required',
      'Encrypted vault with a separate backup password — local storage only',
    ],
    cons: ['Android only — no iOS or desktop app'],
  },
  ente_auth: {
    pros: [
      'End-to-end encrypted sync — Ente cannot read your tokens even on their servers',
      'Cross-platform: Android, iOS, Windows, macOS, Linux, and web',
      'Shows the next TOTP code before it generates — never wait mid-login',
    ],
    cons: ['Newer project — requires trust in Ente for encrypted cloud sync'],
  },
  google_authenticator: {
    pros: ['Supported by virtually every site that offers TOTP-based 2FA'],
    cons: [
      'Export screen has a pre-checked "Delete all" button — multiple users report losing all codes',
      'Cloud sync reliability reported as inconsistent since 2023 launch',
    ],
  },
  microsoft_authenticator: {
    pros: ['Passwordless sign-in for Microsoft accounts — the genuine differentiating feature'],
    cons: [
      'Circular dependency on new device: asks you to authenticate with the app you\'re setting up',
      'Backup reliability issues — extended outages with no recovery path',
    ],
  },
  authy: {
    pros: ['Multi-device sync established before competitors offered it'],
    cons: [
      'No token export — by design. Switching apps requires resetting 2FA on every account',
      'Twilio breach (2022) exposed Authy user phone numbers · Blocks GrapheneOS',
    ],
  },
};

export default function TwoFAPage() {
  const topPickHref = productCta(topPick);

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={pageSchema} />
      <Nav />

      <main className="flex-1">

        {/* Hero */}
        <section className="px-5 pt-14 pb-10 text-center">
          <div className="mx-auto max-w-[680px]">
            <h1 className="text-[32px] font-bold leading-tight text-bw-black">
              Best 2FA Apps of 2026 — The One Question That Changes Everything
            </h1>
            <p className="mt-3.5 text-[15px] text-bw-gray leading-relaxed max-w-[500px] mx-auto">
              We compared 5 two-factor authentication apps on what actually matters: what
              happens when you lose your phone. The results will surprise you.
            </p>
            <Link
              href="/quiz"
              className="mt-6 inline-flex items-center gap-2 bg-bw-blue text-white px-7 py-3 rounded-[3px] text-[15px] font-semibold hover:bg-bw-blue-dark transition-colors"
            >
              Take the 30-second quiz →
            </Link>
          </div>
        </section>



        <CategoryShortlist
          title="Recommended 2FA apps - shortlist"
          description="Start here if you want the fast answer before reading the full breakdown."
          items={shortlist}
        />

        <section className="border-t border-black/10 bg-bw-light px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-bw-black">Why 2FA matters</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-bw-text">
              <p>
                Two-factor authentication protects important accounts even when a password
                leaks. For email, banking, password managers, and work accounts, app-based
                2FA is one of the highest-impact upgrades you can make.
              </p>
              <p>
                The backup plan matters as much as the app. Before you rely on any 2FA app,
                know how you will recover if your phone is lost, stolen, or broken.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-bw-black">
            2FA app comparison: all 5 apps scored
          </h2>
          <p className="mb-6 text-bw-gray">
            Closed-source apps score 0 on open source (25% weight), and apps with
            no export capability score low on the export criterion (20% weight).
            These two criteria eliminate half the field.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="2fa-apps" />
        </section>

        {/* Individual product write-ups */}
        <section className="mx-auto max-w-3xl px-4 py-12 space-y-14">
          <h2 className="text-2xl font-bold text-bw-black">
            Detailed breakdown — every 2FA app reviewed
          </h2>

          {/* Aegis */}
          <article id="aegis">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                1. Aegis Authenticator — {weightedScore(topPick).toFixed(1)}/10
              </h3>
              <span className="rounded-[3px] bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Winner (Android)
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              Aegis is the gold standard for Android 2FA. Everything is stored locally
              — no cloud account required, no third party has access to your tokens.
              You back up your encrypted vault to a file and store it wherever you
              control: your own cloud storage, a USB drive, a second device. The backup
              uses a separate password from your vault password, so even if someone gets
              the backup file, they cannot read it without the backup password.
            </p>
            <p className="mt-3 text-bw-text">
              The defining feature is the export capability. You can export all your
              tokens at any time, in a standard format, and import them into any other
              app. There is no lock-in. This is the opposite of Authy&apos;s approach
              and it&apos;s how 2FA apps should work.
            </p>
            <p className="mt-3 text-bw-text">
              Critical caveat: if you forget your vault master password and have no
              backup, your tokens are gone. The developer states this explicitly by
              design. This is correct security practice, but it means you must take
              backups seriously before you need them.
            </p>
            <p className="mt-3 text-sm font-medium text-bw-gray">
              4.6 stars / 6,040+ Play Store reviews ·{' '}
              <a href="https://getaegis.app" className="text-bw-blue underline hover:text-bw-blue-dark" target="_blank" rel="noopener noreferrer">Android only</a>
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
          <article id="ente-auth">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                2. Ente Auth — {weightedScore(enteAuthPick).toFixed(1)}/10
              </h3>
              <span className="rounded-[3px] bg-bw-blue/10 px-3 py-1 text-sm font-semibold text-bw-blue-dark">
                Runner-up (all platforms)
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              Ente Auth is the best option if you want cloud sync with genuine privacy.
              Your tokens are end-to-end encrypted before they leave your device — Ente
              cannot read them. The sync works across Android, iOS, Windows, macOS,
              Linux, and a web app. This makes it the right choice for iOS users (where
              Aegis has no app) and anyone who wants desktop access to their codes.
            </p>
            <p className="mt-3 text-bw-text">
              Two notable features from user reviews: the app shows you the next TOTP
              code before it generates, meaning you never have to wait for a refresh
              mid-login. And like Aegis, you can export your tokens at any time in a
              standard format — no lock-in.
            </p>
            <p className="mt-3 text-bw-text">
              The main friction: cloud sync requires creating an Ente account. Some
              users find this unnecessary for a 2FA app. You can use it without cloud
              backup (just like Aegis), but this isn&apos;t obvious on first launch.
              Occasional reports of the QR scanner crashing and minor UX rough edges.
            </p>
            <p className="mt-3 text-sm font-medium text-bw-gray">
              4.7 stars / 2,290+ Play Store reviews ·{' '}
              <a href="https://ente.io/auth" className="text-bw-blue underline hover:text-bw-blue-dark" target="_blank" rel="noopener noreferrer">Android, iOS, desktop, web</a>
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
          <article id="google-authenticator">
            <h3 className="text-xl font-bold text-bw-black">
              3. Google Authenticator — {weightedScore(googleAuthPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-bw-text">
              Google Authenticator is the most widely supported 2FA app — virtually
              every website that supports TOTP will show a Google Authenticator setup
              QR code. Google added cloud sync in 2023, which addressed the most common
              complaint about losing all tokens when changing phones.
            </p>
            <p className="mt-3 text-bw-text">
              The problem is that cloud sync doesn&apos;t always work correctly.
              Multiple recent reviews describe tokens disappearing after sync, tokens
              not transferring to new devices despite backup supposedly being enabled,
              and the export screen having a catastrophic UX flaw: a pre-checked
              &ldquo;Delete all&rdquo; button in the same position as &ldquo;Next&rdquo;,
              which has resulted in users losing all their codes with a single
              misplaced tap.
            </p>
            <p className="mt-3 text-bw-text">
              The export capability is also limited to QR-code scanning one at a time —
              there is no file export that would let you migrate to another app easily.
              Not recommended if you ever plan to switch apps.
            </p>
            <p className="mt-3 text-sm font-medium text-bw-gray">
              4.4 stars / 663K+ Play Store reviews · Not recommended by Privacy Guides
            </p>
          </article>

          {/* Microsoft Authenticator */}
          <article id="microsoft-authenticator">
            <h3 className="text-xl font-bold text-bw-black">
              4. Microsoft Authenticator — {weightedScore(msAuthPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-bw-text">
              Microsoft Authenticator is required if you want passwordless sign-in to
              Microsoft accounts — that&apos;s its genuine differentiator. Push
              notification approval for Microsoft logins is convenient and consistently
              praised by reviewers using it for work accounts.
            </p>
            <p className="mt-3 text-bw-text">
              Outside the Microsoft ecosystem, the picture is poor. The most common
              complaint — with reviews getting hundreds of helpful votes — is a circular
              dependency problem when setting up on a new device: the app asks you to
              authenticate with the app you&apos;re trying to set up. This problem has
              been reported consistently and not fully resolved.
            </p>
            <p className="mt-3 text-bw-text">
              Backup reliability issues have been documented — extended periods where
              the backup function simply doesn&apos;t work, with no recovery path for
              the affected accounts. Not suitable as a primary 2FA app for non-Microsoft
              accounts.
            </p>
            <p className="mt-3 text-sm font-medium text-bw-gray">
              4.7 stars / 2.68M+ Play Store reviews (primarily Microsoft account users) · Not recommended by Privacy Guides
            </p>
          </article>

          {/* Authy */}
          <article id="authy">
            <h3 className="text-xl font-bold text-bw-black">
              5. Authy — {weightedScore(authyPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-bw-text">
              Authy pioneered multi-device sync for 2FA and was the best option for
              years. For users who set it up and haven&apos;t needed to change devices,
              it still works.
            </p>
            <p className="mt-3 text-bw-text">
              The problem is intentional lock-in. Authy deliberately prevents token
              export — there is no way to move your tokens to another app without
              manually going to every website and resetting 2FA from scratch. The
              developer cites security as the reason, but this explanation is
              undermined by the fact that Twilio (Authy&apos;s parent company) suffered a
              data breach in 2022 that exposed Authy user phone numbers. Authy also
              blocks GrapheneOS, a more privacy-focused Android variant.
            </p>
            <p className="mt-3 text-bw-text">
              If you are already using Authy and haven&apos;t hit problems, the
              migration cost is real. But new users should start with Aegis (Android)
              or Ente Auth (cross-platform) — you will not regret having full control
              of your tokens.
            </p>
            <p className="mt-3 text-sm font-medium text-bw-gray">
              4.0 stars / 95.5K+ Play Store reviews · Not recommended by Privacy Guides
            </p>
          </article>
        </section>

        {/* Ranked comparison */}
        <section className="mx-auto max-w-[760px] px-5 pb-10">
          <div className="flex items-end gap-3 border-b-2 border-bw-blue pb-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-gray">
              5 2FA apps compared · Updated Jun 2026 · Methodology published
            </span>
          </div>
          {ranked.map((p, i) => {
            const bullets = FA_BULLETS[p.id] ?? { pros: p.highlights, cons: [] };
            return (
              <RankedCard
                key={p.id}
                rank={i + 1}
                productId={p.id}
                name={p.name}
                tagline={p.tagline}
                pros={bullets.pros}
                cons={bullets.cons}
                score={weightedScore(p)}
                ctaHref={productCta(p)}
                ctaLabel={`Visit ${p.name}`}
              />
            );
          })}
          <p className="text-[11px] text-bw-gray text-center pt-3 border-t border-black/10 leading-relaxed">
            Scores calculated from{' '}
            <Link href="/how-we-test" className="text-bw-blue underline">published criteria</Link>.
            {' '}Affiliate commissions do not affect rankings. Some links earn us a commission
            at no extra cost to you.{' '}
            <Link href="/disclosure" className="text-bw-blue underline">Full disclosure →</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-bw-black">2FA app FAQ</h2>
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
                <div key={q} className="rounded-[3px] border border-black/10 bg-white px-5 py-4">
                  <h3 className="font-semibold text-bw-black">{q}</h3>
                  <p className="mt-2 text-sm text-bw-text">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-bw-black">
            Build a complete security setup
          </h2>
          <p className="mb-4 text-sm text-bw-text">
            2FA is one layer. Pair it with a{' '}
            <Link href="/password-managers" className="text-bw-blue underline hover:text-bw-blue-dark">
              password manager
            </Link>{' '}
            for the biggest security improvement most people can make.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/password-managers"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best password managers →
            </Link>
            <Link
              href="/reviews/bitwarden"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Bitwarden review — includes TOTP integration →
            </Link>
            <Link
              href="/vpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best VPNs →
            </Link>
            <Link
              href="/antivirus"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best antivirus software →
            </Link>
          </div>
          <p className="mt-8 text-sm text-bw-gray">
            Not sure where to start?{' '}
            <Link href="/quiz" className="text-bw-blue underline hover:text-bw-blue-dark">
              Take the 30-second security quiz →
            </Link>
          </p>
        </section>

      </main>
      <Footer />
    </div>
  );
}

