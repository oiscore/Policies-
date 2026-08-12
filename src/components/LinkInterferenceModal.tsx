import React from 'react';
import { AlertTriangle, RefreshCw, X, Flame, ShieldAlert, ExternalLink } from 'lucide-react';

interface LinkInterferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  targetUrl?: string;
  isChecking?: boolean;
}

export const LinkInterferenceModal: React.FC<LinkInterferenceModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  targetUrl = 'https://fracture-verse-llc.vercel.app/',
  isChecking = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-950 text-white rounded-3xl border-2 border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.4)] overflow-hidden font-sans">
        {/* Top Glitch Warning Accent Bar */}
        <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 p-1 text-center font-mono text-[10px] font-black uppercase tracking-widest text-slate-950 flex items-center justify-center gap-2">
          <Flame className="w-3.5 h-3.5 animate-bounce" />
          <span>FRACTURE ANOMALY • LINK INTERFERENCE DETECTED</span>
          <Flame className="w-3.5 h-3.5 animate-bounce" />
        </div>

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between gap-4 border-b border-red-900/50 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] flex-shrink-0 animate-pulse">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-wide font-serif text-red-400 uppercase leading-snug">
                Portal Connection Failure
              </h3>
              <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                <ExternalLink className="w-3 h-3 text-red-400" />
                <span className="truncate max-w-[220px]">{targetUrl}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800"
            title="Dismiss Error"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Exact Mandatory Message */}
        <div className="p-6 space-y-5 bg-slate-950">
          {/* Main Display Box with Mandatory Text */}
          <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/50 shadow-inner space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-ping" />
              <span>System Diagnostic Alert</span>
            </div>
            <p className="text-sm md:text-base font-bold text-red-200 leading-relaxed font-sans">
              the fracture has interfered. Please wait a moment and refresh or check your closet. There might be a fracture in there.  RUN !
            </p>
          </div>

          {/* Technical Diagnostics Detail */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Target Host:</span>
              <span className="text-slate-200">fracture-verse-llc.vercel.app</span>
            </div>
            <div className="flex justify-between">
              <span>Status Code:</span>
              <span className="text-red-400 font-bold">503 INTERFERENCE_UNAVAILABLE</span>
            </div>
            <div className="flex justify-between">
              <span>Anomaly Class:</span>
              <span className="text-amber-400 font-bold">Temporal Dimensional Fracture</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onRetry}
            disabled={isChecking}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-400 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Re-checking Portal...' : 'Retry Connection'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-red-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>RUN !</span>
          </button>
        </div>
      </div>
    </div>
  );
};
