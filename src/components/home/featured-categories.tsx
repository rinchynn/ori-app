import Link from 'next/link';
import { categories } from '@/data/categories';

export function FeaturedCategories() {
  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 overflow-x-auto no-scrollbar py-2 px-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group flex flex-col items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden border-2 border-stone-200 group-hover:border-stone-900 transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
