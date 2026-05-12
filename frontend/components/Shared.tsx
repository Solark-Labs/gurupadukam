import React, { useState } from 'react';
import { ShoppingCart, User, Shield, X, CheckCircle, Menu, PackageSearch } from 'lucide-react';
import { CartItem } from '../types';

export const Navbar = ({ cartCount, onOpenCart, setRoute }: { cartCount: number, onOpenCart: () => void, setRoute: (r: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: string, sectionId?: string) => {
    setRoute(route);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}</style>
      
      {/* Announcement Bar */}
      <div className="bg-sindhoorDark overflow-hidden py-2 border-b border-gold/20">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              <span className="font-cinzel text-[10px] md:text-xs tracking-[0.18em] uppercase text-goldLight px-8">✦ 100% Organic & Chemical-Free</span>
              <span className="font-cinzel text-[10px] md:text-xs tracking-[0.18em] uppercase text-goldLight px-8">✦ Free Delivery above ₹499</span>
              <span className="font-cinzel text-[10px] md:text-xs tracking-[0.18em] uppercase text-goldLight px-8">✦ Trusted by Temples & Purohits</span>
              <span className="font-cinzel text-[10px] md:text-xs tracking-[0.18em] uppercase text-goldLight px-8">✦ Made with Devotion 🙏</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-sandal/95 backdrop-blur-md border-b border-gold/30 shadow-[0_2px_20px_rgba(56,3,17,0.15)]">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/tNrOkFJHrQGKzMyG/chatgpt-image-mar-21-2026-12_12_33-pm-hxiX10mZJPlTS4KF.png" 
              alt="gurupadukam logo" 
              className="w-12 h-12 rounded-full border-2 border-gold/40 object-contain bg-white group-hover:border-gold transition-colors"
            />
            <div>
              <div className="font-cinzel font-bold text-sindhoor text-lg md:text-xl tracking-wide group-hover:text-sindhoorDark transition-colors">gurupadukam</div>
              <div className="font-garamond text-gold text-[10px] md:text-xs italic">గురు పాదుకం</div>
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 font-cinzel text-sm font-bold text-sindhoor tracking-wider uppercase">
            <button onClick={() => handleNavClick('home', 'products')} className="hover:text-gold transition-colors">Products</button>
            <button onClick={() => handleNavClick('home', 'about')} className="hover:text-gold transition-colors">About Us</button>
            <button onClick={() => handleNavClick('home', 'reviews')} className="hover:text-gold transition-colors">Reviews</button>
            <button onClick={() => handleNavClick('track')} className="hover:text-gold transition-colors flex items-center gap-1"><PackageSearch size={16}/> Track</button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => handleNavClick('admin')} className="hidden md:flex text-sindhoor hover:text-gold transition-colors items-center gap-1 text-xs md:text-sm font-cinzel uppercase tracking-wider">
              <Shield size={18} /> <span>Admin</span>
            </button>
            <button onClick={() => handleNavClick('profile')} className="hidden md:flex text-sindhoor hover:text-gold transition-colors items-center gap-1 text-xs md:text-sm font-cinzel uppercase tracking-wider">
              <User size={18} /> <span>Orders</span>
            </button>
            <button onClick={onOpenCart} className="bg-sindhoor text-goldLight px-4 py-2 rounded-sm font-cinzel text-xs md:text-sm uppercase tracking-wider hover:bg-sindhoorDark transition-colors flex items-center gap-2 border border-gold/30 shadow-md">
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-gold text-sindhoorDark font-bold px-1.5 py-0.5 rounded-full text-[10px]">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-sindhoor" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-sandal border-b border-gold/30 shadow-lg flex flex-col font-cinzel text-sm font-bold text-sindhoor uppercase tracking-wider">
            <button onClick={() => handleNavClick('home', 'products')} className="p-4 border-b border-gold/10 text-left hover:bg-gold/10">Products</button>
            <button onClick={() => handleNavClick('home', 'about')} className="p-4 border-b border-gold/10 text-left hover:bg-gold/10">About Us</button>
            <button onClick={() => handleNavClick('home', 'reviews')} className="p-4 border-b border-gold/10 text-left hover:bg-gold/10">Reviews</button>
            <button onClick={() => handleNavClick('track')} className="p-4 border-b border-gold/10 text-left hover:bg-gold/10 flex items-center gap-2"><PackageSearch size={16}/> Track Order</button>
            <button onClick={() => handleNavClick('profile')} className="p-4 border-b border-gold/10 text-left hover:bg-gold/10 flex items-center gap-2"><User size={16}/> My Orders</button>
            <button onClick={() => handleNavClick('admin')} className="p-4 text-left hover:bg-gold/10 flex items-center gap-2"><Shield size={16}/> Admin Panel</button>
          </div>
        )}
      </nav>
    </>
  );
};

