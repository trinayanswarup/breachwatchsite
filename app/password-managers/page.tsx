import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import RankedCard from '@/components/RankedCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import AffiliateCTA from '@/components/AffiliateCTA';
import JsonLd from '@/components/JsonLd';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import type { Product, ScoringCriteria } from '@/lib/types';
import productsRaw from '@/data/password-managers.json';
import criteriaRaw from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: 'Best Password Managers 2026 — Ranked on Security, Not Marketing',
  description:
    'We scored 6 password managers on zero-knowledge design, open source code, and real reliability. Bitwarden leads at 9.3/10 and is free. See the full methodology.',
};

const products = productsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria)['password-manager'];

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
    'password-manager',
    'category'
  );
}

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Password Managers 2026 — Ranked by Security Architecture',
  url: `${SITE}/password-managers`,
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

const PM_BULLETS: Record<string, { pros: string[]; cons: string[] }> = {
  bitwarden: {
    pros: [
      'Fully open source — Cure53 independent audit completed 2022',
      'Free tier: unlimited vault items on unlimited devices',
      'Self-hosting option for users who want complete data control',
    ],
    cons: ['Web UI less polished than 1Password · Some imports require manual CSV editing'],
  },
  protonpass: {
    pros: [
      'Open source, Cure53 audited · Built-in email aliases via SimpleLogin',
      'Swiss jurisdiction — bound by Swiss privacy law',
    ],
    cons: ['Newer product — fewer third-party integrations than Bitwarden or 1Password'],
  },
  '1password': {
    pros: [
      'Secret Key architecture: vault requires master password + 34-character device key',
      'Never been breached in 17+ years · Best-in-class browser integration',
    ],
    cons: ['No free tier · $2.99–$4.99/month · Closed source unlike Bitwarden'],
  },
  keeper: {
    pros: [
      'SOC 2 Type 2, ISO 27001, FedRAMP — strongest compliance credentials in the category',
      'FIDO2 hardware key + biometric authentication on all platforms',
    ],
    cons: ['Most expensive option · No free tier beyond 30-day trial'],
  },
  nordpass: {
    pros: [
      'XChaCha20 encryption — more modern cipher than AES-256',
      'Independent Cure53 audit completed',
    ],
    cons: ['Same parent company as NordVPN · Free tier limited to one device at a time'],
  },
  dashlane: {
    pros: [
      'Password health score gives a clear view of weak or reused passwords',
      'Zero-knowledge architecture with AES-256 encryption',
    ],
    cons: ['Most expensive option · Web-only desktop app since 2022 · Bundled VPN is Hotspot Shield'],
  },
};

