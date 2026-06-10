'use client';

import { useState, useEffect } from 'react';
import type { QuizAnswers } from '@/lib/quiz';
import { trackQuizStart } from '@/lib/analytics';

export interface QuizWidgetProps {
  onComplete: (answers: QuizAnswers) => void;
}

interface QuestionDef {
  id: keyof QuizAnswers;
  text: string;
  hint?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
}

const QUESTIONS: QuestionDef[] = [
  {
    id: 'reusePasswords',
    text: 'Do you reuse the same password on multiple sites?',
    hint: 'Password reuse is behind the majority of account takeovers.',
    options: [
      { value: 'yes', label: 'Yes, I use the same password on most sites' },
      { value: 'sometimes', label: 'Sometimes, for less important accounts' },
      { value: 'no', label: 'No, every site has a unique password' },
    ],
  },
  {
    id: 'usesPasswordManager',
    text: 'Do you currently use a password manager?',
    options: [
      { value: 'yes', label: 'Yes, I use one regularly' },
      { value: 'heard_of', label: "I've heard of them but haven't set one up" },
      { value: 'no', label: "No, and I've never looked into it" },
    ],
  },
  {
    id: 'hasTwoFA',
    text: 'Does your main email account have two-factor authentication enabled?',
    hint: "Your email is the master key — if it's compromised, every account that uses it for password reset is too.",
    options: [
      { value: 'yes', label: 'Yes, I have 2FA set up' },
      { value: 'no', label: "No, I haven't set it up" },
      { value: 'unknown', label: "I'm not sure — I'd need to check" },
    ],
  },
  {
    id: 'usesVPNOnPublicWifi',
    text: 'Do you connect to public WiFi — in cafés, airports, hotels — without a VPN?',
    options: [
      { value: 'yes', label: 'Yes, often' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No, I always use a VPN or avoid public WiFi' },
    ],
  },
  {
    id: 'checkedBreaches',
    text: 'Have you ever checked if your email has appeared in a data breach?',
    hint: 'Tools like HaveIBeenPwned.com show you instantly.',
    options: [
      { value: 'yes', label: 'Yes, I check regularly' },
      { value: 'no', label: "No, I've never checked" },
    ],
  },
];

export default function QuizWidget({ onComplete }: QuizWidgetProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedAnswers, setCollectedAnswers] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    trackQuizStart();
  }, []);

  const question = QUESTIONS[currentStep];
  const progress = ((currentStep) / QUESTIONS.length) * 100;

  function handleSelect(value: string): void {
    if (!visible) return;

    const newAnswers = [...collectedAnswers, value];
    setVisible(false);

    setTimeout(() => {
      setCollectedAnswers(newAnswers);

      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep((s) => s + 1);
        setVisible(true);
      } else {
        const quizAnswers: QuizAnswers = {
          reusePasswords: newAnswers[0] as QuizAnswers['reusePasswords'],
          usesPasswordManager: newAnswers[1] as QuizAnswers['usesPasswordManager'],
          hasTwoFA: newAnswers[2] as QuizAnswers['hasTwoFA'],
          usesVPNOnPublicWifi: newAnswers[3] as QuizAnswers['usesVPNOnPublicWifi'],
          checkedBreaches: newAnswers[4] as QuizAnswers['checkedBreaches'],
        };
        onComplete(quizAnswers);
      }
    }, 220);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
          <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: QUESTIONS.length }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className={`transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="mb-2 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          {question.text}
        </h2>

        {question.hint && (
          <p className="mb-6 text-sm text-gray-500">{question.hint}</p>
        )}

        {!question.hint && <div className="mb-6" />}

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-left text-base font-medium text-gray-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.99]"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
