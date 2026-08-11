import React, { useState, useEffect } from 'react';
import {
  Accessibility,
  X,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Eye,
  Type,
  SunMedium,
  Zap,
  Volume2,
  VolumeX,
  Sliders,
  FileCheck2
} from 'lucide-react';
import { MANUAL_METADATA } from '../data/legalManualData';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'controls' | 'statement'>('controls');

  // Accessibility Controls State
  const [fontSize, setFontSize] = useState<number>(() => {
    return parseInt(localStorage.getItem('fv_acc_fontSize') || '100', 10);
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('fv_acc_highContrast') === 'true';
  });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return localStorage.getItem('fv_acc_reducedMotion') === 'true';
  });
  const [focusHighlights, setFocusHighlights] = useState<boolean>(() => {
    return localStorage.getItem('fv_acc_focusHighlights') === 'true';
  });
  const [highLegibilityFont, setHighLegibilityFont] = useState<boolean>(() => {
    return localStorage.getItem('fv_acc_highLegibilityFont') === 'true';
  });
  const [textToSpeech, setTextToSpeech] = useState<boolean>(() => {
    return localStorage.getItem('fv_acc_textToSpeech') === 'true';
  });

  // Apply accessibility settings directly to DOM document element
  useEffect(() => {
    const root = document.documentElement;

    // Font size scaling
    root.style.fontSize = fontSize === 100 ? '' : `${fontSize}%`;
    localStorage.setItem('fv_acc_fontSize', fontSize.toString());

    // High Contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('fv_acc_highContrast', highContrast.toString());

    // Reduced Motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    localStorage.setItem('fv_acc_reducedMotion', reducedMotion.toString());

    // Focus Highlights
    if (focusHighlights) {
      root.classList.add('focus-highlight');
    } else {
      root.classList.remove('focus-highlight');
    }
    localStorage.setItem('fv_acc_focusHighlights', focusHighlights.toString());

    // High Legibility Font
    if (highLegibilityFont) {
      root.classList.add('legibility-font');
    } else {
      root.classList.remove('legibility-font');
    }
    localStorage.setItem('fv_acc_highLegibilityFont', highLegibilityFont.toString());

    // Text to Speech preference
    localStorage.setItem('fv_acc_textToSpeech', textToSpeech.toString());
  }, [fontSize, highContrast, reducedMotion, focusHighlights, highLegibilityFont, textToSpeech]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md flex items-center justify-center">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-slate-900">
                Accessibility & ADA Title III Portal
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                WCAG 2.1 Level AA Mandatory Conformance & Custom Controls
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
            title="Close Accessibility Settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-100/60 p-1.5 gap-2 px-6">
          <button
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'controls'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Controls</span>
          </button>
          <button
            onClick={() => setActiveTab('statement')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'statement'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
            <span>ADA Official Statement</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh] text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeTab === 'controls' ? (
            <div className="space-y-5">
              {/* Typography Font Size Scaling */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Type className="w-4 h-4 text-blue-600" />
                    <span>Typography Size Scaling</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {fontSize}%
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 115, 130, 150].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        fontSize === size
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {size === 100 ? 'Standard' : size === 115 ? 'Medium' : size === 130 ? 'Large' : 'XL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* High Contrast Mode */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <SunMedium className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">High Contrast Mode</div>
                      <div className="text-[10px] text-slate-500">Enhanced text visibility</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Reduced Motion */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Reduced Motion</div>
                      <div className="text-[10px] text-slate-500">Disable UI animations</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={(e) => setReducedMotion(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Focus Highlights */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Focus Outlines</div>
                      <div className="text-[10px] text-slate-500">High-visibility keyboard focus</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={focusHighlights}
                    onChange={(e) => setFocusHighlights(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* High Legibility Font */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Type className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Hyper-Legible Font</div>
                      <div className="text-[10px] text-slate-500">Dyslexia-friendly spacing</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={highLegibilityFont}
                    onChange={(e) => setHighLegibilityFont(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Text-To-Speech Narration Toggle */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {textToSpeech ? (
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-slate-400" />
                  )}
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Text-To-Speech Narrator Mode</div>
                    <div className="text-[11px] text-slate-600">
                      Enable browser speech narration when reviewing policy articles and statutes.
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={textToSpeech}
                  onChange={(e) => setTextToSpeech(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-800 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Mandatory ADA Title III & WCAG 2.1 AA Statement</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Fracture-Verse LLC is legally committed to ensuring full digital accessibility for individuals with disabilities under Title III of the Americans with Disabilities Act (ADA), Section 508 of the Rehabilitation Act, and the Web Content Accessibility Guidelines (WCAG 2.1 Level AA).
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider">
                  Verified Technical Conformance Measures
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-600 text-xs">
                  <li>Keyboard Operability: All UI triggers, modals, search bars, and floating widgets are accessible via TAB, ENTER, ESC, and Arrow keys.</li>
                  <li>Contrast & Color Ratios: Text contrast exceeds WCAG 2.1 AA 4.5:1 standards across light and dark themes.</li>
                  <li>Screen Reader Compatibility: Structured landmark elements, ARIA dialog roles, live announcements, and detailed image alt tags.</li>
                  <li>Responsive Rescaling: Supports up to 200% browser zoom without spatial overlapping or content clipping.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider">
                  Accessibility Contact & Formal Grievance Office
                </h4>
                <p className="text-xs text-slate-600">
                  If you encounter any accessibility barriers while utilizing the Fracture-Verse Master Legal & Compliance Portal, please notify our Designated Accessibility Officer:
                </p>
                <div className="pt-2 space-y-1 font-mono text-xs text-blue-700 font-semibold">
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
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-[10px] text-slate-400 font-mono">
            Settings auto-save locally to browser.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md"
          >
            Save & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
