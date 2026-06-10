import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import type { Product, ScoringCriteria } from '@/lib/types';
import vpnsRaw from '@/data/vpns.json';
import criteriaRaw from '@/data/scoring-criteria.json';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'NordVPN vs ExpressVPN 2025 — Which Is Actually Better?',
  description:
    'Side-by-side comparison: NordVPN (8.05/10) vs ExpressVPN (7.00/10). ExpressVPN is faster but costs 67% more and is owned by Kape Technologies. The verdict is clear.',
};

const vpns = vpnsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria).vpn;

const nord = vpns.find((p) => p.id === 'nordvpn')!;
const express = vpns.find((p) => p.id === 'expressvpn')!;
const pair = [nord, express];

function cta(product: Product): string {
  const raw = affiliateLinks[product.id] ?? product.affiliateUrl;
  return buildAffiliateUrl(
    raw === 'PLACEHOLDER' ? product.website : raw,
    product.id,
    'vpn',
    'comparison'
  );
}

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'NordVPN vs ExpressVPN 2025 — Which Is Actually Better?',
  url: `${SITE}/reviews/nordvpn-vs-expressvpn`,
  datePublished: '2025-01-01',
  dateModified: '2025-06-10',
  author: { '@type': 'Organization', name: 'BreachWatch', url: SITE },
  publisher: { '@type': 'Organization', name: 'BreachWatch', url: SITE },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/reviews/nordvpn-vs-expressvpn` },
  about: [
    { '@type': 'SoftwareApplication', name: 'NordVPN', url: nord.website },
    { '@type': 'SoftwareApplication', name: 'ExpressVPN', url: express.website },
  ],
};

export default function NordVpnVsExpressVpnPage() {
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
              <Link href="/vpn" className="hover:text-blue-600">VPNs</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gray-900">NordVPN vs ExpressVPN</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              NordVPN vs ExpressVPN 2025 — Which Is Actually Better?
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              This comparison has a clear answer: <strong className="text-gray-900">NordVPN
              wins</strong> at <strong>8.05/10</strong> versus ExpressVPN&apos;s
              <strong> 7.00/10</strong>. ExpressVPN is marginally faster, but NordVPN
              is cheaper, has a more credible audit record, and does not carry the
              Kape Technologies ownership question that ExpressVPN has carried since
              2021. On every criterion except raw speed, NordVPN is the better choice.
            </p>

            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> This page contains affiliate links. Our scores
              and recommendations are calculated independently.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">Full disclosure.</Link>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Head-to-head scores
          </h2>
          <p className="mb-6 text-gray-500">
            Scored using the same criteria as our{' '}
            <Link href="/vpn" className="text-blue-600 underline hover:text-blue-800">
              full VPN comparison
            </Link>
            . Weights are shown on each criterion row.
          </p>
          <ComparisonTable products={pair} criteria={criteria} category="vpn" />
        </section>

        {/* Criterion-by-criterion */}
        <article className="mx-auto max-w-3xl px-4 pb-4">
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Price: NordVPN wins by a significant margin
            </h2>
            <p className="mb-3 text-gray-700">
              NordVPN&apos;s two-year plan works out to $4.99/month, billed as $59.88
              every two years. ExpressVPN&apos;s annual plan is $99.95/year — $8.32/month.
              That is a 67% price premium for ExpressVPN. At the monthly rate without a
              long-term commitment, the gap closes slightly (NordVPN $12.99 vs ExpressVPN
              $12.95), but anyone committing to an annual plan is paying substantially
              more for ExpressVPN.
            </p>
            <p className="text-gray-700">
              This price gap reflects in our scoring: NordVPN scores 7/10 on price versus
              ExpressVPN&apos;s 3/10. There is no feature in ExpressVPN&apos;s offering
              that justifies the premium over NordVPN for the typical user — the speed
              advantage is real but not material in most usage scenarios.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Speed: ExpressVPN&apos;s Lightway edge
            </h2>
            <p className="mb-3 text-gray-700">
              ExpressVPN scores 10/10 on speed versus NordVPN&apos;s 9/10. This is one of
              the few areas where ExpressVPN has a genuine, consistent advantage. The
              company developed its own VPN protocol, Lightway, which is purpose-built
              for speed and reconnection performance. Independent tests from AV-Comparatives
              and Ookla consistently rank ExpressVPN at or near the top for connection
              speed globally.
            </p>
            <p className="text-gray-700">
              NordVPN&apos;s NordLynx protocol (built on WireGuard) is excellent — faster
              than OpenVPN and competitive with most alternatives. The practical difference
              between the two in everyday use is marginal unless you are streaming 4K
              video across international servers or need VPN-on during video calls.
              For those specific use cases, ExpressVPN&apos;s speed advantage is more
              meaningful.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Logging policy and jurisdiction
            </h2>
            <p className="mb-3 text-gray-700">
              NordVPN scores 8/10 on logging policy; ExpressVPN scores 7/10. Both claim
              a no-logs policy and both have had audits. NordVPN&apos;s PwC audit (2022)
              is more recent and from a more prominent auditing firm. ExpressVPN&apos;s
              no-logs claim was tested in practice when Turkish authorities seized an
              ExpressVPN server in 2017 in connection with a criminal investigation and
              found no relevant user data — a real-world demonstration of the no-logs
              policy holding.
            </p>
            <p className="mb-3 text-gray-700">
              On jurisdiction, both score 8/10. NordVPN is incorporated in Panama;
              ExpressVPN is incorporated in the British Virgin Islands, which similarly
              has no mandatory data retention laws and is outside intelligence-sharing
              alliances. Both are strong choices from a jurisdiction standpoint.
            </p>
            <p className="text-gray-700">
              NordVPN&apos;s 2018 server breach (covered in our{' '}
              <Link href="/reviews/nordvpn" className="text-blue-600 underline hover:text-blue-800">
                full NordVPN review
              </Link>
              ) is a transparency mark against it. No equivalent incident is documented
              for ExpressVPN — though its ownership history raises different questions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              The Kape Technologies question
            </h2>
            <p className="mb-3 text-gray-700">
              In September 2021, Kape Technologies acquired ExpressVPN for $936 million.
              Kape was formerly known as Crossrider, a company that was associated with
              adware distribution. Kape has since rebranded and also owns CyberGhost and
              Private Internet Access. ExpressVPN now operates under the Kape umbrella.
            </p>
            <p className="mb-3 text-gray-700">
              The Kape acquisition does not appear to have resulted in any documented
              change to ExpressVPN&apos;s operational practices. The privacy policy has
              not materially changed. Independent audits have continued. However, the
              ownership by a company with an adware history is legitimately concerning
              for a product that handles sensitive traffic data. Users in high-risk
              categories should factor this in.
            </p>
            <p className="text-gray-700">
              NordVPN is owned by Nord Security, which also owns NordPass and Surfshark
              (since a 2022 merger). This consolidation in the VPN market raises
              concentration questions but does not carry the same specific baggage
              as Kape&apos;s Crossrider history.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Streaming and device limits
            </h2>
            <p className="mb-3 text-gray-700">
              Both NordVPN and ExpressVPN score 10/10 for streaming. Both reliably unblock
              Netflix US, BBC iPlayer, Disney+, Hulu, and most other major streaming
              platforms. This is an area of genuine parity — if streaming is your primary
              use case, the choice comes down to price.
            </p>
            <p className="text-gray-700">
              NordVPN allows 10 simultaneous connections (score 8/10); ExpressVPN allows
              8 (score 7/10). For households with multiple devices, NordVPN&apos;s extra
              connections are useful — though for total flexibility, Surfshark offers
              unlimited connections at a lower price.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Who should choose NordVPN vs ExpressVPN
            </h2>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Choose NordVPN if:</strong> you want a
              well-audited, fast VPN at a competitive price. The PwC audit, Panama
              jurisdiction, 10 device connections, and 8.05/10 score make it the better
              all-round choice for most users. The 2018 breach is a historical mark
              against it but the company&apos;s response has been substantive.
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Choose ExpressVPN if:</strong> you
              specifically need the fastest possible connection for activities where
              latency matters (gaming over VPN, 4K streaming on international servers,
              real-time applications), and price is not a constraint. For everything
              else, the 67% price premium does not buy enough to justify it.
            </p>
          </section>
        </article>

        {/* Verdict */}
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Verdict</h2>
            <p className="mb-6 text-gray-600">
              NordVPN scores <strong>8.05/10</strong> versus ExpressVPN&apos;s{' '}
              <strong>7.00/10</strong>. ExpressVPN is genuinely faster, but the Kape
              Technologies ownership, higher price, and marginally weaker audit
              credentials mean NordVPN is the better choice for almost everyone. Neither
              is our overall top VPN pick — that goes to ProtonVPN at 8.25/10.
            </p>
            <div className="flex flex-wrap gap-3">
              <AffiliateCTA
                product={nord.id}
                href={cta(nord)}
                label="Visit NordVPN"
                variant="primary"
              />
              <AffiliateCTA
                product={express.id}
                href={cta(express)}
                label="Visit ExpressVPN"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-5 text-xl font-bold text-gray-900">Related</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/reviews/nordvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              NordVPN full review →
            </Link>
            <Link href="/vpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              Full VPN comparison →
            </Link>
            <Link href="/reviews/best-vpn-lithuania"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              Best VPN for Lithuania →
            </Link>
            <Link href="/password-managers"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              Best password managers →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
