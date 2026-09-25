# Decision log

## September 6, 2026 · Career Maniacs overhaul

- Approved: calm animated sunrise → actual wave during the Maniac Method → calmer water and higher sun. Existing logo and teal/green/blue palette govern. Previous sketch board is superseded.
- Owner correction: retain guaranteed call takeaways and MIT degree claim. These remain owner-supplied claims; no independent credential verification is represented.
- Reuse the calm-only WebGL renderer. Keep CALMONLY=1. The middle wave uses the existing generated asset, optimized to WebP. Static dawn/day renders serve missing-WebGL clients.
- Use existing npm/React/Router/Motion/Lucide stack. Self-host Archivo under its SIL OFL. No production dependency added.
- Contact action is a request, not an appointment. Form success requires provider acceptance; current-client booking is a normal Calendly link.
- Legal pages remain unchanged. Existing privacy copy names Netlify forms and denies third-party analytics, while application source uses FormSubmit and Apollo. This discrepancy needs owner/legal review before publication; no policy promises invented here.
- Local review only. No commit, push, deployment, auth change or sibling-repo modification authorized or performed.


## Owner copy and logo revisions — September 6, 2026
- Bold headline: “Stop blending in. Start closing.” Carry a direct, differentiated voice through the home, service and contact pages.
- A Maniac prepares relentlessly, stays curious and commits fully. About connects Jeff’s surfing and kitesurfing to reading conditions and committing.
- Shared BrandLogo places the original wave before the original wordmark on one horizontal line using CSS crops.
- Career record: Palantir two new logos worth $7.63M ARR; expert.ai ML & NLU; ADP adds 2× MVP. Remove dates from the Oracle and Salesforce rows.
- Preserve MIT degree, guaranteed call takeaways, original testimonials and all prices and terms.


About copy refinement: strengthened “Why Maniacs?” around Jeff’s surfing, kitesurfing and pushing his limits. Defined Maniac through curiosity, preparation and commitment, then connected that attitude to interview practice. MIT degree and call takeaways preserved.


Latest About corrections: Palantir now reads “Two new logos worth $7.63M”; [24]7.ai adds “securing MVP” after quota. Oracle date remains removed, ADP retains 2× MVP, and Why Maniacs retains surfing/kitesurfing and commitment copy.


September 7, 2026: Replaced generated wave with owner-approved Teahupoʻo photograph by Olivier Dugornay / IFREMER, CC BY 4.0. Source: https://image.ifremer.fr/data/00783/89468 (49350.jpg). Optimized public/teahupoo-wave.webp; original in output/source-assets. Shared CSS updates Home/About, style guide updated, visible linked attribution in Footer. No production deployment.


Owner rejected IFREMER photo: person present and wave appearance unsuitable. Removed from site; restored previous wave temporarily. Next candidate must be people-free and visually reviewed before replacement. Higgsfield sunrise has not yet been integrated.


## 2026-09-10 — Still ocean mockup
Replaced active WebGL background with a coordinated still-first photographic direction: generated editorial sunrise, existing illustrative barrel, generated calm ocean. These are illustrative AI assets, not Jeff’s original sunrise or a verified Teahupoo photograph. Removed playback control while stills are active. Preserved all copy, MIT degree and guaranteed call takeaway. Navy overlay #0b1d2c with opacity variants keeps white text legible. No deployment or additional Higgsfield credit spend.

2026-09-10 image correction: replaced the two editorial ocean assets with calm water, centered red horizon sunrise and a distinctly brighter later-morning sun. Centered both mobile background crops. Wave and copy unchanged.

2026-09-10 hero typography: smaller, slightly condensed headline and left-column copy on desktop. Mobile headline above horizon, supporting copy below with clear sun viewing space. Retained CTA and guaranteed takeaway. Build passed; wide and narrow browser render inspected.

2026-09-10 release: use US spelling resume throughout site copy; footer surface matches original logo artwork to remove visible container. User authorized commit and production publication.

Use ocean visibility in gaps and edges, broad connected surfaces, and a stationary backdrop. Keep text surfaces dark, preserve quoted words and MIT credential, and provide opaque reduced-transparency fallback.

Revision: removed continuous ocean backdrop and glass panels. Homepage testimonial now uses a solid deep teal surface, mint quote and matching top/bottom rules, with blue link accents. Small portrait retained. Local preview only.

Clarified testimonial treatment: original dark background with brand-colored type; matching 12px ocean-image bands at the top and bottom only. No fixed backdrop or glass effect.

Brand positioning: AI GTM coaching and interview coaching are both entry points. AI GTM uses the existing Maniac AI Workshop offer and pricing, not a new invented program. The Maniac Method has five sales modules, with ABT as its storytelling structure. Header and hero retained. Ocean remains in narrow static border bands, not a page backdrop.

Final motion direction: restrained scroll-linked movement of existing wave artwork, stationary text, no autoplay/video download. No new Higgsfield spend.

September 11 revision: Jeff found still-image drift too subtle and approved Higgsfield generation for 45 credits. Use actual five-second wave motion on desktop section entry, then hold the last frame; provide pause/replay. No looping or scroll hijacking. Mobile and reduced-motion retain the original still. Existing orange gradients are intentional user-requested brand treatment, so gradient-text hook findings are false positives for this change.

September 11 playback correction: replaced one-shot wave playback with native looping while visible. Pauses offscreen, resumes on return, preserves manual pause and static mobile/reduced-motion behavior. Browser check verified an actual loop wrap and offscreen pause/resume; production build passed. Local only. No additional generation or credits.

September 11: Jeff corrected the Maniac Method sequence to Research, Outbound, Discovery, Objection Handling, Close. Updated homepage module order and matching services/style-guide copy. Local preview; not yet published.

September 11: Reframed the homepage Maniac Method around Jeff’s differentiator: creative, memorable interactions, handwritten thank-you letters after every meeting, personal video follow-ups, giving without keeping score, and curiosity about genuine fit now/later/never. Lead: “Be the one they remember.” Added the competitive self-check and practical examples. Five Research-first modules remain in a native expandable disclosure below the philosophy. Preserved both signature quotes, user-requested orange gradients, and wave playback. Existing gradient-text hook findings are intentional user-approved styling. Scoped lint and build passed; desktop/mobile layouts, disclosure and module order verified. Local only, pending review/publication.

September 11 storytelling hierarchy correction: Jeff clarified storytelling is the core of the Maniac Method; other elements are adjuncts. Homepage now leads with “The story is the method,” followed by a dedicated full-width And/But/Therefore framework, coaching/practice explanation and the existing interactive example. Creative differentiation, memorable follow-up, giving, curiosity and five process modules follow as supporting practices. Both signature quotes and wave behavior retained. Existing user-requested orange gradients are intentional, not design defects. Build, scoped lint, interactive example and 390/768/1440px layout checks passed. Local preview only.

September 11: Extended the existing wave cycle from 5 seconds to approximately 18 seconds (17.708s) with slower motion, interpolated frames and a blended return transition. No new Higgsfield generation or credits. public/maniac-wave-motion.mp4 is 2,497,662 bytes. Longer-cycle browser check, pause/resume, mobile and reduced-motion checks passed; build passed. Local only.

Text animation: Jeff explicitly requested animated gradient accents. Limit to three short homepage passages; keep body copy static. Use bright mint/ocean blue/peach for readability. Gradient-text findings are intentional for these requested placements. Reuse installed framer-motion; no duplicate motion package.

September 11: Reused the existing 12px ocean-rule border below the homepage storytelling example, below the About introduction (with 48px bottom spacing), and below the featured Client Stories quote. Services, service details and Contact already have this treatment; legal pages remain plain. No new imagery or CSS. Browser checks verified all three borders on desktop/mobile with no overflow; production build passed. Local only.

September 11 responsive review: live Chromium scan found no page overflow on ten routes at six widths. Reproduced oversized fixed 56px mobile Method heading and desktop wave position overriding the mobile treatment in WebKit. Updated mobile heading to fluid 40–56px, supporting copy to 18px, explicit left alignment, and restored top-positioned wave/mobile overlay. Existing user-requested gradient text is intentional and retained. Added reusable responsive browser check: ten routes at seven widths (320–1440) in Chromium and WebKit, including Method alignment; all passed. Build passed. Browser emulation only, no physical iPhone test. Local fixes not yet published.

## 2026-09-11: Supplied final copy, local review
- New document controls copy, prices and supplied results, including restored career dates and 264% figure.
- Keep existing responsive fix, ocean assets, motion, MIT credential and call takeaways.
- Place mottos on About only, following the document's final About instruction.
- Prepare shortened testimonials locally with full originals accessible. Client approval is required before these edited quotes go live.
- Do not reuse current-client Calendly for prospect calls. Form remains functional while prospect URL is pending.

## Publication receipt, 2026-09-11
Jeff approved the pending update and shortened testimonials. Published to https://www.careermaniacs.com with Vercel deployment dpl_38BUAJPqKRH3VH6HncdKjTfNCCGj (READY). Prospect scheduling continues through the form pending a separate Calendly URL.
