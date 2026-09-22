import type { OrderStatus, PaymentStatus } from '@/types/order';
import { cn } from '@/lib/utils';

const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Хүлээгдэж буй', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmed: { label: 'Баталгаажсан', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  processing: { label: 'Бэлтгэж буй', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  shipped: { label: 'Илгээсэн', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  delivered: { label: 'Хүргэсэн', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  cancelled: { label: 'Цуцалсан', className: 'bg-red-50 text-red-700 border-red-200' },
  returned: { label: 'Буцаасан', className: 'bg-stone-100 text-stone-700 border-stone-300' },
};

const PAYMENT_STATUS_MAP: Record<PaymentStatus, { label: string; className: string }> = {
  pending: { label: 'Төлөгдөөгүй', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  paid: { label: 'Төлөгдсөн', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  failed: { label: 'Амжилтгүй', className: 'bg-red-50 text-red-700 border-red-200' },
  refunded: { label: 'Буцаасан', className: 'bg-stone-100 text-stone-700 border-stone-300' },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = ORDER_STATUS_MAP[status];
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border', config.className)}>
      {config.label}
    </span>
  );
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = PAYMENT_STATUS_MAP[status];
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border', config.className)}>
      {config.label}
    </span>
  );
}
