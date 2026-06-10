import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import type { Product, ScoringCriteria } from '@/lib/types';
import vpnsRaw from '@/data/vpns.json';
import criteriaRaw from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: 'NordVPN Review 2025 — Is It Still Worth It?',
  description:
    'Honest NordVPN review: the 2018 server breach, PricewaterhouseCoopers audit, Panama jurisdiction, and whether it beats ProtonVPN on value. Scored 8.05/10.',
};

const vpns = vpnsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria).vpn;
const product = vpns.find((p) => p.id === 'nordvpn')!;

const raw = affiliateLinks[product.id] ?? product.affiliateUrl;
const ctaUrl = buildAffiliateUrl(
  raw === 'PLACEHOLDER' ? product.website : raw,
  product.id,
  'vpn',
  'review'
);

export default function NordVpnReviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
              <span className="text-gray-900">NordVPN Review</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              NordVPN Review 2025 — Is It Still Worth It?
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              NordVPN is the most heavily marketed VPN in the world. That alone is reason
              to be sceptical. After reviewing the independent audit results, the 2018
              server breach, Panama&apos;s jurisdiction, and the current pricing, our score
              is <strong className="text-gray-900">8.05/10</strong> — strong, but not our
              top pick. ProtonVPN scores 8.25 and has a better transparency record.
            </p>

            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> This page contains an affiliate link to NordVPN.
              We earn a commission if you purchase. Our score is calculated from the same
              weighted criteria used across every VPN we compare.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">Full disclosure.</Link>
            </div>
          </div>
        </section>

        {/* Score breakdown */}
        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            How NordVPN scores
          </h2>
          <ScoreBreakdown product={product} criteria={criteria} />
        </section>

        {/* Main editorial */}
        <article className="mx-auto max-w-3xl px-4 pb-4">
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              The 2018 server breach — and the 16-month disclosure delay
            </h2>
            <p className="mb-3 text-gray-700">
              In 2018, a Finnish data centre that NordVPN used suffered a server
              compromise. An attacker gained root access via a remote management system
              that the data centre had installed without NordVPN&apos;s knowledge. The
              attacker could not decrypt any VPN traffic — NordVPN&apos;s no-logs
              architecture meant there was no session data to steal. One expired TLS key
              was exposed.
            </p>
            <p className="mb-3 text-gray-700">
              The problem was not the breach itself but the response. NordVPN discovered
              the incident in early 2018 and did not disclose it publicly until October
              2019 — 16 months later. The company says it delayed disclosure while
              conducting an internal audit of all its servers and ending contracts with
              data centres whose security practices were substandard. Whether that
              justifies the delay is a judgement call, but the lack of proactive
              disclosure is a legitimate mark against the company&apos;s transparency.
            </p>
            <p className="text-gray-700">
              Since then, NordVPN has launched a bug bounty programme through HackerOne,
              completed two independent infrastructure audits, and moved away from
              third-party data centres toward colocated servers it controls directly.
              These are meaningful improvements, which is why logging policy still scores
              8 rather than lower.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              The PricewaterhouseCoopers audit
            </h2>
            <p className="mb-3 text-gray-700">
              NordVPN commissioned PricewaterhouseCoopers Switzerland to conduct a
              no-logs audit in 2022. PwC reviewed NordVPN&apos;s logging infrastructure,
              configuration files, and operational procedures to verify that the
              no-logs claims in the privacy policy are matched by actual technical
              implementation. The audit covered NordVPN&apos;s servers and confirmed no
              user activity logs, connection timestamps, or IP addresses are retained.
            </p>
            <p className="mb-3 text-gray-700">
              Using a Big Four accounting firm for a technical audit is notable — most
              VPN providers use smaller specialist firms. PwC has a higher reputation to
              protect and deeper resources, which adds credibility. The limitations are
              the same as any point-in-time audit: it verifies that logging was not
              happening during the audit period, not that it has never happened or cannot
              be enabled in future.
            </p>
            <p className="text-gray-700">
              For comparison, Mullvad has been audited by Cure53 and has never had a
              server breach. ProtonVPN is open source and audited. NordVPN&apos;s audit
              is credible but its track record of transparency is weaker than those two.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Panama jurisdiction — what it actually means
            </h2>
            <p className="mb-3 text-gray-700">
              NordVPN is incorporated in Panama, which has no mandatory data retention
              laws and is outside the Five Eyes, Nine Eyes, and Fourteen Eyes
              intelligence-sharing alliances. This is a genuine structural advantage.
              A Panamanian court cannot compel NordVPN to hand over data that does not
              exist. Foreign courts (including US courts) would need to pursue mutual
              legal assistance treaty requests through Panama, which adds significant
              friction even if logs were retained.
            </p>
            <p className="text-gray-700">
              The practical implication: for the vast majority of users — people who
              want privacy from their ISP, advertiser tracking, or basic geographic
              restrictions — jurisdiction is largely academic. It matters most to
              journalists, activists, and users in hostile regulatory environments, for
              whom it can be decisive. For those users, Mullvad (Sweden) and ProtonVPN
              (Switzerland) have stronger reputations despite Sweden technically being
              in the EU.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Pricing and value
            </h2>
            <p className="mb-3 text-gray-700">
              NordVPN&apos;s standard pricing is $4.99/month on the two-year plan
              ($59.88/year billed upfront). The monthly rate without a long-term
              commitment is $12.99. Ten simultaneous device connections are included
              on all plans, and the service covers Windows, macOS, iOS, Android,
              Linux, and browser extensions.
            </p>
            <p className="text-gray-700">
              ExpressVPN charges roughly $8.32/month on an annual plan — 67% more than
              NordVPN — for a marginally faster connection and slightly weaker
              transparency credentials. Surfshark undercuts NordVPN on price with
              unlimited connections. For most users, NordVPN at $4.99/month represents
              good value against what it delivers, though ProtonVPN&apos;s free tier
              means you can test a genuinely trustworthy VPN at zero cost.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Who NordVPN is right for
            </h2>
            <p className="mb-3 text-gray-700">
              NordVPN is a good choice for mainstream users who want a well-supported,
              fast VPN with a credible audit record and a legitimate jurisdiction. It
              scores 10/10 for streaming — it reliably unblocks Netflix, BBC iPlayer,
              Disney+, and other major services — and 9/10 for speed, which makes it
              one of the most capable options for daily use.
            </p>
            <p className="text-gray-700">
              It is <em>not</em> the right choice if your primary concern is maximum
              transparency and audit trail. For that, ProtonVPN (open source, audited,
              Swiss jurisdiction) or Mullvad (no account, cash payments accepted, 10/10
              logging policy) are stronger. NordVPN sits in the pragmatic middle — solid
              enough for most people, not ideal for those with a genuine adversary.
            </p>
          </section>
        </article>

        {/* Verdict */}
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Verdict</h2>
            <p className="mb-6 text-gray-600">
              NordVPN scores <strong>8.05/10</strong> — good but not our top-ranked VPN.
              If you want the most popular option with a solid audit record and excellent
              streaming support, it delivers. If you want maximum privacy credibility,
              ProtonVPN (8.25/10) or Mullvad (7.30/10 overall, but 10/10 on logging
              policy) are better choices. NordVPN&apos;s pricing is competitive and its
              10 simultaneous connections make it practical for households.
            </p>
            <div className="flex flex-wrap gap-3">
              <AffiliateCTA
                product={product.id}
                href={ctaUrl}
                label="Visit NordVPN"
                variant="primary"
              />
              <AffiliateCTA
                product="protonvpn"
                href="/vpn"
                label="Compare all VPNs"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-5 text-xl font-bold text-gray-900">Related</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/reviews/nordvpn-vs-expressvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              NordVPN vs ExpressVPN →
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
