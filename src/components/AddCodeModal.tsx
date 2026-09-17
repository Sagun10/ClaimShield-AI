import React, { useState } from 'react';
import { Plus, X, Tag, Search, Check } from 'lucide-react';
import { ClinicalCode } from '../types';

interface AddCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCode: (newCode: ClinicalCode) => void;
}

const COMMON_CODES: { code: string; type: 'ICD-10' | 'CPT'; desc: string; category: 'Diagnosis' | 'Procedure' }[] = [
  { code: 'K35.80', type: 'ICD-10', desc: 'Unspecified acute appendicitis', category: 'Diagnosis' },
  { code: 'I25.10', type: 'ICD-10', desc: 'Atherosclerotic heart disease (CAD)', category: 'Diagnosis' },
  { code: 'M17.11', type: 'ICD-10', desc: 'Primary osteoarthritis, right knee', category: 'Diagnosis' },
  { code: 'E11.9', type: 'ICD-10', desc: 'Type 2 diabetes mellitus', category: 'Diagnosis' },
  { code: 'I10', type: 'ICD-10', desc: 'Essential (primary) hypertension', category: 'Diagnosis' },
  { code: '44970', type: 'CPT', desc: 'Laparoscopic appendectomy', category: 'Procedure' },
  { code: '27447', type: 'CPT', desc: 'Total knee arthroplasty (TKA)', category: 'Procedure' },
  { code: '92928', type: 'CPT', desc: 'PTCA with coronary stent placement', category: 'Procedure' },
  { code: '47562', type: 'CPT', desc: 'Laparoscopic cholecystectomy', category: 'Procedure' },
];

export const AddCodeModal: React.FC<AddCodeModalProps> = ({
  isOpen,
  onClose,
  onAddCode,
}) => {
  const [codeType, setCodeType] = useState<'ICD-10' | 'CPT'>('ICD-10');
  const [codeVal, setCodeVal] = useState('');
  const [codeDesc, setCodeDesc] = useState('');
  const [clinicalTerm, setClinicalTerm] = useState('');
  const [category, setCategory] = useState<'Diagnosis' | 'Procedure'>('Diagnosis');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof COMMON_CODES[0]) => {
    setCodeType(preset.type);
    setCodeVal(preset.code);
    setCodeDesc(preset.desc);
    setCategory(preset.category);
    setClinicalTerm(preset.desc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeVal.trim() || !codeDesc.trim()) return;

    const newCode: ClinicalCode = {
      id: `code-manual-${Date.now()}`,
      rawClinicalTerm: clinicalTerm.trim() || codeDesc.trim(),
      normalizedCode: codeVal.trim().toUpperCase(),
      codeType,
      description: codeDesc.trim(),
      category,
      confidenceScore: 100,
      extractedFrom: 'Manual User Input',
      clinicalRationale: 'Manually verified and attached by hospital billing specialist.',
    };

    onAddCode(newCode);
    setCodeVal('');
    setCodeDesc('');
    setClinicalTerm('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-5 shadow-2xl space-y-4 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Add Medical Code</h3>
              <p className="text-xs text-slate-500">Attach ICD-10 or CPT code manually</p>
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

        {/* Quick Presets */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
            Common Medical Codes:
          </label>
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
            {COMMON_CODES.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectPreset(c)}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-medium transition-colors cursor-pointer"
              >
                {c.code} ({c.desc.slice(0, 20)}...)
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Code Type
              </label>
              <select
                value={codeType}
                onChange={(e) => {
                  const val = e.target.value as 'ICD-10' | 'CPT';
                  setCodeType(val);
                  setCategory(val === 'ICD-10' ? 'Diagnosis' : 'Procedure');
                }}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="ICD-10">ICD-10 (Diagnosis)</option>
                <option value="CPT">CPT (Procedure)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Standard Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. K35.80"
                value={codeVal}
                onChange={(e) => setCodeVal(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono uppercase focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Medical Description <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Acute appendicitis without perforation"
              value={codeDesc}
              onChange={(e) => setCodeDesc(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!codeVal.trim() || !codeDesc.trim()}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Add Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
