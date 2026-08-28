import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// ponytail: flat nav — the hover dropdown was keyboard-dead; service detail
// pages are linked from /services and the footer instead.
const navItems = [
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Results', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isOpen
          ? 'bg-[var(--bg-deep)]/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center shrink-0" aria-label="Career Maniacs home">
            <img
              src="/career-maniacs-logo.png"
              alt="Career Maniacs"
              width="56"
              height="56"
              className="h-14 w-14 scale-[1.8] origin-left"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                className={`label-condensed px-4 py-3 rounded-md transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact#book" className="btn-gold ml-4 !px-5 !py-2.5 !text-sm">
              Book a call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-3 -mr-1 rounded-md text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`label-condensed px-2 py-3 rounded-md ${
                    location.pathname.startsWith(item.path)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact#book" className="btn-gold mt-3 !py-3">
                Book a call
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
