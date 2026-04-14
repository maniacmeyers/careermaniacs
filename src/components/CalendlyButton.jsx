import { Calendar } from 'lucide-react'

const CALENDLY_URL = 'https://calendly.com/jeff-careermaniacs/current_client?hide_gdpr_banner=1&primary_color=ff0007'

const CalendlyButton = ({ className = '' }) => {
  const openCalendly = (e) => {
    e.preventDefault()
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    }
  }

  return (
    <button
      onClick={openCalendly}
      className={`btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white inline-flex items-center space-x-2 group ${className}`}
    >
      <Calendar className="w-5 h-5" />
      <span>Book Your Session</span>
    </button>
  )
}

export default CalendlyButton
