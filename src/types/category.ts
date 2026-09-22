import type { ProductCategory } from './product';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCategory: ProductCategory;
}
