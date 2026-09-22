'use client';

import { useState } from 'react';
import { Search, Users, Mail, Phone, MapPin } from 'lucide-react';
import { customers } from '@/data/customers';
import { formatPrice, cn } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const activeCount = customers.filter((c) => c.status === 'active').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Хэрэглэгч</h1>
        <p className="text-sm text-stone-500 mt-1">
          {customers.length} хэрэглэгч · {activeCount} идэвхтэй · Нийт: {formatPrice(totalSpent)}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Нэр, имэйл, утасаар хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 pr-8 rounded-lg border border-stone-300 text-sm text-stone-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-900"
        >
          <option value="all">Бүх төлөв</option>
          <option value="active">Идэвхтэй</option>
          <option value="inactive">Идэвхгүй</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/50 text-left">
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Хэрэглэгч</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Холбоо барих</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Байршил</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Захиалга</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Нийт зарцуулсан</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Төлөв</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Бүртгүүлсэн</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-3 sm:px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-stone-600">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-medium text-stone-900 whitespace-nowrap">{customer.name}</p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3">
                    <div className="space-y-0.5">
                      <p className="flex items-center gap-1 text-stone-600 whitespace-nowrap">
                        <Mail className="h-3 w-3 text-stone-400 shrink-0" /> {customer.email}
                      </p>
                      <p className="flex items-center gap-1 text-stone-500 text-xs">
                        <Phone className="h-3 w-3 text-stone-400 shrink-0" /> {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3">
                    <p className="flex items-center gap-1 text-stone-600 whitespace-nowrap">
                      <MapPin className="h-3 w-3 text-stone-400 shrink-0" /> {customer.city}, {customer.district}
                    </p>
                  </td>
                  <td className="px-3 sm:px-5 py-3 text-stone-700 font-medium">{customer.totalOrders}</td>
                  <td className="px-3 sm:px-5 py-3 font-medium text-stone-900 whitespace-nowrap">{formatPrice(customer.totalSpent)}</td>
                  <td className="px-3 sm:px-5 py-3">
                    <span className={cn(
                      'inline-flex px-2 py-0.5 text-xs font-medium rounded-full',
                      customer.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'
                    )}>
                      {customer.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-3 text-stone-500 whitespace-nowrap">
                    {new Date(customer.registeredAt).toLocaleDateString('mn-MN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-stone-400">
            <Users className="h-10 w-10 mb-3" />
            <p className="text-sm">Хэрэглэгч олдсонгүй</p>
          </div>
        )}
      </div>
    </div>
  );
}
