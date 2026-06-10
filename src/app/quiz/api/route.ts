import { NextRequest, NextResponse } from 'next/server';
import { analyzeQuizAnswers, DEFAULT_QUIZ_RESULT } from '@/lib/quiz';
import type { QuizAnswers } from '@/lib/quiz';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as QuizAnswers;
    const result = await analyzeQuizAnswers(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(DEFAULT_QUIZ_RESULT);
  }
}
