'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
        <Image
          src={images[selected]}
          alt={`${name} - ${selected + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
          unoptimized
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'relative h-16 w-16 lg:h-20 lg:w-20 shrink-0 rounded-lg overflow-hidden bg-stone-100 border-2 transition-colors',
                i === selected ? 'border-stone-900' : 'border-transparent hover:border-stone-300'
              )}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
