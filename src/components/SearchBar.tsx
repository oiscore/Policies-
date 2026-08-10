import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShieldCheck, CornerDownLeft, Filter } from 'lucide-react';
import { Article, Section, DivisionCategory } from '../types';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectResult: (articleId: string, sectionId?: string, matchedQuery?: string) => void;
}

interface SearchResultItem {
  articleId: string;
  articleTitle: string;
  articleNumber: string;
  category: string;
  division: DivisionCategory;
  sectionId: string;
  sectionNumber: string;
  sectionTitle: string;
  snippet: string;
  matchedStatute?: string;
}

export const SearchBarModal: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('ALL');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const matched: SearchResultItem[] = [];

    articles.forEach((art) => {
      if (selectedCategory !== 'ALL' && art.division !== selectedCategory) {
        return;
      }

      art.sections.forEach((sec: Section) => {
        const textToSearch = [
          art.title,
          art.shortTitle,
          art.category,
          art.summary,
          sec.sectionNumber,
          sec.title,
          sec.content,
          ...(sec.bullets || []),
          ...(sec.statutes || []),
        ]
          .join(' ')
          .toLowerCase();

        if (textToSearch.includes(trimmed)) {
          let snippet = sec.content || sec.bullets?.join(' ') || art.summary;
          const matchIdx = snippet.toLowerCase().indexOf(trimmed);
          if (matchIdx !== -1) {
            const start = Math.max(0, matchIdx - 35);
            const end = Math.min(snippet.length, matchIdx + 85);
            snippet = (start > 0 ? '...' : '') + snippet.substring(start, end) + (end < snippet.length ? '...' : '');
          } else {
            snippet = snippet.substring(0, 110) + '...';
          }

          matched.push({
            articleId: art.id,
            articleTitle: art.title,
            articleNumber: art.articleNumber,
            category: art.category,
            division: art.division,
            sectionId: sec.id,
            sectionNumber: sec.sectionNumber,
            sectionTitle: sec.title,
            snippet,
            matchedStatute: sec.statutes?.find((s) => s.toLowerCase().includes(trimmed)),
          });
        }
      });
    });

    setResults(matched.slice(0, 20));
  }, [query, selectedCategory, articles]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 border-b border-slate-100 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clauses, statutes, or policies (e.g. 'Mont. Code', 'work for hire', 'MCDPA')..."
            className="w-full text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-500 font-mono text-xs border border-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Division Filter Pills */}
        <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1 pl-1">
            <Filter className="w-3 h-3 text-blue-600" /> Filter:
          </span>
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedCategory('PARENT_GOVERNANCE')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedCategory === 'PARENT_GOVERNANCE'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Parent IP
          </button>
          <button
            onClick={() => setSelectedCategory('COMICS')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedCategory === 'COMICS'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Comics
          </button>
          <button
            onClick={() => setSelectedCategory('FILMS')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedCategory === 'FILMS'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Films
          </button>
          <button
            onClick={() => setSelectedCategory('OMEGA_SOUND')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedCategory === 'OMEGA_SOUND'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Audio
          </button>
        </div>

        {/* Results Box */}
        <div className="p-4 space-y-2 overflow-y-auto max-h-[55vh]">
          {!query.trim() && (
            <div className="py-8 text-center space-y-2 text-slate-400">
              <ShieldCheck className="w-8 h-8 text-blue-600/40 mx-auto" />
              <p className="text-xs font-mono">
                Sub-0.01s Instant Client Search. Search any governing statute or policy clause.
              </p>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="py-8 text-center space-y-2 text-slate-500">
              <p className="text-sm font-semibold">No matching legal clauses found</p>
              <p className="text-xs text-slate-400 font-mono">
                Try searching for terms like "35-8", "work for hire", "MCDPA", or "copyright".
              </p>
            </div>
          )}

          {results.map((item, idx) => (
            <div
              key={`${item.sectionId}-${idx}`}
              onClick={() => {
                onSelectResult(item.articleId, item.sectionId, query);
                onClose();
              }}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600">{item.articleNumber}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-slate-600 font-bold">{item.sectionNumber}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                  {item.category}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {item.sectionTitle}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                {item.snippet}
              </p>

              {item.matchedStatute && (
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                  Statute: {item.matchedStatute}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>{results.length} Matches Found</span>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Press</span>
            <CornerDownLeft className="w-3 h-3 text-slate-500" />
            <span>to jump to section</span>
          </div>
        </div>
      </div>
    </div>
  );
};
