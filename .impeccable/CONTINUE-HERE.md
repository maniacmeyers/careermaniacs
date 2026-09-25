# Current implementation status · September 6, 2026

The overhaul below is now implemented locally on the same branch. Start with `.impeccable/QA.md`, `.impeccable/REVIEW.md`, `.impeccable/DECISIONS.md` and current source, rather than the older findings below. `/style-guide` is implemented. Jeff explicitly corrected the copy direction: keep MIT degree and guaranteed call takeaways. They are retained. No commit/push/deployment performed.

---

# Career Maniacs website — continuation handoff

## Current task
Complete the content and design overhaul of careermaniacs.com and establish a reusable Maniacs style guide for future microsites and assets. Jeff wants implementation and testing, not another planning exercise. Publish only with separate approval. No commit, push, production dependency addition, deployment or architecture change is authorized.

## Exact location
Saved Codex project: Career Maniacs, id 76df4959-cf5a-4111-890f-a8997f109598.
Project root: /Users/guapo/AI-Workspace/GatewayToAthena/Career Maniacs
Website repo: /Users/guapo/AI-Workspace/GatewayToAthena/Career Maniacs/careermaniacswebsite
Branch already created: codex/career-maniacs-brand-overhaul, from main a094ccb90677b05949893d72bd55fb3b7edbaf0e.
Do not work in the obsolete InterviewManiac cwd. Do not touch sibling mymaniacmethod.

## Approved design — user decisions supersede the initial sketches
Jeff rejected the initial sketch as too basic and pointed out the missing logo and brand colors. Preserve his actual public/career-maniacs-logo.png and its teal, green and blue palette. Add supporting colors only; gold is not approved as a primary CTA brand color.
He described and approved a single connected ocean narrative:
1. Opening: calm, beautiful animated morning sunrise and ocean. Preparation and possibility.
2. Middle: the actual wave is the experience, where we execute the Maniac Method. The content and imagery build together.
3. End: calm water again with the sun higher above the horizon, representing that the wave passed successfully. Express confidence and progress without guaranteeing employment outcomes.
Assistant confirmed this direction and Jeff said “Okay that sounds good.” Treat the direction as settled; do not reopen the random direction board or ask him to approve the old sketch. He then asked to continue this work inside the Career Maniacs project.

## Skills
User explicitly requires Impeccable, Taste skills, and exact /Users/guapo/.claude/skills/jeff-voice-profile/SKILL.md going forward. Voice pointer already added to AGENTS.md.
Impeccable /Users/guapo/.agents/skills/impeccable/SKILL.md and references/new-work actually reference path reference/new-work.md, reference/craft-floor.md, reference/visualize.md. Initial concept seed 282f99e5 is superseded by the user-pinned ocean direction. Context detector ran in prior session. New session can run it once. No Impeccable update authorized; one update question already asked, no answer.
Taste /Users/guapo/.agents/skills/design-taste-frontend/SKILL.md and /Users/guapo/.agents/skills/gpt-taste/SKILL.md. Use judgment where generic defaults conflict with Jeff’s explicit brand/story. Existing Motion avoids adding GSAP. No generic placeholders in final.
Impeccable requires independent finish reviewer and documenter; skill invocation authorizes these bounded roles. If named roles unavailable use available agent with concrete packet and appropriate instructions. Do not use another user-facing Codex task for subagents.

## Work completed
Read current routes, relevant instructions, PRODUCT.md/DESIGN.md and live https://www.careermaniacs.com/ in browser. Full content/function audit in .impeccable/content-plan.md.
Created .impeccable/direction-options.json + rough sketches. They are not approved implementation comps and should not be used as the visual specification.
Generated a more photographic wave image matching the latest approved story: .impeccable/assets/maniac-wave.png. Original at /Users/guapo/.codex/generated_images/01a06e8a-0244-7180-b8c2-f1edcb6702bf/exec-5de215a3-0378-4f2e-9b58-fc034470b442.png. AI-generated illustrative brand imagery, not evidence of an actual photographed location or event. Production use can optimize it to WebP, retain provenance.
Only AGENTS.md, PROJECT_SUMMARY.md and .impeccable/ altered for this work. No application source edited, no app tests yet, no deployment. All initial user changes preserved.

