import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CalendlyButton from '../components/CalendlyButton'
import { Portrait } from '../components/Proof'

const proofRows = [
  {
    company: 'Palantir',
    role: 'Commercial Director',
    result: 'Two new logos worth $7.63M. $8M qualified pipeline in nine months.',
  },
  {
    company: 'Salesforce',
    role: 'Enterprise AE',
    result: "President's Club twice. Joined the Einstein AI push in 2017.",
  },
  {
    company: 'Oracle',
    role: 'Enterprise Sales',
    result: 'Largest cloud deal in Oracle history by license count, FY13.',
  },
  {
    company: 'expert.ai',
    role: 'VP Platform Sales',
    result: "$3.1M ML & NLU deal with the world's largest beverage company",
  },
  {
    company: '[24]7.ai',
    role: 'Enterprise Sales',
    result: '264% of a $5M quota, securing MVP. Two new Fortune 500 logos.',
  },
  {
    company: 'ADP',
    role: 'Enterprise Sales',
    result: "6× President's Club and 2× MVP",
  },
  {
    company: 'ZOLL',
    role: 'Sales',
    result: 'Rookie of the Year',
  },
]

const AboutPage = () => (
  <div className="page about-page">
    <section className="about-hero ocean-rule"><div className="wrap about-intro">
      <div><h1 className="display">A closer.<br />In your corner.</h1><p className="about-lead">I’m Jeff Meyers. I spent two decades selling enterprise software. Now I coach sellers through career moves and help them put AI to work in GTM.</p><p>The work starts with your reality. A buyer who won’t commit. A territory you need to build. An interview where the stakes are high. We prepare for the conversation and build the tools that support it.</p><p>I have an MIT degree in AI &amp; business strategy. I also build my own apps, agents and automations. The research systems I teach are part of my own work.</p><Link to="/contact#book" className="btn-primary">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <Portrait className="about-portrait" eager />
    </div></section>
    <section className="section-space solid-section"><div className="wrap"><h2 className="headline">The work behind the coaching.</h2><p className="section-deck">Two decades in enterprise sales. Twelve President’s Club wins. Four AE of the Year awards. Two Rookie of the Year awards.</p><div className="career-record">{proofRows.map(row => <article key={row.company}><h3>{row.company}</h3><p className="muted">{row.role}</p><p>{row.result}</p></article>)}</div><p className="record-note">Where I carried a bag. Client stories are on the Testimonials page.</p></div></section>
    <section className="section-space about-method"><div className="wrap"><h2 className="headline">Why Maniacs?</h2><div className="about-method-copy"><p>I surf. I kitesurf. I like finding the edge of what I can do, then pushing it. Out there, you read the conditions, trust the reps and commit. The ocean gives honest feedback.</p><p>That’s the spirit behind Career Maniacs. A Maniac brings an uncommon level of curiosity, preparation and commitment to something that matters. Cares deeply. Does the reps. Has the nerve to make a move.</p><p>“How you do anything is how you do everything.” That means preparation counts before anyone is watching. “Everything you want is on the other side of fear.” That means asking the question you’ve been avoiding. I bring both to the way I coach.</p></div></div></section>
    <section className="section-space solid-section"><div className="wrap"><h2 className="headline">Bring the question that’s keeping you up.</h2><p className="section-deck">Fifteen minutes. You talk, I listen, and you leave with at least one thing you can use, whether we work together or not.</p><div className="actions"><Link to="/contact#book" className="btn-primary">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link><CalendlyButton /></div></div></section>
  </div>
)
export default AboutPage
