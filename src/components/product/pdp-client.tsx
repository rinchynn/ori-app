'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, RefreshCcw, ShieldCheck, ShoppingCart, Zap, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { Product, SizeLabel } from '@/types/product';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { ProductGallery } from './product-gallery';
import { PriceBlock } from './price-block';
import { SizeSelector } from './size-selector';
import { SpecsOverview } from './specs-overview';
import { ProductCard } from './product-card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useCartStore } from '@/store/cart-store';
import { CATEGORY_NAMES, UI } from '@/lib/constants';
import { cn, formatPrice } from '@/lib/utils';

interface PDPClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function PDPClient({ product, relatedProducts }: PDPClientProps) {
  const [selectedSize, setSelectedSize] = useState<SizeLabel | null>(
    product.sizes.find((s) => s.inStock)?.label ?? null
  );
  const addItem = useCartStore((s) => s.addItem);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showStickyATC, setShowStickyATC] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyATC(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const router = useRouter();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, 1);
  };

  const handleBuyNow = useCallback(() => {
    if (!selectedSize) return;
    addItem(product, selectedSize, 1);
    router.push('/checkout');
  }, [selectedSize, product, addItem, router]);

  const categoryName = CATEGORY_NAMES[product.category];

  const stockIcon =
    product.stockStatus === 'in-stock' ? <CheckCircle className="h-4 w-4 text-emerald-500" /> :
    product.stockStatus === 'low-stock' ? <AlertTriangle className="h-4 w-4 text-orange-500" /> :
    <XCircle className="h-4 w-4 text-red-500" />;

  const stockText =
    product.stockStatus === 'in-stock' ? UI.product.inStock :
    product.stockStatus === 'low-stock' ? UI.product.lowStock :
    UI.product.outOfStock;

  const stockColor =
    product.stockStatus === 'in-stock' ? 'text-emerald-600' :
    product.stockStatus === 'low-stock' ? 'text-orange-600' :
    'text-red-600';

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pb-16">
        <Breadcrumb
          items={[
            { label: categoryName, href: `/${product.category}` },
            { label: product.name },
          ]}
        />

        {/* Main 2-column layout */}
        <div className="lg:grid lg:grid-cols-[55%_1fr] lg:gap-10">
          {/* Gallery */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product info */}
          <div className="mt-6 lg:mt-0 space-y-5">
            {/* Title */}
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-stone-500">{product.shortDescription}</p>
            </div>

            {/* Price */}
            <PriceBlock
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              installmentPerMonth={product.installmentPerMonth}
            />

            {/* Size selector */}
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Availability */}
            <div className={cn('flex items-center gap-2 text-sm font-medium', stockColor)}>
              {stockIcon}
              {stockText}
            </div>

            {/* Delivery */}
            <div className="space-y-1 text-sm text-stone-600">
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-stone-400" />
                {UI.product.deliveryUB}
              </p>
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-stone-400" />
                {UI.product.deliveryRegion}
              </p>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || product.stockStatus === 'out-of-stock'}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                {product.stockStatus === 'out-of-stock' ? UI.product.notify : UI.product.addToCart}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize || product.stockStatus === 'out-of-stock'}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border border-stone-300 text-stone-900 text-sm font-semibold hover:bg-stone-50 disabled:bg-stone-100 disabled:text-stone-400 disabled:cursor-not-allowed transition-colors"
              >
                <Zap className="h-4 w-4" />
                {UI.product.buyNow}
              </button>
            </div>

            {/* Trust microcopy */}
            <div className="flex flex-wrap gap-4 text-xs text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <RefreshCcw className="h-3.5 w-3.5" /> 30 хоногийн буцаалт
              </span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" /> Үнэгүй хүргэлт (₮500,000+)
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> {product.warranty.years} жилийн баталгаа
              </span>
            </div>
          </div>
        </div>

        {/* Specs overview */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Техникийн үзүүлэлт</h2>
          <SpecsOverview product={product} />
        </div>

        {/* Details accordion */}
        <div className="mt-12">
          <Accordion className="space-y-2">
            <AccordionItem className="bg-white rounded-xl border border-stone-200 px-5">
              <AccordionTrigger className="text-sm font-medium text-stone-900 py-4 hover:no-underline">
                Дэлгэрэнгүй
              </AccordionTrigger>
              <AccordionContent className="text-sm text-stone-600 leading-relaxed pb-4">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="bg-white rounded-xl border border-stone-200 px-5">
              <AccordionTrigger className="text-sm font-medium text-stone-900 py-4 hover:no-underline">
                Хүргэлт & Угсралт
              </AccordionTrigger>
              <AccordionContent className="text-sm text-stone-600 leading-relaxed pb-4">
                {product.deliveryNotes}
                {product.category === 'bed' && product.assemblyRequired && (
                  <p className="mt-2">{product.assemblyNotes}</p>
                )}
                {product.category === 'bed-with-mattress' && product.assemblyRequired && (
                  <p className="mt-2">{product.assemblyNotes}</p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="bg-white rounded-xl border border-stone-200 px-5">
              <AccordionTrigger className="text-sm font-medium text-stone-900 py-4 hover:no-underline">
                Баталгаа
              </AccordionTrigger>
              <AccordionContent className="text-sm text-stone-600 leading-relaxed pb-4">
                {product.warranty.description}
              </AccordionContent>
            </AccordionItem>
            {product.category === 'mattress' && product.careInstructions.length > 0 && (
              <AccordionItem className="bg-white rounded-xl border border-stone-200 px-5">
                <AccordionTrigger className="text-sm font-medium text-stone-900 py-4 hover:no-underline">
                  Арчилгаа
                </AccordionTrigger>
                <AccordionContent className="text-sm text-stone-600 leading-relaxed pb-4">
                  <ul className="list-disc list-inside space-y-1">
                    {product.careInstructions.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              {UI.product.relatedProducts}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile ATC */}
      <div
        className={cn(
          'lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300',
          showStickyATC ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 pb-safe">
          <div>
            <p className="text-lg font-bold text-stone-900">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-stone-400 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || product.stockStatus === 'out-of-stock'}
            className="flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            {UI.product.addToCart}
          </button>
        </div>
      </div>
    </>
  );
}
