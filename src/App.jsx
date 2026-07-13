import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ScrollToHashWrapper from './components/ScrollToHashWrapper'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <Router>
      <ScrollToHashWrapper>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          
          <main className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/job-acquisition" element={<ServiceDetailPage service="job-acquisition" />} />
              <Route path="/services/gtm-onboarding" element={<ServiceDetailPage service="gtm-onboarding" />} />
              <Route path="/services/ai-workshop" element={<ServiceDetailPage service="ai-workshop" />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={
                <div className="min-h-screen pt-24 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h1 className="display mb-4">404</h1>
                    <p className="text-xl text-muted-foreground mb-8">That set rolled through. This page doesn't exist.</p>
                    <Link to="/" className="btn-gold">
                      Back to shore
                    </Link>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </ScrollToHashWrapper>
    </Router>
  )
}

export default App
