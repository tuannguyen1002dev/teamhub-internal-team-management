import { NextResponse } from 'next/server';
import { AuthApplicationService } from '@/features/auth/application/auth.application';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload.email || !payload.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const result = await AuthApplicationService.executeLogin(payload);

    return NextResponse.json({
      message: 'Login successful',
      ...result
    });
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    console.error('Login route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
