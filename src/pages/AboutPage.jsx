import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import CalendlyButton from '../components/CalendlyButton'

const rise = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const proofRows = [
  {
    company: 'Palantir',
    role: 'Commercial Director',
    result: '$8M qualified pipeline in 9 months',
  },
  {
    company: 'Salesforce',
    role: 'Enterprise AE',
    result: "President's Club twice. Joined the Einstein AI push in 2017.",
  },
  {
    company: 'Oracle',
    role: 'Enterprise Sales',
    result: 'Largest cloud deal in Oracle history by license count, FY13',
  },
  {
    company: 'expert.ai',
    role: 'VP Platform Sales',
    result: "$3.1M NLU deal with the world's largest beverage company",
  },
  {
    company: '[24]7.ai',
    role: 'Enterprise Sales',
    result: '260% of a $5M quota. Two new Fortune 500 logos.',
  },
  {
    company: 'ADP',
    role: 'Enterprise Sales',
    result: "6× President's Club",
  },
  {
    company: 'ZOLL',
    role: 'Sales',
    result: 'Rookie of the Year',
  },
]

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-32">
      {/* Hero: photo + story — open to the ocean */}
      <section className="relative py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, oklch(0.10 0.016 250 / 0.85), oklch(0.10 0.016 250 / 0.35) 55%, transparent 78%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Motion.div {...rise} className="lg:col-span-5">
              <img
                src="/coach-photo.jpg"
                alt="Jeff Meyers on the beach at Ponte Vedra, the Atlantic behind him"
                width="800"
                height="800"
                className="w-full h-auto rounded-2xl border"
                style={{ borderColor: 'var(--border)' }}
              />
            </Motion.div>

            <Motion.div {...rise} className="lg:col-span-7">
              <h1 className="display mb-8">
                I'm not a career coach. I'm a closer who teaches.
              </h1>
              <div className="prose-body space-y-5" style={{ color: 'var(--muted-foreground)' }}>
                <p>
                  I spent 20 years selling enterprise software — Palantir, Salesforce,
                  Oracle, ADP, expert.ai, [24]7.ai. Twelve President's Club wins. #1 in
                  the country at 264% of plan. #2 at 230%. Top 5% five straight years.
                  I know exactly what it takes to win a deal, because I spent two
                  decades winning them.
                </p>
                <p>
                  But here's what I kept seeing: sharp, talented people losing offers
                  to weaker candidates who simply told a better story. The interview
                  isn't a test. It's a sales call. The hiring manager is a buyer, your
                  career is the product, and most candidates walk in with no pitch, no
                  discovery, and no close.
                </p>
                <p>
                  So I built Career Maniacs. I teach you to run the interview the way a
                  top-1% seller runs a deal — story first, proof stacked, close asked
                  for. Then I hand you the AI research systems I've been building since
                  Salesforce's Einstein push in 2017, sharpened by an MIT degree in AI
                  and business strategy and my own company, Forgetime.ai.
                </p>
                <p>
                  I live in Ponte Vedra Beach, Florida, a few hundred yards from the
                  Atlantic. The ocean is a good teacher: you don't fight the wave, you
                  read it, position early, and ride it harder than anyone else in the
                  water.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/contact#book" className="btn-gold">
                  <span>Book a 15-minute call</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Career proof */}
      <section className="relative py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Motion.div {...rise} className="lg:col-span-4">
              <h2 className="headline mb-6">The receipts</h2>
              <p className="prose-body" style={{ color: 'var(--muted-foreground)' }}>
                Coaching advice is cheap. Quota retirement isn't. Every method I teach
                came out of a deal I closed — here's where.
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>12×</div>
                  <div className="label-condensed" style={{ color: 'var(--muted-foreground)' }}>President's Club</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>4×</div>
                  <div className="label-condensed" style={{ color: 'var(--muted-foreground)' }}>AE of the Year</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>2×</div>
                  <div className="label-condensed" style={{ color: 'var(--muted-foreground)' }}>Rookie of the Year</div>
                </div>
              </div>
              <div
                className="mt-8 panel p-6"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="font-bold" style={{ color: 'var(--foreground)' }}>
                  MIT degree in AI &amp; business strategy
                </div>
                <p className="text-sm mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
                  And I build AI every day &mdash; I run Forgetime.ai. The research
                  systems I teach are the ones I use, not slideware.
                </p>
              </div>
            </Motion.div>

            <Motion.div {...rise} className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {proofRows.map((row) => (
                  <li
                    key={row.company}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="sm:col-span-3 font-bold" style={{ color: 'var(--foreground)' }}>
                      {row.company}
                    </div>
                    <div className="sm:col-span-3 text-sm sm:pt-1" style={{ color: 'var(--muted-foreground)' }}>
                      {row.role}
                    </div>
                    <div className="sm:col-span-6 sm:pt-0.5" style={{ color: 'var(--foreground)' }}>
                      {row.result}
                    </div>
                  </li>
                ))}
              </ul>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Why Maniacs */}
      <section className="relative py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise} className="panel p-10 sm:p-14 lg:p-16">
            <div className="max-w-3xl">
              <h2 className="headline mb-6">Why "Maniacs"</h2>
              <div className="space-y-5" style={{ color: 'var(--muted-foreground)' }}>
                <p className="prose-body">
                  The method has three parents. Storytelling — because the candidate
                  with the sharpest story wins, not the one with the longest resume.
                  Deal mechanics — discovery, positioning, objection handling, the
                  close — because an interview loop is a sales cycle with a salary
                  attached. And AI — because I've been building with it since 2017,
                  and the candidate who researches like a machine and speaks like a
                  human is unbeatable.
                </p>
                <p className="story-voice text-xl" style={{ color: 'var(--foreground)' }}>
                  Most candidates paddle in circles and hope. Maniacs read the set,
                  pick the wave, and commit.
                </p>
                <p className="prose-body">
                  That commitment is the whole game. Not maniac as in reckless —
                  maniac as in the one person in the interview loop who prepared like
                  the offer was already theirs.
                </p>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* CTA — open to the ocean */}
      <section className="relative py-28">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Motion.div {...rise} className="sunlit max-w-2xl mx-auto">
            <h2 className="headline mb-6">Your next offer is a deal. Let's go win it.</h2>
            <p className="prose-body mx-auto mb-10 text-muted-foreground">
              Fifteen minutes. You talk, I listen, and you leave with at least one
              thing you can use — whether we work together or not.
            </p>
            <Link to="/contact#book" className="btn-gold">
              <span>Book a 15-minute call</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <div className="mt-12">
              <CalendlyButton />
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
