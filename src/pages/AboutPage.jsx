import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Target, Brain, Users } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            I'm Not Just a Coach. <br />
            <span className="gradient-text">I'm a Career Architect.</span>
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p className="text-xl">
              I built Career Maniacs because too many talented people get ignored. Companies don't hire "the best"; 
              they hire the boldest story. I teach you to tell the story that sticks, then I back it up with AI-powered 
              research, GTM strategy, and daily accountability.
            </p>
            
            <p className="text-lg">
              My unfair advantage: I don't just use AI—I coach you to wield it. Together we deploy human-validated 
              AI workflows to:
            </p>
            
            <ul className="text-left max-w-2xl mx-auto space-y-3 text-lg">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <span>Map companies, markets, and stakeholders with precision</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <span>Build role-specific positioning reports</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <span>Keep your personal brand dynamic and relevant</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <span>Craft GTM plans that impress leadership from day 1</span>
              </li>
            </ul>
            
            <p className="text-lg">
              I don't stop when you get the job. I coach you from onboarding to President's Club.
            </p>
          </div>
          
          <div className="mt-12">
            <Link
              to="/contact"
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white inline-flex items-center space-x-2"
            >
              <span>Go Maniac. Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mindset Coaching Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-border rounded-2xl p-12 text-center">
            <div className="text-primary mb-6 flex justify-center">
              <Brain className="w-16 h-16" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Mindset Coaching
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p className="text-xl">
                You can't out-strategize a sabotaged mindset. We begin by rewiring the way you think—utilizing 
                neuroscience-backed methods such as cognitive priming, visualization loops, and habit design.
              </p>
              <p className="text-lg">
                This isn't motivation; it's mental conditioning. You'll silence self-doubt, reframe failure into fuel, 
                and develop the kind of unshakable inner architecture that top performers rely on. Because if your 
                brain's not dialed in, none of the rest matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Maniac Method */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="gradient-text">Maniac Method</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A high-impact framework that combines storytelling, strategy, mindset, and AI to weaponize your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass rounded-xl p-8 text-center tilt-card">
              <div className="text-primary mb-4 flex justify-center">
                <Brain className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Mindset Conditioning</h3>
              <p className="text-muted-foreground">
                Neuroscience-backed mental conditioning. Silence self-doubt, reframe failure, build unshakable inner architecture.
              </p>
            </div>

            <div className="glass rounded-xl p-8 text-center tilt-card">
              <div className="text-primary mb-4 flex justify-center">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Career Storytelling</h3>
              <p className="text-muted-foreground">
                Answers with teeth—not STAR nursery rhymes. Learn to tell stories that stick and differentiate.
              </p>
            </div>

            <div className="glass rounded-xl p-8 text-center tilt-card">
              <div className="text-primary mb-4 flex justify-center">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">AI Mastery</h3>
              <p className="text-muted-foreground">
                Use the right tools to out-research and out-position the field. AI workflows that actually work.
              </p>
            </div>

            <div className="glass rounded-xl p-8 text-center tilt-card">
              <div className="text-primary mb-4 flex justify-center">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">GTM Architecture</h3>
              <p className="text-muted-foreground">
                Operate like a strategist leadership trusts. From onboarding to President's Club.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Become <span className="gradient-text">Undeniable</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Stop blending in with the crowd. Let's weaponize your career story and dominate your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact#contact-form"
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg text-white"
            >
              Apply Now
            </Link>
            <Link
              to="/services#services-section"
              className="btn-secondary px-8 py-4 rounded-lg font-bold text-lg"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
