import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, CheckCircle2, Search, FileCode2 } from 'lucide-react';

interface AuditLoadingStateProps {
  onComplete: () => void;
  insurerName: string;
}

export const AuditLoadingState: React.FC<AuditLoadingStateProps> = ({ onComplete, insurerName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Deciphering Handwritten Doctor Charts & Lab PDFs',
      desc: 'Running Multi-modal Medical OCR and clinical entity segmentation...',
      icon: Cpu,
    },
    {
      title: 'Standardizing ICD-10 (Dx) & CPT-4 (Px) Codes',
      desc: 'Confidence mapping against WHO ICD-10 & AMA CPT taxonomies...',
      icon: Search,
    },
    {
      title: `Auditing Against ${insurerName || 'Insurer'} Policy Matrix`,
      desc: 'Evaluating IRDAI guidelines, room-rent limits, and pre-op diagnostic mandates...',
      icon: ShieldCheck,
    },
    {
      title: 'Synthesizing ABDM / NHCX HL7 FHIR Bundle',
      desc: 'Formatting structured JSON claim payload for instant NHCX gateway dispatch...',
      icon: FileCode2,
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 320);
    const timer2 = setTimeout(() => setCurrentStep(2), 650);
    const timer3 = setTimeout(() => setCurrentStep(3), 1050);
    const timer4 = setTimeout(() => onComplete(), 1350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100));

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center min-h-[420px] text-center">
      {/* Central Radar Pulse */}
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-full bg-sky-50 border-2 border-sky-200 flex items-center justify-center text-sky-600 animate-pulse">
          <ShieldCheck className="w-8 h-8 text-sky-600" />
        </div>
        <div className="absolute -inset-1.5 rounded-full border border-sky-400/40 animate-ping"></div>
      </div>

      <h3 className="text-base font-bold text-slate-900 tracking-tight">
        ClaimShield Offensive AI Gatekeeper
      </h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5">
        Auditing clinical records in real-time before claim reaches the insurer or NHCX switch.
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-slate-100 rounded-full h-2 mb-6 overflow-hidden border border-slate-200">
        <div
          className="bg-blue-600 h-full transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="w-full max-w-md space-y-2.5 text-left">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border text-xs transition-all flex items-start space-x-3 ${
                isCurrent
                  ? 'bg-sky-50/70 border-sky-300 text-slate-900 shadow-2xs ring-1 ring-sky-200'
                  : isDone
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-white/40 border-slate-100 text-slate-400'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <Icon className="w-4 h-4 text-sky-600 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className={`font-semibold ${isCurrent ? 'text-sky-950 font-bold' : ''}`}>
                  {step.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
