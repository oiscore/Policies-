import React from 'react';
import { Scale } from 'lucide-react';

interface HeroBannerProps {
  onDownloadFullPDF?: () => void;
  onOpenSearch?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  return (
    <section className="no-print relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white p-6 sm:p-8 lg:p-9 shadow-md">
      {/* Background Scale of Justice Watermark Graphic */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block">
        <Scale className="w-64 h-64 text-white stroke-1" />
      </div>

      <div className="relative z-10 space-y-6 max-w-2xl">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              Welcome to Fracture Verse LLC Legal & Compliance
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-800/90 border border-blue-400/40 text-xs font-bold text-blue-100 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Effective date : August 12th 2026</span>
          </div>
          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            We're glad you're here. Find company policies, division guidelines, and legal standards all in one easy place.
          </p>

          <div className="bg-blue-700/80 border border-blue-400/40 rounded-xl p-3 text-xs text-blue-100 flex items-start gap-2.5 shadow-inner">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-300 mt-1 shrink-0 animate-pulse" />
            <div>
              <p className="font-semibold text-white">Notice of Policy Updates & System Governance:</p>
              <p className="mt-0.5 opacity-90">
                All policies and manuals herein are official live corporate documents and are subject to change or modification at any time without prior notice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
