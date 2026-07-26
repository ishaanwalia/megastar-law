# Megastar Law Associates — Website + CRM Project Plan

Status: **Planning locked, implementation not started.**
Client: Megastar Law Associates (Pradeep Sankhian/Sharma & Nikhil Choudhary, Advocates), Chandigarh.
Source files — the 4 the client actually sent (all in `C:\Users\Admin\Downloads\firmprofiles\`):
- `Megastar law Firm Profiles latest.docx` — **authoritative one, per filename**
- `MEGASTAR LAW ASSOCIATES PROFILE.docx`
- `Pardeep ji Stamp.cdr` (logo/stamp source art)
- Letterhead image (chamber numbers, offices, contact block)

`CORPORATE PROFILE.docx` in that same folder was **not** one of the 4 files provided and is out of scope — it belongs to a different firm (The Indian Lawyer & Allied Services) and has not been used for any content decisions below.

---

## 0. Content Due-Diligence Findings (read before writing any copy)

Extracted and cross-checked both `.docx` files against the letterhead. One thing needs client confirmation before publishing — flagging now so we don't bake inaccurate claims into a public site.

**Megastar's own profile text reuses generic network-style boilerplate in places.**
Both `MEGASTAR LAW ASSOCIATES PROFILE.docx` and `Megastar law Firm Profiles latest.docx` (the authoritative one) claim "150 Partners and Associates," "29 years in the legal field," and offices in 12 cities (Chandigarh, Ludhiana, Jalandhar, Delhi, Mumbai, Allahabad, Shimla, Jammu, Srinagar, Coimbatore, Bangalore, Chennai) — generic-sounding marketing copy that reads as templated rather than Pradeep's personally verified numbers. His own bar-enrollment letter, in the authoritative `latest.docx`, states a **verifiable, specific** profile instead:
- Pradeep Kumar Sharma (also styled "Sankhian"), Advocate, enrolled P-2435/2011
- Member, Punjab & Haryana High Court Bar Association & DBA Chandigarh, since 2011
- 15 years practicing (civil + criminal side)
- Named specialties: Civil recovery suits, NDPS Act, NI Act §138 (cheque dishonour), Consumer Forums (District + State Commission, Punjab), Banking & Co-operative Society Act, Land disputes, RERA Punjab & Haryana, Permanent Lok Adalat, NCLT Chandigarh
- Offices: SCO-570, 2nd Floor, Sector 45-C, Chandigarh (PIN 160047); Chamber 95, Punjab & Haryana High Court; Chamber 353-A, District Courts, Sector 43 — matches the letterhead
- 6 office staff/associates
- The letterhead's own office list (Allahabad, Chennai, Coimbatore, Delhi, Mumbai, Shimla, Baddi + regd. office Sector 63 Chandigarh) differs again from both profile docs — a third version of the city list.
- **Nikhil Choudhary** (co-named on the letterhead) has no bio, credentials, or bar details in any of the 4 files.

**Action before content is finalized:** ask the client which office-city list is current, whether "150 partners / 29 years" refers to a real referral network Megastar belongs to (fine to mention as "part of a pan-India associate network" if true) or should be dropped, and get Nikhil Choudhary's bio/photo/enrollment number. Until confirmed, the site will lead with Pradeep's verified personal credentials and describe the multi-city reach honestly (e.g., "associate network across India") rather than restating unverified numbers as Megastar's own.

---

## 1. Goals & Success Criteria
- **Public site**: premium, trust-building presence that converts visitors (individuals, NRIs, corporates, banks) into consultation requests. Lead with verified facts from §0, not network boilerplate.
- **CRM**: internal lead/case tracker for Pradeep + Nikhil — scoped small enough that it actually gets used daily, not a Clio-style practice-management suite.
- **Differentiation vs. theindianlawyer.in**: modern editorial layout, real visual hierarchy, sub-2s loads, one clear CTA per section, no cliché flag walls — the live-site audit above confirms this bar is easy to clear.
- **2026 baseline**: WCAG 2.2 accessibility, Core Web Vitals in the green, schema markup (LocalBusiness/Attorney/FAQ), mobile-first.

## 2. Information Architecture
**Public site**
- Home — hero, verified value props, 24/7 helpline, practice-area overview, primary CTA
- About — Pradeep's verified bio/credentials, Nikhil's bio (pending from client), firm philosophy
- Practice Areas — Criminal/Cyber, Civil, Family, Corporate/Banking/NCLT/DRT, Arbitration, Labour, Legal Documentation (content sourced from `MEGASTAR LAW ASSOCIATES PROFILE.docx`, de-duplicated)
- Why Us — personalized-attention angle, settlements + courtroom experience, NRI specialization (498A)
- Insights/Blog — optional at launch, 4-6 cornerstone articles for SEO
- Contact/Consultation — form, WhatsApp, phone, map to both Chandigarh chambers
- Offices — confirmed city list only (pending client answer)
- Privacy / Terms / Disclaimer (Bar Council advertising-rule compliant)

**CRM** (`/dashboard`, auth-gated)
- Dashboard (leads, upcoming hearings, tasks)
- Leads/Clients pipeline (New → Contacted → Retained → Active → Closed)
- Matters (linked to client, court, next hearing date, documents)
- Appointments/calendar
- Document vault
- Notes/activity timeline
- Basic reports (source, conversion)

**Logo resolved.** `Pardeep ji Stamp.cdr` is the client's actual logo source (per the client). Modern `.cdr` files are zip containers (`unzip`-able); it held a clean 256x256 rendered preview at `previews/page1.png` — much sharper than the JPEG letterhead crop (no compression artifacts). Upscaled to 1024px, converted ink-to-alpha (black art → opaque, white bg → transparent), trimmed, and saved to `public/brand/logo-mark.png` (+ `src/app/icon.png`, `apple-icon.png`). This is raster-derived, not true vector — fine for web use at header/footer/favicon sizes, but if the client ever needs large-format print, someone with CorelDRAW access should export a proper SVG/PDF from the original `.cdr` vector data (`content/data/page1.dat`, which is Corel's proprietary format and not practical to parse without the app).

## 3. Design System
- Editorial/authoritative, not the "blue scales-of-justice" cliché — this is also the fastest way to beat theindianlawyer.in on visual polish per the audit above.
- Reduced palette: deep charcoal/navy + warm cream + one accent (gold or deep teal). Dark mode supported.
- Confident oversized display type + highly readable body; real photography of Pradeep/Nikhil and both chambers over stock imagery.
- Purposeful motion only (scroll reveals, hover states) — no gimmicks.
- Logo: vectorize/clean the circular mark from the letterhead + `Pardeep ji Stamp.cdr` as the canonical source.

## 4. Tech Stack (Vercel/Claude-friendly, free-tier first)
- Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- Content: MDX/Contentlayer for practice-area and blog copy (no paid CMS needed at this scale)
- CRM data/auth: Supabase (Postgres + Auth + Storage) — free tier covers this project's volume
- Forms/email: React Hook Form + Zod + Resend (free tier)
- Deployment: Vercel (free Hobby tier is enough pre-launch; upgrade only if traffic requires it)
- Analytics: Vercel Analytics or Plausible free tier

## 5. Phases & Rough Timeline
1. **Content resolution** (parallel with design, ~3-5 days): send client the §0 questions, get Nikhil's bio, confirm office list.
2. **Design system + wireframes** (1 week): lock palette/type/logo, homepage + practice-area wireframe, client sign-off.
3. **Public site build** (2-3 weeks): all pages, real content, forms, animations, mobile polish — pushed to a Vercel preview URL continuously for client review (per client's ask to see the live production site early for sign-off).
4. **CRM core** (2-3 weeks): auth, client/matter data model, dashboard, document upload.
5. **Polish/testing** (1-2 weeks): accessibility audit, performance pass, schema markup, real content swapped in.
6. **Launch/handover** (~1 week): domain cutover, analytics, short CRM usage walkthrough for Pradeep.

Total: 8-12 weeks depending on how fast content/feedback comes back.

## 6. Risks
- Scope creep on CRM → hold a strict MVP list, phase 2 features only after launch.
- Content ambiguity (§0) → resolve before writing final copy; use placeholders that are obviously placeholders in previews, never invented numbers.
- Bar Council advertising rules (India) → no solicitation language, no exaggerated claims, standard disclaimer page.
- Data privacy (DPDP Act) → CRM stores client PII; use Supabase RLS, encrypt at rest (default), no client data in logs.

## 7. Build Progress & Lighthouse Results (2026-07-26)

Public site built: Home, About, Practice Areas (index + 7 detail pages), Contact (working server-action form), Privacy, Disclaimer. Logo resolved from the `.cdr` file (see §0). Lighthouse against the production build (`npm run build && npm run start`), homepage:

- Performance: **93**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**

Contact page (heaviest page — form + sidebar): Performance 91, others 100.

**Deployed**: pushed to [github.com/ishaanwalia/megastar-law](https://github.com/ishaanwalia/megastar-law) (master branch), imported into Vercel (team "walia", Hobby/free plan), live preview at the auto-generated `*.vercel.app` URL. Every push to `master` will now redeploy automatically. Custom domain not yet attached.

**Lesson learned, applies to all future pages (including the CRM):** the initial homepage build wrapped every section — including the above-the-fold hero — in a Framer Motion `whileInView` scroll-reveal (`src/components/reveal.tsx`) that starts at `opacity: 0` and only becomes visible after JS hydrates and an IntersectionObserver fires. That dropped Performance to 84 by delaying the Largest Contentful Paint element (the hero text) by ~900ms waiting on client JS. Fixed by rendering above-the-fold hero content as plain static markup with no entrance animation, and reserving `Reveal` for content that's actually below the fold on first paint. Don't reintroduce scroll-reveal wrappers on hero/first-viewport content later.

## 8. Immediate Next Steps
1. Send client the content questions from §0 (office list, network-affiliation framing, Nikhil's bio).
2. Vectorize the logo from the letterhead + `.cdr` stamp.
3. Scaffold the Next.js repo, push to a new git repo, connect Vercel for preview-URL review.
4. Draft homepage + practice-area copy from verified facts only.

---

## Tooling: Skills / Connectors / MCP needed (free only)

Everything below is either already built into this Claude Code session or has a genuinely free tier — nothing paid is required to execute this plan.

| Need | Tool | Cost |
|---|---|---|
| Read/write code, run the dev server, git | Built-in `Read/Write/Edit/Glob/Grep/Bash` | Free (already available) |
| Extract client's `.docx` profiles into copy | `docx` skill (used above) | Free, built-in |
| Preview the site as it's built, click through it, test mobile sizes | Browser tool (`Claude_Browser__*`) | Free, built-in |
| Research design trends / re-check competitor sites | `WebFetch` / `WebSearch` | Free, built-in |
| Launch & sanity-check the dev server before calling something done | `run` skill | Free, built-in |
| Version control + PR workflow | `gh` CLI via Bash | Free (GitHub free tier) |
| Hosting with preview URLs per push | Vercel | Free Hobby tier — no MCP needed, just `vercel` CLI or Git integration |
| CRM database + auth + file storage | Supabase | Free tier — no MCP needed, used via SDK in code |
| Transactional email (contact form, appointment confirmations) | Resend | Free tier (100 emails/day) — used via SDK, no MCP needed |
| Interaction/motion design fed directly into code (not client-facing previews) | Figma MCP (`get_motion_context`, `generate_diagram`, `use_figma`) | Figma has a free personal tier; used here to pull real motion/interaction specs into the coded components, skipping the mockup-review step entirely per client preference |

**Explicitly not recommended for this project** (present in this session but not free / not the right fit):
- The AI image/video/voice generation & "instant website builder" MCP (`b87db6ac-...`) — that toolset is a paid third-party service and its "create_website" flow is a no-code builder, which would fight the hand-coded Next.js approach here. Skip it. If real photography of Pradeep/Nikhil/the chambers isn't available, use a free stock source rather than AI-generated headshots for a law firm (trust/credibility risk).

---

## Before real implementation starts

Per your instruction: switch your mode from **Sonnet 5 Ultracode** to **Sonnet 5 High** before we begin coding. This plan is saved to memory and to this file so nothing is lost across that switch.
