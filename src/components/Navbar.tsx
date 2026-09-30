import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  Bus,
  ChevronDown,
  User,
  LogOut,
  Ticket,
  Menu,
  X,
  Users,
  PhoneCall
} from 'lucide-react';
import { Participant, StatsOverview } from '../types/fest';

interface NavbarProps {
  currentUser: Participant | null;
  stats: StatsOverview | null;
  onOpenAuth: (initialTab?: 'register' | 'login') => void;
  onLogout: () => void;
  onOpenFestPass: () => void;
  onSelectEventCategory: (cat: 'all' | 'cultural' | 'sports_boys' | 'sports_girls') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  stats,
  onOpenAuth,
  onLogout,
  onOpenFestPass,
  onSelectEventCategory,
  onNavigateSection
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEventDropdownSelect = (cat: 'all' | 'cultural' | 'sports_boys' | 'sports_girls') => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    onSelectEventCategory(cat);
    onNavigateSection('events-section');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Academic Navy Announcement Strip */}
      <div className="bg-[#0f172a] border-b border-slate-800 text-xs py-1.5 px-4 text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Top Left Register Option as requested */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('register')}
              className="inline-flex items-center gap-1.5 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded shadow-xs"
              title="Click to Register for COLORIDO 2K26"
            >
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>Register (Internal & External)</span>
            </button>
            <span className="hidden sm:inline text-slate-600">|</span>
            {/* Dec 26, 2026 Only One Day */}
            <div className="hidden sm:flex items-center gap-1.5 text-rose-300 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Dec 26, 2026 (One-Day Grand Fest)</span>
            </div>
          </div>

          {/* Center Transport notification */}
          <button
            onClick={() => onNavigateSection('transport-card')}
            className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
          >
            <Bus className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Buses available from CPT & Guntur at 7:00 AM & 9:00 AM</span>
          </button>

          {/* Right Live Stats Counter */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Internals: <strong className="text-cyan-300 font-mono">{stats?.internalCount ?? 248}</strong></span>
              <span className="text-slate-600">·</span>
              <span>Externals: <strong className="text-amber-300 font-mono">{stats?.externalCount ?? 184}</strong></span>
            </div>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+919849012341"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-rose-400" />
              <span>Helpdesk</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Collegiate Navbar - Crisp Clean Surface */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2.5' : 'bg-white border-b border-slate-200 py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand: RVRJCE Crest + COLORIDO 2K26 */}
          <button
            onClick={() => onNavigateSection('hero-dashboard')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200 shadow-xs group-hover:shadow transition-all shrink-0">
              <img
                src="/rvrjcce-logo.png"
                alt="R.V.R. & J.C. College of Engineering Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display group-hover:text-rose-700 transition-colors">
                  COLORIDO
                </span>
                <span className="text-xs font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                  2K26
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                R.V.R. & J.C. College of Engineering (Autonomous), Guntur
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Home / Dashboard */}
            <button
              onClick={() => onNavigateSection('hero-dashboard')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-rose-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Home
            </button>

            {/* Events Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  dropdownOpen ? 'text-rose-700 bg-slate-100' : 'text-slate-700 hover:text-rose-700 hover:bg-slate-100'
                }`}
              >
                <span>Events</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-rose-700' : 'text-slate-500'}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Events (Dec 26, 2026)
                  </div>
                  
                  <button
                    onClick={() => handleEventDropdownSelect('all')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-rose-700 rounded-lg transition-colors text-left"
                  >
                    <span>All Events (14+)</span>
                    <span className="text-xs text-slate-400">View All</span>
                  </button>
                  
                  <button
                    onClick={() => handleEventDropdownSelect('cultural')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      <span>Cultural Events</span>
                    </div>
                    <span className="text-[11px] text-rose-700 font-mono font-bold">8 Types</span>
                  </button>

                  <div className="pl-6 pr-2 py-1 space-y-0.5 text-xs text-slate-500">
                    <p className="truncate">· Fine Arts · Music & Band</p>
                    <p className="truncate">· Dance · Choreoday</p>
                    <p className="truncate">· Dramatics · Fashion Show</p>
                    <p className="truncate">· Tekraft · Literary</p>
                  </div>

                  <div className="my-1 border-t border-slate-100"></div>

                  <button
                    onClick={() => handleEventDropdownSelect('sports_boys')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>Sports (Boys)</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-mono font-bold">Basketball, VB, TT</span>
                  </button>

                  <button
                    onClick={() => handleEventDropdownSelect('sports_girls')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-800 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      <span>Sports (Girls)</span>
                    </div>
                    <span className="text-[11px] text-amber-800 font-mono font-bold">Throwball, TK, TT</span>
                  </button>
                </div>
              )}
            </div>

            {/* Results */}
            <button
              onClick={() => onNavigateSection('results-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-rose-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Results
            </button>

            {/* Transport */}
            <button
              onClick={() => onNavigateSection('transport-card')}
              className="px-3 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Bus className="w-3.5 h-3.5" />
              <span>Buses (CPT & Guntur)</span>
            </button>

            {/* Gallery */}
            <button
              onClick={() => onNavigateSection('gallery-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-rose-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Gallery
            </button>

            {/* Sponsors */}
            <button
              onClick={() => onNavigateSection('sponsors-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-rose-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Sponsors
            </button>

            {/* Contact */}
            <button
              onClick={() => onNavigateSection('contact-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-rose-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Contact
            </button>
          </div>

          {/* User Auth / Profile Area */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenFestPass}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-sm font-bold transition-colors shadow-xs"
                  title="View your official COLORIDO 2K26 Digital Fest Pass"
                >
                  <Ticket className="w-4 h-4 text-rose-700" />
                  <span>My Fest Pass</span>
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-sm font-bold text-white">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-bold text-slate-900 max-w-[120px] truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {currentUser.userType === 'internal' ? 'RVR & JC Student' : 'External'}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-slate-100"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-xs transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Register Now</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {!currentUser && (
              <button
                onClick={() => onOpenAuth('register')}
                className="px-3 py-1.5 text-xs font-bold bg-rose-700 text-white rounded-md"
              >
                Register
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('hero-dashboard');
              }}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Home (Dashboard)
            </button>

            <div className="space-y-1 py-1">
              <div className="text-xs font-bold text-slate-400 uppercase">Events (Dec 26, 2026)</div>
              <button
                onClick={() => handleEventDropdownSelect('all')}
                className="w-full text-left pl-3 py-1.5 text-sm text-slate-700 hover:text-rose-700"
              >
                All Events
              </button>
              <button
                onClick={() => handleEventDropdownSelect('cultural')}
                className="w-full text-left pl-3 py-1.5 text-sm text-rose-700 font-medium"
              >
                Cultural Events (8 Types)
              </button>
              <button
                onClick={() => handleEventDropdownSelect('sports_boys')}
                className="w-full text-left pl-3 py-1.5 text-sm text-emerald-700 font-medium"
              >
                Sports - Boys (Basketball, Volleyball, TT)
              </button>
              <button
                onClick={() => handleEventDropdownSelect('sports_girls')}
                className="w-full text-left pl-3 py-1.5 text-sm text-amber-800 font-medium"
              >
                Sports - Girls (Throwball, Tennikoit, TT)
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('transport-card');
              }}
              className="w-full text-left py-2 text-sm font-semibold text-emerald-700 border-b border-slate-100 flex items-center justify-between"
            >
              <span>Buses: CPT & Guntur</span>
              <span className="text-xs bg-emerald-100 px-2 py-0.5 rounded text-emerald-800 font-bold">7 AM & 9 AM</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('results-section');
              }}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Results & Announcements
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('gallery-section');
              }}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Gallery
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('contact-section');
              }}
              className="w-full text-left py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Contact & Helplines
            </button>

            {currentUser ? (
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFestPass();
                  }}
                  className="w-full py-2.5 rounded-lg bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>View Fest Pass ({currentUser.name})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 rounded-lg bg-slate-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-200 flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="flex-1 py-2 text-center text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="flex-1 py-2 text-center text-sm font-bold text-white bg-rose-700 rounded-lg"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
