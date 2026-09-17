import React from 'react';
import { User, Bed, Shield, IndianRupee, HelpCircle, Calendar, Stethoscope, FileText } from 'lucide-react';
import { InsurerId } from '../types';
import { AVAILABLE_INSURERS } from '../data/mockScenarios';

interface PatientFormProps {
  patientName: string;
  patientId: string;
  bedNumber: string;
  insurer: InsurerId;
  claimAmount: number | string;
  onPatientNameChange: (val: string) => void;
  onPatientIdChange: (val: string) => void;
  onBedNumberChange: (val: string) => void;
  onInsurerChange: (val: InsurerId) => void;
  onClaimAmountChange: (val: number | string) => void;
  disabled?: boolean;
  isFocusedMode?: boolean;
  errors?: {
    patientName?: string;
    insurer?: string;
    claimAmount?: string;
  };
}

export const PatientForm: React.FC<PatientFormProps> = ({
  patientName,
  patientId,
  bedNumber,
  insurer,
  claimAmount,
  onPatientNameChange,
  onPatientIdChange,
  onBedNumberChange,
  onInsurerChange,
  onClaimAmountChange,
  disabled = false,
  isFocusedMode = false,
  errors,
}) => {
  const errorObj = errors || {};

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center">
            <User className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            1. Patient & Insurance Details
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {isFocusedMode ? 'Full Data Entry Form (All Fields)' : 'Core Claim Info'}
        </span>
      </div>

      <div
        className={`grid gap-3 ${
          isFocusedMode
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {/* Patient Name */}
        <div className={isFocusedMode ? 'sm:col-span-2' : ''}>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-semibold text-slate-700">
              Patient Full Name <span className="text-rose-500">*</span>
            </label>
          </div>
          <input
            type="text"
            disabled={disabled}
            value={patientName}
            onChange={(e) => onPatientNameChange(e.target.value)}
            placeholder="e.g. Rajesh Kumar"
            className={`w-full px-3 py-2 text-xs bg-slate-50/50 hover:bg-white focus:bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
              errorObj.patientName ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200'
            }`}
          />
          {errorObj.patientName && (
            <p className="text-[10px] text-amber-600 font-medium mt-0.5">
              {errorObj.patientName}
            </p>
          )}
        </div>

        {/* Patient ID (UHID) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Patient ID (UHID) <span className="text-slate-400 font-normal">(Hospital)</span>
          </label>
          <input
            type="text"
            disabled={disabled}
            value={patientId}
            onChange={(e) => onPatientIdChange(e.target.value)}
            placeholder="UHID-2026-9824"
            className="w-full px-2.5 py-2 text-xs bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Bed / Ward */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Ward / Bed Number
          </label>
          <input
            type="text"
            disabled={disabled}
            value={bedNumber}
            onChange={(e) => onBedNumberChange(e.target.value)}
            placeholder="ICU-Bed-08"
            className="w-full px-2.5 py-2 text-xs bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Insurer Dropdown */}
        <div className={isFocusedMode ? 'sm:col-span-2' : ''}>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Insurance Provider <span className="text-rose-500">*</span>
          </label>
          <select
            disabled={disabled}
            value={insurer}
            onChange={(e) => onInsurerChange(e.target.value as InsurerId)}
            className="w-full px-2.5 py-2 text-xs bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {AVAILABLE_INSURERS.map((ins) => (
              <option key={ins.id} value={ins.id}>
                {ins.name} ({ins.code})
              </option>
            ))}
          </select>
        </div>

        {/* Claim Amount */}
        <div className={isFocusedMode ? 'sm:col-span-2' : ''}>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Total Hospital Bill (INR) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-xs font-semibold text-slate-400">
              ₹
            </span>
            <input
              type="number"
              disabled={disabled}
              value={claimAmount}
              onChange={(e) => onClaimAmountChange(e.target.value)}
              placeholder="84500"
              className={`w-full pl-6 pr-2.5 py-2 text-xs font-semibold bg-slate-50/50 hover:bg-white focus:bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errorObj.claimAmount ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200'
              }`}
            />
          </div>
          {errorObj.claimAmount && (
            <p className="text-[10px] text-amber-600 font-medium mt-0.5">
              {errorObj.claimAmount}
            </p>
          )}
        </div>

        {/* Extra Focused Mode Fields for Heavy Data Entry */}
        {isFocusedMode && (
          <>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Admission Type
              </label>
              <select
                disabled={disabled}
                defaultValue="emergency"
                className="w-full px-2.5 py-2 text-xs bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg text-slate-900 font-medium cursor-pointer"
              >
                <option value="emergency">Emergency / Intensive Care</option>
                <option value="planned">Planned / Elective Surgical</option>
                <option value="daycare">Day Care Procedure</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Treating Consultant Doctor
              </label>
              <input
                type="text"
                disabled={disabled}
                placeholder="e.g. Dr. Alok Sharma (Cardiology)"
                defaultValue="Dr. Alok Sharma, MD (Reg: MCI-48201)"
                className="w-full px-2.5 py-2 text-xs bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
