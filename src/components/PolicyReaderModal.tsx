import React, { useState } from 'react';
import {
  X,
  Download,
  Bookmark,
  Link,
  Check,
  Scale,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Building2,
  BookOpen,
  Film,
  Music,
  Globe,
  Cpu,
  Accessibility,
  Cookie,
  ShieldAlert,
  FileText,
  Copy,
} from 'lucide-react';
import { Article, Section } from '../types';
import { MANUAL_METADATA } from '../data/legalManualData';

interface PolicyReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  bookmarkedSections: Set<string>;
  onToggleBookmarkSection: (sectionId: string) => void;
  onDownloadPDF: (article: Article) => void;
}

export const PolicyReaderModal: React.FC<PolicyReaderModalProps> = ({
  isOpen,
  onClose,
  article,
  articles,
  onSelectArticle,
  bookmarkedSections,
  onToggleBookmarkSection,
  onDownloadPDF,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen || !article) return null;

  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const handleCopyText = async () => {
    const fullText = `${article.articleNumber}: ${article.title}\n\nSummary:\n${article.summary}\n\n` +
      article.sections.map(s => `[${s.sectionNumber}] ${s.title}\n${s.content || ''}\n${s.bullets?.map(b => `• ${b}`).join('\n') || ''}`).join('\n\n');
    
    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(fullText);
        success = true;
      } catch (e) {
        success = false;
      }
    }
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = fullText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (e) {
        // silent fallback
      }
    }
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${article.id}`;
    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch (e) {
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
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (e) {
        // silent fallback
      }
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getDivisionIcon = (division: string) => {
    switch (division) {
      case 'PARENT_GOVERNANCE':
        return <Building2 className="w-5 h-5 text-indigo-600" />;
      case 'COMICS':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'FILMS':
        return <Film className="w-5 h-5 text-rose-600" />;
      case 'SOUND':
        return <Music className="w-5 h-5 text-amber-600" />;
      case 'FRACTUREPEDIA':
        return <Globe className="w-5 h-5 text-cyan-600" />;
      case 'OIS_CORE':
        return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'ACCESSIBILITY':
        return <Accessibility className="w-5 h-5 text-blue-600" />;
      case 'COOKIE_PRIVACY':
        return <Cookie className="w-5 h-5 text-amber-600" />;
      case 'ENFORCEMENT':
        return <ShieldAlert className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  const fontClasses = {
    normal: 'text-xs sm:text-sm leading-relaxed',
    large: 'text-sm sm:text-base leading-relaxed',
    xlarge: 'text-base sm:text-lg leading-loose',
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center flex-shrink-0">
              {getDivisionIcon(article.division)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {article.articleNumber}
                </span>
                <span className="text-[10px] font-mono font-medium text-slate-500 uppercase">
                  {article.category}
                </span>
              </div>
              <h3 className="font-serif-heading text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                {article.shortTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Font Size Adjusters */}
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded-md transition-all text-[11px] ${
                  fontSize === 'normal' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100'
                }`}
                title="Standard Text Size"
              >
                100%
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded-md transition-all text-[11px] ${
                  fontSize === 'large' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100'
                }`}
                title="Large Text Size"
              >
                125%
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded-md transition-all text-[11px] ${
                  fontSize === 'xlarge' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100'
                }`}
                title="Extra Large Text Size"
              >
                150%
              </button>
            </div>

            {/* Download PDF Button */}
            <button
              onClick={() => onDownloadPDF(article)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
              title="Download official PDF for this policy"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Reader Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[62vh] bg-white">
          {/* Article Full Title & Governing Preamble */}
          <div className="space-y-2.5 pb-4 border-b border-slate-100">
            <h1 className="font-serif-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {article.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-sans bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {article.summary}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-0.5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {MANUAL_METADATA.companyName} Legal Code
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                {MANUAL_METADATA.governingJurisdiction}
              </span>
            </div>
          </div>

          {/* Sections Reader List */}
          <div className="space-y-4">
            {article.sections.map((sec: Section) => {
              const isBookmarked = bookmarkedSections.has(sec.id);

              return (
                <div
                  key={sec.id}
                  id={`modal-${sec.id}`}
                  className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                    isBookmarked
                      ? 'bg-blue-50/50 border-blue-300 shadow-2xs'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/70">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600">
                        {sec.sectionNumber}
                      </span>
                      <span className="text-slate-300">•</span>
                      <h2 className="text-xs sm:text-sm font-bold text-slate-900 font-sans">
                        {sec.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => onToggleBookmarkSection(sec.id)}
                      className={`p-1 rounded-md border transition-all ${
                        isBookmarked
                          ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-blue-600'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark clause'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Content Text */}
                  {sec.content && (
                    <div className={`${fontClasses} text-slate-700 font-sans whitespace-pre-line`}>
                      {sec.content}
                    </div>
                  )}

                  {/* Bullet points */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 pl-2">
                      {sec.bullets.map((b, idx) => (
                        <li key={idx} className={`flex items-start gap-2.5 ${fontClasses} text-slate-700 font-sans`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Table if present */}
                  {sec.table && (
                    <div className="my-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px] border-b border-slate-200">
                          <tr>
                            <th className="p-3">Cookie Tier</th>
                            <th className="p-3">Operational Function</th>
                            <th className="p-3">Legal Consent Basis</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                          {sec.table.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td className="p-3 font-mono font-bold text-blue-700">{row.tier}</td>
                              <td className="p-3">{row.function}</td>
                              <td className="p-3 font-mono text-emerald-700">{row.consentBasis}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Statutes badges */}
                  {sec.statutes && sec.statutes.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-mono text-slate-400 font-medium">
                        Governing Authorities:
                      </span>
                      {sec.statutes.map((stat, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-slate-300 text-xs font-semibold transition-all shadow-2xs"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Text Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Policy Text</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {prevArticle ? (
              <button
                onClick={() => onSelectArticle(prevArticle.id)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-300 text-xs font-semibold transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Article</span>
              </button>
            ) : <div />}

            {nextArticle ? (
              <button
                onClick={() => onSelectArticle(nextArticle.id)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all"
              >
                <span>Next Article</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
};
