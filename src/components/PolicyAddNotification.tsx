import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { Sparkles, FileText, ArrowRight, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PolicyAddNotificationProps {
  queue: Article[];
  onDismissCurrent: () => void;
  onViewPolicy: (article: Article) => void;
}

export const PolicyAddNotification: React.FC<PolicyAddNotificationProps> = ({
  queue,
  onDismissCurrent,
  onViewPolicy,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);

  const currentArticle = queue.length > 0 ? queue[0] : null;

  useEffect(() => {
    if (!currentArticle) return;

    // Reset progress when a new item comes to the front of queue
    setProgress(100);

    const DURATION = 8000; // 8 seconds per notification
    const INTERVAL = 100;
    const step = (INTERVAL / DURATION) * 100;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= step) {
            clearInterval(timer);
            onDismissCurrent();
            return 100;
          }
          return prev - step;
        });
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [currentArticle?.id, isPaused, onDismissCurrent]);

  if (!currentArticle) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-8 duration-300 pointer-events-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-slate-900/95 backdrop-blur-xl border border-blue-500/50 rounded-2xl shadow-2xl p-4 sm:p-5 text-white relative overflow-hidden group">
        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-teal-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content Container */}
        <div className="flex items-start gap-3 pt-1">
          {/* Animated Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0 pr-6">
            {/* Header Badge & Queue Counter */}
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                New Policy Added
              </span>

              {queue.length > 1 && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                  1 of {queue.length} in queue
                </span>
              )}
            </div>

            {/* Title Notification Announcement */}
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Policy Announcement
            </h4>
            <p className="text-sm font-bold text-white mt-0.5 line-clamp-2 leading-snug">
              {currentArticle.articleNumber ? `${currentArticle.articleNumber}: ` : ''}
              {currentArticle.title}
            </p>

            {/* Short Category / Summary snippet */}
            <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {currentArticle.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => {
                  onViewPolicy(currentArticle);
                  onDismissCurrent();
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md hover:shadow-blue-500/20 cursor-pointer"
              >
                <span>Read Full Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onDismissCurrent}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors border border-slate-700 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Acknowledge</span>
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onDismissCurrent}
            className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
