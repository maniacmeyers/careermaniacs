import BrandLogo from './BrandLogo'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// ponytail: flat nav — the hover dropdown was keyboard-dead; service detail
// pages are linked from /services and the footer instead.
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Client stories', path: '/testimonials' },
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
    <nav aria-label="Main navigation" onKeyDown={(event) => { if (event.key === 'Escape') { setIsOpen(false); event.currentTarget.querySelector('[aria-controls="mobile-navigation"]')?.focus() } }}
      className={`site-nav${isScrolled || isOpen ? ' is-scrolled' : ''}`}
    >
      <div className="wrap">
        <div className="flex items-center gap-2 h-20">
          <Link to="/" className="shrink-0 mr-auto" aria-label="Career Maniacs home"><BrandLogo /></Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                className={`label-condensed px-4 py-3 rounded-md transition-colors ${
                  (item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path))
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact#book" className="btn-primary nav-cta">
              Talk to Jeff
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-3 -mr-1 rounded-md text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div id="mobile-navigation" className="lg:hidden pb-6 pt-2">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`label-condensed px-2 py-3 rounded-md ${
                    (item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path))
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact#book" className="btn-primary mt-3">
                Talk to Jeff
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
