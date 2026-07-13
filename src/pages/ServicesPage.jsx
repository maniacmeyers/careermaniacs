import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import CalendlyButton from '../components/CalendlyButton'

const rise = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const flagshipFeatures = [
  {
    title: 'Maniac Method coaching',
    detail: 'Storytelling, communication, mindset. The skills that move a room, drilled twice a week.',
  },
  {
    title: 'Target-company strategy',
    detail: 'A named list of companies and roles with a plan of attack for each. Not spray-and-pray applications.',
  },
  {
    title: 'Resume & LinkedIn',
    detail: 'Rebuilt for each target role and kept current as the search moves.',
  },
  {
    title: 'Interview Maniac',
    detail: 'Early access to Interview Maniac, the training app (in development). Reps between sessions.',
  },
  {
    title: 'AI-powered research',
    detail: 'Company research, stakeholder maps, and positioning reports built for your specific targets.',
  },
  {
    title: 'GTM coaching elements',
    detail: 'Walk into the room talking revenue architecture, not job duties.',
  },
  {
    title: 'Cadence',
    detail: 'Two 1:1 Zoom sessions a week plus daily accountability check-ins.',
  },
]

const faqs = [
  {
    q: 'What does it cost and what is included?',
    a: '$5,000 a month, flat. Two 1:1 Zoom sessions a week, daily accountability check-ins, and strategy, positioning, and AI workflows built for your specific targets. No tiers, no upsells. Land the role mid-engagement and remaining sessions roll into GTM Onboarding or credit toward it.',
  },
  {
    q: 'Do you guarantee a job offer?',
    a: 'No. Be suspicious of anyone in this space who does. Jeff brings 20 years of closing at Palantir, Salesforce, and Oracle, the frameworks, and relentless accountability. You bring the work. What you will leave with: a sharper story, a real strategy, and the AI workflows to run it.',
  },
  {
    q: 'Who is this NOT for?',
    a: 'People shopping for a resume tweak or a pep talk. People who want someone to do the work for them. If daily accountability sounds exhausting instead of exciting, this is not the right fit — no hard feelings.',
  },
  {
    q: 'I am still employed. Is this confidential?',
    a: 'Completely. Sessions are scheduled around your calendar, everything runs through personal email, and your employer is never contacted. Most clients start while still in-seat. That is the smart play.',
  },
  {
    q: 'How long does an engagement last?',
    a: 'Job Acquisition clients typically run 2 to 4 months, until they sign. GTM Onboarding clients run 3 to 6 months, through ramp and the first performance cycle. Month to month, no minimum. You pay while it is working.',
  },
  {
    q: 'Can I switch between programs?',
    a: 'Yes. Start on Job Acquisition, land the role, and your remaining sessions roll straight into GTM Onboarding or credit toward it. The handoff is built in.',
  },
  {
    q: 'What is the Maniac AI Workshop?',
    a: 'Hands-on building, not demos. Jeff has sold AI since Salesforce Einstein in 2017 and builds daily at Forgetime.ai. In the Workshop you build your own apps, automations, and workflows with him — $3,000/month standalone, or $7,000/month bundled with either coaching plan, which saves you $1,000 a month.',
  },
  {
    q: 'What do I actually walk away with from the Workshop?',
    a: 'A working, tested app, automation, or workflow — or all three wired together as one agentic system. Everything you build is yours to keep. When bundled, you choose which parts of your base coaching plan get condensed to make room for build sessions.',
  },
]

