import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import ProductCard from '@/components/ProductCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import AffiliateCTA from '@/components/AffiliateCTA';
import JsonLd from '@/components/JsonLd';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import type { Product, ScoringCriteria } from '@/lib/types';
import productsRaw from '@/data/antivirus.json';
import criteriaRaw from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: 'Best Antivirus Software 2026 — Ranked on AV-TEST Detection Data',
  description:
    'We ranked antivirus software using AV-TEST independent lab scores — not marketing claims. Includes the honest answer about whether you actually need third-party antivirus.',
};

const products = productsRaw as unknown as Product[];
const criteria = (criteriaRaw as unknown as ScoringCriteria).antivirus;

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
    'antivirus',
    'category'
  );
}

const esetPick = ranked.find(p => p.id === 'eset') ?? topPick;
const bitdefenderPick = ranked.find(p => p.id === 'bitdefender') ?? topPick;
const malwarebytesPick = ranked.find(p => p.id === 'malwarebytes') ?? topPick;
const nortonPick = ranked.find(p => p.id === 'norton') ?? topPick;

const SITE = 'https://breachwatchsite.com';
const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Antivirus Software 2026 — Ranked on AV-TEST Detection Data',
  url: `${SITE}/antivirus`,
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

export default function AntivirusPage() {
  const topPickHref = productCta(topPick);

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
              <span className="text-gray-900">Antivirus</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Best Antivirus Software 2026 — What the Independent Tests Actually Show
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Before the rankings: most antivirus comparison sites won&apos;t tell you that{' '}
              <a
                href="https://www.privacyguides.org"
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Guides
              </a>
              , the most trusted independent security resource online, does{' '}
              <strong className="text-gray-900">not recommend</strong> third-party
              antivirus for most users. A fully updated Windows 11 with Microsoft Defender
              enabled is sufficient protection for the majority of threat models. We think
              you should make an informed decision rather than defaulting to whatever
              affiliate sites rank highest.
            </p>

            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
              <strong>Disclosure:</strong> Some links on this page are affiliate links. We
              earn a commission if you purchase. Detection scores come from{' '}
              <a
                href="https://www.av-test.org"
                className="underline hover:text-amber-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                av-test.org
              </a>{' '}
              and are not influenced by vendor relationships.{' '}
              <Link href="/disclosure" className="underline hover:text-amber-900">
                Full disclosure policy.
              </Link>
            </div>
          </div>
        </section>

        {/* Who needs it / who doesn't */}
        <section className="border-b border-gray-100 px-4 py-8">
          <div className="mx-auto max-w-3xl grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-green-200 bg-green-50 px-5 py-4">
              <h2 className="mb-3 font-bold text-green-900">
                Who actually benefits from third-party antivirus
              </h2>
              <ul className="space-y-1.5 text-sm text-green-800">
                {[
                  'Less technical users who won\'t keep their OS consistently updated',
                  'Shared computers used by multiple people including children',
                  'Users who frequently download files from untrusted sources',
                  'Business environments requiring compliance auditing tools',
                  'Users who want bundled features like VPN or dark web monitoring',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-green-600" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
              <h2 className="mb-3 font-bold text-gray-900">
                Who probably doesn&apos;t need it
              </h2>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {[
                  'Users running a fully updated Windows 11 or macOS',
                  'Users who are careful about what they download and click',
                  'Privacy-conscious users concerned about antivirus data collection',
                  'Users already running Windows Defender with current definitions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Antivirus comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-gray-500">
            Detection scores are from{' '}
            <a
              href="https://www.av-test.org"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              AV-TEST Institute
            </a>
            {' '}published consumer test results. Privacy practices now carry 20% of the
            score — a product with excellent detection but a history of data misuse
            cannot top this list.
          </p>
          <ComparisonTable products={ranked} criteria={criteria} category="antivirus" />
        </section>

        {/* Criteria explanation */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              How we score antivirus software
            </h2>
            <p className="mb-8 text-gray-500">
              All detection and performance data comes from published AV-TEST reports.
              Vendor claims are not used as scoring inputs. Privacy weight reflects the
              inherent risk of granting a third party deep system access.
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

        {/* Individual product write-ups */}
        <section className="mx-auto max-w-3xl px-4 py-12 space-y-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Detailed breakdown — every antivirus reviewed
          </h2>

          {/* Windows Defender */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">
                1. Windows Defender — {weightedScore(topPick).toFixed(1)}/10
              </h3>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Winner (free)
              </span>
            </div>
            <p className="mt-3 text-gray-700">
              Windows Defender has transformed over the past decade from a mediocre
              bundled tool into a genuinely competitive security product. AV-TEST
              consistently awards it 6/6 on protection, 6/6 on performance, and 6/6 on
              usability — the maximum possible on all three axes. It scores 10/10 on
              privacy practices in our methodology because it introduces no additional
              party with system access beyond Microsoft, whose telemetry is already
              present as part of Windows.
            </p>
            <p className="mt-3 text-gray-700">
              The case for Defender as your primary antivirus is straightforward: it is
              already installed, updates automatically with Windows Update, costs nothing,
              and scores as well as or better than paid alternatives in independent testing.
              For a technically competent user who keeps their system updated, this is the
              correct answer.
            </p>
            <p className="mt-3 text-gray-700">
              What it lacks: bundled extras like VPN, password manager, or dark web
              monitoring. If you want those features in a single product, a paid suite
              makes sense. But on pure malware detection, Defender is no longer the
              compromise it once was.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Already installed on Windows — no action required. Check Windows Security
              in Settings to verify it&apos;s active.
            </p>
          </article>

          {/* Bitdefender */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">
                2. Bitdefender — {weightedScore(bitdefenderPick).toFixed(1)}/10
              </h3>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                Best detection
              </span>
            </div>
            <p className="mt-3 text-gray-700">
              Bitdefender consistently achieves 18/18 on AV-TEST — the maximum possible
              — across protection, performance, and usability. It is a Romanian company,
              placing it outside the US/UK intelligence-sharing arrangements that concern
              privacy-conscious users. The performance scores are particularly impressive:
              independent tests show it has one of the lowest system-impact footprints
              of any full antivirus suite.
            </p>
            <p className="mt-3 text-gray-700">
              There are no known incidents of data selling or inappropriate data
              collection. The privacy policy is more transparent than many competitors.
              The interface is clean and does not aggressively upsell additional products.
            </p>
            <p className="mt-3 text-gray-700">
              The main trade-off: any third-party antivirus introduces an additional
              party with deep system access. That&apos;s an inherent cost of using any
              product in this category. Bitdefender&apos;s privacy score (8/10) reflects
              this inherent trust requirement — not any specific incident.
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="bitdefender"
                href={productCta(bitdefenderPick)}
                label="Try Bitdefender"
                variant="secondary"
              />
            </div>
          </article>

          {/* ESET */}
          <article>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">
                3. ESET — {weightedScore(esetPick).toFixed(1)}/10
              </h3>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Winner (paid)
              </span>
            </div>
            <p className="mt-3 text-gray-700">
              ESET has been making security software since 1992. It consistently tops
              AV-TEST performance benchmarks — using the fewest system resources of any
              product in this comparison. On older or lower-powered computers, this
              matters significantly. AV-TEST protection scores for ESET are consistently
              in the 17–18/18 range.
            </p>
            <p className="mt-3 text-gray-700">
              Slovakia is an EU country but outside the 5 Eyes and 9 Eyes intelligence
              alliances. ESET has no known history of inappropriate data sharing and their
              privacy policy is more conservative than US-based competitors. Among
              technical users, ESET has a reputation as the no-nonsense option: no
              unnecessary bundled extras, no aggressive upselling, just antivirus that
              does its job.
            </p>
            <p className="mt-3 text-gray-700">
              What it gets wrong: the interface is functional rather than polished.
              Less brand recognition than Norton or McAfee means less community support.
              Fewer bundled features if you specifically want a security suite.
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="eset"
                href={productCta(esetPick)}
                label="Try ESET"
                variant="primary"
              />
            </div>
          </article>

          {/* Malwarebytes */}
          <article>
            <h3 className="text-xl font-bold text-gray-900">
              4. Malwarebytes — {weightedScore(malwarebytesPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-gray-700">
              Malwarebytes built its reputation as the tool you run when you already have
              malware — it is exceptionally good at removing infections that other products
              miss, particularly adware and potentially unwanted programmes. For that use
              case, it remains one of the best options available, and the free version
              covers it completely with no time limit.
            </p>
            <p className="mt-3 text-gray-700">
              As a full-time real-time protection replacement, the scores are lower than
              Bitdefender or ESET on detection rates. Malwarebytes prioritises low false
              positives over maximum detection — a reasonable design choice but one that
              means it misses some threats that other products catch. AV-TEST scores
              typically land around 16–17/18.
            </p>
            <p className="mt-3 text-gray-700">
              The recommended approach: run Malwarebytes free periodically as a
              second-opinion scanner alongside Windows Defender. You get Defender&apos;s
              real-time protection plus Malwarebytes&apos; superior removal capability
              if something gets through. Better coverage than either product alone.
            </p>
            <div className="mt-4">
              <AffiliateCTA
                product="malwarebytes"
                href={productCta(malwarebytesPick)}
                label="Get Malwarebytes free"
                variant="secondary"
              />
            </div>
          </article>

          {/* Norton */}
          <article>
            <h3 className="text-xl font-bold text-gray-900">
              5. Norton 360 — {weightedScore(nortonPick).toFixed(1)}/10
            </h3>
            <p className="mt-3 text-gray-700">
              Norton 360 achieves good AV-TEST scores and bundles a lot of features:
              VPN, password manager, dark web monitoring, cloud backup, and parental
              controls. The detection rates are genuinely strong. The problem is the
              privacy history.
            </p>
            <p className="mt-3 text-gray-700">
              In 2022, Norton was found to have been automatically enrolling users into a
              cryptocurrency mining programme called &ldquo;Norton Crypto&rdquo; that used
              customer computers to mine Ethereum and took a 15% cut of earnings —
              without adequately disclosing this to users. The company subsequently faced
              regulatory scrutiny and class action lawsuits. For a product that asks for
              deep, privileged access to your computer, this is a disqualifying incident.
            </p>
            <p className="mt-3 text-gray-700">
              The performance impact of Norton&apos;s suite is also higher than
              competitors. ESET and Bitdefender are better options at comparable or lower
              prices. There is no scenario where Norton 360 is the best choice given the
              alternatives.
            </p>
          </article>
        </section>

        {/* Verdict */}
        <section className="border-t border-gray-100 bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Our verdict</h2>

            <div className="space-y-4 mb-8">
              <div className="rounded-lg border border-green-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">
                    Tied winners: Windows Defender + ESET
                  </span>
                  <span className="text-sm font-semibold text-green-700">
                    {weightedScore(topPick).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Windows Defender if you want zero cost and no additional trust
                  relationships. ESET if you want independent third-party verification, a
                  lighter system footprint, and a non-US company with a clean privacy record.
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">Best detection: Bitdefender</span>
                  <span className="text-sm font-semibold text-blue-700">
                    {weightedScore(bitdefenderPick).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Consistently maximum AV-TEST scores with minimal system impact. Romanian
                  company, reasonable privacy practices. Best paid option for pure detection.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">
                    Best free scanner: Malwarebytes (alongside Defender)
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    {weightedScore(malwarebytesPick).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Run it periodically as a second-opinion scanner. Excellent at finding and
                  removing infections that Defender might miss. Free version is fully
                  functional with no time limit.
                </p>
              </div>

              <div className="rounded-lg border border-red-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">Skip: Norton 360</span>
                  <span className="text-sm font-semibold text-red-600">
                    {weightedScore(nortonPick).toFixed(1)}/10
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  The Norton Crypto incident is disqualifying for a product asking for
                  deep system access. ESET and Bitdefender are better at every price point.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <ScoreBreakdown product={topPick} criteria={criteria} />
            </div>
            <div className="flex flex-wrap gap-3">
              <AffiliateCTA
                product="eset"
                href={productCta(esetPick)}
                label="Try ESET (paid pick)"
                variant="primary"
              />
              <AffiliateCTA
                product="bitdefender"
                href={productCta(bitdefenderPick)}
                label="Try Bitdefender"
                variant="secondary"
              />
            </div>
          </div>
        </section>

        {/* The question nobody asks */}
        <section className="border-t border-gray-100 px-4 py-10">
          <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-gray-50 px-6 py-5">
            <h2 className="mb-3 text-lg font-bold text-gray-900">
              The question nobody asks
            </h2>
            <p className="text-gray-700 text-sm">
              The best antivirus is the one that never needs to activate because you
              didn&apos;t click the phishing link, didn&apos;t download the cracked
              software, and kept your system updated. No antivirus product can fully
              compensate for unsafe computing habits. The most effective security
              investment for most people is not an antivirus subscription — it&apos;s a{' '}
              <Link href="/password-managers" className="text-blue-600 underline hover:text-blue-800">
                password manager
              </Link>{' '}
              and{' '}
              <Link href="/2fa-apps" className="text-blue-600 underline hover:text-blue-800">
                2FA
              </Link>{' '}
              on their important accounts.
            </p>
          </div>
        </section>

        {/* ProductCard grid */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Quick reference — all 5 antivirus products
          </h2>
          <p className="mb-6 text-gray-500">
            Sorted by overall score. Windows Defender and ESET are tied at the top.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                category="antivirus"
                featured={p.id === topPick.id}
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Antivirus FAQ</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Do I need antivirus on Mac?',
                  a: "macOS has built-in security tools — XProtect, Gatekeeper, and Sandbox — that are more restrictive than their Windows equivalents. The Mac threat landscape is also smaller than Windows. Most security professionals consider the built-in tools sufficient for typical users. If you're downloading from untrusted sources, Malwarebytes for Mac is free and non-invasive.",
                },
                {
                  q: 'Is free antivirus good enough?',
                  a: "Windows Defender is free and scores as well as most paid products in AV-TEST independent tests. Malwarebytes free is excellent for periodic scanning. The paid features — VPN, password manager, dark web monitoring — are useful but can be obtained separately from more privacy-respecting providers than the antivirus bundle vendors.",
                },
                {
                  q: 'What about Kaspersky?',
                  a: "Kaspersky achieves excellent AV-TEST scores. However, the UK National Cyber Security Centre, the US Cybersecurity and Infrastructure Security Agency, and the German Federal Office for Information Security have all issued advisories against Kaspersky due to its Russian ownership and the risk of compelled cooperation with Russian intelligence services. We do not include it in our recommendations.",
                },
                {
                  q: 'Does antivirus slow down my computer?',
                  a: "ESET and Bitdefender have the lowest performance impact in independent testing. Norton has a higher impact. Windows Defender's impact is minimal on modern hardware. On hardware from 2018 or earlier, the difference between ESET and Norton can be noticeable during background scans.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-lg border border-gray-200 bg-white px-5 py-4">
                  <h3 className="font-semibold text-gray-900">{q}</h3>
                  <p className="mt-2 text-sm text-gray-600">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Related comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/password-managers"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best password managers — higher ROI than antivirus →
            </Link>
            <Link
              href="/2fa-apps"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best 2FA apps →
            </Link>
            <Link
              href="/vpn"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Best VPNs →
            </Link>
            <Link
              href="/quiz"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Take the security quiz →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
