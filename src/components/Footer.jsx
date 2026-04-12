import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass border-t border-border/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/career-maniacs-logo.png"
                alt="Career Maniacs"
                width="128"
                height="128"
                className="h-32 w-32"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered career storytelling, job acquisition strategy, mindset, and GTM coaching. 
              Stop blending in—go Maniac.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/jeffadammeyers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/Jeffforgetime" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="X (Twitter)">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/job-acquisition#service-detail" className="text-muted-foreground hover:text-primary transition-colors">
                  Job Acquisition Plan
                </Link>
              </li>
              <li>
                <Link to="/services/gtm-onboarding#service-detail" className="text-muted-foreground hover:text-primary transition-colors">
                  GTM Onboarding Plan
                </Link>
              </li>
              <li>
                <Link to="/services#services-section" className="text-muted-foreground hover:text-primary transition-colors">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/testimonials#testimonials-section" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact#contact-form" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Get Started</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>jeff@careermaniacs.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>Schedule a call</span>
              </div>
            </div>
            <Link
              to="/contact#contact-form"
              className="btn-primary inline-block px-4 py-2 rounded-lg font-semibold text-white text-sm transition-all duration-200"
            >
              Apply Now
            </Link>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Career Maniacs. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
