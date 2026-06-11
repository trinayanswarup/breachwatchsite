import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import criteriaRaw from '@/data/scoring-criteria.json';
import type { ScoringCriteria } from '@/lib/types';

export const metadata: Metadata = {
  title: 'How We Test and Score Cybersecurity Tools | BreachWatch',
  description:
    'How BreachWatch scores VPNs, password managers, antivirus software, and 2FA apps using public sources, documented criteria, and transparent limitations.',
};

const allCriteria = criteriaRaw as unknown as ScoringCriteria;

const categories = [
  { key: 'vpn' as const, label: 'VPNs', href: '/vpn' },
  { key: 'password-manager' as const, label: 'Password managers', href: '/password-managers' },
  { key: 'antivirus' as const, label: 'Antivirus', href: '/antivirus' },
  { key: '2fa-apps' as const, label: '2FA apps', href: '/2fa-apps' },
] as const;

const sourceGroups = [
  {
    title: 'Official product sources',
    items: [
      'Product websites and pricing pages',
      'Privacy policies and terms of service',
      'Security whitepapers and audit pages',
      'Official support documentation',
    ],
  },
  {
    title: 'Independent public signals',
    items: [
      'Published third-party audits where available',
      'AV-TEST and other public antivirus lab results where relevant',
      'App-store review patterns and recurring user complaints',
      'Trustpilot and public review themes, treated as signals rather than final proof',
    ],
  },
  {
    title: 'Live security data',
    items: [
      'Have I Been Pwned Pwned Passwords for the password leak checker',
      'Public breach metadata for breach-awareness surfaces',
      'Security news links from public sources, labelled as curated links',
    ],
  },
];

const limitations = [
  'We do not run a VPN speed-test lab.',
  'We do not run a malware testing lab.',
  'We do not claim hands-on testing when a score is based on public research.',
  'We do not treat affiliate commission rates as scoring criteria.',
  'We do not use AI-generated claims as a source of truth.',
];

export default function HowWeTestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-black/10 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
              Methodology
            </p>
            <div className="mt-3 max-w-3xl">
              <h1 className="text-[34px] font-bold leading-tight text-bw-black">
                How BreachWatch tests, researches, and scores security tools.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                BreachWatch is not a lab. Scores are built from documented criteria,
                public sources, product policies, independent reports, pricing, and
                recurring user-review signals. If we did not personally test something,
                this page says so.
              </p>
              <p className="mt-3 text-[13px] text-bw-gray">Last updated: June 2026</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-[22px] font-bold text-bw-black">The short version</h2>
              <p className="mt-3 text-[14px] leading-6 text-bw-text">
                Every product category has weighted criteria. A VPN is judged more on
                logging policy, jurisdiction, audits, and pricing than marketing claims.
                Password managers are judged more on security model, open-source status,
                recovery, and usability. Antivirus pages lean on public lab results and
                user complaint patterns instead of scare copy.
              </p>
              <p className="mt-3 text-[14px] leading-6 text-bw-text">
                AI may help draft or edit page copy, but it is not used as evidence.
                Rankings should come from source-backed product data, not from a model
                inventing confidence.
              </p>
            </div>

            <div className="rounded-[3px] border border-black/10 bg-bw-light p-5">
              <h2 className="text-[18px] font-bold text-bw-black">
                What would change a score
              </h2>
              <ul className="mt-4 space-y-3 text-[14px] leading-6 text-bw-text">
                {[
                  'A new independent security audit.',
                  'A pricing or plan change that affects value.',
                  'A privacy-policy change that affects logging or data sharing.',
                  'A serious breach, incident response, or transparency failure.',
                  'A clear pattern of user complaints about reliability, billing, or support.',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bw-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[22px] font-bold text-bw-black">Sources we check</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {sourceGroups.map((group) => (
                <div key={group.title} className="rounded-[3px] border border-black/10 bg-white p-5">
                  <h3 className="text-[15px] font-bold text-bw-black">{group.title}</h3>
                  <ul className="mt-4 space-y-2 text-[13px] leading-5 text-bw-gray">
                    {group.items.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-bw-light px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-[22px] font-bold text-bw-black">
                  What we do not claim
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-bw-gray">
                  This is the part most affiliate sites hide. BreachWatch should be useful
                  because it is specific and honest, not because it pretends to own a full
                  testing lab.
                </p>
              </div>
              <div className="space-y-3">
                {limitations.map((item) => (
                  <div key={item} className="rounded-[3px] border border-black/10 bg-white p-4">
                    <p className="text-[14px] font-medium text-bw-black">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6">
            <h2 className="text-[22px] font-bold text-bw-black">Published scoring weights</h2>
            <p className="mt-2 text-[14px] leading-6 text-bw-gray">
              These weights are also shown on the category pages. The goal is simple:
              readers should be able to see why a product won.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {categories.map(({ key, label, href }) => (
              <div key={key} className="rounded-[3px] border border-black/10 bg-white p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[16px] font-bold text-bw-black">{label}</h3>
                  <Link
                    href={href}
                    className="shrink-0 text-[12px] font-semibold text-bw-blue hover:text-bw-blue-dark"
                  >
                    View page
                  </Link>
                </div>
                <div className="mt-4 space-y-2">
                  {allCriteria[key].map((criterion) => (
                    <div key={criterion.id} className="flex gap-3 text-[13px]">
                      <span className="w-10 shrink-0 font-bold text-bw-blue">
                        {criterion.weight}%
                      </span>
                      <span className="text-bw-text">{criterion.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
