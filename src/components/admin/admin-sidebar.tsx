'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft, Settings } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Бүтээгдэхүүн', icon: Package },
  { href: '/admin/orders', label: 'Захиалга', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Хэрэглэгч', icon: Users },
  { href: '/admin/settings', label: 'Тохиргоо', icon: Settings },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-stone-900 text-white">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-stone-800 shrink-0">
        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
          <span className="text-stone-900 font-bold text-sm">O</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Ори Дэлгүүр</p>
          <p className="text-[10px] text-stone-400">Админ панел</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 h-10 px-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to store */}
      <div className="p-3 border-t border-stone-800 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 h-10 px-3 rounded-lg text-sm text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Дэлгүүр рүү буцах
        </Link>
      </div>
    </div>
  );
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-64 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar — Sheet drawer */}
      <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent onNavigate={onMobileClose} />
        </SheetContent>
      </Sheet>
    </>
  );
}
