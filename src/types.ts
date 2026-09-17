export type InsurerId = 'star-health' | 'hdfc-ergo' | 'care-health' | 'max-bupa' | 'icici-lombard' | 'niva-bupa';

export type AppView = 'landing' | 'workspace' | 'analytics' | 'rules' | 'signin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  hospitalName: string;
  role: 'Billing Desk Officer' | 'TPA Desk Manager' | 'Chief Medical Officer' | 'Hospital Admin';
  department: string;
  avatarUrl?: string;
  shiftBadge: string;
}

export interface Insurer {
  id: InsurerId;
  name: string;
  code: string;
  logoText: string;
  policyPrefix: string;
  commonRuleNote: string;
}

export interface ClinicalCode {
  id: string;
  rawClinicalTerm: string;
  normalizedCode: string;
  codeType: 'ICD-10' | 'CPT' | 'RxNorm' | 'LOINC' | 'SNOMED';
  description: string;
  category: 'Diagnosis' | 'Procedure' | 'Medication' | 'Investigation';
  confidenceScore: number;
  extractedFrom: string;
  clinicalRationale?: string;
}

export interface AuditRuleCheck {
  id: string;
  ruleCode: string;
  ruleTitle: string;
  policyReference: string;
  insurer: string;
  status: 'passed' | 'warning' | 'failed' | 'info';
  severity: 'critical' | 'moderate' | 'low';
  description: string;
  potentialPenaltyINR: number;
  suggestedAction?: string;
  isResolved?: boolean;
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: 'doctor-note' | 'lab-pdf' | 'billing-slip' | 'ecg-trace' | 'radiology' | 'discharge-summary' | 'implant-sticker' | 'ot-notes';
  size: string;
  ocrStatus: 'Indexed' | 'Handwriting Decoded' | 'PDF Extracted' | 'Pending Verification';
  previewNote: string;
  timestamp: string;
}

export interface ClaimRecord {
  id: string;
  title: string;
  patientName: string;
  patientId: string;
  bedNumber: string;
  insurer: InsurerId;
  claimAmountINR: number;
  documents: UploadedDocument[];
  extractedCodes: ClinicalCode[];
  auditChecks: AuditRuleCheck[];
  riskScore: number;
  initialRiskScore: number;
  isResolvedECG?: boolean;
  fhirBundle: any;
  status: 'Ready' | 'Action Required' | 'Protected';
  createdAt: string;
}

export interface ClaimScenario {
  id: string;
  title: string;
  tag: string;
  riskLevel: 'HIGH_RISK' | 'LOW_RISK' | 'MODERATE_RISK';
  patientName: string;
  patientId: string;
  bedNumber: string;
  insurer: InsurerId;
  claimAmountINR: number;
  documents: UploadedDocument[];
  extractedCodes: ClinicalCode[];
  auditChecks: AuditRuleCheck[];
  missingDocumentRequired?: {
    docName: string;
    reason: string;
    policyClause: string;
    nursingStationTarget: string;
  };
  initialRiskScore: number;
  fhirBundle: any;
}
