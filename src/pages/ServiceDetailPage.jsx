import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Target, Zap, Clock, Users, Star } from 'lucide-react'

const ServiceDetailPage = ({ service }) => {
  const serviceData = {
    'job-acquisition': {
      title: 'Full Maniac Job Acquisition Plan',
      price: '$5,000/month',
      outcome: 'From ignored to undeniable.',
      icon: <Target className="w-8 h-8" />,
      color: 'primary',
      description: 'Transform your career story and become the obvious choice for your dream role.',
      features: [
        {
          title: 'Maniac Method Coaching',
          description: 'Storytelling, communication, mindset, peak performance, paradigm-shifting'
        },
        {
          title: 'Job Acquisition Strategy',
          description: 'Targeted company/role plans and execution'
        },
        {
          title: 'Resume & LinkedIn Optimization',
          description: 'Dynamic, ongoing, role-based optimization'
        },
        {
          title: 'Interview Maniac App',
          description: 'Train like a Navy SEAL for interviews'
        },
        {
          title: 'AI-Powered Workflows',
          description: 'Personal branding, company & stakeholder research, custom positioning reports'
        },
        {
          title: 'GTM Coaching Elements',
          description: 'Think and present like a revenue architect'
        },
        {
          title: 'Stealth Differentiators',
          description: 'My IP (under NDA)'
        },
        {
          title: 'Cadence',
          description: 'Two Zoom coaching sessions/week + daily accountability check-ins'
        }
      ],
      process: [
        'Initial assessment and goal setting',
        'Career story development and positioning',
        'AI-powered company and role research',
        'Resume and LinkedIn optimization',
        'Interview preparation and practice',
        'Application strategy and execution',
        'Ongoing coaching and accountability'
      ],
      cta: 'Make Yourself the Only Choice'
    },
    'gtm-onboarding': {
      title: 'Maniac GTM Onboarding Plan',
      price: '$5,000/month',
      outcome: 'From day 1 to President\'s Club.',
      icon: <Zap className="w-8 h-8" />,
      color: 'secondary',
      description: 'Engineer your rise from onboarding to top performer with strategic GTM coaching.',
      features: [
        {
          title: 'Maniac Strategic Success Plan',
          description: 'Onboarding → ramp → domination, by week'
        },
        {
          title: 'AI-Powered GTM Workflows',
          description: 'Dynamic prospecting, stakeholder intelligence, personal brand flywheel'
        },
        {
          title: 'Maniac Method Coaching',
          description: 'Storytelling, communication, mindset, performance'
        },
        {
          title: 'Cadence',
          description: 'Two Zoom coaching sessions/week + daily accountability check-ins'
        }
      ],
      process: [
        'Onboarding strategy and 30-60-90 day plan',
        'Stakeholder mapping and relationship building',
        'AI-powered prospecting workflows',
        'Personal brand development',
        'Performance optimization and coaching',
        'Path to President\'s Club planning'
      ],
      cta: 'Engineer Your Rise'
    }
  }

  const data = serviceData[service]

  const colorMap = {
    primary: {
      bgLight: 'bg-primary/20',
      text: 'text-primary',
      bg: 'bg-primary',
    },
    secondary: {
      bgLight: 'bg-secondary/20',
      text: 'text-secondary',
      bg: 'bg-secondary',
    },
  }

  const colors = data ? colorMap[data.color] : null

  if (!data) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="btn-primary px-6 py-3 rounded-lg">
            View All Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative" id="service-detail">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`w-16 h-16 mx-auto mb-6 ${colors.bgLight} rounded-2xl flex items-center justify-center ${colors.text}`}>
            {data.icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{data.title}</span>
          </h1>
          <p className="text-2xl font-bold text-primary mb-4">{data.price}</p>
          <p className="text-xl font-semibold text-foreground mb-6">{data.outcome}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="space-y-6">
            {data.features.map((feature, index) => (
              <div key={index} className="glass rounded-lg p-6 tilt-card">
                <div className="flex items-start space-x-4">
                  <CheckCircle className={`w-6 h-6 ${colors.text} mt-1 flex-shrink-0`} />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">The Process</h2>
          <div className="space-y-4">
            {data.process.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 ${colors.bg} text-white rounded-full flex items-center justify-center text-center font-bold text-sm min-w-[2rem] min-h-[2rem] flex-shrink-0`}>
                  <span className="block text-center leading-none">{index + 1}</span>
                </div>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">2x/week</div>
              <div className="text-muted-foreground">Coaching Sessions</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">Daily</div>
              <div className="text-muted-foreground">Accountability</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">1:1</div>
              <div className="text-muted-foreground">Direct Access to Jeff</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Career?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Stop blending in with the crowd. Let's weaponize your career and dominate your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact#contact-form"
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white flex items-center justify-center space-x-2"
            >
              <span>{data.cta}</span>
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

export default ServiceDetailPage
