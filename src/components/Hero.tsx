import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, MapPin, Shield, Sparkles, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Typography animation - split text effect
      const headline = textRef.current?.querySelector('.hero-headline');
      if (headline) {
        const text = headline.textContent || '';
        headline.innerHTML = text
          .split(' ')
          .map((word) => `<span class="inline-block" style="opacity: 0">${word}</span>`)
          .join(' ');

        gsap.to('.hero-headline span', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-subline', { y: 40, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.bento-card', { scale: 0.9, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.4')
        .from('.hero-image', { scale: 0.95, opacity: 0, duration: 1 }, '-=1')
        .from('.hero-card', { x: 40, opacity: 0, duration: 0.8 }, '-=0.5');

      // Parallax effect on scroll
      gsap.to('.hero-image', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToServices = () => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-cream via-white to-orange-50 overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-railway-red/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full mb-6 animate-fade-in">
              <Sparkles size={16} className="text-green-500 animate-pulse" />
              <span className="text-sm font-medium text-charcoal">Made for life on the move</span>
            </div>

            <h1 className="hero-headline font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight mb-6">
              Good food. <span className="text-railway-red">Right on your journey.</span>
            </h1>

            <p className="hero-subline text-lg sm:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
              Hygienic, affordable, and filling Indian meals for railway travelers. Order ahead, pick up fresh, or get it delivered to your seat.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={scrollToMenu} className="group bg-railway-red text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-railway-orange transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                <span>Explore the menu</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button onClick={scrollToServices} className="glass-effect text-charcoal border-2 border-charcoal px-8 py-4 rounded-xl font-semibold text-lg hover:bg-charcoal hover:text-white transition-all shadow-lg">
                Plan your meal
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="bento-card glass-effect p-4 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
                <Shield className="text-railway-red mb-2" size={24} />
                <p className="text-xs font-semibold text-charcoal">100% Hygienic</p>
              </div>
              <div className="bento-card glass-effect p-4 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
                <Clock className="text-green-600 mb-2" size={24} />
                <p className="text-xs font-semibold text-charcoal">24/7 Available</p>
              </div>
              <div className="bento-card glass-effect p-4 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
                <Zap className="text-blue-600 mb-2" size={24} />
                <p className="text-xs font-semibold text-charcoal">Quick Service</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="hero-image relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200" alt="Indian thali meal" className="w-full h-[500px] object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="hero-card absolute -bottom-6 -left-6 glass-effect p-6 rounded-2xl shadow-2xl border border-white/50 max-w-xs">
              <div className="flex items-start space-x-4">
                <div className="bg-railway-red/10 p-3 rounded-xl backdrop-blur-sm">
                  <Clock className="text-railway-red" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Classic Veg Thali</h3>
                  <p className="text-sm text-gray-600 mb-2">Complete wholesome meal</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-railway-red">₹149</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      <span>15-20 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
