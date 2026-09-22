'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCartStore, useCartTotals } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const { totalItems, totalPrice } = useCartTotals();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-stone-300 mx-auto" />
        <h1 className="mt-4 text-xl font-bold text-stone-900">Таны сагс хоосон байна</h1>
        <p className="mt-2 text-sm text-stone-500">Бүтээгдэхүүн нэмж, захиалгаа өгнө үү.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center h-11 px-6 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
        >
          Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">
          Сагс <span className="text-base font-normal text-stone-500">({totalItems} бараа)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-stone-400 hover:text-red-600 transition-colors"
        >
          Бүгдийг устгах
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 space-y-4 lg:space-y-0">
        {/* Cart Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white rounded-xl border border-stone-200 p-4"
            >
              {/* Image */}
              <Link
                href={`/product/${item.product.slug}`}
                className="relative h-24 w-24 md:h-28 md:w-28 rounded-lg overflow-hidden bg-stone-100 shrink-0"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                  unoptimized
                />
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.product.slug}`}
                  className="text-sm font-semibold text-stone-900 hover:underline line-clamp-2"
                >
                  {item.product.name}
                </Link>
                <p className="mt-0.5 text-xs text-stone-500">Хэмжээ: {item.size}</p>

                {item.product.compareAtPrice && (
                  <p className="mt-1 text-xs text-stone-400 line-through">
                    {formatPrice(item.product.compareAtPrice)}
                  </p>
                )}
                <p className="text-sm font-bold text-stone-900 mt-0.5">
                  {formatPrice(item.product.price)}
                </p>

                {/* Quantity + Remove — mobile/desktop */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-10 w-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                      aria-label="Тоо хасах"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="h-10 w-10 flex items-center justify-center text-sm font-medium text-stone-900 border-x border-stone-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-10 w-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                      aria-label="Тоо нэмэх"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2.5 text-stone-400 hover:text-red-600 transition-colors"
                    aria-label="Устгах"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Line total — desktop only */}
              <div className="hidden md:flex flex-col items-end justify-between">
                <p className="text-base font-bold text-stone-900">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="mt-0">
          <div className="bg-white rounded-xl border border-stone-200 p-5 lg:sticky lg:top-24">
            <h2 className="text-base font-semibold text-stone-900 mb-4">Захиалгын товчлол</h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Дүн ({totalItems} бараа)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Хүргэлт</span>
                <span className="text-emerald-600 font-medium">Үнэгүй</span>
              </div>
              <div className="h-px bg-stone-200 my-1" />
              <div className="flex justify-between text-base font-bold text-stone-900">
                <span>Нийт</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Installment nudge */}
            {totalPrice >= 500000 && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-xs font-medium text-emerald-700">
                  Хуваалт төлбөр: сард ~{formatPrice(Math.round(totalPrice / 12))}-с
                </p>
                <p className="text-[10px] text-emerald-600 mt-0.5">12 сарын хуваалтаар</p>
              </div>
            )}

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="mt-4 flex items-center justify-center gap-2 w-full h-12 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
            >
              Захиалга өгөх
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="mt-2 flex items-center justify-center w-full h-10 border border-stone-300 text-sm font-medium text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Дэлгүүр рүү буцах
            </Link>

            {/* Trust badges */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="h-4 w-4 text-stone-400 shrink-0" />
                Аюулгүй төлбөр
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Truck className="h-4 w-4 text-stone-400 shrink-0" />
                Улаанбаатар хотод үнэгүй хүргэлт
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <RotateCcw className="h-4 w-4 text-stone-400 shrink-0" />
                14 хоногийн буцаалтын бодлого
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
