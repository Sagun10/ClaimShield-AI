import React from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Zap,
  Building2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Database,
  Lock,
  ChevronRight,
  Layers,
  HeartPulse,
  Activity,
  Users,
  Award,
} from 'lucide-react';
import { AppView } from '../types';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  onTryScenario: (scenarioId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onTryScenario,
}) => {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-white pt-10 pb-16 sm:pb-24 border-b border-slate-200/80">
        {/* Soft Background Accents (Light) */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -mt-20"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Pill */}
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>India's 1st NHCX-Ready Hospital AI Claims Gatekeeper</span>
              <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">v2.4 Live</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto mt-6 space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Stop Hospital Claim Rejections <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-emerald-600">
                Before They Reach Insurers.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              ClaimShield AI reads handwritten doctor notes, converts them into normalized ICD-10/CPT codes,
              audits against insurer policy rules, and formats verified FHIR bundles for India's National Health Claims Exchange.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => onNavigate('workspace')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Launch Claims Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('signin')}
                className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-sm font-bold shadow-2xs transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-500" />
                <span>Hospital Staff Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('analytics')}
                className="px-5 py-3.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>View Hospital ROI Stats</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1.8s Instant Scan</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Dark UI Clutter</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>HL7 FHIR R4 NHCX Output</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Policy Protection</span>
              </div>
            </div>
          </div>

          {/* Interactive Preview Card (Light & Crisp) */}
          <div className="mt-12 max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-bold text-slate-800 ml-2">
                  ClaimShield Live Gatekeeper Interceptor
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Ward 4B Connected
                </span>
                <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  NHCX Gateway Ready
                </span>
              </div>
            </div>

            {/* 3 Step Interactive Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700 uppercase tracking-wider text-[10px]">
                    Step 1 • Ingestion
                  </span>
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                </div>
                <p className="font-bold text-slate-900 text-sm">Unstructured OCR Decoding</p>
                <p className="text-slate-600 leading-relaxed">
                  Ingests doctor round charts, emergency notes, surgical logs, and bills with automatic clinical OCR.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px]">
                    Step 2 • Rule Shield
                  </span>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <p className="font-bold text-amber-950 text-sm">Policy Interception</p>
                <p className="text-amber-900 leading-relaxed">
                  Catches missing 12-lead ECGs or unattached implant barcode stickers before submission happens.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                    Step 3 • Gateway
                  </span>
                  <Send className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="font-bold text-emerald-950 text-sm">NHCX Digital Transmission</p>
                <p className="text-emerald-900 leading-relaxed">
                  Generates 100% compliant HL7 FHIR R4 claim bundles with instant electronic transmission.
                </p>
              </div>
            </div>

            {/* Quick Demo Launch Strip */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <HeartPulse className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">
                  Ready to test with a real emergency surgical case?
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onTryScenario('scenario-a');
                  onNavigate('workspace');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <span>Load Live High-Risk Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Impact & ROI Metrics */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Proven Clinical Hospital Impact
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Saving Hours at the Billing Desk & Lakhs in Rejections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-3xl font-extrabold text-blue-600">₹3.50 Cr+</span>
              <p className="text-xs font-bold text-slate-800">Claims Protected</p>
              <p className="text-[11px] text-slate-500">Prevented pre-submission rejection penalties</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-3xl font-extrabold text-emerald-600">98.8%</span>
              <p className="text-xs font-bold text-slate-800">First-Pass Acceptance</p>
              <p className="text-[11px] text-slate-500">Across Star Health, HDFC ERGO & Care</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-3xl font-extrabold text-sky-600">1.8 Sec</span>
              <p className="text-xs font-bold text-slate-800">Average Scan Time</p>
              <p className="text-[11px] text-slate-500">Replacing 45 minutes of manual auditing</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-3xl font-extrabold text-purple-600">14x</span>
              <p className="text-xs font-bold text-slate-800">Direct Billing ROI</p>
              <p className="text-[11px] text-slate-500">Measured across TPA desk operational savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Gatekeeper Modules */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Complete Feature Suite
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built Specifically for Hospital Billing & TPA Desks
            </p>
            <p className="text-sm text-slate-500">
              Eliminate friction between hospital nursing stations, billing clerks, and insurer claim adjudicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Clinical OCR & Handwriting Decoder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingest scanned paper files, handwritten doctor round notes, and multi-page lab PDFs without manual data re-entry.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">ICD-10 & CPT Normalizer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically maps natural doctor diagnosis terms (e.g. "Acute Appendicitis with Perforation") into verified ICD-10 and CPT codes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Pre-Submission Policy Interceptor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scans 42+ insurer policy rules to catch missing surgical fitness ECGs, implant barcode stickers, or itemized bills.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Focused Data-Entry Mode</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distraction-free high-speed input screen for fast-paced hospital shift clerks with full-width patient and file canvases.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">NHCX HL7 FHIR Exporter</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates 100% standard-compliant FHIR R4 claim bundles with one-click electronic gateway transmission.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1-Click Nursing Station Bridge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly generates pre-formatted WhatsApp / Hospital EHR requests to floor nursing stations for missing documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Tier Deployment */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Hospital Deployment Plans
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Flexible for Daycare Centers to 1000-Bed Multi-Specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier 1</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Community Hospital</h3>
                <p className="text-xs text-slate-500">Up to 50 beds • Single billing desk</p>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">₹14,999 <span className="text-xs font-normal text-slate-500">/ month</span></div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>500 claims / month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard 42 Insurer Policy Rules</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NHCX FHIR JSON Export</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('workspace')}
                className="w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Try Free in Workspace
              </button>
            </div>

            {/* Tier 2 - Popular */}
            <div className="p-6 rounded-2xl bg-blue-50/50 border-2 border-blue-400 space-y-4 relative shadow-sm">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Tier 2</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Multi-Specialty Network</h3>
                <p className="text-xs text-slate-500">50 to 300 beds • Multiple TPA desks</p>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">₹39,999 <span className="text-xs font-normal text-slate-500">/ month</span></div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited claims processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Handwriting OCR & OT Notes Extraction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct NHCX Gateway Router Integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ward Nursing Station WhatsApp Bridge</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('workspace')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
              >
                Launch Workspace
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier 3</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Enterprise Healthcare Group</h3>
                <p className="text-xs text-slate-500">300+ beds • Multi-branch hospital chain</p>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">Custom Enterprise</div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>On-premise / Private Cloud deploy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom Insurer Rule Builder</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 Dedicated Clinical Support SLA</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('signin')}
                className="w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Contact Sales / Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="py-14 bg-gradient-to-r from-blue-50 via-sky-50 to-emerald-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Ready to Protect Your Hospital's Claims Today?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Try our live gatekeeper with preloaded clinical scenarios or upload your own doctor notes and lab files.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('workspace')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Start Free in Workspace</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('rules')}
              className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-sm font-bold transition-all cursor-pointer"
            >
              <span>Explore 42 Insurer Rules Library</span>
            </button>
          </div>
        </div>
      </section>

      {/* Clean Light Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              C
            </div>
            <span className="font-bold text-slate-900">ClaimShield AI</span>
            <span>— The Hospital Claims Gatekeeper</span>
          </div>
          <p>© 2026 ClaimShield AI. Built for India National Health Claims Exchange (NHCX) & ABDM Standards.</p>
        </div>
      </footer>
    </div>
  );
};
