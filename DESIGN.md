---
name: "Career Maniacs"
description: "An ocean world. A steady hand. A clear next move."
colors:
  action: "#6ee8bd"
  action-hover: "#99f0d0"
  on-action: "#102b29"
  primary: "#69d6dd"
  teal: "#00c9bb"
  green: "#00e68b"
  blue: "#00a5eb"
  bg-deep: "#101a22"
  background: "#15232c"
  foreground: "#f3f7f5"
  card: "#1b2d37"
  secondary: "#243a44"
  muted-foreground: "#bacbd0"
  border: "#3e535d"
  input: "#14242e"
  navigation: "#242730"
typography:
  hero:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 6.6vw, 6rem)"
    fontWeight: 750
    lineHeight: 1.04
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 108"
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 118"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 3.25rem)"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.55rem)"
    fontWeight: 700
    lineHeight: 1.1
    fontVariation: "\"wdth\" 110"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    lineHeight: 1.65
  story:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 2.1vw, 1.5rem)"
    fontWeight: 450
    lineHeight: 1.45
    letterSpacing: "0.002em"
  navigation:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    letterSpacing: "0"
    fontVariation: "\"wdth\" 100"
rounded:
  control: "6px"
  surface: "12px"
  panel: "16px"
spacing:
  mobile-gutter: "20px"
  desktop-gutter: "40px"
  field-x: "16px"
  field-y: "12px"
  action-x: "1.5rem"
  action-y: "0.95rem"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.surface}"
    padding: "0.95rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-ghost:
    textColor: "{colors.foreground}"
    rounded: "{rounded.surface}"
    padding: "0.95rem 1.5rem"
  input:
    backgroundColor: "{colors.input}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.surface}"
    padding: "12px 16px"
  panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.panel}"
---

# Design System: Career Maniacs

## Overview

**Creative North Star: "An ocean world. A steady hand. A clear next move."**

Career Maniacs uses open water, wide Archivo headlines and direct human language. The original wave logo anchors a teal, green and blue identity; sea-glass green identifies the next action. Opaque ocean surfaces carry reading-heavy content.

The homepage moves from calm animated sunrise water to an illustrative breaking wave for Position, Story and Close, then returns to calm water with a higher sun. This is the implemented expression of the owner-approved direction, not a new shader animation. The public /style-guide page shares the live site tokens.

**Key Characteristics:**
- Original wave identity, preserved without redrawing.
- Wide headlines and readable all-sans body copy.
- Ocean imagery around opaque reading surfaces.
- Visible native controls, ordinary scrolling and reduced-motion alternatives.

This document records the current cascade in src/App.css and the implemented HomePage, StyleGuidePage, Navigation, ContactPage and OceanCanvas components. PRODUCT.md supplies durable brand commitments; .impeccable/ASSETS.md records asset provenance. The former gold/serif document is superseded.

## Colors

Primary action is Sea glass (action), with a lighter hover and dark water ink (on-action). The CSS token named primary is the supporting light cyan; it is not the main filled CTA color. Secondary identity colors are the original logo teal, green and blue. Neutrals are Ocean (background), Deep water (bg-deep), Foam (foreground), Supporting text (muted-foreground), the card/secondary surfaces, hairline border and input surface. Navigation uses the logo's charcoal backdrop.

**The Sea Glass Rule.** Use the action token for the main next step. Sunrise warmth belongs to the ocean imagery.

Compatibility remains intentional: --gold resolves to --action, --gold-hot to --action-hover, and --on-gold to --on-action. The legacy .btn-gold class is green, including in navigation and the inquiry form; neither its name nor older comments describe a gold palette. Selection and the global focus ring inherit these aliases too.

## Typography

**The One Family Rule.** Use self-hosted Archivo throughout; the story voice is normal sans-serif, not serif italic.

The font is public/fonts/Archivo.ttf, with SIL Open Font License in public/fonts/OFL.txt and font-display: swap. The registered weight range is 100–900 and width range 62%–125%. Hero and closing headings have their own larger role, separate from the reusable display class. On small screens their size becomes clamp(2.8rem, 8vw, 4.5rem). Prose uses a 68ch measure; introductory/deck copy uses narrower measures. Body sizes vary by component rather than following a single invented scale. Most long copy uses line heights 1.65–1.8.

