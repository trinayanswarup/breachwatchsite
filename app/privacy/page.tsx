import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'BreachWatch privacy policy. We use Vercel Analytics (cookieless, anonymous). We collect no email addresses, store no personal data, and do not use advertising trackers.',
};

const LAST_UPDATED = '10 June 2025';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">

        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-bw-black sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-bw-gray">Last updated: {LAST_UPDATED}</p>
            <p className="mt-4 text-lg text-bw-text">
              BreachWatch does not collect personal data. We use Vercel Analytics, which
              is cookieless and does not track individual users. We store no email
              addresses, passwords, account information, or quiz answers.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10 space-y-10">

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">What data we collect</h2>
            <p className="mb-3 text-bw-text">
              We collect no personally identifiable information. We do not have an
              account system, email newsletter, or contact form that stores submissions.
            </p>
            <p className="text-bw-text">
              We use <strong>Vercel Analytics</strong> to measure aggregate site traffic.
              Vercel Analytics does not use cookies, does not fingerprint browsers, and
              does not collect IP addresses or device identifiers. It reports anonymised
              aggregate metrics: page views, visitor counts by country and device type,
              and referrer sources. No data that can identify an individual user is
              collected or stored.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">Custom analytics events</h2>
            <p className="mb-3 text-bw-text">
              We track the following custom events via Vercel Analytics to understand
              how readers use the site:
            </p>
            <ul className="space-y-2 rounded-[3px] border border-black/10 bg-bw-light px-5 py-4 text-sm text-bw-text">
              {[
                { event: 'quiz_start', desc: 'Fired when a user begins the security quiz.' },
                { event: 'quiz_complete', desc: 'Fired when a user completes the quiz. Includes anonymised score and recommended category — no answers are transmitted.' },
                { event: 'affiliate_click', desc: 'Fired when a user clicks an affiliate CTA. Includes product name and page path — no personal data.' },
                { event: 'category_view', desc: 'Fired when a user views a category page.' },
                { event: 'comparison_view', desc: 'Fired when a user views a comparison article.' },
              ].map(({ event, desc }) => (
                <li key={event} className="flex items-start gap-3">
                  <code className="mt-0.5 shrink-0 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-mono text-bw-black">
                    {event}
                  </code>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-bw-gray">
              None of these events include user names, email addresses, IP addresses,
              or any other personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">The security quiz</h2>
            <p className="mb-3 text-bw-text">
              The security quiz sends your answers to the Groq API (Groq Inc.,
              San Jose, CA) to generate a personalised security recommendation. Groq
              processes the answers to produce a recommendation and does not store them
              beyond the duration of the API request, per their privacy policy.
            </p>
            <p className="text-bw-text">
              BreachWatch does not store, log, or transmit quiz answers to any other
              party. Answers exist only in your browser and in the transient API
              request to Groq. When you navigate away from the quiz result, they are
              gone.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">Affiliate links</h2>
            <p className="mb-3 text-bw-text">
              Affiliate links on this site include UTM parameters
              (<code className="rounded bg-gray-100 px-1 py-0.5 text-xs">utm_source=breachwatchsite</code>)
              so we can measure which links readers click. This information is processed
              by the destination vendor (e.g. NordVPN, Bitwarden) according to their
              own privacy policies. We do not receive personally identifiable information
              as part of affiliate reporting — only aggregate click and conversion counts.
            </p>
            <p className="text-bw-text">
              All affiliate links are disclosed with{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">rel=&quot;sponsored&quot;</code>{' '}
              and a visible tooltip.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">Cookies</h2>
            <p className="text-bw-text">
              BreachWatch does not set any first-party cookies. Vercel Analytics does
              not use cookies. If you click an affiliate link, the destination website
              may set its own cookies according to its privacy policy — this is outside
              our control and covered by the destination site&apos;s disclosures.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">Third-party services</h2>
            <div className="space-y-3 text-bw-text">
              <p>
                <strong>Vercel</strong> — BreachWatch is hosted on Vercel. Vercel may
                process server logs as part of normal infrastructure operation. See
                Vercel&apos;s privacy policy at vercel.com/legal/privacy-policy.
              </p>
              <p>
                <strong>Groq</strong> — The quiz API route sends quiz answers to Groq
                for AI processing. See Groq&apos;s privacy policy at groq.com/privacy.
              </p>
              <p>
                <strong>Google Fonts / Geist Fonts</strong> — This site uses the Geist
                typeface served via Next.js local font optimisation. No requests are
                made to Google Fonts at runtime.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">Your rights</h2>
            <p className="mb-3 text-bw-text">
              Because we hold no personal data about you, there is nothing to access,
              correct, or delete. If you have a concern about data processing related
              to this site, contact us at the address below.
            </p>
            <p className="text-bw-text">
              If you are in the EU or UK, you have the right to lodge a complaint with
              your national data protection authority if you believe your rights under
              GDPR or UK GDPR have been infringed.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-bw-black">Contact</h2>
            <p className="text-bw-text">
              For privacy enquiries, contact{' '}
              <a href="mailto:privacy@breachwatchsite.com" className="text-bw-blue underline hover:text-bw-blue-dark">
                privacy@breachwatchsite.com
              </a>
              .
            </p>
          </section>

        </article>

        <div className="border-t border-black/10 bg-bw-light px-4 py-8">
          <div className="mx-auto max-w-3xl flex flex-wrap gap-4 text-sm">
            <Link href="/about" className="text-bw-blue hover:text-bw-blue-dark">About BreachWatch →</Link>
            <Link href="/disclosure" className="text-bw-blue hover:text-bw-blue-dark">Affiliate Disclosure →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

