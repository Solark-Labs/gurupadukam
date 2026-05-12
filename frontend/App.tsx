import React, { useState, useEffect } from 'react';
import { Prelaunch } from './components/Prelaunch';
import { Navbar, Cart } from './components/Shared';
import { Landing } from './components/Landing';
import { Checkout } from './components/Checkout';
import { Admin } from './components/Admin';
import { UserProfile } from './components/UserProfile';
import { TrackShipment } from './components/TrackShipment';
import { CartItem, Product } from './types';

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [route, setRoute] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gp_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('gp_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    // Show toast instead of aggressively opening the cart
    showToast(`${product.name} added to cart!`);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from cart.");
  };

  if (!hasLaunched) {
    return <Prelaunch onLaunch={() => setHasLaunched(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar 
        cartCount={cart.reduce((a, c) => a + c.qty, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        setRoute={setRoute} 
      />
      
      <main className="flex-1">
        {route === 'home' && <Landing onAddToCart={addToCart} />}
        {route === 'checkout' && <Checkout cart={cart} clearCart={() => setCart([])} setRoute={setRoute} />}
        {route === 'admin' && <Admin />}
        {route === 'profile' && <UserProfile />}
        {route === 'track' && <TrackShipment />}
      </main>

      {/* Footer */}
      <footer className="bg-sindhoorDark text-sandal/70 py-8 text-center border-t border-gold/20">
        <div className="font-cinzel text-gold mb-2 text-xl">gurupadukam</div>
        <p className="text-sm font-garamond italic">© 2025 gurupadukam. Made with 🙏 in Hyderabad, India.</p>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <Cart 
          cart={cart} 
          onClose={() => setIsCartOpen(false)} 
          onCheckout={() => { setIsCartOpen(false); setRoute('checkout'); }} 
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
        />
      )}

      {/* Dynamic Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="bg-sindhoorDark text-goldLight px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(56,3,17,0.5)] font-cinzel text-sm border border-gold flex items-center gap-3">
          <span className="text-lg">🙏</span> {toast}
        </div>
      </div>
    </div>
  );
}
