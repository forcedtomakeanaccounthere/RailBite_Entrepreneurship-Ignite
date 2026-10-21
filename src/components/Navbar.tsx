import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface NavbarProps {
  onCartClick: () => void;
}

export const Navbar = ({ onCartClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Our promise', href: '#promise' },
    { name: 'Find an outlet', href: '#outlets' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navClass = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' + (
    isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
  );

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#E74C3C" opacity="0.1"/>
              <rect x="20" y="35" width="60" height="25" rx="4" fill="#E74C3C"/>
              <rect x="15" y="30" width="5" height="35" rx="2" fill="#E74C3C"/>
              <rect x="80" y="30" width="5" height="35" rx="2" fill="#E74C3C"/>
              <circle cx="25" cy="65" r="4" fill="#2C3E50"/>
              <circle cx="75" cy="65" r="4" fill="#2C3E50"/>
              <rect x="35" y="42" width="8" height="8" rx="1" fill="white"/>
              <rect x="46" y="42" width="8" height="8" rx="1" fill="white"/>
              <rect x="57" y="42" width="8" height="8" rx="1" fill="white"/>
              <path d="M40 25 L50 20 L60 25" stroke="#E74C3C" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="18" r="3" fill="#E67E22"/>
              <path d="M46 16 Q50 12 54 16" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
            <div>
              <div className="font-display font-bold text-2xl text-charcoal">RailBite</div>
              <div className="text-xs text-gray-600 -mt-1">Good Food. Every Journey.</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-charcoal hover:text-railway-red transition-colors">
                {link.name}
              </button>
            ))}
            <button onClick={onCartClick} className="relative p-2 text-charcoal hover:text-railway-red transition-colors">
              <ShoppingBag size={20} />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-railway-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>
            <button className="bg-railway-red text-white px-6 py-2.5 rounded-lg font-medium hover:bg-railway-orange transition-colors">
              Order a meal
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-charcoal">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-2 text-charcoal hover:bg-cream rounded-lg">
                {link.name}
              </button>
            ))}
            <button onClick={() => { onCartClick(); setIsOpen(false); }}
              className="block w-full text-left px-4 py-2 text-charcoal hover:bg-cream rounded-lg flex items-center justify-between">
              Cart
              {getItemCount() > 0 && (
                <span className="bg-railway-red text-white text-xs rounded-full px-2 py-1">{getItemCount()}</span>
              )}
            </button>
            <button className="w-full bg-railway-red text-white px-6 py-3 rounded-lg font-medium">Order a meal</button>
          </div>
        </div>
      )}
    </nav>
  );
};
