import React, { useState } from 'react';
import {
  Bell,
  Trophy,
  Award,
  Pin,
  Clock,
  Building,
  CheckCircle2
} from 'lucide-react';
import { Announcement, EventResult } from '../types/fest';

interface ResultsAnnouncementsProps {
  announcements: Announcement[];
  results: EventResult[];
}

export const ResultsAnnouncements: React.FC<ResultsAnnouncementsProps> = ({
  announcements,
  results
}) => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'results'>('results');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cultural' | 'sports'>('all');

  const filteredResults = results.filter((r) => {
    if (categoryFilter === 'all') return true;
    return r.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  return (
    <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-widest mb-1.5">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Official Festival Bulletins & Leaderboards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Announcements & Results
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-xl">
            Real-time podium finishes, match results, and official festival schedule updates for Dec 26, 2026.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'results'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Championship Results</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'announcements'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-rose-600" />
            <span>Live Notices ({announcements.length})</span>
          </button>
        </div>
      </div>

      {/* RESULTS VIEW */}
      {activeTab === 'results' && (
        <div className="mt-8 space-y-6">
          
          {/* Sub filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mr-2">
              Filter By:
            </span>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setCategoryFilter('cultural')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                categoryFilter === 'cultural'
                  ? 'bg-rose-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Cultural Events
            </button>
            <button
              onClick={() => setCategoryFilter('sports')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                categoryFilter === 'sports'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Sports Championships
            </button>
          </div>

          {/* Results Grid - Clean White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                        {result.category} Division
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        {result.eventName}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {result.publishedAt}
                    </span>
                  </div>

                  {/* Podium Standings */}
                  <div className="space-y-3">
                    
                    {/* 1st Place */}
                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-2xs">
                          1
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900">
                            {result.firstPlace.name}
                          </p>
                          <p className="text-xs text-slate-700 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-amber-700" />
                            <span>{result.firstPlace.college}</span>
                          </p>
                          {result.firstPlace.notes && (
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {result.firstPlace.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-800 shrink-0">Gold Trophy</span>
                    </div>

                    {/* 2nd Place */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-300 text-slate-900 font-bold flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {result.secondPlace.name}
                          </p>
                          <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-slate-400" />
                            <span>{result.secondPlace.college}</span>
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 shrink-0">Silver Medal</span>
                    </div>

                    {/* 3rd Place */}
                    {result.thirdPlace && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0">
                            3
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              {result.thirdPlace.name}
                            </p>
                            <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                              <Building className="w-3 h-3 text-slate-400" />
                              <span>{result.thirdPlace.college}</span>
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-amber-800 shrink-0">Bronze Medal</span>
                      </div>
                    )}

                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Jury Ratified & Certified</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Official Result</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ANNOUNCEMENTS VIEW */}
      {activeTab === 'announcements' && (
        <div className="mt-8 space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`rounded-xl border p-5 sm:p-6 transition-all ${
                ann.isPinned
                  ? 'bg-rose-50/50 border-rose-200 shadow-2xs'
                  : 'bg-white border-slate-200 hover:shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {ann.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider border border-rose-200">
                      <Pin className="w-3 h-3" />
                      <span>Pinned Announcement</span>
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    ann.tag === 'Urgent'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : ann.tag === 'Schedule'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : ann.tag === 'Pro-Show'
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {ann.tag}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{ann.timestamp}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {ann.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {ann.content}
              </p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
