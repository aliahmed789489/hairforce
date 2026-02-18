
import React from 'react';
import { MOCK_STYLISTS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="space-y-12">
      {/* Search */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Search</h3>
        <div className="flex">
          <input type="text" className="flex-grow p-2 border border-slate-200 rounded-l focus:outline-none text-sm" placeholder="Search..." />
          <button className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition-colors"><i className="fas fa-search"></i></button>
        </div>
      </div>

      {/* Share This */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Share This</h3>
        <div className="flex flex-wrap gap-2">
          {['facebook-f', 'x-twitter', 'pinterest-p', 'linkedin-in', 'reddit-alien', 'envelope', 'tumblr', 'reddit', 'whatsapp', 'telegram'].map((s, i) => (
            <button key={i} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
              <i className={`fab fa-${s} text-xs`}></i>
            </button>
          ))}
        </div>
      </div>

      {/* Social Networks */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">We're Also On Social Networks</h3>
        <div className="flex flex-wrap gap-3">
          {['instagram', 'facebook', 'youtube', 'tiktok', 'linkedin', 'pinterest'].map((s, i) => (
            <button key={i} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
              <i className={`fab fa-${s} text-xs`}></i>
            </button>
          ))}
        </div>
      </div>

      {/* Local Barbers Form */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Search Local Barbers</h3>
        <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex bg-white rounded border border-slate-200">
            <div className="px-3 flex items-center bg-slate-100 border-r border-slate-200 text-blue-600"><i className="fas fa-search"></i></div>
            <input type="text" className="w-full p-2 focus:outline-none text-xs" placeholder="Search by name or category" />
          </div>
          <div className="flex bg-white rounded border border-slate-200">
            <div className="px-3 flex items-center bg-slate-100 border-r border-slate-200 text-blue-600"><i className="fas fa-location-dot"></i></div>
            <input type="text" className="w-full p-2 focus:outline-none text-xs" placeholder="Search by city, state, or zip" />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors">Advanced Search</button>
        </div>
      </div>

      {/* Barbers List */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Barbers</h3>
        <div className="space-y-6">
          {MOCK_STYLISTS.map((s) => (
            <div key={s.id} className="group cursor-pointer border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white">
              <div className="h-24 relative">
                <img src={s.gallery[0] || s.imageUrl} className="w-full h-full object-cover grayscale opacity-50" alt="" />
                <div className="absolute top-1 left-1 bg-black/50 text-white text-[8px] px-1 py-0.5 rounded uppercase">Barber</div>
                <div className="absolute top-1 right-1 text-white/50"><i className="far fa-heart"></i></div>
                <div className="absolute bottom-[-16px] left-3">
                  <img src={s.imageUrl} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                </div>
              </div>
              <div className="p-3 pt-5">
                <h4 className="text-blue-600 font-bold text-xs hover:underline truncate">{s.name}</h4>
                <p className="text-[9px] text-slate-400 mt-1"><i className="fas fa-location-dot mr-1"></i> {s.address?.split(',')[0]}</p>
                <div className="mt-2 text-[9px] font-bold text-slate-500 space-y-0.5">
                  <div className="flex items-center gap-1"><i className="fas fa-check text-blue-500"></i> Accepts Same-Day Requests</div>
                  <div className="flex items-center gap-1"><i className="fas fa-user-check text-blue-500"></i> Claimed: Yes</div>
                </div>
                <div className="mt-2 flex text-blue-500 text-[8px]">
                  {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star mr-0.5"></i>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full border border-blue-600 text-blue-600 py-2 rounded font-bold text-xs hover:bg-blue-600 hover:text-white transition-all uppercase">View all</button>
      </div>
    </aside>
  );
};

export default Sidebar;
