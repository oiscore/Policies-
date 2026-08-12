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
  Mail,
  X,
  UserX,
  AlertCircle,
  BadgeCheck,
} from 'lucide-react';
import { MANUAL_METADATA } from '../data/legalManualData';

interface FooterProps {
  onOpenCookieModal: () => void;
  onOpenAccessibilityModal: () => void;
  onDownloadFullPDF: () => void;
  onNavigateSection?: (section: string) => void;
  onOpenFractureVerseLink?: (e?: React.MouseEvent) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCookieModal,
  onOpenAccessibilityModal,
  onDownloadFullPDF,
  onNavigateSection,
  onOpenFractureVerseLink,
}) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenFractureVerseLink) {
      onOpenFractureVerseLink(e);
    } else {
      window.open('https://fracture-verse-llc.vercel.app/', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="no-print border-t border-slate-200 bg-white text-slate-700 pt-10 pb-8 mt-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-100">
          {/* Column 1: Brand & Summary */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <a
                href="https://fracture-verse-llc.vercel.app/"
                onClick={handleLinkClick}
                className="font-serif-heading text-lg font-black text-slate-900 uppercase tracking-wide hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{MANUAL_METADATA.companyName}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            <div className="space-y-1">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                Legal & Compliance Information
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-lg">
                This is the official place to find our company’s legal, copyright, trademark, and compliance information. Our business operates under Montana law and follows applicable U.S. federal laws.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] text-slate-400 bg-slate-50 border border-slate-200 p-2.5 rounded-lg max-w-sm">
                <span className="font-semibold text-slate-700">Notice:</span> Policies are live corporate documents subject to change without prior notice.
              </p>
              <a
                href="https://fracture-verse-llc.vercel.app/"
                onClick={handleLinkClick}
                className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border border-slate-800"
              >
                <span>Official Portal Link</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
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
        </div>

        {/* Lower Sub-Footer Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <a
            href="https://fracture-verse-llc.vercel.app/"
            onClick={handleLinkClick}
            className="font-sans font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>©️2026 Fracture-verse LLC all rights reserved</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <div className="flex items-center gap-4 flex-wrap text-slate-600 font-sans">
            <button
              onClick={onOpenCookieModal}
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <Cookie className="w-3.5 h-3.5 text-slate-500" />
              <span>Cookie Preferences</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={onOpenAccessibilityModal}
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <Accessibility className="w-3.5 h-3.5 text-slate-500" />
              <span>ADA Conformance</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

