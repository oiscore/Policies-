import React, { useState, useEffect } from 'react';
import { Cookie, Check, X, Settings, Shield, AlertTriangle, Laptop } from 'lucide-react';
import { CookiePreferences } from '../types';

interface CookieBannerProps {
  onAcceptAll: () => void;
  onDeclineOptional: () => void;
  onOpenPreferences: () => void;
  preferences: CookiePreferences;
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

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onAcceptAll,
  onDeclineOptional,
  onOpenPreferences,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');

  const checkAndShowBanner = () => {
    const isAccepted = localStorage.getItem('fv_cookie_accepted') === 'true';
    if (!isAccepted) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    setDeviceId(getDeviceId());
    checkAndShowBanner();

    // Re-check periodically every 15 seconds if cookies haven't been accepted
    const interval = setInterval(() => {
      const isAccepted = localStorage.getItem('fv_cookie_accepted') === 'true';
      if (!isAccepted) {
        setIsVisible(true);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('fv_cookie_accepted', 'true');
    localStorage.setItem('fv_cookie_consent_choice', 'all');
    setWarningMsg(null);
    onAcceptAll();
    setIsVisible(false);
  };

  const handleDeclineOptional = () => {
    // Show warning and schedule re-popup
    setWarningMsg('You have not accepted cookies! Banner will re-appear in 2 seconds.');
    onDeclineOptional();
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWarningMsg(null);
        checkAndShowBanner();
      }, 1500);
    }, 1000);
  };

  const handleClose = () => {
    setWarningMsg('Cookies not accepted! Banner will re-appear shortly.');
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWarningMsg(null);
        checkAndShowBanner();
      }, 1500);
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-[90] bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-5 space-y-4 font-sans animate-fade-in">
      {warningMsg && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-medium animate-pulse">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{warningMsg}</span>
        </div>
      )}

      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 pr-6">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-slate-900 text-sm">
              We Value Your Privacy & Cookies
            </h4>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              Required Consent
            </span>
            {deviceId && (
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                <Laptop className="w-3 h-3 text-slate-500" />
                {deviceId}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cookie preferences are remembered for this specific device ({deviceId || 'Your Device'}). <strong className="text-slate-800">Please note: Your personal location is NOT detected or tracked</strong> — only your local device settings are saved.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors absolute top-3 right-3"
          title="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={onOpenPreferences}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Settings className="w-3.5 h-3.5 text-slate-500" />
          <span>Cookie Preferences</span>
        </button>

        <button
          onClick={handleDeclineOptional}
          className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
        >
          Essential Only
        </button>

        <button
          onClick={handleAcceptAll}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Accept All Cookies</span>
        </button>
      </div>
    </div>
  );
};

