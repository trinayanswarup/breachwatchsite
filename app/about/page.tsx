import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import criteriaRaw from '@/data/scoring-criteria.json';
import type { ScoringCriteria } from '@/lib/types';

export const metadata: Metadata = {
  title: 'About BreachWatch - Independent Cybersecurity Tools and Comparisons',
  description:
    'BreachWatch is a non-affiliate cybersecurity utility site with transparent scoring, public data sources, and free security tools.',
};

const allCriteria = criteriaRaw as unknown as ScoringCriteria;

const categories = [
  { key: 'vpn' as const, label: 'VPN', href: '/vpn' },
  { key: 'password-manager' as const, label: 'Password Manager', href: '/password-managers' },
  { key: 'antivirus' as const, label: 'Antivirus', href: '/antivirus' },
  { key: '2fa-apps' as const, label: '2FA Apps', href: '/2fa-apps' },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-black/10 bg-bw-light px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
              About
            </p>
            <div className="mt-3 max-w-3xl">
              <h1 className="text-[34px] font-bold leading-tight text-bw-black">
                BreachWatch helps people choose security tools without paid rankings.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                The site combines free tools, breach data, curated security links, and
                transparent product comparisons. It is non-affiliate: product
                buttons use direct links or internal review pages.
              </p>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-5 py-12">
          <div className="space-y-5">
            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">Why it exists</h2>
              <p className="mt-4 text-[14px] leading-7 text-bw-text">
                Security advice is usually split between technical jargon and sales-heavy
                comparison pages. BreachWatch is meant to be more practical: show the
                tradeoffs, show the criteria, and give readers tools they can use
                immediately.
              </p>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">How scoring works</h2>
              <p className="mt-4 text-[14px] leading-7 text-bw-text">
                Each category uses weighted criteria. A VPN is scored differently from a
                password manager because the risks are different. The goal is not to make
                every product look good; it is to explain which tradeoffs matter.
              </p>

              <div className="mt-6 space-y-6">
                {categories.map(({ key, label, href }) => (
                  <div key={key}>
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                      <h3 className="text-[16px] font-bold text-bw-black">{label} criteria</h3>
                      <Link href={href} className="text-[13px] text-bw-blue hover:text-bw-blue-dark">
                        View category -&gt;
                      </Link>
                    </div>
                    <div className="space-y-2">
                      {allCriteria[key].map((criterion) => (
                        <div
                          key={criterion.id}
                          className="flex items-start gap-3 rounded-[3px] border border-black/10 bg-bw-light px-4 py-3"
                        >
                          <span className="mt-0.5 shrink-0 rounded-[3px] bg-bw-blue/10 px-2 py-0.5 text-xs font-bold text-bw-blue">
                            {criterion.weight}%
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-bw-black">{criterion.name}</p>
                            <p className="text-sm text-bw-gray">{criterion.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">Independence</h2>
              <ul className="mt-4 space-y-2 text-[14px] leading-6 text-bw-text">
                {[
                  'BreachWatch uses direct product links, not affiliate links.',
                  'No company can buy a ranking or a product placement.',
                  'Scores are based on published criteria and product data.',
                  'If monetization is enabled later, the public disclosure must be updated first.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 shrink-0 text-bw-blue" aria-hidden="true">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">Data sources</h2>
              <p className="mt-4 text-[14px] leading-7 text-bw-text">
                Product data comes from official websites, privacy policies, pricing pages,
                published audit reports, independent lab results, app-store signals, and
                public security sources. If a data point looks wrong, it should be corrected
                in the source data, not patched in the UI.
              </p>
            </section>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/how-we-test"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-[13px] font-semibold text-bw-text transition-colors hover:border-bw-blue hover:text-bw-blue"
            >
              How we test -&gt;
            </Link>
            <Link
              href="/disclosure"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-[13px] font-semibold text-bw-text transition-colors hover:border-bw-blue hover:text-bw-blue"
            >
              Funding and independence -&gt;
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}




