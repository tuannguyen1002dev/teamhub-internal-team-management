import { prisma } from '@/infrastructure/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const regionsList = await prisma.phoneRegion.findMany();
    return NextResponse.json({ regionsList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}