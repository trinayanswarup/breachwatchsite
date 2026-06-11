import { NextResponse } from 'next/server';
import { fetchAllNews } from '@/lib/news';

export async function GET() {
  try {
    const items = await fetchAllNews();
    return NextResponse.json(items, {
      headers: {
        'Cache-Control': 'public, max-age=7200, stale-while-revalidate=7200',
      },
    });
  } catch {
    return NextResponse.json([], {
      headers: {
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}
