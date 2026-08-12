import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  Film,
  Music,
  Globe,
  Cpu,
  Accessibility,
  Cookie,
  Scale,
  ShoppingBag,
  CreditCard,
  ShieldAlert,
  ShieldCheck,
  Users,
  HeartHandshake,
  LayoutGrid,
  List,
  ChevronRight,
  FileText,
  ChevronDown,
  Link as LinkIcon,
  Check,
  Copy,
} from 'lucide-react';
import { DivisionCategory, Article } from '../types';
import { MANUAL_METADATA } from '../data/legalManualData';

interface ArticleViewProps {
  articles: Article[];
  selectedArticleId: string;
  selectedDivision?: DivisionCategory;
  bookmarkedSections: Set<string>;
  onToggleBookmarkSection: (sectionId: string) => void;
  showBookmarkedOnly: boolean;
  searchQuery: string;
  onOpenArticleReader?: (article: Article) => void;
  onClearDivisionFilter?: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  articles,
  selectedDivision = 'ALL',
  showBookmarkedOnly,
  searchQuery,
  onOpenArticleReader,
  onClearDivisionFilter,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'order' | 'title' | 'sections'>('order');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);

  const handleCopyDirectLink = async (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const url = `${origin}#${articleId}`;
    let success = false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        success = false;
      }
    }

    setCopiedId(articleId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDivisionIconBox = (division: string) => {
    switch (division) {
      case 'PARENT_GOVERNANCE':
        return {
          icon: <Building2 className="w-5 h-5 text-blue-600" />,
          bg: 'bg-blue-50/80 border-blue-100',
          textColor: 'text-blue-600',
        };
      case 'EMPLOYEE_HANDBOOK':
        return {
          icon: <Users className="w-5 h-5 text-indigo-600" />,
          bg: 'bg-indigo-50/80 border-indigo-100',
          textColor: 'text-indigo-600',
        };
      case 'CHILD_SAFETY':
        return {
          icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
          bg: 'bg-rose-50/80 border-rose-100',
          textColor: 'text-rose-600',
        };
      case 'COMICS':
        return {
          icon: <BookOpen className="w-5 h-5 text-purple-600" />,
          bg: 'bg-purple-50/80 border-purple-100',
          textColor: 'text-purple-600',
        };
      case 'FILMS':
        return {
          icon: <Film className="w-5 h-5 text-rose-600" />,
          bg: 'bg-rose-50/80 border-rose-100',
          textColor: 'text-rose-600',
        };
      case 'SOUND':
        return {
          icon: <Music className="w-5 h-5 text-amber-600" />,
          bg: 'bg-amber-50/80 border-amber-100',
          textColor: 'text-amber-600',
        };
      case 'FRACTUREPEDIA':
        return {
          icon: <Globe className="w-5 h-5 text-sky-600" />,
          bg: 'bg-sky-50/80 border-sky-100',
          textColor: 'text-sky-600',
        };
      case 'OIS_CORE':
        return {
          icon: <Cpu className="w-5 h-5 text-emerald-600" />,
          bg: 'bg-emerald-50/80 border-emerald-100',
          textColor: 'text-emerald-600',
        };
      case 'ACCESSIBILITY':
        return {
          icon: <Accessibility className="w-5 h-5 text-blue-600" />,
          bg: 'bg-blue-50/80 border-blue-100',
          textColor: 'text-blue-600',
        };
      case 'COOKIE_PRIVACY':
        return {
          icon: <Cookie className="w-5 h-5 text-amber-600" />,
          bg: 'bg-amber-50/80 border-amber-100',
          textColor: 'text-amber-600',
        };
      case 'ENFORCEMENT':
        return {
          icon: <Scale className="w-5 h-5 text-slate-700" />,
          bg: 'bg-slate-100/80 border-slate-200',
          textColor: 'text-slate-700',
        };
      case 'COMMERCE_RETURNS':
        return {
          icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />,
          bg: 'bg-emerald-50/80 border-emerald-100',
          textColor: 'text-emerald-600',
        };
      case 'PAYMENTS_CHARGEBACKS':
        return {
          icon: <CreditCard className="w-5 h-5 text-blue-600" />,
          bg: 'bg-blue-50/80 border-blue-100',
          textColor: 'text-blue-600',
        };
      case 'LEGAL_DISCLAIMERS':
        return {
          icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
          bg: 'bg-amber-50/80 border-amber-100',
          textColor: 'text-amber-600',
        };
      case 'INTERNATIONAL_SHIPPING':
        return {
          icon: <Globe className="w-5 h-5 text-indigo-600" />,
          bg: 'bg-indigo-50/80 border-indigo-100',
          textColor: 'text-indigo-600',
        };
      case 'SHIPPING_DATA_PROTECTION':
        return {
          icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
          bg: 'bg-teal-50/80 border-teal-100',
          textColor: 'text-teal-600',
        };
      default:
        return {
          icon: <FileText className="w-5 h-5 text-blue-600" />,
          bg: 'bg-blue-50/80 border-blue-100',
          textColor: 'text-blue-600',
        };
    }
  };

  const renderHighlightedText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-amber-900 rounded px-1 font-medium">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Filter & Sort Articles
  let processedArticles = articles.filter((art) => {
    if (selectedDivision && selectedDivision !== 'ALL') {
      return art.division === selectedDivision;
    }
    return true;
  });

  if (sortBy === 'title') {
    processedArticles = [...processedArticles].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'sections') {
    processedArticles = [...processedArticles].sort((a, b) => b.sections.length - a.sections.length);
  }

  return (
    <div className="space-y-8">
      {/* SECTION HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-serif">
            Corporate Legal Articles
          </h2>
          {selectedDivision !== 'ALL' && onClearDivisionFilter && (
            <button
              onClick={onClearDivisionFilter}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* CONTROLS RIGHT */}
        <div className="flex items-center gap-2">
          {/* SORT DROPDOWN */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
            >
              <option value="order">Sort by: Article Order</option>
              <option value="title">Sort by: Title</option>
              <option value="sections">Sort by: Sections Count</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* VIEW MODE TOGGLE */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 9 ARTICLES GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedArticles.map((article) => {
            const style = getDivisionIconBox(article.division);

            return (
              <div
                key={article.id}
                id={article.id}
                onClick={() => onOpenArticleReader && onOpenArticleReader(article)}
                className="bg-white border border-slate-200/90 rounded-xl p-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-3 group scroll-mt-24"
              >
                <div className="space-y-2.5">
                  {/* Article Header & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {article.articleNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">
                      Effective: {MANUAL_METADATA.effectiveDate}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${style.bg}`}>
                      {style.icon}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {renderHighlightedText(article.title)}
                    </h3>
                  </div>

                  {/* Compact Summary Text */}
                  <p className="text-xs text-slate-500 leading-normal font-normal line-clamp-2">
                    {renderHighlightedText(article.summary)}
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 font-medium">
                    <FileText className="w-3 h-3 text-slate-400" />
                    <span>{article.sections.length} Sections</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* COMPACT LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white border border-slate-200/90 rounded-xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {processedArticles.map((article) => {
            const style = getDivisionIconBox(article.division);
            return (
              <div
                key={article.id}
                id={article.id}
                onClick={() => onOpenArticleReader && onOpenArticleReader(article)}
                className="p-3.5 hover:bg-blue-50/40 transition-colors cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${style.bg}`}>
                    {style.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
                        {article.articleNumber}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {renderHighlightedText(article.title)}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {renderHighlightedText(article.summary)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 text-xs text-slate-400">
                  <span className="hidden sm:inline text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {article.sections.length} Sec
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* COLLAPSIBLE ARTICLES INDEX TABLE */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-serif">
              Articles Index
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold">
              {articles.length} Records
            </span>
          </div>

          <button
            onClick={() => setIsIndexOpen(!isIndexOpen)}
            className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isIndexOpen ? 'Collapse Index' : 'Expand Index'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isIndexOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isIndexOpen && (
          <div className="overflow-x-auto pt-2 border-t border-slate-100">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-mono text-[10px] font-semibold uppercase">
                  <th className="pb-2.5 pr-3">ARTICLE</th>
                  <th className="pb-2.5 px-3">TITLE</th>
                  <th className="pb-2.5 px-3 text-center">SECTIONS</th>
                  <th className="pb-2.5 px-3">LAST UPDATED</th>
                  <th className="pb-2.5 pl-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    onClick={() => onOpenArticleReader && onOpenArticleReader(article)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 pr-3 font-mono font-bold text-blue-600 text-[11px]">
                      {article.articleNumber.replace('ARTICLE ', '')}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600 text-[11px]">
                      {article.sections.length}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                      {MANUAL_METADATA.effectiveDate}
                    </td>
                    <td className="py-2.5 pl-3 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
