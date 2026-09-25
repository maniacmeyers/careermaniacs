import { submitContact } from '../lib/submitContact'
import { useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import CalendlyButton from '../components/CalendlyButton'
import PageHero from '../components/PageHero'
import { Portrait } from '../components/Proof'

const NEED_OPTIONS = [
  'Interview & Job Acquisition',
  'GTM Onboarding',
  'Maniac AI Workshop',
  'Something else',
]

const STAGES = ['Actively interviewing', 'Starting a search', 'Just landed a new role', 'Employed and building AI skills']

const Field = ({ id, label, error, optional, children }) => (
  <div className="field">
    <label htmlFor={id}>{label}{optional && <span className="optional"> (optional)</span>}</label>
    {children}
    {error && <p id={`${id}-error`} className="field-error">{error}</p>}
  </div>
)

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

  const describedBy = (id) => (errors[id] ? `${id}-error` : undefined)

  return (
    <div className="page contact-page">
      <PageHero
        title="Tell me what’s stuck. I’ll tell you straight if I can help."
        image="dawn"
        aside={
          <aside className="contact-card" aria-label="Who reads your message">
            <Portrait className="contact-portrait" eager />
            <p><strong>Jeff Meyers</strong>12× President’s Club. Palantir, Salesforce, Oracle. I read every message myself.</p>
          </aside>
        }
      >
        <p className="page-deck">The role, the deal or the workflow. Send it below or email <a className="inline-link" href="mailto:jeff@careermaniacs.com">jeff@careermaniacs.com</a>. Based in Ponte Vedra Beach, Florida. Eastern time.</p>
      </PageHero>

      <section id="book" className="solid-section section-space ocean-rule">
        <div className="wrap contact-layout">
          <div className="contact-promises">
            <h2 className="headline-sm">What you get from 15 minutes</h2>
            <ol>
              <li><strong>One fix you can use right away.</strong> Something you can take into your next interview or your GTM work, whether or not we ever work together.</li>
              <li><strong>A closer look at what’s in the way.</strong> We look at the specific obstacle and where to focus your effort.</li>
              <li><strong>A straight answer, either way.</strong> If I’m the right coach, I’ll say so. If I’m not, I’ll say that too. No pitch, no chase.</li>
            </ol>
            <CalendlyButton />
          </div>

          <div className="panel contact-form">
            <h2 className="headline-sm">Book a 15-minute call</h2>
            <p className="muted form-intro">Send this and I reply within one business day with times.</p>

            {status === 'success' ? (
              <div role="status" className="form-status">
                <p><strong>Got it. Your message is on its way to Jeff.</strong></p>
                <p className="muted">I’ll reply within one business day with times. Your call is booked once we pick one.</p>
              </div>
            ) : (
              <form aria-busy={status === 'sending'} onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="_subject" value="New Career Maniacs inquiry" />
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

                <div className="field-row">
                  <Field id="name" label="Name" error={errors.name}>
                    <input type="text" id="name" name="name" required autoComplete="name" aria-invalid={errors.name ? 'true' : undefined} aria-describedby={describedBy('name')} />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <input type="email" id="email" name="email" required autoComplete="email" aria-invalid={errors.email ? 'true' : undefined} aria-describedby={describedBy('email')} />
                  </Field>
                </div>
                <div className="field-row">
                  <Field id="currentRole" label="Current role" optional>
                    <input type="text" id="currentRole" name="currentRole" autoComplete="organization-title" />
                  </Field>
                  <Field id="careerStage" label="Where are you right now?" optional>
                    <select id="careerStage" name="careerStage" defaultValue="">
                      <option value="">Choose your situation</option>
                      {STAGES.map(stage => <option key={stage}>{stage}</option>)}
                    </select>
                  </Field>
                </div>
                <Field id="need" label="What do you need?">
                  <select id="need" name="need">
                    {NEED_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </Field>
                <Field id="message" label="Message" error={errors.message}>
                  <textarea id="message" name="message" required rows={5} aria-invalid={errors.message ? 'true' : undefined} aria-describedby={describedBy('message')} placeholder="What role, deal or AI workflow would you like to work on?" />
                </Field>

                {status === 'error' && (
                  <div role="alert" className="form-status">
                    We couldn’t confirm your submission. Your message is still here. The service may be slow or blocked by your browser. Try again, or email me directly at <a className="inline-link" href="mailto:jeff@careermaniacs.com">jeff@careermaniacs.com</a>.
                  </div>
                )}

                <button type="submit" className="btn-primary btn-block" disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Sending…' : 'Request my 15 minutes'}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
        <p className="wrap team-link">Coaching a whole floor? That is <a href="https://gtmmaniacs.com">GTM Maniacs</a>, the sister company that builds outbound systems and trains BDR and AE teams.</p>
      </section>
    </div>
  )
}

export default ContactPage
