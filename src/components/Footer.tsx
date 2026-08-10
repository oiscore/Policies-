import React, { useState } from 'react';
import {
  ShieldCheck,
  Scale,
  Send,
  CheckCircle2,
  ExternalLink,
  Lock,
  Accessibility,
  Cookie,
  FileText,
} from 'lucide-react';
import { MANUAL_METADATA } from '../data/legalManualData';

interface FooterProps {
  onOpenCookieModal: () => void;
  onOpenAccessibilityModal: () => void;
  onDownloadFullPDF: () => void;
  onNavigateSection?: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCookieModal,
  onOpenAccessibilityModal,
  onDownloadFullPDF,
  onNavigateSection,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmitNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="no-print border-t border-slate-200 bg-white text-slate-700 pt-10 pb-8 mt-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        {/* Upper Footer Grid (Blueprint 5-column footer block) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-100">
          {/* Column 1: Brand & Summary */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-950 p-0.5 border border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs">
                <img
                  src="/logo.png"
                  alt="Fracture Verse Logo"
                  className="w-full h-full object-cover rounded-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif-heading text-lg font-black text-slate-900 uppercase tracking-wide">
                {MANUAL_METADATA.companyName}
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-sm">
              Official Corporate Legal & Compliance Repository. Governed under the Montana Limited Liability Company Act (Mont. Code Ann. § 35-8) and federal copyright & trademark statutes.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200">
                <Scale className="w-3 h-3 text-blue-600" />
                Mont. Code Ann. § 35-8
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[11px] border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Active Record
              </span>
            </div>
          </div>

          {/* Column 2: Operating Divisions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
              Divisions
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>Dreadfracture Comics</li>
              <li>Dreadfracture Films</li>
              <li>Omega Sound Authority</li>
              <li>FracturePedia Engine</li>
              <li>OIS Core Emerald</li>
            </ul>
          </div>

          {/* Column 3: Statutory Authority */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
              Statutory Basis
            </h4>
            <ul className="space-y-2 text-slate-600 font-mono text-[11px]">
              <li>Mont. Code Ann. § 35-8</li>
              <li>Mont. Code Ann. § 30-14-401</li>
              <li>17 U.S.C. § 101 (Work-for-Hire)</li>
              <li>Montana MCDPA Privacy Act</li>
              <li>ADA Title III (WCAG 2.1 AA)</li>
            </ul>
          </div>

          {/* Column 4: Compliance & Notification Card */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
              Compliance Office
            </h4>
            <p className="text-xs text-slate-500 leading-snug">
              Receive formal compliance updates or file inquiries with the Fracture-Verse legal desk.
            </p>

            <form onSubmit={handleSubmitNotice} className="space-y-2 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="compliance@firm.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-blue-500 shadow-2xs"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Inquiry Registered</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Notice</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Lower Sub-Footer Bar (Blueprint bottom horizontal bar) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 text-slate-500 text-[11px]">
          <div>
            © 2026 {MANUAL_METADATA.companyName}. All Rights Reserved. Master Legal & Compliance Manual.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={onOpenCookieModal}
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Cookie className="w-3 h-3" />
              <span>Cookie Preferences (MCDPA)</span>
            </button>
            <span>•</span>
            <button
              onClick={onOpenAccessibilityModal}
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Accessibility className="w-3 h-3" />
              <span>ADA Conformance</span>
            </button>
            <span>•</span>
            <button
              onClick={onDownloadFullPDF}
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              <span>PDF Export</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
