'use client';

import type { ProductSize, SizeLabel } from '@/types/product';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected: SizeLabel | null;
  onSelect: (size: SizeLabel) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <p className="text-sm font-medium text-stone-900 mb-2">Хэмжээ</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.label}
            disabled={!size.inStock}
            onClick={() => onSelect(size.label)}
            className={cn(
              'h-10 px-4 rounded-lg border text-sm font-medium transition-colors',
              selected === size.label
                ? 'bg-stone-900 text-white border-stone-900'
                : size.inStock
                  ? 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                  : 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed line-through'
            )}
          >
            <span>{size.label}</span>
            <span className="block text-[10px] font-normal opacity-70">{size.dimensions}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
