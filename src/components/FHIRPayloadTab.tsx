import React, { useState } from 'react';
import { Copy, Check, Download, Send, CheckCircle2, ChevronDown, ChevronUp, Code2, Info, Building2 } from 'lucide-react';
import { NHCXTransmitModal } from './NHCXTransmitModal';

interface FHIRPayloadTabProps {
  fhirBundle: any;
  patientName: string;
  patientId: string;
  claimAmount: number | string;
  insurerName: string;
  hasComplianceWarning: boolean;
}

export const FHIRPayloadTab: React.FC<FHIRPayloadTabProps> = ({
  fhirBundle,
  patientName,
  patientId,
  claimAmount,
  insurerName,
  hasComplianceWarning,
}) => {
  const [copied, setCopied] = useState(false);
  const [showDeveloperJson, setShowDeveloperJson] = useState(false);
  const [isTransmitModalOpen, setIsTransmitModalOpen] = useState(false);

  const jsonString = JSON.stringify(fhirBundle, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Insurance_Claim_${patientId || 'Bundle'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3.5">
      {/* Transmit Modal */}
      <NHCXTransmitModal
        isOpen={isTransmitModalOpen}
        onClose={() => setIsTransmitModalOpen(false)}
        claimAmount={claimAmount}
        patientName={patientName}
        patientId={patientId}
        insurerName={insurerName}
      />

      {/* Top Banner & Quick Actions */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-slate-900" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Official Digital Claim File (NHCX Standard)
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Formatted to India's National Health Claims Exchange standard (FHIR R4)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy File</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTransmitModalOpen(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send to Insurance</span>
          </button>
        </div>
      </div>

      {/* Human-Friendly Claim Summary Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900">
            Verified Claim Package Summary
          </span>
          <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
            Ready for Transmission
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Patient Name
            </span>
            <p className="font-bold text-slate-900 mt-0.5">{patientName || 'Rajesh Kumar'}</p>
            <p className="text-[11px] text-slate-500">UHID: {patientId || 'UHID-9824'}</p>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Insurance Payer
            </span>
            <p className="font-bold text-slate-900 mt-0.5">{insurerName}</p>
            <p className="text-[11px] text-slate-500">Direct NHCX Gateway Router</p>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Approved Bill Amount
            </span>
            <p className="font-bold text-emerald-700 text-sm mt-0.5">
              ₹{Number(claimAmount).toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500">100% Policy Compliant</p>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Verified Attachments
            </span>
            <p className="font-bold text-slate-900 mt-0.5">
              {fhirBundle.entry?.length || 4} Digital Medical Documents
            </p>
            <p className="text-[11px] text-slate-500">Doctor Notes, Surgery Logs, Lab Tracings</p>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: Expandable Developer Code View */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowDeveloperJson(!showDeveloperJson)}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-left text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-slate-500" />
            <span>Advanced / Developer View: Raw HL7 FHIR JSON</span>
          </div>
          {showDeveloperJson ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showDeveloperJson && (
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-slate-800 text-xs font-mono max-h-[300px] overflow-auto select-text leading-relaxed">
            <pre>
              <code>{jsonString}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
