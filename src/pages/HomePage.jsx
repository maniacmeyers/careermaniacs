import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Target, Brain, TrendingUp, Mic, Waves, Sparkles, Quote } from 'lucide-react'
import Reveal from '../components/Reveal'
import OceanSunrise from '../components/OceanSunrise'

const pillars = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: 'Career Storytelling',
    description: 'Answers with teeth — not STAR nursery rhymes. Your track record, told so a hiring team can’t unhear it.'
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: 'Job Acquisition Strategy',
    description: 'Target companies chosen on evidence, stakeholders mapped, every touch planned. Research, precision, execution.'
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'AI Mastery',
    description: 'Workflows built by a coach who’s shipped AI since Salesforce Einstein in 2017 — not borrowed from a YouTube tutorial.'
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: 'GTM Architecture',
    description: 'Walk in with a point of view on the business. Operate like the strategist leadership already trusts.'
  }
]

const audiences = [
  {
    title: 'GTM executives in the interview arena',
    body: 'VPs, CROs, and senior sellers who are done losing offers to weaker candidates with better stories. This is the core of what I do.'
  },
  {
    title: 'Operators who need real AI skills',
    body: 'Not prompts-of-the-week. You’ll build research engines, digital twins, and automations with someone who ships AI daily.'
  },
  {
    title: 'Sellers chasing President’s Club',
    body: 'Sales craft, pipeline discipline, and mindset conditioning from someone who’s stood on that stage twelve times.'
  },
  {
    title: 'Leaders ramping a new GTM seat',
    body: 'Your first 90 days decide your reputation. We engineer onboarding → ramp → domination, week by week.'
  }
]

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* ── ACT I: The Hook ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="aurora w-[36rem] h-[36rem] bg-cyan-500/25 top-[-10%] left-[-8%]"></div>
        <div className="aurora w-[30rem] h-[30rem] bg-emerald-500/20 bottom-[-12%] right-[-6%]" style={{ animationDelay: '-8s' }}></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="slide-up">
            <p className="kicker mb-6 mt-6 sm:mt-0">Executive Career · GTM · AI Coaching</p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.05] text-foreground">
              The offer doesn&rsquo;t go to the best r&eacute;sum&eacute;.
              <br />
              <span className="gradient-text font-display italic">It goes to the best story.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              I coach GTM executives to tell the story that wins the room — then back it with
              AI-powered research, interview reps, and daily accountability. Twenty years of enterprise
              sales at Palantir, Salesforce, and Oracle. Twelve President&rsquo;s Clubs. Shipping AI since 2017.
              That&rsquo;s who is in your corner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
              <Link
                to="/contact#contact-form"
                className="btn-primary px-8 py-4 rounded-xl font-bold text-lg flex items-center space-x-2 group"
              >
                <span>Start Your Story</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary px-8 py-4 rounded-xl text-lg flex items-center space-x-2"
              >
                <span>Meet Your Coach</span>
              </Link>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-4">
                Trusted by sales leaders at
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-foreground/60 font-semibold text-sm sm:text-base">
                <span>VBRICK</span>
                <span className="hidden sm:inline text-border">·</span>
                <span>TitanX</span>
                <span className="hidden sm:inline text-border">·</span>
                <span>Neuron7.ai</span>
                <span className="hidden sm:inline text-border">·</span>
                <span>Splunk</span>
                <span className="hidden sm:inline text-border">·</span>
                <span>Kumo</span>
                <span className="hidden sm:inline text-border">·</span>
                <span>Vibes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT II: The Story Arc (ABT) ─────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-4"><span className="story-marker">And</span></div>
            <p className="font-display text-2xl md:text-4xl text-center text-foreground leading-snug mb-16">
              You have the skills, the track record, and the fire.
            </p>
          </Reveal>

          <Reveal>
            <div className="text-center mb-4"><span className="story-marker">But</span></div>
            <p className="font-display text-2xl md:text-4xl text-center text-foreground leading-snug mb-6">
              Skills alone don&rsquo;t land offers.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed mb-16">
              Hiring teams don&rsquo;t buy the best candidate — they buy the clearest signal of
              <span className="text-foreground font-semibold"> clarity</span>,
              <span className="text-foreground font-semibold"> proof</span>, and
              <span className="text-foreground font-semibold"> fit</span>.
              If your story doesn&rsquo;t carry those three, someone else&rsquo;s will.
            </p>
          </Reveal>

          <Reveal>
            <div className="text-center mb-4"><span className="story-marker">Therefore</span></div>
            <p className="font-display text-2xl md:text-4xl text-center text-foreground leading-snug">
              I built <span className="gradient-text italic">The Maniac Method</span> —
              four disciplines, one unmistakable candidate.
            </p>
          </Reveal>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 90}>
                <div className="tilt-card rounded-2xl p-8 h-full">
                  <div className="text-primary mb-5">{pillar.icon}</div>
                  <h3 className="text-xl mb-3 text-foreground">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Your Coach ─────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal className="order-2 lg:order-1">
              <p className="kicker mb-4">The narrator</p>
              <h2 className="text-3xl md:text-5xl mb-6 text-foreground">
                Coached by someone who&rsquo;s <span className="gradient-text italic">lived the plot</span>
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I&rsquo;m Jeff Meyers. Twenty years selling enterprise software — Palantir, Salesforce,
                  Oracle, ADP — with twelve President&rsquo;s Club wins and four AE of the Year trophies
                  to show for it. I joined Salesforce&rsquo;s Einstein team in 2017 and closed one of the
                  company&rsquo;s first pure AI deals, then went back to MIT for AI strategy and kept building.
                </p>
                <p>
                  I&rsquo;ve sat on both sides of the interview table at the highest level. I know exactly
                  what the room is listening for — and I&rsquo;ll drill it into you with neuroscience-backed
                  mindset work, narrative precision, and AI workflows I build myself at Forgetime.ai.
                </p>
                <p className="text-foreground font-semibold">
                  And I don&rsquo;t stop when you sign. I coach you from onboarding to President&rsquo;s Club.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className="btn-primary px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center space-x-2"
                >
                  <span>Read the Full Story</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2" delay={120}>
              <div className="relative w-full max-w-sm mx-auto lg:ml-auto lg:mr-0">
                <div className="gradient-border rounded-3xl p-2">
                  <img
                    src="/coach-photo.jpg"
                    alt="Jeff Meyers, founder of Career Maniacs"
                    loading="lazy"
                    width="800"
                    height="800"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
                <div className="glass rounded-2xl px-5 py-4 absolute -bottom-6 -left-4 sm:-left-10">
                  <p className="text-2xl font-bold gradient-text leading-none mb-1">12&times;</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">President&rsquo;s Club</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Who I Coach ─────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="kicker mb-4">The cast</p>
              <h2 className="text-3xl md:text-5xl text-foreground">
                Who I <span className="gradient-text italic">coach</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map((audience, index) => (
              <Reveal key={audience.title} delay={index * 80}>
                <div className="glass rounded-2xl p-8 h-full">
                  <h3 className="text-xl text-foreground mb-3">{audience.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{audience.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Snapshot ───────────────────────────── */}
      <section className="py-24 relative" id="services-snapshot">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="kicker mb-4">Choose your chapter</p>
              <h2 className="text-3xl md:text-5xl text-foreground">
                Three ways to work <span className="gradient-text italic">together</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Reveal>
              <div className="gradient-border rounded-2xl p-8 h-full flex flex-col">
                <p className="kicker mb-3 !text-[0.65rem]">Most popular</p>
                <h3 className="text-2xl mb-2 text-foreground">Full Maniac Job Acquisition Plan</h3>
                <p className="text-3xl font-bold gradient-text mb-3">$5,000<span className="text-base text-muted-foreground font-normal">/month</span></p>
                <p className="text-muted-foreground mb-6 flex-none">From ignored to undeniable. Storytelling, targeted job strategy, AI research workflows, interview reps, and daily accountability.</p>
                <div className="mt-auto">
                  <Link to="/services/job-acquisition" className="btn-primary w-full py-3 rounded-xl font-semibold text-center block">
                    Make Yourself the Only Choice
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="tilt-card rounded-2xl p-8 h-full flex flex-col">
                <p className="kicker mb-3 !text-[0.65rem] !text-emerald-300">Day 1 and beyond</p>
                <h3 className="text-2xl mb-2 text-foreground">Maniac GTM Onboarding Plan</h3>
                <p className="text-3xl font-bold gradient-text mb-3">$5,000<span className="text-base text-muted-foreground font-normal">/month</span></p>
                <p className="text-muted-foreground mb-6 flex-none">From day one to President&rsquo;s Club. A week-by-week ramp plan, AI-powered GTM workflows, and a coach in your corner daily.</p>
                <div className="mt-auto">
                  <Link to="/services/gtm-onboarding" className="btn-primary w-full py-3 rounded-xl font-semibold text-center block">
                    Engineer Your Rise
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="tilt-card rounded-2xl p-8 h-full flex flex-col !border-amber-400/30">
                <p className="kicker mb-3 !text-[0.65rem] !text-amber-300">Add-on / standalone</p>
                <h3 className="text-2xl mb-2 text-foreground">Maniac AI Workshop</h3>
                <p className="text-3xl font-bold text-amber-300 mb-3">$3,000<span className="text-base text-muted-foreground font-normal">/month</span></p>
                <p className="text-muted-foreground mb-6 flex-none">Stop watching demos. Build your own AI apps, automations, and agentic systems — hands on keyboard, coached by a builder. Bundle with any plan and save $1,000/mo.</p>
                <div className="mt-auto">
                  <Link
                    to="/services/ai-workshop"
                    className="w-full py-3 rounded-xl font-semibold text-center block text-amber-950"
                    style={{ background: 'linear-gradient(120deg, #fbbf24, #f59e0b)' }}
                  >
                    Start Building
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Interview Maniac teaser ─────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl gradient-border p-10 md:p-16 min-h-[34rem]">
              <OceanSunrise className="absolute inset-0 w-full h-full" />
              {/* scrim keeps copy readable over the bright sunrise */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: 'linear-gradient(100deg, rgba(3,11,22,0.92) 0%, rgba(3,11,22,0.78) 42%, rgba(3,11,22,0.25) 72%, rgba(3,11,22,0.05) 100%)' }}
              ></div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 mb-6">
                  <Waves className="w-4 h-4 text-cyan-300" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">In the lab · Coming soon</span>
                </div>
                <h2 className="text-3xl md:text-5xl text-foreground mb-5">
                  Interview <span className="gradient-text italic">Maniac</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                  An AI-powered practice gym for job interviews. Craft compelling stories with the
                  ABT framework, record your delivery, and get instant, brutally specific feedback —
                  so the real interview feels like your hundredth rep, not your first.
                </p>
                <p className="text-muted-foreground mb-8 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                  <span>Built by Jeff. Battle-tested by clients. Currently in development.</span>
                </p>
                <Link
                  to="/contact#contact-form"
                  className="btn-secondary px-7 py-3.5 rounded-xl inline-flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Early Access</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Proof: pull-quote ───────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <Quote className="w-10 h-10 text-primary/60 mx-auto mb-8" />
            <blockquote className="font-display text-2xl md:text-3xl text-foreground leading-snug italic mb-8">
              &ldquo;With Jeff, it&rsquo;s not just about landing a job; it&rsquo;s about becoming the
              version of yourself that others can&rsquo;t ignore.&rdquo;
            </blockquote>
            <p className="text-muted-foreground mb-10">
              — Justin P.H., Director of Strategic Sales, Neuron7.ai
            </p>
            <Link
              to="/testimonials#testimonials-section"
              className="btn-secondary px-8 py-4 rounded-xl text-lg inline-flex items-center space-x-2"
            >
              <span>Read the Success Stories</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── ACT III: The Call ───────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="aurora w-[28rem] h-[28rem] bg-cyan-500/20 top-[-20%] left-[10%]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="kicker mb-5">Your next chapter</p>
            <h2 className="text-4xl md:text-6xl text-foreground mb-6">
              Every great story has a moment <br className="hidden md:block" />
              <span className="gradient-text italic">the plot turns.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              This is yours. Stop blending in, stop guessing, and start telling the story that
              gets you hired — and promoted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact#contact-form"
                className="btn-primary px-9 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default HomePage
