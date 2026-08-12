export type CertificateStatus = 'VALID' | 'REVOKED' | 'EXPIRED' | 'NOT_FOUND' | 'RATE_LIMITED';

export interface RevocationDetails {
  revokedAt: string;
  revokedBy: string;
  reason: string;
}

export interface CertificateRecord {
  id: string;
  holderName: string;
  certificateTitle: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  status: 'VALID' | 'REVOKED' | 'EXPIRED';
  category: string;
  revocationDetails?: RevocationDetails;
  signatureHash: string;
  publicKeyThumbprint: string;
  verificationUrl: string;
}

export interface VerificationResult {
  success: boolean;
  status: CertificateStatus;
  certificate?: CertificateRecord;
  verificationId?: string;
  message?: string;
  verificationResult?: {
    authoritativeDatabaseMatch: boolean;
    digitalSignatureValid: boolean;
    cryptographicAlgorithm: string;
    publicKeyThumbprint: string;
    verifiedAt: string;
    verifiedByNode: string;
  };
  governingAuthority?: string;
  error?: string;
  retryAfterSeconds?: number;
}

export interface AuditLogEvent {
  timestamp: string;
  verificationId: string;
  resultStatus: string;
  clientIpHash: string;
  userAgentSnippet: string;
  signatureValid: boolean;
}

export interface TableRow {
  tier: string;
  function: string;
  consentBasis: string;
}

export interface Section {
  id: string;
  sectionNumber: string;
  title: string;
  content: string;
  bullets?: string[];
  table?: TableRow[];
  statutes?: string[];
}

export interface Article {
  id: string;
  articleNumber: string;
  title: string;
  shortTitle: string;
  category: string;
  division: string;
  iconName: string;
  summary: string;
  sections: Section[];
  scheduledPublishDate?: string;
  isPublished?: boolean;
}

export type DivisionCategory =
  | 'ALL'
  | 'PARENT_GOVERNANCE'
  | 'EMPLOYEE_HANDBOOK'
  | 'CHILD_SAFETY'
  | 'COMICS'
  | 'FILMS'
  | 'SOUND'
  | 'FRACTUREPEDIA'
  | 'OIS_CORE'
  | 'ACCESSIBILITY'
  | 'COOKIE_PRIVACY'
  | 'ENFORCEMENT'
  | 'COMMERCE_RETURNS'
  | 'PAYMENTS_CHARGEBACKS'
  | 'LEGAL_DISCLAIMERS'
  | 'INTERNATIONAL_SHIPPING'
  | 'SHIPPING_DATA_PROTECTION';

export interface SearchFilter {
  query: string;
  division: DivisionCategory;
  statuteFilter?: string;
  bookmarkOnly?: boolean;
}

export interface CookiePreferences {
  strictlyNecessary: boolean;
  functional: boolean;
  performance: boolean;
  advertising: boolean;
  timestamp?: string;
}

export interface AccessibilityReport {
  name: string;
  email: string;
  url: string;
  barrierDescription: string;
  preferredFormat: string;
}

