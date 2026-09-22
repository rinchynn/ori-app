import Link from 'next/link';
import { Check } from 'lucide-react';
import { UI } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export function BundleSpotlight() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-12 items-center rounded-2xl overflow-hidden bg-stone-100">
          {/* Image */}
          <div
            className="lg:col-span-3 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[200px] sm:min-h-[280px] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero/bundle.jpg')" }}
          />

          {/* Content */}
          <div className="lg:col-span-2 p-6 lg:p-8 lg:pr-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
              Багц хямдрал
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 leading-tight">
              {UI.bundle.headline}
            </h2>
            <p className="mt-2 text-base text-stone-600 leading-relaxed">
              {UI.bundle.subheadline}
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                `${formatPrice(160000)}-с ${formatPrice(600000)} хүртэл хэмнэнэ`,
                'Үнэгүй хүргэлт + угсралт',
                'Нэг баталгаат хугацаа',
                'Тохирсон хэмжээ, хатуулаг',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                  <Check className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/bed-with-mattress"
              className="mt-6 inline-flex items-center justify-center h-11 px-6 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
            >
              {UI.bundle.cta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
