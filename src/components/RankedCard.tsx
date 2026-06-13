import ProductCTA from '@/components/ProductCTA';
import Link from 'next/link';

export interface RankedCardProps {
  rank: number;
  productId: string;
  name: string;
  tagline: string;
  pros: string[];
  cons: string[];
  score: number;
  ctaHref: string;
  ctaLabel: string;
  reviewHref?: string;
  linkNote?: string;
}

export default function RankedCard({
  rank,
  productId,
  name,
  tagline,
  pros,
  cons,
  score,
  ctaHref,
  ctaLabel,
  reviewHref,
  linkNote,
}: RankedCardProps) {
  const isWinner = rank === 1;

  return (
    <div
      className={`flex bg-white mb-3 ${
        isWinner
          ? 'border-2 border-bw-blue'
          : 'border border-black/10'
      }`}
    >
      {/* Rank bar */}
      <div
        className={`w-9 shrink-0 flex items-center justify-center ${
          isWinner ? 'bg-bw-blue' : 'bg-bw-gray'
        }`}
      >
        <span className="text-white text-[13px] font-bold [writing-mode:vertical-rl] rotate-180">
          #{rank}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-3.5">
        {isWinner && (
          <span className="inline-block bg-bw-blue text-white text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 mb-1">
            Top pick
          </span>
        )}
        <div className="text-[16px] font-bold text-bw-black">{name}</div>
        <div className="text-[12px] text-bw-gray mt-0.5 mb-2.5">{tagline}</div>
        <div className="flex flex-col gap-1">
          {pros.map((p, i) => (
            <div key={i} className="flex gap-1.5 items-start text-[12px] text-bw-text">
              <span className="text-[#1a8a3c] shrink-0 font-bold">+</span>
              <span>{p}</span>
            </div>
          ))}
          {cons.map((c, i) => (
            <div key={i} className="flex gap-1.5 items-start text-[12px] text-bw-text">
              <span className="text-[#d93025] shrink-0 font-bold">–</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="bg-bw-light border-l border-black/10 px-4 py-3.5 min-w-[160px] flex flex-col items-center justify-between gap-2.5">
        <div className="text-center">
          <div className="text-[30px] font-bold text-bw-black leading-none">{score.toFixed(1)}</div>
          <div className="text-[11px] text-bw-gray">/10</div>
        </div>
        <div className="w-full">
          <ProductCTA product={productId} href={ctaHref} label={ctaLabel} variant="primary" />
        </div>
        {reviewHref && (
          <Link
            href={reviewHref}
            className="text-[11px] text-bw-blue text-center border border-bw-blue px-3.5 py-1.5 rounded-[3px] w-full hover:bg-bw-light transition-colors"
          >
            Full review →
          </Link>
        )}
        {linkNote && (
          <p className="text-[10px] text-bw-gray text-center leading-snug">{linkNote}</p>
        )}
      </div>
    </div>
  );
}


