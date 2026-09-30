import React, { useState } from 'react';
import {
  Sparkles,
  Trophy,
  Users,
  MapPin,
  Calendar,
  Search,
  CheckCircle2,
  ArrowRight,
  Info,
  Filter
} from 'lucide-react';
import { FestEvent } from '../types/fest';

interface EventsSectionProps {
  events: FestEvent[];
  selectedCategory: 'all' | 'cultural' | 'sports_boys' | 'sports_girls';
  onSelectCategory: (cat: 'all' | 'cultural' | 'sports_boys' | 'sports_girls') => void;
  onOpenEventDetails: (event: FestEvent) => void;
  onRegisterEvent: (event: FestEvent) => void;
  registeredEventIds: Set<string>;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  selectedCategory,
  onSelectCategory,
  onOpenEventDetails,
  onRegisterEvent,
  registeredEventIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');

  // Filter events
  const filteredEvents = events.filter((ev) => {
    if (selectedCategory === 'cultural' && ev.category !== 'cultural') return false;
    if (selectedCategory === 'sports_boys' && ev.subCategory !== 'sports_boys') return false;
    if (selectedCategory === 'sports_girls' && ev.subCategory !== 'sports_girls') return false;

    if (selectedCategory === 'cultural' && activeSubFilter !== 'all') {
      if (ev.subCategory !== activeSubFilter) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchDesc = ev.shortDescription.toLowerCase().includes(q);
      const matchVenue = ev.venue.toLowerCase().includes(q);
      const matchSub = ev.subCategoryLabel.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchVenue && !matchSub) return false;
    }

    return true;
  });

  return (
    <section id="events-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-rose-700" />
            <span>Championship Schedule & Portfolios (Dec 26, 2026)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Competitions & Showcases
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-xl">
            Choose your battleground. Register solo or assemble your collegiate crew for prestigious trophies and ₹5,00,000+ in cash rewards.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, sports, music..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-700 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Main Category Tabs - Clean Segmented Control */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            onSelectCategory('all');
            setActiveSubFilter('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Events ({events.length})
        </button>

        <button
          onClick={() => {
            onSelectCategory('cultural');
            setActiveSubFilter('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            selectedCategory === 'cultural'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Cultural Events</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-black/15 rounded font-mono">8 Types</span>
        </button>

        <button
          onClick={() => {
            onSelectCategory('sports_boys');
            setActiveSubFilter('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            selectedCategory === 'sports_boys'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Sports (Boys)</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-black/15 rounded font-mono">Basketball, VB, TT</span>
        </button>

        <button
          onClick={() => {
            onSelectCategory('sports_girls');
            setActiveSubFilter('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            selectedCategory === 'sports_girls'
              ? 'bg-indigo-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Sports (Girls)</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-black/15 rounded font-mono">Throwball, TK, TT</span>
        </button>
      </div>

      {/* Cultural Subcategory Quick Filter */}
      {selectedCategory === 'cultural' && (
        <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center gap-1.5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-rose-700" />
            <span>Category:</span>
          </span>
          {[
            { id: 'all', label: 'All Cultural' },
            { id: 'fine_arts', label: 'Fine Arts' },
            { id: 'music_band', label: 'Music & Band (Solo/Group)' },
            { id: 'dance', label: 'Dance (Solo/Group)' },
            { id: 'choreoday', label: 'Choreoday (Theme)' },
            { id: 'dramatics', label: 'Dramatics' },
            { id: 'fashion_show', label: 'Fashion Show' },
            { id: 'tekraft', label: 'Tekraft Events' },
            { id: 'literary', label: 'Literary' }
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubFilter(sub.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeSubFilter === sub.id
                  ? 'bg-rose-100 text-rose-900 border border-rose-200 font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* Event Cards Grid - Clean White Cards */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const isRegistered = registeredEventIds.has(event.id);

          return (
            <div
              key={event.id}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-xs">
                      {event.subCategoryLabel}
                    </span>
                    {event.genderCategory && event.genderCategory !== 'open' && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        event.genderCategory === 'boys'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-rose-700 text-white'
                      }`}>
                        {event.genderCategory === 'boys' ? 'Boys' : 'Girls'}
                      </span>
                    )}
                  </div>

                  {/* Registered count */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-md">
                      {event.registeredCount} Entries
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-300" />
                    <span>Dec 26, 2026</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-600" />
                      <span>Prize: {event.prizePool}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {event.teamSize}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-1">
                    {event.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {event.shortDescription}
                  </p>

                  {/* Venue metadata */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{event.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenEventDetails(event)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 border border-slate-200"
                >
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>Rules</span>
                </button>

                {isRegistered ? (
                  <span className="px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Registered</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onRegisterEvent(event)}
                    className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-sm text-slate-600">No events found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveSubFilter('all');
              onSelectCategory('all');
            }}
            className="mt-3 px-4 py-2 bg-slate-900 text-xs font-bold text-white rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
