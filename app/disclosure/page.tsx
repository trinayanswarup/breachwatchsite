import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Funding and Independence',
  description:
    'BreachWatch uses direct product links, not affiliate links. Rankings are based on published scoring criteria, not paid placements.',
};

const LAST_UPDATED = '13 June 2026';

const principles = [
  'No paid placements',
  'No affiliate links on the live site',
  'No sponsored rankings',
  'Scores based on published criteria',
];

export default function DisclosurePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-black/10 bg-bw-light px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
              Independence
            </p>
            <div className="mt-3 max-w-3xl">
              <h1 className="text-[34px] font-bold leading-tight text-bw-black">
                BreachWatch is a non-affiliate project.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                Product links go to official websites or internal review pages.
                BreachWatch does not earn commission from those links, and rankings are
                not paid placements.
              </p>
              <p className="mt-3 text-[13px] text-bw-gray">Last updated: {LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-5 py-12">
          <div className="grid gap-3 sm:grid-cols-2">
            {principles.map((item) => (
              <div key={item} className="rounded-[3px] border border-black/10 bg-white p-4">
                <p className="text-[14px] font-semibold text-bw-black">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">How product links work</h2>
              <p className="mt-4 text-[14px] leading-7 text-bw-text">
                Product buttons use direct destination links where available.
                When a product link is not configured, BreachWatch sends readers to an
                internal review page instead of a tracking link.
              </p>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">How rankings are protected</h2>
              <p className="mt-4 text-[14px] leading-7 text-bw-text">
                Rankings are calculated from category-specific criteria such as privacy
                policy, audit history, price, platform coverage, reliability, detection
                results, and recovery options. The criteria are visible on the category
                pages and explained in the methodology.
              </p>
            </section>

          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/how-we-test"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-[13px] font-semibold text-bw-text transition-colors hover:border-bw-blue hover:text-bw-blue"
            >
              Read the methodology -&gt;
            </Link>
            <Link
              href="/privacy"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-[13px] font-semibold text-bw-text transition-colors hover:border-bw-blue hover:text-bw-blue"
            >
              Privacy policy -&gt;
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}




