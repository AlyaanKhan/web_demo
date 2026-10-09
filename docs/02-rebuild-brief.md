# Rebuild Brief: Strategies for Excellence

## Inputs
- **Business Model.docx**: *Strategies for Excellence, RCM Solutions*. The tagline is "Superior Revenue Results. Specialized financial workflows and meticulous auditing for premier healthcare organizations." The headline is "The Premium Choice for Revenue Cycle Management", with a 98% Collection Efficiency figure.
- **Core solutions**: Medical Billing, Dental Billing, Virtual Office Manager, Medical Coding, Verification of Benefits, Collection Agency Services.
- **EHR / billing platforms supported**: TherapyNotes, AdvancedMD, Practice Fusion, Valant, Tebra, TherapyAppointment, SimplePractice, Myriad Systems, and more.
- **Logo.jpg**: a photo of a screen showing the SfS mark (three gradient circles). We rebuilt it as vector SVG; see `public/brand/`.
- **Reference site**: sfsaz.care. Its structure, palette and logo come from there (see `01-sfsaz-reference-audit.md`).

## Fixed real data (everything else is demo data)
| | |
|---|---|
| Company | **Strategies for Excellence** |
| Phone | **(458) 321-0954** |
| Email | **info@sfe.com** |

## Design system
- **Theme**: light by default, with a dark-mode toggle. The choice persists and respects `prefers-color-scheme` only after the user opts in.
- **Fonts**: **Plus Jakarta Sans** for UI and body, and **Instrument Serif** italic for editorial accent words in headings. The logo monogram uses **Cormorant Garamond** 600, converted to vector paths.
- **Icons**: lucide-react.
- **Palette**: derived from the logo gradient.
  - Ink `#1B1A3A` (indigo), Brand `#0F7C7A` (teal), Brand-2 `#2A294D`, Sage `#8DB5AA`, Mint `#A7E1DB`, Canvas `#FFFFFF` / `#F7F8FA`
  - Signature gradient: `#2A294D → #0F7C7A → #8DB5AA`
- **Motion**: framer-motion. It covers the logo splash loader, route-transition loader, scroll reveals, count-up stats, marquee, magnetic and hover lifts, and parallax. All motion respects `prefers-reduced-motion`.

## Sitemap
- `/` Home
- `/services` and `/services/:slug` (6 services)
- `/platforms` (EHR integrations)
- `/about` (story timeline, values, team)
- `/contact` (form, details, FAQ)
- 404

## Logo decision
The source logo reads **SfS / Strategies for Success**. The company is **Strategies for Excellence**, so the site uses the
same mark with the letters **S · f · E** (`sfe-mark.svg`). A faithful **S · f · S** recreation (`sfs-mark-original.svg`) is
also included. To switch, change `LOGO_LETTERS` in `src/components/brand/Logo.tsx`.
