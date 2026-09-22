'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, Phone, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SITE } from '@/lib/constants';
import { useCartStore, useCartTotals } from '@/store/cart-store';
import { cn } from '@/lib/utils';
import { MobileMenu } from './mobile-menu';
import { allProducts } from '@/data/products';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const { totalItems, totalPrice } = useCartTotals();
  const router = useRouter();

  const searchResults = searchQuery.trim().length >= 2
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const formatPrice = (price: number) =>
    price.toLocaleString('mn-MN') + '₮';

  function navigateToProduct(slug: string) {
    router.push(`/product/${slug}`);
    setSearchQuery('');
    setMobileSearchOpen(false);
    setSearchFocused(false);
  }

  return (
    <>
      {/* Top utility bar — hidden on mobile */}
      <div className="hidden sm:block bg-stone-800 text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-stone-300 transition-colors">
              <Phone className="h-3 w-3" />
              <span>{SITE.phone}</span>
            </a>
            <span className="text-stone-500">|</span>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-stone-300 transition-colors">
              {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/showroom" className="flex items-center gap-1.5 hover:text-stone-300 transition-colors">
              <MapPin className="h-3 w-3" />
              Салбарууд
            </Link>
            <Link href="/order-tracking" className="hover:text-stone-300 transition-colors">
              Захиалга шалгах
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-white border-b border-stone-100 transition-all duration-200',
          scrolled && 'shadow-sm'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 h-14 sm:h-16 lg:h-[72px]">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-1.5 -ml-1.5 text-stone-700 hover:text-stone-900"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Цэс нээх"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {SITE.nameLatin}
              </span>
            </Link>

            {/* Search bar — desktop */}
            <div className="flex-1 max-w-2xl mx-auto relative hidden sm:block">
              <div className="relative flex">
                <input
                  type="search"
                  placeholder="Бүтээгдэхүүн хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchResults.length > 0) {
                      navigateToProduct(searchResults[0].slug);
                    }
                  }}
                  className="w-full h-11 pl-4 pr-12 rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                />
                <button className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center bg-stone-900 text-white rounded-r-lg hover:bg-stone-800 transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Search results dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-12 bg-white rounded-lg border border-stone-200 shadow-lg z-50 overflow-hidden">
                  {searchResults.map((p) => (
                    <button
                      key={p.id}
                      onMouseDown={() => navigateToProduct(p.slug)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-stone-50 transition-colors"
                    >
                      <div className="shrink-0 h-10 w-10 rounded bg-stone-100 overflow-hidden">
                        <img src={p.images[0]} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">{p.name}</p>
                        <p className="text-xs text-stone-500">{p.shortDescription}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {searchFocused && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                <div className="absolute left-0 right-0 top-12 bg-white rounded-lg border border-stone-200 shadow-lg z-50 p-4 text-center">
                  <p className="text-sm text-stone-500">Илэрц олдсонгүй</p>
                </div>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 sm:gap-2 shrink-0 ml-auto">
              {/* Mobile search toggle */}
              <button
                className="sm:hidden p-2 text-stone-700 hover:text-stone-900"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Хайлт"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/account"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 bg-stone-900 text-white text-sm font-medium rounded-full hover:bg-stone-800 transition-colors"
              >
                Нэвтрэх
              </Link>
              <Link
                href="/account"
                className="sm:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
                aria-label="Хэрэглэгч"
              >
                <User className="h-5 w-5" />
              </Link>

              <button
                className="flex items-center gap-2 p-2 text-stone-700 hover:text-stone-900 transition-colors relative"
                onClick={toggleCart}
                aria-label="Сагс"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <>
                    <span className="absolute -top-0.5 -right-0.5 sm:hidden bg-stone-900 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                    <span className="hidden sm:inline text-sm font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {mobileSearchOpen && (
            <div className="sm:hidden pb-3 relative">
              <div className="relative flex">
                <input
                  type="search"
                  placeholder="Бүтээгдэхүүн хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchResults.length > 0) {
                      navigateToProduct(searchResults[0].slug);
                    }
                  }}
                  className="w-full h-10 pl-4 pr-12 rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-stone-900"
                  autoFocus
                />
                <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-stone-900 text-white rounded-r-lg">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {/* Mobile search results */}
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-11 bg-white rounded-lg border border-stone-200 shadow-lg z-50 overflow-hidden">
                  {searchResults.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigateToProduct(p.slug)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-stone-50 transition-colors"
                    >
                      <div className="shrink-0 h-10 w-10 rounded bg-stone-100 overflow-hidden">
                        <img src={p.images[0]} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">{p.name}</p>
                        <p className="text-xs text-stone-500">{p.shortDescription}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                <div className="absolute left-0 right-0 top-11 bg-white rounded-lg border border-stone-200 shadow-lg z-50 p-4 text-center">
                  <p className="text-sm text-stone-500">Илэрц олдсонгүй</p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
