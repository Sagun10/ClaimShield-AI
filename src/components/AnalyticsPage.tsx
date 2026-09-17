import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  AlertTriangle,
  FileCheck,
  Building2,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  IndianRupee,
  Activity,
  PieChart as PieChartIcon,
} from 'lucide-react';
import { AppView } from '../types';

interface AnalyticsPageProps {
  onNavigate: (view: AppView) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('month');
  const [selectedInsurerFilter, setSelectedInsurerFilter] = useState<string>('all');

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-65px)] p-4 sm:p-6 space-y-6 max-w-7xl mx-auto text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Hospital Revenue & Claims Assurance Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit metrics, rejection interception rate, and insurance turnaround SLAs
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                timeRange === 'today' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                timeRange === 'week' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              This Week
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                timeRange === 'month' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              This Month
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('workspace')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Open Live Workspace
          </button>
        </div>
      </div>

      {/* 4 Core Performance KPI Cards (Light) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Billed Claims
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₹1,48,20,000
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
              342 Claims
            </span>
            <span>processed through gatekeeper</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Rejections Prevented
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
            ₹32,45,000
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
              74 Interceptions
            </span>
            <span>fixed prior to submission</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              1st-Pass Pass Rate
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-800">
            98.8%
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="text-sky-700 font-bold bg-sky-50 px-1.5 py-0.2 rounded">
              +24.2%
            </span>
            <span>vs manual hospital audit</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Avg Settlement Time
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-800">
            18 Hours
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded">
              NHCX Express
            </span>
            <span>vs 8 days industry avg</span>
          </div>
        </div>
      </div>

      {/* 2-Column Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Top Missing Document Interceptions (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Top Root-Causes Caught by Pre-Submission Interceptor
              </h2>
              <p className="text-xs text-slate-500">
                Missing clinical attachments flagged before reaching insurers
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              Automated Interception
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Row 1 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">12-Lead Pre-Operative ECG Tracings</span>
                <span className="font-bold text-amber-800">38% (28 claims)</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full w-[38%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">Mandated by Star Health #402 & Care Health for claims &gt; ₹25,000</p>
            </div>

            {/* Row 2 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Prosthesis & Implant Batch Barcode Stickers</span>
                <span className="font-bold text-blue-700">26% (19 claims)</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full w-[26%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">Mandated for orthopedic total knee & hip arthroplasty submissions</p>
            </div>

            {/* Row 3 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Operative OT Doctor Notes & Anaesthesia Logs</span>
                <span className="font-bold text-sky-700">21% (16 claims)</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full w-[21%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">Required by HDFC ERGO and Max Bupa for surgical room tariff authorization</p>
            </div>

            {/* Row 4 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Discharge Summary Doctor Signature & UHID Match</span>
                <span className="font-bold text-emerald-700">15% (11 claims)</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[15%]"></div>
              </div>
              <p className="text-[11px] text-slate-500">IRDAI NHCX compliance for unique digital patient identification</p>
            </div>
          </div>
        </div>

        {/* Right Column: Insurer SLA & Approval Rates (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Payer First-Pass Acceptance</h2>
            <p className="text-xs text-slate-500">Gatekeeper performance across insurance companies</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Star Health & Allied Insurance</p>
                <p className="text-[11px] text-slate-500">142 claims submitted</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-700">98.6%</span>
                <p className="text-[10px] text-slate-400">0 penalties</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Care Health Insurance</p>
                <p className="text-[11px] text-slate-500">96 claims submitted</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-700">99.2%</span>
                <p className="text-[10px] text-slate-400">0 penalties</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">HDFC ERGO General Insurance</p>
                <p className="text-[11px] text-slate-500">68 claims submitted</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-700">97.8%</span>
                <p className="text-[10px] text-slate-400">0 penalties</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Max Bupa (Niva Bupa) & ICICI</p>
                <p className="text-[11px] text-slate-500">36 claims submitted</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-700">99.0%</span>
                <p className="text-[10px] text-slate-400">0 penalties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
