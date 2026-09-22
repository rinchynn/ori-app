'use client';

import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist-store';
import { ProductCard } from '@/components/product/product-card';

export default function WishlistPage() {
  const { items, clearAll } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-stone-300 mx-auto" />
        <h1 className="mt-4 text-xl font-bold text-stone-900">Хадгалсан бүтээгдэхүүн</h1>
        <p className="mt-2 text-sm text-stone-500">Танд одоогоор хадгалсан бараа байхгүй байна.</p>
        <p className="mt-1 text-xs text-stone-400">Дуртай бүтээгдэхүүнээ зүрхэн дээр дарж хадгална уу.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center h-11 px-6 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
        >
          Бүтээгдэхүүн үзэх
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">
          Хадгалсан бүтээгдэхүүн{' '}
          <span className="text-base font-normal text-stone-500">({items.length})</span>
        </h1>
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Бүгдийг устгах
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
