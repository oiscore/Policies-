import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { Sidebar } from './components/Sidebar';
import { ArticleView } from './components/ArticleView';
import { ComplianceGrid } from './components/ComplianceGrid';
import { Footer } from './components/Footer';
import { SearchBarModal } from './components/SearchBar';
import { CookieModal } from './components/CookieModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { PolicyReaderModal } from './components/PolicyReaderModal';
import { LEGAL_ARTICLES } from './data/legalManualData';
import { DivisionCategory, CookiePreferences, Article } from './types';
import { generateLegalManualPDF } from './utils/pdfGenerator';

export default function App() {
  const [selectedDivision, setSelectedDivision] = useState<DivisionCategory>('ALL');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('article-1');
  const [bookmarkedSections, setBookmarkedSections] = useState<Set<string>>(new Set());
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);
  const [selectedReaderArticle, setSelectedReaderArticle] = useState<Article | null>(null);

  // Cookie preferences
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    strictlyNecessary: true,
    functional: true,
    performance: true,
    advertising: false,
  });

  // Handle keyboard shortcuts (Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle URL hash on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const targetArticle = LEGAL_ARTICLES.find(
        (a) => a.id === hash || a.sections.some((s) => s.id === hash)
      );
      if (targetArticle) {
        setSelectedArticleId(targetArticle.id);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const handleToggleBookmarkSection = (secId: string) => {
    setBookmarkedSections((prev) => {
      const next = new Set(prev);
      if (next.has(secId)) next.delete(secId);
      else next.add(secId);
      return next;
    });
  };

  const handleOpenReader = (art: Article) => {
    setSelectedReaderArticle(art);
    setIsReaderModalOpen(true);
  };

  const handleSelectSearchResult = (articleId: string, sectionId?: string, matchedQuery?: string) => {
    setSelectedArticleId(articleId);
    setShowBookmarkedOnly(false);
    if (matchedQuery) {
      setActiveSearchQuery(matchedQuery);
    }

    const art = LEGAL_ARTICLES.find((a) => a.id === articleId);
    if (art) {
      setSelectedReaderArticle(art);
      setIsReaderModalOpen(true);
    }

    setTimeout(() => {
      const targetId = sectionId || articleId;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (section: string) => {
    if (section === 'top') {
      scrollToTop();
    } else if (section === 'divisions') {
      const el = document.getElementById('main-content-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'statutes') {
      const el = document.getElementById('article-1');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] text-slate-900 flex flex-col app-viewport font-sans selection:bg-blue-500/20 selection:text-blue-900">
      {/* Top Header Bar */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onDownloadFullPDF={() => generateLegalManualPDF(LEGAL_ARTICLES)}
        onOpenCookieModal={() => setIsCookieModalOpen(true)}
        onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
        bookmarkedCount={bookmarkedSections.size}
        onToggleBookmarkedOnly={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
        showBookmarkedOnly={showBookmarkedOnly}
        searchQuery={activeSearchQuery}
        onSearchQueryChange={(q) => setActiveSearchQuery(q)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area matching Blueprint Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8">
        {/* Top Executive Hero Banner (Blueprint Top Banner) */}
        <HeroBanner
          onDownloadFullPDF={() => generateLegalManualPDF(LEGAL_ARTICLES)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* 2-Column Portal Section (Blueprint 2-column main grid) */}
        <div id="main-content-grid" className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Navigation & Jurisdiction Sidebar */}
          <Sidebar
            articles={LEGAL_ARTICLES}
            selectedDivision={selectedDivision}
            onSelectDivision={(div) => {
              setSelectedDivision(div);
              setShowBookmarkedOnly(false);
              if (div !== 'ALL') {
                const firstArt = LEGAL_ARTICLES.find((a) => a.division === div);
                if (firstArt) setSelectedArticleId(firstArt.id);
              }
            }}
            selectedArticleId={selectedArticleId}
            onSelectArticle={(artId) => {
              setSelectedArticleId(artId);
              setShowBookmarkedOnly(false);
              const art = LEGAL_ARTICLES.find((a) => a.id === artId);
              if (art) {
                setSelectedDivision(art.division);
                handleOpenReader(art);
              }
              const el = document.getElementById(artId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onDownloadFullPDF={() => generateLegalManualPDF(LEGAL_ARTICLES)}
          />

          {/* Right Policy Articles Viewer */}
          <main className="flex-1 w-full order-1 md:order-2 space-y-6">
            <ArticleView
              articles={LEGAL_ARTICLES}
              selectedArticleId={selectedArticleId}
              selectedDivision={selectedDivision}
              onClearDivisionFilter={() => setSelectedDivision('ALL')}
              bookmarkedSections={bookmarkedSections}
              onToggleBookmarkSection={handleToggleBookmarkSection}
              showBookmarkedOnly={showBookmarkedOnly}
              searchQuery={activeSearchQuery}
              onOpenArticleReader={handleOpenReader}
            />
          </main>
        </div>

        {/* 4-Column Compliance & Value Proposition Grid (Blueprint 4-card section) */}
        <ComplianceGrid />
      </div>

      {/* Corporate Enterprise Footer (Blueprint bottom section) */}
      <Footer
        onOpenCookieModal={() => setIsCookieModalOpen(true)}
        onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
        onDownloadFullPDF={() => generateLegalManualPDF(LEGAL_ARTICLES)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Interactive Modals */}
      <SearchBarModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={LEGAL_ARTICLES}
        onSelectResult={handleSelectSearchResult}
      />

      <CookieModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
        preferences={cookiePreferences}
        onSavePreferences={(prefs) => setCookiePreferences(prefs)}
      />

      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
      />

      {/* Full-screen Interactive Policy Reader & Inspection Modal */}
      <PolicyReaderModal
        isOpen={isReaderModalOpen}
        onClose={() => setIsReaderModalOpen(false)}
        article={selectedReaderArticle}
        articles={LEGAL_ARTICLES}
        onSelectArticle={(artId) => {
          const art = LEGAL_ARTICLES.find((a) => a.id === artId);
          if (art) setSelectedReaderArticle(art);
        }}
        bookmarkedSections={bookmarkedSections}
        onToggleBookmarkSection={handleToggleBookmarkSection}
        onDownloadPDF={(art) => generateLegalManualPDF(LEGAL_ARTICLES, art)}
      />
    </div>
  );
}
