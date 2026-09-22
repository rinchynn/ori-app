import type { Metadata } from 'next';
import { allProducts, getProductBySlug, getProductsByCategory } from '@/data/products';
import { PDPClient } from '@/components/product/pdp-client';
import { DynamicProductPage } from '@/components/product/dynamic-pdp';
import { formatPrice } from '@/lib/utils';
import { CATEGORY_NAMES } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Бүтээгдэхүүн — Ори Дэлгүүр' };
  return {
    title: `${product.name} — Ори Дэлгүүр`,
    description: `${product.shortDescription}. ${formatPrice(product.price)}. ${CATEGORY_NAMES[product.category]}.`,
  };
}

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (product) {
    const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id);
    return <PDPClient product={product} relatedProducts={related} />;
  }

  // Product not in static data — may be admin-added, render client-side lookup
  return <DynamicProductPage slug={slug} />;
}
