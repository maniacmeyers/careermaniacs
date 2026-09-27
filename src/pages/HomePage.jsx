import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import WaveMotion from '../components/WaveMotion'
import OceanScene from '../components/OceanScene'
import { ProofLedger, ClientQuote, Portrait } from '../components/Proof'
import { TextGradient } from '@/components/ui/text-gradient'

// Illustrative interview answer: the same deal told as a list, then as a story.
const summary = <>
  <p>“In my last role I owned a $1.4M enterprise platform opportunity with a complex buying committee across IT, operations and finance.</p>
  <p>When the deal ran into some budget headwinds late in the quarter, I worked cross-functionally with my manager and our solutions team, handled objections and kept the relationship moving.</p>
  <p>We ultimately closed it, and I finished the year at 112% of quota.”</p>
</>
const story = <>
  <p>“Our champion was ready to sign a $1.4M platform deal, <strong>and</strong> IT had already cleared the security review. We were two weeks from quarter end.</p>
  <p><strong>But</strong> the week before signature, the CFO froze every purchase over $500K. My champion called and said, ‘Let’s park it until next year.’ Another demo was never going to move a CFO. Finance liked the product. The timing was the problem.</p>
  <p><strong>Therefore</strong>, I asked for thirty minutes with the CFO’s team and rebuilt the business case around one number: the cost of waiting. Their support team was losing about $90,000 a month to a manual process we would replace. Six months of waiting cost more than the first year of the contract.</p>
  <p>We walked finance through their own numbers and let them poke holes in the model. They signed eleven days later.</p>
  <p>What I took from it: when a deal stalls, find the person who can say no. Then give them a reason to say yes now.”</p>
</>

