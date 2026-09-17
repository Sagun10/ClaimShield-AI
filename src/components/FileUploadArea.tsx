import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Trash2, Eye, Plus, Edit3, CheckCircle2 } from 'lucide-react';
import { UploadedDocument } from '../types';
import { AddClinicalNoteModal } from './AddClinicalNoteModal';

interface FileUploadAreaProps {
  documents: UploadedDocument[];
  onAddDocument: (doc: UploadedDocument) => void;
  onRemoveDocument: (docId: string) => void;
  onUpdateDocument?: (docId: string, updatedText: string) => void;
  disabled?: boolean;
  isFocusedMode?: boolean;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  documents,
  onAddDocument,
  onRemoveDocument,
  onUpdateDocument,
  disabled = false,
  isFocusedMode = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState<UploadedDocument | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingText, setEditingText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || !e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    processFile(e.dataTransfer.files[0]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    processFile(e.target.files[0]);
  };

  const processFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const fileName = file.name;
    const lowerName = fileName.toLowerCase();

    let docType: UploadedDocument['type'] = 'doctor-note';
    let sampleText = `Doctor clinical record: ${fileName} parsed.`;

    if (lowerName.includes('ecg') || lowerName.includes('ekg')) {
      docType = 'ecg-trace';
      sampleText = '12-lead ECG tracing: Normal sinus rhythm, HR 78 bpm, normal axis. No ST changes. Cardiologist fitness clearance noted.';
    } else if (lowerName.includes('lab') || lowerName.includes('cbc') || lowerName.includes('blood')) {
      docType = 'lab-pdf';
      sampleText = 'Laboratory CBC report: TLC 14,800/mcL (Elevated), Neutrophils 82%, Platelets 2.8L/mcL, Serum Creatinine 0.9 mg/dL.';
    } else if (lowerName.includes('implant') || lowerName.includes('barcode') || lowerName.includes('knee')) {
      docType = 'implant-sticker';
      sampleText = 'Implant batch serial barcode sticker: LOT-99824, Cruciate-retaining prosthesis attached to operative record.';
    } else if (lowerName.includes('bill') || lowerName.includes('invoice')) {
      docType = 'billing-slip';
      sampleText = 'Itemized hospital pharmacy & OT consumable billing breakdown.';
    } else {
      sampleText = `Clinical chart: ${fileName}. Patient symptoms, clinical assessment, and prescribed interventions recorded.`;
    }

    const newDoc: UploadedDocument = {
      id: 'doc-user-' + Date.now(),
      name: fileName,
      type: docType,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      ocrStatus: isImage ? 'Handwriting Decoded' : 'PDF Extracted',
      previewNote: sampleText,
      timestamp: 'Just now',
    };
    onAddDocument(newDoc);
  };

  const handleOpenDocModal = (doc: UploadedDocument) => {
    setSelectedPreviewDoc(doc);
    setEditingText(doc.previewNote);
    setIsEditing(false);
  };

  const handleSaveEditedDoc = () => {
    if (selectedPreviewDoc && onUpdateDocument) {
      onUpdateDocument(selectedPreviewDoc.id, editingText);
      setSelectedPreviewDoc({
        ...selectedPreviewDoc,
        previewNote: editingText,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-3">
      <AddClinicalNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onAddDocument={onAddDocument}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          2. Attached Doctor Notes & Lab Reports
        </h3>
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => setIsNoteModalOpen(true)}
            className="text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Note / Template</span>
          </button>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {documents.length} Files Attached
          </span>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl ${
          isFocusedMode ? 'p-4 sm:p-5' : 'p-3'
        } text-center cursor-pointer transition-all flex flex-col sm:flex-row items-center justify-center gap-2 ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-200 hover:border-blue-300 bg-slate-50/40 hover:bg-white'
        } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <UploadCloud className="w-4 h-4" />
        </div>
        <div className="text-center sm:text-left">
          <span className="text-xs font-semibold text-slate-800">
            Drag & drop doctor notes, lab PDFs, or hospital invoices here
          </span>
          <p className="text-[11px] text-slate-400">
            Supports PDF, JPG, PNG with automatic handwriting OCR decoding
          </p>
        </div>
        <span className="text-xs text-blue-600 font-bold underline underline-offset-2 sm:ml-auto">
          Browse Device
        </span>
      </div>

      {/* Document Items List (Spacious Grid in Focused Mode) */}
      <div
        className={`gap-2 ${
          isFocusedMode
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-h-80 overflow-y-auto pr-1'
            : 'space-y-1.5 max-h-48 overflow-y-auto pr-0.5'
        }`}
      >
        {documents.map((doc) => {
          const isHandwritten = doc.ocrStatus === 'Handwriting Decoded';
          return (
            <div
              key={doc.id}
              className={`bg-slate-50/80 hover:bg-white border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between transition-colors shadow-2xs group ${
                isFocusedMode ? 'min-h-[105px]' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    {doc.type === 'doctor-note' ? (
                      <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[160px] sm:max-w-[190px]">
                      {doc.name}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">{doc.size}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    type="button"
                    title="View / Edit OCR Content"
                    onClick={() => handleOpenDocModal(doc)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Remove file"
                    disabled={disabled}
                    onClick={() => onRemoveDocument(doc.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* In Focused Mode, show OCR summary preview snippet directly */}
              {isFocusedMode ? (
                <div className="mt-1 p-1.5 bg-white rounded-lg border border-slate-100 text-[10px] font-mono text-slate-600 line-clamp-2">
                  {doc.previewNote}
                </div>
              ) : null}

              <div className="flex items-center justify-between mt-1 text-[10px]">
                <span
                  className={`font-medium px-1.5 py-0.2 rounded shrink-0 ${
                    isHandwritten
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {doc.ocrStatus}
                </span>
                <span className="text-slate-400">{doc.timestamp}</span>
              </div>
            </div>
          );
        })}

        {documents.length === 0 && (
          <div
            className={`text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-1 ${
              isFocusedMode ? 'col-span-full' : ''
            }`}
          >
            <p className="text-xs text-slate-500 font-medium">No documents attached yet.</p>
            <p className="text-[11px] text-slate-400">Click "+ Add Note / Template" or drag & drop any file above.</p>
          </div>
        )}
      </div>

      {/* Snippet / Editor Modal */}
      {selectedPreviewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 truncate">{selectedPreviewDoc.name}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                {selectedPreviewDoc.ocrStatus}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-slate-700">Clinical OCR Text:</p>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-[11px] text-blue-600 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Text</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  rows={5}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed max-h-48 overflow-y-auto">
                  {selectedPreviewDoc.previewNote}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEditedDoc}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save & Re-Index
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedPreviewDoc(null)}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