const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-32">
      {/* Hero */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise}>
            <h1 className="display">Pick your wave.</h1>
            <p className="prose-body text-lg text-muted-foreground mt-6">
              Three ways to work with Jeff. Every one of them treats your career
              like a deal to close — because that is exactly what it is.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Flagship */}
      <section className="pb-6" id="services-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.article {...rise} className="panel p-8 md:p-12">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
              <div className="lg:col-span-2">
                <p className="label-condensed" style={{ color: 'var(--gold)' }}>
                  Most popular
                </p>
                <h2 className="headline mt-4">
                  Interview &amp; Job Acquisition Coaching
                </h2>
                <p className="mt-5 text-3xl font-bold">
                  $5,000
                  <span className="text-lg font-normal text-muted-foreground">
                    /month
                  </span>
                </p>
                <p className="story-voice text-xl mt-6">
                  From ignored to undeniable.
                </p>
                <p className="text-muted-foreground mt-4">
                  An interview is a sales call. Most candidates show up to
                  answer questions — you will show up to run the room. For
                  senior operators in an active search who are done getting
                  filtered out by people they would outperform.
                </p>
                <div className="mt-8">
                  <Link to="/contact#book" className="btn-gold">
                    Book a 15-minute call
                  </Link>
                </div>
                <p className="mt-5 text-sm">
                  <Link
                    to="/services/job-acquisition"
                    className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    See the full plan
                  </Link>
                </p>
              </div>

              <div className="lg:col-span-3">
                <h3 className="headline-sm">What you get</h3>
                <ul className="mt-4">
                  {flagshipFeatures.map((f) => (
                    <li
                      key={f.title}
                      className="py-4 border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <span className="font-semibold text-foreground">
                        {f.title}.
                      </span>{' '}
                      <span className="text-muted-foreground">{f.detail}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-6 pt-5 border-t text-sm text-muted-foreground"
                  style={{ borderColor: 'var(--border)' }}
                >
                  Land your role mid-engagement? Remaining sessions roll into
                  GTM Onboarding or credit toward it.
                </p>
              </div>
            </div>
          </Motion.article>
        </div>
      </section>

      {/* Supporting offers */}
      <section className="pb-24 pt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Motion.article {...rise} className="panel p-8 flex flex-col">
              <h2 className="headline-sm">GTM Onboarding</h2>
              <p className="mt-3 text-2xl font-bold">
                $5,000
                <span className="text-base font-normal text-muted-foreground">
                  /month
                </span>
              </p>
              <p className="text-muted-foreground mt-4 flex-1">
                You landed the role. Now the first 90 days decide your
                reputation for the next three years. A week-by-week ramp plan,
                AI-powered prospecting workflows, and the same coaching cadence:
                two sessions a week, daily check-ins.
              </p>
              <p className="mt-6 text-sm">
                <Link
                  to="/services/gtm-onboarding"
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  See the full plan
                </Link>
              </p>
            </Motion.article>

            <Motion.article {...rise} className="panel p-8 flex flex-col">
              <h2 className="headline-sm">Maniac AI Workshop</h2>
              <p className="mt-3 text-2xl font-bold">
                $3,000
                <span className="text-base font-normal text-muted-foreground">
                  /month standalone
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                $7,000/month bundled with any plan — save $1,000/month.
              </p>
              <p className="text-muted-foreground mt-4 flex-1">
                Stop watching demos. Build your own apps, automations, and
                workflows with someone who has sold AI since Salesforce
                Einstein in 2017. Everything you build is yours.
              </p>
              <p className="mt-6 text-sm">
                <Link
                  to="/services/ai-workshop"
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  See the full plan
                </Link>
              </p>
            </Motion.article>

            <Motion.article {...rise} className="panel p-8 flex flex-col">
              <h2 className="headline-sm">Corporate GTM &amp; AI for teams</h2>
              <p className="mt-3 text-2xl font-bold">Custom</p>
              <p className="text-muted-foreground mt-4 flex-1">
                Running a sales org? The Maniac Method and the AI Workshop both
                scale to teams — training, playbooks, and build sessions scoped
                to your people and your stack.
              </p>
              <div className="mt-6">
                <Link to="/contact#book" className="btn-ghost">
                  Book a 15-minute call
                </Link>
              </div>
            </Motion.article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise}>
            <h2 className="headline">Straight answers.</h2>
            <p className="text-muted-foreground mt-4">
              The questions people actually ask before they commit.
            </p>
          </Motion.div>
          <Motion.div {...rise} className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details key={item.q} className="panel group">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <span className="font-semibold text-foreground">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl leading-none font-light transition-transform duration-200 group-open:rotate-45"
                    style={{ color: 'var(--gold)' }}
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </Motion.div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Already a client?</span>
            <CalendlyButton />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise} className="text-center">
            <h2 className="headline">The next set is already forming.</h2>
            <p className="text-lg text-muted-foreground mt-5 max-w-xl mx-auto">
              Fifteen minutes. You talk, Jeff listens, and you both decide if
              this is the right ride.
            </p>
            <div className="mt-9">
              <Link to="/contact#book" className="btn-gold">
                Book a 15-minute call
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
