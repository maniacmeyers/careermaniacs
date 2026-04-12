import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

const TestimonialsPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  const closeModal = useCallback(() => {
    setSelectedTestimonial(null)
    document.body.style.overflow = ''
    if (triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (!selectedTestimonial) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleKeyDown)

    if (modalRef.current) {
      modalRef.current.focus()
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedTestimonial, closeModal])

  const testimonials = [
    {
      id: 'justin-ph',
      author: 'Justin P. H, Director of Strategic Sales at Neuron7.ai',
      headline: 'A transformative journey that redefined how I view my career, capabilities, and potential.',
      full: `I connected with Jeff in 2023 with the goal of standing out as a top Enterprise Sales candidate in a hyper-competitive market. What I received was far more than I could have anticipated: a transformative journey that redefined how I view my career, my capabilities, and my potential. Jeff doesn't just polish resumes or refine interview techniques—he reshapes how you see yourself. His unique ability to dig deep and uncover the heart of your story is nothing short of remarkable. With Jeff, it's not just about landing a job; it's about becoming the version of yourself that others can't ignore. What sets Jeff apart is his relentless commitment to your success. He approaches every client with the precision of a master strategist and the empathy of a trusted confidant. His insights were so tailored and impactful that it often felt like he knew me better than I knew myself. With Jeff in your corner, you gain not just a coach but a partner who invests wholly in your journey.`
    },
    {
      id: 'charles-n',
      author: 'Charles N, AE at TitanX',
      headline: 'An extraordinary master class in goal setting, faith, and positioning myself in the job market.',
      full: `I reached out to Jeff last year with the relatively modest goal of polishing up my resume and brushing up on interviewing for sales-based roles at large corporations. What I got was: An extraordinary master class in goal setting, the importance of faith, a new perspective on how to position myself in the job market and a lifelong friend with a heart of gold. What makes Jeff stand out is the level of personal investment he puts into each and every client he works with - like a benevolent Dr. House, Jeff will lock on to your "case" with a profound level of focus and insight, which he delivers with a unique blend of compassion and directness. Working with Jeff expanded my faith in myself as well as cultivated an unshakable sense of pronoia - the idea that The Universe is plotting to do me good 🙂`
    },
    {
      id: 'paul-d',
      author: 'Paul D, Regional Sales Manager at Kumo',
      headline: 'One of the most authentic people I know with incredible knowledge and practical guidance.',
      full: `Jeff is one of the most authentic people I know and genuinely seeks to help from his heart. His guidance and advice have been invaluable. He has an incredible knowledge base with a talent for distilling information in a way that is practical and readily adopted. His unhesitating openness to share his personal stories of trial and triumph make him supremely relatable and approachable. This combination of Jeff's knowledge and experience enables him to provide unique insights and instruction. Most importantly, Jeff's level of dedication to all those he helps is reflected by his generous devotion of time and unwavering commitment to their success. As a mentor and friend, I would strongly recommend Jeff to anyone in search of a professional advisor or coach.`
    },
    {
      id: 'justin-h',
      author: 'Justin H, Regional Sales Manager at Splunk',
      headline: 'Incredible impact on my professional development with practical, actionable guidance.',
      full: `Jeff's coaching has had an incredible impactful for my professional development. He provided practical, actionable guidance on pipeline generation, sales processes, and career development, including resume building and interview preparation. Jeff's approach is thoughtful and effective, helping me focus on the areas that would make the biggest difference. What I appreciated most about Jeff's mentorship was his ability to simplify complex topics and provide clear strategies that I could immediately apply. Whether it was improving my discovery process or preparing for a career move, his advice was always practical and results-driven.`
    },
    {
      id: 'john-k',
      author: 'John K, Manager Customer Success at Vibes',
      headline: 'Exactly what I needed during challenging times with thoughtful, sincere coaching.',
      full: `I had the privilege of working with Jeff during a particularly challenging time(2020 and mass layoffs), and his coaching was exactly what I needed. His approach is thoughtful, sincere, and tailored to your unique circumstances. Jeff has a way of helping you focus on what truly matters while giving you the confidence to present your story in the best light. His support went beyond just interview prep—he helped me shift my mindset, stay positive, and see opportunities during a time of uncertainty. If you're looking for someone who genuinely cares about your success and knows how to guide you there, Jeff is the person to turn to.`
    },
    {
      id: 'john-m',
      author: 'John Macpherson, Making data move',
      headline: 'Jeff helped me up my storytelling game, start crushing it in interviews, and land an awesome role.',
      full: `Jeff helped me up my storytelling game, start crushing it in interviews, and land an awesome role. He's a passionate, values-driven professional and person I would recommend to anyone.`
    }
  ]

  const openModal = (testimonial, triggerElement) => {
    triggerRef.current = triggerElement
    setSelectedTestimonial(testimonial)
    document.body.style.overflow = 'hidden'
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Client Results</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Real clients. Real wins. Each card shows the punchline—click to open the full story.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 sm:py-20" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="glass rounded-xl p-4 sm:p-6 cursor-pointer tilt-card min-h-[200px] flex flex-col justify-between"
                onClick={(e) => openModal(testimonial, e.currentTarget)}
                tabIndex={0}
                role="button"
                aria-label={`Open testimonial by ${testimonial.author}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openModal(testimonial, e.currentTarget)
                  }
                }}
              >
                <blockquote className="text-base sm:text-lg font-semibold text-foreground leading-relaxed mb-4">
                  "{testimonial.headline}"
                </blockquote>
                <div className="text-sm text-muted-foreground">
                  — {testimonial.author}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-muted/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Join <span className="gradient-text">Them</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            Stop blending in with the crowd. Let's weaponize your career and dominate your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services#services-section"
              className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg"
            >
              View Services
            </Link>
            <Link
              to="/contact#contact-form"
              className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonial by ${selectedTestimonial.author}`}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto outline-none"
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {selectedTestimonial.author}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Close testimonial"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <blockquote className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                "{selectedTestimonial.full}"
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestimonialsPage
