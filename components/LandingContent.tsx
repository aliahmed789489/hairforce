
import React, { useState } from 'react';
import { MOCK_STYLISTS, CATEGORIES } from '../constants';
import { Stylist } from '../types';

interface LandingContentProps {
  onStylistClick: (s: Stylist) => void;
  onBookNow: (s: Stylist) => void;
  onSearch: (name: string, location: string) => void;
}

const LandingContent: React.FC<LandingContentProps> = ({ onStylistClick, onBookNow, onSearch }) => {
  const [nameTerm, setNameTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');

  const handleSearchSubmit = () => {
    onSearch(nameTerm, locationTerm);
  };

  return (
    <div className="bg-white text-slate-900">
      {/* BarbersNear You Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">BarbersNear You</h2>
          <p className="text-slate-500 text-sm">Search By Name, City, State, Zip, Phone, Address, and More</p>
        </div>

        {/* Functional Search Bar matching screenshot design */}
        <div className="flex flex-col md:flex-row gap-3 items-center mb-16 max-w-5xl mx-auto p-4 border border-slate-100 rounded-xl bg-white shadow-lg">
          <button onClick={handleSearchSubmit} className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors">
            <i className="fas fa-search"></i>
          </button>
          
          <div className="flex-grow w-full">
            <input 
              type="text" 
              placeholder="Search by name or category" 
              className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm text-sm font-medium" 
              value={nameTerm}
              onChange={(e) => setNameTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
          </div>

          <div className="flex-grow w-full">
            <input 
              type="text" 
              placeholder="Search by city, state, or zip" 
              className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm text-sm font-medium" 
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
          </div>

          <button onClick={handleSearchSubmit} className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors">
            <i className="fas fa-search"></i>
          </button>

          <button 
            onClick={handleSearchSubmit}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all uppercase text-sm tracking-wide whitespace-nowrap"
          >
            ADVANCED SEARCH
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_STYLISTS.map((stylist) => (
            <div 
              key={stylist.id} 
              onClick={() => onStylistClick(stylist)}
              className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="h-48 overflow-hidden">
                <img src={stylist.gallery[0] || stylist.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={stylist.name} />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-1">{stylist.name}</h3>
                <p className="text-[11px] text-slate-500 mb-2">{stylist.specialty}</p>
                <div className="flex items-center gap-1 text-blue-600 text-xs mb-2">
                  <i className="fas fa-star"></i>
                  <span className="font-bold">{stylist.rating}</span>
                  <span className="text-slate-400 font-medium ml-1">({stylist.reviewCount}) 1k+ Bookings</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-600">Explore Services</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => onSearch(cat.name, '')}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={cat.img} className="w-full h-full object-cover" alt={cat.name} />
                </div>
                <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative group overflow-hidden rounded-[2rem]">
          <img 
            src="https://images.unsplash.com/photo-1593702288056-7927b442d0fa?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000" 
            alt="Discover Fresh Cut"
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-4">
            <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/40"><i className="fas fa-chevron-left"></i></button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/40"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-blue-600 mb-8 leading-tight">Discover Your Next Fresh Cut.</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
            From sharp fades to timeless tapers, discover real haircut styles from barbers all over the country. 
            Browse genuine barber portfolios, check out photos and ratings, and get inspired by looks created 
            in real barbershops nationwide.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
            Already have a barber? Search by name or location to find their profile and help others book with confidence.
          </p>
          <button onClick={() => onSearch('', '')} className="bg-blue-600 text-white px-12 py-4 rounded-lg font-bold shadow-xl hover:bg-blue-700 transition-all text-sm">Book Now</button>
        </div>
      </section>

      {/* How Hairforce Works */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-blue-600">How Hairforce Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm border border-blue-100">
                <i className="fas fa-search"></i>
              </div>
              <h4 className="text-2xl font-bold text-slate-800">Search</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">Find barbers near you by city or ZIP code.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm border border-blue-100">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h4 className="text-2xl font-bold text-slate-800">Compare</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">View photos, ratings, and services before you choose.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm border border-blue-100">
                <i className="fas fa-mouse-pointer"></i>
              </div>
              <h4 className="text-2xl font-bold text-slate-800">Book</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">Book directly or contact the barber from their profile.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingContent;
