import { NextResponse } from 'next/server';

interface HIBPBreach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  PwnCount: number;
  DataClasses: string[];
  IsVerified: boolean;
}

export async function GET() {
  try {
    const response = await fetch('https://haveibeenpwned.com/api/v3/breaches', {
      next: { revalidate: 86400 },
      headers: {
        'User-Agent': 'BreachWatch/1.0',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'HIBP API temporarily unavailable' },
        { status: 502 }
      );
    }

    const breaches = (await response.json()) as HIBPBreach[];

    const recent = breaches
      .sort(
        (a, b) =>
          new Date(b.AddedDate).getTime() - new Date(a.AddedDate).getTime()
      )
      .slice(0, 6);

    return NextResponse.json(recent, {
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }
}
