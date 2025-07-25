import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST() {
  // Clear the session cookie
  cookies().delete('pq_session');
  
  // Redirect to access code page
  return NextResponse.redirect(new URL('/access-code', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'));
}