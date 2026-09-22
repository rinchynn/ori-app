import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState } from '@/types/cart';
import type { Product, SizeLabel } from '@/types/product';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, size: SizeLabel, quantity = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.size === size
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...items, { id: `${product.id}-${size}`, product, size, quantity }],
            isOpen: true,
          });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'ori-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export function useCartTotals() {
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { totalItems, totalPrice };
}
