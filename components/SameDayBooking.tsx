
import React, { useState } from 'react';
import { AppView } from '../types';
import { CATEGORIES } from '../constants';

interface SameDayBookingProps {
  onSwitchView: (view: AppView) => void;
  onSuccess: (msg: string) => void;
}

const SameDayBooking: React.FC<SameDayBookingProps> = ({ onSwitchView, onSuccess }) => {
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('/');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess("Your request has been broadcast to nearby barbers!");
    onSwitchView('dashboard');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Barbershop Background"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Welcome to the <br/> Hairforce Booking Page
          </h1>
          <p className="text-sm md:text-base text-slate-200 mb-4 max-w-2xl mx-auto font-medium">
            You're just moments away from connecting with a local barbershop. Choose your time and service, and we'll alert barbers nearby.
          </p>
          <p className="text-sm md:text-base text-slate-300 mb-8 max-w-2xl mx-auto font-medium">
            You'll get fast replies with photos, ratings, reviews, and the distance to their barbershop, so you can book with confidence. It's completely free to use, and there's no pressure to book if no one feels like the right fit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => onSwitchView('login')}
              className="px-8 py-2.5 rounded border border-white/40 text-white font-bold text-xs uppercase hover:bg-white hover:text-slate-900 transition-all"
            >
              Account Login
            </button>
            <button 
              onClick={() => onSwitchView('home')}
              className="px-8 py-2.5 rounded border border-white/40 text-white font-bold text-xs uppercase hover:bg-white hover:text-slate-900 transition-all"
            >
              Return to Full Website
            </button>
          </div>
        </div>
      </section>

      {/* Booking Form Card */}
      <section className="max-w-4xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 py-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-center text-slate-800 uppercase tracking-wide">Request A Barber</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Today's Date (can not be changed)</label>
              <input 
                type="text" 
                value={today} 
                readOnly 
                className="w-full p-3 border border-slate-200 rounded bg-slate-50 text-slate-500 font-medium cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Time</label>
              <div className="relative">
                <input 
                  type="time" 
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none text-slate-700 font-medium"
                />
                <i className="far fa-clock absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              </div>
              <p className="text-[11px] text-slate-400">Please choose a time at least 30 minutes from now</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Location</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter Location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none text-slate-700 font-medium"
                />
                <i className="fas fa-map-marker-alt absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              </div>
              <button 
                type="button"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
                  });
                }}
                className="text-blue-600 text-xs font-bold hover:underline"
              >
                Use your current location
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Select Service</label>
              <div className="relative">
                <select 
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none text-slate-700 font-medium appearance-none"
                >
                  <option value="">Select Service</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all uppercase tracking-widest text-sm shadow-lg shadow-blue-600/20"
            >
              NEXT
            </button>
            
            <p className="text-center text-[13px] font-bold text-slate-900 mt-6">
              Heads-up, If you find a barber you like, a $10 deposit is required to confirm
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SameDayBooking;
