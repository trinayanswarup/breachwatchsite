import type { Product, Criterion } from '@/lib/types';

export interface ScoreBreakdownProps {
  product: Product;
  criteria: Criterion[];
}

export default function ScoreBreakdown({ product, criteria }: ScoreBreakdownProps) {
  const rows = criteria.map((c) => {
    const score = product.scores[c.id] ?? 0;
    const contribution = (score * c.weight) / 100;
    return { criterion: c, score, contribution };
  });

  const total = rows.reduce((sum, r) => sum + r.contribution, 0);

  function scoreColor(score: number): string {
    if (score >= 8) return 'bg-green-500';
    if (score >= 5) return 'bg-amber-400';
    return 'bg-red-500';
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">
          Score breakdown — {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          How the overall score of{' '}
          <strong className="text-gray-700">{total.toFixed(1)}/10</strong> is calculated
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {rows.map(({ criterion, score, contribution }) => (
          <div key={criterion.id} className="px-4 py-3">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <div className="min-w-0">
                <span className="text-sm font-medium text-gray-900">
                  {criterion.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {criterion.weight}% weight
                </span>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {score}/10
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  = {contribution.toFixed(2)} pts
                </span>
              </div>
            </div>
            <div className="flex gap-0.5 mt-1.5" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-sm ${i < score ? scoreColor(score) : 'bg-gray-200'}`}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-400">{criterion.description}</p>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-gray-900">Overall Score</span>
        <span className="text-xl font-bold text-gray-900">
          {total.toFixed(1)}
          <span className="text-sm font-normal text-gray-500">/10</span>
        </span>
      </div>
    </div>
  );
}
