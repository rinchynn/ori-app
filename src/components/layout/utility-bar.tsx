import { Phone, Mail, MapPin, Package } from 'lucide-react';
import Link from 'next/link';
import { SITE, NAV } from '@/lib/constants';

export function UtilityBar() {
  return (
    <div className="hidden lg:block bg-stone-900 text-stone-300 text-xs">
      <div className="mx-auto max-w-7xl px-8 flex items-center justify-between h-9">
        <div className="flex items-center gap-6">
          <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="h-3 w-3" />
            <span>{SITE.phone}</span>
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="h-3 w-3" />
            <span>{SITE.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          {NAV.utility.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              {item.href === '/showroom' ? <MapPin className="h-3 w-3" /> : <Package className="h-3 w-3" />}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
