import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-railway-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">Make room for a better journey</h3>
          <p className="text-white text-lg mb-8">Start your meal planning now</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('#menu')}
              className="group bg-white text-railway-red px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cream transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore the menu</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => scrollToSection('#outlets')}
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-railway-red transition-all"
            >
              Find an outlet
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="#E74C3C" />
                <path d="M16 8L20 16L16 24L12 16L16 8Z" fill="white" />
              </svg>
              <div className="font-display font-bold text-xl">RailBite</div>
            </div>
            <p className="text-gray-300 mb-4">Good Food. Every Journey.</p>
            <p className="text-sm text-gray-400">
              Making hygienic, affordable meals accessible to railway travelers across India.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('#menu')} className="text-gray-300 hover:text-white transition-colors">
                  Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#how-it-works')} className="text-gray-300 hover:text-white transition-colors">
                  How it works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#promise')} className="text-gray-300 hover:text-white transition-colors">
                  Our promise
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#outlets')} className="text-gray-300 hover:text-white transition-colors">
                  Find an outlet
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Dine-in booking</li>
              <li className="text-gray-300">Takeaway orders</li>
              <li className="text-gray-300">Seat delivery</li>
              <li className="text-gray-300">Group orders</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Get in touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-300">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>hello@railbite.in</span>
              </li>
              <li className="flex items-start text-gray-300">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Demo contact</span>
              </li>
              <li className="flex items-start text-gray-300">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Expanding across India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">© 2026 RailBite. Concept prototype for demonstration.</p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-6">
            RailBite is a concept prototype. Locations, availability, prices, and order statuses shown are illustrative.
          </p>
        </div>
      </footer>
    </>
  );
};
