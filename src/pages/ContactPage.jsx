import { submitContact } from '../lib/submitContact'
import { useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import CalendlyButton from '../components/CalendlyButton'

const rise = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const NEED_OPTIONS = [
  'Interview & Job Acquisition',
  'GTM Onboarding',
  'Maniac AI Workshop',
  'Something else',
]

const inputStyle = {
  background: 'var(--input)',
  border: '1px solid var(--border)',
  color: 'var(--foreground)',
}

const inputClass =
  'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow'

const ContactPage = () => {
  // status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const sending = useRef(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending.current) return
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // Honeypot: bots fill it, humans never see it.
    if (data._honey) return

    const newErrors = {}
    if (!data.name?.trim()) newErrors.name = 'Tell me your name.'
    if (!data.email?.trim() || !form.elements.email.validity.valid) newErrors.email = 'Enter a valid email so I can reply.'
    if (!data.message?.trim()) newErrors.message = 'Give me at least a sentence.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      // Send keyboard/screen-reader users straight to the first problem
      form.querySelector(`#${Object.keys(newErrors)[0]}`)?.focus()
      return
    }

    sending.current = true
    setStatus('sending')
    try {
      await submitContact(data)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      sending.current = false
    }
  }

  return (
    <div className="min-h-screen pt-32 contact-page">
      {/* Contact introduction */}
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
            <h1 className="display mb-6">Bring the challenge you’re ready to tackle.</h1>
            <p className="prose-body text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Tell me about the deal, the workflow or the role. I read every
              message myself. I’ll tell you plainly whether I can help. You can also email me directly at{' '}
              <a
                href="mailto:jeff@careermaniacs.com"
                className="underline underline-offset-4"
                style={{ color: 'var(--foreground)' }}
              >
                jeff@careermaniacs.com
              </a>
              .
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Form + next steps */}
      <section id="book" className="relative py-24 scroll-mt-32 bg-background ocean-rule">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <Motion.div {...rise} className="lg:col-span-7">
              <div className="panel p-5 sm:p-10">
                <h2 className="headline-sm mb-2">Book a 15-minute call</h2>
                <p className="mb-8 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Send the form and I will reply within one business day. Fifteen minutes,
                  and you leave with one fix you can use in your next interview
                  or one practical next step for your GTM work, whether or not we work together.
                </p>

                {status === 'success' ? (
                  <div
                    role="status"
                    className="rounded-lg p-6"
                    style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                  >
                    <p className="font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                      Your message was accepted by our email service.
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Jeff will reply with times. Your call is not scheduled yet.
                    </p>
                  </div>
                ) : (
                  <form aria-busy={status === 'sending'} onSubmit={handleSubmit} className="space-y-6">
                    {/* FormSubmit conventions */}
                    <input type="hidden" name="_subject" value="New Career Maniacs inquiry" />
                    <input
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ display: 'none' }}
                    />

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={inputClass}
                        style={inputStyle}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm" style={{ color: 'var(--gold)' }}>{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        aria-invalid={errors.email ? 'true' : undefined}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={inputClass}
                        style={inputStyle}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm" style={{ color: 'var(--gold)' }}>{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="currentRole"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Current role
                      </label>
                      <input
                        type="text"
                        id="currentRole"
                        name="currentRole"
                        autoComplete="organization-title"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    <div><label htmlFor="careerStage" className="block text-sm font-medium mb-2">Where are you right now?</label><select id="careerStage" name="careerStage" className={inputClass} style={inputStyle} defaultValue=""><option value="">Choose your situation</option>{['Actively interviewing', 'Starting a search', 'Just landed a new role', 'Employed and building AI skills'].map(stage => <option key={stage}>{stage}</option>)}</select></div>

                    <div>
                      <label
                        htmlFor="need"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        What do you need?
                      </label>
                      <select id="need" name="need" className={inputClass} style={inputStyle}>
                        {NEED_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        aria-invalid={errors.message ? 'true' : undefined}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`${inputClass} resize-y min-h-[140px]`}
                        style={inputStyle}
                        placeholder="What role, deal or AI workflow would you like to work on?"
                      ></textarea>
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-sm" style={{ color: 'var(--gold)' }}>{errors.message}</p>
                      )}
                    </div>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="rounded-lg p-4 text-sm"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                      >
                        We couldn’t confirm your submission. Your message is still here. The service may be slow or blocked by your browser. Email Jeff directly, or try again:{' '}
                        <a
                          href="mailto:jeff@careermaniacs.com"
                          className="underline underline-offset-4 font-semibold"
                        >
                          jeff@careermaniacs.com
                        </a>
                      </div>
                    )}

                    <button type="submit" className="btn-gold w-full" disabled={status === 'sending'}>
                      <span>{status === 'sending' ? 'Sending…' : 'Talk to Jeff'}</span>
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
              <p className="mt-8 text-muted-foreground">Coaching a whole floor? That is <a className="underline" href="https://gtmmaniacs.com">GTM Maniacs</a>, the sister company that builds outbound systems and trains BDR and AE teams.</p>
            </Motion.div>

            {/* What happens next */}
            <Motion.div {...rise} className="lg:col-span-5">
              <h2 className="headline-sm mb-6">What you get out of it</h2>
              <ol className="space-y-6 list-decimal list-inside" style={{ color: 'var(--foreground)' }}>
                <li>
                  <span className="font-bold">One fix you can use right away.</span>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    Something you can take into your next interview or your GTM work, whether or
                    not we ever work together.
                  </span>
                </li>
                <li>
                  <span className="font-bold">A closer look at what’s in the way.</span>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    We’ll look at the specific obstacle and where to focus your effort.
                  </span>
                </li>
                <li>
                  <span className="font-bold">A straight answer, either way.</span>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    If I&apos;m the right coach, I&apos;ll say so. If I&apos;m not,
                    I&apos;ll say that too. No pitch, no chase.
                  </span>
                </li>
              </ol>

              <p className="mt-10 prose-body text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Prefer email? Write me at{' '}
                <a
                  href="mailto:jeff@careermaniacs.com"
                  className="underline underline-offset-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  jeff@careermaniacs.com
                </a>
                . Based in Ponte Vedra Beach, Florida. Eastern time.
              </p>

              <div className="mt-10">
                <CalendlyButton />
              </div>
            </Motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
