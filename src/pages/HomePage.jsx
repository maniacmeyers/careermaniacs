import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WaveScene from '../components/WaveScene'

const rise = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const companies = ['Palantir', 'Salesforce', 'Oracle', 'ADP', 'expert.ai', '[24]7.ai']

const stats = [
  { value: '12×', label: "President's Club" },
  { value: '#1', label: 'Nationally, at 264% of plan' },
  { value: '20 yrs', label: 'Closing enterprise deals' },
]

const methodSteps = [
  {
    n: '1',
    title: 'Position',
    body: "You're the product now. We build your positioning: the throughline of your career, the proof that backs it, and the fit map for the exact role you want — the same way you'd build a business case for a seven-figure deal.",
  },
  {
    n: '2',
    title: 'Story',
    body: 'Your wins become stories with teeth — And, But, Therefore. Not STAR nursery rhymes. Collateral that makes a hiring panel lean in and remember you three candidates later.',
  },
  {
    n: '3',
    title: 'Close',
    body: "Deal-run the interview: discovery on their pain, objection handling on your gaps, and an actual ask at the end. You practice under pressure until pressure feels like home turf.",
  },
]

const results = [
  {
    quote:
      'Jeff helped me up my storytelling game and land an awesome role. The way he reframes your experience changes how the room hears you.',
    name: 'John Macpherson',
    title: 'Data & Analytics Leader',
  },
  {
    quote:
      'A transformative journey that redefined how I view my career. This is not resume polish — it is a different operating system for selling yourself.',
    name: 'Justin P. H.',
    title: 'Director of Strategic Sales, Neuron7.ai',
  },
  {
    quote:
      'An extraordinary master class in goal setting and positioning. Jeff coaches you the way a top closer runs a deal — nothing is left to chance.',
    name: 'Charles N.',
    title: 'Account Executive, TitanX',
  },
]

