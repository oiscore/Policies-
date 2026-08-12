import { Article } from '../types';

export const MANUAL_METADATA = {
  companyName: 'FRACTURE-VERSE LLC',
  owner: 'Bruce Vacini CEO and founder',
  documentTitle: 'Master Corporate Legal & Compliance Manual',
  effectiveDate: 'August 12th 2026',
  version: 'Ois core emerald v1.0',
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
          'Automated web scraping, web crawling, data mining, or content harvesting from FracturePedia for third-party databases, commercial archives, or external automated model training without express written approval from Fracture-Verse LLC is strictly forbidden. Violations constitute actionable breach of terms and computer trespass under applicable state and federal statutes.',
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
  {
    id: 'article-10',
    articleNumber: 'ARTICLE X',
    title: 'Master Subscription, Renewal & Recurring Billing Policy',
    shortTitle: 'Subscriptions & Recurring Billing',
    category: 'Commercial Subscriptions & Accounts',
    division: 'COMMERCE_RETURNS',
    iconName: 'ShoppingBag',
    summary: 'Master corporate policy governing subscription services, recurring billing (ROSCA compliance), auto-renewals, payments, cancellations, refunds, pauses, upgrades, downgrades, free trials, promotional offers, gift cards, customer accounts, failed payments, and account suspensions.',
    sections: [
      {
        id: 'sec-10-01',
        sectionNumber: 'Section 10.01',
        title: 'Subscription Policy, Auto-Renewal & Recurring Billing Mandate',
        content:
          'This Master Subscription Policy establishes the binding rules governing all software-as-a-service (SaaS) plans, recurring digital memberships, cloud engine access (including OIS Core Emerald), and publication subscriptions offered by Fracture-Verse LLC and its operating divisions.\n\nIn compliance with the Restore Online Shoppers’ Confidence Act (ROSCA, 15 U.S.C. § 8401 et seq.) and Mont. Code Ann. § 30-14-101:',
        bullets: [
          'Subscription Policy Scope: All subscriptions are provided on a continuous, recurring billing basis (monthly, quarterly, or annually) as selected by the customer during checkout.',
          'Explicit Auto-Renewal Consent: By subscribing, the customer provides explicit affirmative consent for Fracture-Verse LLC to automatically charge the saved payment method on each recurring billing cycle anniversary without requiring further affirmative action.',
          'Recurring Billing Authorization: Subscription fees are billed automatically at the beginning of each billing period. Charges appear on card statements under the authorized merchant billing descriptor.',
          'Pre-Renewal Notifications: For annual or long-term subscription tiers, advance written notification will be sent to the customer’s registered email address at least fifteen (15) calendar days prior to the auto-renewal date, detailing the upcoming charge amount and cancellation instructions.',
        ],
        statutes: ['ROSCA (15 U.S.C. § 8401 et seq.)', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-10-02',
        sectionNumber: 'Section 10.02',
        title: 'Subscription Payment & Failed Payment Protocol',
        content:
          'Subscribers are required to maintain valid, unexpired payment method details associated with their customer account at all times.',
        bullets: [
          'Subscription Payment Obligation: Subscription fees are due in full on or before the first day of each billing cycle.',
          'Failed Payment & Retry Logic: If a recurring subscription payment fails due to card expiration, insufficient funds, or bank refusal, the system will initiate an automated payment retry sequence (retrying at 3-day, 5-day, and 7-day intervals).',
          'Grace Period & Service Suspension: Subscribers are granted a three (3) calendar day grace period to update payment details following an initial failed payment. If payment is not successfully processed by day seven (7), subscription access will be automatically suspended.',
          'Account Default & Collection: Continued non-payment beyond fourteen (14) days will result in formal subscription termination, cancellation of accrued promotional benefits, and potential debt collection for earned unpaid balances.',
        ],
        statutes: ['UCC Article 2', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-10-03',
        sectionNumber: 'Section 10.03',
        title: 'Subscription Cancellation & Refund Policy',
        content:
          'Fracture-Verse LLC provides simple, transparent subscription cancellation mechanisms in compliance with federal "click-to-cancel" regulations.',
        bullets: [
          'Online Cancellation Access: Subscribers may cancel their subscription auto-renewal at any time via their online Customer Account portal settings or by contacting customer support.',
          '14-Day Initial Money-Back Refund Window: Subscribers who purchase a new subscription plan or upgraded membership tier are eligible for a 100% full refund if the cancellation and refund request is submitted within fourteen (14) calendar days of initial purchase.',
          'Post-14-Day Cancellation Terms: Cancellation requests initiated after the 14-day window will prevent auto-renewal for future billing cycles. Subscription access remains fully active through the end of the current paid billing term, but paid subscription fees become strictly non-refundable and non-prorated.',
          'Cancellation Confirmation: A formal digital cancellation confirmation receipt will be delivered via email upon successful cancellation processing.',
        ],
        statutes: ['16 C.F.R. Part 425 (FTC Negative Option Rule)', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-10-04',
        sectionNumber: 'Section 10.04',
        title: 'Subscription Modification, Pause, Upgrade & Downgrade Protocol',
        content:
          'Subscribers may modify their active subscription tier, billing frequency, or operational state in accordance with the following terms:',
        bullets: [
          'Subscription Pause Policy: Active subscribers in good standing may request to pause their subscription for a minimum of thirty (30) days and a maximum of ninety (90) calendar days per rolling 12-month period. During a pause, recurring billing is suspended and access to premium features is temporarily paused.',
          'Subscription Upgrade Policy: Upgrades to higher-tier subscription plans take effect immediately upon request. The account will be charged a prorated price difference for the remainder of the current billing cycle.',
          'Subscription Downgrade Policy: Downgrades to lower-tier plans take effect at the conclusion of the current paid billing term. No prorated refunds are issued for mid-cycle downgrades.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-10-05',
        sectionNumber: 'Section 10.05',
        title: 'Free Trial, Promotional Offers & Discount Policy',
        content:
          'Promotional incentives, discount codes, and trial subscriptions are administered under strict corporate fairness and anti-abuse guidelines:',
        bullets: [
          'Free Trial Policy: Where offered, free trials grant temporary, full access for a specified duration (e.g., 7 or 14 days). Valid credit card details are required at setup. Unless canceled prior to trial expiration, the account automatically converts to a paid recurring subscription at the published standard rate.',
          'Promotional Offers & Discount Stacking Limits: Promotional discount codes, coupon codes, and introductory pricing offers are valid for single use per customer/household and cannot be combined, stacked, or applied retroactively to existing active subscriptions.',
          'Expiration & Revocation: Promotional offers expire on the date published and may be revoked or modified at executive discretion prior to redemption in cases of suspected fraud or technical error.',
        ],
        statutes: ['FTC Act (15 U.S.C. § 45)', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-10-06',
        sectionNumber: 'Section 10.06',
        title: 'Gift Card & Store Credit Administration Policy',
        content:
          'Digital gift cards and store credits issued by Dreadfracture Comics or Fracture-Verse LLC are governed by state and federal store value laws:',
        bullets: [
          'No Expiration Date: Pursuant to the Credit CARD Act of 2009 (12 U.S.C. § 5301) and Mont. Code Ann. § 30-14-108, gift card balances and store credits issued by the Company never expire and carry zero dormancy fees.',
          'Non-Redeemable for Cash: Gift cards and promotional store credits cannot be redeemed for cash, refunded, or transferred to another account, except where explicitly mandated by applicable state law.',
          'Loss or Theft Disclaimer: Fracture-Verse LLC is not responsible for lost, stolen, or unauthorized usage of digital gift card codes once delivered to the purchaser or designated recipient.',
        ],
        statutes: ['Credit CARD Act of 2009 (12 U.S.C. § 5301)', 'Mont. Code Ann. § 30-14-108'],
      },
      {
        id: 'sec-10-07',
        sectionNumber: 'Section 10.07',
        title: 'Customer Account & Account Suspension Policy',
        content:
          'Maintain clean, compliant customer account records and enforcing security procedures across all digital portals:',
        bullets: [
          'Customer Account Responsibility: Account holders are solely responsible for maintaining account credential confidentiality and for all activities, purchases, and subscriptions executed under their account credentials.',
          'Account Sharing Prohibition: User account login credentials and paid subscription access cannot be sold, rented, shared, or transferred to third parties.',
          'Account Suspension Policy: Fracture-Verse LLC reserves the right to immediately suspend or permanently terminate customer accounts without prior notice for: (a) fraudulent payment disputes or chargebacks; (b) unauthorized copying, distribution, or piracy of digital content; (c) abusive conduct toward staff; or (d) material breach of any company policy.',
        ],
        statutes: ['18 U.S.C. § 1030', 'Mont. Code Ann. § 30-14-101'],
      },
    ],
  },
  {
    id: 'article-11',
    articleNumber: 'ARTICLE XI',
    title: 'Universal Employee Handbook & Mandatory Rules',
    shortTitle: 'Employee Handbook & Rules',
    category: 'Universal Employee Handbook',
    division: 'EMPLOYEE_HANDBOOK',
    iconName: 'UserCheck',
    summary: 'Universal employee handbook governing all personnel across Fracture-Verse LLC and operating divisions. Enforces strict mandatory rules, no paid time off or paid sick leave, formal grievance procedures, and mandatory adherence to all company policies.',
    sections: [
      {
        id: 'sec-11-01',
        sectionNumber: 'Section 11.01',
        title: 'Universal Scope & Strict Mandatory Applicability',
        content:
          'This Universal Employee Handbook establishes binding workplace policies, rules of conduct, operational standards, and legal obligations across Fracture-Verse LLC and all wholly owned subsidiaries, DBAs, and digital properties (including Dreadfracture Comics, Dreadfracture Films, Omega Sound Authority, FracturePedia, and OIS Core Emerald).',
        bullets: [
          'Universal Scope: These policies apply strictly and universally to all full-time employees, part-time employees, temporary workers, seasonal staff, independent contractors, creative freelancers, and executive officers.',
          'Mandatory Compliance: Every employee policy and workplace rule set forth herein is strictly mandatory. Unwritten arrangements, informal waivers, or verbal exemptions are legally void and strictly prohibited.',
          'Acknowledgement & Binding Nature: Continued employment or contractual engagement constitutes legal acknowledgement and agreement to abide by all rules and procedures contained within this Manual.',
        ],
        statutes: ['Mont. Code Ann. § 35-8', 'State of Montana Employment Rules'],
      },
      {
        id: 'sec-11-02',
        sectionNumber: 'Section 11.02',
        title: 'Work Hours, Attendance & Strict No Paid Leave Policy',
        content:
          'Fracture-Verse LLC maintains strict operational attendance standards and enforces a explicit non-paid leave structure across all divisions:',
        bullets: [
          'No Paid Time Off (PTO): The Company strictly does NOT offer paid time off (PTO), paid vacation days, paid personal days, or paid floating holidays.',
          'No Paid Sick Leave: The Company strictly does NOT provide paid sick leave. All absences due to personal illness or medical appointments are unpaid.',
          'Unpaid Absence Pre-Approval Protocol: Any employee requesting planned unpaid time off must submit a formal written request to management at least fourteen (14) calendar days prior to the requested dates. Unpaid time off is granted solely at executive discretion based on business coverage requirements.',
          'Unexpected Emergency Absences: For sudden medical emergencies or incapacitation, employees must notify their direct manager in writing prior to their scheduled start time and provide official third-party documentation (e.g., licensed medical physician certification) upon return.',
          'Strict Attendance Enforcement: Unexcused absences, chronic tardiness, leaving shift early without authorization, or job abandonment (2 consecutive unexcused days without notice) will result in immediate disciplinary action up to termination for cause.',
          'Non-Waivable Statutory Absences: Where federal or Montana state law requires non-waivable statutory unpaid leave (e.g., FMLA, military reserve service, or mandatory jury duty), leave is administered strictly in accordance with statutory minimum requirements without extra-statutory paid compensation.',
        ],
        statutes: ['Mont. Code Ann. § 39-2-701 et seq.', '29 U.S.C. § 2601 (FMLA)'],
      },
      {
        id: 'sec-11-03',
        sectionNumber: 'Section 11.03',
        title: 'Strict Employee Grievance Procedure & Dispute Resolution',
        content:
          'The Company maintains a formal, mandatory internal grievance procedure to investigate and resolve workplace disputes, policy disagreements, or alleged compliance violations fairly and objectively:',
        bullets: [
          'Step 1 - Formal Written Grievance Filing: An employee with a workplace grievance must submit a detailed written Grievance Notice to the Legal & Compliance Office (compliance@fracture-verse.com) within five (5) business days of the occurrence. The notice must specify dates, involved parties, factual evidence, and specific policy clauses.',
          'Step 2 - Compliance Investigation & Review: Within ten (10) business days of receipt, the Legal Compliance Officer will conduct a confidential administrative investigation, interviewing relevant personnel and reviewing digital logs or records.',
          'Step 3 - Final Administrative Determination: The CEO / Legal Officer will issue a written Final Administrative Determination. This determination constitutes the final internal resolution of the matter.',
          'Mandatory Internal Exhaustion: Employees are strictly required to fully exhaust this internal 3-step grievance procedure prior to filing any administrative complaint with external governmental agencies or initiating judicial proceedings.',
          'Anti-Retaliation Guarantee & Zero False Claims: Filings made in good faith are strictly protected against employer retaliation. Conversely, submitting false, fraudulent, bad-faith, or malicious grievances constitutes a severe breach resulting in immediate termination for cause and civil legal action.',
        ],
        statutes: ['Mont. Code Ann. § 39-2-901 et seq. (Wrongful Discharge From Employment Act)'],
      },
      {
        id: 'sec-11-04',
        sectionNumber: 'Section 11.04',
        title: 'Mandatory Compliance with All Established Corporate Policies',
        content:
          'This Employee Handbook is integrated with and directly enforces every corporate policy created across all articles of the Master Legal & Compliance Manual:',
        bullets: [
          'Intellectual Property & Work-Made-For-Hire (Articles I, II, III, IV): All code, comic art, scripts, film footage, audio stems, lore, and documentation created during employment vest 100% perpetually in Fracture-Verse LLC under 17 U.S.C. § 101.',
          'Trade Secrets & Confidentiality Protocols (Articles I, III, VI): Leaking raw footage, source code, unreleased scripts, software algorithms (OIS Core Emerald), or trade secrets triggers immediate termination, liquid damages, and emergency injunctive relief under Mont. Code Ann. § 30-14-402.',
          'Unsolicited Submissions Policy (Article I): Strict zero-acceptance rule regarding external unsolicited creative work to prevent idea theft claims.',
          'Set Safety & Audio Clearance Warranties (Articles III & IV): Employees must strictly adhere to physical set safety rules and warrant that no uncleared third-party audio loops or assets are introduced into Company products.',
          'Privacy & Data Security Rules (Article VIII): Mandatory compliance with MCDPA consumer privacy rules, cybersecurity protocols, multi-factor authentication (MFA), and data protection guidelines.',
          'ADA Accessibility Standards (Article VII): All digital tools, public features, and content created by employees must conform to WCAG 2.1 Level AA accessibility standards.',
        ],
        statutes: ['17 U.S.C. § 101', 'Mont. Code Ann. § 30-14-401 et seq.', 'WCAG 2.1 AA'],
      },
      {
        id: 'sec-11-05',
        sectionNumber: 'Section 11.05',
        title: 'Workplace Conduct, System Usage & Disciplinary Escalation',
        content:
          'All personnel are required to maintain high standards of professional integrity, respect, and technical security:',
        bullets: [
          'Zero Tolerance Standards: Immediate termination for harassment, discrimination, workplace violence, unauthorized asset access, working under the influence of illegal substances, or theft of company property.',
          'Company Technology & Device Usage: All company-provided laptops, email accounts, cloud servers, source repositories, and communications channels are Company property. Employees have zero expectation of privacy on company equipment or networks.',
          'Progressive & Immediate Disciplinary Protocol: Failure to comply with any rule in this Handbook or any parent/divisional policy triggers mandatory disciplinary action:\n  • First Violation: Formal Written Reprimand & Corrective Action Plan.\n  • Second Violation: Unpaid Disciplinary Suspension & Final Warning.\n  • Egregious or Third Violation: Immediate Termination for Cause, revocation of security credentials, and legal enforcement under Montana law.',
        ],
        statutes: ['Mont. Code Ann. § 39-2-904'],
      },
    ],
  },
  {
    id: 'article-12',
    articleNumber: 'ARTICLE XII',
    title: 'Universal Child Safety, Minor Protection & CSAM Zero-Tolerance Directive',
    shortTitle: 'Child Safety & Minor Protection',
    category: 'Child Safety & Minor Protection',
    division: 'CHILD_SAFETY',
    iconName: 'Baby',
    summary: 'Master corporate child safety policy setting the highest global standards for real-life minor protection, zero-tolerance CSAM reporting, COPPA/KOSA child data privacy, mandatory employee background checks, and strict on-set child labor protections.',
    sections: [
      {
        id: 'sec-12-01',
        sectionNumber: 'Section 12.01',
        title: 'Zero-Tolerance CSAM / CSAE Protocol & Mandatory NCMEC Reporting',
        content:
          'Fracture-Verse LLC enforces an absolute, uncompromising zero-tolerance policy against Child Sexual Abuse Material (CSAM), Child Sexual Exploitation and Abuse (CSAE), grooming, and any form of minor exploitation across all physical facilities, digital platforms, and company communication channels:',
        bullets: [
          'Absolute Zero Tolerance: Any employee, contractor, creator, or user who attempts to produce, store, upload, transmit, view, or facilitate CSAM or CSAE will face immediate employment termination, permanent digital revocation, and referral to federal law enforcement.',
          'Mandatory NCMEC CyberTipline Reporting: In compliance with 18 U.S.C. § 2258A, the Legal & Compliance Office is legally mandated to report any suspected CSAM or child exploitation incident to the National Center for Missing & Exploited Children (NCMEC) CyberTipline within one (1) hour of discovery.',
          'Preservation of Digital Evidence: Company system logs, IP addresses, asset metadata, and uploaded content associated with suspected minor exploitation will be immediately frozen, preserved, and handed over to the FBI and local law enforcement.',
          'Automated Hash-Matching Technology: Company servers and media asset management platforms utilize automated hash-matching technology (including PhotoDNA) to proactively scan and block illicit material before publication.',
        ],
        statutes: ['18 U.S.C. § 2258A', '18 U.S.C. § 2252A', 'Mont. Code Ann. § 45-5-625'],
      },
      {
        id: 'sec-12-02',
        sectionNumber: 'Section 12.02',
        title: 'COPPA, KOSA, GDPR-K & Strict Digital Data Privacy for Minors',
        content:
          'The Company adheres strictly to federal, state, and international laws governing children’s online safety and digital privacy:',
        bullets: [
          'COPPA Compliance (15 U.S.C. § 6501): The Company does NOT knowingly collect, store, share, or process personal identifiable information (PII) from children under 13 years of age without prior verifiable parental consent (VPC) obtained via government ID verification or notarized consent.',
          'Zero Targeted Advertising to Minors: Personalized behavioral advertising, data profiling, location tracking, and data monetization directed at users under 18 years of age are strictly prohibited across all digital applications, comics portals, and web properties.',
          'Default Privacy Settings for Minor Accounts: Digital platforms operated by the Company automatically enforce high privacy defaults for accounts identified as minors, including disabled public profiles, private activity logs, and strict search filtering.',
          'Right to Immediate Erasure (Parental Control): Parents or legal guardians retain the absolute legal right to inspect, download, or demand the immediate deletion of any data collected from their minor children by contacting compliance@fracture-verse.com.',
        ],
        statutes: ['15 U.S.C. § 6501 et seq. (COPPA)', 'Kids Online Safety Act (KOSA)', 'MCDPA Minor Privacy Rules'],
      },
      {
        id: 'sec-12-03',
        sectionNumber: 'Section 12.03',
        title: 'Mandatory Personnel Background Checks & Child Abuse Reporting',
        content:
          'To guarantee the safety of child actors, voice performers, creative contributors, and young readers:',
        bullets: [
          'Exhaustive Pre-Employment Background Screening: Every employee, contractor, film crew member, voice director, studio teacher, or digital moderator who interacts with minors or handles minor-related creative assets must pass a rigorous pre-engagement background check. This includes FBI fingerprint checks, State Criminal History repository searches, and the National Sex Offender Public Website (NSOPW).',
          'Mandatory Child Abuse Reporting Obligation: All company personnel are designated as mandatory reporters under Montana law (Mont. Code Ann. § 41-3-201). Any reasonable suspicion of physical abuse, emotional neglect, or sexual misconduct involving a minor must be immediately reported to the Montana Department of Public Health and Human Services (DPHHS) and local law enforcement.',
          'Strict Prohibition of Unsupervised Adult-Minor Interactions: Company policy strictly forbids any adult employee or contractor from engaging in 1-on-1, unsupervised physical or digital communications with a minor actor or contributor. All interactions must include a parent, legal guardian, or certified studio teacher.',
        ],
        statutes: ['Mont. Code Ann. § 41-3-201 (Mandatory Reporting)', '42 U.S.C. § 16901 (NSOPW)'],
      },
      {
        id: 'sec-12-04',
        sectionNumber: 'Section 12.04',
        title: 'On-Set Child Actor Protections, Studio Tutors & Coogan Trust Laws',
        content:
          'Dreadfracture Films and all production units enforce world-leading physical set safety standards for child performers:',
        bullets: [
          'Parent / Legal Guardian Line-of-Sight Rule: A parent or court-appointed legal guardian must be present on physical film sets, recording studios, or photo shoots at all times, maintaining direct line-of-sight contact with the child performer.',
          'On-Set Certified Studio Teachers & Tutors: On productions requiring child actors during academic calendar days, a state-certified studio teacher must be provided at Company expense to oversee education, welfare, and work hour limits.',
          'Strict Maximum Work Hour Limits: Minor work hours are governed by strict age-based limits (e.g., maximum 3 hours of work per day for minors aged 2-5; maximum 5 hours for ages 6-8; maximum 6 hours for ages 9-15), with mandatory 15-minute rest breaks every hour and mandatory meal periods.',
          'Coogan Trust Account Compliance (California Family Code § 6750 & Montana Law): 15% of a minor performer’s gross earnings must be deposited directly into a blocked Coogan Trust Account held in the minor’s name until they reach 18 years of age.',
        ],
        statutes: ['California Family Code § 6750 (Coogan Act)', 'Mont. Code Ann. § 41-2-101 (Child Labor)'],
      },
      {
        id: 'sec-12-05',
        sectionNumber: 'Section 12.05',
        title: 'Digital Platform Zero-Contact Rules & Content Moderation Safety',
        content:
          'For digital services, web applications, community forums, and interactive media operated by Fracture-Verse LLC:',
        bullets: [
          'Disabled Direct Messaging (Adult-to-Minor): Private direct messaging between adult users and minor users is permanently disabled on all company applications and forums to prevent grooming or unauthorized contact.',
          'Strict Content Age-Gating & Ratings: All comic publications, film releases, audio tracks, and lore entries carry prominent age ratings (e.g., All Ages, Teen 13+, Mature 18+). Content with mature themes requires age verification prior to access.',
          '24/7 Safety Moderation & Instant Revocation: Automated safety filters and human compliance officers monitor community interactions. Any language containing predatory terms, harassment, or unsafe contact requests results in instant, unappealable banishment.',
        ],
        statutes: ['Mont. Code Ann. § 45-5-623', 'Children’s Internet Protection Act (CIPA)'],
      },
    ],
  },
  {
    id: 'article-13',
    articleNumber: 'ARTICLE XIII',
    title: 'Master E-Commerce, Product Sales & Order Fulfillment Policy',
    shortTitle: 'E-Commerce & Order Fulfillment',
    category: 'E-Commerce & Financial Compliance',
    division: 'PAYMENTS_CHARGEBACKS',
    iconName: 'CreditCard',
    summary: 'Master corporate policy governing online sales, digital downloads, pre-orders, checkout processing, physical product returns, shipping logistics, merchant gateways (Stripe & TikTok Shop), and chargeback dispute defense.',
    sections: [
      {
        id: 'sec-13-01',
        sectionNumber: 'Section 13.01',
        title: 'Online Purchase, Product Sales & Checkout Policy',
        content:
          'This Policy governs all commercial retail transactions, checkout sessions, and product purchases completed through Dreadfracture Comics and Fracture-Verse LLC online storefronts.\n\nIn accordance with UCC Article 2 and Mont. Code Ann. § 30-2-101 et seq.:',
        bullets: [
          'Binding Purchase Contract: Submitting an order during checkout constitutes a legally binding offer to purchase designated products at the published prices, plus applicable taxes and shipping fees.',
          'Checkout Security & Order Acceptance: Orders are subject to address validation, fraud verification, payment authorization, and inventory availability. An order is accepted only upon issuance of an official order confirmation receipt.',
          'Price Display Accuracy: While the Company strives for total pricing accuracy, Fracture-Verse LLC reserves the right to cancel orders arising from typographical or technical pricing glitches prior to order dispatch.',
        ],
        statutes: ['UCC Article 2', 'Mont. Code Ann. § 30-2-101 et seq.'],
      },
      {
        id: 'sec-13-02',
        sectionNumber: 'Section 13.02',
        title: 'Digital Products & Media Distribution Policy',
        content:
          'Digital commercial products—including PDF comic issues, CBZ graphic novel files, downloadable art prints, audio stems, and software assets—are delivered electronically under strict digital distribution rules:',
        bullets: [
          'Instant License Grant: Upon successful payment authorization, the customer is granted a non-exclusive, non-transferable, revocable personal license to stream or download the purchased digital media.',
          'Strict No-Refund / No-Return Policy: Due to the immediate irrevocable nature of electronic media downloads, ALL DIGITAL PRODUCT SALES ARE FINAL AND NON-REFUNDABLE once download links or streaming access has been generated.',
          'Anti-Piracy Protections: Digital files may contain embedded watermarks or forensic tags. Unauthorized distribution, torrenting, file sharing, or reverse engineering constitutes criminal copyright infringement under 17 U.S.C. § 1201.',
        ],
        statutes: ['17 U.S.C. § 1201 (DMCA)', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-13-03',
        sectionNumber: 'Section 13.03',
        title: 'Order Processing, Pre-Orders & Fulfillment Standards',
        content:
          'Order processing times, pre-order allocations, and product fulfillment adhere strictly to federal mail-order trade regulations:',
        bullets: [
          'Standard Processing Timelines: In-stock orders are processed and dispatched within twenty-four (24) to forty-eight (48) business hours following payment confirmation.',
          'Pre-Order Policy: Pre-order items represent advanced reservations for unreleased publication runs or collectibles. Payment is authorized at checkout to secure allocation. Estimated release dates are subject to publisher or printing lead times.',
          'Pre-Order Cancellation Rights: Customers may cancel pre-orders for a 100% full refund at any time prior to the physical order dispatch phase.',
          'FTC Mail Order Compliance: In accordance with the FTC Mail or Telephone Order Merchandise Rule (16 C.F.R. Part 435), if fulfillment delays exceed thirty (30) days beyond the estimated date, customers will receive notice and the option to cancel for a full refund.',
        ],
        statutes: ['16 C.F.R. Part 435 (FTC Mail Order Rule)', 'UCC § 2-309'],
      },
      {
        id: 'sec-13-04',
        sectionNumber: 'Section 13.04',
        title: 'Payment Processing & Platform Merchant Infrastructure',
        content:
          'Payment processing is executed through secure third-party gateway providers and marketplace infrastructure:',
        bullets: [
          'Stripe Gateway Operations: Website transactions are processed via Stripe, adhering strictly to PCI-DSS Level 1 encryption standards. Fracture-Verse LLC never stores raw credit card numbers.',
          'TikTok Shop Storefront Integration: Purchases made via the official Dreadfracture Comics TikTok Shop are processed under TikTok Shop’s merchant infrastructure and escrow terms.',
          'Authorization Right: The Company reserves the right to decline or require identity verification for transactions flagged as high risk by automated fraud scoring engines.',
        ],
        statutes: ['PCI-DSS Standard', '18 U.S.C. § 1030'],
      },
      {
        id: 'sec-13-05',
        sectionNumber: 'Section 13.05',
        title: 'Returns, Exchanges & Physical Product Refund Policy',
        content:
          'Physical products (printed graphic novels, physical comic books, apparel, and merchandise) are governed by a clear, transparent return standard:',
        bullets: [
          '7-Day Physical Return Window: Physical items are eligible for return or exchange within seven (7) calendar days of confirmed carrier delivery.',
          'Condition Requirements: Returned items must be strictly unopened, factory-sealed, and in original brand-new condition. Opened or handled comic books and apparel are non-returnable due to grading integrity.',
          'Damaged Shipment Authorization: Items received damaged in transit require written notice with photo documentation within seven (7) days to receive a Return Merchandise Authorization (RMA) and replacement dispatch.',
        ],
        statutes: ['UCC § 2-601', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-13-06',
        sectionNumber: 'Section 13.06',
        title: 'Shipping, Delivery & Freight Logistics Policy',
        content:
          'Order shipping and carrier logistics operate under standardized freight transfer terms:',
        bullets: [
          'Non-Refundable Initial Shipping: Customer is responsible for all shipping and handling charges. Initial shipping fees are non-refundable upon order dispatch.',
          'Return Freight Costs: Return shipping charges for non-defective returns are the sole financial responsibility of the customer.',
          'FOB Shipping Point Title Transfer: Pursuant to UCC § 2-401, risk of loss and title for physical items transfer to the buyer upon delivery of the package to the commercial carrier (USPS, UPS, FedEx). Tracking numbers serve as conclusive proof of fulfillment.',
        ],
        statutes: ['UCC § 2-401', 'Mont. Code Ann. § 30-2-401'],
      },
      {
        id: 'sec-13-07',
        sectionNumber: 'Section 13.07',
        title: 'Chargeback Defense, Disputes & Fraudulent Transaction Enforcement',
        content:
          'Chargebacks and payment disputes are defended aggressively using complete, verifiable transaction records:',
        bullets: [
          'Mandatory Direct Resolution Attempt: Customers are encouraged to contact support to resolve billing issues directly before initiating formal credit card chargebacks.',
          'Evidentiary Submission Standards: In response to improper or fraudulent chargebacks, the Company submits complete transaction logs, IP addresses, digital download receipts, carrier tracking confirmations, and agreed policy disclosures to payment networks.',
          'Fraudulent Chargeback Consequences: Submitting fraudulent chargebacks ("friendly fraud") constitutes a breach of contract and theft of service under Mont. Code Ann. § 45-6-301, resulting in permanent account banishment, debt collection, and legal recourse.',
        ],
        statutes: ['Visa / Mastercard Dispute Guidelines', 'Mont. Code Ann. § 45-6-301'],
      },
    ],
  },
  {
    id: 'article-14',
    articleNumber: 'ARTICLE XIV',
    title: 'Master Corporate Legal Disclaimers Framework',
    shortTitle: 'Legal & Operational Disclaimers',
    category: 'Corporate Legal Disclaimers',
    division: 'LEGAL_DISCLAIMERS',
    iconName: 'ShieldAlert',
    summary: 'Universal corporate disclaimers governing website usage, e-commerce transactions, digital products, subscription services, intellectual property rights, third-party content, warranty exclusions, and limitations of liability.',
    sections: [
      {
        id: 'sec-14-01',
        sectionNumber: 'Section 14.01',
        title: 'General, Website & Comprehensive Legal Disclaimer',
        content:
          'This Master Disclaimer sets forth the general legal disclosures, operational disclaimers, and liability boundaries governing all websites, applications, and digital media operated by Fracture-Verse LLC and its operating units (Dreadfracture Comics, Dreadfracture Films, Omega Sound Authority, FracturePedia, and OIS Core Emerald):',
        bullets: [
          'General & Website Disclaimer: All content, publications, software, audio tracks, and lore published on Company websites are provided strictly for general informational, entertainment, and commercial purchase purposes.',
          'No Professional or Advisory Duty: Nothing contained on our platforms constitutes legal, financial, professional, or medical advice. Users access and utilize website content strictly at their own independent risk.',
          'Right to Update & Modify: Fracture-Verse LLC reserves the absolute right to correct errors, update disclosures, modify operational policies, or modify website features at any time without prior individual notice.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101', 'UCC Article 2'],
      },
      {
        id: 'sec-14-02',
        sectionNumber: 'Section 14.02',
        title: 'E-Commerce, Product, Service & Availability Disclaimer',
        content:
          'E-commerce transactions, product representations, service delivery, and digital engine operations are subject to explicit operational limitations:',
        bullets: [
          'Product Disclaimer: Product visual renders, cover art mockups, and color representations on screen may vary slightly from final printed physical graphic novels or apparel due to monitor calibration and printing processes.',
          'Service Disclaimer: SaaS cloud applications, OIS Core Emerald engines, and online reader portals are offered on a best-efforts operational basis. The Company does not guarantee continuous, uninterrupted, or error-free software performance.',
          'Availability Disclaimer: All products, memberships, pre-orders, and promotional tiers are subject to inventory availability and operational capacity. The Company reserves the right to limit order quantities or discontinue items without prior liability.',
        ],
        statutes: ['UCC § 2-316', 'Mont. Code Ann. § 30-2-316'],
      },
      {
        id: 'sec-14-03',
        sectionNumber: 'Section 14.03',
        title: 'Subscription, Payment, Refund & Shipping Disclaimer',
        content:
          'Financial operations, payment gateways, refund processing, and logistics carriers operate under strict third-party boundary disclaimers:',
        bullets: [
          'Subscription Disclaimer: Active subscription access is conditional upon timely payment processing. Pauses, plan upgrades, or downgrades are administered strictly pursuant to published written rules.',
          'Payment & Refund Disclaimer: Payment processing is executed by external merchant gateways (Stripe, TikTok Shop). The Company is not liable for banking posting delays, card network holds, or currency conversion fees charged by issuing banks.',
          'Shipping Disclaimer: Carrier delivery schedules are estimates. The Company is not liable for logistics delays resulting from severe weather, carrier bottlenecks, customs inspections, or incorrect delivery addresses provided by the customer.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101', 'UCC Article 2'],
      },
      {
        id: 'sec-14-04',
        sectionNumber: 'Section 14.04',
        title: 'Intellectual Property, Copyright & Trademark Disclaimer',
        content:
          'All intellectual property, trademarks, trade dress, copyrights, character concepts, software source code, and original media assets are vigorously protected by law:',
        bullets: [
          'Intellectual Property Disclaimer: All trademarks, service marks, character names, logos, comic art, film footage, audio tracks, and lore entries displayed on Company platforms are the sole property of Fracture-Verse LLC.',
          'Copyright Disclaimer: All text, graphic design, code, and publication layouts are copyrighted works © 2026 Fracture-Verse LLC. All rights reserved. Unauthorized reproduction, web scraping, or AI training on Company IP is strictly prohibited.',
          'Trademark Disclaimer: "Dreadfracture", "Fracture-Verse", "Omega Sound Authority", "OIS Core Emerald", and associated logos are registered or common-law trademarks under 15 U.S.C. § 1051 et seq. No license is granted by implication or estoppel.',
        ],
        statutes: ['17 U.S.C. § 101 et seq.', '15 U.S.C. § 1051 et seq. (Lanham Act)'],
      },
      {
        id: 'sec-14-05',
        sectionNumber: 'Section 14.05',
        title: 'Third-Party, External Links & Advertising Disclaimer',
        content:
          'Navigating to external portals, marketplace storefronts, or sponsored links is governed by third-party terms:',
        bullets: [
          'Third-Party Disclaimer: Company platforms may contain hyperlinks to third-party sites, payment portals, or social media networks. Fracture-Verse LLC exercises zero control over third-party content, privacy policies, or security practices.',
          'Advertising Disclaimer: Any promotional banner, affiliate disclosure, or commercial sponsorship displayed on Company media adheres strictly to FTC Truth-in-Advertising rules (15 U.S.C. § 45). Inclusion of external brand links does not constitute endorsement.',
        ],
        statutes: ['FTC Act (15 U.S.C. § 45)', '16 C.F.R. Part 255'],
      },
      {
        id: 'sec-14-06',
        sectionNumber: 'Section 14.06',
        title: 'Warranty Exclusion, Limitation of Liability & Accuracy Disclaimer',
        content:
          'To the maximum extent permitted under applicable federal and state law:',
        bullets: [
          'Warranty Exclusion: ALL PRODUCTS, SERVICES, SUBSCRIPTIONS, AND WEBSITES ARE PROVIDED STRICTLY ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.',
          'Accuracy Disclaimer: While reasonable efforts are maintained to ensure data accuracy, the Company makes no warranties regarding the absolute accuracy, completeness, or timeliness of website documentation.',
          'Limitation of Liability: IN NO EVENT SHALL FRACTURE-VERSE LLC, ITS DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, OR SPECIAL DAMAGES. MAXIMUM CUMULATIVE LIABILITY IS STRICTLY CAPPED AT THE TOTAL AMOUNT PAID BY THE USER TO THE COMPANY IN THE PRECEDING TWELVE (12) MONTHS OR $100.00 USD, WHICHEVER IS GREATER.',
        ],
        statutes: ['UCC § 2-316', 'Mont. Code Ann. § 30-2-316', 'Mont. Code Ann. § 30-14-101'],
      },
    ],
  },
  {
    id: 'article-15',
    articleNumber: 'ARTICLE XV',
    title: 'Master International Shipping Policy',
    shortTitle: 'International Shipping Policy',
    category: 'E-Commerce & Global Logistics',
    division: 'INTERNATIONAL_SHIPPING',
    iconName: 'Globe',
    summary: 'Official international shipping policy governing physical product delivery, carrier transit speeds, customs clearance duties, non-shippable country restrictions, lost package investigations, and customer obligations.',
    sections: [
      {
        id: 'sec-15-01',
        sectionNumber: 'Section 15.01',
        title: 'Shipping Coverage',
        content:
          'Dreadfracture Comics provides international shipping for eligible physical products purchased through the official Dreadfracture Comics website, subject to destination availability, carrier service, applicable laws, customs requirements, and the shipping restrictions established in this policy.\n\nShipping availability and applicable shipping charges are displayed at checkout based on the customer’s destination and selected shipping method.',
        statutes: ['Mont. Code Ann. § 30-2-201', 'UCC Article 2'],
      },
      {
        id: 'sec-15-02',
        sectionNumber: 'Section 15.02',
        title: 'Customer Responsibility for Shipping Costs',
        content:
          'Customers are responsible for all shipping and delivery costs associated with their orders.',
        bullets: [
          'Calculation at Checkout: Shipping charges are calculated and displayed during checkout based on factors including destination, package size, package weight, selected shipping service, and applicable carrier rates.',
          'Separate Itemization: Shipping charges are separate from the product purchase price unless expressly stated otherwise at checkout.',
        ],
        statutes: ['UCC § 2-319', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-15-03',
        sectionNumber: 'Section 15.03',
        title: 'Order Processing Time',
        content:
          'Orders are generally processed within 1–3 business days after successful payment authorization.',
        bullets: [
          'Processing vs. Transit: Order processing time is separate from shipping and carrier transit time.',
          'Weekend & Holiday Processing: Orders placed on weekends or recognized holidays generally begin processing on the next applicable business day.',
          'Verification Holds: Orders requiring payment verification, address verification, fraud screening, or other transaction verification may require additional processing time.',
        ],
        statutes: ['16 C.F.R. Part 435 (FTC Mail Order Rule)', 'UCC § 2-309'],
      },
      {
        id: 'sec-15-04',
        sectionNumber: 'Section 15.04',
        title: 'Shipping Speeds and Estimated Transit Times',
        content:
          'Transit times begin after the order has been processed and transferred to the applicable carrier. These timeframes are estimated delivery windows and are not guaranteed delivery dates unless a specific shipping service is expressly identified as guaranteed at checkout.',
        bullets: [
          'Standard Shipping: 5–10 business days estimated transit time.',
          'Expedited Shipping: 2–5 business days estimated transit time.',
          'Express Shipping: 1–3 business days estimated transit time.',
          'International Economy: 10–25 business days estimated transit time.',
          'Carrier Speed Notice: Selecting expedited or express shipping generally affects carrier transit speed and does not necessarily reduce the Company’s order-processing time.',
        ],
        statutes: ['UCC § 2-309', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-15-05',
        sectionNumber: 'Section 15.05',
        title: 'Countries and Territories We Do Not Ship To',
        content:
          'Dreadfracture Comics does not currently ship physical products to the following restricted countries and territories due to international sanctions, carrier constraints, customs restrictions, or fraud prevention protocols:',
        bullets: [
          'Restricted Destinations: Nigeria, Brazil, Jamaica, Iran, Venezuela, South Africa, Ghana, Iraq, Lebanon, Myanmar, North Korea, Syria, Russia, Belarus, Democratic Republic of the Congo (DR Congo), Liberia, Sierra Leone, Zimbabwe, Ecuador, and Cuba.',
          'Address Cancellation Right: Orders containing a shipping address in a restricted destination may be declined, cancelled, or refunded.',
          'Modification Right: Dreadfracture Comics reserves the right to modify its shipping destinations and restrictions when necessary because of carrier limitations, applicable laws, sanctions, customs requirements, fraud-prevention measures, operational considerations, or other legitimate business requirements.',
        ],
        statutes: ['OFAC Sanctions Protocols', 'Export Administration Regulations (EAR)'],
      },
      {
        id: 'sec-15-06',
        sectionNumber: 'Section 15.06',
        title: 'Customs, Duties, Taxes, and Import Charges',
        content:
          'International shipments may be subject to customs duties, import taxes, VAT, brokerage fees, customs processing fees, handling charges, or other charges imposed by the destination country.',
        bullets: [
          'Customer Financial Responsibility: All customs duties, taxes, import fees, brokerage fees, and other destination-country charges are the responsibility of the customer unless expressly stated otherwise at checkout.',
          'Government Assessment: Dreadfracture Comics does not control the amount, assessment, collection, or timing of government-imposed customs or import charges.',
          'Destination Compliance: Customers are responsible for complying with applicable import requirements in their destination country.',
        ],
        statutes: ['19 U.S.C. § 1500', 'World Customs Organization Standards'],
      },
      {
        id: 'sec-15-07',
        sectionNumber: 'Section 15.07',
        title: 'Customs Delays',
        content:
          'International shipments may be delayed because of customs inspections, documentation requirements, import restrictions, government processing, border procedures, or other customs-related circumstances.',
        bullets: [
          'No Clearance Guarantee: Dreadfracture Comics does not guarantee a specific customs-clearance timeframe.',
          'Fulfillment Exception: Customs delays do not automatically constitute a failure by Dreadfracture Comics to fulfill or ship an order.',
        ],
        statutes: ['UCC § 2-615 (Force Majeure)', 'Mont. Code Ann. § 30-2-615'],
      },
      {
        id: 'sec-15-08',
        sectionNumber: 'Section 15.08',
        title: 'Shipping Tracking',
        content:
          'Where tracking is available, tracking information will be provided after the order has been shipped.',
        bullets: [
          'Activation Delay: Tracking information may take time to become active after the carrier receives and scans the shipment.',
          'Carrier Control: Carrier tracking updates are controlled by the applicable carrier and may temporarily be unavailable, delayed, or incomplete.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-15-09',
        sectionNumber: 'Section 15.09',
        title: 'Delivery Delays',
        content:
          'Estimated delivery times may be affected by circumstances outside the Company’s reasonable control.',
        bullets: [
          'Excusable Delay Events: Severe weather, natural disasters, customs processing, carrier disruptions, transportation interruptions, government actions, holidays, border restrictions, security inspections, incorrect or incomplete addresses, unexpected carrier volume, international transportation delays, or other events outside the Company’s reasonable control.',
          'Guaranteed Delivery Disclaimer: Dreadfracture Comics does not guarantee delivery by a specific date unless a guaranteed delivery service is expressly identified and purchased at checkout.',
        ],
        statutes: ['UCC § 2-615', 'Mont. Code Ann. § 30-2-615'],
      },
      {
        id: 'sec-15-10',
        sectionNumber: 'Section 15.10',
        title: 'Incorrect or Incomplete Shipping Addresses',
        content:
          'Customers are responsible for providing a complete and accurate shipping address at checkout.',
        bullets: [
          'Company Non-Liability: Dreadfracture Comics is not responsible for additional shipping charges, delays, returned shipments, failed deliveries, or other costs resulting from an incorrect, incomplete, outdated, or improperly formatted shipping address provided by the customer.',
          'Address Correction Requests: If an order has not yet entered fulfillment, customers may contact Dreadfracture Comics to request an address correction. Address changes cannot be guaranteed after an order has entered fulfillment or been shipped.',
        ],
        statutes: ['UCC Article 2', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-15-11',
        sectionNumber: 'Section 15.11',
        title: 'Undeliverable or Returned Shipments',
        content:
          'A shipment may be considered undeliverable if it is returned because of: incorrect/incomplete address, refusal of delivery, failure to collect package, failure to complete required customs procedures, failure to pay applicable destination charges, carrier delivery restrictions, or other customer-related circumstances.',
        bullets: [
          'Reshipment Charges: If a shipment is returned, the customer may be responsible for additional shipping charges associated with reshipment.',
          'Refund Handling: Any refund relating to an undeliverable shipment will be handled in accordance with the applicable Dreadfracture Comics refund policy.',
        ],
        statutes: ['UCC § 2-503', 'Mont. Code Ann. § 30-2-503'],
      },
      {
        id: 'sec-15-12',
        sectionNumber: 'Section 15.12',
        title: 'Lost, Stolen, or Damaged Shipments',
        content:
          'Customers should promptly report shipment issues through the Company’s designated customer-service process.',
        bullets: [
          'Investigation Protocol: Where carrier tracking confirms delivery to the shipping address provided by the customer, Dreadfracture Comics may request additional information and may initiate or request a carrier investigation before determining whether a replacement or refund is appropriate.',
          'Fraud Prevention: The Company reserves the right to investigate repeated, inconsistent, fraudulent, or otherwise suspicious delivery claims.',
        ],
        statutes: ['UCC § 2-401', 'Mont. Code Ann. § 30-2-401'],
      },
      {
        id: 'sec-15-13',
        sectionNumber: 'Section 15.13',
        title: 'Shipping Restrictions',
        content:
          'Dreadfracture Comics may refuse, restrict, suspend, or cancel shipment to a particular destination when necessary because of applicable law, government restrictions, sanctions, customs requirements, carrier restrictions, import restrictions, fraud-prevention measures, payment or transaction concerns, operational limitations, security considerations, or other legitimate business requirements.',
        statutes: ['Export Control Reform Act (ECRA)', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-15-14',
        sectionNumber: 'Section 15.14',
        title: 'Shipping Charges and Order Changes',
        content:
          'Shipping charges are presented to the customer before completion of checkout.',
        bullets: [
          'Fulfillment Lock: Once an order has entered fulfillment or has been shipped, Dreadfracture Comics may be unable to modify the shipping address, shipping service, products, or other order information.',
          'Early Change Requests: Customers should submit permitted changes or cancellation requests as soon as possible after placing an order.',
        ],
        statutes: ['UCC § 2-209', 'Mont. Code Ann. § 30-2-209'],
      },
      {
        id: 'sec-15-15',
        sectionNumber: 'Section 15.15',
        title: 'Shipping Availability',
        content:
          'The availability of a particular shipping method depends on the destination, product, package characteristics, carrier availability, and other applicable factors.',
        bullets: [
          'Method Options: The Company may offer different shipping methods for different destinations.',
          'Checkout Display Authority: The shipping options displayed during checkout constitute the shipping methods available for that particular order at the time of purchase.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-15-16',
        sectionNumber: 'Section 15.16',
        title: 'Delivery Estimates and No Guarantee',
        content:
          'All shipping and delivery timeframes published in this policy or displayed during checkout are estimates unless expressly identified as guaranteed.\n\nDreadfracture Comics does not guarantee that an order will arrive within an estimated delivery window when delays are caused by carriers, customs authorities, government agencies, financial institutions, weather, transportation disruptions, incorrect customer information, or other circumstances outside the Company’s reasonable control.',
        statutes: ['UCC § 2-309', 'Mont. Code Ann. § 30-2-309'],
      },
      {
        id: 'sec-15-17',
        sectionNumber: 'Section 15.17',
        title: 'Customer Acceptance of Shipping Terms',
        content:
          'By completing a purchase through the official Dreadfracture Comics website, the customer acknowledges and agrees that:',
        bullets: [
          'Responsibility for Shipping Costs: The customer is responsible for applicable shipping costs.',
          'Customs & Import Duties: The customer is responsible for applicable customs duties, taxes, and import charges.',
          'Estimated Windows: Delivery timeframes are generally estimates and international shipments may experience customs or carrier delays.',
          'Accurate Address Obligation: The customer is responsible for providing accurate shipping information.',
          'Restriction Rules: Shipping restrictions may apply based on destination, presented during checkout.',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101', 'UCC Article 2'],
      },
      {
        id: 'sec-15-18',
        sectionNumber: 'Section 15.18',
        title: 'Policy Administration & Official Metadata',
        content:
          'Dreadfracture Comics may modify this International Shipping Policy when necessary to reflect changes in carriers, shipping services, destination restrictions, customs requirements, security procedures, operational practices, or applicable law.\n\nThe version of this policy published on the official Dreadfracture Comics website will apply to orders subject to that version, except where applicable law requires otherwise.',
        bullets: [
          'Company Entity: Dreadfracture Comics',
          'Effective Date: August 12, 2026',
          'Sales Channel: Official Dreadfracture Comics Website',
          'Product Type: Physical Products Purchased Through Official Store',
          'Shipping Costs: Customer Responsibility',
          'Destination Scope: Available to Eligible Destinations Only',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101'],
      },
    ],
  },
  {
    id: 'article-16',
    articleNumber: 'ARTICLE XVI',
    title: 'Master Shipping Information & Personal Data Protection Policy',
    shortTitle: 'Shipping Data & Privacy Protection',
    category: 'Privacy & Shipping Data Protection',
    division: 'SHIPPING_DATA_PROTECTION',
    iconName: 'ShieldCheck',
    summary: 'Master corporate policy governing the collection, permitted use, strict data minimization, non-sale rules, operational transmission, email communications, and security safeguards for customer order and shipping information.',
    sections: [
      {
        id: 'sec-16-01',
        sectionNumber: 'Section 16.01',
        title: 'Purpose & Policy Scope',
        content:
          'Dreadfracture Comics establishes this policy to govern the collection, use, protection, and handling of customer information required for physical-product orders placed through the Company’s official website.',
        statutes: ['MCDPA', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-16-02',
        sectionNumber: 'Section 16.02',
        title: 'Information Collected',
        content:
          'Dreadfracture Comics collects only the information reasonably necessary to process and fulfill physical-product orders, including:',
        bullets: [
          'Customer Full Name',
          'Physical Shipping Address',
          'Primary Contact Email Address',
        ],
        statutes: ['MCDPA Data Minimization Standards'],
      },
      {
        id: 'sec-16-03',
        sectionNumber: 'Section 16.03',
        title: 'Permitted Use',
        content:
          'Customer information may be used strictly for legitimate order-related and business operations, including:',
        bullets: [
          'Processing and Fulfilling Physical Orders',
          'Preparing Customs and Carrier Shipping Documentation',
          'Order Confirmations and Shipping Notifications',
          'Carrier Tracking and Delivery Status Notifications',
          'Customer-Service Communications regarding Orders',
          'Fraud Prevention, Transaction Security & Legal Compliance',
        ],
        statutes: ['MCDPA § 30-14-201', '16 C.F.R. Part 435'],
      },
      {
        id: 'sec-16-04',
        sectionNumber: 'Section 16.04',
        title: 'No Sale or Commercial Sharing',
        content:
          'Dreadfracture Comics does not sell, rent, trade, or share customer personal information with third parties for advertising, marketing, profiling, data brokerage, or unrelated commercial purposes.',
        bullets: [
          'Absolute Commercial Ban: Customer information shall not be sold or provided to third parties for the purpose of creating independent marketing databases or customer-information lists.',
        ],
        statutes: ['MCDPA Opt-Out Mandates', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-16-05',
        sectionNumber: 'Section 16.05',
        title: 'Limited Operational Transmission',
        content:
          'When necessary to complete an order, the minimum information required may be transmitted through authorized systems or service providers responsible for payment processing, shipping, delivery, website operation, fulfillment, or transaction security.\n\nSuch transmission is strictly limited to the specific operational purpose for which the information is required.',
        statutes: ['PCI-DSS Standard', 'Carrier Data Transfer Standards'],
      },
      {
        id: 'sec-16-06',
        sectionNumber: 'Section 16.06',
        title: 'Email Communications',
        content:
          'Email addresses collected during checkout may be used exclusively for transaction-related communications, including:',
        bullets: [
          'Order Confirmations & Shipping Confirmations',
          'Tracking Information & Delivery Notifications',
          'Order-Status Communications & Customer Service Inquiries',
          'Important Operational Notices Concerning an Existing Transaction',
        ],
        statutes: ['CAN-SPAM Act (15 U.S.C. § 7701)', 'MCDPA'],
      },
      {
        id: 'sec-16-07',
        sectionNumber: 'Section 16.07',
        title: 'Data Minimization',
        content:
          'Dreadfracture Comics limits the collection of customer information to information reasonably necessary for authorized business, transaction, shipping, security, and legal purposes.\n\nUnnecessary personal information shall not be intentionally collected for order fulfillment.',
        statutes: ['MCDPA Data Minimization', 'NIST Privacy Framework'],
      },
      {
        id: 'sec-16-08',
        sectionNumber: 'Section 16.08',
        title: 'Protection of Customer Information',
        content:
          'Dreadfracture Comics maintains reasonable administrative, technical, and organizational safeguards designed to protect customer information against unauthorized access, use, alteration, disclosure, loss, or misuse.\n\nAccess to customer information is strictly limited to authorized personnel and systems with a legitimate business requirement.',
        statutes: ['Mont. Code Ann. § 30-14-1704', 'NIST Cybersecurity Standards'],
      },
      {
        id: 'sec-16-09',
        sectionNumber: 'Section 16.09',
        title: 'Unauthorized Disclosure',
        content:
          'Unauthorized access, use, copying, disclosure, transfer, sale, or distribution of customer personal information is strictly prohibited.\n\nSuspected unauthorized access or disclosure shall be addressed immediately in accordance with the Company’s applicable security and incident-response procedures.',
        statutes: ['18 U.S.C. § 1030', 'Mont. Code Ann. § 30-14-1704'],
      },
      {
        id: 'sec-16-10',
        sectionNumber: 'Section 16.10',
        title: 'Customer Responsibility',
        content:
          'Customers are responsible for providing accurate and complete name, shipping-address, and email information required to process and deliver their orders.',
        bullets: [
          'Inaccuracy Non-Liability: Dreadfracture Comics is not responsible for delivery failures, delays, returned shipments, or additional costs resulting from inaccurate or incomplete information provided by the customer, except where otherwise required by applicable law.',
        ],
        statutes: ['UCC Article 2', 'Mont. Code Ann. § 30-14-101'],
      },
      {
        id: 'sec-16-11',
        sectionNumber: 'Section 16.11',
        title: 'Corporate Compliance & Policy Metadata',
        content:
          'This policy applies to Dreadfracture Comics personnel, contractors, systems, and authorized parties involved in collecting, processing, accessing, or handling customer information.\n\nAll applicable Company procedures and business practices shall be administered consistently with this policy and applicable privacy and data-protection requirements.',
        bullets: [
          'Company Entity: Dreadfracture Comics',
          'Effective Date: August 12, 2026',
          'Scope: Customer Shipping Information & Personal Data Protection',
          'Data Minimization Enforcement: Full Mandatory Compliance',
        ],
        statutes: ['Mont. Code Ann. § 30-14-101'],
      },
    ],
  },
];
