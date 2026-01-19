import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/lib/prisma';

// GET all users
export async function GET(req: NextRequest) {
  const { searchParams, search } = req.nextUrl;
  const receivedToken = searchParams.get('token');

  try {
    // TODO: Check if URL is exsists 
    if (!receivedToken) {
      return NextResponse.json({ error: 'Missing token from URL' }, { status: 400 });
    }

    // TODO: check if the invitation exists/legit
    const isExsists = await prisma.invitation.findFirst({
      where: { token: receivedToken },
    });
    const emailBasedToken = isExsists?.email
    if (!isExsists) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 401 });
    }

    // TODO: check if expired (72 hours)
    const isExpired = (new Date().getTime() - isExsists.createdAt.getTime()) / (1000 * 60 * 60) >= 72;
    if (isExpired) {
      return NextResponse.json({ error: 'Invitation has expired' }, { status: 402 });
    }

    return NextResponse.json({ emailBasedToken, message: "validated URL" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {

  } catch (error) {

  }
}

