import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Clock, MapPin } from "lucide-react";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-headline", { y: 60, opacity: 0, duration: 1.2 })
        .from(".hero-subline", { y: 40, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-cta", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-image", { scale: 0.95, opacity: 0, duration: 1 }, "-=1")
        .from(".hero-card", { x: 40, opacity: 0, duration: 0.8 }, "-=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  const scrollToServices = () => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-cream via-white to-orange-50 overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-sage/20 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-charcoal">Made for life on the move</span>
            </div>

            <h1 className="hero-headline font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-tight mb-6">
              Good food. <span className="text-railway-red">Right on your journey.</span>
            </h1>

            <p className="hero-subline text-lg sm:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
              Hygienic, affordable, and filling Indian meals for railway travelers. Order ahead, pick up fresh, or get it delivered to your seat.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToMenu} className="group bg-railway-red text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-railway-orange transition-all hover:scale-105 flex items-center justify-center space-x-2">
                <span>Explore the menu</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button onClick={scrollToServices} className="bg-white text-charcoal border-2 border-charcoal px-8 py-4 rounded-xl font-semibold text-lg hover:bg-charcoal hover:text-white transition-all">
                Plan your meal
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="hero-image relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200" alt="Indian thali meal" className="w-full h-[500px] object-cover" loading="eager" />
            </div>

            <div className="hero-card absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
              <div className="flex items-start space-x-4">
                <div className="bg-railway-red/10 p-3 rounded-xl">
                  <Clock className="text-railway-red" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Classic Veg Thali</h3>
                  <p className="text-sm text-gray-600 mb-2">Complete wholesome meal</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-railway-red">₹ 149</span>
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
