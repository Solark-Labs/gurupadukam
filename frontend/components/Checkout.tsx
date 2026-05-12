import React, { useState } from 'react';
import { CartItem, Address, Order } from '../types';
import { saveOrder, saveAddress } from '../db';
import { RazorpayMock } from './Shared';
import { Lock, ShieldCheck, Server } from 'lucide-react';

export const Checkout = ({ cart, clearCart, setRoute }: { cart: CartItem[], clearCart: () => void, setRoute: (r: string) => void }) => {
  const [address, setAddress] = useState<Address>({ fullName: '', phone: '', street: '', city: '', state: '', zip: '' });
  const [showPayment, setShowPayment] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    saveAddress(address);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    const order: Order = {
      id: 'ORD' + Math.floor(Math.random() * 1000000),
      date: new Date().toISOString(),
      items: [...cart],
      total,
      address,
      status: 'Processing'
    };
    saveOrder(order);
    clearCart();
    setShowPayment(false);
    setRoute('profile');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h2 className="font-cinzel text-3xl text-sindhoor mb-4">Your Cart is Empty</h2>
        <button onClick={() => setRoute('home')} className="bg-sindhoor text-goldLight px-6 py-2 font-cinzel hover:bg-sindhoorDark transition-colors">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <div className="flex items-center justify-between border-b border-gold/30 pb-2 mb-6">
          <h2 className="font-cinzel text-2xl font-bold text-sindhoor">Shipping Details</h2>
          <div className="flex items-center gap-1 text-green-700 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-200">
            <Lock size={12} /> Secure Checkout
          </div>
        </div>
        
        <form onSubmit={handleProceed} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Full Name" className="p-3 border border-gold/40 bg-white focus:outline-none focus:border-sindhoor w-full" value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} />
            <input required placeholder="Phone Number" className="p-3 border border-gold/40 bg-white focus:outline-none focus:border-sindhoor w-full" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
          </div>
          <input required placeholder="Street Address" className="p-3 border border-gold/40 bg-white focus:outline-none focus:border-sindhoor w-full" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
          <div className="grid grid-cols-3 gap-4">
            <input required placeholder="City" className="p-3 border border-gold/40 bg-white focus:outline-none focus:border-sindhoor w-full" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
            <input required placeholder="State" className="p-3 border border-gold/40 bg-white focus:outline-none focus:border-sindhoor w-full" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
            <input required placeholder="PIN Code" className="p-3 border border-gold/40 bg-white focus:outline-none focus:border-sindhoor w-full" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} />
          </div>
          
          <button type="submit" className="w-full bg-sindhoor text-goldLight font-cinzel font-bold py-4 mt-6 hover:bg-sindhoorDark transition-colors border border-gold shadow-md">
            Proceed to Secure Payment
          </button>

          {/* Security Trust Badges */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 font-cinzel">
            <div className="flex items-center gap-1"><Lock size={16} className="text-sindhoor"/> 256-bit Encryption</div>
            <div className="flex items-center gap-1"><ShieldCheck size={16} className="text-sindhoor"/> 100% Secure</div>
            <div className="flex items-center gap-1"><Server size={16} className="text-sindhoor"/> Data Privacy</div>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2 font-garamond">
            Your personal information is encrypted and stored securely. We never share your data.
          </p>
        </form>
      </div>

      <div className="bg-white p-6 border border-gold/30 shadow-lg h-fit">
        <h2 className="font-cinzel text-2xl font-bold text-sindhoor mb-6 border-b border-gold/30 pb-2">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-sindhoor font-bold">{item.qty}x</span>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-bold text-sindhoor">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gold/30 pt-4 flex justify-between items-center font-cinzel text-xl font-bold text-sindhoor">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {showPayment && <RazorpayMock amount={total} onSuccess={handlePaymentSuccess} onClose={() => setShowPayment(false)} />}
    </div>
  );
};
