import { Calendar } from 'lucide-react'

// This Calendly event is for existing clients only — new prospects go to
// the contact form (/contact#book).
const CALENDLY_URL = 'https://calendly.com/jeff-careermaniacs/current_client?hide_gdpr_banner=1&primary_color=efc257'

const CalendlyButton = ({ className = '' }) => {
  const openCalendly = (e) => {
    e.preventDefault()
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    }
  }

  return (
    <button onClick={openCalendly} className={`btn-ghost ${className}`}>
      <Calendar className="w-5 h-5" aria-hidden="true" />
      <span>Current client? Book your session</span>
    </button>
  )
}

export default CalendlyButton
