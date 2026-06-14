import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RecentBreaches from '@/components/RecentBreaches';
import SecurityNews from '@/components/SecurityNews';
import type { Criterion, Product, ScoringCriteria } from '@/lib/types';
import vpnsJson from '@/data/vpns.json';
import passwordManagersJson from '@/data/password-managers.json';
import antivirusJson from '@/data/antivirus.json';
import twoFaAppsJson from '@/data/2fa-apps.json';
import criteriaJson from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: { absolute: 'BreachWatch — Honest Cybersecurity Tool Comparisons' },
  description:
    'Find the right VPN, password manager, or antivirus without the jargon. Transparent scoring, real comparisons, no hidden bias. Start with our free 30-second security quiz.',
};

const vpns = vpnsJson as unknown as Product[];
const passwordManagers = passwordManagersJson as unknown as Product[];
const antivirus = antivirusJson as unknown as Product[];
const twoFaApps = twoFaAppsJson as unknown as Product[];
const criteria = criteriaJson as unknown as ScoringCriteria;

function weightedScore(product: Product, categoryCriteria: Criterion[]): number {
  return categoryCriteria.reduce(
    (sum, criterion) =>
      sum + ((product.scores[criterion.id] ?? 0) * criterion.weight) / 100,
    0
  );
}

function topProduct(products: Product[], categoryCriteria: Criterion[]): Product {
  return [...products].sort(
    (a, b) => weightedScore(b, categoryCriteria) - weightedScore(a, categoryCriteria)
  )[0];
}

interface CategoryCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  count: number;
}

function CategoryCard({ href, icon, title, description, count }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 border border-black/10 bg-white p-5 transition-all hover:border-bw-blue hover:shadow-sm"
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <div>
        <h3 className="font-bold text-bw-black group-hover:text-bw-blue transition-colors text-[15px]">
          {title}
        </h3>
        <p className="mt-1 text-[13px] text-bw-gray">{description}</p>
      </div>
      <p className="mt-auto text-[12px] font-medium text-bw-blue">
        {count} products scored →
      </p>
    </Link>
  );
}

interface ComparisonLinkProps {
  href: string;
  title: string;
  label: string;
}

interface FreeToolLinkProps {
  href: string;
  title: string;
  description: string;
}

interface TopPickCardProps {
  categoryLabel: string;
  href: string;
  product: Product;
  reason: string;
  score: number;
}

function ComparisonLink({ href, title, label }: ComparisonLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between border border-black/10 bg-white px-4 py-3.5 transition-all hover:border-bw-blue"
    >
      <div>
        <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
          {label}
        </span>
        <span className="mt-0.5 block text-[13px] font-medium text-bw-black group-hover:text-bw-blue">
          {title}
        </span>
      </div>
      <span className="shrink-0 text-bw-gray group-hover:text-bw-blue transition-colors" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function FreeToolLink({ href, title, description }: FreeToolLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-4 border border-black/10 bg-white px-4 py-3.5 transition-all hover:border-bw-blue"
    >
      <span>
        <span className="block text-[14px] font-bold text-bw-black group-hover:text-bw-blue">
          {title}
        </span>
        <span className="mt-1 block text-[12px] leading-5 text-bw-gray">
          {description}
        </span>
      </span>
      <span className="mt-0.5 shrink-0 text-bw-gray group-hover:text-bw-blue" aria-hidden="true">
        -&gt;
      </span>
    </Link>
  );
}

function TopPickCard({
  categoryLabel,
  href,
  product,
  reason,
  score,
}: TopPickCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[180px] flex-col border border-black/10 bg-white p-5 transition-all hover:border-bw-blue hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
            {categoryLabel}
          </p>
          <h3 className="mt-2 text-[18px] font-bold text-bw-black group-hover:text-bw-blue">
            {product.name}
          </h3>
        </div>
        <div className="shrink-0 rounded-[3px] bg-green-100 px-3 py-2 text-center text-green-800 ring-1 ring-green-200">
          <span className="block text-[22px] font-bold leading-none">
            {score.toFixed(1)}
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-wider">
            /10
          </span>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-5 text-bw-text">{reason}</p>
      <p className="mt-auto pt-5 text-[12px] font-bold text-bw-blue">
        View category -&gt;
      </p>
    </Link>
  );
}

