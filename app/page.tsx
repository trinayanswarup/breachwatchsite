import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import RecentBreaches from '@/components/RecentBreaches';
import SecurityNews from '@/components/SecurityNews';
import type { Product } from '@/lib/types';
import vpnsJson from '@/data/vpns.json';

export const metadata: Metadata = {
  title: { absolute: 'BreachWatch — Honest Cybersecurity Tool Comparisons' },
  description:
    'Find the right VPN, password manager, or antivirus without the jargon. Transparent scoring, real comparisons, no hidden bias. Start with our free 30-second security quiz.',
};

const vpns = vpnsJson as unknown as Product[];

const featuredProduct = vpns.find((p) => p.id === 'protonvpn')!;

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

        {/* Featured pick */}
        <section className="border-t border-black/10 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
                  Featured pick this month
                </p>
                <h2 className="mt-1 text-[20px] font-bold text-bw-black">
                  Our top-rated VPN
                </h2>
              </div>
              <Link
                href="/vpn"
                className="shrink-0 text-[13px] font-medium text-bw-blue hover:text-bw-blue-dark"
              >
                See all VPNs →
              </Link>
            </div>
            <p className="mb-4 text-[11px] text-bw-gray">
              Affiliate link —{' '}
              <Link href="/disclosure" className="text-bw-blue underline">full disclosure</Link>.
              Featured because it scores highest in our methodology.
            </p>
            <div className="max-w-sm">
              <ProductCard product={featuredProduct} category="vpn" featured />
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
              title="NordVPN Review 2025 — Is It Still Worth It?"
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
              calculated from the data — never adjusted to favour products that earn
              higher commissions.
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

