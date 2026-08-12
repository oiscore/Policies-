import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Cookie,
  Accessibility,
  PlusCircle,
  Lock,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { MANUAL_METADATA } from '../data/legalManualData';

interface HeaderProps {
  onOpenSearch: () => void;
  onDownloadFullPDF: () => void;
  onOpenCookieModal: () => void;
  onOpenAccessibilityModal?: () => void;
  onOpenPolicyLinksModal?: () => void;
  onOpenAddPolicyModal?: () => void;
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
  onOpenFractureVerseLink?: (e?: React.MouseEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onDownloadFullPDF,
  onOpenCookieModal,
  onOpenAccessibilityModal,
  onOpenPolicyLinksModal,
  onOpenAddPolicyModal,
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
  onOpenFractureVerseLink,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <a
          href="https://fracture-verse-llc.vercel.app/"
          onClick={(e) => {
            e.preventDefault();
            if (onOpenFractureVerseLink) onOpenFractureVerseLink(e);
            else window.open('https://fracture-verse-llc.vercel.app/', '_blank', 'noopener,noreferrer');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-blue-700 transition-colors">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-black tracking-wide text-slate-900 uppercase leading-none group-hover:text-blue-600 transition-colors flex items-center gap-1">
              <span>{MANUAL_METADATA.companyName}</span>
            </h1>
          </div>
        </a>

        {/* Hamburger Menu Trigger Button */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 font-bold text-xs shadow-md cursor-pointer border border-slate-700"
            title="Open System Controls Menu"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-emerald-400" />}
            <span className="text-xs font-mono tracking-wider uppercase">Menu</span>
          </button>

          {/* Backdrop Overlay when menu is open */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Dropdown Menu - Drops Down and Opens to the Left */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2.5 w-[320px] sm:w-[360px] bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  System Features & Tools
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Search Bar Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Search System</label>
                <div className="relative group cursor-pointer" onClick={() => { onOpenSearch(); setIsMenuOpen(false); }}>
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    readOnly
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange && onSearchQueryChange(e.target.value)}
                    placeholder="Search policies & sections..."
                    className="w-full pl-9 pr-14 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none cursor-pointer"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
                      ⌘K
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Saphiraball Button */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">AI Assistant</label>
                {isSaphiraballInHome ? (
                  <button
                    onClick={() => { onCallSaphiraballOut?.(); setIsMenuOpen(false); }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-between shadow-sm transition-all border border-emerald-400/40 cursor-pointer"
                    title="Summon Saphiraball Assistant"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-5 h-5 rounded-full bg-slate-950 border border-emerald-400 flex items-center justify-center p-0.5 flex-shrink-0">
                        <div className="flex items-center gap-0.5 z-10">
                          <div className="w-1 h-0.5 bg-emerald-300 rounded-full shadow-[0_0_3px_rgba(52,211,153,0.8)]"></div>
                          <div className="w-1 h-0.5 bg-emerald-300 rounded-full shadow-[0_0_3px_rgba(52,211,153,0.8)]"></div>
                        </div>
                        <span className="absolute -top-1.5 -right-1 text-[10px] animate-bounce font-black text-amber-300 leading-none">
                          💤
                        </span>
                      </div>
                      <span className="font-bold">Saphiraball</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-400/25 text-amber-200 rounded text-[10px] font-mono border border-amber-300/40">
                      Sleeping 💤
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => { onOpenSupport?.(); setIsMenuOpen(false); }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-between shadow-sm transition-all border border-emerald-500/60 cursor-pointer"
                    title="Saphiraball Assistant Active"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center p-0.5 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                        <div className="flex items-center gap-0.5">
                          <div className="w-1 h-2 bg-white rounded-full shadow-[0_0_4px_white]"></div>
                          <div className="w-1 h-2 bg-white rounded-full shadow-[0_0_4px_white]"></div>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-300">Saphiraball</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/25 text-emerald-300 rounded text-[10px] font-mono border border-emerald-400/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Awake
                    </span>
                  </button>
                )}
              </div>

              {/* 3, 4 & 5. Cookie, Accessibility & Restricted Policy Action Buttons */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">System Actions & Portals</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (onOpenFractureVerseLink) onOpenFractureVerseLink(e);
                      else window.open('https://fracture-verse-llc.vercel.app/', '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 hover:bg-slate-800 text-emerald-300 transition-colors flex items-center justify-between text-xs font-bold cursor-pointer"
                    title="Visit Official Fracture-Verse Portal"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Official Portal Link</span>
                    </div>
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">vercel.app</span>
                  </button>

                  <button
                    onClick={() => { onOpenCookieModal(); setIsMenuOpen(false); }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                    title="Cookie & MCDPA Policy"
                  >
                    <Cookie className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Cookie & MCDPA Policy</span>
                  </button>

                  {onOpenAccessibilityModal && (
                    <button
                      onClick={() => { onOpenAccessibilityModal(); setIsMenuOpen(false); }}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                      title="Accessibility & ADA Title III Settings"
                    >
                      <Accessibility className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Accessibility & ADA Title III</span>
                    </button>
                  )}

                  {onOpenAddPolicyModal && (
                    <button
                      onClick={() => { onOpenAddPolicyModal(); setIsMenuOpen(false); }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-between shadow-sm transition-all cursor-pointer border border-blue-400/30"
                      title="Policy Management: Add, Update, or Delete Policies (Passcode Protected)"
                    >
                      <div className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        <span>Restricted</span>
                      </div>
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-mono text-[9px] font-extrabold uppercase">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Admin Gate</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


