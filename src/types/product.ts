export type ProductCategory = 'mattress' | 'bed' | 'bed-with-mattress';
export type BadgeType = 'new' | 'sale' | 'bestseller' | 'premium' | 'bundle' | 'low-stock';
export type Firmness = 'soft' | 'medium' | 'firm' | 'extra-firm';
export type SizeLabel = 'Single' | 'Twin' | 'Full' | 'Queen' | 'King';
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductSize {
  label: SizeLabel;
  dimensions: string;
  inStock: boolean;
}

export interface ProductLayer {
  name: string;
  material: string;
  thickness: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Warranty {
  years: number;
  description: string;
}

export interface BaseProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  badge?: BadgeType;
  images: string[];
  sizes: ProductSize[];
  stockStatus: StockStatus;
  shortDescription: string;
  description: string;
  installmentPerMonth?: number;
  warranty: Warranty;
  deliveryNotes: string;
  featured?: boolean;
  rating: number;
  reviewCount: number;
}

export interface MattressProduct extends BaseProduct {
  category: 'mattress';
  thickness: number;
  firmness: Firmness;
  material: string;
  layers: ProductLayer[];
  supportFeatures: string[];
  coolingFeatures: string[];
  hypoallergenic: boolean;
  careInstructions: string[];
}

export interface BedProduct extends BaseProduct {
  category: 'bed';
  frameMaterial: string;
  upholstery: string | null;
  storage: boolean;
  storageDescription: string | null;
  dimensions: { width: number; length: number; height: number; headboardHeight: number };
  style: string;
  colors: ProductColor[];
  assemblyRequired: boolean;
  assemblyNotes: string;
}

export interface BundleProduct extends BaseProduct {
  category: 'bed-with-mattress';
  bedFrame: { material: string; style: string; storage: boolean };
  mattress: { firmness: Firmness; thickness: number; material: string };
  bundleSavings: number;
  bundleSavingsPercent: number;
  includedItems: string[];
  assemblyRequired: boolean;
  assemblyNotes: string;
}

export type Product = MattressProduct | BedProduct | BundleProduct;
