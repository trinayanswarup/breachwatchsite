import type { Product, Criterion, ScoringCriteria } from '@/lib/types';
import ProductCTA from '@/components/ProductCTA';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import rawCriteria from '@/data/scoring-criteria.json';
import { calculateWeightedScore, formatScore } from '@/lib/scoring';

export interface ProductCardProps {
  product: Product;
  category: string;
  featured?: boolean;
}

const criteriaData = rawCriteria as unknown as ScoringCriteria;

function getCriteriaForCategory(category: string): Criterion[] {
  const key =
    category === 'password-managers' ? 'password-manager' : category;
  return criteriaData[key as keyof ScoringCriteria] ?? [];
}

function scoreBadgeClass(score: number): string {
  if (score >= 7) return 'bg-green-100 text-green-800 ring-green-200';
  if (score >= 5) return 'bg-amber-100 text-amber-800 ring-amber-200';
  return 'bg-red-100 text-red-800 ring-red-200';
}

export default function ProductCard({
  product,
  category,
  featured = false,
}: ProductCardProps) {
  const criteria = getCriteriaForCategory(category);
  const score = criteria.length ? calculateWeightedScore(product, criteria) : 0;
  const ctaHref = buildAffiliateUrl(
    affiliateLinks[product.id] ?? product.affiliateUrl,
    product.id,
    category,
    'card'
  );

  return (
    <article
      className={`rounded-[3px] bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        featured
          ? 'border-2 border-blue-400 ring-4 ring-blue-50'
          : 'border border-black/10'
      }`}
    >
      {featured && (
        <span className="mb-3 inline-block rounded-[3px] bg-blue-600 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
          Featured pick
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-bw-black">{product.name}</h3>
          <p className="mt-0.5 text-sm text-bw-gray">{product.tagline}</p>
        </div>
        <div
          className={`shrink-0 rounded-[3px] px-3 py-2 text-center ring-1 ${scoreBadgeClass(score)}`}
        >
          <span className="block text-2xl font-bold leading-none">
            {formatScore(score)}
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-70">
            / 10
          </span>
        </div>
      </div>

      <ul className="mt-4 space-y-2" aria-label="Key highlights">
        {product.highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-bw-text">
            <span className="mt-0.5 shrink-0 text-green-500" aria-hidden="true">
              ✓
            </span>
            {highlight}
          </li>
        ))}
      </ul>

      <blockquote className="mt-4 rounded-md bg-bw-light px-3 py-2 text-sm italic text-bw-text border-l-2 border-gray-300">
        {product.verdict}
      </blockquote>

      <p className="mt-3 text-xs text-bw-gray">
        Best for:{' '}
        <span className="font-medium text-bw-text">{product.bestFor}</span>
      </p>

      <div className="mt-4">
        <ProductCTA
          product={product.id}
          href={ctaHref}
          label={`Visit ${product.name}`}
          variant="primary"
        />
      </div>
    </article>
  );
}


