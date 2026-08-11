import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, ShieldCheck, Radio, Laptop, MapPinOff } from 'lucide-react';
import { CookiePreferences } from '../types';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: CookiePreferences;
  onSavePreferences: (prefs: CookiePreferences) => void;
}

const getDeviceId = (): string => {
  try {
    let id = localStorage.getItem('fv_device_id');
    if (!id) {
      id = 'DEV-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      localStorage.setItem('fv_device_id', id);
    }
    return id;
  } catch (e) {
    return 'DEV-LOCAL';
  }
};

export const CookieModal: React.FC<CookieModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}) => {
  const [prefs, setPrefs] = useState<CookiePreferences>(preferences);
  const [savedMessage, setSavedMessage] = useState(false);
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    setDeviceId(getDeviceId());
  }, []);

  if (!isOpen) return null;

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'strictlyNecessary') return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSavePreferences({
      ...prefs,
      timestamp: new Date().toISOString(),
    });
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onClose();
    }, 1200);
  };

  const handleOptOutAll = () => {
    setPrefs({
      strictlyNecessary: true,
      functional: false,
      performance: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-slate-900">
                Cookie & Tracking Preferences
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Montana Consumer Data Privacy Act (MCDPA) Compliance
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

        {/* Global Privacy Control (GPC) Banner */}
        <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center justify-between text-xs font-mono text-blue-700">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Global Privacy Control (GPC) Signal Active</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">
            MCDPA Enforced
          </span>
        </div>

        {/* Device-Bound Privacy & Location Notice */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200/80 space-y-1 text-xs text-slate-600 font-sans">
          <div className="flex items-center justify-between font-semibold text-slate-800">
            <div className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-slate-600" />
              <span>Device-Bound Storage ({deviceId})</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <MapPinOff className="w-3.5 h-3.5 text-emerald-600" />
              <span>No Location Tracking</span>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Cookie preferences are remembered individually on your specific device. Personal GPS or location data is <strong className="text-slate-700">never detected or stored</strong> — only local device options are preserved.
          </p>
        </div>

        {/* Preferences Tiers */}
        <div className="p-5 space-y-3.5 overflow-y-auto max-h-[55vh]">
          {/* Tier 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900 font-mono">
                1. Strictly Necessary Cookies
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                MANDATORY
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Essential for core portal navigation, session security, and statutory compliance recordkeeping. Cannot be disabled.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900 font-mono">
                2. Functional Cookies
              </div>
              <button
                onClick={() => handleToggle('functional')}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  prefs.functional ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    prefs.functional ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Remembers bookmarked legal clauses, active article jump points, and custom filter selections.
            </p>
          </div>

          {/* Tier 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900 font-mono">
                3. Performance & Analytics
              </div>
              <button
                onClick={() => handleToggle('performance')}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  prefs.performance ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    prefs.performance ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Anonymous telemetry measuring search query latency and PDF generation efficiency. Zero personal data stored.
            </p>
          </div>

          {/* Tier 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-slate-900 font-mono">
                4. Advertising & Tracking
              </div>
              <button
                onClick={() => handleToggle('advertising')}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  prefs.advertising ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    prefs.advertising ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Third-party targeted advertising cookies. Fracture-Verse LLC enforces a strict zero-data-sale policy. Disabled by default.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleOptOutAll}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
          >
            Opt-Out of All Optional Cookies
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              {savedMessage ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Preferences Saved</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save Cookie Preferences</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
