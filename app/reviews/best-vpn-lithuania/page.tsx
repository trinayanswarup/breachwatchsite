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
  title: 'Best VPN for Lithuania 2025 — Jurisdiction, Law & Speed',
  description:
    'Lithuania is an EU member with data retention obligations on ISPs. We explain what that means, why jurisdiction matters, and which VPN is best for Lithuanian users.',
};

const vpns = vpnsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria).vpn;

function weightedScore(p: Product): number {
  return criteria.reduce((sum, c) => sum + ((p.scores[c.id] ?? 0) * c.weight) / 100, 0);
}

const ranked = [...vpns].sort((a, b) => weightedScore(b) - weightedScore(a));
const topPick = ranked[0];

const raw = affiliateLinks[topPick.id] ?? topPick.affiliateUrl;
const topPickUrl = buildAffiliateUrl(
  raw === 'PLACEHOLDER' ? topPick.website : raw,
  topPick.id,
  'vpn',
  'review-lithuania'
);

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best VPN for Lithuania 2025 — Jurisdiction, Data Law & Speed',
  url: `${SITE}/reviews/best-vpn-lithuania`,
  datePublished: '2025-01-01',
  dateModified: '2025-06-10',
  author: { '@type': 'Organization', name: 'BreachWatch', url: SITE },
  publisher: { '@type': 'Organization', name: 'BreachWatch', url: SITE },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/reviews/best-vpn-lithuania` },
  about: { '@type': 'Place', name: 'Lithuania', containedInPlace: { '@type': 'Country', name: 'Lithuania' } },
};

export default function BestVpnLithuaniaPage() {
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
              <span className="text-gray-900">Best VPN for Lithuania</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Best VPN for Lithuania 2025 — Jurisdiction, Data Law &amp; Speed
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Lithuania is an EU member state, which means its ISPs are subject to
              European data retention obligations. VPN use is completely legal, and
              a VPN is an effective privacy tool for Lithuanian users — but the
              jurisdiction of the VPN provider matters more than most comparison sites
              acknowledge. Our top pick is{' '}
              <strong className="text-gray-900">ProtonVPN</strong>: Swiss jurisdiction,
              open source, audited no-logs policy, and a free tier.
            </p>

            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> This page contains affiliate links. Recommendations
              are based on our scored methodology, not commercial relationships.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">Full disclosure.</Link>
            </div>
          </div>
        </section>

        {/* Editorial content */}
        <article className="mx-auto max-w-3xl px-4 py-10">
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Is using a VPN legal in Lithuania?
            </h2>
            <p className="mb-3 text-gray-700">
              Yes. VPN use is entirely legal in Lithuania. There are no laws prohibiting
              individuals or businesses from using VPN services to protect their internet
              traffic. The Lithuanian authorities and regulatory bodies (the RVOI —
              Lithuanian Communications Regulatory Authority) have not taken any action
              against VPN use, and there is no proposed legislation that would change
              this.
            </p>
            <p className="text-gray-700">
              Some countries — China, Russia, Belarus, UAE — actively restrict or
              prohibit VPN use. Lithuania is not in this category. You can install and
              use any VPN on this page without legal concern.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Lithuanian data retention law and what it means for you
            </h2>
            <p className="mb-3 text-gray-700">
              Lithuania, as an EU member state, implements the EU&apos;s electronic
              communications data retention framework. Lithuanian ISPs — Telia Lietuva,
              Tele2, Bite Lietuva — are required to retain connection metadata (IP
              addresses assigned, connection timestamps, volume of data transferred) for
              six months under the Lithuanian Law on Electronic Communications.
            </p>
            <p className="mb-3 text-gray-700">
              This data can be accessed by law enforcement agencies with a court order.
              The retained data does not include the content of communications — only
              metadata. However, metadata is sufficient to establish that you connected
              to a particular service at a particular time, which can be meaningful in
              certain contexts.
            </p>
            <p className="mb-3 text-gray-700">
              A VPN obscures this metadata at the ISP level. Your ISP sees an encrypted
              connection to the VPN server&apos;s IP address. They cannot see which
              websites you visit or services you use. This is the primary privacy benefit
              of a VPN for Lithuanian users.
            </p>
            <p className="text-gray-700">
              The limitation is that the VPN provider itself then has access to your
              real IP address and connection times. This is why the VPN&apos;s own
              jurisdiction and no-logs policy matter — you are shifting trust from your
              ISP to your VPN provider.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Why VPN jurisdiction matters more than you might think
            </h2>
            <p className="mb-3 text-gray-700">
              When a Lithuanian court or law enforcement agency wants to obtain data from
              a company, they can serve a court order on companies operating within the
              EU. A VPN provider incorporated in Germany, the Netherlands, or Sweden is
              subject to EU court orders and can be compelled to produce data — even if
              the data relates to a Lithuanian user.
            </p>
            <p className="mb-3 text-gray-700">
              A VPN incorporated outside the EU (Panama, Switzerland, British Virgin
              Islands) requires a much more complex legal process — a Mutual Legal
              Assistance Treaty (MLAT) request — to produce data. These requests are
              slow, rare, and require dual criminality (the activity must be a crime in
              both Lithuania and the VPN&apos;s jurisdiction). For the overwhelming
              majority of users, this distinction is academic. But for journalists,
              political activists, or users in sensitive professional contexts, it can
              be decisive.
            </p>
            <p className="text-gray-700">
              Switzerland is not an EU member and has some of the strongest privacy laws
              in the world, making ProtonVPN (Swiss) a strong choice for Lithuanian
              users. NordVPN (Panama) and Mullvad (Sweden — EU, but with an excellent
              no-logs track record) are also credible options.
            </p>
          </section>
        </article>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            VPN comparison for Lithuanian users
          </h2>
          <p className="mb-6 text-gray-500">
            All five VPNs work from Lithuania. Sorted by overall score. Jurisdiction
            carries 20% of the score — a key criterion for EU users.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="vpn" />
        </section>

        {/* Top picks editorial */}
        <article className="mx-auto max-w-3xl px-4 pb-4">
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Top VPN picks for Lithuanian users
            </h2>

            <h3 className="mb-2 text-base font-bold text-gray-900">
              1. ProtonVPN — best overall (8.25/10)
            </h3>
            <p className="mb-4 text-gray-700">
              ProtonVPN is headquartered in Geneva, Switzerland — outside the EU and
              not subject to EU court orders. Its clients are fully open source and have
              been independently audited by SEC Consult. The no-logs policy has been
              verified. For Lithuanian users who want the strongest possible privacy
              posture, ProtonVPN&apos;s Swiss jurisdiction combined with open source
              transparency is the best available combination. There is also a free tier
              with no data limits, making it the only credible free option on this list.
            </p>

            <h3 className="mb-2 text-base font-bold text-gray-900">
              2. NordVPN — best for streaming and speed (8.05/10)
            </h3>
            <p className="mb-4 text-gray-700">
              NordVPN is incorporated in Panama — outside the EU and not subject to
              Lithuanian court orders without a complex MLAT process. It has an audited
              no-logs policy (PwC, 2022), scores 10/10 for streaming support, and
              maintains servers in Latvia and Poland that are geographically close to
              Lithuania and typically provide fast connections. The 2018 server breach
              is a historical concern, but subsequent security improvements have been
              meaningful. NordVPN is the best choice for Lithuanian users who prioritise
              streaming or speed alongside privacy.
            </p>

            <h3 className="mb-2 text-base font-bold text-gray-900">
              3. Mullvad — best for anonymity (7.30/10)
            </h3>
            <p className="mb-4 text-gray-700">
              Mullvad is headquartered in Sweden, which is an EU member state. This
              means it is technically subject to EU court processes, unlike ProtonVPN
              and NordVPN. However, Mullvad scores 10/10 on logging policy — it requires
              no email, no account name, and accepts cash and Monero payments. In 2023,
              Swedish police raided Mullvad&apos;s offices and found nothing, because
              there is nothing to find. For Lithuanian users whose primary concern is
              anonymity rather than jurisdiction, Mullvad is the most credible option.
              Its streaming scores are low (3/10), so it is not suitable for accessing
              geo-restricted content.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Server speeds from Lithuania
            </h2>
            <p className="mb-3 text-gray-700">
              Lithuania is in north-eastern Europe. The nearest major server hubs are
              Riga (Latvia), Tallinn (Estonia), Warsaw (Poland), and Helsinki (Finland).
              All five VPNs in our comparison have servers in at least two of these
              cities, which means latency from a Lithuanian connection is typically
              under 30ms — fast enough for video calls, streaming, and gaming.
            </p>
            <p className="mb-3 text-gray-700">
              ExpressVPN scores highest on raw speed (10/10 using the Lightway protocol)
              but its cost is significantly higher and it carries the Kape Technologies
              ownership concern. NordVPN (NordLynx/WireGuard) and ProtonVPN (WireGuard)
              both deliver excellent speeds that are more than adequate for Lithuanian
              users in practice.
            </p>
            <p className="text-gray-700">
              Mullvad operates servers in Riga and Warsaw and connects reliably from
              Lithuanian ISPs. Surfshark has servers in Vilnius itself, which is useful
              for Lithuanian users who want a local IP address.
            </p>
          </section>
        </article>

        {/* Verdict */}
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Our recommendation for Lithuanian users
            </h2>
            <p className="mb-6 text-gray-600">
              <strong className="text-gray-900">ProtonVPN</strong> is the best VPN for
              Lithuanian users: Swiss jurisdiction puts it outside EU court reach, open
              source code means anyone can verify the no-logs claim, and a free tier
              means you can test it at zero cost. For streaming and household coverage,
              NordVPN is the better practical choice. For maximum anonymity, Mullvad.
            </p>
            <div className="flex flex-wrap gap-3">
              <AffiliateCTA
                product={topPick.id}
                href={topPickUrl}
                label={`Try ${topPick.name}`}
                variant="primary"
              />
              <AffiliateCTA
                product="nordvpn"
                href="/vpn"
                label="Compare all VPNs"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-5 text-xl font-bold text-gray-900">Related</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/vpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              Full VPN comparison →
            </Link>
            <Link href="/reviews/nordvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              NordVPN full review →
            </Link>
            <Link href="/reviews/nordvpn-vs-expressvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              NordVPN vs ExpressVPN →
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