const topPicks = [
  {
    categoryLabel: 'VPN',
    href: '/vpn',
    product: topProduct(vpns, criteria.vpn),
    criteria: criteria.vpn,
    reason: 'Highest score across logging policy, jurisdiction, audits, price, and reliability.',
  },
  {
    categoryLabel: 'Password manager',
    href: '/password-managers',
    product: topProduct(passwordManagers, criteria['password-manager']),
    criteria: criteria['password-manager'],
    reason: 'Best blend of security architecture, open source code, price, and platform coverage.',
  },
  {
    categoryLabel: 'Antivirus',
    href: '/antivirus',
    product: topProduct(antivirus, criteria.antivirus),
    criteria: criteria.antivirus,
    reason: 'Top score when detection, performance impact, privacy, price, and false positives are weighted.',
  },
  {
    categoryLabel: '2FA app',
    href: '/2fa-apps',
    product: topProduct(twoFaApps, criteria['2fa-apps']),
    criteria: criteria['2fa-apps'],
    reason: 'Strongest score for backup, recovery, export, reliability, and open-source signals.',
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-5 pt-16 pb-12 text-center border-b border-black/10">
          <div className="mx-auto max-w-[680px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-bw-gray">
              Transparent scoring · No hidden bias
            </p>
            <h1 className="text-[32px] font-bold leading-tight text-bw-black">
              Find the right cybersecurity tool — without the jargon or the bias.
            </h1>
            <p className="mt-3 text-[15px] text-bw-gray">
              We score every tool on the criteria that actually matter.{' '}
              <Link href="/how-we-test" className="text-bw-blue underline hover:text-bw-blue-dark">
                See our methodology.
              </Link>
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/quiz"
                className="rounded-[3px] bg-bw-blue px-6 py-3 text-[14px] font-bold text-white hover:bg-bw-blue-dark transition-colors"
              >
                Find your biggest security risk →
              </Link>
              <p className="text-[12px] text-bw-gray">Takes 30 seconds. No email required.</p>
            </div>
            <div className="mt-3">
              <Link
                href="/breach-checker"
                className="text-[13px] font-medium text-bw-blue underline hover:text-bw-blue-dark transition-colors"
              >
                Check if your password was leaked →
              </Link>
            </div>
          </div>
        </section>

        {/* Free tools */}
        <section className="border-b border-black/10 bg-bw-light px-5 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
                Free tools
              </p>
              <h2 className="mt-1 text-[20px] font-bold text-bw-black">
                No account required.
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-6 text-bw-gray">
                These are the practical checks people can use before reading a full
                product comparison.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <FreeToolLink
                href="/breach-checker"
                title="Check if your password was leaked"
                description="Private k-anonymity check against known breached passwords."
              />
              <FreeToolLink
                href="/quiz"
                title="Take the 30-second security quiz"
                description="Find the first security gap worth fixing."
              />
              <FreeToolLink
                href="/tools"
                title="Generate strong passwords"
                description="Create local browser-generated passwords and use quick checklists."
              />
            </div>
          </div>
        </section>

        {/* Category cards */}
        <section className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="mb-1 text-[20px] font-bold text-bw-black">
            Browse by category
          </h2>
          <p className="mb-6 text-[13px] text-bw-gray">
            Every product is scored using documented criteria. No black boxes.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              href="/vpn"
              icon="🛡"
              title="VPNs"
              description="Protect your traffic on any network. We rank on logging policy and jurisdiction — not just speed."
              count={5}
            />
            <CategoryCard
              href="/password-managers"
              icon="🔐"
              title="Password Managers"
              description="Generate and store unique passwords. We prioritise zero-knowledge architecture and open source."
              count={5}
            />
            <CategoryCard
              href="/antivirus"
              icon="🦠"
              title="Antivirus"
              description="Detect and remove malware. Scores are based on AV-TEST data, not marketing claims."
              count={5}
            />
            <CategoryCard
              href="/2fa-apps"
              icon="📱"
              title="2FA Apps"
              description="A second factor on every account. We score on backup and recovery — not just convenience."
              count={5}
            />
          </div>
        </section>

        {/* Recent breaches + security news */}
        <RecentBreaches />
        <SecurityNews />

        {/* Top picks */}
        <section className="border-t border-black/10 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
                Top picks by category
              </p>
              <h2 className="mt-1 text-[20px] font-bold text-bw-black">
                The current leaders from our scoring model.
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-6 text-bw-gray">
                Top picks are calculated from published criteria, not paid placement.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {topPicks.map((pick) => (
                <TopPickCard
                  key={pick.categoryLabel}
                  categoryLabel={pick.categoryLabel}
                  href={pick.href}
                  product={pick.product}
                  reason={pick.reason}
                  score={weightedScore(pick.product, pick.criteria)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recent comparisons */}
        <section className="border-t border-black/10 mx-auto max-w-6xl px-5 py-12">
          <h2 className="mb-1 text-[20px] font-bold text-bw-black">
            Latest comparisons
          </h2>
          <p className="mb-6 text-[13px] text-bw-gray">
            In-depth reviews based on real product testing and publicly verifiable data.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ComparisonLink
              href="/reviews/nordvpn"
              title="NordVPN Review 2026 — Is It Still Worth It?"
              label="VPN review"
            />
            <ComparisonLink
              href="/reviews/nordvpn-vs-expressvpn"
              title="NordVPN vs ExpressVPN — Which Is Actually Better?"
              label="VPN comparison"
            />
            <ComparisonLink
              href="/reviews/bitwarden-vs-1password"
              title="Bitwarden vs 1Password — Free vs Premium, Which Wins?"
              label="Password manager"
            />
          </div>
        </section>

        {/* Methodology teaser */}
        <section className="border-t border-black/10 px-5 py-10">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="text-[18px] font-bold text-bw-black">
              How we score products
            </h2>
            <p className="mt-3 text-[14px] text-bw-gray leading-relaxed">
              Every product is scored using a weighted set of criteria specific to its
              category. The weights are published alongside every comparison. Scores are
              calculated from the data and not adjusted for paid placements.
            </p>
            <Link
              href="/how-we-test"
              className="mt-4 inline-block text-[13px] font-semibold text-bw-blue underline hover:text-bw-blue-dark"
            >
              Read the full methodology →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}






