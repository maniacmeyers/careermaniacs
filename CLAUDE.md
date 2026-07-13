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

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **careermaniacswebsite** (539 symbols, 969 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/careermaniacswebsite/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/careermaniacswebsite/context` | Codebase overview, check index freshness |
| `gitnexus://repo/careermaniacswebsite/clusters` | All functional areas |
| `gitnexus://repo/careermaniacswebsite/processes` | All execution flows |
| `gitnexus://repo/careermaniacswebsite/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

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
