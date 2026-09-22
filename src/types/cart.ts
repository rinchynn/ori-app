import type { Product, SizeLabel } from './product';

export interface CartItem {
  id: string;
  product: Product;
  size: SizeLabel;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: SizeLabel, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
}
