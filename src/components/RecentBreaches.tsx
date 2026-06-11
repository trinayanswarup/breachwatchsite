import Link from 'next/link';
import {
  formatBreachCount,
  formatBreachDate,
  getBreachSeverity,
  type HIBPBreach,
} from '@/lib/breaches';

async function fetchRecentBreaches(): Promise<HIBPBreach[]> {
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
      .slice(0, 6);
  } catch {
    return [];
  }
}

interface BreachCardProps {
  breach: HIBPBreach;
}

function BreachCard({ breach }: BreachCardProps) {
  const severity = getBreachSeverity(breach.PwnCount);
  const visibleClasses = breach.DataClasses.slice(0, 4);
  const remaining = breach.DataClasses.length - visibleClasses.length;

  return (
    <div className="flex flex-col gap-3 rounded-[3px] border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-bw-black leading-tight">{breach.Title}</p>
          {breach.Domain && (
            <p className="mt-0.5 text-xs text-bw-gray">{breach.Domain}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-[3px] px-2 py-0.5 text-xs font-semibold ${severity.className}`}
        >
          {severity.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-bw-text font-medium">
          {formatBreachCount(breach.PwnCount)} accounts
        </span>
        <span className="text-bw-gray text-xs">
          Added {formatBreachDate(breach.AddedDate)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {visibleClasses.map((dc) => (
          <span
            key={dc}
            className="rounded-[3px] bg-bw-light px-2 py-0.5 text-xs text-bw-blue"
          >
            {dc}
          </span>
        ))}
        {remaining > 0 && (
          <span className="rounded-[3px] bg-gray-100 px-2 py-0.5 text-xs text-bw-gray">
            +{remaining} more
          </span>
        )}
      </div>
    </div>
  );
}

export default async function RecentBreaches() {
  const breaches = await fetchRecentBreaches();
  if (breaches.length === 0) return null;

  return (
    <section className="border-t border-black/10 bg-bw-light px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-bw-black">Recent Data Breaches</h2>
            <p className="mt-1 text-bw-gray">
              Updated daily from the Have I Been Pwned database
            </p>
          </div>
          <Link
            href="/breaches"
            className="text-sm font-semibold text-bw-blue underline hover:text-bw-blue-dark"
          >
            View all breaches -&gt;
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breaches.map((breach) => (
            <BreachCard key={breach.Name} breach={breach} />
          ))}
        </div>
      </div>
    </section>
  );
}
