import React, { useState } from 'react';
import {
  Building2,
  Camera,
  Image as ImageIcon,
  MapPin,
  RotateCcw,
  Sparkles
} from 'lucide-react';

const PRESET_CAMPUS_IMAGES = [
  {
    name: 'R.V.R. & J.C. College Campus (Default)',
    url: '/rvrjcce-campus.jpg',
    desc: 'Autonomous engineering college campus, Chowdavaram, Guntur'
  },
  {
    name: 'Academic Quadrangle & Administrative Grounds',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RVR_and_JC_College_of_Engineering.jpg',
    desc: '37+ Acre green collegiate campus'
  },
  {
    name: 'Modern Engineering & Innovation Complex',
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80',
    desc: 'Technological infrastructure and central laboratories'
  }
];

export const CollegeBannerCard: React.FC = () => {
  const [campusImageUrl, setCampusImageUrl] = useState<string>('/rvrjcce-campus.jpg');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      setCampusImageUrl(customInput.trim());
      setIsEditing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCampusImageUrl(event.target.result as string);
          setIsEditing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        
        {/* Top Header / Insertion Indicator Bar */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center border border-slate-200 shrink-0 shadow-xs">
              <img src="/rvrjcce-logo.png" alt="RVRJCE Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide uppercase">
                  R.V.R. & J.C. College of Engineering (Host Campus)
                </span>
                <span className="text-[10px] bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded font-mono font-bold">
                  Autonomous · Guntur
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Official Festival Venue for COLORIDO 2K26 · Chowdavaram, Guntur - 522 019
              </p>
            </div>
          </div>

          {/* Image customize control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-300 transition-colors shadow-xs"
              title="Change or upload college campus photograph"
            >
              <Camera className="w-3.5 h-3.5 text-rose-700" />
              <span>{isEditing ? 'Close Image Tool' : 'Insert / Change Campus Photo'}</span>
            </button>
          </div>
        </div>

        {/* Custom photo manager panel (if opened) */}
        {isEditing && (
          <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6">
            <div className="max-w-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Customize Campus Photograph</span>
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                You can insert your institution's campus banner by pasting an image URL, choosing one of the presets, or uploading a local photo file.
              </p>

              {/* Form URL Input */}
              <form onSubmit={handleApplyCustomUrl} className="flex gap-2 mb-3">
                <input
                  type="url"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="https://your-college.edu/campus-banner.jpg"
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Apply URL
                </button>
              </form>

              {/* File Upload Option */}
              <div className="flex items-center gap-3 mb-4">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-xs font-medium text-slate-700 shadow-xs">
                  <ImageIcon className="w-3.5 h-3.5 text-rose-600" />
                  <span>Upload Local College Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => {
                    setCampusImageUrl('/rvrjcce-campus.jpg');
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default RVR&JC Photo</span>
                </button>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {PRESET_CAMPUS_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCampusImageUrl(preset.url);
                      setIsEditing(false);
                    }}
                    className={`text-left p-2.5 rounded-lg border text-xs transition-colors ${
                      campusImageUrl === preset.url
                        ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-semibold block truncate">{preset.name}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Banner Visual Frame */}
        <div className="relative h-64 sm:h-80 md:h-[400px] w-full overflow-hidden">
          <img
            src={campusImageUrl}
            alt="R.V.R. & J.C. College of Engineering Campus"
            className="w-full h-full object-cover object-center"
            onError={() => {
              setCampusImageUrl('https://upload.wikimedia.org/wikipedia/commons/d/d2/RVR_and_JC_College_of_Engineering.jpg');
            }}
          />

          {/* High-contrast gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Campus Location Tag Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-white/95 backdrop-blur-md text-slate-800 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Chowdavaram, Guntur, Andhra Pradesh</span>
            </span>
          </div>

          {/* Campus Info Overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest mb-1.5">
                <span>RVR & JC College of Engineering</span>
                <span>·</span>
                <span>Established 1985 · NAAC 'A+' Grade</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                Premier Technical Campus & Festival Grounds
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-normal">
                Home to the Ch. Madhusudhana Rao Open Air Theatre, Floodlit Basketball & Volleyball Stadiums, Indoor Sports Complex, and Advanced Computing Centers.
              </p>
            </div>

            {/* Quick facility chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white font-medium border border-white/20">
                🏛️ Open Air Theatre (OAT)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white font-medium border border-white/20">
                🏀 Floodlit Sports Courts
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white font-medium border border-white/20">
                🚍 Central Bus Bay
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
