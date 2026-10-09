# Strategies for Excellence: RCM Solutions

A front-end-only marketing site for **Strategies for Excellence**, a revenue cycle management company. Built with React, TypeScript, Vite, Tailwind CSS v4, framer-motion and lucide-react.

Everything is demo data except the company name, phone **(458) 321-0954** and email **info@sfe.com**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Project map

| Path | What |
|---|---|
| `src/pages/` | Home, Services, Service detail, Platforms, About, Contact, 404 |
| `src/components/brand/` | Vector logo, splash loader, route-transition loader |
| `src/data/` | Demo content (services, testimonials, team, FAQs) |
| `src/lib/site.ts` | Company name, phone, email, address |
| `src/index.css` | Design tokens (light/dark palette, fonts, utilities) |
| `public/brand/` | Logo SVGs (SfE + original SfS recreation) |
| `scripts/build-logo.mjs` | Regenerates the logo from font outlines |
| `docs/` | Reference-site audit and rebuild brief |

## Deploy

Vercel detects Vite automatically. `vercel.json` rewrites all routes to `index.html` so deep links like `/services/medical-billing` work.
