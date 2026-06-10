import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import ProductCard from '@/components/ProductCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
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
  return criteria.reduce((sum, c) => sum + ((p.scores[c.id] ?? 0) * c.weight) / 100, 0);
}

const ranked = [...products].sort((a, b) => weightedScore(b) - weightedScore(a));
const topPick = ranked[0];

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

export default function VPNPage() {
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
              <span className="text-gray-900">VPNs</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Best VPNs of 2026 — Ranked on Privacy, Not Popularity
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Most VPN comparison sites rank NordVPN, ExpressVPN, and Surfshark at the top.
              Those three also happen to pay the highest affiliate commissions in the industry.
              We think you deserve to know that upfront. Our rankings are calculated from
              documented criteria — privacy policy quality, independent audits, jurisdiction,
              price, and real user reliability based on hundreds of thousands of Play Store
              reviews. The results look a little different from what you&apos;ll find elsewhere.
            </p>

            <p className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> We may earn affiliate commissions for some products
              on this page. This does not affect our scores — they are calculated from the
              criteria below.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">Learn more.</Link>
            </p>

            <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-900">
              <p>
                <strong>What the most trusted independent source says:</strong>{' '}
                <a
                  href="https://www.privacyguides.org/en/vpn/"
                  className="underline hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Guides
                </a>
                {' '}— a non-profit with zero affiliate relationships — recommends only three
                VPNs: Proton, Mullvad, and IVPN. NordVPN, ExpressVPN, and Surfshark do not
                appear on their list. We include all five here because millions of people use
                them and they have legitimate use cases — but if pure privacy is your only
                concern, their reasoning is worth reading.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            VPN comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-gray-500">
            Scores are calculated from the criteria below. Scroll right on mobile.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="vpn" />
        </section>

        {/* Criteria explanation */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              How we score VPNs
            </h2>
            <p className="mb-8 text-gray-500">
              Every score is derived from the criteria below. Weights reflect what
              actually protects you — not what makes for a flashy spec sheet.
            </p>
            <div className="space-y-4">
              {criteria.map((c) => (
                <div key={c.id} className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                      {c.weight}% weight
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed product write-ups */}
        <article className="mx-auto max-w-3xl px-4 py-12 space-y-16">
          <h2 className="text-2xl font-bold text-gray-900">
            In-depth review: each VPN examined
          </h2>

          {/* 1. Mullvad */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">
              1. Mullvad — 9.0/10
            </h3>
            <p className="mt-1 text-gray-500 italic">The only VPN that doesn&apos;t want to know who you are</p>
            <p className="mt-4 text-gray-700">
              Mullvad doesn&apos;t ask for your email address when you sign up. You get a randomly
              generated account number — that&apos;s it. You can pay with cash sent by post,
              Monero, or Bitcoin. No personal information changes hands. This is not a marketing
              claim — it&apos;s how the product actually works, and it&apos;s the reason{' '}
              <a
                href="https://www.privacyguides.org/en/vpn/"
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Guides
              </a>{' '}
              recommends it above everything else in the category.
            </p>
            <p className="mt-3 text-gray-700">
              The pricing model is equally unusual. There are no subscription tiers, no annual
              plan pressure, no auto-renewal traps. You buy time — €5 per month, same price
              whether you buy one month or twelve. Several Play Store reviewers specifically
              praised this: &ldquo;It&rsquo;s not a subscription so you have to add time every time it
              expires. Makes me feel respected as a customer because they&rsquo;re not trying to
              bait me.&rdquo;
            </p>
            <p className="mt-3 text-gray-700">
              The honest downsides: Mullvad has no free tier, which makes it hard to try before
              paying. The Android app has occasional crash reports and some users on Google Pixel
              devices report the app disappearing from the background. With only 7,340 Play Store
              reviews compared to NordVPN&apos;s 1.28 million, it&apos;s a smaller user base —
              though that also means fewer people encountering edge case bugs.
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700">
              <p><strong>What it gets wrong:</strong> No free trial. Smaller server network
              (49 countries vs NordVPN&apos;s 111). Some banking apps block it.</p>
              <p className="mt-2"><strong>Best for:</strong> Anyone who takes privacy seriously
              and wants a VPN that genuinely has no incentive to keep data about them. Not ideal
              if you need streaming or a free tier to test first.</p>
              <p className="mt-2 text-gray-500">Play Store: 3.8 stars / 7,340 reviews ·
              Privacy Guides: Recommended ✓ · Affiliate programme: None — we link directly</p>
            </div>
            <div className="mt-4">
              <AffiliateCTA
                product="mullvad"
                href={productCta(ranked.find((p) => p.id === 'mullvad')!)}
                label="Visit Mullvad"
                variant="primary"
              />
            </div>
          </section>

          {/* 2. Proton VPN */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">
              2. Proton VPN — 8.8/10
            </h3>
            <p className="mt-1 text-gray-500 italic">Swiss-based, open source, free tier with no data limit</p>
            <p className="mt-4 text-gray-700">
              Proton VPN comes from the team behind ProtonMail — a company that built its
              reputation on taking privacy seriously in a jurisdiction (Switzerland) with strong
              legal protections against surveillance. Their apps are fully open source, meaning
              anyone can read the code and verify it does what it claims. They&apos;ve been
              independently audited multiple times, most recently in 2024 and 2025.
            </p>
            <p className="mt-3 text-gray-700">
              The free tier is genuinely useful — unlimited data, no ads, no speed throttling —
              which is rare. Most free VPNs either cap your data or sell it. The trade-off is
              that free users can&apos;t choose a specific server, which frustrates some reviewers:
              &ldquo;The fact it&rsquo;s so easy to connect and disconnect with no ads in between is
              unrivalled. The only downside is that you can&apos;t choose what country.&rdquo;
            </p>
            <p className="mt-3 text-gray-700">
              The most technically impressive feature is Secure Core — multi-hop routing that
              passes your traffic through multiple servers in privacy-friendly countries before
              it exits. As one reviewer explained: &ldquo;Breaking through one VPN, possible and not
              hard for some. Breaking through three of them? Good luck.&rdquo; No other major provider
              offers this on the free tier.
            </p>
            <p className="mt-3 text-gray-700">
              The reliability picture from Play Store reviews is mixed. A recurring complaint:
              the app stops connecting entirely and requires an uninstall and reinstall to fix —
              sometimes multiple times. Proton&apos;s support team is responsive in reviews but
              the fix is always the same (&ldquo;try switching protocols&rdquo;), which suggests an
              underlying stability issue they haven&apos;t fully resolved.
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700">
              <p><strong>What it gets wrong:</strong> Periodic connection failures requiring
              reinstall. Free users can&apos;t select server country. Netflix support is
              inconsistent on the free tier.</p>
              <p className="mt-2"><strong>Best for:</strong> Privacy-conscious users who want a
              free tier that doesn&apos;t monetise their data, or paid users who want Swiss
              jurisdiction and open source code.</p>
              <p className="mt-2 text-gray-500">Play Store: 4.7 stars / 1.02M reviews ·
              Privacy Guides: Recommended ✓</p>
            </div>
            <div className="mt-4">
              <AffiliateCTA
                product="protonvpn"
                href={productCta(ranked.find((p) => p.id === 'protonvpn')!)}
                label="Try Proton VPN"
                variant="primary"
              />
            </div>
          </section>

          {/* 3. Surfshark */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">
              3. Surfshark — 7.6/10
            </h3>
            <p className="mt-1 text-gray-500 italic">Unlimited devices, budget price — owned by Nord Security</p>
            <p className="mt-4 text-gray-700">
              Surfshark&apos;s main selling point is unlimited simultaneous connections at a price
              that undercuts most competitors. If you have a household of devices to cover,
              it&apos;s hard to beat on value. The app is consistently praised for clean design
              and ease of use — &ldquo;clean, easy to understand UI, no unnecessary clutter&rdquo; —
              and speeds are generally solid when the connection is stable.
            </p>
            <p className="mt-3 text-gray-700">
              The ownership situation is worth knowing: Surfshark merged with Nord Security in
              2022. That means NordVPN and Surfshark are now owned by the same parent company,
              despite being marketed as separate products. This isn&apos;t necessarily a problem,
              but it&apos;s relevant if you were considering running both for redundancy.
            </p>
            <p className="mt-3 text-gray-700">
              The Play Store review pattern tells a consistent story: the app works well when it
              works, but connection reliability has deteriorated noticeably in 2025–2026. Multiple
              reviewers describe slow connection times, servers that claim to connect but show
              incorrect locations, and a support response that defaults to &ldquo;try switching
              protocols&rdquo; without investigating the root cause. The billing complaints are also
              more numerous than competitors — several users report difficulty cancelling and
              unexpected charges after cancellation.
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700">
              <p><strong>What it gets wrong:</strong> Connection reliability has declined.
              Owned by same company as NordVPN. Cancellation complaints more frequent than
              competitors. Not on Privacy Guides list.</p>
              <p className="mt-2"><strong>Best for:</strong> Users who need to cover many
              devices cheaply and are comfortable troubleshooting occasional connection issues.</p>
              <p className="mt-2 text-gray-500">Play Store: 4.6 stars / 268K reviews ·
              Privacy Guides: Not recommended</p>
            </div>
            <div className="mt-4">
              <AffiliateCTA
                product="surfshark"
                href={productCta(ranked.find((p) => p.id === 'surfshark')!)}
                label="Try Surfshark"
                variant="primary"
              />
            </div>
          </section>

          {/* 4. NordVPN */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">
              4. <Link href="/reviews/nordvpn" className="text-blue-700 hover:underline">NordVPN</Link> — 7.4/10
            </h3>
            <p className="mt-1 text-gray-500 italic">The most recognised name in VPN — with a complicated history</p>
            <p className="mt-4 text-gray-700">
              NordVPN is the most searched VPN on Google and the most recommended on affiliate
              sites. With 1.28 million Play Store reviews and a 4.5 star average, it has the
              largest real-world user base of any VPN. For mainstream use — streaming, general
              privacy, travel — it works reliably for most people most of the time.
            </p>
            <p className="mt-3 text-gray-700">
              The thing most reviews don&apos;t mention: NordVPN suffered a server breach in 2018.
              A third-party data centre in Finland had unauthorised access to one server. Nord
              says no user data was compromised because of their no-logs policy, and they&apos;ve
              since moved to RAM-only servers. But the incident happened, and it took them over
              a year to disclose it publicly. This is worth knowing.
            </p>
            <p className="mt-3 text-gray-700">
              A Play Store reviewer with no stake in the outcome put it plainly: &ldquo;Not thrilled
              with ownership of the company, poses privacy concerns, but I have been happy with
              reliability and speed.&rdquo; That&apos;s a fair summary. The recent UI changes drew
              significant complaints — the disconnect button was buried inside a pause menu in
              an update, with one review getting 715 helpful votes: &ldquo;They have made it more
              difficult to disconnect from an active VPN by burying the disconnect button under
              the pause menu.&rdquo;
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700">
              <p><strong>What it gets wrong:</strong> 2018 breach and delayed disclosure.
              Recent UI changes frustrated long-term users. Not on Privacy Guides list.</p>
              <p className="mt-2"><strong>Best for:</strong> Users who want a mainstream,
              well-supported VPN with good streaming performance and don&apos;t need maximum
              privacy guarantees.</p>
              <p className="mt-2 text-gray-500">Play Store: 4.5 stars / 1.28M reviews ·
              Privacy Guides: Not recommended</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <AffiliateCTA
                product="nordvpn"
                href={productCta(ranked.find((p) => p.id === 'nordvpn')!)}
                label="Visit NordVPN"
                variant="primary"
              />
              <AffiliateCTA
                product="nordvpn"
                href="/reviews/nordvpn-vs-expressvpn"
                label="NordVPN vs ExpressVPN →"
                variant="secondary"
              />
            </div>
          </section>

          {/* 5. ExpressVPN */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">
              5. ExpressVPN — 6.2/10
            </h3>
            <p className="mt-1 text-gray-500 italic">Premium pricing, declining reliability, controversial ownership</p>
            <p className="mt-4 text-gray-700">
              ExpressVPN was considered the gold standard a few years ago. Long-term users
              consistently say it used to be excellent. The current picture from Play Store
              reviews is less encouraging — disconnection complaints dominate recent reviews,
              with multiple users describing the app as &ldquo;unusable&rdquo; after recent updates.
              &ldquo;This VPN went from being top tier to totally worthless&rdquo; is a representative
              recent review from someone who had used it for years.
            </p>
            <p className="mt-3 text-gray-700">
              The ownership issue is more significant than with Surfshark. ExpressVPN was
              acquired in 2021 by Kape Technologies, a company formerly known as Crossrider —
              which distributed adware before rebranding. Kape has since acquired several VPN
              providers and review sites simultaneously, raising questions about editorial
              independence in the VPN review space. This doesn&apos;t prove ExpressVPN has become
              less private, but it&apos;s a material fact that most comparison sites don&apos;t mention.
            </p>
            <p className="mt-3 text-gray-700">
              The pricing is the highest in this comparison — around $8–10/month on a monthly
              plan — which makes the current reliability issues harder to justify. One long-term
              user discovered they had been auto-renewed at the old higher price for six years
              without notification: &ldquo;I found that I have been paying almost $10/month for a
              yearly subscription when their current prices are much lower.&rdquo;
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700">
              <p><strong>What it gets wrong:</strong> Owned by Kape Technologies (formerly
              adware company). Highest price in category. Significant reliability decline
              in recent updates. Not on Privacy Guides list.</p>
              <p className="mt-2"><strong>Best for:</strong> Users with specific streaming
              needs — particularly from multiple regions — who were already on ExpressVPN and
              haven&apos;t experienced the reliability issues others report.</p>
              <p className="mt-2 text-gray-500">Play Store: 4.5 stars / 468K reviews ·
              Privacy Guides: Not recommended</p>
            </div>
            <div className="mt-4">
              <AffiliateCTA
                product="expressvpn"
                href={productCta(ranked.find((p) => p.id === 'expressvpn')!)}
                label="Visit ExpressVPN"
                variant="secondary"
              />
            </div>
          </section>
        </article>

        {/* Verdict */}
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Verdict</h2>
            <div className="space-y-4 mb-8">
              <div className="rounded-lg bg-white border border-gray-200 px-5 py-4">
                <p className="font-bold text-gray-900">
                  Winner: Mullvad — 9.0/10
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  If privacy is genuinely your reason for using a VPN, Mullvad is the honest
                  answer. No account, no email, no logs, independently audited, open source,
                  cash payment accepted. The lack of a free tier is the only real barrier.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 px-5 py-4">
                <p className="font-bold text-gray-900">Runner-up: Proton VPN — 8.8/10</p>
                <p className="mt-1 text-sm text-gray-600">
                  Swiss jurisdiction, open source, independently audited, and the only VPN on
                  this list with a genuinely free tier that doesn&apos;t monetise your data.
                  The occasional reinstall requirement is annoying but not a dealbreaker.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 px-5 py-4">
                <p className="font-bold text-gray-900">Budget pick: Surfshark — 7.6/10</p>
                <p className="mt-1 text-sm text-gray-600">
                  Unlimited devices at the lowest price. Works well for most users most of the
                  time. Know that it&apos;s owned by the same company as NordVPN, and be
                  prepared for occasional connection troubleshooting.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 px-5 py-4">
                <p className="font-bold text-gray-900">Mainstream pick: NordVPN — 7.4/10</p>
                <p className="mt-1 text-sm text-gray-600">
                  The safest choice if you want something your non-technical family members can
                  use without issues. Just know the 2018 breach history and what it means.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 px-5 py-4">
                <p className="font-bold text-gray-900">Skip: ExpressVPN — 6.2/10</p>
                <p className="mt-1 text-sm text-gray-600">
                  The price premium is no longer justified by the product. The ownership history
                  is concerning. There are better options at every price point.
                </p>
              </div>
            </div>
            <div className="mb-6">
              <ScoreBreakdown product={topPick} criteria={criteria} />
            </div>
            <AffiliateCTA
              product={topPick.id}
              href={productCta(topPick)}
              label={`Visit ${topPick.name}`}
              variant="primary"
            />
          </div>
        </section>

        {/* Quick reference — ProductCard grid */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Quick comparison
          </h2>
          <p className="mb-8 text-gray-500">
            Cards sorted by overall score. Each shows the key highlights and verdict.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((p) => (
              <ProductCard key={p.id} product={p} category="vpn" featured={p.id === topPick.id} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">Do I need a VPN?</h3>
                <p className="mt-2 text-sm text-gray-700">
                  It depends on your threat model. If you use public WiFi regularly, a VPN
                  prevents your ISP or network operator from seeing your traffic. If you&apos;re
                  at home on a trusted network, the privacy benefit is smaller. A VPN does not
                  make you anonymous — it moves trust from your ISP to the VPN provider.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Is a free VPN safe?</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Proton VPN&apos;s free tier is genuinely safe — they make money from paid
                  subscribers, not from selling free users&apos; data. Most other free VPNs
                  monetise through data collection. Avoid free VPNs from unknown providers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Does a VPN affect speed?</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Yes, always — your traffic takes a longer route. WireGuard protocol (supported
                  by all five VPNs here) minimises the impact. On a fast connection, most users
                  notice less than a 10–20% speed reduction.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Are VPNs legal in Lithuania?
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Yes. Lithuania has no VPN restrictions. Lithuanian data retention law (Law on
                  Electronic Communications) requires ISPs to retain metadata, which is one
                  legitimate reason to use a VPN domestically. See our guide to the{' '}
                  <Link href="/reviews/best-vpn-lithuania" className="text-blue-600 underline hover:text-blue-800">
                    best VPN for Lithuania
                  </Link>{' '}
                  for full details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Why isn&apos;t my VPN working with my banking app?
                </h3>
                <p className="mt-2 text-sm text-gray-700">
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
          <h2 className="mb-6 text-xl font-bold text-gray-900">Related comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/reviews/nordvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              NordVPN full review →
            </Link>
            <Link
              href="/reviews/nordvpn-vs-expressvpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              NordVPN vs ExpressVPN →
            </Link>
            <Link
              href="/reviews/best-vpn-lithuania"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best VPN for Lithuania →
            </Link>
            <Link
              href="/password-managers"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best password managers →
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Not sure which tool you need first?{' '}
            <Link href="/quiz" className="text-blue-600 underline hover:text-blue-800">
              Take our 30-second security quiz →
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
