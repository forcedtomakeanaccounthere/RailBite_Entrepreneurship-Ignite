import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../lib/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer = ({ isOpen, onClose, onCheckout }: CartDrawerProps) => {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-bold text-2xl text-charcoal">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <h3 className="font-bold text-xl text-charcoal mb-2">Your cart is empty</h3>
            <p className="text-gray-600 text-center mb-6">Add some delicious meals to get started</p>
            <button onClick={onClose} className="bg-railway-red text-white px-6 py-3 rounded-lg font-medium hover:bg-railway-orange transition-colors">
              Explore menu
            </button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-4 bg-cream p-4 rounded-xl">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{formatCurrency(item.price)}</p>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-white rounded hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-white rounded hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-charcoal">Subtotal</span>
                <span className="text-2xl font-bold text-railway-red">{formatCurrency(getTotal())}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-railway-red text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-railway-orange transition-colors"
              >
                Proceed to checkout
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">Demo mode - no actual payment will be processed</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
