import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

function FAQItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${id}`;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '2px solid #E5E1D8' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal-dark focus:ring-offset-2 rounded"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-semibold text-gray-900 text-base">{q}</span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          style={{ color: '#0F6E56' }}
          aria-hidden="true"
        />
      </button>
      <div id={panelId} className="px-6 pb-5 bg-white" hidden={!open}>
        <p className="text-base text-gray-900 leading-relaxed whitespace-pre-line">{a}</p>
      </div>
    </div>
  );
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <FAQItem key={faq.q} q={faq.q} a={faq.a} id={String(idx)} />
      ))}
    </div>
  );
}
