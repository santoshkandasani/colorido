import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Hash,
  Phone,
  Building,
  Lock,
  Sparkles,
  Users,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { ParticipantType, Participant, StatsOverview } from '../types/fest';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'register' | 'login';
  stats: StatsOverview | null;
  onRegisterSuccess: (user: Participant, updatedStats: StatsOverview) => void;
  onLoginSuccess: (user: Participant, registrations: any[]) => void;
  apiRegister: (payload: any) => Promise<{ user: Participant; stats: StatsOverview }>;
  apiLogin: (identifier: string, password?: string) => Promise<{ user: Participant; registrations: any[] }>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'register',
  stats,
  onRegisterSuccess,
  onLoginSuccess,
  apiRegister,
  apiLogin
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>(initialTab);
  const [userType, setUserType] = useState<ParticipantType>('internal');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('fest2026');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('password123');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim() || !email.trim() || !enrollmentNumber.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (userType === 'external') {
      if (!phoneNumber.trim()) {
        setErrorMsg('External participants must provide a valid Phone Number.');
        return;
      }
      if (!collegeName.trim()) {
        setErrorMsg('External participants must enter their College Name.');
        return;
      }
    }

    setLoading(true);
    try {
      const response = await apiRegister({
        userType,
        name: name.trim(),
        email: email.trim(),
        enrollmentNumber: enrollmentNumber.trim(),
        phoneNumber: phoneNumber.trim() || undefined,
        collegeName: userType === 'internal' ? 'R.V.R. & J.C. College of Engineering (Host)' : collegeName.trim(),
        department: department.trim() || undefined,
        password: password || 'fest2026'
      });

      setSuccessMsg(
        `Registration successful! You are enrolled as an ${
          userType === 'internal' ? 'Internal Student' : 'External Participant'
        }.`
      );
      setTimeout(() => {
        onRegisterSuccess(response.user, response.stats);
        onClose();
      }, 900);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginIdentifier.trim()) {
      setErrorMsg('Please enter your Registered Email or Enrollment ID.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiLogin(loginIdentifier.trim(), loginPassword);
      setSuccessMsg(`Welcome back, ${response.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(response.user, response.registrations);
        onClose();
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoInternal = () => {
    setActiveTab('login');
    setLoginIdentifier('santosh.kandasani@gmail.com');
    setLoginPassword('password123');
  };

  const fillDemoExternal = () => {
    setActiveTab('login');
    setLoginIdentifier('rahul.bose@bits-pilani.ac.in');
    setLoginPassword('password123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Top Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
              <img src="/rvrjcce-logo.png" alt="RVR & JC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 font-display">COLORIDO 2K26</span>
                <span className="text-[10px] bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded font-bold">
                  Dec 26, 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                R.V.R. & J.C. College of Engineering, Guntur
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Separate Registration Census Strip */}
        <div className="bg-slate-100/70 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Separate Census:</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-cyan-800 font-bold">
              Internals: {stats?.internalCount ?? 248}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-rose-800 font-bold">
              Externals: {stats?.externalCount ?? 184}
            </span>
          </div>
        </div>

        {/* Tab switchers: Register vs Sign In */}
        <div className="px-6 pt-5 pb-2">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMsg(null);
              }}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up / Register
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg(null);
              }}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Error / Success Notifications */}
        <div className="px-6 pt-2">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* REGISTER TAB */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="px-6 pb-6 pt-2 space-y-3.5">
            
            {/* User Type Switcher (Internal Student vs External Participant) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Participant Category (Counts tracked separately)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUserType('internal')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    userType === 'internal'
                      ? 'bg-cyan-50 border-cyan-400 text-cyan-950 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs font-bold text-cyan-800">RVR & JC Student</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Host College Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('external')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    userType === 'external'
                      ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs font-bold text-rose-800">External Participant</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Other Colleges / Univs</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mail ID *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userType === 'internal' ? 'student@rvrjcce.ac.in' : 'participant@gmail.com'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>

            {/* Enrollment Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enrollment Number / Roll ID *
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={enrollmentNumber}
                  onChange={(e) => setEnrollmentNumber(e.target.value)}
                  placeholder="e.g. Y22BCE10042"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600 font-mono uppercase"
                />
              </div>
            </div>

            {/* External Only: Phone Number & College Name */}
            {userType === 'external' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Mandatory for External) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / University Name (Mandatory for External) *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. BITS Pilani / IIT Madras / Loyola"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Internal Only: Department */}
            {userType === 'internal' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department / Branch
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. CSE / ECE / Mechanical"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Create Password (for viewing Fest Pass)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>Registering Participant...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    Complete {userType === 'internal' ? 'RVR & JC' : 'External'} Registration
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* LOGIN TAB */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="px-6 pb-6 pt-2 space-y-4">
            <p className="text-xs text-slate-600">
              Students and external participants can log in using their Mail ID or Enrollment Number to manage registered events and download their official COLORIDO 2K26 Digital Fest Pass.
            </p>

            {/* Identifier */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mail ID or Enrollment Number *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. santosh.kandasani@gmail.com or Y22BCE10042"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600 font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>Logging In...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Participant Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Quick Demo Credentials Box */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
                Quick Test Logins (Demo Accounts):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={fillDemoInternal}
                  className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] transition-colors"
                >
                  <span className="font-bold text-cyan-800 block">Host Student</span>
                  <span className="text-[10px] text-slate-500 truncate block">santosh.kandasani@...</span>
                </button>
                <button
                  type="button"
                  onClick={fillDemoExternal}
                  className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] transition-colors"
                >
                  <span className="font-bold text-rose-800 block">External Participant</span>
                  <span className="text-[10px] text-slate-500 truncate block">rahul.bose@bits...</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
