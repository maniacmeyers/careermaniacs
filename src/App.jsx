import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToHashWrapper from './components/ScrollToHashWrapper'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <Router>
      <ScrollToHashWrapper>
        <div className="min-h-screen bg-background text-foreground">
          {/* Morphing border at top */}
          <div className="morphing-border h-1 w-full"></div>
          
          <Navigation />
          
          <main className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/job-acquisition" element={<ServiceDetailPage service="job-acquisition" />} />
              <Route path="/services/gtm-onboarding" element={<ServiceDetailPage service="gtm-onboarding" />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </ScrollToHashWrapper>
    </Router>
  )
}

export default App
