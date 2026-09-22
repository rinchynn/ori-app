'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, Check, Trash2 } from 'lucide-react';
import { useAdminStore } from '@/store/admin-store';

interface AdminHeaderProps {
  onMenuToggle?: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  success: 'bg-emerald-500',
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { notifications, markNotificationRead, clearNotifications } = useAdminStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  function timeAgo(iso: string) {
    const diff = now - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Дөнгөж сая';
    if (mins < 60) return `${mins} мин өмнө`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} цагийн өмнө`;
    return `${Math.floor(hrs / 24)} өдрийн өмнө`;
  }

  return (
    <header className="h-14 md:h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 text-stone-500 hover:text-stone-900"
          aria-label="Цэс нээх"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="lg:hidden text-sm font-semibold text-stone-900">Ори Админ</p>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Хайх..."
            className="h-9 w-48 md:w-64 pl-9 pr-4 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative p-2 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Мэдэгдэл"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-stone-200 shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
                <h3 className="text-sm font-semibold text-stone-900">Мэдэгдэл</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={() => clearNotifications()}
                    className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Цэвэрлэх
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-sm text-stone-400">Мэдэгдэл байхгүй</div>
                ) : (
                  notifications.slice(0, 20).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-stone-50 hover:bg-stone-50 transition-colors flex items-start gap-3 ${!n.read ? 'bg-stone-50/50' : ''}`}
                    >
                      <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${TYPE_COLORS[n.type]}`} />
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm ${!n.read ? 'font-medium text-stone-900' : 'text-stone-600'}`}>{n.message}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{timeAgo(n.timestamp)}</p>
                      </div>
                      {!n.read && <Check className="h-3.5 w-3.5 text-stone-300 mt-1 shrink-0" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center">
          <span className="text-xs font-semibold text-stone-600">А</span>
        </div>
      </div>
    </header>
  );
}
