import React, { useState } from 'react';
import { FileText, Plus, X, Sparkles, Stethoscope, Activity, Zap } from 'lucide-react';
import { UploadedDocument } from '../types';

interface AddClinicalNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: UploadedDocument) => void;
}

const PRESET_TEMPLATES = [
  {
    title: 'Cardiac OT Note (Requires Pre-Op ECG)',
    fileName: 'DrSharma_Cardio_OT_Record.pdf',
    type: 'doctor-note' as const,
    content: 'Patient presented with unstable angina, acute coronary syndrome (CAD). Underwent PTCA coronary catheterization with stent. Pre-operative cardiac clearance and blood work evaluated.',
  },
  {
    title: 'Emergency Appendectomy Note',
    fileName: 'Emergency_Surgery_Appy_Chart.pdf',
    type: 'doctor-note' as const,
    content: 'Acute appendicitis with acute RIF pain, tenderness at McBurney point. Laparoscopic appendectomy performed under general anesthesia. Post-op recovery uneventful.',
  },
  {
    title: 'Pre-Operative 12-Lead ECG Report',
    fileName: '12Lead_PreOp_ECG_Tracing.pdf',
    type: 'ecg-trace' as const,
    content: '12-lead ECG tracing: Normal sinus rhythm, HR 78 bpm, normal axis. No ST elevation or acute ischemic changes. Cardiologist surgical fitness clearance granted.',
  },
  {
    title: 'Total Knee Arthroplasty + Implant Sticker',
    fileName: 'TKA_Ortho_Surgery_Barcode.pdf',
    type: 'implant-sticker' as const,
    content: 'Grade IV right knee osteoarthritis. Right Total Knee Arthroplasty (TKA) performed. Stryker Triathlon cruciate-retaining implant attached with manufacturer batch barcode sticker LOT-99824.',
  },
  {
    title: 'General Inpatient Discharge Summary',
    fileName: 'Hospital_Discharge_Summary.pdf',
    type: 'discharge-summary' as const,
    content: 'Patient admitted with Type 2 Diabetes (T2DM) and essential hypertension. Managed with IV hydration, insulin titration, and antihypertensives. Discharge in stable condition.',
  },
];

export const AddClinicalNoteModal: React.FC<AddClinicalNoteModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
}) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedType, setSelectedType] = useState<UploadedDocument['type']>('doctor-note');

  if (!isOpen) return null;

  const handleApplyTemplate = (tmpl: typeof PRESET_TEMPLATES[0]) => {
    setNoteTitle(tmpl.fileName);
    setNoteContent(tmpl.content);
    setSelectedType(tmpl.type);
  };

  const handleSave = () => {
    if (!noteContent.trim()) return;

    const newDoc: UploadedDocument = {
      id: 'doc-note-' + Date.now(),
      name: noteTitle.trim() || 'Clinical_Note_' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '.pdf',
      type: selectedType,
      size: `${(noteContent.length / 50 + 0.4).toFixed(1)} KB`,
      ocrStatus: selectedType === 'doctor-note' ? 'Handwriting Decoded' : 'PDF Extracted',
      previewNote: noteContent,
      timestamp: 'Just now',
    };

    onAddDocument(newDoc);
    setNoteTitle('');
    setNoteContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Add Clinical Note or Report</h3>
              <p className="text-xs text-slate-500">Paste doctor notes, lab findings, or use quick templates</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Templates Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Quick Medical Templates (Optional):</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyTemplate(tmpl)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
              >
                {tmpl.title}
              </button>
            ))}
          </div>
        </div>

        {/* Note Form */}
        <div className="space-y-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Document / Note Title
            </label>
            <input
              type="text"
              placeholder="e.g. Cardiologist_OT_Summary.pdf"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Clinical Text Content / OCR Transcript <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Type or paste doctor round notes, surgical observations, or lab values..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed font-mono"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!noteContent.trim()}
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs ${
              !noteContent.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Attach to Claim</span>
          </button>
        </div>
      </div>
    </div>
  );
};
