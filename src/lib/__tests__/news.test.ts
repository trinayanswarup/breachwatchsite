import { describe, expect, it } from 'vitest';
import { isCuratedNewsLink } from '../news';

describe('isCuratedNewsLink', () => {
  it('rejects HN product/showcase posts and repository links', () => {
    expect(
      isCuratedNewsLink(
        'Show HN: Claw Patrol, a security firewall for agents',
        'https://github.com/example/claw-patrol'
      )
    ).toBe(false);

    expect(
      isCuratedNewsLink(
        'Security scanner released',
        'https://gitlab.com/example/security-scanner'
      )
    ).toBe(false);
  });

  it('allows ordinary security article links', () => {
    expect(
      isCuratedNewsLink(
        'Major password leak affects millions of users',
        'https://example.com/security/password-leak-report'
      )
    ).toBe(true);
  });
});
