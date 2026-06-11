import type { Metadata } from 'next';
import QuizPageClient from '@/components/QuizPageClient';

export const metadata: Metadata = {
  title: 'Free Security Risk Quiz — Find Your Biggest Cybersecurity Gap',
  description:
    'Answer 5 questions in 30 seconds. Our AI identifies your single biggest security risk and tells you exactly which tool would protect you most. No email required.',
};

export default function QuizPage() {
  return <QuizPageClient />;
}

