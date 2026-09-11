import { Link } from 'react-router-dom'
import CalendlyButton from '../components/CalendlyButton'

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
    a: 'No. Hiring decisions belong to employers. Jeff brings 20 years of closing at Palantir, Salesforce, and Oracle, the frameworks, and daily accountability. You bring the reps. That is the only version of this that actually works. What you will leave with: a sharper story, a real strategy, and the AI workflows to run it.',
  },
  {
    q: 'How is this different from interview coaching?',
    a: 'The Maniac Method connects your experience to a specific role, turns your wins into stories and helps you practice the conversation. We work on positioning, storytelling and the close together.',
  },
  {
    q: 'Who is this NOT for?',
    a: 'People shopping for a resume tweak or a pep talk. People who want someone to do the work for them. If daily accountability sounds exhausting instead of exciting, this is not the right fit — no hard feelings. This is for experienced professionals ready to put time into preparation and practice.',
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
    a: 'Hands-on building, not demos. Jeff has sold AI since Salesforce Einstein in 2017 and builds his own apps, agents, and automations every day. In the Workshop you build your own apps, automations, and workflows with him — $3,000/month standalone, or $7,000/month bundled with either coaching plan, which saves you $1,000 a month.',
  },
  {
    q: 'What do I actually walk away with from the Workshop?',
    a: 'A working, tested app, automation, or workflow — or all three wired together as one agentic system. Everything you build is yours to keep. When bundled, you choose which parts of your base coaching plan get condensed to make room for build sessions.',
  },
]

const ServicesPage = () => (
  <div className="min-h-screen pt-32">
    <section className="wrap"><h1 className="display">Big ambitions.<br />Do the work.</h1><p className="section-deck">A Maniac brings the ambition and does the reps. Bring your next role, your new territory or the AI workflow you’re ready to build.</p></section>
    <section id="services-section" className="solid-section section-space"><div className="wrap">
      <article className="service-flagship"><div><h2 className="headline">Interview &amp;<br />Job Acquisition</h2><p className="price">$5,000<span>/month</span></p><p>Positioning, storytelling and interview practice for experienced sales professionals in an active search.</p><Link className="btn-primary" to="/services/job-acquisition">Explore the program</Link></div><div><h3 className="headline-sm">We work on your actual search.</h3><ul>{flagshipFeatures.map(f => <li key={f.title}><strong>{f.title}.</strong> {f.detail}</li>)}</ul><p className="record-note">Land your role mid-engagement? Remaining sessions roll into GTM Onboarding or credit toward it.</p></div></article>
      <div className="offer-secondary"><Link to="/services/gtm-onboarding"><h3>GTM Onboarding</h3><p className="muted">Build your ramp plan, stakeholder map and prospecting workflows. Two sessions a week, plus daily accountability.</p><span>$5,000/month →</span></Link><Link to="/services/ai-workshop"><h3>Maniac AI Workshop</h3><p className="muted">Build your own apps, automations and workflows with Jeff. Keep what you build.</p><span>$3,000/month standalone →</span><p className="record-note">$7,000/month with Job Acquisition or GTM Onboarding. Save $1,000/month compared with buying separately.</p></Link></div>
      <div className="corporate-offer"><h2 className="headline-sm">Corporate GTM &amp; AI</h2><p className="muted">Training, playbooks and build sessions scoped to your team and your tools. Custom pricing.</p><Link className="text-link" to="/contact#book">Talk to Jeff about your team →</Link></div>
    </div></section>
    <section id="faq" className="solid-section section-space"><div className="wrap faq-layout"><h2 className="headline">Straight answers.</h2><div className="faq-list">{faqs.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
    <section className="solid-section section-space"><div className="wrap"><h2 className="headline">Bring your ambition. I’ll bring the hard questions.</h2><p className="section-deck">In 15 minutes, you’ll leave with one fix you can use in your next interview, whether or not we ever work together.</p><div className="actions"><Link className="btn-primary" to="/contact#book">Talk to Jeff</Link><CalendlyButton /></div></div></section>
  </div>
)
export default ServicesPage
