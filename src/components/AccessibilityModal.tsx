import React from 'react';
import { Accessibility, X, CheckCircle2, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { MANUAL_METADATA } from '../data/legalManualData';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-slate-900">
                ADA Title III Accessibility Statement
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                WCAG 2.1 Level AA Compliance Commitment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh] text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-800 font-bold font-mono">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Accessibility Conformance Pledge</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Fracture-Verse LLC is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant Web Content Accessibility Guidelines (WCAG 2.1 Level AA) standards.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider">
              Technical Conformance Measures
            </h4>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>Full keyboard navigation across all portal controls, modals, and search filters.</li>
              <li>Sufficient color contrast meeting WCAG 2.1 AA ratios for enhanced legibility.</li>
              <li>ARIA labels, landmark roles, and live screen reader notifications.</li>
              <li>Responsive typography scaling supporting 200% zoom without horizontal scrolling loss.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider">
              Designated Accessibility Coordinator
            </h4>
            <p className="text-xs text-slate-600">
              If you experience any accessibility barriers while navigating the Fracture-Verse Master Legal & Compliance Portal, please contact our accessibility coordinator:
            </p>
            <div className="pt-1 space-y-1 font-mono text-xs text-blue-700 font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>{MANUAL_METADATA.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Compliance Office — {MANUAL_METADATA.governingJurisdiction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md"
          >
            Acknowledge Statement
          </button>
        </div>
      </div>
    </div>
  );
};
