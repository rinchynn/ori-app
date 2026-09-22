import Link from 'next/link';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, ArrowUpRight, Eye } from 'lucide-react';
import { orders } from '@/data/orders';
import { customers } from '@/data/customers';
import { allProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { StatCard } from '@/components/admin/stat-card';
import { OrderStatusBadge } from '@/components/admin/order-status-badge';

export default function AdminDashboard() {
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = allProducts.length;
  const totalCustomers = customers.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'confirmed' || o.status === 'processing');
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / orders.filter((o) => o.paymentStatus === 'paid').length) : 0;

  // Monthly revenue mock data for chart
  const monthlyData = [
    { month: '7-р сар', revenue: 3200000 },
    { month: '8-р сар', revenue: 4500000 },
    { month: '9-р сар', revenue: 3800000 },
    { month: '10-р сар', revenue: 5200000 },
    { month: '11-р сар', revenue: 6100000 },
    { month: '12-р сар', revenue: 8450000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Ори Дэлгүүрийн ерөнхий тойм</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Нийт орлого"
          value={formatPrice(totalRevenue)}
          change="+12.5% өмнөх сараас"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Захиалга"
          value={String(totalOrders)}
          change={`${pendingOrders.length} хүлээгдэж буй`}
          changeType="neutral"
          icon={ShoppingCart}
          iconColor="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Бүтээгдэхүүн"
          value={String(totalProducts)}
          change="18 идэвхтэй"
          changeType="neutral"
          icon={Package}
          iconColor="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Хэрэглэгч"
          value={String(totalCustomers)}
          change="+3 энэ сард"
          changeType="positive"
          icon={Users}
          iconColor="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-5">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-base font-semibold text-stone-900">Сарын орлого</h2>
              <p className="text-xs text-stone-500 mt-0.5">Сүүлийн 6 сар</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" />
              +38.5%
            </div>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-40 sm:h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1 sm:gap-2 min-w-0">
                <span className="text-[9px] sm:text-[10px] text-stone-500 font-medium truncate w-full text-center">
                  {formatPrice(d.revenue)}
                </span>
                <div
                  className="w-full rounded-t-lg bg-stone-900 transition-all hover:bg-stone-700"
                  style={{ height: `${(d.revenue / maxRevenue) * 140}px` }}
                />
                <span className="text-[9px] sm:text-[11px] text-stone-500 truncate w-full text-center">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <h2 className="text-base font-semibold text-stone-900 mb-4">Хурдан тойм</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">Дундаж захиалга</span>
              <span className="text-sm font-semibold text-stone-900">{formatPrice(avgOrderValue)}</span>
            </div>
            <div className="h-px bg-stone-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">Хүргэгдсэн</span>
              <span className="text-sm font-semibold text-emerald-600">{orders.filter((o) => o.status === 'delivered').length}</span>
            </div>
            <div className="h-px bg-stone-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">Цуцлагдсан</span>
              <span className="text-sm font-semibold text-red-600">{orders.filter((o) => o.status === 'cancelled').length}</span>
            </div>
            <div className="h-px bg-stone-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">Хүргэлт дундаж</span>
              <span className="text-sm font-semibold text-stone-900">3.2 өдөр</span>
            </div>
            <div className="h-px bg-stone-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">Буцаалтын хувь</span>
              <span className="text-sm font-semibold text-stone-900">2.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-stone-200">
        <div className="flex items-center justify-between p-5 border-b border-stone-200">
          <h2 className="text-base font-semibold text-stone-900">Сүүлийн захиалгууд</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
          >
            Бүгдийг харах <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-stone-100 text-left">
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Дугаар</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Хэрэглэгч</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Дүн</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Статус</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Огноо</th>
                <th className="px-3 sm:px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-3 sm:px-5 py-3 font-medium text-stone-900 whitespace-nowrap">{order.orderNumber}</td>
                  <td className="px-3 sm:px-5 py-3 text-stone-600 whitespace-nowrap">{order.customerName}</td>
                  <td className="px-3 sm:px-5 py-3 font-medium text-stone-900 whitespace-nowrap">{formatPrice(order.total)}</td>
                  <td className="px-3 sm:px-5 py-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-3 sm:px-5 py-3 text-stone-500 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString('mn-MN')}</td>
                  <td className="px-3 sm:px-5 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-stone-400 hover:text-stone-900">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
