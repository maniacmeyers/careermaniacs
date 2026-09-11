import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CalendlyButton from '../components/CalendlyButton'

const proofRows = [
  {
    company: 'Palantir',
    role: 'Commercial Director',
    result: 'Two new logos worth $7.63M',
  },
  {
    company: 'Salesforce',
    role: 'Enterprise AE',
    result: "President's Club twice. Joined the Einstein AI push.",
  },
  {
    company: 'Oracle',
    role: 'Enterprise Sales',
    result: 'Largest cloud deal in Oracle history by license count',
  },
  {
    company: 'expert.ai',
    role: 'VP Platform Sales',
    result: "$3.1M ML & NLU deal with the world's largest beverage company",
  },
  {
    company: '[24]7.ai',
    role: 'Enterprise Sales',
    result: '260% of a $5M quota, securing MVP. Two new Fortune 500 logos.',
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
  <div className="min-h-screen pt-32">
    <section className="wrap about-intro">
      <div><h1 className="display">A closer.<br />In your corner.</h1><p className="about-lead">I’m Jeff Meyers. I spent two decades selling enterprise software. Now I help experienced people tell the story of what they can do.</p><p>You know your career better than anyone. That doesn’t make it easy to explain. We find the deals, decisions and turning points that matter, then connect them to the role you want.</p><p>I have an MIT degree in AI &amp; business strategy. I also build my own apps, agents and automations. The research systems I teach are part of my own work.</p><Link to="/contact#book" className="btn-primary">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <img src="/coach-photo.jpg" alt="Jeff Meyers at the beach in his Career Maniacs shirt" width="800" height="1666" />
    </section>
    <section className="section-space solid-section"><div className="wrap"><h2 className="headline">The work behind the coaching.</h2><p className="section-deck">Two decades in enterprise sales. Twelve President’s Club wins. Four AE of the Year awards. Two Rookie of the Year awards.</p><div className="career-record">{proofRows.map(row => <article key={row.company}><h3>{row.company}</h3><p className="muted">{row.role}</p><p>{row.result}</p></article>)}</div><p className="record-note">Jeff’s career experience. These companies are former employers, not endorsements of Career Maniacs.</p></div></section>
    <section className="section-space about-method"><div className="wrap"><h2 className="headline">Why Maniacs?</h2><div className="about-method-copy"><p>I surf. I kitesurf. I like finding the edge of what I can do—and pushing it. Out there, you read the conditions, trust the reps and commit. The ocean gives honest feedback.</p><p>That’s the spirit behind Career Maniacs. A Maniac brings an uncommon level of curiosity, preparation and commitment to something that matters. Cares deeply. Does the reps. Has the nerve to make a move.</p><p>Your next role deserves that energy. We dig into the company, challenge the easy answers and find the story only you can tell. Then we practice until you can handle the questions you didn’t see coming. Read the room. Trust your preparation. Go all in.</p></div></div></section>
    <section className="section-space solid-section"><div className="wrap"><h2 className="headline">Bring the question that’s keeping you up.</h2><p className="section-deck">Fifteen minutes. You talk, I listen, and you leave with at least one thing you can use, whether we work together or not.</p><div className="actions"><Link to="/contact#book" className="btn-primary">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link><CalendlyButton /></div></div></section>
  </div>
)
export default AboutPage
