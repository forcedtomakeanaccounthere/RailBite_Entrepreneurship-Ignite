import { useState } from 'react';
import { MapPin, Clock, UtensilsCrossed, ShoppingBag, Search } from 'lucide-react';
import { outlets } from '../data/outlets';

export const OutletFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDineIn, setFilterDineIn] = useState(false);
  const [filterTakeaway, setFilterTakeaway] = useState(false);

  const filteredOutlets = outlets.filter(outlet => {
    const matchesSearch = outlet.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outlet.station.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDineIn = !filterDineIn || outlet.hasDineIn;
    const matchesTakeaway = !filterTakeaway || outlet.hasTakeaway;
    return matchesSearch && matchesDineIn && matchesTakeaway;
  });

  const filterButtonClass = (isActive: boolean) => {
    return isActive
      ? 'bg-railway-red text-white'
      : 'bg-white text-charcoal border border-gray-300';
  };

  return (
    <section id="outlets" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-charcoal mb-4">Find an outlet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Locate RailBite outlets at railway stations across India
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by city or station..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setFilterDineIn(!filterDineIn)}
              className={'px-4 py-2 rounded-full font-medium transition-all flex items-center space-x-2 ' + filterButtonClass(filterDineIn)}
            >
              <UtensilsCrossed size={18} />
              <span>Dine-in</span>
            </button>
            <button
              onClick={() => setFilterTakeaway(!filterTakeaway)}
              className={'px-4 py-2 rounded-full font-medium transition-all flex items-center space-x-2 ' + filterButtonClass(filterTakeaway)}
            >
              <ShoppingBag size={18} />
              <span>Takeaway</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredOutlets.map((outlet) => (
            <div
              key={outlet.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-railway-red transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl text-charcoal mb-1">{outlet.name}</h3>
                  <p className="text-sm text-gray-600">{outlet.station}</p>
                </div>
                {outlet.isDemo && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Demo</span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>{outlet.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2 flex-shrink-0" />
                  <span>{outlet.hours}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                {outlet.hasDineIn && (
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center">
                    <UtensilsCrossed size={12} className="mr-1" />
                    Dine-in
                  </span>
                )}
                {outlet.hasTakeaway && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center">
                    <ShoppingBag size={12} className="mr-1" />
                    Takeaway
                  </span>
                )}
              </div>

              <button className="w-full bg-railway-red text-white px-4 py-2 rounded-lg font-medium hover:bg-railway-orange transition-colors">
                View menu
              </button>
            </div>
          ))}
        </div>

        {filteredOutlets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No outlets found. Try adjusting your search or filters.</p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="font-display font-bold text-3xl text-charcoal mb-4">We're expanding</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            RailBite is building a network across Tier-2 and Tier-3 railway stations. These are demonstration outlets showing our planned expansion.
          </p>
          <p className="text-sm text-gray-500">Demo locations shown. Actual outlets and availability may vary.</p>
        </div>
      </div>
    </section>
  );
};
