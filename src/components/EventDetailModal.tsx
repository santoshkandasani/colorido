import React from 'react';
import {
  X,
  Calendar,
  MapPin,
  Trophy,
  Users,
  CheckCircle,
  FileText,
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FestEvent } from '../types/fest';

interface EventDetailModalProps {
  event: FestEvent | null;
  onClose: () => void;
  onRegisterClick: (event: FestEvent) => void;
  isRegistered: boolean;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegisterClick,
  isRegistered
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Header Hero Image */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-700 hover:text-slate-950 hover:bg-white transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-slate-900 shadow-xs">
              {event.subCategoryLabel}
            </span>
            {event.genderCategory && event.genderCategory !== 'open' && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${
                event.genderCategory === 'boys'
                  ? 'bg-emerald-700'
                  : 'bg-rose-700'
              }`}>
                {event.genderCategory === 'boys' ? 'Boys Championship' : 'Girls Championship'}
              </span>
            )}
          </div>

          {/* Title & Info on Hero */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-300" />
                <span>{event.dateTime}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{event.venue}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-300" />
                <span>{event.teamSize}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Competition Overview (Dec 26, 2026)
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {event.description}
            </p>
          </div>

          {/* Prize Breakdown */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 mb-3">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Prize Pool & Honors ({event.prizePool})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white border border-rose-200 shadow-2xs">
                <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">1st Place</span>
                <span className="text-sm font-extrabold text-slate-900">{event.firstPrize}</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">2nd Place</span>
                <span className="text-sm font-extrabold text-slate-900">{event.secondPrize}</span>
              </div>
              {event.thirdPrize && (
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">3rd Place</span>
                  <span className="text-sm font-extrabold text-slate-900">{event.thirdPrize}</span>
                </div>
              )}
            </div>
          </div>

          {/* Rules and Regulations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-rose-700" />
              <span>Rules & Regulations</span>
            </h4>
            <ul className="space-y-2">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Judging Criteria */}
          {event.judgingCriteria && event.judgingCriteria.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Judging Parameters & Scoring
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.judgingCriteria.map((crit, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                  >
                    {crit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators Contact */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Event In-Charges & Coordinators
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.coordinators.map((coord, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{coord.name}</p>
                    <p className="text-[10px] text-slate-500">{coord.role}</p>
                  </div>
                  <a
                    href={`tel:${coord.phone}`}
                    className="inline-flex items-center gap-1 text-xs text-rose-700 hover:text-rose-800 font-mono bg-rose-50 px-2 py-1 rounded font-semibold border border-rose-100"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{coord.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer / Registration CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <span>Currently Registered: </span>
            <strong className="text-slate-900">{event.registeredCount} Entries</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            {isRegistered ? (
              <span className="px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Already Registered</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onRegisterClick(event);
                }}
                className="px-5 py-2.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Register for {event.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
