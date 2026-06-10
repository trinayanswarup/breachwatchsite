'use client';

import { trackAffiliateClick } from '@/lib/analytics';

export interface AffiliateCTAProps {
  product: string;
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

export default function AffiliateCTA({
  product,
  href,
  label,
  variant = 'primary',
}: AffiliateCTAProps) {
  function handleClick() {
    trackAffiliateClick(
      product,
      '',
      typeof window !== 'undefined' ? window.location.pathname : ''
    );
  }

  const baseClass =
    'group relative inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

  const variantClass =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'border border-blue-600 bg-white text-blue-600 hover:bg-blue-50';

  return (
    <div className="relative inline-block">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className={`${baseClass} ${variantClass}`}
      >
        {label} <span aria-hidden="true">→</span>
      </a>
      <span
        className="pointer-events-none absolute bottom-full left-0 mb-1.5 hidden rounded bg-gray-900 px-2 py-1 text-[11px] text-white whitespace-nowrap group-hover:block"
        role="tooltip"
      >
        Affiliate link — we may earn a commission
      </span>
    </div>
  );
}
