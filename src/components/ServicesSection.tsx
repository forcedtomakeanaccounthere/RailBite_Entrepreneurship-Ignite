import { useState } from 'react';
import { UtensilsCrossed, ShoppingBag, Train } from 'lucide-react';
import { ServiceModal } from './ServiceModal';

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState<'dine' | 'pickup' | 'delivery' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      id: 'dine' as const,
      icon: UtensilsCrossed,
      title: 'Dine In',
      description: 'Reserve a table before your train arrives. Enjoy a comfortable meal at our hygienic outlets.',
      color: 'from-orange-500 via-red-500 to-pink-500',
      bgPattern: 'bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]',
    },
    {
      id: 'pickup' as const,
      icon: ShoppingBag,
      title: 'Takeaway',
      description: 'Order ahead and skip the queue. Pick up fresh, hot meals ready when you arrive.',
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      bgPattern: 'bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2)_0%,transparent_50%)]',
    },
    {
      id: 'delivery' as const,
      icon: Train,
      title: 'Seat Delivery',
      description: 'Meals delivered directly to your seat at select stations. No need to leave your coach.',
      color: 'from-green-500 via-teal-500 to-cyan-500',
      bgPattern: 'bg-[radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.2)_0%,transparent_50%)]',
    },
  ];

  const handleServiceClick = (serviceId: 'dine' | 'pickup' | 'delivery') => {
    setActiveService(serviceId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setActiveService(null), 300);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-cream via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-charcoal mb-4">
            Three ways to order
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose the service that fits your journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={'group relative overflow-hidden rounded-3xl text-white transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl bg-gradient-to-br ' + service.color}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={'absolute inset-0 ' + service.bgPattern + ' opacity-50'} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <service.icon size={32} strokeWidth={2} />
                </div>
                
                <h3 className="font-display font-bold text-3xl mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/90 leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-sm font-semibold tracking-wide">Get started</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-railway-red transition-all duration-300">
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </button>
          ))}
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceType={activeService}
      />
    </section>
  );
};

