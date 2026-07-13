import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'

const rise = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const serviceData = {
  'job-acquisition': {
    title: 'Interview & Job Acquisition Coaching',
    price: '$5,000/month',
    outcome: 'From ignored to undeniable.',
    description:
      'An interview is a sales call. Most candidates show up to answer questions — you will show up to run the room. Built for senior operators who are done getting filtered out by people they would outperform.',
    features: [
      {
        title: 'Maniac Method coaching',
        description:
          'Storytelling, communication, mindset. The skills that move a room, drilled twice a week.',
      },
      {
        title: 'Target-company strategy',
        description:
          'A named list of companies and roles with a plan of attack for each. Not spray-and-pray applications.',
      },
      {
        title: 'Resume & LinkedIn',
        description:
          'Rebuilt for each target role and kept current as the search moves.',
      },
      {
        title: 'Interview Maniac',
        description:
          'Early access to Interview Maniac, the training app (in development). Reps between sessions.',
      },
      {
        title: 'AI-powered research',
        description:
          'Company research, stakeholder maps, and positioning reports built for your specific targets.',
      },
      {
        title: 'GTM coaching elements',
        description:
          'Walk into the room talking revenue architecture, not job duties.',
      },
      {
        title: 'Proven frameworks, taught directly',
        description:
          'The positioning and storytelling frameworks behind 12 President’s Clubs and a #1 national finish at 264% of plan.',
      },
      {
        title: 'Cadence',
        description:
          'Two 1:1 Zoom sessions a week plus daily accountability check-ins.',
      },
    ],
    note: 'Land your role mid-engagement? Remaining sessions roll into GTM Onboarding or credit toward it.',
    process: [
      'Assessment. Where you are, what you want, what is in the way.',
      'Career story. Build the narrative that makes you the obvious pick.',
      'Target research. AI-assisted company and stakeholder intel on every name on your list.',
      'Resume and LinkedIn. Rebuilt around the story and the targets.',
      'Interview reps. Practice these conversations like the deals they are.',
      'Application strategy. Sequenced outreach, not a numbers game.',
      'Ongoing coaching. Daily accountability until you sign.',
    ],
    stats: [
      { value: '2×', label: 'Sessions per week' },
      { value: 'Daily', label: 'Accountability check-ins' },
      { value: '1:1', label: 'Direct access to Jeff' },
    ],
  },
  'gtm-onboarding': {
    title: 'GTM Onboarding',
    price: '$5,000/month',
    outcome: 'From day one to President’s Club.',
    description:
      'The first 90 days decide your reputation for the next three years. This plan turns your ramp into a campaign — stakeholder by stakeholder, week by week — so the first big wave of your tenure is one you catch.',
    features: [
      {
        title: 'Strategic success plan',
        description: 'Onboarding to ramp to quota, mapped week by week.',
      },
      {
        title: 'AI-powered GTM workflows',
        description:
          'Prospecting automation, stakeholder intelligence, and a personal brand engine running from day one.',
      },
      {
        title: 'Maniac Method coaching',
        description:
          'Storytelling, communication, mindset — the same drills, aimed at your new territory.',
      },
      {
        title: 'Cadence',
        description:
          'Two 1:1 Zoom sessions a week plus daily accountability check-ins.',
      },
    ],
    process: [
      'Onboarding strategy. A 30-60-90 plan built before your first Monday.',
      'Stakeholder map. Who matters, who decides, and how to earn each one.',
      'Prospecting workflows. AI-assisted pipeline building from week one.',
      'Personal brand. Get known inside and outside the building.',
      'Performance coaching. Double down on what works, cut what does not.',
      'President’s Club path. Plan the year, not just the quarter.',
    ],
    stats: [
      { value: '2×', label: 'Sessions per week' },
      { value: 'Daily', label: 'Accountability check-ins' },
      { value: '1:1', label: 'Direct access to Jeff' },
    ],
  },
  'ai-workshop': {
    title: 'Maniac AI Workshop',
    price: '$3,000/month standalone · $7,000/month bundled',
    outcome: 'You walk away with working AI you built yourself.',
    description:
      'Stop watching demos. You build your own apps, automations, and workflows — hands on keyboard, coached by someone who has sold AI since Salesforce Einstein in 2017 and ships it daily at Forgetime.ai.',
    features: [
      {
        title: 'Digital twin setup & orchestration',
        description:
          'An AI counterpart that researches, drafts, and executes on your behalf — including while you sleep.',
      },
      {
        title: 'Prospecting & outreach automation',
        description:
          'The machine that finds, qualifies, and reaches your targets at scale. No more manual grunt work.',
      },
      {
        title: 'Research & intelligence workflows',
        description:
          'Automated company research, stakeholder mapping, and competitive intel. Signal, not noise.',
      },
      {
        title: 'Personal brand content engines',
        description:
          'A content flywheel that runs on its own without losing your voice.',
      },
      {
        title: 'GTM dashboards & reporting',
        description:
          'Real-time visibility into pipeline, activity, and the numbers that matter.',
      },
      {
        title: 'Fully agentic systems',
        description:
          'Apps, automations, and workflows wired together and running as one system.',
      },
    ],
    process: [
      'Pick the use case. The one with the biggest payoff for you.',
      'Design it together. Architecture and workflow, mapped before a line is written.',
      'Build it. Hands on keyboard, no slides.',
      'Test and harden. Iterate until it holds up under real use.',
      'Deploy it. Wired into your daily workflow, not a side project.',
      'Learn to extend it. Documented and taught so you are not dependent on anyone.',
    ],
    stats: [
      { value: 'Hands-on', label: 'You build it, you own it' },
      { value: '$3K', label: 'Per month standalone' },
      { value: '1:1', label: 'Direct access to Jeff' },
    ],
  },
}

