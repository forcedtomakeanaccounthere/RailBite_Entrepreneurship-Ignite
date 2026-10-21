import { Plus, Leaf, Minus } from 'lucide-react';
import { MenuItem } from '../types';
import { formatCurrency } from '../lib/formatCurrency';
import { useCart } from '../hooks/useCart';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const MenuCard = ({ item, onAdd }: MenuCardProps) => {
  const { cart, updateQuantity } = useCart();
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-56 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        {item.isVeg && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1">
            <Leaf size={14} className="text-green-600" />
            <span className="text-xs font-medium text-green-700">Veg</span>
          </div>
        )}
        {!item.isVeg && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-xs font-medium text-red-700">Non-Veg</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700">
          {item.prepTime}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-charcoal mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-railway-red">{formatCurrency(item.price)}</span>
          {quantity === 0 ? (
            <button
              onClick={() => onAdd(item)}
              className="bg-railway-red text-white px-4 py-2 rounded-lg font-medium hover:bg-railway-orange transition-colors flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-railway-red text-white rounded-lg px-2 py-1">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold px-2 min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
