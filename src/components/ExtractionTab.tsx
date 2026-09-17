import React, { useState } from 'react';
import { Search, Sparkles, Filter, CheckCircle2, Info, Plus, Trash2 } from 'lucide-react';
import { ClinicalCode } from '../types';
import { AddCodeModal } from './AddCodeModal';

interface ExtractionTabProps {
  codes: ClinicalCode[];
  patientName: string;
  onAddCode?: (code: ClinicalCode) => void;
  onRemoveCode?: (codeId: string) => void;
}

export const ExtractionTab: React.FC<ExtractionTabProps> = ({
  codes,
  patientName,
  onAddCode,
  onRemoveCode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = ['All', 'Diagnosis', 'Procedure', 'Medication', 'Investigation'];

  const filteredCodes = codes.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      c.rawClinicalTerm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.normalizedCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-3.5">
      {/* Add Code Modal */}
      {onAddCode && (
        <AddCodeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCode={onAddCode}
        />
      )}

      {/* Plain Language Explainer Box */}
      <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-3 flex items-start justify-between gap-2.5 text-xs text-sky-950">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">What is this step doing?</p>
            <p className="text-[11px] text-sky-800 mt-0.5 leading-relaxed">
              Our AI reads your doctor notes and translates them into official medical billing codes (ICD-10 for diagnosis and CPT for procedures). You can also add or remove codes manually.
            </p>
          </div>
        </div>

        {onAddCode && (
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shrink-0 flex items-center space-x-1 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Code</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search code or disease name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/15 focus:border-slate-900 transition-all"
          />
        </div>
      </div>

      {/* Code List */}
      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
        {filteredCodes.map((code) => {
          const isDx = code.category === 'Diagnosis';
          const isProc = code.category === 'Procedure';

          return (
            <div
              key={code.id}
              className="bg-white border border-slate-200/90 rounded-xl p-3.5 hover:border-slate-300 transition-colors shadow-2xs space-y-1.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isDx
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : isProc
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {code.codeType}: {code.normalizedCode}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {code.category}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-900">
                    {code.description}
                  </h5>

                  {/* Doctor scribble match */}
                  <div className="text-[11px] text-slate-600 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 mt-1">
                    <span className="text-slate-400 font-normal">Found in doctor's note: </span>
                    <span className="font-semibold text-slate-800 italic">"{code.rawClinicalTerm}"</span>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-0.5">
                    <strong className="text-slate-600">Source:</strong> {code.extractedFrom}
                  </p>
                </div>

                <div className="shrink-0 flex items-center space-x-2 self-start">
                  <div className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{code.confidenceScore}%</span>
                  </div>

                  {onRemoveCode && (
                    <button
                      type="button"
                      title="Remove Code"
                      onClick={() => onRemoveCode(code.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredCodes.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400">
            No matching medical codes found. Click "+ Add Code" to attach one.
          </div>
        )}
      </div>
    </div>
  );
};
