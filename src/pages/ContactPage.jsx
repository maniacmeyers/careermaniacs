import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    // Allow Netlify to handle form submission in production.
    // Only prevent default in development for testing. Success state is
    // intentionally persistent — no auto-dismiss — so users on slow
    // connections or mobile don't miss the confirmation.
    if (window.location.hostname === 'localhost') {
      e.preventDefault()
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Go <span className="gradient-text">Maniac</span>?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stop blending in. Stop guessing. Stop chasing scraps. I'll coach you—with AI precision and GTM clarity—to land the role and dominate it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center space-x-2 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span>2×/week coaching</span>
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span>Daily accountability</span>
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span>AI workflows you will actually use</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 gradient-text" id="contact-form">Apply Now</h2>
              <p className="text-muted-foreground mb-8">
                Ready to transform your career? Fill out the form below and let's discuss how The Maniac Method can weaponize your career story.
              </p>
              
              {isSubmitted && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 text-primary">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Application submitted successfully!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    I'll review your application and get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="currentRole" className="block text-sm font-medium text-foreground mb-2">
                    Current Role/Title *
                  </label>
                  <input
                    type="text"
                    id="currentRole"
                    name="currentRole"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Senior Sales Manager"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Service Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="job-acquisition">Full Maniac Job Acquisition Plan — $5,000/mo</option>
                    <option value="gtm-onboarding">Maniac GTM Onboarding Plan — $5,000/mo</option>
                    <option value="ai-workshop">Maniac AI Workshop — $3,000/mo</option>
                    <optgroup label="Bundle & Save $1,000/mo">
                      <option value="job-acquisition-ai-workshop">Job Acquisition + AI Workshop — $7,000/mo</option>
                      <option value="gtm-onboarding-ai-workshop">GTM Onboarding + AI Workshop — $7,000/mo</option>
                    </optgroup>
                    <option value="consultation">Initial Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-foreground mb-2">
                    Career Goals & Challenges *
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    required
                    rows={7}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y min-h-[160px]"
                    placeholder="Tell me about your career goals, current challenges, and what you're looking to achieve..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready to start immediately</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 rounded-lg font-bold text-lg text-white flex items-center justify-center space-x-2 group"
                >
                  <span>Submit Application</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground">jeff@careermaniacs.com</p>
                      <p className="text-sm text-muted-foreground">I'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Schedule a Call</h4>
                      <p className="text-muted-foreground">Book a discovery call</p>
                      <p className="text-sm text-muted-foreground">15-minute career assessment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground">What Happens Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Application Review</h4>
                      <p className="text-sm text-muted-foreground">I'll review your application and career goals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Discovery Call</h4>
                      <p className="text-sm text-muted-foreground">15-minute call to assess fit and answer questions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Program Start</h4>
                      <p className="text-sm text-muted-foreground">Begin your transformation with The Maniac Method</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-3 gradient-text">Just Have a Question?</h3>
                <p className="text-muted-foreground mb-4">
                  Not ready to apply but want to chat? Email me directly and I'll get back to you within 24 hours.
                </p>
                <a
                  href="mailto:jeff@careermaniacs.com"
                  className="btn-secondary inline-block px-6 py-3 rounded-lg font-semibold"
                >
                  jeff@careermaniacs.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
