import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Phone, User, CreditCard, Truck } from 'lucide-react';
import { orders, getOrderById } from '@/data/orders';
import { formatPrice } from '@/lib/utils';
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/admin/order-status-badge';

interface PageProps {
  params: Promise<{ id: string }>;
}

const PAYMENT_METHODS: Record<string, string> = {
  card: 'Карт',
  bank_transfer: 'Банк шилжүүлэг',
  storepay: 'StorePay',
  cash_on_delivery: 'Бэлнээр',
};

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'] as const;
const STATUS_LABELS: Record<string, string> = {
  pending: 'Хүлээгдэж буй',
  confirmed: 'Баталгаажсан',
  processing: 'Бэлтгэж буй',
  shipped: 'Илгээсэн',
  delivered: 'Хүргэсэн',
};

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();

  const currentStep = STATUSES.indexOf(order.status as typeof STATUSES[number]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-stone-900">{order.orderNumber}</h1>
          <p className="text-sm text-stone-500">
            {new Date(order.createdAt).toLocaleString('mn-MN')}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Status timeline */}
      {order.status !== 'cancelled' && order.status !== 'returned' && (
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <h2 className="text-sm font-semibold text-stone-900 mb-4">Захиалгын явц</h2>
          <div className="flex items-center">
            {STATUSES.map((status, i) => (
              <div key={status} className="flex items-center flex-1 last:flex-initial">
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    i <= currentStep ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-400'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`mt-1.5 text-[10px] font-medium ${
                    i <= currentStep ? 'text-stone-900' : 'text-stone-400'
                  }`}>
                    {STATUS_LABELS[status]}
                  </span>
                </div>
                {i < STATUSES.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    i < currentStep ? 'bg-stone-900' : 'bg-stone-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order items */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200">
          <div className="p-5 border-b border-stone-200">
            <h2 className="text-sm font-semibold text-stone-900">Барааны жагсаалт</h2>
          </div>
          <div className="divide-y divide-stone-100">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5">
                <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="56px"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{item.productName}</p>
                  <p className="text-xs text-stone-500">Хэмжээ: {item.size} · Тоо: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-stone-900 shrink-0">{formatPrice(item.totalPrice)}</p>
              </div>
            ))}
          </div>
          <div className="p-5 border-t border-stone-200 space-y-2">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Дүн</span><span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-500">
              <span>Хүргэлт</span><span>{order.deliveryFee === 0 ? 'Үнэгүй' : formatPrice(order.deliveryFee)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-emerald-600">
                <span>Хөнгөлөлт</span><span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Нийт</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-3">Хэрэглэгч</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-stone-600">
                <User className="h-4 w-4 text-stone-400" /> {order.customerName}
              </p>
              <p className="flex items-center gap-2 text-stone-600">
                <Phone className="h-4 w-4 text-stone-400" /> {order.customerPhone}
              </p>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-3">Хүргэлтийн хаяг</h3>
            <div className="space-y-2 text-sm text-stone-600">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
                <span>
                  {order.shippingAddress.city}, {order.shippingAddress.district}<br />
                  {order.shippingAddress.address}
                </span>
              </p>
              {order.trackingNumber && (
                <p className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-stone-400" /> {order.trackingNumber}
                </p>
              )}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="text-sm font-semibold text-stone-900 mb-3">Төлбөр</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Төлөв</span>
                <PaymentStatusBadge status={order.paymentStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Арга</span>
                <span className="text-stone-700 flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5" /> {PAYMENT_METHODS[order.paymentMethod]}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl border border-stone-200 p-5">
              <h3 className="text-sm font-semibold text-stone-900 mb-2">Тэмдэглэл</h3>
              <p className="text-sm text-stone-600">{order.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-stone-900 mb-3">Үйлдэл</h3>
            {order.status !== 'delivered' && order.status !== 'cancelled' && (
              <button className="w-full h-9 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors">
                Статус шинэчлэх
              </button>
            )}
            <button className="w-full h-9 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
              Баримт хэвлэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
