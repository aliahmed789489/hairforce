
import React from 'react';
import { Appointment } from '../types';

interface DashboardProps {
  appointments: Appointment[];
}

const Dashboard: React.FC<DashboardProps> = ({ appointments }) => {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-slate-500 mt-2">Manage your upcoming and past bookings</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4 min-w-[180px]">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <i className="fas fa-calendar-check text-xl"></i>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bookings</p>
              <p className="text-2xl font-bold text-slate-900">{appointments.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4 min-w-[180px]">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <i className="fas fa-wallet text-xl"></i>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Spent</p>
              <p className="text-2xl font-bold text-slate-900">${appointments.reduce((acc, app) => acc + app.service.price, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Upcoming Sessions</h2>
            
            {appointments.length > 0 ? (
              <div className="space-y-6">
                {appointments.map(app => (
                  <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-slate-100 flex flex-col items-center justify-center text-blue-600 font-bold">
                        <span className="text-[10px] uppercase text-slate-400 mb-0.5">TIME</span>
                        <span className="text-lg leading-none">{app.time.split(' ')[0]}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{app.service.name}</h3>
                        <p className="text-sm text-slate-500">with {app.stylistName}</p>
                        <p className="text-xs text-slate-400 mt-1">{app.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      <button className="px-5 py-2 rounded border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-white transition-all">RESCHEDULE</button>
                      <button className="px-5 py-2 rounded bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all">DETAILS</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-300">
                <i className="far fa-calendar-alt text-5xl mb-4 opacity-20"></i>
                <p className="text-lg font-medium">No appointments scheduled</p>
                <button className="text-blue-600 font-bold text-sm mt-4 hover:underline">Find a Barber Now</button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Past History</h2>
            <div className="space-y-4 opacity-60">
              <div className="p-4 border-b border-slate-50 flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">Beard Trim @ Classic Cuts</span>
                <span className="text-slate-400">May 12, 2024</span>
              </div>
              <div className="p-4 border-b border-slate-50 flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">Standard Haircut @ Marcus Sterling</span>
                <span className="text-slate-400">April 05, 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-blue-600 rounded-xl p-8 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-3">Complete Profile</h3>
            <p className="text-blue-100 text-xs mb-6 leading-relaxed">Fill out your grooming preferences to get better stylist matches.</p>
            <div className="w-full bg-blue-800 rounded-full h-2 mb-8 overflow-hidden">
              <div className="bg-white h-full rounded-full w-[65%]"></div>
            </div>
            <button className="w-full py-3 bg-white text-blue-600 rounded font-bold hover:bg-blue-50 transition-all text-xs">UPDATE SETTINGS</button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Saved Barbers</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-lg object-cover border border-slate-100" />
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">Marcus Sterling</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Phoenix, AZ</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-lg object-cover border border-slate-100" />
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">Elena Rossi</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Phoenix, AZ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
