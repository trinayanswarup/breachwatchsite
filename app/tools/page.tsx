import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Free Cybersecurity Tools | BreachWatch',
  description:
    'Free privacy-first cybersecurity tools from BreachWatch, including a password leak checker and security risk quiz. No account required.',
};

const availableTools = [
  {
    href: '/breach-checker',
    eyebrow: 'Password safety',
    title: 'Password Leak Checker',
    description:
      'Check whether a password appears in known breach data without sending the full password to BreachWatch.',
    proof: 'Uses the Have I Been Pwned Pwned Passwords k-anonymity model.',
    action: 'Check a password',
  },
  {
    href: '/quiz',
    eyebrow: 'Personal risk',
    title: 'Security Risk Quiz',
    description:
      'Answer five practical questions and get a simple recommendation for the security gap to fix first.',
    proof: 'No account required, and quiz answers are not stored.',
    action: 'Take the quiz',
  },
];

const plannedTools = [
  'Password generator',
  'Breach response checklist',
  '2FA recovery checklist',
  'VPN need checker',
];

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
                BreachWatch tools are built for quick decisions: check a password,
                understand your biggest account-security risk, and move straight to the
                next fix. No fake dashboards. No stored quiz history.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-bw-black">Available now</h2>
              <p className="mt-1 text-[13px] text-bw-gray">
                Privacy-first tools already live in the project.
              </p>
            </div>
            <Link
              href="/about"
              className="text-[13px] font-semibold text-bw-blue underline hover:text-bw-blue-dark"
            >
              Read how BreachWatch works
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {availableTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex min-h-[260px] flex-col rounded-[3px] border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-bw-blue hover:shadow-md"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
                  {tool.eyebrow}
                </p>
                <h3 className="mt-3 text-[22px] font-bold text-bw-black group-hover:text-bw-blue">
                  {tool.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-bw-text">
                  {tool.description}
                </p>
                <p className="mt-4 border-l-2 border-bw-blue pl-3 text-[13px] leading-5 text-bw-gray">
                  {tool.proof}
                </p>
                <span className="mt-auto pt-6 text-[13px] font-bold text-bw-blue">
                  {tool.action} -&gt;
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-black/10 bg-bw-light px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 className="text-[22px] font-bold text-bw-black">
                  What gets added next
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-bw-gray">
                  The next tools should stay free, browser-safe, and useful without
                  collecting personal data. That is the line: utility first, no fake
                  risk scoring theater.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {plannedTools.map((tool) => (
                  <div
                    key={tool}
                    className="rounded-[3px] border border-black/10 bg-white p-4"
                  >
                    <p className="text-[14px] font-semibold text-bw-black">{tool}</p>
                    <p className="mt-1 text-[12px] text-bw-gray">
                      Planned as a free BreachWatch utility.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
