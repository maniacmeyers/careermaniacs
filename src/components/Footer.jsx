import { Link } from 'react-router-dom'
import { Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border mt-24 bg-[var(--bg-deep)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10">
          <div className="space-y-4 max-w-sm">
            <img
              src="/career-maniacs-logo.png"
              alt="Career Maniacs"
              width="80"
              height="80"
              className="h-20 w-20"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Interview coaching for GTM executives, sales and AI coaching, and
              corporate GTM enablement — from a coach who carried the bag for
              two decades. Ponte Vedra Beach, Florida.
            </p>
            <div className="flex pt-1">
              <a
                href="https://www.linkedin.com/in/jeffadammeyers/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 -ml-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Jeff Meyers on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Jeffforgetime"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Jeff Meyers on X"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <p className="label-condensed text-muted-foreground">Coaching</p>
            <ul>
              <li><Link to="/services/job-acquisition" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">Interview &amp; Job Acquisition</Link></li>
              <li><Link to="/services/gtm-onboarding" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">GTM Onboarding</Link></li>
              <li><Link to="/services/ai-workshop" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">Maniac AI Workshop</Link></li>
              <li><Link to="/services" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">All services</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-sm">
            <p className="label-condensed text-muted-foreground">Career Maniacs</p>
            <ul>
              <li><Link to="/about" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">About Jeff</Link></li>
              <li><Link to="/testimonials" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">Client results</Link></li>
              <li><Link to="/contact#book" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">Book a call</Link></li>
              <li>
                <a href="mailto:jeff@careermaniacs.com" className="inline-block py-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  jeff@careermaniacs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Career Maniacs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="py-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="py-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
