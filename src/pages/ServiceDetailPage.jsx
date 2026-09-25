import JobMethod from '../components/JobMethod'
import { serviceData } from '../lib/finalSiteCopy'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'

const rise = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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
    <div className="min-h-screen pt-32 service-detail-page">
      {/* Hero .  open to the ocean */}
      <section className="relative pb-24" id="service-detail">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, oklch(0.10 0.016 250 / 0.85), oklch(0.10 0.016 250 / 0.35) 55%, transparent 78%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise} className="max-w-3xl">
            <p className="eyebrow mb-4">{data.title}</p>
            <h1 className="display">{data.outcome}</h1>
            <p className="mt-5 text-2xl font-bold">{data.price}</p>
            <p className="prose-body text-muted-foreground mt-5">
              {data.description}
            </p>
            {data.credential && <p className="mt-5 text-muted-foreground">{data.credential}</p>}
            {service === 'ai-workshop' && <p className="mt-5 text-muted-foreground">For individual sellers and sales leaders who want to build their own tooling. Building for a whole team? That is <a className="underline" href="https://gtmmaniacs.com">GTM Maniacs</a>.</p>}
            <div className="mt-9">
              <Link to="/contact#book" className="btn-gold">
                Talk to Jeff
              </Link>
              {data.heroPromise && <p className="mt-4 text-sm text-muted-foreground max-w-md">{data.heroPromise}</p>}
              {data.proof && <p className="proof-strip mt-6">{data.proof}</p>}
            </div>
          </Motion.div>
        </div>
      </section>

      {/* What you get */}
      <section className="relative py-24 bg-background">
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

      {service === 'job-acquisition' && <JobMethod />}

      {/* The process */}
      <section className="relative py-24 bg-background">
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
        <section className="relative py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Motion.h2 {...rise} className="headline">
              Standalone or bundled
            </Motion.h2>
            <Motion.div {...rise} className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="panel p-8">
                <h3 className="headline-sm">Standalone</h3>
                <p className="mt-4 text-4xl font-bold">
                  $5,000
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
                  $2,000
                  <span className="text-lg font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: 'var(--gold)' }}
                >
                  $7,000 a month total
                </p>
                <p className="text-muted-foreground mt-4">
                  Added to Job Acquisition or GTM Onboarding. You choose which
                  parts of your base plan get condensed to make room for build
                  sessions. Your priorities, your call.
                </p>
              </div>
            </Motion.div>
            <Motion.p {...rise} className="mt-8 text-sm text-muted-foreground">
              The Workshop runs month to month for as long as you are enrolled. Everything you build is yours to keep.
            </Motion.p>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="relative py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            {...rise}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
          >
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-foreground">
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
      <section className="relative py-28 bg-background ocean-rule">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise} className="text-center">
            <h2 className="headline">{data.ctaHeadline}</h2>
            <p className="text-lg text-muted-foreground mt-5 max-w-xl mx-auto">
              Fifteen minutes. You talk, I listen, and we both decide if this is the right fit.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact#book" className="btn-gold">
                Talk to Jeff
              </Link>
              <Link
                to="/testimonials#testimonials-section"
                className="btn-ghost"
              >
                See client results
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-md mx-auto">
              {data.ctaPromise}
            </p>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage
