import React, { useState } from 'react';
import { UploadCloud, Search, ShieldCheck, ArrowRight, CheckCircle2, X, Sparkles } from 'lucide-react';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenarioA: () => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onSelectScenarioA,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: 'Step 1: Upload Doctor Notes & Hospital Bills',
      badge: 'Document Ingestion',
      icon: UploadCloud,
      desc: 'Simply drag and drop scribbled doctor round charts, handwritten prescriptions, or lab PDFs. Our medical AI instantly reads the handwriting and extracts clinical terms.',
      actionNote: 'Try clicking any Demo Scenario at the top to load sample records with one click.',
    },
    {
      title: 'Step 2: AI Scans for Missing Files & Insurance Errors',
      badge: 'Pre-Submission Shield',
      icon: ShieldCheck,
      desc: 'ClaimShield checks your claim against the insurance company’s rules (like Star Health, HDFC ERGO, or Care Health). If a mandatory test like a Pre-Op ECG is missing, it alerts you BEFORE submission.',
      actionNote: 'Click "Auto-Generate Request to Nursing Desk" to get missing files in 1 click.',
    },
    {
      title: 'Step 3: Export Clean, Approved Insurance Files (NHCX)',
      badge: 'Instant Dispatch',
      icon: CheckCircle2,
      desc: 'Your claim is converted into the official National Health Claims Exchange (NHCX) digital format, ready to be sent for instant cashless approval with zero rejection risk.',
      actionNote: 'Download the file or transmit directly to the insurance exchange sandbox.',
    },
  ];

  const stepData = tourSteps[currentStep];
  const StepIcon = stepData.icon;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSelectScenarioA();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">How ClaimShield AI Works</h3>
              <p className="text-xs text-slate-500">3-Step Quick Guide for Hospital Billing Teams</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex items-center space-x-2">
          {tourSteps.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                idx === currentStep
                  ? 'bg-blue-600'
                  : idx < currentStep
                  ? 'bg-emerald-500'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-3 py-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              {stepData.badge}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Step {currentStep + 1} of {tourSteps.length}
            </span>
          </div>

          <h4 className="text-base font-bold text-slate-900">{stepData.title}</h4>

          <p className="text-xs text-slate-600 leading-relaxed">{stepData.desc}</p>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700">
            <strong className="text-slate-900">Pro Tip:</strong> {stepData.actionNote}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              if (currentStep > 0) setCurrentStep(currentStep - 1);
            }}
            disabled={currentStep === 0}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md ${
              currentStep === 0 ? 'text-slate-300' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Back
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 cursor-pointer"
            >
              Skip Tour
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Start High-Risk Demo' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
