import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const rise = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const companies = ['Palantir', 'Salesforce', 'Oracle', 'ADP', 'expert.ai', '[24]7.ai']

const stats = [
  { value: '12×', label: "President's Club" },
  { value: '4×', label: 'AE of the Year' },
  { value: '2×', label: 'Rookie of the Year' },
  { value: 'MIT', label: 'Degree in AI & business strategy' },
]

const methodSteps = [
  {
    n: '1',
    title: 'Position',
    body: "You're the product now. We build the throughline of your career, the proof that backs it, and the fit map for the exact role you want — the way you'd build the business case for a seven-figure deal.",
  },
  {
    n: '2',
    title: 'Story',
    body: 'Your wins become stories with a turn — And, But, Therefore. Not STAR recitations. The kind a hiring panel repeats to the decision-maker who wasn’t in the room.',
  },
  {
    n: '3',
    title: 'Close',
    body: 'Deal-run the interview: discovery on their pain, objection handling on your gaps, an actual ask at the end. You rehearse under pressure until pressure stops mattering.',
  },
]

// Outcome-first. Tags are drawn from each person's own words — nothing invented.
const results = [
  {
    tag: 'Landed the role',
    quote:
      'Jeff helped me up my storytelling game, start crushing it in interviews, and land an awesome role.',
    name: 'John Macpherson',
    title: 'Data & Analytics Leader',
  },
  {
    tag: 'Redefined how I saw my career',
    quote:
      'A transformative journey that redefined how I view my career, my capabilities, and my potential. Jeff doesn’t just polish resumes — he reshapes how you see yourself.',
    name: 'Justin P. H.',
    title: 'Director of Strategic Sales, Neuron7.ai',
  },
  {
    tag: 'A master class in positioning',
    quote:
      'An extraordinary master class in goal setting … a new perspective on how to position myself in the job market.',
    name: 'Charles N.',
    title: 'Account Executive, TitanX',
  },
]

const CtaPromise = () => (
  <p className="mt-4 text-sm text-muted-foreground max-w-md">
    In 15 minutes you’ll leave with one fix you can use in your next
    interview — whether or not we ever work together.
  </p>
)

