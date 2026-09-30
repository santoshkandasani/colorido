import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Building2,
  ShieldCheck,
  Bus,
  ChevronRight
} from 'lucide-react';
import { StatsOverview } from '../types/fest';

interface HeroSectionProps {
  stats: StatsOverview | null;
  onOpenRegister: () => void;
  onExploreEvents: () => void;
  onViewTransport: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  onOpenRegister,
  onExploreEvents,
  onViewTransport
}) => {
  // Countdown to Saturday, December 26, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-12-26T09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-dashboard" className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-slate-100/70 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs">
            <img src="/rvrjcce-logo.png" alt="RVR & JC Logo" className="w-4 h-4 object-contain" />
            <span>R.V.R. & J.C. College of Engineering (Autonomous), Guntur</span>
          </div>

          {/* ONE DAY ONLY: Dec 26, 2026 */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-rose-700" />
            <span>Saturday, December 26, 2026 (One-Day Grand Fest)</span>
          </div>

          {/* Buses from CPT & Guntur */}
          <button
            onClick={onViewTransport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-xs"
          >
            <Bus className="w-3.5 h-3.5 text-emerald-700" />
            <span>Buses available from CPT and Guntur at 7:00 AM & 9:00 AM</span>
          </button>
        </div>

        {/* Main Headline - Clean collegiate typography */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">
            National Level Cultural & Sports Festival
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-slate-950">
            COLORIDO <span className="text-rose-700">2K26</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            The flagship one-day inter-collegiate talent arena hosted by R.V.R. & J.C. College of Engineering. Featuring Fine Arts, Music, Dance, Choreoday, Dramatics, Fashion, Tekraft, Literary, Basketball, Volleyball, Throwball, and Table Tennis.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenRegister}
              className="px-6 py-3.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Register Now (Internal & External)</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={onExploreEvents}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Explore All Events</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Countdown Timer to Dec 26, 2026 */}
        <div className="mt-12 max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-rose-700" />
            <span>Festival Commences: Dec 26, 2026 (09:00 AM)</span>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
              <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">Days</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
              <span className="block text-2xl sm:text-4xl font-extrabold text-rose-700 font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">Hours</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
              <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">Mins</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
              <span className="block text-2xl sm:text-4xl font-extrabold text-emerald-700 font-mono">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </div>

        {/* Live Registration Stats Card - Clean Collegiate Surface */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                </span>
                <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                  Participant Census (Separate Internal vs External Tracking)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time synchronized records for R.V.R. & J.C. internal students and external visiting colleges.
              </p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-auto font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Database Records</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Internal Count */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-1">
                <span>RVR & JC Students</span>
                <Users className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono">
                {stats?.internalCount ?? 248}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Host College Enrolled</p>
            </div>

            {/* External Count */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-1">
                <span>External Participants</span>
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-mono">
                {stats?.externalCount ?? 184}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Visiting Colleges</p>
            </div>

            {/* Colleges Count */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-1">
                <span>Colleges Represented</span>
                <Building2 className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {stats?.collegesCount ?? 34}+
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Institutions Statewide</p>
            </div>

            {/* Total Prize Pool */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-1">
                <span>Total Prize Pool</span>
                <Trophy className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
                ₹5,00,000+
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Cash Awards & Trophies</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
