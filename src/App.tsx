/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollegeBannerCard } from './components/CollegeBannerCard';
import { TransportCard } from './components/TransportCard';
import { EventsSection } from './components/EventsSection';
import { EventDetailModal } from './components/EventDetailModal';
import { EventRegisterModal } from './components/EventRegisterModal';
import { AuthModal } from './components/AuthModal';
import { FestPassModal } from './components/FestPassModal';
import { ResultsAnnouncements } from './components/ResultsAnnouncements';
import { GallerySponsorsContact } from './components/GallerySponsorsContact';
import { Footer } from './components/Footer';
import { api } from './services/api';
import {
  Participant,
  FestEvent,
  EventRegistration,
  StatsOverview,
  Announcement,
  EventResult
} from './types/fest';
import {
  INITIAL_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_RESULTS
} from './data/festEvents';
import { CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

export default function App() {
  // Global States
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [events, setEvents] = useState<FestEvent[]>(INITIAL_EVENTS);
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [results, setResults] = useState<EventResult[]>(INITIAL_RESULTS);

  // Active filters and views
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'cultural' | 'sports_boys' | 'sports_girls'
  >('all');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'register' | 'login'>('register');
  const [eventDetailModalEvent, setEventDetailModalEvent] = useState<FestEvent | null>(null);
  const [eventRegisterModalEvent, setEventRegisterModalEvent] = useState<FestEvent | null>(null);
  const [festPassModalOpen, setFestPassModalOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Initial Load from API & LocalStorage
  useEffect(() => {
    // Check cached user
    const cached = api.getCachedUser();
    if (cached) {
      setCurrentUser(cached);
      api.getRegistrations(cached.id).then(setRegistrations).catch(console.error);
    }

    // Load Live Stats
    api.getStats().then(setStats).catch(console.error);

    // Load Live Events
    api.getEvents().then(setEvents).catch(console.error);

    // Load Announcements & Results
    api.getAnnouncements().then(setAnnouncements).catch(console.error);
    api.getResults().then(setResults).catch(console.error);
  }, []);

  // Set of registered event IDs for quick lookup
  const registeredEventIds = new Set(registrations.map((r) => r.eventId));

  // Navigation smoothly scroll to section
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When category selected in dropdown from Navbar
  const handleSelectEventCategory = (
    cat: 'all' | 'cultural' | 'sports_boys' | 'sports_girls'
  ) => {
    setSelectedCategory(cat);
  };

  // Open Auth modal
  const handleOpenAuth = (initialTab: 'register' | 'login' = 'register') => {
    setAuthInitialTab(initialTab);
    setAuthModalOpen(true);
  };

  // Logout
  const handleLogout = () => {
    api.logoutUser();
    setCurrentUser(null);
    setRegistrations([]);
    showToast('Signed out of COLORIDO 2K26 session.', 'info');
  };

  // Auth Success Handlers
  const handleRegisterSuccess = (user: Participant, updatedStats: StatsOverview) => {
    setCurrentUser(user);
    setStats(updatedStats);
    showToast(`Welcome ${user.name}! Registered as ${user.userType === 'internal' ? 'Internal Student' : 'External Participant'}.`);
  };

  const handleLoginSuccess = (user: Participant, userRegistrations: EventRegistration[]) => {
    setCurrentUser(user);
    setRegistrations(userRegistrations);
    showToast(`Logged in successfully as ${user.name}.`);
  };

  // When user clicks "Register" button on an event card
  const handleCardRegisterClick = (event: FestEvent) => {
    if (!currentUser) {
      setEventRegisterModalEvent(event); // Will show prompt inside modal or open auth
    } else {
      setEventRegisterModalEvent(event);
    }
  };

  // Confirm event registration
  const handleConfirmEventRegistration = async (payload: {
    eventId: string;
    participantId: string;
    teamName?: string;
    teamMembers?: { name: string; rollNo: string }[];
  }) => {
    const newReg = await api.registerForEvent(payload);
    setRegistrations((prev) => [...prev, newReg]);

    // Update event registered count in UI
    setEvents((prev) =>
      prev.map((e) =>
        e.id === payload.eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e
      )
    );

    // Refresh stats
    api.getStats().then(setStats).catch(console.error);

    return newReg;
  };

  // Event registration succeeded
  const handleEventRegistrationSuccess = (reg: EventRegistration) => {
    setEventRegisterModalEvent(null);
    showToast(`Registration confirmed for ${reg.eventTitle}! Pass Code: ${reg.ticketCode}`, 'success');
    // Open Digital Fest Pass modal so they can see their ticket
    setFestPassModalOpen(true);
  };

  // Unregister / cancel registration
  const handleUnregister = async (regId: string) => {
    if (!currentUser) return;
    try {
      const ok = await api.unregisterEvent(regId, currentUser.id);
      if (ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== regId));
        showToast('Event registration cancelled.', 'info');
        api.getStats().then(setStats).catch(console.error);
        api.getEvents().then(setEvents).catch(console.error);
      }
    } catch (e: any) {
      showToast(e.message || 'Failed to cancel registration.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-600 selection:text-white flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : toast.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : 'bg-white border-slate-300 text-slate-900'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            {toast.type === 'info' && <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        stats={stats}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenFestPass={() => setFestPassModalOpen(true)}
        onSelectEventCategory={handleSelectEventCategory}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero & Festival Dashboard with Live Stats & Countdown */}
        <HeroSection
          stats={stats}
          onOpenRegister={() => handleOpenAuth('register')}
          onExploreEvents={() => handleNavigateSection('events-section')}
          onViewTransport={() => handleNavigateSection('transport-card')}
        />

        {/* 2. College Image Insertion & Campus Showcase Slot */}
        <CollegeBannerCard />

        {/* 3. Featured Transport Card (Buses at 7:00 AM and 9:00 AM) */}
        <TransportCard />

        {/* 4. Complete Events Directory (Cultural 8 Types + Sports Boys & Girls) */}
        <EventsSection
          events={events}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenEventDetails={(ev) => setEventDetailModalEvent(ev)}
          onRegisterEvent={handleCardRegisterClick}
          registeredEventIds={registeredEventIds}
        />

        {/* 5. Announcements Feed & Live Leaderboard Results */}
        <ResultsAnnouncements
          announcements={announcements}
          results={results}
        />

        {/* 6. Gallery, Sponsors & Contact Directory */}
        <GallerySponsorsContact />

      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAuth={() => handleOpenAuth('register')}
      />

      {/* MODALS */}

      {/* Auth Modal (Sign Up & Login with separate Internal vs External distinction) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authInitialTab}
        stats={stats}
        onRegisterSuccess={handleRegisterSuccess}
        onLoginSuccess={handleLoginSuccess}
        apiRegister={api.registerUser}
        apiLogin={api.loginUser}
      />

      {/* Event Details & Rules Modal */}
      <EventDetailModal
        event={eventDetailModalEvent}
        onClose={() => setEventDetailModalEvent(null)}
        onRegisterClick={(ev) => {
          setEventDetailModalEvent(null);
          handleCardRegisterClick(ev);
        }}
        isRegistered={eventDetailModalEvent ? registeredEventIds.has(eventDetailModalEvent.id) : false}
      />

      {/* Event Registration Form Modal (with team members if group) */}
      <EventRegisterModal
        event={eventRegisterModalEvent}
        currentUser={currentUser}
        onClose={() => setEventRegisterModalEvent(null)}
        onConfirmRegistration={handleConfirmEventRegistration}
        onSuccess={handleEventRegistrationSuccess}
        onPromptAuth={() => {
          setEventRegisterModalEvent(null);
          handleOpenAuth('register');
        }}
      />

      {/* Digital Fest Pass / Badge Modal */}
      <FestPassModal
        isOpen={festPassModalOpen}
        onClose={() => setFestPassModalOpen(false)}
        currentUser={currentUser}
        registrations={registrations}
        onUnregister={handleUnregister}
      />

    </div>
  );
}
