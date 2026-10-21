import { useState } from 'react';
import { Check, Clock, MapPin } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { outlets } from '../data/outlets';
import { formatCurrency } from '../lib/formatCurrency';
import { PickupOrder as PickupOrderType } from '../types';

export const PickupOrder = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    outletId: '',
    pickupTime: '',
    customerName: '',
    phone: '',
  });
  const [order, setOrder] = useState<PickupOrderType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Please add items to your cart first');
      return;
    }
    const newOrder: PickupOrderType = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      ...formData,
      items: cart,
      total: getTotal(),
      status: 'preparing',
    };
    setOrder(newOrder);
    localStorage.setItem('railbite_order', JSON.stringify(newOrder));
    clearCart();
  };

  if (order) {
    const outlet = outlets.find(o => o.id === order.outletId);
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h3 className="font-bold text-2xl text-charcoal mb-2">Order Confirmed!</h3>
          <p className="text-gray-700">
            Order ID: <span className="font-mono font-bold">{order.id}</span>
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pickup from</p>
              <p className="font-bold text-lg">{outlet?.name}</p>
              <p className="text-sm text-gray-600">{outlet?.address}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Pickup time</p>
              <p className="font-bold">{order.pickupTime}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4 pb-4 border-b">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl text-railway-red">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
          <h4 className="font-bold text-charcoal mb-2 flex items-center">
            <Clock size={18} className="mr-2" />
            Estimated preparation time: 15-20 minutes
          </h4>
          <p className="text-sm text-gray-600">
            Your order is being prepared. Please arrive at the outlet 5 minutes before your pickup time.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => setOrder(null)}
            className="bg-railway-red text-white px-6 py-3 rounded-lg font-medium hover:bg-railway-orange transition-colors"
          >
            Place another order
          </button>
          <p className="text-xs text-gray-500 mt-4">Demo mode - This is a simulated order</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8">
      <h3 className="font-bold text-2xl text-charcoal mb-6">Order for pickup</h3>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty. Add items from the menu to place an order.</p>
          <button
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-railway-red text-white px-6 py-3 rounded-lg font-medium hover:bg-railway-orange transition-colors"
          >
            Browse menu
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 mb-6">
            <h4 className="font-bold mb-4">Order summary</h4>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl text-railway-red">{formatCurrency(getTotal())}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <MapPin size={16} className="inline mr-1" />
              Select outlet
            </label>
            <select
              required
              value={formData.outletId}
              onChange={(e) => setFormData({ ...formData, outletId: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
            >
              <option value="">Choose an outlet</option>
              {outlets.filter(o => o.hasTakeaway).map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.name} - {outlet.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Clock size={16} className="inline mr-1" />
              Preferred pickup time
            </label>
            <input
              type="time"
              required
              value={formData.pickupTime}
              onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Your name</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Phone number</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder="10-digit number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-railway-red text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-railway-orange transition-colors"
          >
            Confirm order
          </button>
        </form>
      )}
    </div>
  );
};
