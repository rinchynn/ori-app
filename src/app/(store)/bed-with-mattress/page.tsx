import type { Metadata } from 'next';
import { bundleProducts } from '@/data/products';
import { CategoryPageClient } from '@/components/category/category-page-client';

export const metadata: Metadata = {
  title: 'Ор + Матрас багц — Ори Дэлгүүр',
  description: 'Ор болон матрасыг хамтдаа авахад илүү хэмнэлттэй. Багц хямдрал.',
};

export default function BundlePage() {
  return (
    <CategoryPageClient
      categoryName="Ор + Матрас"
      categoryDescription="Хамтдаа авахад илүү хэмнэлттэй."
      productCategory="bed-with-mattress"
      products={bundleProducts}
    />
  );
}
