import React, { useState, useEffect } from 'react';
import { Article, DivisionCategory } from '../types';
import {
  PlusCircle,
  X,
  ShieldCheck,
  FileText,
  Sparkles,
  Check,
  AlertCircle,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldAlert,
  Calendar,
  Clock,
  Send,
  Edit3,
  Trash2,
  RefreshCw,
} from 'lucide-react';

interface AddPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPolicy: (newArticle: Article) => void;
  onUpdatePolicy?: (updatedArticle: Article) => void;
  onDeletePolicy?: (articleId: string) => void;
  articles?: Article[];
  existingArticleCount: number;
}

export const AddPolicyModal: React.FC<AddPolicyModalProps> = ({
  isOpen,
  onClose,
  onAddPolicy,
  onUpdatePolicy,
  onDeletePolicy,
  articles = [],
  existingArticleCount,
}) => {
  // Passcode Lock State
  const MASTER_PASSCODES = ['FV-9982-ADMIN', '8849', 'FRACTURE-ADMIN-2026', 'ADMIN2026', 'BRUCE-CEO-2026'];
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPasscodeText, setShowPasscodeText] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Admin Mode: 'CREATE' | 'UPDATE' | 'DELETE'
  const [adminMode, setAdminMode] = useState<'CREATE' | 'UPDATE' | 'DELETE'>('CREATE');

  // Selected Policy ID for Update or Delete
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('');

  // Form State
  const [title, setTitle] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [category, setCategory] = useState('Corporate Governance & Legal');
  const [division, setDivision] = useState<DivisionCategory>('GENERAL_LEGAL');
  const [summary, setSummary] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionContent, setSectionContent] = useState('');
  const [sectionBullets, setSectionBullets] = useState('');
  const [sectionStatutes, setSectionStatutes] = useState('');

  // Posting Schedule State
  const [scheduleType, setScheduleType] = useState<'IMMEDIATE' | 'SCHEDULED'>('IMMEDIATE');
  const [scheduledDateTime, setScheduledDateTime] = useState<string>(() => {
    const d = new Date(Date.now() + 5 * 60000);
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Modal Closing and Automatic Re-Locking
  const handleModalClose = () => {
    setIsUnlocked(false);
    setPasscodeAttempt('');
    setPasscodeError('');
    setShowPasscodeText(false);
    setShowHint(false);
    setErrorMsg('');
    setSuccessMsg('');
    setAdminMode('CREATE');
    setSelectedPolicyId('');
    onClose();
  };

  // Reset state & auto-lock whenever modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setIsUnlocked(false);
      setPasscodeAttempt('');
      setPasscodeError('');
      setShowPasscodeText(false);
      setShowHint(false);
      setErrorMsg('');
      setSuccessMsg('');
      setAdminMode('CREATE');
      setSelectedPolicyId('');
    }
  }, [isOpen]);

  // Auto populate form when selecting a policy in UPDATE or DELETE mode
  useEffect(() => {
    if ((adminMode === 'UPDATE' || adminMode === 'DELETE') && selectedPolicyId) {
      const target = articles.find((a) => a.id === selectedPolicyId);
      if (target) {
        setTitle(target.title);
        setShortTitle(target.shortTitle || target.title);
        setCategory(target.category || 'Corporate Governance & Legal');
        setDivision(target.division || 'GENERAL_LEGAL');
        setSummary(target.summary);

        const sec1 = target.sections[0];
        if (sec1) {
          setSectionTitle(sec1.title);
          setSectionContent(sec1.content);
          setSectionBullets(sec1.bullets ? sec1.bullets.join('\n') : '');
          setSectionStatutes(sec1.statutes ? sec1.statutes.join(', ') : '');
        } else {
          setSectionTitle('');
          setSectionContent('');
          setSectionBullets('');
          setSectionStatutes('');
        }

        if (target.scheduledPublishDate) {
          try {
            const d = new Date(target.scheduledPublishDate);
            const tzOffset = d.getTimezoneOffset() * 60000;
            setScheduledDateTime(new Date(d.getTime() - tzOffset).toISOString().slice(0, 16));
            setScheduleType('SCHEDULED');
          } catch (e) {
            setScheduleType('IMMEDIATE');
          }
        } else {
          setScheduleType('IMMEDIATE');
        }
      }
    } else if (adminMode === 'CREATE') {
      setTitle('');
      setShortTitle('');
      setCategory('Corporate Governance & Legal');
      setDivision('GENERAL_LEGAL');
      setSummary('');
      setSectionTitle('');
      setSectionContent('');
      setSectionBullets('');
      setSectionStatutes('');
      setScheduleType('IMMEDIATE');
    }
  }, [selectedPolicyId, adminMode, articles]);

  if (!isOpen) return null;

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passcodeAttempt.trim().toUpperCase();

    if (MASTER_PASSCODES.some((code) => code.toUpperCase() === cleanInput)) {
      setIsUnlocked(true);
      setPasscodeAttempt('');
      setShowPasscodeText(false);
      setPasscodeError('');
    } else {
      setPasscodeAttempt('');
      setPasscodeError('Access Denied: Invalid Security Passcode. Authorization Failed.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (adminMode === 'DELETE') {
      if (!selectedPolicyId) {
        setErrorMsg('Please select a policy to delete.');
        return;
      }
      if (onDeletePolicy) {
        onDeletePolicy(selectedPolicyId);
        setSuccessMsg('Policy deleted successfully. Locking administrative access...');
        setTimeout(() => {
          handleModalClose();
        }, 1200);
      }
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Policy Title is required.');
      return;
    }
    if (!summary.trim()) {
      setErrorMsg('Policy Summary is required.');
      return;
    }

    const bulletsList = sectionBullets
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const statutesList = sectionStatutes
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // Schedule Calculations
    const now = new Date();
    let isPublished = true;
    let targetDateISO = new Date().toISOString();

    if (scheduleType === 'SCHEDULED' && scheduledDateTime) {
      const selectedDate = new Date(scheduledDateTime);
      targetDateISO = selectedDate.toISOString();
      isPublished = selectedDate <= now;
    }

    if (adminMode === 'UPDATE') {
      if (!selectedPolicyId) {
        setErrorMsg('Please select an existing policy to update.');
        return;
      }

      const existing = articles.find((a) => a.id === selectedPolicyId);
      if (!existing) {
        setErrorMsg('Selected policy not found.');
        return;
      }

      const updatedArticle: Article = {
        ...existing,
        title: title.trim(),
        shortTitle: shortTitle.trim() || title.trim(),
        category: category.trim(),
        division: division,
        summary: summary.trim(),
        scheduledPublishDate: targetDateISO,
        isPublished: isPublished,
        sections: [
          {
            id: existing.sections[0]?.id || `sec-${selectedPolicyId}-01`,
            sectionNumber: existing.sections[0]?.sectionNumber || 'Section .01',
            title: sectionTitle.trim() || 'General Policy Provisions & Operational Scope',
            content: sectionContent.trim() || summary.trim(),
            bullets: bulletsList.length > 0 ? bulletsList : undefined,
            statutes: statutesList.length > 0 ? statutesList : ['Mont. Code Ann. § 30-14-101'],
          },
          ...existing.sections.slice(1),
        ],
      };

      if (onUpdatePolicy) {
        onUpdatePolicy(updatedArticle);
        setSuccessMsg('Policy updated & republished successfully! Locking administrative access...');
        setTimeout(() => {
          handleModalClose();
        }, 1200);
      }
      return;
    }

    // CREATE Mode
    const nextArticleNum = existingArticleCount + 1;
    const romanNumerals = [
      'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
      'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'
    ];
    const roman = romanNumerals[nextArticleNum - 1] || `${nextArticleNum}`;
    const newArtId = `article-${nextArticleNum}`;

    const newArticle: Article = {
      id: newArtId,
      articleNumber: `ARTICLE ${roman}`,
      title: title.trim(),
      shortTitle: shortTitle.trim() || title.trim(),
      category: category.trim(),
      division: division,
      iconName: 'FileText',
      summary: summary.trim(),
      scheduledPublishDate: targetDateISO,
      isPublished: isPublished,
      sections: [
        {
          id: `sec-${nextArticleNum}-01`,
          sectionNumber: `Section ${nextArticleNum}.01`,
          title: sectionTitle.trim() || 'General Policy Provisions & Operational Scope',
          content: sectionContent.trim() || summary.trim(),
          bullets: bulletsList.length > 0 ? bulletsList : undefined,
          statutes: statutesList.length > 0 ? statutesList : ['Mont. Code Ann. § 30-14-101', 'Corporate Governance Mandate'],
        },
      ],
    };

    onAddPolicy(newArticle);
    setSuccessMsg('New policy published successfully! Locking administrative access...');
    
    // Reset form
    setTitle('');
    setShortTitle('');
    setSummary('');
    setSectionTitle('');
    setSectionContent('');
    setSectionBullets('');
    setSectionStatutes('');
    setScheduleType('IMMEDIATE');
    setErrorMsg('');
    
    setTimeout(() => {
      handleModalClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleModalClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Passcode Lock View */}
        {!isUnlocked ? (
          <div className="flex flex-col">
            {/* Header */}
            <div className="bg-slate-950 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider font-mono">
                    Restricted Area
                  </span>
                </div>
              </div>

              <button
                onClick={handleModalClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleVerifyPasscode} className="p-6 sm:p-8 space-y-5 bg-slate-900 text-white">
              {passcodeError && (
                <div className="p-3.5 bg-rose-950/80 border border-rose-600/60 rounded-xl text-rose-200 text-xs font-semibold flex items-center gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{passcodeError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  Enter Authorization Passcode
                </label>
                <div>
                  <input
                    type="password"
                    value={passcodeAttempt}
                    onChange={(e) => {
                      setPasscodeAttempt(e.target.value);
                      setPasscodeError('');
                    }}
                    placeholder="Enter security passcode..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-amber-300 placeholder-slate-500 tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Authenticate & Unlock</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Unlocked Policy Creator Form */
          <>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Authenticated Admin Mode
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif mt-0.5">
                    Policy Administration Suite
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsUnlocked(false)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Immediately Lock Session"
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lock Area Now</span>
                </button>
                <button
                  onClick={handleModalClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800">
              {/* Admin Action Mode Selection Card */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Select Administrative Action
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    Passcode Authorized
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAdminMode('CREATE');
                      setSelectedPolicyId('');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      adminMode === 'CREATE'
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create New</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAdminMode('UPDATE');
                      if (articles.length > 0) setSelectedPolicyId(articles[0].id);
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      adminMode === 'UPDATE'
                        ? 'bg-amber-600 border-amber-400 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update Policy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAdminMode('DELETE');
                      if (articles.length > 0) setSelectedPolicyId(articles[0].id);
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      adminMode === 'DELETE'
                        ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Policy</span>
                  </button>
                </div>

                {/* Dropdown for selecting policy when in UPDATE or DELETE mode */}
                {(adminMode === 'UPDATE' || adminMode === 'DELETE') && (
                  <div className="pt-2 border-t border-slate-800 space-y-2 animate-in fade-in duration-150">
                    <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      Select Existing Policy to {adminMode === 'UPDATE' ? 'Update & Replace' : 'Delete'} *
                    </label>
                    <select
                      value={selectedPolicyId}
                      onChange={(e) => setSelectedPolicyId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-amber-500/50 rounded-xl text-xs font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      required
                    >
                      <option value="">-- Select a Policy ({articles.length} total) --</option>
                      {articles.map((art) => (
                        <option key={art.id} value={art.id}>
                          {art.articleNumber}: {art.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* DELETE MODE WARNING CARD */}
              {adminMode === 'DELETE' ? (
                <div className="p-5 bg-rose-950/20 border border-rose-300 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    Confirm Permanent Deletion
                  </div>
                  {selectedPolicyId ? (
                    <div className="p-3 bg-white border border-rose-200 rounded-xl space-y-1">
                      <p className="text-xs font-extrabold text-slate-900">
                        {articles.find((a) => a.id === selectedPolicyId)?.articleNumber}: {articles.find((a) => a.id === selectedPolicyId)?.title}
                      </p>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {articles.find((a) => a.id === selectedPolicyId)?.summary}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600">Please select a policy from the dropdown above to remove.</p>
                  )}
                  <p className="text-xs text-rose-800 font-medium">
                    ⚠️ Deleting this policy will immediately purge it from the site's active legal repository and search index.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Policy Title *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Master Artificial Intelligence Ethics & Usage Policy"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Short Display Title
                      </label>
                      <input
                        type="text"
                        value={shortTitle}
                        onChange={(e) => setShortTitle(e.target.value)}
                        placeholder="e.g. AI Ethics & Governance"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
                      />
                    </div>
                  </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Division Classification
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as DivisionCategory)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
                  >
                    <option value="GENERAL_LEGAL">Corporate Governance & General Legal</option>
                    <option value="DATA_PRIVACY">Data Privacy & Protection (MCDPA)</option>
                    <option value="INTELLECTUAL_PROPERTY">Intellectual Property & Licensing</option>
                    <option value="CONTENT_COMMUNITY">Content & Community Guidelines</option>
                    <option value="COMMERCE_RETURNS">Subscriptions & Commerce</option>
                    <option value="PAYMENTS_CHARGEBACKS">Payments & Chargebacks</option>
                    <option value="LEGAL_DISCLAIMERS">Corporate Disclaimers</option>
                    <option value="INTERNATIONAL_SHIPPING">International Shipping</option>
                    <option value="SHIPPING_DATA_PROTECTION">Shipping Data Protection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Category Headline
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Artificial Intelligence & Compliance"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Executive Policy Summary *
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="High-level corporate summary outlining the objectives and rules of this policy..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
                  required
                />
              </div>

              {/* Posting Schedule Selector Card */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-400 font-mono">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    Posting Schedule & Effective Date
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-mono font-bold">
                    {scheduleType === 'IMMEDIATE' ? '⚡ Immediate Post' : '📅 Scheduled Post'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setScheduleType('IMMEDIATE')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      scheduleType === 'IMMEDIATE'
                        ? 'bg-blue-600/30 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Send className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold">Post Immediately</p>
                      <p className="text-[10px] text-slate-400">Takes effect instantly & pops up immediately</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScheduleType('SCHEDULED')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      scheduleType === 'SCHEDULED'
                        ? 'bg-amber-600/30 border-amber-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold">Schedule Future Date & Time</p>
                      <p className="text-[10px] text-slate-400">Post immediately once effective date comes</p>
                    </div>
                  </button>
                </div>

                {scheduleType === 'SCHEDULED' && (
                  <div className="p-3.5 bg-slate-950 border border-amber-500/40 rounded-xl space-y-2 animate-in fade-in duration-150">
                    <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Select Effective Date & Time to Post *
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      required={scheduleType === 'SCHEDULED'}
                    />
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      💡 Policy will automatically publish and trigger the notification pop-up immediately once this scheduled date/time is reached.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Primary Section Details (Section .01)
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    placeholder="e.g. Scope & Technical Boundaries"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Section Narrative Content
                  </label>
                  <textarea
                    rows={3}
                    value={sectionContent}
                    onChange={(e) => setSectionContent(e.target.value)}
                    placeholder="Detailed legal clauses and operational rules for this section..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Key Bullets / Requirements (One per line)
                  </label>
                  <textarea
                    rows={2}
                    value={sectionBullets}
                    onChange={(e) => setSectionBullets(e.target.value)}
                    placeholder="Rule 1: Strict adherence required&#10;Rule 2: Minimum security verification"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Associated Statutes & Codes (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={sectionStatutes}
                    onChange={(e) => setSectionStatutes(e.target.value)}
                    placeholder="e.g. Mont. Code Ann. § 30-14-101, NIST AI RMF"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>
              </>
              )}

              {/* Form Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                {adminMode === 'DELETE' ? (
                  <button
                    type="submit"
                    disabled={!selectedPolicyId}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Confirm Delete Policy</span>
                  </button>
                ) : adminMode === 'UPDATE' ? (
                  <button
                    type="submit"
                    disabled={!selectedPolicyId}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-slate-950" />
                    <span>Save & Publish Policy Update</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Publish New Policy & Trigger Popup</span>
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

