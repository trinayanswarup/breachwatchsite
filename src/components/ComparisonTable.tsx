import type { Product, Criterion } from '@/lib/types';

export interface ComparisonTableProps {
  products: Product[];
  criteria: Criterion[];
  category: string;
}

export default function ComparisonTable(_props: ComparisonTableProps) {
  return null;
}
