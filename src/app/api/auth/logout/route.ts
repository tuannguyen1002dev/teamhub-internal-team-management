import { NextResponse } from 'next/server';
import { AuthApplicationService } from '@/features/auth/application/auth.application';

export async function POST() {
    await AuthApplicationService.executeLogout();
    return NextResponse.json({ message: 'Logged out successfully' });
}
