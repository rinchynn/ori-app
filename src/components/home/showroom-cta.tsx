import Link from 'next/link';
import { UI } from '@/lib/constants';

export function ShowroomCTA() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/showroom/store.jpg')" }}
          />
          <div className="absolute inset-0 bg-stone-900/50" />
          <div className="relative text-center px-4 py-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              {UI.showroom.headline}
            </h2>
            <p className="mt-2 text-base text-stone-200 max-w-md mx-auto">
              {UI.showroom.subheadline}
            </p>
            <Link
              href="/showroom"
              className="mt-6 inline-flex items-center justify-center h-11 px-6 bg-white text-stone-900 text-sm font-semibold rounded-lg hover:bg-stone-100 transition-colors"
            >
              {UI.showroom.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
