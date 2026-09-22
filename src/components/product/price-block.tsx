import { formatPrice } from '@/lib/utils';

interface PriceBlockProps {
  price: number;
  compareAtPrice?: number;
  installmentPerMonth?: number;
}

export function PriceBlock({ price, compareAtPrice }: PriceBlockProps) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl lg:text-3xl font-bold text-stone-900">
          {formatPrice(price)}
        </span>
        {compareAtPrice && (
            <span className="text-base text-stone-400 line-through">
              {formatPrice(compareAtPrice)}
            </span>
        )}
      </div>
    </div>
  );
}
