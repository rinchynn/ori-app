import Link from 'next/link';
import { UI } from '@/lib/constants';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/bedroom.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex items-center min-h-[28vh] sm:min-h-[36vh] lg:min-h-[50vh]">
        <div className="max-w-lg py-8 sm:py-16 lg:py-20">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {UI.hero.headline}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
            {UI.hero.subheadline}
          </p>
          <Link
            href="/mattress"
            className="mt-5 sm:mt-6 inline-flex items-center justify-center h-11 px-8 bg-white text-stone-900 text-sm font-semibold rounded-lg hover:bg-stone-100 transition-colors"
          >
            {UI.hero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
