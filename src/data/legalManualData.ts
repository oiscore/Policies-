import { Article } from '../types';

export const MANUAL_METADATA = {
  companyName: 'FRACTURE-VERSE LLC',
  documentTitle: 'Master Corporate Legal & Compliance Manual',
  effectiveDate: 'Aug 9, 2025',
  parentEntity: 'Fracture-Verse LLC',
  governingJurisdiction: 'State of Montana, USA',
  primaryStatutes: [
    'Montana Limited Liability Company Act (Mont. Code Ann. § 35-8)',
    'Montana Uniform Trade Secrets Act (Mont. Code Ann. § 30-14-401 et seq.)',
    'Montana Consumer Data Privacy Act (MCDPA)',
    'Americans with Disabilities Act (ADA) Title III',
    'Title 17 & Title 15 United States Code',
  ],
  contactEmail: 'accessibility@fracture-verse.com',
  complianceOffice: 'State of Montana, USA',
};

export const LEGAL_ARTICLES: Article[] = [
  {
    id: 'article-1',
    articleNumber: 'ARTICLE I',
    title: 'Corporate Governance',
    shortTitle: 'Corporate Governance',
    category: 'Parent Governance & IP',
    division: 'PARENT_GOVERNANCE',
    iconName: 'Building2',
    summary: 'Governing corporate structure under Montana Code. Defines authority, roles, and organizational framework.',
    sections: [
      {
        id: 'sec-1-01',
        sectionNumber: 'Section 1.01',
        title: 'Legal Structure and Controlling Authority',
        content:
          'Fracture-Verse LLC (hereafter referred to as the "Company") is a Limited Liability Company organized under the Montana Limited Liability Company Act (Mont. Code Ann. § 35-8). The Company operates as the master parent holding entity. All operating divisions, commercial subsidiaries, doing-business-as (DBA) designations, digital platforms, creative franchises, and brand software engines—including Dreadfracture Comics, Dreadfracture Films, Omega Sound Authority, FracturePedia, and OIS Core Emerald—are wholly owned, operated, managed, and legally held by Fracture-Verse LLC.',
        statutes: ['Mont. Code Ann. § 35-8'],
      },
      {
        id: 'sec-1-02',
        sectionNumber: 'Section 1.02',
        title: 'Master Intellectual Property Clause',
        content:
          'Pursuant to federal copyright law (17 U.S.C.), federal trademark law (15 U.S.C. § 1051 et seq.), the federal Defend Trade Secrets Act (18 U.S.C. § 1836), and the Montana Uniform Trade Secrets Act (Mont. Code Ann. § 30-14-401 et seq.), all intellectual property created under, alongside, or within any division of the Company is the sole, exclusive, unencumbered, and perpetual property of Fracture-Verse LLC.\n\nNo individual division, contractor, employee, officer, artist, writer, engineer, or third party holds independent title or co-ownership to trademarks, copyrighted works, story arcs, character designs, master audio recordings, software codebases, database assets, or trade secrets.',
        statutes: ['17 U.S.C.', '15 U.S.C. § 1051 et seq.', '18 U.S.C. § 1836', 'Mont. Code Ann. § 30-14-401 et seq.'],
      },
      {
        id: 'sec-1-03',
        sectionNumber: 'Section 1.03',
        title: 'Strict Unsolicited Submissions Policy',
        content:
          'To protect the Company against false, frivolous, or predatory legal claims alleging copyright infringement, idea theft, breach of implied contract, or conversion:',
        bullets: [
          'Zero-Acceptance Rule: The Company, its employees, executive officers, and contractors strictly enforce a zero-acceptance policy regarding unsolicited scripts, treatment drafts, character pitches, audio tracks, visual art, lore documents, or software code.',
          'Immediate Destruction Protocol: Any unsolicited submission received via email, web form, physical mail, or digital transmission will be permanently deleted, erased, or physically destroyed immediately without being read, opened, logged, or reviewed by creative personnel.',
        ],
      },
    ],
  },
  {
    id: 'article-2',
    articleNumber: 'ARTICLE II',
    title: 'Comics & Publishing',
    shortTitle: 'Comics & Publishing',
    category: 'Dreadfracture Comics',
    division: 'COMICS',
    iconName: 'BookOpen',
    summary: 'Work-made-for-hire copyright mandates under 17 U.S.C. §101. Covers comics, publishing, and related intellectual property.',
    sections: [
      {
        id: 'sec-2-01',
        sectionNumber: 'Section 2.01',
        title: 'Work-Made-For-Hire Mandate',
        content:
          'All sequential artwork, pencil sketches, ink renders, color layouts, lettering, typography, script text, story treatments, character designs, universe lore, and graphic novel files generated for Dreadfracture Comics are legally categorized as "Works Made for Hire" under 17 U.S.C. § 101.',
        bullets: [
          'Vesting of Rights: Full copyright ownership, title, and all derivative usage rights vest immediately and automatically in Fracture-Verse LLC upon creation.',
          'Mandatory Pre-requisite: No freelance artist, writer, colorist, letterer, or editor may commence work, access proprietary production assets, or receive compensation without an executed Work-Made-For-Hire & Intellectual Property Assignment Agreement.',
        ],
        statutes: ['17 U.S.C. § 101'],
      },
      {
        id: 'sec-2-02',
        sectionNumber: 'Section 2.02',
        title: 'Trademark & Character Protection',
        content:
          'All character names, visual appearances, costuming, logos, symbols, universe locations, magical/tech systems, faction emblems, and distinct plot titles are protected trademarks and assets of Fracture-Verse LLC.',
        bullets: [
          'Prohibition of Derivative Works: Unauthorized commercial reproduction, distribution, minting, or fan-art sales featuring Dreadfracture Comics characters or elements are strictly prohibited.',
          'Legal Recourse: Violations will be met with immediate statutory DMCA takedown notices, cease-and-desist mandates, and injunctive proceedings under Mont. Code Ann. § 30-14-101 et seq.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101 et seq.'],
      },
    ],
  },
  {
    id: 'article-3',
    articleNumber: 'ARTICLE III',
    title: 'Film & Motion Pictures',
    shortTitle: 'Film & Motion Pictures',
    category: 'Dreadfracture Films',
    division: 'FILMS',
    iconName: 'Clapperboard',
    summary: 'Perpetual global talent releases, physical production rights, and distribution agreements.',
    sections: [
      {
        id: 'sec-3-01',
        sectionNumber: 'Section 3.01',
        title: 'Production Waivers & Talent Releases',
        content:
          'No actor, extra, stunt performer, voice artist, director, videographer, sound mixer, or crew member may access a physical film set or digital production pipeline without an executed, unrevocable Talent & Likeness Release Agreement.',
        bullets: [
          'Perpetual Global Scope: Releases grant Fracture-Verse LLC worldwide, perpetual, royalty-free rights to utilize the performer’s image, physical likeness, voice, performance, and name across all media formats, theatrical releases, trailers, physical home media, and streaming channels.',
          'Waiver of Moral Rights: All talent and contractors explicitly waive moral rights, rights of inspection, or approval authority over final video cuts, color grading, motion graphics, visual effects, or sound synchronization.',
        ],
      },
      {
        id: 'sec-3-02',
        sectionNumber: 'Section 3.02',
        title: 'Physical Production Liability & Set Safety',
        content: '',
        bullets: [
          'Safety Compliance: All video shoots and physical set operations must conform to applicable federal, state, and occupational safety rules.',
          'Liability Release: Contractors, performers, crew members, and guests assume all inherent risks associated with set equipment and production activity. Fracture-Verse LLC, its executive officers, and members are fully released from liability for personal injury, property loss, or equipment damage occurring on location, subject to Montana civil liability limits.',
        ],
      },
      {
        id: 'sec-3-03',
        sectionNumber: 'Section 3.03',
        title: 'Video Asset Trade Secret Protocol',
        content:
          'Raw camera footage, unedited logs, storyboards, animatics, visual effects (VFX) renders, script revisions, and unreleased trailers are classified as Strict Trade Secrets under Mont. Code Ann. § 30-14-402. Leaks or unauthorized distributions trigger immediate contract termination, liquid damages, and emergency injunctive relief.',
        statutes: ['Mont. Code Ann. § 30-14-402'],
      },
    ],
  },
  {
    id: 'article-4',
    articleNumber: 'ARTICLE IV',
    title: 'Audio & Music Production',
    shortTitle: 'Audio & Music Production',
    category: 'Omega Sound Authority',
    division: 'SOUND',
    iconName: 'Music',
    summary: 'Dual-layer audio copyright protection, sample clearance, and music production rights.',
    sections: [
      {
        id: 'sec-4-01',
        sectionNumber: 'Section 4.01',
        title: 'Dual-Layer Audio Copyright Protection',
        content:
          'For every musical work, sound effect (SFX), film score, background arrangement, or vocal track produced under Omega Sound Authority, the Company enforces separate legal ownership over two distinct statutory protections:',
        bullets: [
          'The Musical Composition: The underlying written notes, chords, lyrics, sheet music, and structural arrangements.',
          'The Master Sound Recording: The actual recorded, mixed, and mastered digital audio file.',
          'All sound designers, composers, beatmakers, session musicians, and mix engineers must sign written assignments confirming that both the Composition and Master recordings belong 100% to Fracture-Verse LLC.',
        ],
      },
      {
        id: 'sec-4-02',
        sectionNumber: 'Section 4.02',
        title: 'Sample Clearance Warranty & Indemnification',
        content: '',
        bullets: [
          'Mandatory Warranty: Every audio contributor warrants under legal contract that all instruments, synthesizer presets, recorded audio loops, and sound samples used are 100% original, royalty-free, or fully licensed to Fracture-Verse LLC for worldwide commercial exploitation.',
          'Contractor Indemnification: Any contractor who introduces uncleared, copyrighted audio material into a Company track agrees to fully indemnify, defend, and hold harmless Fracture-Verse LLC from all legal fees, penalties, settlements, and third-party infringement damages.',
        ],
      },
      {
        id: 'sec-4-03',
        sectionNumber: 'Section 4.03',
        title: 'Synchronization (Sync) Licensing Standards',
        content:
          'Any external party seeking to use Omega Sound Authority audio in television, films, video games, commercials, or online streams must obtain an executed Synchronization (Sync) License specifying term limits, territorial bounds, and performance royalties payable to Fracture-Verse LLC.',
      },
    ],
  },
  {
    id: 'article-5',
    articleNumber: 'ARTICLE V',
    title: 'Lore & Wiki Platform',
    shortTitle: 'Lore & Wiki Platform',
    category: 'FracturePedia',
    division: 'FRACTUREPEDIA',
    iconName: 'Globe',
    summary: 'Automatic UGC legal copyright assignment, community content rules, and platform guidelines.',
    sections: [
      {
        id: 'sec-5-01',
        sectionNumber: 'Section 5.01',
        title: 'User-Generated Content (UGC) Legal Assignment',
        content:
          'By registering, posting, editing, or submitting lore entries, character descriptions, timeline updates, or worldbuilding content on FracturePedia, all users automatically assign all right, title, and copyright ownership to Fracture-Verse LLC.',
        bullets: [
          'No Ownership or Equity Claims: User participation, lore suggestions, or wiki editing confers zero ownership rights, stock options, equity, or revenue-sharing rights in the Dreadfracture brand or its adaptations.',
          'Canonical Executive Authority: Fracture-Verse LLC retains sole authority to accept, modify, reject, or mark entries as "Official Canon."',
        ],
      },
      {
        id: 'sec-5-02',
        sectionNumber: 'Section 5.02',
        title: 'Automated Scraping & Data Protection',
        content:
          'Automated web scraping, web crawling, data mining, or content harvesting from FracturePedia for third-party databases, commercial archives, or external AI model training without express written approval from Fracture-Verse LLC is strictly forbidden. Violations constitute actionable breach of terms and computer trespass under applicable state and federal statutes.',
      },
    ],
  },
  {
    id: 'article-6',
    articleNumber: 'ARTICLE VI',
    title: 'Software Architecture & Engines',
    shortTitle: 'Software Architecture & Engines',
    category: 'OIS Core Emerald',
    division: 'OIS_CORE',
    iconName: 'Cpu',
    summary: 'Source code & algorithm trade secret protections, licensing, and development standards.',
    sections: [
      {
        id: 'sec-6-01',
        sectionNumber: 'Section 6.01',
        title: 'Trade Secret Protection of Source Code & Architecture',
        content:
          'The software codebase, algorithm scripts, database schemas, API architecture, neural network configurations, system interfaces, and operational pipelines powering OIS Core Emerald are proprietary Trade Secrets protected under Mont. Code Ann. § 30-14-401 et seq. and the Defend Trade Secrets Act.',
        bullets: [
          'Principle of Least Privilege (PoLP): Technical infrastructure access is granted strictly on a need-to-know basis under encrypted, logged credentials.',
          'Engineer NDAs: All software developers, system architects, and technical contractors working on OIS Core Emerald must execute Non-Disclosure Agreements containing strict confidentiality, non-solicitation, and non-compete provisions permissible under Montana state law.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-401 et seq.', 'Defend Trade Secrets Act'],
      },
      {
        id: 'sec-6-02',
        sectionNumber: 'Section 6.02',
        title: 'Service Disclaimers & System Security',
        content: '',
        bullets: [
          'Uptime & Service Liability Limits: User terms for applications powered by OIS Core Emerald disclaim corporate legal liability for temporary network outages, server downtime, cloud carrier interruptions, or data packet loss.',
          'Security Controls: System operations mandate continuous multi-factor authentication (MFA), encrypted logging, periodic code security audits, and firewall monitoring to preserve infrastructure integrity.',
        ],
      },
    ],
  },
  {
    id: 'article-7',
    articleNumber: 'ARTICLE VII',
    title: 'Accessibility & ADA',
    shortTitle: 'Accessibility & ADA',
    category: 'ADA Conformance',
    division: 'ACCESSIBILITY',
    iconName: 'Accessibility',
    summary: 'WCAG 2.1 Level AA technical standards under ADA Title III. Accessibility compliance guide.',
    sections: [
      {
        id: 'sec-7-01',
        sectionNumber: 'Section 7.01',
        title: 'Corporate Accessibility Commitment',
        content:
          'Fracture-Verse LLC is dedicated to ensuring digital accessibility for individuals with disabilities across all digital properties, websites, and web services operated by its parent and subsidiary brands (Dreadfracture Comics, Dreadfracture Films, Omega Sound Authority, FracturePedia, and OIS Core Emerald).',
        statutes: ['ADA Title III'],
      },
      {
        id: 'sec-7-02',
        sectionNumber: 'Section 7.02',
        title: 'WCAG 2.1 Level AA Technical Standards',
        content:
          'Our digital platforms aim to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards under Title III of the Americans with Disabilities Act (ADA):',
        bullets: [
          'Perceivable: Text alternatives provided for non-text content, image assets, audio cues, and video releases; structured document headings and sufficient contrast ratios.',
          'Operable: User interfaces fully navigable using keyboard commands, screen reader software, and assistive technology without focus traps.',
          'Understandable: Consistent site navigation, clear error handling, and predictable interface responses across all brand portals.',
          'Robust: HTML/CSS architecture maintained for compatibility with screen readers (e.g., NVDA, JAWS, VoiceOver) and assistive devices.',
        ],
        statutes: ['WCAG 2.1 Level AA', 'ADA Title III'],
      },
      {
        id: 'sec-7-03',
        sectionNumber: 'Section 7.03',
        title: 'Accessibility Feedback & Alternate Formats',
        content:
          'If you encounter an accessibility barrier on any Fracture-Verse LLC property or require documentation in an accessible alternate format, submit requests to our compliance coordinator:\n\n• Legal Entity: Fracture-Verse LLC\n• Compliance Office: State of Montana, USA\n• Accessibility Email: accessibility@fracture-verse.com\n\nTo facilitate resolution, please detail:\n1. The target web address (URL) or digital app interface.\n2. The specific accessibility issue or technology barrier encountered.\n3. Your preferred alternate accessible format.',
      },
    ],
  },
  {
    id: 'article-8',
    articleNumber: 'ARTICLE VIII',
    title: 'Privacy & Data Rights',
    shortTitle: 'Privacy & Data Rights',
    category: 'Cookie & MCDPA Policy',
    division: 'COOKIE_PRIVACY',
    iconName: 'Cookie',
    summary: 'Compliance with Montana Consumer Data Privacy Act (MCDPA) and data rights.',
    sections: [
      {
        id: 'sec-8-01',
        sectionNumber: 'Section 8.01',
        title: 'Scope and Legal Compliance',
        content:
          'This policy details how Fracture-Verse LLC uses cookies, tracking pixels, local storage, and server analytics across all brand domains. This policy complies with the Montana Consumer Data Privacy Act (MCDPA) (Mont. Code Ann. § 30-14-101 et seq.) and federal data transparency rules.',
        statutes: ['MCDPA (Mont. Code Ann. § 30-14-101 et seq.)'],
      },
      {
        id: 'sec-8-02',
        sectionNumber: 'Section 8.02',
        title: 'Categorization of Cookies',
        content: 'Categorization matrix defining operational functions and legal consent requirements:',
        table: [
          {
            tier: '1. Strictly Necessary',
            function:
              'Required for basic website navigation, user login sessions, security authentication (OIS Core Emerald), and payment checkout.',
            consentBasis: 'Exempt from opt-out; mandatory for execution.',
          },
          {
            tier: '2. Functional',
            function:
              'Remembers user layout settings, workspace preferences, language selections, and audio player volumes.',
            consentBasis: 'Voluntary; managed via preference centers.',
          },
          {
            tier: '3. Performance & Analytics',
            function:
              'Collects anonymous usage telemetry, traffic metrics, load speed diagnostics, and error reporting to optimize platform stability.',
            consentBasis: 'Subject to Opt-Out under MCDPA.',
          },
          {
            tier: '4. Targeted Media/Advertising',
            function:
              'Tracks campaign performance across film teasers (Dreadfracture Films), audio drops (Omega Sound Authority), and store promotions.',
            consentBasis: 'Opt-Out Eligible / Prior Opt-In for Sensitive Data.',
          },
        ],
      },
      {
        id: 'sec-8-03',
        sectionNumber: 'Section 8.03',
        title: 'Privacy Rights & Opt-Out Preferences (MCDPA)',
        content: 'Pursuant to the Montana Consumer Data Privacy Act:',
        bullets: [
          'Right to Opt-Out: Users possess the legal right to opt-out of data processing collected via non-essential cookies for targeted advertising, analytics profiling, or commercial data transfers.',
          'Global Privacy Control (GPC): All Fracture-Verse LLC digital domains recognize and process automated Global Privacy Control (GPC) opt-out preference signals sent by compliant web browsers.',
          'Consent Modification: Users may update, modify, or revoke cookie consents at any time by clicking the "Privacy Settings / Cookie Preferences" link in the footer of any Company property.',
        ],
        statutes: ['MCDPA'],
      },
    ],
  },
  {
    id: 'article-9',
    articleNumber: 'ARTICLE IX',
    title: 'Enforcement & Jurisdiction',
    shortTitle: 'Enforcement & Jurisdiction',
    category: 'Enforcement & Jurisdiction',
    division: 'ENFORCEMENT',
    iconName: 'ShieldAlert',
    summary: 'Governing law, dispute resolution, venue, and enforcement procedures.',
    sections: [
      {
        id: 'sec-9-01',
        sectionNumber: 'Section 9.01',
        title: 'Governing Law & Mandatory Jurisdiction',
        content:
          'This Corporate Manual and all operating policies are governed by, construed, and enforced in accordance with the laws of the State of Montana, USA, without regard to conflict of law principles. Any lawsuit, arbitration, or legal proceeding arising under or related to Fracture-Verse LLC or its operating divisions shall be brought exclusively in state or federal courts located within the State of Montana.',
        statutes: ['State of Montana Jurisdiction'],
      },
      {
        id: 'sec-9-02',
        sectionNumber: 'Section 9.02',
        title: 'Non-Waiver',
        content:
          "Failure by Fracture-Verse LLC to enforce strict performance of any provision or right within these policies shall not be construed as a waiver of the Company's right to enforce such provision or any other right in the future.",
      },
      {
        id: 'sec-9-03',
        sectionNumber: 'Section 9.03',
        title: 'Severability',
        content:
          'If any article, section, or clause of this legal manual is ruled invalid, illegal, or unenforceable by a court of competent jurisdiction, such ruling shall not impair or invalidate the remaining articles, sections, or clauses, which shall remain in full legal force and effect.',
      },
    ],
  },
];
