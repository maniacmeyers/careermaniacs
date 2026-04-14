import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Target, Zap, Cpu, Clock, Users, Star, Wrench, DollarSign } from 'lucide-react'
import CalendlyButton from '../components/CalendlyButton'

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
      cta: 'Make Yourself the Only Choice',
      stats: [
        { icon: <Clock className="w-8 h-8 text-primary" />, value: '2x/week', label: 'Coaching Sessions' },
        { icon: <Users className="w-8 h-8 text-primary" />, value: 'Daily', label: 'Accountability' },
        { icon: <Star className="w-8 h-8 text-primary" />, value: '1:1', label: 'Direct Access to Jeff' },
      ]
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
      cta: 'Engineer Your Rise',
      stats: [
        { icon: <Clock className="w-8 h-8 text-secondary" />, value: '2x/week', label: 'Coaching Sessions' },
        { icon: <Users className="w-8 h-8 text-secondary" />, value: 'Daily', label: 'Accountability' },
        { icon: <Star className="w-8 h-8 text-secondary" />, value: '1:1', label: 'Direct Access to Jeff' },
      ]
    },
    'ai-workshop': {
      title: 'Maniac AI Workshop',
      price: '$3,000/month standalone · $7,000/month bundled',
      outcome: 'You walk away with working AI you built yourself.',
      icon: <Cpu className="w-8 h-8" />,
      color: 'tertiary',
      description: 'Stop watching AI demos. Start building your own apps, automations, and workflows — hands-on, with a coach who\'s shipped AI since Salesforce Einstein in 2017 and builds daily at Forgetime.ai.',
      features: [
        {
          title: 'Digital Twin Setup & Orchestration',
          description: 'Build your AI alter ego that researches, drafts, and executes on your behalf — while you sleep'
        },
        {
          title: 'Prospecting & Outreach Automation',
          description: 'Kill manual grunt work. Build the machine that finds, qualifies, and reaches your targets at scale'
        },
        {
          title: 'Research & Intelligence Workflows',
          description: 'Pull signal from noise. Automated company research, stakeholder mapping, and competitive intel'
        },
        {
          title: 'Personal Brand Content Engines',
          description: 'Automate the content flywheel while keeping your authentic voice — LinkedIn, thought leadership, and beyond'
        },
        {
          title: 'GTM Dashboards & Reporting',
          description: 'Real-time visibility into pipeline, activity, and the metrics that actually matter'
        },
        {
          title: 'Fully Agentic Systems',
          description: 'Wire it all together — apps, automations, and workflows operating as one coordinated system'
        }
      ],
      process: [
        'Identify your highest-value AI use case',
        'Design the architecture and workflow together',
        'Build it — hands on keyboard, not slides',
        'Test, iterate, and harden the system',
        'Deploy and integrate into your daily workflow',
        'Document and train you to extend it independently'
      ],
      cta: 'Start Building',
      stats: [
        { icon: <Wrench className="w-8 h-8 text-amber-500" />, value: 'Hands-On', label: 'You Build It, You Own It' },
        { icon: <DollarSign className="w-8 h-8 text-amber-500" />, value: '$3K/mo', label: 'Standalone or Bundle & Save' },
        { icon: <Star className="w-8 h-8 text-amber-500" />, value: '1:1', label: 'Direct Access to Jeff' },
      ]
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
    tertiary: {
      bgLight: 'bg-amber-500/20',
      text: 'text-amber-500',
      bg: 'bg-amber-500',
    },
  }

  const colors = data ? colorMap[data.color] : null

  if (!data) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
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
    <div className="min-h-screen pt-24">
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

      {/* Pricing Section (AI Workshop only) */}
      {service === 'ai-workshop' && (
        <section className="py-20 bg-muted/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="glass rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Standalone</h3>
                <p className="text-4xl font-bold text-amber-400 mb-4">$3,000<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
                <p className="text-muted-foreground">Available to anyone, anytime. No prerequisites.</p>
              </div>
              <div className="glass rounded-xl p-8 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Save $1,000/mo
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Bundled</h3>
                <p className="text-4xl font-bold text-amber-400 mb-4">$7,000<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
                <p className="text-muted-foreground">Add to Job Acquisition or GTM Onboarding. You choose which base plan elements get condensed to make room.</p>
              </div>
            </div>
            <div className="mt-8 bg-amber-500/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> AI Workshop is available while in active contract. What you build is yours — what we teach stays under NDA.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {data.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Client Booking */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-2xl p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Already a <span className="gradient-text">Maniac</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Book your next session directly. No back-and-forth.
            </p>
            <CalendlyButton />
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
