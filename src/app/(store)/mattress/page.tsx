import type { Metadata } from 'next';
import { mattressProducts } from '@/data/products';
import { CategoryPageClient } from '@/components/category/category-page-client';

export const metadata: Metadata = {
  title: 'Матрас — Ори Дэлгүүр',
  description: 'Таны биед тохирсон матрасыг олоорой. Memory foam, spring, latex, hybrid матрас.',
};

export default function MattressPage() {
  return (
    <CategoryPageClient
      categoryName="Матрас"
      categoryDescription="Таны биед тохирсон матрасыг олоорой. Бид зөвхөн чанартай матрас санал болгодог."
      productCategory="mattress"
      products={mattressProducts}
    />
  );
}
