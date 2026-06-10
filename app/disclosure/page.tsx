import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'BreachWatch earns commissions on referred purchases. Scores are calculated algorithmically — commissions never affect rankings. We recommend Mullvad with no affiliate deal.',
};

const LAST_UPDATED = '10 June 2025';

const AFFILIATE_PRODUCTS = [
  { name: 'NordVPN', category: 'VPN', status: 'Pending — using PLACEHOLDER' },
  { name: 'ExpressVPN', category: 'VPN', status: 'Pending — using PLACEHOLDER' },
  { name: 'Surfshark', category: 'VPN', status: 'Pending — using PLACEHOLDER' },
  { name: 'Mullvad', category: 'VPN', status: 'No affiliate relationship — recommended on merit alone' },
  { name: 'ProtonVPN', category: 'VPN', status: 'Pending — using PLACEHOLDER' },
  { name: 'Bitwarden', category: 'Password Manager', status: 'Active — bitwarden.com' },
  { name: '1Password', category: 'Password Manager', status: 'Pending — using PLACEHOLDER' },
  { name: 'Dashlane', category: 'Password Manager', status: 'Pending — using PLACEHOLDER' },
  { name: 'NordPass', category: 'Password Manager', status: 'Pending — using PLACEHOLDER' },
  { name: 'Keeper', category: 'Password Manager', status: 'Pending — using PLACEHOLDER' },
  { name: 'Bitdefender', category: 'Antivirus', status: 'Pending — using PLACEHOLDER' },
  { name: 'Malwarebytes', category: 'Antivirus', status: 'Pending — using PLACEHOLDER' },
  { name: 'ESET NOD32', category: 'Antivirus', status: 'Pending — using PLACEHOLDER' },
  { name: 'Norton 360', category: 'Antivirus', status: 'Pending — using PLACEHOLDER' },
  { name: 'Windows Defender', category: 'Antivirus', status: 'No affiliate relationship — free product, links to Microsoft' },
];

export default function DisclosurePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">

        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Affiliate Disclosure
            </h1>
            <p className="mt-3 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
            <p className="mt-4 text-lg text-gray-600">
              BreachWatch earns money when readers click affiliate links and purchase
              products. This page explains exactly how that works, which products we
              have affiliate relationships with, and the mechanism we use to ensure
              commissions do not affect our rankings.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10 space-y-10">

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">What affiliate marketing is</h2>
            <p className="mb-3 text-gray-700">
              When you click a link on BreachWatch to a product page and make a purchase,
              the vendor may pay us a referral commission. This commission is typically a
              percentage of the sale price and is paid by the vendor — it does not
              increase the price you pay.
            </p>
            <p className="text-gray-700">
              Affiliate marketing is a standard business model for comparison and review
              sites. The FTC and UK ASA both require disclosure of these relationships,
              which is why we include disclosure notices on every page that contains
              affiliate links.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              How we prevent commissions from affecting rankings
            </h2>
            <p className="mb-3 text-gray-700">
              Our product scores are calculated algorithmically. Every criterion, its
              weight, and the score for each product are published on the comparison page.
              The overall score is the weighted sum — there is no editorial override.
            </p>
            <p className="mb-3 text-gray-700">
              The clearest evidence of this: <strong>Mullvad VPN scores 7.30/10</strong>{' '}
              and we recommend it for privacy-focused users. We have no affiliate
              relationship with Mullvad — they do not run an affiliate programme. If
              commission rates drove our rankings, Mullvad would not appear on the site.
            </p>
            <p className="text-gray-700">
              Similarly, NordVPN (score 8.05/10) is not our top-rated VPN — ProtonVPN
              (8.25/10) is. NordVPN almost certainly offers a higher affiliate commission
              than ProtonVPN. This does not change their respective scores or rankings.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">How affiliate links are labelled</h2>
            <p className="mb-3 text-gray-700">
              Every affiliate link on this site:
            </p>
            <ul className="space-y-2 text-gray-700">
              {[
                'Uses rel="noopener noreferrer sponsored" — the sponsored attribute signals to browsers and crawlers that the link is commercial.',
                'Shows an "Affiliate link — we may earn a commission" tooltip on hover.',
                'Is preceded by a disclosure notice on the page where it appears.',
                'Includes UTM parameters so we can measure click-through rates.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 shrink-0 text-blue-500" aria-hidden="true">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Affiliate relationships — full list
            </h2>
            <p className="mb-4 text-gray-500 text-sm">
              Products with &quot;Pending&quot; status link to their review page while
              affiliate arrangements are established. No commission is earned on Pending links.
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {AFFILIATE_PRODUCTS.map((p) => (
                    <tr key={p.name} className="bg-white">
                      <td className="px-4 py-2.5 font-medium text-gray-900">{p.name}</td>
                      <td className="px-4 py-2.5 text-gray-500">{p.category}</td>
                      <td className="px-4 py-2.5 text-gray-600">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Questions or concerns</h2>
            <p className="text-gray-700">
              If you believe a recommendation on this site was influenced by commercial
              factors rather than our scoring methodology, or if you have any other
              concern about our disclosure practices, contact us at{' '}
              <a href="mailto:hello@breachwatchsite.com" className="text-blue-600 underline hover:text-blue-800">
                hello@breachwatchsite.com
              </a>
              .
            </p>
          </section>

        </article>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-8">
          <div className="mx-auto max-w-3xl flex flex-wrap gap-4 text-sm">
            <Link href="/about" className="text-blue-600 hover:text-blue-800">About BreachWatch →</Link>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
