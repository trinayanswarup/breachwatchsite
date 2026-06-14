import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import RankedCard from '@/components/RankedCard';
import ProductCTA from '@/components/ProductCTA';
import CategoryShortlist from '@/components/CategoryShortlist';
import FreshnessNote from '@/components/FreshnessNote';
import EvidencePanel from '@/components/EvidencePanel';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import { calculateWeightedScore, formatScore, sortProductsByScore } from '@/lib/scoring';
import type { Product, ScoringCriteria } from '@/lib/types';
import vpnsRaw from '@/data/vpns.json';
import criteriaRaw from '@/data/scoring-criteria.json';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Best VPNs of 2026 — Ranked on Privacy, Not Popularity | BreachWatch',
  description:
    'We compared 5 VPNs using real user reviews and independent privacy audits — not marketing claims. Spoiler: the most advertised ones aren\'t always the best.',
};

const products = vpnsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria).vpn;

function weightedScore(p: Product): number {
  return calculateWeightedScore(p, criteria);
}

const ranked = sortProductsByScore(products, criteria);
const mullvadPick = ranked.find((p) => p.id === 'mullvad') ?? ranked[0];
const protonVpnPick = ranked.find((p) => p.id === 'protonvpn') ?? ranked[1];
const surfsharkPick = ranked.find((p) => p.id === 'surfshark') ?? ranked[2];
const nordVpnPick = ranked.find((p) => p.id === 'nordvpn') ?? ranked[3];
const expressVpnPick = ranked.find((p) => p.id === 'expressvpn') ?? ranked[4];
const shortlist = [
  { name: 'NordVPN', label: 'best VPN for streaming overall', href: '/reviews/nordvpn' },
  { name: 'Proton VPN', label: 'best free VPN with reliable privacy features', href: '#protonvpn' },
  { name: 'Surfshark', label: 'affordable VPN for unlimited devices', href: '#surfshark' },
  { name: 'Mullvad', label: 'best VPN for maximum privacy', href: '#mullvad' },
  { name: 'ExpressVPN', label: 'premium VPN for geo-unblocking', href: '#expressvpn' },
];

function productCta(p: Product): string {
  const raw = affiliateLinks[p.id] ?? p.affiliateUrl;
  return buildAffiliateUrl(
    raw === 'PLACEHOLDER' ? p.website : raw,
    p.id,
    'vpn',
    'category'
  );
}

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best VPNs of 2026 — Ranked on Privacy, Not Popularity',
  url: `${SITE}/vpn`,
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

const VPN_BULLETS: Record<string, { pros: string[]; cons: string[] }> = {
  mullvad: {
    pros: [
      'No account required — signup gives you a random number, nothing else',
      'Pay with cash, Monero, or Bitcoin — no personal information changes hands',
      'Open source, audited by Cure53 · Privacy Guides: Recommended',
    ],
    cons: ['No free tier · 49 countries (vs NordVPN\'s 111) · Some banking apps block it'],
  },
  protonvpn: {
    pros: [
      'Switzerland jurisdiction — outside EU data retention laws and 14 Eyes',
      'Fully open source · Independently audited in 2024 and 2025',
      'Genuine free tier — unlimited data, no ads, no data sold',
    ],
    cons: ['Periodic connection failures requiring reinstall on some platforms'],
  },
  surfshark: {
    pros: [
      'Unlimited simultaneous connections — cover every device in your household',
      'Independent no-logs audit by Deloitte (2023)',
    ],
    cons: [
      'Same parent company as NordVPN — not truly independent competition',
      'Connection reliability has declined noticeably in 2025–2026',
    ],
  },
  nordvpn: {
    pros: [
      '4.5 stars from 1.28 million Play Store reviews — strongest reliability signal',
      'PwC audit (2022) confirmed no-logs policy',
      '6,300+ servers in 111 countries',
    ],
    cons: [
      '2018 server breach disclosed late · Dutch parent despite Panama registration',
      'Heavy marketing presence can skew third-party reviews',
    ],
  },
  expressvpn: {
    pros: ['Fastest speeds tested · Works with most streaming services'],
    cons: [
      'Acquired by Kape Technologies in 2021 (formerly Crossrider, an adware company)',
      'Most expensive option · Reliability has declined significantly',
    ],
  },
};

