import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('https://docs.google.com/spreadsheets/d/14XrIoeA9exnMHG_7UMcHohUYLdUozCwSVVjkCLmxabw/export?format=csv', { 
      cache: 'no-store' 
    });
    const text = await res.text();
    return new NextResponse(text, { 
      headers: { 
        'Content-Type': 'text/csv',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      } 
    });
  } catch (error) {
    return new NextResponse('Error fetching data', { status: 500 });
  }
}
