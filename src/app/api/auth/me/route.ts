import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/infrastructure/auth/jwt';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  return NextResponse.json({
    user: decoded
  });
}
