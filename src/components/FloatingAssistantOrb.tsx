import React, { useState, useEffect, useRef } from 'react';
import { Article, DivisionCategory } from '../types';
import { LEGAL_ARTICLES, MANUAL_METADATA } from '../data/legalManualData';
import {
  Send,
  X,
  Sparkles,
  Bot,
  Search,
  FileText,
  ShieldCheck,
  Compass,
  Download,
  AlertCircle,
  Minimize2,
  Maximize2,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Move,
  Home,
  Sun,
  Moon,
  Clock,
  LogOut
} from 'lucide-react';

interface FloatingAssistantOrbProps {
  articles: Article[];
  onSelectDivision: (division: DivisionCategory) => void;
  onSelectArticle: (articleId: string) => void;
  onOpenSearch: () => void;
  onDownloadPDF: () => void;
  onOpenCookieModal: () => void;
  onOpenAccessibilityModal: () => void;
  onNavigateSection: (section: string) => void;
  hasAcceptedCookies?: boolean;
  isWelcomeModalOpen?: boolean;
  isInHome?: boolean;
  onSendToHome?: () => void;
  onCallOutOfHome?: () => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  showSpeechBubble?: boolean;
  setShowSpeechBubble?: (show: boolean) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  isGuardrailBlock?: boolean;
}

