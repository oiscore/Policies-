import React from 'react';
import { ShieldCheck, Lock, Users, Award } from 'lucide-react';

export const ComplianceGrid: React.FC = () => {
  const complianceItems = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: 'Jurisdiction & Governance',
      subtitle: 'Mont. Code Ann. § 35-8',
      desc: 'Masterparent holding entity governing all DBAs, digital platforms & creative franchises.',
      badgeColor: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      title: 'MCDPA Consumer Privacy',
      subtitle: 'Montana Privacy Mandate',
      desc: 'Strict consumer data privacy tiers, zero data sales, & mandatory opt-out protections.',
      badgeColor: 'bg-indigo-50 border-indigo-200',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: 'Work-Made-For-Hire IP',
      subtitle: '17 U.S.C. § 101 Assignment',
      desc: 'Full perpetual copyright & trademark vesting in Fracture-Verse LLC across all creative work.',
      badgeColor: 'bg-purple-50 border-purple-200',
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: 'ADA Title III Conforming',
      subtitle: 'WCAG 2.1 Level AA',
      desc: 'Full digital accessibility compliance with dedicated accessibility coordinator support.',
      badgeColor: 'bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <section className="no-print my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceItems.map((item, idx) => (
          <div
            key={idx}
            className="blueprint-card rounded-2xl p-4 sm:p-5 bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center justify-between transition-all hover:-translate-y-0.5 aspect-[2.1/1] min-h-[160px] w-full"
          >
            <div className="flex flex-col items-center space-y-1.5 my-auto">
              {/* Centered Circular Icon Badge (Blueprint circular icon card) */}
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-xs ${item.badgeColor}`}
              >
                {item.icon}
              </div>

              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-sans">{item.title}</h3>
                <p className="text-[10px] sm:text-[11px] font-mono font-semibold text-blue-600">{item.subtitle}</p>
              </div>

              <p className="text-[11px] text-slate-500 leading-snug font-sans line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
