
import React from 'react';
import { Stylist, Service } from '../types';

interface BarberProfileProps {
  stylist: Stylist;
  onBookService: (service: Service) => void;
}

const BarberProfile: React.FC<BarberProfileProps> = ({ stylist, onBookService }) => {
  // Filter out inactive services
  const activeServices = stylist.services.filter(s => s.isActive !== false);
  const topServices = activeServices.filter(s => s.category === 'Top Services');
  const otherServices = activeServices.filter(s => s.category !== 'Top Services');

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner Message */}
      <div className="bg-slate-50 border-b border-slate-100 py-3 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <i className="fas fa-gift text-blue-600"></i>
          Complete 10 appointments to unlock $20 off
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="relative">
            <img 
              src={stylist.imageUrl} 
              alt={stylist.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
            />
            {stylist.claimed && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase italic">
                <i className="fas fa-check-circle"></i> StyleSeat Verified
              </div>
            )}
          </div>
          <div className="flex-grow text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{stylist.name}</h1>
            <p className="text-slate-500 font-medium">{stylist.specialty}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <button className="text-slate-400 hover:text-blue-600 transition-colors"><i className="far fa-heart text-xl"></i></button>
              <button className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fas fa-share-alt text-xl"></i></button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">The Killer Flawless Beauty Bar</h2>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Show All Photos</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stylist.gallery.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-md group cursor-pointer border border-slate-100">
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-1 border-y border-slate-100 py-8 mb-16 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-black text-slate-900 tracking-tighter">{stylist.rating} <span className="text-slate-300">({stylist.reviewCount})</span></p>
            <div className="flex justify-center text-blue-600 text-[10px]">
              {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star"></i>)}
            </div>
          </div>
          <div className="space-y-1 border-x border-slate-100">
            <p className="text-2xl font-black text-slate-900 tracking-tighter">{stylist.bookedCount}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booked</p>
          </div>
          <div className="flex items-center justify-center text-blue-600">
             <i className="fas fa-award text-3xl"></i>
             <div className="text-left ml-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Badge</p>
                <p className="text-xs font-black uppercase italic leading-none">Top Pro</p>
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Services */}
          <div className="lg:col-span-2 space-y-12">
            {/* Top Services */}
            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 border-b border-slate-100 pb-4">Top Services <span className="text-slate-300 ml-2">({topServices.length})</span></h3>
              <div className="space-y-8">
                {topServices.map(service => (
                  <div key={service.id} className="group flex flex-col md:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-50 last:border-none">
                    <div className="flex-grow space-y-3">
                      <div className="flex items-center justify-between">
                         <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">{service.name}</h4>
                         <p className="text-xl font-black text-slate-900">${service.price}</p>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        <span><i className="far fa-clock mr-1"></i> {service.duration} MIN</span>
                        {service.id === 'm1' && <span className="bg-blue-50 px-2 py-0.5 rounded text-blue-500">#1 Booked</span>}
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{service.description}</p>
                      <div className="flex items-center gap-1 text-[10px] text-blue-600">
                        <i className="fas fa-star"></i>
                        <span className="font-bold text-slate-900">5.0</span>
                        <span className="text-slate-300">(48)</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onBookService(service)}
                      className="bg-slate-950 text-white px-8 py-3 rounded font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex-shrink-0"
                    >
                      See Times
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* All Services */}
            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 border-b border-slate-100 pb-4">All Services <span className="text-slate-300 ml-2">({otherServices.length})</span></h3>
              <div className="space-y-6">
                {otherServices.map(service => (
                  <div key={service.id} className="flex justify-between items-center py-6 border-b border-slate-50 last:border-none group">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-600 cursor-pointer">{service.name}</h4>
                      <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase">
                        <span>${service.price}</span>
                        <span>{service.duration} MIN</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onBookService(service)}
                      className="bg-slate-950 text-white px-6 py-2 rounded font-black uppercase text-[9px] tracking-widest hover:bg-blue-600 transition-all"
                    >
                      See Times
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="space-y-12">
            {/* Location Map */}
            <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
               <div className="h-48 bg-slate-200 relative">
                  {/* Map Simulation */}
                  <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-77.0369,38.9072,13/400x200?access_token=none" className="w-full h-full object-cover opacity-60" alt="" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 text-3xl"><i className="fas fa-map-marker-alt"></i></div>
               </div>
               <div className="p-8 space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</h4>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">{stylist.address}</p>
               </div>
            </div>

            {/* About Me */}
            <div className="space-y-6">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">About Me</h4>
               <div className="flex flex-wrap gap-2">
                 {stylist.tags?.map(tag => (
                   <span key={tag} className="text-[9px] font-black uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full text-slate-500 flex items-center gap-1">
                     <i className="fas fa-certificate text-blue-600 text-[8px]"></i> {tag}
                   </span>
                 ))}
               </div>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">
                 {stylist.bio}
               </p>
               <div className="flex gap-4 pt-4">
                 <button className="flex-1 py-3 border border-slate-200 rounded-lg font-black uppercase text-[9px] tracking-widest text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"><i className="far fa-comment"></i> Message</button>
                 <button className="flex-1 py-3 border border-slate-200 rounded-lg font-black uppercase text-[9px] tracking-widest text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"><i className="fab fa-instagram"></i> Instagram</button>
               </div>
            </div>

            {/* Hours */}
            <div className="space-y-6">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours of Operation</h4>
               <div className="space-y-3">
                 {stylist.hours?.map(item => (
                   <div key={item.day} className="flex justify-between text-[11px] font-bold">
                     <span className="text-slate-400">{item.day}:</span>
                     <span className="text-slate-700 uppercase">{item.hours}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Policies */}
            <div className="space-y-8">
               {stylist.policies?.map(policy => (
                 <div key={policy.title} className="space-y-3">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{policy.title}</h4>
                   <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{policy.content}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberProfile;
