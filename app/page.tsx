import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
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
      className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
    >
      <span className="text-3xl" aria-hidden="true">{icon}</span>
      <div>
        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <p className="mt-auto text-xs font-medium text-blue-600">
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
      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3.5 transition-all hover:border-blue-200 hover:bg-blue-50"
    >
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-blue-600">
          {label}
        </span>
        <span className="mt-0.5 block text-sm font-medium text-gray-800 group-hover:text-blue-700">
          {title}
        </span>
      </div>
      <span className="shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" aria-hidden="true">
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
        {/* Hero — quiz CTA above the fold */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Transparent scoring · No hidden bias
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Find the right cybersecurity tool — without the jargon or the bias.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We score every tool on the criteria that actually matter.{' '}
              <Link href="/about" className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                See our methodology.
              </Link>
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/quiz"
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Find out your biggest security risk →
              </Link>
              <p className="text-sm text-gray-500">Takes 30 seconds. No email required.</p>
            </div>
          </div>
        </section>

        {/* Category cards */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Browse by category
          </h2>
          <p className="mb-8 text-gray-500">
            Every product is scored using documented criteria. No black boxes.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Featured pick */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Featured pick this month
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  Our top-rated VPN
                </h2>
              </div>
              <Link
                href="/vpn"
                className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                See all VPNs →
              </Link>
            </div>
            <div className="max-w-sm">
              <ProductCard product={featuredProduct} category="vpn" featured />
            </div>
          </div>
        </section>

        {/* Recent comparisons */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Latest comparisons
          </h2>
          <p className="mb-8 text-gray-500">
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
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold text-gray-900">
              How we score products
            </h2>
            <p className="mt-3 text-gray-600">
              Every product is scored using a weighted set of criteria specific to its
              category. The weights are published alongside every comparison. Scores are
              calculated from the data — they are never adjusted to favour products that
              earn higher commissions.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-800"
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
