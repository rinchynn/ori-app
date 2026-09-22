import { Ruler, Layers, Gauge, Box, Snowflake, ShieldCheck, Paintbrush, Wrench, PiggyBank } from 'lucide-react';
import type { Product } from '@/types/product';
import { FIRMNESS_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

interface SpecItem {
  icon: React.ElementType;
  label: string;
  value: string;
}

function getSpecs(product: Product): SpecItem[] {
  const sizeStr = product.sizes.map((s) => s.label).join(', ');

  if (product.category === 'mattress') {
    return [
      { icon: Ruler, label: 'Хэмжээ', value: sizeStr },
      { icon: Layers, label: 'Зузаан', value: `${product.thickness} см` },
      { icon: Gauge, label: 'Хатуулаг', value: FIRMNESS_LABELS[product.firmness] ?? product.firmness },
      { icon: Box, label: 'Материал', value: product.material },
      { icon: Snowflake, label: 'Хөргөлт', value: product.coolingFeatures.length > 0 ? 'Тийм' : 'Үгүй' },
      { icon: ShieldCheck, label: 'Баталгаа', value: `${product.warranty.years} жил` },
    ];
  }

  if (product.category === 'bed') {
    return [
      { icon: Ruler, label: 'Хэмжээ', value: sizeStr },
      { icon: Box, label: 'Материал', value: product.frameMaterial },
      { icon: Paintbrush, label: 'Өнгө', value: product.colors.map((c) => c.name).join(', ') },
      { icon: Layers, label: 'Хадгалалт', value: product.storage ? 'Тийм' : 'Үгүй' },
      { icon: Wrench, label: 'Угсралт', value: product.assemblyRequired ? 'Шаардлагатай' : 'Үгүй' },
      { icon: ShieldCheck, label: 'Баталгаа', value: `${product.warranty.years} жил` },
    ];
  }

  // Bundle
  return [
    { icon: Ruler, label: 'Хэмжээ', value: sizeStr },
    { icon: Gauge, label: 'Хатуулаг', value: FIRMNESS_LABELS[product.mattress.firmness] ?? product.mattress.firmness },
    { icon: Box, label: 'Хүрээ', value: product.bedFrame.material },
    { icon: Layers, label: 'Хадгалалт', value: product.bedFrame.storage ? 'Тийм' : 'Үгүй' },
    { icon: PiggyBank, label: 'Хэмнэлт', value: formatPrice(product.bundleSavings) },
    { icon: ShieldCheck, label: 'Баталгаа', value: `${product.warranty.years} жил` },
  ];
}

interface SpecsOverviewProps {
  product: Product;
}

export function SpecsOverview({ product }: SpecsOverviewProps) {
  const specs = getSpecs(product);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {specs.map((spec) => (
        <div key={spec.label} className="flex items-start gap-3 p-3 rounded-lg bg-stone-50">
          <spec.icon className="h-5 w-5 text-stone-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-stone-500">{spec.label}</p>
            <p className="text-sm font-medium text-stone-900">{spec.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
