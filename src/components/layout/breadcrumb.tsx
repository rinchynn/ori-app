import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { UI } from '@/lib/constants';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: UI.breadcrumb.home, href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="py-3 lg:py-4">
      <ol className="flex items-center gap-1 text-xs lg:text-sm text-stone-500">
        {allItems.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 text-stone-400" />}
            {item.href && i < allItems.length - 1 ? (
              <Link href={item.href} className="hover:text-stone-900 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-stone-900 font-medium truncate max-w-[200px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
