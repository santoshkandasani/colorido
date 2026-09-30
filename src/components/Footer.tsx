import React from 'react';
import { ArrowUp, Calendar, MapPin, Bus } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenAuth }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info with RVRJCE Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-700 shrink-0">
                <img src="/rvrjcce-logo.png" alt="RVR & JC College Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white font-display block leading-none">
                  COLORIDO 2K26
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  R.V.R. & J.C. College of Engg.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              National Level Cultural & Sports Festival hosted by R.V.R. & J.C. College of Engineering (Autonomous), Guntur on Saturday, December 26, 2026.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <span>#Colorido2K26</span>
              <span>·</span>
              <span>#RVRJCE</span>
              <span>·</span>
              <span>#Dec26</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore Festival
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('hero-dashboard')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home & Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('events-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Cultural & Sports Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('transport-card')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400 font-medium"
                >
                  <Bus className="w-3.5 h-3.5" />
                  <span>Buses (CPT & Guntur at 7 & 9 AM)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('results-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Announcements & Results
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('gallery-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Key Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Events (Dec 26, 2026)
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>· Fine Arts & Tekraft</li>
              <li>· Music & Battle of the Bands</li>
              <li>· Solo & Group Dance</li>
              <li>· Choreoday (Theme Based)</li>
              <li>· Dramatics & Fashion Show</li>
              <li>· Boys: Basketball, VB, TT</li>
              <li>· Girls: Throwball, Tennikoit, TT</li>
            </ul>
          </div>

          {/* Direct Registration Callout */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Participant Enrolment
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Separate registration desks and database counters for R.V.R. & J.C. students and visiting external collegiate contingents.
            </p>
            <button
              onClick={onOpenAuth}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Register for COLORIDO 2K26
            </button>
          </div>

        </div>

        {/* Bottom copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 R.V.R. & J.C. College of Engineering (Autonomous). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <span>Chowdavaram, Guntur, Andhra Pradesh</span>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
