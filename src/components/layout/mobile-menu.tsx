'use client';

import Link from 'next/link';
import { X, User, Phone, Mail } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { NAV, SITE } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[85vw] max-w-80 p-0" showCloseButton={false}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-14 border-b border-stone-200">
            <span className="text-lg font-bold text-stone-900">{SITE.nameLatin}</span>
            <div className="flex items-center gap-2">
              <Link
                href="/account"
                onClick={onClose}
                className="p-2 text-stone-700 hover:text-stone-900"
              >
                <User className="h-5 w-5" />
              </Link>
              <button onClick={onClose} className="p-2 text-stone-700 hover:text-stone-900">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Ангилал</p>
            </div>
            {NAV.categories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-sm font-medium text-stone-900 hover:bg-stone-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={NAV.sale.href}
              onClick={onClose}
              className="block px-4 py-3 text-sm font-medium text-red-500 hover:bg-stone-50 transition-colors"
            >
              {NAV.sale.label}
            </Link>

            <Separator className="my-4" />

            <div className="px-4 mb-2">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Хуудас</p>
            </div>
            {[
              { label: 'Салбарууд', href: '/showroom' },
              { label: 'Хүргэлт', href: '/delivery' },
              { label: 'Зээлийн мэдээлэл', href: '/installment' },
              { label: 'Хадгалсан', href: '/wishlist' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Separator className="my-4" />

            <div className="px-4 mb-2">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Тусламж</p>
            </div>
            {[
              { label: 'Захиалга шалгах', href: '/order-tracking' },
              { label: 'Буцаалт', href: '/returns' },
              { label: 'Түгээмэл асуулт', href: '/faq' },
              { label: 'Нууцлал', href: '/privacy' },
              { label: 'Үйлчилгээний нөхцөл', href: '/terms' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-stone-200 px-4 py-4 space-y-2">
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900"
            >
              <Mail className="h-4 w-4" />
              {SITE.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
