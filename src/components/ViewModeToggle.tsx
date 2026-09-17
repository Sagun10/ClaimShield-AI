import React from 'react';
import { Columns2, Maximize2, Sparkles, ShieldCheck, PenTool } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'audit' | 'focused';
  onViewModeChange: (mode: 'audit' | 'focused') => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="inline-flex items-center bg-slate-200/80 p-1 rounded-xl shadow-2xs border border-slate-300/70">
      <button
        type="button"
        onClick={() => onViewModeChange('audit')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
          viewMode === 'audit'
            ? 'bg-white text-slate-900 shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
        }`}
      >
        <Columns2 className="w-3.5 h-3.5 text-slate-600" />
        <span>Audit View (Split)</span>
      </button>

      <button
        type="button"
        onClick={() => onViewModeChange('focused')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
          viewMode === 'focused'
            ? 'bg-blue-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
        }`}
      >
        <PenTool className="w-3.5 h-3.5" />
        <span>Focused Mode (Data Entry)</span>
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
            viewMode === 'focused' ? 'bg-blue-700 text-white' : 'bg-slate-300/80 text-slate-700'
          }`}
        >
          Expanded
        </span>
      </button>
    </div>
  );
};
