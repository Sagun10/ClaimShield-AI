/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SignInPage } from './components/SignInPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { RulesLibraryPage } from './components/RulesLibraryPage';
import { ValuePropositionHero } from './components/ValuePropositionHero';
import { GuidedTourModal } from './components/GuidedTourModal';
import { ClaimQueueBar } from './components/ClaimQueueBar';
import { PatientForm } from './components/PatientForm';
import { FileUploadArea } from './components/FileUploadArea';
import { ExtractionTab } from './components/ExtractionTab';
import { AuditTab } from './components/AuditTab';
import { FHIRPayloadTab } from './components/FHIRPayloadTab';
import { AuditLoadingState } from './components/AuditLoadingState';
import { FeedbackWidget } from './components/FeedbackWidget';
import { ViewModeToggle } from './components/ViewModeToggle';
import { MOCK_SCENARIOS, AVAILABLE_INSURERS, getInitialClaimRecords } from './data/mockScenarios';
import { ClaimRecord, ClaimScenario, InsurerId, UploadedDocument, AuditRuleCheck, ClinicalCode, AppView, UserProfile } from './types';
import {
  extractClinicalCodesFromText,
  evaluateClaimRules,
  generateFHIRBundle,
} from './utils/clinicalEngine';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Send,
  Sparkles,
  CheckCircle2,
  Plus,
  PenTool,
  Columns2,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // User Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: 'user-demo-1',
    name: 'Dr. Priya Sharma',
    email: 'priya.s@apollo-hospitals.in',
    role: 'Lead Billing Officer',
    hospitalName: 'Apollo Hospitals - Delhi Central',
    shiftBadge: 'Morning Shift · Active',
  });

  // View Mode: 'audit' (Split Analysis View) vs 'focused' (Expanded Data Entry View)
  const [viewMode, setViewMode] = useState<'audit' | 'focused'>('audit');

  // Claim Worklist Queue
  const [claims, setClaims] = useState<ClaimRecord[]>(getInitialClaimRecords());
  const [activeClaimId, setActiveClaimId] = useState<string>(MOCK_SCENARIOS[0].id);

  // Active Claim Form State
  const [patientName, setPatientName] = useState<string>(MOCK_SCENARIOS[0].patientName);
  const [patientId, setPatientId] = useState<string>(MOCK_SCENARIOS[0].patientId);
  const [bedNumber, setBedNumber] = useState<string>(MOCK_SCENARIOS[0].bedNumber);
  const [insurer, setInsurer] = useState<InsurerId>(MOCK_SCENARIOS[0].insurer);
  const [claimAmount, setClaimAmount] = useState<number | string>(MOCK_SCENARIOS[0].claimAmountINR);

  // Documents & Extracted State
  const [documents, setDocuments] = useState<UploadedDocument[]>(MOCK_SCENARIOS[0].documents);
  const [extractedCodes, setExtractedCodes] = useState<ClinicalCode[]>(MOCK_SCENARIOS[0].extractedCodes);
  const [auditChecks, setAuditChecks] = useState<AuditRuleCheck[]>(MOCK_SCENARIOS[0].auditChecks);
  const [fhirBundle, setFhirBundle] = useState<any>(MOCK_SCENARIOS[0].fhirBundle);

  // Risk Score State
  const [riskScore, setRiskScore] = useState<number>(MOCK_SCENARIOS[0].initialRiskScore);
  const [initialRiskScore, setInitialRiskScore] = useState<number>(MOCK_SCENARIOS[0].initialRiskScore);
  const [isResolvedECG, setIsResolvedECG] = useState<boolean>(false);

  // UI Flow State
  const [activeTab, setActiveTab] = useState<'extraction' | 'audit' | 'fhir'>('audit');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ patientName?: string; claimAmount?: string }>({});

  // Helper to load any ClaimRecord into active edit state
  const loadClaim = (clm: ClaimRecord) => {
    setActiveClaimId(clm.id);
    setPatientName(clm.patientName);
    setPatientId(clm.patientId);
    setBedNumber(clm.bedNumber);
    setInsurer(clm.insurer);
    setClaimAmount(clm.claimAmountINR);
    setDocuments(clm.documents);
    setExtractedCodes(clm.extractedCodes);
    setAuditChecks(clm.auditChecks);
    setFhirBundle(clm.fhirBundle);
    setRiskScore(clm.riskScore);
    setInitialRiskScore(clm.initialRiskScore);
    setIsResolvedECG(Boolean(clm.isResolvedECG));
    setFormErrors({});

    if (clm.riskScore > 10 && !clm.isResolvedECG) {
      setActiveTab('audit');
    } else {
      setActiveTab('extraction');
    }
  };

  // Switch Claim via Queue
  const handleSelectClaim = (claimId: string) => {
    const clm = claims.find((c) => c.id === claimId);
    if (clm) {
      loadClaim(clm);
    }
  };

  // Create Brand New Blank Custom Claim
  const handleCreateNewClaim = () => {
    const randomUHID = `UHID-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newClaimId = `claim-custom-${Date.now()}`;

    const defaultDoc: UploadedDocument = {
      id: `doc-${Date.now()}`,
      name: 'Admission_Clinical_Assessment.pdf',
      type: 'doctor-note',
      size: '1.2 MB',
      ocrStatus: 'PDF Extracted',
      previewNote: 'Patient admitted under observation. Vitals recorded. Preliminary diagnosis and treatment chart documented.',
      timestamp: 'Just now',
    };

    const initialCodes = extractClinicalCodesFromText(defaultDoc.previewNote, [defaultDoc]);
    const evaluation = evaluateClaimRules('star-health', 35000, [defaultDoc], initialCodes, 'New Patient', randomUHID);
    const bundle = generateFHIRBundle('New Patient', randomUHID, 35000, 'star-health', initialCodes, [defaultDoc]);

    const newRecord: ClaimRecord = {
      id: newClaimId,
      title: 'Custom Patient Claim',
      patientName: '',
      patientId: randomUHID,
      bedNumber: 'Ward-101',
      insurer: 'star-health',
      claimAmountINR: 35000,
      documents: [defaultDoc],
      extractedCodes: initialCodes,
      auditChecks: evaluation.checks,
      riskScore: evaluation.riskScore,
      initialRiskScore: evaluation.riskScore,
      isResolvedECG: false,
      fhirBundle: bundle,
      status: 'Action Required',
      createdAt: 'Just now',
    };

    setClaims((prev) => [newRecord, ...prev]);
    loadClaim(newRecord);
    setActiveTab('audit');
  };

  // Load Preset Scenario
  const handleSelectScenario = (scenario: ClaimScenario) => {
    const existing = claims.find((c) => c.id === scenario.id);
    if (existing) {
      loadClaim(existing);
    } else {
      const record: ClaimRecord = {
        id: scenario.id,
        title: scenario.title,
        patientName: scenario.patientName,
        patientId: scenario.patientId,
        bedNumber: scenario.bedNumber,
        insurer: scenario.insurer,
        claimAmountINR: scenario.claimAmountINR,
        documents: scenario.documents,
        extractedCodes: scenario.extractedCodes,
        auditChecks: scenario.auditChecks,
        riskScore: scenario.initialRiskScore,
        initialRiskScore: scenario.initialRiskScore,
        isResolvedECG: false,
        fhirBundle: scenario.fhirBundle,
        status: scenario.riskLevel === 'HIGH_RISK' ? 'Action Required' : 'Protected',
        createdAt: 'Shift Today',
      };
      setClaims((prev) => [record, ...prev]);
      loadClaim(record);
    }
  };

  const handleSelectScenarioById = (scenarioId: string) => {
    const sc = MOCK_SCENARIOS.find((s) => s.id === scenarioId) || MOCK_SCENARIOS[0];
    handleSelectScenario(sc);
  };

  const handleSelectScenarioFromLanding = (scenarioId: string) => {
    handleSelectScenarioById(scenarioId);
    setCurrentView('workspace');
  };

  // Trigger Dynamic Clinical Scan
  const handleRunAudit = () => {
    const errors: { patientName?: string; claimAmount?: string } = {};
    if (!patientName.trim()) {
      errors.patientName = 'Please enter patient full name.';
    }
    if (!claimAmount || Number(claimAmount) <= 0) {
      errors.claimAmount = 'Please enter valid hospital bill amount.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsAuditing(true);
  };

  // Run audit and immediately switch to Audit View (for Focused Mode)
  const handleRunAuditAndSwitchView = () => {
    handleRunAudit();
    setViewMode('audit');
  };

  // Audit Finished: Evaluate rules dynamically
  const handleAuditComplete = () => {
    setIsAuditing(false);

    const combinedText = documents.map((d) => `${d.name} ${d.previewNote}`).join(' ');
    const autoCodes = extractClinicalCodesFromText(combinedText, documents);

    // Merge custom codes user might have added
    const existingManualCodes = extractedCodes.filter((c) => c.extractedFrom === 'Manual User Input');
    const mergedCodes = [...autoCodes, ...existingManualCodes];
    setExtractedCodes(mergedCodes);

    const numericAmount = Number(claimAmount) || 0;
    const evaluation = evaluateClaimRules(insurer, numericAmount, documents, mergedCodes, patientName, patientId);

    setAuditChecks(evaluation.checks);
    setRiskScore(evaluation.riskScore);
    setInitialRiskScore(evaluation.riskScore);

    const bundle = generateFHIRBundle(patientName, patientId, numericAmount, insurer, mergedCodes, documents);
    setFhirBundle(bundle);

    // Update claim in queue
    setClaims((prev) =>
      prev.map((c) =>
        c.id === activeClaimId
          ? {
              ...c,
              patientName,
              patientId,
              bedNumber,
              insurer,
              claimAmountINR: numericAmount,
              documents,
              extractedCodes: mergedCodes,
              auditChecks: evaluation.checks,
              riskScore: evaluation.riskScore,
              initialRiskScore: evaluation.riskScore,
              fhirBundle: bundle,
              status: evaluation.hasWarning ? 'Action Required' : 'Protected',
            }
          : c
      )
    );
  };

  // Handle Missing Doc Resolution
  const handleResolveMissingDoc = () => {
    setIsResolvedECG(true);
    setRiskScore(1.2);

    const resolvedDoc: UploadedDocument = {
      id: 'doc-resolved-' + Date.now(),
      name: 'PreOp_12Lead_ECG_Cardiologist_Clearance.pdf',
      type: 'ecg-trace',
      size: '1.4 MB',
      ocrStatus: 'PDF Extracted',
      previewNote: '12-lead ECG tracing: Sinus rhythm, HR 76 bpm, normal axis. Cardiologist surgical fitness clearance signed.',
      timestamp: 'Just now (Ward 4B)',
    };

    const newDocs = [resolvedDoc, ...documents];
    setDocuments(newDocs);

    const updatedChecks = auditChecks.map((chk) => {
      if (chk.ruleCode === 'SHI-POL-402' || chk.ruleCode === 'CHI-POL-319') {
        return {
          ...chk,
          status: 'passed' as const,
          isResolved: true,
          description: 'Document verified and attached. Insurer policy mandate satisfied.',
          potentialPenaltyINR: 0,
        };
      }
      return chk;
    });

    setAuditChecks(updatedChecks);

    setClaims((prev) =>
      prev.map((c) =>
        c.id === activeClaimId
          ? {
              ...c,
              documents: newDocs,
              auditChecks: updatedChecks,
              riskScore: 1.2,
              isResolvedECG: true,
              status: 'Protected',
            }
          : c
      )
    );
  };

  // Document Handlers
  const handleAddDocument = (newDoc: UploadedDocument) => {
    const updatedDocs = [newDoc, ...documents];
    setDocuments(updatedDocs);
  };

  const handleRemoveDocument = (docId: string) => {
    const updatedDocs = documents.filter((d) => d.id !== docId);
    setDocuments(updatedDocs);
  };

  const handleUpdateDocumentText = (docId: string, newText: string) => {
    const updatedDocs = documents.map((d) => (d.id === docId ? { ...d, previewNote: newText } : d));
    setDocuments(updatedDocs);
  };

  // Code Handlers
  const handleAddCustomCode = (newCode: ClinicalCode) => {
    setExtractedCodes((prev) => [newCode, ...prev]);
  };

  const handleRemoveCode = (codeId: string) => {
    setExtractedCodes((prev) => prev.filter((c) => c.id !== codeId));
  };

  const handleSignIn = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('workspace');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const selectedInsurerObj = AVAILABLE_INSURERS.find((i) => i.id === insurer);
  const hasComplianceWarning = auditChecks.some((c) => c.status === 'warning' && !c.isResolved);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* View Switcher Routing */}
      {currentView === 'landing' && (
        <LandingPage
          onNavigate={setCurrentView}
          onSelectScenario={handleSelectScenarioFromLanding}
        />
      )}

      {currentView === 'signin' && (
        <SignInPage
          onSignIn={handleSignIn}
          onNavigate={setCurrentView}
        />
      )}

      {currentView === 'analytics' && (
        <AnalyticsPage
          onNavigateToWorkspace={() => setCurrentView('workspace')}
        />
      )}

      {currentView === 'rules' && (
        <RulesLibraryPage
          onNavigateToWorkspace={() => setCurrentView('workspace')}
        />
      )}

      {currentView === 'workspace' && (
        <>
          {/* Guided Tour Modal */}
          <GuidedTourModal
            isOpen={isTourOpen}
            onClose={() => setIsTourOpen(false)}
            onSelectScenarioA={() => handleSelectScenarioById('scenario-a')}
          />

          {/* Main Workspace Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 space-y-4">
            {/* Above-the-Fold Value Proposition & 10-Second Comparison */}
            <ValuePropositionHero
              onStartTour={() => setIsTourOpen(true)}
              onTryScenario={handleSelectScenarioById}
              activeScenarioId={activeClaimId}
            />

            {/* Claim Worklist Queue (Manage Real Claims & Add Custom) */}
            <ClaimQueueBar
              claims={claims}
              activeClaimId={activeClaimId}
              onSelectClaim={handleSelectClaim}
              onNewClaim={handleCreateNewClaim}
            />

            {/* ======================================================== */}
            {/* MODE 1: FOCUSED MODE (Expanded Single-Screen Data Entry) */}
            {/* ======================================================== */}
            {viewMode === 'focused' ? (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6 animate-in fade-in duration-200">
                {/* Focused Mode Banner Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <PenTool className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-sm sm:text-base font-bold text-slate-900">
                          Focused Data Entry Canvas
                        </h2>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Distraction Free
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Secondary analysis panels hidden for high-speed patient intake and multi-file ingestion
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewMode('audit')}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    <span>Switch to Audit View</span>
                  </button>
                </div>

                {/* Expanded Patient Form */}
                <PatientForm
                  patientName={patientName}
                  patientId={patientId}
                  bedNumber={bedNumber}
                  insurer={insurer}
                  claimAmount={claimAmount}
                  onPatientNameChange={setPatientName}
                  onPatientIdChange={setPatientId}
                  onBedNumberChange={setBedNumber}
                  onInsurerChange={setInsurer}
                  onClaimAmountChange={setClaimAmount}
                  disabled={isAuditing}
                  isFocusedMode={true}
                  errors={formErrors}
                />

                {/* Expanded Document Ingestion Area */}
                <div className="border-t border-slate-100 pt-5">
                  <FileUploadArea
                    documents={documents}
                    onAddDocument={handleAddDocument}
                    onRemoveDocument={handleRemoveDocument}
                    onUpdateDocument={handleUpdateDocumentText}
                    disabled={isAuditing}
                    isFocusedMode={true}
                  />
                </div>

                {/* Sticky Bottom Action Bar for Focused Mode */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>{documents.length}</strong> clinical document{documents.length !== 1 ? 's' : ''} attached • Ready for instant AI compliance scan
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setViewMode('audit')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Analysis Tabs
                    </button>

                    <button
                      type="button"
                      onClick={handleRunAuditAndSwitchView}
                      disabled={isAuditing}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
                    >
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>Scan Claim & Open Audit View</span>
                      <ArrowRight className="w-4 h-4 text-blue-200" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* MODE 2: AUDIT VIEW (2-Column Split Workspace)            */
              /* ======================================================== */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start animate-in fade-in duration-200">
                
                {/* LEFT COLUMN: Patient & Document Input Panel (5 Cols) */}
                <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
                  <PatientForm
                    patientName={patientName}
                    patientId={patientId}
                    bedNumber={bedNumber}
                    insurer={insurer}
                    claimAmount={claimAmount}
                    onPatientNameChange={setPatientName}
                    onPatientIdChange={setPatientId}
                    onBedNumberChange={setBedNumber}
                    onInsurerChange={setInsurer}
                    onClaimAmountChange={setClaimAmount}
                    disabled={isAuditing}
                    errors={formErrors}
                  />

                  <div className="border-t border-slate-100 pt-3.5">
                    <FileUploadArea
                      documents={documents}
                      onAddDocument={handleAddDocument}
                      onRemoveDocument={handleRemoveDocument}
                      onUpdateDocument={handleUpdateDocumentText}
                      disabled={isAuditing}
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleRunAudit}
                      disabled={isAuditing}
                      className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
                    >
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>Scan Claim for Errors & Missing Reports</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-1.5 font-medium">
                      Audits against {selectedInsurerObj?.name || 'Insurance'} rules in ~1.8 seconds
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: Medical Codes, Scanner & NHCX (7 Cols) */}
                <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4 min-h-[520px]">
                  {/* Plain Language Tab Bar */}
                  <div className="flex items-center space-x-1 bg-slate-100/90 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setActiveTab('extraction')}
                      className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                        activeTab === 'extraction'
                          ? 'bg-white text-blue-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="truncate">1. Medical Codes</span>
                      <span className="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded-full font-semibold">
                        {extractedCodes.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('audit')}
                      className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer relative ${
                        activeTab === 'audit'
                          ? 'bg-white text-blue-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="truncate">2. Error Scanner</span>
                      {hasComplianceWarning && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('fhir')}
                      className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                        activeTab === 'fhir'
                          ? 'bg-white text-blue-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="truncate">3. Insurance File</span>
                    </button>
                  </div>

                  {/* Tab Body */}
                  <div>
                    {isAuditing ? (
                      <AuditLoadingState
                        insurerName={selectedInsurerObj?.name || 'Insurer'}
                        onComplete={handleAuditComplete}
                      />
                    ) : (
                      <>
                        {activeTab === 'extraction' && (
                          <ExtractionTab
                            codes={extractedCodes}
                            patientName={patientName}
                            onAddCode={handleAddCustomCode}
                            onRemoveCode={handleRemoveCode}
                          />
                        )}

                        {activeTab === 'audit' && (
                          <AuditTab
                            checks={auditChecks}
                            insurer={insurer}
                            patientName={patientName}
                            patientId={patientId}
                            bedNumber={bedNumber}
                            claimAmount={claimAmount}
                            riskScore={riskScore}
                            initialRiskScore={initialRiskScore}
                            onResolveMissingDoc={handleResolveMissingDoc}
                            isResolvedECG={isResolvedECG}
                          />
                        )}

                        {activeTab === 'fhir' && (
                          <FHIRPayloadTab
                            fhirBundle={fhirBundle}
                            patientName={patientName}
                            patientId={patientId}
                            claimAmount={claimAmount}
                            insurerName={selectedInsurerObj?.name || 'Insurer'}
                            hasComplianceWarning={hasComplianceWarning}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* Continuous Feedback Loop Widget */}
            <FeedbackWidget />
          </main>
        </>
      )}
    </div>
  );
}
