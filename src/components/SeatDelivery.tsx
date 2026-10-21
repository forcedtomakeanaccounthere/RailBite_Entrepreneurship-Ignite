import { useState } from 'react';
import { Check, Train, AlertCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../lib/formatCurrency';

export const SeatDelivery = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    trainNumber: '',
    pnr: '',
    seat: '',
    station: '',
    stationCode: '',
    date: '',
    deliveryTime: '',
  });
  const [order, setOrder] = useState<any>(null);

  const supportedStations = ['Nagpur Junction', 'Bhopal Junction', 'Raipur Junction'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Please add items to your cart first');
      return;
    }

    const isSupported = supportedStations.some(s => 
      formData.station.toLowerCase().includes(s.toLowerCase().split(' ')[0])
    );

    const newOrder = {
      id: 'TRN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      ...formData,
      items: cart,
      total: getTotal(),
      isSupported,
    };
    setOrder(newOrder);
    if (isSupported) {
      clearCart();
    }
  };

  if (order && !order.isSupported) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-500 rounded-3xl p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
            <AlertCircle size={32} className="text-white" />
          </div>
          <h3 className="font-bold text-2xl text-charcoal mb-2">Station Not Supported</h3>
          <p className="text-gray-700 mb-6 max-w-lg mx-auto">
            Train-seat delivery is currently available only at select stations: Nagpur, Bhopal, and Raipur. Please choose pickup or dine-in instead.
          </p>
          <button
            onClick={() => setOrder(null)}
            className="bg-railway-red text-white px-6 py-3 rounded-lg font-medium hover:bg-railway-orange transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (order) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h3 className="font-bold text-2xl text-charcoal mb-2">Delivery Confirmed!</h3>
          <p className="text-gray-700">
            Order ID: <span className="font-mono font-bold">{order.id}</span>
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4 pb-4 border-b">
            <div>
              <p className="text-sm text-gray-600 mb-1">Train</p>
              <p className="font-bold">{order.trainNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Seat</p>
              <p className="font-bold">{order.seat}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Station</p>
              <p className="font-bold">{order.station}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivery time</p>
              <p className="font-bold">{order.deliveryTime}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4 pb-4 border-b">
            {order.items.map((item: any) => (
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
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> Our delivery partner will meet you at your seat approximately {order.deliveryTime}. Please keep your phone accessible.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => setOrder(null)}
            className="bg-railway-red text-white px-6 py-3 rounded-lg font-medium hover:bg-railway-orange transition-colors"
          >
            Place another order
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Demo mode - This is a simulated order. Actual train delivery requires verification and station support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-900">
          <AlertCircle size={16} className="inline mr-1" />
          <strong>Note:</strong> Train-seat delivery is currently available at Nagpur, Bhopal, and Raipur stations only.
        </p>
      </div>

      <h3 className="font-bold text-2xl text-charcoal mb-6">Order for seat delivery</h3>

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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <Train size={16} className="inline mr-1" />
                Train number
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 12345"
                value={formData.trainNumber}
                onChange={(e) => setFormData({ ...formData, trainNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">PNR</label>
              <input
                type="text"
                required
                placeholder="10-digit PNR"
                value={formData.pnr}
                onChange={(e) => setFormData({ ...formData, pnr: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Seat/Coach details</label>
            <input
              type="text"
              required
              placeholder="e.g., A1, Coach 23, Seat 45"
              value={formData.seat}
              onChange={(e) => setFormData({ ...formData, seat: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Delivery station</label>
              <input
                type="text"
                required
                placeholder="e.g., Nagpur Junction"
                value={formData.station}
                onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Station Code</label>
              <input
                type="text"
                required
                placeholder="e.g., NGP"
                maxLength={5}
                value={formData.stationCode || ''}
                onChange={(e) => setFormData({ ...formData, stationCode: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Journey date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Preferred delivery time</label>
            <input
              type="time"
              required
              value={formData.deliveryTime}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-railway-red text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-railway-orange transition-colors"
          >
            Confirm delivery order
          </button>
        </form>
      )}
    </div>
  );
};
