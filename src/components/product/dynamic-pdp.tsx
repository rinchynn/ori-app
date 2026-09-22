'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useAdminStore } from '@/store/admin-store';
import { PDPClient } from '@/components/product/pdp-client';

export function DynamicProductPage({ slug }: { slug: string }) {
  const { products, initProducts, initialized } = useAdminStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initProducts();
  }, [initProducts]);

  useEffect(() => {
    if (initialized) setReady(true);
  }, [initialized]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return <PDPClient product={product} relatedProducts={related} />;
}
