import type { Product, Criterion } from '@/lib/types';

export interface ComparisonTableProps {
  products: Product[];
  criteria: Criterion[];
  category: string;
}

function weightedScore(scores: Record<string, number>, criteria: Criterion[]): number {
  return criteria.reduce(
    (sum, c) => sum + ((scores[c.id] ?? 0) * c.weight) / 100,
    0
  );
}

function rawScoreClass(score: number): string {
  if (score >= 8) return 'text-green-700 font-semibold';
  if (score >= 5) return 'text-amber-600';
  return 'text-red-600';
}

export default function ComparisonTable({ products, criteria }: ComparisonTableProps) {
  const scores = products.map((p) => ({
    id: p.id,
    score: weightedScore(p.scores, criteria),
  }));
  const maxScore = Math.max(...scores.map((s) => s.score));

  return (
    <div className="overflow-x-auto rounded-[3px] border border-black/10 shadow-sm">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 bg-bw-light">
            <th
              scope="col"
              className="sticky left-0 z-10 bg-bw-light px-4 py-3 text-left font-semibold text-bw-text min-w-[200px]"
            >
              Criterion
            </th>
            {products.map((p) => {
              const ps = scores.find((s) => s.id === p.id);
              const isWinner = ps?.score === maxScore;
              return (
                <th
                  key={p.id}
                  scope="col"
                  className={`min-w-[130px] px-4 py-3 text-center font-semibold ${
                    isWinner
                      ? 'border-x-2 border-t-2 border-blue-500 bg-bw-light text-blue-900'
                      : 'text-bw-text'
                  }`}
                >
                  <span className="block">{p.name}</span>
                  {isWinner && (
                    <span className="mt-0.5 block text-[11px] font-medium text-bw-blue">
                      ★ Top rated
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, rowIdx) => (
            <tr key={criterion.id} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-bw-light/40'}>
              <td
                className={`sticky left-0 z-10 px-4 py-3 ${
                  rowIdx % 2 === 0 ? 'bg-white' : 'bg-bw-light/40'
                }`}
              >
                <p className="font-medium text-bw-black">{criterion.name}</p>
                <p className="text-xs text-bw-gray">{criterion.weight}% weight</p>
              </td>
              {products.map((p) => {
                const ps = scores.find((s) => s.id === p.id);
                const isWinner = ps?.score === maxScore;
                const score = p.scores[criterion.id] ?? 0;
                return (
                  <td
                    key={p.id}
                    className={`px-4 py-3 text-center ${
                      isWinner ? 'border-x-2 border-blue-500 bg-bw-light/20' : ''
                    }`}
                  >
                    <span className={rawScoreClass(score)}>{score}/10</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-black/10 bg-bw-light">
            <td className="sticky left-0 z-10 bg-bw-light px-4 py-3 font-bold text-bw-black">
              Overall Score
            </td>
            {scores.map((s) => {
              const isWinner = s.score === maxScore;
              return (
                <td
                  key={s.id}
                  className={`px-4 py-3 text-center ${
                    isWinner
                      ? 'border-x-2 border-b-2 border-blue-500 bg-bw-light font-bold text-bw-blue'
                      : 'font-semibold text-bw-black'
                  }`}
                >
                  <span className="text-lg">{s.score.toFixed(1)}</span>
                  <span className="text-sm text-bw-gray">/10</span>
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
