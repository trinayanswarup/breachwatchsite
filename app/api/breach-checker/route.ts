import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const prefix = request.nextUrl.searchParams.get('prefix');

  if (!prefix || !/^[0-9A-Fa-f]{5}$/.test(prefix)) {
    return NextResponse.json({ error: 'Invalid prefix' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix.toUpperCase()}`,
      {
        next: { revalidate: 3600 },
        headers: {
          'User-Agent': 'BreachWatch-password-checker/1.0',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Breach database temporarily unavailable' },
        { status: 502 }
      );
    }

    const text = await response.text();

    return new NextResponse(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }
}
