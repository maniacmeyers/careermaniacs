import { Calendar } from 'lucide-react'

const CALENDLY_URL = 'https://calendly.com/jeff-careermaniacs/current_client?primary_color=00bfa8'

const CalendlyButton = ({ className = '' }) => (
  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`btn-ghost ${className}`}>
    <Calendar className="w-5 h-5" aria-hidden="true" />
    <span>Current client? Book your session</span>
  </a>
)
export default CalendlyButton