const ServiceDetailPage = ({ service }) => {
  const data = serviceData[service]

  if (!data) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="headline mb-6">Service not found.</h1>
          <Link to="/services" className="btn-ghost">
            See all services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32">
      {/* Hero */}
      <section className="pb-24" id="service-detail">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise} className="max-w-3xl">
            <h1 className="display">{data.title}</h1>
            <p className="story-voice text-xl mt-6">{data.outcome}</p>
            <p className="mt-5 text-2xl font-bold">{data.price}</p>
            <p className="prose-body text-muted-foreground mt-5">
              {data.description}
            </p>
            <div className="mt-9">
              <Link to="/contact#book" className="btn-gold">
                Book a 15-minute call
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.h2 {...rise} className="headline">
            What you get
          </Motion.h2>
          <Motion.div {...rise} className="mt-10 grid md:grid-cols-2 gap-x-14">
            {data.features.map((feature) => (
              <div
                key={feature.title}
                className="py-5 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mt-1.5">
                  {feature.description}
                </p>
              </div>
            ))}
          </Motion.div>
          {data.note && (
            <Motion.p
              {...rise}
              className="mt-8 pt-5 border-t text-sm text-muted-foreground"
              style={{ borderColor: 'var(--border)' }}
            >
              {data.note}
            </Motion.p>
          )}
        </div>
      </section>

      {/* The process */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.h2 {...rise} className="headline">
            The process
          </Motion.h2>
          <Motion.ol {...rise} className="mt-12 max-w-2xl">
            {data.process.map((step, index) => (
              <li key={step} className="relative pl-14 pb-10 last:pb-0">
                {index < data.process.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.125rem] top-10 bottom-0 w-px"
                    style={{ backgroundColor: 'var(--border)' }}
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--gold)',
                  }}
                >
                  {index + 1}
                </span>
                <p className="text-foreground pt-1.5">{step}</p>
              </li>
            ))}
          </Motion.ol>
        </div>
      </section>

      {/* Pricing comparison (AI Workshop only) */}
      {service === 'ai-workshop' && (
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Motion.h2 {...rise} className="headline">
              Standalone or bundled
            </Motion.h2>
            <Motion.div {...rise} className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="panel p-8">
                <h3 className="headline-sm">Standalone</h3>
                <p className="mt-4 text-4xl font-bold">
                  $3,000
                  <span className="text-lg font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
                <p className="text-muted-foreground mt-4">
                  Open to anyone. No coaching plan required, no prerequisites.
                </p>
              </div>
              <div className="panel p-8" style={{ borderColor: 'var(--gold)' }}>
                <h3 className="headline-sm">Bundled</h3>
                <p className="mt-4 text-4xl font-bold">
                  $7,000
                  <span className="text-lg font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: 'var(--gold)' }}
                >
                  Save $1,000/mo versus paying separately
                </p>
                <p className="text-muted-foreground mt-4">
                  Added to Job Acquisition or GTM Onboarding. You choose which
                  parts of your base plan get condensed to make room for build
                  sessions. Your priorities, your call.
                </p>
              </div>
            </Motion.div>
            <Motion.p {...rise} className="mt-8 text-sm text-muted-foreground">
              The Workshop runs while you are in active contract. Everything
              you build is yours to keep.
            </Motion.p>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            {...rise}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
          >
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="label-condensed text-muted-foreground mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise} className="text-center">
            <h2 className="headline">Paddle out.</h2>
            <p className="text-lg text-muted-foreground mt-5 max-w-xl mx-auto">
              Fifteen minutes. You talk, Jeff listens, and you both decide if
              this is the right ride.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact#book" className="btn-gold">
                Book a 15-minute call
              </Link>
              <Link
                to="/testimonials#testimonials-section"
                className="btn-ghost"
              >
                See client results
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage
