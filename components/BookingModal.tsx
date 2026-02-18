
import React, { useState } from 'react';
import { Stylist, Service, Appointment } from '../types';

interface BookingModalProps {
  stylist: Stylist;
  onClose: () => void;
  onComplete: (appointment: Appointment) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ stylist, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(8); // Default to April 8 for demo matching screenshot
  const [selectedTime, setSelectedTime] = useState('');

  // Mock availability for April 2026 (Starts on Wednesday)
  const daysInApril = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarOffset = 3; // April 1, 2026 is a Wednesday

  const afternoonSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const bookedSlots = ['12:00 PM']; // Example of a booked slot

  const handleComplete = () => {
    if (!selectedService || !selectedTime) return;
    
    // Added missing required property 'clientName' to match Appointment type
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      stylistId: stylist.id,
      stylistName: stylist.name,
      service: selectedService,
      date: `April ${selectedDate}, 2026`,
      time: selectedTime,
      status: 'confirmed',
      clientName: 'Guest User'
    };
    
    onComplete(newAppointment);
  };

  const renderStep1 = () => (
    <div className="space-y-4 animate-fade-in px-8 pb-10">
      <div className="flex justify-between items-start mb-8 pt-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 block text-blue-600">MISSION PARAMETERS</span>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-slate-900">OBJECTIVE</h2>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {stylist.services.map(service => (
          <button 
            key={service.id}
            onClick={() => { setSelectedService(service); setStep(2); }}
            className="w-full text-left p-8 rounded-[2rem] transition-all flex justify-between items-center group bg-white border border-slate-100 hover:border-blue-600/30 hover:bg-slate-50 shadow-sm hover:shadow-md"
          >
            <div className="space-y-2 max-w-[70%]">
              <p className="font-black text-slate-900 uppercase italic tracking-tighter text-2xl leading-tight group-hover:text-blue-600 transition-colors">
                {service.name}
              </p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                {service.duration} MINS • TACTICAL SERVICE
              </p>
            </div>
            <span className="text-3xl font-black text-slate-900 italic tracking-tighter ml-4 leading-none">
              ${service.price}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col h-full max-h-[90vh] animate-fade-in relative">
      {/* Light Theme Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3 mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your appointment with</span>
          <div className="flex items-center gap-2">
            <img src={stylist.imageUrl} className="w-6 h-6 rounded-full object-cover" alt="" />
            <span className="font-bold text-slate-900 text-sm">{stylist.name}</span>
            <span className="text-yellow-400 text-xs flex items-center gap-1">★ <span className="text-slate-900">{stylist.rating}</span></span>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-900 absolute right-6">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-grow p-10 space-y-8">
        {/* Service Summary */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">{selectedService?.name}</h3>
          <p className="text-sm font-medium text-slate-500">${selectedService?.price}+ &nbsp; {Math.floor((selectedService?.duration || 0) / 60)} hours {(selectedService?.duration || 0) % 60} min</p>
          <button className="mt-2 px-3 py-1.5 border border-slate-300 rounded-md text-[11px] font-bold text-slate-700 hover:bg-slate-50">
            Add another service
          </button>
        </div>

        {/* Busy Month Banner */}
        <div className="bg-green-50/50 p-4 rounded-lg flex items-start gap-3 border-l-4 border-green-500">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
          <div>
            <p className="text-sm font-bold text-slate-900">April is a busy month</p>
            <p className="text-xs text-slate-500">Book now before spots fill up!</p>
          </div>
        </div>

        {/* Calendar UI */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-8">
            <button className="text-slate-400 hover:text-slate-900"><i className="fas fa-chevron-left"></i></button>
            <h4 className="font-bold text-slate-900 text-sm">April 2026</h4>
            <button className="text-slate-400 hover:text-slate-900"><i className="fas fa-chevron-right"></i></button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 text-center">
            {weekDays.map(day => (
              <div key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</div>
            ))}
            {/* Calendar Offset */}
            {Array.from({ length: calendarOffset }).map((_, i) => (
              <div key={`offset-${i}`}></div>
            ))}
            {daysInApril.map(day => {
              const isAvailable = ![12, 13, 19, 20, 26, 27].includes(day); // Mocked unavailable days
              return (
                <button 
                  key={day}
                  disabled={!isAvailable}
                  onClick={() => setSelectedDate(day)}
                  className={`relative h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                    !isAvailable 
                      ? 'text-slate-200 cursor-not-allowed line-through' 
                      : (selectedDate === day ? 'bg-emerald-950 text-white shadow-lg' : 'text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection Slots */}
        <div className="space-y-8">
          {/* Morning Section */}
          <div className="space-y-3">
            <h5 className="text-[12px] font-bold text-slate-900">Morning</h5>
            <button className="flex items-center gap-2 px-4 py-3 border border-emerald-950/20 text-emerald-950 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-all">
              <i className="far fa-bell"></i> Notify
            </button>
          </div>

          {/* Afternoon Section */}
          <div className="space-y-3">
            <h5 className="text-[12px] font-bold text-slate-900">Afternoon</h5>
            <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
              {afternoonSlots.map(time => {
                const isBooked = bookedSlots.includes(time);
                return (
                  <button 
                    key={time}
                    disabled={isBooked}
                    onClick={() => { setSelectedTime(time); setStep(3); }}
                    className={`flex-shrink-0 px-6 py-3 rounded-lg border text-xs font-bold transition-all ${
                      isBooked 
                        ? 'border-slate-100 text-slate-200 cursor-not-allowed line-through' 
                        : (selectedTime === time ? 'bg-emerald-950 border-emerald-950 text-white' : 'border-emerald-950 text-emerald-950 hover:bg-emerald-50')
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evening Section */}
          <div className="space-y-3">
            <h5 className="text-[12px] font-bold text-slate-900">Evening</h5>
            <button className="flex items-center gap-2 px-4 py-3 border border-emerald-950/20 text-emerald-950 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-all">
              <i className="far fa-bell"></i> Notify
            </button>
          </div>
        </div>

        {/* Specific Date Link */}
        <button className="w-full flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100 group">
          <div className="flex items-center gap-4">
            <i className="far fa-calendar-alt text-slate-900 text-xl"></i>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Looking for a specific date?</p>
              <p className="text-xs text-slate-500">See available times for future dates</p>
            </div>
          </div>
          <i className="fas fa-chevron-right text-slate-400 group-hover:translate-x-1 transition-transform"></i>
        </button>

        <div className="text-center pb-4 pt-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-500 font-medium">
            Need to book ASAP? Message your pro <button className="text-slate-900 font-bold underline">Here</button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fade-in p-10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] mb-2 block text-cyan-400">MISSION PARAMETERS</span>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-white">FINALIZE</h2>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-slate-500">Unit Identification</span>
          <span className="text-white italic">{stylist.name}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-slate-500">Service Objective</span>
          <span className="text-white italic">{selectedService?.name}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-slate-500">Scheduled Log</span>
          <span className="text-white italic">{selectedTime}, April {selectedDate}</span>
        </div>
        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
          <span className="text-white font-black italic tracking-tighter text-sm uppercase">Mission Fee</span>
          <span className="text-4xl font-black text-cyan-400 italic tracking-tighter">${selectedService?.price}</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleComplete}
          className="w-full py-6 bg-cyan-400 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white shadow-2xl shadow-cyan-400/20 transition-all active:scale-[0.98]"
        >
          CONFIRM DEPLOYMENT
        </button>
        <button 
          onClick={() => setStep(2)}
          className="w-full py-4 bg-transparent text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
        >
          MODIFY TIMELINE
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-xl rounded-[4rem] shadow-3xl overflow-hidden transition-all duration-500 ${step === 3 ? 'bg-[#020617] border border-white/10' : 'bg-white'}`}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.1);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
