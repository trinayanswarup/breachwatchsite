import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FreshnessNote from '@/components/FreshnessNote';
import {
  getSimpleComparison,
  simpleComparisons,
  type ComparisonWinner,
} from '@/data/simple-comparisons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const winnerClass: Record<ComparisonWinner, string> = {
  left: 'text-bw-blue font-semibold',
  right: 'text-bw-blue font-semibold',
  tie: 'text-bw-gray',
};

export function generateStaticParams() {
  return simpleComparisons.map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getSimpleComparison(slug);

  if (!comparison) {
    return {
      title: 'Comparison Not Found',
    };
  }

  return {
    title: `${comparison.title}: Quick Comparison`,
    description: comparison.description,
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getSimpleComparison(slug);

  if (!comparison) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <section className="border-b border-black/10 bg-bw-light">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <Link
              href={comparison.categoryHref}
              className="text-sm font-medium text-bw-blue underline hover:text-bw-blue-dark"
            >
              {comparison.categoryLabel}
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-normal text-bw-black sm:text-4xl">
              {comparison.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-bw-text">
              {comparison.description}
            </p>
            <FreshnessNote>
              Quick comparisons use the latest BreachWatch category scores and public product data checked in June 2026.
            </FreshnessNote>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-[3px] border border-bw-blue bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-bw-gray">
              Quick verdict
            </p>
            <p className="mt-2 text-lg font-semibold text-bw-black">
              Winner: {comparison.winnerName}
            </p>
            <p className="mt-2 text-sm leading-6 text-bw-text">
              {comparison.verdict}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-4 px-4 pb-10 md:grid-cols-2">
          <div className="rounded-[3px] border border-black/10 bg-white p-5">
            <h2 className="text-xl font-bold text-bw-black">{comparison.leftName}</h2>
            <p className="mt-3 text-sm leading-6 text-bw-text">{comparison.leftBestFor}</p>
          </div>
          <div className="rounded-[3px] border border-black/10 bg-white p-5">
            <h2 className="text-xl font-bold text-bw-black">{comparison.rightName}</h2>
            <p className="mt-3 text-sm leading-6 text-bw-text">{comparison.rightBestFor}</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-10">
          <h2 className="mb-4 text-2xl font-bold text-bw-black">Comparison table</h2>
          <div className="overflow-x-auto rounded-[3px] border border-black/10 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/10 bg-bw-light text-left">
                  <th className="px-4 py-3 font-semibold text-bw-black">Point</th>
                  <th className="px-4 py-3 font-semibold text-bw-black">
                    {comparison.leftName}
                  </th>
                  <th className="px-4 py-3 font-semibold text-bw-black">
                    {comparison.rightName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3 font-medium text-bw-black">{row.label}</td>
                    <td
                      className={`px-4 py-3 ${
                        row.winner === 'left' ? winnerClass.left : winnerClass.tie
                      }`}
                    >
                      {row.left}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        row.winner === 'right' ? winnerClass.right : winnerClass.tie
                      }`}
                    >
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-10">
          <h2 className="mb-4 text-2xl font-bold text-bw-black">Key differences</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {comparison.keyDifferences.map((difference) => (
              <p
                key={difference}
                className="rounded-[3px] border border-black/10 bg-white p-4 text-sm leading-6 text-bw-text"
              >
                {difference}
              </p>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-14">
          <h2 className="mb-4 text-2xl font-bold text-bw-black">Related links</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {comparison.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-sm font-medium text-bw-text transition-colors hover:border-bw-blue hover:text-bw-blue"
              >
                {link.label} -&gt;
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
