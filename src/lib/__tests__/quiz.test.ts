import { describe, it, expect } from 'vitest';
import { parseQuizResult, DEFAULT_QUIZ_RESULT } from '../quiz';

describe('parseQuizResult', () => {
  it('parses a valid Groq response', () => {
    const raw = JSON.stringify({
      biggestRisk: 'You connect to public WiFi without a VPN.',
      score: 3,
      recommendedCategory: 'vpn',
      reasoning: 'A VPN encrypts your traffic on untrusted networks.',
      urgency: 'high',
    });
    const result = parseQuizResult(raw);
    expect(result.recommendedCategory).toBe('vpn');
    expect(result.score).toBe(3);
    expect(result.urgency).toBe('high');
    expect(result.biggestRisk).toBe('You connect to public WiFi without a VPN.');
  });

  it('clamps score to 1-5 range', () => {
    const tooHigh = JSON.stringify({ ...DEFAULT_QUIZ_RESULT, score: 99 });
    expect(parseQuizResult(tooHigh).score).toBe(5);

    const tooLow = JSON.stringify({ ...DEFAULT_QUIZ_RESULT, score: -3 });
    expect(parseQuizResult(tooLow).score).toBe(1);
  });

  it('falls back to default when recommendedCategory is invalid', () => {
    const raw = JSON.stringify({
      biggestRisk: 'Some risk',
      score: 2,
      recommendedCategory: 'firewall',
      reasoning: 'Some reason',
      urgency: 'medium',
    });
    const result = parseQuizResult(raw);
    expect(result.recommendedCategory).toBe(DEFAULT_QUIZ_RESULT.recommendedCategory);
  });

  it('falls back to default when urgency is invalid', () => {
    const raw = JSON.stringify({
      ...DEFAULT_QUIZ_RESULT,
      urgency: 'critical',
    });
    const result = parseQuizResult(raw);
    expect(result.urgency).toBe(DEFAULT_QUIZ_RESULT.urgency);
  });

  it('returns DEFAULT_QUIZ_RESULT for invalid JSON', () => {
    const result = parseQuizResult('not valid json {{{');
    expect(result).toEqual(DEFAULT_QUIZ_RESULT);
  });

  it('returns DEFAULT_QUIZ_RESULT for empty string', () => {
    const result = parseQuizResult('');
    expect(result).toEqual(DEFAULT_QUIZ_RESULT);
  });

  it('uses DEFAULT_QUIZ_RESULT values for missing fields', () => {
    const raw = JSON.stringify({ score: 4, recommendedCategory: 'vpn' });
    const result = parseQuizResult(raw);
    expect(result.biggestRisk).toBe(DEFAULT_QUIZ_RESULT.biggestRisk);
    expect(result.reasoning).toBe(DEFAULT_QUIZ_RESULT.reasoning);
  });
});
