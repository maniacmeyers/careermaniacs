import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Target, Brain, TrendingUp, Star, Users, Award } from 'lucide-react'

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Career Storytelling",
      description: "Answers with teeth—not STAR nursery rhymes"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Job Acquisition Strategy", 
      description: "Research, precision, execution"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "GTM Architect Coaching",
      description: "Operate like a strategist leadership trusts"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Coaching & Workflows",
      description: "Use the right tools to out-research and out-position the field"
    }
  ]

  const stats = [
    { number: "Clarity", label: "A point of view on the business and the role", icon: <Brain className="w-6 h-6" /> },
    { number: "Proof", label: "Specific wins, receipts, and relevant signals", icon: <Award className="w-6 h-6" /> },
    { number: "Fit", label: "How you reduce risk and create near-term impact", icon: <Target className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm sm:text-base uppercase tracking-widest text-primary font-semibold mb-4 mt-8 sm:mt-0">
              Stop f***ing around with your career.
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Executive Career & </span>
              <span className="gradient-text">AI Coaching</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Most candidates blend in. You? You're about to become unforgettable. I coach ambitious professionals with
              <span className="text-primary font-semibold"> The Maniac Method</span>—a fusion of storytelling, job acquisition strategy,
              AI mastery, and GTM architecture—to weaponize your career and dominate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/contact#contact-form"
                className="btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white flex items-center space-x-2 group"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="btn-secondary px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
              >
                <span>Meet Your Coach</span>
              </Link>
            </div>

            {/* Social proof bar */}
            <div className="mb-12">
              <p className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Trusted by sales leaders at
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-foreground/70 font-semibold text-sm sm:text-base">
                <span>VBRICK</span>
                <span className="hidden sm:inline text-border">•</span>
                <span>TitanX</span>
                <span className="hidden sm:inline text-border">•</span>
                <span>Neuron7.ai</span>
                <span className="hidden sm:inline text-border">•</span>
                <span>Kumo</span>
                <span className="hidden sm:inline text-border">•</span>
                <span>Vibes</span>
              </div>
            </div>

            {/* What Hiring Teams Actually Want */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center text-foreground mb-8">What hiring teams actually want</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-lg p-6 text-center tilt-card">
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold gradient-text mb-3">{stat.number}</div>
                  <div className="text-muted-foreground text-sm leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Meet Your Coach */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Your <span className="gradient-text">Coach</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm not just another career coach throwing around buzzwords. I'm a career architect who's built 
                  a system that turns talented professionals into undeniable candidates.
                </p>
                <p>
                  My approach combines neuroscience-backed mindset conditioning, AI-powered research workflows, 
                  and GTM strategy that makes leadership take notice from day one.
                </p>
                <p>
                  I don't stop when you get the job. I coach you from onboarding to President's Club, because 
                  landing the role is just the beginning.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white inline-flex items-center space-x-2"
                >
                  <span>Learn More About The Method</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                <div className="gradient-border rounded-2xl p-2">
                  <img
                    src="/coach-photo.jpg"
                    alt="Jeff Meyers, Career Maniacs Coach"
                    loading="lazy"
                    width="800"
                    height="800"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Career Maniacs Different */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Makes Career Maniacs <span className="gradient-text">Different</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground mb-8">
                <strong>And:</strong> You've got the skills, the track record, the fire.
              </p>
              <p className="text-xl text-muted-foreground mb-8">
                <strong>But:</strong> Skills alone don't land jobs, build pipelines, or scale careers.
              </p>
              <p className="text-xl text-muted-foreground mb-12">
                <strong>Therefore:</strong> I created The Maniac Method—a high-impact framework that combines:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-xl p-8 text-center tilt-card glow-hover">
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-20 relative" id="services-snapshot">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Services</span> Snapshot
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job Acquisition Plan */}
            <div className="gradient-border rounded-xl p-8 tilt-card">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Full Maniac Job Acquisition Plan</h3>
              <p className="text-3xl font-bold text-primary mb-4">$5,000/month</p>
              <p className="text-muted-foreground mb-6">From ignored to undeniable.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Maniac Method Coaching: storytelling, communication, mindset</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Job Acquisition Strategy: targeted company/role plans</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">AI-Powered Workflows: research, positioning, branding</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">2×/week coaching + daily accountability</span>
                </li>
              </ul>
              <Link
                to="/services/job-acquisition"
                className="btn-primary w-full py-3 rounded-lg font-semibold text-white text-center block"
              >
                Make Yourself the Only Choice
              </Link>
            </div>

            {/* GTM Onboarding Plan */}
            <div className="gradient-border rounded-xl p-8 tilt-card">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Maniac GTM Onboarding Plan</h3>
              <p className="text-3xl font-bold text-primary mb-4">$5,000/month</p>
              <p className="text-muted-foreground mb-6">From day 1 to President's Club.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Maniac Strategic Success Plan: onboarding → ramp → domination</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">AI-Powered GTM Workflows: prospecting, intelligence</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Maniac Method Coaching: storytelling, performance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">2×/week coaching + daily accountability</span>
                </li>
              </ul>
              <Link
                to="/services/gtm-onboarding"
                className="btn-primary w-full py-3 rounded-lg font-semibold text-white text-center block"
              >
                Engineer Your Rise
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact#contact-form"
              className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg text-center block sm:inline-block"
            >
              Ready to Stop Playing Small? Apply Today
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Go <span className="gradient-text">Maniac</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Stop blending in. Stop guessing. Stop chasing scraps. I'll coach you—with AI precision and GTM clarity—to land the role and dominate it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact#contact-form"
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white flex items-center justify-center space-x-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/testimonials#testimonials-section"
              className="btn-secondary px-8 py-4 rounded-lg font-bold text-lg"
            >
              See Client Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
