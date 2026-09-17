import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertTriangle, FileText, BellRing, Sparkles } from 'lucide-react';

interface NursingDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolveAndAttach: () => void;
  patientName: string;
  patientId: string;
  bedNumber: string;
  missingDocTitle: string;
  policyReference: string;
}

export const NursingDeskModal: React.FC<NursingDeskModalProps> = ({
  isOpen,
  onClose,
  onResolveAndAttach,
  patientName,
  patientId,
  bedNumber,
  missingDocTitle,
  policyReference,
}) => {
  const [isSent, setIsSent] = useState(false);
  const [isSimulatingAttachment, setIsSimulatingAttachment] = useState(false);

  if (!isOpen) return null;

  const defaultMessage = `[URGENT CLAIMSHIELD ALERT]
To: Cardio-Thoracic Nursing Station (Floor 4B)
Patient: ${patientName} (${patientId}, Bed: ${bedNumber})
Mandatory Requirement: ${missingDocTitle}
Reason: ${policyReference}
Action: Please upload 12-lead pre-op ECG tracing immediately to unblock NHCX claim submission.`;

  const handleSendNotification = () => {
    setIsSent(true);
  };

  const handleSimulateAttach = () => {
    setIsSimulatingAttachment(true);
    setTimeout(() => {
      onResolveAndAttach();
      onClose();
      setIsSimulatingAttachment(false);
      setIsSent(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-5 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Hospital Nursing Desk Dispatch
              </h3>
              <p className="text-[11px] text-slate-500">Automated pre-submission missing document requisition</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xs px-2 py-1 rounded-lg"
          >
            Cancel
          </button>
        </div>

        {/* Status notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Star Health Policy #402 Gatekeeper Interception</p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Claim amount of ₹84,500 will be denied at NHCX unless {missingDocTitle} is appended.
            </p>
          </div>
        </div>

        {/* Message Payload */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Automated Hospital EMR / WhatsApp Alert Payload:
          </label>
          <textarea
            readOnly
            rows={5}
            value={defaultMessage}
            className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden"
          />
        </div>

        {/* Channel Options */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 border border-slate-200 rounded-xl bg-slate-50 flex items-center space-x-2">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-700 font-medium">Floor 4B Nursing Tablet</span>
          </div>
          <div className="p-2 border border-slate-200 rounded-xl bg-slate-50 flex items-center space-x-2">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-700 font-medium">HIS / EMR Patient Queue</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2 justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50"
          >
            Dismiss
          </button>

          <div className="flex gap-2">
            {!isSent ? (
              <button
                type="button"
                onClick={handleSendNotification}
                className="px-3.5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Alert to Ward 4B</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-3.5 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Alert Dispatched to Ward 4B</span>
              </button>
            )}

            <button
              type="button"
              disabled={isSimulatingAttachment}
              onClick={handleSimulateAttach}
              className="px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isSimulatingAttachment ? 'Attaching 12-Lead ECG...' : 'Attach 12-Lead ECG (Resolve)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
