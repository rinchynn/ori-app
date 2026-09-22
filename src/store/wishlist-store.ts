import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/product';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  clearAll: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        if (!get().items.some((p) => p.id === product.id)) {
          set({ items: [...get().items, product] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },

      toggleItem: (product: Product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      hasItem: (productId: string) => {
        return get().items.some((p) => p.id === productId);
      },

      clearAll: () => set({ items: [] }),
    }),
    {
      name: 'ori-wishlist',
    }
  )
);
