import { useState } from 'react';
import { Calendar, Clock, Users, Phone, Check } from 'lucide-react';
import { outlets } from '../data/outlets';
import { DineInBooking as DineInBookingType } from '../types';

export const DineInBooking = () => {
  const [formData, setFormData] = useState({
    outletId: '',
    date: '',
    time: '',
    partySize: '2',
    phone: '',
  });
  const [booking, setBooking] = useState<DineInBookingType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: DineInBookingType = {
      id: 'BOOK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      ...formData,
      partySize: parseInt(formData.partySize),
      status: 'confirmed',
    };
    setBooking(newBooking);
    localStorage.setItem('railbite_booking', JSON.stringify(newBooking));
  };

  if (booking) {
    const outlet = outlets.find(o => o.id === booking.outletId);
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
          <Check size={32} className="text-white" />
        </div>
        <h3 className="font-bold text-2xl text-charcoal mb-2">Table Reserved!</h3>
        <p className="text-gray-700 mb-6">
          Your booking reference: <span className="font-mono font-bold">{booking.id}</span>
        </p>
        <div className="bg-white rounded-xl p-6 text-left max-w-md mx-auto mb-6">
          <p className="text-sm text-gray-600 mb-1">Outlet</p>
          <p className="font-bold text-lg mb-3">{outlet?.name}</p>
          <p className="text-sm text-gray-600 mb-1">Date & Time</p>
          <p className="font-bold mb-3">{booking.date} at {booking.time}</p>
          <p className="text-sm text-gray-600 mb-1">Party Size</p>
          <p className="font-bold">{booking.partySize} guests</p>
        </div>
        <button
          onClick={() => setBooking(null)}
          className="bg-railway-red text-white px-6 py-3 rounded-lg font-medium hover:bg-railway-orange transition-colors"
        >
          Make another booking
        </button>
        <p className="text-xs text-gray-500 mt-4">Demo mode - This is a simulated booking</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8">
      <h3 className="font-bold text-2xl text-charcoal mb-6">Reserve a table</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Select outlet</label>
          <select
            required
            value={formData.outletId}
            onChange={(e) => setFormData({ ...formData, outletId: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
          >
            <option value="">Choose an outlet</option>
            {outlets.filter(o => o.hasDineIn).map((outlet) => (
              <option key={outlet.id} value={outlet.id}>
                {outlet.name} - {outlet.city}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Calendar size={16} className="inline mr-1" />
              Date
            </label>
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
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Clock size={16} className="inline mr-1" />
              Time
            </label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Users size={16} className="inline mr-1" />
              Party size
            </label>
            <select
              value={formData.partySize}
              onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-railway-red focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Phone size={16} className="inline mr-1" />
              Phone number
            </label>
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
          Reserve table
        </button>
      </form>
    </div>
  );
};
