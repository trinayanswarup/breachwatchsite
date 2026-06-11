import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import type { Product, ScoringCriteria } from '@/lib/types';
import pmRaw from '@/data/password-managers.json';
import criteriaRaw from '@/data/scoring-criteria.json';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Bitwarden vs 1Password 2025 — Free vs Premium, Which Wins?',
  description:
    'Bitwarden (9.4/10) vs 1Password (7.0/10): open source vs Secret Key architecture, free vs $2.99/month, and which is right for you. Honest verdict with full scoring.',
};

const pms = pmRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria)['password-manager'];

const bitwarden = pms.find((p) => p.id === 'bitwarden')!;
const onepassword = pms.find((p) => p.id === '1password')!;
const pair = [bitwarden, onepassword];

function cta(product: Product): string {
  const raw = affiliateLinks[product.id] ?? product.affiliateUrl;
  return buildAffiliateUrl(
    raw === 'PLACEHOLDER' ? product.website : raw,
    product.id,
    'password-manager',
    'comparison'
  );
}

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Bitwarden vs 1Password 2025 — Free vs Premium, Which Wins?',
  url: `${SITE}/reviews/bitwarden-vs-1password`,
  datePublished: '2025-01-01',
  dateModified: '2025-06-10',
  author: { '@type': 'Organization', name: 'BreachWatch', url: SITE },
  publisher: { '@type': 'Organization', name: 'BreachWatch', url: SITE },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/reviews/bitwarden-vs-1password` },
  about: [
    { '@type': 'SoftwareApplication', name: 'Bitwarden', url: bitwarden.website },
    { '@type': 'SoftwareApplication', name: '1Password', url: onepassword.website },
  ],
};

export default function BitwardenVs1PasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={pageSchema} />
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-bw-gray">
              <Link href="/" className="hover:text-bw-blue">BreachWatch</Link>
              <span aria-hidden="true">›</span>
              <Link href="/password-managers" className="hover:text-bw-blue">Password Managers</Link>
              <span aria-hidden="true">›</span>
              <span className="text-bw-black">Bitwarden vs 1Password</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-bw-black sm:text-4xl">
              Bitwarden vs 1Password 2025 — Free vs Premium, Which Wins?
            </h1>
            <p className="mt-4 text-lg text-bw-text">
              Bitwarden scores <strong className="text-bw-black">9.4/10</strong>;
              1Password scores <strong className="text-bw-black">7.0/10</strong>. The
              gap is largely explained by one criterion: open source carries 20% of
              the total score, and 1Password scores 0 because its code is proprietary.
              If you can accept that trade-off, 1Password offers a stronger security
              architecture and the best UX in the category. For most people, Bitwarden
              is the clear answer.
            </p>

            <div className="mt-4 rounded-[3px] bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> This page contains affiliate links. Our
              scoring methodology is published and applied consistently across all products.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">Full disclosure.</Link>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-2 text-2xl font-bold text-bw-black">
            Head-to-head scores
          </h2>
          <p className="mb-6 text-bw-gray">
            Scored using the same criteria as our{' '}
            <Link href="/password-managers" className="text-bw-blue underline hover:text-bw-blue-dark">
              full password manager comparison
            </Link>
            . Open source and security architecture together account for 50% of the
            total score.
          </p>
          <ComparisonTable products={pair} criteria={criteria} category="password-manager" />
        </section>

        {/* Criterion-by-criterion */}
        <article className="mx-auto max-w-3xl px-4 pb-4">
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Security architecture: two very different approaches
            </h2>
            <p className="mb-3 text-bw-text">
              Both Bitwarden and 1Password use zero-knowledge architecture — your vault
              is encrypted on your device before it reaches their servers. The
              differences are in the implementation details, and they matter.
            </p>
            <p className="mb-3 text-bw-text">
              Bitwarden uses AES-256-CBC encryption with a key derived from your master
              password via PBKDF2-SHA256 (600,000 iterations as of 2023). The security
              relies entirely on the strength of your master password. If an attacker
              obtained your encrypted vault file and your master password, they could
              decrypt it.
            </p>
            <p className="mb-3 text-bw-text">
              1Password adds a second independent factor: the Secret Key. This is a
              128-bit random key generated on your device during account setup. Your
              vault is encrypted with a combination of your master password and the
              Secret Key — both are required for decryption. The Secret Key is never
              transmitted to 1Password&apos;s servers. This means that even if
              1Password&apos;s servers were breached and both the database and your
              master password were exposed, your vault would remain secure.
            </p>
            <p className="text-bw-text">
              This is a genuinely stronger design, and it is why 1Password scores
              10/10 on security architecture versus Bitwarden&apos;s 9/10. The practical
              implication: if you use a strong, unique master password (which you
              should), both products provide adequate protection. The Secret Key
              matters most if you reuse passwords or use a weak master password —
              which is a concern worth noting but not a reason to choose 1Password
              over improving your master password hygiene.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Open source vs proprietary code
            </h2>
            <p className="mb-3 text-bw-text">
              Bitwarden&apos;s entire codebase — client applications and server
              infrastructure — is publicly available on GitHub. Anyone can read it,
              audit it, and submit issues. The Cure53 audit (2022) covered both the
              client and server code. Self-hosting is possible precisely because the
              server code is open.
            </p>
            <p className="mb-3 text-bw-text">
              1Password&apos;s client code is proprietary. The company has completed
              independent security audits — most recently by Cure53 in 2020 — but
              those audits are point-in-time reviews of code that you cannot
              independently verify. 1Password has never suffered a breach in over
              15 years of operation, and its security team is widely respected in the
              cryptography community. But the inability to inspect the code is a
              structural limitation.
            </p>
            <p className="text-bw-text">
              Open source carries 20% of our total score because a product that
              handles the keys to every account you own should be auditable by
              anyone, not just the vendor&apos;s chosen auditor. This is not a
              purely theoretical concern — the history of security software is full
              of proprietary products with undisclosed flaws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Price: one has a free tier, one does not
            </h2>
            <p className="mb-3 text-bw-text">
              Bitwarden&apos;s free tier includes unlimited vault items and devices —
              there is no meaningful restriction. The premium tier ($10/year, or $0.83/month)
              adds TOTP generation, hardware key support, encrypted attachments, and
              emergency access. For most users the free tier is genuinely sufficient.
            </p>
            <p className="mb-3 text-bw-text">
              1Password has no free tier. The individual plan costs $2.99/month ($35.88/year).
              This is not expensive in absolute terms, but when Bitwarden provides
              equivalent security at zero cost, the premium needs to be justified by
              something other than security. 1Password scores 5/10 on price versus
              Bitwarden&apos;s 10/10.
            </p>
            <p className="text-bw-text">
              Where 1Password&apos;s price becomes more defensible is in the family and
              team tiers. The Families plan at $4.99/month covers up to 5 users with
              shared vaults, admin recovery, and family management features. Bitwarden
              offers a family plan at $3.33/month which is cheaper, but 1Password&apos;s
              family management tools are more polished.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              User experience and platform coverage
            </h2>
            <p className="mb-3 text-bw-text">
              1Password scores 10/10 on platform coverage; Bitwarden scores 9/10. Both
              cover Windows, macOS, iOS, Android, Linux, and all major browsers. The
              gap is primarily in UX quality rather than platform availability.
            </p>
            <p className="mb-3 text-bw-text">
              1Password is widely regarded as having the best UX in the password manager
              category. Its browser extension fills credentials reliably on complex sites
              where Bitwarden occasionally struggles. Its desktop app is polished and
              consistent across platforms. The Travel Mode feature (which hides vaults
              from the app during border crossings) is unique and genuinely useful for
              frequent international travellers.
            </p>
            <p className="text-bw-text">
              Bitwarden&apos;s interface is functional but less refined. The browser
              extension can be slower to detect login forms on some sites. The mobile app
              is solid on iOS and Android but lacks some of the polish of 1Password&apos;s
              native apps. These are quality-of-life issues rather than security issues —
              but they matter to users who interact with the app dozens of times per day.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Breach history and track record
            </h2>
            <p className="mb-3 text-bw-text">
              1Password scores 10/10 on breach history. It has been operating since 2006
              and has never suffered a data breach. During the LastPass breach in 2022
              (which exposed encrypted vault data), 1Password&apos;s Secret Key
              architecture was frequently cited as the reason it would remain secure even
              in a comparable scenario.
            </p>
            <p className="mb-3 text-bw-text">
              Bitwarden scores 9/10. The 2023 autofill security advisory (where
              researchers identified that credentials could be autofilled into iframes on
              embedded, potentially malicious domains) is the primary reason it does not
              score 10/10. Bitwarden responded transparently, added warnings, and provided
              a configuration option to disable the behaviour — but the handling was less
              decisive than ideal. Bitwarden has not suffered a data breach.
            </p>
            <p className="text-bw-text">
              The contrast with LastPass is relevant context. LastPass suffered a major
              breach in 2022 that exposed customers&apos; encrypted vaults. Both Bitwarden
              and 1Password use architectural designs that would limit the damage of a
              comparable incident — but 1Password&apos;s Secret Key provides an additional
              layer of protection.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Which one should you choose?
            </h2>
            <p className="mb-3 text-bw-text">
              <strong className="text-bw-black">Choose Bitwarden if:</strong> you want
              the most transparent, auditable password manager at the lowest cost. Open
              source means the security claims are independently verifiable. The free
              tier covers everything most people need. Self-hosting is available for
              users who want complete data sovereignty.
            </p>
            <p className="text-bw-text">
              <strong className="text-bw-black">Choose 1Password if:</strong> you want
              the best possible UX, you are setting up a family or team account and want
              the most polished management tools, or you specifically want the Secret Key
              architecture because you are concerned about master password exposure. The
              $2.99/month cost is reasonable if any of those factors apply to you.
            </p>
          </section>
        </article>

        {/* Verdict */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-bw-black">Verdict</h2>
            <p className="mb-6 text-bw-text">
              Bitwarden scores <strong>9.4/10</strong> versus 1Password&apos;s{' '}
              <strong>7.0/10</strong>. The score gap is real and driven by open source
              and price criteria that we weight heavily for good reason. For most users,
              Bitwarden is the right choice. 1Password is worth the premium if UX,
              team management, or Secret Key architecture are important to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <AffiliateCTA
                product={bitwarden.id}
                href={cta(bitwarden)}
                label="Try Bitwarden free"
                variant="primary"
              />
              <AffiliateCTA
                product={onepassword.id}
                href={cta(onepassword)}
                label="Try 1Password"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-5 text-xl font-bold text-bw-black">Related</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/reviews/bitwarden"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors">
              Bitwarden full review →
            </Link>
            <Link href="/password-managers"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors">
              Full password manager comparison →
            </Link>
            <Link href="/2fa-apps"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors">
              Best 2FA apps →
            </Link>
            <Link href="/vpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors">
              Best VPNs →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

