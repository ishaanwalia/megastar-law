// Educational content only — general legal information, not legal advice.
// Each article links back to /disclaimer. Keep claims to well-established
// procedural facts; never state case outcomes or firm statistics here.

export type InsightSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string; // ISO date
  intro: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "anticipatory-bail-punjab-haryana",
    title: "Anticipatory Bail in Punjab & Haryana: A Practical Overview",
    description:
      "What anticipatory bail is, when to apply for it, and how the process works before the Sessions Court and the Punjab & Haryana High Court.",
    category: "Criminal Law",
    publishedAt: "2026-07-27",
    intro:
      "Anticipatory bail lets a person apprehending arrest in a non-bailable offence approach the court for protection before that arrest happens, rather than after. It's one of the most time-sensitive applications in criminal practice — the difference between filing early and filing late can mean the difference between staying out of custody and having to apply for regular bail instead.",
    sections: [
      {
        heading: "When to apply",
        paragraphs: [
          "An application for anticipatory bail becomes relevant the moment someone has reason to believe they may be arrested in connection with a non-bailable offence — typically after an FIR is registered, or sometimes even before, if a credible threat of arrest exists.",
        ],
        list: [
          "After an FIR is registered naming you as an accused",
          "On receiving a police notice under Section 41A, Cr.P.C. that suggests arrest may follow",
          "Where a complaint has been filed and arrest appears imminent",
        ],
      },
      {
        heading: "Where the application goes",
        paragraphs: [
          "Anticipatory bail applications are typically filed first before the Sessions Court. If relief isn't granted there, or the matter warrants it, the application can be renewed before the Punjab & Haryana High Court. In urgent circumstances, interim protection can sometimes be sought pending the full hearing.",
        ],
      },
      {
        heading: "What the court weighs",
        paragraphs: [
          "Courts generally look at the nature and gravity of the accusation, the applicant's antecedents, the possibility of the applicant fleeing justice, and whether the accusation has been made to injure or humiliate the applicant by having them arrested. Every case turns on its specific facts — this is a general outline, not a prediction of outcome for any particular matter.",
        ],
      },
    ],
  },
  {
    slug: "nri-guide-section-498a",
    title: "NRI Guide: Responding to a Section 498A Complaint from Abroad",
    description:
      "A practical starting point for NRIs named in a Section 498A complaint in India — what the offence covers, and how to respond while living overseas.",
    category: "Family Law",
    publishedAt: "2026-07-27",
    intro:
      "Section 498A of the Indian Penal Code (now carried forward under the Bharatiya Nyaya Sanhita) deals with cruelty by a husband or his relatives toward a wife. For NRIs, being named in a 498A complaint raises a specific problem on top of the legal one: distance. Court dates, notices and procedural deadlines don't pause because you live in a different timezone.",
    sections: [
      {
        heading: "What makes it different for NRIs",
        paragraphs: [
          "The offence itself is the same regardless of where the accused lives, but the practical challenges are not. Passport impoundment, look-out circulars, and the logistics of appearing (or being represented) before an Indian court from overseas all need to be managed alongside the substance of the case.",
        ],
        list: [
          "Coordinating representation without needing to travel for every hearing",
          "Understanding whether a look-out circular or passport action has been initiated",
          "Responding to summons and notices within Indian procedural timelines from abroad",
          "Exploring anticipatory bail where arrest is a live concern",
        ],
      },
      {
        heading: "First steps",
        paragraphs: [
          "The most useful thing an NRI can do early is get a clear, factual read on where the complaint actually stands — has an FIR been registered, is it still at the complaint stage, has a notice been issued — before deciding on a response. Acting on incomplete information, or waiting too long to engage counsel in India, are the two most common mistakes.",
        ],
      },
    ],
  },
  {
    slug: "cheque-dishonour-section-138",
    title: "Cheque Dishonour Under Section 138, NI Act: What Happens Next",
    description:
      "The legal notice, the payment window, and the complaint process that follows a dishonoured cheque under Section 138 of the Negotiable Instruments Act.",
    category: "Civil & Commercial",
    publishedAt: "2026-07-27",
    intro:
      "A dishonoured cheque isn't automatically a criminal matter — it becomes one only if the payee follows a specific procedure within specific timelines. Missing those timelines can mean losing the right to prosecute under Section 138 altogether, even if the underlying debt is genuine.",
    sections: [
      {
        heading: "The procedure, step by step",
        paragraphs: [],
        list: [
          "The cheque is presented for payment and returned unpaid by the bank (for insufficient funds, or a similar reason)",
          "The payee must issue a legal notice demanding payment within 30 days of receiving the bank's return memo",
          "The drawer then has 15 days from receiving that notice to make the payment",
          "If payment isn't made within that 15-day window, a criminal complaint can be filed — within one month of the cause of action arising",
        ],
      },
      {
        heading: "Why the timelines matter",
        paragraphs: [
          "Section 138 is deadline-driven at every stage. A notice sent late, or a complaint filed outside the limitation window, can hand the drawer a straightforward technical defense regardless of the merits of the underlying transaction. Getting the sequence right from the moment a cheque bounces is worth more than trying to fix it later.",
        ],
      },
    ],
  },
  {
    slug: "rera-complaints-punjab-haryana",
    title: "RERA Complaints in Punjab & Haryana: When and How to File",
    description:
      "What the Real Estate (Regulation and Development) Act covers, and when a homebuyer or allottee should consider filing before RERA, Punjab & Haryana.",
    category: "Corporate & Real Estate",
    publishedAt: "2026-07-27",
    intro:
      "The Real Estate (Regulation and Development) Act, 2016 gives homebuyers a dedicated forum — separate from ordinary civil courts — to raise complaints against builders and promoters. For delayed possession, undisclosed changes to a project, or refund disputes, RERA is often faster and more specialized than general civil litigation.",
    sections: [
      {
        heading: "What RERA typically covers",
        paragraphs: [],
        list: [
          "Delay in handing over possession beyond the date committed in the agreement",
          "Deviation from sanctioned plans or promised specifications",
          "Refund of amount paid, with interest, where a project is delayed or abandoned",
          "Compensation claims against a promoter for failing statutory obligations",
        ],
      },
      {
        heading: "Before filing",
        paragraphs: [
          "It helps to have the builder-buyer agreement, payment receipts, and any written correspondence about delays or deviations organized before filing. RERA authorities move on documentary evidence, so a clear paper trail matters more here than in many other forums.",
        ],
      },
    ],
  },
];
