import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import criteriaRaw from '@/data/scoring-criteria.json';
import type { ScoringCriteria } from '@/lib/types';

export const metadata: Metadata = {
  title: 'About BreachWatch — Who We Are and How We Score',
  description:
    'BreachWatch is an independent cybersecurity comparison site. We explain our scoring methodology, our business model, and why transparent criteria matter for real security decisions.',
};

const allCriteria = criteriaRaw as unknown as ScoringCriteria;

const CATEGORIES = [
  { key: 'vpn' as const, label: 'VPN', href: '/vpn' },
  { key: 'password-manager' as const, label: 'Password Manager', href: '/password-managers' },
  { key: 'antivirus' as const, label: 'Antivirus', href: '/antivirus' },
  { key: '2fa-apps' as const, label: '2FA Apps', href: '/2fa-apps' },
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">

        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-bw-black sm:text-4xl">
              About BreachWatch — Who We Are and How We Score
            </h1>
            <p className="mt-4 text-lg text-bw-text">
              BreachWatch is an independent cybersecurity comparison site. We score VPNs,
              password managers, antivirus software, and 2FA apps using documented,
              weighted criteria. Every score is calculated from the data — no editorial
              adjustments, no paid placements, no advertorials.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10 space-y-12">

          <section>
            <h2 className="mb-4 text-2xl font-bold text-bw-black">Why we exist</h2>
            <p className="mb-3 text-bw-text">
              Most cybersecurity comparison sites are funded by the products they recommend.
              Their rankings reflect affiliate commission rates as much as product quality.
              A VPN that pays a 40% commission will consistently appear at the top of
              lists regardless of whether it is the best choice for the reader.
            </p>
            <p className="mb-3 text-bw-text">
              BreachWatch takes a different approach. Our scores are calculated
              algorithmically from criteria that are published on every comparison page.
              The weights reflect what actually protects users — a VPN&apos;s logging
              policy and jurisdiction matter more than how well it works with Netflix,
              so they carry more weight. Products we have no affiliate relationship with
              (like Mullvad) appear in our rankings based purely on their scores.
            </p>
            <p className="text-bw-text">
              We earn money through affiliate commissions when readers click through to
              products and make a purchase. This creates an incentive we acknowledge
              openly. Our methodology is the mechanism we use to keep that incentive
              from corrupting our rankings. The full details are on our{' '}
              <Link href="/disclosure" className="text-bw-blue underline hover:text-bw-blue-dark">
                disclosure page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-bw-black">Our scoring methodology</h2>
            <p className="mb-6 text-bw-text">
              Each product category has its own set of weighted criteria. The criteria
              and weights are chosen to reflect what matters most for protecting users
              in that category — not what makes for the most impressive spec sheet.
              Scores range from 0 to 10. The overall score is the weighted sum of
              individual criterion scores.
            </p>

            {CATEGORIES.map(({ key, label, href }) => (
              <div key={key} className="mb-8">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-bw-black">{label} criteria</h3>
                  <Link href={href} className="text-sm text-bw-blue hover:text-bw-blue-dark">
                    See {label} comparison →
                  </Link>
                </div>
                <div className="space-y-2">
                  {allCriteria[key].map((c) => (
                    <div key={c.id} className="flex items-start gap-3 rounded-[3px] border border-black/10 bg-bw-light px-4 py-3">
                      <span className="mt-0.5 shrink-0 rounded-[3px] bg-bw-blue/10 px-2 py-0.5 text-xs font-bold text-bw-blue">
                        {c.weight}%
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-bw-black">{c.name}</p>
                        <p className="text-sm text-bw-gray">{c.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-bw-black">Our business model</h2>
            <p className="mb-3 text-bw-text">
              BreachWatch earns revenue through affiliate commissions. When a reader
              clicks a link on this site and purchases a product, we may receive a
              commission from the vendor. This does not increase the price for the buyer.
            </p>
            <p className="mb-3 text-bw-text">
              We disclose every affiliate link using the <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">sponsored</code> link
              relation attribute and a visible tooltip on every CTA button. Every page
              that contains affiliate links includes a prominent disclosure notice.
            </p>
            <p className="text-bw-text">
              We recommend Mullvad VPN despite having no affiliate relationship with
              them, because their logging policy scores 10/10 and they are the most
              transparent VPN provider we are aware of. This is the clearest evidence
              we can offer that our scoring methodology is applied consistently.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-bw-black">What we do not do</h2>
            <ul className="space-y-2 text-bw-text">
              {[
                'We do not accept payment for product placements or rankings.',
                'We do not adjust scores based on affiliate commission rates.',
                'We do not publish sponsored content or advertorials.',
                'We do not store quiz answers or any personally identifiable information.',
                'We do not use cookies for advertising tracking.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 shrink-0 text-green-500" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-bw-black">Data sources</h2>
            <p className="mb-3 text-bw-text">
              Product data is sourced from official vendor websites, privacy policies,
              terms of service, and published independent audit reports. Antivirus
              detection scores are derived from AV-TEST Institute published results
              (av-test.org). VPN audit results are sourced from published audit reports
              (PwC, Cure53, KPMG). Pricing is verified against vendor pricing pages.
            </p>
            <p className="text-bw-text">
              Data is reviewed and updated on an ongoing basis. If you believe a data
              point is incorrect or outdated, contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-bw-black">Contact</h2>
            <p className="text-bw-text">
              For corrections, business enquiries, or press requests, email{' '}
              <a href="mailto:hello@breachwatchsite.com" className="text-bw-blue underline hover:text-bw-blue-dark">
                hello@breachwatchsite.com
              </a>
              . We read all emails but cannot guarantee a response to every message.
            </p>
          </section>

        </article>

        <div className="border-t border-black/10 bg-bw-light px-4 py-8">
          <div className="mx-auto max-w-3xl flex flex-wrap gap-4 text-sm">
            <Link href="/disclosure" className="text-bw-blue hover:text-bw-blue-dark">Affiliate Disclosure →</Link>
            <Link href="/privacy" className="text-bw-blue hover:text-bw-blue-dark">Privacy Policy →</Link>
            <Link href="/quiz" className="text-bw-blue hover:text-bw-blue-dark">Security Quiz →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

