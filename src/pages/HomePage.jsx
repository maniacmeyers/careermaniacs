import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const steps = [
  ['Position', 'Give them a reason to choose you.', 'Connect your experience to the problem this company needs solved. Build the case for the role you actually want.'],
  ['Story', 'Tell the story only you can tell.', 'Find the turning point in your deals, decisions and difficult moments. Explain what changed because you were there.'],
  ['Close', 'Ask for the next move.', 'Practice the hard questions. Address the concern. Ask for a clear next step. Then do it again with feedback.'],
]

const HomePage = () => {
  const [answer, setAnswer] = useState('story')
  return (
    <div className="home-page">
      <section className="ocean-hero">
        <div className="wrap hero-copy">
          <h1>Stop blending in.<br />Start closing.</h1>
          <p>Interview coaching for sales leaders done sounding like everyone else. Build the story only you can tell. Make the room pay attention.</p>
          <div className="actions">
            <Link className="btn-primary" to="/contact#book">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link>
            <a className="text-link" href="#method">Explore the method <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <p className="call-takeaway">In 15 minutes, you’ll leave with one fix you can use in your next interview, whether or not we work together.</p>
        </div>
      </section>

      <section className="story-intro solid-section">
        <div className="wrap intro-layout">
          <h2 className="headline">Your resume isn’t<br /><span className="muted">your strongest argument.</span></h2>
          <div className="intro-body"><p>You’ve built teams. Closed difficult deals. Made decisions that mattered. A hiring panel needs to understand what changed because you were there.</p><p>We take those moments and turn them into a clear case for your next role. Then we practice saying it out loud.</p></div>
        </div>
      </section>

      <section id="method" className="method-section">
        <div className="wave-image" aria-hidden="true" />
        <div className="wrap method-content">
          <div className="method-heading"><h2>The Maniac<br />Method.</h2><p>Prepare relentlessly. Commit fully. That’s a Maniac.</p></div>
          <div className="method-steps">{steps.map(([title, line, body]) => <article key={title}><h3>{title}<span aria-hidden="true">.</span></h3><p className="step-line">{line}</p><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="answer-section solid-section">
        <div className="wrap answer-layout">
          <div><h2 className="headline">Stop listing duties.<br />Show your judgment.</h2><p className="muted measure">“Tell me about a difficult deal.”<br />The facts matter. So does the way you connect them.</p><p className="example-label">Illustrative interview answer, not a client result.</p></div>
          <div className="answer-demo">
            <div className="answer-switch" role="group" aria-label="Compare interview answers"><button aria-pressed={answer === 'summary'} onClick={() => setAnswer('summary')}>The resume answer</button><button aria-pressed={answer === 'story'} onClick={() => setAnswer('story')}>The story</button></div>
            <div className="answer-text" aria-live="polite">{answer === 'summary' ? <p>“I managed a complex enterprise deal. I worked with stakeholders, handled objections and collaborated with our team to close it.”</p> : <><p>“The buyer wanted to move forward, <strong>and</strong> our technical team had signed off.</p><p><strong>But</strong> finance couldn’t see why this had to happen now. Another demo wouldn’t solve that.</p><p><strong>Therefore</strong>, I brought finance into the conversation and rebuilt the case around the cost of waiting. We agreed on what mattered before asking for the decision.”</p></>}</div>
            <p className="answer-note">{answer === 'story' ? 'A situation. A real obstacle. A decision you made.' : 'A list of responsibilities gives the listener little to remember.'}</p>
          </div>
        </div>
      </section>

      <section className="quote-section solid-section" id="client-story">
        <figure className="wrap"><blockquote>“Jeff helped me up my storytelling game, start crushing it in interviews, and land an awesome role.”</blockquote><figcaption><span><strong>John Macpherson</strong><br /><span className="muted">Data &amp; Analytics Leader</span></span><Link className="text-link" to="/testimonials">Read the client stories <ArrowRight size={18} aria-hidden="true" /></Link></figcaption></figure>
      </section>

      <section className="coach-section solid-section">
        <div className="wrap coach-layout"><div className="coach-image"><img src="/coach-photo.jpg" alt="Jeff Meyers at the beach wearing his Career Maniacs shirt" width="800" height="1666" loading="lazy" /></div><div><h2 className="headline">I’ve carried the bag.<br />Now I’m in your corner.</h2><p>I’m Jeff Meyers. I spent two decades in enterprise sales at companies including Palantir, Salesforce, Oracle and ADP.</p><p>I have an MIT degree in AI &amp; business strategy, and I build AI apps, agents and automations every day.</p><p>I built Career Maniacs to help experienced people make a clearer case for themselves. We work on your actual opportunities, your actual stories and the conversation coming next.</p><Link className="text-link" to="/about">Meet your coach <ArrowRight size={18} aria-hidden="true" /></Link></div></div>
      </section>

      <section className="offers-section solid-section">
        <div className="wrap"><h2 className="headline">Pick your next challenge.</h2>
          <Link className="offer-main" to="/services/job-acquisition"><div><h3>Make yourself hard to ignore.</h3><p>Interview &amp; Job Acquisition Coaching</p><p className="muted">Two 1:1 sessions a week. Positioning, story development and interview practice with Jeff.</p></div><div className="offer-price">$5,000<span>/month</span><span className="text-link">Explore the program <ArrowRight size={20} aria-hidden="true" /></span></div></Link>
          <div className="offer-secondary"><Link to="/services/gtm-onboarding"><h3>Own your first 90 days.</h3><p>GTM Onboarding</p><p className="muted">A plan for the new role, from territory to first wins.</p><span>$5,000/month <ArrowRight size={18} aria-hidden="true" /></span></Link><Link to="/services/ai-workshop"><h3>Put AI to work. Yourself.</h3><p>Maniac AI Workshop</p><p className="muted">Hands-on coaching for your apps, automations and workflows.</p><span>$3,000/month standalone <ArrowRight size={18} aria-hidden="true" /></span></Link></div>
          <p className="team-link">Coaching a whole team? <Link to="/contact#book">Talk to Jeff about corporate GTM &amp; AI.</Link></p>
        </div>
      </section>

      <section className="closing-ocean"><div className="wrap closing-copy"><h2>Your next move.<br />Go all in.</h2><p>Bring the role. Bring the hard question.<br />We’ll decide whether this is the right fit.</p><Link className="btn-primary" to="/contact#book">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link></div></section>
      <aside className="app-note solid-section"><div className="wrap"><p><strong>Interview Maniac is in development.</strong> The method, built for practice between coaching sessions.</p><Link className="text-link" to="/contact#book">Ask about early access <ArrowRight size={16} aria-hidden="true" /></Link></div></aside>
    </div>
  )
}
export default HomePage
