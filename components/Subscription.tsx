
import React from 'react';

const Subscription: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 uppercase tracking-tight">My Subscription</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your active plan and billing details</p>
        </div>

        {/* Active Plan Card */}
        <div className="bg-white rounded-2xl border-2 border-blue-600 shadow-xl p-10 overflow-hidden relative">
          <div className="absolute top-6 -right-12 bg-blue-600 text-white text-[10px] font-black uppercase px-12 py-1 rotate-45">Active</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Current Plan</span>
                <h2 className="text-3xl font-black text-blue-600 uppercase italic">Premium Annual</h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">You are currently on our best value plan. Your subscription includes all premium features to maximize your visibility and client growth.</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">$99.90</span>
                <span className="text-slate-400 font-bold">/ year</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Billing Date</span>
                <p className="font-bold text-slate-800">January 15, 2027</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Method</span>
                <div className="flex items-center gap-3">
                  <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                  <span className="font-bold text-slate-800">Ending in 4242</span>
                </div>
              </div>
              <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-black uppercase text-[10px] tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                Update Billing
              </button>
            </div>
          </div>
        </div>

        {/* Features Inclusion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: 'Visibility', val: 'Featured', icon: 'fa-star' },
             { title: 'Photos', val: '20 Slots', icon: 'fa-image' },
             { title: 'Analytics', val: 'Full Access', icon: 'fa-chart-line' }
           ].map((item, i) => (
             <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg"><i className={`fas ${item.icon}`}></i></div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.title}</p>
                   <p className="font-bold text-slate-800">{item.val}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Action Banner */}
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800">Thinking of changing plans?</h4>
            <p className="text-sm text-slate-500">You can cancel or change your plan at any time without any hidden fees.</p>
          </div>
          <button className="px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
