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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            Welcome to the Master Corporate Legal & Compliance Manual
          </h1>
          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            Your central hub for all corporate policies, governance documents, and compliance guidelines.
          </p>
        </div>

        {/* Hero Banner Stats Bar */}
        <div className="flex items-center gap-6 sm:gap-10 pt-2 border-t border-blue-500/40">
          <div className="flex items-center gap-3">
            <div className="text-white opacity-90">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold font-mono leading-none">9</div>
              <div className="text-[11px] text-blue-200 mt-0.5">Articles</div>
            </div>
          </div>

          <div className="h-8 w-px bg-blue-500/40" />

          <div>
            <div className="text-lg font-bold font-mono leading-none">24</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Sections</div>
          </div>

          <div className="h-8 w-px bg-blue-500/40" />

          <div>
            <div className="text-lg font-bold font-mono leading-none">100%</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Compliance</div>
          </div>
        </div>
      </div>
    </section>
  );
};
