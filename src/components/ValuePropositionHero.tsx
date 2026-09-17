import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Zap,
  Activity,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ValuePropositionHeroProps {
  onStartTour: () => void;
  onTryScenario: (scenarioId: string) => void;
  activeScenarioId: string;
}

export const ValuePropositionHero: React.FC<ValuePropositionHeroProps> = ({
  onStartTour,
  onTryScenario,
  activeScenarioId,
}) => {
  return (
    <div className="space-y-3">
      {/* Light Clinical Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-emerald-50/50 border border-blue-200/80 text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xs relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="inline-flex items-center space-x-2 bg-white/90 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Automated Insurance Claims Gatekeeper</span>
            </div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
              Stop Insurance Claim Rejections <br className="hidden sm:inline" />
              <span className="text-blue-700">Before They Ever Leave the Hospital.</span>
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              ClaimShield AI automatically reads doctor notes and lab reports to catch missing files,
              fix code errors, and protect your hospital from costly insurer rejections in under 2 seconds.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onTryScenario('scenario-a')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Try High-Risk Case</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onStartTour}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>How It Works (30-Sec Guide)</span>
              </button>
            </div>
          </div>

          {/* Right: Visual Comparison Card (Light) */}
          <div className="lg:col-span-5 bg-white/90 border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              10-Second Hospital Comparison
            </span>

            {/* Manual Way */}
            <div className="p-2.5 bg-rose-50/60 border border-rose-200 rounded-lg flex items-start space-x-2">
              <div className="w-5 h-5 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-3 h-3" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-rose-900">Manual Billing Process</p>
                <p className="text-[11px] text-rose-700 mt-0.5">
                  6-hour typing delay • 22% claim rejection rate due to missing pre-op reports.
                </p>
              </div>
            </div>

            {/* ClaimShield Way */}
            <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-start space-x-2">
              <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-emerald-950">With ClaimShield AI</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  1.8-second instant check • 1.2% protected rate with automated nursing desk alerts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
