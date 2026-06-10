import { describe, it, expect } from 'vitest';
import { buildAffiliateUrl } from '../affiliate';

describe('buildAffiliateUrl', () => {
  it('appends UTM params to a clean URL', () => {
    const result = buildAffiliateUrl(
      'https://go.nordvpn.net/ABC123',
      'nordvpn',
      'vpn',
      'comparison'
    );
    expect(result).toBe(
      'https://go.nordvpn.net/ABC123?utm_source=breachwatchsite&utm_medium=affiliate&utm_campaign=vpn-comparison'
    );
  });

  it('uses & separator when URL already has query params', () => {
    const result = buildAffiliateUrl(
      'https://example.com/ref?id=123',
      'nordvpn',
      'vpn',
      'review'
    );
    expect(result).toContain('id=123');
    expect(result).toContain('&utm_source=breachwatchsite');
  });

  it('returns /reviews/{product} for PLACEHOLDER href', () => {
    const result = buildAffiliateUrl('PLACEHOLDER', 'expressvpn', 'vpn', 'category');
    expect(result).toBe('/reviews/expressvpn');
  });

  it('returns /reviews/{product} for empty href', () => {
    const result = buildAffiliateUrl('', 'nordvpn', 'vpn', 'category');
    expect(result).toBe('/reviews/nordvpn');
  });

  it('includes correct category and pageType in utm_campaign', () => {
    const result = buildAffiliateUrl(
      'https://bitwarden.com',
      'bitwarden',
      'password-manager',
      'review'
    );
    expect(result).toContain('utm_campaign=password-manager-review');
  });
});
