import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Zap, Target } from 'lucide-react'

const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Two Programs. One Outcome: <span className="gradient-text">Undeniable.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            If you want babysitting and platitudes, look elsewhere. If you want offers, impact, and acceleration, 
            pick your weapon below.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" id="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Job Acquisition Plan */}
            <div className="gradient-border rounded-2xl p-8 tilt-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Full Maniac Job Acquisition Plan</h2>
                  <p className="text-3xl font-bold text-primary">$5,000/month</p>
                </div>
              </div>
              
              <p className="text-xl font-semibold text-foreground mb-6">Outcome: From ignored to undeniable.</p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-foreground">What You Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Maniac Method Coaching:</strong> storytelling, communication, mindset, peak performance, paradigm-shifting
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Job Acquisition Strategy:</strong> targeted company/role plans and execution
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Resume & LinkedIn Optimization:</strong> dynamic, ongoing, role-based
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Interview Maniac App:</strong> train like a Navy SEAL for interviews
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>AI-Powered Workflows:</strong> personal branding, company & stakeholder research, custom positioning reports
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>GTM Coaching Elements:</strong> think and present like a revenue architect
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Stealth Differentiators:</strong> my IP (under NDA)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Cadence:</strong> two Zoom coaching sessions/week + daily accountability check-ins
                    </span>
                  </li>
                </ul>
                
                <div className="bg-primary/10 rounded-lg p-4 mt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> When you land your dream role, remaining sessions roll into Maniac GTM Onboarding or credit toward it.
                  </p>
                </div>
              </div>
              
              <Link
                to="/services/job-acquisition"
                className="btn-primary w-full py-4 rounded-lg font-bold text-lg text-white flex items-center justify-center space-x-2"
              >
                <span>Make Yourself the Only Choice</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* GTM Onboarding Plan */}
            <div className="gradient-border rounded-2xl p-8 tilt-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Maniac GTM Onboarding Plan</h2>
                  <p className="text-3xl font-bold text-secondary">$5,000/month</p>
                </div>
              </div>
              
              <p className="text-xl font-semibold text-foreground mb-6">Outcome: From day 1 to President's Club.</p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-foreground">What You Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Maniac Strategic Success Plan:</strong> onboarding → ramp → domination, by week
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>AI-Powered GTM Workflows:</strong> dynamic prospecting, stakeholder intelligence, personal brand flywheel
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Maniac Method Coaching:</strong> storytelling, communication, mindset, performance
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Cadence:</strong> two Zoom coaching sessions/week + daily accountability check-ins
                    </span>
                  </li>
                </ul>
              </div>
              
              <Link
                to="/services/gtm-onboarding"
                className="btn-primary w-full py-4 rounded-lg font-bold text-lg text-white flex items-center justify-center space-x-2"
              >
                <span>Engineer Your Rise</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Stop Playing <span className="gradient-text">Small</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose your path to career domination. Both programs include AI precision, GTM clarity, and daily accountability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white"
            >
              Apply Now
            </Link>
            <Link
              to="/testimonials"
              className="btn-secondary px-8 py-4 rounded-lg font-bold text-lg"
            >
              See Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
