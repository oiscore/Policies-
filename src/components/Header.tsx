import React from 'react';
import {
  ShieldCheck,
  Search,
  Download,
  Cookie,
  Bookmark,
} from 'lucide-react';
import { MANUAL_METADATA } from '../data/legalManualData';

interface HeaderProps {
  onOpenSearch: () => void;
  onDownloadFullPDF: () => void;
  onOpenCookieModal: () => void;
  onOpenAccessibilityModal?: () => void;
  bookmarkedCount: number;
  onToggleBookmarkedOnly: () => void;
  showBookmarkedOnly: boolean;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onNavigateSection?: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onDownloadFullPDF,
  onOpenCookieModal,
  bookmarkedCount,
  onToggleBookmarkedOnly,
  showBookmarkedOnly,
  searchQuery = '',
  onSearchQueryChange,
  onNavigateSection,
}) => {
  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigateSection && onNavigateSection('top')}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-950 p-0.5 border border-slate-800 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="Fracture Verse Logo"
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="font-serif text-lg font-black tracking-wide text-slate-900 uppercase leading-none mb-0.5">
              {MANUAL_METADATA.companyName}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {MANUAL_METADATA.documentTitle}
            </p>
          </div>
        </div>

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
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={onToggleBookmarkedOnly}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
              showBookmarkedOnly
                ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarkedCount > 0 ? 'text-blue-600 fill-blue-600/20' : 'text-slate-500'}`} />
            <span>Bookmarks</span>
            {bookmarkedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-mono">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Export PDF Button */}
          <button
            onClick={onDownloadFullPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>

          {/* Cookie Icon Button */}
          <button
            onClick={onOpenCookieModal}
            className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Cookie & MCDPA Policy"
          >
            <Cookie className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
