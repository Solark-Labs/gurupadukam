import React, { useState, useEffect } from 'react';

export const Prelaunch = ({ onLaunch }: { onLaunch: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [isLit, setIsLit] = useState(false);
  const [sparks, setSparks] = useState<{id: number, x: number, y: number}[]>([]);
  const [globalLights, setGlobalLights] = useState(108);

  useEffect(() => {
    const target = new Date();
    target.setHours(23, 11, 11, 0);
    
    if (target.getTime() < Date.now()) {
      target.setTime(Date.now() + 30000); // 30 sec demo if time passed
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        clearInterval(interval);
        onLaunch();
      } else {
        setTimeLeft({
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onLaunch]);

  const handleLightDiya = (e: React.MouseEvent) => {
    if (!isLit) {
      setIsLit(true);
      setGlobalLights(prev => prev + 1);
    }

    // Create sparks
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20)
    }));

    setSparks(prev => [...prev, ...newSparks]);
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !newSparks.find(ns => ns.id === s.id)));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0505] flex flex-col items-center justify-center text-sandal relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isLit ? 'opacity-30' : 'opacity-5'}`}
           style={{ background: 'radial-gradient(circle at center, #C9943A 0%, transparent 60%)' }}></div>

      {/* Decorative Mandalas */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className={`w-[800px] h-[800px] border-[1px] border-gold rounded-full transition-all duration-1000 ${isLit ? 'animate-pulse-glow scale-105' : ''}`}></div>
        <div className={`absolute w-[600px] h-[600px] border-[1px] border-gold rounded-full rotate-45 transition-all duration-1000 ${isLit ? 'scale-110' : ''}`}></div>
      </div>

      <div className="z-10 flex flex-col items-center text-center px-4 w-full max-w-3xl">
        <div className="font-cinzel text-gold tracking-[0.4em] uppercase text-xs md:text-sm mb-8 animate-slideIn">
          ✦ The Grand Unveiling ✦
        </div>
        
        {/* Interactive Diya */}
        <div className="relative mb-12 cursor-pointer group" onClick={handleLightDiya}>
          <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-gold/30 flex items-center justify-center relative overflow-hidden transition-all duration-700 ${isLit ? 'shadow-[0_0_80px_rgba(201,148,58,0.6)] border-gold' : 'hover:border-gold/60'}`}>
            <img 
              src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600" 
              alt="Sacred Diya" 
              className={`w-full h-full object-cover transition-all duration-1000 ${isLit ? 'scale-110 brightness-125' : 'brightness-50 grayscale-[50%] group-hover:brightness-75'}`}
            />
            
            {/* Flame Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-gold/20 to-orange-500/40 mix-blend-overlay transition-opacity duration-1000 ${isLit ? 'opacity-100' : 'opacity-0'}`}></div>
            
            {!isLit && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] group-hover:bg-black/20 transition-all">
                <span className="font-cinzel text-goldLight text-sm tracking-widest uppercase border border-gold/50 px-4 py-2 rounded-full bg-black/50">
                  Tap to Light
                </span>
              </div>
            )}
          </div>

          {/* Sparks */}
          {sparks.map(s => (
            <div key={s.id} className="absolute w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#fff] pointer-events-none animate-float-up"
                 style={{ left: s.x, top: s.y }}></div>
          ))}
        </div>

        <h1 className={`font-cinzel text-4xl md:text-6xl font-bold text-sandal mb-4 drop-shadow-lg transition-all duration-1000 ${isLit ? 'text-goldLight drop-shadow-[0_0_20px_rgba(201,148,58,0.5)]' : ''}`}>
          gurupadukam
        </h1>
        <p className="font-garamond italic text-gold/80 text-xl md:text-2xl mb-12">
          {isLit ? "The light of purity awakens." : "Awaiting the divine spark..."}
        </p>

        {/* Countdown */}
        <div className="flex gap-4 md:gap-8 mb-12 bg-black/40 p-6 rounded-2xl border border-gold/20 backdrop-blur-md">
          <div className="flex flex-col items-center w-16 md:w-24">
            <span className="font-cinzel text-4xl md:text-6xl text-gold font-bold">{String(timeLeft.h).padStart(2, '0')}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-goldLight/70 mt-2">Hours</span>
          </div>
          <span className="font-cinzel text-3xl md:text-5xl text-gold/50 mt-1">:</span>
          <div className="flex flex-col items-center w-16 md:w-24">
            <span className="font-cinzel text-4xl md:text-6xl text-gold font-bold">{String(timeLeft.m).padStart(2, '0')}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-goldLight/70 mt-2">Mins</span>
          </div>
          <span className="font-cinzel text-3xl md:text-5xl text-gold/50 mt-1">:</span>
          <div className="flex flex-col items-center w-16 md:w-24">
            <span className="font-cinzel text-4xl md:text-6xl text-gold font-bold">{String(timeLeft.s).padStart(2, '0')}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-goldLight/70 mt-2">Secs</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-md gap-6">
          <div className="text-sandal/50 text-sm font-cinzel tracking-wider">
            Diyas Lit Globally: <span className="text-gold font-bold text-lg">{globalLights.toLocaleString()}</span>
          </div>

          <button 
            onClick={onLaunch} 
            className="px-6 py-2 border border-gold/30 text-goldLight rounded-full font-cinzel text-xs uppercase tracking-widest hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            Enter Site
          </button>
        </div>
      </div>
    </div>
  );
};
