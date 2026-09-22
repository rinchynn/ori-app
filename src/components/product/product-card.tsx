'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { cn, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        'group block bg-white rounded-lg border border-stone-200 overflow-hidden transition-all duration-200 hover:shadow-md',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-3 lg:p-4">
        <h3 className="text-xs sm:text-sm lg:text-[15px] font-medium text-stone-800 line-clamp-2 leading-snug min-h-[2.2em] sm:min-h-[2.5em]">
          {product.name}
        </h3>
        <div className="mt-1.5 sm:mt-2 flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2">
          <span className="text-xs sm:text-sm lg:text-base font-bold text-stone-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[10px] sm:text-xs text-stone-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
