import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RecentBreaches from '@/components/RecentBreaches';
import SecurityNews from '@/components/SecurityNews';
import { calculateWeightedScore, formatScore } from '@/lib/scoring';
import { homepageTopPicks } from '@/lib/top-picks';
import type { Product, ScoringCriteria } from '@/lib/types';
import vpnsJson from '@/data/vpns.json';
import criteriaJson from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: { absolute: 'CipherCheck: Honest Cybersecurity Tool Comparisons' },
  description:
    'Find the right VPN, password manager, or antivirus without the jargon. Real comparisons with documented scoring. Start with our free security quiz.',
};

interface TopPickCardProps {
  categoryLabel: string;
  href: string;
  product: Product;
  reason: string;
  score: string;
}

function TopPickCard({ categoryLabel, href, product, reason, score }: TopPickCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[180px] flex-col border border-black/15 bg-white p-5 transition-all hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] rounded-none"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue mb-1">
            {categoryLabel} Winner
          </p>
          <h3 className="text-[18px] font-bold text-bw-black group-hover:text-bw-blue tracking-tight">
            {product.name}
          </h3>
        </div>
        <div className="shrink-0 bg-bw-light border border-black/10 px-3 py-2 text-center text-bw-black">
          <span className="block text-[22px] font-bold leading-none">{score}</span>
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-bw-gray">/10</span>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-bw-text border-l-2 border-bw-blue pl-3">
        {reason}
      </p>
      <p className="mt-auto pt-5 text-[12px] font-bold text-bw-black uppercase tracking-wide group-hover:text-bw-blue">
        View category →
      </p>
    </Link>
  );
}

const CATEGORY_LINKS = [
  { href: '/vpn', label: 'Top VPNs' },
  { href: '/password-managers', label: 'Top Password Managers' },
  { href: '/antivirus', label: 'Top Antivirus' },
  { href: '/2fa-apps', label: 'Top 2FA Apps' },
] as const;

const COMPARISON_LINKS = [
  { href: '/reviews/nordvpn', label: 'VPN review', title: 'NordVPN Review 2026 — Is It Still Worth It?' },
  { href: '/reviews/nordvpn-vs-expressvpn', label: 'VPN comparison', title: 'NordVPN vs ExpressVPN — Which Is Actually Better?' },
  { href: '/reviews/bitwarden-vs-1password', label: 'Password manager', title: 'Bitwarden vs 1Password — Free vs Premium, Which Wins?' },
] as const;

