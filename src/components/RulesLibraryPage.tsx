import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Building2,
  FileText,
} from 'lucide-react';
import { AppView } from '../types';

interface RulesLibraryPageProps {
  onNavigate: (view: AppView) => void;
}

interface RuleItem {
  id: string;
  code: string;
  title: string;
  insurer: string;
  category: string;
  description: string;
  clause: string;
  penaltyINR: number;
  mandatoryFiles: string[];
}

const POLICY_RULES: RuleItem[] = [
  {
    id: 'r-1',
    code: 'SHI-POL-402',
    title: 'Mandatory 12-Lead Pre-Operative ECG Tracing',
    insurer: 'Star Health & Allied Insurance',
    category: 'Cardiology & Surgical Fitness',
    description: 'Requires a calibrated 12-lead ECG signed by a consulting cardiologist for all surgical or inpatient claims exceeding ₹25,000.',
    clause: 'Star Health Policy Guideline Section 4.2 (Surgical Protocol 2024)',
    penaltyINR: 84500,
    mandatoryFiles: ['PreOp_12Lead_ECG.pdf', 'Cardiologist_Clearance_Note.pdf'],
  },
  {
    id: 'r-2',
    code: 'CHI-POL-319',
    title: 'Prosthesis & Implant Batch Barcode Verification',
    insurer: 'Care Health Insurance',
    category: 'Orthopedics & Joint Replacement',
    description: 'Implant serial barcode sticker must be affixed to the operative record with batch lot number matching the itemized hospital invoice.',
    clause: 'Care Health MedCheck Mandate 3.19 (Implant Consumables)',
    penaltyINR: 185000,
    mandatoryFiles: ['Implant_Sticker_Barcode.jpg', 'OT_Notes.pdf'],
  },
  {
    id: 'r-3',
    code: 'HDFC-POL-108',
    title: 'Pre-Authorization Token & Daily Round Log Validation',
    insurer: 'HDFC ERGO General Insurance',
    category: 'Inpatient & Room Rent',
    description: 'Emergency admission intimation token must be submitted within 24 hours with daily physician round vital charts attached.',
    clause: 'HDFC ERGO Cashless Guidelines Clause 1.08',
    penaltyINR: 62000,
    mandatoryFiles: ['PreAuth_Token_Copy.pdf', 'Physician_Round_Chart.pdf'],
  },
  {
    id: 'r-4',
    code: 'MB-POL-504',
    title: 'Pharmacy Itemized Consumables Breakdown Limit',
    insurer: 'Max Bupa (Niva Bupa)',
    category: 'Pharmacy & Consumables',
    description: 'All non-payable consumable items (gloves, PPE, swabs) must be tagged with IRDAI standard non-payable item codes.',
    clause: 'Niva Bupa Medical Tariff Annexure 5.04',
    penaltyINR: 35000,
    mandatoryFiles: ['Itemized_Pharmacy_Bill.pdf'],
  },
  {
    id: 'r-5',
    code: 'IRDAI-NHCX-01',
    title: 'ABDM Ayushman Bharat UHID Linkage Mandate',
    insurer: 'IRDAI & National Health Authority (NHA)',
    category: 'Digital Identification & NHCX',
    description: 'Patient 14-digit ABHA ID or Hospital Unique Health Identification (UHID) must be encoded in the HL7 FHIR Patient resource.',
    clause: 'National Health Claims Exchange Technical Specification v1.2',
    penaltyINR: 0,
    mandatoryFiles: ['ABHA_Card_Or_UHID_Slip.pdf'],
  },
  {
    id: 'r-6',
    code: 'ICICI-POL-221',
    title: 'Histopathology & Biopsy Report Attachment for Oncology',
    insurer: 'ICICI Lombard Health',
    category: 'Oncology & Pathology',
    description: 'Any biopsy, excision, or oncological surgery claim must attach the certified pathologist report matching the ICD-10 morphology code.',
    clause: 'ICICI Lombard Oncology Protocol 2.21',
    penaltyINR: 120000,
    mandatoryFiles: ['Biopsy_Pathology_Report.pdf'],
  },
];

export const RulesLibraryPage: React.FC<RulesLibraryPageProps> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRules = POLICY_RULES.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.insurer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || r.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-65px)] p-4 sm:p-6 space-y-6 max-w-7xl mx-auto text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Insurance Policy Compliance Rules Library
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Directory of active validation rules automatically enforced by ClaimShield AI across Indian TPAs
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('workspace')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Test in Claims Workspace</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rule name, code (e.g. SHI-POL-402) or insurer..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Cardiology', 'Orthopedics', 'Inpatient', 'Pharmacy', 'Digital'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid (Light Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:border-blue-300 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {rule.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{rule.insurer}</span>
                </div>
                {rule.penaltyINR > 0 && (
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                    Max Risk: ₹{rule.penaltyINR.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900">{rule.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{rule.description}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="text-[11px] text-slate-400 font-mono truncate">
                Clause: {rule.clause}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {rule.mandatoryFiles.map((file, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span>{file}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
