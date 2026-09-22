'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { UI } from '@/lib/constants';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-stone-900 text-center mb-6 lg:mb-10">
          {UI.testimonials.headline}
        </h2>

        {/* Desktop: show 3 */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <TestimonialCard testimonial={testimonials[current]} />
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-stone-300 text-stone-600 hover:bg-stone-50 active:bg-stone-100"
              aria-label="Өмнөх"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === current ? 'bg-stone-900' : 'bg-stone-300'
                  }`}
                  aria-label={`Сэтгэгдэл ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2.5 rounded-full border border-stone-300 text-stone-600 hover:bg-stone-50 active:bg-stone-100"
              aria-label="Дараах"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="bg-stone-50 rounded-xl p-5 lg:p-6 border border-stone-200">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-stone-700 leading-relaxed line-clamp-4">{testimonial.text}</p>
      <div className="mt-4 pt-3 border-t border-stone-200">
        <p className="text-sm font-semibold text-stone-900">{testimonial.name}</p>
        <p className="text-xs text-stone-500 mt-0.5">{testimonial.product}</p>
      </div>
    </div>
  );
}
