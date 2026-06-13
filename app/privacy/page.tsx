import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'BreachWatch privacy policy: no accounts, no ad trackers, no saved passwords, and clear limits on analytics and affiliate links.',
};

const LAST_UPDATED = '13 June 2026';

const privacyPoints = [
  {
    title: 'No accounts',
    text: 'You can use BreachWatch without signing up, logging in, or giving us an email address.',
  },
  {
    title: 'No saved passwords',
    text: 'Password checks are designed so BreachWatch never receives the full password you type.',
  },
  {
    title: 'No ad tracking',
    text: 'We do not run advertising pixels, retargeting scripts, or cross-site tracking profiles.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-black/10 bg-bw-light px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
              Privacy
            </p>
            <div className="mt-3 max-w-3xl">
              <h1 className="text-[34px] font-bold leading-tight text-bw-black">
                BreachWatch is built to collect as little data as possible.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                Use the site without an account. Check passwords without sending the full
                password to us. Read comparisons without advertising trackers following
                you around the web.
              </p>
              <p className="mt-3 text-[13px] text-bw-gray">Last updated: {LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {privacyPoints.map((point) => (
              <div key={point.title} className="rounded-[3px] border border-black/10 bg-white p-5 shadow-sm">
                <h2 className="text-[18px] font-bold text-bw-black">{point.title}</h2>
                <p className="mt-2 text-[13px] leading-6 text-bw-text">{point.text}</p>
              </div>
            ))}
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-5 pb-14">
          <div className="space-y-5">
            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">What we collect</h2>
              <div className="mt-4 space-y-3 text-[14px] leading-7 text-bw-text">
                <p>
                  BreachWatch does not have user accounts, comments, saved profiles, or a
                  newsletter signup. That means we do not ask for your name, email address,
                  phone number, or login details to use the site.
                </p>
                <p>
                  We use privacy-friendly analytics to understand basic site performance:
                  which pages are visited, what country traffic comes from, and which device
                  type is being used. We use this to improve the site, not to identify you.
                </p>
              </div>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">How the tools handle data</h2>
              <div className="mt-4 space-y-3 text-[14px] leading-7 text-bw-text">
                <p>
                  The password checker hashes your password in the browser first and only
                  sends a short hash prefix for comparison. BreachWatch does not receive or
                  store the full password.
                </p>
                <p>
                  The security quiz is used only to show a recommendation on screen. We do
                  not save your answers to a BreachWatch account or build a personal profile
                  from them.
                </p>
                <p>
                  The password generator, checklists, and VPN need checker run in your
                  browser and do not require an account.
                </p>
              </div>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">Affiliate links</h2>
              <div className="mt-4 space-y-3 text-[14px] leading-7 text-bw-text">
                <p>
                  Some product links are affiliate links. If you click one and buy from the
                  product provider, BreachWatch may earn a commission at no extra cost to
                  you.
                </p>
                <p>
                  The provider may use its own cookies or tracking after you leave
                  BreachWatch. That is controlled by the provider, not by us. We do not sell
                  personal information to affiliate partners.
                </p>
              </div>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">Cookies and third parties</h2>
              <div className="mt-4 space-y-3 text-[14px] leading-7 text-bw-text">
                <p>
                  BreachWatch does not use advertising cookies. Hosting, analytics, security
                  tooling, and product links may involve third-party services that process
                  limited technical data needed to provide the site.
                </p>
                <p>
                  We keep those services limited to what the site actually needs: hosting,
                  basic analytics, quiz recommendations, breach/password checks, and
                  outbound product links.
                </p>
              </div>
            </section>

            <section className="rounded-[3px] border border-black/10 bg-white p-6">
              <h2 className="text-[22px] font-bold text-bw-black">Your choices</h2>
              <div className="mt-4 space-y-3 text-[14px] leading-7 text-bw-text">
                <p>
                  You can use BreachWatch without creating an account. You can avoid
                  affiliate tracking by not clicking product links. You can also use browser
                  privacy controls to block third-party cookies on destination sites.
                </p>
                <p>
                  If you have a privacy question, contact{' '}
                  <a
                    href="mailto:privacy@breachwatchsite.com"
                    className="text-bw-blue underline hover:text-bw-blue-dark"
                  >
                    privacy@breachwatchsite.com
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/disclosure"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-[13px] font-semibold text-bw-text transition-colors hover:border-bw-blue hover:text-bw-blue"
            >
              Affiliate disclosure -&gt;
            </Link>
            <Link
              href="/how-we-test"
              className="rounded-[3px] border border-black/10 bg-white px-4 py-3 text-[13px] font-semibold text-bw-text transition-colors hover:border-bw-blue hover:text-bw-blue"
            >
              How BreachWatch tests products -&gt;
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
