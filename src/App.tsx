import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { MenuExplorer } from './components/MenuExplorer';
import { HowItWorks } from './components/HowItWorks';
import { ServicesSection } from './components/ServicesSection';
import { PromiseSection } from './components/PromiseSection';
import { BrandStory } from './components/BrandStory';
import { OutletFinder } from './components/OutletFinder';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  const handleCheckout = () => {
    setCartOpen(false);
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ProblemSection />
      <OutletFinder />
      <MenuExplorer />
      <HowItWorks />
      <ServicesSection />
      <PromiseSection />
      <BrandStory />
      <FAQ />
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
