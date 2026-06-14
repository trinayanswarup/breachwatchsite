import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import RankedCard from '@/components/RankedCard';
import ProductCTA from '@/components/ProductCTA';
import CategoryShortlist from '@/components/CategoryShortlist';
import JsonLd from '@/components/JsonLd';
import FreshnessNote from '@/components/FreshnessNote';
import EvidencePanel from '@/components/EvidencePanel';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import { calculateWeightedScore, formatScore, sortProductsByScore } from '@/lib/scoring';
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
  return calculateWeightedScore(p, criteria);
}

const ranked = sortProductsByScore(products, criteria);
const topPick = ranked[0];

const shortlist = [
  { name: 'Windows Defender', label: 'best free antivirus for most Windows users', href: '#windows-defender' },
  { name: 'ESET', label: 'best lightweight paid antivirus', href: '#eset' },
  { name: 'Bitdefender', label: 'best detection-focused antivirus', href: '#bitdefender' },
  { name: 'Malwarebytes', label: 'best second-opinion scanner', href: '#malwarebytes' },
  { name: 'Norton 360', label: 'best for users who want one security bundle', href: '#norton' },
];

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

const AV_BULLETS: Record<string, { pros: string[]; cons: string[] }> = {
  windows_defender: {
    pros: [
      'Free and already installed — zero setup, auto-updates with Windows Update',
      'AV-TEST consistently awards 6/6 on protection, performance, and usability',
      'No additional third party with deep system access',
    ],
    cons: ['Limited advanced features · No cross-platform support'],
  },
  eset: {
    pros: [
      'Lowest system impact of any full antivirus suite — tops AV-TEST performance benchmarks',
      'Slovak company: EU member, outside 5 Eyes and 9 Eyes intelligence alliances',
      'Clean, upsell-free interface focused on core functionality',
    ],
    cons: ['Paid only — no meaningful free tier · Some UI elements feel dated'],
  },
  bitdefender: {
    pros: [
      'AV-TEST consistently 18/18 — maximum possible score across all categories',
      'Romanian company: outside US/UK intelligence sharing arrangements',
    ],
    cons: ['Not open source · Recent upsell prompts in UI'],
  },
  malwarebytes: {
    pros: [
      'Exceptional at removing existing infections — finds adware and PUPs traditional AV misses',
      'Best used alongside Windows Defender for layered defence',
    ],
    cons: ['Not a standalone AV replacement · Free version lacks real-time protection'],
  },
  norton: {
    pros: ['Good detection rates · Includes VPN, password manager, and dark web monitoring'],
    cons: [
      'Norton Crypto (2022): enrolled users in Ethereum mining without clear consent',
      'Higher system impact than Bitdefender or ESET',
    ],
  },
};

