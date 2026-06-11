import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{ score: string }>;
}

const SCORE_COPY: Record<number, { headline: string; urgency: string; colorClass: string; badgeClass: string }> = {
  1: {
    headline: 'My security score: 1/5 — I need to fix this urgently',
    urgency: 'High risk',
    colorClass: 'border-red-300 bg-red-50 text-red-700',
    badgeClass: 'bg-red-100 text-red-700 border-red-200',
  },
  2: {
    headline: 'My security score: 2/5 — I need to improve my security',
    urgency: 'High risk',
    colorClass: 'border-red-300 bg-red-50 text-red-700',
    badgeClass: 'bg-red-100 text-red-700 border-red-200',
  },
  3: {
    headline: 'My security score: 3/5 — Room for improvement',
    urgency: 'Moderate risk',
    colorClass: 'border-amber-300 bg-amber-50 text-amber-700',
    badgeClass: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  4: {
    headline: 'My security score: 4/5 — Good security posture',
    urgency: 'Low risk',
    colorClass: 'border-green-300 bg-green-50 text-green-700',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
  },
  5: {
    headline: 'My security score: 5/5 — Strong security posture',
    urgency: 'Low risk',
    colorClass: 'border-green-300 bg-green-50 text-green-700',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
  },
};

const SCORE_CATEGORY: Record<number, { href: string; label: string }> = {
  1: { href: '/password-managers', label: 'See the best password managers →' },
  2: { href: '/password-managers', label: 'See the best password managers →' },
  3: { href: '/vpn', label: 'See the best VPNs →' },
  4: { href: '/2fa-apps', label: 'See our 2FA app picks →' },
  5: { href: '/2fa-apps', label: 'See our 2FA app picks →' },
};

export function generateStaticParams() {
  return [1, 2, 3, 4, 5].map((s) => ({ score: String(s) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { score } = await params;
  const n = parseInt(score, 10);
  if (isNaN(n) || n < 1 || n > 5) return {};

  return {
    title: `My security score: ${n}/5`,
    description:
      'I just checked my security score on BreachWatch. Find out yours in 30 seconds.',
    robots: { index: false, follow: false },
    openGraph: {
      title: `My security score: ${n}/5 — How secure are you?`,
      description:
        'I just checked my security score on BreachWatch. Find out yours in 30 seconds.',
    },
    twitter: {
      card: 'summary',
      title: `My security score: ${n}/5 — How secure are you?`,
      description:
        'I just checked my security score on BreachWatch. Find out yours in 30 seconds.',
    },
  };
}

export default async function ScorePage({ params }: PageProps) {
  const { score } = await params;
  const n = parseInt(score, 10);

  if (isNaN(n) || n < 1 || n > 5) {
    notFound();
  }

  const copy = SCORE_COPY[n];
  const category = SCORE_CATEGORY[n];

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mx-auto w-full max-w-md">

          <div className={`inline-flex flex-col items-center rounded-xl border-2 px-10 py-6 ${copy.colorClass}`}>
            <span className="text-7xl font-bold leading-none">{n}</span>
            <span className="mt-1 text-sm font-semibold uppercase tracking-wider opacity-70">
              out of 5
            </span>
            <span className="mt-2 text-base font-medium">{copy.urgency}</span>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            {copy.headline}
          </h1>

          <p className="mt-3 text-gray-500">
            Scored on BreachWatch — the free, unbiased cybersecurity quiz.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              href="/quiz"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-blue-700"
            >
              Get your free security score →
            </Link>
            <Link
              href={category.href}
              className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              {category.label}
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
