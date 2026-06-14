import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import antivirusJson from '@/data/antivirus.json';
import passwordManagersJson from '@/data/password-managers.json';
import criteriaJson from '@/data/scoring-criteria.json';
import twoFaAppsJson from '@/data/2fa-apps.json';
import vpnsJson from '@/data/vpns.json';
import { evidenceByCategory } from '@/data/evidence';
import { homepageTopPicks } from '@/lib/top-picks';
import { getTopProduct } from '@/lib/scoring';
import type { Product, ScoringCriteria } from '@/lib/types';

const criteria = criteriaJson as unknown as ScoringCriteria;
const productsByCategory = {
  vpn: vpnsJson as unknown as Product[],
  'password-manager': passwordManagersJson as unknown as Product[],
  antivirus: antivirusJson as unknown as Product[],
  '2fa-apps': twoFaAppsJson as unknown as Product[],
} as const;

const repoRoot = process.cwd();

function readTextFiles(root: string): Array<{ file: string; text: string }> {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(entry.name)) return [];
      return readTextFiles(fullPath);
    }

    if (!/\.(ts|tsx|json|md|mjs|js)$/.test(entry.name)) return [];
    return [{ file: fullPath, text: fs.readFileSync(fullPath, 'utf8') }];
  });
}

describe('data integrity', () => {
  it('keeps every category criteria set at exactly 100 total weight', () => {
    for (const [category, categoryCriteria] of Object.entries(criteria) as Array<
      [keyof ScoringCriteria, ScoringCriteria[keyof ScoringCriteria]]
    >) {
      const total = categoryCriteria.reduce((sum, criterion) => sum + criterion.weight, 0);
      expect(total, `${category} weights`).toBe(100);
    }
  });

  it('gives every product a score for every criterion in its category', () => {
    for (const [category, products] of Object.entries(productsByCategory)) {
      const categoryCriteria = criteria[category as keyof ScoringCriteria];
      for (const product of products) {
        for (const criterion of categoryCriteria) {
          expect(
            product.scores,
            `${category}:${product.id} missing ${criterion.id}`
          ).toHaveProperty(criterion.id);
        }
      }
    }
  });

  it('keeps homepage top picks aligned with computed category winners', () => {
    const expected = {
      VPN: getTopProduct(productsByCategory.vpn, criteria.vpn).id,
      'Password manager': getTopProduct(
        productsByCategory['password-manager'],
        criteria['password-manager']
      ).id,
      Antivirus: getTopProduct(productsByCategory.antivirus, criteria.antivirus).id,
      '2FA app': getTopProduct(productsByCategory['2fa-apps'], criteria['2fa-apps']).id,
    };

    for (const pick of homepageTopPicks) {
      expect(pick.product.id).toBe(expected[pick.categoryLabel as keyof typeof expected]);
    }
  });

  it('has evidence coverage for every scored product', () => {
    for (const [category, products] of Object.entries(productsByCategory)) {
      const evidence = evidenceByCategory[category as keyof typeof evidenceByCategory];
      expect(evidence.links.length, `${category} category evidence links`).toBeGreaterThan(0);

      for (const product of products) {
        const productEvidence = evidence.products[product.id];
        expect(productEvidence, `${category}:${product.id} evidence`).toBeTruthy();
        expect(productEvidence.links.length, `${category}:${product.id} links`).toBeGreaterThan(0);
      }
    }
  });

  it('does not leave stale hardcoded overall score literals in active pages', () => {
    const staleScoreLiterals = [
      '8.05/10',
      '8.25/10',
      '7.30/10',
      '7.00/10',
      '9.4/10',
      '9.0/10',
      '8.8/10',
      '7.6/10',
      '6.2/10',
    ];

    const activeTexts = readTextFiles(path.join(repoRoot, 'app'));
    for (const { file, text } of activeTexts) {
      for (const literal of staleScoreLiterals) {
        expect(text, `${file} contains ${literal}`).not.toContain(literal);
      }
    }
  });

  it('does not contain known mojibake sequences in source files', () => {
    const forbidden = [
      [226, 8364, 8221],
      [226, 8364, 8220],
      [194, 183],
      [226, 8224, 8217],
      [226, 339, 8220],
      [226, 732, 8230],
      [226, 8364, 166],
      [195, 169],
      [240, 376],
      [65533],
    ].map((codes) => String.fromCharCode(...codes));
    const sourceTexts = [
      ...readTextFiles(path.join(repoRoot, 'app')),
      ...readTextFiles(path.join(repoRoot, 'src')),
    ];

    for (const { file, text } of sourceTexts) {
      for (const sequence of forbidden) {
        expect(text, `${file} contains ${sequence}`).not.toContain(sequence);
      }
    }
  });

  it('routes page-level product CTAs through buildAffiliateUrl', () => {
    const pages = readTextFiles(path.join(repoRoot, 'app')).filter(({ text }) =>
      text.includes('<ProductCTA')
    );

    expect(pages.length).toBeGreaterThan(0);
    for (const { file, text } of pages) {
      expect(text, `${file} imports buildAffiliateUrl`).toContain('buildAffiliateUrl');
      expect(text, `${file} resolves CTA URLs through buildAffiliateUrl`).toContain(
        'buildAffiliateUrl('
      );
    }
  });
});
