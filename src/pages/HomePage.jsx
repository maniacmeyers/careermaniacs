import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import WaveMotion from '../components/WaveMotion'
import { TextGradient } from '@/components/ui/text-gradient'

const HomePage = () => {
  const [answer, setAnswer] = useState('story')
  const [textMotionPaused, setTextMotionPaused] = useState(false)
  return (
    <div className="home-page">
      <section className="ocean-hero">
        <div className="wrap hero-copy">
          <h1>Your next role is a deal.<br />Work it like one.</h1>
          <p>Coaching for experienced sales professionals who are done sounding like every other candidate. Target the companies. Research the room. Tell the story only you can tell. Then own the first 90 days.</p>
          <div className="actions">
            <Link className="btn-primary" to="/contact#book">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link>
            <a className="text-link" href="#programs">See the programs <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <p className="call-takeaway">You leave with one fix you can use in your next interview, whether or not we ever work together.</p>
        </div>
      </section>

      <div className="proof-strip wrap">25+ sales professionals coached · 11 weeks to offer, on average · 3 sessions a week, one on one</div>

      <section className="story-intro solid-section">
        <div className="wrap intro-layout">
          <h2 className="headline">Your resume isn’t your strongest argument.<br /><TextGradient as="span" paused={textMotionPaused}>The story is.</TextGradient></h2>
          <div className="intro-body"><p>Your resume lists the roles. Your story shows the judgment. What was at stake? What did you do when the easy answer stopped working?</p><p>That matters in an interview and across the table from a buyer. Make the stakes clear. Give them a reason to believe you.</p></div>
        </div>
      </section>

      <section className="coaching-paths solid-section ocean-rule">
        <div className="wrap"><h2 className="headline">Win the role. Do the work that earns the next one.</h2>
          <div className="path-grid">
            <article><p className="eyebrow">Interview &amp; career coaching</p><h3>Make choosing you the obvious move.</h3><p>Bring the role you want. Build the story that connects your experience to their business. Practice until the hard question stops scaring you.</p><Link className="text-link" to="/services/job-acquisition">Work on your next role <ArrowRight size={18} aria-hidden="true" /></Link></article>
            <article><p className="eyebrow">AI GTM coaching</p><h3>Make AI part of how you sell.</h3><p>Bring a live account or the workflow that eats your week. Build research and prep tools you will use on Monday. You keep the judgment.</p><Link className="text-link" to="/services/ai-workshop">Explore the Maniac AI Workshop <ArrowRight size={18} aria-hidden="true" /></Link></article>
          </div>
        </div>
      </section>

      <section id="method" className="method-section">
        <div className="wave-image" aria-hidden="true" />
        <WaveMotion />
        <div className="wrap method-content">
          <div className="method-heading"><p className="eyebrow">The Maniac Method</p><TextGradient as="h2" paused={textMotionPaused}>The story is the method.</TextGradient><p>And, But, Therefore. Their world, the stakes, your decision. It is how a buyer remembers a pitch and how a hiring manager remembers a candidate. Here is the difference it makes.</p></div>
        </div>
      </section>

      <section className="answer-section solid-section ocean-rule" aria-labelledby="story-example-title">
        <div className="wrap answer-layout">
          <div><h2 id="story-example-title" className="headline">Hear the difference.<br />Remember the story.</h2><p className="muted measure">The same experience can sound like a list of responsibilities or a decision worth talking about. Here’s how the story changes what they hear.</p><p className="example-label">Illustrative interview answer. Client results are on the Testimonials page.</p></div>
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
        <div className="wrap coach-layout"><div className="coach-image"><img src="/coach-photo.jpg" alt="Jeff Meyers at the beach wearing his Career Maniacs shirt" width="800" height="1666" loading="lazy" /></div><div><h2 className="headline">I’ve carried the bag.<br />Now I’m in your corner.</h2><p>I’m Jeff Meyers. I spent two decades in enterprise sales at companies including Palantir, Salesforce, Oracle and ADP.</p><p>I have an MIT degree in AI &amp; business strategy, and I build AI apps, agents and automations every day.</p><p>Career Maniacs is where that sales experience meets hands-on AI work. Bring the deal you need to move or the role you want to land. We work on what is in front of you.</p><Link className="text-link" to="/about">Meet your coach <ArrowRight size={18} aria-hidden="true" /></Link></div></div>
      </section>

      <section id="programs" className="offers-section solid-section">
        <div className="wrap"><h2 className="headline">Pick your next challenge. Make yourself impossible to ignore.</h2>
          <Link className="offer-main" to="/services/job-acquisition"><div><h3>Land the role.</h3><p>Interview &amp; Job Acquisition Coaching</p><p className="muted">Three one-on-one sessions a week. Target list, positioning, story development and interview practice with me until you sign.</p></div><div className="offer-price">$5,000<span>/month</span><span className="program-note">Most clients run two to four months. Landing one month sooner usually covers the whole engagement.</span><span className="text-link">Explore the program <ArrowRight size={20} aria-hidden="true" /></span></div></Link>
          <div className="offer-secondary"><Link to="/services/gtm-onboarding"><h3>Own your first 90 days.</h3><p>GTM Onboarding</p><p className="muted">You got the seat. Now hit the number. A 30-60-90 plan, a stakeholder map and prospecting workflows on your real territory. Usually employer-funded.</p><span>$5,000/month <ArrowRight size={18} aria-hidden="true" /></span></Link><Link to="/services/ai-workshop"><h3>Build AI that earns its place.</h3><p>Maniac AI Workshop</p><p className="muted">Build account research, outreach preparation and connected workflows around your sales process. You keep everything you build. Usually employer-funded.</p><span>$5,000/month standalone · $2,000/month added to either program <ArrowRight size={18} aria-hidden="true" /></span></Link></div>
          <p className="team-link">Coaching a whole floor? That is <a href="https://gtmmaniacs.com">GTM Maniacs</a>, the sister company that builds outbound systems and trains BDR and AE teams.</p>
        </div>
      </section>

      <section className="closing-ocean"><div className="wrap closing-copy"><h2>Your next move.<br />Go all in.</h2><p>Your next role. A deal that’s stuck. An AI workflow worth building.<br />Bring the challenge you’re ready to work on.</p><Link className="btn-primary" to="/contact#book">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link></div></section>
      <aside id="interview-maniac" className="app-note solid-section"><div className="wrap"><div className="app-announcement"><TextGradient paused={textMotionPaused} className="app-announcement-text">Interview Maniac, the practice app, is in development. Clients get early access when it ships.</TextGradient><button className="text-motion-control" type="button" aria-pressed={textMotionPaused} onClick={() => setTextMotionPaused(!textMotionPaused)}>{textMotionPaused ? 'Resume text animation' : 'Pause text animation'}</button></div><Link className="text-link" to="/contact#book">Ask about early access <ArrowRight size={16} aria-hidden="true" /></Link></div></aside>
    </div>
  )
}
export default HomePage
