import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  formatBreachCount,
  formatBreachDate,
  getBreachActionLinks,
  getBreachAdvice,
  getBreachSeverity,
  type HIBPBreach,
} from '@/lib/breaches';

export const metadata: Metadata = {
  title: 'Recent Data Breaches and What To Do Next | BreachWatch',
  description:
    'Track recent public data breach records, exposed data types, affected account counts, and practical next steps.',
};

async function fetchBreaches(): Promise<HIBPBreach[]> {
  try {
    const res = await fetch('https://haveibeenpwned.com/api/v3/breaches', {
      next: { revalidate: 86400 },
      headers: { 'User-Agent': 'BreachWatch/1.0' },
    });

    if (!res.ok) return [];

    const all = (await res.json()) as HIBPBreach[];
    return all
      .sort(
        (a, b) =>
          new Date(b.AddedDate).getTime() - new Date(a.AddedDate).getTime()
      )
      .slice(0, 18);
  } catch {
    return [];
  }
}

function BreachCard({ breach }: { breach: HIBPBreach }) {
  const severity = getBreachSeverity(breach.PwnCount);
  const advice = getBreachAdvice(breach.DataClasses);
  const actionLinks = getBreachActionLinks(breach.DataClasses);
  const visibleClasses = breach.DataClasses.slice(0, 5);
  const remaining = breach.DataClasses.length - visibleClasses.length;

  return (
    <article className="flex flex-col rounded-[3px] border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold leading-tight text-bw-black">
            {breach.Title}
          </h2>
          {breach.Domain && (
            <p className="mt-1 text-[12px] text-bw-gray">{breach.Domain}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-[3px] px-2 py-1 text-[11px] font-bold ${severity.className}`}
        >
          {severity.label}
        </span>
      </div>

      <div className="mt-4 grid gap-3 border-y border-black/10 py-4 text-[13px] sm:grid-cols-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-bw-gray">
            Accounts
          </p>
          <p className="mt-1 font-semibold text-bw-black">{formatBreachCount(breach.PwnCount)}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-bw-gray">
            Breach date
          </p>
          <p className="mt-1 font-semibold text-bw-black">{formatBreachDate(breach.BreachDate)}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-bw-gray">
            Added
          </p>
          <p className="mt-1 font-semibold text-bw-black">{formatBreachDate(breach.AddedDate)}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-bw-gray">
          Exposed data
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleClasses.map((dataClass) => (
            <span
              key={dataClass}
              className="rounded-[3px] bg-bw-light px-2 py-1 text-[12px] text-bw-blue"
            >
              {dataClass}
            </span>
          ))}
          {remaining > 0 && (
            <span className="rounded-[3px] bg-gray-100 px-2 py-1 text-[12px] text-bw-gray">
              +{remaining} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-[3px] bg-bw-light p-4">
        <p className="text-[13px] font-bold text-bw-black">What to do now</p>
        <ul className="mt-2 space-y-2 text-[13px] leading-5 text-bw-text">
          {advice.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        {actionLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {actionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[3px] border border-bw-blue px-3 py-1.5 text-[12px] font-bold text-bw-blue hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default async function BreachesPage() {
  const breaches = await fetchBreaches();

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-black/10 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
              Breach intelligence
            </p>
            <div className="mt-3 max-w-3xl">
              <h1 className="text-[34px] font-bold leading-tight text-bw-black">
                Recent breach records, exposed data types, and practical next steps.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                Track newly added public breach records, see what data was exposed,
                and get clear response steps based on the type of information leaked.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/breach-checker"
                className="rounded-[3px] bg-bw-blue px-5 py-3 text-center text-[13px] font-bold text-white hover:bg-bw-blue-dark"
              >
                Check a password
              </Link>
              <Link
                href="/password-managers"
                className="rounded-[3px] border border-bw-blue px-5 py-3 text-center text-[13px] font-bold text-bw-blue hover:bg-bw-light"
              >
                Compare password managers
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-bw-black">Latest public breaches</h2>
              <p className="mt-1 text-[13px] text-bw-gray">
                Updated daily from public breach catalog records.
              </p>
            </div>
            <a
              href="https://haveibeenpwned.com/PwnedWebsites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-bw-blue underline hover:text-bw-blue-dark"
            >
              View source catalog
            </a>
          </div>

          {breaches.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {breaches.map((breach) => (
                <BreachCard key={breach.Name} breach={breach} />
              ))}
            </div>
          ) : (
            <div className="rounded-[3px] border border-black/10 bg-bw-light p-6">
              <h2 className="text-[18px] font-bold text-bw-black">
                Breach feed temporarily unavailable
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-bw-gray">
                The public breach source could not be reached. You can still use the
                password checker, which checks passwords privately using k-anonymity.
              </p>
              <Link
                href="/breach-checker"
                className="mt-4 inline-block text-[13px] font-bold text-bw-blue underline hover:text-bw-blue-dark"
              >
                Go to password checker
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
