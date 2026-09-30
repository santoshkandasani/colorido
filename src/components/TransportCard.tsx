import React from 'react';
import {
  Bus,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TRANSPORT_DETAILS } from '../data/festEvents';

export const TransportCard: React.FC = () => {
  return (
    <section id="transport-card" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Bus className="w-3.5 h-3.5 text-emerald-600" />
              <span>Festival Bus Transport</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              College Bus Facility (Dec 26, 2026)
            </h2>

            {/* Exactly as requested: Buses will be available from CPT and Guntur at 7:00 AM and 9:00 AM */}
            <div className="mt-3 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold text-base sm:text-lg">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Buses will be available from CPT and Guntur at 7:00 AM and 9:00 AM</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm">
            <span className="text-xs font-bold text-slate-800 block mb-1">
              Destination: R.V.R. & J.C. Campus
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Buses will bring participants and attendees directly to the campus main bus bays at Chowdavaram, Guntur.
            </p>
          </div>
        </div>

        {/* Simplified CPT and Guntur Pickup Locations */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* CPT Point */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                  Point 1
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>07:00 AM & 09:00 AM</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>CPT (Collectorate / Central Point)</span>
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Buses depart from the CPT junction sharp at <strong>7:00 AM</strong> and <strong>9:00 AM</strong> on Dec 26, 2026.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Direct drop to R.V.R. & J.C. Campus Registration Bay</span>
            </div>
          </div>

          {/* Guntur Point */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                  Point 2
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>07:00 AM & 09:00 AM</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Guntur City (Bus Stand & Railway Station Junctions)</span>
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Buses depart from Guntur city center sharp at <strong>7:00 AM</strong> and <strong>9:00 AM</strong> on Dec 26, 2026.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Direct drop to R.V.R. & J.C. Campus Registration Bay</span>
            </div>
          </div>

        </div>

        {/* Return Bus Schedule & Contact */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Return Buses to CPT & Guntur
              </span>
              <p className="text-xs font-semibold text-slate-800">
                Departing R.V.R. & J.C. Campus at <strong>06:00 PM</strong> and <strong>09:00 PM</strong> (After Events & Pro-Show)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-l sm:border-slate-200 sm:pl-4">
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                Transport In-Charge
              </span>
              <span className="text-xs font-bold text-slate-900">
                {TRANSPORT_DETAILS.transportIncharge.name}
              </span>
            </div>
            <a
              href={`tel:${TRANSPORT_DETAILS.transportIncharge.phone}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-xs text-slate-800 font-semibold font-mono border border-slate-300 hover:bg-slate-100"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{TRANSPORT_DETAILS.transportIncharge.phone}</span>
            </a>
          </div>
        </div>

        {/* Advisory banner */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-700 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
          <span>Please report at the designated CPT or Guntur boarding spots 10 minutes prior to 7:00 AM or 9:00 AM departure times.</span>
        </div>

      </div>
    </section>
  );
};
