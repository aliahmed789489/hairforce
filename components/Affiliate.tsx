
import React from 'react';
import { AppView } from '../types';
import Sidebar from './Sidebar';

interface AffiliateProps {
  view: AppView;
  onSwitch: (view: AppView) => void;
}

/** 
 * Landing page for becoming an affiliate 
 */
export const BecomeAffiliate: React.FC<{ onSwitch: (v: AppView) => void }> = ({ onSwitch }) => {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center space-y-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Start Your Journey as an Affiliate Today!</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">Join us and unlock the potential of affiliate marketing with our resources.</p>
        
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
           <img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200" className="w-full h-[400px] object-cover" alt="Success" />
        </div>

        <div className="text-left space-y-16 py-10">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-600">Earn 40% Commission Promoting Haircut Now</h2>
            <p className="text-slate-600 leading-relaxed font-medium">Help barbers grow their business. Get paid recurring commissions.</p>
            <p className="text-slate-600 leading-relaxed font-medium">Join the Haircut Now Affiliate Program and earn 40% commission for every Annual Premium Plan you refer. Our national barber directory helps independent barbers get discovered on Google, showcase their work, and link all their booking and social profiles in one place.</p>
          </section>

          <section className="space-y-4 border-t border-slate-100 pt-10">
            <h2 className="text-2xl font-bold text-blue-600">Why Promote Haircut Now?</h2>
            <p className="text-slate-600 font-medium">Haircut Now is more than an app — it's a national barber discovery platform.</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-slate-700">
               <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Get discovered in Google searches</li>
               <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Showcase haircut photos and reviews</li>
               <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Link all booking apps and social media profiles</li>
               <li className="flex items-center gap-2"><i className="fas fa-check text-blue-600"></i> Build an online presence without subscriptions or complicated tools</li>
            </ul>
            <p className="text-slate-500 font-medium">You earn when they upgrade.</p>
          </section>

          <section className="space-y-6 border-t border-slate-100 pt-10">
             <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">💰 Commission Details</h2>
             <p className="text-blue-600 font-black uppercase text-sm">Earn 40% per sale on Annual Premium Plans</p>
             <ul className="space-y-3 text-sm font-bold text-slate-600">
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> 40% commission on every annual plan sold</li>
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> Paid per successful referral</li>
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> No cap on earnings</li>
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> Perfect for barbers, influencers, agencies, and content creators</li>
             </ul>
             <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500 italic text-sm text-slate-500">
                Example: If an Annual Premium Plan costs $99, you earn $39.60 per referral.
             </div>
          </section>

          <section className="space-y-6 border-t border-slate-100 pt-10">
             <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">🎯 What You'll Be Promoting</h2>
             <p className="text-blue-600 font-black uppercase text-sm">Haircut Now Premium Directory Listing (Annual)</p>
             <p className="text-slate-600 font-medium">Premium barbers get:</p>
             <ul className="space-y-3 text-sm font-bold text-slate-600">
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> Priority placement in search results</li>
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> Featured listing badge</li>
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> Ability to add booking links, website & all social media</li>
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> Photo galleries to showcase their work</li>
                <li className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-blue-600"></i> Increased visibility across city & location pages</li>
             </ul>
             <p className="text-slate-500 text-xs italic">Barbers keep 100% of their bookings. Haircut Now simply helps them get discovered.</p>
          </section>

          <section className="bg-slate-50 p-12 rounded-[2rem] text-center space-y-8">
             <h2 className="text-3xl font-bold text-slate-800">Ready?</h2>
             <button onClick={() => onSwitch('affiliate-reg')} className="bg-slate-900 text-white px-12 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl">Apply Today</button>
          </section>
        </div>
      </div>
    </div>
  );
};

/** 
 * Registration form for new affiliates 
 */
export const AffiliateRegistration: React.FC<{ onSwitch: (v: AppView) => void }> = ({ onSwitch }) => {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-slate-800 border-b border-slate-100 pb-6">Register a new affiliate account</h1>
        
        <form className="space-y-8">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Name</label>
            <input type="text" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Username <span className="text-blue-500">(required)</span></label>
            <input type="text" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Account Email <span className="text-blue-500">(required)</span></label>
            <input type="email" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Payment Email</label>
            <input type="email" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Website URL</label>
            <input type="url" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="https://" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">How will you promote us?</label>
            <textarea className="w-full p-4 border border-slate-200 rounded h-32 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Are You a Barber or a Content Creator? <span className="text-blue-500">(required)</span></label>
            <select className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
              <option value="">Select Option</option>
              <option value="barber">Barber</option>
              <option value="creator">Content Creator</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Primary Social Platform <span className="text-blue-500">(required)</span></label>
            <select className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
              <option value="">Select Platform</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Social Handle (s) <span className="text-blue-500">(required)</span></label>
            <input type="text" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="@yourhandle" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Audience Size (Approximate)</label>
            <input type="text" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Are You Currently an Active Barber?</label>
            <div className="flex flex-col gap-2 mt-2">
              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="active" className="text-blue-600"/> Yes-I currently take clients</label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="active" className="text-blue-600"/> No-content only</label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">City/State (or Primary Market)</label>
            <input type="text" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div className="space-y-4 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 text-blue-600"/>
              <span className="text-[11px] font-bold text-slate-600">I confirm that I have an active barber-related audience and will promote Haircut Now honestly. <span className="text-blue-500">(required)</span></span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 text-blue-600"/>
              <span className="text-[11px] font-bold text-slate-600">Agree to our <button type="button" onClick={() => onSwitch('affiliate-terms')} className="text-blue-600 hover:underline">Terms of Use and Privacy Policy</button> <span className="text-blue-500">(required)</span></span>
            </label>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-10 py-3 rounded font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20">Register</button>
        </form>
      </div>
    </div>
  );
};