export default function AntivirusPage() {

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={pageSchema} />
      <Nav />

      <main className="flex-1">

        {/* Hero */}
        <section className="px-5 pt-14 pb-10 text-center">
          <div className="mx-auto max-w-[680px]">
            <h1 className="text-[32px] font-bold leading-tight text-bw-black">
              Best Antivirus Software 2026 — What the Independent Tests Actually Show
            </h1>
            <p className="mt-3.5 text-[15px] text-bw-gray leading-relaxed max-w-[500px] mx-auto">
              We ranked antivirus software using AV-TEST independent lab scores. Includes the
              honest answer about whether you actually need third-party antivirus.
            </p>
            <FreshnessNote>
              Scores reflect AV-TEST lab results, system impact, privacy posture, and pricing checked in June 2026.
            </FreshnessNote>
            <Link
              href="/quiz"
              className="mt-6 inline-flex items-center gap-2 bg-bw-blue text-white px-7 py-3 rounded-[3px] text-[15px] font-semibold hover:bg-bw-blue-dark transition-colors"
            >
              Take the 30-second quiz →
            </Link>
          </div>
        </section>

        <CategoryShortlist
          title="Recommended antivirus tools - shortlist"
          description="Start here if you want the fast answer before reading the full breakdown."
          items={shortlist}
        />

        {/* Why this category matters */}
        <section className="border-t border-b border-black/10 bg-bw-light px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-bw-black">Why antivirus still matters</h2>
            <p className="mt-3 text-sm leading-6 text-bw-gray">
              Modern operating systems are much safer than they used to be, but antivirus
              still matters for shared devices, risky downloads, business compliance, and
              second-opinion scanning after something feels wrong.
            </p>
          </div>
          <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-[3px] border border-green-200 bg-green-50 px-5 py-4">
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

            <div className="rounded-[3px] border border-black/10 bg-bw-light px-5 py-4">
              <h2 className="mb-3 font-bold text-bw-black">
                Who probably doesn&apos;t need it
              </h2>
              <ul className="space-y-1.5 text-sm text-bw-text">
                {[
                  'Users running a fully updated Windows 11 or macOS',
                  'Users who are careful about what they download and click',
                  'Privacy-conscious users concerned about antivirus data collection',
                  'Users already running Windows Defender with current definitions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-bw-gray" aria-hidden="true">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-2xl font-bold text-bw-black">
            Antivirus comparison: all 5 products scored
          </h2>
          <p className="mb-6 text-bw-gray">
            Detection scores are from{' '}
            <a
              href="https://www.av-test.org"
              className="text-bw-blue hover:text-bw-blue-dark underline"
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

        {/* Individual product write-ups */}
        <section className="mx-auto max-w-3xl px-4 py-12 space-y-14">
          <h2 className="text-2xl font-bold text-bw-black">
            Detailed breakdown — every antivirus reviewed
          </h2>

          {/* Windows Defender */}
          <article id="windows-defender">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                1. Windows Defender — {formatScore(weightedScore(topPick))}/10
              </h3>
              <span className="rounded-[3px] bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Winner (free)
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              Windows Defender has transformed over the past decade from a mediocre
              bundled tool into a genuinely competitive security product. AV-TEST
              consistently awards it 6/6 on protection, 6/6 on performance, and 6/6 on
              usability — the maximum possible on all three axes. It scores 10/10 on
              privacy practices in our methodology because it introduces no additional
              party with system access beyond Microsoft, whose telemetry is already
              present as part of Windows.
            </p>
            <p className="mt-3 text-bw-text">
              The case for Defender as your primary antivirus is straightforward: it is
              already installed, updates automatically with Windows Update, costs nothing,
              and scores as well as or better than paid alternatives in independent testing.
              For a technically competent user who keeps their system updated, this is the
              correct answer.
            </p>
            <p className="mt-3 text-bw-text">
              What it lacks: bundled extras like VPN, password manager, or dark web
              monitoring. If you want those features in a single product, a paid suite
              makes sense. But on pure malware detection, Defender is no longer the
              compromise it once was.
            </p>
            <p className="mt-3 text-sm text-bw-gray">
              Already installed on Windows — no action required. Check Windows Security
              in Settings to verify it&apos;s active.
            </p>
          </article>

          {/* Bitdefender */}
          <article id="bitdefender">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                2. Bitdefender — {formatScore(weightedScore(bitdefenderPick))}/10
              </h3>
              <span className="rounded-[3px] bg-bw-blue/10 px-3 py-1 text-sm font-semibold text-bw-blue-dark">
                Best detection
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              Bitdefender consistently achieves 18/18 on AV-TEST — the maximum possible
              — across protection, performance, and usability. It is a Romanian company,
              placing it outside the US/UK intelligence-sharing arrangements that concern
              privacy-conscious users. The performance scores are particularly impressive:
              independent tests show it has one of the lowest system-impact footprints
              of any full antivirus suite.
            </p>
            <p className="mt-3 text-bw-text">
              There are no known incidents of data selling or inappropriate data
              collection. The privacy policy is more transparent than many competitors.
              The interface is clean and does not aggressively upsell additional products.
            </p>
            <p className="mt-3 text-bw-text">
              The main trade-off: any third-party antivirus introduces an additional
              party with deep system access. That&apos;s an inherent cost of using any
              product in this category. Bitdefender&apos;s privacy score (8/10) reflects
              this inherent trust requirement — not any specific incident.
            </p>
            <div className="mt-4">
              <ProductCTA
                product="bitdefender"
                href={productCta(bitdefenderPick)}
                label="Try Bitdefender"
                variant="secondary"
              />
            </div>
          </article>

          {/* ESET */}
          <article id="eset">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-bw-black">
                3. ESET — {formatScore(weightedScore(esetPick))}/10
              </h3>
              <span className="rounded-[3px] bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Winner (paid)
              </span>
            </div>
            <p className="mt-3 text-bw-text">
              ESET has been making security software since 1992. It consistently tops
              AV-TEST performance benchmarks — using the fewest system resources of any
              product in this comparison. On older or lower-powered computers, this
              matters significantly. AV-TEST protection scores for ESET are consistently
              in the 17–18/18 range.
            </p>
            <p className="mt-3 text-bw-text">
              Slovakia is an EU country but outside the 5 Eyes and 9 Eyes intelligence
              alliances. ESET has no known history of inappropriate data sharing and their
              privacy policy is more conservative than US-based competitors. Among
              technical users, ESET has a reputation as the no-nonsense option: no
              unnecessary bundled extras, no aggressive upselling, just antivirus that
              does its job.
            </p>
            <p className="mt-3 text-bw-text">
              What it gets wrong: the interface is functional rather than polished.
              Less brand recognition than Norton or McAfee means less community support.
              Fewer bundled features if you specifically want a security suite.
            </p>
            <div className="mt-4">
              <ProductCTA
                product="eset"
                href={productCta(esetPick)}
                label="Try ESET"
                variant="primary"
              />
            </div>
          </article>

          {/* Malwarebytes */}
          <article id="malwarebytes">
            <h3 className="text-xl font-bold text-bw-black">
              4. Malwarebytes — {formatScore(weightedScore(malwarebytesPick))}/10
            </h3>
            <p className="mt-3 text-bw-text">
              Malwarebytes built its reputation as the tool you run when you already have
              malware — it is exceptionally good at removing infections that other products
              miss, particularly adware and potentially unwanted programmes. For that use
              case, it remains one of the best options available, and the free version
              covers it completely with no time limit.
            </p>
            <p className="mt-3 text-bw-text">
              As a full-time real-time protection replacement, the scores are lower than
              Bitdefender or ESET on detection rates. Malwarebytes prioritises low false
              positives over maximum detection — a reasonable design choice but one that
              means it misses some threats that other products catch. AV-TEST scores
              typically land around 16–17/18.
            </p>
            <p className="mt-3 text-bw-text">
              The recommended approach: run Malwarebytes free periodically as a
              second-opinion scanner alongside Windows Defender. You get Defender&apos;s
              real-time protection plus Malwarebytes&apos; superior removal capability
              if something gets through. Better coverage than either product alone.
            </p>
            <div className="mt-4">
              <ProductCTA
                product="malwarebytes"
                href={productCta(malwarebytesPick)}
                label="Get Malwarebytes free"
                variant="secondary"
              />
            </div>
          </article>

          {/* Norton */}
          <article id="norton">
            <h3 className="text-xl font-bold text-bw-black">
              5. Norton 360 — {formatScore(weightedScore(nortonPick))}/10
            </h3>
            <p className="mt-3 text-bw-text">
              Norton 360 achieves good AV-TEST scores and bundles a lot of features:
              VPN, password manager, dark web monitoring, cloud backup, and parental
              controls. The detection rates are genuinely strong. The problem is the
              privacy history.
            </p>
            <p className="mt-3 text-bw-text">
              In 2022, Norton was found to have been automatically enrolling users into a
              cryptocurrency mining programme called &ldquo;Norton Crypto&rdquo; that used
              customer computers to mine Ethereum and took a 15% cut of earnings —
              without adequately disclosing this to users. The company subsequently faced
              regulatory scrutiny and class action lawsuits. For a product that asks for
              deep, privileged access to your computer, this is a disqualifying incident.
            </p>
            <p className="mt-3 text-bw-text">
              The performance impact of Norton&apos;s suite is also higher than
              competitors. ESET and Bitdefender are better options at comparable or lower
              prices. There is no scenario where Norton 360 is the best choice given the
              alternatives.
            </p>
          </article>
        </section>

        {/* Ranked comparison */}
        <section className="mx-auto max-w-[760px] px-5 pb-10">
          <div className="flex items-end gap-3 border-b-2 border-bw-blue pb-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-gray">
              5 antivirus products compared · Updated Jun 2026 · AV-TEST data
            </span>
          </div>
          {ranked.map((p, i) => {
            const bullets = AV_BULLETS[p.id] ?? { pros: p.highlights, cons: [] };
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
                linkNote={p.id === 'windows_defender' ? 'Free and built-in direct link' : undefined}
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

        <section className="mx-auto max-w-3xl px-4 pb-10">
          <EvidencePanel category="antivirus" />
        </section>

        {/* FAQ */}
        <section className="border-t border-black/10 bg-bw-light px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-bw-black">Antivirus FAQ</h2>
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
                <div key={q} className="rounded-[3px] border border-black/10 bg-white px-5 py-4">
                  <h3 className="font-semibold text-bw-black">{q}</h3>
                  <p className="mt-2 text-sm text-bw-text">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-bw-black">Related antivirus comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/comparisons/windows-defender-vs-paid-antivirus"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Windows Defender vs paid antivirus -&gt;
            </Link>
            <Link
              href="/comparisons/eset-vs-bitdefender"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              ESET vs Bitdefender - speed vs detection -&gt;
            </Link>
            <Link
              href="/comparisons/malwarebytes-vs-antivirus"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Malwarebytes vs full antivirus suites -&gt;
            </Link>
            <Link
              href="/comparisons/norton-vs-antivirus-alternatives"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Norton 360 vs safer alternatives -&gt;
            </Link>
            <Link
              href="/password-managers"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best password managers - higher ROI than antivirus -&gt;
            </Link>
            <Link
              href="/2fa-apps"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best 2FA apps -&gt;
            </Link>
            <Link
              href="/vpn"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Best VPNs -&gt;
            </Link>
            <Link
              href="/quiz"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text hover:border-bw-blue hover:text-bw-blue transition-colors"
            >
              Take the security quiz -&gt;
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}