Navigation overrides the condensed-label utility to mixed case, normal tracking and width 100. Condensed uppercase labels remain available outside navigation. Preserve real client quotations and owner-approved MIT degree and call-takeaway wording; these content commitments do not justify inventing employment guarantees.

## Layout

The shared wrap is min(1184px, 100% minus 80px), with centered margins. At 800px and below it becomes 100% minus 40px: 20px gutters. Main content alternates generous full-width image chapters with opaque sections; reading layouts use asymmetric two-column grids that collapse to one column at this breakpoint. Method steps change from three columns to a vertical sequence. The public style-guide swatches change from four columns to two.

Navigation remains fixed, 80px tall; its desktop links appear at the existing Tailwind lg breakpoint (1024px). Some inherited pages and navigation use max-w-6xl and responsive Tailwind gutters rather than the newer wrap. Preserve this actual distinction when extending them. Image chapter copy has local overlays for legibility. The method anchor accounts for navigation height.

**The Reading Surface Rule.** Put dense copy on opaque ocean surfaces and let the ocean carry the opening, method and closing chapters.

All ten original routes remain: /, /about, /services, /services/job-acquisition, /services/gtm-onboarding, /services/ai-workshop, /testimonials, /contact, /privacy and /terms. /style-guide is an additional public route.

## Elevation & Depth