const HomePage = () => {
  return (
    <div className="overflow-x-clip">
      {/* ============ HERO — night water ============ */}
      <section className="relative min-h-[92vh] flex items-center bg-[var(--bg-deep)]">
        <WaveScene variant="night" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="display">
              Your interview is a sales call.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground prose-body">
              You've run discovery, built champions, and closed millions for other
              people's companies. But the one product you've never had to pitch is
              you. Jeff Meyers coaches GTM executives to run the interview like a
              deal — and close it.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link to="/contact#book" className="btn-gold">
                Book a 15-minute call
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link to="/testimonials" className="btn-ghost">
                See client results
              </Link>
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
        </div>
      </section>

      {/* ============ WHERE JEFF SOLD ============ */}
      <section aria-label="Companies where Jeff carried the bag" className="border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-baseline gap-x-10 gap-y-3">
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
      </section>

      {/* ============ THE STORY (ABT — the method demonstrating itself) ============ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="max-w-3xl space-y-12">
          <Motion.p {...rise} className="story-voice">
            <span className="label-condensed not-italic text-[var(--teal)] block mb-3">And</span>
            You know how to run a deal. Discovery. Champion. Business case.
            The close. It's muscle memory — you've done it a thousand times.
          </Motion.p>
          <Motion.p {...rise} className="story-voice">
            <span className="label-condensed not-italic text-[var(--gold)] block mb-3">But</span>
            The moment the product is <em>you</em>, the process vanishes. Smart,
            accomplished sellers walk into the most important sales call of their
            lives — and wing it.
          </Motion.p>
          <Motion.p {...rise} className="story-voice">
            <span className="label-condensed not-italic text-[var(--primary)] block mb-3">Therefore</span>
            The Maniac Method puts the process back. Position yourself like a
            product. Build stories like collateral. Close like a rep at 264% of
            plan — because your coach was one.
          </Motion.p>
        </div>
      </section>

      {/* ============ THE METHOD (a real sequence) ============ */}
      <section className="bg-[var(--bg-deep)] border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Motion.h2 {...rise} className="headline max-w-2xl">
            Run the interview like a deal.
          </Motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-x-10 gap-y-12">
            {methodSteps.map((step) => (
              <Motion.div key={step.n} {...rise}>
                <p
                  className="text-6xl font-bold text-[var(--primary)]"
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
        </div>
      </section>

      {/* ============ OFFERS — flagship first, asymmetric ============ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <Motion.h2 {...rise} className="headline max-w-2xl">
          Pick your wave.
        </Motion.h2>

        {/* Flagship */}
        <Motion.div {...rise} className="mt-14 panel p-8 sm:p-12 md:grid md:grid-cols-[1.4fr_1fr] md:gap-12">
          <div>
            <p className="label-condensed text-[var(--gold)]">The flagship</p>
            <h3 className="headline-sm mt-3">Interview &amp; Job Acquisition Coaching</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed prose-body">
              For GTM executives in the hunt. Twice-weekly 1:1 coaching with Jeff,
              daily accountability, the full positioning build, ABT story
              development, and deal-run interview practice — from first screen to
              offer negotiation. From ignored to undeniable.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact#book" className="btn-gold">
                Book a 15-minute call
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link to="/services/job-acquisition" className="btn-ghost">
                See the full program
              </Link>
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

        {/* Supporting offers */}
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <Motion.div {...rise} className="panel p-8 flex flex-col">
            <h3 className="headline-sm">GTM Onboarding</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed flex-1">
              You landed it. Now dominate it. Ninety-day ramp coaching for the new
              role — territory plan, first wins, President's Club trajectory.
            </p>
            <p className="mt-6 font-bold text-lg">$5,000<span className="text-sm text-muted-foreground font-semibold">/month</span></p>
            <Link to="/services/gtm-onboarding" className="mt-4 inline-flex items-center gap-1.5 text-[var(--primary)] font-semibold text-sm hover:underline underline-offset-4">
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
            <Link to="/services/ai-workshop" className="mt-4 inline-flex items-center gap-1.5 text-[var(--primary)] font-semibold text-sm hover:underline underline-offset-4">
              What you'll build <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Motion.div>

          <Motion.div {...rise} className="panel p-8 flex flex-col">
            <h3 className="headline-sm">Corporate GTM &amp; AI</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed flex-1">
              For teams: GTM enablement and AI adoption coaching from someone who
              carried a bag at Palantir and Salesforce — storytelling, prospecting,
              and AI workflows for your whole floor.
            </p>
            <p className="mt-6 font-bold text-lg">Custom</p>
            <Link to="/contact#book" className="mt-4 inline-flex items-center gap-1.5 text-[var(--primary)] font-semibold text-sm hover:underline underline-offset-4">
              Talk to Jeff <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="bg-[var(--bg-deep)] border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Motion.h2 {...rise} className="headline max-w-2xl">
            The people who rode it in.
          </Motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {results.map((r) => (
              <Motion.figure key={r.name} {...rise} className="flex flex-col">
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
            <Link to="/testimonials" className="inline-flex items-center gap-1.5 text-[var(--primary)] font-semibold hover:underline underline-offset-4">
              All client results <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* ============ INTERVIEW MANIAC TEASER — dawn ============ */}
      <section className="relative overflow-hidden bg-[var(--bg-deep)]">
        <WaveScene variant="dawn" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <Motion.div {...rise} className="max-w-2xl mx-auto">
            <p className="label-condensed text-[var(--gold)]">Coming up on the horizon</p>
            <h2 className="headline mt-4">Interview Maniac</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              The Maniac Method, as an app. Build your stories, train them against
              the clock, and ride the wave until the real interview feels like a
              practice run. In development now.
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

      {/* ============ FINAL CTA ============ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <Motion.div {...rise} className="max-w-3xl">
          <h2 className="headline">
            You already have interviews on the calendar. Walk in with a process.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground prose-body">
            Fifteen minutes with Jeff. He'll tell you honestly whether the Maniac
            Method fits where you are — and what he'd fix first either way.
          </p>
          <div className="mt-9">
            <Link to="/contact#book" className="btn-gold">
              Book a 15-minute call
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </Motion.div>
      </section>
    </div>
  )
}

export default HomePage
