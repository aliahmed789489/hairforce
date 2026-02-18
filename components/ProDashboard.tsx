
import React, { useState, useMemo } from 'react';
import { Stylist, Service, Appointment, BlockedTime, AppointmentStatus, PaymentStatus } from '../types';

interface ProDashboardProps {
  profile: Stylist;
  setProfile: React.Dispatch<React.SetStateAction<Stylist>>;
}

type DashboardSection = 'dashboard' | 'calendar' | 'services' | 'photos' | 'payments' | 'messages' | 'marketing' | 'settings';
type CalendarView = 'day' | 'week' | 'month';

const ProDashboard: React.FC<ProDashboardProps> = ({ profile, setProfile }) => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('calendar');
  const [calendarView, setCalendarView] = useState<CalendarView>('week');
  const [isSaving, setIsSaving] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Tracking the currently selected date in the UI
  // Using ISO string format YYYY-MM-DD for easier comparison
  const [selectedDate, setSelectedDate] = useState('2025-09-12');
  
  // Appointment Management State
  const [appointments, setAppointments] = useState<Appointment[]>([
    { 
      id: 'app-1', 
      stylistId: profile.id, 
      stylistName: profile.name, 
      service: profile.services[0], 
      date: '2025-09-12', 
      time: '08:00', 
      endTime: '09:00',
      status: 'confirmed', 
      paymentStatus: 'paid',
      clientName: 'Jordan Smith',
      notes: 'Prefers side part'
    },
    { 
      id: 'app-2', 
      stylistId: profile.id, 
      stylistName: profile.name, 
      service: profile.services[1], 
      date: '2025-09-13', 
      time: '11:00', 
      endTime: '12:30',
      status: 'confirmed', 
      paymentStatus: 'deposit_paid',
      clientName: 'Sarah Connor' 
    }
  ]);
  
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([
    { id: 'block-1', date: '2025-09-12', startTime: '12:00', endTime: '13:00', reason: 'Lunch Break', isRecurring: true }
  ]);

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);

  const triggerSyncFeedback = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  // Helper to determine day index for the specific demo week (Sept 11-17)
  const getDayIndex = (dateStr: string) => {
    const day = parseInt(dateStr.split('-')[2]);
    if (day >= 11 && day <= 17) return day - 11;
    return -1;
  };

  const handleToggleServiceStatus = (serviceId: string) => {
    const updatedServices = profile.services.map(s => 
      s.id === serviceId ? { ...s, isActive: !s.isActive } : s
    );
    setProfile({ ...profile, services: updatedServices });
    triggerSyncFeedback();
  };

  const handleSaveServiceEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    let updatedServices: Service[];
    if (editingService.id) {
      updatedServices = profile.services.map(s => s.id === editingService.id ? editingService : s);
    } else {
      const newService: Service = { 
        ...editingService, 
        id: Math.random().toString(36).substr(2, 9), 
        isActive: true 
      };
      updatedServices = [...profile.services, newService];
    }

    setProfile({ ...profile, services: updatedServices });
    setEditingService(null);
    triggerSyncFeedback();
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Delete this service permanently?')) {
      const updatedServices = profile.services.filter(s => s.id !== serviceId);
      setProfile({ ...profile, services: updatedServices });
      triggerSyncFeedback();
    }
  };

  const handleSaveAppointment = (app: Appointment) => {
    // Collision Detection
    const collision = [...appointments, ...blockedTimes.map(b => ({ date: b.date, time: b.startTime, endTime: b.endTime }))].some(existing => {
      if (existing.date !== app.date) return false;
      return (app.time < (existing as any).endTime && app.endTime! > (existing as any).time);
    });

    if (collision && !selectedApp) {
      alert("COLLISION ERROR: Time slot is occupied or restricted.");
      return;
    }

    if (selectedApp) {
      setAppointments(prev => prev.map(a => a.id === app.id ? app : a));
    } else {
      setAppointments(prev => [...prev, { ...app, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setIsAppModalOpen(false);
    setSelectedApp(null);
    triggerSyncFeedback();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'calendar', label: 'Calendar', icon: 'fa-calendar-alt' },
    { id: 'services', label: 'Services', icon: 'fa-cut' },
    { id: 'photos', label: 'Photos', icon: 'fa-camera' },
    { id: 'payments', label: 'Payments', icon: 'fa-wallet' },
    { id: 'messages', label: 'Messages', icon: 'fa-comment-alt' },
    { id: 'marketing', label: 'Marketing', icon: 'fa-bullhorn' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' },
  ];

  const renderSidebar = () => (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 h-[calc(100vh-80px)] sticky top-20">
      <div className="flex-grow py-6 overflow-y-auto">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <img src={profile.imageUrl} className="w-10 h-10 rounded-full object-cover" alt="" />
            <div className="overflow-hidden">
              <p className="text-xs font-black text-slate-900 truncate">{profile.name}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Master Pro</p>
            </div>
          </div>
        </div>
        <nav className="space-y-1 px-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as DashboardSection)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeSection === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <i className={`fas ${item.icon} w-5 text-center`}></i>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6 border-t border-slate-100">
        <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">
          Sign Out
        </button>
      </div>
    </aside>
  );

  const renderMobileNav = () => (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 flex justify-around p-4 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {navItems.slice(0, 5).map(item => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id as DashboardSection)}
          className={`flex flex-col items-center gap-1 ${activeSection === item.id ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <i className={`fas ${item.icon} text-lg`}></i>
          <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
        </button>
      ))}
    </nav>
  );

  const StatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      case 'blocked': return 'bg-slate-400';
      default: return 'bg-slate-200';
    }
  };

  const renderCalendar = () => (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-fade-in bg-white">
      {/* Left Sidebar - Mini Calendar & Filters */}
      <aside className="w-full lg:w-72 space-y-8 flex-shrink-0">
        <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-900 uppercase italic">September 2025</h3>
            <div className="flex gap-2">
              <button className="text-slate-400 hover:text-slate-900"><i className="fas fa-chevron-left text-[10px]"></i></button>
              <button className="text-slate-400 hover:text-slate-900"><i className="fas fa-chevron-right text-[10px]"></i></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-y-2 text-center">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="text-[10px] font-black text-slate-300">{d}</div>
            ))}
            {/* Clickable Days for interaction */}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2025-09-${dayNum.toString().padStart(2, '0')}`;
              const isSelected = selectedDate === dateStr;
              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedDate(dateStr)}
                  className={`text-[10px] font-bold py-1.5 cursor-pointer rounded-full transition-all ${
                    isSelected 
                    ? 'bg-blue-600 text-white shadow-lg scale-110' 
                    : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-900 uppercase italic">Upcoming Today</h3>
            <button className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-4">
            {appointments.filter(a => a.date === selectedDate).slice(0, 3).map(app => (
              <div key={app.id} className="flex items-center gap-3 animate-fade-in">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                <div className="flex-grow">
                  <p className="text-xs font-bold text-slate-800">{app.service.name}</p>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">{app.time} - {app.endTime}</p>
                </div>
              </div>
            ))}
            {appointments.filter(a => a.date === selectedDate).length === 0 && (
              <p className="text-[10px] text-slate-300 italic text-center py-4">No events for this day</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-slate-900 uppercase italic">Time Breakdown</h3>
            <button className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Cuts', val: 65, color: 'bg-blue-500' },
              { label: 'Color', val: 40, color: 'bg-emerald-500' },
              { label: 'Beard', val: 20, color: 'bg-orange-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>{item.label}</span>
                  <span>{item.val}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full`} style={{ width: `${item.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Calendar Content */}
      <div className="flex-grow space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">
              {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Overview • Focused on {selectedDate}</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 p-1 rounded-xl">
                {(['month', 'week', 'day'] as CalendarView[]).map(v => (
                  <button 
                    key={v}
                    onClick={() => setCalendarView(v)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${calendarView === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {v}
                  </button>
                ))}
             </div>
             <button onClick={() => setIsAppModalOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 active:scale-95">
               + New Appointment
             </button>
             <button onClick={() => setIsBlockModalOpen(true)} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95">
               Block Time
             </button>
          </div>
        </header>

        <div className="bg-slate-50 border border-slate-100 rounded-[3rem] overflow-hidden flex flex-col h-[700px] shadow-sm">
          {/* Week Headers */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] bg-white border-b border-slate-100 sticky top-0 z-30">
            <div className="p-6 text-[10px] font-black text-slate-300 uppercase italic">GMT +4</div>
            {['Mon 11', 'Tue 12', 'Wed 13', 'Thu 14', 'Fri 15', 'Sat 16', 'Sun 17'].map((day, i) => {
              const dayVal = day.split(' ')[1];
              const dayDateStr = `2025-09-${dayVal}`;
              const isSelected = selectedDate === dayDateStr;
              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedDate(dayDateStr)}
                  className={`p-6 text-center cursor-pointer transition-colors ${isSelected ? 'bg-blue-600/5' : ''}`}
                >
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>{day.split(' ')[0]}</p>
                  <p className={`text-xl font-black mt-1 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>{dayVal}</p>
                  {isSelected && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mx-auto mt-2"></div>}
                </div>
              );
            })}
          </div>

          {/* Time Grid Scrollable */}
          <div className="flex-grow overflow-y-auto relative custom-scrollbar bg-slate-50/30">
             {Array.from({ length: 12 }).map((_, h) => {
               const hour = h + 8;
               return (
                 <div key={hour} className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-slate-100/50 min-h-[120px] relative">
                    <div className="p-6 text-[10px] font-black text-slate-400 uppercase italic sticky left-0 bg-white/80 backdrop-blur-sm z-10">
                      {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                    </div>
                    {/* Vertical Grid Lines */}
                    {Array.from({ length: 7 }).map((_, d) => {
                      const dayVal = (d + 11).toString().padStart(2, '0');
                      const cellDate = `2025-09-${dayVal}`;
                      return (
                        <div 
                          key={d} 
                          onClick={() => { setSelectedDate(cellDate); setIsAppModalOpen(true); }}
                          className={`border-r border-slate-100/50 relative group ${selectedDate === cellDate ? 'bg-blue-600/[0.02]' : ''}`}
                        >
                          <div className="absolute inset-0 hover:bg-blue-600/5 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <i className="fas fa-plus-circle text-blue-600 text-2xl"></i>
                          </div>
                        </div>
                      );
                    })}
                 </div>
               );
             })}

             {/* Appointment Cards - Positioned Dynamically */}
             {appointments.map(app => {
               const dayIdx = getDayIndex(app.date);
               if (dayIdx === -1) return null;
               
               const startHour = parseInt(app.time.split(':')[0]);
               const startMin = parseInt(app.time.split(':')[1]);
               const endHour = parseInt(app.endTime?.split(':')[0] || (startHour + 1).toString());
               const endMin = parseInt(app.endTime?.split(':')[1] || '0');
               
               const top = (startHour - 8) * 120 + (startMin / 60) * 120;
               const height = ((endHour * 60 + endMin) - (startHour * 60 + startMin)) / 60 * 120;
               const leftPercent = 100 + (dayIdx * (100 / 7)); // This assumes relative to the grid-cols container? No, we need calc.
               
               return (
                 <div 
                  key={app.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedApp(app); setIsAppModalOpen(true); }}
                  className={`absolute p-4 rounded-3xl text-white shadow-xl cursor-pointer hover:scale-105 hover:z-40 transition-all z-20 overflow-hidden ${StatusColor(app.status)}`}
                  style={{ 
                    top: `${top}px`, 
                    height: `${height}px`,
                    width: 'calc((100% - 100px) / 7 - 10px)',
                    left: `calc(100px + ${dayIdx} * (100% - 100px) / 7 + 5px)`
                  }}
                 >
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{app.time} - {app.endTime}</p>
                   <h4 className="text-xs font-black italic uppercase tracking-tight mt-1 truncate">{app.clientName}</h4>
                   <p className="text-[7px] font-bold uppercase mt-1 opacity-70 truncate">{app.service.name}</p>
                   {height > 80 && (
                     <div className="flex -space-x-2 mt-3">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=40" className="w-5 h-5 rounded-full border-2 border-white shadow-sm" alt="" />
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=40" className="w-5 h-5 rounded-full border-2 border-white shadow-sm" alt="" />
                     </div>
                   )}
                 </div>
               );
             })}

             {/* Blocked Times Cards - Positioned Dynamically */}
             {blockedTimes.map(block => {
               const dayIdx = getDayIndex(block.date);
               if (dayIdx === -1) return null;

               const startHour = parseInt(block.startTime.split(':')[0]);
               const top = (startHour - 8) * 120;
               return (
                 <div 
                  key={block.id}
                  className="absolute bg-slate-200/80 backdrop-blur-sm border-2 border-dashed border-slate-300 p-4 rounded-3xl text-slate-500 z-10 flex flex-col items-center justify-center text-center overflow-hidden"
                  style={{ 
                    top: `${top}px`, 
                    height: '120px',
                    width: 'calc((100% - 100px) / 7 - 10px)',
                    left: `calc(100px + ${dayIdx} * (100% - 100px) / 7 + 5px)`
                  }}
                 >
                   <i className="fas fa-lock text-lg mb-1 opacity-40"></i>
                   <p className="text-[9px] font-black uppercase tracking-widest leading-none">{block.reason}</p>
                   <p className="text-[7px] font-bold mt-1 opacity-60 uppercase tracking-widest">{block.startTime} - {block.endTime}</p>
                 </div>
               );
             })}
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {isAppModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => { setIsAppModalOpen(false); setSelectedApp(null); }}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] overflow-hidden animate-fade-in shadow-3xl">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-black text-slate-900 uppercase italic">{selectedApp ? 'Modify Appointment' : 'New Appointment Mission'}</h3>
               <button onClick={() => { setIsAppModalOpen(false); setSelectedApp(null); }} className="text-slate-400 hover:text-slate-900"><i className="fas fa-times text-xl"></i></button>
            </div>
            <div className="p-10 space-y-6">
               <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-2">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Scheduling For</p>
                  <p className="font-bold text-slate-800">{new Date(selectedDate).toDateString()}</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Client Name</label>
                     <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black" placeholder="John Doe" defaultValue={selectedApp?.clientName} />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                     <input type="tel" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black" placeholder="(555) 000-0000" defaultValue={selectedApp?.clientPhone} />
                  </div>
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Objective Service</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black appearance-none">
                     {profile.services.map(s => <option key={s.id} selected={selectedApp?.service.id === s.id}>{s.name} - ${s.price}</option>)}
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Start Time</label>
                     <input type="time" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black" defaultValue={selectedApp?.time || '08:00'} />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">End Time</label>
                     <input type="time" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black" defaultValue={selectedApp?.endTime || '09:00'} />
                  </div>
               </div>
               <div className="flex gap-4 pt-4">
                  <button onClick={() => handleSaveAppointment({
                    id: selectedApp?.id || '',
                    stylistId: profile.id,
                    stylistName: profile.name,
                    service: profile.services[0],
                    date: selectedDate,
                    time: (document.querySelector('input[type="time"]') as HTMLInputElement)?.value || '08:00',
                    endTime: (document.querySelectorAll('input[type="time"]')[1] as HTMLInputElement)?.value || '09:00',
                    status: 'confirmed',
                    clientName: (document.querySelector('input[placeholder="John Doe"]') as HTMLInputElement)?.value || 'New Client'
                  })} className="flex-grow py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 active:scale-95">
                    Save Appointment
                  </button>
                  {selectedApp && (
                    <button 
                      onClick={() => {
                        setAppointments(prev => prev.filter(a => a.id !== selectedApp.id));
                        setIsAppModalOpen(false);
                        setSelectedApp(null);
                        triggerSyncFeedback();
                      }}
                      className="px-8 py-5 border border-red-100 text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-50"
                    >
                      Delete
                    </button>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderServices = () => (
    <div className="space-y-8 animate-fade-in relative">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase italic">Services & Add-Ons</h2>
            <p className="text-sm text-slate-500 font-medium">Manage what you offer and how much you charge.</p>
          </div>
          <button 
            onClick={() => setEditingService({ id: '', name: '', description: '', price: 0, duration: 30, category: 'Services' })}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl"
          >
            Add New Service
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.services.map(service => (
            <div key={service.id} className={`bg-white rounded-3xl border border-slate-100 p-8 shadow-sm group hover:shadow-xl transition-all relative ${!service.isActive ? 'opacity-60 bg-slate-50' : ''}`}>
               <div className="flex justify-between items-start mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${service.isActive ? 'bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <i className="fas fa-cut"></i>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingService(service)} className="text-slate-300 hover:text-blue-600 transition-colors p-1" title="Edit Service"><i className="fas fa-edit"></i></button>
                    <button onClick={() => handleDeleteService(service.id)} className="text-slate-300 hover:text-red-600 transition-colors p-1" title="Delete Service"><i className="fas fa-trash"></i></button>
                  </div>
               </div>
               <div className="space-y-4">
                  <div>
                    <h4 className="font-black text-slate-900 uppercase italic leading-none">{service.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{service.duration} MIN • {service.category || 'General'}</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed h-8">{service.description}</p>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                     <span className="text-2xl font-black text-slate-900">${service.price}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{service.isActive ? 'Active' : 'Inactive'}</span>
                        <button 
                          onClick={() => handleToggleServiceStatus(service.id)}
                          className={`w-8 h-4 rounded-full relative transition-colors ${service.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                           <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${service.isActive ? 'right-0.5' : 'left-0.5'}`}></div>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
       </div>

       {editingService && (
         <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setEditingService(null)}></div>
            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden animate-fade-in shadow-3xl">
               <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-black text-slate-900 uppercase italic">{editingService.id ? 'Edit Service' : 'Add New Service'}</h3>
                  <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-slate-900"><i className="fas fa-times text-xl"></i></button>
               </div>
               <form onSubmit={handleSaveServiceEdit} className="p-10 space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Service Name</label>
                     <input type="text" required value={editingService.name} onChange={(e) => setEditingService({ ...editingService, name: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm text-black" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Price ($)</label>
                       <input type="number" required value={editingService.price} onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm text-black" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Duration (Min)</label>
                       <input type="number" required value={editingService.duration} onChange={(e) => setEditingService({ ...editingService, duration: Number(e.target.value) })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm text-black" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Description</label>
                     <textarea required value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm text-black h-32 resize-none" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20 active:scale-[0.98]">
                    {editingService.id ? 'Save Changes' : 'Create Service'}
                  </button>
               </form>
            </div>
         </div>
       )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-fade-in max-w-4xl">
       <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
             <h3 className="font-black text-slate-900 uppercase italic">Business Information</h3>
          </div>
          <div className="p-10 space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Business Name</label>
                   <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Specialty Tags</label>
                   <input type="text" value={profile.specialty} onChange={(e) => setProfile({...profile, specialty: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black" />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Business Address</label>
                   <input type="text" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black" />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">About Me / Bio</label>
                   <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-sm text-black h-32 resize-none" />
                </div>
             </div>
             
             <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button onClick={triggerSyncFeedback} disabled={isSaving} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20">
                  {isSaving ? 'Synchronizing...' : 'Save All Changes'}
                </button>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
             <h3 className="font-black text-slate-900 uppercase italic">Availability Settings</h3>
          </div>
          <div className="p-10 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buffer Time (Minutes)</label>
                 <input type="number" defaultValue={15} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm text-black" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min Booking Notice (Hours)</label>
                 <input type="number" defaultValue={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm text-black" />
               </div>
             </div>
             <div className="pt-4 border-t border-slate-50 space-y-3">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Working Hours</h4>
               {profile.hours?.map(day => (
                 <div key={day.day} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                    <span className="text-sm font-bold text-slate-700">{day.day}</span>
                    <div className="flex items-center gap-6">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">{day.hours}</span>
                       <button className="text-slate-300 hover:text-blue-600 transition-colors"><i className="fas fa-edit"></i></button>
                    </div>
                 </div>
               ))}
             </div>
          </div>
       </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'calendar': return renderCalendar();
      case 'services': return renderServices();
      case 'settings': return renderSettings();
      default: return (
        <div className="py-20 text-center space-y-6">
           <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200 text-4xl">
              <i className="fas fa-hammer"></i>
           </div>
           <h3 className="text-2xl font-black text-slate-900 uppercase italic">Dashboard Module</h3>
           <p className="text-slate-500 font-medium">Selected sector: {activeSection}</p>
           <button onClick={() => setActiveSection('calendar')} className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline">Return to Calendar</button>
        </div>
      );
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row relative">
      {renderSidebar()}
      
      <main className="flex-grow p-6 lg:p-12 pb-24 lg:pb-12 max-w-[1400px] mx-auto w-full">
        <div className="lg:hidden mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase">HAIRFORCE PRO</h1>
          <button className="w-10 h-10 rounded-full bg-slate-100 shadow-sm flex items-center justify-center text-slate-400"><i className="fas fa-user"></i></button>
        </div>
        {renderContent()}
      </main>

      {renderMobileNav()}

      {isSaving && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-fade-in">
          <div className="px-8 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl flex items-center gap-3 font-bold">
            <i className="fas fa-check-circle"></i>
            <span>Session Synchronized!</span>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default ProDashboard;
