
import React, { useState } from 'react';
import { MOCK_BLOG_POSTS } from '../constants';

const IncomeCalculator: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593702288056-7927b442d0fa?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Barber Tools"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Out How Much You Made as a Barber Today!</h1>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">Calculate Your Earnings</p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-bold text-xs uppercase tracking-widest">Get Client Referrals</button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        
        {/* Resources Links */}
        <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-blue-600 uppercase tracking-widest border-b border-slate-100 pb-8">
           <a href="#blog" className="hover:underline">Barber Blog</a>
           <a href="#" className="hover:underline">Get your own website</a>
           <a href="#" className="hover:underline">Purchase Barber T-shirts</a>
           <a href="#" className="hover:underline">Barber FAQ</a>
           <a href="#" className="hover:underline">Join Hairforce Now</a>
        </div>

        {/* Weekly Calculator */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-600 mb-8 border-b-2 border-blue-600 inline-block pb-1">The Hairforce Now Free Barber Income Calculator (Weekly)</h2>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-6">
             {[
               { label: 'Weekly Rent Payment ($):' },
               { label: 'Total Weekly Income ($):' },
               { label: 'Days Worked in a Week:' },
               { label: 'Hours Worked per Day:' }
             ].map((item, i) => (
               <div key={i} className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{item.label}</label>
                 <input type="text" className="p-3 border border-slate-200 rounded focus:border-blue-600 outline-none" />
               </div>
             ))}
             <div className="pt-4 space-y-3">
               <button className="w-full bg-blue-600 text-white py-3 rounded font-bold uppercase text-xs tracking-widest shadow-lg">Calculate Income</button>
               <button className="w-full bg-blue-400 text-white py-3 rounded font-bold uppercase text-xs tracking-widest">Reset</button>
             </div>
          </div>
        </section>

        {/* Daily Calculator */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-600 mb-8 border-b-2 border-blue-600 inline-block pb-1">The Hairforce Now Free Barber Income Calculator (Daily)</h2>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-6">
             {[
               { label: 'Weekly Rent Payment ($):' },
               { label: 'Total Hours Worked Today:' },
               { label: 'Total Heads Cut Today:' },
               { label: 'Total Income for the Day ($):' }
             ].map((item, i) => (
               <div key={i} className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{item.label}</label>
                 <input type="text" className="p-3 border border-slate-200 rounded focus:border-blue-600 outline-none" />
               </div>
             ))}
             <div className="pt-4 space-y-3">
               <button className="w-full bg-blue-600 text-white py-3 rounded font-bold uppercase text-xs tracking-widest shadow-lg">Calculate Daily Income</button>
               <button className="w-full bg-blue-400 text-white py-3 rounded font-bold uppercase text-xs tracking-widest">Reset</button>
             </div>
          </div>
        </section>

        {/* Forecast Calculator */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-600 mb-8 border-b-2 border-blue-600 inline-block pb-1">The Hairforce Now Free Barber Forecast Calculator</h2>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-6">
             {[
               { label: 'Desired Monthly Income ($):' },
               { label: 'Service Charge per Haircut (Enter your average for all services) ($):' },
               { label: 'Days Worked per Week:' },
               { label: 'Hours Worked per Day:' }
             ].map((item, i) => (
               <div key={i} className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{item.label}</label>
                 <input type="text" className="p-3 border border-slate-200 rounded focus:border-blue-600 outline-none" />
               </div>
             ))}
             <div className="pt-4 space-y-3">
               <button className="w-full bg-blue-600 text-white py-3 rounded font-bold uppercase text-xs tracking-widest shadow-lg">Calculate Forecast</button>
               <button className="w-full bg-blue-400 text-white py-3 rounded font-bold uppercase text-xs tracking-widest">Reset</button>
             </div>
          </div>
        </section>

        {/* Preferred Barber Marketing Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative p-10 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
             <img src="https://images.unsplash.com/photo-1621605815841-aa8975485d2e?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-2xl" alt="Mobile App" />
          </div>
          <div className="space-y-8">
             <h2 className="text-4xl font-bold text-blue-600">Become A Haircut Now Preferred Barber</h2>
             <div className="space-y-6">
                <div>
                   <h4 className="font-bold text-slate-800 mb-2">No Subscription Fees/No Commitments</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">Hairforce Now uses a referral fee model, so you don't pay anything until you've confirmed an appointment. When a client submits a request, it's sent to all barbers within a 15-mile radius. If the client chooses you and you accept, the client pays Hairforce Now a $10 deposit to secure the appointment. This deposit serves as our referral fee, and you receive the remaining balance directly from the client when they arrive at your shop.</p>
                </div>
                <div>
                   <h4 className="font-bold text-slate-800 mb-2">Expand Your Client Base Instantly</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">Join Hairforce Now to connect with clients actively seeking immediate appointments. Get access to a stream of referral requests from local customers who are available and ready to book on the spot.</p>
                </div>
                <div>
                   <h4 className="font-bold text-slate-800 mb-2">Fill Your Open Slots Efficiently</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">Hairforce Now helps you maximize your earnings by filling in gaps in your schedule. Say goodbye to downtime and hello to more consistent daily income.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="bg-slate-50 -mx-6 px-6 py-24 border-y border-slate-200">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-blue-600 text-center">How Barbers Can Increase Their Income: Proven Strategies to Make More Money</h2>
            <div className="space-y-8 text-slate-700">
               {[
                 { title: "1. Increase Your Prices Strategically", text: "Many barbers hesitate to raise prices, fearing they'll lose clients. However, if you provide exceptional service, use quality products, and create a great customer experience, clients will be willing to pay more." },
                 { title: "2. Offer Upsells and Add-On Services", text: "Increasing your average ticket price is one of the easiest ways to make more money without taking on extra clients." },
                 { title: "3. Improve Appointment Booking Efficiency", text: "Wasted time between appointments costs money. Implementing an efficient booking system allows you to maximize your schedule and reduce downtime." },
                 { title: "4. Expand Your Client Base with Online Marketing", text: "Social media is one of the most powerful tools for barbers. Use Instagram, Facebook, and TikTok to showcase your work and engage with potential clients." }
               ].map((strategy, i) => (
                 <div key={i}>
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{strategy.title}</h3>
                    <p className="text-sm leading-relaxed">{strategy.text}</p>
                 </div>
               ))}
            </div>
            <div className="flex justify-center pt-8">
               <button className="bg-blue-600 text-white px-10 py-4 rounded font-bold shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs">Get Referrals Now</button>
            </div>
          </div>
        </section>

        {/* Newsletter / Join Community */}
        <section className="max-w-4xl mx-auto text-center space-y-8 bg-blue-50 p-16 rounded-3xl border border-blue-100">
           <h2 className="text-3xl font-bold text-slate-800">Join our community and stay updated!</h2>
           <p className="text-slate-600">Subscribe to our email list for the latest news and amazing haircut discounts! Stay in the loop and never miss an important announcement.</p>
           <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input type="text" placeholder="Your name" className="flex-grow p-3 border border-slate-200 rounded focus:outline-none" />
              <input type="email" placeholder="Your Email*" className="flex-grow p-3 border border-slate-200 rounded focus:outline-none" />
              <button className="bg-blue-600 text-white px-8 py-3 rounded font-bold uppercase text-xs tracking-widest">Sign Up</button>
           </div>
        </section>

        {/* Bottom Blog Cards */}
        <section id="blog" className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {MOCK_BLOG_POSTS.slice(0,3).map(post => (
             <div key={post.id} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-4 border border-slate-100">
                   <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                </div>
                <h4 className="text-blue-600 font-bold text-sm leading-tight hover:underline mb-2">{post.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                   <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">D</span>
                   <span>Derrickm</span>
                   <span>• {post.date}</span>
                </div>
             </div>
           ))}
        </section>
      </div>
    </div>
  );
};

export default IncomeCalculator;
