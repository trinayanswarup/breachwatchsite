import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import ProductCTA from '@/components/ProductCTA';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import { calculateWeightedScore, formatScore } from '@/lib/scoring';
import type { Product, ScoringCriteria } from '@/lib/types';
import FreshnessNote from '@/components/FreshnessNote';
import EvidencePanel from '@/components/EvidencePanel';
import pmRaw from '@/data/password-managers.json';
import criteriaRaw from '@/data/scoring-criteria.json';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Bitwarden Review 2026 — The Best Free Password Manager?',
  description:
    'In-depth Bitwarden review: open source code, Cure53 audit history, free vs premium pricing, and the 2023 autofill advisory.',
};

const pms = pmRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria)['password-manager'];
const product = pms.find((p) => p.id === 'bitwarden')!;

const raw = affiliateLinks[product.id] ?? product.affiliateUrl;
const ctaUrl = buildAffiliateUrl(
  raw === 'PLACEHOLDER' ? product.website : raw,
  product.id,
  'password-manager',
  'review'
);

const SITE = 'https://breachwatchsite.com';
const productScore = calculateWeightedScore(product, criteria);
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Bitwarden Review 2026 — The Best Free Password Manager?',
      url: `${SITE}/reviews/bitwarden`,
      datePublished: '2025-01-01',
      dateModified: '2026-06-14',
      author: { '@type': 'Organization', name: 'CipherCheck', url: SITE },
      publisher: { '@type': 'Organization', name: 'CipherCheck', url: SITE },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/reviews/bitwarden` },
    },
    {
      '@type': 'Review',
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: 'SecurityApplication',
        url: product.website,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: productScore.toFixed(2),
        bestRating: '10',
        worstRating: '0',
      },
      author: { '@type': 'Organization', name: 'CipherCheck', url: SITE },
    },
  ],
};

export default function BitwardenReviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={pageSchema} />
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-bw-gray">
              <Link href="/" className="hover:text-bw-blue">CipherCheck</Link>
              <span aria-hidden="true">›</span>
              <Link href="/password-managers" className="hover:text-bw-blue">Password Managers</Link>
              <span aria-hidden="true">›</span>
              <span className="text-bw-black">Bitwarden Review</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-bw-black sm:text-4xl">
              Bitwarden Review 2026 — The Best Free Password Manager?
            </h1>
            <p className="mt-4 text-lg text-bw-text">
              Bitwarden scores <strong className="text-bw-black">{formatScore(productScore)}/10</strong> in our
              ranking — the highest of any password manager we have tested. It is fully
              open source, independently audited by Cure53 (covering both the client
              applications and the server code), and the free tier includes unlimited
              vault items. The short answer to the headline question: yes, it is the best
              free password manager. It is also competitive with paid alternatives.
            </p>
            <FreshnessNote>
              Review score uses the password-manager methodology, Cure53 audit history, pricing, and platform support checked in June 2026.
            </FreshnessNote>
            <EvidencePanel category="password-manager" productId="bitwarden" />

            <div className="mt-4 rounded-[3px] bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Independence note:</strong> Product links use direct links
              or internal review pages. Rankings are based on published criteria.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">Learn more.</Link>
            </div>
          </div>
        </section>

        {/* Score breakdown */}
        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold text-bw-black">
            How Bitwarden scores
          </h2>
          <ScoreBreakdown product={product} criteria={criteria} />
        </section>

        {/* Main editorial */}
        <article className="mx-auto max-w-3xl px-4 pb-4">
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Zero-knowledge architecture — how it works
            </h2>
            <p className="mb-3 text-bw-text">
              Bitwarden uses a zero-knowledge architecture, which means your passwords
              are encrypted on your device before they leave it. Bitwarden&apos;s servers
              never see your unencrypted vault contents. The encryption uses AES-256-CBC
              with a key derived from your master password using PBKDF2-SHA256. As of
              2023, Bitwarden defaults to 600,000 PBKDF2 iterations — a significant
              increase from earlier defaults that makes brute-force attacks against
              leaked vault data computationally expensive.
            </p>
            <p className="mb-3 text-bw-text">
              The key derivation means that your master password is never transmitted
              to Bitwarden&apos;s servers — only the derived encryption key is used
              locally, and only the encrypted vault is stored remotely. If Bitwarden
              suffered a breach of their database, attackers would receive encrypted
              blobs that are useless without your master password. This is the correct
              architecture for a password manager.
            </p>
            <p className="text-bw-text">
              1Password adds a second factor — the Secret Key — which means even if an
              attacker had your master password, they could not decrypt your vault
              without the Secret Key. Bitwarden does not have an equivalent, which is
              why 1Password scores 10/10 on security architecture versus Bitwarden&apos;s
              9/10. For most users this distinction is theoretical: a strong, unique
              master password provides adequate protection.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              The Cure53 security audit
            </h2>
            <p className="mb-3 text-bw-text">
              Cure53, a German penetration testing firm, audited Bitwarden in 2022.
              The scope was broader than most password manager audits: it covered the
              client applications (web vault, browser extension, desktop app, mobile
              app) and the server infrastructure — the code that actually stores and
              serves your encrypted vault data.
            </p>
            <p className="mb-3 text-bw-text">
              The audit identified several findings, all of which Bitwarden addressed
              before the report was published. No critical vulnerabilities were found.
              The most significant issue was a medium-severity finding related to how
              the web vault handled certain edge cases — corrected before public
              disclosure. Cure53 concluded that Bitwarden&apos;s security posture was
              consistent with its claims.
            </p>
            <p className="text-bw-text">
              The fact that the server code was in scope is notable. Most password
              managers only submit their client applications for review, which tells
              you about the encryption implementation but not about the server-side
              handling of your vault. Bitwarden&apos;s willingness to include the server
              reflects genuine transparency rather than selective disclosure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Free tier, premium, and self-hosting
            </h2>
            <p className="mb-3 text-bw-text">
              The free tier is genuinely complete. It includes unlimited vault items,
              unlimited devices, and the core password management features: password
              generation, secure notes, identity fields, and browser extension autofill.
              Most users will never need anything beyond the free tier.
            </p>
            <p className="mb-3 text-bw-text">
              The premium tier costs $10 per year ($0.83/month) and adds: TOTP
              authenticator code generation inside the vault, hardware security key
              support (FIDO2/WebAuthn), encrypted file attachments, emergency access
              (designate a trusted contact who can request vault access), and Bitwarden
              Send (a secure file-sharing feature). For $10 a year, the premium upgrade
              is exceptional value if you use any of those features.
            </p>
            <p className="text-bw-text">
              The self-hosting option is unique among major password managers. You can
              run the entire Bitwarden stack on your own server using Docker. This means
              your encrypted vault is stored on infrastructure you control — Bitwarden
              never touches it. Vaultwarden (formerly Bitwarden_rs) is a community-built
              lightweight alternative server implementation written in Rust, which is
              more practical on low-power hardware. Self-hosting requires technical
              comfort with Linux and Docker, but for users who want complete data
              sovereignty, no other mainstream password manager offers this.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              The 2023 autofill security advisory
            </h2>
            <p className="mb-3 text-bw-text">
              In 2023, security researchers reported that Bitwarden&apos;s browser
              extension would autofill credentials on iframes embedded within a trusted
              domain, even if the iframe itself was hosted on a different, potentially
              malicious domain. For example, if a legitimate site embedded an iframe
              from an attacker-controlled domain, Bitwarden would fill credentials into
              that iframe.
            </p>
            <p className="mb-3 text-bw-text">
              Bitwarden responded by adding a warning in the extension settings about
              the behaviour and allowing users to disable iframe autofill. They did not
              disable the behaviour by default, citing that doing so would break autofill
              on many legitimate sites that use iframes for login forms. This is a
              reasonable trade-off, but the response was less decisive than some users
              would have preferred.
            </p>
            <p className="text-bw-text">
              The practical risk from this issue is low — it requires a specific attack
              scenario (a trusted site being compromised or designed to embed a malicious
              iframe) that is uncommon. It is worth knowing about, which is why breach
              history scores 9/10 rather than 10/10.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-bw-black">
              Who Bitwarden is right for
            </h2>
            <p className="mb-3 text-bw-text">
              Bitwarden is the right choice for the overwhelming majority of users. If
              you want an open source, audited password manager that costs nothing, there
              is no better option. The interface is less polished than 1Password, and the
              browser extension is occasionally slower to autofill on complex login pages,
              but these are minor friction points rather than meaningful limitations.
            </p>
            <p className="text-bw-text">
              1Password is worth considering if you are setting up a family or team
              account and want the most frictionless experience — its Families plan and
              team management features are stronger. It is also the better choice if you
              specifically want the Secret Key security architecture. But at $2.99/month
              versus Bitwarden&apos;s free tier, you are paying for UX improvements rather
              than meaningful security improvements for most threat models.
            </p>
          </section>
        </article>

        {/* Verdict */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-bw-black">Verdict</h2>
            <p className="mb-6 text-bw-text">
              Bitwarden scores <strong>{formatScore(productScore)}/10</strong> — the highest in our password
              manager comparison. Open source, audited at server level, free tier covers
              everything most people need, and $10/year for premium extras is fair.
              The autofill advisory is worth knowing about but does not materially affect
              the recommendation. Start here. If the UX frustrates you or you need team
              features, evaluate 1Password.
            </p>
            <div className="flex flex-wrap gap-3">
              <ProductCTA
                product={product.id}
                href={ctaUrl}
                label="Try Bitwarden free"
                variant="primary"
              />
              <ProductCTA
                product="1password"
                href="/password-managers"
                label="Compare all password managers"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-5 text-xl font-bold text-bw-black">Related</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/reviews/bitwarden-vs-1password"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors">
              Bitwarden vs 1Password →
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





