export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'bank_transfer' | 'storepay' | 'cash_on_delivery';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: OrderAddress;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  trackingNumber?: string;
  notes?: string;
}
