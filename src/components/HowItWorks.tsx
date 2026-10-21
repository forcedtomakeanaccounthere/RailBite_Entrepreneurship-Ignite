import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShoppingCart, Smile } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Discover',
      description: 'Browse our menu to find wholesome Indian meals with clear prices and preparation times.',
    },
    {
      icon: ShoppingCart,
      number: '02',
      title: 'Choose',
      description: 'Select dine-in before departure, quick pickup, or seat delivery where available.',
    },
    {
      icon: Smile,
      number: '03',
      title: 'Enjoy',
      description: 'Receive fresh, hygienic meals with no surprises. Just good food for your journey.',
    },
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-charcoal text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">How it works</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Three simple steps to better meals on your railway journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step-card text-center">
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-railway-red rounded-2xl mb-4">
                  <step.icon size={36} />
                </div>
                <div className="absolute -top-4 -right-4 font-display font-bold text-6xl text-white/10">
                  {step.number}
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-3">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
