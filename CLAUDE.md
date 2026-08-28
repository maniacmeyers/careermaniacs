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

Key custom CSS classes defined in `src/App.css` (see `DESIGN.md` for the full system):
- `.display` / `.headline` / `.headline-sm` — Archivo variable-width type voices
- `.label-condensed` — condensed caps (stat labels + nav only, never section eyebrows)
- `.story-voice` — Source Serif 4 italic, the storytelling register
- `.btn-gold` / `.btn-ghost` — the only two buttons; gold is the one CTA color
- `.panel` — card surface; `.hairline-gradient` — teal→cobalt 1px rule
- `.sunlit` — ocean-glass panel for content over the risen sun (deliberate exception)
- `.skip-link` — keyboard skip-to-content, hidden until focused
- `.gradient-text` / `.glass` / `.tilt-card` / `.btn-primary` etc. — legacy aliases remapped to current tokens; do not use in new code

### Design Tokens

"Nazaré dawn patrol" — deep ocean-black surface, foam-white ink, one dawn-gold accent. All colors are OKLCH custom properties in `:root` of `src/App.css`; `DESIGN.md` is the authority. Never hard-code hex colors; the old cyan/emerald slate theme is gone.

### Ocean background

`src/components/OceanCanvas.jsx` renders a site-wide WebGL sunrise ocean (fixed, behind everything) with a CSS/SVG fallback when WebGL is unavailable and a static frame under `prefers-reduced-motion`. Framer Motion is wrapped in `<MotionConfig reducedMotion="user">` in `App.jsx` — keep it that way.

### Static Assets

All in `public/`: `career-maniacs-logo.png`, `coach-photo.jpg`, favicons. Referenced as absolute paths (e.g., `/coach-photo.jpg`).

### Icons

Lucide React (`lucide-react`) for all icons throughout the site.

### ESLint

Flat config in `eslint.config.js`. `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **careermaniacs** (771 symbols, 1482 relationships, 41 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/careermaniacs/context` | Codebase overview, check index freshness |
| `gitnexus://repo/careermaniacs/clusters` | All functional areas |
| `gitnexus://repo/careermaniacs/processes` | All execution flows |
| `gitnexus://repo/careermaniacs/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
