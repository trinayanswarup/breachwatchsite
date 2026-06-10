export interface StatsDisplayProps {
  visitorsThisWeek: number;
  visitorsLastWeek: number;
  topPages: Array<{ path: string; views: number }>;
  topSources: Array<{ source: string; views: number }>;
  topCountries: Array<{ country: string; views: number }>;
}

function delta(current: number, previous: number): { pct: number; up: boolean } {
  if (previous === 0) return { pct: 0, up: true };
  const pct = Math.round(((current - previous) / previous) * 100);
  return { pct: Math.abs(pct), up: pct >= 0 };
}

function StatCard({
  label,
  value,
  sub,
  up,
}: {
  label: string;
  value: string;
  sub?: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-gray-900">{value}</p>
      {sub !== undefined && (
        <p className={`mt-1 text-sm font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
          {up ? '↑' : '↓'} {sub} vs previous week
        </p>
      )}
    </div>
  );
}

function TableSection({
  title,
  rows,
  labelKey,
  valueKey,
}: {
  title: string;
  rows: Record<string, string | number>[];
  labelKey: string;
  valueKey: string;
}) {
  const max = Math.max(...rows.map((r) => Number(r[valueKey])));
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="border-b border-gray-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <ul className="divide-y divide-gray-50">
        {rows.map((row, i) => {
          const pct = max > 0 ? Math.round((Number(row[valueKey]) / max) * 100) : 0;
          return (
            <li key={i} className="flex items-center gap-4 px-5 py-3">
              <span className="w-5 shrink-0 text-xs font-bold text-gray-400">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-gray-800">
                {String(row[labelKey])}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full ${
                        i < Math.round(pct / 10) ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="w-12 text-right text-sm font-semibold text-gray-700">
                  {Number(row[valueKey]).toLocaleString()}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function StatsDisplay({
  visitorsThisWeek,
  visitorsLastWeek,
  topPages,
  topSources,
  topCountries,
}: StatsDisplayProps) {
  const { pct, up } = delta(visitorsThisWeek, visitorsLastWeek);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Visitors this week"
          value={visitorsThisWeek.toLocaleString()}
          sub={`${pct}%`}
          up={up}
        />
        <StatCard
          label="Visitors last week"
          value={visitorsLastWeek.toLocaleString()}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <TableSection
          title="Top pages"
          rows={topPages as unknown as Record<string, string | number>[]}
          labelKey="path"
          valueKey="views"
        />
        <TableSection
          title="Top sources"
          rows={topSources as unknown as Record<string, string | number>[]}
          labelKey="source"
          valueKey="views"
        />
        <TableSection
          title="Top countries"
          rows={topCountries as unknown as Record<string, string | number>[]}
          labelKey="country"
          valueKey="views"
        />
      </div>
    </div>
  );
}
