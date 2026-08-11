import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Top Accent */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 h-3 w-full" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Icon & Greeting */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Hello & Welcome!
              </h2>
            </div>
          </div>

          {/* Friendly Description */}
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            We're glad you're here. This website is your central place to find our company policies, division guidelines, legal standards, and helpful tools in plain and clear language.
          </p>

          {/* Quick Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Read Articles</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Explore guides for every division.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Fast Search</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Find topics quickly with search.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Ask Saphiraball</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Get answers from our helper orb.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              Search Topics
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Explore Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