/** 
 * Login page for affiliates 
 */
export const AffiliateLogin: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-20 px-6">
      <div className="max-md mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-800 text-center uppercase tracking-wider">Affiliate Login</h1>
        <form className="space-y-6 bg-slate-50 p-8 border border-slate-200 rounded-xl">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Username</label>
            <input type="text" className="w-full p-3 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-blue-600" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
            <input type="password" className="w-full p-3 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-blue-600" />
          </div>
          <button className="w-full py-4 bg-blue-600 text-white font-bold rounded uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-lg">Login</button>
        </form>
      </div>
    </div>
  );
};

/** 
 * Affiliate dashboard/management area 
 */
export const AffiliateArea: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center border-b border-slate-100 pb-8">
           <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight italic">Dashboard</h1>
           <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase">Logged In</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="md:col-span-1 space-y-2">
              {['Dashboard', 'Profile', 'Creatives', 'Statistics', 'Visits', 'Payouts', 'Log Out'].map(item => (
                <button key={item} className="w-full text-left px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all">
                  {item}
                </button>
              ))}
           </div>
           
           <div className="md:col-span-3 bg-slate-50 p-10 rounded-3xl border border-slate-100 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { label: 'Unpaid Earnings', val: '$0.00' },
                   { label: 'Paid Earnings', val: '$0.00' },
                   { label: 'Visits', val: '0' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-black text-blue-600">{stat.val}</p>
                   </div>
                 ))}
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-lg font-bold text-slate-800">Your Affiliate Link</h3>
                 <div className="flex gap-2">
                    <input type="text" readOnly value="https://hairforce.com/?ref=123" className="flex-grow p-3 border border-slate-200 rounded-lg bg-white text-sm font-medium" />
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase">Copy</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

/** 
 * Main terms of use page 
 */
export const AffiliateTerms: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-3 space-y-12">
            <section className="space-y-6">
              <p className="text-slate-600 text-sm leading-relaxed font-medium">As an authorized affiliate (Affiliate) of Haircut Now, you agree to abide by the terms and conditions contained in this Agreement (Agreement). Please read the entire Agreement carefully before registering and promoting Haircut Now as an Affiliate.</p>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">Your participation in the Program is solely to legally advertise our website to receive a commission on only qualifying new annual premium membership subscriptions purchased by individuals referred to Haircut Now through approved affiliate links, by your own website or personal referrals.</p>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">By signing up for the Haircut Now Affiliate Program (Program), you indicate your acceptance of this Agreement and its terms and conditions.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600">Approval or Rejection of the Application</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">We reserve the right to approve or reject ANY Affiliate Program Application at our sole and absolute discretion. You will have no legal recourse against us for the rejection of your Affiliate Program Application.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600">Commissions</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">Affiliates are eligible to earn a 40% commission on new annual premium membership subscriptions only.</p>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Qualifying subscriptions include:</p>
              <ul className="list-disc list-inside text-sm text-slate-600 font-medium space-y-1">
                <li>Haircut Now Standard Premium (Annual) membership</li>
                <li>Haircut Now Discounted App User Premium (Annual) membership</li>
              </ul>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">The following do NOT qualify for commission:</p>
              <ul className="list-disc list-inside text-sm text-slate-600 font-medium space-y-1">
                <li>Monthly subscriptions</li>
                <li>Subscription renewals</li>
                <li>Subscription upgrades or plan changes</li>
                <li>Any recurring payments after the initial purchase</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600">Termination</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">Your affiliate application and status in the Program may be suspended or terminated for any of the following reasons:</p>
              <ul className="list-disc list-inside text-sm text-slate-600 font-medium space-y-2">
                <li>Misrepresentation of commission eligibility, including implying commissions apply to renewals, monthly plans, or non-qualifying subscriptions.</li>
                <li>Inappropriate advertisements (false claims, misleading hyperlinks, etc.).</li>
                <li>Spamming (mass email, mass newsgroup posting, etc.).</li>
                <li>Advertising on sites containing or promoting illegal activities.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600">Affiliate Links</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">You may use graphic and text links both on your website and within your in-your email messages. You may also advertise the Haircut Now site in online and offline classified ads, magazines, and newspapers.</p>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">You may use the graphics and text provided by us, or you may create your own as long as they are deemed appropriate according to the conditions and not in violation as outlined in the Termination section.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600">Electronic Signatures Effective</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">The Agreement is an electronic contract that sets out the legally binding terms of your participation in the Haircut Now affiliate program. You indicate your acceptance of this Agreement and all of the terms and conditions contained or referenced in this Agreement by completing the Haircut Now application process. This action creates an electronic signature that has the same legal force and effect as a handwritten signature.</p>
            </section>
          </div>

          <Sidebar />
        </div>
      </div>
    </div>
  );
};
