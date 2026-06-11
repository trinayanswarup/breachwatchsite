import { describe, expect, it } from 'vitest';
import {
  formatBreachCount,
  formatBreachDate,
  getBreachAdvice,
  getBreachSeverity,
} from '../breaches';

describe('getBreachSeverity', () => {
  it('classifies breach size at important thresholds', () => {
    expect(getBreachSeverity(999_999).label).toBe('Small');
    expect(getBreachSeverity(1_000_000).label).toBe('Medium');
    expect(getBreachSeverity(10_000_000).label).toBe('Large');
    expect(getBreachSeverity(100_000_000).label).toBe('Critical');
  });
});

describe('getBreachAdvice', () => {
  it('prioritizes account takeover advice when passwords and emails are exposed', () => {
    const advice = getBreachAdvice(['Email addresses', 'Passwords']);

    expect(advice).toContain(
      'Change reused passwords immediately and check old passwords for known leaks.'
    );
    expect(advice).toContain(
      'Watch for phishing emails and enable 2FA on important accounts.'
    );
  });

  it('adds payment and phone-specific advice for fraud risks', () => {
    const advice = getBreachAdvice(['Phone numbers', 'Credit cards']);

    expect(advice).toEqual([
      'Be alert for SMS phishing and SIM-swap attempts.',
      'Monitor bank statements and card activity for unfamiliar charges.',
    ]);
  });

  it('falls back to generic advice for unknown exposed data classes', () => {
    expect(getBreachAdvice(['Usernames'])).toEqual([
      'Review exposed data types and change credentials on any affected account.',
    ]);
  });

  it('limits advice to three actions to keep breach cards readable', () => {
    const advice = getBreachAdvice([
      'Passwords',
      'Email addresses',
      'Phone numbers',
      'Credit cards',
      'IP addresses',
    ]);

    expect(advice).toHaveLength(3);
  });
});

describe('breach formatting helpers', () => {
  it('formats large breach account counts for scanning', () => {
    expect(formatBreachCount(950)).toBe('950');
    expect(formatBreachCount(12_400)).toBe('12K');
    expect(formatBreachCount(2_500_000)).toBe('2.5M');
    expect(formatBreachCount(1_200_000_000)).toBe('1.2B');
  });

  it('formats dates in the site display style', () => {
    expect(formatBreachDate('2026-06-01T12:00:00Z')).toBe('1 Jun 2026');
  });
});
