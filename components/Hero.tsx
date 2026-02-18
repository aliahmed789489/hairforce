
import React from 'react';

interface HeroProps {
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Barbershop Background"
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 text-center animate-fade-in">
        <span className="text-white/80 font-medium text-sm mb-4 block uppercase tracking-widest">Welcome To hair force</span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Let's Find A Barber Near You
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          If You're looking to find a barber who's available now or later today begin here
        </p>

        <div className="flex flex-col gap-4 justify-center items-center">
          <button 
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-4 rounded-lg transition-all shadow-xl active:scale-95 text-sm"
          >
            Search barber near you
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
