import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const deals = [
  ['Oracle', 'Largest cloud deal in Oracle history, by license count.'],
  ['Palantir', 'Two new logos worth $7.63M.'],
  ['expert.ai', '$3.1M ML & NLU deal with the world’s largest beverage company.'],
]
const employers = ['Palantir', 'Salesforce', 'Oracle', 'ADP', 'expert.ai', '[24]7.ai', 'ZOLL']

// Operator proof, set as a ledger: the honors read as one sentence, the deals sit smaller beneath, the employers as a roster.
export function ProofLedger() {
  return (
    <section className="proof-ledger" aria-labelledby="proof-title">
      <div className="wrap">
        <h2 id="proof-title" className="proof-line">
          <span>12× President’s Club.</span> <span>#1 in the country.</span> <span>4× MVP, one for 264% of a $5M plan.</span> <span>2× Rookie of the Year.</span>
        </h2>
        <ul className="deal-list" aria-label="Deals Jeff closed">
          {deals.map(([company, deal]) => <li key={company}><strong>{company}</strong>{deal}</li>)}
        </ul>
        <p className="proof-claim">Your interview is a sales call. Jeff has closed thousands of them.</p>
        <ul className="roster" aria-label="Where Jeff carried a bag">
          {employers.map((name) => <li key={name}>{name}</li>)}
        </ul>
      </div>
    </section>
  )
}

export function ClientQuote({ quote, author, title, link = true }) {
  return (
    <figure className="client-quote wrap">
      <blockquote>“{quote}”</blockquote>
      <figcaption>
        <span><strong>{author}</strong><span className="muted">{title}</span></span>
        {link && <Link className="text-link" to="/testimonials">Read the client stories <ArrowRight size={18} aria-hidden="true" /></Link>}
      </figcaption>
    </figure>
  )
}

export function Portrait({ className = '', eager = false }) {
  return (
    <picture className={`portrait ${className}`}>
      <source type="image/webp" srcSet="/coach-photo-480.webp 480w, /coach-photo-800.webp 800w" sizes="(max-width: 800px) 60vw, 360px" />
      <img src="/coach-photo.jpg" alt="Jeff Meyers at the beach in his Career Maniacs shirt" width="800" height="1666" loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </picture>
  )
}
