import { CreditCard, Info } from 'lucide-react';

export const metadata = { title: 'Зээлийн нөхцөл — Ори Дэлгүүр' };

export default function InstallmentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Хуваалт төлбөр / Зээлийн нөхцөл</h1>
      <p className="text-sm text-stone-500 mb-8">Манай бүтээгдэхүүнийг зээлээр авах боломжтой.</p>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900">Зээлийн нөхцлүүд</h2>
              <p className="text-xs text-stone-500">Хамтрагч байгууллагууд</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { name: 'StorePay', terms: '6-12 сар', rate: '0% хүү (12 сар хүртэл)', min: '₮200,000' },
              { name: 'LendMN', terms: '6-24 сар', rate: '~2-4% хүү', min: '₮300,000' },
            ].map((p) => (
              <div key={p.name} className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 border border-stone-100">
                <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 shrink-0">
                  {p.name[0]}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-stone-900">{p.name}</p>
                  <p className="text-xs text-stone-500">Хугацаа: {p.terms} · Хүү: {p.rate} · Доод дүн: {p.min}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-4">Хэрхэн зээл авах вэ?</h2>
          <div className="space-y-3">
            {[
              'Бүтээгдэхүүнээ сонгож, сагсанд нэмнэ',
              'Захиалга өгөх хэсэгт "Хуваалт төлбөр" сонгоно',
              'Зээлийн байгууллага сонгоод, хүсэлт илгээнэ',
              'Зээлийн байгууллага баталгаажуулсны дараа захиалга идэвхжинэ',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                <p className="text-sm text-stone-600 pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl border border-amber-100 p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            <p className="font-medium">Анхааруулга</p>
            <p className="mt-1 text-xs leading-relaxed">Зээл олголт нь тухайн байгууллагын нөхцлөөс хамаарна. Ори Дэлгүүр нь зээлийн шийдвэрт оролцохгүй.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