export default function VPNPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={pageSchema} />
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-5 pt-14 pb-10 text-center">
          <div className="mx-auto max-w-[680px]">
            <h1 className="text-[32px] font-bold leading-tight text-bw-black">
              Best VPNs of 2026 — Ranked on Privacy, Not Popularity
            </h1>
            <p className="mt-3.5 text-[15px] text-bw-gray leading-relaxed max-w-[500px] mx-auto">
              Most comparison sites rank NordVPN and ExpressVPN first because they are the
              biggest consumer VPN brands. Our scores use documented criteria: logging policy,
              jurisdiction, audits, price, and reliability.
            </p>
            <FreshnessNote>
              Scores reflect published no-logs claims, audits, jurisdiction, pricing, and reliability signals checked in June 2026.
            </FreshnessNote>
            <EvidencePanel category="vpn" />
            <Link
              href="/quiz"
              className="mt-6 inline-flex items-center gap-2 bg-bw-blue text-white px-7 py-3 rounded-[3px] text-[15px] font-semibold hover:bg-bw-blue-dark transition-colors"
            >
              Take the 30-second quiz →
            </Link>
          </div>
        </section>

        <CategoryShortlist
          title="Recommended VPNs - shortlist"
          description="Start here if you want the fast answer before reading the full breakdown."
          items={shortlist}
        />

        <section className="border-t border-black/10 bg-bw-light px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-bw-black">Why a VPN matters</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-bw-text">
              <p>
                A VPN protects traffic between your device and the VPN provider, which is
                most useful on public WiFi, hotel networks, airports, and any network you
                do not control. It can also reduce how much your internet provider sees
                about your browsing.
              </p>
              <p>
                A VPN does not make you anonymous. It moves trust from your ISP or network
                operator to the VPN company. That is why logging policy, jurisdiction,
                audits, and ownership matter more than ad claims about speed.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-bw-black">
            VPN comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-bw-gray">
            Scores are calculated from the criteria below. Scroll right on mobile.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="vpn" />
        </section>

        {/* Detailed product write-ups */}
        <article className="mx-auto max-w-3xl px-4 py-12 space-y-16">
          <h2 className="text-2xl font-bold text-bw-black">
            In-depth review: each VPN examined
          </h2>

          {/* 1. Mullvad */}
          <section id="mullvad">
            <h3 className="text-xl font-bold text-bw-black">
              1. Mullvad — {formatScore(weightedScore(mullvadPick))}/10
            </h3>
            <p className="mt-1 text-bw-gray italic">The only VPN that doesn&apos;t want to know who you are</p>
            <p className="mt-4 text-bw-text">
              Mullvad doesn&apos;t ask for your email address when you sign up. You get a randomly
              generated account number — that&apos;s it. You can pay with cash sent by post,
              Monero, or Bitcoin. No personal information changes hands. This is not a marketing
              claim — it&apos;s how the product actually works, and it&apos;s the reason{' '}
              <a
                href="https://www.privacyguides.org/en/vpn/"
                className="text-bw-blue underline hover:text-bw-blue-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Guides
              </a>{' '}
              recommends it above everything else in the category.
            </p>
            <p className="mt-3 text-bw-text">
              The pricing model is equally unusual. There are no subscription tiers, no annual
              plan pressure, no auto-renewal traps. You buy time — €5 per month, same price
              whether you buy one month or twelve. Several Play Store reviewers specifically
              praised this: &ldquo;It&rsquo;s not a subscription so you have to add time every time it
              expires. Makes me feel respected as a customer because they&rsquo;re not trying to
              bait me.&rdquo;
            </p>
            <p className="mt-3 text-bw-text">
              The honest downsides: Mullvad has no free tier, which makes it hard to try before
              paying. The Android app has occasional crash reports and some users on Google Pixel
              devices report the app disappearing from the background. With only 7,340 Play Store
              reviews compared to NordVPN&apos;s 1.28 million, it&apos;s a smaller user base —
              though that also means fewer people encountering edge case bugs.
            </p>
            <div className="mt-4 rounded-[3px] bg-bw-light border border-black/10 px-4 py-3 text-sm text-bw-text">
              <p><strong>What it gets wrong:</strong> No free trial. Smaller server network
              (49 countries vs NordVPN&apos;s 111). Some banking apps block it.</p>
              <p className="mt-2"><strong>Best for:</strong> Anyone who takes privacy seriously
              and wants a VPN that genuinely has no incentive to keep data about them. Not ideal
              if you need streaming or a free tier to test first.</p>
              <p className="mt-2 text-bw-gray">Play Store: 3.8 stars / 7,340 reviews ·
              Privacy Guides: Recommended - Link type: Direct official website</p>
            </div>
            <div className="mt-4">
              <ProductCTA
                product="mullvad"
                href={productCta(ranked.find((p) => p.id === 'mullvad')!)}
                label="Visit Mullvad"
                variant="primary"
              />
            </div>
          </section>

          {/* 2. Proton VPN */}
          <section id="protonvpn">
            <h3 className="text-xl font-bold text-bw-black">
              2. Proton VPN — {formatScore(weightedScore(protonVpnPick))}/10
            </h3>
            <p className="mt-1 text-bw-gray italic">Swiss-based, open source, free tier with no data limit</p>
            <p className="mt-4 text-bw-text">
              Proton VPN comes from the team behind ProtonMail — a company that built its
              reputation on taking privacy seriously in a jurisdiction (Switzerland) with strong
              legal protections against surveillance. Their apps are fully open source, meaning
              anyone can read the code and verify it does what it claims. They&apos;ve been
              independently audited multiple times, most recently in 2024 and 2025.
            </p>
            <p className="mt-3 text-bw-text">
              The free tier is genuinely useful — unlimited data, no ads, no speed throttling —
              which is rare. Most free VPNs either cap your data or sell it. The trade-off is
              that free users can&apos;t choose a specific server, which frustrates some reviewers:
              &ldquo;The fact it&rsquo;s so easy to connect and disconnect with no ads in between is
              unrivalled. The only downside is that you can&apos;t choose what country.&rdquo;
            </p>
            <p className="mt-3 text-bw-text">
              The most technically impressive feature is Secure Core — multi-hop routing that
              passes your traffic through multiple servers in privacy-friendly countries before
              it exits. As one reviewer explained: &ldquo;Breaking through one VPN, possible and not
              hard for some. Breaking through three of them? Good luck.&rdquo; No other major provider
              offers this on the free tier.
            </p>
            <p className="mt-3 text-bw-text">
              The reliability picture from Play Store reviews is mixed. A recurring complaint:
              the app stops connecting entirely and requires an uninstall and reinstall to fix —
              sometimes multiple times. Proton&apos;s support team is responsive in reviews but
              the fix is always the same (&ldquo;try switching protocols&rdquo;), which suggests an
              underlying stability issue they haven&apos;t fully resolved.
            </p>
            <div className="mt-4 rounded-[3px] bg-bw-light border border-black/10 px-4 py-3 text-sm text-bw-text">
              <p><strong>What it gets wrong:</strong> Periodic connection failures requiring
              reinstall. Free users can&apos;t select server country. Netflix support is
              inconsistent on the free tier.</p>
              <p className="mt-2"><strong>Best for:</strong> Privacy-conscious users who want a
              free tier that doesn&apos;t monetise their data, or paid users who want Swiss
              jurisdiction and open source code.</p>
              <p className="mt-2 text-bw-gray">Play Store: 4.7 stars / 1.02M reviews ·
              Privacy Guides: Recommended ✓</p>
            </div>
            <div className="mt-4">
              <ProductCTA
                product="protonvpn"
                href={productCta(ranked.find((p) => p.id === 'protonvpn')!)}
                label="Try Proton VPN"
                variant="primary"
              />
            </div>
          </section>

          {/* 3. Surfshark */}
          <section id="surfshark">
            <h3 className="text-xl font-bold text-bw-black">
              3. Surfshark — {formatScore(weightedScore(surfsharkPick))}/10
            </h3>
            <p className="mt-1 text-bw-gray italic">Unlimited devices, budget price — owned by Nord Security</p>
            <p className="mt-4 text-bw-text">
              Surfshark&apos;s main selling point is unlimited simultaneous connections at a price
              that undercuts most competitors. If you have a household of devices to cover,
              it&apos;s hard to beat on value. The app is consistently praised for clean design
              and ease of use — &ldquo;clean, easy to understand UI, no unnecessary clutter&rdquo; —
              and speeds are generally solid when the connection is stable.
            </p>
            <p className="mt-3 text-bw-text">
              The ownership situation is worth knowing: Surfshark merged with Nord Security in
              2022. That means NordVPN and Surfshark are now owned by the same parent company,
              despite being marketed as separate products. This isn&apos;t necessarily a problem,
              but it&apos;s relevant if you were considering running both for redundancy.
            </p>
            <p className="mt-3 text-bw-text">
              The Play Store review pattern tells a consistent story: the app works well when it
              works, but connection reliability has deteriorated noticeably in 2025–2026. Multiple
              reviewers describe slow connection times, servers that claim to connect but show
              incorrect locations, and a support response that defaults to &ldquo;try switching
              protocols&rdquo; without investigating the root cause. The billing complaints are also
              more numerous than competitors — several users report difficulty cancelling and
              unexpected charges after cancellation.
            </p>
            <div className="mt-4 rounded-[3px] bg-bw-light border border-black/10 px-4 py-3 text-sm text-bw-text">
              <p><strong>What it gets wrong:</strong> Connection reliability has declined.
              Owned by same company as NordVPN. Cancellation complaints more frequent than
              competitors. Not on Privacy Guides list.</p>
              <p className="mt-2"><strong>Best for:</strong> Users who need to cover many
              devices cheaply and are comfortable troubleshooting occasional connection issues.</p>
              <p className="mt-2 text-bw-gray">Play Store: 4.6 stars / 268K reviews ·
              Privacy Guides: Not recommended</p>
            </div>
            <div className="mt-4">
              <ProductCTA
                product="surfshark"
                href={productCta(ranked.find((p) => p.id === 'surfshark')!)}
                label="Try Surfshark"
                variant="primary"
              />
            </div>
          </section>

          {/* 4. NordVPN */}
          <section id="nordvpn">
            <h3 className="text-xl font-bold text-bw-black">
              4. <Link href="/reviews/nordvpn" className="text-bw-blue hover:underline">NordVPN</Link> — {formatScore(weightedScore(nordVpnPick))}/10
            </h3>
            <p className="mt-1 text-bw-gray italic">The most recognised name in VPN — with a complicated history</p>
            <p className="mt-4 text-bw-text">
              NordVPN is the most searched VPN on Google and the most recommended on commercial
              sites. With 1.28 million Play Store reviews and a 4.5 star average, it has the
              largest real-world user base of any VPN. For mainstream use — streaming, general
              privacy, travel — it works reliably for most people most of the time.
            </p>
            <p className="mt-3 text-bw-text">
              The thing most reviews don&apos;t mention: NordVPN suffered a server breach in 2018.
              A third-party data centre in Finland had unauthorised access to one server. Nord
              says no user data was compromised because of their no-logs policy, and they&apos;ve
              since moved to RAM-only servers. But the incident happened, and it took them over
              a year to disclose it publicly. This is worth knowing.
            </p>
            <p className="mt-3 text-bw-text">
              A Play Store reviewer with no stake in the outcome put it plainly: &ldquo;Not thrilled
              with ownership of the company, poses privacy concerns, but I have been happy with
              reliability and speed.&rdquo; That&apos;s a fair summary. The recent UI changes drew
              significant complaints — the disconnect button was buried inside a pause menu in
              an update, with one review getting 715 helpful votes: &ldquo;They have made it more
              difficult to disconnect from an active VPN by burying the disconnect button under
              the pause menu.&rdquo;
            </p>
            <div className="mt-4 rounded-[3px] bg-bw-light border border-black/10 px-4 py-3 text-sm text-bw-text">
              <p><strong>What it gets wrong:</strong> 2018 breach and delayed disclosure.
              Recent UI changes frustrated long-term users. Not on Privacy Guides list.</p>
              <p className="mt-2"><strong>Best for:</strong> Users who want a mainstream,
              well-supported VPN with good streaming performance and don&apos;t need maximum
              privacy guarantees.</p>
              <p className="mt-2 text-bw-gray">Play Store: 4.5 stars / 1.28M reviews ·
              Privacy Guides: Not recommended</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <ProductCTA
                product="nordvpn"
                href={productCta(ranked.find((p) => p.id === 'nordvpn')!)}
                label="Visit NordVPN"
                variant="primary"
              />
              <ProductCTA
                product="nordvpn"
                href="/reviews/nordvpn-vs-expressvpn"
                label="NordVPN vs ExpressVPN →"
                variant="secondary"
              />
            </div>
          </section>

          {/* 5. ExpressVPN */}
          <section id="expressvpn">
            <h3 className="text-xl font-bold text-bw-black">
              5. ExpressVPN — {formatScore(weightedScore(expressVpnPick))}/10
            </h3>
            <p className="mt-1 text-bw-gray italic">Premium pricing, declining reliability, controversial ownership</p>
            <p className="mt-4 text-bw-text">
              ExpressVPN was considered the gold standard a few years ago. Long-term users
              consistently say it used to be excellent. The current picture from Play Store
              reviews is less encouraging — disconnection complaints dominate recent reviews,
              with multiple users describing the app as &ldquo;unusable&rdquo; after recent updates.
              &ldquo;This VPN went from being top tier to totally worthless&rdquo; is a representative
              recent review from someone who had used it for years.
            </p>
            <p className="mt-3 text-bw-text">
              The ownership issue is more significant than with Surfshark. ExpressVPN was
              acquired in 2021 by Kape Technologies, a company formerly known as Crossrider —
              which distributed adware before rebranding. Kape has since acquired several VPN
              providers and review sites simultaneously, raising questions about editorial
              independence in the VPN review space. This doesn&apos;t prove ExpressVPN has become
              less private, but it&apos;s a material fact that most comparison sites don&apos;t mention.
            </p>
            <p className="mt-3 text-bw-text">
              The pricing is the highest in this comparison — around $8–10/month on a monthly
              plan — which makes the current reliability issues harder to justify. One long-term
              user discovered they had been auto-renewed at the old higher price for six years
              without notification: &ldquo;I found that I have been paying almost $10/month for a
              yearly subscription when their current prices are much lower.&rdquo;
            </p>
            <div className="mt-4 rounded-[3px] bg-bw-light border border-black/10 px-4 py-3 text-sm text-bw-text">
              <p><strong>What it gets wrong:</strong> Owned by Kape Technologies (formerly
              adware company). Highest price in category. Significant reliability decline
              in recent updates. Not on Privacy Guides list.</p>
              <p className="mt-2"><strong>Best for:</strong> Users with specific streaming
              needs — particularly from multiple regions — who were already on ExpressVPN and
              haven&apos;t experienced the reliability issues others report.</p>
              <p className="mt-2 text-bw-gray">Play Store: 4.5 stars / 468K reviews ·
              Privacy Guides: Not recommended</p>
            </div>
            <div className="mt-4">
              <ProductCTA
                product="expressvpn"
                href={productCta(ranked.find((p) => p.id === 'expressvpn')!)}
                label="Visit ExpressVPN"
                variant="secondary"
              />
            </div>
          </section>
        </article>

        {/* Ranked comparison */}
        <section className="mx-auto max-w-[760px] px-5 pb-10">
          <div className="flex items-end gap-3 border-b-2 border-bw-blue pb-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-gray">
              5 VPNs compared · Updated Jun 2026 · Methodology published
            </span>
          </div>
          {ranked.map((p, i) => {
            const bullets = VPN_BULLETS[p.id] ?? { pros: p.highlights, cons: [] };
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
                linkNote={p.id === 'mullvad' ? 'Direct official link' : undefined}
              />
            );
          })}
          <p className="text-[11px] text-bw-gray text-center pt-3 border-t border-black/10 leading-relaxed">
            Scores calculated from{' '}
            <Link href="/how-we-test" className="text-bw-blue underline">published criteria</Link>.
            {' '}BreachWatch uses direct product links, not affiliate links.
            Rankings are based on published criteria.{' '}
            <Link href="/disclosure" className="text-bw-blue underline">Learn more -&gt;</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-bw-black">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-bw-black">Do I need a VPN?</h3>
                <p className="mt-2 text-sm text-bw-text">
                  It depends on your threat model. If you use public WiFi regularly, a VPN
                  prevents your ISP or network operator from seeing your traffic. If you&apos;re
                  at home on a trusted network, the privacy benefit is smaller. A VPN does not
                  make you anonymous — it moves trust from your ISP to the VPN provider.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-bw-black">Is a free VPN safe?</h3>
                <p className="mt-2 text-sm text-bw-text">
                  Proton VPN&apos;s free tier is genuinely safe — they make money from paid
                  subscribers, not from selling free users&apos; data. Most other free VPNs
                  monetise through data collection. Avoid free VPNs from unknown providers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-bw-black">Does a VPN affect speed?</h3>
                <p className="mt-2 text-sm text-bw-text">
                  Yes, always — your traffic takes a longer route. WireGuard protocol (supported
                  by all five VPNs here) minimises the impact. On a fast connection, most users
                  notice less than a 10–20% speed reduction.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-bw-black">
                  Are VPNs legal in Lithuania?
                </h3>
                <p className="mt-2 text-sm text-bw-text">
                  Yes. Lithuania has no VPN restrictions. Lithuanian data retention law (Law on
                  Electronic Communications) requires ISPs to retain metadata, which is one
                  legitimate reason to use a VPN domestically. See our guide to the{' '}
                  <Link href="/reviews/best-vpn-lithuania" className="text-bw-blue underline hover:text-bw-blue-dark">
                    best VPN for Lithuania
                  </Link>{' '}
                  for full details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-bw-black">
                  Why isn&apos;t my VPN working with my banking app?
                </h3>
                <p className="mt-2 text-sm text-bw-text">
                  Banks sometimes block VPN IP addresses as a fraud prevention measure. The fix
                  is to use split tunnelling — most VPNs let you exclude specific apps from the
                  VPN tunnel while keeping everything else protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-bw-black">Related VPN comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/reviews/nordvpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              NordVPN full review -&gt;
            </Link>
            <Link
              href="/reviews/nordvpn-vs-expressvpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              NordVPN vs ExpressVPN -&gt;
            </Link>
            <Link
              href="/comparisons/mullvad-vs-protonvpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Mullvad vs Proton VPN - privacy picks -&gt;
            </Link>
            <Link
              href="/comparisons/surfshark-vs-nordvpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Surfshark vs NordVPN - budget vs mainstream -&gt;
            </Link>
            <Link
              href="/comparisons/expressvpn-vs-vpn-alternatives"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              ExpressVPN vs the field - when to skip it -&gt;
            </Link>
            <Link
              href="/reviews/best-vpn-lithuania"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best VPN for Lithuania -&gt;
            </Link>
            <Link
              href="/password-managers"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best password managers -&gt;
            </Link>
            <Link
              href="/breach-checker"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Check if a password was leaked -&gt;
            </Link>
          </div>
          <p className="mt-8 text-sm text-bw-gray">
            Not sure which tool you need first?{' '}
            <Link href="/quiz" className="text-bw-blue underline hover:text-bw-blue-dark">
              Take the 30-second security quiz -&gt;
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}





