interface HIBPBreach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  PwnCount: number;
  DataClasses: string[];
  IsVerified: boolean;
}

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

function formatCount(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toLocaleString();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface SeverityInfo {
  label: string;
  className: string;
}

function getSeverity(count: number): SeverityInfo {
  if (count >= 100_000_000)
    return { label: 'Critical', className: 'bg-red-100 text-red-700' };
  if (count >= 10_000_000)
    return { label: 'Large', className: 'bg-orange-100 text-orange-700' };
  if (count >= 1_000_000)
    return { label: 'Medium', className: 'bg-amber-100 text-amber-700' };
  return { label: 'Small', className: 'bg-gray-100 text-gray-600' };
}

interface BreachCardProps {
  breach: HIBPBreach;
}

function BreachCard({ breach }: BreachCardProps) {
  const severity = getSeverity(breach.PwnCount);
  const visibleClasses = breach.DataClasses.slice(0, 4);
  const remaining = breach.DataClasses.length - visibleClasses.length;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-gray-900 leading-tight">{breach.Title}</p>
          {breach.Domain && (
            <p className="mt-0.5 text-xs text-gray-400">{breach.Domain}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${severity.className}`}
        >
          {severity.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-700 font-medium">
          {formatCount(breach.PwnCount)} accounts
        </span>
        <span className="text-gray-400 text-xs">
          Added {formatDate(breach.AddedDate)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {visibleClasses.map((dc) => (
          <span
            key={dc}
            className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
          >
            {dc}
          </span>
        ))}
        {remaining > 0 && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
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
    <section className="border-t border-gray-100 bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-900">Recent Data Breaches</h2>
        <p className="mt-1 text-gray-500">
          Updated daily from the Have I Been Pwned database
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breaches.map((breach) => (
            <BreachCard key={breach.Name} breach={breach} />
          ))}
        </div>
      </div>
    </section>
  );
}
