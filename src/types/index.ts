export type MenuCategory = 'all' | 'thalis' | 'rice-bowls' | 'regional' | 'snacks' | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVeg: boolean;
  prepTime: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Outlet {
  id: string;
  name: string;
  city: string;
  station: string;
  address: string;
  hours: string;
  hasDineIn: boolean;
  hasTakeaway: boolean;
  phone: string;
  isDemo: boolean;
}

export interface DineInBooking {
  id: string;
  outletId: string;
  date: string;
  time: string;
  partySize: number;
  phone: string;
  status: 'confirmed' | 'pending';
}

export interface PickupOrder {
  id: string;
  outletId: string;
  items: CartItem[];
  pickupTime: string;
  customerName: string;
  phone: string;
  total: number;
  status: 'preparing' | 'ready' | 'collected';
}

export interface SeatDeliveryOrder {
  id: string;
  trainNumber: string;
  pnr: string;
  seat: string;
  station: string;
  date: string;
  deliveryTime: string;
  items: CartItem[];
  total: number;
  isSupported: boolean;
}
