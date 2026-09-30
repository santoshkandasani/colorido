import React from 'react';
import {
  X,
  Ticket,
  Printer,
  Calendar,
  MapPin,
  Building,
  Trash2,
  Bus
} from 'lucide-react';
import { Participant, EventRegistration } from '../types/fest';
import { QrCodeSvg } from './QrCodeSvg';

interface FestPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: Participant | null;
  registrations: EventRegistration[];
  onUnregister: (regId: string) => void;
}

export const FestPassModal: React.FC<FestPassModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  registrations,
  onUnregister
}) => {
  if (!isOpen || !currentUser) return null;

  const handlePrint = () => {
    window.print();
  };

  const primaryTicketCode = registrations.length > 0
    ? registrations[0].ticketCode
    : `COL26-${currentUser.userType === 'internal' ? 'INT' : 'EXT'}-${currentUser.enrollmentNumber}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:m-0 print:w-full text-slate-900">
        
        {/* Top Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <img src="/rvrjcce-logo.png" alt="RVR & JC Logo" className="w-6 h-6 object-contain" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              COLORIDO 2K26 Official Delegate Pass
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Badge</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Pass Container */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Visual Badge Card - Authentic Collegiate Pass Card */}
          <div className={`rounded-2xl border-2 p-6 sm:p-8 relative overflow-hidden shadow-sm ${
            currentUser.userType === 'internal'
              ? 'bg-gradient-to-br from-white via-cyan-50/40 to-slate-50 border-cyan-600/60'
              : 'bg-gradient-to-br from-white via-rose-50/40 to-slate-50 border-rose-600/60'
          }`}>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
              
              {/* Participant & Fest Identifiers */}
              <div className="space-y-3.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200 shrink-0 shadow-2xs">
                    <img src="/rvrjcce-logo.png" alt="RVR & JC Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-lg tracking-tight font-display block leading-tight">
                      COLORIDO 2K26
                    </span>
                    <span className="block text-[10px] text-slate-500 font-medium">
                      R.V.R. & J.C. College of Engineering, Guntur
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                    currentUser.userType === 'internal'
                      ? 'bg-cyan-100 text-cyan-900 border border-cyan-200'
                      : 'bg-rose-100 text-rose-900 border border-rose-200'
                  }`}>
                    {currentUser.userType === 'internal' ? 'RVR & JC Student Delegate' : 'External College Delegate'}
                  </span>
                </div>

                {/* Name & College */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {currentUser.name}
                  </h2>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{currentUser.collegeName}</span>
                  </p>
                  {currentUser.department && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Dept: {currentUser.department}
                    </p>
                  )}
                </div>

                {/* IDs & Contact */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Enrollment ID</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">{currentUser.enrollmentNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Ticket Code</span>
                    <span className="font-mono font-bold text-rose-700 text-sm">{primaryTicketCode}</span>
                  </div>
                </div>

              </div>

              {/* QR Code & Barcode Section */}
              <div className="flex flex-col items-center sm:items-end justify-center gap-2">
                <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
                  <QrCodeSvg value={`COLORIDO-2K26|${currentUser.enrollmentNumber}|${currentUser.email}|${primaryTicketCode}`} size={120} />
                </div>
                <span className="font-mono text-[11px] text-slate-600 font-bold tracking-widest text-center sm:text-right">
                  {primaryTicketCode}
                </span>
                <span className="text-[10px] text-slate-500 text-center sm:text-right">
                  Dec 26, 2026 · Valid at Check-in
                </span>
              </div>

            </div>

            {/* Bus Transport info */}
            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-emerald-800 font-semibold">
              <span className="flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-emerald-700" />
                <span>Buses available from CPT and Guntur at 7:00 AM & 9:00 AM</span>
              </span>
              <span className="text-slate-500 font-normal">Dec 26, 2026</span>
            </div>

          </div>

          {/* Registered Events Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-rose-700" />
                <span>Your Enrolled Competitions ({registrations.length})</span>
              </h4>
            </div>

            {registrations.length > 0 ? (
              <div className="space-y-2.5">
                {registrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {reg.eventTitle}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-mono font-bold">
                          {reg.ticketCode}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-rose-700" />
                          <span>{reg.dateTime}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{reg.venue}</span>
                        </span>
                      </div>

                      {reg.teamName && (
                        <p className="text-[11px] text-rose-800 font-medium mt-1">
                          Team: <strong>{reg.teamName}</strong> ({reg.teamMembers?.length ? reg.teamMembers.length + 1 : 1} members)
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 print:hidden self-end sm:self-center">
                      <button
                        onClick={() => onUnregister(reg.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Withdraw Registration"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                You haven't registered for any individual cultural or sports events yet. Browse the events directory to join!
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 print:hidden">
          <span>Carry digital pass on mobile or printed badge for physical check-in on Dec 26, 2026.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
