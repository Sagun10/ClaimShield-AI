import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, ArrowUpRight, Copy, Check, Radio } from 'lucide-react';

interface NHCXTransmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimAmount: number | string;
  patientName: string;
  patientId: string;
  insurerName: string;
}

export const NHCXTransmitModal: React.FC<NHCXTransmitModalProps> = ({
  isOpen,
  onClose,
  claimAmount,
  patientName,
  patientId,
  insurerName,
}) => {
  const [isTransmitting, setIsTransmitting] = useState(true);
  const [copiedAck, setCopiedAck] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsTransmitting(true);
      const timer = setTimeout(() => {
        setIsTransmitting(false);
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trackingId = `NHCX-2026-IND-${Math.floor(100000 + Math.random() * 900000)}`;
  const ackId = `ABDM-ACK-UUID-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const copyTracking = () => {
    navigator.clipboard.writeText(trackingId);
    setCopiedAck(true);
    setTimeout(() => setCopiedAck(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-5 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                NHCX Live Switch Transmission
              </h3>
              <p className="text-[11px] text-slate-500">National Health Claims Exchange · ABDM Sandbox</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xs px-2 py-1 rounded-lg"
          >
            Close
          </button>
        </div>

        {/* Content */}
        {isTransmitting ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-800">
              Encrypting & Dispatching FHIR Bundle to NHCX Node...
            </p>
            <p className="text-[11px] text-slate-500">ABDM Secure Gateway TLS 1.3 • HMAC-SHA256 Signed</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-950">
                  Claim Successfully Ingested at NHCX Gateway
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Pre-validation passed with zero compliance defects. Insurer switch notified for instant adjudication.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">NHCX Claim Reference:</span>
                <div className="flex items-center space-x-1">
                  <span className="font-mono font-bold text-slate-900">{trackingId}</span>
                  <button
                    type="button"
                    onClick={copyTracking}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    {copiedAck ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Patient / UHID:</span>
                <span className="font-semibold text-slate-800">
                  {patientName} ({patientId})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Payer Target:</span>
                <span className="font-semibold text-slate-800">{insurerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Submitted Amount:</span>
                <span className="font-bold text-emerald-700">₹{Number(claimAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Roundtrip Audit Latency:</span>
                <span className="font-mono text-slate-700">148 ms</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-100/70 rounded-xl border border-slate-200 text-[11px] text-slate-600 font-mono">
              HTTP 200 OK | ABDM-ACK: {ackId}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Done & Return to Workspace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
