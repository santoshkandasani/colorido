import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Plus,
  Trash2,
  ArrowRight,
  Ticket,
  AlertCircle
} from 'lucide-react';
import { FestEvent, Participant, EventRegistration } from '../types/fest';

interface EventRegisterModalProps {
  event: FestEvent | null;
  currentUser: Participant | null;
  onClose: () => void;
  onConfirmRegistration: (payload: {
    eventId: string;
    participantId: string;
    teamName?: string;
    teamMembers?: { name: string; rollNo: string }[];
  }) => Promise<EventRegistration>;
  onSuccess: (registration: EventRegistration) => void;
  onPromptAuth: () => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({
  event,
  currentUser,
  onClose,
  onConfirmRegistration,
  onSuccess,
  onPromptAuth
}) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<{ name: string; rollNo: string }[]>([
    { name: '', rollNo: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!event) return null;

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
        <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center shadow-2xl text-slate-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 font-display">
            Sign In Required to Register
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            To register for <strong className="text-slate-900">{event.title}</strong>, please sign in or register as an <strong>RVR & JC Student</strong> or <strong>External Participant</strong>.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                onPromptAuth();
              }}
              className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
            >
              Sign Up / Log In to Register
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddMember = () => {
    if (teamMembers.length < event.maxTeamSize - 1) {
      setTeamMembers([...teamMembers, { name: '', rollNo: '' }]);
    }
  };

  const handleRemoveMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, idx) => idx !== index));
  };

  const handleMemberChange = (index: number, field: 'name' | 'rollNo', value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (event.isGroup && !teamName.trim()) {
      setErrorMsg('Please enter your Team / Crew Name.');
      return;
    }

    setLoading(true);
    try {
      const validMembers = teamMembers.filter(m => m.name.trim() !== '');
      const registration = await onConfirmRegistration({
        eventId: event.id,
        participantId: currentUser.id,
        teamName: event.isGroup ? teamName.trim() : undefined,
        teamMembers: event.isGroup ? validMembers : undefined
      });

      onSuccess(registration);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. You might already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Top Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Event Registration (Dec 26, 2026)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono font-bold">
                {currentUser.userType === 'internal' ? 'RVR & JC' : 'External'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
              {event.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schedule & Venue Brief */}
        <div className="bg-slate-50/60 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-rose-700" />
            <span>{event.dateTime}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{event.venue}</span>
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Participant Credentials Overview */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Registered Participant (Primary Contact)
            </span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{currentUser.name}</span>
              <span className="text-slate-500 font-mono text-[11px]">{currentUser.enrollmentNumber}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 text-[11px]">
              <span>{currentUser.email}</span>
              <span className="truncate max-w-[150px]">{currentUser.collegeName}</span>
            </div>
          </div>

          {/* Group / Team Fields */}
          {event.isGroup && (
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Team / Crew Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Phoenix Titans / Raga Pulse"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                />
              </div>

              {/* Additional Team Members */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-600" />
                    <span>Additional Team Members ({event.teamSize})</span>
                  </label>

                  {teamMembers.length < event.maxTeamSize - 1 && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="inline-flex items-center gap-1 text-[11px] text-rose-700 hover:text-rose-800 font-bold"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Teammate</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Member #${idx + 2} Name`}
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                      />
                      <input
                        type="text"
                        placeholder="Enrollment / Roll ID"
                        value={member.rollNo}
                        onChange={(e) => handleMemberChange(idx, 'rollNo', e.target.value)}
                        className="w-28 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600 font-mono"
                      />
                      {teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rules consent checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                required
                defaultChecked
                className="mt-0.5 rounded border-slate-300 text-rose-700 focus:ring-0"
              />
              <span>
                I agree to the COLORIDO 2K26 festival rules and reporting schedule on Saturday, December 26, 2026.
              </span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center gap-2"
            >
              {loading ? (
                <span>Generating Fest Ticket...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
