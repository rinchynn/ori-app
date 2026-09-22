import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductCategory, StockStatus } from '@/types/product';
import { allProducts as defaultProducts } from '@/data/products';

export interface AdminNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface AdminState {
  products: Product[];
  notifications: AdminNotification[];
  initialized: boolean;

  initProducts: () => void;
  addProduct: (product: Omit<SimpleProduct, 'id'>) => void;
  updateProduct: (id: string, data: Partial<SimpleProduct>) => void;
  deleteProduct: (id: string) => void;
  addNotification: (message: string, type: AdminNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

// Simplified product form for admin CRUD
export interface SimpleProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  images: string[];
  stockStatus: StockStatus;
  shortDescription: string;
  description: string;
}

function generateId() {
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function simpleToProduct(data: Omit<SimpleProduct, 'id'>, id: string): Product {
  const base = {
    id,
    slug: data.slug || slugify(data.name),
    name: data.name,
    category: data.category,
    price: data.price,
    compareAtPrice: data.compareAtPrice,
    images: data.images.length > 0 ? data.images : ['/images/products/mattress-1-a.jpg'],
    sizes: [
      { label: 'Queen' as const, dimensions: '160×200 см', inStock: true },
    ],
    stockStatus: data.stockStatus,
    shortDescription: data.shortDescription,
    description: data.description,
    warranty: { years: 5, description: '5 жилийн баталгаа' },
    deliveryNotes: 'Улаанбаатар хотод 3-5 ажлын өдөрт хүргэнэ',
    rating: 0,
    reviewCount: 0,
  };

  if (data.category === 'mattress') {
    return {
      ...base,
      category: 'mattress',
      thickness: 20,
      firmness: 'medium',
      material: 'Foam',
      layers: [],
      supportFeatures: [],
      coolingFeatures: [],
      hypoallergenic: false,
      careInstructions: [],
    } as Product;
  }
  if (data.category === 'bed') {
    return {
      ...base,
      category: 'bed',
      frameMaterial: 'Wood',
      upholstery: null,
      storage: false,
      storageDescription: null,
      dimensions: { width: 160, length: 200, height: 40, headboardHeight: 100 },
      style: 'Modern',
      colors: [],
      assemblyRequired: true,
      assemblyNotes: 'Угсрах шаардлагатай',
    } as Product;
  }
  return {
    ...base,
    category: 'bed-with-mattress',
    bedFrame: { material: 'Wood', style: 'Modern', storage: false },
    mattress: { firmness: 'medium', thickness: 20, material: 'Foam' },
    bundleSavings: 0,
    bundleSavingsPercent: 0,
    includedItems: ['Ор', 'Матрас'],
    assemblyRequired: true,
    assemblyNotes: 'Угсрах шаардлагатай',
  } as Product;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: [],
      notifications: [],
      initialized: false,

      initProducts: () => {
        if (!get().initialized) {
          set({ products: defaultProducts, initialized: true });
        }
      },

      addProduct: (data) => {
        const id = generateId();
        const product = simpleToProduct(data, id);
        set((s) => ({
          products: [product, ...s.products],
          notifications: [
            {
              id: generateId(),
              message: `"${data.name}" бүтээгдэхүүн нэмэгдлээ`,
              type: 'success',
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...s.notifications,
          ],
        }));
      },

      updateProduct: (id, data) => {
        set((s) => ({
          products: s.products.map((p) => {
            if (p.id !== id) return p;
            return {
              ...p,
              ...data,
              slug: data.name ? slugify(data.name) : p.slug,
            } as Product;
          }),
          notifications: [
            {
              id: generateId(),
              message: `"${data.name || 'Бүтээгдэхүүн'}" засагдлаа`,
              type: 'info',
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...s.notifications,
          ],
        }));
      },

      deleteProduct: (id) => {
        const product = get().products.find((p) => p.id === id);
        set((s) => ({
          products: s.products.filter((p) => p.id !== id),
          notifications: [
            {
              id: generateId(),
              message: `"${product?.name || 'Бүтээгдэхүүн'}" устгагдлаа`,
              type: 'warning',
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...s.notifications,
          ],
        }));
      },

      addNotification: (message, type) => {
        set((s) => ({
          notifications: [
            {
              id: generateId(),
              message,
              type,
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...s.notifications,
          ],
        }));
      },

      markNotificationRead: (id) => {
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'ori-admin',
    }
  )
);
