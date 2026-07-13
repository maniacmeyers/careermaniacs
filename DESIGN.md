# Design

Career Maniacs visual system — "Nazaré dawn patrol." The brand environment is
literal open water (the logo is a wave): deep ocean-black surface, foam-white
ink, one dawn-gold accent reserved for the ask. Aesthetic lane: big-wave
surf-documentary title card. Not SaaS-cyan, not editorial-serif, not terminal.

## Color (OKLCH, defined in src/App.css)

| Role | Value | Use |
|---|---|---|
| bg-deep | oklch(0.10 0.016 250) | hero/footer, heavy sections |
| background | oklch(0.135 0.018 250) | page body |
| card | oklch(0.17 0.022 250) | `.panel` surfaces |
| foreground | oklch(0.965 0.004 250) | ink |
| muted-foreground | oklch(0.77 0.022 250) | secondary text (≥4.5:1 on bg) |
| primary | oklch(0.62 0.13 245) | cobalt — links, method numbers, wave strokes |
| teal | oklch(0.74 0.115 175) | logo teal — decorative gradients only, never text |
| gold | oklch(0.85 0.145 84) | THE CTA color; `.btn-gold` with --on-gold text; also focus ring + selection |
| border | oklch(0.28 0.024 250) | neutral hairlines (never cyan) |

Strategy: Committed dark drench. Gold appears only where action or dawn lives
(CTAs, the "But" story beat, Interview Maniac teaser). One CTA verb site-wide:
"Book a 15-minute call" → /contact#book.

## Typography

- **Archivo** (variable: wdth 62–125, wght 300–900) — everything.
  - `.display` hero: wdth 118, wght 800, clamp(2.6rem→5.25rem)
  - `.headline` h2: wdth 112, wght 750
  - `.headline-sm` h3: wdth 110, wght 700
  - `.label-condensed`: wdth 76, caps, tracked — echoes the logo wordmark.
    Stat labels and nav only. NEVER a section eyebrow.
- **Source Serif 4 italic** — `.story-voice`, the storytelling register:
  ABT beats, testimonial quotes, pull lines. This serif is Jeff's spoken voice.

## Components

`.btn-gold` / `.btn-ghost` (only two buttons) · `.panel` · `.hairline-gradient`
(teal→cobalt 1px rule) · `WaveScene` (src/components/WaveScene.jsx — SVG wave
strokes echoing the logo curl; variant="night" hero, variant="dawn" for the
Interview Maniac teaser; aria-hidden, reduced-motion safe).

## Motion

Framer Motion. One orchestrated hero load (wave draws in ~2.4s, copy rises);
scroll sections use the shared `rise` pattern (opacity+24px translate,
ease [0.22,1,0.36,1], once). Everything honors prefers-reduced-motion via the
global media query + WaveScene's own fallback.

## Bans (enforced)

Gradient text · glassmorphism · glow shadows · cyan borders on everything ·
icon-card grids · eyebrow kickers per section · more than one CTA verb ·
banned copy words (leverage, utilize, unlock, seamless, game-changer...).
