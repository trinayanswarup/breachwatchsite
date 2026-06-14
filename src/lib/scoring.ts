import type { Criterion, Product } from '@/lib/types';

export function calculateWeightedScore(
  product: Product,
  criteria: Criterion[]
): number {
  return criteria.reduce(
    (sum, criterion) =>
      sum + ((product.scores[criterion.id] ?? 0) * criterion.weight) / 100,
    0
  );
}

export function formatScore(score: number, decimals = 1): string {
  const factor = 10 ** decimals;
  return (Math.round((score + Number.EPSILON) * factor) / factor).toFixed(decimals);
}

export function sortProductsByScore<T extends Product>(
  products: T[],
  criteria: Criterion[]
): T[] {
  return [...products].sort(
    (a, b) => calculateWeightedScore(b, criteria) - calculateWeightedScore(a, criteria)
  );
}

export function getTopProduct<T extends Product>(
  products: T[],
  criteria: Criterion[]
): T {
  const [topProduct] = sortProductsByScore(products, criteria);
  if (!topProduct) {
    throw new Error('Cannot calculate top product from an empty product list.');
  }
  return topProduct;
}