export const Cart = ({ cart, onClose, onCheckout, onUpdateQty, onRemove }: { cart: CartItem[], onClose: () => void, onCheckout: () => void, onUpdateQty: (id: string, d: number) => void, onRemove: (id: string) => void }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-sindhoorDark/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-sandal h-full shadow-2xl flex flex-col border-l border-gold/30 animate-slideIn">
        <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-sindhoor text-sandal">
          <h2 className="font-cinzel text-xl font-bold tracking-wider">Your Cart</h2>
          <button onClick={onClose} className="hover:text-gold transition-colors"><X size={24} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-sindhoor/60 mt-20 font-garamond text-lg italic flex flex-col items-center">
              <ShoppingCart size={48} className="mb-4 opacity-50" />
              Your cart is empty. <br/> Add some divine items.
              <button onClick={onClose} className="mt-8 px-6 py-2 border border-sindhoor text-sindhoor font-cinzel text-sm hover:bg-sindhoor hover:text-sandal transition-colors uppercase tracking-widest">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gold/20 pb-4">
                  <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded border border-gold/30" />
                  <div className="flex-1">
                    <h3 className="font-cinzel text-sindhoor font-bold text-sm">{item.name}</h3>
                    <div className="text-gold font-bold mt-1">₹{item.price}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-sindhoor/30 rounded bg-white">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="px-2 py-1 text-sindhoor hover:bg-sindhoor/10">-</button>
                        <span className="px-2 text-sm font-bold text-sindhoor">{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="px-2 py-1 text-sindhoor hover:bg-sindhoor/10">+</button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-xs text-red-600 hover:underline font-cinzel">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gold/20 bg-white">
            <div className="flex justify-between items-center mb-4 font-cinzel font-bold text-lg text-sindhoor">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-gradient-to-r from-gold to-goldLight text-sindhoorDark font-cinzel font-bold py-3 rounded-sm hover:scale-[1.02] transition-transform shadow-[0_4px_15px_rgba(201,148,58,0.3)] uppercase tracking-widest">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const RazorpayMock = ({ amount, onSuccess, onClose }: { amount: number, onSuccess: () => void, onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={!loading && !success ? onClose : undefined}></div>
      <div className="relative bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-[#02042B] p-4 flex justify-between items-center text-white">
          <div className="font-bold tracking-wider">Razorpay <span className="text-xs font-normal bg-blue-600 px-1 rounded">TEST</span></div>
          <button onClick={!loading && !success ? onClose : undefined} className="text-white/70 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-1">Paying to</div>
            <div className="font-bold text-lg text-gray-800">gurupadukam</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">₹{amount}</div>
          </div>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-green-600">
              <CheckCircle size={64} className="mb-4 animate-bounce" />
              <div className="font-bold text-xl">Payment Successful</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 border rounded bg-gray-50 flex items-center gap-3">
                <div className="w-8 h-6 bg-blue-100 rounded border border-blue-200"></div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Test Card</div>
                  <div className="text-xs text-gray-500">**** **** **** 1111</div>
                </div>
              </div>
              <button 
                onClick={handlePay} 
                disabled={loading}
                className="w-full bg-[#3395FF] text-white font-bold py-3 rounded hover:bg-[#2b80db] transition-colors flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  `Pay ₹${amount}`
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
