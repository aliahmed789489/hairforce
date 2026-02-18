
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    haircut: '',
    budget: '',
    file: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your inquiry has been sent to our elite network.');
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      haircut: '',
      budget: '',
      file: null
    });
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-blue-600 uppercase italic tracking-tighter">Get Expert Advice</h2>
          <p className="text-slate-500 font-medium">Send us your details and preferred style for a custom quote and consultation.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">First Name</label>
              <input 
                type="text" 
                required
                placeholder="John"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-sm"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Last Name</label>
              <input 
                type="text" 
                required
                placeholder="Doe"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-sm"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
              <input 
                type="tel" 
                required
                placeholder="(555) 000-0000"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-sm"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="john@example.com"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Haircut Style</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Mid Skin Fade with Crop"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-sm"
                value={formData.haircut}
                onChange={(e) => setFormData({...formData, haircut: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Budget ($)</label>
              <input 
                type="number" 
                placeholder="e.g. 50"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-sm"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Upload Reference Picture</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer group bg-white">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
              />
              <div className="space-y-2">
                <i className="fas fa-cloud-upload-alt text-3xl text-slate-300 group-hover:text-blue-500 transition-colors"></i>
                <p className="text-xs font-bold text-slate-500">
                  {formData.file ? formData.file.name : "Click or drag to upload your reference style"}
                </p>
                <p className="text-[10px] text-slate-400">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-blue-600 text-white font-black rounded-xl uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
