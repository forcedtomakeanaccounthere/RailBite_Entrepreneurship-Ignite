import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MenuCard } from './MenuCard';
import { menuItems, getCategoryName } from '../data/menu';
import { MenuCategory, MenuItem } from '../types';
import { useCart } from '../hooks/useCart';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const MenuExplorer = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [showToast, setShowToast] = useState(false);
  const [toastItem, setToastItem] = useState<string>('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const categories: MenuCategory[] = ['all', 'thalis', 'rice-bowls', 'regional', 'snacks', 'beverages'];

  const filteredItems = activeCategory === 'all' ? menuItems : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.menu-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setToastItem(item.name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const categoryClass = (category: MenuCategory) => {
    return activeCategory === category
      ? 'bg-railway-red text-white'
      : 'bg-gray-100 text-charcoal hover:bg-gray-200';
  };

  return (
    <section id="menu" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-charcoal mb-4">
            Explore our menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wholesome Indian meals made fresh for your journey. Every dish is hygienically prepared and travel-friendly.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={'px-6 py-3 rounded-full font-medium transition-all ' + categoryClass(category)}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              <MenuCard item={item} onAdd={handleAddToCart} />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-up z-50">
          <Check size={24} />
          <span className="font-medium">{toastItem} added to cart</span>
        </div>
      )}
    </section>
  );
};
