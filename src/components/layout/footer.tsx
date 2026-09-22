import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SITE, UI } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              {SITE.nameLatin}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              {UI.footer.brandDescription}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{UI.footer.products}</h3>
            <ul className="space-y-1">
              {UI.footer.links.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{UI.footer.info}</h3>
            <ul className="space-y-1">
              {UI.footer.links.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4">{UI.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-stone-500" />
                <span className="text-sm text-stone-400">{SITE.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-stone-400 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-stone-500" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 text-sm text-stone-400 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-stone-500" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-stone-500" />
                <span className="text-sm text-stone-400">{SITE.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-4">
          <p className="text-xs text-stone-500 text-center">{UI.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
