import { useState } from 'react'
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
  'AI Workshop',
  'Corporate GTM & AI',
  'Interview Maniac early access',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // Honeypot: bots fill it, humans never see it.
    if (data._honey) return

    const newErrors = {}
    if (!data.name?.trim()) newErrors.name = 'Tell me your name.'
    if (!data.email?.trim()) newErrors.email = 'I need an email to reply to.'
    if (!data.message?.trim()) newErrors.message = 'Give me at least a sentence.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/jeff@careermaniacs.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'New Career Maniacs inquiry',
          name: data.name,
          email: data.email,
          currentRole: data.currentRole,
          need: data.need,
          message: data.message,
        }),
      })
      if (!res.ok) throw new Error(`FormSubmit responded ${res.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen pt-32">
      {/* Hero */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div {...rise} className="max-w-3xl">
            <h1 className="display mb-6">Fifteen minutes. Straight answers.</h1>
            <p className="prose-body text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Tell me where you are and where you're trying to land. I read every
              message myself — no assistant, no autoresponder — and I'll tell you
              plainly whether I can help. You can also email me directly at{' '}
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
      <section id="book" className="py-24 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <Motion.div {...rise} className="lg:col-span-7">
              <div className="panel p-8 sm:p-10">
                <h2 className="headline-sm mb-2">Book a 15-minute call</h2>
                <p className="mb-8 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Fill this out and I'll reply with times. No pitch deck, no pressure.
                </p>

                {status === 'success' ? (
                  <div
                    role="status"
                    className="rounded-lg p-6"
                    style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                  >
                    <p className="font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                      Got it. Jeff reads every one — expect a reply within 24 hours.
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Watch your inbox (and spam folder, just in case).
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                        className={inputClass}
                        style={inputStyle}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm" style={{ color: 'var(--gold)' }}>{errors.name}</p>
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
                        className={inputClass}
                        style={inputStyle}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm" style={{ color: 'var(--gold)' }}>{errors.email}</p>
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
                        className={`${inputClass} resize-y min-h-[140px]`}
                        style={inputStyle}
                        placeholder="Where are you now, and where are you trying to land?"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm" style={{ color: 'var(--gold)' }}>{errors.message}</p>
                      )}
                    </div>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="rounded-lg p-4 text-sm"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                      >
                        Something broke on the send. Email me directly instead:{' '}
                        <a
                          href="mailto:jeff@careermaniacs.com"
                          className="underline underline-offset-4 font-semibold"
                        >
                          jeff@careermaniacs.com
                        </a>
                      </div>
                    )}

                    <button type="submit" className="btn-gold w-full" disabled={status === 'sending'}>
                      <span>{status === 'sending' ? 'Sending…' : 'Book a 15-minute call'}</span>
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            </Motion.div>

            {/* What happens next */}
            <Motion.div {...rise} className="lg:col-span-5">
              <h2 className="headline-sm mb-6">What happens next</h2>
              <ol className="space-y-6 list-decimal list-inside" style={{ color: 'var(--foreground)' }}>
                <li>
                  <span className="font-bold">I read it.</span>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    Every message, personally, within 24 hours.
                  </span>
                </li>
                <li>
                  <span className="font-bold">We talk for 15 minutes.</span>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    You tell me the target, I tell you what's between you and it.
                  </span>
                </li>
                <li>
                  <span className="font-bold">You get a straight answer.</span>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    If I'm the right coach, I'll say so. If I'm not, I'll say that too.
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
                . Based in Ponte Vedra Beach, Florida — Eastern time.
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
