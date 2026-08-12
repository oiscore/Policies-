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
import { PolicyAddNotification } from './components/PolicyAddNotification';
import { AddPolicyModal } from './components/AddPolicyModal';
import { LinkInterferenceModal } from './components/LinkInterferenceModal';

import { LEGAL_ARTICLES, MANUAL_METADATA } from './data/legalManualData';
import { Article, DivisionCategory, CookiePreferences } from './types';
import { generateLegalManualPDF } from './utils/pdfGenerator';
import { ShieldCheck, X, FileCheck, Lock, Award, Shield } from 'lucide-react';

export default function App() {
  // Master Articles List (Base + Custom Created Policies)
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const savedCustom = localStorage.getItem('fv_custom_articles');
      if (savedCustom) {
        const parsed: Article[] = JSON.parse(savedCustom);
        return [...LEGAL_ARTICLES, ...parsed];
      }
    } catch (e) {
      // ignore
    }
    return LEGAL_ARTICLES;
  });

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
  const [isAddPolicyModalOpen, setIsAddPolicyModalOpen] = useState(false);
  const [isLinkInterferenceModalOpen, setIsLinkInterferenceModalOpen] = useState(false);
  const [isCheckingLink, setIsCheckingLink] = useState(false);

  // Link Checker Handler for https://fracture-verse-llc.vercel.app/
  const handleOpenFractureVerseLink = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsCheckingLink(true);
    const targetUrl = 'https://fracture-verse-llc.vercel.app/';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      await fetch(targetUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      // If fetch succeeds without network error, open url
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      // If link is unavailable or connection interrupted -> Trigger mandated interference error!
      setIsLinkInterferenceModalOpen(true);
    } finally {
      setIsCheckingLink(false);
    }
  };

  // Policy Notifications Queue State (Strictly 1 pop-up at a time)
  const [seenPolicyIds, setSeenPolicyIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('fv_seen_policy_ids');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
    // Default seen IDs: base articles 1 through 14, leaving 15 & 16 to trigger initial sequential pop-ups
    return new Set(
      Array.from({ length: 14 }, (_, i) => `article-${i + 1}`)
    );
  });

  const [notificationQueue, setNotificationQueue] = useState<Article[]>([]);

  // Queue unacknowledged published policies whenever articles or seen set changes
  useEffect(() => {
    const publishedUnacknowledged = articles.filter(
      (art) => art.isPublished !== false && !seenPolicyIds.has(art.id)
    );
    if (publishedUnacknowledged.length > 0) {
      setNotificationQueue((prevQueue) => {
        const existingQueueIds = new Set(prevQueue.map((a) => a.id));
        const toAdd = publishedUnacknowledged.filter((a) => !existingQueueIds.has(a.id));
        return [...prevQueue, ...toAdd];
      });
    }
  }, [articles, seenPolicyIds]);

  // Scheduled Policy Auto-Publisher Ticker (Posts immediately once scheduled date/time arrives)
  useEffect(() => {
    const ticker = setInterval(() => {
      const now = new Date();
      setArticles((prevArticles) => {
        let changed = false;
        const updated = prevArticles.map((art) => {
          if (art.isPublished === false && art.scheduledPublishDate) {
            if (new Date(art.scheduledPublishDate) <= now) {
              changed = true;
              return { ...art, isPublished: true };
            }
          }
          return art;
        });

        if (changed) {
          try {
            const customOnly = updated.filter(
              (a) => !LEGAL_ARTICLES.some((base) => base.id === a.id)
            );
            localStorage.setItem('fv_custom_articles', JSON.stringify(customOnly));
          } catch (e) {
            // ignore
          }

          // Trigger pop-ups immediately for newly effective scheduled policies
          const newlyPublished = updated.filter(
            (art) =>
              art.isPublished !== false &&
              prevArticles.find((p) => p.id === art.id)?.isPublished === false
          );
          if (newlyPublished.length > 0) {
            setNotificationQueue((prevQ) => {
              const existingIds = new Set(prevQ.map((a) => a.id));
              const toAdd = newlyPublished.filter((a) => !existingIds.has(a.id));
              return [...prevQ, ...toAdd];
            });
            setSelectedArticleId(newlyPublished[0].id);
          }

          return updated;
        }
        return prevArticles;
      });
    }, 1000);

    return () => clearInterval(ticker);
  }, []);

  const handleDismissCurrentNotification = () => {
    if (notificationQueue.length === 0) return;
    const currentArt = notificationQueue[0];

    // Mark as seen & save
    setSeenPolicyIds((prev) => {
      const next = new Set(prev);
      next.add(currentArt.id);
      try {
        localStorage.setItem('fv_seen_policy_ids', JSON.stringify(Array.from(next)));
      } catch (e) {
        // ignore
      }
      return next;
    });

    // Advance queue (removes current, showing next pop-up ONE AT A TIME)
    setNotificationQueue((prev) => prev.slice(1));
  };

  const handleAddPolicy = (newArticle: Article) => {
    setArticles((prev) => {
      const updated = [...prev, newArticle];
      try {
        const customOnly = updated.filter(
          (a) => !LEGAL_ARTICLES.some((base) => base.id === a.id)
        );
        localStorage.setItem('fv_custom_articles', JSON.stringify(customOnly));
      } catch (e) {
        // ignore
      }
      return updated;
    });

    // If published immediately, trigger pop-up notification queue right away
    if (newArticle.isPublished !== false) {
      setNotificationQueue((prev) => [...prev, newArticle]);
      setSelectedArticleId(newArticle.id);
    }
  };

  const handleUpdatePolicy = (updatedArticle: Article) => {
    setArticles((prev) => {
      const updated = prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a));
      try {
        const customOnly = updated.filter(
          (a) => !LEGAL_ARTICLES.some((base) => base.id === a.id)
        );
        localStorage.setItem('fv_custom_articles', JSON.stringify(customOnly));
      } catch (e) {
        // ignore
      }
      return updated;
    });

    if (updatedArticle.isPublished !== false) {
      setNotificationQueue((prev) => [...prev.filter((a) => a.id !== updatedArticle.id), updatedArticle]);
      setSelectedArticleId(updatedArticle.id);
    }
  };

  const handleDeletePolicy = (articleId: string) => {
    setArticles((prev) => {
      const updated = prev.filter((a) => a.id !== articleId);
      try {
        const customOnly = updated.filter(
          (a) => !LEGAL_ARTICLES.some((base) => base.id === a.id)
        );
        localStorage.setItem('fv_custom_articles', JSON.stringify(customOnly));
      } catch (e) {
        // ignore
      }
      return updated;
    });

    setNotificationQueue((prev) => prev.filter((a) => a.id !== articleId));
    if (selectedArticleId === articleId) {
      setSelectedArticleId(LEGAL_ARTICLES[0].id);
    }
  };

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
  const [secondsUntilNextCheck, setSecondsUntilNextCheck] = useState<number>(120);
  const [isSaphiraballOrbOpen, setIsSaphiraballOrbOpen] = useState<boolean>(false);
  const [showSaphiraballSpeechBubble, setShowSaphiraballSpeechBubble] = useState<boolean>(true);

  // 2-minute (120 seconds) timer: Each time Saphiraball comes out of his home, the timer increases to 2 minutes!
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsUntilNextCheck((prev) => {
        if (prev <= 1) {
          // 2 minutes elapsed! Saphiraball comes out of his home onto the screen
          setIsSaphiraballInHome(false);
          setShowSaphiraballSpeechBubble(true);
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCallSaphiraballOut = () => {
    setIsSaphiraballInHome(false);
    setShowSaphiraballSpeechBubble(true);
    setSecondsUntilNextCheck(120);
  };

  const handleSendSaphiraballHome = () => {
    setIsSaphiraballInHome(true);
    setShowSaphiraballSpeechBubble(false);
    setIsSaphiraballOrbOpen(false);
    setSecondsUntilNextCheck(120);
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
    generateLegalManualPDF(articles);
  };

  const handleDownloadArticlePDF = (art: Article) => {
    generateLegalManualPDF(articles, art);
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
    const foundArt = articles.find((a) => a.id === articleId);
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
        onOpenAddPolicyModal={() => setIsAddPolicyModalOpen(true)}
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
        onOpenFractureVerseLink={handleOpenFractureVerseLink}
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
            articles={articles}
            selectedDivision={selectedDivision}
            onSelectDivision={setSelectedDivision}
            selectedArticleId={selectedArticleId}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              const art = articles.find((a) => a.id === id);
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
              articles={articles}
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
        onOpenFractureVerseLink={handleOpenFractureVerseLink}
      />

      {/* Saphiraball Interactive Helper Orb */}
      <FloatingAssistantOrb
        articles={articles}
        onSelectDivision={(div) => setSelectedDivision(div)}
        onSelectArticle={(id) => {
          setSelectedArticleId(id);
          const art = articles.find((a) => a.id === id);
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
        articles={articles}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Article Reader Modal */}
      <PolicyReaderModal
        isOpen={!!activeArticleForReader}
        onClose={() => setActiveArticleForReader(null)}
        article={activeArticleForReader}
        articles={articles}
        onSelectArticle={(id) => {
          const art = articles.find((a) => a.id === id);
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
        articles={articles}
        onSelectArticle={(id) => {
          const art = articles.find((a) => a.id === id);
          if (art) setActiveArticleForReader(art);
        }}
      />

      {/* Welcome Greeting Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Add Policy Modal */}
      <AddPolicyModal
        isOpen={isAddPolicyModalOpen}
        onClose={() => setIsAddPolicyModalOpen(false)}
        onAddPolicy={handleAddPolicy}
        onUpdatePolicy={handleUpdatePolicy}
        onDeletePolicy={handleDeletePolicy}
        articles={articles}
        existingArticleCount={articles.length}
      />

      {/* Single Pop-up Notification for Policy Additions (1 pop-up at a time queue) */}
      <PolicyAddNotification
        queue={notificationQueue}
        onDismissCurrent={handleDismissCurrentNotification}
        onViewPolicy={(art) => setActiveArticleForReader(art)}
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

      {/* Link Interference Diagnostic Modal */}
      <LinkInterferenceModal
        isOpen={isLinkInterferenceModalOpen}
        onClose={() => setIsLinkInterferenceModalOpen(false)}
        onRetry={handleOpenFractureVerseLink}
        isChecking={isCheckingLink}
        targetUrl="https://fracture-verse-llc.vercel.app/"
      />
    </div>
  );
}