Depth comes primarily from darker and lighter ocean surfaces, hairlines, image overlays and spacing, not floating cards or glow shadows. The method heading has a local text shadow (0 2px 25px #081c32) to read against the image. Navigation is charcoal even though older conditional utility classes still mention transparent backgrounds and blur.

Legacy sunlit blur rules remain in the stylesheet, but the interior-page cascade replaces them with an opaque card background, no backdrop blur and no text shadow. Do not treat those older rules as the default material. Flat panels and offer surfaces are the active pattern.

## Shapes

Buttons and recurring new surfaces use gently rounded 12px corners. The inherited panel uses 16px. Navigation actions and the ocean control use 6px. The original logo is cropped only with CSS: artwork pixels are preserved. Hairline borders separate content and identify fields; avoid turning every prose block into a box.

## Components

**The Native Action Rule.** Use links for destinations and buttons for state changes or submission; keep labels and focus states visible.

Primary actions are green filled links or buttons, with a lighter hover, 46px minimum height and weight 700. The homepage primary variant only changes background on hover; the legacy gold-named variant also rises 1px and returns on press. Ghost actions use a hairline outline, foam text and a secondary-surface hover. Text links underline on hover and move their arrow 3px. Global keyboard focus is a 2px action-colored outline with 2px offset. Disabled buttons use 0.65 opacity and a waiting cursor.

Contact fields are native input, select and textarea elements with labels, required semantics, input-colored backgrounds, hairline borders and a two-pixel action focus ring. Errors attach to fields with aria-invalid/aria-describedby. Submission has pending, accepted and error states. “Talk to Jeff” navigates to /contact#book; “Send request” submits an inquiry. Acceptance does not schedule a call. Current-client Calendly scheduling remains a link.

The fixed navigation uses the original logo, flat links, a contact action and a reserved 44px ocean pause/play control. Mobile uses a native menu button with aria-expanded/aria-controls; Escape closes it and restores button focus. The ocean control uses aria-pressed and an updated accessible label, and is hidden when reduced motion is preferred.

The answer comparison uses two aria-pressed buttons in a labeled group and a polite live region. Testimonials and FAQs use native details/summary. Neither requires a custom dialog or tab library. No chip/tag primitive is established in these inspected surfaces.

OceanCanvas is decorative, fixed behind content and pointer-inert. App owns paused state; a native matchMedia change listener tracks reduced-motion changes. Either mode freezes ambient time while still drawing scroll-position sun changes. The existing calm-only WebGL shader stays calm: the breaking wave chapter is public/maniac-wave.webp, an AI-generated illustrative image. Missing WebGL, initialization failure or context loss switches to the canvas-only static dawn capture; the closing section uses the static day capture. These are public/ocean-dawn.webp and public/ocean-day.webp, not screenshots containing site copy.

Ambient rendering is capped around 30fps and pauses in hidden tabs. Global reduced-motion CSS minimizes animation and transitions and disables smooth scrolling; MotionConfig uses the user preference. The homepage content itself does not wait for reveal animations to become readable.

## Do's and Don'ts

### Do:
- Do preserve the original logo artwork and its teal, green and blue palette.
- Do use sea-glass action color for the main next step and keep sunrise warmth in imagery.
- Do keep native links, labeled form controls, visible focus and motion alternatives.
- Do label the generated wave and example interview answer as illustrative where provenance or meaning is explained.
- Do keep Career Maniacs and GTM Maniacs distinct.

### Don't:
- Don't reintroduce gold primary actions or a decorative serif voice.
- Don't redraw the logo, convert whole-page navigation to scripted buttons, or trap scrolling.
- Don't make dense reading sections transparent over the sun.
- Don't describe an accepted inquiry as a scheduled call or a generated wave as documentary photography.


## Owner copy and logo revisions — September 6, 2026
- Bold headline: “Stop blending in. Start closing.” Carry a direct, differentiated voice through the home, service and contact pages.
- A Maniac prepares relentlessly, stays curious and commits fully. About connects Jeff’s surfing and kitesurfing to reading conditions and committing.
- Shared BrandLogo places the original wave before the original wordmark on one horizontal line using CSS crops.
- Career record: Palantir two new logos worth $7.63M ARR; expert.ai ML & NLU; ADP adds 2× MVP. Remove dates from the Oracle and Salesforce rows.
- Preserve MIT degree, guaranteed call takeaways, original testimonials and all prices and terms.


## 2026-09-10 — Still ocean mockup
Replaced active WebGL background with a coordinated still-first photographic direction: generated editorial sunrise, existing illustrative barrel, generated calm ocean. These are illustrative AI assets, not Jeff’s original sunrise or a verified Teahupoo photograph. Removed playback control while stills are active. Preserved all copy, MIT degree and guaranteed call takeaway. Navy overlay #0b1d2c with opacity variants keeps white text legible. No deployment or additional Higgsfield credit spend.


## 2026-09-25: Award pass (system consolidation)
- **One container.** Every surface, including navigation, footer, program pages and contact, uses `.wrap` (1184px, 40px gutters, 20px under 800px). The `max-w-6xl` Tailwind container is retired.
- **Stylesheet rebuilt** from layered overrides into one ordered system in src/App.css: tokens, type voices, actions, layout, chapters, pages, small screens. Legacy aliases (`.btn-gold`, `.sunlit`, `.glass`, `.gradient-text`) and the unused WebGL OceanCanvas/WaveScene are deleted.
- **Proof ledger** follows the homepage hero: the record set as one sentence (12× President's Club, #1 at 264% of plan, $7.63M in new Palantir logos), the remembered line, and an employer roster in condensed caps. Proof leads; programs follow.
- **Interior page hero** (`PageHero`): copy left, one ocean still right (dawn, calm or wave), masked into the page. Its 1.6s tide-in is the single authored motion moment on interior pages.
- **No eyebrows.** Section kicker labels are removed; headings carry their own weight. Program names sit under the page headline.
- **Callouts** use a 1px action-colored top rule, never a thick side stripe.
- **Gradient headline text** (hero, "The story is.", "The story is the method.", Interview Maniac note) stays by owner request. The animated sweep runs once, under 5 seconds, when it enters view, so no pause control is required.
- **Contact** pairs the form with Jeff's portrait and record; the three call promises precede the form on phones; submit reads "Request my 15 minutes."
- **Performance:** Archivo ships as a 92KB WOFF2 subset (was a 658KB TTF, 235KB transferred); portraits are 480/800px WebP; ocean strips use a 19KB slice; robots.txt and sitemap.xml exist.
- **Tap targets:** footer links, FAQ rows, text links and social links are at least 44px tall.