## Existing uncommitted work — preserve
Before this task six .claude/skills/gitnexus/*/SKILL.md files and AGENTS.md were already modified. Our AGENTS addition is only the final “Maniacs brand and voice” section. PROJECT_SUMMARY received a dated status entry; old contents are stale historical text. Do not revert any user changes.

## App and functional findings
React 19, Vite, JSX, React Router 7, Tailwind v4; use npm with existing package-lock, no new deps. App.css is shared theme. App.jsx wraps all routes with MotionConfig reducedMotion=user, navigation, OceanCanvas, footer. Routes /, /about, /services, /services/job-acquisition, /services/gtm-onboarding, /services/ai-workshop, /testimonials, /contact, /privacy, /terms; preserve URLs and legal content.
Contact form uses FormSubmit ajax, not Netlify, and request leads to Jeff replying with times. Do not claim clicking schedules an appointment. Calendly URL is current-client only; button silently fails if script unavailable, needs real link fallback. Locally mock form success/failure; never send real test inquiries. Email currently only nonempty validation; validate format, response success and duplicate submission.
The existing privacy page incorrectly says Netlify forms and no third-party analytics while index.html includes Apollo tracking. Record or fix factual provider discrepancies carefully; do not invent legal promises. No existing credential/claim verification supplied for “MIT degree”; omit degree claim unless owner confirms exact credential. Reuse original testimonial quotes verbatim and original names/roles; no invented stats. Existing owner-supplied prices and terms in service files.
Hash scroll helper forces smooth movement and does not clear timers; respect reduced motion. One service link points to missing testimonials-section id.
Fonts are loaded from Google link in index.html; self-host with licensed source/provenance. Logo is a 1000x1000 image with existing dark charcoal background and large padding; preserve artwork. CSS cropping/display can make it legible without redrawing the mark.

## Ocean technical caution
src/components/OceanCanvas.jsx is 1269 lines, existing WebGL HDR sunrise, sun elevation driven by scroll via riseFromScroll(). It already does animated water, visibility pause, 30fps cap, context-loss fallback. It caches GL on canvas for StrictMode.
It contains a full wave shader but compile-time CALMONLY=1 deliberately strips it. Comments document full shader running seconds-per-frame due Metal/ANGLE allocation even with branches off. DO NOT blindly set CALMONLY=0. Prefer keeping proven calm shader and introducing generated photographic wave as a middle-story section or performant composited scene, then returning to higher-sun calm water. Ensure reduced-motion still tells same story and includes accessible pause for ambient movement.

## GitNexus limitation
Connected MCP only knows streetnotes-playbook. query and impact for careermaniacs and full path returned repo not found. Saved .gitnexus/meta.json is July 20 index at old path, not current truth. command -v gitnexus failed. Runner .gitnexus/run.cjs DOES exist; latest command “rtk node .gitnexus/run.cjs impact --help” ran in shell session 93055; check its result in originating task or run bounded help if completed.
MUST attempt applicable impact tool per AGENTS before edits. If unavailable, transparently report limitation and verify callers with source search. Already traced: App calls all page components, Navigation/Footer/OceanCanvas; ScrollToHashWrapper calls useScrollToHash; CalendlyButton used by About, Services, Testimonials, Contact. Shared changes affect every route; test every route. No automatic HIGH/LOW graph risk obtained; do not claim safe graph result.

## What to do next
Finish tangible implementation of all public pages, real branding, actual imagery and the complete approved sunrise-wave-sunrise journey. Reuse stack and code, do not create an orchestration/design framework. Build a real reusable style-guide page/artifact from actual tokens, type, components, voice rules and compositions. Record final system in DESIGN.md and small Decision Log/project index.
Run build and lint, functional navigation/form tests, desktop/mobile visual checks, reduced motion and missing-WebGL fallback. Perform Impeccable detector once at finish; independent review with saved screenshots; fix material findings. Show the completed local preview before asking any final deployment approval. Never call sketches a finished overhaul.

## Transfer receipt
Continuation created in Career Maniacs: task 01a0794c-bc6a-7610-a54a-94954bc32092, title Career Maniacs website and brand overhaul. The originating task stops application work to avoid concurrent edits. GitNexus runner impact --help completed successfully (CLI cached through pnpm dlx; no package.json change).
