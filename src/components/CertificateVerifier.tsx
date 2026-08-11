import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertOctagon,
  Clock,
  HelpCircle,
  QrCode,
  Search,
  Copy,
  Check,
  Download,
  Lock,
  Key,
  Database,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  FileCheck
} from 'lucide-react';
import { CertificateRecord, VerificationResult, CertificateStatus } from '../types';
import { generateVerificationPDF } from '../utils/pdfGenerator';

interface CertificateVerifierProps {
  onVerifySuccess?: (cert: CertificateRecord) => void;
  onOpenAdminPortal: () => void;
  onOpenMandateChecklist: () => void;
}

export function CertificateVerifier({
  onOpenAdminPortal,
  onOpenMandateChecklist
}: CertificateVerifierProps) {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);

  const handleVerify = async (queryToVerify?: string) => {
    const targetId = (queryToVerify || inputQuery).trim().toUpperCase();
    if (!targetId) return;

    setIsLoading(true);
    setVerificationResult(null);

    try {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(targetId)}`);
      const data: VerificationResult = await res.json();
      setVerificationResult(data);
    } catch (err) {
      setVerificationResult({
        success: false,
        status: 'NOT_FOUND',
        verificationId: targetId,
        message: 'Network or server verification endpoint failure. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!verificationResult?.certificate?.id) return;
    const url = `${window.location.origin}/verify/${verificationResult.certificate.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const sampleIds = [
    { id: 'CERT-FV-2026-89A4B2', label: 'VALID: Fracture-Verse Corporate', status: 'VALID' },
    { id: 'CERT-ISO-2026-99C1E4', label: 'VALID: ISO 27001 ISMS', status: 'VALID' },
    { id: 'CERT-OLD-2025-0012A', label: 'REVOKED: Legacy Vendor', status: 'REVOKED' },
    { id: 'CERT-EXP-2024-9910B', label: 'EXPIRED: 2024 Studio Safety', status: 'EXPIRED' },
    { id: 'CERT-UNKNOWN-9999', label: 'NOT FOUND: Invalid ID', status: 'NOT_FOUND' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-blue-300 uppercase">
                  Authoritative Verification Engine
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DATABASE CONNECTED
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Official Certificate & Credential Lookup
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMandateChecklist}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>Mandate Checklist</span>
            </button>
            <button
              onClick={onOpenAdminPortal}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Verify authentic certificates issued by Fracture-Verse LLC Trust Authority. Every record is retrieved directly from our protected authoritative database and verified using server-side HMAC-SHA256 digital signatures.
        </p>

        {/* Input Form */}
        <div className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter Verification ID (e.g. CERT-FV-2026-89A4B2)..."
                className="w-full pl-11 pr-12 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/80 font-mono"
              />
              <button
                type="button"
                onClick={() => setIsQrScannerOpen(!isQrScannerOpen)}
                title="Scan Certificate QR Code"
                className="absolute right-3 top-2.5 p-1.5 text-slate-400 hover:text-blue-300 rounded-lg hover:bg-slate-700/60 transition-colors"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying DB...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Record</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Sample Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Quick Test Samples:</span>
            {sampleIds.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  setInputQuery(sample.id);
                  handleVerify(sample.id);
                }}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  sample.status === 'VALID'
                    ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/60'
                    : sample.status === 'REVOKED'
                    ? 'bg-rose-950/40 border-rose-700/50 text-rose-300 hover:bg-rose-900/60'
                    : sample.status === 'EXPIRED'
                    ? 'bg-amber-950/40 border-amber-700/50 text-amber-300 hover:bg-amber-900/60'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* QR Scanner Simulation Banner */}
        {isQrScannerOpen && (
          <div className="mt-4 p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <QrCode className="w-6 h-6 text-blue-400 shrink-0 animate-pulse" />
              <div>
                <p className="font-semibold text-white">QR Code Optical Verifier Ready</p>
                <p className="text-slate-400 text-[11px]">Point camera at physical certificate QR code or click a sample ID above to test scanner.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setInputQuery('CERT-FV-2026-89A4B2');
                handleVerify('CERT-FV-2026-89A4B2');
                setIsQrScannerOpen(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs whitespace-nowrap"
            >
              Simulate QR Scan (CERT-FV-2026-89A4B2)
            </button>
          </div>
        )}
      </div>

      {/* Verification Results Panel */}
      {verificationResult && (
        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
          {verificationResult.status === 'VALID' && verificationResult.certificate && (
            <div className="space-y-6">
              {/* Valid Status Header */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500 text-white shadow-md shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs uppercase tracking-wider">
                        VALID CERTIFICATE
                      </span>
                      <span className="text-xs font-mono font-medium text-emerald-800">
                        ID: {verificationResult.certificate.id}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-emerald-950 mt-1">
                      {verificationResult.certificate.certificateTitle}
                    </h2>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Issued to: <strong className="text-emerald-950">{verificationResult.certificate.holderName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100/50 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-700" />}
                    <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
                  </button>

                  <button
                    onClick={() => generateVerificationPDF(verificationResult.certificate!)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Receipt</span>
                  </button>
                </div>
              </div>

              {/* Certificate Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span>Authoritative Record Info</span>
                  </h3>
                  <div className="text-xs space-y-1.5 pt-1">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="text-slate-500">Issuer Authority:</span>
                      <span className="font-medium text-slate-900">{verificationResult.certificate.issuer}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="text-slate-500">Category:</span>
                      <span className="font-semibold text-blue-700">{verificationResult.certificate.category}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="text-slate-500">Issue Date:</span>
                      <span className="font-mono text-slate-800">{verificationResult.certificate.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expiration Date:</span>
                      <span className="font-mono text-slate-800 font-semibold">{verificationResult.certificate.expirationDate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Key className="w-4 h-4 text-emerald-600" />
                    <span>Cryptographic Security Proof</span>
                  </h3>
                  <div className="text-xs space-y-1.5 pt-1 font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px] font-sans">HMAC-SHA256 Digital Signature:</span>
                      <span className="text-[11px] text-slate-800 break-all bg-slate-100 p-1.5 rounded-md block mt-0.5 border border-slate-200">
                        {verificationResult.certificate.signatureHash}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 text-[11px] font-sans">
                      <span className="text-slate-500">Public Key Fingerprint:</span>
                      <span className="font-mono font-medium text-slate-800">{verificationResult.certificate.publicKeyThumbprint}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Verification Guarantee Footer */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-semibold">Authoritative Database Guarantee</p>
                  <p className="text-blue-800 text-[11px] mt-0.5">
                    This certificate status was queried live from the Fracture-Verse authoritative backend database. Cryptographic digital signatures match active signing keys.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* REVOKED Status Header */}
          {verificationResult.status === 'REVOKED' && verificationResult.certificate && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-rose-600 text-white shadow-md shrink-0">
                    <AlertOctagon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-700 text-white font-mono font-bold text-xs uppercase tracking-wider">
                        REVOKED CERTIFICATE
                      </span>
                      <span className="text-xs font-mono font-medium text-rose-900">
                        ID: {verificationResult.certificate.id}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-rose-950 mt-1">
                      {verificationResult.certificate.certificateTitle}
                    </h2>
                    <p className="text-xs text-rose-800 mt-0.5">
                      Holder: <strong className="text-rose-950">{verificationResult.certificate.holderName}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => generateVerificationPDF(verificationResult.certificate!)}
                  className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Revocation Notice</span>
                </button>
              </div>

              {/* Revocation Details Box */}
              <div className="bg-white p-5 rounded-xl border border-rose-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Official Revocation Audit Log</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-rose-50/70 p-3 rounded-lg border border-rose-100">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Revoked On:</span>
                    <span className="font-mono font-semibold text-rose-900">
                      {verificationResult.certificate.revocationDetails?.revokedAt || '2026-01-15'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Revoked By:</span>
                    <span className="font-semibold text-slate-800">
                      {verificationResult.certificate.revocationDetails?.revokedBy || 'Compliance Authority'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-xs font-medium block">Documented Reason for Revocation:</span>
                  <p className="text-xs text-rose-900 bg-white p-2.5 rounded-lg border border-rose-200 mt-1 font-medium">
                    "{verificationResult.certificate.revocationDetails?.reason || 'Certificate revoked by administrative authority.'}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* EXPIRED Status */}
          {verificationResult.status === 'EXPIRED' && verificationResult.certificate && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500 text-white shadow-md shrink-0">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-mono font-bold text-xs uppercase tracking-wider">
                      EXPIRED CERTIFICATE
                    </span>
                    <span className="text-xs font-mono font-medium text-amber-900">
                      ID: {verificationResult.certificate.id}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-amber-950 mt-1">
                    {verificationResult.certificate.certificateTitle}
                  </h2>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Expired on <strong className="font-mono">{verificationResult.certificate.expirationDate}</strong>. Re-issuance and audit required.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* NOT FOUND Status */}
          {verificationResult.status === 'NOT_FOUND' && (
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-300 text-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-600 text-white shadow-md shrink-0">
                <HelpCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-white font-mono font-bold text-xs uppercase tracking-wider">
                  RECORD NOT FOUND
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  Verification ID "{verificationResult.verificationId || inputQuery}"
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  No matching record exists in the authoritative database. Warning: Unrecognized certificates should be treated as unauthorized or forged.
                </p>
              </div>
            </div>
          )}

          {/* RATE LIMITED Status */}
          {verificationResult.status === 'RATE_LIMITED' && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-600 text-white shrink-0">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-700 text-white font-mono font-bold text-xs uppercase tracking-wider">
                  RATE LIMIT ENFORCED
                </span>
                <p className="text-sm font-bold text-amber-950 mt-1">
                  Verification Request Threshold Exceeded
                </p>
                <p className="text-xs text-amber-800 mt-1">
                  {verificationResult.error || 'Rate limiting protects the authoritative database from automated scraping and abuse.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
