// Verified facts only — sourced from the client's authorized profile documents
// and letterhead. See PLAN.md §0 for provenance and open questions.

export const firm = {
  name: "Megastar Law Associates",
  tagline: "Advocates, Chandigarh",
  email: "megastarlaw@gmail.com",
  phone: "+91 98885 14798",
  helpline: "+91 94170 14798",
  helplineLabel: "24/7 Legal Helpline",
  // wa.me expects digits only, country code first, no "+" or spaces.
  whatsapp: "919417014798",
};

export const advocates = [
  {
    name: "Pradeep Sankhian",
    fullName: "Pradeep Kumar Sharma",
    role: "Founder & Advocate",
    enrollment: "P-2435/2011",
    barMembership:
      "Punjab & Haryana High Court Bar Association & District Bar Association, Chandigarh (since 2011)",
    experience: "15+ years across civil and criminal practice",
    bio: "Pradeep Kumar Sharma — known professionally as Pradeep Sankhian — founded Megastar Law Associates on a simple premise: clients deserve personalized attention and dedicated care, not to be processed through a large firm's assembly line. Enrolled as an Advocate in 2011 and a member of the Punjab & Haryana High Court Bar Association and the District Bar Association, Chandigarh, he has spent over 15 years building a practice across both the civil and criminal sides — with particular depth in matters that call for both settlement skill and courtroom experience, including NRI clients navigating Section 498A proceedings from abroad.",
    specialties: [
      "Civil recovery suits",
      "NDPS Act matters",
      "Cheque dishonour (NI Act §138)",
      "Consumer disputes (District & State Commission, Punjab)",
      "Banking & Co-operative Societies Act",
      "Land disputes",
      "RERA, Punjab & Haryana",
      "Permanent Lok Adalat",
      "NCLT, Chandigarh",
    ],
  },
  {
    name: "Nikhil Choudhary",
    fullName: "Nikhil Choudhary",
    role: "Advocate",
    enrollment: null, // pending — not present in any client-provided file
    barMembership: null,
    experience: null,
    bio: null,
    specialties: [] as string[],
    bioPending: true,
  },
];

export const offices = [
  {
    label: "District Court Chamber",
    address: "Chamber No. 353-A, 3rd Floor, District Courts Complex, Sector 43, Chandigarh",
  },
  {
    label: "High Court Chamber",
    address: "Chamber No. 95, Sector 1, Punjab & Haryana High Court, Chandigarh",
  },
  {
    label: "Office",
    address: "SCO-570, 2nd Floor, Sector 45-C, Chandigarh — 160047",
  },
];

// The letterhead and the two profile docs each list a different set of
// additional cities. Not publishing an "offices in N cities" claim until
// the client confirms which list is current — see PLAN.md §0.
export const additionalOfficeCitiesPendingConfirmation = [
  "Allahabad",
  "Chennai",
  "Coimbatore",
  "Delhi",
  "Mumbai",
  "Shimla",
  "Baddi",
];

