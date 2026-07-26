// Verified facts only — sourced from the client's authorized profile documents
// and letterhead. See PLAN.md §0 for provenance and open questions.

export const firm = {
  name: "Megastar Law Associates",
  tagline: "Advocates, Chandigarh",
  email: "megastarlaw@gmail.com",
  phone: "+91 98885 14798",
  helpline: "+91 94170 14798",
  helplineLabel: "24/7 Legal Helpline",
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
  highlights: string[];
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
  },
  {
    slug: "civil-litigation",
    title: "Civil Litigation",
    summary:
      "Contentious civil, commercial and property matters before trial courts, tribunals, High Courts and the Supreme Court.",
    highlights: [
      "Recovery suits & injunctions",
      "Landlord & tenant disputes",
      "Consumer protection matters",
      "Property & land disputes",
      "Trademark, passing-off & copyright",
      "Insurance & professional negligence claims",
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
  },
];
