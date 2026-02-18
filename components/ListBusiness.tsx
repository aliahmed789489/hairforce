
import React from 'react';
import { AppView } from '../types';

interface ListBusinessProps {
  onSwitch: (v: AppView) => void;
}

const ListBusiness: React.FC<ListBusinessProps> = ({ onSwitch }) => {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <div className="text-center space-y-4">
           <h1 className="text-4xl font-bold text-blue-600">Choose Your Listing Type</h1>
           <p className="text-slate-500 font-medium">Free listings give you a professional presence. Premium listings help you stand out and attract more clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Listing Card */}
          <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-600">Free Listing</h3>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-bold">$0</span>
                 <span className="text-slate-400 font-bold">/ lifetime</span>
              </div>
              <ul className="space-y-4 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Online booking enabled</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Professional profile photo</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Upload up to 2 haircut photos</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Up to 5 search tags</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Custom listing URL</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Ratings badge</li>
              </ul>
            </div>
          </div>

          {/* Premium Listing Card */}
          <div className="bg-white p-10 rounded-xl border-2 border-blue-600 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3 right-8 bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded">Most Popular</div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-600">Premium Listing</h3>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-bold">$9.99</span>
                 <span className="text-slate-400 font-bold">/ month or $99.90 / year</span>
              </div>
              <ul className="space-y-4 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Upload up to 20 haircut photos</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> 10 search tags</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Featured listing badge</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Listing analytics</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Link to your booking app</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Social media links</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Add video</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Promote special offers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Auth Required Banner */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center gap-4">
           <i className="fas fa-info-circle text-2xl"></i>
           <p className="font-bold text-sm">Step 1 of 2: Log in or create your account to continue. After logging in, you'll complete your barber listing in the next step.</p>
        </div>

        <div className="flex gap-4">
           <button onClick={() => onSwitch('login')} className="bg-blue-600 text-white px-10 py-3 rounded font-bold shadow-lg shadow-blue-600/20 uppercase tracking-widest text-xs">Login</button>
           <button onClick={() => onSwitch('register')} className="border-2 border-blue-600 text-blue-600 px-10 py-3 rounded font-bold uppercase tracking-widest text-xs">Register</button>
        </div>

        <div className="bg-yellow-400 p-4 rounded-lg flex items-center gap-3 font-bold text-slate-900 shadow-sm">
           <i className="fas fa-exclamation-triangle"></i>
           <span>Log in to view your appointments.</span>
        </div>

      </div>
    </div>
  );
};

export default ListBusiness;
