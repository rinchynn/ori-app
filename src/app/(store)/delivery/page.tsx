import { Truck, Clock, MapPin, Package } from 'lucide-react';

export const metadata = { title: 'Хүргэлтийн мэдээлэл — Ори Дэлгүүр' };

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Хүргэлтийн мэдээлэл</h1>
      <p className="text-sm text-stone-500 mb-8">Бүтээгдэхүүн хүргэлтийн нөхцөл, хугацаа.</p>

      <div className="space-y-4">
        {[
          { icon: Truck, title: 'Улаанбаатар хот', desc: '₮500,000-с дээш захиалгад хүргэлт үнэгүй. Стандарт: 3-5 ажлын өдөр. Яаралтай: 1-2 өдөр (+₮15,000).' },
          { icon: MapPin, title: 'Орон нутаг', desc: 'Дархан, Эрдэнэт болон бусад аймагт 5-10 ажлын өдөрт хүргэнэ. Хүргэлтийн төлбөр байршлаас хамаарна.' },
          { icon: Clock, title: 'Угсралт', desc: 'Орны угсралт үнэгүй (Улаанбаатар). Манай мэргэжилтэн баг хүргэлтийн өдөр угсарна.' },
          { icon: Package, title: 'Баглаа боодол', desc: 'Бүх бүтээгдэхүүнийг чанартай баглаж, гэмтлээс хамгаалсан байдлаар хүргэнэ.' },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-4 bg-white rounded-xl border border-stone-200 p-5">
            <div className="h-10 w-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
              <item.icon className="h-5 w-5 text-stone-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">{item.title}</h2>
              <p className="mt-1 text-sm text-stone-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
