
import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  setView: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
              <i className="fas fa-scissors text-white text-2xl"></i>
            </div>
            <span className="text-2xl font-black italic uppercase tracking-tighter">
              HAIR<span className="text-blue-600">FORCE</span>
            </span>
          </div>
          <div className="flex space-x-4 opacity-60">
            <i className="fab fa-facebook-f hover:text-blue-500 cursor-pointer transition-colors"></i>
            <i className="fab fa-twitter hover:text-blue-500 cursor-pointer transition-colors"></i>
            <i className="fab fa-instagram hover:text-blue-500 cursor-pointer transition-colors"></i>
            <i className="fab fa-linkedin-in hover:text-blue-500 cursor-pointer transition-colors"></i>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-blue-600">QUICK LINK</h4>
          <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <li onClick={() => setView('home')} className="hover:text-blue-400 cursor-pointer transition-colors">Home</li>
            <li onClick={() => setView('search')} className="hover:text-blue-400 cursor-pointer transition-colors">Find Professionals</li>
            <li onClick={() => setView('list-business')} className="hover:text-blue-400 cursor-pointer transition-colors">Get listed</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Team</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Careers</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-blue-600">CATEGORY</h4>
          <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Terms for Pros</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Terms for clients</li>
            <li onClick={() => setView('pricing')} className="hover:text-blue-400 cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">security</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Sitemap</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-blue-600">MEDIA</h4>
          <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <li onClick={() => setView('blog')} className="hover:text-blue-400 cursor-pointer transition-colors">Style blog</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Press</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">hairforce Help Center</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
        <span>© {new Date().getFullYear()}, designed and developed by fringweb.</span>
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
          className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all mt-6 md:mt-0"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
