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
  Clock,
  Tag,
  CheckCircle2,
  HelpCircle,
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
  onOpenSupport?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedDivision,
  onSelectDivision,
  onDownloadFullPDF,
  onToggleBookmarks,
  onOpenSupport,
}) => {
  const divisionsList: { key: DivisionCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'PARENT_GOVERNANCE', label: 'Parent Governance & IP', icon: <Shield className="w-4 h-4 text-blue-600" /> },
    { key: 'COMICS', label: 'Dreadfracture Comics', icon: <BookOpen className="w-4 h-4 text-purple-600" /> },
    { key: 'FILMS', label: 'Dreadfracture Films', icon: <Film className="w-4 h-4 text-emerald-600" /> },
    { key: 'SOUND', label: 'Omega Sound Authority', icon: <Music className="w-4 h-4 text-amber-600" /> },
    { key: 'FRACTUREPEDIA', label: 'FracturePedia', icon: <Globe className="w-4 h-4 text-sky-600" /> },
    { key: 'OIS_CORE', label: 'OIS Core Emerald', icon: <Cpu className="w-4 h-4 text-emerald-600" /> },
    { key: 'ACCESSIBILITY', label: 'ADA Conformance', icon: <Accessibility className="w-4 h-4 text-blue-600" /> },
    { key: 'COOKIE_PRIVACY', label: 'Cookie & MCDPA Policy', icon: <Cookie className="w-4 h-4 text-purple-600" /> },
    { key: 'ENFORCEMENT', label: 'Enforcement & Jurisdiction', icon: <Scale className="w-4 h-4 text-rose-600" /> },
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-6 no-print">
      {/* NAVIGATION SECTION */}
      <div className="space-y-2">
        <h3 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 font-mono">
          NAVIGATION
        </h3>
        <nav className="space-y-1">
          <button
            onClick={() => onSelectDivision('ALL')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              selectedDivision === 'ALL'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onSelectDivision('ALL')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>All Policies & Articles</span>
          </button>

          <button
            onClick={onToggleBookmarks}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <Bookmark className="w-4 h-4 text-slate-400" />
            <span>Bookmarks</span>
          </button>

          <button
            onClick={onDownloadFullPDF}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export PDF</span>
          </button>
        </nav>
      </div>

      {/* CORPORATE DIVISIONS SECTION */}
      <div className="space-y-2">
        <h3 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 font-mono">
          CORPORATE DIVISIONS
        </h3>
        <div className="space-y-0.5">
          {divisionsList.map((div) => {
            const isSelected = selectedDivision === div.key;
            return (
              <button
                key={div.key}
                onClick={() => onSelectDivision(div.key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs transition-all text-left ${
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
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Total Articles</span>
            </span>
            <span className="font-semibold text-slate-900 font-mono">9</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Total Sections</span>
            </span>
            <span className="font-semibold text-slate-900 font-mono">24</span>
          </div>

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

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Compliance</span>
            </span>
            <span className="font-bold text-emerald-600 font-mono">100%</span>
          </div>
        </div>
      </div>

      {/* NEED HELP CARD */}
      <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Need Help?</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          Contact our legal & compliance support team.
        </p>
        <button
          onClick={onOpenSupport}
          className="w-full py-1.5 px-3 rounded-lg bg-white border border-blue-200 text-blue-600 font-semibold text-xs hover:bg-blue-50 transition-colors shadow-2xs"
        >
          Contact Support
        </button>
      </div>
    </aside>
  );
};
