import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UI } from '@/lib/constants';
import { homeFAQ } from '@/data/faq';

export function FAQPreview() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-stone-900 text-center mb-6 lg:mb-10">
          {UI.faq.headline}
        </h2>
        <Accordion className="space-y-2">
          {homeFAQ.slice(0, 5).map((item, i) => (
            <AccordionItem
              key={i}
              className="bg-white rounded-xl border border-stone-200 px-5"
            >
              <AccordionTrigger className="text-sm lg:text-[15px] font-medium text-stone-900 py-4 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-stone-600 leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-6">
          <Link
            href="/faq"
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            {UI.faq.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
