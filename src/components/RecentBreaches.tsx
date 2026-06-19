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
      headers: { 'User-Agent': 'CipherCheck/1.0' },
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
    <div className="flex flex-col gap-3 rounded-none border border-black/15 bg-white p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] transition-all hover:border-black">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-bw-black leading-tight tracking-tight">{breach.Title}</p>
          {breach.Domain && (
            <p className="mt-0.5 text-xs text-bw-gray">{breach.Domain}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${severity.className.includes('red') ? 'border-red-200' : severity.className.includes('yellow') ? 'border-yellow-200' : 'border-green-200'} ${severity.className}`}
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
            className="rounded-none bg-bw-light px-2 py-0.5 text-xs text-bw-blue border border-black/5"
          >
            {dc}
          </span>
        ))}
        {remaining > 0 && (
          <span className="rounded-none bg-gray-100 px-2 py-0.5 text-xs text-bw-gray border border-black/5">
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
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8 border-b border-black/15 pb-4">
        <div>
          <h2 className="text-[24px] font-bold text-bw-black tracking-tight">Recent Data Breaches</h2>
          <p className="mt-2 text-[14px] text-bw-gray">
            Updated daily from the Have I Been Pwned database
          </p>
        </div>
        <Link
          href="/breaches"
          className="text-[12px] font-bold text-bw-black uppercase tracking-wide hover:text-bw-blue"
        >
          View all breaches -&gt;
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {breaches.map((breach) => (
          <BreachCard key={breach.Name} breach={breach} />
        ))}
      </div>
    </div>
  );
}
