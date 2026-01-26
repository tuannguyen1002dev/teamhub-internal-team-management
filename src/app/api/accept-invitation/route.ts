import { NextResponse, NextRequest } from "next/server";
import { InvitationService } from "@/features/invitation/application/invitation.service";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get('token');

  try {
    const result = await InvitationService.verify(token || "");
    return NextResponse.json({ emailBasedToken: result.email, message: result.message }, { status: 200 });
  } catch (error: any) {
    if (error.message === "MISSING_TOKEN") return NextResponse.json({ error: 'Missing token from URL' }, { status: 400 });
    if (error.message === "NOT_FOUND") return NextResponse.json({ error: 'Invitation not found' }, { status: 401 });
    if (error.message === "EXPIRED") return NextResponse.json({ error: 'Invitation has expired' }, { status: 402 });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}

