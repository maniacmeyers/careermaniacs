import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import JobMethod from '../components/JobMethod'
import PageHero from '../components/PageHero'
import { ClientQuote } from '../components/Proof'
import { serviceData } from '../lib/finalSiteCopy'

const heroImage = { 'job-acquisition': 'dawn', 'gtm-onboarding': 'calm', 'ai-workshop': 'wave' }

const ServiceDetailPage = ({ service }) => {
  const data = serviceData[service]

  if (!data) {
    return (
      <div className="page"><section className="section-space"><div className="wrap">
        <h1 className="headline">Service not found.</h1>
        <Link to="/services" className="btn-ghost">See all services</Link>
      </div></section></div>
    )
  }

  return (
    <div className="page service-detail-page">
      <PageHero title={data.outcome} image={heroImage[service]}>
        <p className="program-name">{data.title}</p>
        <p className="page-price">{data.price}</p>
        <p className="page-deck">{data.description}</p>
        {data.credential && <p className="muted">{data.credential}</p>}
        {service === 'ai-workshop' && <p className="muted">For individual sellers and sales leaders who want to build their own tooling. Building for a whole team? That is <a className="inline-link" href="https://gtmmaniacs.com">GTM Maniacs</a>.</p>}
        <div className="actions">
          <Link to="/contact#book" className="btn-primary">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        {data.heroPromise && <p className="call-takeaway">{data.heroPromise}</p>}
        {data.proof && <p className="proof-strip">{data.proof}</p>}
      </PageHero>

      <section className="solid-section section-space ocean-rule">
        <div className="wrap">
          <h2 className="headline">What you get.</h2>
          <div className="feature-grid">
            {data.features.map((feature) => (
              <div key={feature.title}>
                <h3>{feature.title}</h3>
                <p className="muted">{feature.description}</p>
              </div>
            ))}
          </div>
          {data.note && <p className="record-note feature-note">{data.note}</p>}
        </div>
      </section>

      {service === 'job-acquisition' && <JobMethod />}

      <section className="solid-section section-space">
        <div className="wrap process-layout">
          <h2 className="headline">How it runs.</h2>
          <ol className="process-list">
            {data.process.map((step) => {
              const [lead, ...rest] = step.split('. ')
              return <li key={step}><strong>{lead}.</strong> {rest.join('. ')}</li>
            })}
          </ol>
        </div>
      </section>

      {service === 'ai-workshop' && (
        <section className="solid-section section-space">
          <div className="wrap">
            <h2 className="headline">Standalone or bundled.</h2>
            <div className="bundle-grid">
              <div className="panel">
                <h3 className="headline-sm">Standalone</h3>
                <p className="bundle-price">$5,000<span>/mo</span></p>
                <p className="muted">Open to anyone. No coaching plan required, no prerequisites.</p>
              </div>
              <div className="panel panel-action">
                <h3 className="headline-sm">Bundled</h3>
                <p className="bundle-price">$2,000<span>/mo</span></p>
                <p className="bundle-total">$7,000 a month total</p>
                <p className="muted">Added to Job Acquisition or GTM Onboarding. You choose which parts of your base plan get condensed to make room for build sessions. Your priorities, your call.</p>
              </div>
            </div>
            <p className="record-note">The Workshop runs month to month for as long as you are enrolled. Everything you build is yours to keep.</p>
          </div>
        </section>
      )}

      {data.quote && <section className="quote-band"><ClientQuote quote={data.quote} author={data.quoteAuthor} title={data.quoteTitle} /></section>}

      <section className="closing-ocean closing-ocean-short">
        <div className="wrap closing-copy">
          <h2>{data.ctaHeadline}</h2>
          <p>Fifteen minutes. You talk, I listen, and we both decide if this is the right fit.</p>
          <div className="actions">
            <Link to="/contact#book" className="btn-primary">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/testimonials" className="text-link">See client stories <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <p className="call-takeaway">{data.ctaPromise}</p>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage
