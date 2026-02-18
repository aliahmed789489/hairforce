
import React from 'react';

const GetOurApp: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-5xl font-bold text-blue-600 tracking-tight">Download the Hairforce Now App</h1>
        <p className="text-slate-500 font-medium">Whether you're a client or a barber, Hairforce Now helps you connect instantly.</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-32 pb-32">
        
        {/* Clients Section */}
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">Hairforce Now for Clients</h2>
            <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Book a same-day haircut in seconds. Compare portfolios, chat with barbers, and lock in your appointment with a refundable $10 deposit.</p>
            <div className="flex justify-center gap-4 mt-8">
               <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-10 cursor-pointer" alt="App Store" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-10 cursor-pointer" alt="Play Store" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'fa-bolt', title: 'Fast Matching', text: 'See barbers nearby with open spots now.' },
              { icon: 'fa-image', title: 'Portfolio Preview', text: 'Browse photos, reviews, and ratings before you book.' },
              { icon: 'fa-comment', title: 'Instant Chat', text: 'Ask questions or share inspiration pics.' },
              { icon: 'fa-money-bill', title: 'Refundable $10 Deposit', text: 'Your deposit is deducted from your final price—no extra fee.' },
              { icon: 'fa-check-circle', title: 'Transparent Pricing', text: "Know exactly what you'll pay before you leave." }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"><i className={`fas ${feature.icon}`}></i></div>
                <h4 className="font-bold text-slate-800">{feature.title}</h4>
                <p className="text-sm text-slate-500">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Barbers Section */}
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">Hairforce Now for Barbers</h2>
            <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Get live, same-day haircut requests—no subscriptions, no credit cards. Earn on your terms.</p>
            <div className="flex justify-center gap-4 mt-8">
               <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-10 cursor-pointer" alt="App Store" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-10 cursor-pointer" alt="Play Store" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'fa-user-plus', title: 'Instant Referrals', text: 'Receive live haircut requests from nearby clients.' },
              { icon: 'fa-wallet', title: 'Zero Upfront Costs', text: 'No subscription, no credit card required—ever.' },
              { icon: 'fa-comment-alt', title: 'Built-In Chat', text: 'Confirm timing and style before accepting.' },
              { icon: 'fa-tags', title: 'Upfront Pricing', text: '$10 deposit deducted from service cost—barbers always get paid in person.' },
              { icon: 'fa-sliders-h', title: 'Full Control', text: 'Accept or decline each request based on your schedule.' },
              { icon: 'fa-sync', title: 'Repeat Business', text: 'Keep 100% of all future bookings when clients return directly.' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"><i className={`fas ${feature.icon}`}></i></div>
                <h4 className="font-bold text-slate-800">{feature.title}</h4>
                <p className="text-sm text-slate-500">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GetOurApp;
