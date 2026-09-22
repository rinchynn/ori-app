interface CategoryBannerProps {
  name: string;
  description: string;
  productCount: number;
}

export function CategoryBanner({ name, description, productCount }: CategoryBannerProps) {
  return (
    <div className="bg-stone-100 rounded-xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-stone-900">{name}</h1>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-base text-stone-600 max-w-lg">{description}</p>
      <p className="mt-1.5 text-xs text-stone-500">{productCount} бүтээгдэхүүн</p>
    </div>
  );
}
