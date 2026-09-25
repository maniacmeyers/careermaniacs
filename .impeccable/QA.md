# Local validation · September 6, 2026

Website repo only, `codex/career-maniacs-brand-overhaul`. No commit, push or deployment.

## Passed

- `rtk npm run build`: production build succeeds. Existing Node deprecation warning remains.
- Production bundle preview at port 4173: home and style guide loaded with zero page exceptions.
- ESLint on changed app/pages/shared components: zero errors or warnings.
- Browser checks: all ten public routes plus `/style-guide` at 1440×1000 and 390×844. One H1 each, visible content, no horizontal overflow, no broken loaded images, zero page exceptions.
- Menu opens/closes and Escape returns focus to toggle. Homepage answer comparison, FAQ and testimonial disclosures work.
- Original featured quote, all five full testimonials and their attributions match HEAD verbatim.
- Contact: malformed email blocked before request; HTTP 200 with `success:false` shows an error and retains draft; HTTP 200 with `success:true` shows acceptance and explicitly says the call is not scheduled. Tests use intercepted requests only.
- Network failure preserves the draft; two immediate submit events produce only one mocked provider request. The 404 route renders correctly.
- Ocean: frame loop advances normally, pauses and resumes, reacts to changed reduced-motion preference, and stays static under that preference. Scroll raises the sun parameter from 0.05 to 0.932. Calm-only shader retained.
- Missing WebGL: readable site, same dawn and day scenes using static captures; wave chapter remains available.
- Impeccable detector run once on changed UI: `[]`.

## Known boundaries

- Repository-wide `npm run lint` fails on pre-existing vendored `.claude` skill scripts, old nested worktrees and `vite.config.js` (`__dirname` undefined). These are outside the design change; changed app source passes.
- GitNexus impact attempted for every modified function/component before edits; repo unavailable (only streetnotes-playbook registered). Source callers traced instead; no graph risk result claimed.
- Apollo tracking was intercepted during browser testing. Real FormSubmit delivery, mailbox receipt and Calendly appointment creation were not tested or performed.
- Privacy/terms preserved. Privacy page’s Netlify/no-third-party-analytics wording disagrees with FormSubmit/Apollo source; owner/legal review remains before publishing.
- MIT degree and guaranteed call takeaways retained per Jeff’s explicit direction. No independent credential verification claimed.
- Device checks use Chromium desktop/mobile viewport emulation, not physical iOS/Android or Safari.

## Reproduce

Start Vite with `rtk npm run dev -- --host 127.0.0.1 --port 5173`.
Use the installed Playwright CLI wrapper to open a session, then run the checks below. No production or test dependencies were added.

```sh
rtk /Users/guapo/.codex/skills/playwright/scripts/playwright_cli.sh -s=career-overhaul open about:blank
rtk /Users/guapo/.codex/skills/playwright/scripts/playwright_cli.sh -s=career-overhaul run-code --filename output/playwright/check-site.js --raw
rtk /Users/guapo/.codex/skills/playwright/scripts/playwright_cli.sh -s=career-overhaul run-code --filename output/playwright/check-motion.js --raw
rtk /Users/guapo/.codex/skills/playwright/scripts/playwright_cli.sh -s=career-overhaul run-code --filename output/playwright/check-form-edges.js --raw
```

Screenshots: `output/playwright/`. The motion control lives in reserved navigation space and is hidden under reduced motion. Fallback assets are direct ocean-canvas exports without page content.

Live preview: http://127.0.0.1:5173/. Visual system: http://127.0.0.1:5173/style-guide.

Independent reviewer final disposition: PASS for local finish review, all material findings resolved. See `.impeccable/REVIEW.md`.


### Browser comment revision checks
Build and changed-source ESLint pass. check-site.js: 11 routes at 1440 and 390px, no runtime errors/overflow; navigation, answer switch, FAQs and mocked contact form pass. Visual receipts: output/playwright/revision-about.png, revision-home-mobile.png, revision-footer-mobile.png.