export const FloatingAssistantOrb: React.FC<FloatingAssistantOrbProps> = ({
  articles,
  onSelectDivision,
  onSelectArticle,
  onOpenSearch,
  onDownloadPDF,
  onOpenCookieModal,
  onOpenAccessibilityModal,
  onNavigateSection,
  hasAcceptedCookies = true,
  isWelcomeModalOpen = false,
  isInHome = false,
  onSendToHome,
  onCallOutOfHome,
  isOpen: propIsOpen,
  setIsOpen: propSetIsOpen,
  showSpeechBubble: propShowSpeechBubble,
  setShowSpeechBubble: propSetShowSpeechBubble,
}) => {
  // Local fallback state if props not provided
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const [localShowSpeechBubble, setLocalShowSpeechBubble] = useState(true);

  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
  const setIsOpen = propSetIsOpen || setLocalIsOpen;

  const showSpeechBubble = propShowSpeechBubble !== undefined ? propShowSpeechBubble : localShowSpeechBubble;
  const setShowSpeechBubble = propSetShowSpeechBubble || setLocalShowSpeechBubble;

  const handleDismissBubble = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowSpeechBubble(false);
    try {
      localStorage.setItem('fv_assistant_bubble_dismissed', 'true');
    } catch (err) {
      // ignore
    }
  };
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    // Default initial placement bottom-right area
    const initialX = Math.max(16, window.innerWidth - 88);
    const initialY = Math.max(16, window.innerHeight - 180);
    try {
      const saved = localStorage.getItem('fv_assistant_orb_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          return {
            x: Math.min(Math.max(10, parsed.x), window.innerWidth - 70),
            y: Math.min(Math.max(10, parsed.y), window.innerHeight - 70),
          };
        }
      }
    } catch (e) {
      // fallback
    }
    return { x: initialX, y: initialY };
  });

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });
  const hasMovedRef = useRef(false);

  // Eye Animation State: 'normal' | 'blink' | 'thinking' | 'happy' | 'alert'
  const [eyeState, setEyeState] = useState<'normal' | 'blink' | 'thinking' | 'happy' | 'alert'>('normal');

  // Query / Chat state
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! I am Saphiraball, powered by OIS Core Emerald. I am here to help you read our company rules, search articles, check division guidelines, or download the PDF manual. What would you like to find today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  const handleCallOutOfHome = () => {
    if (onCallOutOfHome) onCallOutOfHome();
    setShowSpeechBubble(true);
    setEyeState('happy');
    setTimeout(() => setEyeState('normal'), 2500);
  };

  const handleSendToHome = () => {
    if (onSendToHome) onSendToHome();
    setIsOpen(false);
    setShowSpeechBubble(false);
  };

  // 2 Minutes Idle Timer: Automatically send Saphiraball inside home after 2 minutes of user inactivity
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInHome) {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      return;
    }

    const resetIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      // 2 minutes = 120,000 ms
      idleTimerRef.current = setTimeout(() => {
        handleSendToHome();
      }, 120000);
    };

    // Start 2-minute countdown when Saphiraball is out of home
    resetIdleTimer();

    // Reset timer on user interaction anywhere on screen
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];

    const handleUserActivity = () => {
      resetIdleTimer();
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isInHome, onSendToHome]);

  // Save orb position on drag end
  useEffect(() => {
    try {
      localStorage.setItem('fv_assistant_orb_pos', JSON.stringify(position));
    } catch (e) {
      // ignore storage errors
    }
  }, [position]);

  // Periodic Eye Blink Logic
  useEffect(() => {
    if (eyeState === 'thinking') return;

    const blinkInterval = setInterval(() => {
      setEyeState((prev) => {
        if (prev === 'thinking') return prev;
        return 'blink';
      });

      setTimeout(() => {
        setEyeState((prev) => (prev === 'blink' ? 'normal' : prev));
      }, 220);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, [eyeState]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, isOpen]);

  // Pointer event handlers for fluid dragging across whole screen
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: position.x,
      startY: position.y,
    };
    hasMovedRef.current = false;
    setIsDragging(true);

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.mouseX;
    const deltaY = e.clientY - dragStartRef.current.mouseY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasMovedRef.current = true;
    }

    const newX = Math.min(Math.max(10, dragStartRef.current.startX + deltaX), window.innerWidth - 70);
    const newY = Math.min(Math.max(10, dragStartRef.current.startY + deltaY), window.innerHeight - 70);

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const target = e.currentTarget as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }

    // If click without drag, toggle window
    if (!hasMovedRef.current) {
      setIsOpen((prev) => !prev);
      setShowSpeechBubble(false);
    }
  };

  // Check off-topic external queries (Scope Guardrail)
  const isOffTopicQuery = (text: string): boolean => {
    const lower = text.toLowerCase();

    // Check explicit external triggers or non-site requests
    const externalKeywords = [
      'chatgpt',
      'gemini',
      'openai',
      'claude',
      'who is president',
      'weather in',
      'tell me a joke',
      'capital of',
      'recipe for',
      'write python',
      'write javascript code',
      'sports score',
      'world war',
      'crypto price',
      'bitcoin',
      'stock price of apple',
    ];

    if (externalKeywords.some((kw) => lower.includes(kw))) {
      return true;
    }

    // Check if query is unrelated to Fracture Verse or compliance / wiki
    const wikiDomainKeywords = [
      'fracture',
      'verse',
      'doj',
      'ftc',
      'sec',
      'eeoc',
      'osha',
      'epa',
      'hipaa',
      'gdpr',
      'article',
      'section',
      'policy',
      'compliance',
      'legal',
      'manual',
      'statute',
      'montana',
      'pdf',
      'download',
      'search',
      'bookmark',
      'comic',
      'film',
      'audio',
      'sound',
      'wiki',
      'software',
      'ois',
      'unsolicited',
      'copyright',
      'trademark',
      'trade secret',
      'whistleblower',
      'accessibility',
      'cookie',
      'audit',
      'help',
      'navigate',
      'where is',
      'how to',
      'what is',
      'who',
      'contact',
      'owner',
      'owns',
      'bruce',
      'vacini',
      'ceo',
      'founder',
    ];

    const hasDomainKeyword = wikiDomainKeywords.some((kw) => lower.includes(kw));
    return !hasDomainKeyword && text.trim().length > 25;
  };

  // Site Knowledge Base Answer Engine
  const processQuery = (userQuery: string) => {
    const lower = userQuery.toLowerCase().trim();

    // 0. Owner / Founder / CEO Queries
    if (
      lower.includes('who owns') ||
      lower.includes('who is the owner') ||
      lower.includes('owner of') ||
      lower.includes('who is owner') ||
      lower.includes('who owns fracture') ||
      lower.includes('ceo') ||
      lower.includes('founder') ||
      lower.includes('bruce') ||
      lower.includes('vacini')
    ) {
      setEyeState('happy');
      setTimeout(() => setEyeState('normal'), 2000);
      return {
        text: `Bruce Vacini CEO and founder`,
      };
    }

    // 1. Check Off-topic guardrail
    if (isOffTopicQuery(userQuery)) {
      setEyeState('alert');
      setTimeout(() => setEyeState('normal'), 2500);

      return {
        text: `I am Saphiraball, powered by OIS Core Emerald. I am specifically programmed and strictly limited to helping you navigate the Fracture Verse Wiki, search legal manual statutes, explore corporate compliance rules, and access portal tools.\n\nI cannot answer external trivia, programming code, or third-party questions. How can I help you regarding Fracture Verse compliance or site navigation?`,
        isGuardrailBlock: true,
      };
    }

    setEyeState('happy');
    setTimeout(() => setEyeState('normal'), 2000);

    // 2. Specific Navigational & Functional Requests
    if (lower.includes('download pdf') || lower.includes('pdf report') || lower.includes('export pdf')) {
      return {
        text: `You can download the full official Fracture-Verse Master Legal & Compliance PDF immediately. Click the button below to generate the comprehensive document with all 6 Articles and 8 Division guidelines.`,
        actionButton: {
          label: '📄 Download Master PDF Manual',
          onClick: () => onDownloadPDF(),
        },
      };
    }

    if (lower.includes('search') && (lower.includes('open') || lower.includes('how') || lower.includes('modal'))) {
      return {
        text: `You can launch the instant Search modal at any time by pressing Ctrl + K or keying '/' on your keyboard, or by clicking the Search button in the top header.`,
        actionButton: {
          label: '🔍 Launch Search Portal',
          onClick: () => onOpenSearch(),
        },
      };
    }

    if (lower.includes('cookie') || lower.includes('privacy preference')) {
      return {
        text: `You can inspect and update your Cookie & Privacy preferences at any time.`,
        actionButton: {
          label: '🛡️ Manage Cookie Preferences',
          onClick: () => onOpenCookieModal(),
        },
      };
    }

    if (lower.includes('accessibility') || lower.includes('font size') || lower.includes('contrast')) {
      return {
        text: `You can customize visual accessibility settings, high-contrast mode, and typography scale in the Accessibility Settings modal.`,
        actionButton: {
          label: '👁️ Open Accessibility Portal',
          onClick: () => onOpenAccessibilityModal(),
        },
      };
    }

    // 3. Division specific queries
    if (lower.includes('doj') || lower.includes('department of justice') || lower.includes('corporate governance')) {
      return {
        text: `🏛️ **DOJ Division (Department of Justice & Governance)**\nCovered under ARTICLE I & ARTICLE VI. Regulates parent entity governance (Mont. Code Ann. § 35-8), master intellectual property rights (17 U.S.C.), strict zero-acceptance unsolicited submissions protocols, and OIS Core Emerald software trade secrets.`,
        actionButton: {
          label: 'Filter DOJ Division Policies',
          onClick: () => {
            onSelectDivision('PARENT_GOVERNANCE');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('ftc') || lower.includes('federal trade commission') || lower.includes('consumer')) {
      return {
        text: `⚖️ **FTC Division (Federal Trade Commission & Fair Practices)**\nEnforces Montana Consumer Data Privacy Act (MCDPA), strict truth-in-advertising, prohibition of unfair trade practices, transparent refund policies, and clear privacy disclaimers.`,
        actionButton: {
          label: 'Filter FTC Division Policies',
          onClick: () => {
            onSelectDivision('FTC');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('sec') || lower.includes('securities') || lower.includes('insider') || lower.includes('investor')) {
      return {
        text: `📈 **SEC Division (Securities & Corporate Disclosure)**\nMandates strict insider trading prohibitions, material financial disclosures, anti-fraud compliance under Rule 10b-5, and accurate books & records maintenance.`,
        actionButton: {
          label: 'Filter SEC Division Policies',
          onClick: () => {
            onSelectDivision('SEC');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('eeoc') || lower.includes('employment') || lower.includes('harassment') || lower.includes('discrimination')) {
      return {
        text: `👥 **EEOC Division (Equal Employment Opportunity Commission)**\nGuarantees zero-tolerance for workplace discrimination or harassment, strict whistleblower anti-retaliation protections, and fair labor practices across all divisions.`,
        actionButton: {
          label: 'Filter EEOC Division Policies',
          onClick: () => {
            onSelectDivision('EEOC');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('osha') || lower.includes('safety') || lower.includes('film set') || lower.includes('workplace hazard')) {
      return {
        text: `⛑️ **OSHA Division (Occupational Safety & Health)**\nCovers physical set safety for Dreadfracture Films, stage equipment standards, studio audio safety for Omega Sound Authority, and hazardous material protocols.`,
        actionButton: {
          label: 'Filter OSHA Division Policies',
          onClick: () => {
            onSelectDivision('OSHA');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('epa') || lower.includes('environmental') || lower.includes('sustainability')) {
      return {
        text: `🌿 **EPA Division (Environmental Protection & Waste Management)**\nMandates responsible electronic waste recycling for studio server hardware, paperless digital distribution for Dreadfracture Comics, and studio energy efficiency standards.`,
        actionButton: {
          label: 'Filter EPA Division Policies',
          onClick: () => {
            onSelectDivision('EPA');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('hipaa') || lower.includes('health') || lower.includes('medical data')) {
      return {
        text: `🩺 **HIPAA Division (Health Insurance Portability & Data Security)**\nRegulates confidential employee medical records, emergency health disclosures, and encrypted storage of health insurance data in full compliance with federal HIPAA rules.`,
        actionButton: {
          label: 'Filter HIPAA Division Policies',
          onClick: () => {
            onSelectDivision('HIPAA');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('gdpr') || lower.includes('data privacy') || lower.includes('global data') || lower.includes('right to be forgotten')) {
      return {
        text: `🌐 **GDPR Division (Global Data Protection Regulation)**\nApplies to European & global user data handling. Mandates explicit consent controls, user right-to-access, right-to-erasure ("Right to be Forgotten"), and 72-hour breach notification protocols.`,
        actionButton: {
          label: 'Filter GDPR Division Policies',
          onClick: () => {
            onSelectDivision('GDPR');
            onNavigateSection('divisions');
          },
        },
      };
    }

    if (lower.includes('comic') || lower.includes('dreadfracture comics') || lower.includes('work for hire')) {
      return {
        text: `📚 **ARTICLE II: Comics & Publishing (Dreadfracture Comics)**\nCovers 100% Work-Made-For-Hire mandates under 17 U.S.C. § 101 for sequential art, script treatments, character designs, and trademark protection.`,
        actionButton: {
          label: 'Read Article II: Comics Policy',
          onClick: () => {
            onSelectArticle('article-2');
          },
        },
      };
    }

    if (lower.includes('film') || lower.includes('dreadfracture films') || lower.includes('talent release') || lower.includes('actor')) {
      return {
        text: `🎬 **ARTICLE III: Film & Motion Pictures (Dreadfracture Films)**\nMandates perpetual global talent releases, video asset trade secret protocols (Mont. Code Ann. § 30-14-402), and film set safety assuming Montana civil liability limits.`,
        actionButton: {
          label: 'Read Article III: Film Policy',
          onClick: () => {
            onSelectArticle('article-3');
          },
        },
      };
    }

    if (lower.includes('music') || lower.includes('audio') || lower.includes('omega sound') || lower.includes('recording')) {
      return {
        text: `🎵 **ARTICLE IV: Audio & Music Production (Omega Sound Authority)**\nDual-layer copyright protection covering sound recordings (℗) and underlying musical compositions (©), sample clearance protocols, and audio trade secret vaults.`,
        actionButton: {
          label: 'Read Article IV: Audio Policy',
          onClick: () => {
            onSelectArticle('article-4');
          },
        },
      };
    }

    if (lower.includes('wiki') || lower.includes('fracturepedia') || lower.includes('canon') || lower.includes('community')) {
      return {
        text: `📖 **ARTICLE V: Fan Encyclopedia & Community (FracturePedia)**\nOfficial canon hierarchy, non-commercial fan fiction guidelines, creative commons derivative limits, and strict community moderation safety standards.`,
        actionButton: {
          label: 'Read Article V: Wiki Policy',
          onClick: () => {
            onSelectArticle('article-5');
          },
        },
      };
    }

    if (lower.includes('software') || lower.includes('ois core') || lower.includes('emerald') || lower.includes('cyber') || lower.includes('source code')) {
      return {
        text: `⚡ **ARTICLE VI: Proprietary Software & Engine (OIS Core Emerald)**\nClassifies software source code as master trade secrets, strictly prohibits reverse engineering or decompilation, and outlines vulnerability disclosure channels.`,
        actionButton: {
          label: 'Read Article VI: Software Engine Policy',
          onClick: () => {
            onSelectArticle('article-6');
          },
        },
      };
    }

    if (lower.includes('return') || lower.includes('refund') || lower.includes('shipping') || lower.includes('freight')) {
      return {
        text: `📦 **ARTICLE X: Subscriptions, Returns & Shipping Policy**\n- **OIS Core Emerald Subscriptions**: 14-day return & refund window for all SaaS subscriptions.\n- **Dreadfracture Digital Downloads**: Strictly non-refundable / zero return policy once downloaded.\n- **Physical Books & Goods**: 7-day return window from purchase date for unopened or carrier-damaged physical items.\n- **Shipping Fees**: Customers are 100% responsible for initial shipping costs and return freight fees.`,
        actionButton: {
          label: 'Read Article X: Returns & Shipping',
          onClick: () => {
            onSelectArticle('article-10');
          },
        },
      };
    }

    if (lower.includes('unsolicited') || lower.includes('script') || lower.includes('pitch') || lower.includes('idea theft')) {
      return {
        text: `🚫 **Strict Unsolicited Submissions Policy (Section 1.03)**\nFracture-Verse LLC enforces a Zero-Acceptance Rule and Immediate Destruction Protocol. Unsolicited pitches, scripts, or character concepts sent via email or mail are permanently erased/destroyed without being read or reviewed to prevent false claims.`,
        actionButton: {
          label: 'Inspect Section 1.03 Statute',
          onClick: () => {
            onSelectArticle('article-1');
          },
        },
      };
    }

    if (lower.includes('contact') || lower.includes('email') || lower.includes('governing jurisdiction') || lower.includes('montana')) {
      return {
        text: `🏢 **Corporate Entity Details**\n- Parent Entity: ${MANUAL_METADATA.parentEntity}\n- Jurisdiction: ${MANUAL_METADATA.governingJurisdiction}\n- Compliance Office: ${MANUAL_METADATA.complianceOffice}\n- Contact Email: ${MANUAL_METADATA.contactEmail}\n- Primary Statute: ${MANUAL_METADATA.primaryStatutes[0]}`,
      };
    }

    // 4. Dynamic Deep Article Search in Legal Data
    const matches: { article: Article; sectionTitle?: string; textSnippet?: string }[] = [];
    LEGAL_ARTICLES.forEach((art) => {
      const artMatch =
        art.title.toLowerCase().includes(lower) ||
        art.summary.toLowerCase().includes(lower) ||
        art.category.toLowerCase().includes(lower);

      if (artMatch) {
        matches.push({ article: art });
      }

      art.sections.forEach((sec) => {
        if (
          sec.title.toLowerCase().includes(lower) ||
          sec.content.toLowerCase().includes(lower) ||
          sec.statutes?.some((s) => s.toLowerCase().includes(lower))
        ) {
          matches.push({ article: art, sectionTitle: sec.title, textSnippet: sec.content.slice(0, 140) + '...' });
        }
      });
    });

    if (matches.length > 0) {
      const primaryMatch = matches[0];
      return {
        text: `Found relevant match in **${primaryMatch.article.articleNumber}: ${primaryMatch.article.title}**${
          primaryMatch.sectionTitle ? ` (${primaryMatch.sectionTitle})` : ''
        }:\n\n"${primaryMatch.textSnippet || primaryMatch.article.summary}"`,
        actionButton: {
          label: `Open ${primaryMatch.article.shortTitle}`,
          onClick: () => onSelectArticle(primaryMatch.article.id),
        },
      };
    }

    // 5. Helpful Fallback
    return {
      text: `I searched the Fracture Verse Legal & Compliance database for "${userQuery}".\n\nYou can explore our 6 Master Policy Articles, filter by 8 Regulatory Divisions (DOJ, FTC, SEC, EEOC, OSHA, EPA, HIPAA, GDPR), or search specific statutes using Ctrl+K.`,
      actionButton: {
        label: 'View All Policy Articles',
        onClick: () => onNavigateSection('statutes'),
      },
    };
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);
    setEyeState('thinking');

    // 1. Check strict off-topic guardrail first
    if (isOffTopicQuery(textToSend)) {
      setEyeState('alert');
      setTimeout(() => setEyeState('normal'), 2500);

      const assistantMsg: Message = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: `I am Saphiraball, powered by OIS Core Emerald. I am here to help you read and understand the Fracture Verse website and company rules.\n\nI can only answer questions about our website and company policies. How can I help you find something on our site?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGuardrailBlock: true,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
      return;
    }

    // 2. Query Server API endpoint (Express + Gemini 3.6 Flash Server-side)
    let aiAnswerText = '';
    const fallbackAnswer = processQuery(textToSend);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: textToSend }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          aiAnswerText = data.reply;
        }
      }
    } catch (err) {
      // Graceful local fallback without throwing console errors
    }

    setEyeState('happy');
    setTimeout(() => setEyeState('normal'), 2000);

    const assistantMsg: Message = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      text: aiAnswerText || fallbackAnswer.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButton: fallbackAnswer.actionButton,
      isGuardrailBlock: false,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsThinking(false);
  };

  // Determine popover position relative to orb
  const isRightHalf = position.x > window.innerWidth / 2;
  const isBottomHalf = position.y > window.innerHeight / 2;

  const popoverStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    ...(isRightHalf
      ? { right: Math.max(12, window.innerWidth - position.x - 30) }
      : { left: Math.max(12, position.x - 10) }),
    ...(isBottomHalf
      ? { bottom: Math.max(12, window.innerHeight - position.y + 16) }
      : { top: Math.max(12, position.y + 70) }),
  };

  return (
    <>
      {/* FLOATING SPHERICAL ORB CHARACTER WITH GLOWING WHITE EYES */}
      {!isInHome && (
        <div
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9998,
            touchAction: 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={() => {
            if (!hasMovedRef.current) {
              setIsOpen(true);
              setShowSpeechBubble(false);
            }
          }}
          id="saphiraball-orb-trigger"
          className="group cursor-grab active:cursor-grabbing select-none"
          title="Saphiraball • OIS Core Emerald • Drag anywhere on screen"
        >
          {/* Pulsing Outer Aura Halo */}
          <div className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-md group-hover:bg-amber-400/30 transition-all duration-300 animate-pulse" />

          {/* Outer Round Metallic Ball Shell */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-slate-900 via-slate-950 to-emerald-950 border-2 border-emerald-400/60 shadow-xl shadow-slate-950/80 flex items-center justify-center p-1 overflow-hidden transition-transform transform group-hover:scale-105 active:scale-95">
            {/* Internal Metallic Specular Highlights */}
            <div className="absolute top-1 left-3 w-6 h-2 rounded-full bg-white/20 blur-[1px]" />
            <div className="absolute bottom-1 right-2 w-4 h-1.5 rounded-full bg-emerald-400/20 blur-[1px]" />

            {/* GLOWING WHITE EYES CONTAINER */}
            <div className="flex items-center justify-center gap-2 z-10">
              {/* LEFT EYE */}
              <div
                className={`transition-all duration-200 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] ${
                  eyeState === 'blink'
                    ? 'w-3 h-0.5 rounded-full opacity-60'
                    : eyeState === 'thinking'
                    ? 'w-2.5 h-2.5 rounded-sm animate-spin bg-amber-200 shadow-amber-300'
                    : eyeState === 'happy'
                    ? 'w-3 h-2 rounded-t-full border-t-2 border-slate-900 bg-emerald-100'
                    : eyeState === 'alert'
                    ? 'w-3.5 h-3.5 rounded-full bg-rose-200 shadow-rose-400'
                    : 'w-3 h-3.5 rounded-full'
                }`}
              />

              {/* RIGHT EYE */}
              <div
                className={`transition-all duration-200 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] ${
                  eyeState === 'blink'
                    ? 'w-3 h-0.5 rounded-full opacity-60'
                    : eyeState === 'thinking'
                    ? 'w-2.5 h-2.5 rounded-sm animate-spin bg-amber-200 shadow-amber-300'
                    : eyeState === 'happy'
                    ? 'w-3 h-2 rounded-t-full border-t-2 border-slate-900 bg-emerald-100'
                    : eyeState === 'alert'
                    ? 'w-3.5 h-3.5 rounded-full bg-rose-200 shadow-rose-400'
                    : 'w-3 h-3.5 rounded-full'
                }`}
              />
            </div>

            {/* Subtle Drag Handle Badge */}
            <div className="absolute bottom-1 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono font-bold text-emerald-300/80 flex items-center gap-0.5">
              <Move className="w-2.5 h-2.5" />
              <span>DRAG</span>
            </div>
          </div>

          {/* Small Active Floating Tooltip */}
          {!isOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap bg-slate-900/95 text-slate-100 border border-slate-700/80 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Saphiraball • Click to ask
            </div>
          )}
        </div>
      )}

      {/* PROACTIVE SPEECH BUBBLE WITH EXIT BUTTON */}
      {!isOpen && showSpeechBubble && hasAcceptedCookies && !isWelcomeModalOpen && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9997,
            ...(isRightHalf
              ? { right: Math.max(12, window.innerWidth - position.x - 10) }
              : { left: Math.max(12, position.x + 75) }),
            ...(isBottomHalf
              ? { bottom: Math.max(12, window.innerHeight - position.y + 10) }
              : { top: Math.max(12, position.y - 10) }),
          }}
          className="w-64 bg-slate-900/95 text-white border border-emerald-500/50 rounded-2xl shadow-2xl p-3.5 space-y-2.5 font-sans animate-fade-in"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                Saphiraball
              </span>
            </div>
            <button
              onClick={handleDismissBubble}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              title="Exit / Dismiss speech bubble"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-snug font-sans">
            Need help finding company policies, guidelines, or legal documents?
          </p>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => {
                setIsOpen(true);
                setShowSpeechBubble(false);
              }}
              className="flex-1 py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1"
            >
              <span>Ask for Help</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={handleSendToHome}
              className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-medium transition-colors flex items-center gap-1"
              title="Send Saphiraball to rest in his Home Pod"
            >
              <Moon className="w-3 h-3" />
              <span>Home</span>
            </button>
            <button
              onClick={handleDismissBubble}
              className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* POP-UP TYPING QUERY WINDOW */}
      {isOpen && (
        <div
          style={popoverStyle}
          className="w-[calc(100vw-24px)] sm:w-[380px] max-h-[80vh] flex flex-col bg-slate-950 text-white border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200 font-sans"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              {/* Mini Orb Icon */}
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-emerald-400/50 flex items-center justify-center gap-1 shadow-xs flex-shrink-0">
                <div className="w-1.5 h-2 bg-white rounded-full shadow-[0_0_6px_white]" />
                <div className="w-1.5 h-2 bg-white rounded-full shadow-[0_0_6px_white]" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-wider uppercase font-serif text-emerald-400 flex items-center gap-1.5 leading-none">
                  SAPHIRABALL
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded-full font-mono border border-emerald-500/30">
                    OIS Core Emerald
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleSendToHome}
                className="px-2 py-1 bg-slate-800/90 hover:bg-slate-700 text-emerald-300 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 border border-emerald-500/30"
                title="Send Saphiraball to rest in his Home Pod"
              >
                <Home className="w-3 h-3" />
                <span>Go to Home</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Close Assistant Box"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div ref={chatScrollRef} className="flex-1 p-3.5 space-y-3.5 overflow-y-auto max-h-[360px] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center gap-0.5 flex-shrink-0 mt-0.5">
                    <div className="w-1 h-1.5 bg-white rounded-full" />
                    <div className="w-1 h-1.5 bg-white rounded-full" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs font-medium'
                        : msg.isGuardrailBlock
                        ? 'bg-rose-950/80 text-rose-200 border border-rose-800/60 rounded-bl-xs'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Action Trigger Button embedded in assistant response */}
                  {msg.actionButton && (
                    <button
                      onClick={msg.actionButton.onClick}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-95"
                    >
                      <span>{msg.actionButton.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <span className="text-[9px] text-slate-500 font-mono block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono py-1">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-amber-400/50 flex items-center justify-center gap-0.5">
                  <div className="w-1 h-1 bg-amber-300 rounded-full animate-ping" />
                  <div className="w-1 h-1 bg-amber-300 rounded-full animate-ping delay-100" />
                </div>
                <span>Scanning Fracture Verse Wiki Engine...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            <button
              onClick={() => handleSend('What is DOJ Division?')}
              className="px-2.5 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-[10px] rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 border border-slate-700/50"
            >
              🏛️ DOJ Division
            </button>
            <button
              onClick={() => handleSend('How do I download PDF manual?')}
              className="px-2.5 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-[10px] rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 border border-slate-700/50"
            >
              📄 Download PDF
            </button>
            <button
              onClick={() => handleSend('Show HIPAA & GDPR privacy rules')}
              className="px-2.5 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-[10px] rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 border border-slate-700/50"
            >
              🔒 HIPAA & GDPR
            </button>
            <button
              onClick={() => handleSend('Strict Unsolicited Submissions Policy')}
              className="px-2.5 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-[10px] rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 border border-slate-700/50"
            >
              🚫 Unsolicited Pitch
            </button>
          </div>

          {/* Typing Query Input Bar */}
          <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Type your question or concern..."
              className="flex-1 bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-emerald-400 placeholder:text-slate-500 font-sans"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl transition-all flex items-center justify-center flex-shrink-0"
              title="Send Question"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
