export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderAt?: string;
  status: 'active' | 'inactive';
}
