import React from 'react';
import {
  ShieldCheck,
  Search,
  Download,
  Cookie,
  Accessibility,
  Bookmark,
  Link as LinkIcon,
  Sparkles,
  Home,
  Sun,
  Moon,
  Bot,
} from 'lucide-react';
import { MANUAL_METADATA } from '../data/legalManualData';

interface HeaderProps {
  onOpenSearch: () => void;
  onDownloadFullPDF: () => void;
  onOpenCookieModal: () => void;
  onOpenAccessibilityModal?: () => void;
  onOpenPolicyLinksModal?: () => void;
  bookmarkedCount: number;
  onToggleBookmarkedOnly: () => void;
  showBookmarkedOnly: boolean;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onNavigateSection?: (section: string) => void;
  isSaphiraballInHome?: boolean;
  onCallSaphiraballOut?: () => void;
  onSendSaphiraballHome?: () => void;
  onOpenSupport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onDownloadFullPDF,
  onOpenCookieModal,
  onOpenAccessibilityModal,
  onOpenPolicyLinksModal,
  bookmarkedCount,
  onToggleBookmarkedOnly,
  showBookmarkedOnly,
  searchQuery = '',
  onSearchQueryChange,
  onNavigateSection,
  isSaphiraballInHome = false,
  onCallSaphiraballOut,
  onSendSaphiraballHome,
  onOpenSupport,
}) => {
  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <a
          href="https://dfc.onhercules.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-blue-700 transition-colors">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-black tracking-wide text-slate-900 uppercase leading-none group-hover:text-blue-600 transition-colors">
              {MANUAL_METADATA.companyName}
            </h1>
          </div>
        </a>

        {/* Center Search Bar */}
        <div className="relative flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative group cursor-pointer" onClick={onOpenSearch}>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              value={searchQuery}
              onChange={(e) => onSearchQueryChange && onSearchQueryChange(e.target.value)}
              placeholder="Search policies & sections..."
              className="w-full pl-9 pr-14 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-xs focus:outline-none cursor-pointer"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 rounded border border-slate-200">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2">
          {/* SAPHIRABALL HEADLINE STATUS BUTTON */}
          {isSaphiraballInHome ? (
            <button
              onClick={onCallSaphiraballOut}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all border border-emerald-400/40 cursor-pointer group"
              title="Summon Saphiraball Assistant"
            >
              <div className="relative w-5 h-5 rounded-full bg-slate-950 border border-emerald-400 flex items-center justify-center p-0.5 flex-shrink-0">
                {/* Closed Sleeping Eyes */}
                <div className="flex items-center gap-0.5 z-10">
                  <div className="w-1 h-0.5 bg-emerald-300 rounded-full shadow-[0_0_3px_rgba(52,211,153,0.8)]"></div>
                  <div className="w-1 h-0.5 bg-emerald-300 rounded-full shadow-[0_0_3px_rgba(52,211,153,0.8)]"></div>
                </div>
                {/* Moving 💤 indicator */}
                <span className="absolute -top-1.5 -right-1 text-[10px] animate-bounce font-black text-amber-300 leading-none">
                  💤
                </span>
              </div>
              <span className="hidden sm:inline font-bold">Saphiraball</span>
              <span className="px-1.5 py-0.5 bg-amber-400/25 text-amber-200 rounded text-[10px] font-mono border border-amber-300/40 flex items-center gap-1">
                Sleeping 💤
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenSupport}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all border border-emerald-500/60 cursor-pointer"
              title="Saphiraball Assistant Active"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center p-0.5 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                {/* Open Awake Eyes */}
                <div className="flex items-center gap-0.5">
                  <div className="w-1 h-2 bg-white rounded-full shadow-[0_0_4px_white]"></div>
                  <div className="w-1 h-2 bg-white rounded-full shadow-[0_0_4px_white]"></div>
                </div>
              </div>
              <span className="hidden sm:inline font-bold text-emerald-300">Saphiraball</span>
              <span className="px-1.5 py-0.5 bg-emerald-500/25 text-emerald-300 rounded text-[10px] font-mono border border-emerald-400/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Awake
              </span>
            </button>
          )}

          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cookie Icon Button */}
          <button
            onClick={onOpenCookieModal}
            className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Cookie & MCDPA Policy"
          >
            <Cookie className="w-4 h-4" />
          </button>

          {/* Accessibility Icon Button */}
          {onOpenAccessibilityModal && (
            <button
              onClick={onOpenAccessibilityModal}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Accessibility & ADA Title III Settings"
            >
              <Accessibility className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

