'use client';

import Link from 'next/link';
import type { QuizResult } from '@/lib/quiz';
import ShareScore from '@/components/ShareScore';
import { trackRecommendedProductClick } from '@/lib/analytics';

export interface QuizResultProps {
  result: QuizResult;
}

const CATEGORY_META: Record<
  QuizResult['recommendedCategory'],
  { label: string; icon: string; href: string; ctaLabel: string }
> = {
  vpn: {
    label: 'VPN',
    icon: '🛡',
    href: '/vpn',
    ctaLabel: 'See the best VPNs',
  },
  'password-manager': {
    label: 'Password Manager',
    icon: '🔐',
    href: '/password-managers',
    ctaLabel: 'See the best Password Managers',
  },
  antivirus: {
    label: 'Antivirus',
    icon: '🦠',
    href: '/antivirus',
    ctaLabel: 'See the best Antivirus software',
  },
  '2fa-apps': {
    label: '2FA App',
    icon: '📱',
    href: '/2fa-apps',
    ctaLabel: 'See the best 2FA Apps',
  },
};

const URGENCY_CLASS: Record<QuizResult['urgency'], string> = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

const URGENCY_LABEL: Record<QuizResult['urgency'], string> = {
  high: 'High priority',
  medium: 'Medium priority',
  low: 'Low priority',
};

function ScoreBadge({ score }: { score: number }) {
  const colorClass =
    score <= 2
      ? 'border-red-300 bg-red-50 text-red-700'
      : score === 3
      ? 'border-amber-300 bg-amber-50 text-amber-700'
      : 'border-green-300 bg-green-50 text-green-700';

  const label =
    score <= 2 ? 'High risk' : score === 3 ? 'Moderate risk' : 'Low risk';

  return (
    <div className={`inline-flex flex-col items-center rounded-[3px] border-2 px-6 py-4 ${colorClass}`}>
      <span className="text-5xl font-bold leading-none">{score}</span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-80">
        out of 5
      </span>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );
}

export default function QuizResultComponent({ result }: QuizResultProps) {
  const meta = CATEGORY_META[result.recommendedCategory];
  const handleRecommendedClick = () => {
    trackRecommendedProductClick(result.recommendedCategory, result.score);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="mb-6 flex items-center gap-2">
        <span
          className={`rounded-[3px] border px-3 py-1 text-xs font-semibold ${URGENCY_CLASS[result.urgency]}`}
        >
          {URGENCY_LABEL[result.urgency]}
        </span>
      </div>

      <div className="mb-8 flex items-start gap-6">
        <div className="shrink-0">
          <ScoreBadge score={result.score} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-bw-gray">
            Your biggest risk
          </p>
          <p className="mt-1 text-xl font-bold leading-snug text-bw-black">
            {result.biggestRisk}
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-[3px] border border-blue-100 bg-bw-light p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-bw-blue">
          Our recommendation
        </p>
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">{meta.icon}</span>
          <div>
            <p className="text-lg font-bold text-bw-black">{meta.label}</p>
            <p className="mt-0.5 text-sm text-bw-text">{result.reasoning}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href={meta.href}
          onClick={handleRecommendedClick}
          className="flex w-full items-center justify-center gap-2 rounded-[3px] bg-blue-600 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-blue-700"
        >
          {meta.ctaLabel} <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/"
          className="flex w-full items-center justify-center rounded-[3px] border border-black/10 bg-white px-6 py-3 text-sm font-medium text-bw-text transition-colors hover:bg-bw-light"
        >
          See all categories
        </Link>
      </div>

      <ShareScore score={result.score} />

      <p className="mt-6 text-center text-xs text-bw-gray">
        Your answers were not stored. This analysis runs entirely in memory.
      </p>
    </div>
  );
}
