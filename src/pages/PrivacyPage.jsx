import { Link } from 'react-router-dom'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: September 11, 2026</p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Who We Are</h2>
              <p>
                Career Maniacs is operated by Jeff Meyers ("we," "us," or "our"). This policy explains what
                information we collect when you visit <strong>careermaniacs.com</strong> or contact us, how we use it,
                and the choices you have. Questions? Email{' '}
                <a href="mailto:jeff@careermaniacs.com" className="text-primary hover:underline">
                  jeff@careermaniacs.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              <p className="mb-4">
                When you submit a form on this site, we receive the information you provide:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name and email address</li>
                <li>Your current role and the service you're interested in</li>
                <li>Career goals, challenges, and timeline you share in the form</li>
              </ul>
              <p className="mt-4">
                The site uses Apollo visitor tracking. Our hosting provider may also process technical information
                such as IP addresses, browser details and request timestamps to operate and secure the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use It</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To reply to your inquiry and schedule a conversation</li>
                <li>To understand your goals so we can recommend the right service</li>
                <li>To send occasional follow-ups related to your application</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or trade your information. We do not add you to marketing lists without your
                explicit opt-in.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Who We Share It With</h2>
              <p>
                <strong>FormSubmit</strong> processes contact form submissions and emails them to our
                <strong> Microsoft 365</strong> mailbox. <strong>Vercel</strong> hosts the site.
                <strong> Apollo</strong> provides visitor tracking. If you follow our booking link,
                <strong> Calendly</strong> processes the scheduling information you provide there.
                These services process information under their respective privacy terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
              <p>
                We keep inquiry data for up to 24 months after our last meaningful contact with you. You can ask
                us to delete your information sooner at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
              <p className="mb-4">
                Depending on where you live (including under GDPR in the EU/UK and CCPA in California), you may have
                the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to or restrict how we use it</li>
                <li>Opt out of any future marketing communications</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email{' '}
                <a href="mailto:jeff@careermaniacs.com" className="text-primary hover:underline">
                  jeff@careermaniacs.com
                </a>{' '}
                and we'll respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
              <p>
                This site is not directed at children under 16 and we do not knowingly collect information from them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
              <p>
                If we materially change this policy, we'll update the "Last updated" date above. Continued use of the
                site after changes means you accept the updated policy.
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

export default PrivacyPage
