
import React from 'react';
import { AppView } from '../types';

interface PricingProps {
  onSwitch: (view: AppView) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSwitch }) => {
  const checkMark = <i className="fas fa-check text-green-500 mr-2"></i>;

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto space-y-6">
        <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">
          Choose the listing option that fits your business. No contracts. Cancel anytime.
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Simple, Transparent Pricing for Barbers
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
          Hairforce Now offers both free and premium directory listings, all plans help clients find and contact you — premium plans increase visibility and conversions.
        </p>
      </section>

      {/* Visual Comparison Section */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-0 mb-32 items-stretch">
        <div className="bg-blue-600 p-16 flex flex-col items-center justify-center text-center rounded-l-2xl md:rounded-l-[3rem]">
          <div className="bg-white p-12 rounded-lg shadow-xl max-w-sm">
            <h3 className="text-2xl font-bold text-slate-900 leading-tight">
              Everything You Need to Manage Your Barber Business for
            </h3>
            <p className="text-3xl font-black text-blue-600 mt-4 uppercase">Free</p>
            <p className="text-lg font-bold text-slate-400 my-2 italic">or only</p>
            <p className="text-3xl font-black text-blue-600 uppercase">$9.99/Month</p>
          </div>
        </div>
        <div className="bg-blue-600/10 p-16 flex items-center justify-center rounded-r-2xl md:rounded-r-[3rem] border-y border-r border-blue-600/20 relative">
          {/* Phone Mockup Placeholder */}
          <div className="w-[280px] h-[500px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden">
             <img src="https://images.unsplash.com/photo-1593702288056-7927b442d0fa?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-60" alt="Profile" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
             <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white">
                <h4 className="font-bold text-xl mb-1">DJ DM</h4>
                <p className="text-[10px] text-slate-400 mb-4"><i className="fas fa-location-dot"></i> 4147 Lincoln Highway</p>
                <div className="flex justify-center text-orange-400 text-sm mb-6">
                   {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star mx-0.5"></i>)}
                </div>
                <div className="space-y-2">
                   <div className="bg-green-500 py-2 rounded-full text-[10px] font-black uppercase"><i className="fas fa-check-circle mr-1"></i> Verified</div>
                   <div className="bg-orange-500 py-2 rounded-full text-[10px] font-black uppercase"><i className="fas fa-star mr-1"></i> Featured</div>
                </div>
                <div className="flex justify-center gap-4 mt-6 text-slate-300">
                   <i className="fas fa-phone"></i>
                   <i className="fab fa-instagram"></i>
                   <i className="fab fa-facebook"></i>
                   <i className="fas fa-paper-plane"></i>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Single Plan: Free Listing */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Start Free — Get Listed in Minutes</h2>
        <p className="text-slate-500 mb-16 font-medium">Every barber can create a free listing in the Hairforce Now Directory. <br/> Upgrade anytime to increase visibility, showcase more work, and attract more clients.</p>
        
        <div className="max-w-sm mx-auto bg-white p-10 rounded-2xl border border-slate-200 shadow-xl space-y-8">
           <h3 className="text-2xl font-bold text-blue-600">Free Listing</h3>
           <div className="text-slate-400 font-bold text-xl">$0<span className="text-sm">/lifetime</span></div>
           <ul className="text-left text-xs font-bold text-slate-700 space-y-4">
              <li className="flex items-center">{checkMark} Accept online bookings</li>
              <li className="flex items-center">{checkMark} Display a professional profile photo</li>
              <li className="flex items-center">{checkMark} Upload up to 2 haircut photos</li>
              <li className="flex items-center">{checkMark} Add up to 5 search tags</li>
              <li className="flex items-center">{checkMark} Get a custom, shareable listing URL</li>
              <li className="flex items-center">{checkMark} Share your ratings badge</li>
           </ul>
           <button onClick={() => onSwitch('register')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-bold uppercase text-[10px] tracking-widest transition-colors">Choose Plan</button>
        </div>
      </section>

      {/* Mid Text Section */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center space-y-8">
         <h2 className="text-3xl font-bold text-blue-600">Online Booking Is Available on Every Plan</h2>
         <p className="text-slate-600 leading-relaxed font-medium">
           All Hairforce Now directory listings — including Free listings — can accept online booking requests. <br/>
           There is no monthly fee required to receive bookings.
         </p>
         <div className="flex flex-col items-center gap-2 text-slate-800 font-bold">
            <div className="flex items-center gap-2">{checkMark} No subscription required</div>
            <div className="flex items-center gap-2">{checkMark} No long-term contracts</div>
         </div>
         <p className="text-slate-500 font-medium">This makes it easy to start free, get visible, and only pay when the directory delivers real results.</p>
      </section>

      {/* Multi-Plan Comparison */}
      <section className="py-24 bg-slate-50 px-6">
         <div className="max-w-7xl mx-auto text-center space-y-16">
            <div className="space-y-4">
               <h2 className="text-3xl font-bold text-blue-600">Increase Visibility & Book More Clients</h2>
               <p className="text-slate-500 font-medium max-w-4xl mx-auto">Premium listings are designed for barbers who want more exposure, stronger credibility, and better conversion from profile views to real clients.</p>
               <div className="text-left max-w-xl mx-auto space-y-4 pt-8 text-slate-800 font-bold">
                  <p className="uppercase text-xs tracking-widest text-slate-400">Premium listings help you:</p>
                  <ul className="space-y-2 text-sm">
                     <li>• Appear higher in search results</li>
                     <li>• Showcase more haircut photos</li>
                     <li>• Build trust with badges, analytics, and social links</li>
                     <li>• Drive clients directly to your booking system</li>
                  </ul>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
               {/* Free Listing Card */}
               <div className="bg-white p-10 rounded-xl border border-slate-200 space-y-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-blue-600">Free Listing</h3>
                  <div className="text-slate-400 font-bold text-xl">$0<span className="text-sm">/lifetime</span></div>
                  <ul className="text-left text-[11px] font-bold text-slate-700 space-y-4">
                     <li className="flex items-center">{checkMark} Accept online bookings</li>
                     <li className="flex items-center">{checkMark} Display a professional profile photo</li>
                     <li className="flex items-center">{checkMark} Upload up to 2 haircut photos</li>
                     <li className="flex items-center">{checkMark} Add up to 5 search tags</li>
                     <li className="flex items-center">{checkMark} Get a custom, shareable listing URL</li>
                     <li className="flex items-center">{checkMark} Share your ratings badge</li>
                  </ul>
                  <button onClick={() => onSwitch('register')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-bold uppercase text-[10px] tracking-widest">Choose Plan</button>
               </div>

               {/* Premium Monthly Card */}
               <div className="bg-white p-10 rounded-xl border-2 border-green-500 space-y-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-6 -right-12 bg-green-500 text-white text-[8px] font-black uppercase px-12 py-1 rotate-45">Featured</div>
                  <h3 className="text-2xl font-bold text-blue-600">Premium Monthly</h3>
                  <div className="text-slate-400 font-bold text-xl">$9.99<span className="text-sm">/month</span></div>
                  <ul className="text-left text-[11px] font-bold text-slate-700 space-y-4">
                     <li className="flex items-center">{checkMark} Accept Online Bookings</li>
                     <li className="flex items-center">{checkMark} Display a professional profile photo</li>
                     <li className="flex items-center">{checkMark} Upload up to 20 haircut photos</li>
                     <li className="flex items-center">{checkMark} Add up to 10 search tags</li>
                     <li className="flex items-center">{checkMark} Featured listing badge</li>
                     <li className="flex items-center">{checkMark} Listing analytics</li>
                     <li className="flex items-center">{checkMark} Link directly to your booking app</li>
                     <li className="flex items-center">{checkMark} Connect your social media profiles</li>
                     <li className="flex items-center">{checkMark} Add a video to showcase your work</li>
                     <li className="flex items-center">{checkMark} Promote special offers & deals</li>
                     <li className="flex items-center">{checkMark} Get a custom, shareable listing URL</li>
                     <li className="flex items-center">{checkMark} Share your ratings badge</li>
                  </ul>
                  <button onClick={() => onSwitch('register')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-bold uppercase text-[10px] tracking-widest">Choose Plan</button>
               </div>

               {/* Premium Annual Card */}
               <div className="bg-white p-10 rounded-xl border border-slate-200 space-y-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-blue-600">Premium Annual</h3>
                  <div className="flex flex-col items-center">
                    <span className="text-slate-400 line-through text-sm font-bold">$119.88</span>
                    <div className="text-green-500 font-bold text-xl">$99.90<span className="text-sm">/year</span></div>
                  </div>
                  <p className="text-blue-500 font-black uppercase text-[10px]">Most Popular</p>
                  <ul className="text-left text-[11px] font-bold text-slate-700 space-y-4">
                     <li className="flex items-center">{checkMark} Accept Online Bookings</li>
                     <li className="flex items-center">{checkMark} Display a professional profile photo</li>
                     <li className="flex items-center">{checkMark} Upload up to 20 haircut photos</li>
                     <li className="flex items-center">{checkMark} Add up to 10 search tags</li>
                     <li className="flex items-center">{checkMark} Featured listing badge</li>
                     <li className="flex items-center">{checkMark} Listing analytics</li>
                     <li className="flex items-center">{checkMark} Link directly to your booking app</li>
                     <li className="flex items-center">{checkMark} Connect your social media profiles</li>
                     <li className="flex items-center">{checkMark} Add a video to showcase your work</li>
                     <li className="flex items-center">{checkMark} Promote special offers & deals</li>
                     <li className="flex items-center">{checkMark} Get a custom, shareable listing URL</li>
                     <li className="flex items-center">{checkMark} Share your ratings badge</li>
                  </ul>
                  <button onClick={() => onSwitch('register')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-bold uppercase text-[10px] tracking-widest">Choose Plan</button>
               </div>
            </div>
         </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center space-y-12">
         <h2 className="text-3xl font-bold text-slate-900 leading-tight">Not Sure Which Plan Is Right for You?</h2>
         <p className="text-slate-500 font-medium">Start with a free listing and upgrade anytime — no risk, no contracts.</p>
         <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onSwitch('register')} className="bg-blue-600 text-white px-8 py-3 rounded font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20">Create A Free Listing</button>
            <button onClick={() => onSwitch('get-app')} className="bg-blue-600 text-white px-8 py-3 rounded font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20">Get Our App</button>
         </div>
      </section>
    </div>
  );
};

export default Pricing;
