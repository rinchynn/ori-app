'use client';

import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import type { Product, ProductCategory } from '@/types/product';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { CategoryBanner } from './category-banner';
import { SortBar } from './sort-bar';
import { FilterSidebar, type ActiveFilters } from './filter-sidebar';
import { ProductCard } from '@/components/product/product-card';
import { FIRMNESS_LABELS } from '@/lib/constants';

interface CategoryPageClientProps {
  categoryName: string;
  categoryDescription: string;
  productCategory: ProductCategory;
  products: Product[];
}

export function CategoryPageClient({
  categoryName,
  categoryDescription,
  productCategory,
  products,
}: CategoryPageClientProps) {
  const [sort, setSort] = useState('recommended');
  const [filterOpen, setFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  // Apply filters
  const filteredProducts = products.filter((p) => {
    // Size filter
    const sizeFilter = (activeFilters['Хэмжээ'] as string[] | undefined) ?? [];
    if (sizeFilter.length > 0 && !p.sizes.some((s) => sizeFilter.includes(s.label))) return false;

    // Firmness filter (mattress / bundle)
    const firmnessFilter = (activeFilters['Хатуулаг'] as string[] | undefined) ?? [];
    if (firmnessFilter.length > 0) {
      if (p.category === 'mattress') {
        const label = FIRMNESS_LABELS[p.firmness] ?? '';
        if (!firmnessFilter.includes(label)) return false;
      } else if (p.category === 'bed-with-mattress') {
        const label = FIRMNESS_LABELS[p.mattress.firmness] ?? '';
        if (!firmnessFilter.includes(label)) return false;
      }
    }

    // Material filter (mattress)
    const materialFilter = (activeFilters['Материал'] as string[] | undefined) ?? [];
    if (materialFilter.length > 0 && p.category === 'mattress') {
      if (!materialFilter.some((m) => p.material.toLowerCase().includes(m.toLowerCase()))) return false;
    }

    // Frame material filter (bed / bundle)
    const frameFilter = (activeFilters['Хүрээ материал'] as string[] | undefined) ?? [];
    if (frameFilter.length > 0) {
      if (p.category === 'bed' && !frameFilter.some((m) => p.frameMaterial.includes(m))) return false;
      if (p.category === 'bed-with-mattress' && !frameFilter.some((m) => p.bedFrame.material.includes(m))) return false;
    }

    // Style filter (bed)
    const styleFilter = (activeFilters['Загвар'] as string[] | undefined) ?? [];
    if (styleFilter.length > 0 && p.category === 'bed') {
      if (!styleFilter.some((s) => p.style.includes(s))) return false;
    }

    // Color filter (bed)
    const colorFilter = (activeFilters['Өнгө'] as string[] | undefined) ?? [];
    if (colorFilter.length > 0 && p.category === 'bed') {
      if (!p.colors.some((c) => colorFilter.includes(c.name))) return false;
    }

    // Toggle: in-stock only
    if (activeFilters.inStockOnly && p.stockStatus === 'out-of-stock') return false;

    // Toggle: discount only
    if (activeFilters.discountOnly && !p.compareAtPrice) return false;

    // Toggle: storage only
    if (activeFilters.storageOnly) {
      if (p.category === 'bed' && !p.storage) return false;
      if (p.category === 'bed-with-mattress' && !p.bedFrame.storage) return false;
    }

    // Price range filter
    if (activeFilters.priceMin != null && p.price < (activeFilters.priceMin as number)) return false;
    if (activeFilters.priceMax != null && p.price > (activeFilters.priceMax as number)) return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'newest': return 0;
      case 'bestselling': return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      case 'discount': {
        const dA = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0;
        const dB = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0;
        return dB - dA;
      }
      default: return 0;
    }
  });

  const visible = sortedProducts.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pb-16">
      <Breadcrumb items={[{ label: categoryName }]} />
      <CategoryBanner
        name={categoryName}
        description={categoryDescription}
        productCount={products.length}
      />

      <SortBar
        count={filteredProducts.length}
        sort={sort}
        onSortChange={setSort}
        onFilterToggle={() => setFilterOpen(true)}
      />

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 mt-6">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block sticky top-20 self-start">
          <FilterSidebar
            category={productCategory}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            maxPrice={Math.max(...products.map(p => p.price))}
          />
        </aside>

        {/* Product grid */}
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleCount < sortedProducts.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="h-10 px-6 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Дараагийнхыг харуулах
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="w-[85vw] max-w-80 p-0">
          <FilterSidebar
            category={productCategory}
            mobile
            onClose={() => setFilterOpen(false)}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            maxPrice={Math.max(...products.map(p => p.price))}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
