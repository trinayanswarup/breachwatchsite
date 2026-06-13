import { describe, expect, it } from 'vitest';
import { buildAffiliateUrl } from '../affiliate';

describe('buildAffiliateUrl', () => {
  it('returns direct product URLs without adding tracking params', () => {
    const result = buildAffiliateUrl(
      'https://go.nordvpn.net/ABC123',
      'nordvpn',
      'vpn',
      'comparison'
    );

    expect(result).toBe('https://go.nordvpn.net/ABC123');
  });

  it('preserves existing query params without appending affiliate params', () => {
    const result = buildAffiliateUrl(
      'https://example.com/ref?id=123',
      'nordvpn',
      'vpn',
      'review'
    );

    expect(result).toBe('https://example.com/ref?id=123');
  });

  it('returns /reviews/{product} for PLACEHOLDER href', () => {
    const result = buildAffiliateUrl('PLACEHOLDER', 'expressvpn', 'vpn', 'category');

    expect(result).toBe('/reviews/expressvpn');
  });

  it('returns /reviews/{product} for empty href', () => {
    const result = buildAffiliateUrl('', 'nordvpn', 'vpn', 'category');

    expect(result).toBe('/reviews/nordvpn');
  });
});


