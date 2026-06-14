import antivirusJson from '@/data/antivirus.json';
import criteriaJson from '@/data/scoring-criteria.json';
import twoFaAppsJson from '@/data/2fa-apps.json';
import passwordManagersJson from '@/data/password-managers.json';
import vpnsJson from '@/data/vpns.json';
import { getTopProduct } from '@/lib/scoring';
import type { Criterion, Product, ScoringCriteria } from '@/lib/types';

const vpns = vpnsJson as unknown as Product[];
const passwordManagers = passwordManagersJson as unknown as Product[];
const antivirus = antivirusJson as unknown as Product[];
const twoFaApps = twoFaAppsJson as unknown as Product[];
const criteria = criteriaJson as unknown as ScoringCriteria;

export interface HomepageTopPick {
  categoryLabel: string;
  href: string;
  product: Product;
  criteria: Criterion[];
  reason: string;
}

export const homepageTopPicks: HomepageTopPick[] = [
  {
    categoryLabel: 'VPN',
    href: '/vpn',
    product: getTopProduct(vpns, criteria.vpn),
    criteria: criteria.vpn,
    reason: 'Highest score across logging policy, jurisdiction, audits, price, and reliability.',
  },
  {
    categoryLabel: 'Password manager',
    href: '/password-managers',
    product: getTopProduct(passwordManagers, criteria['password-manager']),
    criteria: criteria['password-manager'],
    reason: 'Best blend of security architecture, open source code, price, and platform coverage.',
  },
  {
    categoryLabel: 'Antivirus',
    href: '/antivirus',
    product: getTopProduct(antivirus, criteria.antivirus),
    criteria: criteria.antivirus,
    reason: 'Top score when detection, performance impact, privacy, price, and false positives are weighted.',
  },
  {
    categoryLabel: '2FA app',
    href: '/2fa-apps',
    product: getTopProduct(twoFaApps, criteria['2fa-apps']),
    criteria: criteria['2fa-apps'],
    reason: 'Strongest score for backup, recovery, export, reliability, and open-source signals.',
  },
];
