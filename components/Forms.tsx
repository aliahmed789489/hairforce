
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { AppView } from '../types';

interface FormsProps {
  view: string;
  onSwitch: (view: AppView) => void;
  onLoginSuccess?: () => void;
}

const Forms: React.FC<FormsProps> = ({ view, onSwitch, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'Barber' | 'Client'>('Barber');

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'Barber' && onLoginSuccess) {
      onLoginSuccess();
    } else {
      onSwitch('dashboard');
    }
  };

  const renderLogin = () => (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Banner */}
        <div className="bg-blue-500 text-white p-4 rounded flex items-center gap-3 mb-10 font-bold text-sm shadow-sm animate-fade-in">
          <i className="fas fa-exclamation-circle"></i>
          <span>You need to log-in or create an account to view this section.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center uppercase tracking-wide">Login</h1>
              
              <form onSubmit={handleSubmitLogin} className="space-y-6 bg-white p-8 border border-slate-100 rounded-lg shadow-sm">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Username or Email *</label>
                  <input type="text" className="w-full p-3 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Password *</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="w-full p-3 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                    >
                      <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                </div>

                {/* Cloudflare Placeholder */}
                <div className="py-4 flex flex-col items-center gap-2 border border-slate-100 rounded bg-slate-50 p-4">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verifying...</span>
                  <div className="text-[8px] text-slate-400">CLOUDFLARE</div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                  <label htmlFor="remember" className="text-xs font-bold text-slate-600 cursor-pointer">Remember Me</label>
                </div>

                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded uppercase tracking-widest text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                  LOGIN
                </button>

                <div className="flex justify-between text-[11px] font-bold text-blue-600 uppercase pt-4">
                  <button type="button" onClick={() => onSwitch('register')} className="hover:underline">Create account</button>
                  <button type="button" className="hover:underline">Forgot password?</button>
                </div>
              </form>

              {/* Social Login */}
              <div className="mt-12 text-center space-y-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Login via Google</p>
                <button type="button" onClick={onLoginSuccess} className="flex items-center gap-3 px-6 py-2 border border-slate-200 rounded-md mx-auto hover:bg-slate-50 transition-colors font-bold text-slate-700 text-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-4 h-4" alt="Google" />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => onSwitch('home')}></div>
      <div className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-600 uppercase tracking-wider">Register</h2>
          <button onClick={() => onSwitch('home')} className="text-slate-400 hover:text-blue-600"><i className="fas fa-times text-xl"></i></button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-8">
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('Barber')}
              className={`flex-grow py-2 rounded-md font-bold text-xs uppercase transition-all ${activeTab === 'Barber' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Barber
            </button>
            <button 
              onClick={() => setActiveTab('Client')}
              className={`flex-grow py-2 rounded-md font-bold text-xs uppercase transition-all ${activeTab === 'Client' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Client
            </button>
          </div>

          <form onSubmit={handleSubmitRegister} className="space-y-6">
            <div className="space-y-1">
              <input type="text" placeholder={`First Name or ${activeTab} Name *`} className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
            </div>
            <div className="space-y-1">
              <input type="email" placeholder="Email *" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
            </div>
            <div className="space-y-1">
              <input type="tel" placeholder="Phone *" className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600" />
                <span className="text-[11px] font-medium text-slate-600 leading-relaxed">
                  I agree to receive automated text messages from Hairforce Now related to my barber account, listings, and appointment opportunities. Message frequency varies. 
                  <span className="block text-slate-400 mt-1">Message & data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase.</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600" />
                <span className="text-[11px] font-medium text-slate-600 leading-relaxed">
                  By using this form I agree to the storage and handling of my data by this website. View our <button type="button" className="text-blue-600 font-bold hover:underline">GDPR Policy</button>.
                </span>
              </label>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password *"
                  className="w-full p-4 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                >
                  <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return view === 'login' ? renderLogin() : renderRegister();
};

export default Forms;
