import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Building2,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  Hospital,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import { AppView, UserProfile } from '../types';

interface SignInPageProps {
  onSignIn: (user: UserProfile) => void;
  onNavigate: (view: AppView) => void;
}

const DEMO_ACCOUNTS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Rahul Mehra',
    email: 'rahul.mehra@apollo.health',
    hospitalName: 'Apollo Indraprastha Hospital, New Delhi',
    role: 'Billing Desk Officer',
    department: 'Central TPA & Insurance Desk',
    shiftBadge: 'Morning Shift • Ward 4B Billing',
  },
  {
    id: 'usr-2',
    name: 'Dr. Priya Sen',
    email: 'priya.sen@fortis.org',
    hospitalName: 'Fortis Memorial Research Institute, Gurugram',
    role: 'TPA Desk Manager',
    department: 'Revenue Cycle & Claims Assurance',
    shiftBadge: 'Admin Desk • All Wards',
  },
  {
    id: 'usr-3',
    name: 'Dr. Alok Verma',
    email: 'alok.verma@maxhealthcare.in',
    hospitalName: 'Max Super Speciality Hospital, Saket',
    role: 'Chief Medical Officer',
    department: 'Medical Directorate & Clinical Audits',
    shiftBadge: 'Directorate Access',
  },
];

export const SignInPage: React.FC<SignInPageProps> = ({
  onSignIn,
  onNavigate,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospitalName, setHospitalName] = useState('Apollo Indraprastha Hospital, New Delhi');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserProfile['role']>('Billing Desk Officer');
  const [abdmId, setAbdmId] = useState('IN0710002849');
  const [rememberMe, setRememberMe] = useState(true);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: 'usr-custom-' + Date.now(),
      name: fullName.trim() || (isRegisterMode ? 'New Hospital Staff' : email.split('@')[0] || 'Hospital Clerk'),
      email: email || 'staff@hospital.org',
      hospitalName: hospitalName || 'General Multi-Specialty Hospital',
      role: selectedRole,
      department: selectedRole === 'Billing Desk Officer' ? 'TPA Billing Desk' : 'Hospital Administration',
      shiftBadge: 'Active Shift • Station 1',
    };
    onSignIn(newUser);
    onNavigate('workspace');
  };

  const handleQuickLogin = (demoUser: UserProfile) => {
    onSignIn(demoUser);
    onNavigate('workspace');
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-65px)] flex items-center justify-center p-4 sm:p-6 py-10 selection:bg-blue-600 selection:text-white">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Left Side: Brand Story & Quick Demo Logins (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50/40 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-tight">ClaimShield AI</h1>
                <p className="text-[11px] text-blue-700 font-semibold">Hospital TPA Gatekeeper Portal</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                Zero Rejection Pre-Submission Gatekeeper
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your hospital billing desk to automatic clinical OCR, insurer rule checks, and NHCX FHIR export.
              </p>
            </div>

            {/* Quick 1-Click Demo Profiles */}
            <div className="pt-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                  Instant 1-Click Role Login
                </span>
                <span className="text-[10px] text-blue-600 bg-blue-100/70 px-1.5 py-0.2 rounded font-semibold">
                  Demo Mode
                </span>
              </div>

              <div className="space-y-1.5">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickLogin(acc)}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-blue-100/50 border border-slate-200/90 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 truncate">
                          {acc.name}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                          {acc.role.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{acc.hospitalName}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-blue-200/60 mt-4 text-[11px] text-slate-500 flex items-center justify-between">
            <span>ABDM HFR Compliant</span>
            <span className="font-mono text-[10px] text-blue-700 font-semibold">HL7 FHIR R4 Ready</span>
          </div>
        </div>

        {/* Right Side: Sign In / Registration Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
          {/* Top Mode Switcher */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isRegisterMode
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isRegisterMode
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Register Hospital
              </button>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('workspace')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Skip to Guest Demo →
            </button>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {isRegisterMode ? 'Register Hospital Billing Desk' : 'Sign in to ClaimShield AI'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isRegisterMode
                ? 'Create a unified pre-submission claims workspace for your facility'
                : 'Enter your hospital staff credentials or ABDM Facility ID'}
            </p>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-3.5">
            {/* Full Name & Hospital Name (if registering) */}
            {isRegisterMode && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Staff Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Hospital Facility Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Hospital className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="e.g. Manipal Hospital Bangalore"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email / Staff ID */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Hospital Email or Staff ID <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="billing.desk@hospital.org"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                {!isRegisterMode && (
                  <span className="text-[10px] text-blue-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Staff Department / Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserProfile['role'])}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium cursor-pointer focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Billing Desk Officer">Billing Desk Officer (Intake & Extraction)</option>
                <option value="TPA Desk Manager">TPA Desk Manager (Policy Audits & Overrides)</option>
                <option value="Chief Medical Officer">Chief Medical Officer (Clinical Supervision)</option>
                <option value="Hospital Admin">Hospital Administrator (Full Access)</option>
              </select>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-[11px]">Keep me signed in on this billing terminal</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{isRegisterMode ? 'Complete Hospital Registration' : 'Sign In to Terminal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* ABDM SSO Bridge */}
          <div className="pt-3 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-[11px] font-semibold text-slate-700">
                  Ayushman Bharat ABDM Facility SSO (HFR ID)
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleQuickLogin(DEMO_ACCOUNTS[0])}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                Authorize ABDM →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
