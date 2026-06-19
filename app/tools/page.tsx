import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HomepageTools from '@/components/HomepageTools';

export const metadata: Metadata = {
  title: 'Free Cybersecurity Tools | CipherCheck',
  description:
    'Free browser-based security tools from CipherCheck: DNS leak test, password strength checker, and Have I Been Pwned checker. No account required.',
};

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-black/10 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
              Free security tools
            </p>
            <div className="mt-3 max-w-3xl">
              <h1 className="text-[34px] font-bold leading-tight text-bw-black">
                Practical cybersecurity checks without accounts, paywalls, or scare tactics.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                Three browser-based tools you can run immediately. No stored data, no fake dashboards.
              </p>
            </div>
          </div>
        </section>

        <HomepageTools />
      </main>
      <Footer />
    </div>
  );
}
