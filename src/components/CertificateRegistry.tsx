import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertOctagon,
  Clock,
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Key,
  Shield,
  RefreshCw
} from 'lucide-react';
import { CertificateRecord, CertificateStatus } from '../types';

interface CertificateRegistryProps {
  onSelectCertificate: (id: string) => void;
  refreshKey?: number;
}

export function CertificateRegistry({ onSelectCertificate }: CertificateRegistryProps) {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VALID' | 'REVOKED' | 'EXPIRED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/certificates');
      const data = await res.json();
      if (data.success && Array.isArray(data.certificates)) {
        setCertificates(data.certificates);
      }
    } catch (err) {
      console.error('Failed to load certificates registry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const filtered = certificates.filter((cert) => {
    const matchesStatus = statusFilter === 'ALL' || cert.status === statusFilter;
    const matchesQuery =
      searchQuery.trim() === '' ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.holderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const validCount = certificates.filter((c) => c.status === 'VALID').length;
  const revokedCount = certificates.filter((c) => c.status === 'REVOKED').length;
  const expiredCount = certificates.filter((c) => c.status === 'EXPIRED').length;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* Directory Title & Controls */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Authoritative Certificate Public Registry
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse official active, revoked, and expired credentials maintained in our authoritative database.
            </p>
          </div>

          <button
            onClick={fetchCertificates}
            disabled={isLoading}
            className="self-start md:self-auto px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Directory</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records ({certificates.length})
            </button>
            <button
              onClick={() => setStatusFilter('VALID')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                statusFilter === 'VALID'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Valid ({validCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('REVOKED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                statusFilter === 'REVOKED'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Revoked ({revokedCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('EXPIRED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                statusFilter === 'EXPIRED'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Expired ({expiredCount})</span>
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search holder or ID..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </div>

      {/* Registry Grid */}
      <div className="p-6">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-xs">Querying Authoritative Database...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs">
            No certificate records found matching the specified filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((cert) => (
              <div
                key={cert.id}
                className={`p-4 rounded-xl border transition-all hover:shadow-md flex flex-col justify-between gap-3 ${
                  cert.status === 'VALID'
                    ? 'bg-white border-slate-200 hover:border-emerald-300'
                    : cert.status === 'REVOKED'
                    ? 'bg-rose-50/30 border-rose-200 hover:border-rose-400'
                    : 'bg-amber-50/30 border-amber-200 hover:border-amber-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-xs text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {cert.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        cert.status === 'VALID'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : cert.status === 'REVOKED'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {cert.status === 'VALID' && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                      {cert.status === 'REVOKED' && <AlertOctagon className="w-3 h-3 text-rose-600" />}
                      {cert.status === 'EXPIRED' && <Clock className="w-3 h-3 text-amber-600" />}
                      <span>{cert.status}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mt-2 line-clamp-1">
                    {cert.certificateTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Holder: <strong className="text-slate-800">{cert.holderName}</strong>
                  </p>
                  <p className="text-[11px] text-blue-700 font-medium mt-1">
                    Category: {cert.category}
                  </p>

                  {cert.status === 'REVOKED' && cert.revocationDetails && (
                    <div className="mt-2 text-[11px] bg-rose-100/60 p-2 rounded-lg text-rose-900 border border-rose-200">
                      <strong>Revoked:</strong> {cert.revocationDetails.reason}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Issued: {cert.issueDate}</span>
                  <button
                    onClick={() => onSelectCertificate(cert.id)}
                    className="text-blue-600 hover:text-blue-800 font-sans font-semibold text-xs flex items-center gap-1"
                  >
                    <span>Verify Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
