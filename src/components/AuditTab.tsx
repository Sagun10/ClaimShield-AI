import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
  Clock,
  Info,
  Plus,
  FileCheck,
} from 'lucide-react';
import { AuditRuleCheck, InsurerId } from '../types';
import { NursingDeskModal } from './NursingDeskModal';

interface AuditTabProps {
  checks: AuditRuleCheck[];
  insurer: InsurerId;
  patientName: string;
  patientId: string;
  bedNumber: string;
  claimAmount: number | string;
  riskScore: number;
  initialRiskScore: number;
  onResolveMissingDoc: () => void;
  isResolvedECG: boolean;
}

export const AuditTab: React.FC<AuditTabProps> = ({
  checks,
  insurer,
  patientName,
  patientId,
  bedNumber,
  claimAmount,
  riskScore,
  initialRiskScore,
  onResolveMissingDoc,
  isResolvedECG,
}) => {
  const [isNursingModalOpen, setIsNursingModalOpen] = useState(false);

  const activeWarnings = checks.filter((c) => c.status === 'warning' && !c.isResolved);
  const hasWarning = activeWarnings.length > 0;
  const primaryWarning = activeWarnings[0];

  return (
    <div className="space-y-3.5">
      {/* Nursing Desk Modal */}
      <NursingDeskModal
        isOpen={isNursingModalOpen}
        onClose={() => setIsNursingModalOpen(false)}
        onResolveAndAttach={() => {
          onResolveMissingDoc();
          setIsNursingModalOpen(false);
        }}
        patientName={patientName}
        patientId={patientId}
        bedNumber={bedNumber}
        missingDocTitle={primaryWarning?.ruleTitle || 'Missing Clinical Document'}
        policyReference={primaryWarning?.policyReference || 'Insurance Compliance Rule'}
      />

      {/* Top Status Banner */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-slate-900" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Pre-Submission Rule Scanner
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Scanned across insurance compliance and missing document mandates
          </p>
        </div>

        {/* Dynamic Risk Gauge */}
        <div>
          {isResolvedECG || !hasWarning ? (
            <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              {initialRiskScore > 10 && (
                <>
                  <span className="text-xs text-slate-400 line-through font-semibold">{initialRiskScore}% Risk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                </>
              )}
              <span className="text-xs font-bold text-emerald-700">1.2% Risk (Safe to Submit)</span>
            </div>
          ) : (
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold text-xs ${
                riskScore > 5
                  ? 'bg-amber-50 border border-amber-300 text-amber-900'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              }`}
            >
              <span>Rejection Risk: {riskScore}%</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                  riskScore > 5 ? 'bg-amber-200 text-amber-950' : 'bg-emerald-200 text-emerald-950'
                }`}
              >
                {riskScore > 5 ? 'High Risk' : 'Protected'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* PROMINENT AMBER INTERCEPTION CARD (Plain Language) */}
      {hasWarning && primaryWarning && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  Missing Report Alert
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded">
                  {primaryWarning.ruleCode}
                </span>
              </div>
              <p className="text-xs text-amber-950 font-bold leading-relaxed">
                {primaryWarning.ruleTitle} for claim of ₹{Number(claimAmount).toLocaleString('en-IN')}.
              </p>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                {primaryWarning.description}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="text-[11px] text-amber-950 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Floor Nursing Station is online</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onResolveMissingDoc}
                className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Attach File Now</span>
              </button>
              <button
                type="button"
                onClick={() => setIsNursingModalOpen(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request from Nursing Desk</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolved Success Note */}
      {(isResolvedECG || (!hasWarning && checks.length > 0)) && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center space-x-2.5 text-xs text-emerald-950">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">Claim is 100% Compliant & Safe!</p>
            <p className="text-[11px] text-emerald-800">
              All mandatory reports, doctor notes, and clinical codes are attached and validated. Ready for one-click NHCX transmission.
            </p>
          </div>
        </div>
      )}

      {/* Compliance Rules List */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {checks.map((chk) => {
          const isPassed = chk.status === 'passed' || chk.isResolved;

          return (
            <div
              key={chk.id}
              className={`p-3 rounded-xl border text-xs transition-colors flex items-start justify-between gap-2.5 ${
                isPassed ? 'bg-white border-slate-200' : 'bg-amber-50/40 border-amber-200'
              }`}
            >
              <div className="flex items-start space-x-2.5">
                <div className="mt-0.5 shrink-0">
                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{chk.ruleTitle}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {chk.ruleCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{chk.description}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  isPassed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {isPassed ? 'Passed' : 'Fix Needed'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
