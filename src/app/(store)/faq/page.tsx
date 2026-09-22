import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { homeFAQ } from '@/data/faq';

export const metadata = { title: 'Түгээмэл асуултууд — Ори Дэлгүүр' };

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Түгээмэл асуултууд</h1>
      <p className="text-sm text-stone-500 mb-8">Хэрэглэгчдээс байнга ирдэг асуулт, хариултууд.</p>

      <Accordion className="space-y-2">
        {homeFAQ.map((item, i) => (
          <AccordionItem key={i} className="bg-white rounded-xl border border-stone-200 px-5">
            <AccordionTrigger className="text-sm lg:text-[15px] font-medium text-stone-900 py-4 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-stone-600 leading-relaxed pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