const HomePage = () => {
  const [answer, setAnswer] = useState('story')
  return (
    <div className="home-page">
      <section className="ocean-hero">
        <OceanScene src="/ocean-editorial-dawn.webp" fit="hero" />
        <div className="wrap hero-copy">
          <h1>Your next role is a deal.<br /> Work it like one.</h1>
          <p>One-on-one coaching for experienced sellers and sales leaders. Target the companies. Research the room. Tell the story only you can tell. Then own the first 90 days.</p>
          <div className="actions">
            <Link className="btn-primary" to="/contact#book">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link>
            <a className="text-link" href="#programs">See the programs <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <p className="call-takeaway">Fifteen minutes. You leave with one fix you can use in your next interview, whether or not we ever work together.</p>
        </div>
      </section>

      <ProofLedger />

      <section className="story-intro solid-section">
        <div className="wrap intro-layout">
          <h2 className="headline">Your resume isn’t your strongest argument. <TextGradient as="span">The story is.</TextGradient></h2>
          <div className="intro-body"><p>Your resume lists the roles. Your story shows the judgment. What was at stake? What did you do when the easy answer stopped working?</p><p>That matters in an interview and across the table from a buyer. Make the stakes clear. Give them a reason to believe you.</p></div>
        </div>
      </section>

      <section id="method" className="method-section" aria-labelledby="method-title">
        <div className="wave-image" aria-hidden="true" />
        <WaveMotion />
        <div className="wrap method-content">
          <div className="method-heading">
            <TextGradient as="h2" id="method-title">The story is the method.</TextGradient>
            <p>The Maniac Method runs on And, But, Therefore. Their world, the stakes, your decision. It is how a buyer remembers a pitch and how a hiring manager remembers a candidate.</p>
          </div>
        </div>
      </section>

      <section className="answer-section solid-section" aria-labelledby="story-example-title">
        <div className="wrap answer-layout">
          <div>
            <h2 id="story-example-title" className="headline">Hear the difference.</h2>
            <p className="muted measure">The same experience can sound like a list of responsibilities or a decision worth talking about. Flip between them.</p>
            <p className="example-label">Illustrative interview answer. Client results are on the Client stories page.</p>
          </div>
          <div className="answer-demo">
            <div className="answer-switch" role="group" aria-label="Compare interview answers">
              <button type="button" aria-pressed={answer === 'summary'} onClick={() => setAnswer('summary')}>The resume answer</button>
              <button type="button" aria-pressed={answer === 'story'} onClick={() => setAnswer('story')}>The story</button>
            </div>
            <div className="answer-text">
              <div className="answer-sizer" aria-hidden="true">{story}</div>
              <div className="answer-live" aria-live="polite">{answer === 'summary' ? summary : story}</div>
            </div>
            <p className="answer-note">{answer === 'story' ? 'A situation. A real obstacle. A decision you made.' : 'All true. Same deal, same result. Nothing for the listener to hold on to.'}</p>
          </div>
        </div>
      </section>

      <section className="quote-band" id="client-story">
        <ClientQuote quote="Jeff helped me up my storytelling game, start crushing it in interviews, and land an awesome role." author="John Macpherson" title="Data & Analytics Leader" />
      </section>

      <section className="coach-section solid-section">
        <div className="wrap coach-layout">
          <Portrait className="coach-portrait" />
          <div>
            <h2 className="headline">I’ve carried the bag. Now I coach the people who carry it.</h2>
            <p>I’m Jeff Meyers. Two decades in enterprise sales at Palantir, Salesforce, Oracle and ADP. Twelve President’s Club wins.</p>
            <p>I have an MIT degree in AI &amp; business strategy, and I build AI apps, agents and automations every day. Bring the role you want to land or the deal you need to move. We work on what is in front of you.</p>
            <Link className="text-link" to="/about">Meet your coach <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section id="programs" className="offers-section solid-section">
        <div className="wrap">
          <h2 className="headline">Pick the deal you’re working.</h2>
          <Link className="offer-main" to="/services/job-acquisition">
            <div>
              <h3>Land the role.</h3>
              <p className="offer-kind">Interview &amp; Job Acquisition Coaching</p>
              <p className="muted">Three one-on-one sessions a week. Target list, positioning, story development and interview practice with me until you sign.</p>
            </div>
            <div className="offer-price">$5,000<span>/month</span>
              <span className="program-note">Most clients run two to four months. Landing one month sooner usually covers the whole engagement.</span>
              <span className="text-link">Explore the program <ArrowRight size={20} aria-hidden="true" /></span>
            </div>
          </Link>
          <div className="offer-secondary">
            <Link to="/services/gtm-onboarding"><h3>Own your first 90 days.</h3><p className="offer-kind">GTM Onboarding</p><p className="muted">You got the seat. Now hit the number. A 30-60-90 plan, a stakeholder map and prospecting workflows on your real territory. Usually employer-funded.</p><span>$5,000/month <ArrowRight size={18} aria-hidden="true" /></span></Link>
            <Link to="/services/ai-workshop"><h3>Build AI that earns its place.</h3><p className="offer-kind">Maniac AI Workshop</p><p className="muted">Build account research, outreach preparation and connected workflows around your sales process. You keep everything you build. Usually employer-funded.</p><span>$5,000/month standalone · $2,000/month added to either program <ArrowRight size={18} aria-hidden="true" /></span></Link>
          </div>
          <div className="offers-foot">
            <TextGradient className="app-announcement-text">Interview Maniac, the practice app, is in development. Clients get early access when it ships.</TextGradient>
            <p className="team-link">Coaching a whole floor? That is <a href="https://gtmmaniacs.com">GTM Maniacs</a>, the sister company that builds outbound systems and trains BDR and AE teams.</p>
          </div>
        </div>
      </section>

      <section className="closing-ocean">
        <OceanScene src="/ocean-editorial-calm.webp" fit="top" />
        <div className="wrap closing-copy">
          <h2>Your next move. Go all in.</h2>
          <p>Your next role. A deal that’s stuck. An AI workflow worth building. Bring the one you’re ready to work on.</p>
          <Link className="btn-primary" to="/contact#book">Talk to Jeff <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  )
}
export default HomePage
