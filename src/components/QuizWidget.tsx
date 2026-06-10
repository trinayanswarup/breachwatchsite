'use client';

import type { QuizAnswers } from '@/lib/quiz';

export interface QuizWidgetProps {
  onComplete: (answers: QuizAnswers) => void;
}

export default function QuizWidget(_props: QuizWidgetProps) {
  return null;
}
