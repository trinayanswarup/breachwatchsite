'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import QuizWidget from '@/components/QuizWidget';
import QuizResultComponent from '@/components/QuizResult';
import type { QuizAnswers, QuizResult } from '@/lib/quiz';
import { trackQuizComplete } from '@/lib/analytics';

const DEFAULT_RESULT: QuizResult = {
  biggestRisk: 'Using the same password across multiple sites is your biggest risk.',
  score: 2,
  recommendedCategory: 'password-manager',
  reasoning:
    'A password manager eliminates password reuse by generating unique passwords for every site.',
  urgency: 'high',
};

type QuizStep = 'quiz' | 'loading' | 'result';

export default function QuizPageClient() {
  const [step, setStep] = useState<QuizStep>('quiz');
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (step === 'result' && result) {
      trackQuizComplete(result.score, result.recommendedCategory, result.urgency);
    }
  }, [step, result]);

  async function handleComplete(answers: QuizAnswers): Promise<void> {
    setStep('loading');
    try {
      const res = await fetch('/quiz/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error('API error');
      const data = (await res.json()) as QuizResult;
      setResult(data);
    } catch {
      setResult(DEFAULT_RESULT);
    } finally {
      setStep('result');
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        {step === 'quiz' && <QuizWidget onComplete={handleComplete} />}

        {step === 'loading' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
              role="status"
              aria-label="Analysing your security profile"
            />
            <p className="text-lg font-semibold text-gray-700">
              Analysing your security profile…
            </p>
            <p className="text-sm text-gray-500">
              This takes about two seconds.
            </p>
          </div>
        )}

        {step === 'result' && result && (
          <QuizResultComponent result={result} />
        )}
      </main>
      <Footer />
    </div>
  );
}
