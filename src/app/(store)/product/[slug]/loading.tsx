export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 bg-stone-200 rounded mb-6" />

      <div className="lg:grid lg:grid-cols-[55%_1fr] lg:gap-10">
        {/* Gallery skeleton */}
        <div>
          <div className="aspect-square bg-stone-200 rounded-xl" />
          <div className="flex gap-2 mt-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 w-16 lg:h-20 lg:w-20 bg-stone-200 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="mt-6 lg:mt-0 space-y-4">
          <div className="h-7 w-3/4 bg-stone-200 rounded" />
          <div className="h-4 w-1/2 bg-stone-200 rounded" />
          <div className="h-4 w-32 bg-stone-200 rounded" />
          <div className="h-9 w-48 bg-stone-200 rounded" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-20 bg-stone-200 rounded-lg" />
            ))}
          </div>
          <div className="h-4 w-28 bg-stone-200 rounded" />
          <div className="flex gap-3 pt-2">
            <div className="flex-1 h-12 bg-stone-200 rounded-lg" />
            <div className="flex-1 h-12 bg-stone-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
