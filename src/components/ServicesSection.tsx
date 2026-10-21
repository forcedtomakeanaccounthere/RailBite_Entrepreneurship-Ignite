import { useState } from 'react';
import { UtensilsCrossed, ShoppingBag, Train } from 'lucide-react';
import { DineInBooking } from './DineInBooking';
import { PickupOrder } from './PickupOrder';
import { SeatDelivery } from './SeatDelivery';

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState<'dine' | 'pickup' | 'delivery' | null>(null);

  const services = [
    {
      id: 'dine' as const,
      icon: UtensilsCrossed,
      title: 'Dine In',
      description: 'Reserve a table before your train arrives',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'pickup' as const,
      icon: ShoppingBag,
      title: 'Takeaway',
      description: 'Order online and pick up fresh meals',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'delivery' as const,
      icon: Train,
      title: 'Seat Delivery',
      description: 'Get meals delivered to your seat (select stations)',
      color: 'from-green-500 to-teal-500',
    },
  ];

  const buttonClass = (serviceId: string) => {
    const base = 'group relative p-8 rounded-3xl text-white text-left transition-all hover:scale-105 hover:shadow-2xl ';
    const active = activeService === serviceId ? 'ring-4 ring-white ring-offset-4 scale-105' : 'opacity-90';
    return base + active;
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-charcoal mb-4">
            Three ways to order
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose the service that fits your journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={buttonClass(service.id) + 'bg-gradient-to-br ' + service.color}
            >
              <service.icon size={48} className="mb-4" />
              <h3 className="font-bold text-2xl mb-2">{service.title}</h3>
              <p className="text-white/90">{service.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </button>
          ))}
        </div>

        {activeService === 'dine' && <DineInBooking />}
        {activeService === 'pickup' && <PickupOrder />}
        {activeService === 'delivery' && <SeatDelivery />}
      </div>
    </section>
  );
};
