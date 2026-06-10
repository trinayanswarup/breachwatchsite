import { track } from '@vercel/analytics';

export function trackQuizStart(): void {
  track('quiz_start');
}

export function trackQuizComplete(
  score: number,
  recommendedCategory: string,
  urgency: string
): void {
  track('quiz_complete', { score, recommendedCategory, urgency });
}

export function trackAffiliateClick(
  product: string,
  category: string,
  page: string
): void {
  track('affiliate_click', { product, category, page });
}

export function trackCategoryView(category: string): void {
  track('category_view', { category });
}

export function trackComparisonView(slug: string): void {
  track('comparison_view', { slug });
}
