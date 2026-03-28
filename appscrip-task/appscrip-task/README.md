# Appscrip-task-Candidate

A production-grade **Product Listing Page (PLP)** built with **Next.js 15** (App Router), TypeScript, and pure CSS — no UI framework dependencies.

## Live Demo

🚀 Deploy link: (add your Netlify URL here after deployment)

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | SSR / ISR framework |
| TypeScript | Type safety |
| Pure CSS (custom properties) | Styling — no Bootstrap/Tailwind runtime |
| Fake Store API | Mock product data |

## Key Features

### Server-Side Rendering (SSR)
The `app/page.tsx` is an **async Server Component** — it fetches products and categories directly on the server using `fetch()` with ISR (`revalidate: 3600`). The browser receives fully rendered HTML with product data, ensuring:
- Fast first paint
- SEO-friendly HTML
- No loading flash for products

### SEO
- `<title>` and `<meta name="description">` via Next.js `Metadata` API
- `<h1>` for page title, `<h2>` for product names
- Schema.org `ItemList` JSON-LD structured data
- Schema.org `Product` + `Offer` + `AggregateRating` on each card via `itemProp`
- SEO-friendly `alt` text on all images
- `data-seo-name` attribute with descriptive filename convention
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<aside>`, `<article>`, `<nav>`, `<section>`)
- `aria-*` attributes throughout for accessibility

### Responsive Design
| Breakpoint | Layout |
|-----------|--------|
| Desktop (>1200px) | 4-column grid + sidebar |
| Tablet (768–1200px) | 3-column grid + filter drawer |
| Mobile (<768px) | 2-column grid + filter drawer |
| Small mobile (<480px) | 2-column grid |

### Filtering & Sorting
- Filter by category (multi-select checkboxes)
- Filter by max price (range slider)
- Filter by minimum rating (radio)
- Sort: Recommended / Newest / Most Popular / Price ASC / Price DESC
- Active filter chips with one-click removal
- Client-side filtering (no extra API calls)

## Project Structure

```
appscrip-task/
├── app/
│   ├── components/
│   │   ├── Header.tsx        # Sticky header with nav, search, cart
│   │   ├── Filters.tsx       # Sidebar filter panel
│   │   ├── ProductCard.tsx   # Individual product card with schema
│   │   ├── ProductGrid.tsx   # Grid/list layout with skeleton loader
│   │   ├── ProductListing.tsx # Client component: filter/sort/paginate
│   │   └── Footer.tsx        # Footer with newsletter
│   ├── lib/
│   │   └── api.ts            # SSR data fetching + schema builder
│   ├── types/
│   │   └── product.ts        # TypeScript interfaces
│   ├── globals.css           # All styles (pure CSS custom properties)
│   ├── layout.tsx            # Root layout with metadata + fonts
│   ├── page.tsx              # SSR page — async Server Component
│   └── not-found.tsx         # 404 page
├── next.config.ts
├── package.json
└── README.md
```

## Running Locally

```bash
# Install dependencies
npm install

# Development server (with fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

Visit: http://localhost:3000

## Deployment (Netlify)

1. Push this repo to GitHub as `Appscrip-task-YourName`
2. Log in to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variable: `NODE_ENV=production`
6. Deploy!

Alternatively, install Netlify CLI:
```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

## Evaluation Criteria Met

| Criteria | Implementation |
|---------|---------------|
| ✅ Code structure | Modular components, lib/, types/ |
| ✅ Naming conventions | PascalCase components, camelCase functions, kebab-case CSS |
| ✅ Minimum packages | Only Next.js + React (no UI libs) |
| ✅ Screen size fit | 4 responsive breakpoints |
| ✅ Minimal DOM | Semantic HTML, no unnecessary wrappers |
| ✅ SEO — title/description | Next.js Metadata API |
| ✅ SEO — H1/H2 tags | h1 on page, h2 on products |
| ✅ SEO — Schema | JSON-LD ItemList + Product itemProp |
| ✅ SEO — Alt text | Descriptive alt on all images |
| ✅ SSR | Async Server Component with ISR |
| ✅ Mock API | fakestoreapi.com |
| ✅ Responsive | Mobile + Tablet + Desktop |
