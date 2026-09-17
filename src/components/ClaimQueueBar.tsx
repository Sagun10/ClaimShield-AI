import React from 'react';
import { Plus, User, AlertTriangle, CheckCircle2, ShieldCheck, Sparkles, FolderKanban } from 'lucide-react';
import { ClaimRecord } from '../types';

interface ClaimQueueBarProps {
  claims: ClaimRecord[];
  activeClaimId: string;
  onSelectClaim: (claimId: string) => void;
  onNewClaim: () => void;
}

export const ClaimQueueBar: React.FC<ClaimQueueBarProps> = ({
  claims,
  activeClaimId,
  onSelectClaim,
  onNewClaim,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-2.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center">
            <FolderKanban className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 tracking-wide uppercase">
            Active Claims Worklist ({claims.length})
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onNewClaim}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Custom Claim</span>
          </button>
        </div>
      </div>

      {/* Claim Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {claims.map((clm) => {
          const isActive = clm.id === activeClaimId;
          const isHighRisk = clm.riskScore > 10 && !clm.isResolvedECG;

          return (
            <button
              key={clm.id}
              type="button"
              onClick={() => onSelectClaim(clm.id)}
              className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'bg-blue-50/90 border-2 border-blue-600 text-slate-900 shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-slate-50/70 hover:bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <div className="flex items-center space-x-1.5 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isHighRisk ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                    }`}
                  />
                  <span className="text-xs font-bold truncate text-slate-900">
                    {clm.patientName || 'Untitled Patient'}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                    isHighRisk
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}
                >
                  {isHighRisk ? 'Action Needed' : 'Protected'}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-between">
                <span className="font-semibold text-slate-800">₹{Number(clm.claimAmountINR).toLocaleString('en-IN')}</span>
                <span className="font-mono text-slate-500">{clm.patientId || 'UHID-New'}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
