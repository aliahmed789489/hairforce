
import React from 'react';
import { MOCK_BLOG_POSTS, MOCK_STYLISTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-16">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-8 leading-tight">
                Welcome To The Hairforce Now <br/> Men's Grooming Blog
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                At Hairforce Now, we offer a destination for men's grooming and style. Our blog is dedicated to helping modern men confidently and easily navigate fashion and personal care. We cover expert tips on grooming essentials, skincare routines, and the latest trends in menswear and accessories. Whether you're updating your wardrobe, refining your grooming habits, or seeking inspiration for a polished appearance, Hairforce Now is your go-to source for practical advice and stylish insights. Join us to elevate your grooming game and embrace your unique style.
              </p>
            </div>

            <div className="space-y-20">
              {MOCK_BLOG_POSTS.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <div className="aspect-video rounded-lg overflow-hidden mb-6 shadow-sm border border-slate-100">
                    <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-600 hover:underline mb-3">{post.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-4">
                    <span><i className="far fa-clock mr-2"></i> {post.date}</span>
                    <span><i className="far fa-folder mr-2"></i> {post.category}</span>
                    <span><i className="far fa-comment mr-2"></i> {post.comments} Comments</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                  <button className="text-blue-600 font-bold text-xs uppercase hover:underline">Continue Reading ›</button>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-20">
              {[1, 2, 3, 4, '...', 22, '>'].map((n, i) => (
                <button key={i} className={`w-8 h-8 flex items-center justify-center border text-xs font-bold rounded ${n === 1 ? 'bg-slate-100 border-slate-300' : 'border-slate-200 hover:bg-slate-50'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Blog Search */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Search</h3>
              <div className="flex">
                <input type="text" className="flex-grow p-2 border border-slate-200 rounded-l focus:outline-none text-sm" placeholder="Search..." />
                <button className="bg-green-500 text-white px-4 rounded-r hover:bg-green-600 transition-colors"><i className="fas fa-search"></i></button>
              </div>
            </div>

            {/* Social Share */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Share This</h3>
              <div className="flex flex-wrap gap-2">
                {['facebook-f', 'x-twitter', 'pinterest-p', 'linkedin-in', 'reddit-alien', 'envelope', 'tumblr', 'reddit', 'whatsapp', 'telegram'].map((s, i) => (
                  <button key={i} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                    <i className={`fab fa-${s} text-xs`}></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Social Networks */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">We're Also On Social Networks</h3>
              <div className="flex flex-wrap gap-3">
                {['instagram', 'facebook', 'youtube', 'tiktok', 'linkedin', 'pinterest'].map((s, i) => (
                  <button key={i} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                    <i className={`fab fa-${s} text-xs`}></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Local Barbers Form */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Search Local Barbers</h3>
              <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex bg-white rounded border border-slate-200">
                  <div className="px-3 flex items-center bg-slate-100 border-r border-slate-200 text-blue-600"><i className="fas fa-search"></i></div>
                  <input type="text" className="w-full p-2 focus:outline-none text-xs" placeholder="Search by name or category" />
                </div>
                <div className="flex bg-white rounded border border-slate-200">
                  <div className="px-3 flex items-center bg-slate-100 border-r border-slate-200 text-blue-600"><i className="fas fa-location-dot"></i></div>
                  <input type="text" className="w-full p-2 focus:outline-none text-xs" placeholder="Search by city, state, or zip" />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors">Advanced Search</button>
              </div>
            </div>

            {/* Featured Barbers List */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Barbers</h3>
              <div className="space-y-6">
                {MOCK_STYLISTS.map((s) => (
                  <div key={s.id} className="group cursor-pointer border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="h-24 relative">
                      <img src={s.gallery[0] || s.imageUrl} className="w-full h-full object-cover grayscale opacity-50" alt="" />
                      <div className="absolute top-1 left-1 bg-black/50 text-white text-[8px] px-1 py-0.5 rounded uppercase">Barber</div>
                      <div className="absolute top-1 right-1 text-white/50"><i className="far fa-heart"></i></div>
                      <div className="absolute bottom-[-16px] left-3">
                        <img src={s.imageUrl} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                      </div>
                    </div>
                    <div className="p-3 pt-5">
                      <h4 className="text-blue-600 font-bold text-xs hover:underline truncate">{s.name}</h4>
                      <p className="text-[9px] text-slate-400 mt-1"><i className="fas fa-location-dot mr-1"></i> {s.address?.split(',')[0]}</p>
                      <div className="mt-2 text-[9px] font-bold text-slate-500 space-y-0.5">
                        <div className="flex items-center gap-1"><i className="fas fa-check text-blue-500"></i> Accepts Same-Day Requests</div>
                        <div className="flex items-center gap-1"><i className="fas fa-user-check text-blue-500"></i> Claimed: Yes</div>
                      </div>
                      <div className="mt-2 flex text-slate-200 text-[8px]">
                        {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star mr-0.5"></i>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full border border-blue-600 text-blue-600 py-2 rounded font-bold text-xs hover:bg-blue-600 hover:text-white transition-all uppercase">View all</button>
            </div>
          </aside>
        </div>

        {/* Footer Sidebar (Visual replication of bottom list) */}
        <div className="mt-32 pt-16 border-t border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-6">
          {MOCK_BLOG_POSTS.map(post => (
             <div key={post.id} className="space-y-3">
                <div className="aspect-square rounded-lg overflow-hidden border border-slate-100">
                  <img src={post.imageUrl} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-pointer" alt="" />
                </div>
                <p className="text-[10px] font-bold text-blue-600 leading-tight hover:underline cursor-pointer">{post.title}</p>
             </div>
          ))}
          <div className="space-y-3">
             <div className="aspect-square rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                <i className="fas fa-plus text-slate-200 text-3xl"></i>
             </div>
             <p className="text-[10px] font-bold text-blue-600 leading-tight hover:underline cursor-pointer">Telling a New Barber How To Cut Your Hair</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
