
import React, { useState, useEffect } from 'react';
import { AppView, Stylist, Appointment, Service } from './types';
import { MOCK_STYLISTS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchResults from './components/SearchResults';
import ProfileDetail from './components/ProfileDetail';
import BarberProfile from './components/BarberProfile';
import Dashboard from './components/Dashboard';
import ProDashboard from './components/ProDashboard';
import BookingModal from './components/BookingModal';
import ChatButton from './components/ChatButton';
import Toast from './components/Toast';
import IncomeCalculator from './components/IncomeCalculator';
import Blog from './components/Blog';
import Forms from './components/Forms';
import LandingContent from './components/LandingContent';
import SameDayBooking from './components/SameDayBooking';
import GetOurApp from './components/GetOurApp';
import ListBusiness from './components/ListBusiness';
import Pricing from './components/Pricing';
import Subscription from './components/Subscription';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import StylePreviewAI from './components/StylePreviewAI';
import { BecomeAffiliate, AffiliateRegistration, AffiliateLogin, AffiliateArea, AffiliateTerms } from './components/Affiliate';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStylist, setBookingStylist] = useState<Stylist | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Real-time "Database" State for the logged in Pro
  const [proData, setProData] = useState<Stylist>(MOCK_STYLISTS.find(s => s.id === 'matia-neblett') || MOCK_STYLISTS[0]);

  // Search persistence
  const [initialSearch, setInitialSearch] = useState({ name: '', location: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBookNow = (stylist: Stylist, service?: Service) => {
    setBookingStylist(stylist);
    setSelectedService(service || null);
    setIsBookingOpen(true);
  };

  const navigateToProfile = (stylist: Stylist) => {
    // If we're navigating to our own profile, use the updated proData
    if (stylist.id === proData.id) {
      setSelectedStylist(proData);
    } else {
      setSelectedStylist(stylist);
    }
    setView('profile');
  };

  const handleGlobalSearch = (name: string, location: string) => {
    setInitialSearch({ name, location });
    setView('search');
  };

  const handleBookingComplete = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
    setIsBookingOpen(false);
    showToast(`Mission confirmed with ${appointment.stylistName}!`);
    setView('dashboard');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero onSearch={() => setView('search')} />
            <LandingContent 
              onStylistClick={navigateToProfile} 
              onBookNow={handleBookNow} 
              onSearch={handleGlobalSearch}
            />
          </>
        );
      case 'search':
        return (
          <SearchResults 
            onStylistClick={navigateToProfile} 
            onBookClick={handleBookNow} 
            isSameDay={false}
            initialName={initialSearch.name}
            initialLocation={initialSearch.location}
          />
        );
      case 'style-preview':
        return <StylePreviewAI />;
      case 'same-day':
        return <SameDayBooking onSwitchView={setView} onSuccess={(msg) => showToast(msg)} />;
      case 'profile':
        const targetStylist = selectedStylist?.id === proData.id ? proData : selectedStylist;
        if (!targetStylist) return null;
        if (targetStylist.id === 'matia-neblett') {
          return <BarberProfile stylist={targetStylist} onBookService={(service) => handleBookNow(targetStylist, service)} />;
        }
        return <ProfileDetail stylist={targetStylist} onBook={() => handleBookNow(targetStylist)} />;
      case 'dashboard':
        return <Dashboard appointments={appointments} />;
      case 'pro-dashboard':
        return <ProDashboard profile={proData} setProfile={setProData} />;
      case 'income-calculator':
        return <IncomeCalculator />;
      case 'blog':
        return <Blog />;
      case 'register':
      case 'login':
        return <Forms view={view} onSwitch={(v) => setView(v as AppView)} onLoginSuccess={() => setView('pro-dashboard')} />;
      case 'list-business':
        return <ListBusiness onSwitch={setView} />;
      case 'get-app':
        return <GetOurApp />;
      case 'pricing':
        return <Pricing onSwitch={setView} />;
      case 'subscription':
        return <Subscription />;
      
      // Affiliate Program Routes
      case 'affiliate-become':
        return <BecomeAffiliate onSwitch={setView} />;
      case 'affiliate-reg':
        return <AffiliateRegistration onSwitch={setView} />;
      case 'affiliate-login':
        return <AffiliateLogin />;
      case 'affiliate-area':
        return <AffiliateArea />;
      case 'affiliate-terms':
        return <AffiliateTerms />;

      default:
        return <div className="py-40 text-center text-white">404 - SECTOR NOT FOUND</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header view={view} setView={setView} onLogoClick={() => setView('home')} />
      <main className="flex-grow">{renderContent()}</main>
      
      <ContactForm />
      <Footer setView={setView} />

      {isBookingOpen && bookingStylist && (
        <BookingModal 
          stylist={bookingStylist} 
          onClose={() => setIsBookingOpen(false)} 
          onComplete={handleBookingComplete} 
        />
      )}
      <ChatButton />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default App;
