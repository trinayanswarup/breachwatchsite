import type { Product } from '@/lib/types';

export interface ProductCardProps {
  product: Product;
  category: string;
  featured?: boolean;
}

export default function ProductCard(_props: ProductCardProps) {
  return null;
}
