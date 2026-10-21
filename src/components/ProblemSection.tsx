import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, Clock, DollarSign, Utensils } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.problem-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    {
      icon: AlertCircle,
      title: 'Uncertain quality',
      description: 'Never knowing if the food is fresh and hygienic',
    },
    {
      icon: Clock,
      title: 'Limited availability',
      description: 'Struggling to find proper meals during odd hours',
    },
    {
      icon: DollarSign,
      title: 'Hidden costs',
      description: 'Unclear pricing and unexpected charges',
    },
    {
      icon: Utensils,
      title: 'Few choices',
      description: 'Limited variety, especially in smaller stations',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-charcoal mb-6 max-w-4xl mx-auto leading-tight">
            Your journey is long enough. <span className="text-railway-red">Finding good food shouldn't be.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Railway travelers face the same challenges every journey: uncertainty about food quality, limited options during odd hours, and the hassle of finding something filling and affordable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="problem-card bg-white p-6 rounded-2xl border border-gray-200 hover:border-railway-red transition-colors"
            >
              <div className="bg-railway-red/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <problem.icon className="text-railway-red" size={28} />
              </div>
              <h3 className="font-bold text-lg text-charcoal mb-2">{problem.title}</h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-display font-bold text-3xl text-charcoal mb-4">
              RailBite simplifies your meal planning
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We're building a network of outlets at railway stations across Tier-2 and Tier-3 cities, offering hygienic, affordable, and filling Indian meals. Order ahead online, pick up fresh food, or get it delivered to your seat—with clear prices and no surprises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
