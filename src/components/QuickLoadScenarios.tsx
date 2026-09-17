import React from 'react';
import { Sparkles, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ClaimScenario } from '../types';

interface QuickLoadScenariosProps {
  scenarios: ClaimScenario[];
  activeScenarioId: string;
  onSelectScenario: (scenario: ClaimScenario) => void;
  disabled?: boolean;
}

export const QuickLoadScenarios: React.FC<QuickLoadScenariosProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  disabled = false,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-2.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 tracking-wide uppercase">
            Quick-Load Sample Cases
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          Click any preset to test the AI scanner without typing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {scenarios.map((sc) => {
          const isActive = sc.id === activeScenarioId;
          const isHighRisk = sc.riskLevel === 'HIGH_RISK';
          const isLowRisk = sc.riskLevel === 'LOW_RISK';

          return (
            <button
              key={sc.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectScenario(sc)}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs ring-2 ring-slate-900/10'
                  : 'bg-slate-50/70 hover:bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start justify-between gap-1.5 mb-1.5">
                <div className="flex items-center space-x-1.5 min-w-0">
                  {isHighRisk ? (
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isActive ? 'bg-amber-400' : 'bg-amber-500'} animate-pulse`} />
                  ) : isLowRisk ? (
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isActive ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                  ) : (
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isActive ? 'bg-sky-400' : 'bg-sky-500'}`} />
                  )}
                  <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {sc.id === 'scenario-a'
                      ? 'Case 1: Missing ECG (High Risk)'
                      : sc.id === 'scenario-b'
                      ? 'Case 2: Appendectomy (Clean)'
                      : 'Case 3: Knee Surgery (Implant)'}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isActive
                      ? isHighRisk
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-emerald-400 text-slate-950'
                      : isHighRisk
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : isLowRisk
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-sky-50 text-sky-800 border border-sky-200'
                  }`}
                >
                  {isHighRisk ? '⚠️ High Risk' : isLowRisk ? '✅ Clean' : '🔍 Verified'}
                </span>
              </div>

              <div className={`text-[11px] ${isActive ? 'text-slate-300' : 'text-slate-500'} flex items-center justify-between mt-1`}>
                <span className="truncate max-w-[150px]">
                  {sc.patientName} • ₹{sc.claimAmountINR.toLocaleString('en-IN')}
                </span>
                <span className="font-semibold text-[10px]">
                  {sc.insurer === 'star-health'
                    ? 'Star Health'
                    : sc.insurer === 'hdfc-ergo'
                    ? 'HDFC ERGO'
                    : 'Max Bupa'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