const HomePage = () => {
  return (
    <div className="overflow-x-clip">
      {/* ============ HERO — pain-led, pre-dawn water (transparent over the ocean) ============ */}
      <section className="relative min-h-[92vh] flex items-center">
        {/* left-side scrim for text legibility over the animated water */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, oklch(0.10 0.016 250 / 0.85), oklch(0.10 0.016 250 / 0.35) 55%, transparent 78%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="display">
              You&apos;ve closed millions. So why do the offers keep going to
              people you&apos;d outperform?
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/95 prose-body">
              You&apos;ve run discovery, built champions, and closed deals other
              people got promoted for. But there&apos;s one product you&apos;ve
              never had to pitch: you. That&apos;s not an experience problem.
              It&apos;s a positioning problem &mdash; and it&apos;s fixable.
            </p>
            <div className="mt-9">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact#book" className="btn-gold">
                  Book a 15-minute call
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link to="/testimonials" className="btn-ghost">
                  See client results
                </Link>
              </div>
              <CtaPromise />
            </div>
          </Motion.div>

          <Motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="label-condensed text-muted-foreground order-2">{s.label}</dt>
                <dd
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ fontVariationSettings: '"wdth" 115' }}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </Motion.dl>

          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="mt-6 text-sm sm:text-base text-muted-foreground max-w-xl"
          >
            And I build AI every day &mdash; apps, agents, and automations. The
            research systems I teach are the ones I use, not slideware.
          </Motion.p>
        </div>
      </section>

      {/* ============ PROOF STRIP ============ */}
      <section aria-label="Companies where Jeff carried the bag" className="relative bg-background border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-3">
            <p className="text-sm text-muted-foreground shrink-0">
              Two decades carrying the bag at
            </p>
            <ul className="flex flex-wrap gap-x-10 gap-y-3">
              {companies.map((c) => (
                <li
                  key={c}
                  className="text-lg font-semibold tracking-wide text-foreground/80"
                  style={{ fontVariationSettings: '"wdth" 80' }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Including the largest cloud deal in Oracle history by license count.
          </p>
        </div>
      </section>

      {/* ============ PAIN AMPLIFICATION ============ */}
      <section className="relative bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="max-w-2xl space-y-6">
            <Motion.h2 {...rise} className="headline">
              You already know the email by heart.
            </Motion.h2>
            <Motion.p {...rise} className="text-lg text-muted-foreground leading-relaxed">
              &ldquo;We&apos;ve decided to move in another direction.&rdquo; No
              reason. No feedback. A door closed politely.
            </Motion.p>
            <Motion.p {...rise} className="text-lg text-muted-foreground leading-relaxed">
              You lost to someone with half your numbers and twice the polish.
              They didn&apos;t do more than you. They told it better.
            </Motion.p>
            <Motion.p {...rise} className="text-lg text-muted-foreground leading-relaxed">
              And you replay it at 3am &mdash; the answer that started strong and
              wandered, the win you buried the lead on, the close you never asked
              for.
            </Motion.p>
            <Motion.p {...rise} className="text-lg text-foreground leading-relaxed font-semibold">
              None of it was about your track record. It was about how the room
              heard it.
            </Motion.p>
          </div>
        </div>
      </section>

      {/* ============ THE REFRAME (ABT — the method demonstrating itself) ============ */}
      <section className="relative bg-[var(--bg-deep)] border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="max-w-3xl space-y-12">
          <Motion.p {...rise} className="story-voice">
            <span className="label-condensed not-italic text-[var(--teal)] block mb-3">And</span>
            You know how to run a deal. Discovery. Champion. Business case. The
            close. It&apos;s muscle memory &mdash; you&apos;ve done it a thousand
            times.
          </Motion.p>
          <Motion.p {...rise} className="story-voice">
            <span className="label-condensed not-italic text-[var(--gold)] block mb-3">But</span>
            The moment the product is <em>you</em>, the process disappears. You
            walk into the highest-stakes sales call of your career &mdash; and
            wing it like everyone else in the pipeline.
          </Motion.p>
          <Motion.p {...rise} className="story-voice">
            <span className="label-condensed not-italic text-[var(--primary)] block mb-3">Therefore</span>
            The Maniac Method puts the process back. Position yourself like a
            product. Build your wins into stories that stick. Close like a rep at
            264% of plan &mdash; because that&apos;s who&apos;s coaching you.
          </Motion.p>
          </div>
        </div>
      </section>

      {/* ============ THE MANIAC METHOD, NAMED ============ */}
      <section className="relative bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <Motion.div {...rise} className="max-w-2xl">
            <p className="label-condensed text-[var(--gold)]">The Maniac Method</p>
            <h2 className="headline mt-4">Position. Story. Close.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              This isn&apos;t interview coaching. It&apos;s a system for becoming
              the candidate a hiring manager remembers after the room clears
              &mdash; the same three moves you&apos;d run on a seven-figure deal,
              aimed at the one deal that pays you.
            </p>
          </Motion.div>

          <div className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-12">
            {methodSteps.map((step) => (
              <Motion.div key={step.n} {...rise}>
                <p
                  className="text-5xl font-bold text-[var(--primary)]"
                  style={{ fontVariationSettings: '"wdth" 70' }}
                  aria-hidden="true"
                >
                  {step.n}
                </p>
                <h3 className="headline-sm mt-4">{step.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{step.body}</p>
              </Motion.div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Motion.div {...rise} className="panel p-8">
              <h3 className="headline-sm">STAR reports. ABT lands.</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Situation, Task, Action, Result is a status update &mdash; the
                panel has sat through forty of them today and remembers none. And
                / But / Therefore is a story with tension and a turn. One gets
                nods. The other gets repeated to the person who makes the call.
              </p>
            </Motion.div>
            <Motion.div {...rise} className="panel p-8">
              <h3 className="headline-sm">Why the usual coaching fails</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Resume polish, STAR drills, and pep talks all do the same thing:
                make you more prepared. But hiring managers don&apos;t hire the
                most prepared candidate. They hire the one they remember.
                Preparation gets you in the room. Being unforgettable gets you the
                offer.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="relative bg-[var(--bg-deep)] border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Motion.h2 {...rise} className="headline max-w-2xl">
            What changes when the room finally hears you.
          </Motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {results.map((r) => (
              <Motion.figure key={r.name} {...rise} className="flex flex-col">
                <p className="label-condensed text-[var(--gold)] mb-4">{r.tag}</p>
                <blockquote className="story-voice !text-lg flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.title}</p>
                </figcaption>
              </Motion.figure>
            ))}
          </div>
          <Motion.div {...rise} className="mt-12">
            <Link to="/testimonials" className="inline-flex items-center gap-1.5 py-2 -my-2 text-[var(--primary)] font-semibold hover:underline underline-offset-4">
              All client results <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* ============ THE OFFER — flagship first ============ */}
      <section className="relative bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <Motion.h2 {...rise} className="headline max-w-2xl">
          Where the work happens.
        </Motion.h2>

        {/* Flagship */}
        <Motion.div {...rise} className="mt-14 panel p-8 sm:p-12 md:grid md:grid-cols-[1.4fr_1fr] md:gap-12">
          <div>
            <p className="label-condensed text-[var(--gold)]">The flagship</p>
            <h3 className="headline-sm mt-3">Interview &amp; Job Acquisition Coaching</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed prose-body">
              For GTM executives in an active search. Twice-weekly 1:1 coaching
              with Jeff, daily accountability, the full positioning build, ABT
              story development, and deal-run interview practice &mdash; from
              first screen to offer negotiation. From ignored to undeniable.
            </p>
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact#book" className="btn-gold">
                  Book a 15-minute call
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link to="/services/job-acquisition" className="btn-ghost">
                  See the full program
                </Link>
              </div>
              <CtaPromise />
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:border-l md:border-border md:pl-12 flex flex-col justify-center">
            <p className="text-4xl font-bold" style={{ fontVariationSettings: '"wdth" 115' }}>
              $5,000<span className="text-xl text-muted-foreground font-semibold">/month</span>
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li>2× weekly 1:1 sessions — direct access to Jeff</li>
              <li>Daily accountability, not monthly check-ins</li>
              <li>Positioning report, story vault, interview reps</li>
              <li>Typical engagement: 2–4 months</li>
            </ul>
          </div>
        </Motion.div>

        {/* Price-objection cushion — arithmetic the reader runs on themselves */}
        <Motion.div {...rise} className="mt-8 max-w-3xl">
          <p className="prose-body text-lg text-muted-foreground leading-relaxed">
            Run the math on your own number. If you earn $250K, every extra month
            without an offer is north of $20K you&apos;ll never bill for &mdash;
            and a lowball offer you take out of fatigue follows you for years. One
            month of coaching costs less than a single week of standing still.
          </p>
        </Motion.div>

        {/* Supporting offers */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Motion.div {...rise} className="panel p-8 flex flex-col">
            <h3 className="headline-sm">GTM Onboarding</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed flex-1">
              You landed it. Now own it. Ninety-day ramp coaching for the new
              role — territory plan, first wins, President&apos;s Club trajectory.
            </p>
            <p className="mt-6 font-bold text-lg">$5,000<span className="text-sm text-muted-foreground font-semibold">/month</span></p>
            <Link to="/services/gtm-onboarding" className="mt-4 inline-flex items-center gap-1.5 py-2 -mb-2 text-[var(--primary)] font-semibold text-sm hover:underline underline-offset-4">
              The 90-day plan <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Motion.div>

          <Motion.div {...rise} className="panel p-8 flex flex-col">
            <h3 className="headline-sm">Maniac AI Workshop</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed flex-1">
              AI skills for sellers who ship — workflows, prospecting systems, and
              deal support built with you, not slideware. Jeff has sold AI since
              Salesforce Einstein in 2017.
            </p>
            <p className="mt-6 font-bold text-lg">$3,000<span className="text-sm text-muted-foreground font-semibold">/mo · $7,000 bundled</span></p>
            <Link to="/services/ai-workshop" className="mt-4 inline-flex items-center gap-1.5 py-2 -mb-2 text-[var(--primary)] font-semibold text-sm hover:underline underline-offset-4">
              What you&apos;ll build <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Motion.div>

          <Motion.div {...rise} className="panel p-8 flex flex-col">
            <h3 className="headline-sm">Corporate GTM &amp; AI</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed flex-1">
              For teams: GTM enablement and AI adoption coaching from someone who
              carried a bag at Palantir and Salesforce — storytelling,
              prospecting, and AI workflows for your whole floor.
            </p>
            <p className="mt-6 font-bold text-lg">Custom</p>
            <Link to="/contact#book" className="mt-4 inline-flex items-center gap-1.5 py-2 -mb-2 text-[var(--primary)] font-semibold text-sm hover:underline underline-offset-4">
              Talk to Jeff <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Motion.div>
        </div>
        </div>
      </section>

      {/* ============ RISK REVERSAL / OBJECTIONS ============ */}
      <section className="relative bg-[var(--bg-deep)] border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
            <Motion.div {...rise}>
              <h2 className="headline-sm">No guarantee. On purpose.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed prose-body">
                Anyone promising you an offer is either lying or planning to do
                the work for you &mdash; and a hiring manager can smell both. I
                bring 20 years of closing, the frameworks, and daily
                accountability. You bring the reps. That&apos;s the only version
                of this that actually works.
              </p>
            </Motion.div>
            <Motion.div {...rise}>
              <h2 className="headline-sm">The free call is free for real.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed prose-body">
                Fifteen minutes with me. You leave with one fix you can use in
                your next interview &mdash; whether or not we ever work together.
                No pitch deck, no pressure, no follow-up you didn&apos;t ask for.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA — future pacing ============ */}
      <section className="relative bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <Motion.div {...rise} className="max-w-3xl">
          <h2 className="headline">
            Picture the room where it finally goes your way.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground prose-body">
            The callback you were sure wouldn&apos;t come. The offer call where
            they name a number and you don&apos;t flinch. Walking into the final
            round already knowing how it ends. That&apos;s not luck. It&apos;s
            positioning &mdash; and it&apos;s learnable. Start with fifteen
            minutes.
          </p>
          <div className="mt-9">
            <Link to="/contact#book" className="btn-gold">
              Book a 15-minute call
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <CtaPromise />
          </div>
        </Motion.div>
        </div>
      </section>

      {/* ============ INTERVIEW MANIAC TEASER — transparent: the sun is nearly up ============ */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <Motion.div {...rise} className="sunlit max-w-2xl mx-auto">
            <p className="label-condensed">In development</p>
            <h2 className="headline mt-4">Interview Maniac</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              The Maniac Method, as an app. Build your stories, train them against
              the clock, and run the reps until the real interview feels like a
              rehearsal. Coaching clients get it first.
            </p>
            <a
              href="mailto:jeff@careermaniacs.com?subject=Interview%20Maniac%20early%20access"
              className="btn-ghost mt-8"
            >
              Get early access
            </a>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
