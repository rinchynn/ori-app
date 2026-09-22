'use client';

import { Store, Truck, CreditCard, Bell, Shield } from 'lucide-react';

const settingSections = [
  {
    icon: Store,
    title: 'Дэлгүүрийн мэдээлэл',
    description: 'Нэр, лого, холбоо барих, ажлын цаг',
    fields: [
      { label: 'Дэлгүүрийн нэр', value: 'Ори Дэлгүүр', type: 'text' as const },
      { label: 'Утас', value: '7700-1234', type: 'text' as const },
      { label: 'Имэйл', value: 'info@ori.mn', type: 'email' as const },
      { label: 'Хаяг', value: 'Улаанбаатар, Баянгол дүүрэг, 3-р хороо', type: 'text' as const },
    ],
  },
  {
    icon: Truck,
    title: 'Хүргэлт',
    description: 'Хүргэлтийн бүс, үнэ, хугацаа',
    fields: [
      { label: 'Үнэгүй хүргэлтийн доод дүн', value: '500,000', type: 'text' as const },
      { label: 'УБ хүргэлтийн хугацаа', value: '3-5 ажлын өдөр', type: 'text' as const },
      { label: 'Орон нутгийн хүргэлт', value: '5-10 ажлын өдөр', type: 'text' as const },
    ],
  },
  {
    icon: CreditCard,
    title: 'Төлбөр',
    description: 'Төлбөрийн арга, зээлийн нөхцөл',
    fields: [
      { label: 'Банкны дансны нэр', value: 'Ори ХХК', type: 'text' as const },
      { label: 'Дансны дугаар', value: '5000-XXXX-XXXX', type: 'text' as const },
      { label: 'StorePay идэвхтэй', value: 'Тийм', type: 'text' as const },
    ],
  },
  {
    icon: Bell,
    title: 'Мэдэгдэл',
    description: 'Захиалга, нөөц, маркетинг мэдэгдлүүд',
    fields: [
      { label: 'Захиалгын мэдэгдэл', value: 'Имэйл + SMS', type: 'text' as const },
      { label: 'Нөөц дуусах анхааруулга', value: '5 ширхэгээс бага', type: 'text' as const },
    ],
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Тохиргоо</h1>
        <p className="text-sm text-stone-500 mt-1">Дэлгүүрийн ерөнхий тохиргоо</p>
      </div>

      {settingSections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl border border-stone-200">
          <div className="flex items-start gap-3 p-5 border-b border-stone-200">
            <div className="h-9 w-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
              <section.icon className="h-4 w-4 text-stone-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">{section.title}</h2>
              <p className="text-xs text-stone-500 mt-0.5">{section.description}</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {section.fields.map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-medium text-stone-500 mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full h-9 px-3 rounded-lg border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Security */}
      <div className="bg-white rounded-xl border border-stone-200">
        <div className="flex items-start gap-3 p-5 border-b border-stone-200">
          <div className="h-9 w-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-stone-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-stone-900">Нууцлал</h2>
            <p className="text-xs text-stone-500 mt-0.5">Нэвтрэх нууц үг солих</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1.5">Одоогийн нууц үг</label>
            <input type="password" className="w-full h-9 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1.5">Шинэ нууц үг</label>
            <input type="password" className="w-full h-9 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1.5">Шинэ нууц үг давтах</label>
            <input type="password" className="w-full h-9 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="h-10 px-6 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors">
          Хадгалах
        </button>
      </div>
    </div>
  );
}
