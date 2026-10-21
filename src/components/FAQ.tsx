import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our menu, add items to your cart, and choose your preferred service: dine-in (reserve a table), takeaway (pick up at outlet), or seat delivery (available at select stations). Complete your details and confirm your order.',
    },
    {
      question: 'Can I book a table before arriving?',
      answer: 'Yes! Use our dine-in booking service to reserve a table at any outlet that offers dine-in. Select your outlet, date, time, and party size, and your table will be ready when you arrive.',
    },
    {
      question: 'How does pickup work?',
      answer: 'After placing a takeaway order, you will receive a confirmation with your order ID and estimated preparation time. Arrive at your selected outlet around your chosen pickup time, show your order ID, and collect your fresh meal.',
    },
    {
      question: 'Is train-seat delivery available everywhere?',
      answer: 'Train-seat delivery is currently available only at select stations including Nagpur, Bhopal, and Raipur. This service depends on station infrastructure, operating partners, and train schedules. For other locations, choose dine-in or takeaway.',
    },
    {
      question: 'Can I change or cancel a demo order?',
      answer: 'This website is a demonstration prototype. All orders, bookings, and confirmations shown are simulated for concept illustration. In a live system, cancellation and modification policies would be clearly communicated at checkout.',
    },
    {
      question: 'How are prices displayed?',
      answer: 'All menu prices are shown in Indian Rupees and are inclusive of preparation and packaging. No hidden charges. The prices shown here are illustrative for the prototype and not actual commercial pricing.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'This is a demonstration prototype, so no actual payment processing occurs. In a live implementation, RailBite would accept digital payments, UPI, cards, and potentially cash at outlets.',
    },
    {
      question: 'Are all outlets currently operating?',
      answer: 'The outlets shown on this website are demonstration locations illustrating RailBite planned expansion across Tier-2 and Tier-3 railway stations. Actual operating outlets and availability would be confirmed through live systems.',
    },
  ];

  const chevronClass = (index: number) => {
    return 'flex-shrink-0 text-railway-red transition-transform ' + (openIndex === index ? 'transform rotate-180' : '');
  };

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-charcoal mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">Everything you need to know about RailBite</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-lg text-charcoal pr-4">{faq.question}</span>
                <ChevronDown className={chevronClass(index)} size={24} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
