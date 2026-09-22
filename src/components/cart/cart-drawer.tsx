'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore, useCartTotals } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { UI } from '@/lib/constants';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const { totalItems, totalPrice } = useCartTotals();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col p-0">
        <SheetHeader className="px-4 py-4 border-b border-stone-200">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold text-stone-900">
            <ShoppingBag className="h-5 w-5" />
            {UI.cart.title} ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
            <ShoppingBag className="h-12 w-12 text-stone-300 mb-4" />
            <p className="text-sm text-stone-500 mb-4">{UI.cart.empty}</p>
            <Button variant="outline" onClick={closeCart}>
              {UI.cart.continueShopping}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-stone-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-sm font-medium text-stone-900 line-clamp-2 hover:underline"
                      onClick={closeCart}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-stone-500 mt-0.5">{item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-9 w-9 rounded-md border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-50"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-medium w-7 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-9 w-9 rounded-md border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                          aria-label="Устгах"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">{UI.cart.total}</span>
                <span className="text-lg font-bold text-stone-900">{formatPrice(totalPrice)}</span>
              </div>
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex items-center justify-center w-full h-12 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {UI.cart.checkout}
              </Link>
              <Button variant="outline" className="w-full" onClick={closeCart}>
                {UI.cart.continueShopping}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
