import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, DollarSign, Heart, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PromiseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.promise-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const promises = [
    {
      icon: Shield,
      title: 'Hygienic & Fresh',
      description: 'Every meal is prepared in clean conditions with quality ingredients and travel-friendly packaging.',
    },
    {
      icon: DollarSign,
      title: 'Clear Pricing',
      description: 'What you see is what you pay. No hidden charges, no surprises.',
    },
    {
      icon: Heart,
      title: 'Filling & Satisfying',
      description: 'Generous portions of authentic Indian meals designed for travelers.',
    },
    {
      icon: Package,
      title: 'Convenient Service',
      description: 'Order online, choose your service, and get your meal without hassle.',
    },
  ];

  return (
    <section id="promise" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-charcoal mb-4">
            Our food promise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These are the commitments we make to every traveler
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {promises.map((promise, index) => (
            <div key={index} className="promise-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-railway-red/10 rounded-2xl mb-4">
                <promise.icon className="text-railway-red" size={32} />
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-2">{promise.title}</h3>
              <p className="text-gray-600 leading-relaxed">{promise.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800"
              alt="Food packaging"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="font-display font-bold text-3xl text-charcoal mb-6">Quality you can trust</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                RailBite is committed to serving hygienic, affordable meals at railway stations, particularly in Tier-2 and Tier-3 cities where travelers have limited food options.
              </p>
              <p>
                We focus on transparent pricing, convenient ordering, and travel-friendly packaging so you can enjoy your journey without worrying about your next meal.
              </p>
              <p className="text-sm text-gray-500 italic">
                All outlets follow consistent preparation standards and food safety practices. This is our commitment to railway travelers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
