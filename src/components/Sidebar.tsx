import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  Download,
  Shield,
  BookOpen,
  Film,
  Music,
  Globe,
  Cpu,
  Accessibility,
  Cookie,
  Scale,
  ShoppingBag,
  Clock,
  Tag,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Link as LinkIcon,
  Home,
  Sun,
  Moon,
} from 'lucide-react';
import { Article, DivisionCategory } from '../types';

interface SidebarProps {
  articles: Article[];
  selectedDivision: DivisionCategory;
  onSelectDivision: (division: DivisionCategory) => void;
  selectedArticleId: string;
  onSelectArticle: (articleId: string) => void;
  onDownloadFullPDF: () => void;
  onToggleBookmarks?: () => void;
  showBookmarkedOnly?: boolean;
  bookmarkedCount?: number;
  onOpenSupport?: () => void;
  onOpenPolicyLinksModal?: () => void;
  isSaphiraballInHome?: boolean;
  onCallSaphiraballOut?: () => void;
  onSendSaphiraballHome?: () => void;
  secondsUntilNextCheck?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedDivision,
  onSelectDivision,
  onDownloadFullPDF,
  onToggleBookmarks,
  showBookmarkedOnly = false,
  bookmarkedCount = 0,
  onOpenSupport,
  onOpenPolicyLinksModal,
  isSaphiraballInHome = false,
  onCallSaphiraballOut,
  onSendSaphiraballHome,
  secondsUntilNextCheck = 60,
}) => {
  const divisionsList: { key: DivisionCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'PARENT_GOVERNANCE', label: 'Parent Governance & IP', icon: <Shield className="w-3.5 h-3.5 text-blue-600" /> },
    { key: 'COMICS', label: 'Dreadfracture Comics', icon: <BookOpen className="w-3.5 h-3.5 text-purple-600" /> },
    { key: 'FILMS', label: 'Dreadfracture Films', icon: <Film className="w-3.5 h-3.5 text-emerald-600" /> },
    { key: 'SOUND', label: 'Omega Sound Authority', icon: <Music className="w-3.5 h-3.5 text-amber-600" /> },
    { key: 'FRACTUREPEDIA', label: 'FracturePedia', icon: <Globe className="w-3.5 h-3.5 text-sky-600" /> },
    { key: 'OIS_CORE', label: 'OIS Core Emerald', icon: <Cpu className="w-3.5 h-3.5 text-emerald-600" /> },
    { key: 'ACCESSIBILITY', label: 'ADA Conformance', icon: <Accessibility className="w-3.5 h-3.5 text-blue-600" /> },
    { key: 'COOKIE_PRIVACY', label: 'Cookie & MCDPA Policy', icon: <Cookie className="w-3.5 h-3.5 text-purple-600" /> },
    { key: 'ENFORCEMENT', label: 'Enforcement & Jurisdiction', icon: <Scale className="w-3.5 h-3.5 text-rose-600" /> },
    { key: 'COMMERCE_RETURNS', label: 'Subscriptions & Returns', icon: <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> },
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-4 no-print">
      {/* BRANDING LOGO HEADER */}
      <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm">
        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-xs font-black tracking-wider uppercase font-serif text-blue-400 leading-tight">
            FRACTURE VERSE
          </h2>
        </div>
      </div>

      {/* NAVIGATION SECTION */}
      <div className="space-y-1.5">
        <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 font-mono">
          NAVIGATION
        </h3>
        <nav className="space-y-0.5">
          <button
            onClick={() => onSelectDivision('ALL')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedDivision === 'ALL' && !showBookmarkedOnly
                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className={`w-3.5 h-3.5 ${selectedDivision === 'ALL' && !showBookmarkedOnly ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>All Policies & Articles</span>
            </div>
          </button>
        </nav>
      </div>

      {/* CORPORATE DIVISIONS SECTION */}
      <div className="space-y-1.5">
        <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 font-mono">
          CORPORATE DIVISIONS
        </h3>
        <div className="space-y-0.5">
          {divisionsList.map((div) => {
            const isSelected = selectedDivision === div.key;
            return (
              <button
                key={div.key}
                onClick={() => onSelectDivision(div.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-all text-left ${
                  isSelected
                    ? 'bg-blue-50/80 font-semibold text-blue-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex-shrink-0">{div.icon}</div>
                <span className="truncate">{div.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUICK STATS SECTION */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h3 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 font-mono">
          QUICK STATS
        </h3>
        <div className="space-y-2 px-3 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Last Updated</span>
            </span>
            <span className="font-medium text-slate-700">Aug 9, 2025</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-blue-500" />
              <span>Version</span>
            </span>
            <span className="font-mono text-slate-700">v1.0</span>
          </div>
        </div>
      </div>

      {/* SAPHIRABALL HOME SANCTUARY LOCATION CARD */}
      <div
        id="saphiraball-home-location"
        className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white border border-emerald-500/40 space-y-3 shadow-lg relative overflow-hidden group"
      >
        {/* Ambient Background Glow */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />

        <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-400/60 flex items-center justify-center text-emerald-400 shadow-xs">
              <Home className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-emerald-400 font-mono tracking-tight block text-[11px] uppercase">Saphiraball's Home</span>
              <span className="text-[10px] text-slate-400 font-normal">Sanctuary Station</span>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider ${
              isSaphiraballInHome
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {isSaphiraballInHome ? 'INSIDE HOME 🏡' : 'ON SCREEN 💬'}
          </span>
        </div>

        {/* PHYSICAL HOME LOCATION INTERIOR CHAMBER */}
        <div
          onClick={isSaphiraballInHome ? onCallSaphiraballOut : undefined}
          className={`relative p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
            isSaphiraballInHome
              ? 'bg-gradient-to-r from-slate-950 via-emerald-950/60 to-slate-950 border-emerald-400/60 cursor-pointer hover:border-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]'
              : 'bg-slate-950/80 border-slate-800/80'
          }`}
          title={isSaphiraballInHome ? "Saphiraball is resting inside his home! Click to call him out onto the screen." : "Saphiraball is out on screen!"}
        >
          {/* Saphiraball Ball Character inside Home Chamber */}
          <div
            className={`relative w-11 h-11 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isSaphiraballInHome
                ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-emerald-950 border-emerald-400/90 shadow-[0_0_12px_rgba(16,185,129,0.4)] scale-105'
                : 'bg-slate-900/60 border-slate-800 opacity-50'
            }`}
          >
            {/* Eyes inside Home Chamber: CLOSED when sleeping in home, OPEN when awake */}
            <div className="flex items-center gap-1.5 z-10">
              {isSaphiraballInHome ? (
                /* Closed Sleeping Eyes */
                <>
                  <div className="w-2.5 h-0.5 bg-emerald-300/90 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                  <div className="w-2.5 h-0.5 bg-emerald-300/90 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                </>
              ) : (
                /* Open Awake Eyes */
                <>
                  <div className="w-2.5 h-3 bg-white/60 rounded-full" />
                  <div className="w-2.5 h-3 bg-white/60 rounded-full" />
                </>
              )}
            </div>

            {/* Moving Animated Sleeping 💤 Indicator when inside Home */}
            {isSaphiraballInHome && (
              <div className="absolute -top-2.5 -right-2 flex items-center gap-0.5 pointer-events-none">
                <span className="text-amber-300 font-black text-xs animate-bounce tracking-tighter drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]">
                  💤
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-bold text-slate-200 truncate">
              {isSaphiraballInHome ? 'Inside Home Base' : 'Out on Screen'}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
              <Clock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span>
                {isSaphiraballInHome
                  ? `Egress in ${secondsUntilNextCheck}s`
                  : `Next check in ${secondsUntilNextCheck}s`}
              </span>
            </div>
          </div>
        </div>

        {/* HOME ACTION BUTTONS */}
        {isSaphiraballInHome ? (
          <button
            onClick={onCallSaphiraballOut}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 border border-emerald-400/30 cursor-pointer"
          >
            <Sun className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Summon Saphiraball</span>
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenSupport}
              className="py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ask Help</span>
            </button>
            <button
              onClick={onSendSaphiraballHome}
              className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold text-xs transition-all border border-emerald-500/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Send Home</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
