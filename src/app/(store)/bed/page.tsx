import type { Metadata } from 'next';
import { bedProducts } from '@/data/products';
import { CategoryPageClient } from '@/components/category/category-page-client';

export const metadata: Metadata = {
  title: 'Ор — Ори Дэлгүүр',
  description: 'Унтлагын өрөөнийхөө гол тавилгыг сонгоорой. Модон, металл, бүрээстэй ор.',
};

export default function BedPage() {
  return (
    <CategoryPageClient
      categoryName="Ор"
      categoryDescription="Унтлагын өрөөнийхөө гол тавилгыг сонгоорой."
      productCategory="bed"
      products={bedProducts}
    />
  );
}