export default function HomePage() {
  const vpns = vpnsJson as unknown as Product[];
  const criteria = criteriaJson as unknown as ScoringCriteria;
  const mullvad = vpns.find(v => v.id === 'mullvad') || vpns[0];
  const mullvadScore = formatScore(calculateWeightedScore(mullvad, criteria.vpn));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-black/15 bg-bw-light">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                <h1 className="text-[36px] md:text-[48px] font-bold leading-tight text-bw-black tracking-tight">
                  Find the right cybersecurity tool without the jargon.
                </h1>
                <p className="mt-5 text-[16px] text-bw-text leading-relaxed max-w-xl">
                  We score every tool on the criteria that actually matter. No sponsored rankings, no AI slop. Just rigorous, published methodology.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/quiz"
                    className="rounded-none bg-bw-blue px-8 py-4 text-[15px] font-bold text-white hover:bg-bw-blue-dark transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.15)] hover:translate-y-[2px] hover:translate-x-[2px]"
                  >
                    Find your biggest security risk →
                  </Link>
                  <Link href="/how-we-test" className="text-[14px] font-bold text-bw-black underline decoration-2 underline-offset-4 hover:text-bw-blue transition-colors">
                    See our methodology
                  </Link>
                </div>
              </div>

              {/* Featured Pick Card */}
              <div className="w-full lg:w-1/3">
                <div className="border-t-4 border-t-bw-blue border-x border-b border-black/15 bg-white p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.05)] rounded-none">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
                      Featured VPN
                    </span>
                    <span className="bg-blue-50 text-bw-blue px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                      Privacy First
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[24px] font-bold text-bw-black tracking-tight">{mullvad.name}</h3>
                    <div className="shrink-0 bg-bw-light border border-black/15 px-3 py-2 text-center text-bw-black">
                      <span className="block text-[22px] font-bold leading-none">{mullvadScore}</span>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-bw-gray">/10</span>
                    </div>
                  </div>
                  <p className="mt-5 text-[14px] leading-relaxed text-bw-text border-l-2 border-bw-blue pl-4 italic">
                    &quot;{mullvad.verdict}&quot;
                  </p>
                  <Link href="/vpn" className="mt-6 block w-full border border-black/15 bg-bw-light py-3 text-center text-[13px] font-bold text-bw-black hover:bg-bw-black hover:text-white transition-colors uppercase tracking-wide">
                    View VPN Rankings →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two-column editorial section */}
        <section className="border-b border-black/15 bg-bw-light px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              
              {/* Left column (2/3): Recent Data Breaches */}
              <div className="lg:col-span-2">
                <RecentBreaches />
              </div>

              {/* Right column (1/3): Categories + Comparisons */}
              <div className="flex flex-col gap-6 mt-12 lg:mt-0">

                {/* Box 1: Categories */}
                <div className="border-t-4 border-bw-blue bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] border-x border-b border-black/15">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-gray mb-3">
                    Categories
                  </h2>
                  <nav>
                    {CATEGORY_LINKS.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="group flex items-center justify-between border-b border-black/10 py-3 text-[14px] font-semibold text-bw-black hover:text-bw-blue transition-colors last:border-b-0"
                      >
                        {label}
                        <span className="text-bw-gray group-hover:text-bw-blue transition-colors" aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Box 2: Latest Comparisons */}
                <div className="border-t-4 border-bw-blue bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] border-x border-b border-black/15">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-gray mb-4">
                    Latest Comparisons
                  </h2>
                  <ul className="flex flex-col divide-y divide-black/10">
                    {COMPARISON_LINKS.map(({ href, label, title }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group flex flex-col gap-1 py-4 hover:opacity-80 transition-opacity"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-bw-gray">{label}</span>
                          <span className="text-[14px] font-semibold text-bw-black group-hover:text-bw-blue leading-snug transition-colors">{title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/reviews/nordvpn"
                    className="mt-6 block border border-black/15 bg-bw-light py-3 text-center text-[13px] font-bold text-bw-black hover:bg-bw-black hover:text-white transition-colors uppercase tracking-wide"
                  >
                    See all reviews →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security News */}
        <SecurityNews />

        {/* Editor's Choice */}
        <section className="border-t border-black/15 px-5 py-16 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 border-b border-black/15 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-[24px] font-bold text-bw-black tracking-tight">
                  Editor&apos;s Choice
                </h2>
                <p className="mt-2 text-[14px] text-bw-gray">
                  The current leaders from our scoring model. Not paid placement.
                </p>
              </div>
              <Link href="/how-we-test" className="text-[12px] font-bold text-bw-black uppercase tracking-wide hover:text-bw-blue">
                Read methodology →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {homepageTopPicks.map((pick) => (
                <TopPickCard
                  key={pick.categoryLabel}
                  categoryLabel={pick.categoryLabel}
                  href={pick.href}
                  product={pick.product}
                  reason={pick.reason}
                  score={formatScore(calculateWeightedScore(pick.product, pick.criteria))}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Free Security Tools teaser */}
        <section className="border-t border-black/15 bg-bw-light px-5 py-8">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[15px] text-bw-text">
              Run a DNS leak test, password strength check, or breach lookup.{' '}
              <span className="text-bw-gray">No account required.</span>
            </p>
            <Link
              href="/tools"
              className="shrink-0 rounded-none border border-bw-blue px-6 py-3 text-[13px] font-bold text-bw-blue hover:bg-bw-blue hover:text-white transition-colors uppercase tracking-wide"
            >
              Open free tools →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
