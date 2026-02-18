
import React, { useState } from 'react';
import { Stylist } from '../types';
import { getStyleRecommendations } from '../geminiService';

interface ProfileDetailProps {
  stylist: Stylist;
  onBook: () => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ stylist, onBook }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'reviews'>('services');
  const [aiLoading, setAiLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const askAI = async () => {
    setAiLoading(true);
    const result = await getStyleRecommendations('Oval', 'Tactical, high-performance, precision');
    setRecommendations(result.recommendations || []);
    setAiLoading(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900/50 rounded-[4rem] border border-white/5 overflow-hidden mb-12 animate-fade-in shadow-3xl">
          <div className="p-12 md:p-16 flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-96 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl flex-shrink-0 relative group">
              <img src={stylist.imageUrl} alt={stylist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-10">
                <div>
                  <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">{stylist.name}</h1>
                  <p className="text-2xl text-cyan-400 font-bold mt-4 uppercase tracking-[0.2em] italic">{stylist.specialty}</p>
                </div>
                <button 
                  onClick={onBook}
                  className="bg-cyan-400 text-slate-950 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white shadow-2xl shadow-cyan-400/20 transition-all active:scale-95"
                >
                  DEPLOY MISSION
                </button>
              </div>
              
              <div className="flex flex-wrap gap-10 text-[10px] font-black text-slate-500 mb-10 uppercase tracking-[0.4em]">
                <div className="flex items-center"><i className="fas fa-star text-cyan-400 mr-3 text-lg"></i> <span className="text-white text-base mr-2">{stylist.rating}</span> RATING</div>
                <div className="flex items-center"><i className="fas fa-radar text-cyan-400 mr-3 text-lg"></i> RANGE: {stylist.distance}</div>
                <div className="flex items-center"><i className="fas fa-shield-halved text-cyan-400 mr-3 text-lg"></i> VERIFIED UNIT</div>
              </div>
              
              <p className="text-slate-400 leading-relaxed max-w-4xl text-xl font-medium">{stylist.bio}</p>
            </div>
          </div>

          <div className="bg-slate-950/40 border-t border-white/5 flex px-12 md:px-16 overflow-x-auto">
            {(['services', 'portfolio', 'reviews'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-8 px-10 font-black text-[10px] uppercase tracking-[0.4em] italic transition-all border-b-2 ${
                  activeTab === tab ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'services' && (
              <div className="space-y-6">
                {stylist.services.map(service => (
                  <div key={service.id} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 hover:border-cyan-400/20 transition-all flex flex-col md:flex-row justify-between items-center group">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                      <h3 className="font-black text-2xl text-white italic uppercase tracking-tight">{service.name}</h3>
                      <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mt-2">{service.duration} MIN OPS</p>
                      <p className="text-slate-500 text-sm mt-4 max-w-md font-medium">{service.description}</p>
                    </div>
                    <div className="text-center md:text-right flex flex-col items-center md:items-end">
                      <p className="text-4xl font-black text-white italic tracking-tighter mb-4">${service.price}</p>
                      <button onClick={onBook} className="bg-white text-slate-950 px-10 py-3 rounded-2xl font-black uppercase text-[10px] hover:bg-cyan-400 transition-all shadow-xl">SELECT</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {stylist.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-[2rem] overflow-hidden border border-white/5">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900/40 rounded-[3rem] p-10 border border-white/5 shadow-2xl">
              <h3 className="font-black text-white text-[10px] uppercase italic tracking-[0.4em] mb-10 border-b border-white/5 pb-6">Unit Logistics</h3>
              <ul className="space-y-10">
                <li className="flex flex-col">
                  <span className="text-[8px] text-slate-600 font-black uppercase tracking-[0.4em] mb-3">Deployment Base</span>
                  <span className="text-slate-300 font-bold leading-relaxed">123 Grooming Lane,<br/>Unit A, Phoenix Sector</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-[8px] text-slate-600 font-black uppercase tracking-[0.4em] mb-3">Secure Comms</span>
                  <span className="text-white font-black italic text-xl tracking-tight">(602) 555-0123</span>
                </li>
              </ul>
              
              <div className="mt-12 pt-10 border-t border-white/5">
                 <button 
                  onClick={askAI}
                  disabled={aiLoading}
                  className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-cyan-400 hover:text-slate-950 transition-all shadow-xl flex items-center justify-center"
                >
                  {aiLoading ? <i className="fas fa-spinner fa-spin text-lg"></i> : 'AI STYLE ANALYSIS'}
                </button>
              </div>
            </div>

            {recommendations.length > 0 && (
               <div className="bg-cyan-400/5 p-8 rounded-[2.5rem] border border-cyan-400/20 animate-fade-in shadow-2xl">
                  <h4 className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center">
                    <i className="fas fa-microchip mr-3"></i> Intelligence Output
                  </h4>
                  <div className="space-y-6">
                     {recommendations.map((rec, i) => (
                       <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                          <p className="text-white font-black text-xs uppercase italic mb-1">{rec.name}</p>
                          <p className="text-slate-500 text-[10px] leading-relaxed font-bold">{rec.reason}</p>
                       </div>
                     ))}
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
