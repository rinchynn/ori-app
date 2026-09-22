export const metadata = { title: 'Нууцлалын бодлого — Ори Дэлгүүр' };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Нууцлалын бодлого</h1>
      <p className="text-sm text-stone-500 mb-8">Сүүлд шинэчлэгдсэн: 2024 оны 12 сар</p>

      <div className="prose prose-stone prose-sm max-w-none space-y-6">
        <section className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-3">Хувийн мэдээлэл цуглуулах</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Бид таны нэр, утасны дугаар, имэйл хаяг, хүргэлтийн хаяг зэрэг мэдээллийг зөвхөн захиалга боловсруулах, хүргэлт хийх зорилгоор цуглуулна.
            Төлбөрийн мэдээлэл (картын дугаар г.м.) манай системд хадгалагдахгүй бөгөөд зөвхөн төлбөрийн түнш байгууллагаар дамжин боловсруулагдана.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-3">Мэдээлэл ашиглах</h2>
          <ul className="space-y-1.5 text-sm text-stone-600">
            <li>• Захиалга боловсруулах, хүргэлт хийх</li>
            <li>• Захиалгын статусыг мэдэгдэх</li>
            <li>• Хэрэглэгчийн асуулт, гомдолд хариулах</li>
            <li>• Үйлчилгээгээ сайжруулах</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-3">Мэдээлэл хамгаалах</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Бид таны мэдээллийг аюулгүй байдлын стандартын дагуу хадгалж, гуравдагч этгээдэд дамжуулахгүй.
            Зөвхөн хуулиар шаардлагатай тохиолдолд эрх бүхий байгууллагад гаргаж өгнө.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-3">Холбоо барих</h2>
          <p className="text-sm text-stone-600">
            Нууцлалтай холбоотой асуулт байвал: <a href="mailto:info@ori.mn" className="text-stone-900 underline">info@ori.mn</a> эсвэл <a href="tel:+97695950720" className="text-stone-900 underline">+976 9595-0720</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
