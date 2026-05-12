export interface Product {
  id: string;
  name: string;
  nameTe: string;
  price: number;
  origPrice: number;
  desc: string;
  img: string;
  badge?: string;
  category: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  address: Address;
  status: 'Processing' | 'Shipped' | 'Delivered';
  trackingId?: string;
}