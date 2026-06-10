import type { Metadata } from 'next';
import type { Product, ScoringCriteria } from '@/lib/types';
import { buildAffiliateUrl, affiliateLinks } from '@/lib/affiliate';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/ComparisonTable';
import ProductCard from '@/components/ProductCard';
import AffiliateCTA from '@/components/AffiliateCTA';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import vpnsJson from '@/data/vpns.json';
import criteriaJson from '@/data/scoring-criteria.json';

export const metadata: Metadata = {
  title: 'Component Test | BreachWatch',
  description: 'Internal component test page.',
  robots: { index: false },
};

const vpns = vpnsJson as unknown as Product[];
const allCriteria = criteriaJson as unknown as ScoringCriteria;
const vpnCriteria = allCriteria.vpn;
const nordvpn = vpns.find((p) => p.id === 'nordvpn')!;
const protonvpn = vpns.find((p) => p.id === 'protonvpn')!;

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Component Test Page</h1>
          <p className="mt-2 text-gray-500">Internal visual test — not indexed by search engines.</p>
        </div>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-2">
            ComparisonTable — 5 VPNs
          </h2>
          <ComparisonTable products={vpns} criteria={vpnCriteria} category="vpn" />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-2">
            ProductCard — grid layout
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vpns.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} category="vpn" />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-2">
            ProductCard — featured
          </h2>
          <div className="max-w-sm">
            <ProductCard product={nordvpn} category="vpn" featured />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-2">
            AffiliateCTA — primary and secondary
          </h2>
          <div className="flex flex-wrap gap-4">
            <AffiliateCTA
              product="nordvpn"
              href={buildAffiliateUrl(affiliateLinks['nordvpn'], 'nordvpn', 'vpn', 'test')}
              label="Visit NordVPN"
              variant="primary"
            />
            <AffiliateCTA
              product="protonvpn"
              href={buildAffiliateUrl(affiliateLinks['protonvpn'], 'protonvpn', 'vpn', 'test')}
              label="Visit ProtonVPN"
              variant="secondary"
            />
            <AffiliateCTA
              product="mullvad"
              href={buildAffiliateUrl(affiliateLinks['mullvad'], 'mullvad', 'vpn', 'test')}
              label="Visit Mullvad"
              variant="primary"
            />
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Hover the buttons to see the affiliate tooltip. NordVPN and ProtonVPN are
            PLACEHOLDER links (route to /reviews). Mullvad has a real URL with UTM params.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-2">
            ScoreBreakdown — NordVPN
          </h2>
          <div className="max-w-xl">
            <ScoreBreakdown product={nordvpn} criteria={vpnCriteria} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-2">
            ScoreBreakdown — ProtonVPN
          </h2>
          <div className="max-w-xl">
            <ScoreBreakdown product={protonvpn} criteria={vpnCriteria} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
