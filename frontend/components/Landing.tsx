import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

export const Landing = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = activeFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="bg-sandal">
      {/* Hero Section - 50/50 Split with Video */}
      <section className="relative w-full min-h-[clamp(500px,88vh,820px)] bg-sindhoorDark flex items-center py-20 overflow-hidden">
        {/* Background pattern/overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply"
          style={{ backgroundImage: "url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400,h=900,fit=crop/tNrOkFJHrQGKzMyG/chatgpt-image-mar-24-2026-10_27_29-pm-uy3PQQ9sZQ3cAUb8.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-sindhoorDark via-sindhoorDark/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text Content */}
          <div className="order-2 lg:order-1">
            <div className="font-cinzel text-[clamp(0.62rem,1.1vw,0.8rem)] tracking-[0.32em] uppercase text-gold mb-4 animate-slideIn">
              ✦ Organic Pooja Materials — Hyderabad
            </div>
            <h1 className="font-cinzel text-[clamp(2rem,4vw,3.5rem)] font-bold text-sandal leading-[1.1] drop-shadow-[0_4px_28px_rgba(0,0,0,0.5)] animate-slideIn" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Sacred Puja Materials, Blessed by Nature
            </h1>
            
            <div className="mt-6 p-4 border-l-2 border-gold bg-gradient-to-r from-gold/10 to-transparent animate-slideIn" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <h2 className="font-garamond text-[clamp(1.2rem,2vw,1.6rem)] text-goldLight font-bold italic">
                "Our products are as pure as Ma Ganga."
              </h2>
              <p className="font-garamond text-sandal/80 mt-2 text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed">
                Experience the divine aura of the sacred Ganga Harathi. We prepare every Pooja material with this exact devotion, ensuring a natural purity that touches the soul.
              </p>
            </div>

            <p className="font-garamond italic text-[clamp(0.95rem,1.2vw,1.1rem)] text-goldLight/70 mt-6 leading-relaxed animate-slideIn" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              100% organic, chemical-free essentials prepared the traditional Vedic way for temples, homes & ceremonies.
            </p>
            
            <div className="flex gap-4 mt-8 flex-wrap animate-slideIn" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-gold to-goldLight text-sindhoorDark font-cinzel text-xs md:text-sm font-bold px-8 py-4 uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_4px_22px_rgba(201,148,58,0.35)]">
                Shop All Products
              </button>
            </div>
          </div>

          {/* Right Side: 4K Video */}
          <div className="order-1 lg:order-2 relative animate-slideIn flex justify-center" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <div className="relative w-full max-w-md aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-t-full overflow-hidden border-4 border-gold shadow-[0_0_50px_rgba(201,148,58,0.3)] group">
              <video 
                src="https://www.pexels.com/download/video/20143556/" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              ></video>
              <div className="absolute inset-0 bg-gradient-to-t from-sindhoorDark/90 via-sindhoorDark/20 to-transparent"></div>
              
              {/* Overlay Text on Video */}
              <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                <div className="font-cinzel text-goldLight text-sm tracking-widest uppercase mb-1">Divine Devotion</div>
                <div className="font-garamond text-sandal text-lg italic">Ganga Harathi</div>
              </div>
            </div>
            
            {/* Decorative Mandalas */}
            <div className="absolute -bottom-8 -right-4 text-6xl text-gold/40 animate-pulse-glow pointer-events-none">❁</div>
            <div className="absolute top-1/4 -left-8 text-5xl text-gold/30 animate-pulse-glow pointer-events-none" style={{ animationDelay: '1s' }}>❁</div>
          </div>

        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-sindhoor py-6 px-4 flex justify-center gap-6 md:gap-16 flex-wrap border-y border-gold/20">
        {[
          { icon: '🌿', title: '100% Organic', sub: 'No chemicals ever' },
          { icon: '🚚', title: 'Free Delivery', sub: 'Orders above ₹499' },
          { icon: '🔄', title: 'Easy Returns', sub: 'Hassle-free policy' },
          { icon: '🔒', title: 'Secure Payment', sub: 'Razorpay & UPI' },
          { icon: '🏛️', title: 'Temple-Grade', sub: 'Purohit trusted' }
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-2xl text-gold">{t.icon}</span>
            <div>
              <div className="font-cinzel text-[0.64rem] tracking-[0.13em] uppercase text-goldLight">{t.title}</div>
              <div className="text-[0.74rem] text-sandal/60">{t.sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Launch Banner / Combo Kit */}
      <section className="py-20 px-4 relative overflow-hidden bg-[#FAF0D0]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(201,148,58,0.07)_0%,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border border-gold/30 bg-gradient-to-br from-sindhoorDark via-sindhoor to-[#7D1A30] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center p-[clamp(2rem,5vw,4rem)] relative overflow-hidden shadow-[0_12px_48px_rgba(56,3,17,0.5)]">
            <div className="absolute -right-[8%] -top-[60%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,148,58,0.1)_0%,transparent_65%)] pointer-events-none"></div>
            <div className="absolute right-8 -bottom-4 text-[9rem] text-gold/5 leading-none pointer-events-none font-serif">ॐ</div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gold text-sindhoorDark font-cinzel text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 mb-4 font-bold">
                ✦ Exclusive Offer
              </div>
              <h2 className="font-cinzel text-[clamp(1.45rem,3.5vw,2.7rem)] text-sandal leading-[1.15] font-bold">Complete Puja Combo Kit</h2>
              <div className="font-garamond text-[1.05rem] text-goldLight mt-1">అన్ని పూజా సామగ్రి — ఒకే కిట్‌లో</div>
              <p className="font-garamond italic text-[1.02rem] text-sandal/70 max-w-[460px] mt-3 leading-[1.7]">
                All 5 sacred items — Pasupu, Kumkum, Gandham, Vibhuti & Yagnopavitam — beautifully packaged in a traditional gift box. Perfect for festivals & gifting.
              </p>
              <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 bg-gradient-to-r from-gold to-goldLight text-sindhoorDark font-cinzel text-xs font-bold px-6 py-3 uppercase tracking-widest hover:scale-105 transition-transform">
                Order Combo Kit →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-10">
          <div className="font-cinzel text-[0.68rem] tracking-[0.28em] uppercase text-gold mb-2">✦ Curated Collection</div>
          <h2 className="font-cinzel text-[clamp(1.55rem,2.8vw,2.3rem)] font-bold text-sindhoor tracking-[0.1em] uppercase">Our Products</h2>
          <div className="font-garamond text-base text-[#6B3A1F] mt-1">మన ఉత్పత్తులు — పూజా సామగ్రి</div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
            <span className="text-gold text-lg">❁</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'powder', label: 'Powders' },
            { id: 'thread', label: 'Sacred Thread' },
            { id: 'combo', label: 'Combo Kits' }
          ].map(f => (
            <button 
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`font-cinzel text-[0.66rem] tracking-[0.13em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeFilter === f.id 
                  ? 'bg-sindhoor text-goldLight border-sindhoor' 
                  : 'bg-transparent text-[#5A3020] border-gold/30 hover:bg-sindhoor/10'
              }`}
              style={{ clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white border border-gold/20 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_18px_52px_rgba(92,10,32,0.18)] transition-all duration-300 cursor-pointer flex flex-col">
              {p.badge && (
                <div className={`absolute top-3 left-3 z-10 font-cinzel text-[0.56rem] tracking-[0.13em] uppercase px-2.5 py-1 font-bold ${
                  p.badge.includes('Organic') ? 'bg-[#2d6a1f] text-[#e8f5e0]' :
                  p.badge.includes('Value') ? 'bg-gold text-sindhoorDark' :
                  'bg-sindhoor text-goldLight'
                }`}>
                  {p.badge}
                </div>
              )}
              
              <div className="w-full aspect-square overflow-hidden bg-gradient-to-br from-[#f5e8d0] to-[#e8d5b0] relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                
                {/* Hover Actions */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sindhoor/90 to-transparent p-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button onClick={() => onAddToCart(p)} className="flex-1 bg-gold text-sindhoorDark font-cinzel text-[0.6rem] tracking-[0.1em] uppercase py-2 font-bold hover:bg-goldLight transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="font-cinzel text-[0.86rem] font-bold tracking-[0.04em] text-sindhoor">{p.name}</div>
                <div className="font-garamond text-[0.8rem] text-[#6B3A1F] mt-0.5">{p.nameTe}</div>
                <div className="text-[0.76rem] text-[#6B3A1F] italic my-1.5 line-clamp-1">{p.desc}</div>
                
                <div className="mt-auto pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-cinzel text-[0.96rem] font-bold text-sindhoor">₹{p.price}</span>
                    <span className="text-[0.76rem] text-gray-400 line-through">₹{p.origPrice}</span>
                    <span className="font-cinzel text-[0.66rem] text-gold font-bold">
                      {p.category === 'combo' ? `Save ₹${p.origPrice - p.price}` : `${Math.round((1 - p.price/p.origPrice)*100)}% off`}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mt-1 text-gold text-[0.7rem]">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 px-4 bg-sindhoorDark relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_80%_at_80%_50%,rgba(201,148,58,0.07)_0%,transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="font-cinzel text-[0.68rem] tracking-[0.28em] uppercase text-gold mb-2">✦ Our Promise</div>
            <h2 className="font-cinzel text-[clamp(1.55rem,2.8vw,2.3rem)] font-bold text-sandal tracking-[0.1em] uppercase">Why Choose Guru Padukam?</h2>
            <div className="font-garamond text-base text-goldLight mt-1">మనం ఎందుకు అత్యుత్తమం?</div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
              <span className="text-gold text-lg">❁</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: '100% Organic', desc: 'No artificial colours, chemicals, or preservatives. Pure as nature intended.' },
              { icon: '🏺', title: 'Traditional Preparation', desc: 'Ancient Vedic preparation methods passed down through generations of craftsmen.' },
              { icon: '🏛️', title: 'Temple & Purohit Trusted', desc: 'Widely used in temples across Hyderabad & endorsed by experienced purohits.' },
              { icon: '🙏', title: 'Made with Devotion', desc: 'Each item prepared with prayer & intent — you can feel the difference in quality.' },
              { icon: '📦', title: 'Hygienic Packaging', desc: 'Packed in clean, airtight containers to preserve freshness and sacred potency.' },
              { icon: '🚚', title: 'Pan-India Delivery', desc: 'Fast & safe delivery across all of India with careful packaging for powders.' }
            ].map((w, i) => (
              <div key={i} className="border border-gold/20 p-6 bg-sandal/5 text-center hover:bg-gold/10 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{w.icon}</div>
                <div className="font-cinzel text-[0.75rem] tracking-[0.11em] uppercase text-goldLight mb-2 font-bold">{w.title}</div>
                <div className="text-[0.86rem] text-sandal/60 leading-[1.62]">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 px-4 bg-[#FAF0D0] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-cinzel text-[0.68rem] tracking-[0.28em] uppercase text-gold mb-2">✦ Devotee Reviews</div>
            <h2 className="font-cinzel text-[clamp(1.55rem,2.8vw,2.3rem)] font-bold text-sindhoor tracking-[0.1em] uppercase">What Our Customers Say</h2>
            <div className="font-garamond text-base text-[#6B3A1F] mt-1">భక్తుల అనుభవాలు</div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
              <span className="text-gold text-lg">❁</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "The Pasupu and Kumkum quality is unmatched. Our temple priest specifically requested us to continue ordering from GuruPadukam. The colour is so natural and vibrant — nothing like synthetic ones.", author: "Padmavathi Rao", loc: "Nizampet, Hyderabad" },
              { text: "Ordered Yagnopavitam for my son's Upanayanam. Perfect quality, authentic thread, delivered well before the auspicious date. Will order the combo kit next — highly recommended!", author: "Srinivas Sharma", loc: "Secunderabad, Telangana" },
              { text: "The Gandham fragrance is authentic Mysore sandalwood — no synthetic smell at all. I have been searching for this purity for years. జయ్ గురు పాదుకం! 🙏", author: "Lakshmi Devi Venkataraman", loc: "Karimnagar, Telangana" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 border border-gold/20 relative hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(92,10,32,0.1)] transition-all duration-300">
                <div className="absolute top-2 left-3 text-5xl text-gold/10 font-serif leading-none">"</div>
                <div className="flex gap-0.5 text-gold text-[0.72rem] mb-3 relative z-10">★★★★★</div>
                <div className="font-garamond italic leading-[1.8] text-[#5A3020] text-[0.95rem] mb-4 relative z-10">"{t.text}"</div>
                <div className="font-cinzel text-[0.74rem] tracking-[0.07em] text-sindhoor font-bold">{t.author}</div>
                <div className="text-[0.74rem] text-[#6B3A1F] italic">{t.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
