'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, ChevronDown, ChevronUp, Loader2, CheckCircle2 } from 'lucide-react';
import { useCartStore, useCartTotals } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';

type PaymentMethod = 'qpay' | 'loan';
type DeliveryMethod = 'standard' | 'express';

const CITIES = ['Улаанбаатар', 'Дархан', 'Эрдэнэт', 'Чойбалсан', 'Мөрөн'];
const DISTRICTS_UB = ['Баянгол', 'Баянзүрх', 'Сүхбаатар', 'Чингэлтэй', 'Хан-Уул', 'Сонгинохайрхан'];

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const { totalItems, totalPrice } = useCartTotals();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Улаанбаатар');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qpay');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = deliveryMethod === 'express' ? 15000 : 0;
  const grandTotal = totalPrice + deliveryFee;

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Нэрээ оруулна уу';
    if (!/^[0-9]{8}$/.test(phone)) e.phone = '8 оронтой утасны дугаар оруулна уу';
    if (!district) e.district = 'Дүүргээ сонгоно уу';
    if (address.trim().length < 5) e.address = 'Хаягаа оруулна уу';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Зөв имэйл оруулна уу';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate payment processing
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      clearCart();
    }, 2500);
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 text-center">
        <p className="text-stone-500">Сагсанд бараа байхгүй байна.</p>
        <Link href="/" className="mt-4 inline-flex items-center justify-center h-10 px-6 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors">
          Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900">Захиалга амжилттай!</h1>
        <p className="mt-2 text-sm text-stone-500">
          Таны захиалга хүлээн авлаа. Төлбөр баталгаажсны дараа бэлтгэж эхэлнэ.
        </p>
        <p className="mt-1 text-sm text-stone-500">Баталгаажуулах мэдээллийг SMS-ээр илгээнэ.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center h-11 px-6 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors">
            Нүүр хуудас
          </Link>
          <Link href="/order-tracking" className="inline-flex items-center justify-center h-11 px-6 border border-stone-300 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
            Захиалга шалгах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/cart" className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-stone-900">Захиалга</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-8">
          {/* LEFT — Form */}
          <div className="space-y-6">
            {/* Mobile summary toggle */}
            <div className="lg:hidden bg-white rounded-xl border border-stone-200 p-4">
              <button
                type="button"
                onClick={() => setSummaryOpen(!summaryOpen)}
                className="flex items-center justify-between w-full text-sm"
              >
                <span className="text-stone-600">{totalItems} бараа · {formatPrice(grandTotal)}</span>
                {summaryOpen ? <ChevronUp className="h-4 w-4 text-stone-400" /> : <ChevronDown className="h-4 w-4 text-stone-400" />}
              </button>
              {summaryOpen && (
                <div className="mt-3 space-y-2 border-t border-stone-100 pt-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      <div className="relative h-10 w-10 rounded bg-stone-100 shrink-0 overflow-hidden">
                        <Image src={item.product.images[0]} alt="" fill className="object-cover" sizes="40px" unoptimized />
                      </div>
                      <span className="flex-1 truncate text-stone-700">{item.product.name} × {item.quantity}</span>
                      <span className="text-stone-900 font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ① Contact */}
            <section className="bg-white rounded-xl border border-stone-200 p-5">
              <h2 className="text-sm font-semibold text-stone-900 mb-4">① Холбоо барих мэдээлэл</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Нэр *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" placeholder="Бат-Эрдэнэ" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Утас *</label>
                  <input type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 8))} className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" placeholder="99112233" />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Имэйл (заавал биш)</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" placeholder="bat@email.mn" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
            </section>

            {/* ② Address */}
            <section className="bg-white rounded-xl border border-stone-200 p-5">
              <h2 className="text-sm font-semibold text-stone-900 mb-4">② Хүргэлтийн хаяг</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Хот *</label>
                    <select value={city} onChange={(e) => { setCity(e.target.value); setDistrict(''); }} className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-900">
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Дүүрэг *</label>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-900">
                      <option value="">Сонгох</option>
                      {(city === 'Улаанбаатар' ? DISTRICTS_UB : [city]).map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Дэлгэрэнгүй хаяг *</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" placeholder="3-р хороо, 15-р байр, 301 тоот" />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Нэмэлт тайлбар</label>
                  <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900" placeholder="Орцны код, давхар г.м." />
                </div>
              </div>
            </section>

            {/* ③ Delivery */}
            <section className="bg-white rounded-xl border border-stone-200 p-5">
              <h2 className="text-sm font-semibold text-stone-900 mb-4">③ Хүргэлтийн арга</h2>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${deliveryMethod === 'standard' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
                  <input type="radio" name="delivery" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} className="accent-stone-900" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-900">Стандарт хүргэлт</p>
                    <p className="text-xs text-stone-500">3-5 ажлын өдөр</p>
                  </div>
                  <span className="text-sm font-medium text-emerald-600">Үнэгүй</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${deliveryMethod === 'express' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
                  <input type="radio" name="delivery" checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')} className="accent-stone-900" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-900">Яаралтай хүргэлт</p>
                    <p className="text-xs text-stone-500">1-2 ажлын өдөр</p>
                  </div>
                  <span className="text-sm font-medium text-stone-900">₮15,000</span>
                </label>
              </div>
            </section>

            {/* ④ Payment */}
            <section className="bg-white rounded-xl border border-stone-200 p-5">
              <h2 className="text-sm font-semibold text-stone-900 mb-1">④ Төлбөрийн арга</h2>
              <p className="text-xs text-stone-400 mb-4 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Таны төлбөрийн мэдээлэл бүрэн хамгаалагдсан</p>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'qpay' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'qpay'} onChange={() => setPaymentMethod('qpay')} className="accent-stone-900" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-900">QPay — Шууд төлөх</p>
                    <p className="text-xs text-stone-500">Банкны аппаар QR уншуулж төлнө</p>
                  </div>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">QPay</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'loan' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'loan'} onChange={() => setPaymentMethod('loan')} className="accent-stone-900" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-900">Хуваалт төлбөр</p>
                    <p className="text-xs text-stone-500">Зээлээр сар бүр хуваан төлнө</p>
                    <p className="text-xs text-stone-500">сард ~{formatPrice(Math.round(grandTotal / 12))}</p>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">12 сар</span>
                </label>
              </div>
              {paymentMethod === 'loan' && (
                <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-700">
                  Зээл олголт нь тухайн байгууллагын нөхцлөөс хамаарна. Баталгаажуулалтыг зээлийн байгууллага хийнэ.
                </div>
              )}
            </section>

            {/* Submit — mobile */}
            <div className="lg:hidden pb-safe">
              <button type="submit" disabled={submitting} className="flex items-center justify-center gap-2 w-full h-12 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 disabled:opacity-60 active:bg-stone-700 transition-colors">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Боловсруулж байна...</> : <>Захиалга баталх · {formatPrice(grandTotal)}</>}
              </button>
              <p className="mt-2 text-center text-[11px] text-stone-400">✓ Баталгаат хүргэлт · ✓ 14 хоног буцаалт · ✓ Жинхэнэ баталгаа</p>
            </div>
          </div>

          {/* RIGHT — Order Summary (desktop) */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl border border-stone-200 p-5 sticky top-24">
              <h2 className="text-base font-semibold text-stone-900 mb-4">Захиалгын товчлол</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg bg-stone-100 shrink-0 overflow-hidden">
                      <Image src={item.product.images[0]} alt="" fill className="object-cover" sizes="48px" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-900 font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-stone-400">{item.size} · ×{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-stone-900 shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200 space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Дүн ({totalItems})</span><span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Хүргэлт</span><span className={deliveryFee === 0 ? 'text-emerald-600 font-medium' : ''}>{deliveryFee === 0 ? 'Үнэгүй' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="h-px bg-stone-200" />
                <div className="flex justify-between text-base font-bold text-stone-900">
                  <span>Нийт</span><span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {grandTotal >= 500000 && (
                <div className="mt-3 p-2.5 bg-emerald-50 rounded-lg text-xs text-emerald-700 font-medium">
                  Хуваалт: сард ~{formatPrice(Math.round(grandTotal / 12))} × 12 сар
                </div>
              )}

              <button type="submit" disabled={submitting} className="mt-4 flex items-center justify-center gap-2 w-full h-12 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 disabled:opacity-60 transition-colors">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Боловсруулж байна...</> : 'Захиалга баталх'}
              </button>

              <p className="mt-3 text-center text-[10px] text-stone-400">
                ✓ Баталгаат хүргэлт · ✓ 14 хоног буцаалт · ✓ Жинхэнэ баталгаа
              </p>

              <div className="mt-4 space-y-2 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2 text-xs text-stone-500"><ShieldCheck className="h-3.5 w-3.5 text-stone-400" /> Аюулгүй төлбөр</div>
                <div className="flex items-center gap-2 text-xs text-stone-500"><Truck className="h-3.5 w-3.5 text-stone-400" /> УБ хотод үнэгүй хүргэлт</div>
                <div className="flex items-center gap-2 text-xs text-stone-500"><CreditCard className="h-3.5 w-3.5 text-stone-400" /> 12 сар хүртэл зээл</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
