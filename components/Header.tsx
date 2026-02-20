
import React, { useState } from 'react';
import { AppView } from '../types';

interface HeaderProps {
  view: AppView;
  setView: (view: AppView) => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, onLogoClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const NavItem = ({ label, items, viewKey }: { label: string, items?: { label: string, view: AppView }[], viewKey?: AppView }) => (
    <div className="dropdown-container group">
      <button 
        onClick={() => viewKey && setView(viewKey)}
        className="px-4 py-6 text-[13px] font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 transition-all"
      >
        {label}
        {items && <i className="fas fa-chevron-down text-[8px] opacity-40 group-hover:rotate-180 transition-transform"></i>}
      </button>
      {items && (
        <div className="dropdown-menu pt-0">
          <div className="bg-white rounded-md shadow-xl border border-slate-100 overflow-hidden py-2 min-w-[200px]">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setView(item.view)}
                className="w-full text-left px-5 py-2.5 text-[12px] font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const MobileLink = ({ label, viewKey, items }: { label: string, viewKey?: AppView, items?: { label: string, view: AppView }[] }) => (
    <div className="border-b border-slate-50 last:border-none">
      <button 
        onClick={() => { if (viewKey) { setView(viewKey); closeMobileMenu(); } }}
        className={`w-full text-left py-4 px-2 text-[14px] font-bold uppercase tracking-wider flex justify-between items-center ${viewKey ? 'text-slate-900' : 'text-blue-600'}`}
      >
        {label}
        {viewKey && <i className="fas fa-chevron-right text-[10px] opacity-30"></i>}
      </button>
      {items && (
        <div className="pl-4 pb-2 space-y-2">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => { setView(item.view); closeMobileMenu(); }}
              className="w-full text-left py-2 text-[13px] font-semibold text-slate-500 hover:text-blue-600"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-100 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <button onClick={() => { onLogoClick(); closeMobileMenu(); }} className="flex items-center space-x-3 group">
          <div className="w-32 h-32 flex items-center justify-center ">
            {/* <i className="fas fa-scissors text-white text-xl"></i> */}
            <img src={"/images/logo.png"}></img>
          </div>
          {/* <span className="text-2xl font-black text-blue-600 tracking-tighter uppercase italic">
            HAIRFORCE
          </span> */}
          </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavItem label="Home" viewKey="home" />
          
          <NavItem label="Find A Barber" items={[
            { label: 'Request Same Day Appointment', view: 'same-day' },
            { label: 'Search Directory', view: 'search' },
            { label: 'Blog', view: 'blog' }
          ]} />

          <button 
            onClick={() => setView('style-preview')} 
            className="px-4 py-6 text-[13px] font-bold text-slate-700 hover:text-blue-600 transition-all"
          >
            Style Preview AI
          </button>

          <NavItem label="For Barbers" items={[
            { label: 'Pro Dashboard', view: 'pro-dashboard' },
            { label: 'List Your Business', view: 'list-business' },
            { label: 'Get Our App', view: 'get-app' },
            { label: 'Free Barber Income Calculator', view: 'income-calculator' }
          ]} />

          <button 
            onClick={() => setView('pricing')} 
            className="px-4 py-6 text-[13px] font-bold text-slate-700 hover:text-blue-600 transition-all"
          >
            Pricing
          </button>

          <NavItem label="Account" items={[
            { label: 'Register', view: 'register' },
            { label: 'Login', view: 'login' },
            { label: 'My Subscription', view: 'subscription' }
          ]} />

          <NavItem label="Affiliate Program" items={[
            { label: 'Become An Affiliate', view: 'affiliate-become' },
            { label: 'Affiliate Registration', view: 'affiliate-reg' },
            { label: 'Affiliate Login', view: 'affiliate-login' },
            { label: 'Dashboard', view: 'affiliate-area' },
            { label: 'Affiliate Terms Of Use', view: 'affiliate-terms' }
          ]} />
          
          <div className="ml-4 pl-4 border-l border-slate-100">
             <i className="far fa-user text-slate-400 hover:text-blue-600 cursor-pointer transition-colors text-lg"></i>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
        >
          <span className={`w-8 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-8 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-8 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden bg-white pt-20 animate-fade-in overflow-y-auto">
          <div className="px-6 pb-20">
            <MobileLink label="Home" viewKey="home" />
            
            <div className="mt-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Find A Barber</div>
            <MobileLink label="Request Appointment" viewKey="same-day" />
            <MobileLink label="Directory" viewKey="search" />
            <MobileLink label="Blog" viewKey="blog" />

            <div className="mt-6">
              <MobileLink label="Style Preview AI" viewKey="style-preview" />
            </div>

            <div className="mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Professional Hub</div>
            <MobileLink label="Pro Dashboard" viewKey="pro-dashboard" />
            <MobileLink label="List Your Business" viewKey="list-business" />
            <MobileLink label="Get Our App" viewKey="get-app" />
            <MobileLink label="Income Calculator" viewKey="income-calculator" />
            
            <div className="mt-6 border-t border-slate-100 pt-4">
              <MobileLink label="Pricing" viewKey="pricing" />
            </div>

            <div className="mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">My Account</div>
            <div className="flex gap-2 px-2">
              <button onClick={() => { setView('login'); closeMobileMenu(); }} className="flex-1 py-3 bg-blue-600 text-white rounded font-bold uppercase text-[10px] tracking-widest">Login</button>
              <button onClick={() => { setView('register'); closeMobileMenu(); }} className="flex-1 py-3 border border-blue-600 text-blue-600 rounded font-bold uppercase text-[10px] tracking-widest">Sign Up</button>
            </div>
            <div className="mt-2">
              <MobileLink label="My Subscription" viewKey="subscription" />
            </div>

            <div className="mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Affiliate Program</div>
            <div className="space-y-1">
              {[
                { label: 'Become An Affiliate', view: 'affiliate-become' },
                { label: 'Registration', view: 'affiliate-reg' },
                { label: 'Affiliate Login', view: 'affiliate-login' },
                { label: 'Dashboard', view: 'affiliate-area' },
                { label: 'Terms Of Use', view: 'affiliate-terms' }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setView(item.view as AppView); closeMobileMenu(); }}
                  className="w-full text-left py-3 px-2 text-[13px] font-semibold text-slate-600 hover:text-blue-600"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