export default function PasswordManagersPage() {
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
              Best Password Managers of 2026 — Ranked on Security, Not Marketing
            </h1>
            <p className="mt-3.5 text-[15px] text-bw-gray leading-relaxed max-w-[500px] mx-auto">
              We scored six products on zero-knowledge architecture, open source code, and real
              reliability. Bitwarden leads at 9.3/10 and is free. See the full methodology.
            </p>
            <Link
              href="/quiz"
              className="mt-6 inline-flex items-center gap-2 bg-bw-blue text-white px-7 py-3 rounded-[3px] text-[15px] font-semibold hover:bg-bw-blue-dark transition-colors"
            >
              Take the 30-second quiz →
            </Link>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-bw-black">
            Password manager comparison: all 6 products scored
          </h2>
          <p className="mb-6 text-bw-gray">
            Open source carries 20% of the total score. This single criterion eliminates
            half the field — products that cannot be independently audited cannot earn a
            top score regardless of their marketing claims.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="password-manager" />
        </section>

        {/* Criteria explanation */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-bw-black">
              How we score password managers
            </h2>
            <p className="mb-8 text-bw-gray">
              Security architecture carries the most weight because a vault with a flawed
              design creates a single point of failure without the security properties
              that justify that risk.
            </p>
            <div className="space-y-4">
              {criteria.map((c) => (
                <div key={c.id} className="rounded-[3px] border border-black/10 bg-white px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-bw-black">{c.name}</h3>
                    <span className="shrink-0 rounded-[3px] bg-bw-blue/10 px-2.5 py-0.5 text-xs font-bold text-bw-blue">
                      {c.weight}% weight
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-bw-text">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Individual product write-ups */}
        <section className="mx-auto max-w-3xl px-4 py-12 space-y-14">
          <h2 className="text-2xl font-bold text-bw-black">
            Detailed breakdown — every password manager reviewed
          </h2>

          {/* Bitwarden */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                1. Bitwarden — {weightedScore(ranked[0]).toFixed(1)}/10
              </h3>
              <span className="rounded-[3px] bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Winner
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              Bitwarden is the only major password manager that is fully open source,
              independently audited, and genuinely free — not a stripped-down trial that
              pushes you toward a paid plan. The entire client codebase is on GitHub.
              Cure53 completed an independent security audit in 2022. Any security
              researcher can read every line of code that handles your vault. No other
              mainstream competitor offers this level of transparency.
            </p>
            <p className="mt-3 text-bw-text">
              The free tier includes unlimited vault items across unlimited devices. The
              $10/year premium plan adds TOTP code generation (so your password manager
              also handles 2FA codes), hardware security key support, encrypted file
              attachments, and emergency access. For most users, the free tier is
              complete — you do not need premium unless you want TOTP integration.
            </p>
            <p className="mt-3 text-bw-text">
              One important note: the default key derivation was PBKDF2 with 100,000
              iterations until late 2023, when Bitwarden switched the default to Argon2id.
              If you created your account before late 2023, check Account Settings →
              Security → Key Derivation and switch to Argon2id if you have not already.
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="bitwarden"
                href={productCta(ranked[0])}
                label="Try Bitwarden free"
                variant="primary"
              />
            </div>
          </article>

          {/* Proton Pass */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                2. Proton Pass — {weightedScore(ranked[1]).toFixed(1)}/10
              </h3>
              <span className="rounded-[3px] bg-bw-blue/10 px-3 py-1 text-sm font-semibold text-bw-blue-dark">
                Runner-up
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              Proton Pass is built by the team behind ProtonMail and Proton VPN. Like
              Bitwarden it is fully open source — Cure53 audited the clients in 2023 —
              and the Swiss jurisdiction applies: Proton AG is governed by Swiss privacy
              law, which offers protections that US or EU alternatives cannot match under
              their respective legal frameworks.
            </p>
            <p className="mt-3 text-bw-text">
              The differentiating feature is built-in email aliases via SimpleLogin (which
              Proton acquired in 2022). You can create a unique alias for every service you
              register with — if one leaks in a breach, you disable the alias rather than
              updating a password everywhere. No other mainstream password manager includes
              this natively. It is a meaningful privacy improvement, not a marketing feature.
            </p>
            <p className="mt-3 text-bw-text">
              Price scores 8 rather than 10 because the free tier is capped at 25 vault
              items — significantly more limited than Bitwarden&apos;s unlimited free tier.
              Reliability scores 7: autofill has been reported as inconsistent across some
              browsers, particularly on iOS Safari. Proton Pass is newer and its rough edges
              show. For a Proton ecosystem user or anyone who wants email aliasing, it is
              the right choice. For everyone else, Bitwarden&apos;s free tier is broader.
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="protonpass"
                href={productCta(ranked[1])}
                label="Try Proton Pass free"
                variant="secondary"
              />
            </div>
          </article>

          {/* 1Password */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                3. 1Password — {weightedScore(ranked[2]).toFixed(1)}/10
              </h3>
              <span className="rounded-[3px] bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                Premium pick
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              1Password has never been breached. In over 17 years of operation, no security
              incident has resulted in vault data being exposed — a record that stands in
              stark contrast to competitors like LastPass, which suffered a catastrophic
              breach in 2022 that exposed encrypted vaults to offline cracking. The Secret
              Key architecture is genuinely differentiated: decrypting your vault requires
              both your master password and a 34-character device-specific key that is
              never transmitted to 1Password&apos;s servers. An attacker with a copy of
              your encrypted vault still cannot brute-force it.
            </p>
            <p className="mt-3 text-bw-text">
              The reason 1Password scores 6.3 despite this record is the open source
              criterion. The clients are not open source. 1Password publishes security
              white papers and conducts third-party audits, but &ldquo;an audit was
              conducted&rdquo; is a weaker claim than &ldquo;the code is publicly
              readable.&rdquo; For a product holding credentials to your bank and email,
              the distinction matters.
            </p>
            <p className="mt-3 text-bw-text">
              It also starts at $2.99/month with no free tier. For families and teams the
              pricing is competitive — the family plan at $4.99/month covers five users
              — and the UX is consistently rated best-in-class. If polish, team features,
              and breach history matter more to you than code auditability, 1Password is
              the right pick.
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="1password"
                href={productCta(ranked[2])}
                label="Try 1Password"
                variant="secondary"
              />
            </div>
          </article>

          {/* Keeper */}
          <article>
            <h3 className="text-xl font-bold text-bw-black">
              4. Keeper — {weightedScore(ranked[3]).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-bw-text">
              Keeper holds the strongest enterprise compliance credentials in this
              comparison: SOC 2 Type 2 certified, ISO 27001 certified, and FedRAMP
              authorised. If your threat model includes corporate compliance requirements
              or government contracts, Keeper is the only option here that satisfies
              them. Platform coverage is excellent across all major operating systems
              and browsers, and FIDO2 hardware security key support is comprehensive.
            </p>
            <p className="mt-3 text-bw-text">
              For consumers, the case is weaker. Keeper is not open source — it scores
              zero on the 20% weighted open source criterion — and at $2.92/month annual
              it is priced well above Bitwarden at $0.83/month. Keeper&apos;s branded
              dark web monitoring feature is an additional paid add-on; it has no
              connection to this site despite sharing the name. Keeper is the right
              choice specifically when enterprise certifications are a hard requirement.
            </p>
          </article>

          {/* NordPass */}
          <article>
            <h3 className="text-xl font-bold text-bw-black">
              5. NordPass — {weightedScore(ranked[4]).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-bw-text">
              NordPass uses XChaCha20 encryption — a more modern algorithm than the
              AES-256 used by most competitors — and has been independently audited by
              Cure53. Its free tier allows unlimited vault items but restricts sync to a
              single active session at a time, which is more limiting in practice than
              it sounds: you can only be logged in on one device.
            </p>
            <p className="mt-3 text-bw-text">
              NordPass is built by Nord Security, the same company that owns NordVPN.
              For users who care about privacy, this is worth noting: a single vendor
              holds both your network traffic metadata (if you use NordVPN) and your
              credential vault. NordPass is not open source. For the $1.99/month annual
              price, Bitwarden is strictly better on every privacy-relevant criterion,
              and Proton Pass is comparable in price with better privacy guarantees
              and email aliasing. NordPass&apos;s niche is users who are already
              embedded in the Nord Security ecosystem.
            </p>
          </article>

          {/* Dashlane */}
          <article>
            <h3 className="text-xl font-bold text-bw-black">
              6. Dashlane — {weightedScore(ranked[5]).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-bw-text">
              Dashlane is the most expensive option at $4.99/month, which bundles a VPN
              (Hotspot Shield) and dark web monitoring alongside the password manager. If
              you genuinely need all three products, the bundle has marginal value.
              If you want a standalone password manager, you are paying roughly six times
              Bitwarden&apos;s price for equivalent or lesser security guarantees.
            </p>
            <p className="mt-3 text-bw-text">
              Dashlane is not open source — scoring zero on the 20% weighted criterion —
              and scores 4/10 on price, reflecting both the high monthly cost and the
              absence of a useful free tier. The zero-knowledge architecture is sound,
              but &ldquo;sound architecture, closed source&rdquo; is a weaker position
              than &ldquo;sound architecture, open source.&rdquo; Dashlane does not
              belong at the top of any security-first ranking.
            </p>
          </article>
        </section>

        {/* Verdict */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-bw-black">Our verdict</h2>

            <div className="space-y-4 mb-8">
              <div className="rounded-[3px] border border-green-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-bw-black">Winner: Bitwarden</span>
                  <span className="text-sm font-semibold text-green-700">
                    {weightedScore(ranked[0]).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-bw-text">
                  Open source, independently audited by Cure53, genuinely free tier with
                  unlimited items on unlimited devices. The only choice for users who want
                  full transparency about what touches their credentials.
                </p>
              </div>

              <div className="rounded-[3px] border border-blue-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-bw-black">Runner-up: Proton Pass</span>
                  <span className="text-sm font-semibold text-bw-blue">
                    {weightedScore(ranked[1]).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-bw-text">
                  Open source, Swiss jurisdiction, built-in email aliases. The privacy
                  bundle for Proton ecosystem users or anyone who wants email aliasing
                  as a core feature.
                </p>
              </div>

              <div className="rounded-[3px] border border-purple-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-bw-black">Premium pick: 1Password</span>
                  <span className="text-sm font-semibold text-purple-700">
                    {weightedScore(ranked[2]).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-bw-text">
                  Secret Key architecture, never been breached, best UX for families and
                  teams. Worth the price if polish and breach record matter more than
                  open source auditability.
                </p>
              </div>

              <div className="rounded-[3px] border border-black/10 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-bw-black">Skip: NordPass, Dashlane, Keeper</span>
                  <span className="text-sm font-semibold text-bw-gray">
                    {weightedScore(ranked[3]).toFixed(1)} and below
                  </span>
                </div>
                <p className="mt-1 text-sm text-bw-text">
                  Not open source, not price-competitive with Bitwarden or Proton Pass.
                  Keeper is the exception only for organisations with enterprise
                  compliance requirements.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <ScoreBreakdown product={topPick} criteria={criteria} />
            </div>
            <AffiliateCTA
              product={topPick.id}
              href={topPickHref}
              label="Try Bitwarden free"
              variant="primary"
            />
          </div>
        </section>

        {/* Ranked comparison */}
        <section className="mx-auto max-w-[760px] px-5 pb-10">
          <div className="flex items-end gap-3 border-b-2 border-bw-blue pb-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-gray">
              6 password managers compared · Updated Jun 2026 · Methodology published
            </span>
          </div>
          {ranked.map((p, i) => {
            const bullets = PM_BULLETS[p.id] ?? { pros: p.highlights, cons: [] };
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
            <Link href="/about" className="text-bw-blue underline">published criteria</Link>.
            {' '}Affiliate commissions do not affect rankings. Some links earn us a commission
            at no extra cost to you.{' '}
            <Link href="/disclosure" className="text-bw-blue underline">Full disclosure →</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-bw-black">
              Password manager FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Is a password manager actually safe to use?',
                  a: "Yes — safer than the alternative. The main concern is that your password manager becomes a single point of failure if your master password is compromised. This risk is outweighed by the benefit: a unique, random password for every account means a breach at one service cannot cascade to others. Enable 2FA on your password manager account to address the single-point-of-failure concern.",
                },
                {
                  q: "What's the real difference between open source and closed source managers?",
                  a: "With open source, you can verify that the code does what the vendor claims — that vault encryption is applied correctly, that no data leaves without your knowledge, that key derivation uses secure parameters. With closed source, you are trusting the vendor's claims and the scope of audits they choose to commission. For a product holding credentials to your bank and email, independent verifiability matters.",
                },
                {
                  q: 'Can I use Bitwarden free for everything?',
                  a: "For most users, yes. Bitwarden's free tier includes unlimited vault items on unlimited devices — there is no cap. The $10/year premium adds TOTP code generation (so your password manager also generates 6-digit 2FA codes), hardware security key support like YubiKey, encrypted file attachments, and emergency access. If you use a separate 2FA app like Aegis, the free tier covers all your needs.",
                },
                {
                  q: 'What about iCloud Keychain and Google Password Manager?',
                  a: "Both are convenient and reasonably secure within their ecosystems. The limitations are cross-platform use and vendor lock-in: iCloud Keychain is cumbersome on Windows or Android; Google Password Manager is tied to your Google account. Neither is open source, both give the platform vendor access to credential metadata, and migrating away is harder than switching between dedicated managers. For most users, a dedicated manager is the better long-term choice.",
                },
                {
                  q: 'What happens if the password manager company is hacked?',
                  a: "In a properly designed zero-knowledge manager, nothing — your vault is encrypted with a key that never reaches the vendor's servers, so what an attacker gets is ciphertext they cannot decrypt without your master password. The LastPass 2022 breach is the instructive counterexample: LastPass stored vault data in a way that allowed encrypted vaults to be stolen and targeted for offline cracking. Open source architecture is important here — it lets you verify that the zero-knowledge claim is actually implemented correctly.",
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
          <h2 className="mb-6 text-xl font-bold text-bw-black">Related comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/reviews/bitwarden"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Bitwarden full review →
            </Link>
            <Link
              href="/reviews/bitwarden-vs-1password"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Bitwarden vs 1Password — full comparison →
            </Link>
            <Link
              href="/2fa-apps"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best 2FA apps — add a second layer →
            </Link>
            <Link
              href="/vpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best VPNs →
            </Link>
          </div>
          <p className="mt-8 text-sm text-bw-gray">
            Not sure what security tool you need first?{' '}
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

