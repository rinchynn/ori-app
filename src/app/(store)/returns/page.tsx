import { RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export const metadata = { title: 'Буцаалтын бодлого — Ори Дэлгүүр' };

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Буцаалт, солилтын бодлого</h1>
      <p className="text-sm text-stone-500 mb-8">Худалдан авсан бүтээгдэхүүнтэй холбоотой буцаалт, солилтын нөхцөл.</p>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="h-5 w-5 text-stone-600" />
            <h2 className="text-base font-semibold text-stone-900">14 хоногийн буцаалт</h2>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Худалдан авснаас хойш 14 хоногийн дотор бүтээгдэхүүнийг буцааж болно. Бүтээгдэхүүн анхны байдлаараа, гэмтэлгүй, баглаа бүрэн байх шаардлагатай.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Буцаах боломжтой</h3>
            <ul className="space-y-1.5 text-sm text-stone-600">
              <li>• Хэмжээ тохирохгүй</li>
              <li>• Бүтээгдэхүүн гэмтэлтэй ирсэн</li>
              <li>• Захиалснаас өөр бараа ирсэн</li>
              <li>• Тайлбартай зөрүүтэй</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500" /> Буцаах боломжгүй</h3>
            <ul className="space-y-1.5 text-sm text-stone-600">
              <li>• Хэрэглэсэн, толбтой бараа</li>
              <li>• Баглаа нь задарсан</li>
              <li>• Тусгай захиалгаар хийгдсэн</li>
              <li>• 14 хоног өнгөрсөн</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-4">Буцаалтын процесс</h2>
          <div className="space-y-3">
            {['Бидэнтэй холбогдоно уу: +976 9595-0720', 'Буцаалтын хүсэлт баталгаажсны дараа бүтээгдэхүүнийг авч явна', 'Шалгаж баталгаажуулсны дараа 1-3 ажлын өдөрт мөнгийг буцаана'].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                <p className="text-sm text-stone-600 pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
