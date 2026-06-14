import { describe, expect, it } from 'vitest';
import { buildAffiliateUrl } from '../affiliate';

describe('buildAffiliateUrl', () => {
  it('keeps live direct product URLs unchanged', () => {
    const result = buildAffiliateUrl(
      'https://go.nordvpn.net/ABC123',
      'nordvpn',
      'vpn',
      'comparison'
    );

    expect(result).toBe('https://go.nordvpn.net/ABC123');
  });

  it('preserves existing query params without appending affiliate tracking', () => {
    const result = buildAffiliateUrl(
      'https://example.com/ref?id=123',
      'nordvpn',
      'vpn',
      'review'
    );

    expect(result).toBe('https://example.com/ref?id=123');
  });

  it('falls back to the internal review page for PLACEHOLDER links', () => {
    const result = buildAffiliateUrl('PLACEHOLDER', 'expressvpn', 'vpn', 'category');

    expect(result).toBe('/reviews/expressvpn');
  });

  it('falls back to the internal review page for empty links', () => {
    const result = buildAffiliateUrl('', 'nordvpn', 'vpn', 'category');

    expect(result).toBe('/reviews/nordvpn');
  });

  it('accepts category and page type without coupling pages to monetization logic', () => {
    const result = buildAffiliateUrl(
      'https://bitwarden.com',
      'bitwarden',
      'password-manager',
      'quiz-recommendation'
    );

    expect(result).toBe('https://bitwarden.com');
  });
});


