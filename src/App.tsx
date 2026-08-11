import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { Sidebar } from './components/Sidebar';
import { ArticleView } from './components/ArticleView';
import { ComplianceGrid } from './components/ComplianceGrid';
import { Footer } from './components/Footer';
import { FloatingAssistantOrb } from './components/FloatingAssistantOrb';
import { CookieBanner } from './components/CookieBanner';
import { CookieModal } from './components/CookieModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { PolicyLinksModal } from './components/PolicyLinksModal';
import { PolicyReaderModal } from './components/PolicyReaderModal';
import { SearchBarModal } from './components/SearchBar';
import { WelcomeModal } from './components/WelcomeModal';
import { CertificateVerifier } from './components/CertificateVerifier';
import { CertificateRegistry } from './components/CertificateRegistry';
import { AdminVerificationModal } from './components/AdminVerificationModal';
import { SecurityMandateModal } from './components/SecurityMandateModal';

import { LEGAL_ARTICLES, MANUAL_METADATA } from './data/legalManualData';
import { Article, DivisionCategory, CookiePreferences } from './types';
import { generateLegalManualPDF } from './utils/pdfGenerator';
import { ShieldCheck, X, FileCheck, Lock, Award, Shield } from 'lucide-react';

export default function App() {
  // Navigation & Division Filter State
  const [selectedDivision, setSelectedDivision] = useState<DivisionCategory>('ALL');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('article-1');
  const [activeArticleForReader, setActiveArticleForReader] = useState<Article | null>(null);

  // Modals Visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isPolicyLinksModalOpen, setIsPolicyLinksModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isCertVerifierModalOpen, setIsCertVerifierModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isMandateModalOpen, setIsMandateModalOpen] = useState(false);

  // Search & Bookmarks State
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedSections, setBookmarkedSections] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('fv_bookmarked_sections');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      return new Set();
    }
  });
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  // Saphiraball Home Base State & Egress Cycle
  const [isSaphiraballInHome, setIsSaphiraballInHome] = useState<boolean>(false);
  const [secondsUntilNextCheck, setSecondsUntilNextCheck] = useState<number>(60);
  const [isSaphiraballOrbOpen, setIsSaphiraballOrbOpen] = useState<boolean>(false);
  const [showSaphiraballSpeechBubble, setShowSaphiraballSpeechBubble] = useState<boolean>(true);

  // 1-minute (60 seconds) timer: Saphiraball comes out of his home every 1 minute to ask if user needs help!
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsUntilNextCheck((prev) => {
        if (prev <= 1) {
          // 1 minute elapsed! Saphiraball comes out of his home onto the screen and asks if user needs help
          setIsSaphiraballInHome(false);
          setShowSaphiraballSpeechBubble(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCallSaphiraballOut = () => {
    setIsSaphiraballInHome(false);
    setShowSaphiraballSpeechBubble(true);
    setSecondsUntilNextCheck(60);
  };

  const handleSendSaphiraballHome = () => {
    setIsSaphiraballInHome(true);
    setShowSaphiraballSpeechBubble(false);
    setIsSaphiraballOrbOpen(false);
    setSecondsUntilNextCheck(60);
  };

  // Cookie State
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState<boolean>(() => {
    try {
      return localStorage.getItem('fv_cookie_consent_accepted') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    strictlyNecessary: true,
    functional: true,
    performance: true,
    advertising: false,
  });

  // Save Bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('fv_bookmarked_sections', JSON.stringify(Array.from(bookmarkedSections)));
    } catch (e) {
      // ignore
    }
  }, [bookmarkedSections]);

  // Keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmarkSection = (sectionId: string) => {
    setBookmarkedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleDownloadFullPDF = () => {
    generateLegalManualPDF(LEGAL_ARTICLES);
  };

  const handleDownloadArticlePDF = (art: Article) => {
    generateLegalManualPDF(LEGAL_ARTICLES, art);
  };

  const handleNavigateSection = (sectionKey: string) => {
    if (sectionKey === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const elem = document.getElementById(sectionKey);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectSearchResult = (articleId: string, sectionId?: string) => {
    const foundArt = LEGAL_ARTICLES.find((a) => a.id === articleId);
    if (foundArt) {
      setActiveArticleForReader(foundArt);
      if (sectionId) {
        setTimeout(() => {
          const secElem = document.getElementById(`modal-${sectionId}`);
          if (secElem) secElem.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onDownloadFullPDF={handleDownloadFullPDF}
        onOpenCookieModal={() => setIsCookieModalOpen(true)}
        onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
        onOpenPolicyLinksModal={() => setIsPolicyLinksModalOpen(true)}
        bookmarkedCount={bookmarkedSections.size}
        onToggleBookmarkedOnly={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
        showBookmarkedOnly={showBookmarkedOnly}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onNavigateSection={handleNavigateSection}
        isSaphiraballInHome={isSaphiraballInHome}
        onCallSaphiraballOut={handleCallSaphiraballOut}
        onSendSaphiraballHome={handleSendSaphiraballHome}
        onOpenSupport={() => {
          handleCallSaphiraballOut();
          setIsSaphiraballOrbOpen(true);
        }}
      />

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Hero Welcome Banner */}
        <HeroBanner
          onDownloadFullPDF={handleDownloadFullPDF}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* 4 Compliance Cards */}
        <ComplianceGrid />

        {/* Workspace Grid (Sidebar + Articles View) */}
        <div id="statutes" className="flex flex-col md:flex-row items-start gap-6 lg:gap-8 pt-2">
          {/* Left Sidebar */}
          <Sidebar
            articles={LEGAL_ARTICLES}
            selectedDivision={selectedDivision}
            onSelectDivision={setSelectedDivision}
            selectedArticleId={selectedArticleId}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              const art = LEGAL_ARTICLES.find((a) => a.id === id);
              if (art) setActiveArticleForReader(art);
            }}
            onDownloadFullPDF={handleDownloadFullPDF}
            onToggleBookmarks={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            showBookmarkedOnly={showBookmarkedOnly}
            bookmarkedCount={bookmarkedSections.size}
            onOpenSupport={() => {
              handleCallSaphiraballOut();
              setIsSaphiraballOrbOpen(true);
            }}
            onOpenPolicyLinksModal={() => setIsPolicyLinksModalOpen(true)}
            isSaphiraballInHome={isSaphiraballInHome}
            onCallSaphiraballOut={handleCallSaphiraballOut}
            onSendSaphiraballHome={handleSendSaphiraballHome}
            secondsUntilNextCheck={secondsUntilNextCheck}
          />

          {/* Right Main Articles Display */}
          <div className="flex-1 w-full min-w-0">
            <ArticleView
              articles={LEGAL_ARTICLES}
              selectedArticleId={selectedArticleId}
              selectedDivision={selectedDivision}
              bookmarkedSections={bookmarkedSections}
              onToggleBookmarkSection={handleToggleBookmarkSection}
              showBookmarkedOnly={showBookmarkedOnly}
              searchQuery={searchQuery}
              onOpenArticleReader={(art) => setActiveArticleForReader(art)}
              onClearDivisionFilter={() => setSelectedDivision('ALL')}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenCookieModal={() => setIsCookieModalOpen(true)}
        onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
        onDownloadFullPDF={handleDownloadFullPDF}
        onNavigateSection={handleNavigateSection}
      />

      {/* Saphiraball Interactive Helper Orb */}
      <FloatingAssistantOrb
        articles={LEGAL_ARTICLES}
        onSelectDivision={(div) => setSelectedDivision(div)}
        onSelectArticle={(id) => {
          setSelectedArticleId(id);
          const art = LEGAL_ARTICLES.find((a) => a.id === id);
          if (art) setActiveArticleForReader(art);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onDownloadPDF={handleDownloadFullPDF}
        onOpenCookieModal={() => setIsCookieModalOpen(true)}
        onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        hasAcceptedCookies={hasAcceptedCookies}
        isWelcomeModalOpen={isWelcomeModalOpen}
        isInHome={isSaphiraballInHome}
        onSendToHome={handleSendSaphiraballHome}
        onCallOutOfHome={handleCallSaphiraballOut}
        isOpen={isSaphiraballOrbOpen}
        setIsOpen={setIsSaphiraballOrbOpen}
        showSpeechBubble={showSaphiraballSpeechBubble}
        setShowSpeechBubble={setShowSaphiraballSpeechBubble}
      />

      {/* Search Modal */}
      <SearchBarModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={LEGAL_ARTICLES}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Article Reader Modal */}
      <PolicyReaderModal
        isOpen={!!activeArticleForReader}
        onClose={() => setActiveArticleForReader(null)}
        article={activeArticleForReader}
        articles={LEGAL_ARTICLES}
        onSelectArticle={(id) => {
          const art = LEGAL_ARTICLES.find((a) => a.id === id);
          if (art) setActiveArticleForReader(art);
        }}
        bookmarkedSections={bookmarkedSections}
        onToggleBookmarkSection={handleToggleBookmarkSection}
        onDownloadPDF={handleDownloadArticlePDF}
      />

      {/* Cookie Banner & Preferences Modal */}
      <CookieBanner
        preferences={cookiePreferences}
        onAcceptAll={() => {
          setCookiePreferences({
            strictlyNecessary: true,
            functional: true,
            performance: true,
            advertising: true,
            timestamp: new Date().toISOString(),
          });
          setHasAcceptedCookies(true);
          localStorage.setItem('fv_cookie_consent_accepted', 'true');
        }}
        onDeclineOptional={() => {
          setCookiePreferences({
            strictlyNecessary: true,
            functional: false,
            performance: false,
            advertising: false,
            timestamp: new Date().toISOString(),
          });
          setHasAcceptedCookies(true);
          localStorage.setItem('fv_cookie_consent_accepted', 'true');
        }}
        onOpenPreferences={() => setIsCookieModalOpen(true)}
      />

      <CookieModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
        preferences={cookiePreferences}
        onSavePreferences={(prefs) => {
          setCookiePreferences(prefs);
          setHasAcceptedCookies(true);
          localStorage.setItem('fv_cookie_consent_accepted', 'true');
        }}
      />

      {/* Accessibility Modal */}
      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
      />

      {/* Policy Links Modal */}
      <PolicyLinksModal
        isOpen={isPolicyLinksModalOpen}
        onClose={() => setIsPolicyLinksModalOpen(false)}
        articles={LEGAL_ARTICLES}
        onSelectArticle={(id) => {
          const art = LEGAL_ARTICLES.find((a) => a.id === id);
          if (art) setActiveArticleForReader(art);
        }}
      />

      {/* Welcome Greeting Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Optional Credential Verifier Modal (Opened via backend service or admin request) */}
      {isCertVerifierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md" onClick={() => setIsCertVerifierModalOpen(false)}>
          <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Certificate Verification Engine</h2>
              </div>
              <button onClick={() => setIsCertVerifierModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <CertificateVerifier
              onOpenAdminPortal={() => {
                setIsCertVerifierModalOpen(false);
                setIsAdminModalOpen(true);
              }}
              onOpenMandateChecklist={() => {
                setIsCertVerifierModalOpen(false);
                setIsMandateModalOpen(true);
              }}
            />
            <CertificateRegistry
              onSelectCertificate={() => {}}
            />
          </div>
        </div>
      )}

      {/* Admin Verification Modal */}
      <AdminVerificationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onCertificateIssuedOrRevoked={() => {}}
      />

      {/* Security Mandate Modal */}
      <SecurityMandateModal
        isOpen={isMandateModalOpen}
        onClose={() => setIsMandateModalOpen(false)}
      />
    </div>
  );
}
