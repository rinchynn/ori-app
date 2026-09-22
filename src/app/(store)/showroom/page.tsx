import { MapPin, Phone, Clock } from 'lucide-react';
import { SITE } from '@/lib/constants';
import Image from 'next/image';

export const metadata = { title: 'Салбар, байршил — Ори Дэлгүүр' };

export default function ShowroomPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Дэлгүүр, шоурүүм</h1>
      <p className="text-sm text-stone-500 mb-8">Манай бүтээгдэхүүнийг биечлэн туршиж үзээрэй.</p>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="relative h-56 md:h-72 bg-stone-200">
          <Image src="/images/showroom/store.jpg" alt="Ори Дэлгүүр шоурүүм" fill className="object-cover" unoptimized />
        </div>
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">Ори Дэлгүүр — Үндсэн салбар</h2>
          <div className="space-y-3 text-sm text-stone-600">
            <p className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
              {SITE.address}
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-stone-400 shrink-0" />
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-stone-900">{SITE.phone}</a>
            </p>
            <p className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-stone-400 shrink-0" />
              {SITE.workingHours}
            </p>
          </div>
          <div className="pt-4 border-t border-stone-200">
            <h3 className="text-sm font-medium text-stone-900 mb-2">Чиглэл</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Хан-Уул дүүрэг, 3-р хорооны нутаг дэвсгэрт байрладаг. Зайсангийн гүүрнээс баруун тийш 500 метр явна.
              Автомашины зогсоол үнэгүй.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
