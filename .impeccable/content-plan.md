# Career Maniacs overhaul — working content plan

Status: implemented locally. Owner-approved sunrise / wave / calmer water direction. Final review and receipts tracked in QA.md.

## The visitor and the job
Existing PRODUCT.md identifies experienced sales leaders in career transition as the primary audience. Keep that as the working assumption until Jeff answers. The next action is a request for an introductory conversation, not an automatically booked appointment: the current form sends an inquiry and Jeff replies with times. Calendly is for existing clients.

## Homepage draft
Headline: Make your experience count.
Supporting line: Interview coaching for sales leaders ready to tell a stronger story and make their next move.
Primary action: Talk to Jeff. Same label in navigation, hero and closing section, linked to /contact#book.
Secondary action: Explore the method, linked to the actual method section.

The experience is already there. The story needs work.
A hiring panel needs to understand what changed because you were there. We take the deals, decisions and difficult moments in your career and turn them into a clear case for the role you want.

The Maniac Method
Position: Connect your experience to the problem this company needs solved.
Story: Explain the situation, the obstacle and what you did to change the outcome.
Close: Ask better questions, address the concern and agree on the next step.

Show the method with a clearly labeled illustrative before-and-after answer. No invented client, deal size, revenue figure or employment result. Use a real accessible toggle or side-by-side comparison; no fake product screenshot.

Proof: retain exact excerpts from existing testimonials with names and roles. Preserve the full original quotes on /testimonials, using disclosure for long text. Do not rewrite other people’s words to fit Jeff’s voice. Do not invent a success rate.

Meet Jeff: a real photograph and a short first-person explanation of the move from enterprise selling to coaching. Use existing career facts with attribution to the supplied biography. Keep employer history separate from client endorsements.

Coaching: flagship interview coaching first; then onboarding, AI workshop and corporate coaching. Preserve existing commercial terms until Jeff changes them. Link each offer to its full existing route.

Close: Bring the role. Bring the hard question. / Tell me what you are working toward. We will decide whether this is the right fit. / Talk to Jeff.

Interview Maniac: explicitly in development, with an early-access inquiry. Do not imply an already available product.

## Other routes
- About: real portrait, a concise first-person story, career experience, teaching approach. Remove speculative claims about weaker candidates and guaranteed wins.
- Services: distinguish interview coaching, onboarding and AI workshop; make existing prices, cadence and engagement terms easy to compare; concise native FAQ.
- Service details: who it is for, what happens, what the client receives, existing price and cadence. Keep all three route URLs. Remove unsupported claims that every built system autonomously runs while the user sleeps.
- Testimonials: retain all supplied quotes verbatim, including punctuation, behind accessible disclosure where needed. Give a short featured quote room to breathe.
- Contact: distinguish requesting a conversation from scheduling a current-client appointment; remove guaranteed reply-time and outcome copy unless reconfirmed.
- Privacy and terms: preserve legal text; inherit typography and navigation.

## Claims that need care
Jeff explicitly directed on September 6, 2026: “don't remove guaranteed call takeaways and MIT degree”. Both are retained. This is owner-supplied copy, not independent credential verification.
President’s Club counts, quota results, past employers and deal records come from existing owner-supplied website documents, not independent evidence gathered today.
Pricing in current source: coaching $5,000/month; AI workshop $3,000/month standalone, $7,000/month combined with a coaching program; corporate custom. Preserve, do not extrapolate.
Do not claim offer guarantees, typical improved compensation, conversion lifts, or “world class” measured performance.

## Functional work identified
- Calendly button currently has no fallback when its external script is unavailable. Use a real current-client scheduling link as the fallback.
- Contact form currently disables native validation and only checks nonempty email. Restore email-format validation, duplicate-submit protection and truthful server-response handling.
- Test contact success and failure locally with a mocked endpoint; do not send test inquiries to Jeff.
- A testimonials hash link targets an absent id. Preserve or correct the destination.
- Scroll helper forces smooth scrolling even under reduced-motion preferences. Respect the preference and clear pending timers.
- Self-host licensed fonts; preserve routing and npm/Vite/React architecture.
- Check metadata, canonical domain, social image and every route on mobile.

## Reusable system deliverables
DESIGN.md from the finished implementation, shared CSS design tokens, a visual style-guide page with real components, voice examples and content rules, and an asset/typography provenance list. Document the actual finished system, not an imaginary future framework.

## Source and tooling notes
Inspected live https://www.careermaniacs.com/ and local source. The connected GitNexus service knows only streetnotes-playbook. Local gitnexus command is unavailable and the saved index is stale (2026-07-20, old path). Before any function changes, use an explicit source import/caller trace and report the shared-route effects; do not claim a successful graph analysis.
