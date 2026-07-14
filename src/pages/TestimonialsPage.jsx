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

// The featured quote closed the deal: John landed the role.
const featured = {
  author: 'John Macpherson',
  title: 'Making data move',
  quote:
    "Jeff helped me up my storytelling game, start crushing it in interviews, and land an awesome role. He's a passionate, values-driven professional and person I would recommend to anyone.",
}

const testimonials = [
  {
    id: 'justin-ph',
    author: 'Justin P. H',
    title: 'Director of Strategic Sales at Neuron7.ai',
    quote:
      "I connected with Jeff in 2023 with the goal of standing out as a top Enterprise Sales candidate in a hyper-competitive market. What I received was far more than I could have anticipated: a transformative journey that redefined how I view my career, my capabilities, and my potential. Jeff doesn't just polish resumes or refine interview techniques—he reshapes how you see yourself. His unique ability to dig deep and uncover the heart of your story is nothing short of remarkable. With Jeff, it's not just about landing a job; it's about becoming the version of yourself that others can't ignore. What sets Jeff apart is his relentless commitment to your success. He approaches every client with the precision of a master strategist and the empathy of a trusted confidant. His insights were so tailored and impactful that it often felt like he knew me better than I knew myself. With Jeff in your corner, you gain not just a coach but a partner who invests wholly in your journey.",
  },
  {
    id: 'charles-n',
    author: 'Charles N',
    title: 'AE at TitanX',
    quote:
      'I reached out to Jeff last year with the relatively modest goal of polishing up my resume and brushing up on interviewing for sales-based roles at large corporations. What I got was: An extraordinary master class in goal setting, the importance of faith, a new perspective on how to position myself in the job market and a lifelong friend with a heart of gold. What makes Jeff stand out is the level of personal investment he puts into each and every client he works with - like a benevolent Dr. House, Jeff will lock on to your "case" with a profound level of focus and insight, which he delivers with a unique blend of compassion and directness. Working with Jeff expanded my faith in myself as well as cultivated an unshakable sense of pronoia - the idea that The Universe is plotting to do me good.',
  },
  {
    id: 'paul-d',
    author: 'Paul D',
    title: 'Regional Sales Manager at Kumo',
    quote:
      "Jeff is one of the most authentic people I know and genuinely seeks to help from his heart. His guidance and advice have been invaluable. He has an incredible knowledge base with a talent for distilling information in a way that is practical and readily adopted. His unhesitating openness to share his personal stories of trial and triumph make him supremely relatable and approachable. This combination of Jeff's knowledge and experience enables him to provide unique insights and instruction. Most importantly, Jeff's level of dedication to all those he helps is reflected by his generous devotion of time and unwavering commitment to their success. As a mentor and friend, I would strongly recommend Jeff to anyone in search of a professional advisor or coach.",
  },
  {
    id: 'justin-h',
    author: 'Justin H',
    title: 'Regional Sales Manager at Splunk',
    quote:
      "Jeff's coaching has had an incredible impactful for my professional development. He provided practical, actionable guidance on pipeline generation, sales processes, and career development, including resume building and interview preparation. Jeff's approach is thoughtful and effective, helping me focus on the areas that would make the biggest difference. What I appreciated most about Jeff's mentorship was his ability to simplify complex topics and provide clear strategies that I could immediately apply. Whether it was improving my discovery process or preparing for a career move, his advice was always practical and results-driven.",
  },
  {
    id: 'john-k',
    author: 'John K',
    title: 'Manager Customer Success at Vibes',
    quote:
      "I had the privilege of working with Jeff during a particularly challenging time(2020 and mass layoffs), and his coaching was exactly what I needed. His approach is thoughtful, sincere, and tailored to your unique circumstances. Jeff has a way of helping you focus on what truly matters while giving you the confidence to present your story in the best light. His support went beyond just interview prep—he helped me shift my mindset, stay positive, and see opportunities during a time of uncertainty. If you're looking for someone who genuinely cares about your success and knows how to guide you there, Jeff is the person to turn to.",
  },
]

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen pt-32">
      {/* Hero — open to the ocean */}
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
          <Motion.div {...rise} className="max-w-3xl">
            <h1 className="display mb-6">Client results.</h1>
            <p className="prose-body text-lg" style={{ color: 'var(--muted-foreground)' }}>
              No composites, no first-name-only ghosts. Real clients, real titles,
              full quotes — because a closer shows you the signed deal, not the
              brochure.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Featured: the outcome */}
      <section className="relative py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.figure {...rise} className="panel p-10 sm:p-14 lg:p-16">
            <blockquote className="story-voice text-2xl sm:text-3xl leading-relaxed" style={{ color: 'var(--foreground)' }}>
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <div className="font-bold" style={{ color: 'var(--foreground)' }}>{featured.author}</div>
              <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {featured.title} &middot; Landed the role
              </div>
            </figcaption>
          </Motion.figure>
        </div>
      </section>

      {/* The rest, full quotes */}
      <section className="relative py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {testimonials.map((t, i) => (
              <Motion.figure
                key={t.id}
                {...rise}
                className={`panel p-8 sm:p-10 ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                <blockquote
                  className={`story-voice leading-relaxed ${i === 0 ? 'text-xl sm:text-2xl' : 'text-lg'}`}
                  style={{ color: 'var(--foreground)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <div className="font-bold" style={{ color: 'var(--foreground)' }}>{t.author}</div>
                  <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t.title}</div>
                </figcaption>
              </Motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — open to the ocean */}
      <section className="relative py-28">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Motion.div {...rise} className="sunlit max-w-2xl mx-auto">
            <h2 className="headline mb-6">The next quote on this page could be yours.</h2>
            <p className="prose-body mx-auto mb-10 text-muted-foreground">
              Fifteen minutes on the phone. You&apos;ll leave with one fix you can
              use in your next interview &mdash; whether or not we ever work
              together. And if I can&apos;t help, I&apos;ll tell you that too.
            </p>
            <Link to="/contact#book" className="btn-gold">
              <span>Get your straight answer</span>
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

export default TestimonialsPage
