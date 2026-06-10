import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import StatsDisplay from '@/components/StatsDisplay';
import type { StatsDisplayProps } from '@/components/StatsDisplay';

export const metadata: Metadata = {
  title: 'Site Stats — Traffic and Analytics',
  description:
    'Weekly traffic stats for BreachWatch. We publish our analytics publicly as a commitment to commercial transparency. Data via Vercel Analytics.',
};

// Vercel Analytics Data API — requires VERCEL_ACCESS_TOKEN + VERCEL_PROJECT_ID
// Available on Vercel Pro/Enterprise. Returns null on free tier or missing credentials.
async function fetchVercelStats(): Promise<StatsDisplayProps | null> {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;

  const now = Date.now();
  const weekMs = 7 * 24 * 60 * 60 * 1000;

  try {
    const [thisWeekRes, lastWeekRes] = await Promise.all([
      fetch(
        `https://vercel.com/api/web/insights/stats?from=${now - weekMs}&to=${now}&projectId=${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 3600 },
        }
      ),
      fetch(
        `https://vercel.com/api/web/insights/stats?from=${now - 2 * weekMs}&to=${now - weekMs}&projectId=${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!thisWeekRes.ok || !lastWeekRes.ok) return null;

    type RawStats = {
      visitors?: { value?: number };
      topPages?: Array<{ path?: string; value?: number }>;
      topSources?: Array<{ source?: string; value?: number }>;
      topCountries?: Array<{ country?: string; value?: number }>;
    };

    const thisWeek = (await thisWeekRes.json()) as RawStats;
    const lastWeek = (await lastWeekRes.json()) as RawStats;

    return {
      visitorsThisWeek: thisWeek.visitors?.value ?? 0,
      visitorsLastWeek: lastWeek.visitors?.value ?? 0,
      topPages: (thisWeek.topPages ?? []).slice(0, 5).map((p) => ({
        path: p.path ?? '',
        views: p.value ?? 0,
      })),
      topSources: (thisWeek.topSources ?? []).slice(0, 5).map((s) => ({
        source: s.source ?? 'direct',
        views: s.value ?? 0,
      })),
      topCountries: (thisWeek.topCountries ?? []).slice(0, 5).map((c) => ({
        country: c.country ?? '',
        views: c.value ?? 0,
      })),
    };
  } catch {
    return null;
  }
}

const TRACKED_EVENTS = [
  {
    name: 'quiz_start',
    description: 'Fired when a visitor begins the security quiz.',
  },
  {
    name: 'quiz_complete',
    description: 'Fired on quiz completion. Includes anonymised score and recommended category.',
  },
  {
    name: 'affiliate_click',
    description: 'Fired when a visitor clicks an affiliate CTA. Includes product name and page path.',
  },
  {
    name: 'category_view',
    description: 'Fired on category page load (VPN, password managers, antivirus, 2FA).',
  },
  {
    name: 'comparison_view',
    description: 'Fired when a comparison or review article is viewed.',
  },
];

export default async function StatsPage() {
  const stats = await fetchVercelStats();

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">

        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Site Stats — Traffic and Analytics
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We publish our traffic data publicly as part of our commitment to
              commercial transparency. An affiliate site that hides its metrics
              makes it harder to evaluate how representative its audience is.
              Data is sourced from Vercel Analytics (cookieless, no PII).
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 space-y-12">

          {stats ? (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Last 7 days
              </h2>
              <StatsDisplay {...stats} />
            </section>
          ) : (
            <section className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-8">
              <h2 className="mb-2 text-lg font-bold text-amber-900">
                Live stats not yet configured
              </h2>
              <p className="mb-4 text-amber-800">
                Live traffic data requires{' '}
                <code className="rounded bg-amber-200 px-1.5 py-0.5 text-xs font-mono">
                  VERCEL_ACCESS_TOKEN
                </code>{' '}
                and{' '}
                <code className="rounded bg-amber-200 px-1.5 py-0.5 text-xs font-mono">
                  VERCEL_PROJECT_ID
                </code>{' '}
                environment variables and a Vercel Pro plan. Add them in your Vercel
                project settings to enable this dashboard.
              </p>
              <p className="text-sm text-amber-700">
                Until then, visit the{' '}
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-900"
                >
                  Vercel Analytics dashboard
                </a>{' '}
                directly.
              </p>
            </section>
          )}

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What we track
            </h2>
            <p className="mb-6 text-gray-500">
              In addition to standard page views, we fire custom events via Vercel
              Analytics to understand how readers use the site. No personally
              identifiable information is included in any event.
            </p>
            <div className="space-y-3">
              {TRACKED_EVENTS.map((e) => (
                <div
                  key={e.name}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                  <code className="mt-0.5 shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-800">
                    {e.name}
                  </code>
                  <p className="text-sm text-gray-600">{e.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Full details in our{' '}
              <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">
                privacy policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Why we publish this
            </h2>
            <p className="mb-3 text-gray-700">
              Affiliate sites have an incentive to exaggerate their reach to attract
              vendor partnerships. Publishing real traffic data — even when it shows
              modest numbers — is a form of accountability. If our recommendations
              reached millions of readers, the commercial incentives to compromise
              editorial integrity would be correspondingly higher.
            </p>
            <p className="text-gray-700">
              We also publish this data because the readers who find us via search
              deserve to understand the scale of the operation they are trusting for
              security advice.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
