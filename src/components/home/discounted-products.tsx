import Link from 'next/link';
import { UI } from '@/lib/constants';
import { getDiscountedProducts } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';

export function DiscountedProducts() {
  const products = getDiscountedProducts().slice(0, 4);

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-stone-900">
            {UI.discounted.headline}
          </h2>
          <Link
            href="/mattress?sale=true"
            className="text-sm font-medium text-stone-900 border border-stone-300 rounded-lg px-4 py-2 hover:bg-stone-900 hover:text-white transition-colors"
          >
            {UI.discounted.cta}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