export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  /** Short list for index/home cards */
  highlights: string[];
  /** Full detail-page breakdown, grouped under headings */
  serviceGroups: { heading: string; items: string[] }[];
  /** 1-2 paragraph description of how the firm approaches this area */
  approach: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "criminal-cyber-crime",
    title: "Criminal Law & Cyber Crime",
    summary:
      "Defense and prosecution across trial courts, High Courts and the Supreme Court, from FIR registration through final appeal.",
    highlights: [
      "Anticipatory & regular bail applications",
      "Quashing of FIR / 41A Cr.P.C. notices",
      "Section 498A matters, with NRI-specific experience",
      "NDPS Act offences",
      "Cheque dishonour under Section 138, NI Act",
      "Cyber crime & cyber evidence",
      "Economic offences and criminal breach of trust",
    ],
    approach:
      "We handle criminal matters — prosecution and defense alike — before trial courts, the High Court and the Supreme Court of India, working under the Indian Penal Code, 1860 / Bharatiya Nyaya Sanhita, 2023 and the Code of Criminal Procedure, 1973 / Bharatiya Nagarik Suraksha Sanhita, 2023. We're regularly engaged by NRI clients specifically on Section 498A matters, where distance and unfamiliarity with Indian procedure make the right counsel matter most.",
    serviceGroups: [
      {
        heading: "Matters we handle",
        items: [
          "Offences under Section 498A (with particular experience acting for NRI clients)",
          "Freezing of bank accounts, attachment of property",
          "Offences affecting the human body — murder, suicide, dowry death, death by negligence, rape, kidnapping",
          "Criminal misappropriation of funds, criminal breach of trust & conspiracy",
          "Cheque dishonour under Section 138, Negotiable Instruments Act",
          "Forgery, mischief and economic offences",
          "Offences under the NDPS Act",
          "Offences against public tranquility and public justice",
          "Property offences — theft, robbery, extortion, cheating, breach of trust, misappropriation",
          "Cyber crime and cyber evidence",
        ],
      },
      {
        heading: "Services through the life of a matter",
        items: [
          "Assistance registering an FIR or criminal complaint",
          "Quashing of FIR, 41A Cr.P.C. notices, summoning orders and related proceedings",
          "Filing criminal complaints before police or magistrate (Sections 190, 200, 156(3) Cr.P.C.)",
          "Anticipatory bail applications — Sessions Court, High Court and Supreme Court",
          "Regular bail applications before criminal courts",
          "Revision, appeal and criminal writ petitions (Section 482 Cr.P.C. / Section 523 BNSS)",
          "Criminal trial before magistrate or Sessions Court",
          "Filing and defending complaints under Section 138, NI Act",
        ],
      },
    ],
  },
  {
    slug: "civil-litigation",
    title: "Civil Litigation",
    summary:
      "Contentious civil, commercial and property matters before trial courts, tribunals, High Courts and the Supreme Court.",
    highlights: [
      "Recovery suits & injunctions",
      "RERA, Punjab & Haryana",
      "Landlord & tenant disputes",
      "Consumer protection matters",
      "Property & land disputes",
      "Trademark, passing-off & copyright",
      "Insurance & professional negligence claims",
    ],
    approach:
      "Our civil practice covers the preparation and filing of lawsuits, written statements, counterclaims, discovery and every appeal needed to see a matter through to its conclusion — before trial courts, appellate courts, tribunals, the High Court and the Supreme Court of India.",
    serviceGroups: [
      {
        heading: "Matters we handle",
        items: [
          "Injunction and stay matters",
          "Commercial litigation and commercial/economic crime",
          "Corporate litigation",
          "Banking law and Co-operative Societies Act disputes, including matters before the Registrar of Societies",
          "Drug & Cosmetics Act matters for pharmaceutical clients",
          "Securities & Exchange Board of India (SEBI) matters",
          "RERA, Punjab & Haryana",
          "Defamation",
          "Enforcement of foreign judgments",
          "Environmental law",
          "Insurance claims and professional negligence",
          "Consumer protection matters (District & State Commission, Punjab)",
          "Trademark, passing-off and copyright disputes",
          "Tax litigation",
          "Cyber security, cyber law and cyber evidence",
          "MSME disputes",
          "Foreign exchange litigation",
          "Land acquisition and land/property disputes",
          "Product liability claims",
          "Public & administrative law",
          "Landlord & tenant disputes",
        ],
      },
    ],
  },
  {
    slug: "family-law",
    title: "Family Law",
    summary:
      "Matrimonial, custody and property disputes handled with both the civil and criminal dimensions in view.",
    highlights: [
      "Divorce petitions (mutual consent & contested)",
      "Child custody & guardianship",
      "Maintenance applications (Section 125 Cr.P.C., Section 24 HMA)",
      "Domestic violence & dowry-related matters",
      "Partition of joint property",
    ],
    approach:
      "Matrimonial disputes rarely stay confined to one court or one law — a single case can touch civil, criminal and matrimonial statutes at once. We counsel on property settlements, separation, custody, adoption, guardianship, wills and family finances, and carry a matter through every level of dispute, up to the Supreme Court of India where needed.",
    serviceGroups: [
      {
        heading: "Criminal-side matters",
        items: [
          "Complaints under Section 498A read with Section 406, IPC, and proceedings before the CAW Cell",
          "Complaints under the Protection of Women from Domestic Violence Act, 2005",
          "Complaints under the Dowry Prohibition Act",
          "Maintenance applications by a wife under Section 125, Cr.P.C.",
        ],
      },
      {
        heading: "Civil & matrimonial matters",
        items: [
          "Divorce petitions under Sections 13(1), 13(2) and 13B, Hindu Marriage Act — mutual consent, cruelty, desertion, impotency, adultery",
          "Custody of children under the Hindu Marriage Act, 1955",
          "Interim maintenance applications under Section 24, HMA",
          "Restitution of conjugal rights",
          "Partition of property jointly owned by husband and wife",
        ],
      },
    ],
  },
  {
    slug: "corporate-banking",
    title: "Corporate, Banking & Recovery",
    summary:
      "Corporate, banking and recovery matters before the DRT, NCLT and District Courts.",
    highlights: [
      "Debt Recovery Tribunal (DRT) matters",
      "NCLT, Chandigarh",
      "Banking & Co-operative Societies Act",
      "Corporate litigation & economic offences",
      "MSME disputes",
    ],
    approach:
      "We act in corporate and banking matters across India, with particular depth before the Debt Recovery Tribunal, National Company Law Tribunal (Chandigarh) and District Courts — covering both the civil and criminal dimensions of corporate disputes, including arbitration, economic offences and recovery of money.",
    serviceGroups: [
      {
        heading: "Forums & recovery",
        items: [
          "Debt Recovery Tribunal (DRT) and Debt Recovery Appellate Tribunal (DRAT)",
          "National Company Law Tribunal (NCLT), Chandigarh, and NCLAT",
          "RCS/ACS proceedings",
          "MSME dispute resolution",
        ],
      },
      {
        heading: "Practice areas",
        items: [
          "Banking & Finance",
          "Capital Markets and Securities Law",
          "Corporate & Commercial matters",
          "Corporate Restructuring & Insolvency",
          "Dispute Resolution & Arbitration",
          "Employment, Environment, and Governance/Risk/Compliance",
          "Intellectual Property Rights",
          "Joint Ventures and M&A / Private Equity",
          "International business — M&A advisory, restructuring, insolvency, joint-venture establishment, and cross-border supply/distribution/commercial agreements",
        ],
      },
    ],
  },
  {
    slug: "arbitration",
    title: "Arbitration",
    summary:
      "Mediation and arbitration support from arbitrator appointment through post-award proceedings.",
    highlights: [
      "Arbitration & Conciliation Act, 1996 proceedings",
      "Appointment of arbitrators",
      "Setting aside arbitral awards",
      "Mediation & conciliation",
    ],
    approach:
      "Arbitration is an increasingly common route for resolving business disputes in India, and we advise across the full lifecycle — national or international — from appointing an arbitrator through representation at the hearing and post-arbitration support where an award needs to be challenged.",
    serviceGroups: [
      {
        heading: "Services",
        items: [
          "National and international mediation and arbitration",
          "Enforcing foreign arbitral awards",
          "Facilitating conciliation between disputing parties toward a workable resolution",
          "Applications under the Arbitration and Conciliation Act, 1996 for appointment of a neutral arbitrator",
          "Setting aside a bad arbitral award",
        ],
      },
    ],
  },
  {
    slug: "labour-law",
    title: "Labour Law",
    summary:
      "Employer and employee-side representation across Labour Courts, tribunals and appeals.",
    highlights: [
      "Labour Court & Industrial Tribunal matters",
      "PF & ESI compliance disputes",
      "Wrongful dismissal & disciplinary proceedings",
      "Employment contracts",
    ],
    approach:
      "We handle industrial and labour law matters from Labour Courts up to the Supreme Court of India, and provide compliance advisory under the central and state labour and social-security legislation that most businesses have to navigate day to day. Preventive counselling comes first — litigation when it's genuinely needed.",
    serviceGroups: [
      {
        heading: "Compliance advisory",
        items: [
          "Employees' Provident Fund and Employees' State Insurance",
          "Factories Act, Payment of Wages, Minimum Wages, Payment of Bonus, Payment of Gratuity",
          "Maternity/paternity benefits and Labour Welfare Fund",
          "Professional Tax and Shops & Establishments Act compliance",
          "Payroll, EPF & ESI compliance management",
        ],
      },
      {
        heading: "Litigation & representation",
        items: [
          "Matters before Labour Tribunals and the PF Appellate Tribunal, Delhi",
          "Writ petitions in the Delhi High Court against Labour Court awards, through SLP in the Supreme Court",
          "Contract labour, PF and ESI compliance advisory for companies",
          "Trade union matters and employment-related litigation",
          "Disciplinary proceedings, from charge sheet through SLP",
          "Wrongful dismissal, retrenchment and Voluntary Retirement Scheme matters",
          "Employee rights, health & safety legislation, and collective bargaining",
        ],
      },
    ],
  },
  {
    slug: "legal-documentation",
    title: "Legal Documentation",
    summary:
      "Drafting that protects your position before a dispute exists, not just after.",
    highlights: [
      "Contracts & MOUs",
      "Legal notices & affidavits",
      "Sale/purchase property documentation",
      "Wills",
      "Vendor & commercial agreements",
    ],
    approach:
      "Good drafting is the cheapest form of dispute prevention there is. We draft across the full range of commercial and personal documentation, with an eye on protecting your position well before any dispute arises.",
    serviceGroups: [
      {
        heading: "Litigation drafting",
        items: [
          "Suits, written statements and rejoinders",
          "Affidavits of evidence and complaints",
          "Civil and criminal writs, appeals and legal notices",
          "Arbitration drafting",
        ],
      },
      {
        heading: "Commercial & personal documentation",
        items: [
          "Memoranda of Understanding (MOUs), of all types",
          "Banking loan agreements",
          "Non-disclosure agreements, vendor contracts and Master Service Agreements",
          "Employee joining & exit documentation",
          "Software licence and telecom services agreements",
          "Office lease, advertising and media agreements",
          "Supply, distribution and commercial agreements, including share purchase agreements",
          "Wills — drafting and registration",
          "Sale/purchase property documentation",
        ],
      },
    ],
  },
];
