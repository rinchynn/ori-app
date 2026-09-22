import { Truck, RefreshCcw, ShieldCheck, CreditCard } from 'lucide-react';
import { UI } from '@/lib/constants';

const iconMap = {
  Truck,
  RefreshCcw,
  ShieldCheck,
  CreditCard,
} as const;

export function TrustSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-stone-900 text-center mb-6 lg:mb-10">
          {UI.trust.headline}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {UI.trust.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-stone-700" />
                </div>
                <h3 className="text-sm lg:text-base font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-1 text-xs lg:text-sm text-stone-500">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
