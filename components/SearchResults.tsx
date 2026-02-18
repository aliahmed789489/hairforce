
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_STYLISTS } from '../constants';
import { Stylist } from '../types';

interface SearchResultsProps {
  onStylistClick: (stylist: Stylist) => void;
  onBookClick: (stylist: Stylist) => void;
  isSameDay?: boolean;
  initialName?: string;
  initialLocation?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  onStylistClick, 
  onBookClick, 
  isSameDay, 
  initialName = '', 
  initialLocation = '' 
}) => {
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialName);
  const [locationSearch, setLocationSearch] = useState(initialLocation);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState('All');
  const [category, setCategory] = useState('All');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'none'>('none');

  // Handle updates from parent props (sync from landing)
  useEffect(() => {
    setSearchTerm(initialName);
    setLocationSearch(initialLocation);
  }, [initialName, initialLocation]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [searchTerm, locationSearch, selectedRating, priceRange, category, isFeatured, isClaimed, sortBy]);

  const filteredStylists = useMemo(() => {
    let result = MOCK_STYLISTS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           s.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationSearch === '' || s.address?.toLowerCase().includes(locationSearch.toLowerCase());

      const matchesRating = selectedRating ? s.rating >= selectedRating : true;

      const minPrice = s.services.length > 0 ? Math.min(...s.services.map(ser => ser.price)) : 0;
      let matchesPrice = true;
      if (priceRange === '$0 - $25') matchesPrice = minPrice <= 25;
      else if (priceRange === '$25 - $50') matchesPrice = minPrice > 25 && minPrice <= 50;
      else if (priceRange === '$50+') matchesPrice = minPrice > 50;

      let matchesCategory = true;
      if (category !== 'All') {
        matchesCategory = s.specialty.toLowerCase().includes(category.toLowerCase()) || 
                          s.tags?.some(t => t.toLowerCase().includes(category.toLowerCase())) || false;
      }

      const matchesClaimed = isClaimed ? s.claimed : true;
      const matchesFeatured = isFeatured ? s.tags?.includes('Top Pro') : true;

      return matchesSearch && matchesLocation && matchesRating && matchesPrice && matchesCategory && matchesClaimed && matchesFeatured;
    });

    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price') {
      result = [...result].sort((a, b) => {
        const priceA = a.services[0]?.price || 0;
        const priceB = b.services[0]?.price || 0;
        return priceA - priceB;
      });
    }

    return result;
  }, [searchTerm, locationSearch, selectedRating, priceRange, category, isFeatured, isClaimed, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setLocationSearch('');
    setSelectedRating(null);
    setPriceRange('All');
    setCategory('All');
    setIsFeatured(false);
    setIsClaimed(false);
    setSortBy('none');
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Search Bar - Exactly matching screenshot layout */}
        <div className="flex flex-col md:flex-row gap-3 items-center mb-10 p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
          <button className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors">
            <i className="fas fa-search"></i>
          </button>
          
          <div className="flex-grow w-full">
            <input 
              type="text" 
              placeholder="Search by name or category" 
              className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm text-sm font-medium" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-grow w-full">
            <input 
              type="text" 
              placeholder="Search by city, state, or zip" 
              className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm text-sm font-medium" 
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
            />
          </div>

          <button className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors">
            <i className="fas fa-search"></i>
          </button>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-8 py-4 rounded-lg font-bold shadow-lg transition-all uppercase text-sm tracking-wide whitespace-nowrap ${showFilters ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {showFilters ? 'HIDE FILTERS' : 'ADVANCED SEARCH'}
          </button>
        </div>

        {/* Filter Panel (Toggled by Advanced Search) */}
        {showFilters && (
          <section className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 shadow-sm mb-16 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[10px] font-black uppercase tracking-widest">
              {/* Status & Sorting */}
              <div className="space-y-6">
                <p className="text-slate-400 mb-2 border-b border-slate-200 pb-2">Operational Status</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group hover:text-blue-600 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600" 
                    />
                    <span>Top Professionals</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group hover:text-blue-600 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={isClaimed}
                      onChange={(e) => setIsClaimed(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600" 
                    />
                    <span>Verified Units</span>
                  </label>
                </div>
                
                <p className="text-slate-400 mt-6 mb-2 border-b border-slate-200 pb-2">Sorting Intelligence</p>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-white font-black text-[10px] outline-none"
                >
                  <option value="none">No Special Sort</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price">Price: Low to High</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-4">
                <p className="text-slate-400 mb-2 border-b border-slate-200 pb-2">Minimum Rating</p>
                <div className="space-y-3">
                  {[5, 4, 3].map(r => (
                    <label key={r} className="flex items-center gap-3 cursor-pointer group transition-colors">
                      <input 
                        type="radio" 
                        name="rating" 
                        checked={selectedRating === r}
                        onChange={() => setSelectedRating(r)}
                        className="w-4 h-4 border-slate-300 text-blue-600" 
                      />
                      <div className="flex gap-0.5 text-blue-600">
                        {Array(r).fill('★').join('')}
                      </div>
                      <span className="text-slate-400 group-hover:text-blue-600">{r} stars & up</span>
                    </label>
                  ))}
                  <button onClick={() => setSelectedRating(null)} className="text-[8px] text-slate-400 hover:text-blue-600 font-bold uppercase tracking-widest mt-2">Clear Rating Filter</button>
                </div>
              </div>

              {/* Price & Category */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-slate-400 mb-2 border-b border-slate-200 pb-2">Budgeting</label>
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl bg-white font-black text-[10px] focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                  >
                    <option>All Prices</option>
                    <option>$0 - $25</option>
                    <option>$25 - $50</option>
                    <option>$50+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-slate-400 mb-2 border-b border-slate-200 pb-2">Objective Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl bg-white font-black text-[10px] focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                  >
                    <option>All Specialties</option>
                    <option>Barber</option>
                    <option>Stylist</option>
                    <option>Braids</option>
                    <option>Locs</option>
                    <option>Kids</option>
                  </select>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-6">
                 <p className="text-slate-400 mb-2 border-b border-slate-200 pb-2">Tactical Reset</p>
                 <div className="p-4 bg-blue-600/5 rounded-2xl border border-blue-600/10 text-[9px] text-slate-500 leading-relaxed italic">
                   Adjust filters to refine the list of registered professionals in your sector.
                 </div>
                 <button 
                  onClick={clearFilters}
                  className="w-full py-4 border-2 border-slate-200 text-slate-400 rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all font-black"
                 >
                   Reset Global Filters
                 </button>
              </div>
            </div>
          </section>
        )}

        {/* Results Info */}
        <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-6">
           <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
             Detected Professionals: <span className="text-blue-600 ml-1">{filteredStylists.length}</span>
           </h2>
           <div className="flex gap-4">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Sorted by: {sortBy === 'none' ? 'Relevance' : sortBy}</span>
           </div>
        </div>

        {/* Results Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 transition-all duration-500 ${loading ? 'opacity-30 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          {filteredStylists.length > 0 ? (
            filteredStylists.map((s) => (
              <div 
                key={s.id} 
                onClick={() => onStylistClick(s)} 
                className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group relative"
              >
                <div className="h-56 relative overflow-hidden">
                   <img 
                    src={s.gallery[0] || s.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={s.name} 
                   />
                   <div className="absolute top-4 left-4 flex gap-2">
                     <span className="bg-slate-950/80 backdrop-blur text-white text-[8px] px-3 py-1 rounded font-black uppercase tracking-widest italic">Barber</span>
                     {s.tags?.includes('Top Pro') && (
                       <span className="bg-blue-600 text-white text-[8px] px-3 py-1 rounded font-black uppercase tracking-widest italic shadow-lg shadow-blue-600/30">Top Pro</span>
                     )}
                   </div>
                </div>
                <div className="p-8 space-y-4">
                   <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-slate-900 font-black text-lg uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors truncate max-w-[150px]">{s.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                          <i className="fas fa-location-dot text-blue-600 opacity-40"></i> {s.address?.split(',')[1]?.trim() || s.distance}
                        </p>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-slate-900 italic tracking-tighter">${s.services[0]?.price || '??'}</p>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Starts At</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex gap-0.5 text-blue-600 text-[10px]">
                        {[1,2,3,4,5].map(i => (
                          <i key={i} className={`fas fa-star ${i > Math.floor(s.rating) ? 'opacity-20' : ''}`}></i>
                        ))}
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.reviewCount} Reports</span>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-40 text-center space-y-6">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200 text-4xl">
                  <i className="fas fa-radar"></i>
               </div>
               <h3 className="text-2xl font-black text-slate-900 uppercase italic">No Registered Barbers Detected</h3>
               <p className="text-slate-400 font-medium max-w-sm mx-auto mt-2">Adjust your search parameters or reset filters to see more results.</p>
               <button onClick={clearFilters} className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline">Reset Search Ops</button>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
           <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-black text-[9px] uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3 animate-pulse">
              <i className="fas fa-spinner fa-spin"></i>
              Updating Intelligence...
           </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
