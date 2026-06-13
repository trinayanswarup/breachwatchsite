'use client';

import { trackProductLinkClick } from '@/lib/analytics';

export interface ProductCTAProps {
  product: string;
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

export default function ProductCTA({
  product,
  href,
  label,
  variant = 'primary',
}: ProductCTAProps) {
  function handleClick() {
    trackProductLinkClick(
      product,
      '',
      typeof window !== 'undefined' ? window.location.pathname : ''
    );
  }

  const baseClass =
    'inline-flex w-full items-center justify-center gap-2 rounded-[3px] px-4 py-2 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-blue focus-visible:ring-offset-2';

  const variantClass =
    variant === 'primary'
      ? 'bg-bw-blue text-white hover:bg-bw-blue-dark'
      : 'border border-bw-blue bg-white text-bw-blue hover:bg-bw-light';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseClass} ${variantClass}`}
    >
      {label} <span aria-hidden="true">-&gt;</span>
    </a>
  );
}


