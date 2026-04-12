import { Link } from 'react-router-dom'

const TermsPage = () => {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: April 11, 2026</p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Agreement</h2>
              <p>
                By using careermaniacs.com or engaging Career Maniacs ("we," "us," "our") for coaching services, you
                agree to these terms. If you don't agree, please don't use the site or our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">The Services</h2>
              <p className="mb-4">
                Career Maniacs provides 1:1 executive career and GTM coaching, including the Full Maniac Job
                Acquisition Plan and the Maniac GTM Onboarding Plan. Coaching typically includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Two Zoom coaching sessions per week</li>
                <li>Daily accountability check-ins (async)</li>
                <li>Written strategy, positioning, and AI-workflow deliverables</li>
              </ul>
              <p className="mt-4">
                Specific scope is agreed in writing with each client before the engagement begins.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Payment</h2>
              <p>
                Our coaching is billed as a monthly retainer in advance. Invoices are due on receipt and late
                payments may result in sessions being paused until the account is current. Payment terms, accepted
                methods, and any exceptions are confirmed before the engagement starts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cancellation</h2>
              <p>
                Either party may end the engagement at any time with written notice. You will not be charged for any
                month that hasn't begun at the time you cancel. Unused sessions within a paid month are not refunded
                but may, at our discretion, be rolled forward or credited toward a different service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
              <p>
                The Maniac Method, frameworks, templates, workflows, and written materials we share with you are
                our intellectual property. You may use them for your own career. You may not resell, republish, or
                teach them to others without our written permission. Work product we create specifically for you
                (your resume, positioning, plans) is yours to use freely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Confidentiality</h2>
              <p>
                What you share with us stays between us. We won't disclose your identity, employer, or the contents
                of our sessions without your permission, except where required by law. Client testimonials are only
                published with explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Guaranteed Outcomes</h2>
              <p>
                Coaching is a partnership. We bring strategy, frameworks, and accountability; you bring the effort
                and execution. We do not guarantee specific job offers, salary increases, promotions, or business
                outcomes. Any examples or testimonials on this site reflect individual experiences, not typical or
                promised results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, our total liability for any claim related to the services is
                limited to the fees you paid us in the three months preceding the claim. We are not liable for
                indirect, incidental, or consequential damages (including lost wages, lost offers, or lost business
                opportunities).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Site Use</h2>
              <p>
                Don't use this site to break the law, scrape content at scale, reverse-engineer its code, or harm
                other users. We may restrict access to anyone who does.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
              <p>
                These terms are governed by the laws of the State of Florida, USA. Any disputes will be resolved
                in the state or federal courts located in Florida.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes</h2>
              <p>
                We may update these terms. When we do, we'll update the "Last updated" date above. Material changes
                will be communicated to active clients directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
              <p>
                Jeff Meyers / Career Maniacs
                <br />
                <a href="mailto:jeff@careermaniacs.com" className="text-primary hover:underline">
                  jeff@careermaniacs.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-16 text-center">
            <Link to="/" className="btn-primary px-8 py-4 rounded-lg font-bold text-white inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsPage
