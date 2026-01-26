import { NextResponse, NextRequest } from "next/server";
import { InvitationService } from "@/features/invitation/application/invitation.service";
import { cookies } from "next/headers";
import { verifyToken } from "@/infrastructure/auth/jwt";
import { RBAC } from "@/infrastructure/auth/rbac";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user || !RBAC.isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const invitations = await InvitationService.list();
    return NextResponse.json(invitations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch invitations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user || !RBAC.isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { email, role } = await req.json();
    const created = await InvitationService.create({ email, role });
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    if (error.message === "INVALID_EMAIL") return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    if (error.message === "ALREADY_REGISTERED") return NextResponse.json({ error: "User already registered" }, { status: 409 });

    console.error('Invitation error:', error);
    return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 });
  }
}

