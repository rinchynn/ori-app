import Link from 'next/link';
import { Landmark, CreditCard, Wallet } from 'lucide-react';
import { UI } from '@/lib/constants';

const installmentOptions = [
  {
    icon: Landmark,
    title: 'Банкны зээл',
    description: '12 сар хүртэл хүүгүй зээл. Хаан, Голомт, ХХ банк.',
  },
  {
    icon: CreditCard,
    title: 'Зээлийн карт',
    description: 'Visa, Mastercard картаар хуваан төлөх боломж.',
  },
  {
    icon: Wallet,
    title: 'StorePay',
    description: 'StorePay-р хялбар, хурдан зээлээр авах.',
  },
];

export function InstallmentBlock() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 lg:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-stone-900">
            {UI.installment.headline}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            Өндөр үнэтэй бүтээгдэхүүнийг хялбар нөхцөлөөр авах боломж
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {installmentOptions.map((opt) => (
            <div
              key={opt.title}
              className="flex flex-col items-center text-center p-6 lg:p-8 bg-white rounded-xl border border-stone-200"
            >
              <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                <opt.icon className="h-5 w-5 text-stone-700" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">{opt.title}</h3>
              <p className="mt-2 text-sm text-stone-500 leading-relaxed">{opt.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/installment"
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            {UI.installment.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
