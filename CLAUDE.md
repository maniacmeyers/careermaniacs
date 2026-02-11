# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

Package manager: npm is used (package-lock.json present), though pnpm is declared in `packageManager` field. Use npm.

## Architecture

Single-page marketing site for Career Maniacs (executive career & AI coaching). React 19 + Vite + Tailwind CSS v4, no TypeScript — all components are `.jsx`.

### Routing

React Router DOM v7 with `BrowserRouter`. Routes defined in `src/App.jsx`:
- `/` — HomePage
- `/about` — AboutPage
- `/services` — ServicesPage
- `/services/job-acquisition` — ServiceDetailPage (prop: `service="job-acquisition"`)
- `/services/gtm-onboarding` — ServiceDetailPage (prop: `service="gtm-onboarding"`)
- `/testimonials` — TestimonialsPage
- `/contact` — ContactPage

`ServiceDetailPage` is a single component that renders different content based on its `service` prop (data is defined inline in the component).

### Layout Structure

`App.jsx` wraps everything in: `Router` → `ScrollToHashWrapper` → `Navigation` + `<Routes>` + `Footer`. The morphing gradient border (`div.morphing-border`) sits at the very top.

### Hash-based Scrolling

Cross-page scroll-to-section uses URL hashes (e.g., `/contact#contact-form`, `/testimonials#testimonials-section`). Two mechanisms:
- `src/hooks/useScrollToHash.js` — hook used by `ScrollToHashWrapper`, reacts to `location.hash` changes with 80px nav offset
- `src/utils/scrollUtils.js` — imperative utilities (`scrollToSection`, `navigateAndScroll`) with configurable offset

### UI Components

shadcn/ui (new-york style, JSX not TSX) via `components.json`. Components live in `src/components/ui/`. The `cn()` utility is at `src/lib/utils.js`. Path alias `@` maps to `src/`.

### Styling

Tailwind CSS v4 integrated via `@tailwindcss/vite` plugin (not PostCSS). Two CSS files:
- `src/index.css` — empty/minimal, imported in `main.jsx`
- `src/App.css` — **the main stylesheet**: CSS custom properties (design tokens in `:root`), Tailwind theme config (`@theme inline`), and all custom component classes

Key custom CSS classes defined in `src/App.css`:
- `.gradient-text` — cyan-to-emerald gradient text
- `.glass` — glassmorphism card/nav backgrounds
- `.tilt-card` — 3D perspective hover effect
- `.gradient-border` — cyan border with glow
- `.morphing-border` — animated gradient top border
- `.btn-primary` / `.btn-secondary` — button styles
- `.fade-in` / `.slide-up` — animation classes
- `.modal-backdrop` / `.modal-content` — modal styles
- `.glow` / `.glow-hover` — box-shadow utilities

### Design Tokens

Dark slate theme with teal/cyan accents. All colors defined as CSS custom properties in `:root` of `src/App.css`:
- Background: `#0f172a` (dark slate)
- Primary: `#06b6d4` (cyan)
- Secondary: `#10b981` (emerald)
- Foreground: `#ffffff`
- Muted foreground: `#cbd5e1` (slate-300)

### Static Assets

All in `public/`: `career-maniacs-logo.png`, `coach-photo.png`, favicons. Referenced as absolute paths (e.g., `/coach-photo.png`).

### Icons

Lucide React (`lucide-react`) for all icons throughout the site.

### ESLint

Flat config in `eslint.config.js`. `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).
