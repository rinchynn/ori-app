import type { Category } from '@/types/category';

export const categories: Category[] = [
  {
    id: 'cat-mattress',
    slug: 'mattress',
    name: 'Матрас',
    description: 'Таны биед тохирсон матрасыг олоорой. Бид зөвхөн чанартай матрас санал болгодог.',
    image: '/images/categories/mattress.jpg',
    productCategory: 'mattress',
  },
  {
    id: 'cat-bed',
    slug: 'bed',
    name: 'Ор',
    description: 'Унтлагын өрөөнийхөө гол тавилгыг сонгоорой.',
    image: '/images/categories/bed.jpg',
    productCategory: 'bed',
  },
  {
    id: 'cat-bundle',
    slug: 'bed-with-mattress',
    name: 'Ор + Матрас',
    description: 'Хамтдаа авахад илүү хэмнэлттэй.',
    image: '/images/categories/bundle.jpg',
    productCategory: 'bed-with-mattress',
  },
];
