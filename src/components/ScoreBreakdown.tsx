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
    <div className="rounded-[3px] border border-black/10 overflow-hidden">
      <div className="bg-bw-light px-4 py-3 border-b border-black/10">
        <h3 className="font-semibold text-bw-black">
          Score breakdown — {product.name}
        </h3>
        <p className="text-xs text-bw-gray mt-0.5">
          How the overall score of{' '}
          <strong className="text-bw-text">{total.toFixed(1)}/10</strong> is calculated
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {rows.map(({ criterion, score, contribution }) => (
          <div key={criterion.id} className="px-4 py-3">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <div className="min-w-0">
                <span className="text-sm font-medium text-bw-black">
                  {criterion.name}
                </span>
                <span className="ml-2 text-xs text-bw-gray">
                  {criterion.weight}% weight
                </span>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-sm font-semibold text-bw-black">
                  {score}/10
                </span>
                <span className="ml-2 text-xs text-bw-gray">
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
            <p className="mt-1 text-xs text-bw-gray">{criterion.description}</p>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-black/10 bg-bw-light px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-bw-black">Overall Score</span>
        <span className="text-xl font-bold text-bw-black">
          {total.toFixed(1)}
          <span className="text-sm font-normal text-bw-gray">/10</span>
        </span>
      </div>
    </div>
  );
}
