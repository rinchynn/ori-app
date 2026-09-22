'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, ShoppingCart } from 'lucide-react';
import { orders } from '@/data/orders';
import { formatPrice } from '@/lib/utils';
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/admin/order-status-badge';

const STATUS_TABS: { value: string; label: string }[] = [
  { value: 'all', label: 'Бүгд' },
  { value: 'pending', label: 'Хүлээгдэж буй' },
  { value: 'confirmed', label: 'Баталгаажсан' },
  { value: 'processing', label: 'Бэлтгэж буй' },
  { value: 'shipped', label: 'Илгээсэн' },
  { value: 'delivered', label: 'Хүргэсэн' },
  { value: 'cancelled', label: 'Цуцалсан' },
];

const PAYMENT_METHODS: Record<string, string> = {
  card: 'Карт',
  bank_transfer: 'Банк шилжүүлэг',
  storepay: 'StorePay',
  cash_on_delivery: 'Бэлнээр',
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = orders.filter((o) => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Захиалга</h1>
        <p className="text-sm text-stone-500 mt-1">{orders.length} захиалга</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-stone-200">
        {STATUS_TABS.map((tab) => {
          const count = tab.value === 'all' ? orders.length : orders.filter((o) => o.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`shrink-0 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                statusFilter === tab.value
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          placeholder="Дугаар, нэрээр хайх..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/50 text-left">
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Дугаар</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Хэрэглэгч</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Бараа</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Дүн</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Төлбөр</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Статус</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Огноо</th>
                <th className="px-3 sm:px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((order) => (
                <tr key={order.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-3 sm:px-5 py-3 font-medium text-stone-900 whitespace-nowrap">{order.orderNumber}</td>
                  <td className="px-3 sm:px-5 py-3">
                    <div>
                      <p className="text-stone-700 whitespace-nowrap">{order.customerName}</p>
                      <p className="text-xs text-stone-400">{order.customerPhone}</p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 text-stone-600">
                    {order.items.length} бараа
                  </td>
                  <td className="px-3 sm:px-5 py-3 font-medium text-stone-900 whitespace-nowrap">{formatPrice(order.total)}</td>
                  <td className="px-3 sm:px-5 py-3">
                    <div className="space-y-1">
                      <PaymentStatusBadge status={order.paymentStatus} />
                      <p className="text-[10px] text-stone-400">{PAYMENT_METHODS[order.paymentMethod]}</p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-3 sm:px-5 py-3 text-stone-500 whitespace-nowrap">
                    {(() => { const d = new Date(order.createdAt); return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`; })()}
                  </td>
                  <td className="px-3 sm:px-5 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="p-2 text-stone-400 hover:text-stone-900 inline-block">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-stone-400">
            <ShoppingCart className="h-10 w-10 mb-3" />
            <p className="text-sm">Захиалга олдсонгүй</p>
          </div>
        )}
      </div>
    </div>
  );
}
