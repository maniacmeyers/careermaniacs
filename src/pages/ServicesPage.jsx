import { Link } from 'react-router-dom'
import CalendlyButton from '../components/CalendlyButton'

import { serviceData, faqs } from '../lib/finalSiteCopy'

const flagshipFeatures = serviceData['job-acquisition'].features.filter(f => f.title !== 'Confidential by design')

const ServicesPage = () => (
  <div className="min-h-screen pt-32">
    <section className="wrap"><h1 className="display">Big ambitions.<br />Do the work.</h1><p className="section-deck">Three programs. One for the search, one for the first 90 days in the new seat, one for the AI tooling a modern seller carries into both. All one-on-one, all built around what is in front of you this week.</p><p className="proof-strip">25+ sales professionals coached. Eleven weeks on average from first session to signed offer.</p></section>
    <section id="services-section" className="solid-section section-space"><div className="wrap">
      <article className="service-flagship ocean-rule"><div><h2 className="headline">Interview &amp;<br />Job Acquisition</h2><p className="price">$5,000<span>/month</span></p><p>For experienced sales professionals in an active search. Build the target list, the positioning, and the story. Then practice the conversations until the hard question stops scaring you.</p><Link className="btn-primary" to="/services/job-acquisition">Explore the program</Link></div><div><h3 className="headline-sm">We work on your actual search.</h3><ul>{flagshipFeatures.map(f => <li key={f.title}><strong>{f.title}.</strong> {f.description}</li>)}</ul><p className="record-note">{serviceData['job-acquisition'].note}</p></div></article>
      <div className="offer-secondary"><Link to="/services/gtm-onboarding"><h3>GTM Onboarding</h3><p className="muted">You got the seat. Now hit the number. A 30-60-90 plan built before your first Monday, a stakeholder map, and prospecting workflows on your real territory. Three sessions a week plus daily accountability. I will give you a one-page summary to hand your new manager.</p><span>$5,000/month →</span><p className="record-note">Most clients run three to six months. Usually employer-funded.</p></Link><Link to="/services/ai-workshop"><h3>Maniac AI Workshop</h3><p className="muted">Build the research and outreach tools your process is missing, on your accounts, with me at the keyboard next to you. You keep everything you build.</p><span>$5,000/month standalone →</span><p className="record-note">$2,000/month added to either coaching program. Usually employer-funded.</p></Link></div>
      <p className="team-link">Coaching a whole floor? That is <a href="https://gtmmaniacs.com">GTM Maniacs</a>, the sister company that builds outbound systems and trains BDR and AE teams.</p>
    </div></section>
    <section id="faq" className="solid-section section-space"><div className="wrap faq-layout"><h2 className="headline">Straight answers.</h2><div className="faq-list">{faqs.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
    <section className="solid-section section-space"><div className="wrap"><h2 className="headline">Bring your ambition. I’ll bring the hard questions.</h2><p className="section-deck">You leave with one fix you can use in your next interview, whether or not we ever work together.</p><div className="actions"><Link className="btn-primary" to="/contact#book">Talk to Jeff</Link><CalendlyButton /></div></div></section>
  </div>
)
export default ServicesPage
