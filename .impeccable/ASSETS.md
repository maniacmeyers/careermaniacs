# Asset provenance

- `public/career-maniacs-logo.png`: original owner-provided artwork, unchanged. Navigation crops surrounding padding with CSS.
- `public/coach-photo.jpg`: original owner-provided photograph, unchanged.
- `public/maniac-wave.webp`: optimized from `.impeccable/assets/maniac-wave.png`, generated in the preceding task. AI-generated illustrative brand image; not presented as a photographed place or client outcome. 1536×1024, 195,456 bytes.
- `public/ocean-dawn.webp`, `public/ocean-day.webp`: static captures of this repository’s calm WebGL renderer for missing-WebGL fallback. Original captures in `output/playwright/`.
- `public/fonts/Archivo.ttf`: variable Archivo from https://github.com/google/fonts/tree/main/ofl/archivo. License copied to `public/fonts/OFL.txt`; SIL Open Font License. No Google Fonts request at runtime.


September 7, 2026: Replaced generated wave with owner-approved Teahupoʻo photograph by Olivier Dugornay / IFREMER, CC BY 4.0. Source: https://image.ifremer.fr/data/00783/89468 (49350.jpg). Optimized public/teahupoo-wave.webp; original in output/source-assets. Shared CSS updates Home/About, style guide updated, visible linked attribution in Footer. No production deployment.

September 11: public/maniac-wave-motion.mp4 generated from existing maniac-wave.webp through Higgsfield Seedance 2.5, job 749adddf-d2be-4d2f-8d5c-e243424304bc, approved estimate 45 credits. Five seconds, 1920x1080, silent H.264; optimized to 1.11 MB. Original retained at output/maniac-wave-higgsfield-original.mp4. This is illustrative AI-generated wave imagery, not a photograph of Teahupoo.

September 11: Extended the existing wave cycle from 5 seconds to approximately 18 seconds (17.708s) with slower motion, interpolated frames and a blended return transition. No new Higgsfield generation or credits. public/maniac-wave-motion.mp4 is 2,497,662 bytes. Longer-cycle browser check, pause/resume, mobile and reduced-motion checks passed; build passed. Local only.

## hero-swell.mp4 / hero-swell-960.mp4 (2026-09-26)
Higgsfield Seedance 2.5, omni_reference from ocean-editorial-dawn (as JPG upload 53a74a3e-9380-41a3-babc-b07bf3c07c8a), 10s 1080p, no audio, 120 credits, Jeff-approved. Source render hf_20260926_233745_10cf9b36. Trimmed to 0-8.0s (last 2s crest became ember-like). H.264, 6-frame GOP for scroll scrubbing: 1920px 3.6MB, 960px 0.9MB. Illustrative AI footage, not documentary.

## 2026-09-26 loop revision
Jeff: the hold-and-scrub version read as the animation stopping. Replaced with a 12s ping-pong loop of 0-6s (rise, cover the sun, settle), 1080p 3.5MB / 960px 0.66MB, playing whenever the hero is visible; frame still pinned during scroll. No new credits.

## maniac-wave-motion.mp4 / -960 / maniac-wave.webp (2026-09-26 replacement)
Replaces the Sept 11 daytime emerald wave (17.7s stretch with ~44% duplicate frames, read as choppy). Higgsfield Seedance 2.5 omni_reference from hero-swell frame 6.2s (upload 62e7a750), 10s 1080p, 120 credits; take 1 (start frame 7.6s) rejected for fire-like spray, also 120 credits. Used 3.6-10.0s, 1s crossfade loop = 5.46s at native 24fps. 1080p 1.87MB, 960px 0.26MB. Still = loop frame 0.6s, 27KB webp. Same sunrise, camera and palette as the hero swell.
