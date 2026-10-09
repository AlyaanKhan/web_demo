# Reference Audit — sfsaz.care

> Scraped 2026-10-09 from https://sfsaz.care/ (homepage plus Our Story and FAQ pages).
> We studied it as a **reference** for the rebuild. The new site is for **Strategies for Excellence (RCM Solutions)**,
> which is a different business (see `02-rebuild-brief.md`).

---

## 1. What the site is

| | |
|---|---|
| **Brand** | Strategies for Success (abbreviated "SfS") |
| **Industry** | Outpatient mental health: counseling, therapy, psychiatry, TMS |
| **Region** | Arizona, with 5 offices (Chandler, Anthem, Casa Grande, Gilbert, Goodyear) plus virtual |
| **Title tag** | "Strategies for Success \| Counseling, Therapy & Psychiatry" |
| **Meta description** | "Compassionate mental health and psychiatric care in Arizona. Therapy, medication management, and personalized treatment plans. Book now." |
| **Platform** | WordPress, Hello Elementor theme, Elementor Pro, Rank Math SEO |
| **Founded** | June 2012 by Elizabeth, who started as a solo practitioner in South Chandler |

### What happens on the homepage (top to bottom)
1. **Top utility bar**: "Located in Chandler, Gilbert, Anthem, Casa Grande, Goodyear and Virtual", appointment email, two phone numbers, and a holiday-closure notice.
2. **Header and mega nav**: Our Story · Services (Counseling, TMS, Psychiatry, CBT, DBT, EMDR) · Our Team · TMS Therapy · Treated (Depression, PTSD, Trauma, Anxiety, Substance Abuse) · Resources (FAQ's, Insurance, EAP, Professional Referral, Careers, Videos, Testimonials, Blog) · Locations · Contact. CTAs are **Book Now**, **Pay Bill** and **Patient Portal**.
3. **Hero**: "Discover your path to mental wellness", with the CTA "Book Your First Session".
4. **Why Strategies for Success**: three pillars:
   - *Personalized Care*: "We tailor our approach to each patient's unique needs…"
   - *Expert Team*: "Our skilled providers use the latest techniques…"
   - *Supportive Environment*: "adults and children, English and Spanish, telemedicine, most insurance accepted."
5. **Service features**: TMS Therapy, Psychiatric Care and Counseling, each with a long paragraph and "Learn More", followed by "View More Services".
6. **Promo band**: "We now offer TMS: learn how this service can complement talk therapy".
7. **What We Treat**: Substance Abuse, Anxiety, Trauma, PTSD and Depression, shown as icon cards from the Noun Project.
8. **The Results**: a stats comparison.
   - Psychiatric medications: 40–60% response rate, and 5–15% of patients with long-term results.
   - TMS therapy: 50–80% response rate, and 30–60% of patients with long-term results.
   - "View Research" leads to 10 citations (Frontiers, PubMed, NIMH, Nature, Stanford and others).
9. **Testimonials**: "Real Patient Testimonials", a slider of 5 dated reviews.
10. **Path to Relief / Contact**: operating hours and addresses for all 5 offices.
11. **Closing CTA**: "Embark On Your Journey Of Growth And Mental Wellness. Take the First Step".
12. **Footer**: about blurb, Facebook and Instagram links, menu, contact, legal links and the office list.

### The Our Story timeline (a pattern worth reusing)
2012 solo practice → 2013 group practice → 2018 medication management → 2019 Anthem office → 2020 COVID and virtual care →
2021 new HQ, Care Coordinator role and teen groups → 2022 Medical Director → 2023 Goodyear office and TMS.

### FAQ pattern
The FAQ is an accordion of primary questions: cost and insurance, finding benefits info, and workflow (Book Now → intake → forms → virtual intake → provider assignment).
Note that **"Verification of Benefits"** already appears here as an operational step. It is the same service the RCM business sells.

---

## 2. Visual identity

### Colour palette (from the Elementor global tokens in `post-4.css`)
| Token | Hex | Role |
|---|---|---|
| `primary` | `#008080` | Teal. Buttons, links, accents |
| `secondary` | `#2A294D` | Deep indigo/ink. Headings and the logo's left circle |
| `accent` | `#004040` | Dark teal. Hover states |
| `text` | `#343B3E` | Body copy |
| custom | `#254269` | Navy blue |
| custom | `#0F5677` | Ocean blue (seen in one widget) |
| custom | `#F4F4F4` / `#F6F6F6` / `#FAFBFC` | Section backgrounds |
| custom | `#A7E1DB` | Mint highlight |
| custom | `#7B8795` | Muted slate |
| custom | `#FFBC7D` | Warm peach (star ratings) |

**Logo gradient** (sampled from `SFS-LOGO.png.png`): `#1E1B3F` (indigo) → `#4E4A72` (violet-slate) → `#456F70` (teal) → `#A9C2BB` (sage mist).

### Typography
| Role | Font |
|---|---|
| Primary and H1 | **Cinzel** 700 (classical Roman caps), 56px |
| Secondary and H2 | **Cinzel** 600, 36px; plus **Poppins** 600 for some headings |
| Body | **Oxygen** 400, 18px |
| Accent | **Lora** 600 |
| Logo wordmark | A hand-lettered, Papyrus-style serif |

### Logo
- Three overlapping circles in a horizontal gradient from indigo to sage, with the white serif letters **S · f · S** knocked out.
- The wordmark "Strategies for Success" sits below it, between hairline rules.
- Source: `https://sfsaz.care/wp-content/uploads/SFS-LOGO.png.png` (1016×541 PNG).

### Imagery (all under `https://sfsaz.care/wp-content/uploads/`)
| File | Usage |
|---|---|
| `SFS-LOGO.png.png` | Logo |
| `portrait-beautiful-woman-1.webp` | Hero portrait |
| `front-view-beautiful-girl-with-yellow-hoodie-1.webp` | Secondary hero / CTA |
| `2148923929.jpg` | Stock lifestyle photo (Freepik) |
| `Counseling-2.jpg`, `Psychiatric-Care.jpg`, `tms-therapy.jpg` | Service feature photos |
| `team-1.png` | Team section |
| `form.png` | Contact form illustration |
| `logo-1-1.png` … `logo-8-1.png` | Insurance and partner logos strip |
| `noun-anxiety-*.svg`, `noun-depression-*.svg`, `noun-shame-*.svg`, `noun-angry-*.svg`, `noun-alcohol-*.svg` | Condition icons from the Noun Project |

---

## 3. UX assessment: what to keep and what to fix

**Keep**
- The teal and indigo identity. It feels calm, clinical and trustworthy.
- Clear service cards with a single CTA each.
- A stats band that proves outcomes.
- Social proof: dated testimonials.
- The timeline storytelling on the "Our Story" page.
- The FAQ accordion.

**Fix in the rebuild**
- **Too many fonts.** Cinzel, Poppins, Oxygen, Lora and a hand-lettered wordmark make five families. We will use two.
- **Logo is raster and blurry** at small sizes, so we will rebuild it as vector SVG.
- **Mega nav overload.** Nine top-level items and three CTAs. We will cut this down to five or six items and one primary CTA.
- **Long paragraphs** in service cards. We will tighten the copy and use icon bullets instead.
- **Stock-photo heavy** and inconsistent in style. We will use product-style UI mockups, illustrations and a consistent photo treatment instead.
- **No dark mode, little motion, and a dated Elementor look.**
- **Duplicate phone numbers and a stale holiday banner** in the header.
